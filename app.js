"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const bootstrap = __importStar(require("bootstrap")); // import statically - dont grab it from a cdn
const slider_1 = require("./view/slider");
const checkbox_1 = require("./view/checkbox");
const thumbnail_1 = require("./view/thumbnail");
const fileAnnotationHistory_1 = require("./cache/fileAnnotationHistory");
const point2d_1 = require("./graph/point2d");
const editor2d_1 = require("./editor2d");
const graph_1 = require("./graph/graph");
const face_landmarks_features_1 = require("./graph/face_landmarks_features");
const mediapipe_1 = require("./model/mediapipe");
const models_1 = require("./model/models");
const webservice_1 = require("./model/webservice");
class App {
    constructor(cacheSize) {
        this.fileCache = [];
        this.editor = new editor2d_1.Editor2D();
        this.models = {
            "mediapipe": { "model": new mediapipe_1.MediapipeModel(), "selected": true },
            "custom": { "model": null, "selected": false }
        };
        this.selectedFile = null;
        this.cacheSize = cacheSize;
        this.featureDrag = new slider_1.Slider('feature_drag', () => {
            // TODO FIX Not working!
            const element = document.getElementById('num');
            element.value = this.featureDrag.getValue().toString();
            this.editor.dragDepth = this.featureDrag.getValue();
        });
        this.viewTesselation = new checkbox_1.CheckBox('view_tesselation', () => this.editor.showTesselation = this.viewTesselation.isChecked());
        this.thumbnailGallery = document.getElementById('thumbnailgallery');
        this.numImages = document.getElementById('num_images');
        this.editor.setOnPointsEditedCallback(graph => { var _a; return (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.add(graph); });
        this.editor.setOnBackgroundLoadedCallback(_ => {
            var _a, _b;
            if ((_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.isEmpty()) {
                this.runDetection();
            }
            else {
                this.editor.graph = (_b = this.getSelectedFileHistory()) === null || _b === void 0 ? void 0 : _b.get();
            }
        });
    }
    openImage() {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = "image/png, image/jpeg";
        input.multiple = true;
        input.onchange = () => {
            if (input.files) {
                const files = Array.from(input.files);
                for (const f of files) {
                    const history = new fileAnnotationHistory_1.FileAnnotationHistory(f, this.cacheSize);
                    this.fileCache.push(history);
                    const thumbnail = new thumbnail_1.Thumbnail(filename => this.selectThumbnail(filename));
                    thumbnail.setSource(f);
                    this.thumbnailGallery.appendChild(thumbnail.toHtml());
                    this.numImages.value = this.thumbnailGallery.children.length.toString();
                }
                if (files.length > 0) {
                    this.editor.setBackgroundSource(files[0]);
                    this.selectedFile = files[0].name;
                }
            }
        };
        input.click();
        return false;
    }
    openAnnotation() {
        let input = document.createElement('input');
        input.type = 'file';
        input.accept = ".json,application/json";
        input.onchange = () => {
            if (input.files && input.files.length > 0) {
                const annotationFile = input.files[0];
                const reader = new FileReader();
                reader.onload = _ => {
                    const jsonString = JSON.parse(reader.result);
                    for (const filename of Object.keys(jsonString)) {
                        const graph = graph_1.Graph.fromJson(jsonString[filename], (id) => new point2d_1.Point2D(id, 0, 0, []));
                        const cache = this.fileCache.find(f => f.file.name === filename);
                        if (cache) {
                            cache.add(graph);
                            if (this.selectedFile === filename) {
                                this.editor.graph = graph;
                            }
                        }
                    }
                    this.editor.draw();
                };
                reader.readAsText(annotationFile);
            }
        };
        input.click();
        return false;
    }
    saveAnnotation() {
        if (this.fileCache.length > 0) {
            const result = {};
            for (const c of this.fileCache) {
                const graph = c.get();
                if (graph) {
                    result[c.file.name] = graph.toDictArray();
                }
            }
            const jsonData = JSON.stringify(result);
            this.getModel().uploadAnnotations(jsonData);
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonData);
            const a = document.createElement('a');
            a.href = dataStr;
            a.download = Date.now() + '_face_mesh_annotations.json';
            a.click();
        }
        return false;
    }
    undo() {
        var _a, _b;
        (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.previous();
        this.editor.graph = (_b = this.getSelectedFileHistory()) === null || _b === void 0 ? void 0 : _b.get();
        return false;
    }
    redo() {
        var _a, _b;
        (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.next();
        this.editor.graph = (_b = this.getSelectedFileHistory()) === null || _b === void 0 ? void 0 : _b.get();
        return false;
    }
    reset() {
        var _a;
        (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.clear();
        this.runDetection();
        return false;
    }
    addFeatureDrag(value) {
        this.featureDrag.setValue(this.featureDrag.getValue() + value);
    }
    setModel(name) {
        const btnMediapipe = document.getElementById('btnModelMediapipe');
        const btnCustom = document.getElementById('btnModelCustom');
        this.models.mediapipe.selected = false;
        this.models.custom.selected = false;
        switch (name) {
            case models_1.ModelType.mediapipe: {
                btnMediapipe.checked = true;
                this.models.mediapipe.selected = true;
                break;
            }
            case models_1.ModelType.custom: {
                btnCustom.checked = true;
                this.models.custom.selected = true;
                const inputBox = $('#modelurl');
                const url = String(inputBox.val());
                webservice_1.WebServiceModel.verifyUrl(url).then(error => {
                    const errorText = $('#urlErrorText');
                    if (error === null) {
                        this.models.custom.model = new webservice_1.WebServiceModel(url);
                        $('#modalSettingsModel').modal('hide');
                        errorText.hide();
                        const saveElement = $('#saveNotification')[0];
                        const toast = bootstrap.Toast.getOrCreateInstance(saveElement);
                        toast.show();
                        const notificationText = $('#saveNotificationText');
                        notificationText.text('Webservice url saved!');
                        setTimeout(() => {
                            toast.hide();
                            notificationText.text();
                        }, 5000);
                    }
                    else {
                        // Display error:
                        switch (error) {
                            case webservice_1.urlError.InvalidUrl: {
                                errorText.removeAttr('hidden');
                                errorText.text('Please enter a valid URL!');
                                break;
                            }
                            case webservice_1.urlError.Unreachable: {
                                errorText.removeAttr('hidden');
                                errorText.text('The provided endpoint wasn\'t reachable!');
                                break;
                            }
                        }
                        // shake the input window
                        inputBox.addClass("wrongInput");
                        setTimeout(function () {
                            inputBox.removeClass('wrongInput');
                        }, 500);
                    }
                });
                break;
            }
            default:
                console.error('No model "' + name + '" found to change to!');
                break;
        }
        return false;
    }
    getModel() {
        for (const modelName in this.models) {
            if (this.models[modelName].selected) {
                return this.models[modelName].model;
            }
        }
        return undefined;
    }
    deleteFeature(feature) {
        var _a;
        (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.add(this.editor.graph);
        switch (feature) {
            case "left_eye":
                this.deletePoints(face_landmarks_features_1.FACE_FEATURE_LEFT_EYE);
                break;
            case "left_eyebrow":
                this.deletePoints(face_landmarks_features_1.FACE_FEATURE_LEFT_EYEBROW);
                break;
            case "right_eye":
                this.deletePoints(face_landmarks_features_1.FACE_FEATURE_RIGHT_EYE);
                break;
            case "right_eyebrow":
                this.deletePoints(face_landmarks_features_1.FACE_FEATURE_RIGHT_EYEBROW);
                break;
            case "nose":
                this.deletePoints(face_landmarks_features_1.FACE_FEATURE_NOSE);
                break;
            case "mouth":
                this.deletePoints(face_landmarks_features_1.FACE_FEATURE_LIPS);
                break;
            default:
                console.error('No feature "' + feature + '" found to delete!');
                break;
        }
        return false;
    }
    selectThumbnail(filename) {
        this.selectedFile = filename;
        const cache = this.getSelectedFileHistory();
        if (cache) {
            this.editor.setBackgroundSource(cache.file);
        }
    }
    resizeWindow() {
        this.editor.draw();
    }
    runDetection() {
        var _a;
        (_a = this.getModel()) === null || _a === void 0 ? void 0 : _a.detect(this.getSelectedFileHistory().file).then(graph => {
            var _a;
            (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.add(graph);
            this.editor.center();
            this.editor.graph = graph;
        });
    }
    getSelectedFileHistory() {
        return this.fileCache.find(c => c.file.name === this.selectedFile);
    }
    deletePoints(pointIds) {
        var _a;
        const graph = (_a = this.getSelectedFileHistory()) === null || _a === void 0 ? void 0 : _a.get();
        if (graph) {
            for (const id of pointIds) {
                graph.getById(id).deleted = true;
            }
            this.editor.graph = graph;
        }
    }
}
exports.App = App;
// #####################################################################################################################
// INITIAL
// #####################################################################################################################
window.onload = _ => {
    let elements = document.querySelectorAll('[aria-keyshortcuts]');
    elements.forEach((elem) => {
        elem.style.cssText = "width: 100%; text-align: start; padding: .2vw;";
        const keys = elem.ariaKeyShortcuts.split('+').map((k) => k.replace('Control', 'CTRL').replace('Shift', 'SHIFT').replace('Wheel', 'SCROLL'));
        if (elem.ariaKeyShortcuts.length > 0) {
            const table = document.createElement('table');
            table.style.cssText = 'width: 100%';
            const row = document.createElement('tr');
            table.appendChild(row);
            const menuTextCol = document.createElement('td');
            menuTextCol.innerHTML = elem.innerHTML;
            row.appendChild(menuTextCol);
            const menuShortCutCol = document.createElement('td');
            menuShortCutCol.style.cssText = "text-align: end;";
            menuShortCutCol.innerHTML = keys.map((k) => "<kbd>" + k + "</kbd>").join("+");
            row.appendChild(menuShortCutCol);
            elem.replaceChildren(table);
        }
    });
    const app = new App(25);
    document.getElementById('openFile').onclick = () => app.openImage();
    document.getElementById('openAnno').onclick = () => app.openAnnotation();
    document.getElementById('saveAnno').onclick = () => app.saveAnnotation();
    document.getElementById('undo').onclick = () => app.undo();
    document.getElementById('redo').onclick = () => app.redo();
    document.getElementById('reset').onclick = () => app.reset();
    document.getElementById('btnModelMediapipe').onclick = () => app.setModel(models_1.ModelType.mediapipe);
    document.getElementById('btnCloseModal').onclick = () => app.setModel(models_1.ModelType.mediapipe);
    document.getElementById('btnCancelModal').onclick = () => app.setModel(models_1.ModelType.mediapipe);
    document.getElementById('btnSaveCustomModel').onclick = () => app.setModel(models_1.ModelType.custom);
    document.getElementById('feat_le').onclick = _ => app.deleteFeature('left_eye');
    document.getElementById('feat_leb').onclick = _ => app.deleteFeature('left_eyebrow');
    document.getElementById('feat_re').onclick = _ => app.deleteFeature('right_eye');
    document.getElementById('feat_reb').onclick = _ => app.deleteFeature('right_eyebrow');
    document.getElementById('feat_n').onclick = _ => app.deleteFeature('nose');
    document.getElementById('feat_m').onclick = _ => app.deleteFeature('mouth');
    window.onresize = () => app.resizeWindow();
    window.onwheel = (e) => {
        if (e.shiftKey) {
            app.addFeatureDrag(e.deltaY / 100);
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLHFEQUF1QyxDQUFDLDhDQUE4QztBQUN0RiwwQ0FBdUM7QUFDdkMsOENBQTJDO0FBQzNDLGdEQUE2QztBQUM3Qyx5RUFBc0U7QUFDdEUsNkNBQTBDO0FBQzFDLHlDQUFzQztBQUN0Qyx5Q0FBc0M7QUFDdEMsNkVBT3lDO0FBRXpDLGlEQUFtRDtBQUNuRCwyQ0FBMkM7QUFDM0MsbURBQStEO0FBRS9ELE1BQWEsR0FBRztJQWNaLFlBQVksU0FBaUI7UUFUckIsY0FBUyxHQUFxQyxFQUFFLENBQUM7UUFDakQsV0FBTSxHQUFhLElBQUksbUJBQVEsRUFBRSxDQUFDO1FBRXpCLFdBQU0sR0FBRztZQUN0QixXQUFXLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSwwQkFBYyxFQUFFLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBQztZQUM5RCxRQUFRLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUM7U0FDL0MsQ0FBQTtRQUNPLGlCQUFZLEdBQWtCLElBQUksQ0FBQztRQUd2QyxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksZUFBTSxDQUFDLGNBQWMsRUFBRSxHQUFHLEVBQUU7WUFDL0Msd0JBQXdCO1lBQ3hCLE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFzQixDQUFDO1lBQ3BFLE9BQU8sQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2RCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3hELENBQUMsQ0FB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