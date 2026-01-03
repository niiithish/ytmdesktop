<script setup lang="ts">
import { onMounted, ref } from "vue";
import YTMViewLoading from "../../components/YTMViewLoading.vue";

const keyboardFocus = ref<HTMLElement>(null);
const keyboardFocusZero = ref<HTMLElement>(null);

const openSettingsWindow = window.ytmd.openSettingsWindow;

onMounted(() => {
  window.onfocus = () => {
    if (document.activeElement != keyboardFocusZero.value) {
      // This resets the focus of keyboard navigation
      keyboardFocusZero.value.focus();
      keyboardFocusZero.value.blur();
    }
  };

  keyboardFocus.value.onfocus = () => {
    window.ytmd.switchFocus("ytm");
  };

  window.ytmd.requestWindowState();
});
</script>

<template>
  <div ref="keyboardFocusZero" tabindex="0"></div>
  <!-- Floating Settings Button -->
  <div class="floating-settings">
    <button class="settings-button" title="Settings" @click="openSettingsWindow">
      <span class="material-symbols-outlined">settings</span>
    </button>
  </div>
  <Suspense>
    <YTMViewLoading />
  </Suspense>
  <div ref="keyboardFocus" tabindex="32767"></div>
</template>

<style scoped>
.floating-settings {
  position: fixed;
  top: 8px;
  right: 8px;
  z-index: 9999;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.floating-settings:hover {
  opacity: 1;
}

/* Show on parent hover - trigger area */
.floating-settings::before {
  content: "";
  position: absolute;
  top: -8px;
  right: -8px;
  width: 60px;
  height: 60px;
}

.settings-button {
  width: 36px;
  height: 36px;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.settings-button:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: scale(1.05);
}

.settings-button > .material-symbols-outlined {
  font-size: 20px;
  font-variation-settings:
    "FILL" 0,
    "wght" 300,
    "GRAD" 0,
    "opsz" 24;
}
</style>
