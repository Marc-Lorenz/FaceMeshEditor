import * as bootstrap from 'bootstrap'; // import statically - don't grab it from a cdn
import { Slider } from './view/slider';
import { CheckBox } from './view/checkbox';
import { Thumbnail } from './view/thumbnail';
import { FileAnnotationHistory } from './cache/fileAnnotationHistory';
import { Point2D } from './graph/point2d';
import { Editor2D } from './editor2d';
import { Graph } from './graph/graph';
import { FACE_FEATURE_LEFT_EYE, FACE_FEATURE_LEFT_EYEBROW, FACE_FEATURE_LIPS, FACE_FEATURE_NOSE, FACE_FEATURE_RIGHT_EYE, FACE_FEATURE_RIGHT_EYEBROW, } from './graph/face_landmarks_features';
import { MediapipeModel } from './model/mediapipe';
import { ModelType } from './model/models';
import { urlError, WebServiceModel } from './model/webservice';
export class App {
    featureDrag;
    viewTesselation;
    thumbnailGallery;
    numImages;
    fileCache = [];
    editor = new Editor2D();
    cacheSize;
    models = {
        mediapipe: { model: new MediapipeModel(), selected: true },
        custom: { model: null, selected: false },
    };
    selectedFile = null;
    constructor(cacheSize) {
        this.cacheSize = cacheSize;
        this.featureDrag = new Slider('feature_drag', () => {
            // TODO FIX Not working!
            const element = document.getElementById('num');
            element.value = this.featureDrag.getValue().toString();
            this.editor.dragDepth = this.featureDrag.getValue();
        });
        this.viewTesselation = new CheckBox('view_tesselation', () => (this.editor.showTesselation = this.viewTesselation.isChecked()));
        this.thumbnailGallery = document.getElementById('thumbnailgallery');
        this.numImages = document.getElementById('num_images');
        this.editor.setOnPointsEditedCallback((graph) => this.getSelectedFileHistory()?.add(graph));
        this.editor.setOnBackgroundLoadedCallback((_) => {
            if (this.getSelectedFileHistory()?.isEmpty()) {
                this.runDetection();
            }
            else {
                this.editor.graph = this.getSelectedFileHistory()?.get();
            }
        });
    }
    openImage() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/png, image/jpeg';
        input.multiple = true;
        input.onchange = () => {
            if (input.files) {
                const files = Array.from(input.files);
                for (const f of files) {
                    const history = new FileAnnotationHistory(f, this.cacheSize);
                    this.fileCache.push(history);
                    const thumbnail = new Thumbnail((filename) => this.selectThumbnail(filename));
                    thumbnail.setSource(f);
                    this.thumbnailGallery.appendChild(thumbnail.toHtml());
                    this.numImages.value =
                        this.thumbnailGallery.children.length.toString();
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
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json,application/json';
        input.onchange = () => {
            if (input.files && input.files.length > 0) {
                const annotationFile = input.files[0];
                const reader = new FileReader();
                reader.onload = (_) => {
                    const jsonString = (JSON.parse(reader.result));
                    for (const filename of Object.keys(jsonString)) {
                        const graph = Graph.fromJson(jsonString[filename], (id) => new Point2D(id, 0, 0, []));
                        const cache = this.fileCache.find((f) => f.file.name === filename);
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
            const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(jsonData);
            const a = document.createElement('a');
            a.href = dataStr;
            a.download = Date.now() + '_face_mesh_annotations.json';
            a.click();
        }
        return false;
    }
    undo() {
        this.getSelectedFileHistory()?.previous();
        this.editor.graph = this.getSelectedFileHistory()?.get();
        return false;
    }
    redo() {
        this.getSelectedFileHistory()?.next();
        this.editor.graph = this.getSelectedFileHistory()?.get();
        return false;
    }
    reset() {
        this.getSelectedFileHistory()?.clear();
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
            case ModelType.mediapipe: {
                btnMediapipe.checked = true;
                this.models.mediapipe.selected = true;
                break;
            }
            case ModelType.custom: {
                btnCustom.checked = true;
                this.models.custom.selected = true;
                const inputBox = $('#modelurl');
                const url = String(inputBox.val());
                WebServiceModel.verifyUrl(url).then((error) => {
                    const errorText = $('#urlErrorText');
                    if (error === null) {
                        this.models.custom.model = new WebServiceModel(url);
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
                            case urlError.InvalidUrl: {
                                errorText.removeAttr('hidden');
                                errorText.text('Please enter a valid URL!');
                                break;
                            }
                            case urlError.Unreachable: {
                                errorText.removeAttr('hidden');
                                errorText.text("The provided endpoint wasn't reachable!");
                                break;
                            }
                        }
                        // shake the input window
                        inputBox.addClass('wrongInput');
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
        this.getSelectedFileHistory()?.add(this.editor.graph);
        switch (feature) {
            case 'left_eye':
                this.deletePoints(FACE_FEATURE_LEFT_EYE);
                break;
            case 'left_eyebrow':
                this.deletePoints(FACE_FEATURE_LEFT_EYEBROW);
                break;
            case 'right_eye':
                this.deletePoints(FACE_FEATURE_RIGHT_EYE);
                break;
            case 'right_eyebrow':
                this.deletePoints(FACE_FEATURE_RIGHT_EYEBROW);
                break;
            case 'nose':
                this.deletePoints(FACE_FEATURE_NOSE);
                break;
            case 'mouth':
                this.deletePoints(FACE_FEATURE_LIPS);
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
        this.getModel()
            ?.detect(this.getSelectedFileHistory().file)
            .then((graph) => {
            this.getSelectedFileHistory()?.add(graph);
            this.editor.center();
            this.editor.graph = graph;
        });
    }
    getSelectedFileHistory() {
        return this.fileCache.find((c) => c.file.name === this.selectedFile);
    }
    deletePoints(pointIds) {
        const graph = this.getSelectedFileHistory()?.get();
        if (graph) {
            for (const id of pointIds) {
                graph.getById(id).deleted = true;
            }
            this.editor.graph = graph;
        }
    }
}
// #####################################################################################################################
// INITIAL
// #####################################################################################################################
window.onload = (_) => {
    const elements = document.querySelectorAll('[aria-keyshortcuts]');
    elements.forEach((elem) => {
        elem.style.cssText = 'width: 100%; text-align: start; padding: .2vw;';
        const keys = elem.ariaKeyShortcuts
            .split('+')
            .map((k) => k
            .replace('Control', 'CTRL')
            .replace('Shift', 'SHIFT')
            .replace('Wheel', 'SCROLL'));
        if (elem.ariaKeyShortcuts.length > 0) {
            const table = document.createElement('table');
            table.style.cssText = 'width: 100%';
            const row = document.createElement('tr');
            table.appendChild(row);
            const menuTextCol = document.createElement('td');
            menuTextCol.innerHTML = elem.innerHTML;
            row.appendChild(menuTextCol);
            const menuShortCutCol = document.createElement('td');
            menuShortCutCol.style.cssText = 'text-align: end;';
            menuShortCutCol.innerHTML = keys
                .map((k) => '<kbd>' + k + '</kbd>')
                .join('+');
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
    document.getElementById('btnModelMediapipe').onclick = () => app.setModel(ModelType.mediapipe);
    document.getElementById('btnCloseModal').onclick = () => app.setModel(ModelType.mediapipe);
    document.getElementById('btnCancelModal').onclick = () => app.setModel(ModelType.mediapipe);
    document.getElementById('btnSaveCustomModel').onclick = () => app.setModel(ModelType.custom);
    document.getElementById('feat_le').onclick = (_) => app.deleteFeature('left_eye');
    document.getElementById('feat_leb').onclick = (_) => app.deleteFeature('left_eyebrow');
    document.getElementById('feat_re').onclick = (_) => app.deleteFeature('right_eye');
    document.getElementById('feat_reb').onclick = (_) => app.deleteFeature('right_eyebrow');
    document.getElementById('feat_n').onclick = (_) => app.deleteFeature('nose');
    document.getElementById('feat_m').onclick = (_) => app.deleteFeature('mouth');
    window.onresize = () => app.resizeWindow();
    window.onwheel = (e) => {
        if (e.shiftKey) {
            app.addFeatureDrag(e.deltaY / 100);
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEtBQUssU0FBUyxNQUFNLFdBQVcsQ0FBQyxDQUFDLCtDQUErQztBQUN2RixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDN0MsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDdEUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDdEMsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN0QyxPQUFPLEVBQ0wscUJBQXFCLEVBQ3JCLHlCQUF5QixFQUN6QixpQkFBaUIsRUFDakIsaUJBQWlCLEVBQ2pCLHNCQUFzQixFQUN0QiwwQkFBMEIsR0FDM0IsTUFBTSxpQ0FBaUMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxRQUFRLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFL0QsTUFBTSxPQUFPLEdBQUc7SUFDTixXQUFXLENBQVM7SUFDcEIsZUFBZSxDQUFXO0lBQzFCLGdCQUFnQixDQUFpQjtJQUNqQyxTQUFTLENBQW9CO0lBQzdCLFNBQVMsR0FBcUMsRUFBRSxDQUFDO0lBQ2pELE1BQU0sR0FBYSxJQUFJLFFBQVEsRUFBRSxDQUFDO0lBQ3pCLFNBQVMsQ0FBUztJQUNsQixNQUFNLEdBQUc7UUFDeEIsU0FBUyxFQUFFLEVBQUUsS0FB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