<script setup lang="ts">
import {useStore} from "vuex";
import {computed} from "vue";
import {ACTION, GETTER, MODULE} from "@/constants/VuexConstants";
import {NotificationColors, NotificationIcons} from "@/types/SimplifyTypes";
import {NOTIFICATION_TIMEOUT} from "@/constants/NotificationConstants";

const store = useStore();

const color = computed(() => store.getters[MODULE.NOTIFICATION + GETTER.NOTIFICATION.COLOR] as NotificationColors)
const icon = computed(() => store.getters[MODULE.NOTIFICATION + GETTER.NOTIFICATION.ICON] as NotificationIcons)
const show = computed(() => store.getters[MODULE.NOTIFICATION + GETTER.NOTIFICATION.SHOW] as boolean)
const text = computed(() => store.getters[MODULE.NOTIFICATION + GETTER.NOTIFICATION.TEXT] as string)

/**
 * Closes the notification dialog.
 */
const closeNotification = () => {
  store.dispatch(MODULE.NOTIFICATION + ACTION.NOTIFICATION.HIDE)
}
</script>

<template>
  <v-snackbar
    v-model="show"
    :color="color"
    :timeout="NOTIFICATION_TIMEOUT"
    style="cursor: pointer"
    location="top center"
    transition="slide-y-transition"
    @click="closeNotification"
  >
    <v-icon
      class="mr-2"
      :icon="icon"
    />
    {{ text }}
  </v-snackbar>
</template>
