import {context} from "@/stores/store";
import {ACTION, GETTER, MUTATION} from "@/constants/VuexConstants";
import {NotificationColors, NotificationIcons} from "@/types/SimplifyTypes";
import {NOTIFICATION_COLORS, NOTIFICATION_ICONS, NOTIFICATION_TIMEOUT} from "@/constants/NotificationConstants";

export interface state {
  color: NotificationColors
  icon: NotificationIcons
  show: boolean,
  text: string
}

export const initialState = {
  color: NOTIFICATION_COLORS.SUCCESS,
  icon: NOTIFICATION_ICONS.SUCCESS,
  show: false,
  text: ''
} as state;

/**
 * Vuex notification store module.
 */
const notificationStoreModule = {
  namespaced: true,
  state: (): state => initialState,
  mutations: {
    /**
     * Sets the notification color.
     * @param state - The state to be mutated.
     * @param color - The color to be set.
     */
    [MUTATION.NOTIFICATION.SET_COLOR]: (state: state, color: NotificationColors): void => {
      state.color = color;
    },

    /**
     * Sets the notification icon.
     * @param state - The state to be mutated.
     * @param icon - The icon to be set.
     */
    [MUTATION.NOTIFICATION.SET_ICON]: (state: state, icon: NotificationIcons): void => {
      state.icon = icon;
    },

    /**
     * Sets the notification to false.
     * @param state - The state to be mutated.
     */
    [MUTATION.NOTIFICATION.SET_SHOW_FALSE]: (state: state): void => {
      state.show = false
    },

    /**
     * Sets the notification to true.
     * @param state - The state to be mutated.
     */
    [MUTATION.NOTIFICATION.SET_SHOW_TRUE]: (state: state): void => {
      state.show = true
    },

    /**
     * Sets the notification text.
     * @param state - The state to be mutated.
     * @param text - The text to be set.
     */
    [MUTATION.NOTIFICATION.SET_TEXT]: (state: state, text: string): void => {
      state.text = text;
    },
  },
  actions: {
    /**
     * Calls the mutation to hide.
     * @param context - The context to be commited.
     */
    [ACTION.NOTIFICATION.HIDE]: (context: context): void => {
      context.commit(MUTATION.NOTIFICATION.SET_SHOW_FALSE)
    },

    /**
     * Calls the mutation to show error.
     * @param context - The context to be commited.
     * @param text - The text to be shown.
     */
    [ACTION.NOTIFICATION.SHOW_ERROR]: (context: context, text: string): void => {
      context.commit(MUTATION.NOTIFICATION.SET_COLOR, NOTIFICATION_COLORS.ERROR)
      context.commit(MUTATION.NOTIFICATION.SET_ICON, NOTIFICATION_ICONS.ERROR)
      context.commit(MUTATION.NOTIFICATION.SET_SHOW_TRUE)
      context.commit(MUTATION.NOTIFICATION.SET_TEXT, text)


      setTimeout(() => {
        context.commit(MUTATION.NOTIFICATION.SET_SHOW_FALSE)
      }, NOTIFICATION_TIMEOUT)
    },

    /**
     * Calls the mutation to show success.
     * @param context - The context to be commited.
     * @param text - The text to be shown.
     */
    [ACTION.NOTIFICATION.SHOW_SUCCESS]: (context: context, text: string): void => {
      context.commit(MUTATION.NOTIFICATION.SET_COLOR, NOTIFICATION_COLORS.SUCCESS)
      context.commit(MUTATION.NOTIFICATION.SET_ICON, NOTIFICATION_ICONS.SUCCESS)
      context.commit(MUTATION.NOTIFICATION.SET_SHOW_TRUE)
      context.commit(MUTATION.NOTIFICATION.SET_TEXT, text)


      setTimeout(() => {
        context.commit(MUTATION.NOTIFICATION.SET_SHOW_FALSE)
      }, NOTIFICATION_TIMEOUT)
    },

    /**
     * Calls the mutation to show warning.
     * @param context - The context to be commited.
     * @param text - The text to be shown.
     */
    [ACTION.NOTIFICATION.SHOW_WARNING]: (context: context, text: string): void => {
      context.commit(MUTATION.NOTIFICATION.SET_COLOR, NOTIFICATION_COLORS.WARNING)
      context.commit(MUTATION.NOTIFICATION.SET_ICON, NOTIFICATION_ICONS.WARNING)
      context.commit(MUTATION.NOTIFICATION.SET_SHOW_TRUE)
      context.commit(MUTATION.NOTIFICATION.SET_TEXT, text)


      setTimeout(() => {
        context.commit(MUTATION.NOTIFICATION.SET_SHOW_FALSE)
      }, NOTIFICATION_TIMEOUT)
    },
  },
  getters: {
    /**
     * Gets the color state.
     * @param state - The state to be accessed.
     * @returns - The color state.
     */
    [GETTER.NOTIFICATION.COLOR]: (state: state) => {
      return state.color;
    },

    /**
     * Gets the icon state.
     * @param state - The state to be accessed.
     * @returns - The icon state.
     */
    [GETTER.NOTIFICATION.ICON]: (state: state) => {
      return state.icon;
    },

    /**
     * Gets the show state.
     * @param state - The state to be accessed.
     * @returns - The show state.
     */
    [GETTER.NOTIFICATION.SHOW]: (state: state) => {
      return state.show;
    },

    /**
     * Gets the text state.
     * @param state - The state to be accessed.
     * @returns - The text state.
     */
    [GETTER.NOTIFICATION.TEXT]: (state: state) => {
      return state.text;
    }
  }
}

export default notificationStoreModule;
