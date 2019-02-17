import Config from "@/utils/config";

// action types
const SPIN_LOADING = "SPIN_LOADING";
const UPDATE_TOPATH = "UPDATE_TOPATH";
const UPDATE_ACCESSMENU = "UPDATE_ACCESSMENU";
const UPDATE_MODULE = "UPDATE_MODULE";
const SET_LOCAL = "SET_LOCAL";

const getItem = key => window.localStorage.getItem(key);
const setItem = (key, value) => window.localStorage.setItem(key, value);

//reducer
export default function(state, action) {
  if (!state) {
    state = {
      local: getItem(Config.localKey) || "zh",
      spinLoading: false,
      toPath: "/",
      currentModule: "", //当前模块
      accessMenu: [], //可访问的菜单,
      openAccessMenu: [], //展开的可访问的菜单(子级包含父级name)
      moduleList: [], //模块列表
      moduleMenu: [] //模块菜单
    };
  }
  switch (action.type) {
    case SPIN_LOADING:
      //全局loading
      return { ...state, spinLoading: action.spinLoading };
    case UPDATE_TOPATH:
      //登陆后跳转地址
      return { ...state, toPath: action.toPath };
    case UPDATE_ACCESSMENU:
      return {
        ...state,
        currentModule: action.currentModule,
        accessMenu: action.accessMenu,
        openAccessMenu: action.openAccessMenu,
        moduleMenu: action.moduleMenu,
        moduleList: action.moduleList
      };
    case UPDATE_MODULE:
      return {
        ...state,
        currentModule: action.currentModule,
        moduleMenu: action.moduleMenu
      };
    case SET_LOCAL:
      return {
        ...state,
        local: action.local
      };
    default:
      return state;
  }
}

// action creators
export const spinLoading = loading => {
  return { type: SPIN_LOADING, spinLoading: loading };
};

export const updateToPath = toPath => {
  return { type: UPDATE_TOPATH, toPath: toPath };
};

export const updateAccessMenu = data => {
  return { type: UPDATE_ACCESSMENU, ...data };
};

export const updateModule = module => {
  return { type: UPDATE_MODULE, ...module };
};

/**
 * 设置语言
 * @param local
 * @returns
 */
export const setLocal = local => {
  setItem(Config.localKey, local);
  return { type: SET_LOCAL, local: local };
};
