<script setup lang="ts">
import { ref, watch } from 'vue';
import { AnnotationTool } from '@/enums/annotationTool';
import { useAnnotationToolStore } from '@/stores/annotationToolStore';

const props = defineProps<{
  modelValue: boolean;
}>();
const emits = defineEmits<(e: 'update:modelValue', value: boolean) => void>();
const toolsStore = useAnnotationToolStore();

const { modelValue } = props;
const localOpen = ref(modelValue);

const toolsDesc = [
  {
    Tool: AnnotationTool.FaceMesh,
    Description: 'Annotates a face with landmarks',
    Active: toolsStore.tools.has(AnnotationTool.FaceMesh)
  }
];

function closeModal() {
  localOpen.value = false;
  emits('update:modelValue', localOpen.value);
}

// Only take action if the OK button was pushed
function onOkModal() {
  toolsDesc.forEach((tool) => {
    if (tool.Active) {
      toolsStore.tools.add(tool.Tool);
    } else {
      toolsStore.tools.delete(tool.Tool);
    }
  });
  closeModal();
}

function updateTools() {
  toolsDesc.forEach((tool) => {
    tool.Active = toolsStore.tools.has(tool.Tool);
  });
}

watch(
  () => props.modelValue,
  (newValue) => {
    localOpen.value = newValue;
  }
);

watch(localOpen, (newValue) => {
  emits('update:modelValue', newValue);
});
</script>

<template>
  <BModal v-model="localOpen" title="Model Selection" @ok="onOkModal" @show="updateTools">
    <div v-for="tool in toolsDesc" :key="tool.Tool" class="mb-2">
      <div class="d-flex justify-content-between">
        <div>
          <h3>
            {{ tool.Tool }}
          </h3>
        </div>
        <div>
          <BFormCheckbox :id="tool.Tool" size="lg" :switch="true" v-model="tool.Active" />
        </div>
      </div>
      {{ tool.Description }}
      <hr />
    </div>
  </BModal>
</template>

<style scoped></style>
