<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { Editor } from '@/Editors/Editor';
import { useAnnotationHistoryStore } from '@/stores/annotationHistoryStore';
import { useAnnotationToolStore } from '@/stores/annotationToolStore';
import { AnnotationTool } from '@/enums/annotationTool';
import { FaceMeshEditor } from '@/Editors/FaceMeshEditor';
import { BackgroundDrawer } from '@/Editors/BackgroundDrawer';

const annotationHistoryStore = useAnnotationHistoryStore();
const annotationToolStore = useAnnotationToolStore();

const editors = ref<Editor[]>([new BackgroundDrawer()]);
const canvas = ref<HTMLCanvasElement>();

onUnmounted(() => {
  // Cleanup - remove the event listener when component is unmounted
  window.removeEventListener('resize', onResize);
});

onMounted(() => {
  window.addEventListener('resize', onResize);
  if (!canvas.value) return;
  Editor.setCanvas(canvas.value);
  annotationToolStore.tools.forEach((tool) => {
    editors.value.push(fromTool(tool));
  });
  Editor.draw();
});

watch(
  () => annotationToolStore.tools,
  (value, oldValue) => {
    const added = new Set([...value].filter((tool) => !oldValue.has(tool)));
    const removed = new Set([...oldValue].filter((tool) => !value.has(tool)));

    editors.value.forEach((editor) => {
      if (!removed.has(editor.tool)) return;
      Editor.remove(editor);
    });
    editors.value = editors.value.filter((editor) => !removed.has(editor.tool));
    added.forEach((tool) => {
      editors.value.push(fromTool(tool));
    });
    Editor.draw();
    editors.value.forEach((editor) => {
      editor.onBackgroundLoaded();
    });
  },
  { deep: true }
);

watch(
  () => annotationHistoryStore.selectedHistory,
  async (value) => {
    if (!value) return;
    await Editor.setBackgroundSource(value.file);
    Editor.center();
    Editor.draw();
    editors.value.forEach((editor) => {
      editor.onBackgroundLoaded();
    });
  }
);

function fromTool(tool: AnnotationTool): Editor {
  switch (tool) {
    case AnnotationTool.FaceMesh:
      return new FaceMeshEditor();
    default:
      throw Error('unknown tool: ' + tool);
  }
}

function handleMouseDown(event: MouseEvent): void {
  editors.value.forEach((editor) => {
    editor.onMouseDown(event);
  });
}

function handleMouseMove(event: MouseEvent): void {
  if (!canvas.value) return;
  Editor.prevMouseX = Editor.mouseX;
  Editor.prevMouseY = Editor.mouseY;
  const canvasPosLeft = canvas.value.offsetLeft;
  const canvasPosTop = canvas.value.offsetTop;
  Editor.mouseX = event.clientX - canvasPosLeft;
  Editor.mouseY = event.clientY - canvasPosTop;
  const relativeMouseX = (Editor.mouseX - Editor.offsetX) / Editor.zoomScale;
  const relativeMouseY = (Editor.mouseY - Editor.offsetY) / Editor.zoomScale;
  if (Editor.isMoving) {
    canvas.value.style.cursor = 'pointer';
    Editor.draw();
    editors.value.forEach((editor) => {
      editor.onMove(relativeMouseX, relativeMouseY);
    });
  } else if (Editor.isPanning) {
    Editor.pan(Editor.mouseX - Editor.prevMouseX, Editor.mouseY - Editor.prevMouseY);
    Editor.draw();
    editors.value.forEach((editor) => {
      editor.onPan(relativeMouseX, relativeMouseY);
    });
  } else if (Editor.image) {
    editors.value.forEach((editor) => {
      editor.onMouseMove(event, relativeMouseX, relativeMouseY);
    });
  }
}

function handleMouseUp(e: MouseEvent): void {
  if (!canvas.value) return;

  // If the ware changes in the editor, call callback
  if (Editor.isMoving) {
    editors.value.forEach((editor) => {
      editor.onPointsEdited();
    });
  }
  canvas.value.style.cursor = 'default';
  Editor.isPanning = false;
  Editor.isMoving = false;
  editors.value.forEach((editor) => {
    editor.onMouseUp(e);
  });
}

function handleWheel(event: WheelEvent): void {
  if (Editor.image && !event.shiftKey) {
    Editor.zoom(event.deltaY > 0);
    Editor.draw();
    event.preventDefault();
  }
}

const onResize = () => {
  Editor.draw();
};
</script>

<template>
  <div class="w-70 border" id="canvas-div">
    <canvas
      id="canvas"
      ref="canvas"
      class=""
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @wheel="handleWheel"
      @mouseout="handleMouseUp"
    />
  </div>
</template>

<style scoped></style>
