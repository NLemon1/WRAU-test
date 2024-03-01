(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // node_modules/a11y-accordion-tabs/a11y-accordion-tabs.js
  var require_a11y_accordion_tabs = __commonJS({
    "node_modules/a11y-accordion-tabs/a11y-accordion-tabs.js"(exports, module) {
      (function() {
        "use strict";
        function AccordionTabs2(el, options) {
          if (!el) {
            return;
          }
          this.el = el;
          this.tabTriggers = this.el.getElementsByClassName("js-tabs-trigger");
          this.tabPanels = this.el.getElementsByClassName("js-tabs-panel");
          this.accordionTriggers = this.el.getElementsByClassName("js-accordion-trigger");
          this.options = this._extend({
            breakpoint: 640,
            tabsAllowed: true,
            selectedTab: 0,
            startCollapsed: false
          }, options);
          if (el.getAttribute("data-tabs-allowed") == "true") {
            this.options.tabsAllowed = true;
          } else if (el.getAttribute("data-tabs-allowed") == "false") {
            this.options.tabsAllowed = false;
          }
          if (el.getAttribute("data-breakpoint")) {
            this.options.breakpoint = parseInt(el.getAttribute("data-breakpoint"));
          }
          if (el.getAttribute("data-selected-tab")) {
            this.options.selectedTab = parseInt(el.getAttribute("data-selected-tab"));
          }
          if (el.getAttribute("data-start-collapsed") == "true") {
            this.options.startCollapsed = true;
          } else if (el.getAttribute("data-start-collapsed") == "false") {
            this.options.startCollapsed = false;
          }
          if (this.tabTriggers.length === 0 || this.tabTriggers.length !== this.tabPanels.length) {
            return;
          }
          this._init();
        }
        AccordionTabs2.prototype._init = function() {
          var _this = this;
          this.tabTriggersLength = this.tabTriggers.length;
          this.accordionTriggersLength = this.accordionTriggers.length;
          this.selectedTab = 0;
          this.prevSelectedTab = null;
          this.clickListener = this._clickEvent.bind(this);
          this.keydownListener = this._keydownEvent.bind(this);
          this.keys = {
            prev: 37,
            next: 39,
            space: 32,
            enter: 13
          };
          if (window.innerWidth >= this.options.breakpoint && this.options.tabsAllowed) {
            this.isAccordion = false;
          } else {
            this.isAccordion = true;
          }
          for (var i = 0; i < this.tabTriggersLength; i++) {
            this.tabTriggers[i].index = i;
            this.tabTriggers[i].addEventListener("click", this.clickListener, false);
            this.tabTriggers[i].addEventListener("keydown", this.keydownListener, false);
            if (this.tabTriggers[i].classList.contains("is-selected")) {
              this.selectedTab = i;
            }
            this._hide(i);
          }
          for (var i = 0; i < this.accordionTriggersLength; i++) {
            this.accordionTriggers[i].index = i;
            this.accordionTriggers[i].addEventListener("click", this.clickListener, false);
            this.accordionTriggers[i].addEventListener("keydown", this.keydownListener, false);
            if (this.accordionTriggers[i].classList.contains("is-selected")) {
              this.selectedTab = i;
            }
          }
          if (!isNaN(this.options.selectedTab)) {
            this.selectedTab = this.options.selectedTab < this.tabTriggersLength ? this.options.selectedTab : this.tabTriggersLength - 1;
          }
          this.el.classList.add("is-initialized");
          if (this.options.tabsAllowed) {
            this.el.classList.add("tabs-allowed");
          }
          if (!this.options.startCollapsed || !this.isAccordion) {
            this.selectTab(this.selectedTab, false);
          }
          var resizeTabs = this._debounce(function() {
            if (window.innerWidth >= _this.options.breakpoint && _this.options.tabsAllowed) {
              _this.isAccordion = false;
              if (_this.options.tabsAllowed) {
                _this.el.classList.add("tabs-allowed");
              }
              _this.selectTab(_this.selectedTab);
            } else {
              _this.isAccordion = true;
              _this.el.classList.remove("tabs-allowed");
              if (!_this.options.startCollapsed) {
                _this.selectTab(_this.selectedTab);
              }
            }
          }, 50);
          window.addEventListener("resize", resizeTabs);
        };
        AccordionTabs2.prototype._clickEvent = function(e) {
          e.preventDefault();
          var closestTrigger = this._getClosest(e.target, ".js-tabs-trigger");
          var closestTab = 0;
          if (closestTrigger == null) {
            closestTrigger = this._getClosest(e.target, ".js-accordion-trigger");
            closestTab = this._getClosest(closestTrigger, ".js-tabs-panel");
            this.isAccordion = true;
          } else {
            this.isAccordion = false;
          }
          var targetIndex = e.target.index != null ? e.target.index : closestTab.index;
          if (targetIndex === this.selectedTab && !this.isAccordion) {
            return;
          }
          this.selectTab(targetIndex, true);
        };
        AccordionTabs2.prototype._keydownEvent = function(e) {
          var targetIndex;
          if (e.keyCode === this.keys.prev || e.keyCode === this.keys.next || e.keyCode === this.keys.space || e.keyCode === this.keys.enter) {
            e.preventDefault();
          } else {
            return;
          }
          if (e.keyCode === this.keys.prev && e.target.index > 0 && !this.isAccordion) {
            targetIndex = e.target.index - 1;
          } else if (e.keyCode === this.keys.next && e.target.index < this.tabTriggersLength - 1 && !this.isAccordion) {
            targetIndex = e.target.index + 1;
          } else if (e.keyCode === this.keys.space || e.keyCode === this.keys.enter) {
            targetIndex = e.target.index;
          } else {
            return;
          }
          this.selectTab(targetIndex, true);
        };
        AccordionTabs2.prototype._show = function(index, userInvoked) {
          this.tabPanels[index].removeAttribute("tabindex");
          this.tabTriggers[index].removeAttribute("tabindex");
          this.tabTriggers[index].classList.add("is-selected");
          this.tabTriggers[index].setAttribute("aria-selected", true);
          this.accordionTriggers[index].setAttribute("aria-expanded", true);
          var panelContent = this.tabPanels[index].getElementsByClassName("content")[0];
          panelContent.setAttribute("aria-hidden", false);
          panelContent.classList.remove("is-hidden");
          panelContent.classList.add("is-open");
          this.tabPanels[index].classList.remove("is-hidden");
          this.tabPanels[index].classList.add("is-open");
          if (userInvoked) {
            this.tabTriggers[index].focus();
          }
        };
        AccordionTabs2.prototype._hide = function(index) {
          this.tabTriggers[index].classList.remove("is-selected");
          this.tabTriggers[index].setAttribute("aria-selected", false);
          this.tabTriggers[index].setAttribute("tabindex", -1);
          this.accordionTriggers[index].setAttribute("aria-expanded", false);
          var panelContent = this.tabPanels[index].getElementsByClassName("content")[0];
          panelContent.setAttribute("aria-hidden", true);
          panelContent.classList.remove("is-open");
          panelContent.classList.add("is-hidden");
          this.tabPanels[index].classList.remove("is-open");
          this.tabPanels[index].classList.add("is-hidden");
          this.tabPanels[index].setAttribute("tabindex", -1);
        };
        AccordionTabs2.prototype.selectTab = function(index, userInvoked) {
          if (index === null) {
            if (this.isAccordion) {
              return;
            } else {
              index = 0;
            }
          }
          if (!this.tabPanels[index].classList.contains("is-hidden") && userInvoked) {
            if (index === this.selectedTab) {
              this.selectedTab = null;
            } else {
              this.selectedTab = null;
              this.prevSelectedTab = index;
            }
            this._hide(index);
            return;
          }
          if (this.isAccordion) {
            this.prevSelectedTab = this.selectedTab;
            this.selectedTab = index;
          } else {
            if (this.prevSelectedTab === null || !this.isAccordion) {
              for (var i = 0; i < this.tabTriggersLength; i++) {
                if (i !== index) {
                  this._hide(i);
                }
              }
            } else {
              this._hide(this.selectedTab);
            }
            this.prevSelectedTab = this.selectedTab;
            this.selectedTab = index;
          }
          this._show(this.selectedTab, userInvoked);
        };
        AccordionTabs2.prototype.destroy = function() {
          for (var i = 0; i < this.tabTriggersLength; i++) {
            this.tabTriggers[i].classList.remove("is-selected");
            this.tabTriggers[i].removeAttribute("aria-selected");
            this.tabTriggers[i].removeAttribute("tabindex");
            this.tabPanels[i].classList.remove("is-hidden");
            this.tabPanels[i].removeAttribute("aria-hidden");
            this.tabPanels[i].removeAttribute("tabindex");
            this.tabTriggers[i].removeEventListener("click", this.clickListener, false);
            this.tabTriggers[i].removeEventListener("keydown", this.keydownListener, false);
            delete this.tabTriggers[i].index;
          }
          this.el.classList.remove("is-initialized");
        };
        AccordionTabs2.prototype._getClosest = function(elem, selector) {
          if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function(s) {
              var matches = (this.document || this.ownerDocument).querySelectorAll(s), i = matches.length;
              while (--i >= 0 && matches.item(i) !== this) {
              }
              return i > -1;
            };
          }
          for (; elem && elem !== document; elem = elem.parentNode) {
            if (elem.matches(selector))
              return elem;
          }
          return null;
        };
        AccordionTabs2.prototype._extend = function() {
          var extended = {};
          var deep = false;
          var i = 0;
          var length = arguments.length;
          if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
            deep = arguments[0];
            i++;
          }
          var merge = function(obj2) {
            for (var prop in obj2) {
              if (Object.prototype.hasOwnProperty.call(obj2, prop)) {
                if (deep && Object.prototype.toString.call(obj2[prop]) === "[object Object]") {
                  extended[prop] = extend(true, extended[prop], obj2[prop]);
                } else {
                  extended[prop] = obj2[prop];
                }
              }
            }
          };
          for (; i < length; i++) {
            var obj = arguments[i];
            merge(obj);
          }
          return extended;
        };
        AccordionTabs2.prototype._debounce = function(func, wait, immediate) {
          var timeout;
          return function() {
            var context = this, args = arguments;
            var later = function() {
              timeout = null;
              if (!immediate) {
                func.apply(context, args);
              }
              ;
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) {
              func.apply(context, args);
            }
            ;
          };
        };
        var slice = Array.prototype.slice;
        function $(expr, con) {
          return typeof expr === "string" ? (con || document).querySelector(expr) : expr || null;
        }
        function $$(expr, con) {
          return slice.call((con || document).querySelectorAll(expr));
        }
        function init() {
          $$(".js-tabs").forEach(function(input) {
            new AccordionTabs2(input);
          });
        }
        if (typeof Document !== "undefined") {
          if (document.readyState !== "loading") {
            init();
          } else {
            document.addEventListener("DOMContentLoaded", init);
          }
        }
        if (typeof self !== "undefined") {
          self.AccordionTabs = AccordionTabs2;
        }
        if (typeof module === "object" && module.exports) {
          module.exports = AccordionTabs2;
        }
        return AccordionTabs2;
      })();
    }
  });

  // wwwroot/js/src/components/expandable-text-cards.js
  var expandableTextCards = () => {
    const cards = document.querySelectorAll(".js-expandable-text-card");
    cards.forEach((card) => {
      const open = card.querySelector(".js-expandable-text-card__open");
      const close = card.querySelector(".js-expandable-text-card__close");
      const overlay = card.querySelector(".js-expandable-text-card__overlay");
      open.addEventListener("click", () => {
        overlay.classList.add("is-active");
        open.ariaExpanded = true;
        overlay.ariaHidden = false;
      });
      close.addEventListener("click", () => {
        overlay.classList.remove("is-active");
        open.ariaExpanded = false;
        overlay.ariaHidden = true;
      });
    });
  };
  var expandable_text_cards_default = expandableTextCards;

  // wwwroot/js/src/components/header.js
  var header = () => {
    const headerSearchOverlay = document.querySelector(".js-header__search-overlay");
    const headerSearchOverlayOpeners = document.querySelectorAll(".js-header__search-overlay-toggle");
    const headerSearchOverlayClose = document.querySelector(".js-header__search-overlay-close");
    const headerSearchInput = document.getElementById("header-search-input");
    const siteMain = document.querySelector(".js-site-main");
    const header2 = document.querySelector(".js-header");
    const offsetHeight = 120;
    let tempOpener = "";
    const killOverlay = () => {
      headerSearchOverlay.classList.remove("is-open");
      headerSearchOverlay.setAttribute("aria-hidden", "true");
      tempOpener.classList.remove("is-open");
      tempOpener.setAttribute("aria-expanded", "false");
      headerSearchInput.blur();
    };
    const initOverlay = (openBtn) => {
      headerSearchOverlay.classList.add("is-open");
      headerSearchOverlay.setAttribute("aria-hidden", "false");
      openBtn.classList.add("is-open");
      openBtn.setAttribute("aria-expanded", "true");
      tempOpener = openBtn;
      headerSearchInput.focus();
    };
    if (headerSearchOverlay) {
      headerSearchOverlayOpeners.forEach((headerSearchOverlayOpener) => {
        headerSearchOverlayOpener.addEventListener("click", (e) => {
          if (headerSearchOverlay.classList.contains("is-open")) {
            killOverlay();
          } else {
            initOverlay(headerSearchOverlayOpener);
          }
          e.preventDefault();
        });
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && headerSearchOverlay.classList.contains("is-open")) {
          killOverlay();
        }
      });
      headerSearchOverlayClose.addEventListener("click", (e) => {
        killOverlay(tempOpener);
        e.preventDefault();
      });
    }
    if (header2) {
      if (header2.classList.contains("site-header--show-on-scroll-up")) {
        let scrollPos = 0;
        window.addEventListener("scroll", () => {
          const { top } = document.body.getBoundingClientRect();
          const isSticky = header2.classList.contains("position-sticky");
          const handleScrollTop = () => {
            header2.classList.add("site-header--top");
            header2.classList.remove("position-sticky");
          };
          const handleScrollUp = () => {
            if (!isSticky) {
              header2.classList.add("position-sticky");
            }
          };
          const handleScrollDown = () => {
            header2.classList.remove("site-header--top");
            if (isSticky) {
              window.setTimeout(() => {
                window.setTimeout(() => {
                  header2.classList.remove("position-sticky");
                }, 250);
              });
            }
          };
          if (!siteMain.classList.contains("has-overlay")) {
            if (top >= offsetHeight) {
              handleScrollTop();
            } else if (top > scrollPos) {
              handleScrollUp();
            } else {
              handleScrollDown();
            }
          }
          scrollPos = top;
        });
      } else if (header2.classList.contains("position-sticky")) {
        window.addEventListener("scroll", () => {
          const { top } = document.body.getBoundingClientRect();
          if (top >= offsetHeight) {
            header2.classList.add("site-header--top");
          } else {
            header2.classList.remove("site-header--top");
          }
        });
      }
    }
  };
  var header_default = header;

  // wwwroot/js/src/components/nav.js
  var nav = () => {
    const header2 = document.querySelector(".site-header");
    const main = document.querySelector(".js-site-main");
    const navItems = document.querySelectorAll(".js-nav-item");
    const navSubMenus = document.querySelectorAll(".js-nav-sub-menu");
    const navSubMenuClose = document.querySelectorAll(".js-sub-menu-close");
    const navToggle = document.querySelector(".js-nav-toggle");
    const navMobileItems = document.querySelectorAll(".js-nav-mobile-item");
    const navMobileSubMenus = document.querySelectorAll(".js-nav-mobile-sub-menu");
    const navMobileSubMenuClose = document.querySelectorAll(".js-sub-menu-mobile-back");
    const darkness = (show) => {
      if (show) {
        main.classList.add("has-overlay");
      } else {
        main.classList.remove("has-overlay");
      }
    };
    const closeMenu = (clearNavItems, clearSubNavItems) => {
      clearNavItems.forEach((clearNavItem) => {
        clearNavItem.setAttribute("aria-selected", "false");
      });
      clearSubNavItems.forEach((clearSubNavItem) => {
        clearSubNavItem.classList.add("is-hidden");
      });
      darkness(false);
    };
    if (navItems) {
      navItems.forEach((navItem) => {
        navItem.addEventListener("click", (e) => {
          closeMenu(navItems, navSubMenus);
          navItem.setAttribute("aria-selected", "true");
          const getTargetId = navItem.getAttribute("aria-controls"), targetPanel = document.getElementById(getTargetId);
          targetPanel.classList.remove("is-hidden");
          darkness(true);
        });
        navItem.addEventListener("click", (e) => {
          e.preventDefault();
        });
      });
      navSubMenuClose.forEach((close) => {
        close.addEventListener("click", (e) => {
          e.preventDefault();
          darkness(false);
          closeMenu(navItems, navSubMenus);
        });
      });
      header2.addEventListener("click", (e) => {
        const isSubNavItem = e.target.closest(".js-nav-sub-menu") == null;
        const isNavItem = e.target.classList.contains("js-nav-item");
        if (isSubNavItem) {
          if (!isNavItem) {
            closeMenu(navItems, navSubMenus);
            darkness(false);
          }
        }
      });
      main.addEventListener("click", (e) => {
        closeMenu(navItems, navSubMenus);
        darkness(false);
      });
    }
    if (navMobileItems) {
      navMobileItems.forEach((navMobileItem) => {
        navMobileItem.addEventListener("click", (e) => {
          navMobileItem.setAttribute("aria-selected", "true");
          const getTargetId = navMobileItem.getAttribute("aria-controls"), targetPanel = document.getElementById(getTargetId);
          targetPanel.classList.remove("is-hidden");
        });
      });
      navMobileSubMenuClose.forEach((navMobileClose) => {
        navMobileClose.addEventListener("click", (e) => {
          e.preventDefault();
          closeMenu(navMobileItems, navMobileSubMenus);
        });
      });
    }
    if (navToggle) {
      const nav2 = document.getElementById(navToggle.getAttribute("aria-controls"));
      const openNav = () => {
        nav2.ariaHidden = false;
        navToggle.ariaExpanded = true;
        document.documentElement.classList.add("has-open-nav");
      };
      const closeNav = () => {
        nav2.ariaHidden = true;
        navToggle.ariaExpanded = false;
        document.documentElement.classList.remove("has-open-nav");
        closeMenu(navMobileItems, navMobileSubMenus);
      };
      navToggle.addEventListener("click", () => {
        if (navToggle.ariaExpanded === "true") {
          closeNav();
        } else {
          openNav();
        }
      });
    }
    document.onkeydown = function(e) {
      if (e.key == "Escape") {
        closeMenu(navItems, navSubMenus);
      }
    };
  };
  var nav_default = nav;

  // node_modules/swiper/shared/ssr-window.esm.mjs
  function isObject(obj) {
    return obj !== null && typeof obj === "object" && "constructor" in obj && obj.constructor === Object;
  }
  function extend2(target, src) {
    if (target === void 0) {
      target = {};
    }
    if (src === void 0) {
      src = {};
    }
    Object.keys(src).forEach((key) => {
      if (typeof target[key] === "undefined")
        target[key] = src[key];
      else if (isObject(src[key]) && isObject(target[key]) && Object.keys(src[key]).length > 0) {
        extend2(target[key], src[key]);
      }
    });
  }
  var ssrDocument = {
    body: {},
    addEventListener() {
    },
    removeEventListener() {
    },
    activeElement: {
      blur() {
      },
      nodeName: ""
    },
    querySelector() {
      return null;
    },
    querySelectorAll() {
      return [];
    },
    getElementById() {
      return null;
    },
    createEvent() {
      return {
        initEvent() {
        }
      };
    },
    createElement() {
      return {
        children: [],
        childNodes: [],
        style: {},
        setAttribute() {
        },
        getElementsByTagName() {
          return [];
        }
      };
    },
    createElementNS() {
      return {};
    },
    importNode() {
      return null;
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    }
  };
  function getDocument() {
    const doc = typeof document !== "undefined" ? document : {};
    extend2(doc, ssrDocument);
    return doc;
  }
  var ssrWindow = {
    document: ssrDocument,
    navigator: {
      userAgent: ""
    },
    location: {
      hash: "",
      host: "",
      hostname: "",
      href: "",
      origin: "",
      pathname: "",
      protocol: "",
      search: ""
    },
    history: {
      replaceState() {
      },
      pushState() {
      },
      go() {
      },
      back() {
      }
    },
    CustomEvent: function CustomEvent2() {
      return this;
    },
    addEventListener() {
    },
    removeEventListener() {
    },
    getComputedStyle() {
      return {
        getPropertyValue() {
          return "";
        }
      };
    },
    Image() {
    },
    Date() {
    },
    screen: {},
    setTimeout() {
    },
    clearTimeout() {
    },
    matchMedia() {
      return {};
    },
    requestAnimationFrame(callback) {
      if (typeof setTimeout === "undefined") {
        callback();
        return null;
      }
      return setTimeout(callback, 0);
    },
    cancelAnimationFrame(id) {
      if (typeof setTimeout === "undefined") {
        return;
      }
      clearTimeout(id);
    }
  };
  function getWindow() {
    const win = typeof window !== "undefined" ? window : {};
    extend2(win, ssrWindow);
    return win;
  }

  // node_modules/swiper/shared/utils.mjs
  function classesToTokens(classes2) {
    if (classes2 === void 0) {
      classes2 = "";
    }
    return classes2.trim().split(" ").filter((c) => !!c.trim());
  }
  function deleteProps(obj) {
    const object = obj;
    Object.keys(object).forEach((key) => {
      try {
        object[key] = null;
      } catch (e) {
      }
      try {
        delete object[key];
      } catch (e) {
      }
    });
  }
  function nextTick(callback, delay) {
    if (delay === void 0) {
      delay = 0;
    }
    return setTimeout(callback, delay);
  }
  function now() {
    return Date.now();
  }
  function getComputedStyle2(el) {
    const window2 = getWindow();
    let style;
    if (window2.getComputedStyle) {
      style = window2.getComputedStyle(el, null);
    }
    if (!style && el.currentStyle) {
      style = el.currentStyle;
    }
    if (!style) {
      style = el.style;
    }
    return style;
  }
  function getTranslate(el, axis) {
    if (axis === void 0) {
      axis = "x";
    }
    const window2 = getWindow();
    let matrix;
    let curTransform;
    let transformMatrix;
    const curStyle = getComputedStyle2(el);
    if (window2.WebKitCSSMatrix) {
      curTransform = curStyle.transform || curStyle.webkitTransform;
      if (curTransform.split(",").length > 6) {
        curTransform = curTransform.split(", ").map((a) => a.replace(",", ".")).join(", ");
      }
      transformMatrix = new window2.WebKitCSSMatrix(curTransform === "none" ? "" : curTransform);
    } else {
      transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform || curStyle.transform || curStyle.getPropertyValue("transform").replace("translate(", "matrix(1, 0, 0, 1,");
      matrix = transformMatrix.toString().split(",");
    }
    if (axis === "x") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m41;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[12]);
      else
        curTransform = parseFloat(matrix[4]);
    }
    if (axis === "y") {
      if (window2.WebKitCSSMatrix)
        curTransform = transformMatrix.m42;
      else if (matrix.length === 16)
        curTransform = parseFloat(matrix[13]);
      else
        curTransform = parseFloat(matrix[5]);
    }
    return curTransform || 0;
  }
  function isObject2(o) {
    return typeof o === "object" && o !== null && o.constructor && Object.prototype.toString.call(o).slice(8, -1) === "Object";
  }
  function isNode(node) {
    if (typeof window !== "undefined" && typeof window.HTMLElement !== "undefined") {
      return node instanceof HTMLElement;
    }
    return node && (node.nodeType === 1 || node.nodeType === 11);
  }
  function extend3() {
    const to = Object(arguments.length <= 0 ? void 0 : arguments[0]);
    const noExtend = ["__proto__", "constructor", "prototype"];
    for (let i = 1; i < arguments.length; i += 1) {
      const nextSource = i < 0 || arguments.length <= i ? void 0 : arguments[i];
      if (nextSource !== void 0 && nextSource !== null && !isNode(nextSource)) {
        const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);
        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
          const nextKey = keysArray[nextIndex];
          const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
          if (desc !== void 0 && desc.enumerable) {
            if (isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend3(to[nextKey], nextSource[nextKey]);
              }
            } else if (!isObject2(to[nextKey]) && isObject2(nextSource[nextKey])) {
              to[nextKey] = {};
              if (nextSource[nextKey].__swiper__) {
                to[nextKey] = nextSource[nextKey];
              } else {
                extend3(to[nextKey], nextSource[nextKey]);
              }
            } else {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
    }
    return to;
  }
  function setCSSProperty(el, varName, varValue) {
    el.style.setProperty(varName, varValue);
  }
  function animateCSSModeScroll(_ref) {
    let {
      swiper: swiper2,
      targetPosition,
      side
    } = _ref;
    const window2 = getWindow();
    const startPosition = -swiper2.translate;
    let startTime = null;
    let time;
    const duration = swiper2.params.speed;
    swiper2.wrapperEl.style.scrollSnapType = "none";
    window2.cancelAnimationFrame(swiper2.cssModeFrameID);
    const dir = targetPosition > startPosition ? "next" : "prev";
    const isOutOfBound = (current, target) => {
      return dir === "next" && current >= target || dir === "prev" && current <= target;
    };
    const animate = () => {
      time = (/* @__PURE__ */ new Date()).getTime();
      if (startTime === null) {
        startTime = time;
      }
      const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
      const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
      let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);
      if (isOutOfBound(currentPosition, targetPosition)) {
        currentPosition = targetPosition;
      }
      swiper2.wrapperEl.scrollTo({
        [side]: currentPosition
      });
      if (isOutOfBound(currentPosition, targetPosition)) {
        swiper2.wrapperEl.style.overflow = "hidden";
        swiper2.wrapperEl.style.scrollSnapType = "";
        setTimeout(() => {
          swiper2.wrapperEl.style.overflow = "";
          swiper2.wrapperEl.scrollTo({
            [side]: currentPosition
          });
        });
        window2.cancelAnimationFrame(swiper2.cssModeFrameID);
        return;
      }
      swiper2.cssModeFrameID = window2.requestAnimationFrame(animate);
    };
    animate();
  }
  function getSlideTransformEl(slideEl) {
    return slideEl.querySelector(".swiper-slide-transform") || slideEl.shadowRoot && slideEl.shadowRoot.querySelector(".swiper-slide-transform") || slideEl;
  }
  function elementChildren(element, selector) {
    if (selector === void 0) {
      selector = "";
    }
    return [...element.children].filter((el) => el.matches(selector));
  }
  function showWarning(text) {
    try {
      console.warn(text);
      return;
    } catch (err) {
    }
  }
  function createElement(tag, classes2) {
    if (classes2 === void 0) {
      classes2 = [];
    }
    const el = document.createElement(tag);
    el.classList.add(...Array.isArray(classes2) ? classes2 : classesToTokens(classes2));
    return el;
  }
  function elementOffset(el) {
    const window2 = getWindow();
    const document2 = getDocument();
    const box = el.getBoundingClientRect();
    const body = document2.body;
    const clientTop = el.clientTop || body.clientTop || 0;
    const clientLeft = el.clientLeft || body.clientLeft || 0;
    const scrollTop = el === window2 ? window2.scrollY : el.scrollTop;
    const scrollLeft = el === window2 ? window2.scrollX : el.scrollLeft;
    return {
      top: box.top + scrollTop - clientTop,
      left: box.left + scrollLeft - clientLeft
    };
  }
  function elementPrevAll(el, selector) {
    const prevEls = [];
    while (el.previousElementSibling) {
      const prev = el.previousElementSibling;
      if (selector) {
        if (prev.matches(selector))
          prevEls.push(prev);
      } else
        prevEls.push(prev);
      el = prev;
    }
    return prevEls;
  }
  function elementNextAll(el, selector) {
    const nextEls = [];
    while (el.nextElementSibling) {
      const next = el.nextElementSibling;
      if (selector) {
        if (next.matches(selector))
          nextEls.push(next);
      } else
        nextEls.push(next);
      el = next;
    }
    return nextEls;
  }
  function elementStyle(el, prop) {
    const window2 = getWindow();
    return window2.getComputedStyle(el, null).getPropertyValue(prop);
  }
  function elementIndex(el) {
    let child = el;
    let i;
    if (child) {
      i = 0;
      while ((child = child.previousSibling) !== null) {
        if (child.nodeType === 1)
          i += 1;
      }
      return i;
    }
    return void 0;
  }
  function elementParents(el, selector) {
    const parents = [];
    let parent = el.parentElement;
    while (parent) {
      if (selector) {
        if (parent.matches(selector))
          parents.push(parent);
      } else {
        parents.push(parent);
      }
      parent = parent.parentElement;
    }
    return parents;
  }
  function elementTransitionEnd(el, callback) {
    function fireCallBack(e) {
      if (e.target !== el)
        return;
      callback.call(el, e);
      el.removeEventListener("transitionend", fireCallBack);
    }
    if (callback) {
      el.addEventListener("transitionend", fireCallBack);
    }
  }
  function elementOuterSize(el, size, includeMargins) {
    const window2 = getWindow();
    if (includeMargins) {
      return el[size === "width" ? "offsetWidth" : "offsetHeight"] + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-right" : "margin-top")) + parseFloat(window2.getComputedStyle(el, null).getPropertyValue(size === "width" ? "margin-left" : "margin-bottom"));
    }
    return el.offsetWidth;
  }

  // node_modules/swiper/shared/swiper-core.mjs
  var support;
  function calcSupport() {
    const window2 = getWindow();
    const document2 = getDocument();
    return {
      smoothScroll: document2.documentElement && document2.documentElement.style && "scrollBehavior" in document2.documentElement.style,
      touch: !!("ontouchstart" in window2 || window2.DocumentTouch && document2 instanceof window2.DocumentTouch)
    };
  }
  function getSupport() {
    if (!support) {
      support = calcSupport();
    }
    return support;
  }
  var deviceCached;
  function calcDevice(_temp) {
    let {
      userAgent
    } = _temp === void 0 ? {} : _temp;
    const support2 = getSupport();
    const window2 = getWindow();
    const platform = window2.navigator.platform;
    const ua = userAgent || window2.navigator.userAgent;
    const device = {
      ios: false,
      android: false
    };
    const screenWidth = window2.screen.width;
    const screenHeight = window2.screen.height;
    const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
    let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
    const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
    const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
    const windows = platform === "Win32";
    let macos = platform === "MacIntel";
    const iPadScreens = ["1024x1366", "1366x1024", "834x1194", "1194x834", "834x1112", "1112x834", "768x1024", "1024x768", "820x1180", "1180x820", "810x1080", "1080x810"];
    if (!ipad && macos && support2.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
      ipad = ua.match(/(Version)\/([\d.]+)/);
      if (!ipad)
        ipad = [0, 1, "13_0_0"];
      macos = false;
    }
    if (android && !windows) {
      device.os = "android";
      device.android = true;
    }
    if (ipad || iphone || ipod) {
      device.os = "ios";
      device.ios = true;
    }
    return device;
  }
  function getDevice(overrides) {
    if (overrides === void 0) {
      overrides = {};
    }
    if (!deviceCached) {
      deviceCached = calcDevice(overrides);
    }
    return deviceCached;
  }
  var browser;
  function calcBrowser() {
    const window2 = getWindow();
    let needPerspectiveFix = false;
    function isSafari() {
      const ua = window2.navigator.userAgent.toLowerCase();
      return ua.indexOf("safari") >= 0 && ua.indexOf("chrome") < 0 && ua.indexOf("android") < 0;
    }
    if (isSafari()) {
      const ua = String(window2.navigator.userAgent);
      if (ua.includes("Version/")) {
        const [major, minor] = ua.split("Version/")[1].split(" ")[0].split(".").map((num) => Number(num));
        needPerspectiveFix = major < 16 || major === 16 && minor < 2;
      }
    }
    return {
      isSafari: needPerspectiveFix || isSafari(),
      needPerspectiveFix,
      isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window2.navigator.userAgent)
    };
  }
  function getBrowser() {
    if (!browser) {
      browser = calcBrowser();
    }
    return browser;
  }
  function Resize(_ref) {
    let {
      swiper: swiper2,
      on,
      emit
    } = _ref;
    const window2 = getWindow();
    let observer = null;
    let animationFrame = null;
    const resizeHandler = () => {
      if (!swiper2 || swiper2.destroyed || !swiper2.initialized)
        return;
      emit("beforeResize");
      emit("resize");
    };
    const createObserver = () => {
      if (!swiper2 || swiper2.destroyed || !swiper2.initialized)
        return;
      observer = new ResizeObserver((entries) => {
        animationFrame = window2.requestAnimationFrame(() => {
          const {
            width,
            height
          } = swiper2;
          let newWidth = width;
          let newHeight = height;
          entries.forEach((_ref2) => {
            let {
              contentBoxSize,
              contentRect,
              target
            } = _ref2;
            if (target && target !== swiper2.el)
              return;
            newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
            newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
          });
          if (newWidth !== width || newHeight !== height) {
            resizeHandler();
          }
        });
      });
      observer.observe(swiper2.el);
    };
    const removeObserver = () => {
      if (animationFrame) {
        window2.cancelAnimationFrame(animationFrame);
      }
      if (observer && observer.unobserve && swiper2.el) {
        observer.unobserve(swiper2.el);
        observer = null;
      }
    };
    const orientationChangeHandler = () => {
      if (!swiper2 || swiper2.destroyed || !swiper2.initialized)
        return;
      emit("orientationchange");
    };
    on("init", () => {
      if (swiper2.params.resizeObserver && typeof window2.ResizeObserver !== "undefined") {
        createObserver();
        return;
      }
      window2.addEventListener("resize", resizeHandler);
      window2.addEventListener("orientationchange", orientationChangeHandler);
    });
    on("destroy", () => {
      removeObserver();
      window2.removeEventListener("resize", resizeHandler);
      window2.removeEventListener("orientationchange", orientationChangeHandler);
    });
  }
  function Observer(_ref) {
    let {
      swiper: swiper2,
      extendParams,
      on,
      emit
    } = _ref;
    const observers = [];
    const window2 = getWindow();
    const attach = function(target, options) {
      if (options === void 0) {
        options = {};
      }
      const ObserverFunc = window2.MutationObserver || window2.WebkitMutationObserver;
      const observer = new ObserverFunc((mutations) => {
        if (swiper2.__preventObserver__)
          return;
        if (mutations.length === 1) {
          emit("observerUpdate", mutations[0]);
          return;
        }
        const observerUpdate = function observerUpdate2() {
          emit("observerUpdate", mutations[0]);
        };
        if (window2.requestAnimationFrame) {
          window2.requestAnimationFrame(observerUpdate);
        } else {
          window2.setTimeout(observerUpdate, 0);
        }
      });
      observer.observe(target, {
        attributes: typeof options.attributes === "undefined" ? true : options.attributes,
        childList: typeof options.childList === "undefined" ? true : options.childList,
        characterData: typeof options.characterData === "undefined" ? true : options.characterData
      });
      observers.push(observer);
    };
    const init = () => {
      if (!swiper2.params.observer)
        return;
      if (swiper2.params.observeParents) {
        const containerParents = elementParents(swiper2.hostEl);
        for (let i = 0; i < containerParents.length; i += 1) {
          attach(containerParents[i]);
        }
      }
      attach(swiper2.hostEl, {
        childList: swiper2.params.observeSlideChildren
      });
      attach(swiper2.wrapperEl, {
        attributes: false
      });
    };
    const destroy = () => {
      observers.forEach((observer) => {
        observer.disconnect();
      });
      observers.splice(0, observers.length);
    };
    extendParams({
      observer: false,
      observeParents: false,
      observeSlideChildren: false
    });
    on("init", init);
    on("destroy", destroy);
  }
  var eventsEmitter = {
    on(events2, handler, priority) {
      const self2 = this;
      if (!self2.eventsListeners || self2.destroyed)
        return self2;
      if (typeof handler !== "function")
        return self2;
      const method = priority ? "unshift" : "push";
      events2.split(" ").forEach((event2) => {
        if (!self2.eventsListeners[event2])
          self2.eventsListeners[event2] = [];
        self2.eventsListeners[event2][method](handler);
      });
      return self2;
    },
    once(events2, handler, priority) {
      const self2 = this;
      if (!self2.eventsListeners || self2.destroyed)
        return self2;
      if (typeof handler !== "function")
        return self2;
      function onceHandler() {
        self2.off(events2, onceHandler);
        if (onceHandler.__emitterProxy) {
          delete onceHandler.__emitterProxy;
        }
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        handler.apply(self2, args);
      }
      onceHandler.__emitterProxy = handler;
      return self2.on(events2, onceHandler, priority);
    },
    onAny(handler, priority) {
      const self2 = this;
      if (!self2.eventsListeners || self2.destroyed)
        return self2;
      if (typeof handler !== "function")
        return self2;
      const method = priority ? "unshift" : "push";
      if (self2.eventsAnyListeners.indexOf(handler) < 0) {
        self2.eventsAnyListeners[method](handler);
      }
      return self2;
    },
    offAny(handler) {
      const self2 = this;
      if (!self2.eventsListeners || self2.destroyed)
        return self2;
      if (!self2.eventsAnyListeners)
        return self2;
      const index = self2.eventsAnyListeners.indexOf(handler);
      if (index >= 0) {
        self2.eventsAnyListeners.splice(index, 1);
      }
      return self2;
    },
    off(events2, handler) {
      const self2 = this;
      if (!self2.eventsListeners || self2.destroyed)
        return self2;
      if (!self2.eventsListeners)
        return self2;
      events2.split(" ").forEach((event2) => {
        if (typeof handler === "undefined") {
          self2.eventsListeners[event2] = [];
        } else if (self2.eventsListeners[event2]) {
          self2.eventsListeners[event2].forEach((eventHandler, index) => {
            if (eventHandler === handler || eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler) {
              self2.eventsListeners[event2].splice(index, 1);
            }
          });
        }
      });
      return self2;
    },
    emit() {
      const self2 = this;
      if (!self2.eventsListeners || self2.destroyed)
        return self2;
      if (!self2.eventsListeners)
        return self2;
      let events2;
      let data;
      let context;
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      if (typeof args[0] === "string" || Array.isArray(args[0])) {
        events2 = args[0];
        data = args.slice(1, args.length);
        context = self2;
      } else {
        events2 = args[0].events;
        data = args[0].data;
        context = args[0].context || self2;
      }
      data.unshift(context);
      const eventsArray = Array.isArray(events2) ? events2 : events2.split(" ");
      eventsArray.forEach((event2) => {
        if (self2.eventsAnyListeners && self2.eventsAnyListeners.length) {
          self2.eventsAnyListeners.forEach((eventHandler) => {
            eventHandler.apply(context, [event2, ...data]);
          });
        }
        if (self2.eventsListeners && self2.eventsListeners[event2]) {
          self2.eventsListeners[event2].forEach((eventHandler) => {
            eventHandler.apply(context, data);
          });
        }
      });
      return self2;
    }
  };
  function updateSize() {
    const swiper2 = this;
    let width;
    let height;
    const el = swiper2.el;
    if (typeof swiper2.params.width !== "undefined" && swiper2.params.width !== null) {
      width = swiper2.params.width;
    } else {
      width = el.clientWidth;
    }
    if (typeof swiper2.params.height !== "undefined" && swiper2.params.height !== null) {
      height = swiper2.params.height;
    } else {
      height = el.clientHeight;
    }
    if (width === 0 && swiper2.isHorizontal() || height === 0 && swiper2.isVertical()) {
      return;
    }
    width = width - parseInt(elementStyle(el, "padding-left") || 0, 10) - parseInt(elementStyle(el, "padding-right") || 0, 10);
    height = height - parseInt(elementStyle(el, "padding-top") || 0, 10) - parseInt(elementStyle(el, "padding-bottom") || 0, 10);
    if (Number.isNaN(width))
      width = 0;
    if (Number.isNaN(height))
      height = 0;
    Object.assign(swiper2, {
      width,
      height,
      size: swiper2.isHorizontal() ? width : height
    });
  }
  function updateSlides() {
    const swiper2 = this;
    function getDirectionPropertyValue(node, label) {
      return parseFloat(node.getPropertyValue(swiper2.getDirectionLabel(label)) || 0);
    }
    const params = swiper2.params;
    const {
      wrapperEl,
      slidesEl,
      size: swiperSize,
      rtlTranslate: rtl,
      wrongRTL
    } = swiper2;
    const isVirtual = swiper2.virtual && params.virtual.enabled;
    const previousSlidesLength = isVirtual ? swiper2.virtual.slides.length : swiper2.slides.length;
    const slides = elementChildren(slidesEl, `.${swiper2.params.slideClass}, swiper-slide`);
    const slidesLength = isVirtual ? swiper2.virtual.slides.length : slides.length;
    let snapGrid = [];
    const slidesGrid = [];
    const slidesSizesGrid = [];
    let offsetBefore = params.slidesOffsetBefore;
    if (typeof offsetBefore === "function") {
      offsetBefore = params.slidesOffsetBefore.call(swiper2);
    }
    let offsetAfter = params.slidesOffsetAfter;
    if (typeof offsetAfter === "function") {
      offsetAfter = params.slidesOffsetAfter.call(swiper2);
    }
    const previousSnapGridLength = swiper2.snapGrid.length;
    const previousSlidesGridLength = swiper2.slidesGrid.length;
    let spaceBetween = params.spaceBetween;
    let slidePosition = -offsetBefore;
    let prevSlideSize = 0;
    let index = 0;
    if (typeof swiperSize === "undefined") {
      return;
    }
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiperSize;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    swiper2.virtualSize = -spaceBetween;
    slides.forEach((slideEl) => {
      if (rtl) {
        slideEl.style.marginLeft = "";
      } else {
        slideEl.style.marginRight = "";
      }
      slideEl.style.marginBottom = "";
      slideEl.style.marginTop = "";
    });
    if (params.centeredSlides && params.cssMode) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", "");
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", "");
    }
    const gridEnabled = params.grid && params.grid.rows > 1 && swiper2.grid;
    if (gridEnabled) {
      swiper2.grid.initSlides(slides);
    } else if (swiper2.grid) {
      swiper2.grid.unsetSlides();
    }
    let slideSize;
    const shouldResetSlideSize = params.slidesPerView === "auto" && params.breakpoints && Object.keys(params.breakpoints).filter((key) => {
      return typeof params.breakpoints[key].slidesPerView !== "undefined";
    }).length > 0;
    for (let i = 0; i < slidesLength; i += 1) {
      slideSize = 0;
      let slide2;
      if (slides[i])
        slide2 = slides[i];
      if (gridEnabled) {
        swiper2.grid.updateSlide(i, slide2, slides);
      }
      if (slides[i] && elementStyle(slide2, "display") === "none")
        continue;
      if (params.slidesPerView === "auto") {
        if (shouldResetSlideSize) {
          slides[i].style[swiper2.getDirectionLabel("width")] = ``;
        }
        const slideStyles = getComputedStyle(slide2);
        const currentTransform = slide2.style.transform;
        const currentWebKitTransform = slide2.style.webkitTransform;
        if (currentTransform) {
          slide2.style.transform = "none";
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = "none";
        }
        if (params.roundLengths) {
          slideSize = swiper2.isHorizontal() ? elementOuterSize(slide2, "width", true) : elementOuterSize(slide2, "height", true);
        } else {
          const width = getDirectionPropertyValue(slideStyles, "width");
          const paddingLeft = getDirectionPropertyValue(slideStyles, "padding-left");
          const paddingRight = getDirectionPropertyValue(slideStyles, "padding-right");
          const marginLeft = getDirectionPropertyValue(slideStyles, "margin-left");
          const marginRight = getDirectionPropertyValue(slideStyles, "margin-right");
          const boxSizing = slideStyles.getPropertyValue("box-sizing");
          if (boxSizing && boxSizing === "border-box") {
            slideSize = width + marginLeft + marginRight;
          } else {
            const {
              clientWidth,
              offsetWidth
            } = slide2;
            slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
          }
        }
        if (currentTransform) {
          slide2.style.transform = currentTransform;
        }
        if (currentWebKitTransform) {
          slide2.style.webkitTransform = currentWebKitTransform;
        }
        if (params.roundLengths)
          slideSize = Math.floor(slideSize);
      } else {
        slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
        if (params.roundLengths)
          slideSize = Math.floor(slideSize);
        if (slides[i]) {
          slides[i].style[swiper2.getDirectionLabel("width")] = `${slideSize}px`;
        }
      }
      if (slides[i]) {
        slides[i].swiperSlideSize = slideSize;
      }
      slidesSizesGrid.push(slideSize);
      if (params.centeredSlides) {
        slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
        if (prevSlideSize === 0 && i !== 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (i === 0)
          slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
        if (Math.abs(slidePosition) < 1 / 1e3)
          slidePosition = 0;
        if (params.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if (index % params.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
      } else {
        if (params.roundLengths)
          slidePosition = Math.floor(slidePosition);
        if ((index - Math.min(swiper2.params.slidesPerGroupSkip, index)) % swiper2.params.slidesPerGroup === 0)
          snapGrid.push(slidePosition);
        slidesGrid.push(slidePosition);
        slidePosition = slidePosition + slideSize + spaceBetween;
      }
      swiper2.virtualSize += slideSize + spaceBetween;
      prevSlideSize = slideSize;
      index += 1;
    }
    swiper2.virtualSize = Math.max(swiper2.virtualSize, swiperSize) + offsetAfter;
    if (rtl && wrongRTL && (params.effect === "slide" || params.effect === "coverflow")) {
      wrapperEl.style.width = `${swiper2.virtualSize + spaceBetween}px`;
    }
    if (params.setWrapperSize) {
      wrapperEl.style[swiper2.getDirectionLabel("width")] = `${swiper2.virtualSize + spaceBetween}px`;
    }
    if (gridEnabled) {
      swiper2.grid.updateWrapperSize(slideSize, snapGrid);
    }
    if (!params.centeredSlides) {
      const newSlidesGrid = [];
      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (params.roundLengths)
          slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] <= swiper2.virtualSize - swiperSize) {
          newSlidesGrid.push(slidesGridItem);
        }
      }
      snapGrid = newSlidesGrid;
      if (Math.floor(swiper2.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
        snapGrid.push(swiper2.virtualSize - swiperSize);
      }
    }
    if (isVirtual && params.loop) {
      const size = slidesSizesGrid[0] + spaceBetween;
      if (params.slidesPerGroup > 1) {
        const groups = Math.ceil((swiper2.virtual.slidesBefore + swiper2.virtual.slidesAfter) / params.slidesPerGroup);
        const groupSize = size * params.slidesPerGroup;
        for (let i = 0; i < groups; i += 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + groupSize);
        }
      }
      for (let i = 0; i < swiper2.virtual.slidesBefore + swiper2.virtual.slidesAfter; i += 1) {
        if (params.slidesPerGroup === 1) {
          snapGrid.push(snapGrid[snapGrid.length - 1] + size);
        }
        slidesGrid.push(slidesGrid[slidesGrid.length - 1] + size);
        swiper2.virtualSize += size;
      }
    }
    if (snapGrid.length === 0)
      snapGrid = [0];
    if (spaceBetween !== 0) {
      const key = swiper2.isHorizontal() && rtl ? "marginLeft" : swiper2.getDirectionLabel("marginRight");
      slides.filter((_, slideIndex) => {
        if (!params.cssMode || params.loop)
          return true;
        if (slideIndex === slides.length - 1) {
          return false;
        }
        return true;
      }).forEach((slideEl) => {
        slideEl.style[key] = `${spaceBetween}px`;
      });
    }
    if (params.centeredSlides && params.centeredSlidesBounds) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      const maxSnap = allSlidesSize - swiperSize;
      snapGrid = snapGrid.map((snap) => {
        if (snap <= 0)
          return -offsetBefore;
        if (snap > maxSnap)
          return maxSnap + offsetAfter;
        return snap;
      });
    }
    if (params.centerInsufficientSlides) {
      let allSlidesSize = 0;
      slidesSizesGrid.forEach((slideSizeValue) => {
        allSlidesSize += slideSizeValue + (spaceBetween || 0);
      });
      allSlidesSize -= spaceBetween;
      if (allSlidesSize < swiperSize) {
        const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
        snapGrid.forEach((snap, snapIndex) => {
          snapGrid[snapIndex] = snap - allSlidesOffset;
        });
        slidesGrid.forEach((snap, snapIndex) => {
          slidesGrid[snapIndex] = snap + allSlidesOffset;
        });
      }
    }
    Object.assign(swiper2, {
      slides,
      snapGrid,
      slidesGrid,
      slidesSizesGrid
    });
    if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
      setCSSProperty(wrapperEl, "--swiper-centered-offset-before", `${-snapGrid[0]}px`);
      setCSSProperty(wrapperEl, "--swiper-centered-offset-after", `${swiper2.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`);
      const addToSnapGrid = -swiper2.snapGrid[0];
      const addToSlidesGrid = -swiper2.slidesGrid[0];
      swiper2.snapGrid = swiper2.snapGrid.map((v) => v + addToSnapGrid);
      swiper2.slidesGrid = swiper2.slidesGrid.map((v) => v + addToSlidesGrid);
    }
    if (slidesLength !== previousSlidesLength) {
      swiper2.emit("slidesLengthChange");
    }
    if (snapGrid.length !== previousSnapGridLength) {
      if (swiper2.params.watchOverflow)
        swiper2.checkOverflow();
      swiper2.emit("snapGridLengthChange");
    }
    if (slidesGrid.length !== previousSlidesGridLength) {
      swiper2.emit("slidesGridLengthChange");
    }
    if (params.watchSlidesProgress) {
      swiper2.updateSlidesOffset();
    }
    if (!isVirtual && !params.cssMode && (params.effect === "slide" || params.effect === "fade")) {
      const backFaceHiddenClass = `${params.containerModifierClass}backface-hidden`;
      const hasClassBackfaceClassAdded = swiper2.el.classList.contains(backFaceHiddenClass);
      if (slidesLength <= params.maxBackfaceHiddenSlides) {
        if (!hasClassBackfaceClassAdded)
          swiper2.el.classList.add(backFaceHiddenClass);
      } else if (hasClassBackfaceClassAdded) {
        swiper2.el.classList.remove(backFaceHiddenClass);
      }
    }
  }
  function updateAutoHeight(speed) {
    const swiper2 = this;
    const activeSlides = [];
    const isVirtual = swiper2.virtual && swiper2.params.virtual.enabled;
    let newHeight = 0;
    let i;
    if (typeof speed === "number") {
      swiper2.setTransition(speed);
    } else if (speed === true) {
      swiper2.setTransition(swiper2.params.speed);
    }
    const getSlideByIndex = (index) => {
      if (isVirtual) {
        return swiper2.slides[swiper2.getSlideIndexByData(index)];
      }
      return swiper2.slides[index];
    };
    if (swiper2.params.slidesPerView !== "auto" && swiper2.params.slidesPerView > 1) {
      if (swiper2.params.centeredSlides) {
        (swiper2.visibleSlides || []).forEach((slide2) => {
          activeSlides.push(slide2);
        });
      } else {
        for (i = 0; i < Math.ceil(swiper2.params.slidesPerView); i += 1) {
          const index = swiper2.activeIndex + i;
          if (index > swiper2.slides.length && !isVirtual)
            break;
          activeSlides.push(getSlideByIndex(index));
        }
      }
    } else {
      activeSlides.push(getSlideByIndex(swiper2.activeIndex));
    }
    for (i = 0; i < activeSlides.length; i += 1) {
      if (typeof activeSlides[i] !== "undefined") {
        const height = activeSlides[i].offsetHeight;
        newHeight = height > newHeight ? height : newHeight;
      }
    }
    if (newHeight || newHeight === 0)
      swiper2.wrapperEl.style.height = `${newHeight}px`;
  }
  function updateSlidesOffset() {
    const swiper2 = this;
    const slides = swiper2.slides;
    const minusOffset = swiper2.isElement ? swiper2.isHorizontal() ? swiper2.wrapperEl.offsetLeft : swiper2.wrapperEl.offsetTop : 0;
    for (let i = 0; i < slides.length; i += 1) {
      slides[i].swiperSlideOffset = (swiper2.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop) - minusOffset - swiper2.cssOverflowAdjustment();
    }
  }
  function updateSlidesProgress(translate2) {
    if (translate2 === void 0) {
      translate2 = this && this.translate || 0;
    }
    const swiper2 = this;
    const params = swiper2.params;
    const {
      slides,
      rtlTranslate: rtl,
      snapGrid
    } = swiper2;
    if (slides.length === 0)
      return;
    if (typeof slides[0].swiperSlideOffset === "undefined")
      swiper2.updateSlidesOffset();
    let offsetCenter = -translate2;
    if (rtl)
      offsetCenter = translate2;
    slides.forEach((slideEl) => {
      slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass);
    });
    swiper2.visibleSlidesIndexes = [];
    swiper2.visibleSlides = [];
    let spaceBetween = params.spaceBetween;
    if (typeof spaceBetween === "string" && spaceBetween.indexOf("%") >= 0) {
      spaceBetween = parseFloat(spaceBetween.replace("%", "")) / 100 * swiper2.size;
    } else if (typeof spaceBetween === "string") {
      spaceBetween = parseFloat(spaceBetween);
    }
    for (let i = 0; i < slides.length; i += 1) {
      const slide2 = slides[i];
      let slideOffset = slide2.swiperSlideOffset;
      if (params.cssMode && params.centeredSlides) {
        slideOffset -= slides[0].swiperSlideOffset;
      }
      const slideProgress = (offsetCenter + (params.centeredSlides ? swiper2.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const originalSlideProgress = (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper2.minTranslate() : 0) - slideOffset) / (slide2.swiperSlideSize + spaceBetween);
      const slideBefore = -(offsetCenter - slideOffset);
      const slideAfter = slideBefore + swiper2.slidesSizesGrid[i];
      const isFullyVisible = slideBefore >= 0 && slideBefore <= swiper2.size - swiper2.slidesSizesGrid[i];
      const isVisible = slideBefore >= 0 && slideBefore < swiper2.size - 1 || slideAfter > 1 && slideAfter <= swiper2.size || slideBefore <= 0 && slideAfter >= swiper2.size;
      if (isVisible) {
        swiper2.visibleSlides.push(slide2);
        swiper2.visibleSlidesIndexes.push(i);
        slides[i].classList.add(params.slideVisibleClass);
      }
      if (isFullyVisible) {
        slides[i].classList.add(params.slideFullyVisibleClass);
      }
      slide2.progress = rtl ? -slideProgress : slideProgress;
      slide2.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
    }
  }
  function updateProgress(translate2) {
    const swiper2 = this;
    if (typeof translate2 === "undefined") {
      const multiplier = swiper2.rtlTranslate ? -1 : 1;
      translate2 = swiper2 && swiper2.translate && swiper2.translate * multiplier || 0;
    }
    const params = swiper2.params;
    const translatesDiff = swiper2.maxTranslate() - swiper2.minTranslate();
    let {
      progress,
      isBeginning,
      isEnd,
      progressLoop
    } = swiper2;
    const wasBeginning = isBeginning;
    const wasEnd = isEnd;
    if (translatesDiff === 0) {
      progress = 0;
      isBeginning = true;
      isEnd = true;
    } else {
      progress = (translate2 - swiper2.minTranslate()) / translatesDiff;
      const isBeginningRounded = Math.abs(translate2 - swiper2.minTranslate()) < 1;
      const isEndRounded = Math.abs(translate2 - swiper2.maxTranslate()) < 1;
      isBeginning = isBeginningRounded || progress <= 0;
      isEnd = isEndRounded || progress >= 1;
      if (isBeginningRounded)
        progress = 0;
      if (isEndRounded)
        progress = 1;
    }
    if (params.loop) {
      const firstSlideIndex = swiper2.getSlideIndexByData(0);
      const lastSlideIndex = swiper2.getSlideIndexByData(swiper2.slides.length - 1);
      const firstSlideTranslate = swiper2.slidesGrid[firstSlideIndex];
      const lastSlideTranslate = swiper2.slidesGrid[lastSlideIndex];
      const translateMax = swiper2.slidesGrid[swiper2.slidesGrid.length - 1];
      const translateAbs = Math.abs(translate2);
      if (translateAbs >= firstSlideTranslate) {
        progressLoop = (translateAbs - firstSlideTranslate) / translateMax;
      } else {
        progressLoop = (translateAbs + translateMax - lastSlideTranslate) / translateMax;
      }
      if (progressLoop > 1)
        progressLoop -= 1;
    }
    Object.assign(swiper2, {
      progress,
      progressLoop,
      isBeginning,
      isEnd
    });
    if (params.watchSlidesProgress || params.centeredSlides && params.autoHeight)
      swiper2.updateSlidesProgress(translate2);
    if (isBeginning && !wasBeginning) {
      swiper2.emit("reachBeginning toEdge");
    }
    if (isEnd && !wasEnd) {
      swiper2.emit("reachEnd toEdge");
    }
    if (wasBeginning && !isBeginning || wasEnd && !isEnd) {
      swiper2.emit("fromEdge");
    }
    swiper2.emit("progress", progress);
  }
  function updateSlidesClasses() {
    const swiper2 = this;
    const {
      slides,
      params,
      slidesEl,
      activeIndex
    } = swiper2;
    const isVirtual = swiper2.virtual && params.virtual.enabled;
    const gridEnabled = swiper2.grid && params.grid && params.grid.rows > 1;
    const getFilteredSlide = (selector) => {
      return elementChildren(slidesEl, `.${params.slideClass}${selector}, swiper-slide${selector}`)[0];
    };
    slides.forEach((slideEl) => {
      slideEl.classList.remove(params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
    });
    let activeSlide;
    let prevSlide;
    let nextSlide;
    if (isVirtual) {
      if (params.loop) {
        let slideIndex = activeIndex - swiper2.virtual.slidesBefore;
        if (slideIndex < 0)
          slideIndex = swiper2.virtual.slides.length + slideIndex;
        if (slideIndex >= swiper2.virtual.slides.length)
          slideIndex -= swiper2.virtual.slides.length;
        activeSlide = getFilteredSlide(`[data-swiper-slide-index="${slideIndex}"]`);
      } else {
        activeSlide = getFilteredSlide(`[data-swiper-slide-index="${activeIndex}"]`);
      }
    } else {
      if (gridEnabled) {
        activeSlide = slides.filter((slideEl) => slideEl.column === activeIndex)[0];
        nextSlide = slides.filter((slideEl) => slideEl.column === activeIndex + 1)[0];
        prevSlide = slides.filter((slideEl) => slideEl.column === activeIndex - 1)[0];
      } else {
        activeSlide = slides[activeIndex];
      }
    }
    if (activeSlide) {
      activeSlide.classList.add(params.slideActiveClass);
      if (gridEnabled) {
        if (nextSlide) {
          nextSlide.classList.add(params.slideNextClass);
        }
        if (prevSlide) {
          prevSlide.classList.add(params.slidePrevClass);
        }
      } else {
        nextSlide = elementNextAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
        if (params.loop && !nextSlide) {
          nextSlide = slides[0];
        }
        if (nextSlide) {
          nextSlide.classList.add(params.slideNextClass);
        }
        prevSlide = elementPrevAll(activeSlide, `.${params.slideClass}, swiper-slide`)[0];
        if (params.loop && !prevSlide === 0) {
          prevSlide = slides[slides.length - 1];
        }
        if (prevSlide) {
          prevSlide.classList.add(params.slidePrevClass);
        }
      }
    }
    swiper2.emitSlidesClasses();
  }
  var processLazyPreloader = (swiper2, imageEl) => {
    if (!swiper2 || swiper2.destroyed || !swiper2.params)
      return;
    const slideSelector = () => swiper2.isElement ? `swiper-slide` : `.${swiper2.params.slideClass}`;
    const slideEl = imageEl.closest(slideSelector());
    if (slideEl) {
      let lazyEl = slideEl.querySelector(`.${swiper2.params.lazyPreloaderClass}`);
      if (!lazyEl && swiper2.isElement) {
        if (slideEl.shadowRoot) {
          lazyEl = slideEl.shadowRoot.querySelector(`.${swiper2.params.lazyPreloaderClass}`);
        } else {
          requestAnimationFrame(() => {
            if (slideEl.shadowRoot) {
              lazyEl = slideEl.shadowRoot.querySelector(`.${swiper2.params.lazyPreloaderClass}`);
              if (lazyEl)
                lazyEl.remove();
            }
          });
        }
      }
      if (lazyEl)
        lazyEl.remove();
    }
  };
  var unlazy = (swiper2, index) => {
    if (!swiper2.slides[index])
      return;
    const imageEl = swiper2.slides[index].querySelector('[loading="lazy"]');
    if (imageEl)
      imageEl.removeAttribute("loading");
  };
  var preload = (swiper2) => {
    if (!swiper2 || swiper2.destroyed || !swiper2.params)
      return;
    let amount = swiper2.params.lazyPreloadPrevNext;
    const len = swiper2.slides.length;
    if (!len || !amount || amount < 0)
      return;
    amount = Math.min(amount, len);
    const slidesPerView = swiper2.params.slidesPerView === "auto" ? swiper2.slidesPerViewDynamic() : Math.ceil(swiper2.params.slidesPerView);
    const activeIndex = swiper2.activeIndex;
    if (swiper2.params.grid && swiper2.params.grid.rows > 1) {
      const activeColumn = activeIndex;
      const preloadColumns = [activeColumn - amount];
      preloadColumns.push(...Array.from({
        length: amount
      }).map((_, i) => {
        return activeColumn + slidesPerView + i;
      }));
      swiper2.slides.forEach((slideEl, i) => {
        if (preloadColumns.includes(slideEl.column))
          unlazy(swiper2, i);
      });
      return;
    }
    const slideIndexLastInView = activeIndex + slidesPerView - 1;
    if (swiper2.params.rewind || swiper2.params.loop) {
      for (let i = activeIndex - amount; i <= slideIndexLastInView + amount; i += 1) {
        const realIndex = (i % len + len) % len;
        if (realIndex < activeIndex || realIndex > slideIndexLastInView)
          unlazy(swiper2, realIndex);
      }
    } else {
      for (let i = Math.max(activeIndex - amount, 0); i <= Math.min(slideIndexLastInView + amount, len - 1); i += 1) {
        if (i !== activeIndex && (i > slideIndexLastInView || i < activeIndex)) {
          unlazy(swiper2, i);
        }
      }
    }
  };
  function getActiveIndexByTranslate(swiper2) {
    const {
      slidesGrid,
      params
    } = swiper2;
    const translate2 = swiper2.rtlTranslate ? swiper2.translate : -swiper2.translate;
    let activeIndex;
    for (let i = 0; i < slidesGrid.length; i += 1) {
      if (typeof slidesGrid[i + 1] !== "undefined") {
        if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
          activeIndex = i;
        } else if (translate2 >= slidesGrid[i] && translate2 < slidesGrid[i + 1]) {
          activeIndex = i + 1;
        }
      } else if (translate2 >= slidesGrid[i]) {
        activeIndex = i;
      }
    }
    if (params.normalizeSlideIndex) {
      if (activeIndex < 0 || typeof activeIndex === "undefined")
        activeIndex = 0;
    }
    return activeIndex;
  }
  function updateActiveIndex(newActiveIndex) {
    const swiper2 = this;
    const translate2 = swiper2.rtlTranslate ? swiper2.translate : -swiper2.translate;
    const {
      snapGrid,
      params,
      activeIndex: previousIndex,
      realIndex: previousRealIndex,
      snapIndex: previousSnapIndex
    } = swiper2;
    let activeIndex = newActiveIndex;
    let snapIndex;
    const getVirtualRealIndex = (aIndex) => {
      let realIndex2 = aIndex - swiper2.virtual.slidesBefore;
      if (realIndex2 < 0) {
        realIndex2 = swiper2.virtual.slides.length + realIndex2;
      }
      if (realIndex2 >= swiper2.virtual.slides.length) {
        realIndex2 -= swiper2.virtual.slides.length;
      }
      return realIndex2;
    };
    if (typeof activeIndex === "undefined") {
      activeIndex = getActiveIndexByTranslate(swiper2);
    }
    if (snapGrid.indexOf(translate2) >= 0) {
      snapIndex = snapGrid.indexOf(translate2);
    } else {
      const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
      snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
    }
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    if (activeIndex === previousIndex && !swiper2.params.loop) {
      if (snapIndex !== previousSnapIndex) {
        swiper2.snapIndex = snapIndex;
        swiper2.emit("snapIndexChange");
      }
      return;
    }
    if (activeIndex === previousIndex && swiper2.params.loop && swiper2.virtual && swiper2.params.virtual.enabled) {
      swiper2.realIndex = getVirtualRealIndex(activeIndex);
      return;
    }
    const gridEnabled = swiper2.grid && params.grid && params.grid.rows > 1;
    let realIndex;
    if (swiper2.virtual && params.virtual.enabled && params.loop) {
      realIndex = getVirtualRealIndex(activeIndex);
    } else if (gridEnabled) {
      const firstSlideInColumn = swiper2.slides.filter((slideEl) => slideEl.column === activeIndex)[0];
      let activeSlideIndex = parseInt(firstSlideInColumn.getAttribute("data-swiper-slide-index"), 10);
      if (Number.isNaN(activeSlideIndex)) {
        activeSlideIndex = Math.max(swiper2.slides.indexOf(firstSlideInColumn), 0);
      }
      realIndex = Math.floor(activeSlideIndex / params.grid.rows);
    } else if (swiper2.slides[activeIndex]) {
      const slideIndex = swiper2.slides[activeIndex].getAttribute("data-swiper-slide-index");
      if (slideIndex) {
        realIndex = parseInt(slideIndex, 10);
      } else {
        realIndex = activeIndex;
      }
    } else {
      realIndex = activeIndex;
    }
    Object.assign(swiper2, {
      previousSnapIndex,
      snapIndex,
      previousRealIndex,
      realIndex,
      previousIndex,
      activeIndex
    });
    if (swiper2.initialized) {
      preload(swiper2);
    }
    swiper2.emit("activeIndexChange");
    swiper2.emit("snapIndexChange");
    if (swiper2.initialized || swiper2.params.runCallbacksOnInit) {
      if (previousRealIndex !== realIndex) {
        swiper2.emit("realIndexChange");
      }
      swiper2.emit("slideChange");
    }
  }
  function updateClickedSlide(el, path) {
    const swiper2 = this;
    const params = swiper2.params;
    let slide2 = el.closest(`.${params.slideClass}, swiper-slide`);
    if (!slide2 && swiper2.isElement && path && path.length > 1 && path.includes(el)) {
      [...path.slice(path.indexOf(el) + 1, path.length)].forEach((pathEl) => {
        if (!slide2 && pathEl.matches && pathEl.matches(`.${params.slideClass}, swiper-slide`)) {
          slide2 = pathEl;
        }
      });
    }
    let slideFound = false;
    let slideIndex;
    if (slide2) {
      for (let i = 0; i < swiper2.slides.length; i += 1) {
        if (swiper2.slides[i] === slide2) {
          slideFound = true;
          slideIndex = i;
          break;
        }
      }
    }
    if (slide2 && slideFound) {
      swiper2.clickedSlide = slide2;
      if (swiper2.virtual && swiper2.params.virtual.enabled) {
        swiper2.clickedIndex = parseInt(slide2.getAttribute("data-swiper-slide-index"), 10);
      } else {
        swiper2.clickedIndex = slideIndex;
      }
    } else {
      swiper2.clickedSlide = void 0;
      swiper2.clickedIndex = void 0;
      return;
    }
    if (params.slideToClickedSlide && swiper2.clickedIndex !== void 0 && swiper2.clickedIndex !== swiper2.activeIndex) {
      swiper2.slideToClickedSlide();
    }
  }
  var update = {
    updateSize,
    updateSlides,
    updateAutoHeight,
    updateSlidesOffset,
    updateSlidesProgress,
    updateProgress,
    updateSlidesClasses,
    updateActiveIndex,
    updateClickedSlide
  };
  function getSwiperTranslate(axis) {
    if (axis === void 0) {
      axis = this.isHorizontal() ? "x" : "y";
    }
    const swiper2 = this;
    const {
      params,
      rtlTranslate: rtl,
      translate: translate2,
      wrapperEl
    } = swiper2;
    if (params.virtualTranslate) {
      return rtl ? -translate2 : translate2;
    }
    if (params.cssMode) {
      return translate2;
    }
    let currentTranslate = getTranslate(wrapperEl, axis);
    currentTranslate += swiper2.cssOverflowAdjustment();
    if (rtl)
      currentTranslate = -currentTranslate;
    return currentTranslate || 0;
  }
  function setTranslate(translate2, byController) {
    const swiper2 = this;
    const {
      rtlTranslate: rtl,
      params,
      wrapperEl,
      progress
    } = swiper2;
    let x = 0;
    let y = 0;
    const z = 0;
    if (swiper2.isHorizontal()) {
      x = rtl ? -translate2 : translate2;
    } else {
      y = translate2;
    }
    if (params.roundLengths) {
      x = Math.floor(x);
      y = Math.floor(y);
    }
    swiper2.previousTranslate = swiper2.translate;
    swiper2.translate = swiper2.isHorizontal() ? x : y;
    if (params.cssMode) {
      wrapperEl[swiper2.isHorizontal() ? "scrollLeft" : "scrollTop"] = swiper2.isHorizontal() ? -x : -y;
    } else if (!params.virtualTranslate) {
      if (swiper2.isHorizontal()) {
        x -= swiper2.cssOverflowAdjustment();
      } else {
        y -= swiper2.cssOverflowAdjustment();
      }
      wrapperEl.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
    }
    let newProgress;
    const translatesDiff = swiper2.maxTranslate() - swiper2.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (translate2 - swiper2.minTranslate()) / translatesDiff;
    }
    if (newProgress !== progress) {
      swiper2.updateProgress(translate2);
    }
    swiper2.emit("setTranslate", swiper2.translate, byController);
  }
  function minTranslate() {
    return -this.snapGrid[0];
  }
  function maxTranslate() {
    return -this.snapGrid[this.snapGrid.length - 1];
  }
  function translateTo(translate2, speed, runCallbacks, translateBounds, internal) {
    if (translate2 === void 0) {
      translate2 = 0;
    }
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (translateBounds === void 0) {
      translateBounds = true;
    }
    const swiper2 = this;
    const {
      params,
      wrapperEl
    } = swiper2;
    if (swiper2.animating && params.preventInteractionOnTransition) {
      return false;
    }
    const minTranslate2 = swiper2.minTranslate();
    const maxTranslate2 = swiper2.maxTranslate();
    let newTranslate;
    if (translateBounds && translate2 > minTranslate2)
      newTranslate = minTranslate2;
    else if (translateBounds && translate2 < maxTranslate2)
      newTranslate = maxTranslate2;
    else
      newTranslate = translate2;
    swiper2.updateProgress(newTranslate);
    if (params.cssMode) {
      const isH = swiper2.isHorizontal();
      if (speed === 0) {
        wrapperEl[isH ? "scrollLeft" : "scrollTop"] = -newTranslate;
      } else {
        if (!swiper2.support.smoothScroll) {
          animateCSSModeScroll({
            swiper: swiper2,
            targetPosition: -newTranslate,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: -newTranslate,
          behavior: "smooth"
        });
      }
      return true;
    }
    if (speed === 0) {
      swiper2.setTransition(0);
      swiper2.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper2.emit("beforeTransitionStart", speed, internal);
        swiper2.emit("transitionEnd");
      }
    } else {
      swiper2.setTransition(speed);
      swiper2.setTranslate(newTranslate);
      if (runCallbacks) {
        swiper2.emit("beforeTransitionStart", speed, internal);
        swiper2.emit("transitionStart");
      }
      if (!swiper2.animating) {
        swiper2.animating = true;
        if (!swiper2.onTranslateToWrapperTransitionEnd) {
          swiper2.onTranslateToWrapperTransitionEnd = function transitionEnd2(e) {
            if (!swiper2 || swiper2.destroyed)
              return;
            if (e.target !== this)
              return;
            swiper2.wrapperEl.removeEventListener("transitionend", swiper2.onTranslateToWrapperTransitionEnd);
            swiper2.onTranslateToWrapperTransitionEnd = null;
            delete swiper2.onTranslateToWrapperTransitionEnd;
            if (runCallbacks) {
              swiper2.emit("transitionEnd");
            }
          };
        }
        swiper2.wrapperEl.addEventListener("transitionend", swiper2.onTranslateToWrapperTransitionEnd);
      }
    }
    return true;
  }
  var translate = {
    getTranslate: getSwiperTranslate,
    setTranslate,
    minTranslate,
    maxTranslate,
    translateTo
  };
  function setTransition(duration, byController) {
    const swiper2 = this;
    if (!swiper2.params.cssMode) {
      swiper2.wrapperEl.style.transitionDuration = `${duration}ms`;
      swiper2.wrapperEl.style.transitionDelay = duration === 0 ? `0ms` : "";
    }
    swiper2.emit("setTransition", duration, byController);
  }
  function transitionEmit(_ref) {
    let {
      swiper: swiper2,
      runCallbacks,
      direction,
      step
    } = _ref;
    const {
      activeIndex,
      previousIndex
    } = swiper2;
    let dir = direction;
    if (!dir) {
      if (activeIndex > previousIndex)
        dir = "next";
      else if (activeIndex < previousIndex)
        dir = "prev";
      else
        dir = "reset";
    }
    swiper2.emit(`transition${step}`);
    if (runCallbacks && activeIndex !== previousIndex) {
      if (dir === "reset") {
        swiper2.emit(`slideResetTransition${step}`);
        return;
      }
      swiper2.emit(`slideChangeTransition${step}`);
      if (dir === "next") {
        swiper2.emit(`slideNextTransition${step}`);
      } else {
        swiper2.emit(`slidePrevTransition${step}`);
      }
    }
  }
  function transitionStart(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper2 = this;
    const {
      params
    } = swiper2;
    if (params.cssMode)
      return;
    if (params.autoHeight) {
      swiper2.updateAutoHeight();
    }
    transitionEmit({
      swiper: swiper2,
      runCallbacks,
      direction,
      step: "Start"
    });
  }
  function transitionEnd(runCallbacks, direction) {
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper2 = this;
    const {
      params
    } = swiper2;
    swiper2.animating = false;
    if (params.cssMode)
      return;
    swiper2.setTransition(0);
    transitionEmit({
      swiper: swiper2,
      runCallbacks,
      direction,
      step: "End"
    });
  }
  var transition = {
    setTransition,
    transitionStart,
    transitionEnd
  };
  function slideTo(index, speed, runCallbacks, internal, initial) {
    if (index === void 0) {
      index = 0;
    }
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (typeof index === "string") {
      index = parseInt(index, 10);
    }
    const swiper2 = this;
    let slideIndex = index;
    if (slideIndex < 0)
      slideIndex = 0;
    const {
      params,
      snapGrid,
      slidesGrid,
      previousIndex,
      activeIndex,
      rtlTranslate: rtl,
      wrapperEl,
      enabled
    } = swiper2;
    if (swiper2.animating && params.preventInteractionOnTransition || !enabled && !internal && !initial) {
      return false;
    }
    const skip = Math.min(swiper2.params.slidesPerGroupSkip, slideIndex);
    let snapIndex = skip + Math.floor((slideIndex - skip) / swiper2.params.slidesPerGroup);
    if (snapIndex >= snapGrid.length)
      snapIndex = snapGrid.length - 1;
    const translate2 = -snapGrid[snapIndex];
    if (params.normalizeSlideIndex) {
      for (let i = 0; i < slidesGrid.length; i += 1) {
        const normalizedTranslate = -Math.floor(translate2 * 100);
        const normalizedGrid = Math.floor(slidesGrid[i] * 100);
        const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);
        if (typeof slidesGrid[i + 1] !== "undefined") {
          if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2) {
            slideIndex = i;
          } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
            slideIndex = i + 1;
          }
        } else if (normalizedTranslate >= normalizedGrid) {
          slideIndex = i;
        }
      }
    }
    if (swiper2.initialized && slideIndex !== activeIndex) {
      if (!swiper2.allowSlideNext && (rtl ? translate2 > swiper2.translate && translate2 > swiper2.minTranslate() : translate2 < swiper2.translate && translate2 < swiper2.minTranslate())) {
        return false;
      }
      if (!swiper2.allowSlidePrev && translate2 > swiper2.translate && translate2 > swiper2.maxTranslate()) {
        if ((activeIndex || 0) !== slideIndex) {
          return false;
        }
      }
    }
    if (slideIndex !== (previousIndex || 0) && runCallbacks) {
      swiper2.emit("beforeSlideChangeStart");
    }
    swiper2.updateProgress(translate2);
    let direction;
    if (slideIndex > activeIndex)
      direction = "next";
    else if (slideIndex < activeIndex)
      direction = "prev";
    else
      direction = "reset";
    if (rtl && -translate2 === swiper2.translate || !rtl && translate2 === swiper2.translate) {
      swiper2.updateActiveIndex(slideIndex);
      if (params.autoHeight) {
        swiper2.updateAutoHeight();
      }
      swiper2.updateSlidesClasses();
      if (params.effect !== "slide") {
        swiper2.setTranslate(translate2);
      }
      if (direction !== "reset") {
        swiper2.transitionStart(runCallbacks, direction);
        swiper2.transitionEnd(runCallbacks, direction);
      }
      return false;
    }
    if (params.cssMode) {
      const isH = swiper2.isHorizontal();
      const t = rtl ? translate2 : -translate2;
      if (speed === 0) {
        const isVirtual = swiper2.virtual && swiper2.params.virtual.enabled;
        if (isVirtual) {
          swiper2.wrapperEl.style.scrollSnapType = "none";
          swiper2._immediateVirtual = true;
        }
        if (isVirtual && !swiper2._cssModeVirtualInitialSet && swiper2.params.initialSlide > 0) {
          swiper2._cssModeVirtualInitialSet = true;
          requestAnimationFrame(() => {
            wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
          });
        } else {
          wrapperEl[isH ? "scrollLeft" : "scrollTop"] = t;
        }
        if (isVirtual) {
          requestAnimationFrame(() => {
            swiper2.wrapperEl.style.scrollSnapType = "";
            swiper2._immediateVirtual = false;
          });
        }
      } else {
        if (!swiper2.support.smoothScroll) {
          animateCSSModeScroll({
            swiper: swiper2,
            targetPosition: t,
            side: isH ? "left" : "top"
          });
          return true;
        }
        wrapperEl.scrollTo({
          [isH ? "left" : "top"]: t,
          behavior: "smooth"
        });
      }
      return true;
    }
    swiper2.setTransition(speed);
    swiper2.setTranslate(translate2);
    swiper2.updateActiveIndex(slideIndex);
    swiper2.updateSlidesClasses();
    swiper2.emit("beforeTransitionStart", speed, internal);
    swiper2.transitionStart(runCallbacks, direction);
    if (speed === 0) {
      swiper2.transitionEnd(runCallbacks, direction);
    } else if (!swiper2.animating) {
      swiper2.animating = true;
      if (!swiper2.onSlideToWrapperTransitionEnd) {
        swiper2.onSlideToWrapperTransitionEnd = function transitionEnd2(e) {
          if (!swiper2 || swiper2.destroyed)
            return;
          if (e.target !== this)
            return;
          swiper2.wrapperEl.removeEventListener("transitionend", swiper2.onSlideToWrapperTransitionEnd);
          swiper2.onSlideToWrapperTransitionEnd = null;
          delete swiper2.onSlideToWrapperTransitionEnd;
          swiper2.transitionEnd(runCallbacks, direction);
        };
      }
      swiper2.wrapperEl.addEventListener("transitionend", swiper2.onSlideToWrapperTransitionEnd);
    }
    return true;
  }
  function slideToLoop(index, speed, runCallbacks, internal) {
    if (index === void 0) {
      index = 0;
    }
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (typeof index === "string") {
      const indexAsNumber = parseInt(index, 10);
      index = indexAsNumber;
    }
    const swiper2 = this;
    const gridEnabled = swiper2.grid && swiper2.params.grid && swiper2.params.grid.rows > 1;
    let newIndex = index;
    if (swiper2.params.loop) {
      if (swiper2.virtual && swiper2.params.virtual.enabled) {
        newIndex = newIndex + swiper2.virtual.slidesBefore;
      } else {
        let targetSlideIndex;
        if (gridEnabled) {
          const slideIndex = newIndex * swiper2.params.grid.rows;
          targetSlideIndex = swiper2.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)[0].column;
        } else {
          targetSlideIndex = swiper2.getSlideIndexByData(newIndex);
        }
        const cols = gridEnabled ? Math.ceil(swiper2.slides.length / swiper2.params.grid.rows) : swiper2.slides.length;
        const {
          centeredSlides
        } = swiper2.params;
        let slidesPerView = swiper2.params.slidesPerView;
        if (slidesPerView === "auto") {
          slidesPerView = swiper2.slidesPerViewDynamic();
        } else {
          slidesPerView = Math.ceil(parseFloat(swiper2.params.slidesPerView, 10));
          if (centeredSlides && slidesPerView % 2 === 0) {
            slidesPerView = slidesPerView + 1;
          }
        }
        let needLoopFix = cols - targetSlideIndex < slidesPerView;
        if (centeredSlides) {
          needLoopFix = needLoopFix || targetSlideIndex < Math.ceil(slidesPerView / 2);
        }
        if (needLoopFix) {
          const direction = centeredSlides ? targetSlideIndex < swiper2.activeIndex ? "prev" : "next" : targetSlideIndex - swiper2.activeIndex - 1 < swiper2.params.slidesPerView ? "next" : "prev";
          swiper2.loopFix({
            direction,
            slideTo: true,
            activeSlideIndex: direction === "next" ? targetSlideIndex + 1 : targetSlideIndex - cols + 1,
            slideRealIndex: direction === "next" ? swiper2.realIndex : void 0
          });
        }
        if (gridEnabled) {
          const slideIndex = newIndex * swiper2.params.grid.rows;
          newIndex = swiper2.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === slideIndex)[0].column;
        } else {
          newIndex = swiper2.getSlideIndexByData(newIndex);
        }
      }
    }
    requestAnimationFrame(() => {
      swiper2.slideTo(newIndex, speed, runCallbacks, internal);
    });
    return swiper2;
  }
  function slideNext(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper2 = this;
    const {
      enabled,
      params,
      animating
    } = swiper2;
    if (!enabled)
      return swiper2;
    let perGroup = params.slidesPerGroup;
    if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
      perGroup = Math.max(swiper2.slidesPerViewDynamic("current", true), 1);
    }
    const increment = swiper2.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;
    const isVirtual = swiper2.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding)
        return false;
      swiper2.loopFix({
        direction: "next"
      });
      swiper2._clientLeft = swiper2.wrapperEl.clientLeft;
      if (swiper2.activeIndex === swiper2.slides.length - 1 && params.cssMode) {
        requestAnimationFrame(() => {
          swiper2.slideTo(swiper2.activeIndex + increment, speed, runCallbacks, internal);
        });
        return true;
      }
    }
    if (params.rewind && swiper2.isEnd) {
      return swiper2.slideTo(0, speed, runCallbacks, internal);
    }
    return swiper2.slideTo(swiper2.activeIndex + increment, speed, runCallbacks, internal);
  }
  function slidePrev(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper2 = this;
    const {
      params,
      snapGrid,
      slidesGrid,
      rtlTranslate,
      enabled,
      animating
    } = swiper2;
    if (!enabled)
      return swiper2;
    const isVirtual = swiper2.virtual && params.virtual.enabled;
    if (params.loop) {
      if (animating && !isVirtual && params.loopPreventsSliding)
        return false;
      swiper2.loopFix({
        direction: "prev"
      });
      swiper2._clientLeft = swiper2.wrapperEl.clientLeft;
    }
    const translate2 = rtlTranslate ? swiper2.translate : -swiper2.translate;
    function normalize(val) {
      if (val < 0)
        return -Math.floor(Math.abs(val));
      return Math.floor(val);
    }
    const normalizedTranslate = normalize(translate2);
    const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
    let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];
    if (typeof prevSnap === "undefined" && params.cssMode) {
      let prevSnapIndex;
      snapGrid.forEach((snap, snapIndex) => {
        if (normalizedTranslate >= snap) {
          prevSnapIndex = snapIndex;
        }
      });
      if (typeof prevSnapIndex !== "undefined") {
        prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
      }
    }
    let prevIndex = 0;
    if (typeof prevSnap !== "undefined") {
      prevIndex = slidesGrid.indexOf(prevSnap);
      if (prevIndex < 0)
        prevIndex = swiper2.activeIndex - 1;
      if (params.slidesPerView === "auto" && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
        prevIndex = prevIndex - swiper2.slidesPerViewDynamic("previous", true) + 1;
        prevIndex = Math.max(prevIndex, 0);
      }
    }
    if (params.rewind && swiper2.isBeginning) {
      const lastIndex = swiper2.params.virtual && swiper2.params.virtual.enabled && swiper2.virtual ? swiper2.virtual.slides.length - 1 : swiper2.slides.length - 1;
      return swiper2.slideTo(lastIndex, speed, runCallbacks, internal);
    } else if (params.loop && swiper2.activeIndex === 0 && params.cssMode) {
      requestAnimationFrame(() => {
        swiper2.slideTo(prevIndex, speed, runCallbacks, internal);
      });
      return true;
    }
    return swiper2.slideTo(prevIndex, speed, runCallbacks, internal);
  }
  function slideReset(speed, runCallbacks, internal) {
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    const swiper2 = this;
    return swiper2.slideTo(swiper2.activeIndex, speed, runCallbacks, internal);
  }
  function slideToClosest(speed, runCallbacks, internal, threshold) {
    if (speed === void 0) {
      speed = this.params.speed;
    }
    if (runCallbacks === void 0) {
      runCallbacks = true;
    }
    if (threshold === void 0) {
      threshold = 0.5;
    }
    const swiper2 = this;
    let index = swiper2.activeIndex;
    const skip = Math.min(swiper2.params.slidesPerGroupSkip, index);
    const snapIndex = skip + Math.floor((index - skip) / swiper2.params.slidesPerGroup);
    const translate2 = swiper2.rtlTranslate ? swiper2.translate : -swiper2.translate;
    if (translate2 >= swiper2.snapGrid[snapIndex]) {
      const currentSnap = swiper2.snapGrid[snapIndex];
      const nextSnap = swiper2.snapGrid[snapIndex + 1];
      if (translate2 - currentSnap > (nextSnap - currentSnap) * threshold) {
        index += swiper2.params.slidesPerGroup;
      }
    } else {
      const prevSnap = swiper2.snapGrid[snapIndex - 1];
      const currentSnap = swiper2.snapGrid[snapIndex];
      if (translate2 - prevSnap <= (currentSnap - prevSnap) * threshold) {
        index -= swiper2.params.slidesPerGroup;
      }
    }
    index = Math.max(index, 0);
    index = Math.min(index, swiper2.slidesGrid.length - 1);
    return swiper2.slideTo(index, speed, runCallbacks, internal);
  }
  function slideToClickedSlide() {
    const swiper2 = this;
    const {
      params,
      slidesEl
    } = swiper2;
    const slidesPerView = params.slidesPerView === "auto" ? swiper2.slidesPerViewDynamic() : params.slidesPerView;
    let slideToIndex = swiper2.clickedIndex;
    let realIndex;
    const slideSelector = swiper2.isElement ? `swiper-slide` : `.${params.slideClass}`;
    if (params.loop) {
      if (swiper2.animating)
        return;
      realIndex = parseInt(swiper2.clickedSlide.getAttribute("data-swiper-slide-index"), 10);
      if (params.centeredSlides) {
        if (slideToIndex < swiper2.loopedSlides - slidesPerView / 2 || slideToIndex > swiper2.slides.length - swiper2.loopedSlides + slidesPerView / 2) {
          swiper2.loopFix();
          slideToIndex = swiper2.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
          nextTick(() => {
            swiper2.slideTo(slideToIndex);
          });
        } else {
          swiper2.slideTo(slideToIndex);
        }
      } else if (slideToIndex > swiper2.slides.length - slidesPerView) {
        swiper2.loopFix();
        slideToIndex = swiper2.getSlideIndex(elementChildren(slidesEl, `${slideSelector}[data-swiper-slide-index="${realIndex}"]`)[0]);
        nextTick(() => {
          swiper2.slideTo(slideToIndex);
        });
      } else {
        swiper2.slideTo(slideToIndex);
      }
    } else {
      swiper2.slideTo(slideToIndex);
    }
  }
  var slide = {
    slideTo,
    slideToLoop,
    slideNext,
    slidePrev,
    slideReset,
    slideToClosest,
    slideToClickedSlide
  };
  function loopCreate(slideRealIndex) {
    const swiper2 = this;
    const {
      params,
      slidesEl
    } = swiper2;
    if (!params.loop || swiper2.virtual && swiper2.params.virtual.enabled)
      return;
    const initSlides = () => {
      const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
      slides.forEach((el, index) => {
        el.setAttribute("data-swiper-slide-index", index);
      });
    };
    const gridEnabled = swiper2.grid && params.grid && params.grid.rows > 1;
    const slidesPerGroup = params.slidesPerGroup * (gridEnabled ? params.grid.rows : 1);
    const shouldFillGroup = swiper2.slides.length % slidesPerGroup !== 0;
    const shouldFillGrid = gridEnabled && swiper2.slides.length % params.grid.rows !== 0;
    const addBlankSlides = (amountOfSlides) => {
      for (let i = 0; i < amountOfSlides; i += 1) {
        const slideEl = swiper2.isElement ? createElement("swiper-slide", [params.slideBlankClass]) : createElement("div", [params.slideClass, params.slideBlankClass]);
        swiper2.slidesEl.append(slideEl);
      }
    };
    if (shouldFillGroup) {
      if (params.loopAddBlankSlides) {
        const slidesToAdd = slidesPerGroup - swiper2.slides.length % slidesPerGroup;
        addBlankSlides(slidesToAdd);
        swiper2.recalcSlides();
        swiper2.updateSlides();
      } else {
        showWarning("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      }
      initSlides();
    } else if (shouldFillGrid) {
      if (params.loopAddBlankSlides) {
        const slidesToAdd = params.grid.rows - swiper2.slides.length % params.grid.rows;
        addBlankSlides(slidesToAdd);
        swiper2.recalcSlides();
        swiper2.updateSlides();
      } else {
        showWarning("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");
      }
      initSlides();
    } else {
      initSlides();
    }
    swiper2.loopFix({
      slideRealIndex,
      direction: params.centeredSlides ? void 0 : "next"
    });
  }
  function loopFix(_temp) {
    let {
      slideRealIndex,
      slideTo: slideTo2 = true,
      direction,
      setTranslate: setTranslate2,
      activeSlideIndex,
      byController,
      byMousewheel
    } = _temp === void 0 ? {} : _temp;
    const swiper2 = this;
    if (!swiper2.params.loop)
      return;
    swiper2.emit("beforeLoopFix");
    const {
      slides,
      allowSlidePrev,
      allowSlideNext,
      slidesEl,
      params
    } = swiper2;
    const {
      centeredSlides
    } = params;
    swiper2.allowSlidePrev = true;
    swiper2.allowSlideNext = true;
    if (swiper2.virtual && params.virtual.enabled) {
      if (slideTo2) {
        if (!params.centeredSlides && swiper2.snapIndex === 0) {
          swiper2.slideTo(swiper2.virtual.slides.length, 0, false, true);
        } else if (params.centeredSlides && swiper2.snapIndex < params.slidesPerView) {
          swiper2.slideTo(swiper2.virtual.slides.length + swiper2.snapIndex, 0, false, true);
        } else if (swiper2.snapIndex === swiper2.snapGrid.length - 1) {
          swiper2.slideTo(swiper2.virtual.slidesBefore, 0, false, true);
        }
      }
      swiper2.allowSlidePrev = allowSlidePrev;
      swiper2.allowSlideNext = allowSlideNext;
      swiper2.emit("loopFix");
      return;
    }
    let slidesPerView = params.slidesPerView;
    if (slidesPerView === "auto") {
      slidesPerView = swiper2.slidesPerViewDynamic();
    } else {
      slidesPerView = Math.ceil(parseFloat(params.slidesPerView, 10));
      if (centeredSlides && slidesPerView % 2 === 0) {
        slidesPerView = slidesPerView + 1;
      }
    }
    const slidesPerGroup = params.slidesPerGroupAuto ? slidesPerView : params.slidesPerGroup;
    let loopedSlides = slidesPerGroup;
    if (loopedSlides % slidesPerGroup !== 0) {
      loopedSlides += slidesPerGroup - loopedSlides % slidesPerGroup;
    }
    loopedSlides += params.loopAdditionalSlides;
    swiper2.loopedSlides = loopedSlides;
    const gridEnabled = swiper2.grid && params.grid && params.grid.rows > 1;
    if (slides.length < slidesPerView + loopedSlides) {
      showWarning("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled and not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters");
    } else if (gridEnabled && params.grid.fill === "row") {
      showWarning("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");
    }
    const prependSlidesIndexes = [];
    const appendSlidesIndexes = [];
    let activeIndex = swiper2.activeIndex;
    if (typeof activeSlideIndex === "undefined") {
      activeSlideIndex = swiper2.getSlideIndex(slides.filter((el) => el.classList.contains(params.slideActiveClass))[0]);
    } else {
      activeIndex = activeSlideIndex;
    }
    const isNext = direction === "next" || !direction;
    const isPrev = direction === "prev" || !direction;
    let slidesPrepended = 0;
    let slidesAppended = 0;
    const cols = gridEnabled ? Math.ceil(slides.length / params.grid.rows) : slides.length;
    const activeColIndex = gridEnabled ? slides[activeSlideIndex].column : activeSlideIndex;
    const activeColIndexWithShift = activeColIndex + (centeredSlides && typeof setTranslate2 === "undefined" ? -slidesPerView / 2 + 0.5 : 0);
    if (activeColIndexWithShift < loopedSlides) {
      slidesPrepended = Math.max(loopedSlides - activeColIndexWithShift, slidesPerGroup);
      for (let i = 0; i < loopedSlides - activeColIndexWithShift; i += 1) {
        const index = i - Math.floor(i / cols) * cols;
        if (gridEnabled) {
          const colIndexToPrepend = cols - index - 1;
          for (let i2 = slides.length - 1; i2 >= 0; i2 -= 1) {
            if (slides[i2].column === colIndexToPrepend)
              prependSlidesIndexes.push(i2);
          }
        } else {
          prependSlidesIndexes.push(cols - index - 1);
        }
      }
    } else if (activeColIndexWithShift + slidesPerView > cols - loopedSlides) {
      slidesAppended = Math.max(activeColIndexWithShift - (cols - loopedSlides * 2), slidesPerGroup);
      for (let i = 0; i < slidesAppended; i += 1) {
        const index = i - Math.floor(i / cols) * cols;
        if (gridEnabled) {
          slides.forEach((slide2, slideIndex) => {
            if (slide2.column === index)
              appendSlidesIndexes.push(slideIndex);
          });
        } else {
          appendSlidesIndexes.push(index);
        }
      }
    }
    swiper2.__preventObserver__ = true;
    requestAnimationFrame(() => {
      swiper2.__preventObserver__ = false;
    });
    if (isPrev) {
      prependSlidesIndexes.forEach((index) => {
        slides[index].swiperLoopMoveDOM = true;
        slidesEl.prepend(slides[index]);
        slides[index].swiperLoopMoveDOM = false;
      });
    }
    if (isNext) {
      appendSlidesIndexes.forEach((index) => {
        slides[index].swiperLoopMoveDOM = true;
        slidesEl.append(slides[index]);
        slides[index].swiperLoopMoveDOM = false;
      });
    }
    swiper2.recalcSlides();
    if (params.slidesPerView === "auto") {
      swiper2.updateSlides();
    } else if (gridEnabled && (prependSlidesIndexes.length > 0 && isPrev || appendSlidesIndexes.length > 0 && isNext)) {
      swiper2.slides.forEach((slide2, slideIndex) => {
        swiper2.grid.updateSlide(slideIndex, slide2, swiper2.slides);
      });
    }
    if (params.watchSlidesProgress) {
      swiper2.updateSlidesOffset();
    }
    if (slideTo2) {
      if (prependSlidesIndexes.length > 0 && isPrev) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper2.slidesGrid[activeIndex];
          const newSlideTranslate = swiper2.slidesGrid[activeIndex + slidesPrepended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper2.setTranslate(swiper2.translate - diff);
          } else {
            swiper2.slideTo(activeIndex + slidesPrepended, 0, false, true);
            if (setTranslate2) {
              swiper2.touchEventsData.startTranslate = swiper2.touchEventsData.startTranslate - diff;
              swiper2.touchEventsData.currentTranslate = swiper2.touchEventsData.currentTranslate - diff;
            }
          }
        } else {
          if (setTranslate2) {
            const shift = gridEnabled ? prependSlidesIndexes.length / params.grid.rows : prependSlidesIndexes.length;
            swiper2.slideTo(swiper2.activeIndex + shift, 0, false, true);
            swiper2.touchEventsData.currentTranslate = swiper2.translate;
          }
        }
      } else if (appendSlidesIndexes.length > 0 && isNext) {
        if (typeof slideRealIndex === "undefined") {
          const currentSlideTranslate = swiper2.slidesGrid[activeIndex];
          const newSlideTranslate = swiper2.slidesGrid[activeIndex - slidesAppended];
          const diff = newSlideTranslate - currentSlideTranslate;
          if (byMousewheel) {
            swiper2.setTranslate(swiper2.translate - diff);
          } else {
            swiper2.slideTo(activeIndex - slidesAppended, 0, false, true);
            if (setTranslate2) {
              swiper2.touchEventsData.startTranslate = swiper2.touchEventsData.startTranslate - diff;
              swiper2.touchEventsData.currentTranslate = swiper2.touchEventsData.currentTranslate - diff;
            }
          }
        } else {
          const shift = gridEnabled ? appendSlidesIndexes.length / params.grid.rows : appendSlidesIndexes.length;
          swiper2.slideTo(swiper2.activeIndex - shift, 0, false, true);
        }
      }
    }
    swiper2.allowSlidePrev = allowSlidePrev;
    swiper2.allowSlideNext = allowSlideNext;
    if (swiper2.controller && swiper2.controller.control && !byController) {
      const loopParams = {
        slideRealIndex,
        direction,
        setTranslate: setTranslate2,
        activeSlideIndex,
        byController: true
      };
      if (Array.isArray(swiper2.controller.control)) {
        swiper2.controller.control.forEach((c) => {
          if (!c.destroyed && c.params.loop)
            c.loopFix(__spreadProps(__spreadValues({}, loopParams), {
              slideTo: c.params.slidesPerView === params.slidesPerView ? slideTo2 : false
            }));
        });
      } else if (swiper2.controller.control instanceof swiper2.constructor && swiper2.controller.control.params.loop) {
        swiper2.controller.control.loopFix(__spreadProps(__spreadValues({}, loopParams), {
          slideTo: swiper2.controller.control.params.slidesPerView === params.slidesPerView ? slideTo2 : false
        }));
      }
    }
    swiper2.emit("loopFix");
  }
  function loopDestroy() {
    const swiper2 = this;
    const {
      params,
      slidesEl
    } = swiper2;
    if (!params.loop || swiper2.virtual && swiper2.params.virtual.enabled)
      return;
    swiper2.recalcSlides();
    const newSlidesOrder = [];
    swiper2.slides.forEach((slideEl) => {
      const index = typeof slideEl.swiperSlideIndex === "undefined" ? slideEl.getAttribute("data-swiper-slide-index") * 1 : slideEl.swiperSlideIndex;
      newSlidesOrder[index] = slideEl;
    });
    swiper2.slides.forEach((slideEl) => {
      slideEl.removeAttribute("data-swiper-slide-index");
    });
    newSlidesOrder.forEach((slideEl) => {
      slidesEl.append(slideEl);
    });
    swiper2.recalcSlides();
    swiper2.slideTo(swiper2.realIndex, 0);
  }
  var loop = {
    loopCreate,
    loopFix,
    loopDestroy
  };
  function setGrabCursor(moving) {
    const swiper2 = this;
    if (!swiper2.params.simulateTouch || swiper2.params.watchOverflow && swiper2.isLocked || swiper2.params.cssMode)
      return;
    const el = swiper2.params.touchEventsTarget === "container" ? swiper2.el : swiper2.wrapperEl;
    if (swiper2.isElement) {
      swiper2.__preventObserver__ = true;
    }
    el.style.cursor = "move";
    el.style.cursor = moving ? "grabbing" : "grab";
    if (swiper2.isElement) {
      requestAnimationFrame(() => {
        swiper2.__preventObserver__ = false;
      });
    }
  }
  function unsetGrabCursor() {
    const swiper2 = this;
    if (swiper2.params.watchOverflow && swiper2.isLocked || swiper2.params.cssMode) {
      return;
    }
    if (swiper2.isElement) {
      swiper2.__preventObserver__ = true;
    }
    swiper2[swiper2.params.touchEventsTarget === "container" ? "el" : "wrapperEl"].style.cursor = "";
    if (swiper2.isElement) {
      requestAnimationFrame(() => {
        swiper2.__preventObserver__ = false;
      });
    }
  }
  var grabCursor = {
    setGrabCursor,
    unsetGrabCursor
  };
  function closestElement(selector, base) {
    if (base === void 0) {
      base = this;
    }
    function __closestFrom(el) {
      if (!el || el === getDocument() || el === getWindow())
        return null;
      if (el.assignedSlot)
        el = el.assignedSlot;
      const found = el.closest(selector);
      if (!found && !el.getRootNode) {
        return null;
      }
      return found || __closestFrom(el.getRootNode().host);
    }
    return __closestFrom(base);
  }
  function preventEdgeSwipe(swiper2, event2, startX) {
    const window2 = getWindow();
    const {
      params
    } = swiper2;
    const edgeSwipeDetection = params.edgeSwipeDetection;
    const edgeSwipeThreshold = params.edgeSwipeThreshold;
    if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window2.innerWidth - edgeSwipeThreshold)) {
      if (edgeSwipeDetection === "prevent") {
        event2.preventDefault();
        return true;
      }
      return false;
    }
    return true;
  }
  function onTouchStart(event2) {
    const swiper2 = this;
    const document2 = getDocument();
    let e = event2;
    if (e.originalEvent)
      e = e.originalEvent;
    const data = swiper2.touchEventsData;
    if (e.type === "pointerdown") {
      if (data.pointerId !== null && data.pointerId !== e.pointerId) {
        return;
      }
      data.pointerId = e.pointerId;
    } else if (e.type === "touchstart" && e.targetTouches.length === 1) {
      data.touchId = e.targetTouches[0].identifier;
    }
    if (e.type === "touchstart") {
      preventEdgeSwipe(swiper2, e, e.targetTouches[0].pageX);
      return;
    }
    const {
      params,
      touches,
      enabled
    } = swiper2;
    if (!enabled)
      return;
    if (!params.simulateTouch && e.pointerType === "mouse")
      return;
    if (swiper2.animating && params.preventInteractionOnTransition) {
      return;
    }
    if (!swiper2.animating && params.cssMode && params.loop) {
      swiper2.loopFix();
    }
    let targetEl = e.target;
    if (params.touchEventsTarget === "wrapper") {
      if (!swiper2.wrapperEl.contains(targetEl))
        return;
    }
    if ("which" in e && e.which === 3)
      return;
    if ("button" in e && e.button > 0)
      return;
    if (data.isTouched && data.isMoved)
      return;
    const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== "";
    const eventPath = e.composedPath ? e.composedPath() : e.path;
    if (swipingClassHasValue && e.target && e.target.shadowRoot && eventPath) {
      targetEl = eventPath[0];
    }
    const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
    const isTargetShadow = !!(e.target && e.target.shadowRoot);
    if (params.noSwiping && (isTargetShadow ? closestElement(noSwipingSelector, targetEl) : targetEl.closest(noSwipingSelector))) {
      swiper2.allowClick = true;
      return;
    }
    if (params.swipeHandler) {
      if (!targetEl.closest(params.swipeHandler))
        return;
    }
    touches.currentX = e.pageX;
    touches.currentY = e.pageY;
    const startX = touches.currentX;
    const startY = touches.currentY;
    if (!preventEdgeSwipe(swiper2, e, startX)) {
      return;
    }
    Object.assign(data, {
      isTouched: true,
      isMoved: false,
      allowTouchCallbacks: true,
      isScrolling: void 0,
      startMoving: void 0
    });
    touches.startX = startX;
    touches.startY = startY;
    data.touchStartTime = now();
    swiper2.allowClick = true;
    swiper2.updateSize();
    swiper2.swipeDirection = void 0;
    if (params.threshold > 0)
      data.allowThresholdMove = false;
    let preventDefault = true;
    if (targetEl.matches(data.focusableElements)) {
      preventDefault = false;
      if (targetEl.nodeName === "SELECT") {
        data.isTouched = false;
      }
    }
    if (document2.activeElement && document2.activeElement.matches(data.focusableElements) && document2.activeElement !== targetEl) {
      document2.activeElement.blur();
    }
    const shouldPreventDefault = preventDefault && swiper2.allowTouchMove && params.touchStartPreventDefault;
    if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !targetEl.isContentEditable) {
      e.preventDefault();
    }
    if (params.freeMode && params.freeMode.enabled && swiper2.freeMode && swiper2.animating && !params.cssMode) {
      swiper2.freeMode.onTouchStart();
    }
    swiper2.emit("touchStart", e);
  }
  function onTouchMove(event2) {
    const document2 = getDocument();
    const swiper2 = this;
    const data = swiper2.touchEventsData;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      enabled
    } = swiper2;
    if (!enabled)
      return;
    if (!params.simulateTouch && event2.pointerType === "mouse")
      return;
    let e = event2;
    if (e.originalEvent)
      e = e.originalEvent;
    if (e.type === "pointermove") {
      if (data.touchId !== null)
        return;
      const id = e.pointerId;
      if (id !== data.pointerId)
        return;
    }
    let targetTouch;
    if (e.type === "touchmove") {
      targetTouch = [...e.changedTouches].filter((t) => t.identifier === data.touchId)[0];
      if (!targetTouch || targetTouch.identifier !== data.touchId)
        return;
    } else {
      targetTouch = e;
    }
    if (!data.isTouched) {
      if (data.startMoving && data.isScrolling) {
        swiper2.emit("touchMoveOpposite", e);
      }
      return;
    }
    const pageX = targetTouch.pageX;
    const pageY = targetTouch.pageY;
    if (e.preventedByNestedSwiper) {
      touches.startX = pageX;
      touches.startY = pageY;
      return;
    }
    if (!swiper2.allowTouchMove) {
      if (!e.target.matches(data.focusableElements)) {
        swiper2.allowClick = false;
      }
      if (data.isTouched) {
        Object.assign(touches, {
          startX: pageX,
          startY: pageY,
          currentX: pageX,
          currentY: pageY
        });
        data.touchStartTime = now();
      }
      return;
    }
    if (params.touchReleaseOnEdges && !params.loop) {
      if (swiper2.isVertical()) {
        if (pageY < touches.startY && swiper2.translate <= swiper2.maxTranslate() || pageY > touches.startY && swiper2.translate >= swiper2.minTranslate()) {
          data.isTouched = false;
          data.isMoved = false;
          return;
        }
      } else if (pageX < touches.startX && swiper2.translate <= swiper2.maxTranslate() || pageX > touches.startX && swiper2.translate >= swiper2.minTranslate()) {
        return;
      }
    }
    if (document2.activeElement) {
      if (e.target === document2.activeElement && e.target.matches(data.focusableElements)) {
        data.isMoved = true;
        swiper2.allowClick = false;
        return;
      }
    }
    if (data.allowTouchCallbacks) {
      swiper2.emit("touchMove", e);
    }
    touches.previousX = touches.currentX;
    touches.previousY = touches.currentY;
    touches.currentX = pageX;
    touches.currentY = pageY;
    const diffX = touches.currentX - touches.startX;
    const diffY = touches.currentY - touches.startY;
    if (swiper2.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper2.params.threshold)
      return;
    if (typeof data.isScrolling === "undefined") {
      let touchAngle;
      if (swiper2.isHorizontal() && touches.currentY === touches.startY || swiper2.isVertical() && touches.currentX === touches.startX) {
        data.isScrolling = false;
      } else {
        if (diffX * diffX + diffY * diffY >= 25) {
          touchAngle = Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180 / Math.PI;
          data.isScrolling = swiper2.isHorizontal() ? touchAngle > params.touchAngle : 90 - touchAngle > params.touchAngle;
        }
      }
    }
    if (data.isScrolling) {
      swiper2.emit("touchMoveOpposite", e);
    }
    if (typeof data.startMoving === "undefined") {
      if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
        data.startMoving = true;
      }
    }
    if (data.isScrolling) {
      data.isTouched = false;
      return;
    }
    if (!data.startMoving) {
      return;
    }
    swiper2.allowClick = false;
    if (!params.cssMode && e.cancelable) {
      e.preventDefault();
    }
    if (params.touchMoveStopPropagation && !params.nested) {
      e.stopPropagation();
    }
    let diff = swiper2.isHorizontal() ? diffX : diffY;
    let touchesDiff = swiper2.isHorizontal() ? touches.currentX - touches.previousX : touches.currentY - touches.previousY;
    if (params.oneWayMovement) {
      diff = Math.abs(diff) * (rtl ? 1 : -1);
      touchesDiff = Math.abs(touchesDiff) * (rtl ? 1 : -1);
    }
    touches.diff = diff;
    diff *= params.touchRatio;
    if (rtl) {
      diff = -diff;
      touchesDiff = -touchesDiff;
    }
    const prevTouchesDirection = swiper2.touchesDirection;
    swiper2.swipeDirection = diff > 0 ? "prev" : "next";
    swiper2.touchesDirection = touchesDiff > 0 ? "prev" : "next";
    const isLoop = swiper2.params.loop && !params.cssMode;
    const allowLoopFix = swiper2.touchesDirection === "next" && swiper2.allowSlideNext || swiper2.touchesDirection === "prev" && swiper2.allowSlidePrev;
    if (!data.isMoved) {
      if (isLoop && allowLoopFix) {
        swiper2.loopFix({
          direction: swiper2.swipeDirection
        });
      }
      data.startTranslate = swiper2.getTranslate();
      swiper2.setTransition(0);
      if (swiper2.animating) {
        const evt = new window.CustomEvent("transitionend", {
          bubbles: true,
          cancelable: true
        });
        swiper2.wrapperEl.dispatchEvent(evt);
      }
      data.allowMomentumBounce = false;
      if (params.grabCursor && (swiper2.allowSlideNext === true || swiper2.allowSlidePrev === true)) {
        swiper2.setGrabCursor(true);
      }
      swiper2.emit("sliderFirstMove", e);
    }
    let loopFixed;
    (/* @__PURE__ */ new Date()).getTime();
    if (data.isMoved && data.allowThresholdMove && prevTouchesDirection !== swiper2.touchesDirection && isLoop && allowLoopFix && Math.abs(diff) >= 1) {
      Object.assign(touches, {
        startX: pageX,
        startY: pageY,
        currentX: pageX,
        currentY: pageY,
        startTranslate: data.currentTranslate
      });
      data.loopSwapReset = true;
      data.startTranslate = data.currentTranslate;
      return;
    }
    swiper2.emit("sliderMove", e);
    data.isMoved = true;
    data.currentTranslate = diff + data.startTranslate;
    let disableParentSwiper = true;
    let resistanceRatio = params.resistanceRatio;
    if (params.touchReleaseOnEdges) {
      resistanceRatio = 0;
    }
    if (diff > 0) {
      if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate > (params.centeredSlides ? swiper2.minTranslate() - swiper2.slidesSizesGrid[swiper2.activeIndex + 1] : swiper2.minTranslate())) {
        swiper2.loopFix({
          direction: "prev",
          setTranslate: true,
          activeSlideIndex: 0
        });
      }
      if (data.currentTranslate > swiper2.minTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) {
          data.currentTranslate = swiper2.minTranslate() - 1 + (-swiper2.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
        }
      }
    } else if (diff < 0) {
      if (isLoop && allowLoopFix && !loopFixed && data.allowThresholdMove && data.currentTranslate < (params.centeredSlides ? swiper2.maxTranslate() + swiper2.slidesSizesGrid[swiper2.slidesSizesGrid.length - 1] : swiper2.maxTranslate())) {
        swiper2.loopFix({
          direction: "next",
          setTranslate: true,
          activeSlideIndex: swiper2.slides.length - (params.slidesPerView === "auto" ? swiper2.slidesPerViewDynamic() : Math.ceil(parseFloat(params.slidesPerView, 10)))
        });
      }
      if (data.currentTranslate < swiper2.maxTranslate()) {
        disableParentSwiper = false;
        if (params.resistance) {
          data.currentTranslate = swiper2.maxTranslate() + 1 - (swiper2.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
        }
      }
    }
    if (disableParentSwiper) {
      e.preventedByNestedSwiper = true;
    }
    if (!swiper2.allowSlideNext && swiper2.swipeDirection === "next" && data.currentTranslate < data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper2.allowSlidePrev && swiper2.swipeDirection === "prev" && data.currentTranslate > data.startTranslate) {
      data.currentTranslate = data.startTranslate;
    }
    if (!swiper2.allowSlidePrev && !swiper2.allowSlideNext) {
      data.currentTranslate = data.startTranslate;
    }
    if (params.threshold > 0) {
      if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
        if (!data.allowThresholdMove) {
          data.allowThresholdMove = true;
          touches.startX = touches.currentX;
          touches.startY = touches.currentY;
          data.currentTranslate = data.startTranslate;
          touches.diff = swiper2.isHorizontal() ? touches.currentX - touches.startX : touches.currentY - touches.startY;
          return;
        }
      } else {
        data.currentTranslate = data.startTranslate;
        return;
      }
    }
    if (!params.followFinger || params.cssMode)
      return;
    if (params.freeMode && params.freeMode.enabled && swiper2.freeMode || params.watchSlidesProgress) {
      swiper2.updateActiveIndex();
      swiper2.updateSlidesClasses();
    }
    if (params.freeMode && params.freeMode.enabled && swiper2.freeMode) {
      swiper2.freeMode.onTouchMove();
    }
    swiper2.updateProgress(data.currentTranslate);
    swiper2.setTranslate(data.currentTranslate);
  }
  function onTouchEnd(event2) {
    const swiper2 = this;
    const data = swiper2.touchEventsData;
    let e = event2;
    if (e.originalEvent)
      e = e.originalEvent;
    let targetTouch;
    const isTouchEvent = e.type === "touchend" || e.type === "touchcancel";
    if (!isTouchEvent) {
      if (data.touchId !== null)
        return;
      if (e.pointerId !== data.pointerId)
        return;
      targetTouch = e;
    } else {
      targetTouch = [...e.changedTouches].filter((t) => t.identifier === data.touchId)[0];
      if (!targetTouch || targetTouch.identifier !== data.touchId)
        return;
    }
    if (["pointercancel", "pointerout", "pointerleave", "contextmenu"].includes(e.type)) {
      const proceed = ["pointercancel", "contextmenu"].includes(e.type) && (swiper2.browser.isSafari || swiper2.browser.isWebView);
      if (!proceed) {
        return;
      }
    }
    data.pointerId = null;
    data.touchId = null;
    const {
      params,
      touches,
      rtlTranslate: rtl,
      slidesGrid,
      enabled
    } = swiper2;
    if (!enabled)
      return;
    if (!params.simulateTouch && e.pointerType === "mouse")
      return;
    if (data.allowTouchCallbacks) {
      swiper2.emit("touchEnd", e);
    }
    data.allowTouchCallbacks = false;
    if (!data.isTouched) {
      if (data.isMoved && params.grabCursor) {
        swiper2.setGrabCursor(false);
      }
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    if (params.grabCursor && data.isMoved && data.isTouched && (swiper2.allowSlideNext === true || swiper2.allowSlidePrev === true)) {
      swiper2.setGrabCursor(false);
    }
    const touchEndTime = now();
    const timeDiff = touchEndTime - data.touchStartTime;
    if (swiper2.allowClick) {
      const pathTree = e.path || e.composedPath && e.composedPath();
      swiper2.updateClickedSlide(pathTree && pathTree[0] || e.target, pathTree);
      swiper2.emit("tap click", e);
      if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
        swiper2.emit("doubleTap doubleClick", e);
      }
    }
    data.lastClickTime = now();
    nextTick(() => {
      if (!swiper2.destroyed)
        swiper2.allowClick = true;
    });
    if (!data.isTouched || !data.isMoved || !swiper2.swipeDirection || touches.diff === 0 && !data.loopSwapReset || data.currentTranslate === data.startTranslate && !data.loopSwapReset) {
      data.isTouched = false;
      data.isMoved = false;
      data.startMoving = false;
      return;
    }
    data.isTouched = false;
    data.isMoved = false;
    data.startMoving = false;
    let currentPos;
    if (params.followFinger) {
      currentPos = rtl ? swiper2.translate : -swiper2.translate;
    } else {
      currentPos = -data.currentTranslate;
    }
    if (params.cssMode) {
      return;
    }
    if (params.freeMode && params.freeMode.enabled) {
      swiper2.freeMode.onTouchEnd({
        currentPos
      });
      return;
    }
    let stopIndex = 0;
    let groupSize = swiper2.slidesSizesGrid[0];
    for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
      const increment2 = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
      if (typeof slidesGrid[i + increment2] !== "undefined") {
        if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment2]) {
          stopIndex = i;
          groupSize = slidesGrid[i + increment2] - slidesGrid[i];
        }
      } else if (currentPos >= slidesGrid[i]) {
        stopIndex = i;
        groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
      }
    }
    let rewindFirstIndex = null;
    let rewindLastIndex = null;
    if (params.rewind) {
      if (swiper2.isBeginning) {
        rewindLastIndex = params.virtual && params.virtual.enabled && swiper2.virtual ? swiper2.virtual.slides.length - 1 : swiper2.slides.length - 1;
      } else if (swiper2.isEnd) {
        rewindFirstIndex = 0;
      }
    }
    const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
    const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;
    if (timeDiff > params.longSwipesMs) {
      if (!params.longSwipes) {
        swiper2.slideTo(swiper2.activeIndex);
        return;
      }
      if (swiper2.swipeDirection === "next") {
        if (ratio >= params.longSwipesRatio)
          swiper2.slideTo(params.rewind && swiper2.isEnd ? rewindFirstIndex : stopIndex + increment);
        else
          swiper2.slideTo(stopIndex);
      }
      if (swiper2.swipeDirection === "prev") {
        if (ratio > 1 - params.longSwipesRatio) {
          swiper2.slideTo(stopIndex + increment);
        } else if (rewindLastIndex !== null && ratio < 0 && Math.abs(ratio) > params.longSwipesRatio) {
          swiper2.slideTo(rewindLastIndex);
        } else {
          swiper2.slideTo(stopIndex);
        }
      }
    } else {
      if (!params.shortSwipes) {
        swiper2.slideTo(swiper2.activeIndex);
        return;
      }
      const isNavButtonTarget = swiper2.navigation && (e.target === swiper2.navigation.nextEl || e.target === swiper2.navigation.prevEl);
      if (!isNavButtonTarget) {
        if (swiper2.swipeDirection === "next") {
          swiper2.slideTo(rewindFirstIndex !== null ? rewindFirstIndex : stopIndex + increment);
        }
        if (swiper2.swipeDirection === "prev") {
          swiper2.slideTo(rewindLastIndex !== null ? rewindLastIndex : stopIndex);
        }
      } else if (e.target === swiper2.navigation.nextEl) {
        swiper2.slideTo(stopIndex + increment);
      } else {
        swiper2.slideTo(stopIndex);
      }
    }
  }
  function onResize() {
    const swiper2 = this;
    const {
      params,
      el
    } = swiper2;
    if (el && el.offsetWidth === 0)
      return;
    if (params.breakpoints) {
      swiper2.setBreakpoint();
    }
    const {
      allowSlideNext,
      allowSlidePrev,
      snapGrid
    } = swiper2;
    const isVirtual = swiper2.virtual && swiper2.params.virtual.enabled;
    swiper2.allowSlideNext = true;
    swiper2.allowSlidePrev = true;
    swiper2.updateSize();
    swiper2.updateSlides();
    swiper2.updateSlidesClasses();
    const isVirtualLoop = isVirtual && params.loop;
    if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper2.isEnd && !swiper2.isBeginning && !swiper2.params.centeredSlides && !isVirtualLoop) {
      swiper2.slideTo(swiper2.slides.length - 1, 0, false, true);
    } else {
      if (swiper2.params.loop && !isVirtual) {
        swiper2.slideToLoop(swiper2.realIndex, 0, false, true);
      } else {
        swiper2.slideTo(swiper2.activeIndex, 0, false, true);
      }
    }
    if (swiper2.autoplay && swiper2.autoplay.running && swiper2.autoplay.paused) {
      clearTimeout(swiper2.autoplay.resizeTimeout);
      swiper2.autoplay.resizeTimeout = setTimeout(() => {
        if (swiper2.autoplay && swiper2.autoplay.running && swiper2.autoplay.paused) {
          swiper2.autoplay.resume();
        }
      }, 500);
    }
    swiper2.allowSlidePrev = allowSlidePrev;
    swiper2.allowSlideNext = allowSlideNext;
    if (swiper2.params.watchOverflow && snapGrid !== swiper2.snapGrid) {
      swiper2.checkOverflow();
    }
  }
  function onClick(e) {
    const swiper2 = this;
    if (!swiper2.enabled)
      return;
    if (!swiper2.allowClick) {
      if (swiper2.params.preventClicks)
        e.preventDefault();
      if (swiper2.params.preventClicksPropagation && swiper2.animating) {
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
  }
  function onScroll() {
    const swiper2 = this;
    const {
      wrapperEl,
      rtlTranslate,
      enabled
    } = swiper2;
    if (!enabled)
      return;
    swiper2.previousTranslate = swiper2.translate;
    if (swiper2.isHorizontal()) {
      swiper2.translate = -wrapperEl.scrollLeft;
    } else {
      swiper2.translate = -wrapperEl.scrollTop;
    }
    if (swiper2.translate === 0)
      swiper2.translate = 0;
    swiper2.updateActiveIndex();
    swiper2.updateSlidesClasses();
    let newProgress;
    const translatesDiff = swiper2.maxTranslate() - swiper2.minTranslate();
    if (translatesDiff === 0) {
      newProgress = 0;
    } else {
      newProgress = (swiper2.translate - swiper2.minTranslate()) / translatesDiff;
    }
    if (newProgress !== swiper2.progress) {
      swiper2.updateProgress(rtlTranslate ? -swiper2.translate : swiper2.translate);
    }
    swiper2.emit("setTranslate", swiper2.translate, false);
  }
  function onLoad(e) {
    const swiper2 = this;
    processLazyPreloader(swiper2, e.target);
    if (swiper2.params.cssMode || swiper2.params.slidesPerView !== "auto" && !swiper2.params.autoHeight) {
      return;
    }
    swiper2.update();
  }
  function onDocumentTouchStart() {
    const swiper2 = this;
    if (swiper2.documentTouchHandlerProceeded)
      return;
    swiper2.documentTouchHandlerProceeded = true;
    if (swiper2.params.touchReleaseOnEdges) {
      swiper2.el.style.touchAction = "auto";
    }
  }
  var events = (swiper2, method) => {
    const document2 = getDocument();
    const {
      params,
      el,
      wrapperEl,
      device
    } = swiper2;
    const capture = !!params.nested;
    const domMethod = method === "on" ? "addEventListener" : "removeEventListener";
    const swiperMethod = method;
    document2[domMethod]("touchstart", swiper2.onDocumentTouchStart, {
      passive: false,
      capture
    });
    el[domMethod]("touchstart", swiper2.onTouchStart, {
      passive: false
    });
    el[domMethod]("pointerdown", swiper2.onTouchStart, {
      passive: false
    });
    document2[domMethod]("touchmove", swiper2.onTouchMove, {
      passive: false,
      capture
    });
    document2[domMethod]("pointermove", swiper2.onTouchMove, {
      passive: false,
      capture
    });
    document2[domMethod]("touchend", swiper2.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerup", swiper2.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointercancel", swiper2.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("touchcancel", swiper2.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerout", swiper2.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("pointerleave", swiper2.onTouchEnd, {
      passive: true
    });
    document2[domMethod]("contextmenu", swiper2.onTouchEnd, {
      passive: true
    });
    if (params.preventClicks || params.preventClicksPropagation) {
      el[domMethod]("click", swiper2.onClick, true);
    }
    if (params.cssMode) {
      wrapperEl[domMethod]("scroll", swiper2.onScroll);
    }
    if (params.updateOnWindowResize) {
      swiper2[swiperMethod](device.ios || device.android ? "resize orientationchange observerUpdate" : "resize observerUpdate", onResize, true);
    } else {
      swiper2[swiperMethod]("observerUpdate", onResize, true);
    }
    el[domMethod]("load", swiper2.onLoad, {
      capture: true
    });
  };
  function attachEvents() {
    const swiper2 = this;
    const {
      params
    } = swiper2;
    swiper2.onTouchStart = onTouchStart.bind(swiper2);
    swiper2.onTouchMove = onTouchMove.bind(swiper2);
    swiper2.onTouchEnd = onTouchEnd.bind(swiper2);
    swiper2.onDocumentTouchStart = onDocumentTouchStart.bind(swiper2);
    if (params.cssMode) {
      swiper2.onScroll = onScroll.bind(swiper2);
    }
    swiper2.onClick = onClick.bind(swiper2);
    swiper2.onLoad = onLoad.bind(swiper2);
    events(swiper2, "on");
  }
  function detachEvents() {
    const swiper2 = this;
    events(swiper2, "off");
  }
  var events$1 = {
    attachEvents,
    detachEvents
  };
  var isGridEnabled = (swiper2, params) => {
    return swiper2.grid && params.grid && params.grid.rows > 1;
  };
  function setBreakpoint() {
    const swiper2 = this;
    const {
      realIndex,
      initialized,
      params,
      el
    } = swiper2;
    const breakpoints2 = params.breakpoints;
    if (!breakpoints2 || breakpoints2 && Object.keys(breakpoints2).length === 0)
      return;
    const breakpoint = swiper2.getBreakpoint(breakpoints2, swiper2.params.breakpointsBase, swiper2.el);
    if (!breakpoint || swiper2.currentBreakpoint === breakpoint)
      return;
    const breakpointOnlyParams = breakpoint in breakpoints2 ? breakpoints2[breakpoint] : void 0;
    const breakpointParams = breakpointOnlyParams || swiper2.originalParams;
    const wasMultiRow = isGridEnabled(swiper2, params);
    const isMultiRow = isGridEnabled(swiper2, breakpointParams);
    const wasEnabled = params.enabled;
    if (wasMultiRow && !isMultiRow) {
      el.classList.remove(`${params.containerModifierClass}grid`, `${params.containerModifierClass}grid-column`);
      swiper2.emitContainerClasses();
    } else if (!wasMultiRow && isMultiRow) {
      el.classList.add(`${params.containerModifierClass}grid`);
      if (breakpointParams.grid.fill && breakpointParams.grid.fill === "column" || !breakpointParams.grid.fill && params.grid.fill === "column") {
        el.classList.add(`${params.containerModifierClass}grid-column`);
      }
      swiper2.emitContainerClasses();
    }
    ["navigation", "pagination", "scrollbar"].forEach((prop) => {
      if (typeof breakpointParams[prop] === "undefined")
        return;
      const wasModuleEnabled = params[prop] && params[prop].enabled;
      const isModuleEnabled = breakpointParams[prop] && breakpointParams[prop].enabled;
      if (wasModuleEnabled && !isModuleEnabled) {
        swiper2[prop].disable();
      }
      if (!wasModuleEnabled && isModuleEnabled) {
        swiper2[prop].enable();
      }
    });
    const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
    const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);
    const wasLoop = params.loop;
    if (directionChanged && initialized) {
      swiper2.changeDirection();
    }
    extend3(swiper2.params, breakpointParams);
    const isEnabled = swiper2.params.enabled;
    const hasLoop = swiper2.params.loop;
    Object.assign(swiper2, {
      allowTouchMove: swiper2.params.allowTouchMove,
      allowSlideNext: swiper2.params.allowSlideNext,
      allowSlidePrev: swiper2.params.allowSlidePrev
    });
    if (wasEnabled && !isEnabled) {
      swiper2.disable();
    } else if (!wasEnabled && isEnabled) {
      swiper2.enable();
    }
    swiper2.currentBreakpoint = breakpoint;
    swiper2.emit("_beforeBreakpoint", breakpointParams);
    if (initialized) {
      if (needsReLoop) {
        swiper2.loopDestroy();
        swiper2.loopCreate(realIndex);
        swiper2.updateSlides();
      } else if (!wasLoop && hasLoop) {
        swiper2.loopCreate(realIndex);
        swiper2.updateSlides();
      } else if (wasLoop && !hasLoop) {
        swiper2.loopDestroy();
      }
    }
    swiper2.emit("breakpoint", breakpointParams);
  }
  function getBreakpoint(breakpoints2, base, containerEl) {
    if (base === void 0) {
      base = "window";
    }
    if (!breakpoints2 || base === "container" && !containerEl)
      return void 0;
    let breakpoint = false;
    const window2 = getWindow();
    const currentHeight = base === "window" ? window2.innerHeight : containerEl.clientHeight;
    const points = Object.keys(breakpoints2).map((point) => {
      if (typeof point === "string" && point.indexOf("@") === 0) {
        const minRatio = parseFloat(point.substr(1));
        const value = currentHeight * minRatio;
        return {
          value,
          point
        };
      }
      return {
        value: point,
        point
      };
    });
    points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));
    for (let i = 0; i < points.length; i += 1) {
      const {
        point,
        value
      } = points[i];
      if (base === "window") {
        if (window2.matchMedia(`(min-width: ${value}px)`).matches) {
          breakpoint = point;
        }
      } else if (value <= containerEl.clientWidth) {
        breakpoint = point;
      }
    }
    return breakpoint || "max";
  }
  var breakpoints = {
    setBreakpoint,
    getBreakpoint
  };
  function prepareClasses(entries, prefix) {
    const resultClasses = [];
    entries.forEach((item) => {
      if (typeof item === "object") {
        Object.keys(item).forEach((classNames) => {
          if (item[classNames]) {
            resultClasses.push(prefix + classNames);
          }
        });
      } else if (typeof item === "string") {
        resultClasses.push(prefix + item);
      }
    });
    return resultClasses;
  }
  function addClasses() {
    const swiper2 = this;
    const {
      classNames,
      params,
      rtl,
      el,
      device
    } = swiper2;
    const suffixes = prepareClasses(["initialized", params.direction, {
      "free-mode": swiper2.params.freeMode && params.freeMode.enabled
    }, {
      "autoheight": params.autoHeight
    }, {
      "rtl": rtl
    }, {
      "grid": params.grid && params.grid.rows > 1
    }, {
      "grid-column": params.grid && params.grid.rows > 1 && params.grid.fill === "column"
    }, {
      "android": device.android
    }, {
      "ios": device.ios
    }, {
      "css-mode": params.cssMode
    }, {
      "centered": params.cssMode && params.centeredSlides
    }, {
      "watch-progress": params.watchSlidesProgress
    }], params.containerModifierClass);
    classNames.push(...suffixes);
    el.classList.add(...classNames);
    swiper2.emitContainerClasses();
  }
  function removeClasses() {
    const swiper2 = this;
    const {
      el,
      classNames
    } = swiper2;
    el.classList.remove(...classNames);
    swiper2.emitContainerClasses();
  }
  var classes = {
    addClasses,
    removeClasses
  };
  function checkOverflow() {
    const swiper2 = this;
    const {
      isLocked: wasLocked,
      params
    } = swiper2;
    const {
      slidesOffsetBefore
    } = params;
    if (slidesOffsetBefore) {
      const lastSlideIndex = swiper2.slides.length - 1;
      const lastSlideRightEdge = swiper2.slidesGrid[lastSlideIndex] + swiper2.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
      swiper2.isLocked = swiper2.size > lastSlideRightEdge;
    } else {
      swiper2.isLocked = swiper2.snapGrid.length === 1;
    }
    if (params.allowSlideNext === true) {
      swiper2.allowSlideNext = !swiper2.isLocked;
    }
    if (params.allowSlidePrev === true) {
      swiper2.allowSlidePrev = !swiper2.isLocked;
    }
    if (wasLocked && wasLocked !== swiper2.isLocked) {
      swiper2.isEnd = false;
    }
    if (wasLocked !== swiper2.isLocked) {
      swiper2.emit(swiper2.isLocked ? "lock" : "unlock");
    }
  }
  var checkOverflow$1 = {
    checkOverflow
  };
  var defaults = {
    init: true,
    direction: "horizontal",
    oneWayMovement: false,
    touchEventsTarget: "wrapper",
    initialSlide: 0,
    speed: 300,
    cssMode: false,
    updateOnWindowResize: true,
    resizeObserver: true,
    nested: false,
    createElements: false,
    eventsPrefix: "swiper",
    enabled: true,
    focusableElements: "input, select, option, textarea, button, video, label",
    // Overrides
    width: null,
    height: null,
    //
    preventInteractionOnTransition: false,
    // ssr
    userAgent: null,
    url: null,
    // To support iOS's swipe-to-go-back gesture (when being used in-app).
    edgeSwipeDetection: false,
    edgeSwipeThreshold: 20,
    // Autoheight
    autoHeight: false,
    // Set wrapper width
    setWrapperSize: false,
    // Virtual Translate
    virtualTranslate: false,
    // Effects
    effect: "slide",
    // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
    // Breakpoints
    breakpoints: void 0,
    breakpointsBase: "window",
    // Slides grid
    spaceBetween: 0,
    slidesPerView: 1,
    slidesPerGroup: 1,
    slidesPerGroupSkip: 0,
    slidesPerGroupAuto: false,
    centeredSlides: false,
    centeredSlidesBounds: false,
    slidesOffsetBefore: 0,
    // in px
    slidesOffsetAfter: 0,
    // in px
    normalizeSlideIndex: true,
    centerInsufficientSlides: false,
    // Disable swiper and hide navigation when container not overflow
    watchOverflow: true,
    // Round length
    roundLengths: false,
    // Touches
    touchRatio: 1,
    touchAngle: 45,
    simulateTouch: true,
    shortSwipes: true,
    longSwipes: true,
    longSwipesRatio: 0.5,
    longSwipesMs: 300,
    followFinger: true,
    allowTouchMove: true,
    threshold: 5,
    touchMoveStopPropagation: false,
    touchStartPreventDefault: true,
    touchStartForcePreventDefault: false,
    touchReleaseOnEdges: false,
    // Unique Navigation Elements
    uniqueNavElements: true,
    // Resistance
    resistance: true,
    resistanceRatio: 0.85,
    // Progress
    watchSlidesProgress: false,
    // Cursor
    grabCursor: false,
    // Clicks
    preventClicks: true,
    preventClicksPropagation: true,
    slideToClickedSlide: false,
    // loop
    loop: false,
    loopAddBlankSlides: true,
    loopAdditionalSlides: 0,
    loopPreventsSliding: true,
    // rewind
    rewind: false,
    // Swiping/no swiping
    allowSlidePrev: true,
    allowSlideNext: true,
    swipeHandler: null,
    // '.swipe-handler',
    noSwiping: true,
    noSwipingClass: "swiper-no-swiping",
    noSwipingSelector: null,
    // Passive Listeners
    passiveListeners: true,
    maxBackfaceHiddenSlides: 10,
    // NS
    containerModifierClass: "swiper-",
    // NEW
    slideClass: "swiper-slide",
    slideBlankClass: "swiper-slide-blank",
    slideActiveClass: "swiper-slide-active",
    slideVisibleClass: "swiper-slide-visible",
    slideFullyVisibleClass: "swiper-slide-fully-visible",
    slideNextClass: "swiper-slide-next",
    slidePrevClass: "swiper-slide-prev",
    wrapperClass: "swiper-wrapper",
    lazyPreloaderClass: "swiper-lazy-preloader",
    lazyPreloadPrevNext: 0,
    // Callbacks
    runCallbacksOnInit: true,
    // Internals
    _emitClasses: false
  };
  function moduleExtendParams(params, allModulesParams) {
    return function extendParams(obj) {
      if (obj === void 0) {
        obj = {};
      }
      const moduleParamName = Object.keys(obj)[0];
      const moduleParams = obj[moduleParamName];
      if (typeof moduleParams !== "object" || moduleParams === null) {
        extend3(allModulesParams, obj);
        return;
      }
      if (params[moduleParamName] === true) {
        params[moduleParamName] = {
          enabled: true
        };
      }
      if (moduleParamName === "navigation" && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].prevEl && !params[moduleParamName].nextEl) {
        params[moduleParamName].auto = true;
      }
      if (["pagination", "scrollbar"].indexOf(moduleParamName) >= 0 && params[moduleParamName] && params[moduleParamName].enabled && !params[moduleParamName].el) {
        params[moduleParamName].auto = true;
      }
      if (!(moduleParamName in params && "enabled" in moduleParams)) {
        extend3(allModulesParams, obj);
        return;
      }
      if (typeof params[moduleParamName] === "object" && !("enabled" in params[moduleParamName])) {
        params[moduleParamName].enabled = true;
      }
      if (!params[moduleParamName])
        params[moduleParamName] = {
          enabled: false
        };
      extend3(allModulesParams, obj);
    };
  }
  var prototypes = {
    eventsEmitter,
    update,
    translate,
    transition,
    slide,
    loop,
    grabCursor,
    events: events$1,
    breakpoints,
    checkOverflow: checkOverflow$1,
    classes
  };
  var extendedDefaults = {};
  var Swiper = class _Swiper {
    constructor() {
      let el;
      let params;
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      if (args.length === 1 && args[0].constructor && Object.prototype.toString.call(args[0]).slice(8, -1) === "Object") {
        params = args[0];
      } else {
        [el, params] = args;
      }
      if (!params)
        params = {};
      params = extend3({}, params);
      if (el && !params.el)
        params.el = el;
      const document2 = getDocument();
      if (params.el && typeof params.el === "string" && document2.querySelectorAll(params.el).length > 1) {
        const swipers = [];
        document2.querySelectorAll(params.el).forEach((containerEl) => {
          const newParams = extend3({}, params, {
            el: containerEl
          });
          swipers.push(new _Swiper(newParams));
        });
        return swipers;
      }
      const swiper2 = this;
      swiper2.__swiper__ = true;
      swiper2.support = getSupport();
      swiper2.device = getDevice({
        userAgent: params.userAgent
      });
      swiper2.browser = getBrowser();
      swiper2.eventsListeners = {};
      swiper2.eventsAnyListeners = [];
      swiper2.modules = [...swiper2.__modules__];
      if (params.modules && Array.isArray(params.modules)) {
        swiper2.modules.push(...params.modules);
      }
      const allModulesParams = {};
      swiper2.modules.forEach((mod) => {
        mod({
          params,
          swiper: swiper2,
          extendParams: moduleExtendParams(params, allModulesParams),
          on: swiper2.on.bind(swiper2),
          once: swiper2.once.bind(swiper2),
          off: swiper2.off.bind(swiper2),
          emit: swiper2.emit.bind(swiper2)
        });
      });
      const swiperParams = extend3({}, defaults, allModulesParams);
      swiper2.params = extend3({}, swiperParams, extendedDefaults, params);
      swiper2.originalParams = extend3({}, swiper2.params);
      swiper2.passedParams = extend3({}, params);
      if (swiper2.params && swiper2.params.on) {
        Object.keys(swiper2.params.on).forEach((eventName) => {
          swiper2.on(eventName, swiper2.params.on[eventName]);
        });
      }
      if (swiper2.params && swiper2.params.onAny) {
        swiper2.onAny(swiper2.params.onAny);
      }
      Object.assign(swiper2, {
        enabled: swiper2.params.enabled,
        el,
        // Classes
        classNames: [],
        // Slides
        slides: [],
        slidesGrid: [],
        snapGrid: [],
        slidesSizesGrid: [],
        // isDirection
        isHorizontal() {
          return swiper2.params.direction === "horizontal";
        },
        isVertical() {
          return swiper2.params.direction === "vertical";
        },
        // Indexes
        activeIndex: 0,
        realIndex: 0,
        //
        isBeginning: true,
        isEnd: false,
        // Props
        translate: 0,
        previousTranslate: 0,
        progress: 0,
        velocity: 0,
        animating: false,
        cssOverflowAdjustment() {
          return Math.trunc(this.translate / 2 ** 23) * 2 ** 23;
        },
        // Locks
        allowSlideNext: swiper2.params.allowSlideNext,
        allowSlidePrev: swiper2.params.allowSlidePrev,
        // Touch Events
        touchEventsData: {
          isTouched: void 0,
          isMoved: void 0,
          allowTouchCallbacks: void 0,
          touchStartTime: void 0,
          isScrolling: void 0,
          currentTranslate: void 0,
          startTranslate: void 0,
          allowThresholdMove: void 0,
          // Form elements to match
          focusableElements: swiper2.params.focusableElements,
          // Last click time
          lastClickTime: 0,
          clickTimeout: void 0,
          // Velocities
          velocities: [],
          allowMomentumBounce: void 0,
          startMoving: void 0,
          pointerId: null,
          touchId: null
        },
        // Clicks
        allowClick: true,
        // Touches
        allowTouchMove: swiper2.params.allowTouchMove,
        touches: {
          startX: 0,
          startY: 0,
          currentX: 0,
          currentY: 0,
          diff: 0
        },
        // Images
        imagesToLoad: [],
        imagesLoaded: 0
      });
      swiper2.emit("_swiper");
      if (swiper2.params.init) {
        swiper2.init();
      }
      return swiper2;
    }
    getDirectionLabel(property) {
      if (this.isHorizontal()) {
        return property;
      }
      return {
        "width": "height",
        "margin-top": "margin-left",
        "margin-bottom ": "margin-right",
        "margin-left": "margin-top",
        "margin-right": "margin-bottom",
        "padding-left": "padding-top",
        "padding-right": "padding-bottom",
        "marginRight": "marginBottom"
      }[property];
    }
    getSlideIndex(slideEl) {
      const {
        slidesEl,
        params
      } = this;
      const slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
      const firstSlideIndex = elementIndex(slides[0]);
      return elementIndex(slideEl) - firstSlideIndex;
    }
    getSlideIndexByData(index) {
      return this.getSlideIndex(this.slides.filter((slideEl) => slideEl.getAttribute("data-swiper-slide-index") * 1 === index)[0]);
    }
    recalcSlides() {
      const swiper2 = this;
      const {
        slidesEl,
        params
      } = swiper2;
      swiper2.slides = elementChildren(slidesEl, `.${params.slideClass}, swiper-slide`);
    }
    enable() {
      const swiper2 = this;
      if (swiper2.enabled)
        return;
      swiper2.enabled = true;
      if (swiper2.params.grabCursor) {
        swiper2.setGrabCursor();
      }
      swiper2.emit("enable");
    }
    disable() {
      const swiper2 = this;
      if (!swiper2.enabled)
        return;
      swiper2.enabled = false;
      if (swiper2.params.grabCursor) {
        swiper2.unsetGrabCursor();
      }
      swiper2.emit("disable");
    }
    setProgress(progress, speed) {
      const swiper2 = this;
      progress = Math.min(Math.max(progress, 0), 1);
      const min = swiper2.minTranslate();
      const max = swiper2.maxTranslate();
      const current = (max - min) * progress + min;
      swiper2.translateTo(current, typeof speed === "undefined" ? 0 : speed);
      swiper2.updateActiveIndex();
      swiper2.updateSlidesClasses();
    }
    emitContainerClasses() {
      const swiper2 = this;
      if (!swiper2.params._emitClasses || !swiper2.el)
        return;
      const cls = swiper2.el.className.split(" ").filter((className) => {
        return className.indexOf("swiper") === 0 || className.indexOf(swiper2.params.containerModifierClass) === 0;
      });
      swiper2.emit("_containerClasses", cls.join(" "));
    }
    getSlideClasses(slideEl) {
      const swiper2 = this;
      if (swiper2.destroyed)
        return "";
      return slideEl.className.split(" ").filter((className) => {
        return className.indexOf("swiper-slide") === 0 || className.indexOf(swiper2.params.slideClass) === 0;
      }).join(" ");
    }
    emitSlidesClasses() {
      const swiper2 = this;
      if (!swiper2.params._emitClasses || !swiper2.el)
        return;
      const updates = [];
      swiper2.slides.forEach((slideEl) => {
        const classNames = swiper2.getSlideClasses(slideEl);
        updates.push({
          slideEl,
          classNames
        });
        swiper2.emit("_slideClass", slideEl, classNames);
      });
      swiper2.emit("_slideClasses", updates);
    }
    slidesPerViewDynamic(view, exact) {
      if (view === void 0) {
        view = "current";
      }
      if (exact === void 0) {
        exact = false;
      }
      const swiper2 = this;
      const {
        params,
        slides,
        slidesGrid,
        slidesSizesGrid,
        size: swiperSize,
        activeIndex
      } = swiper2;
      let spv = 1;
      if (typeof params.slidesPerView === "number")
        return params.slidesPerView;
      if (params.centeredSlides) {
        let slideSize = slides[activeIndex] ? slides[activeIndex].swiperSlideSize : 0;
        let breakLoop;
        for (let i = activeIndex + 1; i < slides.length; i += 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize)
              breakLoop = true;
          }
        }
        for (let i = activeIndex - 1; i >= 0; i -= 1) {
          if (slides[i] && !breakLoop) {
            slideSize += slides[i].swiperSlideSize;
            spv += 1;
            if (slideSize > swiperSize)
              breakLoop = true;
          }
        }
      } else {
        if (view === "current") {
          for (let i = activeIndex + 1; i < slides.length; i += 1) {
            const slideInView = exact ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        } else {
          for (let i = activeIndex - 1; i >= 0; i -= 1) {
            const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;
            if (slideInView) {
              spv += 1;
            }
          }
        }
      }
      return spv;
    }
    update() {
      const swiper2 = this;
      if (!swiper2 || swiper2.destroyed)
        return;
      const {
        snapGrid,
        params
      } = swiper2;
      if (params.breakpoints) {
        swiper2.setBreakpoint();
      }
      [...swiper2.el.querySelectorAll('[loading="lazy"]')].forEach((imageEl) => {
        if (imageEl.complete) {
          processLazyPreloader(swiper2, imageEl);
        }
      });
      swiper2.updateSize();
      swiper2.updateSlides();
      swiper2.updateProgress();
      swiper2.updateSlidesClasses();
      function setTranslate2() {
        const translateValue = swiper2.rtlTranslate ? swiper2.translate * -1 : swiper2.translate;
        const newTranslate = Math.min(Math.max(translateValue, swiper2.maxTranslate()), swiper2.minTranslate());
        swiper2.setTranslate(newTranslate);
        swiper2.updateActiveIndex();
        swiper2.updateSlidesClasses();
      }
      let translated;
      if (params.freeMode && params.freeMode.enabled && !params.cssMode) {
        setTranslate2();
        if (params.autoHeight) {
          swiper2.updateAutoHeight();
        }
      } else {
        if ((params.slidesPerView === "auto" || params.slidesPerView > 1) && swiper2.isEnd && !params.centeredSlides) {
          const slides = swiper2.virtual && params.virtual.enabled ? swiper2.virtual.slides : swiper2.slides;
          translated = swiper2.slideTo(slides.length - 1, 0, false, true);
        } else {
          translated = swiper2.slideTo(swiper2.activeIndex, 0, false, true);
        }
        if (!translated) {
          setTranslate2();
        }
      }
      if (params.watchOverflow && snapGrid !== swiper2.snapGrid) {
        swiper2.checkOverflow();
      }
      swiper2.emit("update");
    }
    changeDirection(newDirection, needUpdate) {
      if (needUpdate === void 0) {
        needUpdate = true;
      }
      const swiper2 = this;
      const currentDirection = swiper2.params.direction;
      if (!newDirection) {
        newDirection = currentDirection === "horizontal" ? "vertical" : "horizontal";
      }
      if (newDirection === currentDirection || newDirection !== "horizontal" && newDirection !== "vertical") {
        return swiper2;
      }
      swiper2.el.classList.remove(`${swiper2.params.containerModifierClass}${currentDirection}`);
      swiper2.el.classList.add(`${swiper2.params.containerModifierClass}${newDirection}`);
      swiper2.emitContainerClasses();
      swiper2.params.direction = newDirection;
      swiper2.slides.forEach((slideEl) => {
        if (newDirection === "vertical") {
          slideEl.style.width = "";
        } else {
          slideEl.style.height = "";
        }
      });
      swiper2.emit("changeDirection");
      if (needUpdate)
        swiper2.update();
      return swiper2;
    }
    changeLanguageDirection(direction) {
      const swiper2 = this;
      if (swiper2.rtl && direction === "rtl" || !swiper2.rtl && direction === "ltr")
        return;
      swiper2.rtl = direction === "rtl";
      swiper2.rtlTranslate = swiper2.params.direction === "horizontal" && swiper2.rtl;
      if (swiper2.rtl) {
        swiper2.el.classList.add(`${swiper2.params.containerModifierClass}rtl`);
        swiper2.el.dir = "rtl";
      } else {
        swiper2.el.classList.remove(`${swiper2.params.containerModifierClass}rtl`);
        swiper2.el.dir = "ltr";
      }
      swiper2.update();
    }
    mount(element) {
      const swiper2 = this;
      if (swiper2.mounted)
        return true;
      let el = element || swiper2.params.el;
      if (typeof el === "string") {
        el = document.querySelector(el);
      }
      if (!el) {
        return false;
      }
      el.swiper = swiper2;
      if (el.parentNode && el.parentNode.host && el.parentNode.host.nodeName === "SWIPER-CONTAINER") {
        swiper2.isElement = true;
      }
      const getWrapperSelector = () => {
        return `.${(swiper2.params.wrapperClass || "").trim().split(" ").join(".")}`;
      };
      const getWrapper = () => {
        if (el && el.shadowRoot && el.shadowRoot.querySelector) {
          const res = el.shadowRoot.querySelector(getWrapperSelector());
          return res;
        }
        return elementChildren(el, getWrapperSelector())[0];
      };
      let wrapperEl = getWrapper();
      if (!wrapperEl && swiper2.params.createElements) {
        wrapperEl = createElement("div", swiper2.params.wrapperClass);
        el.append(wrapperEl);
        elementChildren(el, `.${swiper2.params.slideClass}`).forEach((slideEl) => {
          wrapperEl.append(slideEl);
        });
      }
      Object.assign(swiper2, {
        el,
        wrapperEl,
        slidesEl: swiper2.isElement && !el.parentNode.host.slideSlots ? el.parentNode.host : wrapperEl,
        hostEl: swiper2.isElement ? el.parentNode.host : el,
        mounted: true,
        // RTL
        rtl: el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl",
        rtlTranslate: swiper2.params.direction === "horizontal" && (el.dir.toLowerCase() === "rtl" || elementStyle(el, "direction") === "rtl"),
        wrongRTL: elementStyle(wrapperEl, "display") === "-webkit-box"
      });
      return true;
    }
    init(el) {
      const swiper2 = this;
      if (swiper2.initialized)
        return swiper2;
      const mounted = swiper2.mount(el);
      if (mounted === false)
        return swiper2;
      swiper2.emit("beforeInit");
      if (swiper2.params.breakpoints) {
        swiper2.setBreakpoint();
      }
      swiper2.addClasses();
      swiper2.updateSize();
      swiper2.updateSlides();
      if (swiper2.params.watchOverflow) {
        swiper2.checkOverflow();
      }
      if (swiper2.params.grabCursor && swiper2.enabled) {
        swiper2.setGrabCursor();
      }
      if (swiper2.params.loop && swiper2.virtual && swiper2.params.virtual.enabled) {
        swiper2.slideTo(swiper2.params.initialSlide + swiper2.virtual.slidesBefore, 0, swiper2.params.runCallbacksOnInit, false, true);
      } else {
        swiper2.slideTo(swiper2.params.initialSlide, 0, swiper2.params.runCallbacksOnInit, false, true);
      }
      if (swiper2.params.loop) {
        swiper2.loopCreate();
      }
      swiper2.attachEvents();
      const lazyElements = [...swiper2.el.querySelectorAll('[loading="lazy"]')];
      if (swiper2.isElement) {
        lazyElements.push(...swiper2.hostEl.querySelectorAll('[loading="lazy"]'));
      }
      lazyElements.forEach((imageEl) => {
        if (imageEl.complete) {
          processLazyPreloader(swiper2, imageEl);
        } else {
          imageEl.addEventListener("load", (e) => {
            processLazyPreloader(swiper2, e.target);
          });
        }
      });
      preload(swiper2);
      swiper2.initialized = true;
      preload(swiper2);
      swiper2.emit("init");
      swiper2.emit("afterInit");
      return swiper2;
    }
    destroy(deleteInstance, cleanStyles) {
      if (deleteInstance === void 0) {
        deleteInstance = true;
      }
      if (cleanStyles === void 0) {
        cleanStyles = true;
      }
      const swiper2 = this;
      const {
        params,
        el,
        wrapperEl,
        slides
      } = swiper2;
      if (typeof swiper2.params === "undefined" || swiper2.destroyed) {
        return null;
      }
      swiper2.emit("beforeDestroy");
      swiper2.initialized = false;
      swiper2.detachEvents();
      if (params.loop) {
        swiper2.loopDestroy();
      }
      if (cleanStyles) {
        swiper2.removeClasses();
        el.removeAttribute("style");
        wrapperEl.removeAttribute("style");
        if (slides && slides.length) {
          slides.forEach((slideEl) => {
            slideEl.classList.remove(params.slideVisibleClass, params.slideFullyVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass);
            slideEl.removeAttribute("style");
            slideEl.removeAttribute("data-swiper-slide-index");
          });
        }
      }
      swiper2.emit("destroy");
      Object.keys(swiper2.eventsListeners).forEach((eventName) => {
        swiper2.off(eventName);
      });
      if (deleteInstance !== false) {
        swiper2.el.swiper = null;
        deleteProps(swiper2);
      }
      swiper2.destroyed = true;
      return null;
    }
    static extendDefaults(newDefaults) {
      extend3(extendedDefaults, newDefaults);
    }
    static get extendedDefaults() {
      return extendedDefaults;
    }
    static get defaults() {
      return defaults;
    }
    static installModule(mod) {
      if (!_Swiper.prototype.__modules__)
        _Swiper.prototype.__modules__ = [];
      const modules = _Swiper.prototype.__modules__;
      if (typeof mod === "function" && modules.indexOf(mod) < 0) {
        modules.push(mod);
      }
    }
    static use(module) {
      if (Array.isArray(module)) {
        module.forEach((m) => _Swiper.installModule(m));
        return _Swiper;
      }
      _Swiper.installModule(module);
      return _Swiper;
    }
  };
  Object.keys(prototypes).forEach((prototypeGroup) => {
    Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
      Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
    });
  });
  Swiper.use([Resize, Observer]);

  // node_modules/swiper/shared/create-element-if-not-defined.mjs
  function createElementIfNotDefined(swiper2, originalParams, params, checkProps) {
    if (swiper2.params.createElements) {
      Object.keys(checkProps).forEach((key) => {
        if (!params[key] && params.auto === true) {
          let element = elementChildren(swiper2.el, `.${checkProps[key]}`)[0];
          if (!element) {
            element = createElement("div", checkProps[key]);
            element.className = checkProps[key];
            swiper2.el.append(element);
          }
          params[key] = element;
          originalParams[key] = element;
        }
      });
    }
    return params;
  }

  // node_modules/swiper/modules/navigation.mjs
  function Navigation(_ref) {
    let {
      swiper: swiper2,
      extendParams,
      on,
      emit
    } = _ref;
    extendParams({
      navigation: {
        nextEl: null,
        prevEl: null,
        hideOnClick: false,
        disabledClass: "swiper-button-disabled",
        hiddenClass: "swiper-button-hidden",
        lockClass: "swiper-button-lock",
        navigationDisabledClass: "swiper-navigation-disabled"
      }
    });
    swiper2.navigation = {
      nextEl: null,
      prevEl: null
    };
    const makeElementsArray = (el) => (Array.isArray(el) ? el : [el]).filter((e) => !!e);
    function getEl(el) {
      let res;
      if (el && typeof el === "string" && swiper2.isElement) {
        res = swiper2.el.querySelector(el);
        if (res)
          return res;
      }
      if (el) {
        if (typeof el === "string")
          res = [...document.querySelectorAll(el)];
        if (swiper2.params.uniqueNavElements && typeof el === "string" && res.length > 1 && swiper2.el.querySelectorAll(el).length === 1) {
          res = swiper2.el.querySelector(el);
        }
      }
      if (el && !res)
        return el;
      return res;
    }
    function toggleEl(el, disabled) {
      const params = swiper2.params.navigation;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        if (subEl) {
          subEl.classList[disabled ? "add" : "remove"](...params.disabledClass.split(" "));
          if (subEl.tagName === "BUTTON")
            subEl.disabled = disabled;
          if (swiper2.params.watchOverflow && swiper2.enabled) {
            subEl.classList[swiper2.isLocked ? "add" : "remove"](params.lockClass);
          }
        }
      });
    }
    function update2() {
      const {
        nextEl,
        prevEl
      } = swiper2.navigation;
      if (swiper2.params.loop) {
        toggleEl(prevEl, false);
        toggleEl(nextEl, false);
        return;
      }
      toggleEl(prevEl, swiper2.isBeginning && !swiper2.params.rewind);
      toggleEl(nextEl, swiper2.isEnd && !swiper2.params.rewind);
    }
    function onPrevClick(e) {
      e.preventDefault();
      if (swiper2.isBeginning && !swiper2.params.loop && !swiper2.params.rewind)
        return;
      swiper2.slidePrev();
      emit("navigationPrev");
    }
    function onNextClick(e) {
      e.preventDefault();
      if (swiper2.isEnd && !swiper2.params.loop && !swiper2.params.rewind)
        return;
      swiper2.slideNext();
      emit("navigationNext");
    }
    function init() {
      const params = swiper2.params.navigation;
      swiper2.params.navigation = createElementIfNotDefined(swiper2, swiper2.originalParams.navigation, swiper2.params.navigation, {
        nextEl: "swiper-button-next",
        prevEl: "swiper-button-prev"
      });
      if (!(params.nextEl || params.prevEl))
        return;
      let nextEl = getEl(params.nextEl);
      let prevEl = getEl(params.prevEl);
      Object.assign(swiper2.navigation, {
        nextEl,
        prevEl
      });
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const initButton = (el, dir) => {
        if (el) {
          el.addEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        }
        if (!swiper2.enabled && el) {
          el.classList.add(...params.lockClass.split(" "));
        }
      };
      nextEl.forEach((el) => initButton(el, "next"));
      prevEl.forEach((el) => initButton(el, "prev"));
    }
    function destroy() {
      let {
        nextEl,
        prevEl
      } = swiper2.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const destroyButton = (el, dir) => {
        el.removeEventListener("click", dir === "next" ? onNextClick : onPrevClick);
        el.classList.remove(...swiper2.params.navigation.disabledClass.split(" "));
      };
      nextEl.forEach((el) => destroyButton(el, "next"));
      prevEl.forEach((el) => destroyButton(el, "prev"));
    }
    on("init", () => {
      if (swiper2.params.navigation.enabled === false) {
        disable();
      } else {
        init();
        update2();
      }
    });
    on("toEdge fromEdge lock unlock", () => {
      update2();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      let {
        nextEl,
        prevEl
      } = swiper2.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      if (swiper2.enabled) {
        update2();
        return;
      }
      [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.add(swiper2.params.navigation.lockClass));
    });
    on("click", (_s, e) => {
      let {
        nextEl,
        prevEl
      } = swiper2.navigation;
      nextEl = makeElementsArray(nextEl);
      prevEl = makeElementsArray(prevEl);
      const targetEl = e.target;
      if (swiper2.params.navigation.hideOnClick && !prevEl.includes(targetEl) && !nextEl.includes(targetEl)) {
        if (swiper2.pagination && swiper2.params.pagination && swiper2.params.pagination.clickable && (swiper2.pagination.el === targetEl || swiper2.pagination.el.contains(targetEl)))
          return;
        let isHidden2;
        if (nextEl.length) {
          isHidden2 = nextEl[0].classList.contains(swiper2.params.navigation.hiddenClass);
        } else if (prevEl.length) {
          isHidden2 = prevEl[0].classList.contains(swiper2.params.navigation.hiddenClass);
        }
        if (isHidden2 === true) {
          emit("navigationShow");
        } else {
          emit("navigationHide");
        }
        [...nextEl, ...prevEl].filter((el) => !!el).forEach((el) => el.classList.toggle(swiper2.params.navigation.hiddenClass));
      }
    });
    const enable = () => {
      swiper2.el.classList.remove(...swiper2.params.navigation.navigationDisabledClass.split(" "));
      init();
      update2();
    };
    const disable = () => {
      swiper2.el.classList.add(...swiper2.params.navigation.navigationDisabledClass.split(" "));
      destroy();
    };
    Object.assign(swiper2.navigation, {
      enable,
      disable,
      update: update2,
      init,
      destroy
    });
  }

  // node_modules/swiper/shared/classes-to-selector.mjs
  function classesToSelector(classes2) {
    if (classes2 === void 0) {
      classes2 = "";
    }
    return `.${classes2.trim().replace(/([\.:!+\/])/g, "\\$1").replace(/ /g, ".")}`;
  }

  // node_modules/swiper/modules/pagination.mjs
  function Pagination(_ref) {
    let {
      swiper: swiper2,
      extendParams,
      on,
      emit
    } = _ref;
    const pfx = "swiper-pagination";
    extendParams({
      pagination: {
        el: null,
        bulletElement: "span",
        clickable: false,
        hideOnClick: false,
        renderBullet: null,
        renderProgressbar: null,
        renderFraction: null,
        renderCustom: null,
        progressbarOpposite: false,
        type: "bullets",
        // 'bullets' or 'progressbar' or 'fraction' or 'custom'
        dynamicBullets: false,
        dynamicMainBullets: 1,
        formatFractionCurrent: (number) => number,
        formatFractionTotal: (number) => number,
        bulletClass: `${pfx}-bullet`,
        bulletActiveClass: `${pfx}-bullet-active`,
        modifierClass: `${pfx}-`,
        currentClass: `${pfx}-current`,
        totalClass: `${pfx}-total`,
        hiddenClass: `${pfx}-hidden`,
        progressbarFillClass: `${pfx}-progressbar-fill`,
        progressbarOppositeClass: `${pfx}-progressbar-opposite`,
        clickableClass: `${pfx}-clickable`,
        lockClass: `${pfx}-lock`,
        horizontalClass: `${pfx}-horizontal`,
        verticalClass: `${pfx}-vertical`,
        paginationDisabledClass: `${pfx}-disabled`
      }
    });
    swiper2.pagination = {
      el: null,
      bullets: []
    };
    let bulletSize;
    let dynamicBulletIndex = 0;
    const makeElementsArray = (el) => (Array.isArray(el) ? el : [el]).filter((e) => !!e);
    function isPaginationDisabled() {
      return !swiper2.params.pagination.el || !swiper2.pagination.el || Array.isArray(swiper2.pagination.el) && swiper2.pagination.el.length === 0;
    }
    function setSideBullets(bulletEl, position) {
      const {
        bulletActiveClass
      } = swiper2.params.pagination;
      if (!bulletEl)
        return;
      bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
      if (bulletEl) {
        bulletEl.classList.add(`${bulletActiveClass}-${position}`);
        bulletEl = bulletEl[`${position === "prev" ? "previous" : "next"}ElementSibling`];
        if (bulletEl) {
          bulletEl.classList.add(`${bulletActiveClass}-${position}-${position}`);
        }
      }
    }
    function onBulletClick(e) {
      const bulletEl = e.target.closest(classesToSelector(swiper2.params.pagination.bulletClass));
      if (!bulletEl) {
        return;
      }
      e.preventDefault();
      const index = elementIndex(bulletEl) * swiper2.params.slidesPerGroup;
      if (swiper2.params.loop) {
        if (swiper2.realIndex === index)
          return;
        swiper2.slideToLoop(index);
      } else {
        swiper2.slideTo(index);
      }
    }
    function update2() {
      const rtl = swiper2.rtl;
      const params = swiper2.params.pagination;
      if (isPaginationDisabled())
        return;
      let el = swiper2.pagination.el;
      el = makeElementsArray(el);
      let current;
      let previousIndex;
      const slidesLength = swiper2.virtual && swiper2.params.virtual.enabled ? swiper2.virtual.slides.length : swiper2.slides.length;
      const total = swiper2.params.loop ? Math.ceil(slidesLength / swiper2.params.slidesPerGroup) : swiper2.snapGrid.length;
      if (swiper2.params.loop) {
        previousIndex = swiper2.previousRealIndex || 0;
        current = swiper2.params.slidesPerGroup > 1 ? Math.floor(swiper2.realIndex / swiper2.params.slidesPerGroup) : swiper2.realIndex;
      } else if (typeof swiper2.snapIndex !== "undefined") {
        current = swiper2.snapIndex;
        previousIndex = swiper2.previousSnapIndex;
      } else {
        previousIndex = swiper2.previousIndex || 0;
        current = swiper2.activeIndex || 0;
      }
      if (params.type === "bullets" && swiper2.pagination.bullets && swiper2.pagination.bullets.length > 0) {
        const bullets = swiper2.pagination.bullets;
        let firstIndex;
        let lastIndex;
        let midIndex;
        if (params.dynamicBullets) {
          bulletSize = elementOuterSize(bullets[0], swiper2.isHorizontal() ? "width" : "height", true);
          el.forEach((subEl) => {
            subEl.style[swiper2.isHorizontal() ? "width" : "height"] = `${bulletSize * (params.dynamicMainBullets + 4)}px`;
          });
          if (params.dynamicMainBullets > 1 && previousIndex !== void 0) {
            dynamicBulletIndex += current - (previousIndex || 0);
            if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
              dynamicBulletIndex = params.dynamicMainBullets - 1;
            } else if (dynamicBulletIndex < 0) {
              dynamicBulletIndex = 0;
            }
          }
          firstIndex = Math.max(current - dynamicBulletIndex, 0);
          lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
          midIndex = (lastIndex + firstIndex) / 2;
        }
        bullets.forEach((bulletEl) => {
          const classesToRemove = [...["", "-next", "-next-next", "-prev", "-prev-prev", "-main"].map((suffix) => `${params.bulletActiveClass}${suffix}`)].map((s) => typeof s === "string" && s.includes(" ") ? s.split(" ") : s).flat();
          bulletEl.classList.remove(...classesToRemove);
        });
        if (el.length > 1) {
          bullets.forEach((bullet) => {
            const bulletIndex = elementIndex(bullet);
            if (bulletIndex === current) {
              bullet.classList.add(...params.bulletActiveClass.split(" "));
            } else if (swiper2.isElement) {
              bullet.setAttribute("part", "bullet");
            }
            if (params.dynamicBullets) {
              if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
                bullet.classList.add(...`${params.bulletActiveClass}-main`.split(" "));
              }
              if (bulletIndex === firstIndex) {
                setSideBullets(bullet, "prev");
              }
              if (bulletIndex === lastIndex) {
                setSideBullets(bullet, "next");
              }
            }
          });
        } else {
          const bullet = bullets[current];
          if (bullet) {
            bullet.classList.add(...params.bulletActiveClass.split(" "));
          }
          if (swiper2.isElement) {
            bullets.forEach((bulletEl, bulletIndex) => {
              bulletEl.setAttribute("part", bulletIndex === current ? "bullet-active" : "bullet");
            });
          }
          if (params.dynamicBullets) {
            const firstDisplayedBullet = bullets[firstIndex];
            const lastDisplayedBullet = bullets[lastIndex];
            for (let i = firstIndex; i <= lastIndex; i += 1) {
              if (bullets[i]) {
                bullets[i].classList.add(...`${params.bulletActiveClass}-main`.split(" "));
              }
            }
            setSideBullets(firstDisplayedBullet, "prev");
            setSideBullets(lastDisplayedBullet, "next");
          }
        }
        if (params.dynamicBullets) {
          const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
          const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
          const offsetProp = rtl ? "right" : "left";
          bullets.forEach((bullet) => {
            bullet.style[swiper2.isHorizontal() ? offsetProp : "top"] = `${bulletsOffset}px`;
          });
        }
      }
      el.forEach((subEl, subElIndex) => {
        if (params.type === "fraction") {
          subEl.querySelectorAll(classesToSelector(params.currentClass)).forEach((fractionEl) => {
            fractionEl.textContent = params.formatFractionCurrent(current + 1);
          });
          subEl.querySelectorAll(classesToSelector(params.totalClass)).forEach((totalEl) => {
            totalEl.textContent = params.formatFractionTotal(total);
          });
        }
        if (params.type === "progressbar") {
          let progressbarDirection;
          if (params.progressbarOpposite) {
            progressbarDirection = swiper2.isHorizontal() ? "vertical" : "horizontal";
          } else {
            progressbarDirection = swiper2.isHorizontal() ? "horizontal" : "vertical";
          }
          const scale = (current + 1) / total;
          let scaleX = 1;
          let scaleY = 1;
          if (progressbarDirection === "horizontal") {
            scaleX = scale;
          } else {
            scaleY = scale;
          }
          subEl.querySelectorAll(classesToSelector(params.progressbarFillClass)).forEach((progressEl) => {
            progressEl.style.transform = `translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`;
            progressEl.style.transitionDuration = `${swiper2.params.speed}ms`;
          });
        }
        if (params.type === "custom" && params.renderCustom) {
          subEl.innerHTML = params.renderCustom(swiper2, current + 1, total);
          if (subElIndex === 0)
            emit("paginationRender", subEl);
        } else {
          if (subElIndex === 0)
            emit("paginationRender", subEl);
          emit("paginationUpdate", subEl);
        }
        if (swiper2.params.watchOverflow && swiper2.enabled) {
          subEl.classList[swiper2.isLocked ? "add" : "remove"](params.lockClass);
        }
      });
    }
    function render() {
      const params = swiper2.params.pagination;
      if (isPaginationDisabled())
        return;
      const slidesLength = swiper2.virtual && swiper2.params.virtual.enabled ? swiper2.virtual.slides.length : swiper2.grid && swiper2.params.grid.rows > 1 ? swiper2.slides.length / Math.ceil(swiper2.params.grid.rows) : swiper2.slides.length;
      let el = swiper2.pagination.el;
      el = makeElementsArray(el);
      let paginationHTML = "";
      if (params.type === "bullets") {
        let numberOfBullets = swiper2.params.loop ? Math.ceil(slidesLength / swiper2.params.slidesPerGroup) : swiper2.snapGrid.length;
        if (swiper2.params.freeMode && swiper2.params.freeMode.enabled && numberOfBullets > slidesLength) {
          numberOfBullets = slidesLength;
        }
        for (let i = 0; i < numberOfBullets; i += 1) {
          if (params.renderBullet) {
            paginationHTML += params.renderBullet.call(swiper2, i, params.bulletClass);
          } else {
            paginationHTML += `<${params.bulletElement} ${swiper2.isElement ? 'part="bullet"' : ""} class="${params.bulletClass}"></${params.bulletElement}>`;
          }
        }
      }
      if (params.type === "fraction") {
        if (params.renderFraction) {
          paginationHTML = params.renderFraction.call(swiper2, params.currentClass, params.totalClass);
        } else {
          paginationHTML = `<span class="${params.currentClass}"></span> / <span class="${params.totalClass}"></span>`;
        }
      }
      if (params.type === "progressbar") {
        if (params.renderProgressbar) {
          paginationHTML = params.renderProgressbar.call(swiper2, params.progressbarFillClass);
        } else {
          paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
        }
      }
      swiper2.pagination.bullets = [];
      el.forEach((subEl) => {
        if (params.type !== "custom") {
          subEl.innerHTML = paginationHTML || "";
        }
        if (params.type === "bullets") {
          swiper2.pagination.bullets.push(...subEl.querySelectorAll(classesToSelector(params.bulletClass)));
        }
      });
      if (params.type !== "custom") {
        emit("paginationRender", el[0]);
      }
    }
    function init() {
      swiper2.params.pagination = createElementIfNotDefined(swiper2, swiper2.originalParams.pagination, swiper2.params.pagination, {
        el: "swiper-pagination"
      });
      const params = swiper2.params.pagination;
      if (!params.el)
        return;
      let el;
      if (typeof params.el === "string" && swiper2.isElement) {
        el = swiper2.el.querySelector(params.el);
      }
      if (!el && typeof params.el === "string") {
        el = [...document.querySelectorAll(params.el)];
      }
      if (!el) {
        el = params.el;
      }
      if (!el || el.length === 0)
        return;
      if (swiper2.params.uniqueNavElements && typeof params.el === "string" && Array.isArray(el) && el.length > 1) {
        el = [...swiper2.el.querySelectorAll(params.el)];
        if (el.length > 1) {
          el = el.filter((subEl) => {
            if (elementParents(subEl, ".swiper")[0] !== swiper2.el)
              return false;
            return true;
          })[0];
        }
      }
      if (Array.isArray(el) && el.length === 1)
        el = el[0];
      Object.assign(swiper2.pagination, {
        el
      });
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        if (params.type === "bullets" && params.clickable) {
          subEl.classList.add(...(params.clickableClass || "").split(" "));
        }
        subEl.classList.add(params.modifierClass + params.type);
        subEl.classList.add(swiper2.isHorizontal() ? params.horizontalClass : params.verticalClass);
        if (params.type === "bullets" && params.dynamicBullets) {
          subEl.classList.add(`${params.modifierClass}${params.type}-dynamic`);
          dynamicBulletIndex = 0;
          if (params.dynamicMainBullets < 1) {
            params.dynamicMainBullets = 1;
          }
        }
        if (params.type === "progressbar" && params.progressbarOpposite) {
          subEl.classList.add(params.progressbarOppositeClass);
        }
        if (params.clickable) {
          subEl.addEventListener("click", onBulletClick);
        }
        if (!swiper2.enabled) {
          subEl.classList.add(params.lockClass);
        }
      });
    }
    function destroy() {
      const params = swiper2.params.pagination;
      if (isPaginationDisabled())
        return;
      let el = swiper2.pagination.el;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => {
          subEl.classList.remove(params.hiddenClass);
          subEl.classList.remove(params.modifierClass + params.type);
          subEl.classList.remove(swiper2.isHorizontal() ? params.horizontalClass : params.verticalClass);
          if (params.clickable) {
            subEl.classList.remove(...(params.clickableClass || "").split(" "));
            subEl.removeEventListener("click", onBulletClick);
          }
        });
      }
      if (swiper2.pagination.bullets)
        swiper2.pagination.bullets.forEach((subEl) => subEl.classList.remove(...params.bulletActiveClass.split(" ")));
    }
    on("changeDirection", () => {
      if (!swiper2.pagination || !swiper2.pagination.el)
        return;
      const params = swiper2.params.pagination;
      let {
        el
      } = swiper2.pagination;
      el = makeElementsArray(el);
      el.forEach((subEl) => {
        subEl.classList.remove(params.horizontalClass, params.verticalClass);
        subEl.classList.add(swiper2.isHorizontal() ? params.horizontalClass : params.verticalClass);
      });
    });
    on("init", () => {
      if (swiper2.params.pagination.enabled === false) {
        disable();
      } else {
        init();
        render();
        update2();
      }
    });
    on("activeIndexChange", () => {
      if (typeof swiper2.snapIndex === "undefined") {
        update2();
      }
    });
    on("snapIndexChange", () => {
      update2();
    });
    on("snapGridLengthChange", () => {
      render();
      update2();
    });
    on("destroy", () => {
      destroy();
    });
    on("enable disable", () => {
      let {
        el
      } = swiper2.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => subEl.classList[swiper2.enabled ? "remove" : "add"](swiper2.params.pagination.lockClass));
      }
    });
    on("lock unlock", () => {
      update2();
    });
    on("click", (_s, e) => {
      const targetEl = e.target;
      const el = makeElementsArray(swiper2.pagination.el);
      if (swiper2.params.pagination.el && swiper2.params.pagination.hideOnClick && el && el.length > 0 && !targetEl.classList.contains(swiper2.params.pagination.bulletClass)) {
        if (swiper2.navigation && (swiper2.navigation.nextEl && targetEl === swiper2.navigation.nextEl || swiper2.navigation.prevEl && targetEl === swiper2.navigation.prevEl))
          return;
        const isHidden2 = el[0].classList.contains(swiper2.params.pagination.hiddenClass);
        if (isHidden2 === true) {
          emit("paginationShow");
        } else {
          emit("paginationHide");
        }
        el.forEach((subEl) => subEl.classList.toggle(swiper2.params.pagination.hiddenClass));
      }
    });
    const enable = () => {
      swiper2.el.classList.remove(swiper2.params.pagination.paginationDisabledClass);
      let {
        el
      } = swiper2.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => subEl.classList.remove(swiper2.params.pagination.paginationDisabledClass));
      }
      init();
      render();
      update2();
    };
    const disable = () => {
      swiper2.el.classList.add(swiper2.params.pagination.paginationDisabledClass);
      let {
        el
      } = swiper2.pagination;
      if (el) {
        el = makeElementsArray(el);
        el.forEach((subEl) => subEl.classList.add(swiper2.params.pagination.paginationDisabledClass));
      }
      destroy();
    };
    Object.assign(swiper2.pagination, {
      enable,
      disable,
      render,
      update: update2,
      init,
      destroy
    });
  }

  // node_modules/swiper/modules/scrollbar.mjs
  function Scrollbar(_ref) {
    let {
      swiper: swiper2,
      extendParams,
      on,
      emit
    } = _ref;
    const document2 = getDocument();
    let isTouched = false;
    let timeout = null;
    let dragTimeout = null;
    let dragStartPos;
    let dragSize;
    let trackSize;
    let divider;
    extendParams({
      scrollbar: {
        el: null,
        dragSize: "auto",
        hide: false,
        draggable: false,
        snapOnRelease: true,
        lockClass: "swiper-scrollbar-lock",
        dragClass: "swiper-scrollbar-drag",
        scrollbarDisabledClass: "swiper-scrollbar-disabled",
        horizontalClass: `swiper-scrollbar-horizontal`,
        verticalClass: `swiper-scrollbar-vertical`
      }
    });
    swiper2.scrollbar = {
      el: null,
      dragEl: null
    };
    function setTranslate2() {
      if (!swiper2.params.scrollbar.el || !swiper2.scrollbar.el)
        return;
      const {
        scrollbar,
        rtlTranslate: rtl
      } = swiper2;
      const {
        dragEl,
        el
      } = scrollbar;
      const params = swiper2.params.scrollbar;
      const progress = swiper2.params.loop ? swiper2.progressLoop : swiper2.progress;
      let newSize = dragSize;
      let newPos = (trackSize - dragSize) * progress;
      if (rtl) {
        newPos = -newPos;
        if (newPos > 0) {
          newSize = dragSize - newPos;
          newPos = 0;
        } else if (-newPos + dragSize > trackSize) {
          newSize = trackSize + newPos;
        }
      } else if (newPos < 0) {
        newSize = dragSize + newPos;
        newPos = 0;
      } else if (newPos + dragSize > trackSize) {
        newSize = trackSize - newPos;
      }
      if (swiper2.isHorizontal()) {
        dragEl.style.transform = `translate3d(${newPos}px, 0, 0)`;
        dragEl.style.width = `${newSize}px`;
      } else {
        dragEl.style.transform = `translate3d(0px, ${newPos}px, 0)`;
        dragEl.style.height = `${newSize}px`;
      }
      if (params.hide) {
        clearTimeout(timeout);
        el.style.opacity = 1;
        timeout = setTimeout(() => {
          el.style.opacity = 0;
          el.style.transitionDuration = "400ms";
        }, 1e3);
      }
    }
    function setTransition2(duration) {
      if (!swiper2.params.scrollbar.el || !swiper2.scrollbar.el)
        return;
      swiper2.scrollbar.dragEl.style.transitionDuration = `${duration}ms`;
    }
    function updateSize2() {
      if (!swiper2.params.scrollbar.el || !swiper2.scrollbar.el)
        return;
      const {
        scrollbar
      } = swiper2;
      const {
        dragEl,
        el
      } = scrollbar;
      dragEl.style.width = "";
      dragEl.style.height = "";
      trackSize = swiper2.isHorizontal() ? el.offsetWidth : el.offsetHeight;
      divider = swiper2.size / (swiper2.virtualSize + swiper2.params.slidesOffsetBefore - (swiper2.params.centeredSlides ? swiper2.snapGrid[0] : 0));
      if (swiper2.params.scrollbar.dragSize === "auto") {
        dragSize = trackSize * divider;
      } else {
        dragSize = parseInt(swiper2.params.scrollbar.dragSize, 10);
      }
      if (swiper2.isHorizontal()) {
        dragEl.style.width = `${dragSize}px`;
      } else {
        dragEl.style.height = `${dragSize}px`;
      }
      if (divider >= 1) {
        el.style.display = "none";
      } else {
        el.style.display = "";
      }
      if (swiper2.params.scrollbar.hide) {
        el.style.opacity = 0;
      }
      if (swiper2.params.watchOverflow && swiper2.enabled) {
        scrollbar.el.classList[swiper2.isLocked ? "add" : "remove"](swiper2.params.scrollbar.lockClass);
      }
    }
    function getPointerPosition(e) {
      return swiper2.isHorizontal() ? e.clientX : e.clientY;
    }
    function setDragPosition(e) {
      const {
        scrollbar,
        rtlTranslate: rtl
      } = swiper2;
      const {
        el
      } = scrollbar;
      let positionRatio;
      positionRatio = (getPointerPosition(e) - elementOffset(el)[swiper2.isHorizontal() ? "left" : "top"] - (dragStartPos !== null ? dragStartPos : dragSize / 2)) / (trackSize - dragSize);
      positionRatio = Math.max(Math.min(positionRatio, 1), 0);
      if (rtl) {
        positionRatio = 1 - positionRatio;
      }
      const position = swiper2.minTranslate() + (swiper2.maxTranslate() - swiper2.minTranslate()) * positionRatio;
      swiper2.updateProgress(position);
      swiper2.setTranslate(position);
      swiper2.updateActiveIndex();
      swiper2.updateSlidesClasses();
    }
    function onDragStart(e) {
      const params = swiper2.params.scrollbar;
      const {
        scrollbar,
        wrapperEl
      } = swiper2;
      const {
        el,
        dragEl
      } = scrollbar;
      isTouched = true;
      dragStartPos = e.target === dragEl ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper2.isHorizontal() ? "left" : "top"] : null;
      e.preventDefault();
      e.stopPropagation();
      wrapperEl.style.transitionDuration = "100ms";
      dragEl.style.transitionDuration = "100ms";
      setDragPosition(e);
      clearTimeout(dragTimeout);
      el.style.transitionDuration = "0ms";
      if (params.hide) {
        el.style.opacity = 1;
      }
      if (swiper2.params.cssMode) {
        swiper2.wrapperEl.style["scroll-snap-type"] = "none";
      }
      emit("scrollbarDragStart", e);
    }
    function onDragMove(e) {
      const {
        scrollbar,
        wrapperEl
      } = swiper2;
      const {
        el,
        dragEl
      } = scrollbar;
      if (!isTouched)
        return;
      if (e.preventDefault)
        e.preventDefault();
      else
        e.returnValue = false;
      setDragPosition(e);
      wrapperEl.style.transitionDuration = "0ms";
      el.style.transitionDuration = "0ms";
      dragEl.style.transitionDuration = "0ms";
      emit("scrollbarDragMove", e);
    }
    function onDragEnd(e) {
      const params = swiper2.params.scrollbar;
      const {
        scrollbar,
        wrapperEl
      } = swiper2;
      const {
        el
      } = scrollbar;
      if (!isTouched)
        return;
      isTouched = false;
      if (swiper2.params.cssMode) {
        swiper2.wrapperEl.style["scroll-snap-type"] = "";
        wrapperEl.style.transitionDuration = "";
      }
      if (params.hide) {
        clearTimeout(dragTimeout);
        dragTimeout = nextTick(() => {
          el.style.opacity = 0;
          el.style.transitionDuration = "400ms";
        }, 1e3);
      }
      emit("scrollbarDragEnd", e);
      if (params.snapOnRelease) {
        swiper2.slideToClosest();
      }
    }
    function events2(method) {
      const {
        scrollbar,
        params
      } = swiper2;
      const el = scrollbar.el;
      if (!el)
        return;
      const target = el;
      const activeListener = params.passiveListeners ? {
        passive: false,
        capture: false
      } : false;
      const passiveListener = params.passiveListeners ? {
        passive: true,
        capture: false
      } : false;
      if (!target)
        return;
      const eventMethod = method === "on" ? "addEventListener" : "removeEventListener";
      target[eventMethod]("pointerdown", onDragStart, activeListener);
      document2[eventMethod]("pointermove", onDragMove, activeListener);
      document2[eventMethod]("pointerup", onDragEnd, passiveListener);
    }
    function enableDraggable() {
      if (!swiper2.params.scrollbar.el || !swiper2.scrollbar.el)
        return;
      events2("on");
    }
    function disableDraggable() {
      if (!swiper2.params.scrollbar.el || !swiper2.scrollbar.el)
        return;
      events2("off");
    }
    function init() {
      const {
        scrollbar,
        el: swiperEl
      } = swiper2;
      swiper2.params.scrollbar = createElementIfNotDefined(swiper2, swiper2.originalParams.scrollbar, swiper2.params.scrollbar, {
        el: "swiper-scrollbar"
      });
      const params = swiper2.params.scrollbar;
      if (!params.el)
        return;
      let el;
      if (typeof params.el === "string" && swiper2.isElement) {
        el = swiper2.el.querySelector(params.el);
      }
      if (!el && typeof params.el === "string") {
        el = document2.querySelectorAll(params.el);
        if (!el.length)
          return;
      } else if (!el) {
        el = params.el;
      }
      if (swiper2.params.uniqueNavElements && typeof params.el === "string" && el.length > 1 && swiperEl.querySelectorAll(params.el).length === 1) {
        el = swiperEl.querySelector(params.el);
      }
      if (el.length > 0)
        el = el[0];
      el.classList.add(swiper2.isHorizontal() ? params.horizontalClass : params.verticalClass);
      let dragEl;
      if (el) {
        dragEl = el.querySelector(classesToSelector(swiper2.params.scrollbar.dragClass));
        if (!dragEl) {
          dragEl = createElement("div", swiper2.params.scrollbar.dragClass);
          el.append(dragEl);
        }
      }
      Object.assign(scrollbar, {
        el,
        dragEl
      });
      if (params.draggable) {
        enableDraggable();
      }
      if (el) {
        el.classList[swiper2.enabled ? "remove" : "add"](...classesToTokens(swiper2.params.scrollbar.lockClass));
      }
    }
    function destroy() {
      const params = swiper2.params.scrollbar;
      const el = swiper2.scrollbar.el;
      if (el) {
        el.classList.remove(...classesToTokens(swiper2.isHorizontal() ? params.horizontalClass : params.verticalClass));
      }
      disableDraggable();
    }
    on("init", () => {
      if (swiper2.params.scrollbar.enabled === false) {
        disable();
      } else {
        init();
        updateSize2();
        setTranslate2();
      }
    });
    on("update resize observerUpdate lock unlock", () => {
      updateSize2();
    });
    on("setTranslate", () => {
      setTranslate2();
    });
    on("setTransition", (_s, duration) => {
      setTransition2(duration);
    });
    on("enable disable", () => {
      const {
        el
      } = swiper2.scrollbar;
      if (el) {
        el.classList[swiper2.enabled ? "remove" : "add"](...classesToTokens(swiper2.params.scrollbar.lockClass));
      }
    });
    on("destroy", () => {
      destroy();
    });
    const enable = () => {
      swiper2.el.classList.remove(...classesToTokens(swiper2.params.scrollbar.scrollbarDisabledClass));
      if (swiper2.scrollbar.el) {
        swiper2.scrollbar.el.classList.remove(...classesToTokens(swiper2.params.scrollbar.scrollbarDisabledClass));
      }
      init();
      updateSize2();
      setTranslate2();
    };
    const disable = () => {
      swiper2.el.classList.add(...classesToTokens(swiper2.params.scrollbar.scrollbarDisabledClass));
      if (swiper2.scrollbar.el) {
        swiper2.scrollbar.el.classList.add(...classesToTokens(swiper2.params.scrollbar.scrollbarDisabledClass));
      }
      destroy();
    };
    Object.assign(swiper2.scrollbar, {
      enable,
      disable,
      updateSize: updateSize2,
      setTranslate: setTranslate2,
      init,
      destroy
    });
  }

  // node_modules/swiper/modules/autoplay.mjs
  function Autoplay(_ref) {
    let {
      swiper: swiper2,
      extendParams,
      on,
      emit,
      params
    } = _ref;
    swiper2.autoplay = {
      running: false,
      paused: false,
      timeLeft: 0
    };
    extendParams({
      autoplay: {
        enabled: false,
        delay: 3e3,
        waitForTransition: true,
        disableOnInteraction: false,
        stopOnLastSlide: false,
        reverseDirection: false,
        pauseOnMouseEnter: false
      }
    });
    let timeout;
    let raf;
    let autoplayDelayTotal = params && params.autoplay ? params.autoplay.delay : 3e3;
    let autoplayDelayCurrent = params && params.autoplay ? params.autoplay.delay : 3e3;
    let autoplayTimeLeft;
    let autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
    let wasPaused;
    let isTouched;
    let pausedByTouch;
    let touchStartTimeout;
    let slideChanged;
    let pausedByInteraction;
    let pausedByPointerEnter;
    function onTransitionEnd(e) {
      if (!swiper2 || swiper2.destroyed || !swiper2.wrapperEl)
        return;
      if (e.target !== swiper2.wrapperEl)
        return;
      swiper2.wrapperEl.removeEventListener("transitionend", onTransitionEnd);
      if (pausedByPointerEnter) {
        return;
      }
      resume();
    }
    const calcTimeLeft = () => {
      if (swiper2.destroyed || !swiper2.autoplay.running)
        return;
      if (swiper2.autoplay.paused) {
        wasPaused = true;
      } else if (wasPaused) {
        autoplayDelayCurrent = autoplayTimeLeft;
        wasPaused = false;
      }
      const timeLeft = swiper2.autoplay.paused ? autoplayTimeLeft : autoplayStartTime + autoplayDelayCurrent - (/* @__PURE__ */ new Date()).getTime();
      swiper2.autoplay.timeLeft = timeLeft;
      emit("autoplayTimeLeft", timeLeft, timeLeft / autoplayDelayTotal);
      raf = requestAnimationFrame(() => {
        calcTimeLeft();
      });
    };
    const getSlideDelay = () => {
      let activeSlideEl;
      if (swiper2.virtual && swiper2.params.virtual.enabled) {
        activeSlideEl = swiper2.slides.filter((slideEl) => slideEl.classList.contains("swiper-slide-active"))[0];
      } else {
        activeSlideEl = swiper2.slides[swiper2.activeIndex];
      }
      if (!activeSlideEl)
        return void 0;
      const currentSlideDelay = parseInt(activeSlideEl.getAttribute("data-swiper-autoplay"), 10);
      return currentSlideDelay;
    };
    const run = (delayForce) => {
      if (swiper2.destroyed || !swiper2.autoplay.running)
        return;
      cancelAnimationFrame(raf);
      calcTimeLeft();
      let delay = typeof delayForce === "undefined" ? swiper2.params.autoplay.delay : delayForce;
      autoplayDelayTotal = swiper2.params.autoplay.delay;
      autoplayDelayCurrent = swiper2.params.autoplay.delay;
      const currentSlideDelay = getSlideDelay();
      if (!Number.isNaN(currentSlideDelay) && currentSlideDelay > 0 && typeof delayForce === "undefined") {
        delay = currentSlideDelay;
        autoplayDelayTotal = currentSlideDelay;
        autoplayDelayCurrent = currentSlideDelay;
      }
      autoplayTimeLeft = delay;
      const speed = swiper2.params.speed;
      const proceed = () => {
        if (!swiper2 || swiper2.destroyed)
          return;
        if (swiper2.params.autoplay.reverseDirection) {
          if (!swiper2.isBeginning || swiper2.params.loop || swiper2.params.rewind) {
            swiper2.slidePrev(speed, true, true);
            emit("autoplay");
          } else if (!swiper2.params.autoplay.stopOnLastSlide) {
            swiper2.slideTo(swiper2.slides.length - 1, speed, true, true);
            emit("autoplay");
          }
        } else {
          if (!swiper2.isEnd || swiper2.params.loop || swiper2.params.rewind) {
            swiper2.slideNext(speed, true, true);
            emit("autoplay");
          } else if (!swiper2.params.autoplay.stopOnLastSlide) {
            swiper2.slideTo(0, speed, true, true);
            emit("autoplay");
          }
        }
        if (swiper2.params.cssMode) {
          autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
          requestAnimationFrame(() => {
            run();
          });
        }
      };
      if (delay > 0) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          proceed();
        }, delay);
      } else {
        requestAnimationFrame(() => {
          proceed();
        });
      }
      return delay;
    };
    const start = () => {
      autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
      swiper2.autoplay.running = true;
      run();
      emit("autoplayStart");
    };
    const stop = () => {
      swiper2.autoplay.running = false;
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
      emit("autoplayStop");
    };
    const pause = (internal, reset) => {
      if (swiper2.destroyed || !swiper2.autoplay.running)
        return;
      clearTimeout(timeout);
      if (!internal) {
        pausedByInteraction = true;
      }
      const proceed = () => {
        emit("autoplayPause");
        if (swiper2.params.autoplay.waitForTransition) {
          swiper2.wrapperEl.addEventListener("transitionend", onTransitionEnd);
        } else {
          resume();
        }
      };
      swiper2.autoplay.paused = true;
      if (reset) {
        if (slideChanged) {
          autoplayTimeLeft = swiper2.params.autoplay.delay;
        }
        slideChanged = false;
        proceed();
        return;
      }
      const delay = autoplayTimeLeft || swiper2.params.autoplay.delay;
      autoplayTimeLeft = delay - ((/* @__PURE__ */ new Date()).getTime() - autoplayStartTime);
      if (swiper2.isEnd && autoplayTimeLeft < 0 && !swiper2.params.loop)
        return;
      if (autoplayTimeLeft < 0)
        autoplayTimeLeft = 0;
      proceed();
    };
    const resume = () => {
      if (swiper2.isEnd && autoplayTimeLeft < 0 && !swiper2.params.loop || swiper2.destroyed || !swiper2.autoplay.running)
        return;
      autoplayStartTime = (/* @__PURE__ */ new Date()).getTime();
      if (pausedByInteraction) {
        pausedByInteraction = false;
        run(autoplayTimeLeft);
      } else {
        run();
      }
      swiper2.autoplay.paused = false;
      emit("autoplayResume");
    };
    const onVisibilityChange = () => {
      if (swiper2.destroyed || !swiper2.autoplay.running)
        return;
      const document2 = getDocument();
      if (document2.visibilityState === "hidden") {
        pausedByInteraction = true;
        pause(true);
      }
      if (document2.visibilityState === "visible") {
        resume();
      }
    };
    const onPointerEnter = (e) => {
      if (e.pointerType !== "mouse")
        return;
      pausedByInteraction = true;
      pausedByPointerEnter = true;
      if (swiper2.animating || swiper2.autoplay.paused)
        return;
      pause(true);
    };
    const onPointerLeave = (e) => {
      if (e.pointerType !== "mouse")
        return;
      pausedByPointerEnter = false;
      if (swiper2.autoplay.paused) {
        resume();
      }
    };
    const attachMouseEvents = () => {
      if (swiper2.params.autoplay.pauseOnMouseEnter) {
        swiper2.el.addEventListener("pointerenter", onPointerEnter);
        swiper2.el.addEventListener("pointerleave", onPointerLeave);
      }
    };
    const detachMouseEvents = () => {
      swiper2.el.removeEventListener("pointerenter", onPointerEnter);
      swiper2.el.removeEventListener("pointerleave", onPointerLeave);
    };
    const attachDocumentEvents = () => {
      const document2 = getDocument();
      document2.addEventListener("visibilitychange", onVisibilityChange);
    };
    const detachDocumentEvents = () => {
      const document2 = getDocument();
      document2.removeEventListener("visibilitychange", onVisibilityChange);
    };
    on("init", () => {
      if (swiper2.params.autoplay.enabled) {
        attachMouseEvents();
        attachDocumentEvents();
        start();
      }
    });
    on("destroy", () => {
      detachMouseEvents();
      detachDocumentEvents();
      if (swiper2.autoplay.running) {
        stop();
      }
    });
    on("_freeModeStaticRelease", () => {
      if (pausedByTouch || pausedByInteraction) {
        resume();
      }
    });
    on("_freeModeNoMomentumRelease", () => {
      if (!swiper2.params.autoplay.disableOnInteraction) {
        pause(true, true);
      } else {
        stop();
      }
    });
    on("beforeTransitionStart", (_s, speed, internal) => {
      if (swiper2.destroyed || !swiper2.autoplay.running)
        return;
      if (internal || !swiper2.params.autoplay.disableOnInteraction) {
        pause(true, true);
      } else {
        stop();
      }
    });
    on("sliderFirstMove", () => {
      if (swiper2.destroyed || !swiper2.autoplay.running)
        return;
      if (swiper2.params.autoplay.disableOnInteraction) {
        stop();
        return;
      }
      isTouched = true;
      pausedByTouch = false;
      pausedByInteraction = false;
      touchStartTimeout = setTimeout(() => {
        pausedByInteraction = true;
        pausedByTouch = true;
        pause(true);
      }, 200);
    });
    on("touchEnd", () => {
      if (swiper2.destroyed || !swiper2.autoplay.running || !isTouched)
        return;
      clearTimeout(touchStartTimeout);
      clearTimeout(timeout);
      if (swiper2.params.autoplay.disableOnInteraction) {
        pausedByTouch = false;
        isTouched = false;
        return;
      }
      if (pausedByTouch && swiper2.params.cssMode)
        resume();
      pausedByTouch = false;
      isTouched = false;
    });
    on("slideChange", () => {
      if (swiper2.destroyed || !swiper2.autoplay.running)
        return;
      slideChanged = true;
    });
    Object.assign(swiper2.autoplay, {
      start,
      stop,
      pause,
      resume
    });
  }

  // node_modules/swiper/shared/effect-init.mjs
  function effectInit(params) {
    const {
      effect,
      swiper: swiper2,
      on,
      setTranslate: setTranslate2,
      setTransition: setTransition2,
      overwriteParams,
      perspective,
      recreateShadows,
      getEffectParams
    } = params;
    on("beforeInit", () => {
      if (swiper2.params.effect !== effect)
        return;
      swiper2.classNames.push(`${swiper2.params.containerModifierClass}${effect}`);
      if (perspective && perspective()) {
        swiper2.classNames.push(`${swiper2.params.containerModifierClass}3d`);
      }
      const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
      Object.assign(swiper2.params, overwriteParamsResult);
      Object.assign(swiper2.originalParams, overwriteParamsResult);
    });
    on("setTranslate", () => {
      if (swiper2.params.effect !== effect)
        return;
      setTranslate2();
    });
    on("setTransition", (_s, duration) => {
      if (swiper2.params.effect !== effect)
        return;
      setTransition2(duration);
    });
    on("transitionEnd", () => {
      if (swiper2.params.effect !== effect)
        return;
      if (recreateShadows) {
        if (!getEffectParams || !getEffectParams().slideShadows)
          return;
        swiper2.slides.forEach((slideEl) => {
          slideEl.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((shadowEl) => shadowEl.remove());
        });
        recreateShadows();
      }
    });
    let requireUpdateOnVirtual;
    on("virtualUpdate", () => {
      if (swiper2.params.effect !== effect)
        return;
      if (!swiper2.slides.length) {
        requireUpdateOnVirtual = true;
      }
      requestAnimationFrame(() => {
        if (requireUpdateOnVirtual && swiper2.slides && swiper2.slides.length) {
          setTranslate2();
          requireUpdateOnVirtual = false;
        }
      });
    });
  }

  // node_modules/swiper/shared/effect-target.mjs
  function effectTarget(effectParams, slideEl) {
    const transformEl = getSlideTransformEl(slideEl);
    if (transformEl !== slideEl) {
      transformEl.style.backfaceVisibility = "hidden";
      transformEl.style["-webkit-backface-visibility"] = "hidden";
    }
    return transformEl;
  }

  // node_modules/swiper/shared/effect-virtual-transition-end.mjs
  function effectVirtualTransitionEnd(_ref) {
    let {
      swiper: swiper2,
      duration,
      transformElements,
      allSlides
    } = _ref;
    const {
      activeIndex
    } = swiper2;
    const getSlide = (el) => {
      if (!el.parentElement) {
        const slide2 = swiper2.slides.filter((slideEl) => slideEl.shadowRoot && slideEl.shadowRoot === el.parentNode)[0];
        return slide2;
      }
      return el.parentElement;
    };
    if (swiper2.params.virtualTranslate && duration !== 0) {
      let eventTriggered = false;
      let transitionEndTarget;
      if (allSlides) {
        transitionEndTarget = transformElements;
      } else {
        transitionEndTarget = transformElements.filter((transformEl) => {
          const el = transformEl.classList.contains("swiper-slide-transform") ? getSlide(transformEl) : transformEl;
          return swiper2.getSlideIndex(el) === activeIndex;
        });
      }
      transitionEndTarget.forEach((el) => {
        elementTransitionEnd(el, () => {
          if (eventTriggered)
            return;
          if (!swiper2 || swiper2.destroyed)
            return;
          eventTriggered = true;
          swiper2.animating = false;
          const evt = new window.CustomEvent("transitionend", {
            bubbles: true,
            cancelable: true
          });
          swiper2.wrapperEl.dispatchEvent(evt);
        });
      });
    }
  }

  // node_modules/swiper/modules/effect-fade.mjs
  function EffectFade(_ref) {
    let {
      swiper: swiper2,
      extendParams,
      on
    } = _ref;
    extendParams({
      fadeEffect: {
        crossFade: false
      }
    });
    const setTranslate2 = () => {
      const {
        slides
      } = swiper2;
      const params = swiper2.params.fadeEffect;
      for (let i = 0; i < slides.length; i += 1) {
        const slideEl = swiper2.slides[i];
        const offset = slideEl.swiperSlideOffset;
        let tx = -offset;
        if (!swiper2.params.virtualTranslate)
          tx -= swiper2.translate;
        let ty = 0;
        if (!swiper2.isHorizontal()) {
          ty = tx;
          tx = 0;
        }
        const slideOpacity = swiper2.params.fadeEffect.crossFade ? Math.max(1 - Math.abs(slideEl.progress), 0) : 1 + Math.min(Math.max(slideEl.progress, -1), 0);
        const targetEl = effectTarget(params, slideEl);
        targetEl.style.opacity = slideOpacity;
        targetEl.style.transform = `translate3d(${tx}px, ${ty}px, 0px)`;
      }
    };
    const setTransition2 = (duration) => {
      const transformElements = swiper2.slides.map((slideEl) => getSlideTransformEl(slideEl));
      transformElements.forEach((el) => {
        el.style.transitionDuration = `${duration}ms`;
      });
      effectVirtualTransitionEnd({
        swiper: swiper2,
        duration,
        transformElements,
        allSlides: true
      });
    };
    effectInit({
      effect: "fade",
      swiper: swiper2,
      on,
      setTranslate: setTranslate2,
      setTransition: setTransition2,
      overwriteParams: () => ({
        slidesPerView: 1,
        slidesPerGroup: 1,
        watchSlidesProgress: true,
        spaceBetween: 0,
        virtualTranslate: !swiper2.params.cssMode
      })
    });
  }

  // wwwroot/js/src/components/swiper.js
  var swiper = () => {
    document.querySelectorAll(".js-swiper").forEach((item) => {
      let options = {};
      if (item.dataset.options) {
        options = item.dataset.options.replace(/'/g, '"').replace(/,\s*([\]}])/g, "$1");
        options = JSON.parse(options);
      }
      options.modules = [Autoplay, Navigation, Pagination, Scrollbar, EffectFade];
      new Swiper(item, options);
    });
  };
  var swiper_default = swiper;

  // wwwroot/js/src/components/tabs.js
  var import_a11y_accordion_tabs = __toESM(require_a11y_accordion_tabs());
  var tabs = () => {
    new import_a11y_accordion_tabs.default();
    document.querySelectorAll('.js-tabs[data-update-hash="true"] .js-tabs-trigger').forEach((item) => {
      item.addEventListener("click", () => {
        window.history.pushState("", "", `#${item.getAttribute("aria-controls")}`);
      });
    });
    if (window.location.hash) {
      const activeTabsTrigger = document.querySelector(`.js-tabs[data-update-hash="true"] .js-tabs-trigger[href="${window.location.hash}"]`);
      if (activeTabsTrigger) {
        window.addEventListener("DOMContentLoaded", () => {
          activeTabsTrigger.click();
          activeTabsTrigger.blur();
        });
      }
    }
    document.querySelectorAll(".js-tabs").forEach((item) => {
      const dropdown = item.querySelector(".js-tabs-dropdown");
      if (dropdown) {
        dropdown.addEventListener("change", (e) => {
          item.querySelector(`.js-tabs-trigger[href="${e.target.value}"]`).click();
        });
        item.querySelectorAll(".js-tabs-trigger").forEach((tab) => {
          tab.addEventListener("click", () => {
            dropdown.value = tab.getAttribute("href");
          });
        });
      }
    });
  };
  var tabs_default = tabs;

  // node_modules/a11y-dialog/dist/a11y-dialog.esm.js
  var not = {
    inert: ":not([inert]):not([inert] *)",
    negTabIndex: ':not([tabindex^="-"])',
    disabled: ":not(:disabled)"
  };
  var focusableSelectors = [
    `a[href]${not.inert}${not.negTabIndex}`,
    `area[href]${not.inert}${not.negTabIndex}`,
    `input:not([type="hidden"]):not([type="radio"])${not.inert}${not.negTabIndex}${not.disabled}`,
    `input[type="radio"]${not.inert}${not.negTabIndex}${not.disabled}`,
    `select${not.inert}${not.negTabIndex}${not.disabled}`,
    `textarea${not.inert}${not.negTabIndex}${not.disabled}`,
    `button${not.inert}${not.negTabIndex}${not.disabled}`,
    `details${not.inert} > summary:first-of-type${not.negTabIndex}`,
    // Discard until Firefox supports `:has()`
    // See: https://github.com/KittyGiraudel/focusable-selectors/issues/12
    // `details:not(:has(> summary))${not.inert}${not.negTabIndex}`,
    `iframe${not.inert}${not.negTabIndex}`,
    `audio[controls]${not.inert}${not.negTabIndex}`,
    `video[controls]${not.inert}${not.negTabIndex}`,
    `[contenteditable]${not.inert}${not.negTabIndex}`,
    `[tabindex]${not.inert}${not.negTabIndex}`
  ];
  function moveFocusToDialog(el) {
    const focused = el.querySelector("[autofocus]") || el;
    focused.focus();
  }
  function getFocusableEdges(el) {
    const first = findFocusableElement(el, true);
    const last = first ? findFocusableElement(el, false) || first : null;
    return [first, last];
  }
  function findFocusableElement(node, forward) {
    if (forward && isFocusable(node))
      return node;
    if (canHaveFocusableChildren(node)) {
      if (node.shadowRoot) {
        let next = getNextChildEl(node.shadowRoot, forward);
        while (next) {
          const focusableEl = findFocusableElement(next, forward);
          if (focusableEl)
            return focusableEl;
          next = getNextSiblingEl(next, forward);
        }
      } else if (node.localName === "slot") {
        const assignedElements = node.assignedElements({
          flatten: true
        });
        if (!forward)
          assignedElements.reverse();
        for (const assignedElement of assignedElements) {
          const focusableEl = findFocusableElement(assignedElement, forward);
          if (focusableEl)
            return focusableEl;
        }
      } else {
        let next = getNextChildEl(node, forward);
        while (next) {
          const focusableEl = findFocusableElement(next, forward);
          if (focusableEl)
            return focusableEl;
          next = getNextSiblingEl(next, forward);
        }
      }
    }
    if (!forward && isFocusable(node))
      return node;
    return null;
  }
  function getNextChildEl(node, forward) {
    return forward ? node.firstElementChild : node.lastElementChild;
  }
  function getNextSiblingEl(el, forward) {
    return forward ? el.nextElementSibling : el.previousElementSibling;
  }
  var isHidden = (el) => {
    if (el.matches("details:not([open]) *") && !el.matches("details>summary:first-of-type"))
      return true;
    return !(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  };
  var isFocusable = (el) => {
    var _a;
    if ((_a = el.shadowRoot) == null ? void 0 : _a.delegatesFocus)
      return false;
    return el.matches(focusableSelectors.join(",")) && !isHidden(el);
  };
  function canHaveFocusableChildren(el) {
    if (el.shadowRoot && el.getAttribute("tabindex") === "-1")
      return false;
    return !el.matches(":disabled,[hidden],[inert]");
  }
  function getActiveElement(root = document) {
    const activeEl = root.activeElement;
    if (!activeEl)
      return null;
    if (activeEl.shadowRoot)
      return getActiveElement(activeEl.shadowRoot) || document.activeElement;
    return activeEl;
  }
  function trapTabKey(el, event2) {
    const [firstFocusableChild, lastFocusableChild] = getFocusableEdges(el);
    if (!firstFocusableChild)
      return event2.preventDefault();
    const activeElement = getActiveElement();
    if (event2.shiftKey && activeElement === firstFocusableChild) {
      lastFocusableChild.focus();
      event2.preventDefault();
    } else if (!event2.shiftKey && activeElement === lastFocusableChild) {
      firstFocusableChild.focus();
      event2.preventDefault();
    }
  }
  var A11yDialog = class {
    constructor(element) {
      __publicField(this, "$el");
      __publicField(this, "id");
      __publicField(this, "previouslyFocused");
      __publicField(this, "shown");
      this.$el = element;
      this.id = this.$el.getAttribute("data-a11y-dialog") || this.$el.id;
      this.previouslyFocused = null;
      this.shown = false;
      this.maintainFocus = this.maintainFocus.bind(this);
      this.bindKeypress = this.bindKeypress.bind(this);
      this.handleTriggerClicks = this.handleTriggerClicks.bind(this);
      this.show = this.show.bind(this);
      this.hide = this.hide.bind(this);
      this.$el.setAttribute("aria-hidden", "true");
      this.$el.setAttribute("aria-modal", "true");
      this.$el.setAttribute("tabindex", "-1");
      if (!this.$el.hasAttribute("role")) {
        this.$el.setAttribute("role", "dialog");
      }
      document.addEventListener("click", this.handleTriggerClicks, true);
    }
    /**
     * Destroy the current instance (after making sure the dialog has been hidden)
     * and remove all associated listeners from dialog openers and closers
     */
    destroy() {
      this.hide();
      document.removeEventListener("click", this.handleTriggerClicks, true);
      this.$el.replaceWith(this.$el.cloneNode(true));
      this.fire("destroy");
      return this;
    }
    /**
     * Show the dialog element, trap the current focus within it, listen for some
     * specific key presses and fire all registered callbacks for `show` event
     */
    show(event2) {
      var _a;
      if (this.shown)
        return this;
      this.shown = true;
      this.$el.removeAttribute("aria-hidden");
      this.previouslyFocused = getActiveElement();
      if (((_a = this.previouslyFocused) == null ? void 0 : _a.tagName) === "BODY" && (event2 == null ? void 0 : event2.target)) {
        this.previouslyFocused = event2.target;
      }
      if ((event2 == null ? void 0 : event2.type) === "focus") {
        this.maintainFocus(event2);
      } else {
        moveFocusToDialog(this.$el);
      }
      document.body.addEventListener("focus", this.maintainFocus, true);
      this.$el.addEventListener("keydown", this.bindKeypress, true);
      this.fire("show", event2);
      return this;
    }
    /**
     * Hide the dialog element, restore the focus to the previously active
     * element, stop listening for some specific key presses and fire all
     * registered callbacks for `hide` event
     */
    hide(event2) {
      var _a, _b;
      if (!this.shown)
        return this;
      this.shown = false;
      this.$el.setAttribute("aria-hidden", "true");
      (_b = (_a = this.previouslyFocused) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a);
      document.body.removeEventListener("focus", this.maintainFocus, true);
      this.$el.removeEventListener("keydown", this.bindKeypress, true);
      this.fire("hide", event2);
      return this;
    }
    /**
     * Register a new callback for the given event type
     */
    on(type, handler, options) {
      this.$el.addEventListener(type, handler, options);
      return this;
    }
    /**
     * Unregister an existing callback for the given event type
     */
    off(type, handler, options) {
      this.$el.removeEventListener(type, handler, options);
      return this;
    }
    /**
     * Dispatch a custom event from the DOM element associated with this dialog.
     * This allows authors to listen for and respond to the events in their own
     * code
     */
    fire(type, event2) {
      this.$el.dispatchEvent(new CustomEvent(type, {
        detail: event2,
        cancelable: true
      }));
    }
    /**
     * Add a delegated event listener for when elememts that open or close the
     * dialog are clicked, and call `show` or `hide`, respectively
     */
    handleTriggerClicks(event2) {
      const target = event2.target;
      if (target.closest(`[data-a11y-dialog-show="${this.id}"]`)) {
        this.show(event2);
      }
      if (target.closest(`[data-a11y-dialog-hide="${this.id}"]`) || target.closest("[data-a11y-dialog-hide]") && target.closest('[aria-modal="true"]') === this.$el) {
        this.hide(event2);
      }
    }
    /**
     * Private event handler used when listening to some specific key presses
     * (namely ESC and TAB)
     */
    bindKeypress(event2) {
      var _a;
      if (((_a = document.activeElement) == null ? void 0 : _a.closest('[aria-modal="true"]')) !== this.$el) {
        return;
      }
      let hasOpenPopover = false;
      try {
        hasOpenPopover = !!this.$el.querySelector('[popover]:not([popover="manual"]):popover-open');
      } catch (e) {
      }
      if (event2.key === "Escape" && this.$el.getAttribute("role") !== "alertdialog" && !hasOpenPopover) {
        event2.preventDefault();
        this.hide(event2);
      }
      if (event2.key === "Tab") {
        trapTabKey(this.$el, event2);
      }
    }
    /**
     * If the dialog is shown and the focus is not within a dialog element (either
     * this one or another one in case of nested dialogs) or attribute, move it
     * back to the dialog container
     * See: https://github.com/KittyGiraudel/a11y-dialog/issues/177
     */
    maintainFocus(event2) {
      const target = event2.target;
      if (!target.closest('[aria-modal="true"], [data-a11y-dialog-ignore-focus-trap]')) {
        moveFocusToDialog(this.$el);
      }
    }
  };
  function instantiateDialogs() {
    for (const el of document.querySelectorAll("[data-a11y-dialog]")) {
      new A11yDialog(el);
    }
  }
  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", instantiateDialogs);
    } else {
      instantiateDialogs();
    }
  }

  // wwwroot/js/src/components/dialogs.js
  var dialogs = () => {
    const dialogs2 = document.querySelectorAll(".js-dialog");
    if (!dialogs2.length)
      return;
    dialogs2.forEach((dialog) => {
      const el = new A11yDialog(dialog);
      el.on("show", () => {
        document.documentElement.classList.add("overflow-hidden");
      });
      el.on("hide", () => {
        document.documentElement.classList.remove("overflow-hidden");
      });
    });
  };
  var formsAccessDialog = () => {
    const dialog = document.querySelector("#forms-library-dialog");
    if (!dialog)
      return;
    const hiddenTrigger = document.querySelector('[data-a11y-dialog-show="forms-library-dialog"]');
    const closeTrigger = dialog.querySelector("[data-a11y-dialog-hide]");
    const checkbox = dialog.querySelector('.dialog-content-footer input[type="checkbox"]');
    const submit = dialog.querySelector(".dialog-content-footer .btn-primary");
    window.addEventListener("DOMContentLoaded", (e) => {
      if (!localStorage.getItem("forms-access-approved")) {
        hiddenTrigger.click();
      }
    });
    checkbox.addEventListener("change", (e) => {
      if (e.target.checked) {
        submit.removeAttribute("disabled");
      } else {
        submit.setAttribute("disabled", "disabled");
      }
    });
    submit.addEventListener("click", (e) => {
      if (!localStorage.getItem("forms-access-approved")) {
        localStorage.setItem("forms-access-approved", true);
      }
      closeTrigger.click();
    });
  };

  // wwwroot/js/src/components/home-hero.js
  var homeHero = () => {
    const tab = document.querySelector(".js-calendar-tab");
    const tabPanel = document.querySelector(".js-calendar-panel");
    if (!tab)
      return;
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      tabPanel.classList.toggle("is-active");
      tab.classList.toggle("is-active");
    });
  };
  var home_hero_default = homeHero;

  // wwwroot/js/src/components/playlist.js
  var playList = () => {
    const player = document.getElementById("js-playlist-player");
    const dateText = document.querySelector(".js-playlist-date");
    const titleText = document.querySelector(".js-playlist-title");
    const descrText = document.querySelector(".js-playlist-description");
    const playlistItems = document.querySelectorAll(".js-playlist-item");
    const updateView = ({ title, description, date, yt }) => {
      window.scrollTo({
        top: 120,
        left: 0,
        behavior: "smooth"
      });
      player.src = `https://www.youtube.com/embed/${yt}?autoplay=1`;
      dateText.innerHTML = date;
      titleText.innerHTML = title;
      descrText.innerHTML = description;
    };
    const handleActive = (activeItem) => {
      const currentActive = document.querySelector('.js-playlist-item[aria-selected="true"]');
      currentActive.setAttribute("aria-selected", "false");
      activeItem.setAttribute("aria-selected", "true");
    };
    playlistItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault();
        updateView({
          title: item.dataset.title,
          description: item.dataset.description,
          date: item.dataset.date,
          yt: item.dataset.yt
        });
        handleActive(item);
      });
    });
  };
  var playlist_default = playList;

  // wwwroot/js/src/components/hot-tip-library.js
  var hotTipLibrary = () => {
    const params = new URLSearchParams(window.location.search);
    const resultsList = document.querySelector(".js-hot-tip-list");
    if (!resultsList)
      return;
    const mobileCategorySelect = document.querySelector(".js-mobile-hot-tip-category");
    const mobileSubcategorySelect = document.querySelector(".js-mobile-hot-tip-subcategory");
    const desktopSubcategoryFilters = document.querySelectorAll(".js-desktop-subcategory-filter");
    let selectedCategories = params.has("category") ? [params.get("category")] : [];
    let selectedSubcategories = params.has("subcategory") ? [params.get("subcategory")] : [];
    const paginationContainer = document.querySelector(".js-hot-tip-list-pagination");
    let pageNumber = 1;
    const pageSize = 10;
    let totalResults = 0;
    let totalResultPages = 0;
    getResults();
    handleFilterEvents();
    const scrollBackTop = () => {
      resultsList.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest"
      });
    };
    function clearResults() {
      resultsList.innerHTML = "";
    }
    function getResults() {
      fetch("/HotTips", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "categories": selectedCategories,
          "subcategories": selectedSubcategories,
          "pagination": {
            "pageNumber": pageNumber,
            "pageSize": pageSize
          }
        })
      }).then((response) => {
        return response.json();
      }).then((data) => {
        renderResults(data.hotTips);
        handleCardToggles();
        totalResults = data.searchInfo.totalResults;
        totalResultPages = Math.ceil(totalResults / pageSize);
        createPagination(totalResultPages);
      });
    }
    function renderResults(results) {
      clearResults();
      if (results.length) {
        results.forEach((result) => {
          let publishDate = new Date(result.publishDate);
          let categories = result.categories;
          let subcategories = result.subCategory;
          resultsList.innerHTML += `
                    <div class="mb-2 p-4 pb-2 bg-light" itemscope itemtype="https://schema.org/Question">
                        <div class="d-flex align-items-lg-center mb-3 fw-semibold" style="font-size: 0.75rem;">
                            <div class="flex-grow-1">
                                ${Object.keys(categories).map((category) => {
            return `<span class="d-inline-block mb-1 me-1 px-3 py-2 rounded-pill bg-secondary text-white">${result.categories[category]}</span>`;
          }).join("")}
                                ${Object.keys(subcategories).map((subcategory) => {
            return `<span class="d-inline-block mb-1 me-1 px-3 py-2 rounded-pill bg-primary text-white">${result.subCategory[subcategory]}</span>`;
          }).join("")}
                            </div>
                            <time itemprop="dateCreated" datetime="${publishDate}">${publishDate.getMonth() + 1}/${publishDate.getDate()}/${publishDate.getFullYear()}</time>
                        </div>
                        <div class="hot-tip-content">
                            <div itemprop="name" class="mb-3">
                                ${result.question}
                            </div>
                            <div itemprop="acceptedAnswer" itemscope itemtype="https://schema.org/Answer">
                                <div itemprop="text">
                                    ${result.answer}
                                </div>
                            </div>
                        </div>
                        <button class="hot-tip-toggle py-3" type="button">Read Answer</button>
                    </div>
                `;
        });
      } else {
        resultsList.innerHTML = '<div class="pb-5 pb-lg-10 text-center">Sorry, there are no results that match the search criteria.</div>';
      }
    }
    function handleCardToggles() {
      const toggles = document.querySelectorAll(".hot-tip-toggle");
      toggles.forEach((toggle) => {
        toggle.addEventListener("click", (e) => {
          let toggle2 = e.target;
          let content = e.target.previousElementSibling;
          if (content.classList.contains("hot-tip-content--expanded")) {
            toggle2.innerText = "Read Answer";
            content.classList.remove("hot-tip-content--expanded");
          } else {
            toggle2.innerText = "Close Answer";
            content.classList.add("hot-tip-content--expanded");
          }
        });
      });
    }
    function handleFilterEvents() {
      mobileCategorySelect.addEventListener("change", (e) => {
        if (e.target.value === "") {
          params.delete("category");
        } else {
          params.set("category", e.target.value);
        }
        params.delete("subcategory");
        window.location.search = params.toString();
      });
      if (mobileSubcategorySelect) {
        mobileSubcategorySelect.addEventListener("change", (e) => {
          if (e.target.value === "") {
            params.delete("subcategory");
          } else {
            params.set("subcategory", e.target.value);
          }
          window.location.search = params.toString();
        });
      }
      if (desktopSubcategoryFilters.length) {
        desktopSubcategoryFilters.forEach((filter) => {
          filter.addEventListener("click", (e) => {
            if (selectedSubcategory != e.target.value) {
              params.set("subcategory", e.target.value);
              window.location.search = params.toString();
            }
          });
        });
      }
    }
    function clearPagination() {
      if (paginationContainer.nextElementSibling !== null) {
        if (paginationContainer.nextElementSibling.tagName == "BUTTON") {
          paginationContainer.nextElementSibling.remove();
        }
      }
      if (paginationContainer.previousElementSibling !== null) {
        if (paginationContainer.previousElementSibling.tagName == "BUTTON") {
          paginationContainer.previousElementSibling.remove();
        }
      }
      paginationContainer.innerHTML = "";
    }
    function createPagination(totalPages) {
      totalResultPages = parseInt(totalResultPages);
      clearPagination();
      if (totalPages > 1) {
        paginationContainer.classList.add("py-4");
        for (var i = 0; i < totalPages; i++) {
          let li = document.createElement("li");
          li.setAttribute("role", "button");
          li.setAttribute("title", `Go to page ${i + 1}`);
          if (pageNumber == i + 1) {
            li.classList.add("current");
          }
          if (totalPages > 6) {
            if (i < pageNumber && i > pageNumber - 5 || i > pageNumber - 1 && i < pageNumber - 1 + 4) {
              li.classList.add("d-inline-block");
            } else {
              li.classList.add("d-none");
              li.setAttribute("aria-hidden", "true");
            }
          }
          li.textContent = i + 1;
          li.addEventListener("click", (e) => {
            e.preventDefault();
            pageNumber = e.target.textContent;
            clearResults();
            getResults();
            scrollBackTop();
          });
          paginationContainer.appendChild(li);
        }
        if (pageNumber > 1) {
          let prevBtn = document.createElement("button");
          prevBtn.classList.add("btn-prev");
          prevBtn.setAttribute("title", "Go to previous page");
          prevBtn.addEventListener("click", (e) => {
            e.preventDefault();
            pageNumber -= 1;
            clearResults();
            getResults();
            scrollBackTop();
          });
          paginationContainer.before(prevBtn);
        }
        if (pageNumber < totalPages) {
          let nextBtn = document.createElement("button");
          nextBtn.classList.add("btn-next");
          nextBtn.setAttribute("title", "Go to next page");
          nextBtn.addEventListener("click", (e) => {
            e.preventDefault();
            pageNumber += 1;
            clearResults();
            getResults();
            scrollBackTop();
          });
          paginationContainer.after(nextBtn);
        }
      }
    }
  };
  var hot_tip_library_default = hotTipLibrary;

  // wwwroot/js/src/components/alert.js
  var alert = () => {
    const closeAlert = document.querySelector(".js-alert-close");
    const alertBanner = document.getElementById("site-alert");
    const setCookie = (timestamp, exp) => {
      const now2 = /* @__PURE__ */ new Date();
      const minutes = 60 * 24 * parseInt(exp);
      now2.setTime(now2.getTime() + minutes * 60 * 1e3);
      document.cookie = `wra_alert_banner=${timestamp};expires=` + now2.toUTCString() + ";";
    };
    if (closeAlert !== null) {
      closeAlert.addEventListener("click", (e) => {
        e.preventDefault();
        alertBanner.remove();
        const timestamp = alertBanner.dataset.timestamp;
        const exp = alertBanner.dataset.expiration;
        setCookie(timestamp, exp);
      });
    }
  };
  var alert_default = alert;

  // wwwroot/js/src/components/article-filters.js
  var articleFilters = () => {
    const filterResults = document.querySelector(".js-article-results");
    if (!filterResults)
      return;
    const filterBtns = document.querySelectorAll(".js-article-filter");
    const filterDropdown = document.querySelector(".js-article-dropdown");
    const searchForm = document.getElementById("news-search");
    const paginationContainer = document.querySelector(".js-articles-pagination");
    const resultsLoader = document.querySelector(".js-results-loader");
    const featuredArticles = document.querySelectorAll(".js-featured-article");
    const apiEndpointUrl = "/NewsAndUpdates";
    let pageNumber = 1;
    const pageSize = 15;
    let totalResults = 0;
    let totalResultPages = 0;
    const windowLoadQueryString = window.location.search;
    const urlParams = new URLSearchParams(windowLoadQueryString);
    let searchPhrase = "";
    if (urlParams.has("search")) {
      searchPhrase = urlParams.get("search");
    }
    let category = "";
    if (urlParams.has("category")) {
      category = urlParams.get("category");
    }
    const scrollBackTop = () => {
      filterResults.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    };
    const handleIndicators = (show, waitLoaderElement) => {
      if (show == true) {
        waitLoaderElement.hidden = false;
      } else {
        waitLoaderElement.hidden = true;
      }
    };
    const killResults = () => {
      filterResults.innerHTML = "";
    };
    const btnStates = (clearAll, setToCat) => {
      filterBtns.forEach((filterBtn) => {
        if (filterBtn.value == setToCat && clearAll !== true) {
          filterBtn.setAttribute("aria-selected", "true");
          filterDropdown.value = setToCat;
        } else {
          filterBtn.setAttribute("aria-selected", "false");
        }
      });
      if (filterDropdown.value == setToCat) {
        filterDropdown.value = setToCat;
      } else {
        filterDropdown.value = "";
      }
    };
    const featuredArticleHandler = (activeFeature, hideAll) => {
      const firstCatSlug = featuredArticles[0].dataset.featuredcat;
      featuredArticles.forEach((featuredArticle) => {
        if (hideAll) {
          featuredArticle.hidden = true;
        } else {
          const featureCategory = featuredArticle.dataset.featuredcat;
          if (featureCategory == activeFeature && featureCategory !== "all" || featureCategory == "all" && activeFeature == "" || activeFeature == "" && featureCategory == firstCatSlug) {
            featuredArticle.hidden = false;
          } else {
            featuredArticle.hidden = true;
          }
        }
      });
    };
    const renderResults = (results) => {
      if (searchPhrase !== "") {
        btnStates(true, category);
      } else {
        btnStates(false, category);
      }
      if (results.length > 0) {
        results.forEach((result) => {
          const setImage = result.image !== "" ? result.image : filterResults.dataset.fallback;
          filterResults.innerHTML += `
                        <div class="d-block col-md-6 col-lg-4">
                            <a href="${result.url}" class="news-card news-card--lg text-decoration-none d-block p-4" style="color: var(--bs-dark);">
                                <div class="mb-4 ratio ratio-16x9">
                                    <img src="${setImage}" loading="lazy" class="img-fluid" width="660" height="330" alt="${result.title}">
                                </div>

                                <div class="mb-2 d-flex flex-row align-items-center justify-content-between">
                                    <time class="fs-xs fw-bold" datetime="${result.date}">
                                        ${result.dateDisplay}
                                    </time>
                                    <span class="chip chip--no-hover align-self-start">
                                        ${result.category}
                                    </span>
                                </div>
                                <h3 class="h6 mb-2">${result.title}</h3>
                                <p class="fs-sm">${result.excerpt}</p>
                            </a>
                        </div>
                    `;
        });
      } else {
        filterResults.innerHTML = `<div class="d-block col-md-10 mx-auto h5 text-center">No results. Try again.</div>`;
      }
      handleIndicators(false, resultsLoader);
    };
    const handleClearPagination = (paginationElement) => {
      if (paginationElement.nextElementSibling !== null) {
        if (paginationElement.nextElementSibling.tagName == "BUTTON") {
          paginationElement.nextElementSibling.remove();
        }
      }
      if (paginationElement.previousElementSibling !== null) {
        if (paginationElement.previousElementSibling.tagName == "BUTTON") {
          paginationElement.previousElementSibling.remove();
        }
      }
      paginationElement.innerHTML = "";
    };
    const createPagination = (paginationElement, resultPageCount) => {
      const totalPages = parseInt(resultPageCount);
      handleClearPagination(paginationContainer);
      if (totalPages > 1) {
        for (var i = 0; i < totalPages; i++) {
          let li = document.createElement("li");
          li.setAttribute("role", "button");
          li.setAttribute("title", `Go to page ${i + 1}`);
          if (pageNumber == i + 1) {
            li.classList.add("current");
          }
          if (totalPages > 6) {
            if (i < pageNumber && i > pageNumber - 5 || i > pageNumber - 1 && i < pageNumber - 1 + 4) {
              li.classList.add("d-inline-block");
            } else {
              li.classList.add("d-none");
              li.setAttribute("aria-hidden", "true");
            }
          }
          li.textContent = i + 1;
          li.addEventListener("click", (e) => {
            e.preventDefault();
            pageNumber = e.target.textContent;
            killResults();
            postResults2();
            scrollBackTop();
          });
          paginationElement.appendChild(li);
        }
      }
      if (totalPages > 1) {
        if (pageNumber > 1) {
          let prevBtn = document.createElement("button");
          prevBtn.classList.add("btn-prev");
          prevBtn.setAttribute("title", "Go to previous page");
          prevBtn.addEventListener("click", (e) => {
            e.preventDefault();
            pageNumber -= 1;
            killResults();
            postResults2();
            scrollBackTop();
          });
          paginationElement.before(prevBtn);
        }
        if (pageNumber < totalPages) {
          let nextBtn = document.createElement("button");
          nextBtn.classList.add("btn-next");
          nextBtn.setAttribute("title", "Go to next page");
          nextBtn.addEventListener("click", (e) => {
            e.preventDefault();
            pageNumber += 1;
            killResults();
            postResults2();
            scrollBackTop();
          });
          paginationElement.after(nextBtn);
        }
      }
    };
    const postResults2 = () => {
      handleIndicators(true, resultsLoader);
      let bodyObject = {
        "searchPhrase": searchPhrase,
        "category": decodeURIComponent(category),
        //need to decode for API post
        "pagination": {
          "pageNumber": pageNumber,
          "pageSize": pageSize
        }
      };
      if (category == "" && searchPhrase !== "") {
        featuredArticleHandler(category, true);
      } else {
        featuredArticleHandler(category, false);
      }
      const bodyRequest = JSON.stringify(bodyObject);
      fetch(
        apiEndpointUrl,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          referrerPolicy: "no-referrer",
          body: bodyRequest
        }
      ).then((res) => {
        return res.json();
      }).then((res) => {
        renderResults(res.newsRecords);
        totalResults = res.searchResultInfo.totalResults;
        totalResultPages = Math.ceil(totalResults / pageSize);
        createPagination(paginationContainer, totalResultPages);
      });
    };
    const urlHandler = (isCategory) => {
      if (isCategory) {
        urlParams.set("category", category);
        window.history.pushState({ id: `category-${category}` }, "", `${location.pathname}?category=${category}`);
      } else {
        urlParams.set("search", searchPhrase);
        window.history.pushState({ id: "search-searchPhrase" }, "", `${location.pathname}?search=${searchPhrase}`);
      }
    };
    const resetElements = (resetForm) => {
      if (resetForm) {
        searchForm.querySelector("input").value = "";
      } else {
        btnStates(true);
      }
    };
    filterBtns.forEach((filterBtn) => {
      filterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        resetElements(true);
        killResults();
        searchPhrase = "";
        category = filterBtn.value;
        pageNumber = 1;
        urlHandler(true);
        postResults2();
      });
    });
    filterDropdown.addEventListener("change", (e) => {
      e.preventDefault();
      resetElements(true);
      killResults();
      searchPhrase = "";
      category = e.target.value;
      pageNumber = 1;
      urlHandler(true);
      postResults2();
    });
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      killResults();
      category = "";
      const textField = searchForm.querySelector("input");
      searchPhrase = textField.value;
      pageNumber = 1;
      urlHandler(false);
      postResults2();
    });
    window.addEventListener("popstate", () => {
      killResults();
      pageNumber = 1;
      const popUrlCatParams = new URLSearchParams(window.location.search);
      if (popUrlCatParams.has("category")) {
        category = popUrlCatParams.get("category");
        featuredArticleHandler(category, false);
        resetElements(true);
      } else {
        category = "";
        resetElements(true);
      }
      const popUrlSearchParams = new URLSearchParams(window.location.search);
      if (popUrlSearchParams.has("search")) {
        searchPhrase = popUrlSearchParams.get("search");
        searchForm.querySelector("input").value = searchPhrase;
      } else {
        searchPhrase = "";
        resetElements(true);
      }
      postResults2();
    });
    if (urlParams.has("search")) {
      killResults();
      pageNumber = 1;
      category = "";
      searchPhrase = urlParams.get("search");
      searchForm.querySelector("input").value = searchPhrase;
      postResults2();
    } else {
      pageNumber = 1;
      createPagination(paginationContainer, filterResults.dataset.cattotal);
    }
  };
  var article_filters_default = articleFilters;

  // wwwroot/js/src/components/multimedia-filters.js
  var multimediaFilters = () => {
    const filterResults = document.querySelector(".js-multimedia-results");
    if (!filterResults)
      return;
    const filterBtns = document.querySelectorAll(".js-multimedia-filter");
    const filterDropdown = document.querySelector(".js-multimedia-dropdown");
    const searchForm = document.getElementById("multimedia-search");
    const paginationContainer = document.querySelector(".js-multimedia-pagination");
    const resultsLoader = document.querySelector(".js-results-loader");
    const featuredItems = document.querySelectorAll(".js-featured");
    const apiEndpointUrl = "/Multimedia";
    let pageNumber = 1;
    const pageSize = 15;
    let totalResults = 0;
    let totalResultPages = 0;
    const windowLoadQueryString = window.location.search;
    const urlParams = new URLSearchParams(windowLoadQueryString);
    let searchPhrase = "";
    if (urlParams.has("search")) {
      searchPhrase = urlParams.get("search");
    }
    let type = "";
    if (urlParams.has("type")) {
      type = urlParams.get("type");
    }
    const scrollBackTop = () => {
      filterResults.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
    };
    const handleIndicators = (show, waitLoaderElement) => {
      if (show == true) {
        waitLoaderElement.hidden = false;
      } else {
        waitLoaderElement.hidden = true;
      }
    };
    const killResults = () => {
      filterResults.innerHTML = "";
    };
    const btnStates = (clearAll, setToCat) => {
      filterBtns.forEach((filterBtn) => {
        if (filterBtn.value == setToCat && clearAll !== true) {
          filterBtn.setAttribute("aria-selected", "true");
          filterDropdown.value = setToCat;
        } else {
          filterBtn.setAttribute("aria-selected", "false");
        }
      });
      if (filterDropdown.value == setToCat) {
        filterDropdown.value = setToCat;
      } else {
        filterDropdown.value = "";
      }
    };
    const featuredHandler = (activeFeature, hideAll) => {
      featuredItems.forEach((featuredItem) => {
        if (hideAll) {
          featuredItem.hidden = true;
        } else {
          const featuretype = featuredItem.dataset.featuredtype;
          if (featuretype == activeFeature && featuretype !== "all" || featuretype == "all" && activeFeature == "") {
            featuredItem.hidden = false;
          } else {
            featuredItem.hidden = true;
          }
        }
      });
    };
    const renderResults = (results) => {
      if (searchPhrase !== "") {
        btnStates(true, type);
      } else {
        btnStates(false, type);
      }
      if (results.length > 0) {
        results.forEach((result) => {
          let setImage = "";
          if (result.isPlaylist) {
            if (result.thumbnailOverride !== "") {
              setImage = result.thumbnailOverride;
            } else {
              if (result.children[0].thumbnailOverride !== "") {
                setImage = result.children[0].thumbnailOverride;
              } else {
                setImage = `https://i3.ytimg.com/vi/${result.children[0].youTubeId}/maxresdefault.jpg`;
              }
            }
          } else {
            setImage = result.thumbnailOverride !== "" ? result.thumbnailOverride : `https://i3.ytimg.com/vi/${result.youTubeId}/maxresdefault.jpg`;
          }
          const setChip = result.isPlaylist ? '<span class="chip chip--no-hover">Playlist</span>' : `<span class="chip chip--no-hover align-self-start">${result.type}</span>`;
          const setCSS = result.isPlaylist ? "card-media--playlist" : "";
          filterResults.innerHTML += `
                    <div class="d-block col-md-6 col-lg-4">
                        <a href="${result.url}" class="card card-media ${setCSS} p-4 flex-md-column align-items-start text-decoration-none">
                            <div class="ratio ratio-16x9 mb-3 card-media__img">
                                <img src="${setImage}" loading="lazy" class="img-fluid" width="660" height="330" alt="${result.title}">
                            </div>
                            <div class="d-flex flex-row align-items-center justify-content-between w-100">
                                <time class="fs-xs fw-bold" datetime="${result.date}">
                                    ${result.dateDisplay}
                                </time>
                                ${setChip}
                            </div>
                            <h3 class="h6 mb-2">${result.title}</h3>
                            <p class="fs-sm">${result.description}</p>
                        </a>
                    </div>
                    `;
          if (result.children.length) {
            result.children.forEach((resultChild) => {
              const setChildImage = resultChild.thumbnailOverride !== "" ? resultChild.thumbnailOverride : `https://i3.ytimg.com/vi/${resultChild.youTubeId}/maxresdefault.jpg`;
              filterResults.innerHTML += `
                            <div class="d-block col-md-6 col-lg-4">
                                <a href="${resultChild.url}" class="card card-media p-4 flex-md-column align-items-start text-decoration-none">
                                    <div class="ratio ratio-16x9 mb-3 card-media__img">
                                        <img src="${setChildImage}" loading="lazy" class="img-fluid" width="660" height="330" alt="${resultChild.title}">
                                    </div>
                                    <div class="d-flex flex-row align-items-center justify-content-between w-100">
                                        <time class="fs-xs fw-bold" datetime="${resultChild.date}">
                                            ${resultChild.dateDisplay}
                                        </time>
                                    </div>
                                    <h3 class="h6 mb-2">${resultChild.title}</h3>
                                    <p class="fs-sm">${resultChild.description}</p>
                                </a>
                            </div>
                            `;
            });
          }
        });
      } else {
        filterResults.innerHTML = `<div class="d-block col-md-10 mx-auto h5 text-center">No results. Try again.</div>`;
      }
      handleIndicators(false, resultsLoader);
    };
    const handleClearPagination = (paginationElement) => {
      if (paginationElement.nextElementSibling !== null) {
        if (paginationElement.nextElementSibling.tagName == "BUTTON") {
          paginationElement.nextElementSibling.remove();
        }
      }
      if (paginationElement.previousElementSibling !== null) {
        if (paginationElement.previousElementSibling.tagName == "BUTTON") {
          paginationElement.previousElementSibling.remove();
        }
      }
      paginationElement.innerHTML = "";
    };
    const createPagination = (paginationElement, resultPageCount) => {
      const totalPages = parseInt(resultPageCount);
      handleClearPagination(paginationContainer);
      if (totalPages > 1) {
        for (var i = 0; i < totalPages; i++) {
          let li = document.createElement("li");
          li.setAttribute("role", "button");
          li.setAttribute("title", `Go to page ${i + 1}`);
          if (pageNumber == i + 1) {
            li.classList.add("current");
          }
          if (totalPages > 6) {
            if (i < pageNumber && i > pageNumber - 5 || i > pageNumber - 1 && i < pageNumber - 1 + 4) {
              li.classList.add("d-inline-block");
            } else {
              li.classList.add("d-none");
              li.setAttribute("aria-hidden", "true");
            }
          }
          li.textContent = i + 1;
          li.addEventListener("click", (e) => {
            e.preventDefault();
            pageNumber = e.target.textContent;
            killResults();
            postResults2();
            scrollBackTop();
          });
          paginationElement.appendChild(li);
        }
      }
      if (totalPages > 1) {
        if (pageNumber > 1) {
          let prevBtn = document.createElement("button");
          prevBtn.classList.add("btn-prev");
          prevBtn.setAttribute("title", "Go to previous page");
          prevBtn.addEventListener("click", (e) => {
            e.preventDefault();
            pageNumber -= 1;
            killResults();
            postResults2();
            scrollBackTop();
          });
          paginationElement.before(prevBtn);
        }
        if (pageNumber < totalPages) {
          let nextBtn = document.createElement("button");
          nextBtn.classList.add("btn-next");
          nextBtn.setAttribute("title", "Go to next page");
          nextBtn.addEventListener("click", (e) => {
            e.preventDefault();
            pageNumber += 1;
            killResults();
            postResults2();
            scrollBackTop();
          });
          paginationElement.after(nextBtn);
        }
      }
    };
    const postResults2 = () => {
      handleIndicators(true, resultsLoader);
      let bodyObject = {
        "searchPhrase": searchPhrase,
        "mediaType": decodeURIComponent(type),
        //need to decode for API post
        "category": "",
        "pagination": {
          "pageNumber": pageNumber,
          "pageSize": pageSize
        }
      };
      if (type == "" && searchPhrase !== "") {
        featuredHandler(type, true);
      } else {
        featuredHandler(type, false);
      }
      const bodyRequest = JSON.stringify(bodyObject);
      fetch(
        apiEndpointUrl,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          referrerPolicy: "no-referrer",
          body: bodyRequest
        }
      ).then((res) => {
        return res.json();
      }).then((res) => {
        renderResults(res.multimediaItems);
        totalResults = res.searchResultInfo.totalResults;
        totalResultPages = Math.ceil(totalResults / pageSize);
        createPagination(paginationContainer, totalResultPages);
      });
    };
    const urlHandler = (istype) => {
      if (istype) {
        urlParams.set("type", type);
        window.history.pushState({ id: `type-${type}` }, "", `${location.pathname}?type=${type}`);
      } else {
        urlParams.set("search", searchPhrase);
        window.history.pushState({ id: "search-searchPhrase" }, "", `${location.pathname}?search=${searchPhrase}`);
      }
    };
    const resetElements = (resetForm) => {
      if (resetForm) {
        searchForm.querySelector("input").value = "";
      } else {
        btnStates(true);
      }
    };
    filterBtns.forEach((filterBtn) => {
      filterBtn.addEventListener("click", (e) => {
        e.preventDefault();
        resetElements(true);
        killResults();
        searchPhrase = "";
        type = filterBtn.value;
        pageNumber = 1;
        urlHandler(true);
        postResults2();
      });
    });
    filterDropdown.addEventListener("change", (e) => {
      e.preventDefault();
      resetElements(true);
      killResults();
      searchPhrase = "";
      pageNumber = 1;
      type = e.target.value;
      urlHandler(true);
      postResults2();
    });
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      killResults();
      type = "";
      const textField = searchForm.querySelector("input");
      searchPhrase = textField.value;
      pageNumber = 1;
      urlHandler(false);
      postResults2();
    });
    window.addEventListener("popstate", () => {
      killResults();
      pageNumber = 1;
      const popUrlCatParams = new URLSearchParams(window.location.search);
      if (popUrlCatParams.has("type")) {
        type = popUrlCatParams.get("type");
        featuredHandler(type, false);
        resetElements(true);
      } else {
        type = "";
        resetElements(true);
      }
      const popUrlSearchParams = new URLSearchParams(window.location.search);
      if (popUrlSearchParams.has("search")) {
        searchPhrase = popUrlSearchParams.get("search");
        searchForm.querySelector("input").value = searchPhrase;
      } else {
        searchPhrase = "";
        resetElements(true);
      }
      postResults2();
    });
    if (urlParams.has("search")) {
      killResults();
      pageNumber = 1;
      type = "";
      searchPhrase = urlParams.get("search");
      searchForm.querySelector("input").value = searchPhrase;
      postResults2();
    } else {
      pageNumber = 1;
      createPagination(paginationContainer, filterResults.dataset.cattotal);
      postResults2();
    }
  };
  var multimedia_filters_default = multimediaFilters;

  // wwwroot/js/src/components/calendar.js
  var calendar = () => {
    const calendarContainer = document.getElementById("ec");
    const calendarFilters = document.querySelector(".js-calendar-filters");
    const apiEndpointUrl = "/GetProducts";
    const styleSet = document.querySelector(".js-filter-styles");
    let bodyObject = {
      "productType": "Events",
      "category": "",
      "subCategory": "",
      "taxonomy": "",
      "pagination": {
        "pageNumber": 1,
        "pageSize": 100
      }
    };
    const bodyRequest = JSON.stringify(bodyObject);
    const getValue = (checkBoxes) => {
      styleSet.innerHTML = "";
      checkBoxes.forEach((checkBox) => {
        if (!checkBox.checked) {
          styleSet.innerHTML += `[data-resource="${checkBox.value}"] { opacity: 0 }`;
        } else {
          styleSet.innerHTML += `[data-resource="${checkBox.value}"] { opacity: 1 }`;
        }
      });
    };
    new EventCalendar(calendarContainer, {
      view: "dayGridMonth",
      headerToolbar: {
        start: "prev,next today",
        center: "title",
        end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek resourceTimeGridWeek"
      },
      buttonText: function(texts) {
        texts.resourceTimeGridWeek = "resources";
        return texts;
      },
      resources: window.setResources,
      scrollTime: "09:00:00",
      views: {
        timeGridWeek: { pointer: true },
        resourceTimeGridWeek: { pointer: true }
      },
      nowIndicator: true,
      eventClassNames: ["wra-event"],
      selectable: false,
      editable: false,
      eventStartEditable: false,
      // need to disable event drop n'drag
      eventDurationEditable: false,
      // need to disable event drop n'drag
      eventSources: [
        {
          events: function(fetchInfo, successCallback, failureCallback) {
            fetch(
              apiEndpointUrl,
              {
                method: "POST",
                mode: "cors",
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*"
                },
                referrerPolicy: "no-referrer",
                body: bodyRequest
              }
            ).then((res) => {
              return res.json();
            }).then((res) => {
              successCallback(res);
            });
          }
        }
      ],
      eventDidMount: function(info) {
        const getEventsResourceId = info.event.resourceIds[0] !== void 0 ? info.event.resourceIds[0].toString() : null;
        if (!info.el.getAttribute("data-resource") && getEventsResourceId !== null) {
          info.el.setAttribute("data-resource", getEventsResourceId);
        }
      },
      loading: function(isLoading) {
        if (isLoading == false) {
          console.log("loading done");
          calendarFilters.innerHTML = "";
          setResources.forEach((resource) => {
            calendarFilters.innerHTML += `
                        <div class="calendar-filter d-flex flex-row gap-3 rounded p-1 ps-2 mb-3 text-white" style="background-color:${resource.eventBackgroundColor}">
                            <input type="checkbox" id="${resource.id}" name="resource" class="js-calendar-filter form-check-input" checked value="${resource.id}" />
                            <label class="form-check-label" for="${resource.id}">${resource.title}</label>
                        </div>
                        `;
          });
          calendarFilters.addEventListener("change", (e) => {
            getValue(document.querySelectorAll(".js-calendar-filter"));
          });
        }
      },
      eventClick: function(info) {
        if (info.event.extendedProps !== "" || info.event.extendedProps !== null) {
          window.open(info.event.extendedProps, "_blank").focus();
        }
      }
    });
  };
  var calendar_default = calendar;

  // wwwroot/js/src/components/quantity-selector.js
  var quantitySelector = () => {
    const quantitySelectors = document.querySelectorAll(".js-quantity-selector");
    if (!quantitySelectors.length)
      return;
    quantitySelectors.forEach((item) => {
      const quantityInput = item.querySelector(".js-quantity-selector-input");
      const incrementBtn = item.querySelector(".js-quantity-selector-increment");
      const decrementBtn = item.querySelector(".js-quantity-selector-decrement");
      incrementBtn.addEventListener("click", () => {
        quantityInput.value++;
      });
      decrementBtn.addEventListener("click", () => {
        if (quantityInput.value > 1) {
          quantityInput.value--;
        }
      });
    });
  };
  var quantity_selector_default = quantitySelector;

  // wwwroot/js/src/components/checkout.js
  var checkout = () => {
    const stateDropdown = document.querySelector(".js-checkout-state");
    const countyField = document.querySelector(".js-checkout-county");
    if (stateDropdown) {
      stateDropdown.addEventListener("change", (e) => {
        if (e.target.value == "WI") {
          countyField.classList.remove("d-none");
        } else {
          countyField.classList.add("d-none");
        }
      });
    }
    const billingAddressRadio = document.querySelector(".js-alt-billing-address");
    const billingAddressFields = document.querySelector(".js-alt-billing-address-fields");
    if (billingAddressRadio) {
      billingAddressRadio.addEventListener("change", (e) => {
        if (billingAddressRadio.checked) {
          billingAddressFields.classList.remove("d-none");
        } else {
          billingAddressFields.classList.add("d-none");
        }
      });
    }
  };
  var checkout_default = checkout;

  // wwwroot/js/src/components/products.js
  var products = () => {
    const productResults = document.querySelector(".js-product-collection");
    const collectionTitle = document.querySelector(".js-collection-title");
    const listingsTitle = document.querySelector(".js-listings-title");
    const currentBreadcrumb = document.querySelector(".js-breadcrumb-current");
    const resultsLoader = document.querySelector(".js-results-loader");
    const productCategoryDropdown = document.querySelector(".js-collection-category-filter");
    const productSubCategoryDropdown = document.querySelector(".js-collection-subcategory-filter");
    const productSubCategoryContainer = document.querySelector(".js-collection-subcategory-container");
    const apiEndpointUrl = "/GetProducts";
    let pageNumber = 1;
    const pageSize = 100;
    let subcategoryArray = ["All"];
    const windowLoadQueryString = window.location.search;
    const urlParams = new URLSearchParams(windowLoadQueryString);
    let type = "";
    if (urlParams.has("type")) {
      type = urlParams.get("type");
    }
    let subcategory = "";
    if (urlParams.has("subcategory")) {
      subcategory = urlParams.get("subcategory");
    }
    let category = "";
    if (urlParams.has("category")) {
      category = urlParams.get("category");
    }
    const handleIndicators = (show, waitLoaderElement) => {
      if (show == true) {
        waitLoaderElement.hidden = false;
      } else {
        waitLoaderElement.hidden = true;
      }
    };
    const renderResults = (results) => {
      if (results.length > 0) {
        results.forEach((result) => {
          const setCTA = result.productType == "Products" ? `<a href="${result.url}" id="add-to-cart" class="btn btn-secondary btn-sm border-0  flex-grow-1">Add To Cart</a>` : `<a href="${result.url}" id="view-product" class="btn btn-primary btn-sm flex-grow-1">Register</a>`;
          productResults.innerHTML += `
                    <div class="col-md-6 col-lg-4">
                        <div class="card-class bg-light p-4 h-100 d-flex flex-column align-items-start">
                            <p class="fs-xs">Class <span class="fw-bold">Credit Hours: XXXX</span></p>
                            <p class="d-inline-block mb-4 px-2 py-1 bg-white fw-semibold fs-sm text-uppercase">${result.taxonomy}</p>
                            <h3 class="fs-lg text-capitalize fw-semibold mb-4">${result.title}</h3>

                            <div class="d-block mb-1">
                                <span class="h3 fw-bold">
                                    ${result.memberPrice}
                                </span>
                                <span class="fs-sm" style="color: var(--bs-gray-30)">
                                    &nbsp;member pricing
                                </span>
                            </div>
                            <div class="d-block fs-sm mb-0" style="color: var(--bs-gray-30)">
                                ${result.price} &nbsp;non-member pricing
                            </div>

                            <div class="d-flex self-align-end flex-column flex-md-row align-items-center gap-3 mt-auto pt-3">
                                ${setCTA}
                            </div>

                        </div>
                    </div>

                    `;
          if (result.subCategory != "All" && !subcategoryArray.includes(result.subCategory, subcategoryArray)) {
            subcategoryArray.push(result.subCategory);
            populateSubCategories();
          }
        });
      } else {
        productResults.innerHTML = `<div class="d-block col-md-10 mx-auto h5 text-center">No results. Try again.</div>`;
      }
      handleIndicators(false, resultsLoader);
    };
    const populateSubCategories = () => {
      productSubCategoryDropdown.innerHTML = "";
      if (subcategoryArray.length > 1) {
        productSubCategoryContainer.removeAttribute("hidden");
      } else {
        productSubCategoryContainer.setAttribute("hidden", "hidden");
      }
      subcategoryArray.forEach((subCatOption) => {
        const checkIfActive = subCatOption == subcategory ? "selected" : "";
        productSubCategoryDropdown.innerHTML += `
                <option ${checkIfActive} value="${subCatOption}">${subCatOption}</option>
                `;
      });
    };
    postResults = () => {
      handleIndicators(true, resultsLoader);
      updateDomElements(category);
      let bodyObject = {
        "productType": decodeURIComponent(type),
        //Events, Products, Courses
        "category": decodeURIComponent(category),
        //Professional Development, Publications, Conferences/Conventions, etc.
        "subCategory": decodeURIComponent(subcategory == "All" ? "" : subcategory),
        //children of category
        "taxonomy": "",
        //Reference Manuals, Books, Virtual, etc.
        "pagination": {
          "pageNumber": pageNumber,
          "pageSize": pageSize
        }
      };
      const bodyRequest = JSON.stringify(bodyObject);
      console.log(bodyRequest);
      fetch(
        apiEndpointUrl,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          referrerPolicy: "no-referrer",
          body: bodyRequest
        }
      ).then((res) => {
        return res.json();
      }).then((res) => {
        renderResults(res);
      });
    };
    const killResults = () => {
      productResults.innerHTML = "";
    };
    const urlHandler = (isCategory, isSubCategory) => {
      if (isCategory && !isSubCategory) {
        urlParams.set("category", category);
        window.history.pushState({ id: `${type}-category-${category}` }, "", `${location.pathname}?type=${type}&category=${category}`);
      }
      if (isCategory && isSubCategory) {
        urlParams.set("category", category);
        urlParams.set("subcategory", subcategory);
        window.history.pushState({ id: `${type}-category-${category}subcategory-${subcategory}` }, "", `${location.pathname}?type=${type}&category=${category}&subcategory=${subcategory}`);
      }
    };
    const updateDomElements = (titleText) => {
      collectionTitle.innerHTML = titleText;
      currentBreadcrumb.innerHTML = titleText;
      listingsTitle.innerHTML = titleText;
    };
    const resetDropdown = (dropdownElement, setValue) => {
      dropdownElement.value = setValue;
    };
    if (productCategoryDropdown) {
      productCategoryDropdown.addEventListener("change", (e) => {
        e.preventDefault();
        killResults();
        category = e.target.value;
        subcategory = "";
        subcategoryArray = ["All"];
        productSubCategoryContainer.setAttribute("hidden", "hidden");
        productSubCategoryDropdown.innerHTML = "";
        if (productSubCategoryDropdown) {
          resetDropdown(productSubCategoryDropdown, "");
        }
        urlHandler(true, false);
        postResults();
      });
    }
    if (productSubCategoryDropdown) {
      productSubCategoryDropdown.addEventListener("change", (e) => {
        e.preventDefault();
        killResults();
        updateDomElements(category);
        subcategory = e.target.value;
        ;
        urlHandler(true, true);
        postResults();
      });
    }
    window.addEventListener("popstate", () => {
      killResults();
      const popUrlParams = new URLSearchParams(window.location.search);
      if (popUrlParams.has("category") && !popUrlParams.has("subcategory")) {
        category = popUrlParams.get("category");
        resetDropdown(productCategoryDropdown, category);
        resetDropdown(productSubCategoryDropdown, "All");
      } else if (popUrlParams.has("category") && popUrlParams.has("subcategory")) {
        category = popUrlParams.get("category");
        subcategory = popUrlParams.get("subcategory");
        resetDropdown(productCategoryDropdown, category);
        if (productSubCategoryDropdown) {
          resetDropdown(productSubCategoryDropdown, subcategory);
        }
      } else {
        category = "";
        subcategory = "";
        resetDropdown(productSubCategoryDropdown, "All");
      }
      postResults();
    });
    postResults();
  };
  var products_default = products;

  // wwwroot/js/src/components/course-search.js
  var courseSearch = () => {
    const resultsLoader = document.querySelector(".js-results-loader-courses");
    const courseSearchForm = document.getElementById("course-search");
    const productCategoryDropdown = document.querySelector(".js-courses-category-filter");
    const productSubCategoryDropdown = document.querySelector(".js-courses-subcategory-filter");
    const productSubCategoryContainer = document.querySelector(".js-courses-subcategory-container");
    const actionInitial = courseSearchForm.getAttribute("action");
    const apiEndpointUrl = "/GetProducts";
    let pageNumber = 1;
    const pageSize = 100;
    let subcategoryArray = ["All"];
    let category = "";
    let subcategory = "";
    const handleIndicators = (show, waitLoaderElement) => {
      if (show == true) {
        waitLoaderElement.hidden = false;
      } else {
        waitLoaderElement.hidden = true;
      }
    };
    const renderResults = (results) => {
      if (results.length > 0) {
        results.forEach((result) => {
          if (result.subCategory != "All" && !subcategoryArray.includes(result.subCategory, subcategoryArray)) {
            subcategoryArray.push(result.subCategory);
            populateSubCategories();
          }
        });
      }
      handleIndicators(false, resultsLoader);
    };
    const populateSubCategories = () => {
      productSubCategoryDropdown.innerHTML = "";
      if (subcategoryArray.length > 1 && category !== "") {
        productSubCategoryContainer.removeAttribute("hidden");
      } else {
        productSubCategoryContainer.setAttribute("hidden", "hidden");
      }
      subcategoryArray.forEach((subCatOption) => {
        productSubCategoryDropdown.innerHTML += `
                <option value="${subCatOption}">${subCatOption}</option>
                `;
      });
    };
    postResults = () => {
      handleIndicators(true, resultsLoader);
      let bodyObject = {
        "productType": "Courses",
        //Events, Products, Courses
        "category": category,
        //Professional Development, Publications, Conferences/Conventions, etc.
        "subCategory": subcategory == "All" ? "" : subcategory,
        //children of category
        "taxonomy": "",
        //Reference Manuals, Books, Virtual, etc.
        "pagination": {
          "pageNumber": pageNumber,
          "pageSize": pageSize
        }
      };
      const bodyRequest = JSON.stringify(bodyObject);
      fetch(
        apiEndpointUrl,
        {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          },
          referrerPolicy: "no-referrer",
          body: bodyRequest
        }
      ).then((res) => {
        return res.json();
      }).then((res) => {
        renderResults(res);
      });
    };
    const resetDropdown = (dropdownElement, setValue) => {
      dropdownElement.value = setValue;
    };
    if (productCategoryDropdown) {
      productCategoryDropdown.addEventListener("change", (e) => {
        e.preventDefault();
        category = e.target.value;
        subcategory = "";
        subcategoryArray = ["All"];
        productSubCategoryContainer.setAttribute("hidden", "hidden");
        productSubCategoryDropdown.innerHTML = "";
        if (productSubCategoryDropdown) {
          resetDropdown(productSubCategoryDropdown, "");
        }
        postResults();
      });
    }
    if (productSubCategoryDropdown) {
      productSubCategoryDropdown.addEventListener("change", (e) => {
        e.preventDefault();
        subcategory = e.target.value;
        postResults();
      });
    }
    let updatedAction = false;
    const updateActionUrl = () => {
      const setParams = subcategory !== "" ? `${actionInitial}?type=Courses&category=${category}&subcategory=${subcategory}` : `${actionInitial}?type=Courses&category=${category}`;
      courseSearchForm.setAttribute("action", setParams);
      updatedAction = true;
      if (updatedAction) {
        courseSearchForm.submit();
      }
    };
    courseSearchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      updateActionUrl();
    });
    postResults();
  };
  var course_search_default = courseSearch;

  // wwwroot/js/src/components/bundles.js
  var bundles = () => {
    const bundleBag = document.querySelector(".js-bundle-bag"), bundleCount = bundleBag.querySelector(".js-bundle-count");
    const bundlesContainer = document.querySelector(".js-bundles-form"), bundlesForm = bundlesContainer.querySelector("form");
    const bundlePopDetails = document.querySelectorAll(".js-bundle-pop-details");
    const bundleModals = document.querySelectorAll(".js-modal");
    const bundlePopClosers = document.querySelectorAll(".js-modal-close");
    const displayCount = (count) => {
      bundleCount.innerHTML = `${count}`;
    };
    const selectedCount = (formElement) => {
      const selectedElement = formElement.querySelectorAll("input[type=checkbox]:checked");
      if (selectedElement.length > 0) {
        bundleBag.hidden = false;
      } else {
        bundleBag.hidden = true;
      }
      displayCount(selectedElement.length);
    };
    bundlesForm.addEventListener("change", (e) => {
      selectedCount(bundlesForm);
    });
    const closePops = () => {
      bundleModals.forEach((modal) => {
        modal.setAttribute("aria-hidden", "true");
      });
    };
    bundlePopDetails.forEach((bundlePopDetail) => {
      bundlePopDetail.addEventListener("click", (e) => {
        e.preventDefault();
        const getModalId = bundlePopDetail.getAttribute("aria-controls"), getModal = document.getElementById(getModalId);
        getModal.setAttribute("aria-hidden", "false");
      });
    });
    bundlePopClosers.forEach((bundlePopCloser) => {
      bundlePopCloser.addEventListener("click", (e) => {
        e.preventDefault();
        const getModalId = bundlePopCloser.getAttribute("aria-controls"), getModal = document.getElementById(getModalId);
        getModal.setAttribute("aria-hidden", "true");
      });
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closePops();
      }
    });
  };
  var bundles_default = bundles;

  // wwwroot/js/src/global.js
  expandable_text_cards_default();
  header_default();
  nav_default();
  swiper_default();
  tabs_default();
  dialogs();
  formsAccessDialog();
  home_hero_default();
  playlist_default();
  hot_tip_library_default();
  alert_default();
  article_filters_default();
  multimedia_filters_default();
  quantity_selector_default();
  checkout_default();
  if (document.body.classList.contains("page-template-collectionPage")) {
    products_default();
  }
  if (document.getElementById("ec")) {
    calendar_default();
  }
  if (document.getElementById("course-search")) {
    course_search_default();
  }
  if (document.body.classList.contains("page-template-bundlePage")) {
    bundles_default();
  }
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ExMXktYWNjb3JkaW9uLXRhYnMvYTExeS1hY2NvcmRpb24tdGFicy5qcyIsICIuLi9zcmMvY29tcG9uZW50cy9leHBhbmRhYmxlLXRleHQtY2FyZHMuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvaGVhZGVyLmpzIiwgIi4uL3NyYy9jb21wb25lbnRzL25hdi5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9zc3Itd2luZG93LmVzbS5tanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvdXRpbHMubWpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL3N3aXBlci1jb3JlLm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9jcmVhdGUtZWxlbWVudC1pZi1ub3QtZGVmaW5lZC5tanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL25hdmlnYXRpb24ubWpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2NsYXNzZXMtdG8tc2VsZWN0b3IubWpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9wYWdpbmF0aW9uLm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvc2Nyb2xsYmFyLm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvYXV0b3BsYXkubWpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2VmZmVjdC1pbml0Lm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9lZmZlY3QtdGFyZ2V0Lm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9lZmZlY3QtdmlydHVhbC10cmFuc2l0aW9uLWVuZC5tanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1mYWRlLm1qcyIsICIuLi9zcmMvY29tcG9uZW50cy9zd2lwZXIuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvdGFicy5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYTExeS1kaWFsb2cvZGlzdC9hMTF5LWRpYWxvZy5lc20uanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvZGlhbG9ncy5qcyIsICIuLi9zcmMvY29tcG9uZW50cy9ob21lLWhlcm8uanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvcGxheWxpc3QuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvaG90LXRpcC1saWJyYXJ5LmpzIiwgIi4uL3NyYy9jb21wb25lbnRzL2FsZXJ0LmpzIiwgIi4uL3NyYy9jb21wb25lbnRzL2FydGljbGUtZmlsdGVycy5qcyIsICIuLi9zcmMvY29tcG9uZW50cy9tdWx0aW1lZGlhLWZpbHRlcnMuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvY2FsZW5kYXIuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvcXVhbnRpdHktc2VsZWN0b3IuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvY2hlY2tvdXQuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvcHJvZHVjdHMuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvY291cnNlLXNlYXJjaC5qcyIsICIuLi9zcmMvY29tcG9uZW50cy9idW5kbGVzLmpzIiwgIi4uL3NyYy9nbG9iYWwuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8qXG4qICBBY2Nlc3NpYmxlIEFjY29yZGlvblRhYnMsIGJ5IE1hdHRoaWFzIE90dCAoQG1fb3R0KVxuKlxuKiAgQmFzZWQgb24gdGhlIHdvcmsgb2YgQHN0b3diYWxsIChodHRwczovL2NvZGVwZW4uaW8vc3Rvd2JhbGwvcGVuL3hWV3dXZSlcbipcbiovXG4oZnVuY3Rpb24gKCkge1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICBmdW5jdGlvbiBBY2NvcmRpb25UYWJzIChlbCwgb3B0aW9ucykge1xuXG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZWwgPSBlbDtcbiAgICB0aGlzLnRhYlRyaWdnZXJzID0gdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy10YWJzLXRyaWdnZXInKTtcbiAgICB0aGlzLnRhYlBhbmVscyA9IHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtdGFicy1wYW5lbCcpO1xuICAgIHRoaXMuYWNjb3JkaW9uVHJpZ2dlcnMgPSB0aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pzLWFjY29yZGlvbi10cmlnZ2VyJyk7XG5cbiAgICB0aGlzLm9wdGlvbnMgPSB0aGlzLl9leHRlbmQoe1xuICAgICAgYnJlYWtwb2ludDogNjQwLFxuICAgICAgdGFic0FsbG93ZWQ6IHRydWUsXG4gICAgICBzZWxlY3RlZFRhYjogMCxcbiAgICAgIHN0YXJ0Q29sbGFwc2VkOiBmYWxzZVxuICAgIH0sIG9wdGlvbnMpO1xuXG4gICAgaWYoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYnMtYWxsb3dlZCcpID09IFwidHJ1ZVwiKXtcbiAgICAgIHRoaXMub3B0aW9ucy50YWJzQWxsb3dlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFicy1hbGxvd2VkJykgPT0gXCJmYWxzZVwiKSB7XG4gICAgICB0aGlzLm9wdGlvbnMudGFic0FsbG93ZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZihlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnJlYWtwb2ludCcpKXtcbiAgICAgIHRoaXMub3B0aW9ucy5icmVha3BvaW50ID0gcGFyc2VJbnQoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWJyZWFrcG9pbnQnKSk7XG4gICAgfVxuXG4gICAgaWYoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNlbGVjdGVkLXRhYicpKXtcbiAgICAgIHRoaXMub3B0aW9ucy5zZWxlY3RlZFRhYiA9IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zZWxlY3RlZC10YWInKSk7XG4gICAgfVxuXG4gICAgaWYoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXN0YXJ0LWNvbGxhcHNlZCcpID09IFwidHJ1ZVwiKXtcbiAgICAgIHRoaXMub3B0aW9ucy5zdGFydENvbGxhcHNlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmIChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhcnQtY29sbGFwc2VkJykgPT0gXCJmYWxzZVwiKSB7XG4gICAgICB0aGlzLm9wdGlvbnMuc3RhcnRDb2xsYXBzZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy50YWJUcmlnZ2Vycy5sZW5ndGggPT09IDAgfHwgdGhpcy50YWJUcmlnZ2Vycy5sZW5ndGggIT09IHRoaXMudGFiUGFuZWxzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuX2luaXQoKTtcbiAgfVxuXG4gIEFjY29yZGlvblRhYnMucHJvdG90eXBlLl9pbml0ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHRoaXMudGFiVHJpZ2dlcnNMZW5ndGggPSB0aGlzLnRhYlRyaWdnZXJzLmxlbmd0aDtcbiAgICB0aGlzLmFjY29yZGlvblRyaWdnZXJzTGVuZ3RoID0gdGhpcy5hY2NvcmRpb25UcmlnZ2Vycy5sZW5ndGg7XG4gICAgdGhpcy5zZWxlY3RlZFRhYiA9IDA7XG4gICAgdGhpcy5wcmV2U2VsZWN0ZWRUYWIgPSBudWxsO1xuICAgIHRoaXMuY2xpY2tMaXN0ZW5lciA9IHRoaXMuX2NsaWNrRXZlbnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmtleWRvd25MaXN0ZW5lciA9IHRoaXMuX2tleWRvd25FdmVudC5iaW5kKHRoaXMpO1xuICAgIHRoaXMua2V5cyA9IHtcbiAgICAgIHByZXY6IDM3LFxuICAgICAgbmV4dDogMzksXG4gICAgICBzcGFjZTogMzIsXG4gICAgICBlbnRlcjogMTNcbiAgICB9O1xuXG4gICAgaWYod2luZG93LmlubmVyV2lkdGggPj0gdGhpcy5vcHRpb25zLmJyZWFrcG9pbnQgJiYgdGhpcy5vcHRpb25zLnRhYnNBbGxvd2VkKSB7XG4gICAgICAgIHRoaXMuaXNBY2NvcmRpb24gPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmlzQWNjb3JkaW9uID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGFiVHJpZ2dlcnNMZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy50YWJUcmlnZ2Vyc1tpXS5pbmRleCA9IGk7XG4gICAgICB0aGlzLnRhYlRyaWdnZXJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0xpc3RlbmVyLCBmYWxzZSk7XG4gICAgICB0aGlzLnRhYlRyaWdnZXJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmtleWRvd25MaXN0ZW5lciwgZmFsc2UpO1xuXG4gICAgICBpZiAodGhpcy50YWJUcmlnZ2Vyc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLXNlbGVjdGVkJykpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IGk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2hpZGUoaSk7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmFjY29yZGlvblRyaWdnZXJzTGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMuYWNjb3JkaW9uVHJpZ2dlcnNbaV0uaW5kZXggPSBpO1xuICAgICAgdGhpcy5hY2NvcmRpb25UcmlnZ2Vyc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgdGhpcy5hY2NvcmRpb25UcmlnZ2Vyc1tpXS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duTGlzdGVuZXIsIGZhbHNlKTtcblxuICAgICAgaWYgKHRoaXMuYWNjb3JkaW9uVHJpZ2dlcnNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1zZWxlY3RlZCcpKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSBpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghaXNOYU4odGhpcy5vcHRpb25zLnNlbGVjdGVkVGFiKSkge1xuICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IHRoaXMub3B0aW9ucy5zZWxlY3RlZFRhYiA8IHRoaXMudGFiVHJpZ2dlcnNMZW5ndGggPyB0aGlzLm9wdGlvbnMuc2VsZWN0ZWRUYWIgOiB0aGlzLnRhYlRyaWdnZXJzTGVuZ3RoIC0gMTtcbiAgICB9XG5cbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ2lzLWluaXRpYWxpemVkJyk7XG4gICAgaWYgKHRoaXMub3B0aW9ucy50YWJzQWxsb3dlZCkge1xuICAgICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCd0YWJzLWFsbG93ZWQnKTtcbiAgICB9XG5cbiAgICAvLyBJZiB0aGUgYWNjb3JkaW9uIHNob3VsZCBub3Qgc3RhcnQgY29sbGFwc2VkLCBvcGVuIHRoZSBmaXJzdCBlbGVtZW50XG4gICAgaWYoIXRoaXMub3B0aW9ucy5zdGFydENvbGxhcHNlZCB8fCAhdGhpcy5pc0FjY29yZGlvbil7XG4gICAgICB0aGlzLnNlbGVjdFRhYih0aGlzLnNlbGVjdGVkVGFiLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgdmFyIHJlc2l6ZVRhYnMgPSB0aGlzLl9kZWJvdW5jZShmdW5jdGlvbigpIHtcbiAgICAgIC8vIFRoaXMgZ2V0cyBkZWxheWVkIGZvciBwZXJmb3JtYW5jZSByZWFzb25zXG4gICAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA+PSBfdGhpcy5vcHRpb25zLmJyZWFrcG9pbnQgJiYgX3RoaXMub3B0aW9ucy50YWJzQWxsb3dlZCkge1xuICAgICAgICBfdGhpcy5pc0FjY29yZGlvbiA9IGZhbHNlO1xuICAgICAgICBpZiAoX3RoaXMub3B0aW9ucy50YWJzQWxsb3dlZCkge1xuICAgICAgICAgIF90aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3RhYnMtYWxsb3dlZCcpO1xuICAgICAgICB9XG4gICAgICAgIF90aGlzLnNlbGVjdFRhYihfdGhpcy5zZWxlY3RlZFRhYik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBfdGhpcy5pc0FjY29yZGlvbiA9IHRydWU7XG4gICAgICAgIF90aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ3RhYnMtYWxsb3dlZCcpO1xuICAgICAgICBpZighX3RoaXMub3B0aW9ucy5zdGFydENvbGxhcHNlZCl7XG4gICAgICAgICAgX3RoaXMuc2VsZWN0VGFiKF90aGlzLnNlbGVjdGVkVGFiKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgfSwgNTApO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZVRhYnMpO1xuXG4gIH07XG5cbiAgQWNjb3JkaW9uVGFicy5wcm90b3R5cGUuX2NsaWNrRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgdmFyIGNsb3Nlc3RUcmlnZ2VyID0gdGhpcy5fZ2V0Q2xvc2VzdChlLnRhcmdldCwgJy5qcy10YWJzLXRyaWdnZXInKTtcbiAgICB2YXIgY2xvc2VzdFRhYiA9IDA7XG5cbiAgICBpZiAoY2xvc2VzdFRyaWdnZXIgPT0gbnVsbCkge1xuICAgICAgY2xvc2VzdFRyaWdnZXIgPSB0aGlzLl9nZXRDbG9zZXN0KGUudGFyZ2V0LCAnLmpzLWFjY29yZGlvbi10cmlnZ2VyJyk7XG4gICAgICBjbG9zZXN0VGFiID0gdGhpcy5fZ2V0Q2xvc2VzdChjbG9zZXN0VHJpZ2dlciwgJy5qcy10YWJzLXBhbmVsJyk7XG4gICAgICB0aGlzLmlzQWNjb3JkaW9uID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc0FjY29yZGlvbiA9IGZhbHNlO1xuICAgIH1cblxuICAgIHZhciB0YXJnZXRJbmRleCA9IGUudGFyZ2V0LmluZGV4ICE9IG51bGwgPyBlLnRhcmdldC5pbmRleCA6IGNsb3Nlc3RUYWIuaW5kZXg7XG5cbiAgICBpZiAodGFyZ2V0SW5kZXggPT09IHRoaXMuc2VsZWN0ZWRUYWIgJiYgIXRoaXMuaXNBY2NvcmRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdFRhYih0YXJnZXRJbmRleCwgdHJ1ZSk7XG4gIH07XG5cbiAgQWNjb3JkaW9uVGFicy5wcm90b3R5cGUuX2tleWRvd25FdmVudCA9IGZ1bmN0aW9uIChlKSB7XG5cbiAgICB2YXIgdGFyZ2V0SW5kZXg7XG5cbiAgICBpZiAoZS5rZXlDb2RlID09PSB0aGlzLmtleXMucHJldiB8fCBlLmtleUNvZGUgPT09IHRoaXMua2V5cy5uZXh0IHx8IGUua2V5Q29kZSA9PT0gdGhpcy5rZXlzLnNwYWNlIHx8IGUua2V5Q29kZSA9PT0gdGhpcy5rZXlzLmVudGVyKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChlLmtleUNvZGUgPT09IHRoaXMua2V5cy5wcmV2ICYmIGUudGFyZ2V0LmluZGV4ID4gMCAmJiAhdGhpcy5pc0FjY29yZGlvbikge1xuICAgICAgdGFyZ2V0SW5kZXggPSBlLnRhcmdldC5pbmRleCAtIDE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gdGhpcy5rZXlzLm5leHQgJiYgZS50YXJnZXQuaW5kZXggPCB0aGlzLnRhYlRyaWdnZXJzTGVuZ3RoIC0gMSAmJiAhdGhpcy5pc0FjY29yZGlvbikge1xuICAgICAgdGFyZ2V0SW5kZXggPSBlLnRhcmdldC5pbmRleCArIDE7XG4gICAgfVxuICAgIGVsc2UgaWYgKGUua2V5Q29kZSA9PT0gdGhpcy5rZXlzLnNwYWNlIHx8IGUua2V5Q29kZSA9PT0gdGhpcy5rZXlzLmVudGVyKSB7XG4gICAgICB0YXJnZXRJbmRleCA9IGUudGFyZ2V0LmluZGV4O1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNlbGVjdFRhYih0YXJnZXRJbmRleCwgdHJ1ZSk7XG4gIH07XG5cbiAgQWNjb3JkaW9uVGFicy5wcm90b3R5cGUuX3Nob3cgPSBmdW5jdGlvbiAoaW5kZXgsIHVzZXJJbnZva2VkKSB7XG5cbiAgICB0aGlzLnRhYlBhbmVsc1tpbmRleF0ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuXG4gICAgdGhpcy50YWJUcmlnZ2Vyc1tpbmRleF0ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgIHRoaXMudGFiVHJpZ2dlcnNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2lzLXNlbGVjdGVkJyk7XG4gICAgdGhpcy50YWJUcmlnZ2Vyc1tpbmRleF0uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgdHJ1ZSk7XG5cbiAgICB0aGlzLmFjY29yZGlvblRyaWdnZXJzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCB0cnVlKTtcblxuICAgIHZhciBwYW5lbENvbnRlbnQgPSB0aGlzLnRhYlBhbmVsc1tpbmRleF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbnRlbnRcIilbMF07XG4gICAgcGFuZWxDb250ZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCBmYWxzZSk7XG4gICAgcGFuZWxDb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgIHBhbmVsQ29udGVudC5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XG5cbiAgICB0aGlzLnRhYlBhbmVsc1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG4gICAgdGhpcy50YWJQYW5lbHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcblxuICAgIGlmICh1c2VySW52b2tlZCkge1xuICAgICAgdGhpcy50YWJUcmlnZ2Vyc1tpbmRleF0uZm9jdXMoKTtcbiAgICB9XG4gIH07XG5cbiAgQWNjb3JkaW9uVGFicy5wcm90b3R5cGUuX2hpZGUgPSBmdW5jdGlvbiAoaW5kZXgpIHtcblxuICAgIHRoaXMudGFiVHJpZ2dlcnNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXNlbGVjdGVkJyk7XG4gICAgdGhpcy50YWJUcmlnZ2Vyc1tpbmRleF0uc2V0QXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJywgZmFsc2UpO1xuICAgIHRoaXMudGFiVHJpZ2dlcnNbaW5kZXhdLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG5cbiAgICB0aGlzLmFjY29yZGlvblRyaWdnZXJzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCBmYWxzZSk7XG5cbiAgICB2YXIgcGFuZWxDb250ZW50ID0gdGhpcy50YWJQYW5lbHNbaW5kZXhdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb250ZW50XCIpWzBdO1xuICAgIHBhbmVsQ29udGVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgdHJ1ZSk7XG4gICAgcGFuZWxDb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcbiAgICBwYW5lbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XG5cbiAgICB0aGlzLnRhYlBhbmVsc1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuICAgIHRoaXMudGFiUGFuZWxzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcbiAgICB0aGlzLnRhYlBhbmVsc1tpbmRleF0uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcbiAgfTtcblxuICBBY2NvcmRpb25UYWJzLnByb3RvdHlwZS5zZWxlY3RUYWIgPSBmdW5jdGlvbiAoaW5kZXgsIHVzZXJJbnZva2VkKSB7XG5cbiAgICBpZiAoaW5kZXggPT09IG51bGwpIHtcbiAgICAgIGlmKHRoaXMuaXNBY2NvcmRpb24pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW5kZXggPSAwO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmKCF0aGlzLnRhYlBhbmVsc1tpbmRleF0uY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1oaWRkZW4nKSAmJiB1c2VySW52b2tlZCkge1xuXG4gICAgICBpZiAoaW5kZXggPT09IHRoaXMuc2VsZWN0ZWRUYWIpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IG51bGw7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gbnVsbDtcbiAgICAgICAgdGhpcy5wcmV2U2VsZWN0ZWRUYWIgPSBpbmRleDtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faGlkZShpbmRleCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc0FjY29yZGlvbikge1xuXG4gICAgICB0aGlzLnByZXZTZWxlY3RlZFRhYiA9IHRoaXMuc2VsZWN0ZWRUYWI7XG4gICAgICB0aGlzLnNlbGVjdGVkVGFiID0gaW5kZXg7XG5cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucHJldlNlbGVjdGVkVGFiID09PSBudWxsIHx8ICF0aGlzLmlzQWNjb3JkaW9uKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50YWJUcmlnZ2Vyc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgaWYgKGkgIT09IGluZGV4KSB7XG4gICAgICAgICAgICB0aGlzLl9oaWRlKGkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMuX2hpZGUodGhpcy5zZWxlY3RlZFRhYik7XG4gICAgICB9XG5cbiAgICAgIHRoaXMucHJldlNlbGVjdGVkVGFiID0gdGhpcy5zZWxlY3RlZFRhYjtcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSBpbmRleDtcbiAgICB9XG5cbiAgICB0aGlzLl9zaG93KHRoaXMuc2VsZWN0ZWRUYWIsIHVzZXJJbnZva2VkKTtcblxuICB9O1xuXG4gIEFjY29yZGlvblRhYnMucHJvdG90eXBlLmRlc3Ryb3kgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGFiVHJpZ2dlcnNMZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy50YWJUcmlnZ2Vyc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1zZWxlY3RlZCcpO1xuICAgICAgdGhpcy50YWJUcmlnZ2Vyc1tpXS5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnKTtcbiAgICAgIHRoaXMudGFiVHJpZ2dlcnNbaV0ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuXG4gICAgICB0aGlzLnRhYlBhbmVsc1tpXS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcbiAgICAgIHRoaXMudGFiUGFuZWxzW2ldLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgIHRoaXMudGFiUGFuZWxzW2ldLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcblxuICAgICAgdGhpcy50YWJUcmlnZ2Vyc1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgdGhpcy50YWJUcmlnZ2Vyc1tpXS5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duTGlzdGVuZXIsIGZhbHNlKTtcblxuICAgICAgZGVsZXRlIHRoaXMudGFiVHJpZ2dlcnNbaV0uaW5kZXg7XG4gICAgfVxuXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1pbml0aWFsaXplZCcpO1xuICB9O1xuXG4gIC8qKlxuICAgICogR2V0IHRoZSBjbG9zZXN0IG1hdGNoaW5nIGVsZW1lbnQgdXAgdGhlIERPTSB0cmVlLlxuICAgICogQHByaXZhdGVcbiAgICAqIEBwYXJhbSAge0VsZW1lbnR9IGVsZW0gICAgIFN0YXJ0aW5nIGVsZW1lbnRcbiAgICAqIEBwYXJhbSAge1N0cmluZ30gIHNlbGVjdG9yIFNlbGVjdG9yIHRvIG1hdGNoIGFnYWluc3RcbiAgICAqIEByZXR1cm4ge0Jvb2xlYW58RWxlbWVudH0gIFJldHVybnMgbnVsbCBpZiBub3QgbWF0Y2ggZm91bmRcbiAgICAqL1xuICBBY2NvcmRpb25UYWJzLnByb3RvdHlwZS5fZ2V0Q2xvc2VzdCA9IGZ1bmN0aW9uICggZWxlbSwgc2VsZWN0b3IgKSB7XG5cbiAgICAvLyBFbGVtZW50Lm1hdGNoZXMoKSBwb2x5ZmlsbFxuICAgIGlmICghRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xuICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID1cbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubW96TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tc01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUub01hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICBmdW5jdGlvbihzKSB7XG4gICAgICAgICAgICAgICAgdmFyIG1hdGNoZXMgPSAodGhpcy5kb2N1bWVudCB8fCB0aGlzLm93bmVyRG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwocyksXG4gICAgICAgICAgICAgICAgICAgIGkgPSBtYXRjaGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoLS1pID49IDAgJiYgbWF0Y2hlcy5pdGVtKGkpICE9PSB0aGlzKSB7fVxuICAgICAgICAgICAgICAgIHJldHVybiBpID4gLTE7XG4gICAgICAgICAgICB9O1xuICAgIH1cblxuICAgIC8vIEdldCBjbG9zZXN0IG1hdGNoXG4gICAgZm9yICggOyBlbGVtICYmIGVsZW0gIT09IGRvY3VtZW50OyBlbGVtID0gZWxlbS5wYXJlbnROb2RlICkge1xuICAgICAgICBpZiAoIGVsZW0ubWF0Y2hlcyggc2VsZWN0b3IgKSApIHJldHVybiBlbGVtO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuXG4gIH07XG5cbiAgLy8gUGFzcyBpbiB0aGUgb2JqZWN0cyB0byBtZXJnZSBhcyBhcmd1bWVudHMuXG4gIC8vIEZvciBhIGRlZXAgZXh0ZW5kLCBzZXQgdGhlIGZpcnN0IGFyZ3VtZW50IHRvIGB0cnVlYC5cbiAgQWNjb3JkaW9uVGFicy5wcm90b3R5cGUuX2V4dGVuZCA9IGZ1bmN0aW9uICgpIHtcblxuICAgICAgLy8gVmFyaWFibGVzXG4gICAgICB2YXIgZXh0ZW5kZWQgPSB7fTtcbiAgICAgIHZhciBkZWVwID0gZmFsc2U7XG4gICAgICB2YXIgaSA9IDA7XG4gICAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcblxuICAgICAgLy8gQ2hlY2sgaWYgYSBkZWVwIG1lcmdlXG4gICAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCggYXJndW1lbnRzWzBdICkgPT09ICdbb2JqZWN0IEJvb2xlYW5dJyApIHtcbiAgICAgICAgICBkZWVwID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgIGkrKztcbiAgICAgIH1cblxuICAgICAgLy8gTWVyZ2UgdGhlIG9iamVjdCBpbnRvIHRoZSBleHRlbmRlZCBvYmplY3RcbiAgICAgIHZhciBtZXJnZSA9IGZ1bmN0aW9uIChvYmopIHtcbiAgICAgICAgICBmb3IgKCB2YXIgcHJvcCBpbiBvYmogKSB7XG4gICAgICAgICAgICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKCBvYmosIHByb3AgKSApIHtcbiAgICAgICAgICAgICAgICAgIC8vIElmIGRlZXAgbWVyZ2UgYW5kIHByb3BlcnR5IGlzIGFuIG9iamVjdCwgbWVyZ2UgcHJvcGVydGllc1xuICAgICAgICAgICAgICAgICAgaWYgKCBkZWVwICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmpbcHJvcF0pID09PSAnW29iamVjdCBPYmplY3RdJyApIHtcbiAgICAgICAgICAgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IGV4dGVuZCggdHJ1ZSwgZXh0ZW5kZWRbcHJvcF0sIG9ialtwcm9wXSApO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBleHRlbmRlZFtwcm9wXSA9IG9ialtwcm9wXTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIC8vIExvb3AgdGhyb3VnaCBlYWNoIG9iamVjdCBhbmQgY29uZHVjdCBhIG1lcmdlXG4gICAgICBmb3IgKCA7IGkgPCBsZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICB2YXIgb2JqID0gYXJndW1lbnRzW2ldO1xuICAgICAgICAgIG1lcmdlKG9iaik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBleHRlbmRlZDtcblxuICB9O1xuXG4gIC8vIFJldHVybnMgYSBmdW5jdGlvbiwgdGhhdCwgYXMgbG9uZyBhcyBpdCBjb250aW51ZXMgdG8gYmUgaW52b2tlZCwgd2lsbCBub3RcbiAgLy8gYmUgdHJpZ2dlcmVkLiBUaGUgZnVuY3Rpb24gd2lsbCBiZSBjYWxsZWQgYWZ0ZXIgaXQgc3RvcHMgYmVpbmcgY2FsbGVkIGZvclxuICAvLyBOIG1pbGxpc2Vjb25kcy4gSWYgYGltbWVkaWF0ZWAgaXMgcGFzc2VkLCB0cmlnZ2VyIHRoZSBmdW5jdGlvbiBvbiB0aGVcbiAgLy8gbGVhZGluZyBlZGdlLCBpbnN0ZWFkIG9mIHRoZSB0cmFpbGluZy5cbiAgQWNjb3JkaW9uVGFicy5wcm90b3R5cGUuX2RlYm91bmNlID0gZnVuY3Rpb24gKGZ1bmMsIHdhaXQsIGltbWVkaWF0ZSkge1xuICAgIHZhciB0aW1lb3V0O1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcywgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgIHZhciBsYXRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB0aW1lb3V0ID0gbnVsbDtcbiAgICAgICAgaWYgKCFpbW1lZGlhdGUpIHsgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKTsgfTtcbiAgICAgIH07XG4gICAgICB2YXIgY2FsbE5vdyA9IGltbWVkaWF0ZSAmJiAhdGltZW91dDtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGxhdGVyLCB3YWl0KTtcbiAgICAgIGlmIChjYWxsTm93KSB7IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncykgfTtcbiAgICB9O1xuICB9O1xuXG4gIHZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcblxuICBmdW5jdGlvbiAkKGV4cHIsIGNvbikge1xuICAgIHJldHVybiB0eXBlb2YgZXhwciA9PT0gXCJzdHJpbmdcIiA/IChjb24gfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3IoZXhwcikgOiBleHByIHx8IG51bGw7XG4gIH1cblxuICBmdW5jdGlvbiAkJChleHByLCBjb24pIHtcbiAgICByZXR1cm4gc2xpY2UuY2FsbCgoY29uIHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKGV4cHIpKTtcbiAgfVxuXG4gIC8vIEluaXRpYWxpemF0aW9uXG5cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICAkJChcIi5qcy10YWJzXCIpLmZvckVhY2goZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICBuZXcgQWNjb3JkaW9uVGFicyhpbnB1dCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBBcmUgd2UgaW4gYSBicm93c2VyPyBDaGVjayBmb3IgRG9jdW1lbnQgY29uc3RydWN0b3JcbiAgaWYgKHR5cGVvZiBEb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIC8vIERPTSBhbHJlYWR5IGxvYWRlZD9cbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSAhPT0gXCJsb2FkaW5nXCIpIHtcbiAgICAgIGluaXQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAvLyBXYWl0IGZvciBpdFxuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgaW5pdCk7XG4gICAgfVxuICB9XG5cbiAgLy8gRXhwb3J0IG9uIHNlbGYgd2hlbiBpbiBhIGJyb3dzZXJcbiAgaWYgKHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgc2VsZi5BY2NvcmRpb25UYWJzID0gQWNjb3JkaW9uVGFicztcbiAgfVxuXG4gIC8vIEV4cG9zZSBhcyBhIENKUyBtb2R1bGVcbiAgaWYgKHR5cGVvZiBtb2R1bGUgPT09IFwib2JqZWN0XCIgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IEFjY29yZGlvblRhYnM7XG4gIH1cblxuICByZXR1cm4gQWNjb3JkaW9uVGFicztcblxufSkoKTtcbiIsICJjb25zdCBleHBhbmRhYmxlVGV4dENhcmRzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZXhwYW5kYWJsZS10ZXh0LWNhcmQnKTtcclxuXHJcbiAgICBjYXJkcy5mb3JFYWNoKGNhcmQgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wZW4gPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5qcy1leHBhbmRhYmxlLXRleHQtY2FyZF9fb3BlbicpO1xyXG4gICAgICAgIGNvbnN0IGNsb3NlID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuanMtZXhwYW5kYWJsZS10ZXh0LWNhcmRfX2Nsb3NlJyk7XHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IGNhcmQucXVlcnlTZWxlY3RvcignLmpzLWV4cGFuZGFibGUtdGV4dC1jYXJkX19vdmVybGF5Jyk7XHJcblxyXG4gICAgICAgIG9wZW4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIG9wZW4uYXJpYUV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgb3ZlcmxheS5hcmlhSGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBvcGVuLmFyaWFFeHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBvdmVybGF5LmFyaWFIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBleHBhbmRhYmxlVGV4dENhcmRzOyIsICJjb25zdCBoZWFkZXIgPSAoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgaGVhZGVyU2VhcmNoT3ZlcmxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1oZWFkZXJfX3NlYXJjaC1vdmVybGF5Jyk7XHJcbiAgICBjb25zdCBoZWFkZXJTZWFyY2hPdmVybGF5T3BlbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1oZWFkZXJfX3NlYXJjaC1vdmVybGF5LXRvZ2dsZScpO1xyXG4gICAgY29uc3QgaGVhZGVyU2VhcmNoT3ZlcmxheUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWhlYWRlcl9fc2VhcmNoLW92ZXJsYXktY2xvc2UnKTtcclxuICAgIGNvbnN0IGhlYWRlclNlYXJjaElucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2hlYWRlci1zZWFyY2gtaW5wdXQnKTtcclxuXHJcbiAgICBjb25zdCBzaXRlTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zaXRlLW1haW4nKTtcclxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1oZWFkZXInKTtcclxuICAgIGNvbnN0IG9mZnNldEhlaWdodCA9IDEyMDtcclxuXHJcbiAgICBsZXQgdGVtcE9wZW5lciA9IFwiXCI7XHJcblxyXG4gICAgY29uc3Qga2lsbE92ZXJsYXkgPSAoKSA9PiB7XHJcbiAgICAgICAgaGVhZGVyU2VhcmNoT3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgaGVhZGVyU2VhcmNoT3ZlcmxheS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgICAgICB0ZW1wT3BlbmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcclxuICAgICAgICB0ZW1wT3BlbmVyLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICdmYWxzZScpO1xyXG4gICAgICAgIGhlYWRlclNlYXJjaElucHV0LmJsdXIoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBpbml0T3ZlcmxheSA9IChvcGVuQnRuKSA9PiB7XHJcbiAgICAgICAgaGVhZGVyU2VhcmNoT3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgaGVhZGVyU2VhcmNoT3ZlcmxheS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ2ZhbHNlJyk7XHJcbiAgICAgICAgb3BlbkJ0bi5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgb3BlbkJ0bi5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAndHJ1ZScpO1xyXG4gICAgICAgIHRlbXBPcGVuZXIgPSBvcGVuQnRuO1xyXG4gICAgICAgIGhlYWRlclNlYXJjaElucHV0LmZvY3VzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGhlYWRlclNlYXJjaE92ZXJsYXkpIHtcclxuXHJcbiAgICAgICAgaGVhZGVyU2VhcmNoT3ZlcmxheU9wZW5lcnMuZm9yRWFjaCgoaGVhZGVyU2VhcmNoT3ZlcmxheU9wZW5lcikgPT4ge1xyXG4gICAgICAgICAgICBoZWFkZXJTZWFyY2hPdmVybGF5T3BlbmVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoaGVhZGVyU2VhcmNoT3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGtpbGxPdmVybGF5KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGluaXRPdmVybGF5KGhlYWRlclNlYXJjaE92ZXJsYXlPcGVuZXIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgZSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VzY2FwZScgJiYgaGVhZGVyU2VhcmNoT3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLW9wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAga2lsbE92ZXJsYXkoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBoZWFkZXJTZWFyY2hPdmVybGF5Q2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBraWxsT3ZlcmxheSh0ZW1wT3BlbmVyKTtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICBpZiAoaGVhZGVyKSB7XHJcblxyXG4gICAgICAgIGlmIChoZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdzaXRlLWhlYWRlci0tc2hvdy1vbi1zY3JvbGwtdXAnKSkge1xyXG5cclxuICAgICAgICAgICAgbGV0IHNjcm9sbFBvcyA9IDA7XHJcblxyXG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgdG9wIH0gPSBkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaXNTdGlja3kgPSBoZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdwb3NpdGlvbi1zdGlja3knKTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVTY3JvbGxUb3AgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3NpdGUtaGVhZGVyLS10b3AnKTtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgncG9zaXRpb24tc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZVNjcm9sbFVwID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNTdGlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3Bvc2l0aW9uLXN0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlU2Nyb2xsRG93biA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2l0ZS1oZWFkZXItLXRvcCcpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBpZiAoaXNTdGlja3kpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2xvYmFsLnNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdwb3NpdGlvbi1zdGlja3knKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIDI1MCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKCFzaXRlTWFpbi5jbGFzc0xpc3QuY29udGFpbnMoXCJoYXMtb3ZlcmxheVwiKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0b3AgPj0gb2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVNjcm9sbFRvcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodG9wID4gc2Nyb2xsUG9zKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVNjcm9sbFVwKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2Nyb2xsRG93bigpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxQb3MgPSB0b3A7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSBpZiAoaGVhZGVyLmNsYXNzTGlzdC5jb250YWlucygncG9zaXRpb24tc3RpY2t5JykpIHtcclxuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHsgdG9wIH0gPSBkb2N1bWVudC5ib2R5LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICh0b3AgPj0gb2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5hZGQoJ3NpdGUtaGVhZGVyLS10b3AnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NpdGUtaGVhZGVyLS10b3AnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuXHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaGVhZGVyOyIsICJjb25zdCBuYXYgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2l0ZS1oZWFkZXInKTtcclxuICAgIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc2l0ZS1tYWluJyk7XHJcbiAgICBjb25zdCBuYXZJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1uYXYtaXRlbScpO1xyXG4gICAgY29uc3QgbmF2U3ViTWVudXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtbmF2LXN1Yi1tZW51Jyk7XHJcbiAgICBjb25zdCBuYXZTdWJNZW51Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtc3ViLW1lbnUtY2xvc2UnKTtcclxuXHJcbiAgICBjb25zdCBuYXZUb2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbmF2LXRvZ2dsZScpO1xyXG4gICAgY29uc3QgbmF2TW9iaWxlSXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtbmF2LW1vYmlsZS1pdGVtJyk7XHJcbiAgICBjb25zdCBuYXZNb2JpbGVTdWJNZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1uYXYtbW9iaWxlLXN1Yi1tZW51Jyk7XHJcbiAgICBjb25zdCBuYXZNb2JpbGVTdWJNZW51Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtc3ViLW1lbnUtbW9iaWxlLWJhY2snKTtcclxuXHJcblxyXG4gICAgY29uc3QgZGFya25lc3MgPSAoc2hvdykgPT4ge1xyXG4gICAgICAgIGlmIChzaG93KSB7XHJcbiAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LmFkZChcImhhcy1vdmVybGF5XCIpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbWFpbi5jbGFzc0xpc3QucmVtb3ZlKFwiaGFzLW92ZXJsYXlcIilcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgY2xvc2VNZW51ID0gKGNsZWFyTmF2SXRlbXMsIGNsZWFyU3ViTmF2SXRlbXMpID0+IHtcclxuICAgICAgICBjbGVhck5hdkl0ZW1zLmZvckVhY2goKGNsZWFyTmF2SXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhck5hdkl0ZW0uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBcImZhbHNlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGNsZWFyU3ViTmF2SXRlbXMuZm9yRWFjaCgoY2xlYXJTdWJOYXZJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyU3ViTmF2SXRlbS5jbGFzc0xpc3QuYWRkKFwiaXMtaGlkZGVuXCIpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkYXJrbmVzcyhmYWxzZSlcclxuICAgIH07XHJcblxyXG4gICAgaWYgKG5hdkl0ZW1zKSB7XHJcblxyXG4gICAgICAgIG5hdkl0ZW1zLmZvckVhY2goKG5hdkl0ZW0pID0+IHtcclxuICAgICAgICAgICAgbmF2SXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGNsb3NlTWVudShuYXZJdGVtcywgbmF2U3ViTWVudXMpO1xyXG4gICAgICAgICAgICAgICAgbmF2SXRlbS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIFwidHJ1ZVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdldFRhcmdldElkID0gbmF2SXRlbS5nZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZ2V0VGFyZ2V0SWQpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0UGFuZWwuY2xhc3NMaXN0LnJlbW92ZShcImlzLWhpZGRlblwiKTtcclxuICAgICAgICAgICAgICAgIGRhcmtuZXNzKHRydWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIG5hdkl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBuYXZTdWJNZW51Q2xvc2UuZm9yRWFjaCgoY2xvc2UpID0+IHtcclxuICAgICAgICAgICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBkYXJrbmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBjbG9zZU1lbnUobmF2SXRlbXMsIG5hdlN1Yk1lbnVzKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaXNTdWJOYXZJdGVtID0gZS50YXJnZXQuY2xvc2VzdChcIi5qcy1uYXYtc3ViLW1lbnVcIikgPT0gbnVsbDtcclxuICAgICAgICAgICAgY29uc3QgaXNOYXZJdGVtID0gZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwianMtbmF2LWl0ZW1cIik7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNTdWJOYXZJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzTmF2SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNsb3NlTWVudShuYXZJdGVtcywgbmF2U3ViTWVudXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhcmtuZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbWFpbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgY2xvc2VNZW51KG5hdkl0ZW1zLCBuYXZTdWJNZW51cyk7XHJcbiAgICAgICAgICAgIGRhcmtuZXNzKGZhbHNlKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5hdk1vYmlsZUl0ZW1zKSB7XHJcblxyXG4gICAgICAgIG5hdk1vYmlsZUl0ZW1zLmZvckVhY2goKG5hdk1vYmlsZUl0ZW0pID0+IHtcclxuICAgICAgICAgICAgbmF2TW9iaWxlSXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBuYXZNb2JpbGVJdGVtLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ2V0VGFyZ2V0SWQgPSBuYXZNb2JpbGVJdGVtLmdldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChnZXRUYXJnZXRJZCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRQYW5lbC5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbmF2TW9iaWxlU3ViTWVudUNsb3NlLmZvckVhY2goKG5hdk1vYmlsZUNsb3NlKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdk1vYmlsZUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgY2xvc2VNZW51KG5hdk1vYmlsZUl0ZW1zLCBuYXZNb2JpbGVTdWJNZW51cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAobmF2VG9nZ2xlKSB7XHJcblxyXG4gICAgICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKG5hdlRvZ2dsZS5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKSk7XHJcblxyXG4gICAgICAgIGNvbnN0IG9wZW5OYXYgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdi5hcmlhSGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG5hdlRvZ2dsZS5hcmlhRXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnaGFzLW9wZW4tbmF2Jyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgY2xvc2VOYXYgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdi5hcmlhSGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgbmF2VG9nZ2xlLmFyaWFFeHBhbmRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnaGFzLW9wZW4tbmF2Jyk7XHJcbiAgICAgICAgICAgIGNsb3NlTWVudShuYXZNb2JpbGVJdGVtcywgbmF2TW9iaWxlU3ViTWVudXMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIG5hdlRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKG5hdlRvZ2dsZS5hcmlhRXhwYW5kZWQgPT09ICd0cnVlJykge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VOYXYoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG9wZW5OYXYoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZG9jdW1lbnQub25rZXlkb3duID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBpZiAoZS5rZXkgPT0gXCJFc2NhcGVcIikge1xyXG4gICAgICAgICAgICBjbG9zZU1lbnUobmF2SXRlbXMsIG5hdlN1Yk1lbnVzKTtcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5hdjsiLCAiLyoqXG4gKiBTU1IgV2luZG93IDQuMC4yXG4gKiBCZXR0ZXIgaGFuZGxpbmcgZm9yIHdpbmRvdyBvYmplY3QgaW4gU1NSIGVudmlyb25tZW50XG4gKiBodHRwczovL2dpdGh1Yi5jb20vbm9saW1pdHM0d2ViL3Nzci13aW5kb3dcbiAqXG4gKiBDb3B5cmlnaHQgMjAyMSwgVmxhZGltaXIgS2hhcmxhbXBpZGlcbiAqXG4gKiBMaWNlbnNlZCB1bmRlciBNSVRcbiAqXG4gKiBSZWxlYXNlZCBvbjogRGVjZW1iZXIgMTMsIDIwMjFcbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KG9iaikge1xuICByZXR1cm4gb2JqICE9PSBudWxsICYmIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmICdjb25zdHJ1Y3RvcicgaW4gb2JqICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gT2JqZWN0O1xufVxuZnVuY3Rpb24gZXh0ZW5kKHRhcmdldCwgc3JjKSB7XG4gIGlmICh0YXJnZXQgPT09IHZvaWQgMCkge1xuICAgIHRhcmdldCA9IHt9O1xuICB9XG4gIGlmIChzcmMgPT09IHZvaWQgMCkge1xuICAgIHNyYyA9IHt9O1xuICB9XG4gIE9iamVjdC5rZXlzKHNyYykuZm9yRWFjaChrZXkgPT4ge1xuICAgIGlmICh0eXBlb2YgdGFyZ2V0W2tleV0gPT09ICd1bmRlZmluZWQnKSB0YXJnZXRba2V5XSA9IHNyY1trZXldO2Vsc2UgaWYgKGlzT2JqZWN0KHNyY1trZXldKSAmJiBpc09iamVjdCh0YXJnZXRba2V5XSkgJiYgT2JqZWN0LmtleXMoc3JjW2tleV0pLmxlbmd0aCA+IDApIHtcbiAgICAgIGV4dGVuZCh0YXJnZXRba2V5XSwgc3JjW2tleV0pO1xuICAgIH1cbiAgfSk7XG59XG5jb25zdCBzc3JEb2N1bWVudCA9IHtcbiAgYm9keToge30sXG4gIGFkZEV2ZW50TGlzdGVuZXIoKSB7fSxcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcigpIHt9LFxuICBhY3RpdmVFbGVtZW50OiB7XG4gICAgYmx1cigpIHt9LFxuICAgIG5vZGVOYW1lOiAnJ1xuICB9LFxuICBxdWVyeVNlbGVjdG9yKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBxdWVyeVNlbGVjdG9yQWxsKCkge1xuICAgIHJldHVybiBbXTtcbiAgfSxcbiAgZ2V0RWxlbWVudEJ5SWQoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIGNyZWF0ZUV2ZW50KCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbml0RXZlbnQoKSB7fVxuICAgIH07XG4gIH0sXG4gIGNyZWF0ZUVsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNoaWxkcmVuOiBbXSxcbiAgICAgIGNoaWxkTm9kZXM6IFtdLFxuICAgICAgc3R5bGU6IHt9LFxuICAgICAgc2V0QXR0cmlidXRlKCkge30sXG4gICAgICBnZXRFbGVtZW50c0J5VGFnTmFtZSgpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIGNyZWF0ZUVsZW1lbnROUygpIHtcbiAgICByZXR1cm4ge307XG4gIH0sXG4gIGltcG9ydE5vZGUoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIGxvY2F0aW9uOiB7XG4gICAgaGFzaDogJycsXG4gICAgaG9zdDogJycsXG4gICAgaG9zdG5hbWU6ICcnLFxuICAgIGhyZWY6ICcnLFxuICAgIG9yaWdpbjogJycsXG4gICAgcGF0aG5hbWU6ICcnLFxuICAgIHByb3RvY29sOiAnJyxcbiAgICBzZWFyY2g6ICcnXG4gIH1cbn07XG5mdW5jdGlvbiBnZXREb2N1bWVudCgpIHtcbiAgY29uc3QgZG9jID0gdHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJyA/IGRvY3VtZW50IDoge307XG4gIGV4dGVuZChkb2MsIHNzckRvY3VtZW50KTtcbiAgcmV0dXJuIGRvYztcbn1cbmNvbnN0IHNzcldpbmRvdyA9IHtcbiAgZG9jdW1lbnQ6IHNzckRvY3VtZW50LFxuICBuYXZpZ2F0b3I6IHtcbiAgICB1c2VyQWdlbnQ6ICcnXG4gIH0sXG4gIGxvY2F0aW9uOiB7XG4gICAgaGFzaDogJycsXG4gICAgaG9zdDogJycsXG4gICAgaG9zdG5hbWU6ICcnLFxuICAgIGhyZWY6ICcnLFxuICAgIG9yaWdpbjogJycsXG4gICAgcGF0aG5hbWU6ICcnLFxuICAgIHByb3RvY29sOiAnJyxcbiAgICBzZWFyY2g6ICcnXG4gIH0sXG4gIGhpc3Rvcnk6IHtcbiAgICByZXBsYWNlU3RhdGUoKSB7fSxcbiAgICBwdXNoU3RhdGUoKSB7fSxcbiAgICBnbygpIHt9LFxuICAgIGJhY2soKSB7fVxuICB9LFxuICBDdXN0b21FdmVudDogZnVuY3Rpb24gQ3VzdG9tRXZlbnQoKSB7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGFkZEV2ZW50TGlzdGVuZXIoKSB7fSxcbiAgcmVtb3ZlRXZlbnRMaXN0ZW5lcigpIHt9LFxuICBnZXRDb21wdXRlZFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBnZXRQcm9wZXJ0eVZhbHVlKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgfTtcbiAgfSxcbiAgSW1hZ2UoKSB7fSxcbiAgRGF0ZSgpIHt9LFxuICBzY3JlZW46IHt9LFxuICBzZXRUaW1lb3V0KCkge30sXG4gIGNsZWFyVGltZW91dCgpIHt9LFxuICBtYXRjaE1lZGlhKCkge1xuICAgIHJldHVybiB7fTtcbiAgfSxcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGNhbGxiYWNrKSB7XG4gICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gc2V0VGltZW91dChjYWxsYmFjaywgMCk7XG4gIH0sXG4gIGNhbmNlbEFuaW1hdGlvbkZyYW1lKGlkKSB7XG4gICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjbGVhclRpbWVvdXQoaWQpO1xuICB9XG59O1xuZnVuY3Rpb24gZ2V0V2luZG93KCkge1xuICBjb25zdCB3aW4gPSB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyA/IHdpbmRvdyA6IHt9O1xuICBleHRlbmQod2luLCBzc3JXaW5kb3cpO1xuICByZXR1cm4gd2luO1xufVxuXG5leHBvcnQgeyBnZXRXaW5kb3cgYXMgYSwgZ2V0RG9jdW1lbnQgYXMgZyB9O1xuIiwgImltcG9ydCB7IGEgYXMgZ2V0V2luZG93LCBnIGFzIGdldERvY3VtZW50IH0gZnJvbSAnLi9zc3Itd2luZG93LmVzbS5tanMnO1xuXG5mdW5jdGlvbiBjbGFzc2VzVG9Ub2tlbnMoY2xhc3Nlcykge1xuICBpZiAoY2xhc3NlcyA9PT0gdm9pZCAwKSB7XG4gICAgY2xhc3NlcyA9ICcnO1xuICB9XG4gIHJldHVybiBjbGFzc2VzLnRyaW0oKS5zcGxpdCgnICcpLmZpbHRlcihjID0+ICEhYy50cmltKCkpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9wcyhvYmopIHtcbiAgY29uc3Qgb2JqZWN0ID0gb2JqO1xuICBPYmplY3Qua2V5cyhvYmplY3QpLmZvckVhY2goa2V5ID0+IHtcbiAgICB0cnkge1xuICAgICAgb2JqZWN0W2tleV0gPSBudWxsO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIG5vIGdldHRlciBmb3Igb2JqZWN0XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBkZWxldGUgb2JqZWN0W2tleV07XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gc29tZXRoaW5nIGdvdCB3cm9uZ1xuICAgIH1cbiAgfSk7XG59XG5mdW5jdGlvbiBuZXh0VGljayhjYWxsYmFjaywgZGVsYXkpIHtcbiAgaWYgKGRlbGF5ID09PSB2b2lkIDApIHtcbiAgICBkZWxheSA9IDA7XG4gIH1cbiAgcmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIGRlbGF5KTtcbn1cbmZ1bmN0aW9uIG5vdygpIHtcbiAgcmV0dXJuIERhdGUubm93KCk7XG59XG5mdW5jdGlvbiBnZXRDb21wdXRlZFN0eWxlKGVsKSB7XG4gIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICBsZXQgc3R5bGU7XG4gIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgIHN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpO1xuICB9XG4gIGlmICghc3R5bGUgJiYgZWwuY3VycmVudFN0eWxlKSB7XG4gICAgc3R5bGUgPSBlbC5jdXJyZW50U3R5bGU7XG4gIH1cbiAgaWYgKCFzdHlsZSkge1xuICAgIHN0eWxlID0gZWwuc3R5bGU7XG4gIH1cbiAgcmV0dXJuIHN0eWxlO1xufVxuZnVuY3Rpb24gZ2V0VHJhbnNsYXRlKGVsLCBheGlzKSB7XG4gIGlmIChheGlzID09PSB2b2lkIDApIHtcbiAgICBheGlzID0gJ3gnO1xuICB9XG4gIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICBsZXQgbWF0cml4O1xuICBsZXQgY3VyVHJhbnNmb3JtO1xuICBsZXQgdHJhbnNmb3JtTWF0cml4O1xuICBjb25zdCBjdXJTdHlsZSA9IGdldENvbXB1dGVkU3R5bGUoZWwpO1xuICBpZiAod2luZG93LldlYktpdENTU01hdHJpeCkge1xuICAgIGN1clRyYW5zZm9ybSA9IGN1clN0eWxlLnRyYW5zZm9ybSB8fCBjdXJTdHlsZS53ZWJraXRUcmFuc2Zvcm07XG4gICAgaWYgKGN1clRyYW5zZm9ybS5zcGxpdCgnLCcpLmxlbmd0aCA+IDYpIHtcbiAgICAgIGN1clRyYW5zZm9ybSA9IGN1clRyYW5zZm9ybS5zcGxpdCgnLCAnKS5tYXAoYSA9PiBhLnJlcGxhY2UoJywnLCAnLicpKS5qb2luKCcsICcpO1xuICAgIH1cbiAgICAvLyBTb21lIG9sZCB2ZXJzaW9ucyBvZiBXZWJraXQgY2hva2Ugd2hlbiAnbm9uZScgaXMgcGFzc2VkOyBwYXNzXG4gICAgLy8gZW1wdHkgc3RyaW5nIGluc3RlYWQgaW4gdGhpcyBjYXNlXG4gICAgdHJhbnNmb3JtTWF0cml4ID0gbmV3IHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgoY3VyVHJhbnNmb3JtID09PSAnbm9uZScgPyAnJyA6IGN1clRyYW5zZm9ybSk7XG4gIH0gZWxzZSB7XG4gICAgdHJhbnNmb3JtTWF0cml4ID0gY3VyU3R5bGUuTW96VHJhbnNmb3JtIHx8IGN1clN0eWxlLk9UcmFuc2Zvcm0gfHwgY3VyU3R5bGUuTXNUcmFuc2Zvcm0gfHwgY3VyU3R5bGUubXNUcmFuc2Zvcm0gfHwgY3VyU3R5bGUudHJhbnNmb3JtIHx8IGN1clN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3RyYW5zZm9ybScpLnJlcGxhY2UoJ3RyYW5zbGF0ZSgnLCAnbWF0cml4KDEsIDAsIDAsIDEsJyk7XG4gICAgbWF0cml4ID0gdHJhbnNmb3JtTWF0cml4LnRvU3RyaW5nKCkuc3BsaXQoJywnKTtcbiAgfVxuICBpZiAoYXhpcyA9PT0gJ3gnKSB7XG4gICAgLy8gTGF0ZXN0IENocm9tZSBhbmQgd2Via2l0cyBGaXhcbiAgICBpZiAod2luZG93LldlYktpdENTU01hdHJpeCkgY3VyVHJhbnNmb3JtID0gdHJhbnNmb3JtTWF0cml4Lm00MTtcbiAgICAvLyBDcmF6eSBJRTEwIE1hdHJpeFxuICAgIGVsc2UgaWYgKG1hdHJpeC5sZW5ndGggPT09IDE2KSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFsxMl0pO1xuICAgIC8vIE5vcm1hbCBCcm93c2Vyc1xuICAgIGVsc2UgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbNF0pO1xuICB9XG4gIGlmIChheGlzID09PSAneScpIHtcbiAgICAvLyBMYXRlc3QgQ2hyb21lIGFuZCB3ZWJraXRzIEZpeFxuICAgIGlmICh3aW5kb3cuV2ViS2l0Q1NTTWF0cml4KSBjdXJUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1NYXRyaXgubTQyO1xuICAgIC8vIENyYXp5IElFMTAgTWF0cml4XG4gICAgZWxzZSBpZiAobWF0cml4Lmxlbmd0aCA9PT0gMTYpIGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzEzXSk7XG4gICAgLy8gTm9ybWFsIEJyb3dzZXJzXG4gICAgZWxzZSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs1XSk7XG4gIH1cbiAgcmV0dXJuIGN1clRyYW5zZm9ybSB8fCAwO1xufVxuZnVuY3Rpb24gaXNPYmplY3Qobykge1xuICByZXR1cm4gdHlwZW9mIG8gPT09ICdvYmplY3QnICYmIG8gIT09IG51bGwgJiYgby5jb25zdHJ1Y3RvciAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwobykuc2xpY2UoOCwgLTEpID09PSAnT2JqZWN0Jztcbn1cbmZ1bmN0aW9uIGlzTm9kZShub2RlKSB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIHdpbmRvdy5IVE1MRWxlbWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gbm9kZSBpbnN0YW5jZW9mIEhUTUxFbGVtZW50O1xuICB9XG4gIHJldHVybiBub2RlICYmIChub2RlLm5vZGVUeXBlID09PSAxIHx8IG5vZGUubm9kZVR5cGUgPT09IDExKTtcbn1cbmZ1bmN0aW9uIGV4dGVuZCgpIHtcbiAgY29uc3QgdG8gPSBPYmplY3QoYXJndW1lbnRzLmxlbmd0aCA8PSAwID8gdW5kZWZpbmVkIDogYXJndW1lbnRzWzBdKTtcbiAgY29uc3Qgbm9FeHRlbmQgPSBbJ19fcHJvdG9fXycsICdjb25zdHJ1Y3RvcicsICdwcm90b3R5cGUnXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBuZXh0U291cmNlID0gaSA8IDAgfHwgYXJndW1lbnRzLmxlbmd0aCA8PSBpID8gdW5kZWZpbmVkIDogYXJndW1lbnRzW2ldO1xuICAgIGlmIChuZXh0U291cmNlICE9PSB1bmRlZmluZWQgJiYgbmV4dFNvdXJjZSAhPT0gbnVsbCAmJiAhaXNOb2RlKG5leHRTb3VyY2UpKSB7XG4gICAgICBjb25zdCBrZXlzQXJyYXkgPSBPYmplY3Qua2V5cyhPYmplY3QobmV4dFNvdXJjZSkpLmZpbHRlcihrZXkgPT4gbm9FeHRlbmQuaW5kZXhPZihrZXkpIDwgMCk7XG4gICAgICBmb3IgKGxldCBuZXh0SW5kZXggPSAwLCBsZW4gPSBrZXlzQXJyYXkubGVuZ3RoOyBuZXh0SW5kZXggPCBsZW47IG5leHRJbmRleCArPSAxKSB7XG4gICAgICAgIGNvbnN0IG5leHRLZXkgPSBrZXlzQXJyYXlbbmV4dEluZGV4XTtcbiAgICAgICAgY29uc3QgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobmV4dFNvdXJjZSwgbmV4dEtleSk7XG4gICAgICAgIGlmIChkZXNjICE9PSB1bmRlZmluZWQgJiYgZGVzYy5lbnVtZXJhYmxlKSB7XG4gICAgICAgICAgaWYgKGlzT2JqZWN0KHRvW25leHRLZXldKSAmJiBpc09iamVjdChuZXh0U291cmNlW25leHRLZXldKSkge1xuICAgICAgICAgICAgaWYgKG5leHRTb3VyY2VbbmV4dEtleV0uX19zd2lwZXJfXykge1xuICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBleHRlbmQodG9bbmV4dEtleV0sIG5leHRTb3VyY2VbbmV4dEtleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoIWlzT2JqZWN0KHRvW25leHRLZXldKSAmJiBpc09iamVjdChuZXh0U291cmNlW25leHRLZXldKSkge1xuICAgICAgICAgICAgdG9bbmV4dEtleV0gPSB7fTtcbiAgICAgICAgICAgIGlmIChuZXh0U291cmNlW25leHRLZXldLl9fc3dpcGVyX18pIHtcbiAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXh0ZW5kKHRvW25leHRLZXldLCBuZXh0U291cmNlW25leHRLZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdG87XG59XG5mdW5jdGlvbiBzZXRDU1NQcm9wZXJ0eShlbCwgdmFyTmFtZSwgdmFyVmFsdWUpIHtcbiAgZWwuc3R5bGUuc2V0UHJvcGVydHkodmFyTmFtZSwgdmFyVmFsdWUpO1xufVxuZnVuY3Rpb24gYW5pbWF0ZUNTU01vZGVTY3JvbGwoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICB0YXJnZXRQb3NpdGlvbixcbiAgICBzaWRlXG4gIH0gPSBfcmVmO1xuICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgY29uc3Qgc3RhcnRQb3NpdGlvbiA9IC1zd2lwZXIudHJhbnNsYXRlO1xuICBsZXQgc3RhcnRUaW1lID0gbnVsbDtcbiAgbGV0IHRpbWU7XG4gIGNvbnN0IGR1cmF0aW9uID0gc3dpcGVyLnBhcmFtcy5zcGVlZDtcbiAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5zY3JvbGxTbmFwVHlwZSA9ICdub25lJztcbiAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHN3aXBlci5jc3NNb2RlRnJhbWVJRCk7XG4gIGNvbnN0IGRpciA9IHRhcmdldFBvc2l0aW9uID4gc3RhcnRQb3NpdGlvbiA/ICduZXh0JyA6ICdwcmV2JztcbiAgY29uc3QgaXNPdXRPZkJvdW5kID0gKGN1cnJlbnQsIHRhcmdldCkgPT4ge1xuICAgIHJldHVybiBkaXIgPT09ICduZXh0JyAmJiBjdXJyZW50ID49IHRhcmdldCB8fCBkaXIgPT09ICdwcmV2JyAmJiBjdXJyZW50IDw9IHRhcmdldDtcbiAgfTtcbiAgY29uc3QgYW5pbWF0ZSA9ICgpID0+IHtcbiAgICB0aW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgaWYgKHN0YXJ0VGltZSA9PT0gbnVsbCkge1xuICAgICAgc3RhcnRUaW1lID0gdGltZTtcbiAgICB9XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBNYXRoLm1heChNYXRoLm1pbigodGltZSAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvbiwgMSksIDApO1xuICAgIGNvbnN0IGVhc2VQcm9ncmVzcyA9IDAuNSAtIE1hdGguY29zKHByb2dyZXNzICogTWF0aC5QSSkgLyAyO1xuICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSBzdGFydFBvc2l0aW9uICsgZWFzZVByb2dyZXNzICogKHRhcmdldFBvc2l0aW9uIC0gc3RhcnRQb3NpdGlvbik7XG4gICAgaWYgKGlzT3V0T2ZCb3VuZChjdXJyZW50UG9zaXRpb24sIHRhcmdldFBvc2l0aW9uKSkge1xuICAgICAgY3VycmVudFBvc2l0aW9uID0gdGFyZ2V0UG9zaXRpb247XG4gICAgfVxuICAgIHN3aXBlci53cmFwcGVyRWwuc2Nyb2xsVG8oe1xuICAgICAgW3NpZGVdOiBjdXJyZW50UG9zaXRpb25cbiAgICB9KTtcbiAgICBpZiAoaXNPdXRPZkJvdW5kKGN1cnJlbnRQb3NpdGlvbiwgdGFyZ2V0UG9zaXRpb24pKSB7XG4gICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnNjcm9sbFNuYXBUeXBlID0gJyc7XG4gICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5vdmVyZmxvdyA9ICcnO1xuICAgICAgICBzd2lwZXIud3JhcHBlckVsLnNjcm9sbFRvKHtcbiAgICAgICAgICBbc2lkZV06IGN1cnJlbnRQb3NpdGlvblxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKHN3aXBlci5jc3NNb2RlRnJhbWVJRCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXBlci5jc3NNb2RlRnJhbWVJRCA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoYW5pbWF0ZSk7XG4gIH07XG4gIGFuaW1hdGUoKTtcbn1cbmZ1bmN0aW9uIGdldFNsaWRlVHJhbnNmb3JtRWwoc2xpZGVFbCkge1xuICByZXR1cm4gc2xpZGVFbC5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXNsaWRlLXRyYW5zZm9ybScpIHx8IHNsaWRlRWwuc2hhZG93Um9vdCAmJiBzbGlkZUVsLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcignLnN3aXBlci1zbGlkZS10cmFuc2Zvcm0nKSB8fCBzbGlkZUVsO1xufVxuZnVuY3Rpb24gZWxlbWVudENoaWxkcmVuKGVsZW1lbnQsIHNlbGVjdG9yKSB7XG4gIGlmIChzZWxlY3RvciA9PT0gdm9pZCAwKSB7XG4gICAgc2VsZWN0b3IgPSAnJztcbiAgfVxuICByZXR1cm4gWy4uLmVsZW1lbnQuY2hpbGRyZW5dLmZpbHRlcihlbCA9PiBlbC5tYXRjaGVzKHNlbGVjdG9yKSk7XG59XG5mdW5jdGlvbiBzaG93V2FybmluZyh0ZXh0KSB7XG4gIHRyeSB7XG4gICAgY29uc29sZS53YXJuKHRleHQpO1xuICAgIHJldHVybjtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgLy8gZXJyXG4gIH1cbn1cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnQodGFnLCBjbGFzc2VzKSB7XG4gIGlmIChjbGFzc2VzID09PSB2b2lkIDApIHtcbiAgICBjbGFzc2VzID0gW107XG4gIH1cbiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZyk7XG4gIGVsLmNsYXNzTGlzdC5hZGQoLi4uKEFycmF5LmlzQXJyYXkoY2xhc3NlcykgPyBjbGFzc2VzIDogY2xhc3Nlc1RvVG9rZW5zKGNsYXNzZXMpKSk7XG4gIHJldHVybiBlbDtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRPZmZzZXQoZWwpIHtcbiAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgY29uc3QgYm94ID0gZWwuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IGJvZHkgPSBkb2N1bWVudC5ib2R5O1xuICBjb25zdCBjbGllbnRUb3AgPSBlbC5jbGllbnRUb3AgfHwgYm9keS5jbGllbnRUb3AgfHwgMDtcbiAgY29uc3QgY2xpZW50TGVmdCA9IGVsLmNsaWVudExlZnQgfHwgYm9keS5jbGllbnRMZWZ0IHx8IDA7XG4gIGNvbnN0IHNjcm9sbFRvcCA9IGVsID09PSB3aW5kb3cgPyB3aW5kb3cuc2Nyb2xsWSA6IGVsLnNjcm9sbFRvcDtcbiAgY29uc3Qgc2Nyb2xsTGVmdCA9IGVsID09PSB3aW5kb3cgPyB3aW5kb3cuc2Nyb2xsWCA6IGVsLnNjcm9sbExlZnQ7XG4gIHJldHVybiB7XG4gICAgdG9wOiBib3gudG9wICsgc2Nyb2xsVG9wIC0gY2xpZW50VG9wLFxuICAgIGxlZnQ6IGJveC5sZWZ0ICsgc2Nyb2xsTGVmdCAtIGNsaWVudExlZnRcbiAgfTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRQcmV2QWxsKGVsLCBzZWxlY3Rvcikge1xuICBjb25zdCBwcmV2RWxzID0gW107XG4gIHdoaWxlIChlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nKSB7XG4gICAgY29uc3QgcHJldiA9IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmIChwcmV2Lm1hdGNoZXMoc2VsZWN0b3IpKSBwcmV2RWxzLnB1c2gocHJldik7XG4gICAgfSBlbHNlIHByZXZFbHMucHVzaChwcmV2KTtcbiAgICBlbCA9IHByZXY7XG4gIH1cbiAgcmV0dXJuIHByZXZFbHM7XG59XG5mdW5jdGlvbiBlbGVtZW50TmV4dEFsbChlbCwgc2VsZWN0b3IpIHtcbiAgY29uc3QgbmV4dEVscyA9IFtdO1xuICB3aGlsZSAoZWwubmV4dEVsZW1lbnRTaWJsaW5nKSB7XG4gICAgY29uc3QgbmV4dCA9IGVsLm5leHRFbGVtZW50U2libGluZzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgaWYgKG5leHQubWF0Y2hlcyhzZWxlY3RvcikpIG5leHRFbHMucHVzaChuZXh0KTtcbiAgICB9IGVsc2UgbmV4dEVscy5wdXNoKG5leHQpO1xuICAgIGVsID0gbmV4dDtcbiAgfVxuICByZXR1cm4gbmV4dEVscztcbn1cbmZ1bmN0aW9uIGVsZW1lbnRTdHlsZShlbCwgcHJvcCkge1xuICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgcmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHByb3ApO1xufVxuZnVuY3Rpb24gZWxlbWVudEluZGV4KGVsKSB7XG4gIGxldCBjaGlsZCA9IGVsO1xuICBsZXQgaTtcbiAgaWYgKGNoaWxkKSB7XG4gICAgaSA9IDA7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgd2hpbGUgKChjaGlsZCA9IGNoaWxkLnByZXZpb3VzU2libGluZykgIT09IG51bGwpIHtcbiAgICAgIGlmIChjaGlsZC5ub2RlVHlwZSA9PT0gMSkgaSArPSAxO1xuICAgIH1cbiAgICByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuZnVuY3Rpb24gZWxlbWVudFBhcmVudHMoZWwsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IHBhcmVudHMgPSBbXTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBsZXQgcGFyZW50ID0gZWwucGFyZW50RWxlbWVudDsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICB3aGlsZSAocGFyZW50KSB7XG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICBpZiAocGFyZW50Lm1hdGNoZXMoc2VsZWN0b3IpKSBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgfVxuICAgIHBhcmVudCA9IHBhcmVudC5wYXJlbnRFbGVtZW50O1xuICB9XG4gIHJldHVybiBwYXJlbnRzO1xufVxuZnVuY3Rpb24gZWxlbWVudFRyYW5zaXRpb25FbmQoZWwsIGNhbGxiYWNrKSB7XG4gIGZ1bmN0aW9uIGZpcmVDYWxsQmFjayhlKSB7XG4gICAgaWYgKGUudGFyZ2V0ICE9PSBlbCkgcmV0dXJuO1xuICAgIGNhbGxiYWNrLmNhbGwoZWwsIGUpO1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmaXJlQ2FsbEJhY2spO1xuICB9XG4gIGlmIChjYWxsYmFjaykge1xuICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBmaXJlQ2FsbEJhY2spO1xuICB9XG59XG5mdW5jdGlvbiBlbGVtZW50T3V0ZXJTaXplKGVsLCBzaXplLCBpbmNsdWRlTWFyZ2lucykge1xuICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgaWYgKGluY2x1ZGVNYXJnaW5zKSB7XG4gICAgcmV0dXJuIGVsW3NpemUgPT09ICd3aWR0aCcgPyAnb2Zmc2V0V2lkdGgnIDogJ29mZnNldEhlaWdodCddICsgcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzaXplID09PSAnd2lkdGgnID8gJ21hcmdpbi1yaWdodCcgOiAnbWFyZ2luLXRvcCcpKSArIHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc2l6ZSA9PT0gJ3dpZHRoJyA/ICdtYXJnaW4tbGVmdCcgOiAnbWFyZ2luLWJvdHRvbScpKTtcbiAgfVxuICByZXR1cm4gZWwub2Zmc2V0V2lkdGg7XG59XG5cbmV4cG9ydCB7IGVsZW1lbnRQYXJlbnRzIGFzIGEsIGVsZW1lbnRPZmZzZXQgYXMgYiwgY3JlYXRlRWxlbWVudCBhcyBjLCBub3cgYXMgZCwgZWxlbWVudENoaWxkcmVuIGFzIGUsIGVsZW1lbnRPdXRlclNpemUgYXMgZiwgZWxlbWVudEluZGV4IGFzIGcsIGNsYXNzZXNUb1Rva2VucyBhcyBoLCBnZXRUcmFuc2xhdGUgYXMgaSwgZWxlbWVudFRyYW5zaXRpb25FbmQgYXMgaiwgaXNPYmplY3QgYXMgaywgZ2V0U2xpZGVUcmFuc2Zvcm1FbCBhcyBsLCBlbGVtZW50U3R5bGUgYXMgbSwgbmV4dFRpY2sgYXMgbiwgZWxlbWVudE5leHRBbGwgYXMgbywgZWxlbWVudFByZXZBbGwgYXMgcCwgYW5pbWF0ZUNTU01vZGVTY3JvbGwgYXMgcSwgc2hvd1dhcm5pbmcgYXMgciwgc2V0Q1NTUHJvcGVydHkgYXMgcywgZXh0ZW5kIGFzIHQsIGRlbGV0ZVByb3BzIGFzIHUgfTtcbiIsICJpbXBvcnQgeyBhIGFzIGdldFdpbmRvdywgZyBhcyBnZXREb2N1bWVudCB9IGZyb20gJy4vc3NyLXdpbmRvdy5lc20ubWpzJztcbmltcG9ydCB7IGEgYXMgZWxlbWVudFBhcmVudHMsIG0gYXMgZWxlbWVudFN0eWxlLCBlIGFzIGVsZW1lbnRDaGlsZHJlbiwgcyBhcyBzZXRDU1NQcm9wZXJ0eSwgZiBhcyBlbGVtZW50T3V0ZXJTaXplLCBvIGFzIGVsZW1lbnROZXh0QWxsLCBwIGFzIGVsZW1lbnRQcmV2QWxsLCBpIGFzIGdldFRyYW5zbGF0ZSwgcSBhcyBhbmltYXRlQ1NTTW9kZVNjcm9sbCwgbiBhcyBuZXh0VGljaywgciBhcyBzaG93V2FybmluZywgYyBhcyBjcmVhdGVFbGVtZW50LCBkIGFzIG5vdywgdCBhcyBleHRlbmQsIGcgYXMgZWxlbWVudEluZGV4LCB1IGFzIGRlbGV0ZVByb3BzIH0gZnJvbSAnLi91dGlscy5tanMnO1xuXG5sZXQgc3VwcG9ydDtcbmZ1bmN0aW9uIGNhbGNTdXBwb3J0KCkge1xuICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICByZXR1cm4ge1xuICAgIHNtb290aFNjcm9sbDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50ICYmIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSAmJiAnc2Nyb2xsQmVoYXZpb3InIGluIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zdHlsZSxcbiAgICB0b3VjaDogISEoJ29udG91Y2hzdGFydCcgaW4gd2luZG93IHx8IHdpbmRvdy5Eb2N1bWVudFRvdWNoICYmIGRvY3VtZW50IGluc3RhbmNlb2Ygd2luZG93LkRvY3VtZW50VG91Y2gpXG4gIH07XG59XG5mdW5jdGlvbiBnZXRTdXBwb3J0KCkge1xuICBpZiAoIXN1cHBvcnQpIHtcbiAgICBzdXBwb3J0ID0gY2FsY1N1cHBvcnQoKTtcbiAgfVxuICByZXR1cm4gc3VwcG9ydDtcbn1cblxubGV0IGRldmljZUNhY2hlZDtcbmZ1bmN0aW9uIGNhbGNEZXZpY2UoX3RlbXApIHtcbiAgbGV0IHtcbiAgICB1c2VyQWdlbnRcbiAgfSA9IF90ZW1wID09PSB2b2lkIDAgPyB7fSA6IF90ZW1wO1xuICBjb25zdCBzdXBwb3J0ID0gZ2V0U3VwcG9ydCgpO1xuICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgY29uc3QgcGxhdGZvcm0gPSB3aW5kb3cubmF2aWdhdG9yLnBsYXRmb3JtO1xuICBjb25zdCB1YSA9IHVzZXJBZ2VudCB8fCB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudDtcbiAgY29uc3QgZGV2aWNlID0ge1xuICAgIGlvczogZmFsc2UsXG4gICAgYW5kcm9pZDogZmFsc2VcbiAgfTtcbiAgY29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuc2NyZWVuLndpZHRoO1xuICBjb25zdCBzY3JlZW5IZWlnaHQgPSB3aW5kb3cuc2NyZWVuLmhlaWdodDtcbiAgY29uc3QgYW5kcm9pZCA9IHVhLm1hdGNoKC8oQW5kcm9pZCk7P1tcXHNcXC9dKyhbXFxkLl0rKT8vKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICBsZXQgaXBhZCA9IHVhLm1hdGNoKC8oaVBhZCkuKk9TXFxzKFtcXGRfXSspLyk7XG4gIGNvbnN0IGlwb2QgPSB1YS5tYXRjaCgvKGlQb2QpKC4qT1NcXHMoW1xcZF9dKykpPy8pO1xuICBjb25zdCBpcGhvbmUgPSAhaXBhZCAmJiB1YS5tYXRjaCgvKGlQaG9uZVxcc09TfGlPUylcXHMoW1xcZF9dKykvKTtcbiAgY29uc3Qgd2luZG93cyA9IHBsYXRmb3JtID09PSAnV2luMzInO1xuICBsZXQgbWFjb3MgPSBwbGF0Zm9ybSA9PT0gJ01hY0ludGVsJztcblxuICAvLyBpUGFkT3MgMTMgZml4XG4gIGNvbnN0IGlQYWRTY3JlZW5zID0gWycxMDI0eDEzNjYnLCAnMTM2NngxMDI0JywgJzgzNHgxMTk0JywgJzExOTR4ODM0JywgJzgzNHgxMTEyJywgJzExMTJ4ODM0JywgJzc2OHgxMDI0JywgJzEwMjR4NzY4JywgJzgyMHgxMTgwJywgJzExODB4ODIwJywgJzgxMHgxMDgwJywgJzEwODB4ODEwJ107XG4gIGlmICghaXBhZCAmJiBtYWNvcyAmJiBzdXBwb3J0LnRvdWNoICYmIGlQYWRTY3JlZW5zLmluZGV4T2YoYCR7c2NyZWVuV2lkdGh9eCR7c2NyZWVuSGVpZ2h0fWApID49IDApIHtcbiAgICBpcGFkID0gdWEubWF0Y2goLyhWZXJzaW9uKVxcLyhbXFxkLl0rKS8pO1xuICAgIGlmICghaXBhZCkgaXBhZCA9IFswLCAxLCAnMTNfMF8wJ107XG4gICAgbWFjb3MgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIEFuZHJvaWRcbiAgaWYgKGFuZHJvaWQgJiYgIXdpbmRvd3MpIHtcbiAgICBkZXZpY2Uub3MgPSAnYW5kcm9pZCc7XG4gICAgZGV2aWNlLmFuZHJvaWQgPSB0cnVlO1xuICB9XG4gIGlmIChpcGFkIHx8IGlwaG9uZSB8fCBpcG9kKSB7XG4gICAgZGV2aWNlLm9zID0gJ2lvcyc7XG4gICAgZGV2aWNlLmlvcyA9IHRydWU7XG4gIH1cblxuICAvLyBFeHBvcnQgb2JqZWN0XG4gIHJldHVybiBkZXZpY2U7XG59XG5mdW5jdGlvbiBnZXREZXZpY2Uob3ZlcnJpZGVzKSB7XG4gIGlmIChvdmVycmlkZXMgPT09IHZvaWQgMCkge1xuICAgIG92ZXJyaWRlcyA9IHt9O1xuICB9XG4gIGlmICghZGV2aWNlQ2FjaGVkKSB7XG4gICAgZGV2aWNlQ2FjaGVkID0gY2FsY0RldmljZShvdmVycmlkZXMpO1xuICB9XG4gIHJldHVybiBkZXZpY2VDYWNoZWQ7XG59XG5cbmxldCBicm93c2VyO1xuZnVuY3Rpb24gY2FsY0Jyb3dzZXIoKSB7XG4gIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICBsZXQgbmVlZFBlcnNwZWN0aXZlRml4ID0gZmFsc2U7XG4gIGZ1bmN0aW9uIGlzU2FmYXJpKCkge1xuICAgIGNvbnN0IHVhID0gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKTtcbiAgICByZXR1cm4gdWEuaW5kZXhPZignc2FmYXJpJykgPj0gMCAmJiB1YS5pbmRleE9mKCdjaHJvbWUnKSA8IDAgJiYgdWEuaW5kZXhPZignYW5kcm9pZCcpIDwgMDtcbiAgfVxuICBpZiAoaXNTYWZhcmkoKSkge1xuICAgIGNvbnN0IHVhID0gU3RyaW5nKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KTtcbiAgICBpZiAodWEuaW5jbHVkZXMoJ1ZlcnNpb24vJykpIHtcbiAgICAgIGNvbnN0IFttYWpvciwgbWlub3JdID0gdWEuc3BsaXQoJ1ZlcnNpb24vJylbMV0uc3BsaXQoJyAnKVswXS5zcGxpdCgnLicpLm1hcChudW0gPT4gTnVtYmVyKG51bSkpO1xuICAgICAgbmVlZFBlcnNwZWN0aXZlRml4ID0gbWFqb3IgPCAxNiB8fCBtYWpvciA9PT0gMTYgJiYgbWlub3IgPCAyO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIGlzU2FmYXJpOiBuZWVkUGVyc3BlY3RpdmVGaXggfHwgaXNTYWZhcmkoKSxcbiAgICBuZWVkUGVyc3BlY3RpdmVGaXgsXG4gICAgaXNXZWJWaWV3OiAvKGlQaG9uZXxpUG9kfGlQYWQpLipBcHBsZVdlYktpdCg/IS4qU2FmYXJpKS9pLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpXG4gIH07XG59XG5mdW5jdGlvbiBnZXRCcm93c2VyKCkge1xuICBpZiAoIWJyb3dzZXIpIHtcbiAgICBicm93c2VyID0gY2FsY0Jyb3dzZXIoKTtcbiAgfVxuICByZXR1cm4gYnJvd3Nlcjtcbn1cblxuZnVuY3Rpb24gUmVzaXplKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgb24sXG4gICAgZW1pdFxuICB9ID0gX3JlZjtcbiAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gIGxldCBvYnNlcnZlciA9IG51bGw7XG4gIGxldCBhbmltYXRpb25GcmFtZSA9IG51bGw7XG4gIGNvbnN0IHJlc2l6ZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmluaXRpYWxpemVkKSByZXR1cm47XG4gICAgZW1pdCgnYmVmb3JlUmVzaXplJyk7XG4gICAgZW1pdCgncmVzaXplJyk7XG4gIH07XG4gIGNvbnN0IGNyZWF0ZU9ic2VydmVyID0gKCkgPT4ge1xuICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5pbml0aWFsaXplZCkgcmV0dXJuO1xuICAgIG9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKGVudHJpZXMgPT4ge1xuICAgICAgYW5pbWF0aW9uRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgIGhlaWdodFxuICAgICAgICB9ID0gc3dpcGVyO1xuICAgICAgICBsZXQgbmV3V2lkdGggPSB3aWR0aDtcbiAgICAgICAgbGV0IG5ld0hlaWdodCA9IGhlaWdodDtcbiAgICAgICAgZW50cmllcy5mb3JFYWNoKF9yZWYyID0+IHtcbiAgICAgICAgICBsZXQge1xuICAgICAgICAgICAgY29udGVudEJveFNpemUsXG4gICAgICAgICAgICBjb250ZW50UmVjdCxcbiAgICAgICAgICAgIHRhcmdldFxuICAgICAgICAgIH0gPSBfcmVmMjtcbiAgICAgICAgICBpZiAodGFyZ2V0ICYmIHRhcmdldCAhPT0gc3dpcGVyLmVsKSByZXR1cm47XG4gICAgICAgICAgbmV3V2lkdGggPSBjb250ZW50UmVjdCA/IGNvbnRlbnRSZWN0LndpZHRoIDogKGNvbnRlbnRCb3hTaXplWzBdIHx8IGNvbnRlbnRCb3hTaXplKS5pbmxpbmVTaXplO1xuICAgICAgICAgIG5ld0hlaWdodCA9IGNvbnRlbnRSZWN0ID8gY29udGVudFJlY3QuaGVpZ2h0IDogKGNvbnRlbnRCb3hTaXplWzBdIHx8IGNvbnRlbnRCb3hTaXplKS5ibG9ja1NpemU7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAobmV3V2lkdGggIT09IHdpZHRoIHx8IG5ld0hlaWdodCAhPT0gaGVpZ2h0KSB7XG4gICAgICAgICAgcmVzaXplSGFuZGxlcigpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHN3aXBlci5lbCk7XG4gIH07XG4gIGNvbnN0IHJlbW92ZU9ic2VydmVyID0gKCkgPT4ge1xuICAgIGlmIChhbmltYXRpb25GcmFtZSkge1xuICAgICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKGFuaW1hdGlvbkZyYW1lKTtcbiAgICB9XG4gICAgaWYgKG9ic2VydmVyICYmIG9ic2VydmVyLnVub2JzZXJ2ZSAmJiBzd2lwZXIuZWwpIHtcbiAgICAgIG9ic2VydmVyLnVub2JzZXJ2ZShzd2lwZXIuZWwpO1xuICAgICAgb2JzZXJ2ZXIgPSBudWxsO1xuICAgIH1cbiAgfTtcbiAgY29uc3Qgb3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyID0gKCkgPT4ge1xuICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5pbml0aWFsaXplZCkgcmV0dXJuO1xuICAgIGVtaXQoJ29yaWVudGF0aW9uY2hhbmdlJyk7XG4gIH07XG4gIG9uKCdpbml0JywgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnJlc2l6ZU9ic2VydmVyICYmIHR5cGVvZiB3aW5kb3cuUmVzaXplT2JzZXJ2ZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjcmVhdGVPYnNlcnZlcigpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplSGFuZGxlcik7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgb3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyKTtcbiAgfSk7XG4gIG9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIHJlbW92ZU9ic2VydmVyKCk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUhhbmRsZXIpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcik7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBPYnNlcnZlcihfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIGV4dGVuZFBhcmFtcyxcbiAgICBvbixcbiAgICBlbWl0XG4gIH0gPSBfcmVmO1xuICBjb25zdCBvYnNlcnZlcnMgPSBbXTtcbiAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IGF0dGFjaCA9IGZ1bmN0aW9uICh0YXJnZXQsIG9wdGlvbnMpIHtcbiAgICBpZiAob3B0aW9ucyA9PT0gdm9pZCAwKSB7XG4gICAgICBvcHRpb25zID0ge307XG4gICAgfVxuICAgIGNvbnN0IE9ic2VydmVyRnVuYyA9IHdpbmRvdy5NdXRhdGlvbk9ic2VydmVyIHx8IHdpbmRvdy5XZWJraXRNdXRhdGlvbk9ic2VydmVyO1xuICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE9ic2VydmVyRnVuYyhtdXRhdGlvbnMgPT4ge1xuICAgICAgLy8gVGhlIG9ic2VydmVyVXBkYXRlIGV2ZW50IHNob3VsZCBvbmx5IGJlIHRyaWdnZXJlZFxuICAgICAgLy8gb25jZSBkZXNwaXRlIHRoZSBudW1iZXIgb2YgbXV0YXRpb25zLiAgQWRkaXRpb25hbFxuICAgICAgLy8gdHJpZ2dlcnMgYXJlIHJlZHVuZGFudCBhbmQgYXJlIHZlcnkgY29zdGx5XG4gICAgICBpZiAoc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18pIHJldHVybjtcbiAgICAgIGlmIChtdXRhdGlvbnMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIGVtaXQoJ29ic2VydmVyVXBkYXRlJywgbXV0YXRpb25zWzBdKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2JzZXJ2ZXJVcGRhdGUgPSBmdW5jdGlvbiBvYnNlcnZlclVwZGF0ZSgpIHtcbiAgICAgICAgZW1pdCgnb2JzZXJ2ZXJVcGRhdGUnLCBtdXRhdGlvbnNbMF0pO1xuICAgICAgfTtcbiAgICAgIGlmICh3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUob2JzZXJ2ZXJVcGRhdGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnNldFRpbWVvdXQob2JzZXJ2ZXJVcGRhdGUsIDApO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG9ic2VydmVyLm9ic2VydmUodGFyZ2V0LCB7XG4gICAgICBhdHRyaWJ1dGVzOiB0eXBlb2Ygb3B0aW9ucy5hdHRyaWJ1dGVzID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmF0dHJpYnV0ZXMsXG4gICAgICBjaGlsZExpc3Q6IHR5cGVvZiBvcHRpb25zLmNoaWxkTGlzdCA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogb3B0aW9ucy5jaGlsZExpc3QsXG4gICAgICBjaGFyYWN0ZXJEYXRhOiB0eXBlb2Ygb3B0aW9ucy5jaGFyYWN0ZXJEYXRhID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmNoYXJhY3RlckRhdGFcbiAgICB9KTtcbiAgICBvYnNlcnZlcnMucHVzaChvYnNlcnZlcik7XG4gIH07XG4gIGNvbnN0IGluaXQgPSAoKSA9PiB7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLm9ic2VydmVyKSByZXR1cm47XG4gICAgaWYgKHN3aXBlci5wYXJhbXMub2JzZXJ2ZVBhcmVudHMpIHtcbiAgICAgIGNvbnN0IGNvbnRhaW5lclBhcmVudHMgPSBlbGVtZW50UGFyZW50cyhzd2lwZXIuaG9zdEVsKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY29udGFpbmVyUGFyZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBhdHRhY2goY29udGFpbmVyUGFyZW50c1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIC8vIE9ic2VydmUgY29udGFpbmVyXG4gICAgYXR0YWNoKHN3aXBlci5ob3N0RWwsIHtcbiAgICAgIGNoaWxkTGlzdDogc3dpcGVyLnBhcmFtcy5vYnNlcnZlU2xpZGVDaGlsZHJlblxuICAgIH0pO1xuXG4gICAgLy8gT2JzZXJ2ZSB3cmFwcGVyXG4gICAgYXR0YWNoKHN3aXBlci53cmFwcGVyRWwsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IGZhbHNlXG4gICAgfSk7XG4gIH07XG4gIGNvbnN0IGRlc3Ryb3kgPSAoKSA9PiB7XG4gICAgb2JzZXJ2ZXJzLmZvckVhY2gob2JzZXJ2ZXIgPT4ge1xuICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH0pO1xuICAgIG9ic2VydmVycy5zcGxpY2UoMCwgb2JzZXJ2ZXJzLmxlbmd0aCk7XG4gIH07XG4gIGV4dGVuZFBhcmFtcyh7XG4gICAgb2JzZXJ2ZXI6IGZhbHNlLFxuICAgIG9ic2VydmVQYXJlbnRzOiBmYWxzZSxcbiAgICBvYnNlcnZlU2xpZGVDaGlsZHJlbjogZmFsc2VcbiAgfSk7XG4gIG9uKCdpbml0JywgaW5pdCk7XG4gIG9uKCdkZXN0cm95JywgZGVzdHJveSk7XG59XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVyc2NvcmUtZGFuZ2xlICovXG5cbnZhciBldmVudHNFbWl0dGVyID0ge1xuICBvbihldmVudHMsIGhhbmRsZXIsIHByaW9yaXR5KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gc2VsZjtcbiAgICBjb25zdCBtZXRob2QgPSBwcmlvcml0eSA/ICd1bnNoaWZ0JyA6ICdwdXNoJztcbiAgICBldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdKSBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0gPSBbXTtcbiAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XVttZXRob2RdKGhhbmRsZXIpO1xuICAgIH0pO1xuICAgIHJldHVybiBzZWxmO1xuICB9LFxuICBvbmNlKGV2ZW50cywgaGFuZGxlciwgcHJpb3JpdHkpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHJldHVybiBzZWxmO1xuICAgIGZ1bmN0aW9uIG9uY2VIYW5kbGVyKCkge1xuICAgICAgc2VsZi5vZmYoZXZlbnRzLCBvbmNlSGFuZGxlcik7XG4gICAgICBpZiAob25jZUhhbmRsZXIuX19lbWl0dGVyUHJveHkpIHtcbiAgICAgICAgZGVsZXRlIG9uY2VIYW5kbGVyLl9fZW1pdHRlclByb3h5O1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICB9XG4gICAgICBoYW5kbGVyLmFwcGx5KHNlbGYsIGFyZ3MpO1xuICAgIH1cbiAgICBvbmNlSGFuZGxlci5fX2VtaXR0ZXJQcm94eSA9IGhhbmRsZXI7XG4gICAgcmV0dXJuIHNlbGYub24oZXZlbnRzLCBvbmNlSGFuZGxlciwgcHJpb3JpdHkpO1xuICB9LFxuICBvbkFueShoYW5kbGVyLCBwcmlvcml0eSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHNlbGY7XG4gICAgY29uc3QgbWV0aG9kID0gcHJpb3JpdHkgPyAndW5zaGlmdCcgOiAncHVzaCc7XG4gICAgaWYgKHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLmluZGV4T2YoaGFuZGxlcikgPCAwKSB7XG4gICAgICBzZWxmLmV2ZW50c0FueUxpc3RlbmVyc1ttZXRob2RdKGhhbmRsZXIpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZjtcbiAgfSxcbiAgb2ZmQW55KGhhbmRsZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICBpZiAoIXNlbGYuZXZlbnRzQW55TGlzdGVuZXJzKSByZXR1cm4gc2VsZjtcbiAgICBjb25zdCBpbmRleCA9IHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLmluZGV4T2YoaGFuZGxlcik7XG4gICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgIHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIHJldHVybiBzZWxmO1xuICB9LFxuICBvZmYoZXZlbnRzLCBoYW5kbGVyKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycykgcmV0dXJuIHNlbGY7XG4gICAgZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICBpZiAodHlwZW9mIGhhbmRsZXIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xuICAgICAgfSBlbHNlIGlmIChzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0pIHtcbiAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdLmZvckVhY2goKGV2ZW50SGFuZGxlciwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnRIYW5kbGVyID09PSBoYW5kbGVyIHx8IGV2ZW50SGFuZGxlci5fX2VtaXR0ZXJQcm94eSAmJiBldmVudEhhbmRsZXIuX19lbWl0dGVyUHJveHkgPT09IGhhbmRsZXIpIHtcbiAgICAgICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XS5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH0sXG4gIGVtaXQoKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycykgcmV0dXJuIHNlbGY7XG4gICAgbGV0IGV2ZW50cztcbiAgICBsZXQgZGF0YTtcbiAgICBsZXQgY29udGV4dDtcbiAgICBmb3IgKHZhciBfbGVuMiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbjIpLCBfa2V5MiA9IDA7IF9rZXkyIDwgX2xlbjI7IF9rZXkyKyspIHtcbiAgICAgIGFyZ3NbX2tleTJdID0gYXJndW1lbnRzW19rZXkyXTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBhcmdzWzBdID09PSAnc3RyaW5nJyB8fCBBcnJheS5pc0FycmF5KGFyZ3NbMF0pKSB7XG4gICAgICBldmVudHMgPSBhcmdzWzBdO1xuICAgICAgZGF0YSA9IGFyZ3Muc2xpY2UoMSwgYXJncy5sZW5ndGgpO1xuICAgICAgY29udGV4dCA9IHNlbGY7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2ZW50cyA9IGFyZ3NbMF0uZXZlbnRzO1xuICAgICAgZGF0YSA9IGFyZ3NbMF0uZGF0YTtcbiAgICAgIGNvbnRleHQgPSBhcmdzWzBdLmNvbnRleHQgfHwgc2VsZjtcbiAgICB9XG4gICAgZGF0YS51bnNoaWZ0KGNvbnRleHQpO1xuICAgIGNvbnN0IGV2ZW50c0FycmF5ID0gQXJyYXkuaXNBcnJheShldmVudHMpID8gZXZlbnRzIDogZXZlbnRzLnNwbGl0KCcgJyk7XG4gICAgZXZlbnRzQXJyYXkuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICBpZiAoc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMgJiYgc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgICAgIHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLmZvckVhY2goZXZlbnRIYW5kbGVyID0+IHtcbiAgICAgICAgICBldmVudEhhbmRsZXIuYXBwbHkoY29udGV4dCwgW2V2ZW50LCAuLi5kYXRhXSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHNlbGYuZXZlbnRzTGlzdGVuZXJzICYmIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XSkge1xuICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0uZm9yRWFjaChldmVudEhhbmRsZXIgPT4ge1xuICAgICAgICAgIGV2ZW50SGFuZGxlci5hcHBseShjb250ZXh0LCBkYXRhKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIHVwZGF0ZVNpemUoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGxldCB3aWR0aDtcbiAgbGV0IGhlaWdodDtcbiAgY29uc3QgZWwgPSBzd2lwZXIuZWw7XG4gIGlmICh0eXBlb2Ygc3dpcGVyLnBhcmFtcy53aWR0aCAhPT0gJ3VuZGVmaW5lZCcgJiYgc3dpcGVyLnBhcmFtcy53aWR0aCAhPT0gbnVsbCkge1xuICAgIHdpZHRoID0gc3dpcGVyLnBhcmFtcy53aWR0aDtcbiAgfSBlbHNlIHtcbiAgICB3aWR0aCA9IGVsLmNsaWVudFdpZHRoO1xuICB9XG4gIGlmICh0eXBlb2Ygc3dpcGVyLnBhcmFtcy5oZWlnaHQgIT09ICd1bmRlZmluZWQnICYmIHN3aXBlci5wYXJhbXMuaGVpZ2h0ICE9PSBudWxsKSB7XG4gICAgaGVpZ2h0ID0gc3dpcGVyLnBhcmFtcy5oZWlnaHQ7XG4gIH0gZWxzZSB7XG4gICAgaGVpZ2h0ID0gZWwuY2xpZW50SGVpZ2h0O1xuICB9XG4gIGlmICh3aWR0aCA9PT0gMCAmJiBzd2lwZXIuaXNIb3Jpem9udGFsKCkgfHwgaGVpZ2h0ID09PSAwICYmIHN3aXBlci5pc1ZlcnRpY2FsKCkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBTdWJ0cmFjdCBwYWRkaW5nc1xuICB3aWR0aCA9IHdpZHRoIC0gcGFyc2VJbnQoZWxlbWVudFN0eWxlKGVsLCAncGFkZGluZy1sZWZ0JykgfHwgMCwgMTApIC0gcGFyc2VJbnQoZWxlbWVudFN0eWxlKGVsLCAncGFkZGluZy1yaWdodCcpIHx8IDAsIDEwKTtcbiAgaGVpZ2h0ID0gaGVpZ2h0IC0gcGFyc2VJbnQoZWxlbWVudFN0eWxlKGVsLCAncGFkZGluZy10b3AnKSB8fCAwLCAxMCkgLSBwYXJzZUludChlbGVtZW50U3R5bGUoZWwsICdwYWRkaW5nLWJvdHRvbScpIHx8IDAsIDEwKTtcbiAgaWYgKE51bWJlci5pc05hTih3aWR0aCkpIHdpZHRoID0gMDtcbiAgaWYgKE51bWJlci5pc05hTihoZWlnaHQpKSBoZWlnaHQgPSAwO1xuICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgIHdpZHRoLFxuICAgIGhlaWdodCxcbiAgICBzaXplOiBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB3aWR0aCA6IGhlaWdodFxuICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2xpZGVzKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBmdW5jdGlvbiBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKG5vZGUsIGxhYmVsKSB7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQobm9kZS5nZXRQcm9wZXJ0eVZhbHVlKHN3aXBlci5nZXREaXJlY3Rpb25MYWJlbChsYWJlbCkpIHx8IDApO1xuICB9XG4gIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIGNvbnN0IHtcbiAgICB3cmFwcGVyRWwsXG4gICAgc2xpZGVzRWwsXG4gICAgc2l6ZTogc3dpcGVyU2l6ZSxcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICB3cm9uZ1JUTFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICBjb25zdCBwcmV2aW91c1NsaWRlc0xlbmd0aCA9IGlzVmlydHVhbCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggOiBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcbiAgY29uc3Qgc2xpZGVzID0gZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYCk7XG4gIGNvbnN0IHNsaWRlc0xlbmd0aCA9IGlzVmlydHVhbCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggOiBzbGlkZXMubGVuZ3RoO1xuICBsZXQgc25hcEdyaWQgPSBbXTtcbiAgY29uc3Qgc2xpZGVzR3JpZCA9IFtdO1xuICBjb25zdCBzbGlkZXNTaXplc0dyaWQgPSBbXTtcbiAgbGV0IG9mZnNldEJlZm9yZSA9IHBhcmFtcy5zbGlkZXNPZmZzZXRCZWZvcmU7XG4gIGlmICh0eXBlb2Ygb2Zmc2V0QmVmb3JlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb2Zmc2V0QmVmb3JlID0gcGFyYW1zLnNsaWRlc09mZnNldEJlZm9yZS5jYWxsKHN3aXBlcik7XG4gIH1cbiAgbGV0IG9mZnNldEFmdGVyID0gcGFyYW1zLnNsaWRlc09mZnNldEFmdGVyO1xuICBpZiAodHlwZW9mIG9mZnNldEFmdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgb2Zmc2V0QWZ0ZXIgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QWZ0ZXIuY2FsbChzd2lwZXIpO1xuICB9XG4gIGNvbnN0IHByZXZpb3VzU25hcEdyaWRMZW5ndGggPSBzd2lwZXIuc25hcEdyaWQubGVuZ3RoO1xuICBjb25zdCBwcmV2aW91c1NsaWRlc0dyaWRMZW5ndGggPSBzd2lwZXIuc2xpZGVzR3JpZC5sZW5ndGg7XG4gIGxldCBzcGFjZUJldHdlZW4gPSBwYXJhbXMuc3BhY2VCZXR3ZWVuO1xuICBsZXQgc2xpZGVQb3NpdGlvbiA9IC1vZmZzZXRCZWZvcmU7XG4gIGxldCBwcmV2U2xpZGVTaXplID0gMDtcbiAgbGV0IGluZGV4ID0gMDtcbiAgaWYgKHR5cGVvZiBzd2lwZXJTaXplID09PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodHlwZW9mIHNwYWNlQmV0d2VlbiA9PT0gJ3N0cmluZycgJiYgc3BhY2VCZXR3ZWVuLmluZGV4T2YoJyUnKSA+PSAwKSB7XG4gICAgc3BhY2VCZXR3ZWVuID0gcGFyc2VGbG9hdChzcGFjZUJldHdlZW4ucmVwbGFjZSgnJScsICcnKSkgLyAxMDAgKiBzd2lwZXJTaXplO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzcGFjZUJldHdlZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgc3BhY2VCZXR3ZWVuID0gcGFyc2VGbG9hdChzcGFjZUJldHdlZW4pO1xuICB9XG4gIHN3aXBlci52aXJ0dWFsU2l6ZSA9IC1zcGFjZUJldHdlZW47XG5cbiAgLy8gcmVzZXQgbWFyZ2luc1xuICBzbGlkZXMuZm9yRWFjaChzbGlkZUVsID0+IHtcbiAgICBpZiAocnRsKSB7XG4gICAgICBzbGlkZUVsLnN0eWxlLm1hcmdpbkxlZnQgPSAnJztcbiAgICB9IGVsc2Uge1xuICAgICAgc2xpZGVFbC5zdHlsZS5tYXJnaW5SaWdodCA9ICcnO1xuICAgIH1cbiAgICBzbGlkZUVsLnN0eWxlLm1hcmdpbkJvdHRvbSA9ICcnO1xuICAgIHNsaWRlRWwuc3R5bGUubWFyZ2luVG9wID0gJyc7XG4gIH0pO1xuXG4gIC8vIHJlc2V0IGNzc01vZGUgb2Zmc2V0c1xuICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgc2V0Q1NTUHJvcGVydHkod3JhcHBlckVsLCAnLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWJlZm9yZScsICcnKTtcbiAgICBzZXRDU1NQcm9wZXJ0eSh3cmFwcGVyRWwsICctLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYWZ0ZXInLCAnJyk7XG4gIH1cbiAgY29uc3QgZ3JpZEVuYWJsZWQgPSBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMSAmJiBzd2lwZXIuZ3JpZDtcbiAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgc3dpcGVyLmdyaWQuaW5pdFNsaWRlcyhzbGlkZXMpO1xuICB9IGVsc2UgaWYgKHN3aXBlci5ncmlkKSB7XG4gICAgc3dpcGVyLmdyaWQudW5zZXRTbGlkZXMoKTtcbiAgfVxuXG4gIC8vIENhbGMgc2xpZGVzXG4gIGxldCBzbGlkZVNpemU7XG4gIGNvbnN0IHNob3VsZFJlc2V0U2xpZGVTaXplID0gcGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyAmJiBwYXJhbXMuYnJlYWtwb2ludHMgJiYgT2JqZWN0LmtleXMocGFyYW1zLmJyZWFrcG9pbnRzKS5maWx0ZXIoa2V5ID0+IHtcbiAgICByZXR1cm4gdHlwZW9mIHBhcmFtcy5icmVha3BvaW50c1trZXldLnNsaWRlc1BlclZpZXcgIT09ICd1bmRlZmluZWQnO1xuICB9KS5sZW5ndGggPiAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0xlbmd0aDsgaSArPSAxKSB7XG4gICAgc2xpZGVTaXplID0gMDtcbiAgICBsZXQgc2xpZGU7XG4gICAgaWYgKHNsaWRlc1tpXSkgc2xpZGUgPSBzbGlkZXNbaV07XG4gICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICBzd2lwZXIuZ3JpZC51cGRhdGVTbGlkZShpLCBzbGlkZSwgc2xpZGVzKTtcbiAgICB9XG4gICAgaWYgKHNsaWRlc1tpXSAmJiBlbGVtZW50U3R5bGUoc2xpZGUsICdkaXNwbGF5JykgPT09ICdub25lJykgY29udGludWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcblxuICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nKSB7XG4gICAgICBpZiAoc2hvdWxkUmVzZXRTbGlkZVNpemUpIHtcbiAgICAgICAgc2xpZGVzW2ldLnN0eWxlW3N3aXBlci5nZXREaXJlY3Rpb25MYWJlbCgnd2lkdGgnKV0gPSBgYDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNsaWRlU3R5bGVzID0gZ2V0Q29tcHV0ZWRTdHlsZShzbGlkZSk7XG4gICAgICBjb25zdCBjdXJyZW50VHJhbnNmb3JtID0gc2xpZGUuc3R5bGUudHJhbnNmb3JtO1xuICAgICAgY29uc3QgY3VycmVudFdlYktpdFRyYW5zZm9ybSA9IHNsaWRlLnN0eWxlLndlYmtpdFRyYW5zZm9ybTtcbiAgICAgIGlmIChjdXJyZW50VHJhbnNmb3JtKSB7XG4gICAgICAgIHNsaWRlLnN0eWxlLnRyYW5zZm9ybSA9ICdub25lJztcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50V2ViS2l0VHJhbnNmb3JtKSB7XG4gICAgICAgIHNsaWRlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9ICdub25lJztcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSB7XG4gICAgICAgIHNsaWRlU2l6ZSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IGVsZW1lbnRPdXRlclNpemUoc2xpZGUsICd3aWR0aCcsIHRydWUpIDogZWxlbWVudE91dGVyU2l6ZShzbGlkZSwgJ2hlaWdodCcsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICAgIGNvbnN0IHdpZHRoID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgJ3dpZHRoJyk7XG4gICAgICAgIGNvbnN0IHBhZGRpbmdMZWZ0ID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgJ3BhZGRpbmctbGVmdCcpO1xuICAgICAgICBjb25zdCBwYWRkaW5nUmlnaHQgPSBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKHNsaWRlU3R5bGVzLCAncGFkZGluZy1yaWdodCcpO1xuICAgICAgICBjb25zdCBtYXJnaW5MZWZ0ID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgJ21hcmdpbi1sZWZ0Jyk7XG4gICAgICAgIGNvbnN0IG1hcmdpblJpZ2h0ID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgJ21hcmdpbi1yaWdodCcpO1xuICAgICAgICBjb25zdCBib3hTaXppbmcgPSBzbGlkZVN0eWxlcy5nZXRQcm9wZXJ0eVZhbHVlKCdib3gtc2l6aW5nJyk7XG4gICAgICAgIGlmIChib3hTaXppbmcgJiYgYm94U2l6aW5nID09PSAnYm9yZGVyLWJveCcpIHtcbiAgICAgICAgICBzbGlkZVNpemUgPSB3aWR0aCArIG1hcmdpbkxlZnQgKyBtYXJnaW5SaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCB7XG4gICAgICAgICAgICBjbGllbnRXaWR0aCxcbiAgICAgICAgICAgIG9mZnNldFdpZHRoXG4gICAgICAgICAgfSA9IHNsaWRlO1xuICAgICAgICAgIHNsaWRlU2l6ZSA9IHdpZHRoICsgcGFkZGluZ0xlZnQgKyBwYWRkaW5nUmlnaHQgKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQgKyAob2Zmc2V0V2lkdGggLSBjbGllbnRXaWR0aCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50VHJhbnNmb3JtKSB7XG4gICAgICAgIHNsaWRlLnN0eWxlLnRyYW5zZm9ybSA9IGN1cnJlbnRUcmFuc2Zvcm07XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFdlYktpdFRyYW5zZm9ybSkge1xuICAgICAgICBzbGlkZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBjdXJyZW50V2ViS2l0VHJhbnNmb3JtO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlU2l6ZSA9IE1hdGguZmxvb3Ioc2xpZGVTaXplKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2xpZGVTaXplID0gKHN3aXBlclNpemUgLSAocGFyYW1zLnNsaWRlc1BlclZpZXcgLSAxKSAqIHNwYWNlQmV0d2VlbikgLyBwYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZVNpemUgPSBNYXRoLmZsb29yKHNsaWRlU2l6ZSk7XG4gICAgICBpZiAoc2xpZGVzW2ldKSB7XG4gICAgICAgIHNsaWRlc1tpXS5zdHlsZVtzd2lwZXIuZ2V0RGlyZWN0aW9uTGFiZWwoJ3dpZHRoJyldID0gYCR7c2xpZGVTaXplfXB4YDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNsaWRlc1tpXSkge1xuICAgICAgc2xpZGVzW2ldLnN3aXBlclNsaWRlU2l6ZSA9IHNsaWRlU2l6ZTtcbiAgICB9XG4gICAgc2xpZGVzU2l6ZXNHcmlkLnB1c2goc2xpZGVTaXplKTtcbiAgICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiArIHNsaWRlU2l6ZSAvIDIgKyBwcmV2U2xpZGVTaXplIC8gMiArIHNwYWNlQmV0d2VlbjtcbiAgICAgIGlmIChwcmV2U2xpZGVTaXplID09PSAwICYmIGkgIT09IDApIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uIC0gc3dpcGVyU2l6ZSAvIDIgLSBzcGFjZUJldHdlZW47XG4gICAgICBpZiAoaSA9PT0gMCkgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gLSBzd2lwZXJTaXplIC8gMiAtIHNwYWNlQmV0d2VlbjtcbiAgICAgIGlmIChNYXRoLmFicyhzbGlkZVBvc2l0aW9uKSA8IDEgLyAxMDAwKSBzbGlkZVBvc2l0aW9uID0gMDtcbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZVBvc2l0aW9uID0gTWF0aC5mbG9vcihzbGlkZVBvc2l0aW9uKTtcbiAgICAgIGlmIChpbmRleCAlIHBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMCkgc25hcEdyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgIHNsaWRlc0dyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlUG9zaXRpb24gPSBNYXRoLmZsb29yKHNsaWRlUG9zaXRpb24pO1xuICAgICAgaWYgKChpbmRleCAtIE1hdGgubWluKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwLCBpbmRleCkpICUgc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMCkgc25hcEdyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgIHNsaWRlc0dyaWQucHVzaChzbGlkZVBvc2l0aW9uKTtcbiAgICAgIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uICsgc2xpZGVTaXplICsgc3BhY2VCZXR3ZWVuO1xuICAgIH1cbiAgICBzd2lwZXIudmlydHVhbFNpemUgKz0gc2xpZGVTaXplICsgc3BhY2VCZXR3ZWVuO1xuICAgIHByZXZTbGlkZVNpemUgPSBzbGlkZVNpemU7XG4gICAgaW5kZXggKz0gMTtcbiAgfVxuICBzd2lwZXIudmlydHVhbFNpemUgPSBNYXRoLm1heChzd2lwZXIudmlydHVhbFNpemUsIHN3aXBlclNpemUpICsgb2Zmc2V0QWZ0ZXI7XG4gIGlmIChydGwgJiYgd3JvbmdSVEwgJiYgKHBhcmFtcy5lZmZlY3QgPT09ICdzbGlkZScgfHwgcGFyYW1zLmVmZmVjdCA9PT0gJ2NvdmVyZmxvdycpKSB7XG4gICAgd3JhcHBlckVsLnN0eWxlLndpZHRoID0gYCR7c3dpcGVyLnZpcnR1YWxTaXplICsgc3BhY2VCZXR3ZWVufXB4YDtcbiAgfVxuICBpZiAocGFyYW1zLnNldFdyYXBwZXJTaXplKSB7XG4gICAgd3JhcHBlckVsLnN0eWxlW3N3aXBlci5nZXREaXJlY3Rpb25MYWJlbCgnd2lkdGgnKV0gPSBgJHtzd2lwZXIudmlydHVhbFNpemUgKyBzcGFjZUJldHdlZW59cHhgO1xuICB9XG4gIGlmIChncmlkRW5hYmxlZCkge1xuICAgIHN3aXBlci5ncmlkLnVwZGF0ZVdyYXBwZXJTaXplKHNsaWRlU2l6ZSwgc25hcEdyaWQpO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGxhc3QgZ3JpZCBlbGVtZW50cyBkZXBlbmRpbmcgb24gd2lkdGhcbiAgaWYgKCFwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICBjb25zdCBuZXdTbGlkZXNHcmlkID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbmFwR3JpZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgbGV0IHNsaWRlc0dyaWRJdGVtID0gc25hcEdyaWRbaV07XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVzR3JpZEl0ZW0gPSBNYXRoLmZsb29yKHNsaWRlc0dyaWRJdGVtKTtcbiAgICAgIGlmIChzbmFwR3JpZFtpXSA8PSBzd2lwZXIudmlydHVhbFNpemUgLSBzd2lwZXJTaXplKSB7XG4gICAgICAgIG5ld1NsaWRlc0dyaWQucHVzaChzbGlkZXNHcmlkSXRlbSk7XG4gICAgICB9XG4gICAgfVxuICAgIHNuYXBHcmlkID0gbmV3U2xpZGVzR3JpZDtcbiAgICBpZiAoTWF0aC5mbG9vcihzd2lwZXIudmlydHVhbFNpemUgLSBzd2lwZXJTaXplKSAtIE1hdGguZmxvb3Ioc25hcEdyaWRbc25hcEdyaWQubGVuZ3RoIC0gMV0pID4gMSkge1xuICAgICAgc25hcEdyaWQucHVzaChzd2lwZXIudmlydHVhbFNpemUgLSBzd2lwZXJTaXplKTtcbiAgICB9XG4gIH1cbiAgaWYgKGlzVmlydHVhbCAmJiBwYXJhbXMubG9vcCkge1xuICAgIGNvbnN0IHNpemUgPSBzbGlkZXNTaXplc0dyaWRbMF0gKyBzcGFjZUJldHdlZW47XG4gICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJHcm91cCA+IDEpIHtcbiAgICAgIGNvbnN0IGdyb3VwcyA9IE1hdGguY2VpbCgoc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlICsgc3dpcGVyLnZpcnR1YWwuc2xpZGVzQWZ0ZXIpIC8gcGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgICAgIGNvbnN0IGdyb3VwU2l6ZSA9IHNpemUgKiBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGdyb3VwczsgaSArPSAxKSB7XG4gICAgICAgIHNuYXBHcmlkLnB1c2goc25hcEdyaWRbc25hcEdyaWQubGVuZ3RoIC0gMV0gKyBncm91cFNpemUpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZSArIHN3aXBlci52aXJ0dWFsLnNsaWRlc0FmdGVyOyBpICs9IDEpIHtcbiAgICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDEpIHtcbiAgICAgICAgc25hcEdyaWQucHVzaChzbmFwR3JpZFtzbmFwR3JpZC5sZW5ndGggLSAxXSArIHNpemUpO1xuICAgICAgfVxuICAgICAgc2xpZGVzR3JpZC5wdXNoKHNsaWRlc0dyaWRbc2xpZGVzR3JpZC5sZW5ndGggLSAxXSArIHNpemUpO1xuICAgICAgc3dpcGVyLnZpcnR1YWxTaXplICs9IHNpemU7XG4gICAgfVxuICB9XG4gIGlmIChzbmFwR3JpZC5sZW5ndGggPT09IDApIHNuYXBHcmlkID0gWzBdO1xuICBpZiAoc3BhY2VCZXR3ZWVuICE9PSAwKSB7XG4gICAgY29uc3Qga2V5ID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIHJ0bCA/ICdtYXJnaW5MZWZ0JyA6IHN3aXBlci5nZXREaXJlY3Rpb25MYWJlbCgnbWFyZ2luUmlnaHQnKTtcbiAgICBzbGlkZXMuZmlsdGVyKChfLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICBpZiAoIXBhcmFtcy5jc3NNb2RlIHx8IHBhcmFtcy5sb29wKSByZXR1cm4gdHJ1ZTtcbiAgICAgIGlmIChzbGlkZUluZGV4ID09PSBzbGlkZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KS5mb3JFYWNoKHNsaWRlRWwgPT4ge1xuICAgICAgc2xpZGVFbC5zdHlsZVtrZXldID0gYCR7c3BhY2VCZXR3ZWVufXB4YDtcbiAgICB9KTtcbiAgfVxuICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHBhcmFtcy5jZW50ZXJlZFNsaWRlc0JvdW5kcykge1xuICAgIGxldCBhbGxTbGlkZXNTaXplID0gMDtcbiAgICBzbGlkZXNTaXplc0dyaWQuZm9yRWFjaChzbGlkZVNpemVWYWx1ZSA9PiB7XG4gICAgICBhbGxTbGlkZXNTaXplICs9IHNsaWRlU2l6ZVZhbHVlICsgKHNwYWNlQmV0d2VlbiB8fCAwKTtcbiAgICB9KTtcbiAgICBhbGxTbGlkZXNTaXplIC09IHNwYWNlQmV0d2VlbjtcbiAgICBjb25zdCBtYXhTbmFwID0gYWxsU2xpZGVzU2l6ZSAtIHN3aXBlclNpemU7XG4gICAgc25hcEdyaWQgPSBzbmFwR3JpZC5tYXAoc25hcCA9PiB7XG4gICAgICBpZiAoc25hcCA8PSAwKSByZXR1cm4gLW9mZnNldEJlZm9yZTtcbiAgICAgIGlmIChzbmFwID4gbWF4U25hcCkgcmV0dXJuIG1heFNuYXAgKyBvZmZzZXRBZnRlcjtcbiAgICAgIHJldHVybiBzbmFwO1xuICAgIH0pO1xuICB9XG4gIGlmIChwYXJhbXMuY2VudGVySW5zdWZmaWNpZW50U2xpZGVzKSB7XG4gICAgbGV0IGFsbFNsaWRlc1NpemUgPSAwO1xuICAgIHNsaWRlc1NpemVzR3JpZC5mb3JFYWNoKHNsaWRlU2l6ZVZhbHVlID0+IHtcbiAgICAgIGFsbFNsaWRlc1NpemUgKz0gc2xpZGVTaXplVmFsdWUgKyAoc3BhY2VCZXR3ZWVuIHx8IDApO1xuICAgIH0pO1xuICAgIGFsbFNsaWRlc1NpemUgLT0gc3BhY2VCZXR3ZWVuO1xuICAgIGlmIChhbGxTbGlkZXNTaXplIDwgc3dpcGVyU2l6ZSkge1xuICAgICAgY29uc3QgYWxsU2xpZGVzT2Zmc2V0ID0gKHN3aXBlclNpemUgLSBhbGxTbGlkZXNTaXplKSAvIDI7XG4gICAgICBzbmFwR3JpZC5mb3JFYWNoKChzbmFwLCBzbmFwSW5kZXgpID0+IHtcbiAgICAgICAgc25hcEdyaWRbc25hcEluZGV4XSA9IHNuYXAgLSBhbGxTbGlkZXNPZmZzZXQ7XG4gICAgICB9KTtcbiAgICAgIHNsaWRlc0dyaWQuZm9yRWFjaCgoc25hcCwgc25hcEluZGV4KSA9PiB7XG4gICAgICAgIHNsaWRlc0dyaWRbc25hcEluZGV4XSA9IHNuYXAgKyBhbGxTbGlkZXNPZmZzZXQ7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICBzbGlkZXMsXG4gICAgc25hcEdyaWQsXG4gICAgc2xpZGVzR3JpZCxcbiAgICBzbGlkZXNTaXplc0dyaWRcbiAgfSk7XG4gIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgcGFyYW1zLmNzc01vZGUgJiYgIXBhcmFtcy5jZW50ZXJlZFNsaWRlc0JvdW5kcykge1xuICAgIHNldENTU1Byb3BlcnR5KHdyYXBwZXJFbCwgJy0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1iZWZvcmUnLCBgJHstc25hcEdyaWRbMF19cHhgKTtcbiAgICBzZXRDU1NQcm9wZXJ0eSh3cmFwcGVyRWwsICctLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYWZ0ZXInLCBgJHtzd2lwZXIuc2l6ZSAvIDIgLSBzbGlkZXNTaXplc0dyaWRbc2xpZGVzU2l6ZXNHcmlkLmxlbmd0aCAtIDFdIC8gMn1weGApO1xuICAgIGNvbnN0IGFkZFRvU25hcEdyaWQgPSAtc3dpcGVyLnNuYXBHcmlkWzBdO1xuICAgIGNvbnN0IGFkZFRvU2xpZGVzR3JpZCA9IC1zd2lwZXIuc2xpZGVzR3JpZFswXTtcbiAgICBzd2lwZXIuc25hcEdyaWQgPSBzd2lwZXIuc25hcEdyaWQubWFwKHYgPT4gdiArIGFkZFRvU25hcEdyaWQpO1xuICAgIHN3aXBlci5zbGlkZXNHcmlkID0gc3dpcGVyLnNsaWRlc0dyaWQubWFwKHYgPT4gdiArIGFkZFRvU2xpZGVzR3JpZCk7XG4gIH1cbiAgaWYgKHNsaWRlc0xlbmd0aCAhPT0gcHJldmlvdXNTbGlkZXNMZW5ndGgpIHtcbiAgICBzd2lwZXIuZW1pdCgnc2xpZGVzTGVuZ3RoQ2hhbmdlJyk7XG4gIH1cbiAgaWYgKHNuYXBHcmlkLmxlbmd0aCAhPT0gcHJldmlvdXNTbmFwR3JpZExlbmd0aCkge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cpIHN3aXBlci5jaGVja092ZXJmbG93KCk7XG4gICAgc3dpcGVyLmVtaXQoJ3NuYXBHcmlkTGVuZ3RoQ2hhbmdlJyk7XG4gIH1cbiAgaWYgKHNsaWRlc0dyaWQubGVuZ3RoICE9PSBwcmV2aW91c1NsaWRlc0dyaWRMZW5ndGgpIHtcbiAgICBzd2lwZXIuZW1pdCgnc2xpZGVzR3JpZExlbmd0aENoYW5nZScpO1xuICB9XG4gIGlmIChwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcykge1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNPZmZzZXQoKTtcbiAgfVxuICBpZiAoIWlzVmlydHVhbCAmJiAhcGFyYW1zLmNzc01vZGUgJiYgKHBhcmFtcy5lZmZlY3QgPT09ICdzbGlkZScgfHwgcGFyYW1zLmVmZmVjdCA9PT0gJ2ZhZGUnKSkge1xuICAgIGNvbnN0IGJhY2tGYWNlSGlkZGVuQ2xhc3MgPSBgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31iYWNrZmFjZS1oaWRkZW5gO1xuICAgIGNvbnN0IGhhc0NsYXNzQmFja2ZhY2VDbGFzc0FkZGVkID0gc3dpcGVyLmVsLmNsYXNzTGlzdC5jb250YWlucyhiYWNrRmFjZUhpZGRlbkNsYXNzKTtcbiAgICBpZiAoc2xpZGVzTGVuZ3RoIDw9IHBhcmFtcy5tYXhCYWNrZmFjZUhpZGRlblNsaWRlcykge1xuICAgICAgaWYgKCFoYXNDbGFzc0JhY2tmYWNlQ2xhc3NBZGRlZCkgc3dpcGVyLmVsLmNsYXNzTGlzdC5hZGQoYmFja0ZhY2VIaWRkZW5DbGFzcyk7XG4gICAgfSBlbHNlIGlmIChoYXNDbGFzc0JhY2tmYWNlQ2xhc3NBZGRlZCkge1xuICAgICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5yZW1vdmUoYmFja0ZhY2VIaWRkZW5DbGFzcyk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUF1dG9IZWlnaHQoc3BlZWQpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgYWN0aXZlU2xpZGVzID0gW107XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICBsZXQgbmV3SGVpZ2h0ID0gMDtcbiAgbGV0IGk7XG4gIGlmICh0eXBlb2Ygc3BlZWQgPT09ICdudW1iZXInKSB7XG4gICAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3BlZWQpO1xuICB9IGVsc2UgaWYgKHNwZWVkID09PSB0cnVlKSB7XG4gICAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3dpcGVyLnBhcmFtcy5zcGVlZCk7XG4gIH1cbiAgY29uc3QgZ2V0U2xpZGVCeUluZGV4ID0gaW5kZXggPT4ge1xuICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgIHJldHVybiBzd2lwZXIuc2xpZGVzW3N3aXBlci5nZXRTbGlkZUluZGV4QnlEYXRhKGluZGV4KV07XG4gICAgfVxuICAgIHJldHVybiBzd2lwZXIuc2xpZGVzW2luZGV4XTtcbiAgfTtcbiAgLy8gRmluZCBzbGlkZXMgY3VycmVudGx5IGluIHZpZXdcbiAgaWYgKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gJ2F1dG8nICYmIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpIHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgKHN3aXBlci52aXNpYmxlU2xpZGVzIHx8IFtdKS5mb3JFYWNoKHNsaWRlID0+IHtcbiAgICAgICAgYWN0aXZlU2xpZGVzLnB1c2goc2xpZGUpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBNYXRoLmNlaWwoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3KTsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IGluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4ICsgaTtcbiAgICAgICAgaWYgKGluZGV4ID4gc3dpcGVyLnNsaWRlcy5sZW5ndGggJiYgIWlzVmlydHVhbCkgYnJlYWs7XG4gICAgICAgIGFjdGl2ZVNsaWRlcy5wdXNoKGdldFNsaWRlQnlJbmRleChpbmRleCkpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBhY3RpdmVTbGlkZXMucHVzaChnZXRTbGlkZUJ5SW5kZXgoc3dpcGVyLmFjdGl2ZUluZGV4KSk7XG4gIH1cblxuICAvLyBGaW5kIG5ldyBoZWlnaHQgZnJvbSBoaWdoZXN0IHNsaWRlIGluIHZpZXdcbiAgZm9yIChpID0gMDsgaSA8IGFjdGl2ZVNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmICh0eXBlb2YgYWN0aXZlU2xpZGVzW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgaGVpZ2h0ID0gYWN0aXZlU2xpZGVzW2ldLm9mZnNldEhlaWdodDtcbiAgICAgIG5ld0hlaWdodCA9IGhlaWdodCA+IG5ld0hlaWdodCA/IGhlaWdodCA6IG5ld0hlaWdodDtcbiAgICB9XG4gIH1cblxuICAvLyBVcGRhdGUgSGVpZ2h0XG4gIGlmIChuZXdIZWlnaHQgfHwgbmV3SGVpZ2h0ID09PSAwKSBzd2lwZXIud3JhcHBlckVsLnN0eWxlLmhlaWdodCA9IGAke25ld0hlaWdodH1weGA7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNsaWRlc09mZnNldCgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qgc2xpZGVzID0gc3dpcGVyLnNsaWRlcztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIGNvbnN0IG1pbnVzT2Zmc2V0ID0gc3dpcGVyLmlzRWxlbWVudCA/IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHN3aXBlci53cmFwcGVyRWwub2Zmc2V0TGVmdCA6IHN3aXBlci53cmFwcGVyRWwub2Zmc2V0VG9wIDogMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzbGlkZXNbaV0uc3dpcGVyU2xpZGVPZmZzZXQgPSAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gc2xpZGVzW2ldLm9mZnNldExlZnQgOiBzbGlkZXNbaV0ub2Zmc2V0VG9wKSAtIG1pbnVzT2Zmc2V0IC0gc3dpcGVyLmNzc092ZXJmbG93QWRqdXN0bWVudCgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNsaWRlc1Byb2dyZXNzKHRyYW5zbGF0ZSkge1xuICBpZiAodHJhbnNsYXRlID09PSB2b2lkIDApIHtcbiAgICB0cmFuc2xhdGUgPSB0aGlzICYmIHRoaXMudHJhbnNsYXRlIHx8IDA7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgY29uc3Qge1xuICAgIHNsaWRlcyxcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICBzbmFwR3JpZFxuICB9ID0gc3dpcGVyO1xuICBpZiAoc2xpZGVzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICBpZiAodHlwZW9mIHNsaWRlc1swXS5zd2lwZXJTbGlkZU9mZnNldCA9PT0gJ3VuZGVmaW5lZCcpIHN3aXBlci51cGRhdGVTbGlkZXNPZmZzZXQoKTtcbiAgbGV0IG9mZnNldENlbnRlciA9IC10cmFuc2xhdGU7XG4gIGlmIChydGwpIG9mZnNldENlbnRlciA9IHRyYW5zbGF0ZTtcblxuICAvLyBWaXNpYmxlIFNsaWRlc1xuICBzbGlkZXMuZm9yRWFjaChzbGlkZUVsID0+IHtcbiAgICBzbGlkZUVsLmNsYXNzTGlzdC5yZW1vdmUocGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzLCBwYXJhbXMuc2xpZGVGdWxseVZpc2libGVDbGFzcyk7XG4gIH0pO1xuICBzd2lwZXIudmlzaWJsZVNsaWRlc0luZGV4ZXMgPSBbXTtcbiAgc3dpcGVyLnZpc2libGVTbGlkZXMgPSBbXTtcbiAgbGV0IHNwYWNlQmV0d2VlbiA9IHBhcmFtcy5zcGFjZUJldHdlZW47XG4gIGlmICh0eXBlb2Ygc3BhY2VCZXR3ZWVuID09PSAnc3RyaW5nJyAmJiBzcGFjZUJldHdlZW4uaW5kZXhPZignJScpID49IDApIHtcbiAgICBzcGFjZUJldHdlZW4gPSBwYXJzZUZsb2F0KHNwYWNlQmV0d2Vlbi5yZXBsYWNlKCclJywgJycpKSAvIDEwMCAqIHN3aXBlci5zaXplO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBzcGFjZUJldHdlZW4gPT09ICdzdHJpbmcnKSB7XG4gICAgc3BhY2VCZXR3ZWVuID0gcGFyc2VGbG9hdChzcGFjZUJldHdlZW4pO1xuICB9XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3Qgc2xpZGUgPSBzbGlkZXNbaV07XG4gICAgbGV0IHNsaWRlT2Zmc2V0ID0gc2xpZGUuc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgaWYgKHBhcmFtcy5jc3NNb2RlICYmIHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgc2xpZGVPZmZzZXQgLT0gc2xpZGVzWzBdLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgIH1cbiAgICBjb25zdCBzbGlkZVByb2dyZXNzID0gKG9mZnNldENlbnRlciArIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIubWluVHJhbnNsYXRlKCkgOiAwKSAtIHNsaWRlT2Zmc2V0KSAvIChzbGlkZS5zd2lwZXJTbGlkZVNpemUgKyBzcGFjZUJldHdlZW4pO1xuICAgIGNvbnN0IG9yaWdpbmFsU2xpZGVQcm9ncmVzcyA9IChvZmZzZXRDZW50ZXIgLSBzbmFwR3JpZFswXSArIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIubWluVHJhbnNsYXRlKCkgOiAwKSAtIHNsaWRlT2Zmc2V0KSAvIChzbGlkZS5zd2lwZXJTbGlkZVNpemUgKyBzcGFjZUJldHdlZW4pO1xuICAgIGNvbnN0IHNsaWRlQmVmb3JlID0gLShvZmZzZXRDZW50ZXIgLSBzbGlkZU9mZnNldCk7XG4gICAgY29uc3Qgc2xpZGVBZnRlciA9IHNsaWRlQmVmb3JlICsgc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtpXTtcbiAgICBjb25zdCBpc0Z1bGx5VmlzaWJsZSA9IHNsaWRlQmVmb3JlID49IDAgJiYgc2xpZGVCZWZvcmUgPD0gc3dpcGVyLnNpemUgLSBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW2ldO1xuICAgIGNvbnN0IGlzVmlzaWJsZSA9IHNsaWRlQmVmb3JlID49IDAgJiYgc2xpZGVCZWZvcmUgPCBzd2lwZXIuc2l6ZSAtIDEgfHwgc2xpZGVBZnRlciA+IDEgJiYgc2xpZGVBZnRlciA8PSBzd2lwZXIuc2l6ZSB8fCBzbGlkZUJlZm9yZSA8PSAwICYmIHNsaWRlQWZ0ZXIgPj0gc3dpcGVyLnNpemU7XG4gICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgc3dpcGVyLnZpc2libGVTbGlkZXMucHVzaChzbGlkZSk7XG4gICAgICBzd2lwZXIudmlzaWJsZVNsaWRlc0luZGV4ZXMucHVzaChpKTtcbiAgICAgIHNsaWRlc1tpXS5jbGFzc0xpc3QuYWRkKHBhcmFtcy5zbGlkZVZpc2libGVDbGFzcyk7XG4gICAgfVxuICAgIGlmIChpc0Z1bGx5VmlzaWJsZSkge1xuICAgICAgc2xpZGVzW2ldLmNsYXNzTGlzdC5hZGQocGFyYW1zLnNsaWRlRnVsbHlWaXNpYmxlQ2xhc3MpO1xuICAgIH1cbiAgICBzbGlkZS5wcm9ncmVzcyA9IHJ0bCA/IC1zbGlkZVByb2dyZXNzIDogc2xpZGVQcm9ncmVzcztcbiAgICBzbGlkZS5vcmlnaW5hbFByb2dyZXNzID0gcnRsID8gLW9yaWdpbmFsU2xpZGVQcm9ncmVzcyA6IG9yaWdpbmFsU2xpZGVQcm9ncmVzcztcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKHR5cGVvZiB0cmFuc2xhdGUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgY29uc3QgbXVsdGlwbGllciA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyAtMSA6IDE7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgdHJhbnNsYXRlID0gc3dpcGVyICYmIHN3aXBlci50cmFuc2xhdGUgJiYgc3dpcGVyLnRyYW5zbGF0ZSAqIG11bHRpcGxpZXIgfHwgMDtcbiAgfVxuICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICBjb25zdCB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgbGV0IHtcbiAgICBwcm9ncmVzcyxcbiAgICBpc0JlZ2lubmluZyxcbiAgICBpc0VuZCxcbiAgICBwcm9ncmVzc0xvb3BcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3Qgd2FzQmVnaW5uaW5nID0gaXNCZWdpbm5pbmc7XG4gIGNvbnN0IHdhc0VuZCA9IGlzRW5kO1xuICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICBwcm9ncmVzcyA9IDA7XG4gICAgaXNCZWdpbm5pbmcgPSB0cnVlO1xuICAgIGlzRW5kID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICBwcm9ncmVzcyA9ICh0cmFuc2xhdGUgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIC8gdHJhbnNsYXRlc0RpZmY7XG4gICAgY29uc3QgaXNCZWdpbm5pbmdSb3VuZGVkID0gTWF0aC5hYnModHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSA8IDE7XG4gICAgY29uc3QgaXNFbmRSb3VuZGVkID0gTWF0aC5hYnModHJhbnNsYXRlIC0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSA8IDE7XG4gICAgaXNCZWdpbm5pbmcgPSBpc0JlZ2lubmluZ1JvdW5kZWQgfHwgcHJvZ3Jlc3MgPD0gMDtcbiAgICBpc0VuZCA9IGlzRW5kUm91bmRlZCB8fCBwcm9ncmVzcyA+PSAxO1xuICAgIGlmIChpc0JlZ2lubmluZ1JvdW5kZWQpIHByb2dyZXNzID0gMDtcbiAgICBpZiAoaXNFbmRSb3VuZGVkKSBwcm9ncmVzcyA9IDE7XG4gIH1cbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgY29uc3QgZmlyc3RTbGlkZUluZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXhCeURhdGEoMCk7XG4gICAgY29uc3QgbGFzdFNsaWRlSW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleEJ5RGF0YShzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEpO1xuICAgIGNvbnN0IGZpcnN0U2xpZGVUcmFuc2xhdGUgPSBzd2lwZXIuc2xpZGVzR3JpZFtmaXJzdFNsaWRlSW5kZXhdO1xuICAgIGNvbnN0IGxhc3RTbGlkZVRyYW5zbGF0ZSA9IHN3aXBlci5zbGlkZXNHcmlkW2xhc3RTbGlkZUluZGV4XTtcbiAgICBjb25zdCB0cmFuc2xhdGVNYXggPSBzd2lwZXIuc2xpZGVzR3JpZFtzd2lwZXIuc2xpZGVzR3JpZC5sZW5ndGggLSAxXTtcbiAgICBjb25zdCB0cmFuc2xhdGVBYnMgPSBNYXRoLmFicyh0cmFuc2xhdGUpO1xuICAgIGlmICh0cmFuc2xhdGVBYnMgPj0gZmlyc3RTbGlkZVRyYW5zbGF0ZSkge1xuICAgICAgcHJvZ3Jlc3NMb29wID0gKHRyYW5zbGF0ZUFicyAtIGZpcnN0U2xpZGVUcmFuc2xhdGUpIC8gdHJhbnNsYXRlTWF4O1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9ncmVzc0xvb3AgPSAodHJhbnNsYXRlQWJzICsgdHJhbnNsYXRlTWF4IC0gbGFzdFNsaWRlVHJhbnNsYXRlKSAvIHRyYW5zbGF0ZU1heDtcbiAgICB9XG4gICAgaWYgKHByb2dyZXNzTG9vcCA+IDEpIHByb2dyZXNzTG9vcCAtPSAxO1xuICB9XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgcHJvZ3Jlc3MsXG4gICAgcHJvZ3Jlc3NMb29wLFxuICAgIGlzQmVnaW5uaW5nLFxuICAgIGlzRW5kXG4gIH0pO1xuICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MgfHwgcGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHBhcmFtcy5hdXRvSGVpZ2h0KSBzd2lwZXIudXBkYXRlU2xpZGVzUHJvZ3Jlc3ModHJhbnNsYXRlKTtcbiAgaWYgKGlzQmVnaW5uaW5nICYmICF3YXNCZWdpbm5pbmcpIHtcbiAgICBzd2lwZXIuZW1pdCgncmVhY2hCZWdpbm5pbmcgdG9FZGdlJyk7XG4gIH1cbiAgaWYgKGlzRW5kICYmICF3YXNFbmQpIHtcbiAgICBzd2lwZXIuZW1pdCgncmVhY2hFbmQgdG9FZGdlJyk7XG4gIH1cbiAgaWYgKHdhc0JlZ2lubmluZyAmJiAhaXNCZWdpbm5pbmcgfHwgd2FzRW5kICYmICFpc0VuZCkge1xuICAgIHN3aXBlci5lbWl0KCdmcm9tRWRnZScpO1xuICB9XG4gIHN3aXBlci5lbWl0KCdwcm9ncmVzcycsIHByb2dyZXNzKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2xpZGVzQ2xhc3NlcygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHNsaWRlcyxcbiAgICBwYXJhbXMsXG4gICAgc2xpZGVzRWwsXG4gICAgYWN0aXZlSW5kZXhcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgY29uc3QgZ3JpZEVuYWJsZWQgPSBzd2lwZXIuZ3JpZCAmJiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMTtcbiAgY29uc3QgZ2V0RmlsdGVyZWRTbGlkZSA9IHNlbGVjdG9yID0+IHtcbiAgICByZXR1cm4gZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9JHtzZWxlY3Rvcn0sIHN3aXBlci1zbGlkZSR7c2VsZWN0b3J9YClbMF07XG4gIH07XG4gIHNsaWRlcy5mb3JFYWNoKHNsaWRlRWwgPT4ge1xuICAgIHNsaWRlRWwuY2xhc3NMaXN0LnJlbW92ZShwYXJhbXMuc2xpZGVBY3RpdmVDbGFzcywgcGFyYW1zLnNsaWRlTmV4dENsYXNzLCBwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xuICB9KTtcbiAgbGV0IGFjdGl2ZVNsaWRlO1xuICBsZXQgcHJldlNsaWRlO1xuICBsZXQgbmV4dFNsaWRlO1xuICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICBsZXQgc2xpZGVJbmRleCA9IGFjdGl2ZUluZGV4IC0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlO1xuICAgICAgaWYgKHNsaWRlSW5kZXggPCAwKSBzbGlkZUluZGV4ID0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCArIHNsaWRlSW5kZXg7XG4gICAgICBpZiAoc2xpZGVJbmRleCA+PSBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoKSBzbGlkZUluZGV4IC09IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGg7XG4gICAgICBhY3RpdmVTbGlkZSA9IGdldEZpbHRlcmVkU2xpZGUoYFtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7c2xpZGVJbmRleH1cIl1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aXZlU2xpZGUgPSBnZXRGaWx0ZXJlZFNsaWRlKGBbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke2FjdGl2ZUluZGV4fVwiXWApO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgIGFjdGl2ZVNsaWRlID0gc2xpZGVzLmZpbHRlcihzbGlkZUVsID0+IHNsaWRlRWwuY29sdW1uID09PSBhY3RpdmVJbmRleClbMF07XG4gICAgICBuZXh0U2xpZGUgPSBzbGlkZXMuZmlsdGVyKHNsaWRlRWwgPT4gc2xpZGVFbC5jb2x1bW4gPT09IGFjdGl2ZUluZGV4ICsgMSlbMF07XG4gICAgICBwcmV2U2xpZGUgPSBzbGlkZXMuZmlsdGVyKHNsaWRlRWwgPT4gc2xpZGVFbC5jb2x1bW4gPT09IGFjdGl2ZUluZGV4IC0gMSlbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZVNsaWRlID0gc2xpZGVzW2FjdGl2ZUluZGV4XTtcbiAgICB9XG4gIH1cbiAgaWYgKGFjdGl2ZVNsaWRlKSB7XG4gICAgLy8gQWN0aXZlIGNsYXNzZXNcbiAgICBhY3RpdmVTbGlkZS5jbGFzc0xpc3QuYWRkKHBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKTtcbiAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgIGlmIChuZXh0U2xpZGUpIHtcbiAgICAgICAgbmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQocGFyYW1zLnNsaWRlTmV4dENsYXNzKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcmV2U2xpZGUpIHtcbiAgICAgICAgcHJldlNsaWRlLmNsYXNzTGlzdC5hZGQocGFyYW1zLnNsaWRlUHJldkNsYXNzKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTmV4dCBTbGlkZVxuICAgICAgbmV4dFNsaWRlID0gZWxlbWVudE5leHRBbGwoYWN0aXZlU2xpZGUsIGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApWzBdO1xuICAgICAgaWYgKHBhcmFtcy5sb29wICYmICFuZXh0U2xpZGUpIHtcbiAgICAgICAgbmV4dFNsaWRlID0gc2xpZGVzWzBdO1xuICAgICAgfVxuICAgICAgaWYgKG5leHRTbGlkZSkge1xuICAgICAgICBuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZChwYXJhbXMuc2xpZGVOZXh0Q2xhc3MpO1xuICAgICAgfVxuXG4gICAgICAvLyBQcmV2IFNsaWRlXG4gICAgICBwcmV2U2xpZGUgPSBlbGVtZW50UHJldkFsbChhY3RpdmVTbGlkZSwgYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYClbMF07XG4gICAgICBpZiAocGFyYW1zLmxvb3AgJiYgIXByZXZTbGlkZSA9PT0gMCkge1xuICAgICAgICBwcmV2U2xpZGUgPSBzbGlkZXNbc2xpZGVzLmxlbmd0aCAtIDFdO1xuICAgICAgfVxuICAgICAgaWYgKHByZXZTbGlkZSkge1xuICAgICAgICBwcmV2U2xpZGUuY2xhc3NMaXN0LmFkZChwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzd2lwZXIuZW1pdFNsaWRlc0NsYXNzZXMoKTtcbn1cblxuY29uc3QgcHJvY2Vzc0xhenlQcmVsb2FkZXIgPSAoc3dpcGVyLCBpbWFnZUVsKSA9PiB7XG4gIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5wYXJhbXMpIHJldHVybjtcbiAgY29uc3Qgc2xpZGVTZWxlY3RvciA9ICgpID0+IHN3aXBlci5pc0VsZW1lbnQgPyBgc3dpcGVyLXNsaWRlYCA6IGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9YDtcbiAgY29uc3Qgc2xpZGVFbCA9IGltYWdlRWwuY2xvc2VzdChzbGlkZVNlbGVjdG9yKCkpO1xuICBpZiAoc2xpZGVFbCkge1xuICAgIGxldCBsYXp5RWwgPSBzbGlkZUVsLnF1ZXJ5U2VsZWN0b3IoYC4ke3N3aXBlci5wYXJhbXMubGF6eVByZWxvYWRlckNsYXNzfWApO1xuICAgIGlmICghbGF6eUVsICYmIHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICAgIGlmIChzbGlkZUVsLnNoYWRvd1Jvb3QpIHtcbiAgICAgICAgbGF6eUVsID0gc2xpZGVFbC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoYC4ke3N3aXBlci5wYXJhbXMubGF6eVByZWxvYWRlckNsYXNzfWApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gaW5pdCBsYXRlclxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIGlmIChzbGlkZUVsLnNoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgIGxhenlFbCA9IHNsaWRlRWwuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKGAuJHtzd2lwZXIucGFyYW1zLmxhenlQcmVsb2FkZXJDbGFzc31gKTtcbiAgICAgICAgICAgIGlmIChsYXp5RWwpIGxhenlFbC5yZW1vdmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAobGF6eUVsKSBsYXp5RWwucmVtb3ZlKCk7XG4gIH1cbn07XG5jb25zdCB1bmxhenkgPSAoc3dpcGVyLCBpbmRleCkgPT4ge1xuICBpZiAoIXN3aXBlci5zbGlkZXNbaW5kZXhdKSByZXR1cm47XG4gIGNvbnN0IGltYWdlRWwgPSBzd2lwZXIuc2xpZGVzW2luZGV4XS5xdWVyeVNlbGVjdG9yKCdbbG9hZGluZz1cImxhenlcIl0nKTtcbiAgaWYgKGltYWdlRWwpIGltYWdlRWwucmVtb3ZlQXR0cmlidXRlKCdsb2FkaW5nJyk7XG59O1xuY29uc3QgcHJlbG9hZCA9IHN3aXBlciA9PiB7XG4gIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5wYXJhbXMpIHJldHVybjtcbiAgbGV0IGFtb3VudCA9IHN3aXBlci5wYXJhbXMubGF6eVByZWxvYWRQcmV2TmV4dDtcbiAgY29uc3QgbGVuID0gc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG4gIGlmICghbGVuIHx8ICFhbW91bnQgfHwgYW1vdW50IDwgMCkgcmV0dXJuO1xuICBhbW91bnQgPSBNYXRoLm1pbihhbW91bnQsIGxlbik7XG4gIGNvbnN0IHNsaWRlc1BlclZpZXcgPSBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyA/IHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygpIDogTWF0aC5jZWlsKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyk7XG4gIGNvbnN0IGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICBpZiAoc3dpcGVyLnBhcmFtcy5ncmlkICYmIHN3aXBlci5wYXJhbXMuZ3JpZC5yb3dzID4gMSkge1xuICAgIGNvbnN0IGFjdGl2ZUNvbHVtbiA9IGFjdGl2ZUluZGV4O1xuICAgIGNvbnN0IHByZWxvYWRDb2x1bW5zID0gW2FjdGl2ZUNvbHVtbiAtIGFtb3VudF07XG4gICAgcHJlbG9hZENvbHVtbnMucHVzaCguLi5BcnJheS5mcm9tKHtcbiAgICAgIGxlbmd0aDogYW1vdW50XG4gICAgfSkubWFwKChfLCBpKSA9PiB7XG4gICAgICByZXR1cm4gYWN0aXZlQ29sdW1uICsgc2xpZGVzUGVyVmlldyArIGk7XG4gICAgfSkpO1xuICAgIHN3aXBlci5zbGlkZXMuZm9yRWFjaCgoc2xpZGVFbCwgaSkgPT4ge1xuICAgICAgaWYgKHByZWxvYWRDb2x1bW5zLmluY2x1ZGVzKHNsaWRlRWwuY29sdW1uKSkgdW5sYXp5KHN3aXBlciwgaSk7XG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHNsaWRlSW5kZXhMYXN0SW5WaWV3ID0gYWN0aXZlSW5kZXggKyBzbGlkZXNQZXJWaWV3IC0gMTtcbiAgaWYgKHN3aXBlci5wYXJhbXMucmV3aW5kIHx8IHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleCAtIGFtb3VudDsgaSA8PSBzbGlkZUluZGV4TGFzdEluVmlldyArIGFtb3VudDsgaSArPSAxKSB7XG4gICAgICBjb25zdCByZWFsSW5kZXggPSAoaSAlIGxlbiArIGxlbikgJSBsZW47XG4gICAgICBpZiAocmVhbEluZGV4IDwgYWN0aXZlSW5kZXggfHwgcmVhbEluZGV4ID4gc2xpZGVJbmRleExhc3RJblZpZXcpIHVubGF6eShzd2lwZXIsIHJlYWxJbmRleCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGZvciAobGV0IGkgPSBNYXRoLm1heChhY3RpdmVJbmRleCAtIGFtb3VudCwgMCk7IGkgPD0gTWF0aC5taW4oc2xpZGVJbmRleExhc3RJblZpZXcgKyBhbW91bnQsIGxlbiAtIDEpOyBpICs9IDEpIHtcbiAgICAgIGlmIChpICE9PSBhY3RpdmVJbmRleCAmJiAoaSA+IHNsaWRlSW5kZXhMYXN0SW5WaWV3IHx8IGkgPCBhY3RpdmVJbmRleCkpIHtcbiAgICAgICAgdW5sYXp5KHN3aXBlciwgaSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5mdW5jdGlvbiBnZXRBY3RpdmVJbmRleEJ5VHJhbnNsYXRlKHN3aXBlcikge1xuICBjb25zdCB7XG4gICAgc2xpZGVzR3JpZCxcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgdHJhbnNsYXRlID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgbGV0IGFjdGl2ZUluZGV4O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAodHlwZW9mIHNsaWRlc0dyaWRbaSArIDFdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKHRyYW5zbGF0ZSA+PSBzbGlkZXNHcmlkW2ldICYmIHRyYW5zbGF0ZSA8IHNsaWRlc0dyaWRbaSArIDFdIC0gKHNsaWRlc0dyaWRbaSArIDFdIC0gc2xpZGVzR3JpZFtpXSkgLyAyKSB7XG4gICAgICAgIGFjdGl2ZUluZGV4ID0gaTtcbiAgICAgIH0gZWxzZSBpZiAodHJhbnNsYXRlID49IHNsaWRlc0dyaWRbaV0gJiYgdHJhbnNsYXRlIDwgc2xpZGVzR3JpZFtpICsgMV0pIHtcbiAgICAgICAgYWN0aXZlSW5kZXggPSBpICsgMTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRyYW5zbGF0ZSA+PSBzbGlkZXNHcmlkW2ldKSB7XG4gICAgICBhY3RpdmVJbmRleCA9IGk7XG4gICAgfVxuICB9XG4gIC8vIE5vcm1hbGl6ZSBzbGlkZUluZGV4XG4gIGlmIChwYXJhbXMubm9ybWFsaXplU2xpZGVJbmRleCkge1xuICAgIGlmIChhY3RpdmVJbmRleCA8IDAgfHwgdHlwZW9mIGFjdGl2ZUluZGV4ID09PSAndW5kZWZpbmVkJykgYWN0aXZlSW5kZXggPSAwO1xuICB9XG4gIHJldHVybiBhY3RpdmVJbmRleDtcbn1cbmZ1bmN0aW9uIHVwZGF0ZUFjdGl2ZUluZGV4KG5ld0FjdGl2ZUluZGV4KSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHRyYW5zbGF0ZSA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG4gIGNvbnN0IHtcbiAgICBzbmFwR3JpZCxcbiAgICBwYXJhbXMsXG4gICAgYWN0aXZlSW5kZXg6IHByZXZpb3VzSW5kZXgsXG4gICAgcmVhbEluZGV4OiBwcmV2aW91c1JlYWxJbmRleCxcbiAgICBzbmFwSW5kZXg6IHByZXZpb3VzU25hcEluZGV4XG4gIH0gPSBzd2lwZXI7XG4gIGxldCBhY3RpdmVJbmRleCA9IG5ld0FjdGl2ZUluZGV4O1xuICBsZXQgc25hcEluZGV4O1xuICBjb25zdCBnZXRWaXJ0dWFsUmVhbEluZGV4ID0gYUluZGV4ID0+IHtcbiAgICBsZXQgcmVhbEluZGV4ID0gYUluZGV4IC0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlO1xuICAgIGlmIChyZWFsSW5kZXggPCAwKSB7XG4gICAgICByZWFsSW5kZXggPSBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoICsgcmVhbEluZGV4O1xuICAgIH1cbiAgICBpZiAocmVhbEluZGV4ID49IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGgpIHtcbiAgICAgIHJlYWxJbmRleCAtPSBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoO1xuICAgIH1cbiAgICByZXR1cm4gcmVhbEluZGV4O1xuICB9O1xuICBpZiAodHlwZW9mIGFjdGl2ZUluZGV4ID09PSAndW5kZWZpbmVkJykge1xuICAgIGFjdGl2ZUluZGV4ID0gZ2V0QWN0aXZlSW5kZXhCeVRyYW5zbGF0ZShzd2lwZXIpO1xuICB9XG4gIGlmIChzbmFwR3JpZC5pbmRleE9mKHRyYW5zbGF0ZSkgPj0gMCkge1xuICAgIHNuYXBJbmRleCA9IHNuYXBHcmlkLmluZGV4T2YodHJhbnNsYXRlKTtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBza2lwID0gTWF0aC5taW4ocGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCwgYWN0aXZlSW5kZXgpO1xuICAgIHNuYXBJbmRleCA9IHNraXAgKyBNYXRoLmZsb29yKChhY3RpdmVJbmRleCAtIHNraXApIC8gcGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgfVxuICBpZiAoc25hcEluZGV4ID49IHNuYXBHcmlkLmxlbmd0aCkgc25hcEluZGV4ID0gc25hcEdyaWQubGVuZ3RoIC0gMTtcbiAgaWYgKGFjdGl2ZUluZGV4ID09PSBwcmV2aW91c0luZGV4ICYmICFzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoc25hcEluZGV4ICE9PSBwcmV2aW91c1NuYXBJbmRleCkge1xuICAgICAgc3dpcGVyLnNuYXBJbmRleCA9IHNuYXBJbmRleDtcbiAgICAgIHN3aXBlci5lbWl0KCdzbmFwSW5kZXhDaGFuZ2UnKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChhY3RpdmVJbmRleCA9PT0gcHJldmlvdXNJbmRleCAmJiBzd2lwZXIucGFyYW1zLmxvb3AgJiYgc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICBzd2lwZXIucmVhbEluZGV4ID0gZ2V0VmlydHVhbFJlYWxJbmRleChhY3RpdmVJbmRleCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGdyaWRFbmFibGVkID0gc3dpcGVyLmdyaWQgJiYgcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDE7XG5cbiAgLy8gR2V0IHJlYWwgaW5kZXhcbiAgbGV0IHJlYWxJbmRleDtcbiAgaWYgKHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgJiYgcGFyYW1zLmxvb3ApIHtcbiAgICByZWFsSW5kZXggPSBnZXRWaXJ0dWFsUmVhbEluZGV4KGFjdGl2ZUluZGV4KTtcbiAgfSBlbHNlIGlmIChncmlkRW5hYmxlZCkge1xuICAgIGNvbnN0IGZpcnN0U2xpZGVJbkNvbHVtbiA9IHN3aXBlci5zbGlkZXMuZmlsdGVyKHNsaWRlRWwgPT4gc2xpZGVFbC5jb2x1bW4gPT09IGFjdGl2ZUluZGV4KVswXTtcbiAgICBsZXQgYWN0aXZlU2xpZGVJbmRleCA9IHBhcnNlSW50KGZpcnN0U2xpZGVJbkNvbHVtbi5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JyksIDEwKTtcbiAgICBpZiAoTnVtYmVyLmlzTmFOKGFjdGl2ZVNsaWRlSW5kZXgpKSB7XG4gICAgICBhY3RpdmVTbGlkZUluZGV4ID0gTWF0aC5tYXgoc3dpcGVyLnNsaWRlcy5pbmRleE9mKGZpcnN0U2xpZGVJbkNvbHVtbiksIDApO1xuICAgIH1cbiAgICByZWFsSW5kZXggPSBNYXRoLmZsb29yKGFjdGl2ZVNsaWRlSW5kZXggLyBwYXJhbXMuZ3JpZC5yb3dzKTtcbiAgfSBlbHNlIGlmIChzd2lwZXIuc2xpZGVzW2FjdGl2ZUluZGV4XSkge1xuICAgIGNvbnN0IHNsaWRlSW5kZXggPSBzd2lwZXIuc2xpZGVzW2FjdGl2ZUluZGV4XS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XG4gICAgaWYgKHNsaWRlSW5kZXgpIHtcbiAgICAgIHJlYWxJbmRleCA9IHBhcnNlSW50KHNsaWRlSW5kZXgsIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVhbEluZGV4ID0gYWN0aXZlSW5kZXg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJlYWxJbmRleCA9IGFjdGl2ZUluZGV4O1xuICB9XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgcHJldmlvdXNTbmFwSW5kZXgsXG4gICAgc25hcEluZGV4LFxuICAgIHByZXZpb3VzUmVhbEluZGV4LFxuICAgIHJlYWxJbmRleCxcbiAgICBwcmV2aW91c0luZGV4LFxuICAgIGFjdGl2ZUluZGV4XG4gIH0pO1xuICBpZiAoc3dpcGVyLmluaXRpYWxpemVkKSB7XG4gICAgcHJlbG9hZChzd2lwZXIpO1xuICB9XG4gIHN3aXBlci5lbWl0KCdhY3RpdmVJbmRleENoYW5nZScpO1xuICBzd2lwZXIuZW1pdCgnc25hcEluZGV4Q2hhbmdlJyk7XG4gIGlmIChzd2lwZXIuaW5pdGlhbGl6ZWQgfHwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQpIHtcbiAgICBpZiAocHJldmlvdXNSZWFsSW5kZXggIT09IHJlYWxJbmRleCkge1xuICAgICAgc3dpcGVyLmVtaXQoJ3JlYWxJbmRleENoYW5nZScpO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdCgnc2xpZGVDaGFuZ2UnKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVDbGlja2VkU2xpZGUoZWwsIHBhdGgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgbGV0IHNsaWRlID0gZWwuY2xvc2VzdChgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKTtcbiAgaWYgKCFzbGlkZSAmJiBzd2lwZXIuaXNFbGVtZW50ICYmIHBhdGggJiYgcGF0aC5sZW5ndGggPiAxICYmIHBhdGguaW5jbHVkZXMoZWwpKSB7XG4gICAgWy4uLnBhdGguc2xpY2UocGF0aC5pbmRleE9mKGVsKSArIDEsIHBhdGgubGVuZ3RoKV0uZm9yRWFjaChwYXRoRWwgPT4ge1xuICAgICAgaWYgKCFzbGlkZSAmJiBwYXRoRWwubWF0Y2hlcyAmJiBwYXRoRWwubWF0Y2hlcyhgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKSkge1xuICAgICAgICBzbGlkZSA9IHBhdGhFbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBsZXQgc2xpZGVGb3VuZCA9IGZhbHNlO1xuICBsZXQgc2xpZGVJbmRleDtcbiAgaWYgKHNsaWRlKSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2lwZXIuc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoc3dpcGVyLnNsaWRlc1tpXSA9PT0gc2xpZGUpIHtcbiAgICAgICAgc2xpZGVGb3VuZCA9IHRydWU7XG4gICAgICAgIHNsaWRlSW5kZXggPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHNsaWRlICYmIHNsaWRlRm91bmQpIHtcbiAgICBzd2lwZXIuY2xpY2tlZFNsaWRlID0gc2xpZGU7XG4gICAgaWYgKHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgICBzd2lwZXIuY2xpY2tlZEluZGV4ID0gcGFyc2VJbnQoc2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpLCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5jbGlja2VkSW5kZXggPSBzbGlkZUluZGV4O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuY2xpY2tlZFNsaWRlID0gdW5kZWZpbmVkO1xuICAgIHN3aXBlci5jbGlja2VkSW5kZXggPSB1bmRlZmluZWQ7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwYXJhbXMuc2xpZGVUb0NsaWNrZWRTbGlkZSAmJiBzd2lwZXIuY2xpY2tlZEluZGV4ICE9PSB1bmRlZmluZWQgJiYgc3dpcGVyLmNsaWNrZWRJbmRleCAhPT0gc3dpcGVyLmFjdGl2ZUluZGV4KSB7XG4gICAgc3dpcGVyLnNsaWRlVG9DbGlja2VkU2xpZGUoKTtcbiAgfVxufVxuXG52YXIgdXBkYXRlID0ge1xuICB1cGRhdGVTaXplLFxuICB1cGRhdGVTbGlkZXMsXG4gIHVwZGF0ZUF1dG9IZWlnaHQsXG4gIHVwZGF0ZVNsaWRlc09mZnNldCxcbiAgdXBkYXRlU2xpZGVzUHJvZ3Jlc3MsXG4gIHVwZGF0ZVByb2dyZXNzLFxuICB1cGRhdGVTbGlkZXNDbGFzc2VzLFxuICB1cGRhdGVBY3RpdmVJbmRleCxcbiAgdXBkYXRlQ2xpY2tlZFNsaWRlXG59O1xuXG5mdW5jdGlvbiBnZXRTd2lwZXJUcmFuc2xhdGUoYXhpcykge1xuICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7XG4gICAgYXhpcyA9IHRoaXMuaXNIb3Jpem9udGFsKCkgPyAneCcgOiAneSc7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICB0cmFuc2xhdGUsXG4gICAgd3JhcHBlckVsXG4gIH0gPSBzd2lwZXI7XG4gIGlmIChwYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkge1xuICAgIHJldHVybiBydGwgPyAtdHJhbnNsYXRlIDogdHJhbnNsYXRlO1xuICB9XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgIHJldHVybiB0cmFuc2xhdGU7XG4gIH1cbiAgbGV0IGN1cnJlbnRUcmFuc2xhdGUgPSBnZXRUcmFuc2xhdGUod3JhcHBlckVsLCBheGlzKTtcbiAgY3VycmVudFRyYW5zbGF0ZSArPSBzd2lwZXIuY3NzT3ZlcmZsb3dBZGp1c3RtZW50KCk7XG4gIGlmIChydGwpIGN1cnJlbnRUcmFuc2xhdGUgPSAtY3VycmVudFRyYW5zbGF0ZTtcbiAgcmV0dXJuIGN1cnJlbnRUcmFuc2xhdGUgfHwgMDtcbn1cblxuZnVuY3Rpb24gc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSwgYnlDb250cm9sbGVyKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICBwYXJhbXMsXG4gICAgd3JhcHBlckVsLFxuICAgIHByb2dyZXNzXG4gIH0gPSBzd2lwZXI7XG4gIGxldCB4ID0gMDtcbiAgbGV0IHkgPSAwO1xuICBjb25zdCB6ID0gMDtcbiAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgIHggPSBydGwgPyAtdHJhbnNsYXRlIDogdHJhbnNsYXRlO1xuICB9IGVsc2Uge1xuICAgIHkgPSB0cmFuc2xhdGU7XG4gIH1cbiAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHtcbiAgICB4ID0gTWF0aC5mbG9vcih4KTtcbiAgICB5ID0gTWF0aC5mbG9vcih5KTtcbiAgfVxuICBzd2lwZXIucHJldmlvdXNUcmFuc2xhdGUgPSBzd2lwZXIudHJhbnNsYXRlO1xuICBzd2lwZXIudHJhbnNsYXRlID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8geCA6IHk7XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgIHdyYXBwZXJFbFtzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnc2Nyb2xsTGVmdCcgOiAnc2Nyb2xsVG9wJ10gPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAteCA6IC15O1xuICB9IGVsc2UgaWYgKCFwYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkge1xuICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgIHggLT0gc3dpcGVyLmNzc092ZXJmbG93QWRqdXN0bWVudCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB5IC09IHN3aXBlci5jc3NPdmVyZmxvd0FkanVzdG1lbnQoKTtcbiAgICB9XG4gICAgd3JhcHBlckVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3h9cHgsICR7eX1weCwgJHt6fXB4KWA7XG4gIH1cblxuICAvLyBDaGVjayBpZiB3ZSBuZWVkIHRvIHVwZGF0ZSBwcm9ncmVzc1xuICBsZXQgbmV3UHJvZ3Jlc3M7XG4gIGNvbnN0IHRyYW5zbGF0ZXNEaWZmID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICBuZXdQcm9ncmVzcyA9IDA7XG4gIH0gZWxzZSB7XG4gICAgbmV3UHJvZ3Jlc3MgPSAodHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAvIHRyYW5zbGF0ZXNEaWZmO1xuICB9XG4gIGlmIChuZXdQcm9ncmVzcyAhPT0gcHJvZ3Jlc3MpIHtcbiAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlKTtcbiAgfVxuICBzd2lwZXIuZW1pdCgnc2V0VHJhbnNsYXRlJywgc3dpcGVyLnRyYW5zbGF0ZSwgYnlDb250cm9sbGVyKTtcbn1cblxuZnVuY3Rpb24gbWluVHJhbnNsYXRlKCkge1xuICByZXR1cm4gLXRoaXMuc25hcEdyaWRbMF07XG59XG5cbmZ1bmN0aW9uIG1heFRyYW5zbGF0ZSgpIHtcbiAgcmV0dXJuIC10aGlzLnNuYXBHcmlkW3RoaXMuc25hcEdyaWQubGVuZ3RoIC0gMV07XG59XG5cbmZ1bmN0aW9uIHRyYW5zbGF0ZVRvKHRyYW5zbGF0ZSwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgdHJhbnNsYXRlQm91bmRzLCBpbnRlcm5hbCkge1xuICBpZiAodHJhbnNsYXRlID09PSB2b2lkIDApIHtcbiAgICB0cmFuc2xhdGUgPSAwO1xuICB9XG4gIGlmIChzcGVlZCA9PT0gdm9pZCAwKSB7XG4gICAgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgfVxuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGlmICh0cmFuc2xhdGVCb3VuZHMgPT09IHZvaWQgMCkge1xuICAgIHRyYW5zbGF0ZUJvdW5kcyA9IHRydWU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICB3cmFwcGVyRWxcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKHN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLnByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbikge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBtaW5UcmFuc2xhdGUgPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gIGNvbnN0IG1heFRyYW5zbGF0ZSA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKTtcbiAgbGV0IG5ld1RyYW5zbGF0ZTtcbiAgaWYgKHRyYW5zbGF0ZUJvdW5kcyAmJiB0cmFuc2xhdGUgPiBtaW5UcmFuc2xhdGUpIG5ld1RyYW5zbGF0ZSA9IG1pblRyYW5zbGF0ZTtlbHNlIGlmICh0cmFuc2xhdGVCb3VuZHMgJiYgdHJhbnNsYXRlIDwgbWF4VHJhbnNsYXRlKSBuZXdUcmFuc2xhdGUgPSBtYXhUcmFuc2xhdGU7ZWxzZSBuZXdUcmFuc2xhdGUgPSB0cmFuc2xhdGU7XG5cbiAgLy8gVXBkYXRlIHByb2dyZXNzXG4gIHN3aXBlci51cGRhdGVQcm9ncmVzcyhuZXdUcmFuc2xhdGUpO1xuICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICBjb25zdCBpc0ggPSBzd2lwZXIuaXNIb3Jpem9udGFsKCk7XG4gICAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgICB3cmFwcGVyRWxbaXNIID8gJ3Njcm9sbExlZnQnIDogJ3Njcm9sbFRvcCddID0gLW5ld1RyYW5zbGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFzd2lwZXIuc3VwcG9ydC5zbW9vdGhTY3JvbGwpIHtcbiAgICAgICAgYW5pbWF0ZUNTU01vZGVTY3JvbGwoe1xuICAgICAgICAgIHN3aXBlcixcbiAgICAgICAgICB0YXJnZXRQb3NpdGlvbjogLW5ld1RyYW5zbGF0ZSxcbiAgICAgICAgICBzaWRlOiBpc0ggPyAnbGVmdCcgOiAndG9wJ1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICB3cmFwcGVyRWwuc2Nyb2xsVG8oe1xuICAgICAgICBbaXNIID8gJ2xlZnQnIDogJ3RvcCddOiAtbmV3VHJhbnNsYXRlLFxuICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1RyYW5zbGF0ZSk7XG4gICAgaWYgKHJ1bkNhbGxiYWNrcykge1xuICAgICAgc3dpcGVyLmVtaXQoJ2JlZm9yZVRyYW5zaXRpb25TdGFydCcsIHNwZWVkLCBpbnRlcm5hbCk7XG4gICAgICBzd2lwZXIuZW1pdCgndHJhbnNpdGlvbkVuZCcpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihzcGVlZCk7XG4gICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgIGlmIChydW5DYWxsYmFja3MpIHtcbiAgICAgIHN3aXBlci5lbWl0KCdiZWZvcmVUcmFuc2l0aW9uU3RhcnQnLCBzcGVlZCwgaW50ZXJuYWwpO1xuICAgICAgc3dpcGVyLmVtaXQoJ3RyYW5zaXRpb25TdGFydCcpO1xuICAgIH1cbiAgICBpZiAoIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgIHN3aXBlci5hbmltYXRpbmcgPSB0cnVlO1xuICAgICAgaWYgKCFzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKSB7XG4gICAgICAgIHN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKGUpIHtcbiAgICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSByZXR1cm47XG4gICAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgICAgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCA9IG51bGw7XG4gICAgICAgICAgZGVsZXRlIHN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQ7XG4gICAgICAgICAgaWYgKHJ1bkNhbGxiYWNrcykge1xuICAgICAgICAgICAgc3dpcGVyLmVtaXQoJ3RyYW5zaXRpb25FbmQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBzd2lwZXIud3JhcHBlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbnZhciB0cmFuc2xhdGUgPSB7XG4gIGdldFRyYW5zbGF0ZTogZ2V0U3dpcGVyVHJhbnNsYXRlLFxuICBzZXRUcmFuc2xhdGUsXG4gIG1pblRyYW5zbGF0ZSxcbiAgbWF4VHJhbnNsYXRlLFxuICB0cmFuc2xhdGVUb1xufTtcblxuZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbiwgYnlDb250cm9sbGVyKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmICghc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHtkdXJhdGlvbn1tc2A7XG4gICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS50cmFuc2l0aW9uRGVsYXkgPSBkdXJhdGlvbiA9PT0gMCA/IGAwbXNgIDogJyc7XG4gIH1cbiAgc3dpcGVyLmVtaXQoJ3NldFRyYW5zaXRpb24nLCBkdXJhdGlvbiwgYnlDb250cm9sbGVyKTtcbn1cblxuZnVuY3Rpb24gdHJhbnNpdGlvbkVtaXQoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBydW5DYWxsYmFja3MsXG4gICAgZGlyZWN0aW9uLFxuICAgIHN0ZXBcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IHtcbiAgICBhY3RpdmVJbmRleCxcbiAgICBwcmV2aW91c0luZGV4XG4gIH0gPSBzd2lwZXI7XG4gIGxldCBkaXIgPSBkaXJlY3Rpb247XG4gIGlmICghZGlyKSB7XG4gICAgaWYgKGFjdGl2ZUluZGV4ID4gcHJldmlvdXNJbmRleCkgZGlyID0gJ25leHQnO2Vsc2UgaWYgKGFjdGl2ZUluZGV4IDwgcHJldmlvdXNJbmRleCkgZGlyID0gJ3ByZXYnO2Vsc2UgZGlyID0gJ3Jlc2V0JztcbiAgfVxuICBzd2lwZXIuZW1pdChgdHJhbnNpdGlvbiR7c3RlcH1gKTtcbiAgaWYgKHJ1bkNhbGxiYWNrcyAmJiBhY3RpdmVJbmRleCAhPT0gcHJldmlvdXNJbmRleCkge1xuICAgIGlmIChkaXIgPT09ICdyZXNldCcpIHtcbiAgICAgIHN3aXBlci5lbWl0KGBzbGlkZVJlc2V0VHJhbnNpdGlvbiR7c3RlcH1gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoYHNsaWRlQ2hhbmdlVHJhbnNpdGlvbiR7c3RlcH1gKTtcbiAgICBpZiAoZGlyID09PSAnbmV4dCcpIHtcbiAgICAgIHN3aXBlci5lbWl0KGBzbGlkZU5leHRUcmFuc2l0aW9uJHtzdGVwfWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuZW1pdChgc2xpZGVQcmV2VHJhbnNpdGlvbiR7c3RlcH1gKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKSB7XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBpZiAocGFyYW1zLmNzc01vZGUpIHJldHVybjtcbiAgaWYgKHBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgfVxuICB0cmFuc2l0aW9uRW1pdCh7XG4gICAgc3dpcGVyLFxuICAgIHJ1bkNhbGxiYWNrcyxcbiAgICBkaXJlY3Rpb24sXG4gICAgc3RlcDogJ1N0YXJ0J1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChydW5DYWxsYmFja3MsIGRpcmVjdGlvbikge1xuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgc3dpcGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICBpZiAocGFyYW1zLmNzc01vZGUpIHJldHVybjtcbiAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG4gIHRyYW5zaXRpb25FbWl0KHtcbiAgICBzd2lwZXIsXG4gICAgcnVuQ2FsbGJhY2tzLFxuICAgIGRpcmVjdGlvbixcbiAgICBzdGVwOiAnRW5kJ1xuICB9KTtcbn1cblxudmFyIHRyYW5zaXRpb24gPSB7XG4gIHNldFRyYW5zaXRpb24sXG4gIHRyYW5zaXRpb25TdGFydCxcbiAgdHJhbnNpdGlvbkVuZFxufTtcblxuZnVuY3Rpb24gc2xpZGVUbyhpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwsIGluaXRpYWwpIHtcbiAgaWYgKGluZGV4ID09PSB2b2lkIDApIHtcbiAgICBpbmRleCA9IDA7XG4gIH1cbiAgaWYgKHNwZWVkID09PSB2b2lkIDApIHtcbiAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICB9XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ3N0cmluZycpIHtcbiAgICBpbmRleCA9IHBhcnNlSW50KGluZGV4LCAxMCk7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgbGV0IHNsaWRlSW5kZXggPSBpbmRleDtcbiAgaWYgKHNsaWRlSW5kZXggPCAwKSBzbGlkZUluZGV4ID0gMDtcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBzbmFwR3JpZCxcbiAgICBzbGlkZXNHcmlkLFxuICAgIHByZXZpb3VzSW5kZXgsXG4gICAgYWN0aXZlSW5kZXgsXG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgd3JhcHBlckVsLFxuICAgIGVuYWJsZWRcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKHN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLnByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbiB8fCAhZW5hYmxlZCAmJiAhaW50ZXJuYWwgJiYgIWluaXRpYWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3Qgc2tpcCA9IE1hdGgubWluKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwLCBzbGlkZUluZGV4KTtcbiAgbGV0IHNuYXBJbmRleCA9IHNraXAgKyBNYXRoLmZsb29yKChzbGlkZUluZGV4IC0gc2tpcCkgLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgaWYgKHNuYXBJbmRleCA+PSBzbmFwR3JpZC5sZW5ndGgpIHNuYXBJbmRleCA9IHNuYXBHcmlkLmxlbmd0aCAtIDE7XG4gIGNvbnN0IHRyYW5zbGF0ZSA9IC1zbmFwR3JpZFtzbmFwSW5kZXhdO1xuICAvLyBOb3JtYWxpemUgc2xpZGVJbmRleFxuICBpZiAocGFyYW1zLm5vcm1hbGl6ZVNsaWRlSW5kZXgpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc2xhdGUgPSAtTWF0aC5mbG9vcih0cmFuc2xhdGUgKiAxMDApO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEdyaWQgPSBNYXRoLmZsb29yKHNsaWRlc0dyaWRbaV0gKiAxMDApO1xuICAgICAgY29uc3Qgbm9ybWFsaXplZEdyaWROZXh0ID0gTWF0aC5mbG9vcihzbGlkZXNHcmlkW2kgKyAxXSAqIDEwMCk7XG4gICAgICBpZiAodHlwZW9mIHNsaWRlc0dyaWRbaSArIDFdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAobm9ybWFsaXplZFRyYW5zbGF0ZSA+PSBub3JtYWxpemVkR3JpZCAmJiBub3JtYWxpemVkVHJhbnNsYXRlIDwgbm9ybWFsaXplZEdyaWROZXh0IC0gKG5vcm1hbGl6ZWRHcmlkTmV4dCAtIG5vcm1hbGl6ZWRHcmlkKSAvIDIpIHtcbiAgICAgICAgICBzbGlkZUluZGV4ID0gaTtcbiAgICAgICAgfSBlbHNlIGlmIChub3JtYWxpemVkVHJhbnNsYXRlID49IG5vcm1hbGl6ZWRHcmlkICYmIG5vcm1hbGl6ZWRUcmFuc2xhdGUgPCBub3JtYWxpemVkR3JpZE5leHQpIHtcbiAgICAgICAgICBzbGlkZUluZGV4ID0gaSArIDE7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobm9ybWFsaXplZFRyYW5zbGF0ZSA+PSBub3JtYWxpemVkR3JpZCkge1xuICAgICAgICBzbGlkZUluZGV4ID0gaTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgLy8gRGlyZWN0aW9ucyBsb2Nrc1xuICBpZiAoc3dpcGVyLmluaXRpYWxpemVkICYmIHNsaWRlSW5kZXggIT09IGFjdGl2ZUluZGV4KSB7XG4gICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZU5leHQgJiYgKHJ0bCA/IHRyYW5zbGF0ZSA+IHN3aXBlci50cmFuc2xhdGUgJiYgdHJhbnNsYXRlID4gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIDogdHJhbnNsYXRlIDwgc3dpcGVyLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUgPCBzd2lwZXIubWluVHJhbnNsYXRlKCkpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmIHRyYW5zbGF0ZSA+IHN3aXBlci50cmFuc2xhdGUgJiYgdHJhbnNsYXRlID4gc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICBpZiAoKGFjdGl2ZUluZGV4IHx8IDApICE9PSBzbGlkZUluZGV4KSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHNsaWRlSW5kZXggIT09IChwcmV2aW91c0luZGV4IHx8IDApICYmIHJ1bkNhbGxiYWNrcykge1xuICAgIHN3aXBlci5lbWl0KCdiZWZvcmVTbGlkZUNoYW5nZVN0YXJ0Jyk7XG4gIH1cblxuICAvLyBVcGRhdGUgcHJvZ3Jlc3NcbiAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHRyYW5zbGF0ZSk7XG4gIGxldCBkaXJlY3Rpb247XG4gIGlmIChzbGlkZUluZGV4ID4gYWN0aXZlSW5kZXgpIGRpcmVjdGlvbiA9ICduZXh0JztlbHNlIGlmIChzbGlkZUluZGV4IDwgYWN0aXZlSW5kZXgpIGRpcmVjdGlvbiA9ICdwcmV2JztlbHNlIGRpcmVjdGlvbiA9ICdyZXNldCc7XG5cbiAgLy8gVXBkYXRlIEluZGV4XG4gIGlmIChydGwgJiYgLXRyYW5zbGF0ZSA9PT0gc3dpcGVyLnRyYW5zbGF0ZSB8fCAhcnRsICYmIHRyYW5zbGF0ZSA9PT0gc3dpcGVyLnRyYW5zbGF0ZSkge1xuICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleChzbGlkZUluZGV4KTtcbiAgICAvLyBVcGRhdGUgSGVpZ2h0XG4gICAgaWYgKHBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICBzd2lwZXIudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgIH1cbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgIGlmIChwYXJhbXMuZWZmZWN0ICE9PSAnc2xpZGUnKSB7XG4gICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSk7XG4gICAgfVxuICAgIGlmIChkaXJlY3Rpb24gIT09ICdyZXNldCcpIHtcbiAgICAgIHN3aXBlci50cmFuc2l0aW9uU3RhcnQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICAgICAgc3dpcGVyLnRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgY29uc3QgaXNIID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpO1xuICAgIGNvbnN0IHQgPSBydGwgPyB0cmFuc2xhdGUgOiAtdHJhbnNsYXRlO1xuICAgIGlmIChzcGVlZCA9PT0gMCkge1xuICAgICAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUuc2Nyb2xsU25hcFR5cGUgPSAnbm9uZSc7XG4gICAgICAgIHN3aXBlci5faW1tZWRpYXRlVmlydHVhbCA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoaXNWaXJ0dWFsICYmICFzd2lwZXIuX2Nzc01vZGVWaXJ0dWFsSW5pdGlhbFNldCAmJiBzd2lwZXIucGFyYW1zLmluaXRpYWxTbGlkZSA+IDApIHtcbiAgICAgICAgc3dpcGVyLl9jc3NNb2RlVmlydHVhbEluaXRpYWxTZXQgPSB0cnVlO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIHdyYXBwZXJFbFtpc0ggPyAnc2Nyb2xsTGVmdCcgOiAnc2Nyb2xsVG9wJ10gPSB0O1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyYXBwZXJFbFtpc0ggPyAnc2Nyb2xsTGVmdCcgOiAnc2Nyb2xsVG9wJ10gPSB0O1xuICAgICAgfVxuICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUuc2Nyb2xsU25hcFR5cGUgPSAnJztcbiAgICAgICAgICBzd2lwZXIuX2ltbWVkaWF0ZVZpcnR1YWwgPSBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghc3dpcGVyLnN1cHBvcnQuc21vb3RoU2Nyb2xsKSB7XG4gICAgICAgIGFuaW1hdGVDU1NNb2RlU2Nyb2xsKHtcbiAgICAgICAgICBzd2lwZXIsXG4gICAgICAgICAgdGFyZ2V0UG9zaXRpb246IHQsXG4gICAgICAgICAgc2lkZTogaXNIID8gJ2xlZnQnIDogJ3RvcCdcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgd3JhcHBlckVsLnNjcm9sbFRvKHtcbiAgICAgICAgW2lzSCA/ICdsZWZ0JyA6ICd0b3AnXTogdCxcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3BlZWQpO1xuICBzd2lwZXIuc2V0VHJhbnNsYXRlKHRyYW5zbGF0ZSk7XG4gIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleChzbGlkZUluZGV4KTtcbiAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgc3dpcGVyLmVtaXQoJ2JlZm9yZVRyYW5zaXRpb25TdGFydCcsIHNwZWVkLCBpbnRlcm5hbCk7XG4gIHN3aXBlci50cmFuc2l0aW9uU3RhcnQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICBzd2lwZXIudHJhbnNpdGlvbkVuZChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gIH0gZWxzZSBpZiAoIXN3aXBlci5hbmltYXRpbmcpIHtcbiAgICBzd2lwZXIuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICBpZiAoIXN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCkge1xuICAgICAgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChlKSB7XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgaWYgKGUudGFyZ2V0ICE9PSB0aGlzKSByZXR1cm47XG4gICAgICAgIHN3aXBlci53cmFwcGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gICAgICAgIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCA9IG51bGw7XG4gICAgICAgIGRlbGV0ZSBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQ7XG4gICAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgICAgIH07XG4gICAgfVxuICAgIHN3aXBlci53cmFwcGVyRWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHNsaWRlVG9Mb29wKGluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xuICBpZiAoaW5kZXggPT09IHZvaWQgMCkge1xuICAgIGluZGV4ID0gMDtcbiAgfVxuICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBpZiAodHlwZW9mIGluZGV4ID09PSAnc3RyaW5nJykge1xuICAgIGNvbnN0IGluZGV4QXNOdW1iZXIgPSBwYXJzZUludChpbmRleCwgMTApO1xuICAgIGluZGV4ID0gaW5kZXhBc051bWJlcjtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBncmlkRW5hYmxlZCA9IHN3aXBlci5ncmlkICYmIHN3aXBlci5wYXJhbXMuZ3JpZCAmJiBzd2lwZXIucGFyYW1zLmdyaWQucm93cyA+IDE7XG4gIGxldCBuZXdJbmRleCA9IGluZGV4O1xuICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgaWYgKHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIG5ld0luZGV4ID0gbmV3SW5kZXggKyBzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCB0YXJnZXRTbGlkZUluZGV4O1xuICAgICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBuZXdJbmRleCAqIHN3aXBlci5wYXJhbXMuZ3JpZC5yb3dzO1xuICAgICAgICB0YXJnZXRTbGlkZUluZGV4ID0gc3dpcGVyLnNsaWRlcy5maWx0ZXIoc2xpZGVFbCA9PiBzbGlkZUVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSAqIDEgPT09IHNsaWRlSW5kZXgpWzBdLmNvbHVtbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRhcmdldFNsaWRlSW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleEJ5RGF0YShuZXdJbmRleCk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb2xzID0gZ3JpZEVuYWJsZWQgPyBNYXRoLmNlaWwoc3dpcGVyLnNsaWRlcy5sZW5ndGggLyBzd2lwZXIucGFyYW1zLmdyaWQucm93cykgOiBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY2VudGVyZWRTbGlkZXNcbiAgICAgIH0gPSBzd2lwZXIucGFyYW1zO1xuICAgICAgbGV0IHNsaWRlc1BlclZpZXcgPSBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgICBpZiAoc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nKSB7XG4gICAgICAgIHNsaWRlc1BlclZpZXcgPSBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlc1BlclZpZXcgPSBNYXRoLmNlaWwocGFyc2VGbG9hdChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcsIDEwKSk7XG4gICAgICAgIGlmIChjZW50ZXJlZFNsaWRlcyAmJiBzbGlkZXNQZXJWaWV3ICUgMiA9PT0gMCkge1xuICAgICAgICAgIHNsaWRlc1BlclZpZXcgPSBzbGlkZXNQZXJWaWV3ICsgMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgbGV0IG5lZWRMb29wRml4ID0gY29scyAtIHRhcmdldFNsaWRlSW5kZXggPCBzbGlkZXNQZXJWaWV3O1xuICAgICAgaWYgKGNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgIG5lZWRMb29wRml4ID0gbmVlZExvb3BGaXggfHwgdGFyZ2V0U2xpZGVJbmRleCA8IE1hdGguY2VpbChzbGlkZXNQZXJWaWV3IC8gMik7XG4gICAgICB9XG4gICAgICBpZiAobmVlZExvb3BGaXgpIHtcbiAgICAgICAgY29uc3QgZGlyZWN0aW9uID0gY2VudGVyZWRTbGlkZXMgPyB0YXJnZXRTbGlkZUluZGV4IDwgc3dpcGVyLmFjdGl2ZUluZGV4ID8gJ3ByZXYnIDogJ25leHQnIDogdGFyZ2V0U2xpZGVJbmRleCAtIHN3aXBlci5hY3RpdmVJbmRleCAtIDEgPCBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPyAnbmV4dCcgOiAncHJldic7XG4gICAgICAgIHN3aXBlci5sb29wRml4KHtcbiAgICAgICAgICBkaXJlY3Rpb24sXG4gICAgICAgICAgc2xpZGVUbzogdHJ1ZSxcbiAgICAgICAgICBhY3RpdmVTbGlkZUluZGV4OiBkaXJlY3Rpb24gPT09ICduZXh0JyA/IHRhcmdldFNsaWRlSW5kZXggKyAxIDogdGFyZ2V0U2xpZGVJbmRleCAtIGNvbHMgKyAxLFxuICAgICAgICAgIHNsaWRlUmVhbEluZGV4OiBkaXJlY3Rpb24gPT09ICduZXh0JyA/IHN3aXBlci5yZWFsSW5kZXggOiB1bmRlZmluZWRcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgICAgY29uc3Qgc2xpZGVJbmRleCA9IG5ld0luZGV4ICogc3dpcGVyLnBhcmFtcy5ncmlkLnJvd3M7XG4gICAgICAgIG5ld0luZGV4ID0gc3dpcGVyLnNsaWRlcy5maWx0ZXIoc2xpZGVFbCA9PiBzbGlkZUVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSAqIDEgPT09IHNsaWRlSW5kZXgpWzBdLmNvbHVtbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG5ld0luZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXhCeURhdGEobmV3SW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIHN3aXBlci5zbGlkZVRvKG5ld0luZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gIH0pO1xuICByZXR1cm4gc3dpcGVyO1xufVxuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cbmZ1bmN0aW9uIHNsaWRlTmV4dChzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xuICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgZW5hYmxlZCxcbiAgICBwYXJhbXMsXG4gICAgYW5pbWF0aW5nXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZW5hYmxlZCkgcmV0dXJuIHN3aXBlcjtcbiAgbGV0IHBlckdyb3VwID0gcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyAmJiBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDEgJiYgcGFyYW1zLnNsaWRlc1Blckdyb3VwQXV0bykge1xuICAgIHBlckdyb3VwID0gTWF0aC5tYXgoc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCdjdXJyZW50JywgdHJ1ZSksIDEpO1xuICB9XG4gIGNvbnN0IGluY3JlbWVudCA9IHN3aXBlci5hY3RpdmVJbmRleCA8IHBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAgPyAxIDogcGVyR3JvdXA7XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIGlmIChhbmltYXRpbmcgJiYgIWlzVmlydHVhbCAmJiBwYXJhbXMubG9vcFByZXZlbnRzU2xpZGluZykgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXBlci5sb29wRml4KHtcbiAgICAgIGRpcmVjdGlvbjogJ25leHQnXG4gICAgfSk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgc3dpcGVyLl9jbGllbnRMZWZ0ID0gc3dpcGVyLndyYXBwZXJFbC5jbGllbnRMZWZ0O1xuICAgIGlmIChzd2lwZXIuYWN0aXZlSW5kZXggPT09IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMSAmJiBwYXJhbXMuY3NzTW9kZSkge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4ICsgaW5jcmVtZW50LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICBpZiAocGFyYW1zLnJld2luZCAmJiBzd2lwZXIuaXNFbmQpIHtcbiAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oMCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICB9XG4gIHJldHVybiBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXggKyBpbmNyZW1lbnQsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbn1cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG5mdW5jdGlvbiBzbGlkZVByZXYoc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgaWYgKHNwZWVkID09PSB2b2lkIDApIHtcbiAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICB9XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBzbmFwR3JpZCxcbiAgICBzbGlkZXNHcmlkLFxuICAgIHJ0bFRyYW5zbGF0ZSxcbiAgICBlbmFibGVkLFxuICAgIGFuaW1hdGluZ1xuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVuYWJsZWQpIHJldHVybiBzd2lwZXI7XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIGlmIChhbmltYXRpbmcgJiYgIWlzVmlydHVhbCAmJiBwYXJhbXMubG9vcFByZXZlbnRzU2xpZGluZykgcmV0dXJuIGZhbHNlO1xuICAgIHN3aXBlci5sb29wRml4KHtcbiAgICAgIGRpcmVjdGlvbjogJ3ByZXYnXG4gICAgfSk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgc3dpcGVyLl9jbGllbnRMZWZ0ID0gc3dpcGVyLndyYXBwZXJFbC5jbGllbnRMZWZ0O1xuICB9XG4gIGNvbnN0IHRyYW5zbGF0ZSA9IHJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgZnVuY3Rpb24gbm9ybWFsaXplKHZhbCkge1xuICAgIGlmICh2YWwgPCAwKSByZXR1cm4gLU1hdGguZmxvb3IoTWF0aC5hYnModmFsKSk7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IodmFsKTtcbiAgfVxuICBjb25zdCBub3JtYWxpemVkVHJhbnNsYXRlID0gbm9ybWFsaXplKHRyYW5zbGF0ZSk7XG4gIGNvbnN0IG5vcm1hbGl6ZWRTbmFwR3JpZCA9IHNuYXBHcmlkLm1hcCh2YWwgPT4gbm9ybWFsaXplKHZhbCkpO1xuICBsZXQgcHJldlNuYXAgPSBzbmFwR3JpZFtub3JtYWxpemVkU25hcEdyaWQuaW5kZXhPZihub3JtYWxpemVkVHJhbnNsYXRlKSAtIDFdO1xuICBpZiAodHlwZW9mIHByZXZTbmFwID09PSAndW5kZWZpbmVkJyAmJiBwYXJhbXMuY3NzTW9kZSkge1xuICAgIGxldCBwcmV2U25hcEluZGV4O1xuICAgIHNuYXBHcmlkLmZvckVhY2goKHNuYXAsIHNuYXBJbmRleCkgPT4ge1xuICAgICAgaWYgKG5vcm1hbGl6ZWRUcmFuc2xhdGUgPj0gc25hcCkge1xuICAgICAgICAvLyBwcmV2U25hcCA9IHNuYXA7XG4gICAgICAgIHByZXZTbmFwSW5kZXggPSBzbmFwSW5kZXg7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHR5cGVvZiBwcmV2U25hcEluZGV4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgcHJldlNuYXAgPSBzbmFwR3JpZFtwcmV2U25hcEluZGV4ID4gMCA/IHByZXZTbmFwSW5kZXggLSAxIDogcHJldlNuYXBJbmRleF07XG4gICAgfVxuICB9XG4gIGxldCBwcmV2SW5kZXggPSAwO1xuICBpZiAodHlwZW9mIHByZXZTbmFwICE9PSAndW5kZWZpbmVkJykge1xuICAgIHByZXZJbmRleCA9IHNsaWRlc0dyaWQuaW5kZXhPZihwcmV2U25hcCk7XG4gICAgaWYgKHByZXZJbmRleCA8IDApIHByZXZJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleCAtIDE7XG4gICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgJiYgcGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAxICYmIHBhcmFtcy5zbGlkZXNQZXJHcm91cEF1dG8pIHtcbiAgICAgIHByZXZJbmRleCA9IHByZXZJbmRleCAtIHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygncHJldmlvdXMnLCB0cnVlKSArIDE7XG4gICAgICBwcmV2SW5kZXggPSBNYXRoLm1heChwcmV2SW5kZXgsIDApO1xuICAgIH1cbiAgfVxuICBpZiAocGFyYW1zLnJld2luZCAmJiBzd2lwZXIuaXNCZWdpbm5pbmcpIHtcbiAgICBjb25zdCBsYXN0SW5kZXggPSBzd2lwZXIucGFyYW1zLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgJiYgc3dpcGVyLnZpcnR1YWwgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIC0gMSA6IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMTtcbiAgICByZXR1cm4gc3dpcGVyLnNsaWRlVG8obGFzdEluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gIH0gZWxzZSBpZiAocGFyYW1zLmxvb3AgJiYgc3dpcGVyLmFjdGl2ZUluZGV4ID09PSAwICYmIHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHByZXZJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBzd2lwZXIuc2xpZGVUbyhwcmV2SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbn1cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG5mdW5jdGlvbiBzbGlkZVJlc2V0KHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gIGlmIChzcGVlZCA9PT0gdm9pZCAwKSB7XG4gICAgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgfVxuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIHJldHVybiBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbn1cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG5mdW5jdGlvbiBzbGlkZVRvQ2xvc2VzdChzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCwgdGhyZXNob2xkKSB7XG4gIGlmIChzcGVlZCA9PT0gdm9pZCAwKSB7XG4gICAgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgfVxuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGlmICh0aHJlc2hvbGQgPT09IHZvaWQgMCkge1xuICAgIHRocmVzaG9sZCA9IDAuNTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBsZXQgaW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gIGNvbnN0IHNraXAgPSBNYXRoLm1pbihzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCwgaW5kZXgpO1xuICBjb25zdCBzbmFwSW5kZXggPSBza2lwICsgTWF0aC5mbG9vcigoaW5kZXggLSBza2lwKSAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICBjb25zdCB0cmFuc2xhdGUgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuICBpZiAodHJhbnNsYXRlID49IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXhdKSB7XG4gICAgLy8gVGhlIGN1cnJlbnQgdHJhbnNsYXRlIGlzIG9uIG9yIGFmdGVyIHRoZSBjdXJyZW50IHNuYXAgaW5kZXgsIHNvIHRoZSBjaG9pY2VcbiAgICAvLyBpcyBiZXR3ZWVuIHRoZSBjdXJyZW50IGluZGV4IGFuZCB0aGUgb25lIGFmdGVyIGl0LlxuICAgIGNvbnN0IGN1cnJlbnRTbmFwID0gc3dpcGVyLnNuYXBHcmlkW3NuYXBJbmRleF07XG4gICAgY29uc3QgbmV4dFNuYXAgPSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4ICsgMV07XG4gICAgaWYgKHRyYW5zbGF0ZSAtIGN1cnJlbnRTbmFwID4gKG5leHRTbmFwIC0gY3VycmVudFNuYXApICogdGhyZXNob2xkKSB7XG4gICAgICBpbmRleCArPSBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBUaGUgY3VycmVudCB0cmFuc2xhdGUgaXMgYmVmb3JlIHRoZSBjdXJyZW50IHNuYXAgaW5kZXgsIHNvIHRoZSBjaG9pY2VcbiAgICAvLyBpcyBiZXR3ZWVuIHRoZSBjdXJyZW50IGluZGV4IGFuZCB0aGUgb25lIGJlZm9yZSBpdC5cbiAgICBjb25zdCBwcmV2U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXggLSAxXTtcbiAgICBjb25zdCBjdXJyZW50U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXhdO1xuICAgIGlmICh0cmFuc2xhdGUgLSBwcmV2U25hcCA8PSAoY3VycmVudFNuYXAgLSBwcmV2U25hcCkgKiB0aHJlc2hvbGQpIHtcbiAgICAgIGluZGV4IC09IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gICAgfVxuICB9XG4gIGluZGV4ID0gTWF0aC5tYXgoaW5kZXgsIDApO1xuICBpbmRleCA9IE1hdGgubWluKGluZGV4LCBzd2lwZXIuc2xpZGVzR3JpZC5sZW5ndGggLSAxKTtcbiAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKGluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG59XG5cbmZ1bmN0aW9uIHNsaWRlVG9DbGlja2VkU2xpZGUoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgc2xpZGVzRWxcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3Qgc2xpZGVzUGVyVmlldyA9IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgPyBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKSA6IHBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICBsZXQgc2xpZGVUb0luZGV4ID0gc3dpcGVyLmNsaWNrZWRJbmRleDtcbiAgbGV0IHJlYWxJbmRleDtcbiAgY29uc3Qgc2xpZGVTZWxlY3RvciA9IHN3aXBlci5pc0VsZW1lbnQgPyBgc3dpcGVyLXNsaWRlYCA6IGAuJHtwYXJhbXMuc2xpZGVDbGFzc31gO1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoc3dpcGVyLmFuaW1hdGluZykgcmV0dXJuO1xuICAgIHJlYWxJbmRleCA9IHBhcnNlSW50KHN3aXBlci5jbGlja2VkU2xpZGUuZ2V0QXR0cmlidXRlKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpLCAxMCk7XG4gICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgaWYgKHNsaWRlVG9JbmRleCA8IHN3aXBlci5sb29wZWRTbGlkZXMgLSBzbGlkZXNQZXJWaWV3IC8gMiB8fCBzbGlkZVRvSW5kZXggPiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIHN3aXBlci5sb29wZWRTbGlkZXMgKyBzbGlkZXNQZXJWaWV3IC8gMikge1xuICAgICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgICBzbGlkZVRvSW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleChlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAke3NsaWRlU2VsZWN0b3J9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtyZWFsSW5kZXh9XCJdYClbMF0pO1xuICAgICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoc2xpZGVUb0luZGV4ID4gc3dpcGVyLnNsaWRlcy5sZW5ndGggLSBzbGlkZXNQZXJWaWV3KSB7XG4gICAgICBzd2lwZXIubG9vcEZpeCgpO1xuICAgICAgc2xpZGVUb0luZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXgoZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgJHtzbGlkZVNlbGVjdG9yfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7cmVhbEluZGV4fVwiXWApWzBdKTtcbiAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICB9XG59XG5cbnZhciBzbGlkZSA9IHtcbiAgc2xpZGVUbyxcbiAgc2xpZGVUb0xvb3AsXG4gIHNsaWRlTmV4dCxcbiAgc2xpZGVQcmV2LFxuICBzbGlkZVJlc2V0LFxuICBzbGlkZVRvQ2xvc2VzdCxcbiAgc2xpZGVUb0NsaWNrZWRTbGlkZVxufTtcblxuZnVuY3Rpb24gbG9vcENyZWF0ZShzbGlkZVJlYWxJbmRleCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHNsaWRlc0VsXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghcGFyYW1zLmxvb3AgfHwgc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHJldHVybjtcbiAgY29uc3QgaW5pdFNsaWRlcyA9ICgpID0+IHtcbiAgICBjb25zdCBzbGlkZXMgPSBlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApO1xuICAgIHNsaWRlcy5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnLCBpbmRleCk7XG4gICAgfSk7XG4gIH07XG4gIGNvbnN0IGdyaWRFbmFibGVkID0gc3dpcGVyLmdyaWQgJiYgcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDE7XG4gIGNvbnN0IHNsaWRlc1Blckdyb3VwID0gcGFyYW1zLnNsaWRlc1Blckdyb3VwICogKGdyaWRFbmFibGVkID8gcGFyYW1zLmdyaWQucm93cyA6IDEpO1xuICBjb25zdCBzaG91bGRGaWxsR3JvdXAgPSBzd2lwZXIuc2xpZGVzLmxlbmd0aCAlIHNsaWRlc1Blckdyb3VwICE9PSAwO1xuICBjb25zdCBzaG91bGRGaWxsR3JpZCA9IGdyaWRFbmFibGVkICYmIHN3aXBlci5zbGlkZXMubGVuZ3RoICUgcGFyYW1zLmdyaWQucm93cyAhPT0gMDtcbiAgY29uc3QgYWRkQmxhbmtTbGlkZXMgPSBhbW91bnRPZlNsaWRlcyA9PiB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhbW91bnRPZlNsaWRlczsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzbGlkZUVsID0gc3dpcGVyLmlzRWxlbWVudCA/IGNyZWF0ZUVsZW1lbnQoJ3N3aXBlci1zbGlkZScsIFtwYXJhbXMuc2xpZGVCbGFua0NsYXNzXSkgOiBjcmVhdGVFbGVtZW50KCdkaXYnLCBbcGFyYW1zLnNsaWRlQ2xhc3MsIHBhcmFtcy5zbGlkZUJsYW5rQ2xhc3NdKTtcbiAgICAgIHN3aXBlci5zbGlkZXNFbC5hcHBlbmQoc2xpZGVFbCk7XG4gICAgfVxuICB9O1xuICBpZiAoc2hvdWxkRmlsbEdyb3VwKSB7XG4gICAgaWYgKHBhcmFtcy5sb29wQWRkQmxhbmtTbGlkZXMpIHtcbiAgICAgIGNvbnN0IHNsaWRlc1RvQWRkID0gc2xpZGVzUGVyR3JvdXAgLSBzd2lwZXIuc2xpZGVzLmxlbmd0aCAlIHNsaWRlc1Blckdyb3VwO1xuICAgICAgYWRkQmxhbmtTbGlkZXMoc2xpZGVzVG9BZGQpO1xuICAgICAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaG93V2FybmluZygnU3dpcGVyIExvb3AgV2FybmluZzogVGhlIG51bWJlciBvZiBzbGlkZXMgaXMgbm90IGV2ZW4gdG8gc2xpZGVzUGVyR3JvdXAsIGxvb3AgbW9kZSBtYXkgbm90IGZ1bmN0aW9uIHByb3Blcmx5LiBZb3UgbmVlZCB0byBhZGQgbW9yZSBzbGlkZXMgKG9yIG1ha2UgZHVwbGljYXRlcywgb3IgZW1wdHkgc2xpZGVzKScpO1xuICAgIH1cbiAgICBpbml0U2xpZGVzKCk7XG4gIH0gZWxzZSBpZiAoc2hvdWxkRmlsbEdyaWQpIHtcbiAgICBpZiAocGFyYW1zLmxvb3BBZGRCbGFua1NsaWRlcykge1xuICAgICAgY29uc3Qgc2xpZGVzVG9BZGQgPSBwYXJhbXMuZ3JpZC5yb3dzIC0gc3dpcGVyLnNsaWRlcy5sZW5ndGggJSBwYXJhbXMuZ3JpZC5yb3dzO1xuICAgICAgYWRkQmxhbmtTbGlkZXMoc2xpZGVzVG9BZGQpO1xuICAgICAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzaG93V2FybmluZygnU3dpcGVyIExvb3AgV2FybmluZzogVGhlIG51bWJlciBvZiBzbGlkZXMgaXMgbm90IGV2ZW4gdG8gZ3JpZC5yb3dzLCBsb29wIG1vZGUgbWF5IG5vdCBmdW5jdGlvbiBwcm9wZXJseS4gWW91IG5lZWQgdG8gYWRkIG1vcmUgc2xpZGVzIChvciBtYWtlIGR1cGxpY2F0ZXMsIG9yIGVtcHR5IHNsaWRlcyknKTtcbiAgICB9XG4gICAgaW5pdFNsaWRlcygpO1xuICB9IGVsc2Uge1xuICAgIGluaXRTbGlkZXMoKTtcbiAgfVxuICBzd2lwZXIubG9vcEZpeCh7XG4gICAgc2xpZGVSZWFsSW5kZXgsXG4gICAgZGlyZWN0aW9uOiBwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyB1bmRlZmluZWQgOiAnbmV4dCdcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvb3BGaXgoX3RlbXApIHtcbiAgbGV0IHtcbiAgICBzbGlkZVJlYWxJbmRleCxcbiAgICBzbGlkZVRvID0gdHJ1ZSxcbiAgICBkaXJlY3Rpb24sXG4gICAgc2V0VHJhbnNsYXRlLFxuICAgIGFjdGl2ZVNsaWRlSW5kZXgsXG4gICAgYnlDb250cm9sbGVyLFxuICAgIGJ5TW91c2V3aGVlbFxuICB9ID0gX3RlbXAgPT09IHZvaWQgMCA/IHt9IDogX3RlbXA7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmICghc3dpcGVyLnBhcmFtcy5sb29wKSByZXR1cm47XG4gIHN3aXBlci5lbWl0KCdiZWZvcmVMb29wRml4Jyk7XG4gIGNvbnN0IHtcbiAgICBzbGlkZXMsXG4gICAgYWxsb3dTbGlkZVByZXYsXG4gICAgYWxsb3dTbGlkZU5leHQsXG4gICAgc2xpZGVzRWwsXG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IHtcbiAgICBjZW50ZXJlZFNsaWRlc1xuICB9ID0gcGFyYW1zO1xuICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSB0cnVlO1xuICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSB0cnVlO1xuICBpZiAoc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgIGlmIChzbGlkZVRvKSB7XG4gICAgICBpZiAoIXBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBzd2lwZXIuc25hcEluZGV4ID09PSAwKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHN3aXBlci5zbmFwSW5kZXggPCBwYXJhbXMuc2xpZGVzUGVyVmlldykge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoICsgc3dpcGVyLnNuYXBJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChzd2lwZXIuc25hcEluZGV4ID09PSBzd2lwZXIuc25hcEdyaWQubGVuZ3RoIC0gMSkge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmUsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gYWxsb3dTbGlkZVByZXY7XG4gICAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gYWxsb3dTbGlkZU5leHQ7XG4gICAgc3dpcGVyLmVtaXQoJ2xvb3BGaXgnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgbGV0IHNsaWRlc1BlclZpZXcgPSBwYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgaWYgKHNsaWRlc1BlclZpZXcgPT09ICdhdXRvJykge1xuICAgIHNsaWRlc1BlclZpZXcgPSBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKTtcbiAgfSBlbHNlIHtcbiAgICBzbGlkZXNQZXJWaWV3ID0gTWF0aC5jZWlsKHBhcnNlRmxvYXQocGFyYW1zLnNsaWRlc1BlclZpZXcsIDEwKSk7XG4gICAgaWYgKGNlbnRlcmVkU2xpZGVzICYmIHNsaWRlc1BlclZpZXcgJSAyID09PSAwKSB7XG4gICAgICBzbGlkZXNQZXJWaWV3ID0gc2xpZGVzUGVyVmlldyArIDE7XG4gICAgfVxuICB9XG4gIGNvbnN0IHNsaWRlc1Blckdyb3VwID0gcGFyYW1zLnNsaWRlc1Blckdyb3VwQXV0byA/IHNsaWRlc1BlclZpZXcgOiBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gIGxldCBsb29wZWRTbGlkZXMgPSBzbGlkZXNQZXJHcm91cDtcbiAgaWYgKGxvb3BlZFNsaWRlcyAlIHNsaWRlc1Blckdyb3VwICE9PSAwKSB7XG4gICAgbG9vcGVkU2xpZGVzICs9IHNsaWRlc1Blckdyb3VwIC0gbG9vcGVkU2xpZGVzICUgc2xpZGVzUGVyR3JvdXA7XG4gIH1cbiAgbG9vcGVkU2xpZGVzICs9IHBhcmFtcy5sb29wQWRkaXRpb25hbFNsaWRlcztcbiAgc3dpcGVyLmxvb3BlZFNsaWRlcyA9IGxvb3BlZFNsaWRlcztcbiAgY29uc3QgZ3JpZEVuYWJsZWQgPSBzd2lwZXIuZ3JpZCAmJiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMTtcbiAgaWYgKHNsaWRlcy5sZW5ndGggPCBzbGlkZXNQZXJWaWV3ICsgbG9vcGVkU2xpZGVzKSB7XG4gICAgc2hvd1dhcm5pbmcoJ1N3aXBlciBMb29wIFdhcm5pbmc6IFRoZSBudW1iZXIgb2Ygc2xpZGVzIGlzIG5vdCBlbm91Z2ggZm9yIGxvb3AgbW9kZSwgaXQgd2lsbCBiZSBkaXNhYmxlZCBhbmQgbm90IGZ1bmN0aW9uIHByb3Blcmx5LiBZb3UgbmVlZCB0byBhZGQgbW9yZSBzbGlkZXMgKG9yIG1ha2UgZHVwbGljYXRlcykgb3IgbG93ZXIgdGhlIHZhbHVlcyBvZiBzbGlkZXNQZXJWaWV3IGFuZCBzbGlkZXNQZXJHcm91cCBwYXJhbWV0ZXJzJyk7XG4gIH0gZWxzZSBpZiAoZ3JpZEVuYWJsZWQgJiYgcGFyYW1zLmdyaWQuZmlsbCA9PT0gJ3JvdycpIHtcbiAgICBzaG93V2FybmluZygnU3dpcGVyIExvb3AgV2FybmluZzogTG9vcCBtb2RlIGlzIG5vdCBjb21wYXRpYmxlIHdpdGggZ3JpZC5maWxsID0gYHJvd2AnKTtcbiAgfVxuICBjb25zdCBwcmVwZW5kU2xpZGVzSW5kZXhlcyA9IFtdO1xuICBjb25zdCBhcHBlbmRTbGlkZXNJbmRleGVzID0gW107XG4gIGxldCBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgaWYgKHR5cGVvZiBhY3RpdmVTbGlkZUluZGV4ID09PSAndW5kZWZpbmVkJykge1xuICAgIGFjdGl2ZVNsaWRlSW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleChzbGlkZXMuZmlsdGVyKGVsID0+IGVsLmNsYXNzTGlzdC5jb250YWlucyhwYXJhbXMuc2xpZGVBY3RpdmVDbGFzcykpWzBdKTtcbiAgfSBlbHNlIHtcbiAgICBhY3RpdmVJbmRleCA9IGFjdGl2ZVNsaWRlSW5kZXg7XG4gIH1cbiAgY29uc3QgaXNOZXh0ID0gZGlyZWN0aW9uID09PSAnbmV4dCcgfHwgIWRpcmVjdGlvbjtcbiAgY29uc3QgaXNQcmV2ID0gZGlyZWN0aW9uID09PSAncHJldicgfHwgIWRpcmVjdGlvbjtcbiAgbGV0IHNsaWRlc1ByZXBlbmRlZCA9IDA7XG4gIGxldCBzbGlkZXNBcHBlbmRlZCA9IDA7XG4gIGNvbnN0IGNvbHMgPSBncmlkRW5hYmxlZCA/IE1hdGguY2VpbChzbGlkZXMubGVuZ3RoIC8gcGFyYW1zLmdyaWQucm93cykgOiBzbGlkZXMubGVuZ3RoO1xuICBjb25zdCBhY3RpdmVDb2xJbmRleCA9IGdyaWRFbmFibGVkID8gc2xpZGVzW2FjdGl2ZVNsaWRlSW5kZXhdLmNvbHVtbiA6IGFjdGl2ZVNsaWRlSW5kZXg7XG4gIGNvbnN0IGFjdGl2ZUNvbEluZGV4V2l0aFNoaWZ0ID0gYWN0aXZlQ29sSW5kZXggKyAoY2VudGVyZWRTbGlkZXMgJiYgdHlwZW9mIHNldFRyYW5zbGF0ZSA9PT0gJ3VuZGVmaW5lZCcgPyAtc2xpZGVzUGVyVmlldyAvIDIgKyAwLjUgOiAwKTtcbiAgLy8gcHJlcGVuZCBsYXN0IHNsaWRlcyBiZWZvcmUgc3RhcnRcbiAgaWYgKGFjdGl2ZUNvbEluZGV4V2l0aFNoaWZ0IDwgbG9vcGVkU2xpZGVzKSB7XG4gICAgc2xpZGVzUHJlcGVuZGVkID0gTWF0aC5tYXgobG9vcGVkU2xpZGVzIC0gYWN0aXZlQ29sSW5kZXhXaXRoU2hpZnQsIHNsaWRlc1Blckdyb3VwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxvb3BlZFNsaWRlcyAtIGFjdGl2ZUNvbEluZGV4V2l0aFNoaWZ0OyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gaSAtIE1hdGguZmxvb3IoaSAvIGNvbHMpICogY29scztcbiAgICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgICBjb25zdCBjb2xJbmRleFRvUHJlcGVuZCA9IGNvbHMgLSBpbmRleCAtIDE7XG4gICAgICAgIGZvciAobGV0IGkgPSBzbGlkZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgICAgICBpZiAoc2xpZGVzW2ldLmNvbHVtbiA9PT0gY29sSW5kZXhUb1ByZXBlbmQpIHByZXBlbmRTbGlkZXNJbmRleGVzLnB1c2goaSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gc2xpZGVzLmZvckVhY2goKHNsaWRlLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICAgIC8vICAgaWYgKHNsaWRlLmNvbHVtbiA9PT0gY29sSW5kZXhUb1ByZXBlbmQpIHByZXBlbmRTbGlkZXNJbmRleGVzLnB1c2goc2xpZGVJbmRleCk7XG4gICAgICAgIC8vIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcHJlcGVuZFNsaWRlc0luZGV4ZXMucHVzaChjb2xzIC0gaW5kZXggLSAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoYWN0aXZlQ29sSW5kZXhXaXRoU2hpZnQgKyBzbGlkZXNQZXJWaWV3ID4gY29scyAtIGxvb3BlZFNsaWRlcykge1xuICAgIHNsaWRlc0FwcGVuZGVkID0gTWF0aC5tYXgoYWN0aXZlQ29sSW5kZXhXaXRoU2hpZnQgLSAoY29scyAtIGxvb3BlZFNsaWRlcyAqIDIpLCBzbGlkZXNQZXJHcm91cCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNBcHBlbmRlZDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGkgLSBNYXRoLmZsb29yKGkgLyBjb2xzKSAqIGNvbHM7XG4gICAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgICAgc2xpZGVzLmZvckVhY2goKHNsaWRlLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKHNsaWRlLmNvbHVtbiA9PT0gaW5kZXgpIGFwcGVuZFNsaWRlc0luZGV4ZXMucHVzaChzbGlkZUluZGV4KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhcHBlbmRTbGlkZXNJbmRleGVzLnB1c2goaW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXyA9IHRydWU7XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18gPSBmYWxzZTtcbiAgfSk7XG4gIGlmIChpc1ByZXYpIHtcbiAgICBwcmVwZW5kU2xpZGVzSW5kZXhlcy5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICAgIHNsaWRlc1tpbmRleF0uc3dpcGVyTG9vcE1vdmVET00gPSB0cnVlO1xuICAgICAgc2xpZGVzRWwucHJlcGVuZChzbGlkZXNbaW5kZXhdKTtcbiAgICAgIHNsaWRlc1tpbmRleF0uc3dpcGVyTG9vcE1vdmVET00gPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuICBpZiAoaXNOZXh0KSB7XG4gICAgYXBwZW5kU2xpZGVzSW5kZXhlcy5mb3JFYWNoKGluZGV4ID0+IHtcbiAgICAgIHNsaWRlc1tpbmRleF0uc3dpcGVyTG9vcE1vdmVET00gPSB0cnVlO1xuICAgICAgc2xpZGVzRWwuYXBwZW5kKHNsaWRlc1tpbmRleF0pO1xuICAgICAgc2xpZGVzW2luZGV4XS5zd2lwZXJMb29wTW92ZURPTSA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG4gIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycpIHtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gIH0gZWxzZSBpZiAoZ3JpZEVuYWJsZWQgJiYgKHByZXBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aCA+IDAgJiYgaXNQcmV2IHx8IGFwcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoID4gMCAmJiBpc05leHQpKSB7XG4gICAgc3dpcGVyLnNsaWRlcy5mb3JFYWNoKChzbGlkZSwgc2xpZGVJbmRleCkgPT4ge1xuICAgICAgc3dpcGVyLmdyaWQudXBkYXRlU2xpZGUoc2xpZGVJbmRleCwgc2xpZGUsIHN3aXBlci5zbGlkZXMpO1xuICAgIH0pO1xuICB9XG4gIGlmIChwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcykge1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNPZmZzZXQoKTtcbiAgfVxuICBpZiAoc2xpZGVUbykge1xuICAgIGlmIChwcmVwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGggPiAwICYmIGlzUHJldikge1xuICAgICAgaWYgKHR5cGVvZiBzbGlkZVJlYWxJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlVHJhbnNsYXRlID0gc3dpcGVyLnNsaWRlc0dyaWRbYWN0aXZlSW5kZXhdO1xuICAgICAgICBjb25zdCBuZXdTbGlkZVRyYW5zbGF0ZSA9IHN3aXBlci5zbGlkZXNHcmlkW2FjdGl2ZUluZGV4ICsgc2xpZGVzUHJlcGVuZGVkXTtcbiAgICAgICAgY29uc3QgZGlmZiA9IG5ld1NsaWRlVHJhbnNsYXRlIC0gY3VycmVudFNsaWRlVHJhbnNsYXRlO1xuICAgICAgICBpZiAoYnlNb3VzZXdoZWVsKSB7XG4gICAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShzd2lwZXIudHJhbnNsYXRlIC0gZGlmZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oYWN0aXZlSW5kZXggKyBzbGlkZXNQcmVwZW5kZWQsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICBpZiAoc2V0VHJhbnNsYXRlKSB7XG4gICAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEYXRhLnN0YXJ0VHJhbnNsYXRlID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5zdGFydFRyYW5zbGF0ZSAtIGRpZmY7XG4gICAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhLmN1cnJlbnRUcmFuc2xhdGUgLSBkaWZmO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHNldFRyYW5zbGF0ZSkge1xuICAgICAgICAgIGNvbnN0IHNoaWZ0ID0gZ3JpZEVuYWJsZWQgPyBwcmVwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGggLyBwYXJhbXMuZ3JpZC5yb3dzIDogcHJlcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoO1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCArIHNoaWZ0LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5jdXJyZW50VHJhbnNsYXRlID0gc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoYXBwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGggPiAwICYmIGlzTmV4dCkge1xuICAgICAgaWYgKHR5cGVvZiBzbGlkZVJlYWxJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgY29uc3QgY3VycmVudFNsaWRlVHJhbnNsYXRlID0gc3dpcGVyLnNsaWRlc0dyaWRbYWN0aXZlSW5kZXhdO1xuICAgICAgICBjb25zdCBuZXdTbGlkZVRyYW5zbGF0ZSA9IHN3aXBlci5zbGlkZXNHcmlkW2FjdGl2ZUluZGV4IC0gc2xpZGVzQXBwZW5kZWRdO1xuICAgICAgICBjb25zdCBkaWZmID0gbmV3U2xpZGVUcmFuc2xhdGUgLSBjdXJyZW50U2xpZGVUcmFuc2xhdGU7XG4gICAgICAgIGlmIChieU1vdXNld2hlZWwpIHtcbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHN3aXBlci50cmFuc2xhdGUgLSBkaWZmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhhY3RpdmVJbmRleCAtIHNsaWRlc0FwcGVuZGVkLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgaWYgKHNldFRyYW5zbGF0ZSkge1xuICAgICAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5zdGFydFRyYW5zbGF0ZSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGEuc3RhcnRUcmFuc2xhdGUgLSBkaWZmO1xuICAgICAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5jdXJyZW50VHJhbnNsYXRlID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5jdXJyZW50VHJhbnNsYXRlIC0gZGlmZjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHNoaWZ0ID0gZ3JpZEVuYWJsZWQgPyBhcHBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aCAvIHBhcmFtcy5ncmlkLnJvd3MgOiBhcHBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aDtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4IC0gc2hpZnQsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gYWxsb3dTbGlkZVByZXY7XG4gIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IGFsbG93U2xpZGVOZXh0O1xuICBpZiAoc3dpcGVyLmNvbnRyb2xsZXIgJiYgc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCAmJiAhYnlDb250cm9sbGVyKSB7XG4gICAgY29uc3QgbG9vcFBhcmFtcyA9IHtcbiAgICAgIHNsaWRlUmVhbEluZGV4LFxuICAgICAgZGlyZWN0aW9uLFxuICAgICAgc2V0VHJhbnNsYXRlLFxuICAgICAgYWN0aXZlU2xpZGVJbmRleCxcbiAgICAgIGJ5Q29udHJvbGxlcjogdHJ1ZVxuICAgIH07XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCkpIHtcbiAgICAgIHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wuZm9yRWFjaChjID0+IHtcbiAgICAgICAgaWYgKCFjLmRlc3Ryb3llZCAmJiBjLnBhcmFtcy5sb29wKSBjLmxvb3BGaXgoe1xuICAgICAgICAgIC4uLmxvb3BQYXJhbXMsXG4gICAgICAgICAgc2xpZGVUbzogYy5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gcGFyYW1zLnNsaWRlc1BlclZpZXcgPyBzbGlkZVRvIDogZmFsc2VcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wgaW5zdGFuY2VvZiBzd2lwZXIuY29uc3RydWN0b3IgJiYgc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbC5wYXJhbXMubG9vcCkge1xuICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbC5sb29wRml4KHtcbiAgICAgICAgLi4ubG9vcFBhcmFtcyxcbiAgICAgICAgc2xpZGVUbzogc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbC5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gcGFyYW1zLnNsaWRlc1BlclZpZXcgPyBzbGlkZVRvIDogZmFsc2VcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBzd2lwZXIuZW1pdCgnbG9vcEZpeCcpO1xufVxuXG5mdW5jdGlvbiBsb29wRGVzdHJveSgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBzbGlkZXNFbFxuICB9ID0gc3dpcGVyO1xuICBpZiAoIXBhcmFtcy5sb29wIHx8IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSByZXR1cm47XG4gIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgY29uc3QgbmV3U2xpZGVzT3JkZXIgPSBbXTtcbiAgc3dpcGVyLnNsaWRlcy5mb3JFYWNoKHNsaWRlRWwgPT4ge1xuICAgIGNvbnN0IGluZGV4ID0gdHlwZW9mIHNsaWRlRWwuc3dpcGVyU2xpZGVJbmRleCA9PT0gJ3VuZGVmaW5lZCcgPyBzbGlkZUVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSAqIDEgOiBzbGlkZUVsLnN3aXBlclNsaWRlSW5kZXg7XG4gICAgbmV3U2xpZGVzT3JkZXJbaW5kZXhdID0gc2xpZGVFbDtcbiAgfSk7XG4gIHN3aXBlci5zbGlkZXMuZm9yRWFjaChzbGlkZUVsID0+IHtcbiAgICBzbGlkZUVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcbiAgfSk7XG4gIG5ld1NsaWRlc09yZGVyLmZvckVhY2goc2xpZGVFbCA9PiB7XG4gICAgc2xpZGVzRWwuYXBwZW5kKHNsaWRlRWwpO1xuICB9KTtcbiAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIucmVhbEluZGV4LCAwKTtcbn1cblxudmFyIGxvb3AgPSB7XG4gIGxvb3BDcmVhdGUsXG4gIGxvb3BGaXgsXG4gIGxvb3BEZXN0cm95XG59O1xuXG5mdW5jdGlvbiBzZXRHcmFiQ3Vyc29yKG1vdmluZykge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoIXN3aXBlci5wYXJhbXMuc2ltdWxhdGVUb3VjaCB8fCBzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmlzTG9ja2VkIHx8IHN3aXBlci5wYXJhbXMuY3NzTW9kZSkgcmV0dXJuO1xuICBjb25zdCBlbCA9IHN3aXBlci5wYXJhbXMudG91Y2hFdmVudHNUYXJnZXQgPT09ICdjb250YWluZXInID8gc3dpcGVyLmVsIDogc3dpcGVyLndyYXBwZXJFbDtcbiAgaWYgKHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICBzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXyA9IHRydWU7XG4gIH1cbiAgZWwuc3R5bGUuY3Vyc29yID0gJ21vdmUnO1xuICBlbC5zdHlsZS5jdXJzb3IgPSBtb3ZpbmcgPyAnZ3JhYmJpbmcnIDogJ2dyYWInO1xuICBpZiAoc3dpcGVyLmlzRWxlbWVudCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXyA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVuc2V0R3JhYkN1cnNvcigpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuaXNMb2NrZWQgfHwgc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18gPSB0cnVlO1xuICB9XG4gIHN3aXBlcltzd2lwZXIucGFyYW1zLnRvdWNoRXZlbnRzVGFyZ2V0ID09PSAnY29udGFpbmVyJyA/ICdlbCcgOiAnd3JhcHBlckVsJ10uc3R5bGUuY3Vyc29yID0gJyc7XG4gIGlmIChzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbn1cblxudmFyIGdyYWJDdXJzb3IgPSB7XG4gIHNldEdyYWJDdXJzb3IsXG4gIHVuc2V0R3JhYkN1cnNvclxufTtcblxuLy8gTW9kaWZpZWQgZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy81NDUyMDU1NC9jdXN0b20tZWxlbWVudC1nZXRyb290bm9kZS1jbG9zZXN0LWZ1bmN0aW9uLWNyb3NzaW5nLW11bHRpcGxlLXBhcmVudC1zaGFkb3dkXG5mdW5jdGlvbiBjbG9zZXN0RWxlbWVudChzZWxlY3RvciwgYmFzZSkge1xuICBpZiAoYmFzZSA9PT0gdm9pZCAwKSB7XG4gICAgYmFzZSA9IHRoaXM7XG4gIH1cbiAgZnVuY3Rpb24gX19jbG9zZXN0RnJvbShlbCkge1xuICAgIGlmICghZWwgfHwgZWwgPT09IGdldERvY3VtZW50KCkgfHwgZWwgPT09IGdldFdpbmRvdygpKSByZXR1cm4gbnVsbDtcbiAgICBpZiAoZWwuYXNzaWduZWRTbG90KSBlbCA9IGVsLmFzc2lnbmVkU2xvdDtcbiAgICBjb25zdCBmb3VuZCA9IGVsLmNsb3Nlc3Qoc2VsZWN0b3IpO1xuICAgIGlmICghZm91bmQgJiYgIWVsLmdldFJvb3ROb2RlKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIGZvdW5kIHx8IF9fY2xvc2VzdEZyb20oZWwuZ2V0Um9vdE5vZGUoKS5ob3N0KTtcbiAgfVxuICByZXR1cm4gX19jbG9zZXN0RnJvbShiYXNlKTtcbn1cbmZ1bmN0aW9uIHByZXZlbnRFZGdlU3dpcGUoc3dpcGVyLCBldmVudCwgc3RhcnRYKSB7XG4gIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICBjb25zdCB7XG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IGVkZ2VTd2lwZURldGVjdGlvbiA9IHBhcmFtcy5lZGdlU3dpcGVEZXRlY3Rpb247XG4gIGNvbnN0IGVkZ2VTd2lwZVRocmVzaG9sZCA9IHBhcmFtcy5lZGdlU3dpcGVUaHJlc2hvbGQ7XG4gIGlmIChlZGdlU3dpcGVEZXRlY3Rpb24gJiYgKHN0YXJ0WCA8PSBlZGdlU3dpcGVUaHJlc2hvbGQgfHwgc3RhcnRYID49IHdpbmRvdy5pbm5lcldpZHRoIC0gZWRnZVN3aXBlVGhyZXNob2xkKSkge1xuICAgIGlmIChlZGdlU3dpcGVEZXRlY3Rpb24gPT09ICdwcmV2ZW50Jykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5mdW5jdGlvbiBvblRvdWNoU3RhcnQoZXZlbnQpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICBsZXQgZSA9IGV2ZW50O1xuICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICBjb25zdCBkYXRhID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YTtcbiAgaWYgKGUudHlwZSA9PT0gJ3BvaW50ZXJkb3duJykge1xuICAgIGlmIChkYXRhLnBvaW50ZXJJZCAhPT0gbnVsbCAmJiBkYXRhLnBvaW50ZXJJZCAhPT0gZS5wb2ludGVySWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGF0YS5wb2ludGVySWQgPSBlLnBvaW50ZXJJZDtcbiAgfSBlbHNlIGlmIChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0JyAmJiBlLnRhcmdldFRvdWNoZXMubGVuZ3RoID09PSAxKSB7XG4gICAgZGF0YS50b3VjaElkID0gZS50YXJnZXRUb3VjaGVzWzBdLmlkZW50aWZpZXI7XG4gIH1cbiAgaWYgKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnKSB7XG4gICAgLy8gZG9uJ3QgcHJvY2VlZCB0b3VjaCBldmVudFxuICAgIHByZXZlbnRFZGdlU3dpcGUoc3dpcGVyLCBlLCBlLnRhcmdldFRvdWNoZXNbMF0ucGFnZVgpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHRvdWNoZXMsXG4gICAgZW5hYmxlZFxuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVuYWJsZWQpIHJldHVybjtcbiAgaWYgKCFwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiBlLnBvaW50ZXJUeXBlID09PSAnbW91c2UnKSByZXR1cm47XG4gIGlmIChzd2lwZXIuYW5pbWF0aW5nICYmIHBhcmFtcy5wcmV2ZW50SW50ZXJhY3Rpb25PblRyYW5zaXRpb24pIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFzd2lwZXIuYW5pbWF0aW5nICYmIHBhcmFtcy5jc3NNb2RlICYmIHBhcmFtcy5sb29wKSB7XG4gICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgfVxuICBsZXQgdGFyZ2V0RWwgPSBlLnRhcmdldDtcbiAgaWYgKHBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gJ3dyYXBwZXInKSB7XG4gICAgaWYgKCFzd2lwZXIud3JhcHBlckVsLmNvbnRhaW5zKHRhcmdldEVsKSkgcmV0dXJuO1xuICB9XG4gIGlmICgnd2hpY2gnIGluIGUgJiYgZS53aGljaCA9PT0gMykgcmV0dXJuO1xuICBpZiAoJ2J1dHRvbicgaW4gZSAmJiBlLmJ1dHRvbiA+IDApIHJldHVybjtcbiAgaWYgKGRhdGEuaXNUb3VjaGVkICYmIGRhdGEuaXNNb3ZlZCkgcmV0dXJuO1xuXG4gIC8vIGNoYW5nZSB0YXJnZXQgZWwgZm9yIHNoYWRvdyByb290IGNvbXBvbmVudFxuICBjb25zdCBzd2lwaW5nQ2xhc3NIYXNWYWx1ZSA9ICEhcGFyYW1zLm5vU3dpcGluZ0NsYXNzICYmIHBhcmFtcy5ub1N3aXBpbmdDbGFzcyAhPT0gJyc7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBjb25zdCBldmVudFBhdGggPSBlLmNvbXBvc2VkUGF0aCA/IGUuY29tcG9zZWRQYXRoKCkgOiBlLnBhdGg7XG4gIGlmIChzd2lwaW5nQ2xhc3NIYXNWYWx1ZSAmJiBlLnRhcmdldCAmJiBlLnRhcmdldC5zaGFkb3dSb290ICYmIGV2ZW50UGF0aCkge1xuICAgIHRhcmdldEVsID0gZXZlbnRQYXRoWzBdO1xuICB9XG4gIGNvbnN0IG5vU3dpcGluZ1NlbGVjdG9yID0gcGFyYW1zLm5vU3dpcGluZ1NlbGVjdG9yID8gcGFyYW1zLm5vU3dpcGluZ1NlbGVjdG9yIDogYC4ke3BhcmFtcy5ub1N3aXBpbmdDbGFzc31gO1xuICBjb25zdCBpc1RhcmdldFNoYWRvdyA9ICEhKGUudGFyZ2V0ICYmIGUudGFyZ2V0LnNoYWRvd1Jvb3QpO1xuXG4gIC8vIHVzZSBjbG9zZXN0RWxlbWVudCBmb3Igc2hhZG93IHJvb3QgZWxlbWVudCB0byBnZXQgdGhlIGFjdHVhbCBjbG9zZXN0IGZvciBuZXN0ZWQgc2hhZG93IHJvb3QgZWxlbWVudFxuICBpZiAocGFyYW1zLm5vU3dpcGluZyAmJiAoaXNUYXJnZXRTaGFkb3cgPyBjbG9zZXN0RWxlbWVudChub1N3aXBpbmdTZWxlY3RvciwgdGFyZ2V0RWwpIDogdGFyZ2V0RWwuY2xvc2VzdChub1N3aXBpbmdTZWxlY3RvcikpKSB7XG4gICAgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGFyYW1zLnN3aXBlSGFuZGxlcikge1xuICAgIGlmICghdGFyZ2V0RWwuY2xvc2VzdChwYXJhbXMuc3dpcGVIYW5kbGVyKSkgcmV0dXJuO1xuICB9XG4gIHRvdWNoZXMuY3VycmVudFggPSBlLnBhZ2VYO1xuICB0b3VjaGVzLmN1cnJlbnRZID0gZS5wYWdlWTtcbiAgY29uc3Qgc3RhcnRYID0gdG91Y2hlcy5jdXJyZW50WDtcbiAgY29uc3Qgc3RhcnRZID0gdG91Y2hlcy5jdXJyZW50WTtcblxuICAvLyBEbyBOT1Qgc3RhcnQgaWYgaU9TIGVkZ2Ugc3dpcGUgaXMgZGV0ZWN0ZWQuIE90aGVyd2lzZSBpT1MgYXBwIGNhbm5vdCBzd2lwZS10by1nby1iYWNrIGFueW1vcmVcblxuICBpZiAoIXByZXZlbnRFZGdlU3dpcGUoc3dpcGVyLCBlLCBzdGFydFgpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIE9iamVjdC5hc3NpZ24oZGF0YSwge1xuICAgIGlzVG91Y2hlZDogdHJ1ZSxcbiAgICBpc01vdmVkOiBmYWxzZSxcbiAgICBhbGxvd1RvdWNoQ2FsbGJhY2tzOiB0cnVlLFxuICAgIGlzU2Nyb2xsaW5nOiB1bmRlZmluZWQsXG4gICAgc3RhcnRNb3Zpbmc6IHVuZGVmaW5lZFxuICB9KTtcbiAgdG91Y2hlcy5zdGFydFggPSBzdGFydFg7XG4gIHRvdWNoZXMuc3RhcnRZID0gc3RhcnRZO1xuICBkYXRhLnRvdWNoU3RhcnRUaW1lID0gbm93KCk7XG4gIHN3aXBlci5hbGxvd0NsaWNrID0gdHJ1ZTtcbiAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcbiAgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID0gdW5kZWZpbmVkO1xuICBpZiAocGFyYW1zLnRocmVzaG9sZCA+IDApIGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlID0gZmFsc2U7XG4gIGxldCBwcmV2ZW50RGVmYXVsdCA9IHRydWU7XG4gIGlmICh0YXJnZXRFbC5tYXRjaGVzKGRhdGEuZm9jdXNhYmxlRWxlbWVudHMpKSB7XG4gICAgcHJldmVudERlZmF1bHQgPSBmYWxzZTtcbiAgICBpZiAodGFyZ2V0RWwubm9kZU5hbWUgPT09ICdTRUxFQ1QnKSB7XG4gICAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50Lm1hdGNoZXMoZGF0YS5mb2N1c2FibGVFbGVtZW50cykgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAhPT0gdGFyZ2V0RWwpIHtcbiAgICBkb2N1bWVudC5hY3RpdmVFbGVtZW50LmJsdXIoKTtcbiAgfVxuICBjb25zdCBzaG91bGRQcmV2ZW50RGVmYXVsdCA9IHByZXZlbnREZWZhdWx0ICYmIHN3aXBlci5hbGxvd1RvdWNoTW92ZSAmJiBwYXJhbXMudG91Y2hTdGFydFByZXZlbnREZWZhdWx0O1xuICBpZiAoKHBhcmFtcy50b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdCB8fCBzaG91bGRQcmV2ZW50RGVmYXVsdCkgJiYgIXRhcmdldEVsLmlzQ29udGVudEVkaXRhYmxlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGlmIChwYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQgJiYgc3dpcGVyLmZyZWVNb2RlICYmIHN3aXBlci5hbmltYXRpbmcgJiYgIXBhcmFtcy5jc3NNb2RlKSB7XG4gICAgc3dpcGVyLmZyZWVNb2RlLm9uVG91Y2hTdGFydCgpO1xuICB9XG4gIHN3aXBlci5lbWl0KCd0b3VjaFN0YXJ0JywgZSk7XG59XG5cbmZ1bmN0aW9uIG9uVG91Y2hNb3ZlKGV2ZW50KSB7XG4gIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgdG91Y2hlcyxcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICBlbmFibGVkXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZW5hYmxlZCkgcmV0dXJuO1xuICBpZiAoIXBhcmFtcy5zaW11bGF0ZVRvdWNoICYmIGV2ZW50LnBvaW50ZXJUeXBlID09PSAnbW91c2UnKSByZXR1cm47XG4gIGxldCBlID0gZXZlbnQ7XG4gIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gIGlmIChlLnR5cGUgPT09ICdwb2ludGVybW92ZScpIHtcbiAgICBpZiAoZGF0YS50b3VjaElkICE9PSBudWxsKSByZXR1cm47IC8vIHJldHVybiBmcm9tIHBvaW50ZXIgaWYgd2UgdXNlIHRvdWNoXG4gICAgY29uc3QgaWQgPSBlLnBvaW50ZXJJZDtcbiAgICBpZiAoaWQgIT09IGRhdGEucG9pbnRlcklkKSByZXR1cm47XG4gIH1cbiAgbGV0IHRhcmdldFRvdWNoO1xuICBpZiAoZS50eXBlID09PSAndG91Y2htb3ZlJykge1xuICAgIHRhcmdldFRvdWNoID0gWy4uLmUuY2hhbmdlZFRvdWNoZXNdLmZpbHRlcih0ID0+IHQuaWRlbnRpZmllciA9PT0gZGF0YS50b3VjaElkKVswXTtcbiAgICBpZiAoIXRhcmdldFRvdWNoIHx8IHRhcmdldFRvdWNoLmlkZW50aWZpZXIgIT09IGRhdGEudG91Y2hJZCkgcmV0dXJuO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldFRvdWNoID0gZTtcbiAgfVxuICBpZiAoIWRhdGEuaXNUb3VjaGVkKSB7XG4gICAgaWYgKGRhdGEuc3RhcnRNb3ZpbmcgJiYgZGF0YS5pc1Njcm9sbGluZykge1xuICAgICAgc3dpcGVyLmVtaXQoJ3RvdWNoTW92ZU9wcG9zaXRlJywgZSk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBwYWdlWCA9IHRhcmdldFRvdWNoLnBhZ2VYO1xuICBjb25zdCBwYWdlWSA9IHRhcmdldFRvdWNoLnBhZ2VZO1xuICBpZiAoZS5wcmV2ZW50ZWRCeU5lc3RlZFN3aXBlcikge1xuICAgIHRvdWNoZXMuc3RhcnRYID0gcGFnZVg7XG4gICAgdG91Y2hlcy5zdGFydFkgPSBwYWdlWTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFzd2lwZXIuYWxsb3dUb3VjaE1vdmUpIHtcbiAgICBpZiAoIWUudGFyZ2V0Lm1hdGNoZXMoZGF0YS5mb2N1c2FibGVFbGVtZW50cykpIHtcbiAgICAgIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XG4gICAgfVxuICAgIGlmIChkYXRhLmlzVG91Y2hlZCkge1xuICAgICAgT2JqZWN0LmFzc2lnbih0b3VjaGVzLCB7XG4gICAgICAgIHN0YXJ0WDogcGFnZVgsXG4gICAgICAgIHN0YXJ0WTogcGFnZVksXG4gICAgICAgIGN1cnJlbnRYOiBwYWdlWCxcbiAgICAgICAgY3VycmVudFk6IHBhZ2VZXG4gICAgICB9KTtcbiAgICAgIGRhdGEudG91Y2hTdGFydFRpbWUgPSBub3coKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcyAmJiAhcGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoc3dpcGVyLmlzVmVydGljYWwoKSkge1xuICAgICAgLy8gVmVydGljYWxcbiAgICAgIGlmIChwYWdlWSA8IHRvdWNoZXMuc3RhcnRZICYmIHN3aXBlci50cmFuc2xhdGUgPD0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIHx8IHBhZ2VZID4gdG91Y2hlcy5zdGFydFkgJiYgc3dpcGVyLnRyYW5zbGF0ZSA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHBhZ2VYIDwgdG91Y2hlcy5zdGFydFggJiYgc3dpcGVyLnRyYW5zbGF0ZSA8PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgfHwgcGFnZVggPiB0b3VjaGVzLnN0YXJ0WCAmJiBzd2lwZXIudHJhbnNsYXRlID49IHN3aXBlci5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkge1xuICAgIGlmIChlLnRhcmdldCA9PT0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCAmJiBlLnRhcmdldC5tYXRjaGVzKGRhdGEuZm9jdXNhYmxlRWxlbWVudHMpKSB7XG4gICAgICBkYXRhLmlzTW92ZWQgPSB0cnVlO1xuICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaWYgKGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcykge1xuICAgIHN3aXBlci5lbWl0KCd0b3VjaE1vdmUnLCBlKTtcbiAgfVxuICB0b3VjaGVzLnByZXZpb3VzWCA9IHRvdWNoZXMuY3VycmVudFg7XG4gIHRvdWNoZXMucHJldmlvdXNZID0gdG91Y2hlcy5jdXJyZW50WTtcbiAgdG91Y2hlcy5jdXJyZW50WCA9IHBhZ2VYO1xuICB0b3VjaGVzLmN1cnJlbnRZID0gcGFnZVk7XG4gIGNvbnN0IGRpZmZYID0gdG91Y2hlcy5jdXJyZW50WCAtIHRvdWNoZXMuc3RhcnRYO1xuICBjb25zdCBkaWZmWSA9IHRvdWNoZXMuY3VycmVudFkgLSB0b3VjaGVzLnN0YXJ0WTtcbiAgaWYgKHN3aXBlci5wYXJhbXMudGhyZXNob2xkICYmIE1hdGguc3FydChkaWZmWCAqKiAyICsgZGlmZlkgKiogMikgPCBzd2lwZXIucGFyYW1zLnRocmVzaG9sZCkgcmV0dXJuO1xuICBpZiAodHlwZW9mIGRhdGEuaXNTY3JvbGxpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgbGV0IHRvdWNoQW5nbGU7XG4gICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSAmJiB0b3VjaGVzLmN1cnJlbnRZID09PSB0b3VjaGVzLnN0YXJ0WSB8fCBzd2lwZXIuaXNWZXJ0aWNhbCgpICYmIHRvdWNoZXMuY3VycmVudFggPT09IHRvdWNoZXMuc3RhcnRYKSB7XG4gICAgICBkYXRhLmlzU2Nyb2xsaW5nID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgaWYgKGRpZmZYICogZGlmZlggKyBkaWZmWSAqIGRpZmZZID49IDI1KSB7XG4gICAgICAgIHRvdWNoQW5nbGUgPSBNYXRoLmF0YW4yKE1hdGguYWJzKGRpZmZZKSwgTWF0aC5hYnMoZGlmZlgpKSAqIDE4MCAvIE1hdGguUEk7XG4gICAgICAgIGRhdGEuaXNTY3JvbGxpbmcgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB0b3VjaEFuZ2xlID4gcGFyYW1zLnRvdWNoQW5nbGUgOiA5MCAtIHRvdWNoQW5nbGUgPiBwYXJhbXMudG91Y2hBbmdsZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGRhdGEuaXNTY3JvbGxpbmcpIHtcbiAgICBzd2lwZXIuZW1pdCgndG91Y2hNb3ZlT3Bwb3NpdGUnLCBlKTtcbiAgfVxuICBpZiAodHlwZW9mIGRhdGEuc3RhcnRNb3ZpbmcgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKHRvdWNoZXMuY3VycmVudFggIT09IHRvdWNoZXMuc3RhcnRYIHx8IHRvdWNoZXMuY3VycmVudFkgIT09IHRvdWNoZXMuc3RhcnRZKSB7XG4gICAgICBkYXRhLnN0YXJ0TW92aW5nID0gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYgKGRhdGEuaXNTY3JvbGxpbmcpIHtcbiAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIWRhdGEuc3RhcnRNb3ZpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgaWYgKCFwYXJhbXMuY3NzTW9kZSAmJiBlLmNhbmNlbGFibGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaWYgKHBhcmFtcy50b3VjaE1vdmVTdG9wUHJvcGFnYXRpb24gJiYgIXBhcmFtcy5uZXN0ZWQpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG4gIGxldCBkaWZmID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gZGlmZlggOiBkaWZmWTtcbiAgbGV0IHRvdWNoZXNEaWZmID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gdG91Y2hlcy5jdXJyZW50WCAtIHRvdWNoZXMucHJldmlvdXNYIDogdG91Y2hlcy5jdXJyZW50WSAtIHRvdWNoZXMucHJldmlvdXNZO1xuICBpZiAocGFyYW1zLm9uZVdheU1vdmVtZW50KSB7XG4gICAgZGlmZiA9IE1hdGguYWJzKGRpZmYpICogKHJ0bCA/IDEgOiAtMSk7XG4gICAgdG91Y2hlc0RpZmYgPSBNYXRoLmFicyh0b3VjaGVzRGlmZikgKiAocnRsID8gMSA6IC0xKTtcbiAgfVxuICB0b3VjaGVzLmRpZmYgPSBkaWZmO1xuICBkaWZmICo9IHBhcmFtcy50b3VjaFJhdGlvO1xuICBpZiAocnRsKSB7XG4gICAgZGlmZiA9IC1kaWZmO1xuICAgIHRvdWNoZXNEaWZmID0gLXRvdWNoZXNEaWZmO1xuICB9XG4gIGNvbnN0IHByZXZUb3VjaGVzRGlyZWN0aW9uID0gc3dpcGVyLnRvdWNoZXNEaXJlY3Rpb247XG4gIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9IGRpZmYgPiAwID8gJ3ByZXYnIDogJ25leHQnO1xuICBzd2lwZXIudG91Y2hlc0RpcmVjdGlvbiA9IHRvdWNoZXNEaWZmID4gMCA/ICdwcmV2JyA6ICduZXh0JztcbiAgY29uc3QgaXNMb29wID0gc3dpcGVyLnBhcmFtcy5sb29wICYmICFwYXJhbXMuY3NzTW9kZTtcbiAgY29uc3QgYWxsb3dMb29wRml4ID0gc3dpcGVyLnRvdWNoZXNEaXJlY3Rpb24gPT09ICduZXh0JyAmJiBzd2lwZXIuYWxsb3dTbGlkZU5leHQgfHwgc3dpcGVyLnRvdWNoZXNEaXJlY3Rpb24gPT09ICdwcmV2JyAmJiBzd2lwZXIuYWxsb3dTbGlkZVByZXY7XG4gIGlmICghZGF0YS5pc01vdmVkKSB7XG4gICAgaWYgKGlzTG9vcCAmJiBhbGxvd0xvb3BGaXgpIHtcbiAgICAgIHN3aXBlci5sb29wRml4KHtcbiAgICAgICAgZGlyZWN0aW9uOiBzd2lwZXIuc3dpcGVEaXJlY3Rpb25cbiAgICAgIH0pO1xuICAgIH1cbiAgICBkYXRhLnN0YXJ0VHJhbnNsYXRlID0gc3dpcGVyLmdldFRyYW5zbGF0ZSgpO1xuICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKDApO1xuICAgIGlmIChzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICBjb25zdCBldnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KCd0cmFuc2l0aW9uZW5kJywge1xuICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICB9KTtcbiAgICAgIHN3aXBlci53cmFwcGVyRWwuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgIH1cbiAgICBkYXRhLmFsbG93TW9tZW50dW1Cb3VuY2UgPSBmYWxzZTtcbiAgICAvLyBHcmFiIEN1cnNvclxuICAgIGlmIChwYXJhbXMuZ3JhYkN1cnNvciAmJiAoc3dpcGVyLmFsbG93U2xpZGVOZXh0ID09PSB0cnVlIHx8IHN3aXBlci5hbGxvd1NsaWRlUHJldiA9PT0gdHJ1ZSkpIHtcbiAgICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKHRydWUpO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdCgnc2xpZGVyRmlyc3RNb3ZlJywgZSk7XG4gIH1cbiAgbGV0IGxvb3BGaXhlZDtcbiAgbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGlmIChkYXRhLmlzTW92ZWQgJiYgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgJiYgcHJldlRvdWNoZXNEaXJlY3Rpb24gIT09IHN3aXBlci50b3VjaGVzRGlyZWN0aW9uICYmIGlzTG9vcCAmJiBhbGxvd0xvb3BGaXggJiYgTWF0aC5hYnMoZGlmZikgPj0gMSkge1xuICAgIE9iamVjdC5hc3NpZ24odG91Y2hlcywge1xuICAgICAgc3RhcnRYOiBwYWdlWCxcbiAgICAgIHN0YXJ0WTogcGFnZVksXG4gICAgICBjdXJyZW50WDogcGFnZVgsXG4gICAgICBjdXJyZW50WTogcGFnZVksXG4gICAgICBzdGFydFRyYW5zbGF0ZTogZGF0YS5jdXJyZW50VHJhbnNsYXRlXG4gICAgfSk7XG4gICAgZGF0YS5sb29wU3dhcFJlc2V0ID0gdHJ1ZTtcbiAgICBkYXRhLnN0YXJ0VHJhbnNsYXRlID0gZGF0YS5jdXJyZW50VHJhbnNsYXRlO1xuICAgIHJldHVybjtcbiAgfVxuICBzd2lwZXIuZW1pdCgnc2xpZGVyTW92ZScsIGUpO1xuICBkYXRhLmlzTW92ZWQgPSB0cnVlO1xuICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkaWZmICsgZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgbGV0IGRpc2FibGVQYXJlbnRTd2lwZXIgPSB0cnVlO1xuICBsZXQgcmVzaXN0YW5jZVJhdGlvID0gcGFyYW1zLnJlc2lzdGFuY2VSYXRpbztcbiAgaWYgKHBhcmFtcy50b3VjaFJlbGVhc2VPbkVkZ2VzKSB7XG4gICAgcmVzaXN0YW5jZVJhdGlvID0gMDtcbiAgfVxuICBpZiAoZGlmZiA+IDApIHtcbiAgICBpZiAoaXNMb29wICYmIGFsbG93TG9vcEZpeCAmJiAhbG9vcEZpeGVkICYmIGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA+IChwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIubWluVHJhbnNsYXRlKCkgLSBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW3N3aXBlci5hY3RpdmVJbmRleCArIDFdIDogc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSkge1xuICAgICAgc3dpcGVyLmxvb3BGaXgoe1xuICAgICAgICBkaXJlY3Rpb246ICdwcmV2JyxcbiAgICAgICAgc2V0VHJhbnNsYXRlOiB0cnVlLFxuICAgICAgICBhY3RpdmVTbGlkZUluZGV4OiAwXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGRhdGEuY3VycmVudFRyYW5zbGF0ZSA+IHN3aXBlci5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgZGlzYWJsZVBhcmVudFN3aXBlciA9IGZhbHNlO1xuICAgICAgaWYgKHBhcmFtcy5yZXNpc3RhbmNlKSB7XG4gICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IHN3aXBlci5taW5UcmFuc2xhdGUoKSAtIDEgKyAoLXN3aXBlci5taW5UcmFuc2xhdGUoKSArIGRhdGEuc3RhcnRUcmFuc2xhdGUgKyBkaWZmKSAqKiByZXNpc3RhbmNlUmF0aW87XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGRpZmYgPCAwKSB7XG4gICAgaWYgKGlzTG9vcCAmJiBhbGxvd0xvb3BGaXggJiYgIWxvb3BGaXhlZCAmJiBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPCAocGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gc3dpcGVyLm1heFRyYW5zbGF0ZSgpICsgc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkLmxlbmd0aCAtIDFdIDogc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSkge1xuICAgICAgc3dpcGVyLmxvb3BGaXgoe1xuICAgICAgICBkaXJlY3Rpb246ICduZXh0JyxcbiAgICAgICAgc2V0VHJhbnNsYXRlOiB0cnVlLFxuICAgICAgICBhY3RpdmVTbGlkZUluZGV4OiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nID8gc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCkgOiBNYXRoLmNlaWwocGFyc2VGbG9hdChwYXJhbXMuc2xpZGVzUGVyVmlldywgMTApKSlcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZGF0YS5jdXJyZW50VHJhbnNsYXRlIDwgc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSB7XG4gICAgICBkaXNhYmxlUGFyZW50U3dpcGVyID0gZmFsc2U7XG4gICAgICBpZiAocGFyYW1zLnJlc2lzdGFuY2UpIHtcbiAgICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpICsgMSAtIChzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBkYXRhLnN0YXJ0VHJhbnNsYXRlIC0gZGlmZikgKiogcmVzaXN0YW5jZVJhdGlvO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoZGlzYWJsZVBhcmVudFN3aXBlcikge1xuICAgIGUucHJldmVudGVkQnlOZXN0ZWRTd2lwZXIgPSB0cnVlO1xuICB9XG5cbiAgLy8gRGlyZWN0aW9ucyBsb2Nrc1xuICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlTmV4dCAmJiBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICduZXh0JyAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPCBkYXRhLnN0YXJ0VHJhbnNsYXRlKSB7XG4gICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgfVxuICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlUHJldiAmJiBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICdwcmV2JyAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPiBkYXRhLnN0YXJ0VHJhbnNsYXRlKSB7XG4gICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgfVxuICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlUHJldiAmJiAhc3dpcGVyLmFsbG93U2xpZGVOZXh0KSB7XG4gICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgfVxuXG4gIC8vIFRocmVzaG9sZFxuICBpZiAocGFyYW1zLnRocmVzaG9sZCA+IDApIHtcbiAgICBpZiAoTWF0aC5hYnMoZGlmZikgPiBwYXJhbXMudGhyZXNob2xkIHx8IGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlKSB7XG4gICAgICBpZiAoIWRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlKSB7XG4gICAgICAgIGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlID0gdHJ1ZTtcbiAgICAgICAgdG91Y2hlcy5zdGFydFggPSB0b3VjaGVzLmN1cnJlbnRYO1xuICAgICAgICB0b3VjaGVzLnN0YXJ0WSA9IHRvdWNoZXMuY3VycmVudFk7XG4gICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gICAgICAgIHRvdWNoZXMuZGlmZiA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHRvdWNoZXMuY3VycmVudFggLSB0b3VjaGVzLnN0YXJ0WCA6IHRvdWNoZXMuY3VycmVudFkgLSB0b3VjaGVzLnN0YXJ0WTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBpZiAoIXBhcmFtcy5mb2xsb3dGaW5nZXIgfHwgcGFyYW1zLmNzc01vZGUpIHJldHVybjtcblxuICAvLyBVcGRhdGUgYWN0aXZlIGluZGV4IGluIGZyZWUgbW9kZVxuICBpZiAocGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkICYmIHN3aXBlci5mcmVlTW9kZSB8fCBwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcykge1xuICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gIH1cbiAgaWYgKHBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCAmJiBzd2lwZXIuZnJlZU1vZGUpIHtcbiAgICBzd2lwZXIuZnJlZU1vZGUub25Ub3VjaE1vdmUoKTtcbiAgfVxuICAvLyBVcGRhdGUgcHJvZ3Jlc3NcbiAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKGRhdGEuY3VycmVudFRyYW5zbGF0ZSk7XG4gIC8vIFVwZGF0ZSB0cmFuc2xhdGVcbiAgc3dpcGVyLnNldFRyYW5zbGF0ZShkYXRhLmN1cnJlbnRUcmFuc2xhdGUpO1xufVxuXG5mdW5jdGlvbiBvblRvdWNoRW5kKGV2ZW50KSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IGRhdGEgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhO1xuICBsZXQgZSA9IGV2ZW50O1xuICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICBsZXQgdGFyZ2V0VG91Y2g7XG4gIGNvbnN0IGlzVG91Y2hFdmVudCA9IGUudHlwZSA9PT0gJ3RvdWNoZW5kJyB8fCBlLnR5cGUgPT09ICd0b3VjaGNhbmNlbCc7XG4gIGlmICghaXNUb3VjaEV2ZW50KSB7XG4gICAgaWYgKGRhdGEudG91Y2hJZCAhPT0gbnVsbCkgcmV0dXJuOyAvLyByZXR1cm4gZnJvbSBwb2ludGVyIGlmIHdlIHVzZSB0b3VjaFxuICAgIGlmIChlLnBvaW50ZXJJZCAhPT0gZGF0YS5wb2ludGVySWQpIHJldHVybjtcbiAgICB0YXJnZXRUb3VjaCA9IGU7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0VG91Y2ggPSBbLi4uZS5jaGFuZ2VkVG91Y2hlc10uZmlsdGVyKHQgPT4gdC5pZGVudGlmaWVyID09PSBkYXRhLnRvdWNoSWQpWzBdO1xuICAgIGlmICghdGFyZ2V0VG91Y2ggfHwgdGFyZ2V0VG91Y2guaWRlbnRpZmllciAhPT0gZGF0YS50b3VjaElkKSByZXR1cm47XG4gIH1cbiAgaWYgKFsncG9pbnRlcmNhbmNlbCcsICdwb2ludGVyb3V0JywgJ3BvaW50ZXJsZWF2ZScsICdjb250ZXh0bWVudSddLmluY2x1ZGVzKGUudHlwZSkpIHtcbiAgICBjb25zdCBwcm9jZWVkID0gWydwb2ludGVyY2FuY2VsJywgJ2NvbnRleHRtZW51J10uaW5jbHVkZXMoZS50eXBlKSAmJiAoc3dpcGVyLmJyb3dzZXIuaXNTYWZhcmkgfHwgc3dpcGVyLmJyb3dzZXIuaXNXZWJWaWV3KTtcbiAgICBpZiAoIXByb2NlZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgZGF0YS5wb2ludGVySWQgPSBudWxsO1xuICBkYXRhLnRvdWNoSWQgPSBudWxsO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHRvdWNoZXMsXG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgc2xpZGVzR3JpZCxcbiAgICBlbmFibGVkXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZW5hYmxlZCkgcmV0dXJuO1xuICBpZiAoIXBhcmFtcy5zaW11bGF0ZVRvdWNoICYmIGUucG9pbnRlclR5cGUgPT09ICdtb3VzZScpIHJldHVybjtcbiAgaWYgKGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcykge1xuICAgIHN3aXBlci5lbWl0KCd0b3VjaEVuZCcsIGUpO1xuICB9XG4gIGRhdGEuYWxsb3dUb3VjaENhbGxiYWNrcyA9IGZhbHNlO1xuICBpZiAoIWRhdGEuaXNUb3VjaGVkKSB7XG4gICAgaWYgKGRhdGEuaXNNb3ZlZCAmJiBwYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoZmFsc2UpO1xuICAgIH1cbiAgICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgICBkYXRhLnN0YXJ0TW92aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gUmV0dXJuIEdyYWIgQ3Vyc29yXG4gIGlmIChwYXJhbXMuZ3JhYkN1cnNvciAmJiBkYXRhLmlzTW92ZWQgJiYgZGF0YS5pc1RvdWNoZWQgJiYgKHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9PT0gdHJ1ZSB8fCBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPT09IHRydWUpKSB7XG4gICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoZmFsc2UpO1xuICB9XG5cbiAgLy8gVGltZSBkaWZmXG4gIGNvbnN0IHRvdWNoRW5kVGltZSA9IG5vdygpO1xuICBjb25zdCB0aW1lRGlmZiA9IHRvdWNoRW5kVGltZSAtIGRhdGEudG91Y2hTdGFydFRpbWU7XG5cbiAgLy8gVGFwLCBkb3VibGVUYXAsIENsaWNrXG4gIGlmIChzd2lwZXIuYWxsb3dDbGljaykge1xuICAgIGNvbnN0IHBhdGhUcmVlID0gZS5wYXRoIHx8IGUuY29tcG9zZWRQYXRoICYmIGUuY29tcG9zZWRQYXRoKCk7XG4gICAgc3dpcGVyLnVwZGF0ZUNsaWNrZWRTbGlkZShwYXRoVHJlZSAmJiBwYXRoVHJlZVswXSB8fCBlLnRhcmdldCwgcGF0aFRyZWUpO1xuICAgIHN3aXBlci5lbWl0KCd0YXAgY2xpY2snLCBlKTtcbiAgICBpZiAodGltZURpZmYgPCAzMDAgJiYgdG91Y2hFbmRUaW1lIC0gZGF0YS5sYXN0Q2xpY2tUaW1lIDwgMzAwKSB7XG4gICAgICBzd2lwZXIuZW1pdCgnZG91YmxlVGFwIGRvdWJsZUNsaWNrJywgZSk7XG4gICAgfVxuICB9XG4gIGRhdGEubGFzdENsaWNrVGltZSA9IG5vdygpO1xuICBuZXh0VGljaygoKSA9PiB7XG4gICAgaWYgKCFzd2lwZXIuZGVzdHJveWVkKSBzd2lwZXIuYWxsb3dDbGljayA9IHRydWU7XG4gIH0pO1xuICBpZiAoIWRhdGEuaXNUb3VjaGVkIHx8ICFkYXRhLmlzTW92ZWQgfHwgIXN3aXBlci5zd2lwZURpcmVjdGlvbiB8fCB0b3VjaGVzLmRpZmYgPT09IDAgJiYgIWRhdGEubG9vcFN3YXBSZXNldCB8fCBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPT09IGRhdGEuc3RhcnRUcmFuc2xhdGUgJiYgIWRhdGEubG9vcFN3YXBSZXNldCkge1xuICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gICAgZGF0YS5zdGFydE1vdmluZyA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgZGF0YS5zdGFydE1vdmluZyA9IGZhbHNlO1xuICBsZXQgY3VycmVudFBvcztcbiAgaWYgKHBhcmFtcy5mb2xsb3dGaW5nZXIpIHtcbiAgICBjdXJyZW50UG9zID0gcnRsID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuICB9IGVsc2Uge1xuICAgIGN1cnJlbnRQb3MgPSAtZGF0YS5jdXJyZW50VHJhbnNsYXRlO1xuICB9XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkKSB7XG4gICAgc3dpcGVyLmZyZWVNb2RlLm9uVG91Y2hFbmQoe1xuICAgICAgY3VycmVudFBvc1xuICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZpbmQgY3VycmVudCBzbGlkZVxuICBsZXQgc3RvcEluZGV4ID0gMDtcbiAgbGV0IGdyb3VwU2l6ZSA9IHN3aXBlci5zbGlkZXNTaXplc0dyaWRbMF07XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzR3JpZC5sZW5ndGg7IGkgKz0gaSA8IHBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAgPyAxIDogcGFyYW1zLnNsaWRlc1Blckdyb3VwKSB7XG4gICAgY29uc3QgaW5jcmVtZW50ID0gaSA8IHBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAgLSAxID8gMSA6IHBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICBpZiAodHlwZW9mIHNsaWRlc0dyaWRbaSArIGluY3JlbWVudF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAoY3VycmVudFBvcyA+PSBzbGlkZXNHcmlkW2ldICYmIGN1cnJlbnRQb3MgPCBzbGlkZXNHcmlkW2kgKyBpbmNyZW1lbnRdKSB7XG4gICAgICAgIHN0b3BJbmRleCA9IGk7XG4gICAgICAgIGdyb3VwU2l6ZSA9IHNsaWRlc0dyaWRbaSArIGluY3JlbWVudF0gLSBzbGlkZXNHcmlkW2ldO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoY3VycmVudFBvcyA+PSBzbGlkZXNHcmlkW2ldKSB7XG4gICAgICBzdG9wSW5kZXggPSBpO1xuICAgICAgZ3JvdXBTaXplID0gc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDFdIC0gc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDJdO1xuICAgIH1cbiAgfVxuICBsZXQgcmV3aW5kRmlyc3RJbmRleCA9IG51bGw7XG4gIGxldCByZXdpbmRMYXN0SW5kZXggPSBudWxsO1xuICBpZiAocGFyYW1zLnJld2luZCkge1xuICAgIGlmIChzd2lwZXIuaXNCZWdpbm5pbmcpIHtcbiAgICAgIHJld2luZExhc3RJbmRleCA9IHBhcmFtcy52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgJiYgc3dpcGVyLnZpcnR1YWwgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIC0gMSA6IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMTtcbiAgICB9IGVsc2UgaWYgKHN3aXBlci5pc0VuZCkge1xuICAgICAgcmV3aW5kRmlyc3RJbmRleCA9IDA7XG4gICAgfVxuICB9XG4gIC8vIEZpbmQgY3VycmVudCBzbGlkZSBzaXplXG4gIGNvbnN0IHJhdGlvID0gKGN1cnJlbnRQb3MgLSBzbGlkZXNHcmlkW3N0b3BJbmRleF0pIC8gZ3JvdXBTaXplO1xuICBjb25zdCBpbmNyZW1lbnQgPSBzdG9wSW5kZXggPCBwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwIC0gMSA/IDEgOiBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gIGlmICh0aW1lRGlmZiA+IHBhcmFtcy5sb25nU3dpcGVzTXMpIHtcbiAgICAvLyBMb25nIHRvdWNoZXNcbiAgICBpZiAoIXBhcmFtcy5sb25nU3dpcGVzKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgIGlmIChyYXRpbyA+PSBwYXJhbXMubG9uZ1N3aXBlc1JhdGlvKSBzd2lwZXIuc2xpZGVUbyhwYXJhbXMucmV3aW5kICYmIHN3aXBlci5pc0VuZCA/IHJld2luZEZpcnN0SW5kZXggOiBzdG9wSW5kZXggKyBpbmNyZW1lbnQpO2Vsc2Ugc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4KTtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XG4gICAgICBpZiAocmF0aW8gPiAxIC0gcGFyYW1zLmxvbmdTd2lwZXNSYXRpbykge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXggKyBpbmNyZW1lbnQpO1xuICAgICAgfSBlbHNlIGlmIChyZXdpbmRMYXN0SW5kZXggIT09IG51bGwgJiYgcmF0aW8gPCAwICYmIE1hdGguYWJzKHJhdGlvKSA+IHBhcmFtcy5sb25nU3dpcGVzUmF0aW8pIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8ocmV3aW5kTGFzdEluZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFNob3J0IHN3aXBlc1xuICAgIGlmICghcGFyYW1zLnNob3J0U3dpcGVzKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBpc05hdkJ1dHRvblRhcmdldCA9IHN3aXBlci5uYXZpZ2F0aW9uICYmIChlLnRhcmdldCA9PT0gc3dpcGVyLm5hdmlnYXRpb24ubmV4dEVsIHx8IGUudGFyZ2V0ID09PSBzd2lwZXIubmF2aWdhdGlvbi5wcmV2RWwpO1xuICAgIGlmICghaXNOYXZCdXR0b25UYXJnZXQpIHtcbiAgICAgIGlmIChzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICduZXh0Jykge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhyZXdpbmRGaXJzdEluZGV4ICE9PSBudWxsID8gcmV3aW5kRmlyc3RJbmRleCA6IHN0b3BJbmRleCArIGluY3JlbWVudCk7XG4gICAgICB9XG4gICAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8ocmV3aW5kTGFzdEluZGV4ICE9PSBudWxsID8gcmV3aW5kTGFzdEluZGV4IDogc3RvcEluZGV4KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0ID09PSBzd2lwZXIubmF2aWdhdGlvbi5uZXh0RWwpIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCArIGluY3JlbWVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG9uUmVzaXplKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIGVsXG4gIH0gPSBzd2lwZXI7XG4gIGlmIChlbCAmJiBlbC5vZmZzZXRXaWR0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIC8vIEJyZWFrcG9pbnRzXG4gIGlmIChwYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICBzd2lwZXIuc2V0QnJlYWtwb2ludCgpO1xuICB9XG5cbiAgLy8gU2F2ZSBsb2Nrc1xuICBjb25zdCB7XG4gICAgYWxsb3dTbGlkZU5leHQsXG4gICAgYWxsb3dTbGlkZVByZXYsXG4gICAgc25hcEdyaWRcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG5cbiAgLy8gRGlzYWJsZSBsb2NrcyBvbiByZXNpemVcbiAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gdHJ1ZTtcbiAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gdHJ1ZTtcbiAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcbiAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICBjb25zdCBpc1ZpcnR1YWxMb29wID0gaXNWaXJ0dWFsICYmIHBhcmFtcy5sb29wO1xuICBpZiAoKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgfHwgcGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSAmJiBzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5pc0JlZ2lubmluZyAmJiAhc3dpcGVyLnBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiAhaXNWaXJ0dWFsTG9vcCkge1xuICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMSwgMCwgZmFsc2UsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3AgJiYgIWlzVmlydHVhbCkge1xuICAgICAgc3dpcGVyLnNsaWRlVG9Mb29wKHN3aXBlci5yZWFsSW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuICB9XG4gIGlmIChzd2lwZXIuYXV0b3BsYXkgJiYgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcgJiYgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCkge1xuICAgIGNsZWFyVGltZW91dChzd2lwZXIuYXV0b3BsYXkucmVzaXplVGltZW91dCk7XG4gICAgc3dpcGVyLmF1dG9wbGF5LnJlc2l6ZVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmIChzd2lwZXIuYXV0b3BsYXkgJiYgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcgJiYgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCkge1xuICAgICAgICBzd2lwZXIuYXV0b3BsYXkucmVzdW1lKCk7XG4gICAgICB9XG4gICAgfSwgNTAwKTtcbiAgfVxuICAvLyBSZXR1cm4gbG9ja3MgYWZ0ZXIgcmVzaXplXG4gIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IGFsbG93U2xpZGVQcmV2O1xuICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSBhbGxvd1NsaWRlTmV4dDtcbiAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzbmFwR3JpZCAhPT0gc3dpcGVyLnNuYXBHcmlkKSB7XG4gICAgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBvbkNsaWNrKGUpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKCFzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICBpZiAoIXN3aXBlci5hbGxvd0NsaWNrKSB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMucHJldmVudENsaWNrcykgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnByZXZlbnRDbGlja3NQcm9wYWdhdGlvbiAmJiBzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gb25TY3JvbGwoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICB3cmFwcGVyRWwsXG4gICAgcnRsVHJhbnNsYXRlLFxuICAgIGVuYWJsZWRcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbmFibGVkKSByZXR1cm47XG4gIHN3aXBlci5wcmV2aW91c1RyYW5zbGF0ZSA9IHN3aXBlci50cmFuc2xhdGU7XG4gIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICBzd2lwZXIudHJhbnNsYXRlID0gLXdyYXBwZXJFbC5zY3JvbGxMZWZ0O1xuICB9IGVsc2Uge1xuICAgIHN3aXBlci50cmFuc2xhdGUgPSAtd3JhcHBlckVsLnNjcm9sbFRvcDtcbiAgfVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgaWYgKHN3aXBlci50cmFuc2xhdGUgPT09IDApIHN3aXBlci50cmFuc2xhdGUgPSAwO1xuICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgbGV0IG5ld1Byb2dyZXNzO1xuICBjb25zdCB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgaWYgKHRyYW5zbGF0ZXNEaWZmID09PSAwKSB7XG4gICAgbmV3UHJvZ3Jlc3MgPSAwO1xuICB9IGVsc2Uge1xuICAgIG5ld1Byb2dyZXNzID0gKHN3aXBlci50cmFuc2xhdGUgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIC8gdHJhbnNsYXRlc0RpZmY7XG4gIH1cbiAgaWYgKG5ld1Byb2dyZXNzICE9PSBzd2lwZXIucHJvZ3Jlc3MpIHtcbiAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MocnRsVHJhbnNsYXRlID8gLXN3aXBlci50cmFuc2xhdGUgOiBzd2lwZXIudHJhbnNsYXRlKTtcbiAgfVxuICBzd2lwZXIuZW1pdCgnc2V0VHJhbnNsYXRlJywgc3dpcGVyLnRyYW5zbGF0ZSwgZmFsc2UpO1xufVxuXG5mdW5jdGlvbiBvbkxvYWQoZSkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBwcm9jZXNzTGF6eVByZWxvYWRlcihzd2lwZXIsIGUudGFyZ2V0KTtcbiAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSB8fCBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgIT09ICdhdXRvJyAmJiAhc3dpcGVyLnBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHN3aXBlci51cGRhdGUoKTtcbn1cblxuZnVuY3Rpb24gb25Eb2N1bWVudFRvdWNoU3RhcnQoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmIChzd2lwZXIuZG9jdW1lbnRUb3VjaEhhbmRsZXJQcm9jZWVkZWQpIHJldHVybjtcbiAgc3dpcGVyLmRvY3VtZW50VG91Y2hIYW5kbGVyUHJvY2VlZGVkID0gdHJ1ZTtcbiAgaWYgKHN3aXBlci5wYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcykge1xuICAgIHN3aXBlci5lbC5zdHlsZS50b3VjaEFjdGlvbiA9ICdhdXRvJztcbiAgfVxufVxuXG5jb25zdCBldmVudHMgPSAoc3dpcGVyLCBtZXRob2QpID0+IHtcbiAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIGVsLFxuICAgIHdyYXBwZXJFbCxcbiAgICBkZXZpY2VcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgY2FwdHVyZSA9ICEhcGFyYW1zLm5lc3RlZDtcbiAgY29uc3QgZG9tTWV0aG9kID0gbWV0aG9kID09PSAnb24nID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuICBjb25zdCBzd2lwZXJNZXRob2QgPSBtZXRob2Q7XG5cbiAgLy8gVG91Y2ggRXZlbnRzXG4gIGRvY3VtZW50W2RvbU1ldGhvZF0oJ3RvdWNoc3RhcnQnLCBzd2lwZXIub25Eb2N1bWVudFRvdWNoU3RhcnQsIHtcbiAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICBjYXB0dXJlXG4gIH0pO1xuICBlbFtkb21NZXRob2RdKCd0b3VjaHN0YXJ0Jywgc3dpcGVyLm9uVG91Y2hTdGFydCwge1xuICAgIHBhc3NpdmU6IGZhbHNlXG4gIH0pO1xuICBlbFtkb21NZXRob2RdKCdwb2ludGVyZG93bicsIHN3aXBlci5vblRvdWNoU3RhcnQsIHtcbiAgICBwYXNzaXZlOiBmYWxzZVxuICB9KTtcbiAgZG9jdW1lbnRbZG9tTWV0aG9kXSgndG91Y2htb3ZlJywgc3dpcGVyLm9uVG91Y2hNb3ZlLCB7XG4gICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgY2FwdHVyZVxuICB9KTtcbiAgZG9jdW1lbnRbZG9tTWV0aG9kXSgncG9pbnRlcm1vdmUnLCBzd2lwZXIub25Ub3VjaE1vdmUsIHtcbiAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICBjYXB0dXJlXG4gIH0pO1xuICBkb2N1bWVudFtkb21NZXRob2RdKCd0b3VjaGVuZCcsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgcGFzc2l2ZTogdHJ1ZVxuICB9KTtcbiAgZG9jdW1lbnRbZG9tTWV0aG9kXSgncG9pbnRlcnVwJywgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICBwYXNzaXZlOiB0cnVlXG4gIH0pO1xuICBkb2N1bWVudFtkb21NZXRob2RdKCdwb2ludGVyY2FuY2VsJywgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICBwYXNzaXZlOiB0cnVlXG4gIH0pO1xuICBkb2N1bWVudFtkb21NZXRob2RdKCd0b3VjaGNhbmNlbCcsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgcGFzc2l2ZTogdHJ1ZVxuICB9KTtcbiAgZG9jdW1lbnRbZG9tTWV0aG9kXSgncG9pbnRlcm91dCcsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgcGFzc2l2ZTogdHJ1ZVxuICB9KTtcbiAgZG9jdW1lbnRbZG9tTWV0aG9kXSgncG9pbnRlcmxlYXZlJywgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICBwYXNzaXZlOiB0cnVlXG4gIH0pO1xuICBkb2N1bWVudFtkb21NZXRob2RdKCdjb250ZXh0bWVudScsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgcGFzc2l2ZTogdHJ1ZVxuICB9KTtcblxuICAvLyBQcmV2ZW50IExpbmtzIENsaWNrc1xuICBpZiAocGFyYW1zLnByZXZlbnRDbGlja3MgfHwgcGFyYW1zLnByZXZlbnRDbGlja3NQcm9wYWdhdGlvbikge1xuICAgIGVsW2RvbU1ldGhvZF0oJ2NsaWNrJywgc3dpcGVyLm9uQ2xpY2ssIHRydWUpO1xuICB9XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgIHdyYXBwZXJFbFtkb21NZXRob2RdKCdzY3JvbGwnLCBzd2lwZXIub25TY3JvbGwpO1xuICB9XG5cbiAgLy8gUmVzaXplIGhhbmRsZXJcbiAgaWYgKHBhcmFtcy51cGRhdGVPbldpbmRvd1Jlc2l6ZSkge1xuICAgIHN3aXBlcltzd2lwZXJNZXRob2RdKGRldmljZS5pb3MgfHwgZGV2aWNlLmFuZHJvaWQgPyAncmVzaXplIG9yaWVudGF0aW9uY2hhbmdlIG9ic2VydmVyVXBkYXRlJyA6ICdyZXNpemUgb2JzZXJ2ZXJVcGRhdGUnLCBvblJlc2l6ZSwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyW3N3aXBlck1ldGhvZF0oJ29ic2VydmVyVXBkYXRlJywgb25SZXNpemUsIHRydWUpO1xuICB9XG5cbiAgLy8gSW1hZ2VzIGxvYWRlclxuICBlbFtkb21NZXRob2RdKCdsb2FkJywgc3dpcGVyLm9uTG9hZCwge1xuICAgIGNhcHR1cmU6IHRydWVcbiAgfSk7XG59O1xuZnVuY3Rpb24gYXR0YWNoRXZlbnRzKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIHN3aXBlci5vblRvdWNoU3RhcnQgPSBvblRvdWNoU3RhcnQuYmluZChzd2lwZXIpO1xuICBzd2lwZXIub25Ub3VjaE1vdmUgPSBvblRvdWNoTW92ZS5iaW5kKHN3aXBlcik7XG4gIHN3aXBlci5vblRvdWNoRW5kID0gb25Ub3VjaEVuZC5iaW5kKHN3aXBlcik7XG4gIHN3aXBlci5vbkRvY3VtZW50VG91Y2hTdGFydCA9IG9uRG9jdW1lbnRUb3VjaFN0YXJ0LmJpbmQoc3dpcGVyKTtcbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgc3dpcGVyLm9uU2Nyb2xsID0gb25TY3JvbGwuYmluZChzd2lwZXIpO1xuICB9XG4gIHN3aXBlci5vbkNsaWNrID0gb25DbGljay5iaW5kKHN3aXBlcik7XG4gIHN3aXBlci5vbkxvYWQgPSBvbkxvYWQuYmluZChzd2lwZXIpO1xuICBldmVudHMoc3dpcGVyLCAnb24nKTtcbn1cbmZ1bmN0aW9uIGRldGFjaEV2ZW50cygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgZXZlbnRzKHN3aXBlciwgJ29mZicpO1xufVxudmFyIGV2ZW50cyQxID0ge1xuICBhdHRhY2hFdmVudHMsXG4gIGRldGFjaEV2ZW50c1xufTtcblxuY29uc3QgaXNHcmlkRW5hYmxlZCA9IChzd2lwZXIsIHBhcmFtcykgPT4ge1xuICByZXR1cm4gc3dpcGVyLmdyaWQgJiYgcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDE7XG59O1xuZnVuY3Rpb24gc2V0QnJlYWtwb2ludCgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHJlYWxJbmRleCxcbiAgICBpbml0aWFsaXplZCxcbiAgICBwYXJhbXMsXG4gICAgZWxcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgYnJlYWtwb2ludHMgPSBwYXJhbXMuYnJlYWtwb2ludHM7XG4gIGlmICghYnJlYWtwb2ludHMgfHwgYnJlYWtwb2ludHMgJiYgT2JqZWN0LmtleXMoYnJlYWtwb2ludHMpLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuXG4gIC8vIEdldCBicmVha3BvaW50IGZvciB3aW5kb3cgd2lkdGggYW5kIHVwZGF0ZSBwYXJhbWV0ZXJzXG4gIGNvbnN0IGJyZWFrcG9pbnQgPSBzd2lwZXIuZ2V0QnJlYWtwb2ludChicmVha3BvaW50cywgc3dpcGVyLnBhcmFtcy5icmVha3BvaW50c0Jhc2UsIHN3aXBlci5lbCk7XG4gIGlmICghYnJlYWtwb2ludCB8fCBzd2lwZXIuY3VycmVudEJyZWFrcG9pbnQgPT09IGJyZWFrcG9pbnQpIHJldHVybjtcbiAgY29uc3QgYnJlYWtwb2ludE9ubHlQYXJhbXMgPSBicmVha3BvaW50IGluIGJyZWFrcG9pbnRzID8gYnJlYWtwb2ludHNbYnJlYWtwb2ludF0gOiB1bmRlZmluZWQ7XG4gIGNvbnN0IGJyZWFrcG9pbnRQYXJhbXMgPSBicmVha3BvaW50T25seVBhcmFtcyB8fCBzd2lwZXIub3JpZ2luYWxQYXJhbXM7XG4gIGNvbnN0IHdhc011bHRpUm93ID0gaXNHcmlkRW5hYmxlZChzd2lwZXIsIHBhcmFtcyk7XG4gIGNvbnN0IGlzTXVsdGlSb3cgPSBpc0dyaWRFbmFibGVkKHN3aXBlciwgYnJlYWtwb2ludFBhcmFtcyk7XG4gIGNvbnN0IHdhc0VuYWJsZWQgPSBwYXJhbXMuZW5hYmxlZDtcbiAgaWYgKHdhc011bHRpUm93ICYmICFpc011bHRpUm93KSB7XG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ncmlkYCwgYCR7cGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9Z3JpZC1jb2x1bW5gKTtcbiAgICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbiAgfSBlbHNlIGlmICghd2FzTXVsdGlSb3cgJiYgaXNNdWx0aVJvdykge1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoYCR7cGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9Z3JpZGApO1xuICAgIGlmIChicmVha3BvaW50UGFyYW1zLmdyaWQuZmlsbCAmJiBicmVha3BvaW50UGFyYW1zLmdyaWQuZmlsbCA9PT0gJ2NvbHVtbicgfHwgIWJyZWFrcG9pbnRQYXJhbXMuZ3JpZC5maWxsICYmIHBhcmFtcy5ncmlkLmZpbGwgPT09ICdjb2x1bW4nKSB7XG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKGAke3BhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfWdyaWQtY29sdW1uYCk7XG4gICAgfVxuICAgIHN3aXBlci5lbWl0Q29udGFpbmVyQ2xhc3NlcygpO1xuICB9XG5cbiAgLy8gVG9nZ2xlIG5hdmlnYXRpb24sIHBhZ2luYXRpb24sIHNjcm9sbGJhclxuICBbJ25hdmlnYXRpb24nLCAncGFnaW5hdGlvbicsICdzY3JvbGxiYXInXS5mb3JFYWNoKHByb3AgPT4ge1xuICAgIGlmICh0eXBlb2YgYnJlYWtwb2ludFBhcmFtc1twcm9wXSA9PT0gJ3VuZGVmaW5lZCcpIHJldHVybjtcbiAgICBjb25zdCB3YXNNb2R1bGVFbmFibGVkID0gcGFyYW1zW3Byb3BdICYmIHBhcmFtc1twcm9wXS5lbmFibGVkO1xuICAgIGNvbnN0IGlzTW9kdWxlRW5hYmxlZCA9IGJyZWFrcG9pbnRQYXJhbXNbcHJvcF0gJiYgYnJlYWtwb2ludFBhcmFtc1twcm9wXS5lbmFibGVkO1xuICAgIGlmICh3YXNNb2R1bGVFbmFibGVkICYmICFpc01vZHVsZUVuYWJsZWQpIHtcbiAgICAgIHN3aXBlcltwcm9wXS5kaXNhYmxlKCk7XG4gICAgfVxuICAgIGlmICghd2FzTW9kdWxlRW5hYmxlZCAmJiBpc01vZHVsZUVuYWJsZWQpIHtcbiAgICAgIHN3aXBlcltwcm9wXS5lbmFibGUoKTtcbiAgICB9XG4gIH0pO1xuICBjb25zdCBkaXJlY3Rpb25DaGFuZ2VkID0gYnJlYWtwb2ludFBhcmFtcy5kaXJlY3Rpb24gJiYgYnJlYWtwb2ludFBhcmFtcy5kaXJlY3Rpb24gIT09IHBhcmFtcy5kaXJlY3Rpb247XG4gIGNvbnN0IG5lZWRzUmVMb29wID0gcGFyYW1zLmxvb3AgJiYgKGJyZWFrcG9pbnRQYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gcGFyYW1zLnNsaWRlc1BlclZpZXcgfHwgZGlyZWN0aW9uQ2hhbmdlZCk7XG4gIGNvbnN0IHdhc0xvb3AgPSBwYXJhbXMubG9vcDtcbiAgaWYgKGRpcmVjdGlvbkNoYW5nZWQgJiYgaW5pdGlhbGl6ZWQpIHtcbiAgICBzd2lwZXIuY2hhbmdlRGlyZWN0aW9uKCk7XG4gIH1cbiAgZXh0ZW5kKHN3aXBlci5wYXJhbXMsIGJyZWFrcG9pbnRQYXJhbXMpO1xuICBjb25zdCBpc0VuYWJsZWQgPSBzd2lwZXIucGFyYW1zLmVuYWJsZWQ7XG4gIGNvbnN0IGhhc0xvb3AgPSBzd2lwZXIucGFyYW1zLmxvb3A7XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgYWxsb3dUb3VjaE1vdmU6IHN3aXBlci5wYXJhbXMuYWxsb3dUb3VjaE1vdmUsXG4gICAgYWxsb3dTbGlkZU5leHQ6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZU5leHQsXG4gICAgYWxsb3dTbGlkZVByZXY6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZVByZXZcbiAgfSk7XG4gIGlmICh3YXNFbmFibGVkICYmICFpc0VuYWJsZWQpIHtcbiAgICBzd2lwZXIuZGlzYWJsZSgpO1xuICB9IGVsc2UgaWYgKCF3YXNFbmFibGVkICYmIGlzRW5hYmxlZCkge1xuICAgIHN3aXBlci5lbmFibGUoKTtcbiAgfVxuICBzd2lwZXIuY3VycmVudEJyZWFrcG9pbnQgPSBicmVha3BvaW50O1xuICBzd2lwZXIuZW1pdCgnX2JlZm9yZUJyZWFrcG9pbnQnLCBicmVha3BvaW50UGFyYW1zKTtcbiAgaWYgKGluaXRpYWxpemVkKSB7XG4gICAgaWYgKG5lZWRzUmVMb29wKSB7XG4gICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICAgIHN3aXBlci5sb29wQ3JlYXRlKHJlYWxJbmRleCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgfSBlbHNlIGlmICghd2FzTG9vcCAmJiBoYXNMb29wKSB7XG4gICAgICBzd2lwZXIubG9vcENyZWF0ZShyZWFsSW5kZXgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgIH0gZWxzZSBpZiAod2FzTG9vcCAmJiAhaGFzTG9vcCkge1xuICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgfVxuICB9XG4gIHN3aXBlci5lbWl0KCdicmVha3BvaW50JywgYnJlYWtwb2ludFBhcmFtcyk7XG59XG5cbmZ1bmN0aW9uIGdldEJyZWFrcG9pbnQoYnJlYWtwb2ludHMsIGJhc2UsIGNvbnRhaW5lckVsKSB7XG4gIGlmIChiYXNlID09PSB2b2lkIDApIHtcbiAgICBiYXNlID0gJ3dpbmRvdyc7XG4gIH1cbiAgaWYgKCFicmVha3BvaW50cyB8fCBiYXNlID09PSAnY29udGFpbmVyJyAmJiAhY29udGFpbmVyRWwpIHJldHVybiB1bmRlZmluZWQ7XG4gIGxldCBicmVha3BvaW50ID0gZmFsc2U7XG4gIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICBjb25zdCBjdXJyZW50SGVpZ2h0ID0gYmFzZSA9PT0gJ3dpbmRvdycgPyB3aW5kb3cuaW5uZXJIZWlnaHQgOiBjb250YWluZXJFbC5jbGllbnRIZWlnaHQ7XG4gIGNvbnN0IHBvaW50cyA9IE9iamVjdC5rZXlzKGJyZWFrcG9pbnRzKS5tYXAocG9pbnQgPT4ge1xuICAgIGlmICh0eXBlb2YgcG9pbnQgPT09ICdzdHJpbmcnICYmIHBvaW50LmluZGV4T2YoJ0AnKSA9PT0gMCkge1xuICAgICAgY29uc3QgbWluUmF0aW8gPSBwYXJzZUZsb2F0KHBvaW50LnN1YnN0cigxKSk7XG4gICAgICBjb25zdCB2YWx1ZSA9IGN1cnJlbnRIZWlnaHQgKiBtaW5SYXRpbztcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlLFxuICAgICAgICBwb2ludFxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIHZhbHVlOiBwb2ludCxcbiAgICAgIHBvaW50XG4gICAgfTtcbiAgfSk7XG4gIHBvaW50cy5zb3J0KChhLCBiKSA9PiBwYXJzZUludChhLnZhbHVlLCAxMCkgLSBwYXJzZUludChiLnZhbHVlLCAxMCkpO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHtcbiAgICAgIHBvaW50LFxuICAgICAgdmFsdWVcbiAgICB9ID0gcG9pbnRzW2ldO1xuICAgIGlmIChiYXNlID09PSAnd2luZG93Jykge1xuICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKGAobWluLXdpZHRoOiAke3ZhbHVlfXB4KWApLm1hdGNoZXMpIHtcbiAgICAgICAgYnJlYWtwb2ludCA9IHBvaW50O1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodmFsdWUgPD0gY29udGFpbmVyRWwuY2xpZW50V2lkdGgpIHtcbiAgICAgIGJyZWFrcG9pbnQgPSBwb2ludDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGJyZWFrcG9pbnQgfHwgJ21heCc7XG59XG5cbnZhciBicmVha3BvaW50cyA9IHtcbiAgc2V0QnJlYWtwb2ludCxcbiAgZ2V0QnJlYWtwb2ludFxufTtcblxuZnVuY3Rpb24gcHJlcGFyZUNsYXNzZXMoZW50cmllcywgcHJlZml4KSB7XG4gIGNvbnN0IHJlc3VsdENsYXNzZXMgPSBbXTtcbiAgZW50cmllcy5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgIGlmICh0eXBlb2YgaXRlbSA9PT0gJ29iamVjdCcpIHtcbiAgICAgIE9iamVjdC5rZXlzKGl0ZW0pLmZvckVhY2goY2xhc3NOYW1lcyA9PiB7XG4gICAgICAgIGlmIChpdGVtW2NsYXNzTmFtZXNdKSB7XG4gICAgICAgICAgcmVzdWx0Q2xhc3Nlcy5wdXNoKHByZWZpeCArIGNsYXNzTmFtZXMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgcmVzdWx0Q2xhc3Nlcy5wdXNoKHByZWZpeCArIGl0ZW0pO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiByZXN1bHRDbGFzc2VzO1xufVxuZnVuY3Rpb24gYWRkQ2xhc3NlcygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIGNsYXNzTmFtZXMsXG4gICAgcGFyYW1zLFxuICAgIHJ0bCxcbiAgICBlbCxcbiAgICBkZXZpY2VcbiAgfSA9IHN3aXBlcjtcbiAgLy8gcHJldHRpZXItaWdub3JlXG4gIGNvbnN0IHN1ZmZpeGVzID0gcHJlcGFyZUNsYXNzZXMoWydpbml0aWFsaXplZCcsIHBhcmFtcy5kaXJlY3Rpb24sIHtcbiAgICAnZnJlZS1tb2RlJzogc3dpcGVyLnBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZFxuICB9LCB7XG4gICAgJ2F1dG9oZWlnaHQnOiBwYXJhbXMuYXV0b0hlaWdodFxuICB9LCB7XG4gICAgJ3J0bCc6IHJ0bFxuICB9LCB7XG4gICAgJ2dyaWQnOiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMVxuICB9LCB7XG4gICAgJ2dyaWQtY29sdW1uJzogcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDEgJiYgcGFyYW1zLmdyaWQuZmlsbCA9PT0gJ2NvbHVtbidcbiAgfSwge1xuICAgICdhbmRyb2lkJzogZGV2aWNlLmFuZHJvaWRcbiAgfSwge1xuICAgICdpb3MnOiBkZXZpY2UuaW9zXG4gIH0sIHtcbiAgICAnY3NzLW1vZGUnOiBwYXJhbXMuY3NzTW9kZVxuICB9LCB7XG4gICAgJ2NlbnRlcmVkJzogcGFyYW1zLmNzc01vZGUgJiYgcGFyYW1zLmNlbnRlcmVkU2xpZGVzXG4gIH0sIHtcbiAgICAnd2F0Y2gtcHJvZ3Jlc3MnOiBwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzc1xuICB9XSwgcGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MpO1xuICBjbGFzc05hbWVzLnB1c2goLi4uc3VmZml4ZXMpO1xuICBlbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzTmFtZXMpO1xuICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ2xhc3NlcygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIGVsLFxuICAgIGNsYXNzTmFtZXNcbiAgfSA9IHN3aXBlcjtcbiAgZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc05hbWVzKTtcbiAgc3dpcGVyLmVtaXRDb250YWluZXJDbGFzc2VzKCk7XG59XG5cbnZhciBjbGFzc2VzID0ge1xuICBhZGRDbGFzc2VzLFxuICByZW1vdmVDbGFzc2VzXG59O1xuXG5mdW5jdGlvbiBjaGVja092ZXJmbG93KCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgaXNMb2NrZWQ6IHdhc0xvY2tlZCxcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3Qge1xuICAgIHNsaWRlc09mZnNldEJlZm9yZVxuICB9ID0gcGFyYW1zO1xuICBpZiAoc2xpZGVzT2Zmc2V0QmVmb3JlKSB7XG4gICAgY29uc3QgbGFzdFNsaWRlSW5kZXggPSBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgY29uc3QgbGFzdFNsaWRlUmlnaHRFZGdlID0gc3dpcGVyLnNsaWRlc0dyaWRbbGFzdFNsaWRlSW5kZXhdICsgc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtsYXN0U2xpZGVJbmRleF0gKyBzbGlkZXNPZmZzZXRCZWZvcmUgKiAyO1xuICAgIHN3aXBlci5pc0xvY2tlZCA9IHN3aXBlci5zaXplID4gbGFzdFNsaWRlUmlnaHRFZGdlO1xuICB9IGVsc2Uge1xuICAgIHN3aXBlci5pc0xvY2tlZCA9IHN3aXBlci5zbmFwR3JpZC5sZW5ndGggPT09IDE7XG4gIH1cbiAgaWYgKHBhcmFtcy5hbGxvd1NsaWRlTmV4dCA9PT0gdHJ1ZSkge1xuICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9ICFzd2lwZXIuaXNMb2NrZWQ7XG4gIH1cbiAgaWYgKHBhcmFtcy5hbGxvd1NsaWRlUHJldiA9PT0gdHJ1ZSkge1xuICAgIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9ICFzd2lwZXIuaXNMb2NrZWQ7XG4gIH1cbiAgaWYgKHdhc0xvY2tlZCAmJiB3YXNMb2NrZWQgIT09IHN3aXBlci5pc0xvY2tlZCkge1xuICAgIHN3aXBlci5pc0VuZCA9IGZhbHNlO1xuICB9XG4gIGlmICh3YXNMb2NrZWQgIT09IHN3aXBlci5pc0xvY2tlZCkge1xuICAgIHN3aXBlci5lbWl0KHN3aXBlci5pc0xvY2tlZCA/ICdsb2NrJyA6ICd1bmxvY2snKTtcbiAgfVxufVxudmFyIGNoZWNrT3ZlcmZsb3ckMSA9IHtcbiAgY2hlY2tPdmVyZmxvd1xufTtcblxudmFyIGRlZmF1bHRzID0ge1xuICBpbml0OiB0cnVlLFxuICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyxcbiAgb25lV2F5TW92ZW1lbnQ6IGZhbHNlLFxuICB0b3VjaEV2ZW50c1RhcmdldDogJ3dyYXBwZXInLFxuICBpbml0aWFsU2xpZGU6IDAsXG4gIHNwZWVkOiAzMDAsXG4gIGNzc01vZGU6IGZhbHNlLFxuICB1cGRhdGVPbldpbmRvd1Jlc2l6ZTogdHJ1ZSxcbiAgcmVzaXplT2JzZXJ2ZXI6IHRydWUsXG4gIG5lc3RlZDogZmFsc2UsXG4gIGNyZWF0ZUVsZW1lbnRzOiBmYWxzZSxcbiAgZXZlbnRzUHJlZml4OiAnc3dpcGVyJyxcbiAgZW5hYmxlZDogdHJ1ZSxcbiAgZm9jdXNhYmxlRWxlbWVudHM6ICdpbnB1dCwgc2VsZWN0LCBvcHRpb24sIHRleHRhcmVhLCBidXR0b24sIHZpZGVvLCBsYWJlbCcsXG4gIC8vIE92ZXJyaWRlc1xuICB3aWR0aDogbnVsbCxcbiAgaGVpZ2h0OiBudWxsLFxuICAvL1xuICBwcmV2ZW50SW50ZXJhY3Rpb25PblRyYW5zaXRpb246IGZhbHNlLFxuICAvLyBzc3JcbiAgdXNlckFnZW50OiBudWxsLFxuICB1cmw6IG51bGwsXG4gIC8vIFRvIHN1cHBvcnQgaU9TJ3Mgc3dpcGUtdG8tZ28tYmFjayBnZXN0dXJlICh3aGVuIGJlaW5nIHVzZWQgaW4tYXBwKS5cbiAgZWRnZVN3aXBlRGV0ZWN0aW9uOiBmYWxzZSxcbiAgZWRnZVN3aXBlVGhyZXNob2xkOiAyMCxcbiAgLy8gQXV0b2hlaWdodFxuICBhdXRvSGVpZ2h0OiBmYWxzZSxcbiAgLy8gU2V0IHdyYXBwZXIgd2lkdGhcbiAgc2V0V3JhcHBlclNpemU6IGZhbHNlLFxuICAvLyBWaXJ0dWFsIFRyYW5zbGF0ZVxuICB2aXJ0dWFsVHJhbnNsYXRlOiBmYWxzZSxcbiAgLy8gRWZmZWN0c1xuICBlZmZlY3Q6ICdzbGlkZScsXG4gIC8vICdzbGlkZScgb3IgJ2ZhZGUnIG9yICdjdWJlJyBvciAnY292ZXJmbG93JyBvciAnZmxpcCdcblxuICAvLyBCcmVha3BvaW50c1xuICBicmVha3BvaW50czogdW5kZWZpbmVkLFxuICBicmVha3BvaW50c0Jhc2U6ICd3aW5kb3cnLFxuICAvLyBTbGlkZXMgZ3JpZFxuICBzcGFjZUJldHdlZW46IDAsXG4gIHNsaWRlc1BlclZpZXc6IDEsXG4gIHNsaWRlc1Blckdyb3VwOiAxLFxuICBzbGlkZXNQZXJHcm91cFNraXA6IDAsXG4gIHNsaWRlc1Blckdyb3VwQXV0bzogZmFsc2UsXG4gIGNlbnRlcmVkU2xpZGVzOiBmYWxzZSxcbiAgY2VudGVyZWRTbGlkZXNCb3VuZHM6IGZhbHNlLFxuICBzbGlkZXNPZmZzZXRCZWZvcmU6IDAsXG4gIC8vIGluIHB4XG4gIHNsaWRlc09mZnNldEFmdGVyOiAwLFxuICAvLyBpbiBweFxuICBub3JtYWxpemVTbGlkZUluZGV4OiB0cnVlLFxuICBjZW50ZXJJbnN1ZmZpY2llbnRTbGlkZXM6IGZhbHNlLFxuICAvLyBEaXNhYmxlIHN3aXBlciBhbmQgaGlkZSBuYXZpZ2F0aW9uIHdoZW4gY29udGFpbmVyIG5vdCBvdmVyZmxvd1xuICB3YXRjaE92ZXJmbG93OiB0cnVlLFxuICAvLyBSb3VuZCBsZW5ndGhcbiAgcm91bmRMZW5ndGhzOiBmYWxzZSxcbiAgLy8gVG91Y2hlc1xuICB0b3VjaFJhdGlvOiAxLFxuICB0b3VjaEFuZ2xlOiA0NSxcbiAgc2ltdWxhdGVUb3VjaDogdHJ1ZSxcbiAgc2hvcnRTd2lwZXM6IHRydWUsXG4gIGxvbmdTd2lwZXM6IHRydWUsXG4gIGxvbmdTd2lwZXNSYXRpbzogMC41LFxuICBsb25nU3dpcGVzTXM6IDMwMCxcbiAgZm9sbG93RmluZ2VyOiB0cnVlLFxuICBhbGxvd1RvdWNoTW92ZTogdHJ1ZSxcbiAgdGhyZXNob2xkOiA1LFxuICB0b3VjaE1vdmVTdG9wUHJvcGFnYXRpb246IGZhbHNlLFxuICB0b3VjaFN0YXJ0UHJldmVudERlZmF1bHQ6IHRydWUsXG4gIHRvdWNoU3RhcnRGb3JjZVByZXZlbnREZWZhdWx0OiBmYWxzZSxcbiAgdG91Y2hSZWxlYXNlT25FZGdlczogZmFsc2UsXG4gIC8vIFVuaXF1ZSBOYXZpZ2F0aW9uIEVsZW1lbnRzXG4gIHVuaXF1ZU5hdkVsZW1lbnRzOiB0cnVlLFxuICAvLyBSZXNpc3RhbmNlXG4gIHJlc2lzdGFuY2U6IHRydWUsXG4gIHJlc2lzdGFuY2VSYXRpbzogMC44NSxcbiAgLy8gUHJvZ3Jlc3NcbiAgd2F0Y2hTbGlkZXNQcm9ncmVzczogZmFsc2UsXG4gIC8vIEN1cnNvclxuICBncmFiQ3Vyc29yOiBmYWxzZSxcbiAgLy8gQ2xpY2tzXG4gIHByZXZlbnRDbGlja3M6IHRydWUsXG4gIHByZXZlbnRDbGlja3NQcm9wYWdhdGlvbjogdHJ1ZSxcbiAgc2xpZGVUb0NsaWNrZWRTbGlkZTogZmFsc2UsXG4gIC8vIGxvb3BcbiAgbG9vcDogZmFsc2UsXG4gIGxvb3BBZGRCbGFua1NsaWRlczogdHJ1ZSxcbiAgbG9vcEFkZGl0aW9uYWxTbGlkZXM6IDAsXG4gIGxvb3BQcmV2ZW50c1NsaWRpbmc6IHRydWUsXG4gIC8vIHJld2luZFxuICByZXdpbmQ6IGZhbHNlLFxuICAvLyBTd2lwaW5nL25vIHN3aXBpbmdcbiAgYWxsb3dTbGlkZVByZXY6IHRydWUsXG4gIGFsbG93U2xpZGVOZXh0OiB0cnVlLFxuICBzd2lwZUhhbmRsZXI6IG51bGwsXG4gIC8vICcuc3dpcGUtaGFuZGxlcicsXG4gIG5vU3dpcGluZzogdHJ1ZSxcbiAgbm9Td2lwaW5nQ2xhc3M6ICdzd2lwZXItbm8tc3dpcGluZycsXG4gIG5vU3dpcGluZ1NlbGVjdG9yOiBudWxsLFxuICAvLyBQYXNzaXZlIExpc3RlbmVyc1xuICBwYXNzaXZlTGlzdGVuZXJzOiB0cnVlLFxuICBtYXhCYWNrZmFjZUhpZGRlblNsaWRlczogMTAsXG4gIC8vIE5TXG4gIGNvbnRhaW5lck1vZGlmaWVyQ2xhc3M6ICdzd2lwZXItJyxcbiAgLy8gTkVXXG4gIHNsaWRlQ2xhc3M6ICdzd2lwZXItc2xpZGUnLFxuICBzbGlkZUJsYW5rQ2xhc3M6ICdzd2lwZXItc2xpZGUtYmxhbmsnLFxuICBzbGlkZUFjdGl2ZUNsYXNzOiAnc3dpcGVyLXNsaWRlLWFjdGl2ZScsXG4gIHNsaWRlVmlzaWJsZUNsYXNzOiAnc3dpcGVyLXNsaWRlLXZpc2libGUnLFxuICBzbGlkZUZ1bGx5VmlzaWJsZUNsYXNzOiAnc3dpcGVyLXNsaWRlLWZ1bGx5LXZpc2libGUnLFxuICBzbGlkZU5leHRDbGFzczogJ3N3aXBlci1zbGlkZS1uZXh0JyxcbiAgc2xpZGVQcmV2Q2xhc3M6ICdzd2lwZXItc2xpZGUtcHJldicsXG4gIHdyYXBwZXJDbGFzczogJ3N3aXBlci13cmFwcGVyJyxcbiAgbGF6eVByZWxvYWRlckNsYXNzOiAnc3dpcGVyLWxhenktcHJlbG9hZGVyJyxcbiAgbGF6eVByZWxvYWRQcmV2TmV4dDogMCxcbiAgLy8gQ2FsbGJhY2tzXG4gIHJ1bkNhbGxiYWNrc09uSW5pdDogdHJ1ZSxcbiAgLy8gSW50ZXJuYWxzXG4gIF9lbWl0Q2xhc3NlczogZmFsc2Vcbn07XG5cbmZ1bmN0aW9uIG1vZHVsZUV4dGVuZFBhcmFtcyhwYXJhbXMsIGFsbE1vZHVsZXNQYXJhbXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIGV4dGVuZFBhcmFtcyhvYmopIHtcbiAgICBpZiAob2JqID09PSB2b2lkIDApIHtcbiAgICAgIG9iaiA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBtb2R1bGVQYXJhbU5hbWUgPSBPYmplY3Qua2V5cyhvYmopWzBdO1xuICAgIGNvbnN0IG1vZHVsZVBhcmFtcyA9IG9ialttb2R1bGVQYXJhbU5hbWVdO1xuICAgIGlmICh0eXBlb2YgbW9kdWxlUGFyYW1zICE9PSAnb2JqZWN0JyB8fCBtb2R1bGVQYXJhbXMgPT09IG51bGwpIHtcbiAgICAgIGV4dGVuZChhbGxNb2R1bGVzUGFyYW1zLCBvYmopO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPT09IHRydWUpIHtcbiAgICAgIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID0ge1xuICAgICAgICBlbmFibGVkOiB0cnVlXG4gICAgICB9O1xuICAgIH1cbiAgICBpZiAobW9kdWxlUGFyYW1OYW1lID09PSAnbmF2aWdhdGlvbicgJiYgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gJiYgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0uZW5hYmxlZCAmJiAhcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0ucHJldkVsICYmICFwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5uZXh0RWwpIHtcbiAgICAgIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLmF1dG8gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoWydwYWdpbmF0aW9uJywgJ3Njcm9sbGJhciddLmluZGV4T2YobW9kdWxlUGFyYW1OYW1lKSA+PSAwICYmIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdICYmIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLmVuYWJsZWQgJiYgIXBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLmVsKSB7XG4gICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5hdXRvID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCEobW9kdWxlUGFyYW1OYW1lIGluIHBhcmFtcyAmJiAnZW5hYmxlZCcgaW4gbW9kdWxlUGFyYW1zKSkge1xuICAgICAgZXh0ZW5kKGFsbE1vZHVsZXNQYXJhbXMsIG9iaik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPT09ICdvYmplY3QnICYmICEoJ2VuYWJsZWQnIGluIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdKSkge1xuICAgICAgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0uZW5hYmxlZCA9IHRydWU7XG4gICAgfVxuICAgIGlmICghcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0pIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID0ge1xuICAgICAgZW5hYmxlZDogZmFsc2VcbiAgICB9O1xuICAgIGV4dGVuZChhbGxNb2R1bGVzUGFyYW1zLCBvYmopO1xuICB9O1xufVxuXG4vKiBlc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246IFwib2ZmXCIgKi9cbmNvbnN0IHByb3RvdHlwZXMgPSB7XG4gIGV2ZW50c0VtaXR0ZXIsXG4gIHVwZGF0ZSxcbiAgdHJhbnNsYXRlLFxuICB0cmFuc2l0aW9uLFxuICBzbGlkZSxcbiAgbG9vcCxcbiAgZ3JhYkN1cnNvcixcbiAgZXZlbnRzOiBldmVudHMkMSxcbiAgYnJlYWtwb2ludHMsXG4gIGNoZWNrT3ZlcmZsb3c6IGNoZWNrT3ZlcmZsb3ckMSxcbiAgY2xhc3Nlc1xufTtcbmNvbnN0IGV4dGVuZGVkRGVmYXVsdHMgPSB7fTtcbmNsYXNzIFN3aXBlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIGxldCBlbDtcbiAgICBsZXQgcGFyYW1zO1xuICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICB9XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAxICYmIGFyZ3NbMF0uY29uc3RydWN0b3IgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZ3NbMF0pLnNsaWNlKDgsIC0xKSA9PT0gJ09iamVjdCcpIHtcbiAgICAgIHBhcmFtcyA9IGFyZ3NbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIFtlbCwgcGFyYW1zXSA9IGFyZ3M7XG4gICAgfVxuICAgIGlmICghcGFyYW1zKSBwYXJhbXMgPSB7fTtcbiAgICBwYXJhbXMgPSBleHRlbmQoe30sIHBhcmFtcyk7XG4gICAgaWYgKGVsICYmICFwYXJhbXMuZWwpIHBhcmFtcy5lbCA9IGVsO1xuICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICBpZiAocGFyYW1zLmVsICYmIHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnICYmIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGFyYW1zLmVsKS5sZW5ndGggPiAxKSB7XG4gICAgICBjb25zdCBzd2lwZXJzID0gW107XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhcmFtcy5lbCkuZm9yRWFjaChjb250YWluZXJFbCA9PiB7XG4gICAgICAgIGNvbnN0IG5ld1BhcmFtcyA9IGV4dGVuZCh7fSwgcGFyYW1zLCB7XG4gICAgICAgICAgZWw6IGNvbnRhaW5lckVsXG4gICAgICAgIH0pO1xuICAgICAgICBzd2lwZXJzLnB1c2gobmV3IFN3aXBlcihuZXdQYXJhbXMpKTtcbiAgICAgIH0pO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0cnVjdG9yLXJldHVyblxuICAgICAgcmV0dXJuIHN3aXBlcnM7XG4gICAgfVxuXG4gICAgLy8gU3dpcGVyIEluc3RhbmNlXG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBzd2lwZXIuX19zd2lwZXJfXyA9IHRydWU7XG4gICAgc3dpcGVyLnN1cHBvcnQgPSBnZXRTdXBwb3J0KCk7XG4gICAgc3dpcGVyLmRldmljZSA9IGdldERldmljZSh7XG4gICAgICB1c2VyQWdlbnQ6IHBhcmFtcy51c2VyQWdlbnRcbiAgICB9KTtcbiAgICBzd2lwZXIuYnJvd3NlciA9IGdldEJyb3dzZXIoKTtcbiAgICBzd2lwZXIuZXZlbnRzTGlzdGVuZXJzID0ge307XG4gICAgc3dpcGVyLmV2ZW50c0FueUxpc3RlbmVycyA9IFtdO1xuICAgIHN3aXBlci5tb2R1bGVzID0gWy4uLnN3aXBlci5fX21vZHVsZXNfX107XG4gICAgaWYgKHBhcmFtcy5tb2R1bGVzICYmIEFycmF5LmlzQXJyYXkocGFyYW1zLm1vZHVsZXMpKSB7XG4gICAgICBzd2lwZXIubW9kdWxlcy5wdXNoKC4uLnBhcmFtcy5tb2R1bGVzKTtcbiAgICB9XG4gICAgY29uc3QgYWxsTW9kdWxlc1BhcmFtcyA9IHt9O1xuICAgIHN3aXBlci5tb2R1bGVzLmZvckVhY2gobW9kID0+IHtcbiAgICAgIG1vZCh7XG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgc3dpcGVyLFxuICAgICAgICBleHRlbmRQYXJhbXM6IG1vZHVsZUV4dGVuZFBhcmFtcyhwYXJhbXMsIGFsbE1vZHVsZXNQYXJhbXMpLFxuICAgICAgICBvbjogc3dpcGVyLm9uLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgb25jZTogc3dpcGVyLm9uY2UuYmluZChzd2lwZXIpLFxuICAgICAgICBvZmY6IHN3aXBlci5vZmYuYmluZChzd2lwZXIpLFxuICAgICAgICBlbWl0OiBzd2lwZXIuZW1pdC5iaW5kKHN3aXBlcilcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLy8gRXh0ZW5kIGRlZmF1bHRzIHdpdGggbW9kdWxlcyBwYXJhbXNcbiAgICBjb25zdCBzd2lwZXJQYXJhbXMgPSBleHRlbmQoe30sIGRlZmF1bHRzLCBhbGxNb2R1bGVzUGFyYW1zKTtcblxuICAgIC8vIEV4dGVuZCBkZWZhdWx0cyB3aXRoIHBhc3NlZCBwYXJhbXNcbiAgICBzd2lwZXIucGFyYW1zID0gZXh0ZW5kKHt9LCBzd2lwZXJQYXJhbXMsIGV4dGVuZGVkRGVmYXVsdHMsIHBhcmFtcyk7XG4gICAgc3dpcGVyLm9yaWdpbmFsUGFyYW1zID0gZXh0ZW5kKHt9LCBzd2lwZXIucGFyYW1zKTtcbiAgICBzd2lwZXIucGFzc2VkUGFyYW1zID0gZXh0ZW5kKHt9LCBwYXJhbXMpO1xuXG4gICAgLy8gYWRkIGV2ZW50IGxpc3RlbmVyc1xuICAgIGlmIChzd2lwZXIucGFyYW1zICYmIHN3aXBlci5wYXJhbXMub24pIHtcbiAgICAgIE9iamVjdC5rZXlzKHN3aXBlci5wYXJhbXMub24pLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgICAgc3dpcGVyLm9uKGV2ZW50TmFtZSwgc3dpcGVyLnBhcmFtcy5vbltldmVudE5hbWVdKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnBhcmFtcyAmJiBzd2lwZXIucGFyYW1zLm9uQW55KSB7XG4gICAgICBzd2lwZXIub25Bbnkoc3dpcGVyLnBhcmFtcy5vbkFueSk7XG4gICAgfVxuXG4gICAgLy8gRXh0ZW5kIFN3aXBlclxuICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgICBlbmFibGVkOiBzd2lwZXIucGFyYW1zLmVuYWJsZWQsXG4gICAgICBlbCxcbiAgICAgIC8vIENsYXNzZXNcbiAgICAgIGNsYXNzTmFtZXM6IFtdLFxuICAgICAgLy8gU2xpZGVzXG4gICAgICBzbGlkZXM6IFtdLFxuICAgICAgc2xpZGVzR3JpZDogW10sXG4gICAgICBzbmFwR3JpZDogW10sXG4gICAgICBzbGlkZXNTaXplc0dyaWQ6IFtdLFxuICAgICAgLy8gaXNEaXJlY3Rpb25cbiAgICAgIGlzSG9yaXpvbnRhbCgpIHtcbiAgICAgICAgcmV0dXJuIHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCc7XG4gICAgICB9LFxuICAgICAgaXNWZXJ0aWNhbCgpIHtcbiAgICAgICAgcmV0dXJuIHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSAndmVydGljYWwnO1xuICAgICAgfSxcbiAgICAgIC8vIEluZGV4ZXNcbiAgICAgIGFjdGl2ZUluZGV4OiAwLFxuICAgICAgcmVhbEluZGV4OiAwLFxuICAgICAgLy9cbiAgICAgIGlzQmVnaW5uaW5nOiB0cnVlLFxuICAgICAgaXNFbmQ6IGZhbHNlLFxuICAgICAgLy8gUHJvcHNcbiAgICAgIHRyYW5zbGF0ZTogMCxcbiAgICAgIHByZXZpb3VzVHJhbnNsYXRlOiAwLFxuICAgICAgcHJvZ3Jlc3M6IDAsXG4gICAgICB2ZWxvY2l0eTogMCxcbiAgICAgIGFuaW1hdGluZzogZmFsc2UsXG4gICAgICBjc3NPdmVyZmxvd0FkanVzdG1lbnQoKSB7XG4gICAgICAgIC8vIFJldHVybnMgMCB1bmxlc3MgYHRyYW5zbGF0ZWAgaXMgPiAyKioyM1xuICAgICAgICAvLyBTaG91bGQgYmUgc3VidHJhY3RlZCBmcm9tIGNzcyB2YWx1ZXMgdG8gcHJldmVudCBvdmVyZmxvd1xuICAgICAgICByZXR1cm4gTWF0aC50cnVuYyh0aGlzLnRyYW5zbGF0ZSAvIDIgKiogMjMpICogMiAqKiAyMztcbiAgICAgIH0sXG4gICAgICAvLyBMb2Nrc1xuICAgICAgYWxsb3dTbGlkZU5leHQ6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZU5leHQsXG4gICAgICBhbGxvd1NsaWRlUHJldjogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlUHJldixcbiAgICAgIC8vIFRvdWNoIEV2ZW50c1xuICAgICAgdG91Y2hFdmVudHNEYXRhOiB7XG4gICAgICAgIGlzVG91Y2hlZDogdW5kZWZpbmVkLFxuICAgICAgICBpc01vdmVkOiB1bmRlZmluZWQsXG4gICAgICAgIGFsbG93VG91Y2hDYWxsYmFja3M6IHVuZGVmaW5lZCxcbiAgICAgICAgdG91Y2hTdGFydFRpbWU6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNTY3JvbGxpbmc6IHVuZGVmaW5lZCxcbiAgICAgICAgY3VycmVudFRyYW5zbGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICBzdGFydFRyYW5zbGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICBhbGxvd1RocmVzaG9sZE1vdmU6IHVuZGVmaW5lZCxcbiAgICAgICAgLy8gRm9ybSBlbGVtZW50cyB0byBtYXRjaFxuICAgICAgICBmb2N1c2FibGVFbGVtZW50czogc3dpcGVyLnBhcmFtcy5mb2N1c2FibGVFbGVtZW50cyxcbiAgICAgICAgLy8gTGFzdCBjbGljayB0aW1lXG4gICAgICAgIGxhc3RDbGlja1RpbWU6IDAsXG4gICAgICAgIGNsaWNrVGltZW91dDogdW5kZWZpbmVkLFxuICAgICAgICAvLyBWZWxvY2l0aWVzXG4gICAgICAgIHZlbG9jaXRpZXM6IFtdLFxuICAgICAgICBhbGxvd01vbWVudHVtQm91bmNlOiB1bmRlZmluZWQsXG4gICAgICAgIHN0YXJ0TW92aW5nOiB1bmRlZmluZWQsXG4gICAgICAgIHBvaW50ZXJJZDogbnVsbCxcbiAgICAgICAgdG91Y2hJZDogbnVsbFxuICAgICAgfSxcbiAgICAgIC8vIENsaWNrc1xuICAgICAgYWxsb3dDbGljazogdHJ1ZSxcbiAgICAgIC8vIFRvdWNoZXNcbiAgICAgIGFsbG93VG91Y2hNb3ZlOiBzd2lwZXIucGFyYW1zLmFsbG93VG91Y2hNb3ZlLFxuICAgICAgdG91Y2hlczoge1xuICAgICAgICBzdGFydFg6IDAsXG4gICAgICAgIHN0YXJ0WTogMCxcbiAgICAgICAgY3VycmVudFg6IDAsXG4gICAgICAgIGN1cnJlbnRZOiAwLFxuICAgICAgICBkaWZmOiAwXG4gICAgICB9LFxuICAgICAgLy8gSW1hZ2VzXG4gICAgICBpbWFnZXNUb0xvYWQ6IFtdLFxuICAgICAgaW1hZ2VzTG9hZGVkOiAwXG4gICAgfSk7XG4gICAgc3dpcGVyLmVtaXQoJ19zd2lwZXInKTtcblxuICAgIC8vIEluaXRcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5pbml0KSB7XG4gICAgICBzd2lwZXIuaW5pdCgpO1xuICAgIH1cblxuICAgIC8vIFJldHVybiBhcHAgaW5zdGFuY2VcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RydWN0b3ItcmV0dXJuXG4gICAgcmV0dXJuIHN3aXBlcjtcbiAgfVxuICBnZXREaXJlY3Rpb25MYWJlbChwcm9wZXJ0eSkge1xuICAgIGlmICh0aGlzLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICByZXR1cm4gcHJvcGVydHk7XG4gICAgfVxuICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgIHJldHVybiB7XG4gICAgICAnd2lkdGgnOiAnaGVpZ2h0JyxcbiAgICAgICdtYXJnaW4tdG9wJzogJ21hcmdpbi1sZWZ0JyxcbiAgICAgICdtYXJnaW4tYm90dG9tICc6ICdtYXJnaW4tcmlnaHQnLFxuICAgICAgJ21hcmdpbi1sZWZ0JzogJ21hcmdpbi10b3AnLFxuICAgICAgJ21hcmdpbi1yaWdodCc6ICdtYXJnaW4tYm90dG9tJyxcbiAgICAgICdwYWRkaW5nLWxlZnQnOiAncGFkZGluZy10b3AnLFxuICAgICAgJ3BhZGRpbmctcmlnaHQnOiAncGFkZGluZy1ib3R0b20nLFxuICAgICAgJ21hcmdpblJpZ2h0JzogJ21hcmdpbkJvdHRvbSdcbiAgICB9W3Byb3BlcnR5XTtcbiAgfVxuICBnZXRTbGlkZUluZGV4KHNsaWRlRWwpIHtcbiAgICBjb25zdCB7XG4gICAgICBzbGlkZXNFbCxcbiAgICAgIHBhcmFtc1xuICAgIH0gPSB0aGlzO1xuICAgIGNvbnN0IHNsaWRlcyA9IGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYCk7XG4gICAgY29uc3QgZmlyc3RTbGlkZUluZGV4ID0gZWxlbWVudEluZGV4KHNsaWRlc1swXSk7XG4gICAgcmV0dXJuIGVsZW1lbnRJbmRleChzbGlkZUVsKSAtIGZpcnN0U2xpZGVJbmRleDtcbiAgfVxuICBnZXRTbGlkZUluZGV4QnlEYXRhKGluZGV4KSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0U2xpZGVJbmRleCh0aGlzLnNsaWRlcy5maWx0ZXIoc2xpZGVFbCA9PiBzbGlkZUVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSAqIDEgPT09IGluZGV4KVswXSk7XG4gIH1cbiAgcmVjYWxjU2xpZGVzKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3Qge1xuICAgICAgc2xpZGVzRWwsXG4gICAgICBwYXJhbXNcbiAgICB9ID0gc3dpcGVyO1xuICAgIHN3aXBlci5zbGlkZXMgPSBlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApO1xuICB9XG4gIGVuYWJsZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmIChzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICAgIHN3aXBlci5lbmFibGVkID0gdHJ1ZTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcigpO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdCgnZW5hYmxlJyk7XG4gIH1cbiAgZGlzYWJsZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgICBzd2lwZXIuZW5hYmxlZCA9IGZhbHNlO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmdyYWJDdXJzb3IpIHtcbiAgICAgIHN3aXBlci51bnNldEdyYWJDdXJzb3IoKTtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoJ2Rpc2FibGUnKTtcbiAgfVxuICBzZXRQcm9ncmVzcyhwcm9ncmVzcywgc3BlZWQpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIHByb2dyZXNzID0gTWF0aC5taW4oTWF0aC5tYXgocHJvZ3Jlc3MsIDApLCAxKTtcbiAgICBjb25zdCBtaW4gPSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gICAgY29uc3QgbWF4ID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuICAgIGNvbnN0IGN1cnJlbnQgPSAobWF4IC0gbWluKSAqIHByb2dyZXNzICsgbWluO1xuICAgIHN3aXBlci50cmFuc2xhdGVUbyhjdXJyZW50LCB0eXBlb2Ygc3BlZWQgPT09ICd1bmRlZmluZWQnID8gMCA6IHNwZWVkKTtcbiAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICB9XG4gIGVtaXRDb250YWluZXJDbGFzc2VzKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLl9lbWl0Q2xhc3NlcyB8fCAhc3dpcGVyLmVsKSByZXR1cm47XG4gICAgY29uc3QgY2xzID0gc3dpcGVyLmVsLmNsYXNzTmFtZS5zcGxpdCgnICcpLmZpbHRlcihjbGFzc05hbWUgPT4ge1xuICAgICAgcmV0dXJuIGNsYXNzTmFtZS5pbmRleE9mKCdzd2lwZXInKSA9PT0gMCB8fCBjbGFzc05hbWUuaW5kZXhPZihzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3MpID09PSAwO1xuICAgIH0pO1xuICAgIHN3aXBlci5lbWl0KCdfY29udGFpbmVyQ2xhc3NlcycsIGNscy5qb2luKCcgJykpO1xuICB9XG4gIGdldFNsaWRlQ2xhc3NlcyhzbGlkZUVsKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuICcnO1xuICAgIHJldHVybiBzbGlkZUVsLmNsYXNzTmFtZS5zcGxpdCgnICcpLmZpbHRlcihjbGFzc05hbWUgPT4ge1xuICAgICAgcmV0dXJuIGNsYXNzTmFtZS5pbmRleE9mKCdzd2lwZXItc2xpZGUnKSA9PT0gMCB8fCBjbGFzc05hbWUuaW5kZXhPZihzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3MpID09PSAwO1xuICAgIH0pLmpvaW4oJyAnKTtcbiAgfVxuICBlbWl0U2xpZGVzQ2xhc3NlcygpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5fZW1pdENsYXNzZXMgfHwgIXN3aXBlci5lbCkgcmV0dXJuO1xuICAgIGNvbnN0IHVwZGF0ZXMgPSBbXTtcbiAgICBzd2lwZXIuc2xpZGVzLmZvckVhY2goc2xpZGVFbCA9PiB7XG4gICAgICBjb25zdCBjbGFzc05hbWVzID0gc3dpcGVyLmdldFNsaWRlQ2xhc3NlcyhzbGlkZUVsKTtcbiAgICAgIHVwZGF0ZXMucHVzaCh7XG4gICAgICAgIHNsaWRlRWwsXG4gICAgICAgIGNsYXNzTmFtZXNcbiAgICAgIH0pO1xuICAgICAgc3dpcGVyLmVtaXQoJ19zbGlkZUNsYXNzJywgc2xpZGVFbCwgY2xhc3NOYW1lcyk7XG4gICAgfSk7XG4gICAgc3dpcGVyLmVtaXQoJ19zbGlkZUNsYXNzZXMnLCB1cGRhdGVzKTtcbiAgfVxuICBzbGlkZXNQZXJWaWV3RHluYW1pYyh2aWV3LCBleGFjdCkge1xuICAgIGlmICh2aWV3ID09PSB2b2lkIDApIHtcbiAgICAgIHZpZXcgPSAnY3VycmVudCc7XG4gICAgfVxuICAgIGlmIChleGFjdCA9PT0gdm9pZCAwKSB7XG4gICAgICBleGFjdCA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHtcbiAgICAgIHBhcmFtcyxcbiAgICAgIHNsaWRlcyxcbiAgICAgIHNsaWRlc0dyaWQsXG4gICAgICBzbGlkZXNTaXplc0dyaWQsXG4gICAgICBzaXplOiBzd2lwZXJTaXplLFxuICAgICAgYWN0aXZlSW5kZXhcbiAgICB9ID0gc3dpcGVyO1xuICAgIGxldCBzcHYgPSAxO1xuICAgIGlmICh0eXBlb2YgcGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdudW1iZXInKSByZXR1cm4gcGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgbGV0IHNsaWRlU2l6ZSA9IHNsaWRlc1thY3RpdmVJbmRleF0gPyBzbGlkZXNbYWN0aXZlSW5kZXhdLnN3aXBlclNsaWRlU2l6ZSA6IDA7XG4gICAgICBsZXQgYnJlYWtMb29wO1xuICAgICAgZm9yIChsZXQgaSA9IGFjdGl2ZUluZGV4ICsgMTsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBpZiAoc2xpZGVzW2ldICYmICFicmVha0xvb3ApIHtcbiAgICAgICAgICBzbGlkZVNpemUgKz0gc2xpZGVzW2ldLnN3aXBlclNsaWRlU2l6ZTtcbiAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgICBpZiAoc2xpZGVTaXplID4gc3dpcGVyU2l6ZSkgYnJlYWtMb29wID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IGFjdGl2ZUluZGV4IC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgICAgaWYgKHNsaWRlc1tpXSAmJiAhYnJlYWtMb29wKSB7XG4gICAgICAgICAgc2xpZGVTaXplICs9IHNsaWRlc1tpXS5zd2lwZXJTbGlkZVNpemU7XG4gICAgICAgICAgc3B2ICs9IDE7XG4gICAgICAgICAgaWYgKHNsaWRlU2l6ZSA+IHN3aXBlclNpemUpIGJyZWFrTG9vcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBpZiAodmlldyA9PT0gJ2N1cnJlbnQnKSB7XG4gICAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleCArIDE7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgICBjb25zdCBzbGlkZUluVmlldyA9IGV4YWN0ID8gc2xpZGVzR3JpZFtpXSArIHNsaWRlc1NpemVzR3JpZFtpXSAtIHNsaWRlc0dyaWRbYWN0aXZlSW5kZXhdIDwgc3dpcGVyU2l6ZSA6IHNsaWRlc0dyaWRbaV0gLSBzbGlkZXNHcmlkW2FjdGl2ZUluZGV4XSA8IHN3aXBlclNpemU7XG4gICAgICAgICAgaWYgKHNsaWRlSW5WaWV3KSB7XG4gICAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHByZXZpb3VzXG4gICAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAgICAgY29uc3Qgc2xpZGVJblZpZXcgPSBzbGlkZXNHcmlkW2FjdGl2ZUluZGV4XSAtIHNsaWRlc0dyaWRbaV0gPCBzd2lwZXJTaXplO1xuICAgICAgICAgIGlmIChzbGlkZUluVmlldykge1xuICAgICAgICAgICAgc3B2ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBzcHY7XG4gIH1cbiAgdXBkYXRlKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgIGNvbnN0IHtcbiAgICAgIHNuYXBHcmlkLFxuICAgICAgcGFyYW1zXG4gICAgfSA9IHN3aXBlcjtcbiAgICAvLyBCcmVha3BvaW50c1xuICAgIGlmIChwYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgIHN3aXBlci5zZXRCcmVha3BvaW50KCk7XG4gICAgfVxuICAgIFsuLi5zd2lwZXIuZWwucXVlcnlTZWxlY3RvckFsbCgnW2xvYWRpbmc9XCJsYXp5XCJdJyldLmZvckVhY2goaW1hZ2VFbCA9PiB7XG4gICAgICBpZiAoaW1hZ2VFbC5jb21wbGV0ZSkge1xuICAgICAgICBwcm9jZXNzTGF6eVByZWxvYWRlcihzd2lwZXIsIGltYWdlRWwpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHN3aXBlci51cGRhdGVTaXplKCk7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcygpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xuICAgICAgY29uc3QgdHJhbnNsYXRlVmFsdWUgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSAqIC0xIDogc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICAgIGNvbnN0IG5ld1RyYW5zbGF0ZSA9IE1hdGgubWluKE1hdGgubWF4KHRyYW5zbGF0ZVZhbHVlLCBzd2lwZXIubWF4VHJhbnNsYXRlKCkpLCBzd2lwZXIubWluVHJhbnNsYXRlKCkpO1xuICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgIH1cbiAgICBsZXQgdHJhbnNsYXRlZDtcbiAgICBpZiAocGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkICYmICFwYXJhbXMuY3NzTW9kZSkge1xuICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICBpZiAocGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nIHx8IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkgJiYgc3dpcGVyLmlzRW5kICYmICFwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgY29uc3Qgc2xpZGVzID0gc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcyA6IHN3aXBlci5zbGlkZXM7XG4gICAgICAgIHRyYW5zbGF0ZWQgPSBzd2lwZXIuc2xpZGVUbyhzbGlkZXMubGVuZ3RoIC0gMSwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdHJhbnNsYXRlZCA9IHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgfVxuICAgICAgaWYgKCF0cmFuc2xhdGVkKSB7XG4gICAgICAgIHNldFRyYW5zbGF0ZSgpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc25hcEdyaWQgIT09IHN3aXBlci5zbmFwR3JpZCkge1xuICAgICAgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoJ3VwZGF0ZScpO1xuICB9XG4gIGNoYW5nZURpcmVjdGlvbihuZXdEaXJlY3Rpb24sIG5lZWRVcGRhdGUpIHtcbiAgICBpZiAobmVlZFVwZGF0ZSA9PT0gdm9pZCAwKSB7XG4gICAgICBuZWVkVXBkYXRlID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCBjdXJyZW50RGlyZWN0aW9uID0gc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb247XG4gICAgaWYgKCFuZXdEaXJlY3Rpb24pIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgbmV3RGlyZWN0aW9uID0gY3VycmVudERpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcbiAgICB9XG4gICAgaWYgKG5ld0RpcmVjdGlvbiA9PT0gY3VycmVudERpcmVjdGlvbiB8fCBuZXdEaXJlY3Rpb24gIT09ICdob3Jpem9udGFsJyAmJiBuZXdEaXJlY3Rpb24gIT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHJldHVybiBzd2lwZXI7XG4gICAgfVxuICAgIHN3aXBlci5lbC5jbGFzc0xpc3QucmVtb3ZlKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc30ke2N1cnJlbnREaXJlY3Rpb259YCk7XG4gICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5hZGQoYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfSR7bmV3RGlyZWN0aW9ufWApO1xuICAgIHN3aXBlci5lbWl0Q29udGFpbmVyQ2xhc3NlcygpO1xuICAgIHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID0gbmV3RGlyZWN0aW9uO1xuICAgIHN3aXBlci5zbGlkZXMuZm9yRWFjaChzbGlkZUVsID0+IHtcbiAgICAgIGlmIChuZXdEaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgICAgc2xpZGVFbC5zdHlsZS53aWR0aCA9ICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xpZGVFbC5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzd2lwZXIuZW1pdCgnY2hhbmdlRGlyZWN0aW9uJyk7XG4gICAgaWYgKG5lZWRVcGRhdGUpIHN3aXBlci51cGRhdGUoKTtcbiAgICByZXR1cm4gc3dpcGVyO1xuICB9XG4gIGNoYW5nZUxhbmd1YWdlRGlyZWN0aW9uKGRpcmVjdGlvbikge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKHN3aXBlci5ydGwgJiYgZGlyZWN0aW9uID09PSAncnRsJyB8fCAhc3dpcGVyLnJ0bCAmJiBkaXJlY3Rpb24gPT09ICdsdHInKSByZXR1cm47XG4gICAgc3dpcGVyLnJ0bCA9IGRpcmVjdGlvbiA9PT0gJ3J0bCc7XG4gICAgc3dpcGVyLnJ0bFRyYW5zbGF0ZSA9IHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgc3dpcGVyLnJ0bDtcbiAgICBpZiAoc3dpcGVyLnJ0bCkge1xuICAgICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5hZGQoYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfXJ0bGApO1xuICAgICAgc3dpcGVyLmVsLmRpciA9ICdydGwnO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9cnRsYCk7XG4gICAgICBzd2lwZXIuZWwuZGlyID0gJ2x0cic7XG4gICAgfVxuICAgIHN3aXBlci51cGRhdGUoKTtcbiAgfVxuICBtb3VudChlbGVtZW50KSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoc3dpcGVyLm1vdW50ZWQpIHJldHVybiB0cnVlO1xuXG4gICAgLy8gRmluZCBlbFxuICAgIGxldCBlbCA9IGVsZW1lbnQgfHwgc3dpcGVyLnBhcmFtcy5lbDtcbiAgICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykge1xuICAgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICB9XG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBlbC5zd2lwZXIgPSBzd2lwZXI7XG4gICAgaWYgKGVsLnBhcmVudE5vZGUgJiYgZWwucGFyZW50Tm9kZS5ob3N0ICYmIGVsLnBhcmVudE5vZGUuaG9zdC5ub2RlTmFtZSA9PT0gJ1NXSVBFUi1DT05UQUlORVInKSB7XG4gICAgICBzd2lwZXIuaXNFbGVtZW50ID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgZ2V0V3JhcHBlclNlbGVjdG9yID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIGAuJHsoc3dpcGVyLnBhcmFtcy53cmFwcGVyQ2xhc3MgfHwgJycpLnRyaW0oKS5zcGxpdCgnICcpLmpvaW4oJy4nKX1gO1xuICAgIH07XG4gICAgY29uc3QgZ2V0V3JhcHBlciA9ICgpID0+IHtcbiAgICAgIGlmIChlbCAmJiBlbC5zaGFkb3dSb290ICYmIGVsLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCByZXMgPSBlbC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoZ2V0V3JhcHBlclNlbGVjdG9yKCkpO1xuICAgICAgICAvLyBDaGlsZHJlbiBuZWVkcyB0byByZXR1cm4gc2xvdCBpdGVtc1xuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVsZW1lbnRDaGlsZHJlbihlbCwgZ2V0V3JhcHBlclNlbGVjdG9yKCkpWzBdO1xuICAgIH07XG4gICAgLy8gRmluZCBXcmFwcGVyXG4gICAgbGV0IHdyYXBwZXJFbCA9IGdldFdyYXBwZXIoKTtcbiAgICBpZiAoIXdyYXBwZXJFbCAmJiBzd2lwZXIucGFyYW1zLmNyZWF0ZUVsZW1lbnRzKSB7XG4gICAgICB3cmFwcGVyRWwgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBzd2lwZXIucGFyYW1zLndyYXBwZXJDbGFzcyk7XG4gICAgICBlbC5hcHBlbmQod3JhcHBlckVsKTtcbiAgICAgIGVsZW1lbnRDaGlsZHJlbihlbCwgYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31gKS5mb3JFYWNoKHNsaWRlRWwgPT4ge1xuICAgICAgICB3cmFwcGVyRWwuYXBwZW5kKHNsaWRlRWwpO1xuICAgICAgfSk7XG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgICBlbCxcbiAgICAgIHdyYXBwZXJFbCxcbiAgICAgIHNsaWRlc0VsOiBzd2lwZXIuaXNFbGVtZW50ICYmICFlbC5wYXJlbnROb2RlLmhvc3Quc2xpZGVTbG90cyA/IGVsLnBhcmVudE5vZGUuaG9zdCA6IHdyYXBwZXJFbCxcbiAgICAgIGhvc3RFbDogc3dpcGVyLmlzRWxlbWVudCA/IGVsLnBhcmVudE5vZGUuaG9zdCA6IGVsLFxuICAgICAgbW91bnRlZDogdHJ1ZSxcbiAgICAgIC8vIFJUTFxuICAgICAgcnRsOiBlbC5kaXIudG9Mb3dlckNhc2UoKSA9PT0gJ3J0bCcgfHwgZWxlbWVudFN0eWxlKGVsLCAnZGlyZWN0aW9uJykgPT09ICdydGwnLFxuICAgICAgcnRsVHJhbnNsYXRlOiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnICYmIChlbC5kaXIudG9Mb3dlckNhc2UoKSA9PT0gJ3J0bCcgfHwgZWxlbWVudFN0eWxlKGVsLCAnZGlyZWN0aW9uJykgPT09ICdydGwnKSxcbiAgICAgIHdyb25nUlRMOiBlbGVtZW50U3R5bGUod3JhcHBlckVsLCAnZGlzcGxheScpID09PSAnLXdlYmtpdC1ib3gnXG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaW5pdChlbCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKHN3aXBlci5pbml0aWFsaXplZCkgcmV0dXJuIHN3aXBlcjtcbiAgICBjb25zdCBtb3VudGVkID0gc3dpcGVyLm1vdW50KGVsKTtcbiAgICBpZiAobW91bnRlZCA9PT0gZmFsc2UpIHJldHVybiBzd2lwZXI7XG4gICAgc3dpcGVyLmVtaXQoJ2JlZm9yZUluaXQnKTtcblxuICAgIC8vIFNldCBicmVha3BvaW50XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuYnJlYWtwb2ludHMpIHtcbiAgICAgIHN3aXBlci5zZXRCcmVha3BvaW50KCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIENsYXNzZXNcbiAgICBzd2lwZXIuYWRkQ2xhc3NlcygpO1xuXG4gICAgLy8gVXBkYXRlIHNpemVcbiAgICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuXG4gICAgLy8gVXBkYXRlIHNsaWRlc1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93KSB7XG4gICAgICBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICAgIH1cblxuICAgIC8vIFNldCBHcmFiIEN1cnNvclxuICAgIGlmIChzd2lwZXIucGFyYW1zLmdyYWJDdXJzb3IgJiYgc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgfVxuXG4gICAgLy8gU2xpZGUgVG8gSW5pdGlhbCBTbGlkZVxuICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3AgJiYgc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlICsgc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlLCAwLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCwgZmFsc2UsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIucGFyYW1zLmluaXRpYWxTbGlkZSwgMCwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG5cbiAgICAvLyBDcmVhdGUgbG9vcFxuICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgIHN3aXBlci5sb29wQ3JlYXRlKCk7XG4gICAgfVxuXG4gICAgLy8gQXR0YWNoIGV2ZW50c1xuICAgIHN3aXBlci5hdHRhY2hFdmVudHMoKTtcbiAgICBjb25zdCBsYXp5RWxlbWVudHMgPSBbLi4uc3dpcGVyLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tsb2FkaW5nPVwibGF6eVwiXScpXTtcbiAgICBpZiAoc3dpcGVyLmlzRWxlbWVudCkge1xuICAgICAgbGF6eUVsZW1lbnRzLnB1c2goLi4uc3dpcGVyLmhvc3RFbC5xdWVyeVNlbGVjdG9yQWxsKCdbbG9hZGluZz1cImxhenlcIl0nKSk7XG4gICAgfVxuICAgIGxhenlFbGVtZW50cy5mb3JFYWNoKGltYWdlRWwgPT4ge1xuICAgICAgaWYgKGltYWdlRWwuY29tcGxldGUpIHtcbiAgICAgICAgcHJvY2Vzc0xhenlQcmVsb2FkZXIoc3dpcGVyLCBpbWFnZUVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGltYWdlRWwuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGUgPT4ge1xuICAgICAgICAgIHByb2Nlc3NMYXp5UHJlbG9hZGVyKHN3aXBlciwgZS50YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBwcmVsb2FkKHN3aXBlcik7XG5cbiAgICAvLyBJbml0IEZsYWdcbiAgICBzd2lwZXIuaW5pdGlhbGl6ZWQgPSB0cnVlO1xuICAgIHByZWxvYWQoc3dpcGVyKTtcblxuICAgIC8vIEVtaXRcbiAgICBzd2lwZXIuZW1pdCgnaW5pdCcpO1xuICAgIHN3aXBlci5lbWl0KCdhZnRlckluaXQnKTtcbiAgICByZXR1cm4gc3dpcGVyO1xuICB9XG4gIGRlc3Ryb3koZGVsZXRlSW5zdGFuY2UsIGNsZWFuU3R5bGVzKSB7XG4gICAgaWYgKGRlbGV0ZUluc3RhbmNlID09PSB2b2lkIDApIHtcbiAgICAgIGRlbGV0ZUluc3RhbmNlID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKGNsZWFuU3R5bGVzID09PSB2b2lkIDApIHtcbiAgICAgIGNsZWFuU3R5bGVzID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB7XG4gICAgICBwYXJhbXMsXG4gICAgICBlbCxcbiAgICAgIHdyYXBwZXJFbCxcbiAgICAgIHNsaWRlc1xuICAgIH0gPSBzd2lwZXI7XG4gICAgaWYgKHR5cGVvZiBzd2lwZXIucGFyYW1zID09PSAndW5kZWZpbmVkJyB8fCBzd2lwZXIuZGVzdHJveWVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoJ2JlZm9yZURlc3Ryb3knKTtcblxuICAgIC8vIEluaXQgRmxhZ1xuICAgIHN3aXBlci5pbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gICAgLy8gRGV0YWNoIGV2ZW50c1xuICAgIHN3aXBlci5kZXRhY2hFdmVudHMoKTtcblxuICAgIC8vIERlc3Ryb3kgbG9vcFxuICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgfVxuXG4gICAgLy8gQ2xlYW51cCBzdHlsZXNcbiAgICBpZiAoY2xlYW5TdHlsZXMpIHtcbiAgICAgIHN3aXBlci5yZW1vdmVDbGFzc2VzKCk7XG4gICAgICBlbC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICB3cmFwcGVyRWwucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgaWYgKHNsaWRlcyAmJiBzbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKHNsaWRlRWwgPT4ge1xuICAgICAgICAgIHNsaWRlRWwuY2xhc3NMaXN0LnJlbW92ZShwYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MsIHBhcmFtcy5zbGlkZUZ1bGx5VmlzaWJsZUNsYXNzLCBwYXJhbXMuc2xpZGVBY3RpdmVDbGFzcywgcGFyYW1zLnNsaWRlTmV4dENsYXNzLCBwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xuICAgICAgICAgIHNsaWRlRWwucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgICAgIHNsaWRlRWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoJ2Rlc3Ryb3knKTtcblxuICAgIC8vIERldGFjaCBlbWl0dGVyIGV2ZW50c1xuICAgIE9iamVjdC5rZXlzKHN3aXBlci5ldmVudHNMaXN0ZW5lcnMpLmZvckVhY2goZXZlbnROYW1lID0+IHtcbiAgICAgIHN3aXBlci5vZmYoZXZlbnROYW1lKTtcbiAgICB9KTtcbiAgICBpZiAoZGVsZXRlSW5zdGFuY2UgIT09IGZhbHNlKSB7XG4gICAgICBzd2lwZXIuZWwuc3dpcGVyID0gbnVsbDtcbiAgICAgIGRlbGV0ZVByb3BzKHN3aXBlcik7XG4gICAgfVxuICAgIHN3aXBlci5kZXN0cm95ZWQgPSB0cnVlO1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHN0YXRpYyBleHRlbmREZWZhdWx0cyhuZXdEZWZhdWx0cykge1xuICAgIGV4dGVuZChleHRlbmRlZERlZmF1bHRzLCBuZXdEZWZhdWx0cyk7XG4gIH1cbiAgc3RhdGljIGdldCBleHRlbmRlZERlZmF1bHRzKCkge1xuICAgIHJldHVybiBleHRlbmRlZERlZmF1bHRzO1xuICB9XG4gIHN0YXRpYyBnZXQgZGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRzO1xuICB9XG4gIHN0YXRpYyBpbnN0YWxsTW9kdWxlKG1vZCkge1xuICAgIGlmICghU3dpcGVyLnByb3RvdHlwZS5fX21vZHVsZXNfXykgU3dpcGVyLnByb3RvdHlwZS5fX21vZHVsZXNfXyA9IFtdO1xuICAgIGNvbnN0IG1vZHVsZXMgPSBTd2lwZXIucHJvdG90eXBlLl9fbW9kdWxlc19fO1xuICAgIGlmICh0eXBlb2YgbW9kID09PSAnZnVuY3Rpb24nICYmIG1vZHVsZXMuaW5kZXhPZihtb2QpIDwgMCkge1xuICAgICAgbW9kdWxlcy5wdXNoKG1vZCk7XG4gICAgfVxuICB9XG4gIHN0YXRpYyB1c2UobW9kdWxlKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkobW9kdWxlKSkge1xuICAgICAgbW9kdWxlLmZvckVhY2gobSA9PiBTd2lwZXIuaW5zdGFsbE1vZHVsZShtKSk7XG4gICAgICByZXR1cm4gU3dpcGVyO1xuICAgIH1cbiAgICBTd2lwZXIuaW5zdGFsbE1vZHVsZShtb2R1bGUpO1xuICAgIHJldHVybiBTd2lwZXI7XG4gIH1cbn1cbk9iamVjdC5rZXlzKHByb3RvdHlwZXMpLmZvckVhY2gocHJvdG90eXBlR3JvdXAgPT4ge1xuICBPYmplY3Qua2V5cyhwcm90b3R5cGVzW3Byb3RvdHlwZUdyb3VwXSkuZm9yRWFjaChwcm90b01ldGhvZCA9PiB7XG4gICAgU3dpcGVyLnByb3RvdHlwZVtwcm90b01ldGhvZF0gPSBwcm90b3R5cGVzW3Byb3RvdHlwZUdyb3VwXVtwcm90b01ldGhvZF07XG4gIH0pO1xufSk7XG5Td2lwZXIudXNlKFtSZXNpemUsIE9ic2VydmVyXSk7XG5cbmV4cG9ydCB7IFN3aXBlciBhcyBTLCBkZWZhdWx0cyBhcyBkIH07XG4iLCAiaW1wb3J0IHsgZSBhcyBlbGVtZW50Q2hpbGRyZW4sIGMgYXMgY3JlYXRlRWxlbWVudCB9IGZyb20gJy4vdXRpbHMubWpzJztcblxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudElmTm90RGVmaW5lZChzd2lwZXIsIG9yaWdpbmFsUGFyYW1zLCBwYXJhbXMsIGNoZWNrUHJvcHMpIHtcbiAgaWYgKHN3aXBlci5wYXJhbXMuY3JlYXRlRWxlbWVudHMpIHtcbiAgICBPYmplY3Qua2V5cyhjaGVja1Byb3BzKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoIXBhcmFtc1trZXldICYmIHBhcmFtcy5hdXRvID09PSB0cnVlKSB7XG4gICAgICAgIGxldCBlbGVtZW50ID0gZWxlbWVudENoaWxkcmVuKHN3aXBlci5lbCwgYC4ke2NoZWNrUHJvcHNba2V5XX1gKVswXTtcbiAgICAgICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgICAgZWxlbWVudCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIGNoZWNrUHJvcHNba2V5XSk7XG4gICAgICAgICAgZWxlbWVudC5jbGFzc05hbWUgPSBjaGVja1Byb3BzW2tleV07XG4gICAgICAgICAgc3dpcGVyLmVsLmFwcGVuZChlbGVtZW50KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJhbXNba2V5XSA9IGVsZW1lbnQ7XG4gICAgICAgIG9yaWdpbmFsUGFyYW1zW2tleV0gPSBlbGVtZW50O1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBwYXJhbXM7XG59XG5cbmV4cG9ydCB7IGNyZWF0ZUVsZW1lbnRJZk5vdERlZmluZWQgYXMgYyB9O1xuIiwgImltcG9ydCB7IGMgYXMgY3JlYXRlRWxlbWVudElmTm90RGVmaW5lZCB9IGZyb20gJy4uL3NoYXJlZC9jcmVhdGUtZWxlbWVudC1pZi1ub3QtZGVmaW5lZC5tanMnO1xuXG5mdW5jdGlvbiBOYXZpZ2F0aW9uKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgZXh0ZW5kUGFyYW1zLFxuICAgIG9uLFxuICAgIGVtaXRcbiAgfSA9IF9yZWY7XG4gIGV4dGVuZFBhcmFtcyh7XG4gICAgbmF2aWdhdGlvbjoge1xuICAgICAgbmV4dEVsOiBudWxsLFxuICAgICAgcHJldkVsOiBudWxsLFxuICAgICAgaGlkZU9uQ2xpY2s6IGZhbHNlLFxuICAgICAgZGlzYWJsZWRDbGFzczogJ3N3aXBlci1idXR0b24tZGlzYWJsZWQnLFxuICAgICAgaGlkZGVuQ2xhc3M6ICdzd2lwZXItYnV0dG9uLWhpZGRlbicsXG4gICAgICBsb2NrQ2xhc3M6ICdzd2lwZXItYnV0dG9uLWxvY2snLFxuICAgICAgbmF2aWdhdGlvbkRpc2FibGVkQ2xhc3M6ICdzd2lwZXItbmF2aWdhdGlvbi1kaXNhYmxlZCdcbiAgICB9XG4gIH0pO1xuICBzd2lwZXIubmF2aWdhdGlvbiA9IHtcbiAgICBuZXh0RWw6IG51bGwsXG4gICAgcHJldkVsOiBudWxsXG4gIH07XG4gIGNvbnN0IG1ha2VFbGVtZW50c0FycmF5ID0gZWwgPT4gKEFycmF5LmlzQXJyYXkoZWwpID8gZWwgOiBbZWxdKS5maWx0ZXIoZSA9PiAhIWUpO1xuICBmdW5jdGlvbiBnZXRFbChlbCkge1xuICAgIGxldCByZXM7XG4gICAgaWYgKGVsICYmIHR5cGVvZiBlbCA9PT0gJ3N0cmluZycgJiYgc3dpcGVyLmlzRWxlbWVudCkge1xuICAgICAgcmVzID0gc3dpcGVyLmVsLnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgICAgaWYgKHJlcykgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgaWYgKGVsKSB7XG4gICAgICBpZiAodHlwZW9mIGVsID09PSAnc3RyaW5nJykgcmVzID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWwpXTtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmIHR5cGVvZiBlbCA9PT0gJ3N0cmluZycgJiYgcmVzLmxlbmd0aCA+IDEgJiYgc3dpcGVyLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoZWwpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICByZXMgPSBzd2lwZXIuZWwucXVlcnlTZWxlY3RvcihlbCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlbCAmJiAhcmVzKSByZXR1cm4gZWw7XG4gICAgLy8gaWYgKEFycmF5LmlzQXJyYXkocmVzKSAmJiByZXMubGVuZ3RoID09PSAxKSByZXMgPSByZXNbMF07XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuICBmdW5jdGlvbiB0b2dnbGVFbChlbCwgZGlzYWJsZWQpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb247XG4gICAgZWwgPSBtYWtlRWxlbWVudHNBcnJheShlbCk7XG4gICAgZWwuZm9yRWFjaChzdWJFbCA9PiB7XG4gICAgICBpZiAoc3ViRWwpIHtcbiAgICAgICAgc3ViRWwuY2xhc3NMaXN0W2Rpc2FibGVkID8gJ2FkZCcgOiAncmVtb3ZlJ10oLi4ucGFyYW1zLmRpc2FibGVkQ2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgICAgIGlmIChzdWJFbC50YWdOYW1lID09PSAnQlVUVE9OJykgc3ViRWwuZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuZW5hYmxlZCkge1xuICAgICAgICAgIHN1YkVsLmNsYXNzTGlzdFtzd2lwZXIuaXNMb2NrZWQgPyAnYWRkJyA6ICdyZW1vdmUnXShwYXJhbXMubG9ja0NsYXNzKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAvLyBVcGRhdGUgTmF2aWdhdGlvbiBCdXR0b25zXG4gICAgY29uc3Qge1xuICAgICAgbmV4dEVsLFxuICAgICAgcHJldkVsXG4gICAgfSA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgIHRvZ2dsZUVsKHByZXZFbCwgZmFsc2UpO1xuICAgICAgdG9nZ2xlRWwobmV4dEVsLCBmYWxzZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRvZ2dsZUVsKHByZXZFbCwgc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLnJld2luZCk7XG4gICAgdG9nZ2xlRWwobmV4dEVsLCBzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMucmV3aW5kKTtcbiAgfVxuICBmdW5jdGlvbiBvblByZXZDbGljayhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChzd2lwZXIuaXNCZWdpbm5pbmcgJiYgIXN3aXBlci5wYXJhbXMubG9vcCAmJiAhc3dpcGVyLnBhcmFtcy5yZXdpbmQpIHJldHVybjtcbiAgICBzd2lwZXIuc2xpZGVQcmV2KCk7XG4gICAgZW1pdCgnbmF2aWdhdGlvblByZXYnKTtcbiAgfVxuICBmdW5jdGlvbiBvbk5leHRDbGljayhlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGlmIChzd2lwZXIuaXNFbmQgJiYgIXN3aXBlci5wYXJhbXMubG9vcCAmJiAhc3dpcGVyLnBhcmFtcy5yZXdpbmQpIHJldHVybjtcbiAgICBzd2lwZXIuc2xpZGVOZXh0KCk7XG4gICAgZW1pdCgnbmF2aWdhdGlvbk5leHQnKTtcbiAgfVxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbjtcbiAgICBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24gPSBjcmVhdGVFbGVtZW50SWZOb3REZWZpbmVkKHN3aXBlciwgc3dpcGVyLm9yaWdpbmFsUGFyYW1zLm5hdmlnYXRpb24sIHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbiwge1xuICAgICAgbmV4dEVsOiAnc3dpcGVyLWJ1dHRvbi1uZXh0JyxcbiAgICAgIHByZXZFbDogJ3N3aXBlci1idXR0b24tcHJldidcbiAgICB9KTtcbiAgICBpZiAoIShwYXJhbXMubmV4dEVsIHx8IHBhcmFtcy5wcmV2RWwpKSByZXR1cm47XG4gICAgbGV0IG5leHRFbCA9IGdldEVsKHBhcmFtcy5uZXh0RWwpO1xuICAgIGxldCBwcmV2RWwgPSBnZXRFbChwYXJhbXMucHJldkVsKTtcbiAgICBPYmplY3QuYXNzaWduKHN3aXBlci5uYXZpZ2F0aW9uLCB7XG4gICAgICBuZXh0RWwsXG4gICAgICBwcmV2RWxcbiAgICB9KTtcbiAgICBuZXh0RWwgPSBtYWtlRWxlbWVudHNBcnJheShuZXh0RWwpO1xuICAgIHByZXZFbCA9IG1ha2VFbGVtZW50c0FycmF5KHByZXZFbCk7XG4gICAgY29uc3QgaW5pdEJ1dHRvbiA9IChlbCwgZGlyKSA9PiB7XG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkaXIgPT09ICduZXh0JyA/IG9uTmV4dENsaWNrIDogb25QcmV2Q2xpY2spO1xuICAgICAgfVxuICAgICAgaWYgKCFzd2lwZXIuZW5hYmxlZCAmJiBlbCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKC4uLnBhcmFtcy5sb2NrQ2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBuZXh0RWwuZm9yRWFjaChlbCA9PiBpbml0QnV0dG9uKGVsLCAnbmV4dCcpKTtcbiAgICBwcmV2RWwuZm9yRWFjaChlbCA9PiBpbml0QnV0dG9uKGVsLCAncHJldicpKTtcbiAgfVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGxldCB7XG4gICAgICBuZXh0RWwsXG4gICAgICBwcmV2RWxcbiAgICB9ID0gc3dpcGVyLm5hdmlnYXRpb247XG4gICAgbmV4dEVsID0gbWFrZUVsZW1lbnRzQXJyYXkobmV4dEVsKTtcbiAgICBwcmV2RWwgPSBtYWtlRWxlbWVudHNBcnJheShwcmV2RWwpO1xuICAgIGNvbnN0IGRlc3Ryb3lCdXR0b24gPSAoZWwsIGRpcikgPT4ge1xuICAgICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBkaXIgPT09ICduZXh0JyA/IG9uTmV4dENsaWNrIDogb25QcmV2Q2xpY2spO1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5zd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uZGlzYWJsZWRDbGFzcy5zcGxpdCgnICcpKTtcbiAgICB9O1xuICAgIG5leHRFbC5mb3JFYWNoKGVsID0+IGRlc3Ryb3lCdXR0b24oZWwsICduZXh0JykpO1xuICAgIHByZXZFbC5mb3JFYWNoKGVsID0+IGRlc3Ryb3lCdXR0b24oZWwsICdwcmV2JykpO1xuICB9XG4gIG9uKCdpbml0JywgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uZW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgZGlzYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbml0KCk7XG4gICAgICB1cGRhdGUoKTtcbiAgICB9XG4gIH0pO1xuICBvbigndG9FZGdlIGZyb21FZGdlIGxvY2sgdW5sb2NrJywgKCkgPT4ge1xuICAgIHVwZGF0ZSgpO1xuICB9KTtcbiAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgZGVzdHJveSgpO1xuICB9KTtcbiAgb24oJ2VuYWJsZSBkaXNhYmxlJywgKCkgPT4ge1xuICAgIGxldCB7XG4gICAgICBuZXh0RWwsXG4gICAgICBwcmV2RWxcbiAgICB9ID0gc3dpcGVyLm5hdmlnYXRpb247XG4gICAgbmV4dEVsID0gbWFrZUVsZW1lbnRzQXJyYXkobmV4dEVsKTtcbiAgICBwcmV2RWwgPSBtYWtlRWxlbWVudHNBcnJheShwcmV2RWwpO1xuICAgIGlmIChzd2lwZXIuZW5hYmxlZCkge1xuICAgICAgdXBkYXRlKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFsuLi5uZXh0RWwsIC4uLnByZXZFbF0uZmlsdGVyKGVsID0+ICEhZWwpLmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LmFkZChzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24ubG9ja0NsYXNzKSk7XG4gIH0pO1xuICBvbignY2xpY2snLCAoX3MsIGUpID0+IHtcbiAgICBsZXQge1xuICAgICAgbmV4dEVsLFxuICAgICAgcHJldkVsXG4gICAgfSA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgIG5leHRFbCA9IG1ha2VFbGVtZW50c0FycmF5KG5leHRFbCk7XG4gICAgcHJldkVsID0gbWFrZUVsZW1lbnRzQXJyYXkocHJldkVsKTtcbiAgICBjb25zdCB0YXJnZXRFbCA9IGUudGFyZ2V0O1xuICAgIGlmIChzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZU9uQ2xpY2sgJiYgIXByZXZFbC5pbmNsdWRlcyh0YXJnZXRFbCkgJiYgIW5leHRFbC5pbmNsdWRlcyh0YXJnZXRFbCkpIHtcbiAgICAgIGlmIChzd2lwZXIucGFnaW5hdGlvbiAmJiBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24gJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmNsaWNrYWJsZSAmJiAoc3dpcGVyLnBhZ2luYXRpb24uZWwgPT09IHRhcmdldEVsIHx8IHN3aXBlci5wYWdpbmF0aW9uLmVsLmNvbnRhaW5zKHRhcmdldEVsKSkpIHJldHVybjtcbiAgICAgIGxldCBpc0hpZGRlbjtcbiAgICAgIGlmIChuZXh0RWwubGVuZ3RoKSB7XG4gICAgICAgIGlzSGlkZGVuID0gbmV4dEVsWzBdLmNsYXNzTGlzdC5jb250YWlucyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpO1xuICAgICAgfSBlbHNlIGlmIChwcmV2RWwubGVuZ3RoKSB7XG4gICAgICAgIGlzSGlkZGVuID0gcHJldkVsWzBdLmNsYXNzTGlzdC5jb250YWlucyhzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpO1xuICAgICAgfVxuICAgICAgaWYgKGlzSGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgIGVtaXQoJ25hdmlnYXRpb25TaG93Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbWl0KCduYXZpZ2F0aW9uSGlkZScpO1xuICAgICAgfVxuICAgICAgWy4uLm5leHRFbCwgLi4ucHJldkVsXS5maWx0ZXIoZWwgPT4gISFlbCkuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QudG9nZ2xlKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcykpO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGVuYWJsZSA9ICgpID0+IHtcbiAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5zd2lwZXIucGFyYW1zLm5hdmlnYXRpb24ubmF2aWdhdGlvbkRpc2FibGVkQ2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgaW5pdCgpO1xuICAgIHVwZGF0ZSgpO1xuICB9O1xuICBjb25zdCBkaXNhYmxlID0gKCkgPT4ge1xuICAgIHN3aXBlci5lbC5jbGFzc0xpc3QuYWRkKC4uLnN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5uYXZpZ2F0aW9uRGlzYWJsZWRDbGFzcy5zcGxpdCgnICcpKTtcbiAgICBkZXN0cm95KCk7XG4gIH07XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLm5hdmlnYXRpb24sIHtcbiAgICBlbmFibGUsXG4gICAgZGlzYWJsZSxcbiAgICB1cGRhdGUsXG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH0pO1xufVxuXG5leHBvcnQgeyBOYXZpZ2F0aW9uIGFzIGRlZmF1bHQgfTtcbiIsICJmdW5jdGlvbiBjbGFzc2VzVG9TZWxlY3RvcihjbGFzc2VzKSB7XG4gIGlmIChjbGFzc2VzID09PSB2b2lkIDApIHtcbiAgICBjbGFzc2VzID0gJyc7XG4gIH1cbiAgcmV0dXJuIGAuJHtjbGFzc2VzLnRyaW0oKS5yZXBsYWNlKC8oW1xcLjohK1xcL10pL2csICdcXFxcJDEnKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIC5yZXBsYWNlKC8gL2csICcuJyl9YDtcbn1cblxuZXhwb3J0IHsgY2xhc3Nlc1RvU2VsZWN0b3IgYXMgYyB9O1xuIiwgImltcG9ydCB7IGMgYXMgY2xhc3Nlc1RvU2VsZWN0b3IgfSBmcm9tICcuLi9zaGFyZWQvY2xhc3Nlcy10by1zZWxlY3Rvci5tanMnO1xuaW1wb3J0IHsgYyBhcyBjcmVhdGVFbGVtZW50SWZOb3REZWZpbmVkIH0gZnJvbSAnLi4vc2hhcmVkL2NyZWF0ZS1lbGVtZW50LWlmLW5vdC1kZWZpbmVkLm1qcyc7XG5pbXBvcnQgeyBmIGFzIGVsZW1lbnRPdXRlclNpemUsIGcgYXMgZWxlbWVudEluZGV4LCBhIGFzIGVsZW1lbnRQYXJlbnRzIH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxzLm1qcyc7XG5cbmZ1bmN0aW9uIFBhZ2luYXRpb24oX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBleHRlbmRQYXJhbXMsXG4gICAgb24sXG4gICAgZW1pdFxuICB9ID0gX3JlZjtcbiAgY29uc3QgcGZ4ID0gJ3N3aXBlci1wYWdpbmF0aW9uJztcbiAgZXh0ZW5kUGFyYW1zKHtcbiAgICBwYWdpbmF0aW9uOiB7XG4gICAgICBlbDogbnVsbCxcbiAgICAgIGJ1bGxldEVsZW1lbnQ6ICdzcGFuJyxcbiAgICAgIGNsaWNrYWJsZTogZmFsc2UsXG4gICAgICBoaWRlT25DbGljazogZmFsc2UsXG4gICAgICByZW5kZXJCdWxsZXQ6IG51bGwsXG4gICAgICByZW5kZXJQcm9ncmVzc2JhcjogbnVsbCxcbiAgICAgIHJlbmRlckZyYWN0aW9uOiBudWxsLFxuICAgICAgcmVuZGVyQ3VzdG9tOiBudWxsLFxuICAgICAgcHJvZ3Jlc3NiYXJPcHBvc2l0ZTogZmFsc2UsXG4gICAgICB0eXBlOiAnYnVsbGV0cycsXG4gICAgICAvLyAnYnVsbGV0cycgb3IgJ3Byb2dyZXNzYmFyJyBvciAnZnJhY3Rpb24nIG9yICdjdXN0b20nXG4gICAgICBkeW5hbWljQnVsbGV0czogZmFsc2UsXG4gICAgICBkeW5hbWljTWFpbkJ1bGxldHM6IDEsXG4gICAgICBmb3JtYXRGcmFjdGlvbkN1cnJlbnQ6IG51bWJlciA9PiBudW1iZXIsXG4gICAgICBmb3JtYXRGcmFjdGlvblRvdGFsOiBudW1iZXIgPT4gbnVtYmVyLFxuICAgICAgYnVsbGV0Q2xhc3M6IGAke3BmeH0tYnVsbGV0YCxcbiAgICAgIGJ1bGxldEFjdGl2ZUNsYXNzOiBgJHtwZnh9LWJ1bGxldC1hY3RpdmVgLFxuICAgICAgbW9kaWZpZXJDbGFzczogYCR7cGZ4fS1gLFxuICAgICAgY3VycmVudENsYXNzOiBgJHtwZnh9LWN1cnJlbnRgLFxuICAgICAgdG90YWxDbGFzczogYCR7cGZ4fS10b3RhbGAsXG4gICAgICBoaWRkZW5DbGFzczogYCR7cGZ4fS1oaWRkZW5gLFxuICAgICAgcHJvZ3Jlc3NiYXJGaWxsQ2xhc3M6IGAke3BmeH0tcHJvZ3Jlc3NiYXItZmlsbGAsXG4gICAgICBwcm9ncmVzc2Jhck9wcG9zaXRlQ2xhc3M6IGAke3BmeH0tcHJvZ3Jlc3NiYXItb3Bwb3NpdGVgLFxuICAgICAgY2xpY2thYmxlQ2xhc3M6IGAke3BmeH0tY2xpY2thYmxlYCxcbiAgICAgIGxvY2tDbGFzczogYCR7cGZ4fS1sb2NrYCxcbiAgICAgIGhvcml6b250YWxDbGFzczogYCR7cGZ4fS1ob3Jpem9udGFsYCxcbiAgICAgIHZlcnRpY2FsQ2xhc3M6IGAke3BmeH0tdmVydGljYWxgLFxuICAgICAgcGFnaW5hdGlvbkRpc2FibGVkQ2xhc3M6IGAke3BmeH0tZGlzYWJsZWRgXG4gICAgfVxuICB9KTtcbiAgc3dpcGVyLnBhZ2luYXRpb24gPSB7XG4gICAgZWw6IG51bGwsXG4gICAgYnVsbGV0czogW11cbiAgfTtcbiAgbGV0IGJ1bGxldFNpemU7XG4gIGxldCBkeW5hbWljQnVsbGV0SW5kZXggPSAwO1xuICBjb25zdCBtYWtlRWxlbWVudHNBcnJheSA9IGVsID0+IChBcnJheS5pc0FycmF5KGVsKSA/IGVsIDogW2VsXSkuZmlsdGVyKGUgPT4gISFlKTtcbiAgZnVuY3Rpb24gaXNQYWdpbmF0aW9uRGlzYWJsZWQoKSB7XG4gICAgcmV0dXJuICFzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uZWwgfHwgIXN3aXBlci5wYWdpbmF0aW9uLmVsIHx8IEFycmF5LmlzQXJyYXkoc3dpcGVyLnBhZ2luYXRpb24uZWwpICYmIHN3aXBlci5wYWdpbmF0aW9uLmVsLmxlbmd0aCA9PT0gMDtcbiAgfVxuICBmdW5jdGlvbiBzZXRTaWRlQnVsbGV0cyhidWxsZXRFbCwgcG9zaXRpb24pIHtcbiAgICBjb25zdCB7XG4gICAgICBidWxsZXRBY3RpdmVDbGFzc1xuICAgIH0gPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgaWYgKCFidWxsZXRFbCkgcmV0dXJuO1xuICAgIGJ1bGxldEVsID0gYnVsbGV0RWxbYCR7cG9zaXRpb24gPT09ICdwcmV2JyA/ICdwcmV2aW91cycgOiAnbmV4dCd9RWxlbWVudFNpYmxpbmdgXTtcbiAgICBpZiAoYnVsbGV0RWwpIHtcbiAgICAgIGJ1bGxldEVsLmNsYXNzTGlzdC5hZGQoYCR7YnVsbGV0QWN0aXZlQ2xhc3N9LSR7cG9zaXRpb259YCk7XG4gICAgICBidWxsZXRFbCA9IGJ1bGxldEVsW2Ake3Bvc2l0aW9uID09PSAncHJldicgPyAncHJldmlvdXMnIDogJ25leHQnfUVsZW1lbnRTaWJsaW5nYF07XG4gICAgICBpZiAoYnVsbGV0RWwpIHtcbiAgICAgICAgYnVsbGV0RWwuY2xhc3NMaXN0LmFkZChgJHtidWxsZXRBY3RpdmVDbGFzc30tJHtwb3NpdGlvbn0tJHtwb3NpdGlvbn1gKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gb25CdWxsZXRDbGljayhlKSB7XG4gICAgY29uc3QgYnVsbGV0RWwgPSBlLnRhcmdldC5jbG9zZXN0KGNsYXNzZXNUb1NlbGVjdG9yKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5idWxsZXRDbGFzcykpO1xuICAgIGlmICghYnVsbGV0RWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGluZGV4ID0gZWxlbWVudEluZGV4KGJ1bGxldEVsKSAqIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgaWYgKHN3aXBlci5yZWFsSW5kZXggPT09IGluZGV4KSByZXR1cm47XG4gICAgICBzd2lwZXIuc2xpZGVUb0xvb3AoaW5kZXgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhpbmRleCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHVwZGF0ZSgpIHtcbiAgICAvLyBSZW5kZXIgfHwgVXBkYXRlIFBhZ2luYXRpb24gYnVsbGV0cy9pdGVtc1xuICAgIGNvbnN0IHJ0bCA9IHN3aXBlci5ydGw7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgIGlmIChpc1BhZ2luYXRpb25EaXNhYmxlZCgpKSByZXR1cm47XG4gICAgbGV0IGVsID0gc3dpcGVyLnBhZ2luYXRpb24uZWw7XG4gICAgZWwgPSBtYWtlRWxlbWVudHNBcnJheShlbCk7XG4gICAgLy8gQ3VycmVudC9Ub3RhbFxuICAgIGxldCBjdXJyZW50O1xuICAgIGxldCBwcmV2aW91c0luZGV4O1xuICAgIGNvbnN0IHNsaWRlc0xlbmd0aCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICAgIGNvbnN0IHRvdGFsID0gc3dpcGVyLnBhcmFtcy5sb29wID8gTWF0aC5jZWlsKHNsaWRlc0xlbmd0aCAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApIDogc3dpcGVyLnNuYXBHcmlkLmxlbmd0aDtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICBwcmV2aW91c0luZGV4ID0gc3dpcGVyLnByZXZpb3VzUmVhbEluZGV4IHx8IDA7XG4gICAgICBjdXJyZW50ID0gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCA+IDEgPyBNYXRoLmZsb29yKHN3aXBlci5yZWFsSW5kZXggLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKSA6IHN3aXBlci5yZWFsSW5kZXg7XG4gICAgfSBlbHNlIGlmICh0eXBlb2Ygc3dpcGVyLnNuYXBJbmRleCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGN1cnJlbnQgPSBzd2lwZXIuc25hcEluZGV4O1xuICAgICAgcHJldmlvdXNJbmRleCA9IHN3aXBlci5wcmV2aW91c1NuYXBJbmRleDtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJldmlvdXNJbmRleCA9IHN3aXBlci5wcmV2aW91c0luZGV4IHx8IDA7XG4gICAgICBjdXJyZW50ID0gc3dpcGVyLmFjdGl2ZUluZGV4IHx8IDA7XG4gICAgfVxuICAgIC8vIFR5cGVzXG4gICAgaWYgKHBhcmFtcy50eXBlID09PSAnYnVsbGV0cycgJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cyAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGJ1bGxldHMgPSBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzO1xuICAgICAgbGV0IGZpcnN0SW5kZXg7XG4gICAgICBsZXQgbGFzdEluZGV4O1xuICAgICAgbGV0IG1pZEluZGV4O1xuICAgICAgaWYgKHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xuICAgICAgICBidWxsZXRTaXplID0gZWxlbWVudE91dGVyU2l6ZShidWxsZXRzWzBdLCBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnd2lkdGgnIDogJ2hlaWdodCcsIHRydWUpO1xuICAgICAgICBlbC5mb3JFYWNoKHN1YkVsID0+IHtcbiAgICAgICAgICBzdWJFbC5zdHlsZVtzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnd2lkdGgnIDogJ2hlaWdodCddID0gYCR7YnVsbGV0U2l6ZSAqIChwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzICsgNCl9cHhgO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgPiAxICYmIHByZXZpb3VzSW5kZXggIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGR5bmFtaWNCdWxsZXRJbmRleCArPSBjdXJyZW50IC0gKHByZXZpb3VzSW5kZXggfHwgMCk7XG4gICAgICAgICAgaWYgKGR5bmFtaWNCdWxsZXRJbmRleCA+IHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgLSAxKSB7XG4gICAgICAgICAgICBkeW5hbWljQnVsbGV0SW5kZXggPSBwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzIC0gMTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGR5bmFtaWNCdWxsZXRJbmRleCA8IDApIHtcbiAgICAgICAgICAgIGR5bmFtaWNCdWxsZXRJbmRleCA9IDA7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZpcnN0SW5kZXggPSBNYXRoLm1heChjdXJyZW50IC0gZHluYW1pY0J1bGxldEluZGV4LCAwKTtcbiAgICAgICAgbGFzdEluZGV4ID0gZmlyc3RJbmRleCArIChNYXRoLm1pbihidWxsZXRzLmxlbmd0aCwgcGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cykgLSAxKTtcbiAgICAgICAgbWlkSW5kZXggPSAobGFzdEluZGV4ICsgZmlyc3RJbmRleCkgLyAyO1xuICAgICAgfVxuICAgICAgYnVsbGV0cy5mb3JFYWNoKGJ1bGxldEVsID0+IHtcbiAgICAgICAgY29uc3QgY2xhc3Nlc1RvUmVtb3ZlID0gWy4uLlsnJywgJy1uZXh0JywgJy1uZXh0LW5leHQnLCAnLXByZXYnLCAnLXByZXYtcHJldicsICctbWFpbiddLm1hcChzdWZmaXggPT4gYCR7cGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzfSR7c3VmZml4fWApXS5tYXAocyA9PiB0eXBlb2YgcyA9PT0gJ3N0cmluZycgJiYgcy5pbmNsdWRlcygnICcpID8gcy5zcGxpdCgnICcpIDogcykuZmxhdCgpO1xuICAgICAgICBidWxsZXRFbC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzZXNUb1JlbW92ZSk7XG4gICAgICB9KTtcbiAgICAgIGlmIChlbC5sZW5ndGggPiAxKSB7XG4gICAgICAgIGJ1bGxldHMuZm9yRWFjaChidWxsZXQgPT4ge1xuICAgICAgICAgIGNvbnN0IGJ1bGxldEluZGV4ID0gZWxlbWVudEluZGV4KGJ1bGxldCk7XG4gICAgICAgICAgaWYgKGJ1bGxldEluZGV4ID09PSBjdXJyZW50KSB7XG4gICAgICAgICAgICBidWxsZXQuY2xhc3NMaXN0LmFkZCguLi5wYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgICAgICAgICBidWxsZXQuc2V0QXR0cmlidXRlKCdwYXJ0JywgJ2J1bGxldCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XG4gICAgICAgICAgICBpZiAoYnVsbGV0SW5kZXggPj0gZmlyc3RJbmRleCAmJiBidWxsZXRJbmRleCA8PSBsYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgYnVsbGV0LmNsYXNzTGlzdC5hZGQoLi4uYCR7cGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzfS1tYWluYC5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWxsZXRJbmRleCA9PT0gZmlyc3RJbmRleCkge1xuICAgICAgICAgICAgICBzZXRTaWRlQnVsbGV0cyhidWxsZXQsICdwcmV2Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYnVsbGV0SW5kZXggPT09IGxhc3RJbmRleCkge1xuICAgICAgICAgICAgICBzZXRTaWRlQnVsbGV0cyhidWxsZXQsICduZXh0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IGJ1bGxldCA9IGJ1bGxldHNbY3VycmVudF07XG4gICAgICAgIGlmIChidWxsZXQpIHtcbiAgICAgICAgICBidWxsZXQuY2xhc3NMaXN0LmFkZCguLi5wYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICAgICAgICBidWxsZXRzLmZvckVhY2goKGJ1bGxldEVsLCBidWxsZXRJbmRleCkgPT4ge1xuICAgICAgICAgICAgYnVsbGV0RWwuc2V0QXR0cmlidXRlKCdwYXJ0JywgYnVsbGV0SW5kZXggPT09IGN1cnJlbnQgPyAnYnVsbGV0LWFjdGl2ZScgOiAnYnVsbGV0Jyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xuICAgICAgICAgIGNvbnN0IGZpcnN0RGlzcGxheWVkQnVsbGV0ID0gYnVsbGV0c1tmaXJzdEluZGV4XTtcbiAgICAgICAgICBjb25zdCBsYXN0RGlzcGxheWVkQnVsbGV0ID0gYnVsbGV0c1tsYXN0SW5kZXhdO1xuICAgICAgICAgIGZvciAobGV0IGkgPSBmaXJzdEluZGV4OyBpIDw9IGxhc3RJbmRleDsgaSArPSAxKSB7XG4gICAgICAgICAgICBpZiAoYnVsbGV0c1tpXSkge1xuICAgICAgICAgICAgICBidWxsZXRzW2ldLmNsYXNzTGlzdC5hZGQoLi4uYCR7cGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzfS1tYWluYC5zcGxpdCgnICcpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgc2V0U2lkZUJ1bGxldHMoZmlyc3REaXNwbGF5ZWRCdWxsZXQsICdwcmV2Jyk7XG4gICAgICAgICAgc2V0U2lkZUJ1bGxldHMobGFzdERpc3BsYXllZEJ1bGxldCwgJ25leHQnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xuICAgICAgICBjb25zdCBkeW5hbWljQnVsbGV0c0xlbmd0aCA9IE1hdGgubWluKGJ1bGxldHMubGVuZ3RoLCBwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzICsgNCk7XG4gICAgICAgIGNvbnN0IGJ1bGxldHNPZmZzZXQgPSAoYnVsbGV0U2l6ZSAqIGR5bmFtaWNCdWxsZXRzTGVuZ3RoIC0gYnVsbGV0U2l6ZSkgLyAyIC0gbWlkSW5kZXggKiBidWxsZXRTaXplO1xuICAgICAgICBjb25zdCBvZmZzZXRQcm9wID0gcnRsID8gJ3JpZ2h0JyA6ICdsZWZ0JztcbiAgICAgICAgYnVsbGV0cy5mb3JFYWNoKGJ1bGxldCA9PiB7XG4gICAgICAgICAgYnVsbGV0LnN0eWxlW3N3aXBlci5pc0hvcml6b250YWwoKSA/IG9mZnNldFByb3AgOiAndG9wJ10gPSBgJHtidWxsZXRzT2Zmc2V0fXB4YDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGVsLmZvckVhY2goKHN1YkVsLCBzdWJFbEluZGV4KSA9PiB7XG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdmcmFjdGlvbicpIHtcbiAgICAgICAgc3ViRWwucXVlcnlTZWxlY3RvckFsbChjbGFzc2VzVG9TZWxlY3RvcihwYXJhbXMuY3VycmVudENsYXNzKSkuZm9yRWFjaChmcmFjdGlvbkVsID0+IHtcbiAgICAgICAgICBmcmFjdGlvbkVsLnRleHRDb250ZW50ID0gcGFyYW1zLmZvcm1hdEZyYWN0aW9uQ3VycmVudChjdXJyZW50ICsgMSk7XG4gICAgICAgIH0pO1xuICAgICAgICBzdWJFbC5xdWVyeVNlbGVjdG9yQWxsKGNsYXNzZXNUb1NlbGVjdG9yKHBhcmFtcy50b3RhbENsYXNzKSkuZm9yRWFjaCh0b3RhbEVsID0+IHtcbiAgICAgICAgICB0b3RhbEVsLnRleHRDb250ZW50ID0gcGFyYW1zLmZvcm1hdEZyYWN0aW9uVG90YWwodG90YWwpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ3Byb2dyZXNzYmFyJykge1xuICAgICAgICBsZXQgcHJvZ3Jlc3NiYXJEaXJlY3Rpb247XG4gICAgICAgIGlmIChwYXJhbXMucHJvZ3Jlc3NiYXJPcHBvc2l0ZSkge1xuICAgICAgICAgIHByb2dyZXNzYmFyRGlyZWN0aW9uID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ3ZlcnRpY2FsJyA6ICdob3Jpem9udGFsJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBwcm9ncmVzc2JhckRpcmVjdGlvbiA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/ICdob3Jpem9udGFsJyA6ICd2ZXJ0aWNhbCc7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3Qgc2NhbGUgPSAoY3VycmVudCArIDEpIC8gdG90YWw7XG4gICAgICAgIGxldCBzY2FsZVggPSAxO1xuICAgICAgICBsZXQgc2NhbGVZID0gMTtcbiAgICAgICAgaWYgKHByb2dyZXNzYmFyRGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgICAgICBzY2FsZVggPSBzY2FsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzY2FsZVkgPSBzY2FsZTtcbiAgICAgICAgfVxuICAgICAgICBzdWJFbC5xdWVyeVNlbGVjdG9yQWxsKGNsYXNzZXNUb1NlbGVjdG9yKHBhcmFtcy5wcm9ncmVzc2JhckZpbGxDbGFzcykpLmZvckVhY2gocHJvZ3Jlc3NFbCA9PiB7XG4gICAgICAgICAgcHJvZ3Jlc3NFbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMCwwLDApIHNjYWxlWCgke3NjYWxlWH0pIHNjYWxlWSgke3NjYWxlWX0pYDtcbiAgICAgICAgICBwcm9ncmVzc0VsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGAke3N3aXBlci5wYXJhbXMuc3BlZWR9bXNgO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2N1c3RvbScgJiYgcGFyYW1zLnJlbmRlckN1c3RvbSkge1xuICAgICAgICBzdWJFbC5pbm5lckhUTUwgPSBwYXJhbXMucmVuZGVyQ3VzdG9tKHN3aXBlciwgY3VycmVudCArIDEsIHRvdGFsKTtcbiAgICAgICAgaWYgKHN1YkVsSW5kZXggPT09IDApIGVtaXQoJ3BhZ2luYXRpb25SZW5kZXInLCBzdWJFbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc3ViRWxJbmRleCA9PT0gMCkgZW1pdCgncGFnaW5hdGlvblJlbmRlcicsIHN1YkVsKTtcbiAgICAgICAgZW1pdCgncGFnaW5hdGlvblVwZGF0ZScsIHN1YkVsKTtcbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgICAgc3ViRWwuY2xhc3NMaXN0W3N3aXBlci5pc0xvY2tlZCA/ICdhZGQnIDogJ3JlbW92ZSddKHBhcmFtcy5sb2NrQ2xhc3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIHJlbmRlcigpIHtcbiAgICAvLyBSZW5kZXIgQ29udGFpbmVyXG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgIGlmIChpc1BhZ2luYXRpb25EaXNhYmxlZCgpKSByZXR1cm47XG4gICAgY29uc3Qgc2xpZGVzTGVuZ3RoID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIDogc3dpcGVyLmdyaWQgJiYgc3dpcGVyLnBhcmFtcy5ncmlkLnJvd3MgPiAxID8gc3dpcGVyLnNsaWRlcy5sZW5ndGggLyBNYXRoLmNlaWwoc3dpcGVyLnBhcmFtcy5ncmlkLnJvd3MpIDogc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG4gICAgbGV0IGVsID0gc3dpcGVyLnBhZ2luYXRpb24uZWw7XG4gICAgZWwgPSBtYWtlRWxlbWVudHNBcnJheShlbCk7XG4gICAgbGV0IHBhZ2luYXRpb25IVE1MID0gJyc7XG4gICAgaWYgKHBhcmFtcy50eXBlID09PSAnYnVsbGV0cycpIHtcbiAgICAgIGxldCBudW1iZXJPZkJ1bGxldHMgPSBzd2lwZXIucGFyYW1zLmxvb3AgPyBNYXRoLmNlaWwoc2xpZGVzTGVuZ3RoIC8gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCkgOiBzd2lwZXIuc25hcEdyaWQubGVuZ3RoO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuZnJlZU1vZGUgJiYgc3dpcGVyLnBhcmFtcy5mcmVlTW9kZS5lbmFibGVkICYmIG51bWJlck9mQnVsbGV0cyA+IHNsaWRlc0xlbmd0aCkge1xuICAgICAgICBudW1iZXJPZkJ1bGxldHMgPSBzbGlkZXNMZW5ndGg7XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bWJlck9mQnVsbGV0czsgaSArPSAxKSB7XG4gICAgICAgIGlmIChwYXJhbXMucmVuZGVyQnVsbGV0KSB7XG4gICAgICAgICAgcGFnaW5hdGlvbkhUTUwgKz0gcGFyYW1zLnJlbmRlckJ1bGxldC5jYWxsKHN3aXBlciwgaSwgcGFyYW1zLmJ1bGxldENsYXNzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBgPCR7cGFyYW1zLmJ1bGxldEVsZW1lbnR9ICR7c3dpcGVyLmlzRWxlbWVudCA/ICdwYXJ0PVwiYnVsbGV0XCInIDogJyd9IGNsYXNzPVwiJHtwYXJhbXMuYnVsbGV0Q2xhc3N9XCI+PC8ke3BhcmFtcy5idWxsZXRFbGVtZW50fT5gO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2ZyYWN0aW9uJykge1xuICAgICAgaWYgKHBhcmFtcy5yZW5kZXJGcmFjdGlvbikge1xuICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IHBhcmFtcy5yZW5kZXJGcmFjdGlvbi5jYWxsKHN3aXBlciwgcGFyYW1zLmN1cnJlbnRDbGFzcywgcGFyYW1zLnRvdGFsQ2xhc3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFnaW5hdGlvbkhUTUwgPSBgPHNwYW4gY2xhc3M9XCIke3BhcmFtcy5jdXJyZW50Q2xhc3N9XCI+PC9zcGFuPmAgKyAnIC8gJyArIGA8c3BhbiBjbGFzcz1cIiR7cGFyYW1zLnRvdGFsQ2xhc3N9XCI+PC9zcGFuPmA7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ3Byb2dyZXNzYmFyJykge1xuICAgICAgaWYgKHBhcmFtcy5yZW5kZXJQcm9ncmVzc2Jhcikge1xuICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IHBhcmFtcy5yZW5kZXJQcm9ncmVzc2Jhci5jYWxsKHN3aXBlciwgcGFyYW1zLnByb2dyZXNzYmFyRmlsbENsYXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhZ2luYXRpb25IVE1MID0gYDxzcGFuIGNsYXNzPVwiJHtwYXJhbXMucHJvZ3Jlc3NiYXJGaWxsQ2xhc3N9XCI+PC9zcGFuPmA7XG4gICAgICB9XG4gICAgfVxuICAgIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMgPSBbXTtcbiAgICBlbC5mb3JFYWNoKHN1YkVsID0+IHtcbiAgICAgIGlmIChwYXJhbXMudHlwZSAhPT0gJ2N1c3RvbScpIHtcbiAgICAgICAgc3ViRWwuaW5uZXJIVE1MID0gcGFnaW5hdGlvbkhUTUwgfHwgJyc7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJykge1xuICAgICAgICBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzLnB1c2goLi4uc3ViRWwucXVlcnlTZWxlY3RvckFsbChjbGFzc2VzVG9TZWxlY3RvcihwYXJhbXMuYnVsbGV0Q2xhc3MpKSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaWYgKHBhcmFtcy50eXBlICE9PSAnY3VzdG9tJykge1xuICAgICAgZW1pdCgncGFnaW5hdGlvblJlbmRlcicsIGVsWzBdKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24gPSBjcmVhdGVFbGVtZW50SWZOb3REZWZpbmVkKHN3aXBlciwgc3dpcGVyLm9yaWdpbmFsUGFyYW1zLnBhZ2luYXRpb24sIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbiwge1xuICAgICAgZWw6ICdzd2lwZXItcGFnaW5hdGlvbidcbiAgICB9KTtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgaWYgKCFwYXJhbXMuZWwpIHJldHVybjtcbiAgICBsZXQgZWw7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnICYmIHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICAgIGVsID0gc3dpcGVyLmVsLnF1ZXJ5U2VsZWN0b3IocGFyYW1zLmVsKTtcbiAgICB9XG4gICAgaWYgKCFlbCAmJiB0eXBlb2YgcGFyYW1zLmVsID09PSAnc3RyaW5nJykge1xuICAgICAgZWwgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwYXJhbXMuZWwpXTtcbiAgICB9XG4gICAgaWYgKCFlbCkge1xuICAgICAgZWwgPSBwYXJhbXMuZWw7XG4gICAgfVxuICAgIGlmICghZWwgfHwgZWwubGVuZ3RoID09PSAwKSByZXR1cm47XG4gICAgaWYgKHN3aXBlci5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiYgdHlwZW9mIHBhcmFtcy5lbCA9PT0gJ3N0cmluZycgJiYgQXJyYXkuaXNBcnJheShlbCkgJiYgZWwubGVuZ3RoID4gMSkge1xuICAgICAgZWwgPSBbLi4uc3dpcGVyLmVsLnF1ZXJ5U2VsZWN0b3JBbGwocGFyYW1zLmVsKV07XG4gICAgICAvLyBjaGVjayBpZiBpdCBiZWxvbmdzIHRvIGFub3RoZXIgbmVzdGVkIFN3aXBlclxuICAgICAgaWYgKGVsLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZWwgPSBlbC5maWx0ZXIoc3ViRWwgPT4ge1xuICAgICAgICAgIGlmIChlbGVtZW50UGFyZW50cyhzdWJFbCwgJy5zd2lwZXInKVswXSAhPT0gc3dpcGVyLmVsKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0pWzBdO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoQXJyYXkuaXNBcnJheShlbCkgJiYgZWwubGVuZ3RoID09PSAxKSBlbCA9IGVsWzBdO1xuICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLnBhZ2luYXRpb24sIHtcbiAgICAgIGVsXG4gICAgfSk7XG4gICAgZWwgPSBtYWtlRWxlbWVudHNBcnJheShlbCk7XG4gICAgZWwuZm9yRWFjaChzdWJFbCA9PiB7XG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJyAmJiBwYXJhbXMuY2xpY2thYmxlKSB7XG4gICAgICAgIHN1YkVsLmNsYXNzTGlzdC5hZGQoLi4uKHBhcmFtcy5jbGlja2FibGVDbGFzcyB8fCAnJykuc3BsaXQoJyAnKSk7XG4gICAgICB9XG4gICAgICBzdWJFbC5jbGFzc0xpc3QuYWRkKHBhcmFtcy5tb2RpZmllckNsYXNzICsgcGFyYW1zLnR5cGUpO1xuICAgICAgc3ViRWwuY2xhc3NMaXN0LmFkZChzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBwYXJhbXMuaG9yaXpvbnRhbENsYXNzIDogcGFyYW1zLnZlcnRpY2FsQ2xhc3MpO1xuICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAnYnVsbGV0cycgJiYgcGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XG4gICAgICAgIHN1YkVsLmNsYXNzTGlzdC5hZGQoYCR7cGFyYW1zLm1vZGlmaWVyQ2xhc3N9JHtwYXJhbXMudHlwZX0tZHluYW1pY2ApO1xuICAgICAgICBkeW5hbWljQnVsbGV0SW5kZXggPSAwO1xuICAgICAgICBpZiAocGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyA8IDEpIHtcbiAgICAgICAgICBwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzID0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAncHJvZ3Jlc3NiYXInICYmIHBhcmFtcy5wcm9ncmVzc2Jhck9wcG9zaXRlKSB7XG4gICAgICAgIHN1YkVsLmNsYXNzTGlzdC5hZGQocGFyYW1zLnByb2dyZXNzYmFyT3Bwb3NpdGVDbGFzcyk7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLmNsaWNrYWJsZSkge1xuICAgICAgICBzdWJFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQnVsbGV0Q2xpY2spO1xuICAgICAgfVxuICAgICAgaWYgKCFzd2lwZXIuZW5hYmxlZCkge1xuICAgICAgICBzdWJFbC5jbGFzc0xpc3QuYWRkKHBhcmFtcy5sb2NrQ2xhc3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgIGlmIChpc1BhZ2luYXRpb25EaXNhYmxlZCgpKSByZXR1cm47XG4gICAgbGV0IGVsID0gc3dpcGVyLnBhZ2luYXRpb24uZWw7XG4gICAgaWYgKGVsKSB7XG4gICAgICBlbCA9IG1ha2VFbGVtZW50c0FycmF5KGVsKTtcbiAgICAgIGVsLmZvckVhY2goc3ViRWwgPT4ge1xuICAgICAgICBzdWJFbC5jbGFzc0xpc3QucmVtb3ZlKHBhcmFtcy5oaWRkZW5DbGFzcyk7XG4gICAgICAgIHN1YkVsLmNsYXNzTGlzdC5yZW1vdmUocGFyYW1zLm1vZGlmaWVyQ2xhc3MgKyBwYXJhbXMudHlwZSk7XG4gICAgICAgIHN1YkVsLmNsYXNzTGlzdC5yZW1vdmUoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gcGFyYW1zLmhvcml6b250YWxDbGFzcyA6IHBhcmFtcy52ZXJ0aWNhbENsYXNzKTtcbiAgICAgICAgaWYgKHBhcmFtcy5jbGlja2FibGUpIHtcbiAgICAgICAgICBzdWJFbC5jbGFzc0xpc3QucmVtb3ZlKC4uLihwYXJhbXMuY2xpY2thYmxlQ2xhc3MgfHwgJycpLnNwbGl0KCcgJykpO1xuICAgICAgICAgIHN1YkVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25CdWxsZXRDbGljayk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cykgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5mb3JFYWNoKHN1YkVsID0+IHN1YkVsLmNsYXNzTGlzdC5yZW1vdmUoLi4ucGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzLnNwbGl0KCcgJykpKTtcbiAgfVxuICBvbignY2hhbmdlRGlyZWN0aW9uJywgKCkgPT4ge1xuICAgIGlmICghc3dpcGVyLnBhZ2luYXRpb24gfHwgIXN3aXBlci5wYWdpbmF0aW9uLmVsKSByZXR1cm47XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgIGxldCB7XG4gICAgICBlbFxuICAgIH0gPSBzd2lwZXIucGFnaW5hdGlvbjtcbiAgICBlbCA9IG1ha2VFbGVtZW50c0FycmF5KGVsKTtcbiAgICBlbC5mb3JFYWNoKHN1YkVsID0+IHtcbiAgICAgIHN1YkVsLmNsYXNzTGlzdC5yZW1vdmUocGFyYW1zLmhvcml6b250YWxDbGFzcywgcGFyYW1zLnZlcnRpY2FsQ2xhc3MpO1xuICAgICAgc3ViRWwuY2xhc3NMaXN0LmFkZChzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBwYXJhbXMuaG9yaXpvbnRhbENsYXNzIDogcGFyYW1zLnZlcnRpY2FsQ2xhc3MpO1xuICAgIH0pO1xuICB9KTtcbiAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5lbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBkaXNhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluaXQoKTtcbiAgICAgIHJlbmRlcigpO1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuICB9KTtcbiAgb24oJ2FjdGl2ZUluZGV4Q2hhbmdlJywgKCkgPT4ge1xuICAgIGlmICh0eXBlb2Ygc3dpcGVyLnNuYXBJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cbiAgfSk7XG4gIG9uKCdzbmFwSW5kZXhDaGFuZ2UnLCAoKSA9PiB7XG4gICAgdXBkYXRlKCk7XG4gIH0pO1xuICBvbignc25hcEdyaWRMZW5ndGhDaGFuZ2UnLCAoKSA9PiB7XG4gICAgcmVuZGVyKCk7XG4gICAgdXBkYXRlKCk7XG4gIH0pO1xuICBvbignZGVzdHJveScsICgpID0+IHtcbiAgICBkZXN0cm95KCk7XG4gIH0pO1xuICBvbignZW5hYmxlIGRpc2FibGUnLCAoKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgIGVsXG4gICAgfSA9IHN3aXBlci5wYWdpbmF0aW9uO1xuICAgIGlmIChlbCkge1xuICAgICAgZWwgPSBtYWtlRWxlbWVudHNBcnJheShlbCk7XG4gICAgICBlbC5mb3JFYWNoKHN1YkVsID0+IHN1YkVsLmNsYXNzTGlzdFtzd2lwZXIuZW5hYmxlZCA/ICdyZW1vdmUnIDogJ2FkZCddKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5sb2NrQ2xhc3MpKTtcbiAgICB9XG4gIH0pO1xuICBvbignbG9jayB1bmxvY2snLCAoKSA9PiB7XG4gICAgdXBkYXRlKCk7XG4gIH0pO1xuICBvbignY2xpY2snLCAoX3MsIGUpID0+IHtcbiAgICBjb25zdCB0YXJnZXRFbCA9IGUudGFyZ2V0O1xuICAgIGNvbnN0IGVsID0gbWFrZUVsZW1lbnRzQXJyYXkoc3dpcGVyLnBhZ2luYXRpb24uZWwpO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uZWwgJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmhpZGVPbkNsaWNrICYmIGVsICYmIGVsLmxlbmd0aCA+IDAgJiYgIXRhcmdldEVsLmNsYXNzTGlzdC5jb250YWlucyhzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0Q2xhc3MpKSB7XG4gICAgICBpZiAoc3dpcGVyLm5hdmlnYXRpb24gJiYgKHN3aXBlci5uYXZpZ2F0aW9uLm5leHRFbCAmJiB0YXJnZXRFbCA9PT0gc3dpcGVyLm5hdmlnYXRpb24ubmV4dEVsIHx8IHN3aXBlci5uYXZpZ2F0aW9uLnByZXZFbCAmJiB0YXJnZXRFbCA9PT0gc3dpcGVyLm5hdmlnYXRpb24ucHJldkVsKSkgcmV0dXJuO1xuICAgICAgY29uc3QgaXNIaWRkZW4gPSBlbFswXS5jbGFzc0xpc3QuY29udGFpbnMoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgIGlmIChpc0hpZGRlbiA9PT0gdHJ1ZSkge1xuICAgICAgICBlbWl0KCdwYWdpbmF0aW9uU2hvdycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW1pdCgncGFnaW5hdGlvbkhpZGUnKTtcbiAgICAgIH1cbiAgICAgIGVsLmZvckVhY2goc3ViRWwgPT4gc3ViRWwuY2xhc3NMaXN0LnRvZ2dsZShzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uaGlkZGVuQ2xhc3MpKTtcbiAgICB9XG4gIH0pO1xuICBjb25zdCBlbmFibGUgPSAoKSA9PiB7XG4gICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5yZW1vdmUoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLnBhZ2luYXRpb25EaXNhYmxlZENsYXNzKTtcbiAgICBsZXQge1xuICAgICAgZWxcbiAgICB9ID0gc3dpcGVyLnBhZ2luYXRpb247XG4gICAgaWYgKGVsKSB7XG4gICAgICBlbCA9IG1ha2VFbGVtZW50c0FycmF5KGVsKTtcbiAgICAgIGVsLmZvckVhY2goc3ViRWwgPT4gc3ViRWwuY2xhc3NMaXN0LnJlbW92ZShzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24ucGFnaW5hdGlvbkRpc2FibGVkQ2xhc3MpKTtcbiAgICB9XG4gICAgaW5pdCgpO1xuICAgIHJlbmRlcigpO1xuICAgIHVwZGF0ZSgpO1xuICB9O1xuICBjb25zdCBkaXNhYmxlID0gKCkgPT4ge1xuICAgIHN3aXBlci5lbC5jbGFzc0xpc3QuYWRkKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5wYWdpbmF0aW9uRGlzYWJsZWRDbGFzcyk7XG4gICAgbGV0IHtcbiAgICAgIGVsXG4gICAgfSA9IHN3aXBlci5wYWdpbmF0aW9uO1xuICAgIGlmIChlbCkge1xuICAgICAgZWwgPSBtYWtlRWxlbWVudHNBcnJheShlbCk7XG4gICAgICBlbC5mb3JFYWNoKHN1YkVsID0+IHN1YkVsLmNsYXNzTGlzdC5hZGQoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLnBhZ2luYXRpb25EaXNhYmxlZENsYXNzKSk7XG4gICAgfVxuICAgIGRlc3Ryb3koKTtcbiAgfTtcbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIucGFnaW5hdGlvbiwge1xuICAgIGVuYWJsZSxcbiAgICBkaXNhYmxlLFxuICAgIHJlbmRlcixcbiAgICB1cGRhdGUsXG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH0pO1xufVxuXG5leHBvcnQgeyBQYWdpbmF0aW9uIGFzIGRlZmF1bHQgfTtcbiIsICJpbXBvcnQgeyBnIGFzIGdldERvY3VtZW50IH0gZnJvbSAnLi4vc2hhcmVkL3Nzci13aW5kb3cuZXNtLm1qcyc7XG5pbXBvcnQgeyBoIGFzIGNsYXNzZXNUb1Rva2VucywgYyBhcyBjcmVhdGVFbGVtZW50LCBuIGFzIG5leHRUaWNrLCBiIGFzIGVsZW1lbnRPZmZzZXQgfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMubWpzJztcbmltcG9ydCB7IGMgYXMgY3JlYXRlRWxlbWVudElmTm90RGVmaW5lZCB9IGZyb20gJy4uL3NoYXJlZC9jcmVhdGUtZWxlbWVudC1pZi1ub3QtZGVmaW5lZC5tanMnO1xuaW1wb3J0IHsgYyBhcyBjbGFzc2VzVG9TZWxlY3RvciB9IGZyb20gJy4uL3NoYXJlZC9jbGFzc2VzLXRvLXNlbGVjdG9yLm1qcyc7XG5cbmZ1bmN0aW9uIFNjcm9sbGJhcihfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIGV4dGVuZFBhcmFtcyxcbiAgICBvbixcbiAgICBlbWl0XG4gIH0gPSBfcmVmO1xuICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gIGxldCBpc1RvdWNoZWQgPSBmYWxzZTtcbiAgbGV0IHRpbWVvdXQgPSBudWxsO1xuICBsZXQgZHJhZ1RpbWVvdXQgPSBudWxsO1xuICBsZXQgZHJhZ1N0YXJ0UG9zO1xuICBsZXQgZHJhZ1NpemU7XG4gIGxldCB0cmFja1NpemU7XG4gIGxldCBkaXZpZGVyO1xuICBleHRlbmRQYXJhbXMoe1xuICAgIHNjcm9sbGJhcjoge1xuICAgICAgZWw6IG51bGwsXG4gICAgICBkcmFnU2l6ZTogJ2F1dG8nLFxuICAgICAgaGlkZTogZmFsc2UsXG4gICAgICBkcmFnZ2FibGU6IGZhbHNlLFxuICAgICAgc25hcE9uUmVsZWFzZTogdHJ1ZSxcbiAgICAgIGxvY2tDbGFzczogJ3N3aXBlci1zY3JvbGxiYXItbG9jaycsXG4gICAgICBkcmFnQ2xhc3M6ICdzd2lwZXItc2Nyb2xsYmFyLWRyYWcnLFxuICAgICAgc2Nyb2xsYmFyRGlzYWJsZWRDbGFzczogJ3N3aXBlci1zY3JvbGxiYXItZGlzYWJsZWQnLFxuICAgICAgaG9yaXpvbnRhbENsYXNzOiBgc3dpcGVyLXNjcm9sbGJhci1ob3Jpem9udGFsYCxcbiAgICAgIHZlcnRpY2FsQ2xhc3M6IGBzd2lwZXItc2Nyb2xsYmFyLXZlcnRpY2FsYFxuICAgIH1cbiAgfSk7XG4gIHN3aXBlci5zY3JvbGxiYXIgPSB7XG4gICAgZWw6IG51bGwsXG4gICAgZHJhZ0VsOiBudWxsXG4gIH07XG4gIGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsIHx8ICFzd2lwZXIuc2Nyb2xsYmFyLmVsKSByZXR1cm47XG4gICAgY29uc3Qge1xuICAgICAgc2Nyb2xsYmFyLFxuICAgICAgcnRsVHJhbnNsYXRlOiBydGxcbiAgICB9ID0gc3dpcGVyO1xuICAgIGNvbnN0IHtcbiAgICAgIGRyYWdFbCxcbiAgICAgIGVsXG4gICAgfSA9IHNjcm9sbGJhcjtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICBjb25zdCBwcm9ncmVzcyA9IHN3aXBlci5wYXJhbXMubG9vcCA/IHN3aXBlci5wcm9ncmVzc0xvb3AgOiBzd2lwZXIucHJvZ3Jlc3M7XG4gICAgbGV0IG5ld1NpemUgPSBkcmFnU2l6ZTtcbiAgICBsZXQgbmV3UG9zID0gKHRyYWNrU2l6ZSAtIGRyYWdTaXplKSAqIHByb2dyZXNzO1xuICAgIGlmIChydGwpIHtcbiAgICAgIG5ld1BvcyA9IC1uZXdQb3M7XG4gICAgICBpZiAobmV3UG9zID4gMCkge1xuICAgICAgICBuZXdTaXplID0gZHJhZ1NpemUgLSBuZXdQb3M7XG4gICAgICAgIG5ld1BvcyA9IDA7XG4gICAgICB9IGVsc2UgaWYgKC1uZXdQb3MgKyBkcmFnU2l6ZSA+IHRyYWNrU2l6ZSkge1xuICAgICAgICBuZXdTaXplID0gdHJhY2tTaXplICsgbmV3UG9zO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAobmV3UG9zIDwgMCkge1xuICAgICAgbmV3U2l6ZSA9IGRyYWdTaXplICsgbmV3UG9zO1xuICAgICAgbmV3UG9zID0gMDtcbiAgICB9IGVsc2UgaWYgKG5ld1BvcyArIGRyYWdTaXplID4gdHJhY2tTaXplKSB7XG4gICAgICBuZXdTaXplID0gdHJhY2tTaXplIC0gbmV3UG9zO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICBkcmFnRWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7bmV3UG9zfXB4LCAwLCAwKWA7XG4gICAgICBkcmFnRWwuc3R5bGUud2lkdGggPSBgJHtuZXdTaXplfXB4YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZHJhZ0VsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgwcHgsICR7bmV3UG9zfXB4LCAwKWA7XG4gICAgICBkcmFnRWwuc3R5bGUuaGVpZ2h0ID0gYCR7bmV3U2l6ZX1weGA7XG4gICAgfVxuICAgIGlmIChwYXJhbXMuaGlkZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgZWwuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICBlbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnNDAwbXMnO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24pIHtcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsIHx8ICFzd2lwZXIuc2Nyb2xsYmFyLmVsKSByZXR1cm47XG4gICAgc3dpcGVyLnNjcm9sbGJhci5kcmFnRWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7ZHVyYXRpb259bXNgO1xuICB9XG4gIGZ1bmN0aW9uIHVwZGF0ZVNpemUoKSB7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgcmV0dXJuO1xuICAgIGNvbnN0IHtcbiAgICAgIHNjcm9sbGJhclxuICAgIH0gPSBzd2lwZXI7XG4gICAgY29uc3Qge1xuICAgICAgZHJhZ0VsLFxuICAgICAgZWxcbiAgICB9ID0gc2Nyb2xsYmFyO1xuICAgIGRyYWdFbC5zdHlsZS53aWR0aCA9ICcnO1xuICAgIGRyYWdFbC5zdHlsZS5oZWlnaHQgPSAnJztcbiAgICB0cmFja1NpemUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBlbC5vZmZzZXRXaWR0aCA6IGVsLm9mZnNldEhlaWdodDtcbiAgICBkaXZpZGVyID0gc3dpcGVyLnNpemUgLyAoc3dpcGVyLnZpcnR1YWxTaXplICsgc3dpcGVyLnBhcmFtcy5zbGlkZXNPZmZzZXRCZWZvcmUgLSAoc3dpcGVyLnBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHN3aXBlci5zbmFwR3JpZFswXSA6IDApKTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ1NpemUgPT09ICdhdXRvJykge1xuICAgICAgZHJhZ1NpemUgPSB0cmFja1NpemUgKiBkaXZpZGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnU2l6ZSA9IHBhcnNlSW50KHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmRyYWdTaXplLCAxMCk7XG4gICAgfVxuICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgIGRyYWdFbC5zdHlsZS53aWR0aCA9IGAke2RyYWdTaXplfXB4YDtcbiAgICB9IGVsc2Uge1xuICAgICAgZHJhZ0VsLnN0eWxlLmhlaWdodCA9IGAke2RyYWdTaXplfXB4YDtcbiAgICB9XG4gICAgaWYgKGRpdmlkZXIgPj0gMSkge1xuICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICcnO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuaGlkZSkge1xuICAgICAgZWwuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgIHNjcm9sbGJhci5lbC5jbGFzc0xpc3Rbc3dpcGVyLmlzTG9ja2VkID8gJ2FkZCcgOiAncmVtb3ZlJ10oc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIubG9ja0NsYXNzKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZ2V0UG9pbnRlclBvc2l0aW9uKGUpIHtcbiAgICByZXR1cm4gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gZS5jbGllbnRYIDogZS5jbGllbnRZO1xuICB9XG4gIGZ1bmN0aW9uIHNldERyYWdQb3NpdGlvbihlKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2Nyb2xsYmFyLFxuICAgICAgcnRsVHJhbnNsYXRlOiBydGxcbiAgICB9ID0gc3dpcGVyO1xuICAgIGNvbnN0IHtcbiAgICAgIGVsXG4gICAgfSA9IHNjcm9sbGJhcjtcbiAgICBsZXQgcG9zaXRpb25SYXRpbztcbiAgICBwb3NpdGlvblJhdGlvID0gKGdldFBvaW50ZXJQb3NpdGlvbihlKSAtIGVsZW1lbnRPZmZzZXQoZWwpW3N3aXBlci5pc0hvcml6b250YWwoKSA/ICdsZWZ0JyA6ICd0b3AnXSAtIChkcmFnU3RhcnRQb3MgIT09IG51bGwgPyBkcmFnU3RhcnRQb3MgOiBkcmFnU2l6ZSAvIDIpKSAvICh0cmFja1NpemUgLSBkcmFnU2l6ZSk7XG4gICAgcG9zaXRpb25SYXRpbyA9IE1hdGgubWF4KE1hdGgubWluKHBvc2l0aW9uUmF0aW8sIDEpLCAwKTtcbiAgICBpZiAocnRsKSB7XG4gICAgICBwb3NpdGlvblJhdGlvID0gMSAtIHBvc2l0aW9uUmF0aW87XG4gICAgfVxuICAgIGNvbnN0IHBvc2l0aW9uID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpICsgKHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgKiBwb3NpdGlvblJhdGlvO1xuICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyhwb3NpdGlvbik7XG4gICAgc3dpcGVyLnNldFRyYW5zbGF0ZShwb3NpdGlvbik7XG4gICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgfVxuICBmdW5jdGlvbiBvbkRyYWdTdGFydChlKSB7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XG4gICAgY29uc3Qge1xuICAgICAgc2Nyb2xsYmFyLFxuICAgICAgd3JhcHBlckVsXG4gICAgfSA9IHN3aXBlcjtcbiAgICBjb25zdCB7XG4gICAgICBlbCxcbiAgICAgIGRyYWdFbFxuICAgIH0gPSBzY3JvbGxiYXI7XG4gICAgaXNUb3VjaGVkID0gdHJ1ZTtcbiAgICBkcmFnU3RhcnRQb3MgPSBlLnRhcmdldCA9PT0gZHJhZ0VsID8gZ2V0UG9pbnRlclBvc2l0aW9uKGUpIC0gZS50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KClbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCddIDogbnVsbDtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB3cmFwcGVyRWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzEwMG1zJztcbiAgICBkcmFnRWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzEwMG1zJztcbiAgICBzZXREcmFnUG9zaXRpb24oZSk7XG4gICAgY2xlYXJUaW1lb3V0KGRyYWdUaW1lb3V0KTtcbiAgICBlbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnMG1zJztcbiAgICBpZiAocGFyYW1zLmhpZGUpIHtcbiAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlWydzY3JvbGwtc25hcC10eXBlJ10gPSAnbm9uZSc7XG4gICAgfVxuICAgIGVtaXQoJ3Njcm9sbGJhckRyYWdTdGFydCcsIGUpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ01vdmUoZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNjcm9sbGJhcixcbiAgICAgIHdyYXBwZXJFbFxuICAgIH0gPSBzd2lwZXI7XG4gICAgY29uc3Qge1xuICAgICAgZWwsXG4gICAgICBkcmFnRWxcbiAgICB9ID0gc2Nyb2xsYmFyO1xuICAgIGlmICghaXNUb3VjaGVkKSByZXR1cm47XG4gICAgaWYgKGUucHJldmVudERlZmF1bHQpIGUucHJldmVudERlZmF1bHQoKTtlbHNlIGUucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgICBzZXREcmFnUG9zaXRpb24oZSk7XG4gICAgd3JhcHBlckVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcwbXMnO1xuICAgIGVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcwbXMnO1xuICAgIGRyYWdFbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnMG1zJztcbiAgICBlbWl0KCdzY3JvbGxiYXJEcmFnTW92ZScsIGUpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ0VuZChlKSB7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XG4gICAgY29uc3Qge1xuICAgICAgc2Nyb2xsYmFyLFxuICAgICAgd3JhcHBlckVsXG4gICAgfSA9IHN3aXBlcjtcbiAgICBjb25zdCB7XG4gICAgICBlbFxuICAgIH0gPSBzY3JvbGxiYXI7XG4gICAgaWYgKCFpc1RvdWNoZWQpIHJldHVybjtcbiAgICBpc1RvdWNoZWQgPSBmYWxzZTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlWydzY3JvbGwtc25hcC10eXBlJ10gPSAnJztcbiAgICAgIHdyYXBwZXJFbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnJztcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5oaWRlKSB7XG4gICAgICBjbGVhclRpbWVvdXQoZHJhZ1RpbWVvdXQpO1xuICAgICAgZHJhZ1RpbWVvdXQgPSBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgICAgICBlbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnNDAwbXMnO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfVxuICAgIGVtaXQoJ3Njcm9sbGJhckRyYWdFbmQnLCBlKTtcbiAgICBpZiAocGFyYW1zLnNuYXBPblJlbGVhc2UpIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvQ2xvc2VzdCgpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBldmVudHMobWV0aG9kKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2Nyb2xsYmFyLFxuICAgICAgcGFyYW1zXG4gICAgfSA9IHN3aXBlcjtcbiAgICBjb25zdCBlbCA9IHNjcm9sbGJhci5lbDtcbiAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgY29uc3QgdGFyZ2V0ID0gZWw7XG4gICAgY29uc3QgYWN0aXZlTGlzdGVuZXIgPSBwYXJhbXMucGFzc2l2ZUxpc3RlbmVycyA/IHtcbiAgICAgIHBhc3NpdmU6IGZhbHNlLFxuICAgICAgY2FwdHVyZTogZmFsc2VcbiAgICB9IDogZmFsc2U7XG4gICAgY29uc3QgcGFzc2l2ZUxpc3RlbmVyID0gcGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7XG4gICAgICBwYXNzaXZlOiB0cnVlLFxuICAgICAgY2FwdHVyZTogZmFsc2VcbiAgICB9IDogZmFsc2U7XG4gICAgaWYgKCF0YXJnZXQpIHJldHVybjtcbiAgICBjb25zdCBldmVudE1ldGhvZCA9IG1ldGhvZCA9PT0gJ29uJyA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcbiAgICB0YXJnZXRbZXZlbnRNZXRob2RdKCdwb2ludGVyZG93bicsIG9uRHJhZ1N0YXJ0LCBhY3RpdmVMaXN0ZW5lcik7XG4gICAgZG9jdW1lbnRbZXZlbnRNZXRob2RdKCdwb2ludGVybW92ZScsIG9uRHJhZ01vdmUsIGFjdGl2ZUxpc3RlbmVyKTtcbiAgICBkb2N1bWVudFtldmVudE1ldGhvZF0oJ3BvaW50ZXJ1cCcsIG9uRHJhZ0VuZCwgcGFzc2l2ZUxpc3RlbmVyKTtcbiAgfVxuICBmdW5jdGlvbiBlbmFibGVEcmFnZ2FibGUoKSB7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgcmV0dXJuO1xuICAgIGV2ZW50cygnb24nKTtcbiAgfVxuICBmdW5jdGlvbiBkaXNhYmxlRHJhZ2dhYmxlKCkge1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwgfHwgIXN3aXBlci5zY3JvbGxiYXIuZWwpIHJldHVybjtcbiAgICBldmVudHMoJ29mZicpO1xuICB9XG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2Nyb2xsYmFyLFxuICAgICAgZWw6IHN3aXBlckVsXG4gICAgfSA9IHN3aXBlcjtcbiAgICBzd2lwZXIucGFyYW1zLnNjcm9sbGJhciA9IGNyZWF0ZUVsZW1lbnRJZk5vdERlZmluZWQoc3dpcGVyLCBzd2lwZXIub3JpZ2luYWxQYXJhbXMuc2Nyb2xsYmFyLCBzd2lwZXIucGFyYW1zLnNjcm9sbGJhciwge1xuICAgICAgZWw6ICdzd2lwZXItc2Nyb2xsYmFyJ1xuICAgIH0pO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyO1xuICAgIGlmICghcGFyYW1zLmVsKSByZXR1cm47XG4gICAgbGV0IGVsO1xuICAgIGlmICh0eXBlb2YgcGFyYW1zLmVsID09PSAnc3RyaW5nJyAmJiBzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgICBlbCA9IHN3aXBlci5lbC5xdWVyeVNlbGVjdG9yKHBhcmFtcy5lbCk7XG4gICAgfVxuICAgIGlmICghZWwgJiYgdHlwZW9mIHBhcmFtcy5lbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwYXJhbXMuZWwpO1xuICAgICAgaWYgKCFlbC5sZW5ndGgpIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKCFlbCkge1xuICAgICAgZWwgPSBwYXJhbXMuZWw7XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmIHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnICYmIGVsLmxlbmd0aCA+IDEgJiYgc3dpcGVyRWwucXVlcnlTZWxlY3RvckFsbChwYXJhbXMuZWwpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgZWwgPSBzd2lwZXJFbC5xdWVyeVNlbGVjdG9yKHBhcmFtcy5lbCk7XG4gICAgfVxuICAgIGlmIChlbC5sZW5ndGggPiAwKSBlbCA9IGVsWzBdO1xuICAgIGVsLmNsYXNzTGlzdC5hZGQoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gcGFyYW1zLmhvcml6b250YWxDbGFzcyA6IHBhcmFtcy52ZXJ0aWNhbENsYXNzKTtcbiAgICBsZXQgZHJhZ0VsO1xuICAgIGlmIChlbCkge1xuICAgICAgZHJhZ0VsID0gZWwucXVlcnlTZWxlY3RvcihjbGFzc2VzVG9TZWxlY3Rvcihzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5kcmFnQ2xhc3MpKTtcbiAgICAgIGlmICghZHJhZ0VsKSB7XG4gICAgICAgIGRyYWdFbCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmRyYWdDbGFzcyk7XG4gICAgICAgIGVsLmFwcGVuZChkcmFnRWwpO1xuICAgICAgfVxuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKHNjcm9sbGJhciwge1xuICAgICAgZWwsXG4gICAgICBkcmFnRWxcbiAgICB9KTtcbiAgICBpZiAocGFyYW1zLmRyYWdnYWJsZSkge1xuICAgICAgZW5hYmxlRHJhZ2dhYmxlKCk7XG4gICAgfVxuICAgIGlmIChlbCkge1xuICAgICAgZWwuY2xhc3NMaXN0W3N3aXBlci5lbmFibGVkID8gJ3JlbW92ZScgOiAnYWRkJ10oLi4uY2xhc3Nlc1RvVG9rZW5zKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmxvY2tDbGFzcykpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyO1xuICAgIGNvbnN0IGVsID0gc3dpcGVyLnNjcm9sbGJhci5lbDtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3Nlc1RvVG9rZW5zKHN3aXBlci5pc0hvcml6b250YWwoKSA/IHBhcmFtcy5ob3Jpem9udGFsQ2xhc3MgOiBwYXJhbXMudmVydGljYWxDbGFzcykpO1xuICAgIH1cbiAgICBkaXNhYmxlRHJhZ2dhYmxlKCk7XG4gIH1cbiAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIGRpc2FibGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5pdCgpO1xuICAgICAgdXBkYXRlU2l6ZSgpO1xuICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgfVxuICB9KTtcbiAgb24oJ3VwZGF0ZSByZXNpemUgb2JzZXJ2ZXJVcGRhdGUgbG9jayB1bmxvY2snLCAoKSA9PiB7XG4gICAgdXBkYXRlU2l6ZSgpO1xuICB9KTtcbiAgb24oJ3NldFRyYW5zbGF0ZScsICgpID0+IHtcbiAgICBzZXRUcmFuc2xhdGUoKTtcbiAgfSk7XG4gIG9uKCdzZXRUcmFuc2l0aW9uJywgKF9zLCBkdXJhdGlvbikgPT4ge1xuICAgIHNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICB9KTtcbiAgb24oJ2VuYWJsZSBkaXNhYmxlJywgKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGVsXG4gICAgfSA9IHN3aXBlci5zY3JvbGxiYXI7XG4gICAgaWYgKGVsKSB7XG4gICAgICBlbC5jbGFzc0xpc3Rbc3dpcGVyLmVuYWJsZWQgPyAncmVtb3ZlJyA6ICdhZGQnXSguLi5jbGFzc2VzVG9Ub2tlbnMoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIubG9ja0NsYXNzKSk7XG4gICAgfVxuICB9KTtcbiAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgZGVzdHJveSgpO1xuICB9KTtcbiAgY29uc3QgZW5hYmxlID0gKCkgPT4ge1xuICAgIHN3aXBlci5lbC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzZXNUb1Rva2Vucyhzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5zY3JvbGxiYXJEaXNhYmxlZENsYXNzKSk7XG4gICAgaWYgKHN3aXBlci5zY3JvbGxiYXIuZWwpIHtcbiAgICAgIHN3aXBlci5zY3JvbGxiYXIuZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc2VzVG9Ub2tlbnMoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuc2Nyb2xsYmFyRGlzYWJsZWRDbGFzcykpO1xuICAgIH1cbiAgICBpbml0KCk7XG4gICAgdXBkYXRlU2l6ZSgpO1xuICAgIHNldFRyYW5zbGF0ZSgpO1xuICB9O1xuICBjb25zdCBkaXNhYmxlID0gKCkgPT4ge1xuICAgIHN3aXBlci5lbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXNUb1Rva2Vucyhzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5zY3JvbGxiYXJEaXNhYmxlZENsYXNzKSk7XG4gICAgaWYgKHN3aXBlci5zY3JvbGxiYXIuZWwpIHtcbiAgICAgIHN3aXBlci5zY3JvbGxiYXIuZWwuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzVG9Ub2tlbnMoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuc2Nyb2xsYmFyRGlzYWJsZWRDbGFzcykpO1xuICAgIH1cbiAgICBkZXN0cm95KCk7XG4gIH07XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLnNjcm9sbGJhciwge1xuICAgIGVuYWJsZSxcbiAgICBkaXNhYmxlLFxuICAgIHVwZGF0ZVNpemUsXG4gICAgc2V0VHJhbnNsYXRlLFxuICAgIGluaXQsXG4gICAgZGVzdHJveVxuICB9KTtcbn1cblxuZXhwb3J0IHsgU2Nyb2xsYmFyIGFzIGRlZmF1bHQgfTtcbiIsICJpbXBvcnQgeyBnIGFzIGdldERvY3VtZW50IH0gZnJvbSAnLi4vc2hhcmVkL3Nzci13aW5kb3cuZXNtLm1qcyc7XG5cbi8qIGVzbGludCBuby11bmRlcnNjb3JlLWRhbmdsZTogXCJvZmZcIiAqL1xuLyogZXNsaW50IG5vLXVzZS1iZWZvcmUtZGVmaW5lOiBcIm9mZlwiICovXG5mdW5jdGlvbiBBdXRvcGxheShfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIGV4dGVuZFBhcmFtcyxcbiAgICBvbixcbiAgICBlbWl0LFxuICAgIHBhcmFtc1xuICB9ID0gX3JlZjtcbiAgc3dpcGVyLmF1dG9wbGF5ID0ge1xuICAgIHJ1bm5pbmc6IGZhbHNlLFxuICAgIHBhdXNlZDogZmFsc2UsXG4gICAgdGltZUxlZnQ6IDBcbiAgfTtcbiAgZXh0ZW5kUGFyYW1zKHtcbiAgICBhdXRvcGxheToge1xuICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICBkZWxheTogMzAwMCxcbiAgICAgIHdhaXRGb3JUcmFuc2l0aW9uOiB0cnVlLFxuICAgICAgZGlzYWJsZU9uSW50ZXJhY3Rpb246IGZhbHNlLFxuICAgICAgc3RvcE9uTGFzdFNsaWRlOiBmYWxzZSxcbiAgICAgIHJldmVyc2VEaXJlY3Rpb246IGZhbHNlLFxuICAgICAgcGF1c2VPbk1vdXNlRW50ZXI6IGZhbHNlXG4gICAgfVxuICB9KTtcbiAgbGV0IHRpbWVvdXQ7XG4gIGxldCByYWY7XG4gIGxldCBhdXRvcGxheURlbGF5VG90YWwgPSBwYXJhbXMgJiYgcGFyYW1zLmF1dG9wbGF5ID8gcGFyYW1zLmF1dG9wbGF5LmRlbGF5IDogMzAwMDtcbiAgbGV0IGF1dG9wbGF5RGVsYXlDdXJyZW50ID0gcGFyYW1zICYmIHBhcmFtcy5hdXRvcGxheSA/IHBhcmFtcy5hdXRvcGxheS5kZWxheSA6IDMwMDA7XG4gIGxldCBhdXRvcGxheVRpbWVMZWZ0O1xuICBsZXQgYXV0b3BsYXlTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgbGV0IHdhc1BhdXNlZDtcbiAgbGV0IGlzVG91Y2hlZDtcbiAgbGV0IHBhdXNlZEJ5VG91Y2g7XG4gIGxldCB0b3VjaFN0YXJ0VGltZW91dDtcbiAgbGV0IHNsaWRlQ2hhbmdlZDtcbiAgbGV0IHBhdXNlZEJ5SW50ZXJhY3Rpb247XG4gIGxldCBwYXVzZWRCeVBvaW50ZXJFbnRlcjtcbiAgZnVuY3Rpb24gb25UcmFuc2l0aW9uRW5kKGUpIHtcbiAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIud3JhcHBlckVsKSByZXR1cm47XG4gICAgaWYgKGUudGFyZ2V0ICE9PSBzd2lwZXIud3JhcHBlckVsKSByZXR1cm47XG4gICAgc3dpcGVyLndyYXBwZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgb25UcmFuc2l0aW9uRW5kKTtcbiAgICBpZiAocGF1c2VkQnlQb2ludGVyRW50ZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVzdW1lKCk7XG4gIH1cbiAgY29uc3QgY2FsY1RpbWVMZWZ0ID0gKCkgPT4ge1xuICAgIGlmIChzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuYXV0b3BsYXkucnVubmluZykgcmV0dXJuO1xuICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucGF1c2VkKSB7XG4gICAgICB3YXNQYXVzZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAod2FzUGF1c2VkKSB7XG4gICAgICBhdXRvcGxheURlbGF5Q3VycmVudCA9IGF1dG9wbGF5VGltZUxlZnQ7XG4gICAgICB3YXNQYXVzZWQgPSBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdGltZUxlZnQgPSBzd2lwZXIuYXV0b3BsYXkucGF1c2VkID8gYXV0b3BsYXlUaW1lTGVmdCA6IGF1dG9wbGF5U3RhcnRUaW1lICsgYXV0b3BsYXlEZWxheUN1cnJlbnQgLSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBzd2lwZXIuYXV0b3BsYXkudGltZUxlZnQgPSB0aW1lTGVmdDtcbiAgICBlbWl0KCdhdXRvcGxheVRpbWVMZWZ0JywgdGltZUxlZnQsIHRpbWVMZWZ0IC8gYXV0b3BsYXlEZWxheVRvdGFsKTtcbiAgICByYWYgPSByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgY2FsY1RpbWVMZWZ0KCk7XG4gICAgfSk7XG4gIH07XG4gIGNvbnN0IGdldFNsaWRlRGVsYXkgPSAoKSA9PiB7XG4gICAgbGV0IGFjdGl2ZVNsaWRlRWw7XG4gICAgaWYgKHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgICBhY3RpdmVTbGlkZUVsID0gc3dpcGVyLnNsaWRlcy5maWx0ZXIoc2xpZGVFbCA9PiBzbGlkZUVsLmNsYXNzTGlzdC5jb250YWlucygnc3dpcGVyLXNsaWRlLWFjdGl2ZScpKVswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aXZlU2xpZGVFbCA9IHN3aXBlci5zbGlkZXNbc3dpcGVyLmFjdGl2ZUluZGV4XTtcbiAgICB9XG4gICAgaWYgKCFhY3RpdmVTbGlkZUVsKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgIGNvbnN0IGN1cnJlbnRTbGlkZURlbGF5ID0gcGFyc2VJbnQoYWN0aXZlU2xpZGVFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLWF1dG9wbGF5JyksIDEwKTtcbiAgICByZXR1cm4gY3VycmVudFNsaWRlRGVsYXk7XG4gIH07XG4gIGNvbnN0IHJ1biA9IGRlbGF5Rm9yY2UgPT4ge1xuICAgIGlmIChzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuYXV0b3BsYXkucnVubmluZykgcmV0dXJuO1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgY2FsY1RpbWVMZWZ0KCk7XG4gICAgbGV0IGRlbGF5ID0gdHlwZW9mIGRlbGF5Rm9yY2UgPT09ICd1bmRlZmluZWQnID8gc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kZWxheSA6IGRlbGF5Rm9yY2U7XG4gICAgYXV0b3BsYXlEZWxheVRvdGFsID0gc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kZWxheTtcbiAgICBhdXRvcGxheURlbGF5Q3VycmVudCA9IHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGVsYXk7XG4gICAgY29uc3QgY3VycmVudFNsaWRlRGVsYXkgPSBnZXRTbGlkZURlbGF5KCk7XG4gICAgaWYgKCFOdW1iZXIuaXNOYU4oY3VycmVudFNsaWRlRGVsYXkpICYmIGN1cnJlbnRTbGlkZURlbGF5ID4gMCAmJiB0eXBlb2YgZGVsYXlGb3JjZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGRlbGF5ID0gY3VycmVudFNsaWRlRGVsYXk7XG4gICAgICBhdXRvcGxheURlbGF5VG90YWwgPSBjdXJyZW50U2xpZGVEZWxheTtcbiAgICAgIGF1dG9wbGF5RGVsYXlDdXJyZW50ID0gY3VycmVudFNsaWRlRGVsYXk7XG4gICAgfVxuICAgIGF1dG9wbGF5VGltZUxlZnQgPSBkZWxheTtcbiAgICBjb25zdCBzcGVlZCA9IHN3aXBlci5wYXJhbXMuc3BlZWQ7XG4gICAgY29uc3QgcHJvY2VlZCA9ICgpID0+IHtcbiAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LnJldmVyc2VEaXJlY3Rpb24pIHtcbiAgICAgICAgaWYgKCFzd2lwZXIuaXNCZWdpbm5pbmcgfHwgc3dpcGVyLnBhcmFtcy5sb29wIHx8IHN3aXBlci5wYXJhbXMucmV3aW5kKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlUHJldihzcGVlZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgZW1pdCgnYXV0b3BsYXknKTtcbiAgICAgICAgfSBlbHNlIGlmICghc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5zdG9wT25MYXN0U2xpZGUpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEsIHNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBlbWl0KCdhdXRvcGxheScpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoIXN3aXBlci5pc0VuZCB8fCBzd2lwZXIucGFyYW1zLmxvb3AgfHwgc3dpcGVyLnBhcmFtcy5yZXdpbmQpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVOZXh0KHNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBlbWl0KCdhdXRvcGxheScpO1xuICAgICAgICB9IGVsc2UgaWYgKCFzd2lwZXIucGFyYW1zLmF1dG9wbGF5LnN0b3BPbkxhc3RTbGlkZSkge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKDAsIHNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBlbWl0KCdhdXRvcGxheScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICAgIGF1dG9wbGF5U3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgcnVuKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgaWYgKGRlbGF5ID4gMCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBwcm9jZWVkKCk7XG4gICAgICB9LCBkZWxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHByb2NlZWQoKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHJldHVybiBkZWxheTtcbiAgfTtcbiAgY29uc3Qgc3RhcnQgPSAoKSA9PiB7XG4gICAgYXV0b3BsYXlTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBzd2lwZXIuYXV0b3BsYXkucnVubmluZyA9IHRydWU7XG4gICAgcnVuKCk7XG4gICAgZW1pdCgnYXV0b3BsYXlTdGFydCcpO1xuICB9O1xuICBjb25zdCBzdG9wID0gKCkgPT4ge1xuICAgIHN3aXBlci5hdXRvcGxheS5ydW5uaW5nID0gZmFsc2U7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIGNhbmNlbEFuaW1hdGlvbkZyYW1lKHJhZik7XG4gICAgZW1pdCgnYXV0b3BsYXlTdG9wJyk7XG4gIH07XG4gIGNvbnN0IHBhdXNlID0gKGludGVybmFsLCByZXNldCkgPT4ge1xuICAgIGlmIChzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuYXV0b3BsYXkucnVubmluZykgcmV0dXJuO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICBpZiAoIWludGVybmFsKSB7XG4gICAgICBwYXVzZWRCeUludGVyYWN0aW9uID0gdHJ1ZTtcbiAgICB9XG4gICAgY29uc3QgcHJvY2VlZCA9ICgpID0+IHtcbiAgICAgIGVtaXQoJ2F1dG9wbGF5UGF1c2UnKTtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LndhaXRGb3JUcmFuc2l0aW9uKSB7XG4gICAgICAgIHN3aXBlci53cmFwcGVyRWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIG9uVHJhbnNpdGlvbkVuZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXN1bWUoKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPSB0cnVlO1xuICAgIGlmIChyZXNldCkge1xuICAgICAgaWYgKHNsaWRlQ2hhbmdlZCkge1xuICAgICAgICBhdXRvcGxheVRpbWVMZWZ0ID0gc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kZWxheTtcbiAgICAgIH1cbiAgICAgIHNsaWRlQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgcHJvY2VlZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBkZWxheSA9IGF1dG9wbGF5VGltZUxlZnQgfHwgc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kZWxheTtcbiAgICBhdXRvcGxheVRpbWVMZWZ0ID0gZGVsYXkgLSAobmV3IERhdGUoKS5nZXRUaW1lKCkgLSBhdXRvcGxheVN0YXJ0VGltZSk7XG4gICAgaWYgKHN3aXBlci5pc0VuZCAmJiBhdXRvcGxheVRpbWVMZWZ0IDwgMCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wKSByZXR1cm47XG4gICAgaWYgKGF1dG9wbGF5VGltZUxlZnQgPCAwKSBhdXRvcGxheVRpbWVMZWZ0ID0gMDtcbiAgICBwcm9jZWVkKCk7XG4gIH07XG4gIGNvbnN0IHJlc3VtZSA9ICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLmlzRW5kICYmIGF1dG9wbGF5VGltZUxlZnQgPCAwICYmICFzd2lwZXIucGFyYW1zLmxvb3AgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHJldHVybjtcbiAgICBhdXRvcGxheVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGlmIChwYXVzZWRCeUludGVyYWN0aW9uKSB7XG4gICAgICBwYXVzZWRCeUludGVyYWN0aW9uID0gZmFsc2U7XG4gICAgICBydW4oYXV0b3BsYXlUaW1lTGVmdCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJ1bigpO1xuICAgIH1cbiAgICBzd2lwZXIuYXV0b3BsYXkucGF1c2VkID0gZmFsc2U7XG4gICAgZW1pdCgnYXV0b3BsYXlSZXN1bWUnKTtcbiAgfTtcbiAgY29uc3Qgb25WaXNpYmlsaXR5Q2hhbmdlID0gKCkgPT4ge1xuICAgIGlmIChzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuYXV0b3BsYXkucnVubmluZykgcmV0dXJuO1xuICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICBpZiAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSAnaGlkZGVuJykge1xuICAgICAgcGF1c2VkQnlJbnRlcmFjdGlvbiA9IHRydWU7XG4gICAgICBwYXVzZSh0cnVlKTtcbiAgICB9XG4gICAgaWYgKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gJ3Zpc2libGUnKSB7XG4gICAgICByZXN1bWUoKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IG9uUG9pbnRlckVudGVyID0gZSA9PiB7XG4gICAgaWYgKGUucG9pbnRlclR5cGUgIT09ICdtb3VzZScpIHJldHVybjtcbiAgICBwYXVzZWRCeUludGVyYWN0aW9uID0gdHJ1ZTtcbiAgICBwYXVzZWRCeVBvaW50ZXJFbnRlciA9IHRydWU7XG4gICAgaWYgKHN3aXBlci5hbmltYXRpbmcgfHwgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCkgcmV0dXJuO1xuICAgIHBhdXNlKHRydWUpO1xuICB9O1xuICBjb25zdCBvblBvaW50ZXJMZWF2ZSA9IGUgPT4ge1xuICAgIGlmIChlLnBvaW50ZXJUeXBlICE9PSAnbW91c2UnKSByZXR1cm47XG4gICAgcGF1c2VkQnlQb2ludGVyRW50ZXIgPSBmYWxzZTtcbiAgICBpZiAoc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCkge1xuICAgICAgcmVzdW1lKCk7XG4gICAgfVxuICB9O1xuICBjb25zdCBhdHRhY2hNb3VzZUV2ZW50cyA9ICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5wYXVzZU9uTW91c2VFbnRlcikge1xuICAgICAgc3dpcGVyLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJlbnRlcicsIG9uUG9pbnRlckVudGVyKTtcbiAgICAgIHN3aXBlci5lbC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVybGVhdmUnLCBvblBvaW50ZXJMZWF2ZSk7XG4gICAgfVxuICB9O1xuICBjb25zdCBkZXRhY2hNb3VzZUV2ZW50cyA9ICgpID0+IHtcbiAgICBzd2lwZXIuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmVudGVyJywgb25Qb2ludGVyRW50ZXIpO1xuICAgIHN3aXBlci5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVybGVhdmUnLCBvblBvaW50ZXJMZWF2ZSk7XG4gIH07XG4gIGNvbnN0IGF0dGFjaERvY3VtZW50RXZlbnRzID0gKCkgPT4ge1xuICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgb25WaXNpYmlsaXR5Q2hhbmdlKTtcbiAgfTtcbiAgY29uc3QgZGV0YWNoRG9jdW1lbnRFdmVudHMgPSAoKSA9PiB7XG4gICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBvblZpc2liaWxpdHlDaGFuZ2UpO1xuICB9O1xuICBvbignaW5pdCcsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5lbmFibGVkKSB7XG4gICAgICBhdHRhY2hNb3VzZUV2ZW50cygpO1xuICAgICAgYXR0YWNoRG9jdW1lbnRFdmVudHMoKTtcbiAgICAgIHN0YXJ0KCk7XG4gICAgfVxuICB9KTtcbiAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgZGV0YWNoTW91c2VFdmVudHMoKTtcbiAgICBkZXRhY2hEb2N1bWVudEV2ZW50cygpO1xuICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucnVubmluZykge1xuICAgICAgc3RvcCgpO1xuICAgIH1cbiAgfSk7XG4gIG9uKCdfZnJlZU1vZGVTdGF0aWNSZWxlYXNlJywgKCkgPT4ge1xuICAgIGlmIChwYXVzZWRCeVRvdWNoIHx8IHBhdXNlZEJ5SW50ZXJhY3Rpb24pIHtcbiAgICAgIHJlc3VtZSgpO1xuICAgIH1cbiAgfSk7XG4gIG9uKCdfZnJlZU1vZGVOb01vbWVudHVtUmVsZWFzZScsICgpID0+IHtcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGlzYWJsZU9uSW50ZXJhY3Rpb24pIHtcbiAgICAgIHBhdXNlKHRydWUsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdG9wKCk7XG4gICAgfVxuICB9KTtcbiAgb24oJ2JlZm9yZVRyYW5zaXRpb25TdGFydCcsIChfcywgc3BlZWQsIGludGVybmFsKSA9PiB7XG4gICAgaWYgKHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSByZXR1cm47XG4gICAgaWYgKGludGVybmFsIHx8ICFzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRpc2FibGVPbkludGVyYWN0aW9uKSB7XG4gICAgICBwYXVzZSh0cnVlLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RvcCgpO1xuICAgIH1cbiAgfSk7XG4gIG9uKCdzbGlkZXJGaXJzdE1vdmUnLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSByZXR1cm47XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGlzYWJsZU9uSW50ZXJhY3Rpb24pIHtcbiAgICAgIHN0b3AoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaXNUb3VjaGVkID0gdHJ1ZTtcbiAgICBwYXVzZWRCeVRvdWNoID0gZmFsc2U7XG4gICAgcGF1c2VkQnlJbnRlcmFjdGlvbiA9IGZhbHNlO1xuICAgIHRvdWNoU3RhcnRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBwYXVzZWRCeUludGVyYWN0aW9uID0gdHJ1ZTtcbiAgICAgIHBhdXNlZEJ5VG91Y2ggPSB0cnVlO1xuICAgICAgcGF1c2UodHJ1ZSk7XG4gICAgfSwgMjAwKTtcbiAgfSk7XG4gIG9uKCd0b3VjaEVuZCcsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcgfHwgIWlzVG91Y2hlZCkgcmV0dXJuO1xuICAgIGNsZWFyVGltZW91dCh0b3VjaFN0YXJ0VGltZW91dCk7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRpc2FibGVPbkludGVyYWN0aW9uKSB7XG4gICAgICBwYXVzZWRCeVRvdWNoID0gZmFsc2U7XG4gICAgICBpc1RvdWNoZWQgPSBmYWxzZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHBhdXNlZEJ5VG91Y2ggJiYgc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSByZXN1bWUoKTtcbiAgICBwYXVzZWRCeVRvdWNoID0gZmFsc2U7XG4gICAgaXNUb3VjaGVkID0gZmFsc2U7XG4gIH0pO1xuICBvbignc2xpZGVDaGFuZ2UnLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSByZXR1cm47XG4gICAgc2xpZGVDaGFuZ2VkID0gdHJ1ZTtcbiAgfSk7XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLmF1dG9wbGF5LCB7XG4gICAgc3RhcnQsXG4gICAgc3RvcCxcbiAgICBwYXVzZSxcbiAgICByZXN1bWVcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEF1dG9wbGF5IGFzIGRlZmF1bHQgfTtcbiIsICJmdW5jdGlvbiBlZmZlY3RJbml0KHBhcmFtcykge1xuICBjb25zdCB7XG4gICAgZWZmZWN0LFxuICAgIHN3aXBlcixcbiAgICBvbixcbiAgICBzZXRUcmFuc2xhdGUsXG4gICAgc2V0VHJhbnNpdGlvbixcbiAgICBvdmVyd3JpdGVQYXJhbXMsXG4gICAgcGVyc3BlY3RpdmUsXG4gICAgcmVjcmVhdGVTaGFkb3dzLFxuICAgIGdldEVmZmVjdFBhcmFtc1xuICB9ID0gcGFyYW1zO1xuICBvbignYmVmb3JlSW5pdCcsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09IGVmZmVjdCkgcmV0dXJuO1xuICAgIHN3aXBlci5jbGFzc05hbWVzLnB1c2goYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfSR7ZWZmZWN0fWApO1xuICAgIGlmIChwZXJzcGVjdGl2ZSAmJiBwZXJzcGVjdGl2ZSgpKSB7XG4gICAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc30zZGApO1xuICAgIH1cbiAgICBjb25zdCBvdmVyd3JpdGVQYXJhbXNSZXN1bHQgPSBvdmVyd3JpdGVQYXJhbXMgPyBvdmVyd3JpdGVQYXJhbXMoKSA6IHt9O1xuICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLnBhcmFtcywgb3ZlcndyaXRlUGFyYW1zUmVzdWx0KTtcbiAgICBPYmplY3QuYXNzaWduKHN3aXBlci5vcmlnaW5hbFBhcmFtcywgb3ZlcndyaXRlUGFyYW1zUmVzdWx0KTtcbiAgfSk7XG4gIG9uKCdzZXRUcmFuc2xhdGUnLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSBlZmZlY3QpIHJldHVybjtcbiAgICBzZXRUcmFuc2xhdGUoKTtcbiAgfSk7XG4gIG9uKCdzZXRUcmFuc2l0aW9uJywgKF9zLCBkdXJhdGlvbikgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gZWZmZWN0KSByZXR1cm47XG4gICAgc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gIH0pO1xuICBvbigndHJhbnNpdGlvbkVuZCcsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09IGVmZmVjdCkgcmV0dXJuO1xuICAgIGlmIChyZWNyZWF0ZVNoYWRvd3MpIHtcbiAgICAgIGlmICghZ2V0RWZmZWN0UGFyYW1zIHx8ICFnZXRFZmZlY3RQYXJhbXMoKS5zbGlkZVNoYWRvd3MpIHJldHVybjtcbiAgICAgIC8vIHJlbW92ZSBzaGFkb3dzXG4gICAgICBzd2lwZXIuc2xpZGVzLmZvckVhY2goc2xpZGVFbCA9PiB7XG4gICAgICAgIHNsaWRlRWwucXVlcnlTZWxlY3RvckFsbCgnLnN3aXBlci1zbGlkZS1zaGFkb3ctdG9wLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1yaWdodCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctYm90dG9tLCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1sZWZ0JykuZm9yRWFjaChzaGFkb3dFbCA9PiBzaGFkb3dFbC5yZW1vdmUoKSk7XG4gICAgICB9KTtcbiAgICAgIC8vIGNyZWF0ZSBuZXcgb25lXG4gICAgICByZWNyZWF0ZVNoYWRvd3MoKTtcbiAgICB9XG4gIH0pO1xuICBsZXQgcmVxdWlyZVVwZGF0ZU9uVmlydHVhbDtcbiAgb24oJ3ZpcnR1YWxVcGRhdGUnLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSBlZmZlY3QpIHJldHVybjtcbiAgICBpZiAoIXN3aXBlci5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICByZXF1aXJlVXBkYXRlT25WaXJ0dWFsID0gdHJ1ZTtcbiAgICB9XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGlmIChyZXF1aXJlVXBkYXRlT25WaXJ0dWFsICYmIHN3aXBlci5zbGlkZXMgJiYgc3dpcGVyLnNsaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICAgIHJlcXVpcmVVcGRhdGVPblZpcnR1YWwgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmV4cG9ydCB7IGVmZmVjdEluaXQgYXMgZSB9O1xuIiwgImltcG9ydCB7IGwgYXMgZ2V0U2xpZGVUcmFuc2Zvcm1FbCB9IGZyb20gJy4vdXRpbHMubWpzJztcblxuZnVuY3Rpb24gZWZmZWN0VGFyZ2V0KGVmZmVjdFBhcmFtcywgc2xpZGVFbCkge1xuICBjb25zdCB0cmFuc2Zvcm1FbCA9IGdldFNsaWRlVHJhbnNmb3JtRWwoc2xpZGVFbCk7XG4gIGlmICh0cmFuc2Zvcm1FbCAhPT0gc2xpZGVFbCkge1xuICAgIHRyYW5zZm9ybUVsLnN0eWxlLmJhY2tmYWNlVmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgIHRyYW5zZm9ybUVsLnN0eWxlWyctd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHknXSA9ICdoaWRkZW4nO1xuICB9XG4gIHJldHVybiB0cmFuc2Zvcm1FbDtcbn1cblxuZXhwb3J0IHsgZWZmZWN0VGFyZ2V0IGFzIGUgfTtcbiIsICJpbXBvcnQgeyBqIGFzIGVsZW1lbnRUcmFuc2l0aW9uRW5kIH0gZnJvbSAnLi91dGlscy5tanMnO1xuXG5mdW5jdGlvbiBlZmZlY3RWaXJ0dWFsVHJhbnNpdGlvbkVuZChfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIGR1cmF0aW9uLFxuICAgIHRyYW5zZm9ybUVsZW1lbnRzLFxuICAgIGFsbFNsaWRlc1xuICB9ID0gX3JlZjtcbiAgY29uc3Qge1xuICAgIGFjdGl2ZUluZGV4XG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IGdldFNsaWRlID0gZWwgPT4ge1xuICAgIGlmICghZWwucGFyZW50RWxlbWVudCkge1xuICAgICAgLy8gYXNzdW1lIHNoYWRvdyByb290XG4gICAgICBjb25zdCBzbGlkZSA9IHN3aXBlci5zbGlkZXMuZmlsdGVyKHNsaWRlRWwgPT4gc2xpZGVFbC5zaGFkb3dSb290ICYmIHNsaWRlRWwuc2hhZG93Um9vdCA9PT0gZWwucGFyZW50Tm9kZSlbMF07XG4gICAgICByZXR1cm4gc2xpZGU7XG4gICAgfVxuICAgIHJldHVybiBlbC5wYXJlbnRFbGVtZW50O1xuICB9O1xuICBpZiAoc3dpcGVyLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlICYmIGR1cmF0aW9uICE9PSAwKSB7XG4gICAgbGV0IGV2ZW50VHJpZ2dlcmVkID0gZmFsc2U7XG4gICAgbGV0IHRyYW5zaXRpb25FbmRUYXJnZXQ7XG4gICAgaWYgKGFsbFNsaWRlcykge1xuICAgICAgdHJhbnNpdGlvbkVuZFRhcmdldCA9IHRyYW5zZm9ybUVsZW1lbnRzO1xuICAgIH0gZWxzZSB7XG4gICAgICB0cmFuc2l0aW9uRW5kVGFyZ2V0ID0gdHJhbnNmb3JtRWxlbWVudHMuZmlsdGVyKHRyYW5zZm9ybUVsID0+IHtcbiAgICAgICAgY29uc3QgZWwgPSB0cmFuc2Zvcm1FbC5jbGFzc0xpc3QuY29udGFpbnMoJ3N3aXBlci1zbGlkZS10cmFuc2Zvcm0nKSA/IGdldFNsaWRlKHRyYW5zZm9ybUVsKSA6IHRyYW5zZm9ybUVsO1xuICAgICAgICByZXR1cm4gc3dpcGVyLmdldFNsaWRlSW5kZXgoZWwpID09PSBhY3RpdmVJbmRleDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB0cmFuc2l0aW9uRW5kVGFyZ2V0LmZvckVhY2goZWwgPT4ge1xuICAgICAgZWxlbWVudFRyYW5zaXRpb25FbmQoZWwsICgpID0+IHtcbiAgICAgICAgaWYgKGV2ZW50VHJpZ2dlcmVkKSByZXR1cm47XG4gICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgZXZlbnRUcmlnZ2VyZWQgPSB0cnVlO1xuICAgICAgICBzd2lwZXIuYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICAgIGNvbnN0IGV2dCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoJ3RyYW5zaXRpb25lbmQnLCB7XG4gICAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBzd2lwZXIud3JhcHBlckVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCB7IGVmZmVjdFZpcnR1YWxUcmFuc2l0aW9uRW5kIGFzIGUgfTtcbiIsICJpbXBvcnQgeyBlIGFzIGVmZmVjdEluaXQgfSBmcm9tICcuLi9zaGFyZWQvZWZmZWN0LWluaXQubWpzJztcbmltcG9ydCB7IGUgYXMgZWZmZWN0VGFyZ2V0IH0gZnJvbSAnLi4vc2hhcmVkL2VmZmVjdC10YXJnZXQubWpzJztcbmltcG9ydCB7IGUgYXMgZWZmZWN0VmlydHVhbFRyYW5zaXRpb25FbmQgfSBmcm9tICcuLi9zaGFyZWQvZWZmZWN0LXZpcnR1YWwtdHJhbnNpdGlvbi1lbmQubWpzJztcbmltcG9ydCB7IGwgYXMgZ2V0U2xpZGVUcmFuc2Zvcm1FbCB9IGZyb20gJy4uL3NoYXJlZC91dGlscy5tanMnO1xuXG5mdW5jdGlvbiBFZmZlY3RGYWRlKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgZXh0ZW5kUGFyYW1zLFxuICAgIG9uXG4gIH0gPSBfcmVmO1xuICBleHRlbmRQYXJhbXMoe1xuICAgIGZhZGVFZmZlY3Q6IHtcbiAgICAgIGNyb3NzRmFkZTogZmFsc2VcbiAgICB9XG4gIH0pO1xuICBjb25zdCBzZXRUcmFuc2xhdGUgPSAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgc2xpZGVzXG4gICAgfSA9IHN3aXBlcjtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLmZhZGVFZmZlY3Q7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHNsaWRlRWwgPSBzd2lwZXIuc2xpZGVzW2ldO1xuICAgICAgY29uc3Qgb2Zmc2V0ID0gc2xpZGVFbC5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICAgIGxldCB0eCA9IC1vZmZzZXQ7XG4gICAgICBpZiAoIXN3aXBlci5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSkgdHggLT0gc3dpcGVyLnRyYW5zbGF0ZTtcbiAgICAgIGxldCB0eSA9IDA7XG4gICAgICBpZiAoIXN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgICB0eSA9IHR4O1xuICAgICAgICB0eCA9IDA7XG4gICAgICB9XG4gICAgICBjb25zdCBzbGlkZU9wYWNpdHkgPSBzd2lwZXIucGFyYW1zLmZhZGVFZmZlY3QuY3Jvc3NGYWRlID8gTWF0aC5tYXgoMSAtIE1hdGguYWJzKHNsaWRlRWwucHJvZ3Jlc3MpLCAwKSA6IDEgKyBNYXRoLm1pbihNYXRoLm1heChzbGlkZUVsLnByb2dyZXNzLCAtMSksIDApO1xuICAgICAgY29uc3QgdGFyZ2V0RWwgPSBlZmZlY3RUYXJnZXQocGFyYW1zLCBzbGlkZUVsKTtcbiAgICAgIHRhcmdldEVsLnN0eWxlLm9wYWNpdHkgPSBzbGlkZU9wYWNpdHk7XG4gICAgICB0YXJnZXRFbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt0eH1weCwgJHt0eX1weCwgMHB4KWA7XG4gICAgfVxuICB9O1xuICBjb25zdCBzZXRUcmFuc2l0aW9uID0gZHVyYXRpb24gPT4ge1xuICAgIGNvbnN0IHRyYW5zZm9ybUVsZW1lbnRzID0gc3dpcGVyLnNsaWRlcy5tYXAoc2xpZGVFbCA9PiBnZXRTbGlkZVRyYW5zZm9ybUVsKHNsaWRlRWwpKTtcbiAgICB0cmFuc2Zvcm1FbGVtZW50cy5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGAke2R1cmF0aW9ufW1zYDtcbiAgICB9KTtcbiAgICBlZmZlY3RWaXJ0dWFsVHJhbnNpdGlvbkVuZCh7XG4gICAgICBzd2lwZXIsXG4gICAgICBkdXJhdGlvbixcbiAgICAgIHRyYW5zZm9ybUVsZW1lbnRzLFxuICAgICAgYWxsU2xpZGVzOiB0cnVlXG4gICAgfSk7XG4gIH07XG4gIGVmZmVjdEluaXQoe1xuICAgIGVmZmVjdDogJ2ZhZGUnLFxuICAgIHN3aXBlcixcbiAgICBvbixcbiAgICBzZXRUcmFuc2xhdGUsXG4gICAgc2V0VHJhbnNpdGlvbixcbiAgICBvdmVyd3JpdGVQYXJhbXM6ICgpID0+ICh7XG4gICAgICBzbGlkZXNQZXJWaWV3OiAxLFxuICAgICAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gICAgICB3YXRjaFNsaWRlc1Byb2dyZXNzOiB0cnVlLFxuICAgICAgc3BhY2VCZXR3ZWVuOiAwLFxuICAgICAgdmlydHVhbFRyYW5zbGF0ZTogIXN3aXBlci5wYXJhbXMuY3NzTW9kZVxuICAgIH0pXG4gIH0pO1xufVxuXG5leHBvcnQgeyBFZmZlY3RGYWRlIGFzIGRlZmF1bHQgfTtcbiIsICJpbXBvcnQgU3dpcGVyIGZyb20gJ3N3aXBlcic7XHJcbmltcG9ydCB7IEF1dG9wbGF5LCBOYXZpZ2F0aW9uLCBQYWdpbmF0aW9uLCBTY3JvbGxiYXIsIEVmZmVjdEZhZGUgfSBmcm9tICdzd2lwZXIvbW9kdWxlcyc7XHJcblxyXG5jb25zdCBzd2lwZXIgPSAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtc3dpcGVyJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBsZXQgb3B0aW9ucyA9IHt9O1xyXG5cclxuICAgICAgICBpZiAoaXRlbS5kYXRhc2V0Lm9wdGlvbnMpIHtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IGl0ZW0uZGF0YXNldC5vcHRpb25zLnJlcGxhY2UoLycvZywgJ1wiJykucmVwbGFjZSgvLFxccyooW1xcXX1dKS9nLCAnJDEnKTtcclxuICAgICAgICAgICAgb3B0aW9ucyA9IEpTT04ucGFyc2Uob3B0aW9ucyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBvcHRpb25zLm1vZHVsZXMgPSBbQXV0b3BsYXksIE5hdmlnYXRpb24sIFBhZ2luYXRpb24sIFNjcm9sbGJhciwgRWZmZWN0RmFkZV07XHJcblxyXG5cclxuICAgICAgICBuZXcgU3dpcGVyKGl0ZW0sIG9wdGlvbnMpO1xyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBzd2lwZXI7IiwgImltcG9ydCBBY2NvcmRpb25UYWJzIGZyb20gJ2ExMXktYWNjb3JkaW9uLXRhYnMnO1xyXG5cclxuY29uc3QgdGFicyA9ICgpID0+IHtcclxuICAgIC8vIGluaXQgdGFic1xyXG4gICAgbmV3IEFjY29yZGlvblRhYnMoKTtcclxuXHJcbiAgICAvLyB1cGRhdGUgaGFzaFxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXRhYnNbZGF0YS11cGRhdGUtaGFzaD1cInRydWVcIl0gLmpzLXRhYnMtdHJpZ2dlcicpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgZ2xvYmFsLmhpc3RvcnkucHVzaFN0YXRlKCcnLCAnJywgYCMke2l0ZW0uZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJyl9YCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBpZiAoZ2xvYmFsLmxvY2F0aW9uLmhhc2gpIHtcclxuICAgICAgICBjb25zdCBhY3RpdmVUYWJzVHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5qcy10YWJzW2RhdGEtdXBkYXRlLWhhc2g9XCJ0cnVlXCJdIC5qcy10YWJzLXRyaWdnZXJbaHJlZj1cIiR7Z2xvYmFsLmxvY2F0aW9uLmhhc2h9XCJdYCk7XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmVUYWJzVHJpZ2dlcikge1xyXG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZVRhYnNUcmlnZ2VyLmNsaWNrKCk7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVUYWJzVHJpZ2dlci5ibHVyKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBkcm9wZG93biB0b2dnbGVcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy10YWJzJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBjb25zdCBkcm9wZG93biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmpzLXRhYnMtZHJvcGRvd24nKTtcclxuICAgIFxyXG4gICAgICAgIGlmIChkcm9wZG93bikge1xyXG4gICAgICAgICAgICBkcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCBlID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvcihgLmpzLXRhYnMtdHJpZ2dlcltocmVmPVwiJHtlLnRhcmdldC52YWx1ZX1cIl1gKS5jbGljaygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIFxyXG4gICAgICAgICAgICBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy10YWJzLXRyaWdnZXInKS5mb3JFYWNoKHRhYiA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZHJvcGRvd24udmFsdWUgPSB0YWIuZ2V0QXR0cmlidXRlKCdocmVmJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCB0YWJzOyIsICJjb25zdCBub3QgPSB7XG4gIGluZXJ0OiAnOm5vdChbaW5lcnRdKTpub3QoW2luZXJ0XSAqKScsXG4gIG5lZ1RhYkluZGV4OiAnOm5vdChbdGFiaW5kZXhePVwiLVwiXSknLFxuICBkaXNhYmxlZDogJzpub3QoOmRpc2FibGVkKScsXG59O1xuXG52YXIgZm9jdXNhYmxlU2VsZWN0b3JzID0gW1xuICBgYVtocmVmXSR7bm90LmluZXJ0fSR7bm90Lm5lZ1RhYkluZGV4fWAsXG4gIGBhcmVhW2hyZWZdJHtub3QuaW5lcnR9JHtub3QubmVnVGFiSW5kZXh9YCxcbiAgYGlucHV0Om5vdChbdHlwZT1cImhpZGRlblwiXSk6bm90KFt0eXBlPVwicmFkaW9cIl0pJHtub3QuaW5lcnR9JHtub3QubmVnVGFiSW5kZXh9JHtub3QuZGlzYWJsZWR9YCxcbiAgYGlucHV0W3R5cGU9XCJyYWRpb1wiXSR7bm90LmluZXJ0fSR7bm90Lm5lZ1RhYkluZGV4fSR7bm90LmRpc2FibGVkfWAsXG4gIGBzZWxlY3Qke25vdC5pbmVydH0ke25vdC5uZWdUYWJJbmRleH0ke25vdC5kaXNhYmxlZH1gLFxuICBgdGV4dGFyZWEke25vdC5pbmVydH0ke25vdC5uZWdUYWJJbmRleH0ke25vdC5kaXNhYmxlZH1gLFxuICBgYnV0dG9uJHtub3QuaW5lcnR9JHtub3QubmVnVGFiSW5kZXh9JHtub3QuZGlzYWJsZWR9YCxcbiAgYGRldGFpbHMke25vdC5pbmVydH0gPiBzdW1tYXJ5OmZpcnN0LW9mLXR5cGUke25vdC5uZWdUYWJJbmRleH1gLFxuICAvLyBEaXNjYXJkIHVudGlsIEZpcmVmb3ggc3VwcG9ydHMgYDpoYXMoKWBcbiAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vS2l0dHlHaXJhdWRlbC9mb2N1c2FibGUtc2VsZWN0b3JzL2lzc3Vlcy8xMlxuICAvLyBgZGV0YWlsczpub3QoOmhhcyg+IHN1bW1hcnkpKSR7bm90LmluZXJ0fSR7bm90Lm5lZ1RhYkluZGV4fWAsXG4gIGBpZnJhbWUke25vdC5pbmVydH0ke25vdC5uZWdUYWJJbmRleH1gLFxuICBgYXVkaW9bY29udHJvbHNdJHtub3QuaW5lcnR9JHtub3QubmVnVGFiSW5kZXh9YCxcbiAgYHZpZGVvW2NvbnRyb2xzXSR7bm90LmluZXJ0fSR7bm90Lm5lZ1RhYkluZGV4fWAsXG4gIGBbY29udGVudGVkaXRhYmxlXSR7bm90LmluZXJ0fSR7bm90Lm5lZ1RhYkluZGV4fWAsXG4gIGBbdGFiaW5kZXhdJHtub3QuaW5lcnR9JHtub3QubmVnVGFiSW5kZXh9YCxcbl07XG5cbi8qKlxuICogU2V0IHRoZSBmb2N1cyB0byB0aGUgZmlyc3QgZWxlbWVudCB3aXRoIGBhdXRvZm9jdXNgIHdpdGggdGhlIGVsZW1lbnQgb3IgdGhlXG4gKiBlbGVtZW50IGl0c2VsZi5cbiAqL1xuZnVuY3Rpb24gbW92ZUZvY3VzVG9EaWFsb2coZWwpIHtcbiAgICBjb25zdCBmb2N1c2VkID0gKGVsLnF1ZXJ5U2VsZWN0b3IoJ1thdXRvZm9jdXNdJykgfHwgZWwpO1xuICAgIGZvY3VzZWQuZm9jdXMoKTtcbn1cbi8qKlxuICogR2V0IHRoZSBmaXJzdCBhbmQgbGFzdCBmb2N1c2FibGUgZWxlbWVudHMgaW4gYSBnaXZlbiB0cmVlLlxuICovXG5mdW5jdGlvbiBnZXRGb2N1c2FibGVFZGdlcyhlbCkge1xuICAgIC8vIENoZWNrIGZvciBhIGZvY3VzYWJsZSBlbGVtZW50IHdpdGhpbiB0aGUgc3VidHJlZSBvZiBgZWxgLlxuICAgIGNvbnN0IGZpcnN0ID0gZmluZEZvY3VzYWJsZUVsZW1lbnQoZWwsIHRydWUpO1xuICAgIC8vIE9ubHkgaWYgd2UgZmluZCB0aGUgZmlyc3QgZWxlbWVudCBkbyB3ZSBuZWVkIHRvIGxvb2sgZm9yIHRoZSBsYXN0IG9uZS4gSWZcbiAgICAvLyB0aGVyZVx1MjAxOXMgbm8gbGFzdCBlbGVtZW50LCB3ZSBzZXQgYGxhc3RgIGFzIGEgcmVmZXJlbmNlIHRvIGBmaXJzdGAgc28gdGhhdFxuICAgIC8vIHRoZSByZXR1cm5lZCBhcnJheSBpcyBhbHdheXMgb2YgbGVuZ3RoIDIuXG4gICAgY29uc3QgbGFzdCA9IGZpcnN0ID8gZmluZEZvY3VzYWJsZUVsZW1lbnQoZWwsIGZhbHNlKSB8fCBmaXJzdCA6IG51bGw7XG4gICAgcmV0dXJuIFtmaXJzdCwgbGFzdF07XG59XG4vKipcbiAqIEZpbmQgdGhlIGZpcnN0IGZvY3VzYWJsZSBlbGVtZW50IGluc2lkZSB0aGUgZ2l2ZW4gbm9kZSBpZiBgZm9yd2FyZGAgaXMgdHJ1dGh5XG4gKiBvciB0aGUgbGFzdCBmb2N1c2FibGUgZWxlbWVudCBvdGhlcndpc2UuXG4gKi9cbmZ1bmN0aW9uIGZpbmRGb2N1c2FibGVFbGVtZW50KG5vZGUsIGZvcndhcmQpIHtcbiAgICAvLyBJZiB3ZVx1MjAxOXJlIHdhbGtpbmcgZm9yd2FyZCwgY2hlY2sgaWYgdGhpcyBub2RlIGlzIGZvY3VzYWJsZSwgYW5kIHJldHVybiBpdFxuICAgIC8vIGltbWVkaWF0ZWx5IGlmIGl0IGlzLlxuICAgIGlmIChmb3J3YXJkICYmIGlzRm9jdXNhYmxlKG5vZGUpKVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICAvLyBXZSBzaG91bGQgb25seSBzZWFyY2ggdGhlIHN1YnRyZWUgb2YgdGhpcyBub2RlIGlmIGl0IGNhbiBoYXZlIGZvY3VzYWJsZVxuICAgIC8vIGNoaWxkcmVuLlxuICAgIGlmIChjYW5IYXZlRm9jdXNhYmxlQ2hpbGRyZW4obm9kZSkpIHtcbiAgICAgICAgLy8gU3RhcnQgd2Fsa2luZyB0aGUgRE9NIHRyZWUsIGxvb2tpbmcgZm9yIGZvY3VzYWJsZSBlbGVtZW50cy5cbiAgICAgICAgLy8gQ2FzZSAxOiBJZiB0aGlzIG5vZGUgaGFzIGEgc2hhZG93IHJvb3QsIHNlYXJjaCBpdCByZWN1cnNpdmVseS5cbiAgICAgICAgaWYgKG5vZGUuc2hhZG93Um9vdCkge1xuICAgICAgICAgICAgLy8gRGVzY2VuZCBpbnRvIHRoaXMgc3VidHJlZS5cbiAgICAgICAgICAgIGxldCBuZXh0ID0gZ2V0TmV4dENoaWxkRWwobm9kZS5zaGFkb3dSb290LCBmb3J3YXJkKTtcbiAgICAgICAgICAgIC8vIFRyYXZlcnNlIHNpYmxpbmdzLCBzZWFyY2hpbmcgdGhlIHN1YnRyZWUgb2YgZWFjaCBvbmVcbiAgICAgICAgICAgIC8vIGZvciBmb2N1c2FibGUgZWxlbWVudHMuXG4gICAgICAgICAgICB3aGlsZSAobmV4dCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvY3VzYWJsZUVsID0gZmluZEZvY3VzYWJsZUVsZW1lbnQobmV4dCwgZm9yd2FyZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvY3VzYWJsZUVsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9jdXNhYmxlRWw7XG4gICAgICAgICAgICAgICAgbmV4dCA9IGdldE5leHRTaWJsaW5nRWwobmV4dCwgZm9yd2FyZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2FzZSAyOiBJZiB0aGlzIG5vZGUgaXMgYSBzbG90IGZvciBhIEN1c3RvbSBFbGVtZW50LCBzZWFyY2ggaXRzIGFzc2lnbmVkXG4gICAgICAgIC8vIG5vZGVzIHJlY3Vyc2l2ZWx5LlxuICAgICAgICBlbHNlIGlmIChub2RlLmxvY2FsTmFtZSA9PT0gJ3Nsb3QnKSB7XG4gICAgICAgICAgICBjb25zdCBhc3NpZ25lZEVsZW1lbnRzID0gbm9kZS5hc3NpZ25lZEVsZW1lbnRzKHtcbiAgICAgICAgICAgICAgICBmbGF0dGVuOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAoIWZvcndhcmQpXG4gICAgICAgICAgICAgICAgYXNzaWduZWRFbGVtZW50cy5yZXZlcnNlKCk7XG4gICAgICAgICAgICBmb3IgKGNvbnN0IGFzc2lnbmVkRWxlbWVudCBvZiBhc3NpZ25lZEVsZW1lbnRzKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9jdXNhYmxlRWwgPSBmaW5kRm9jdXNhYmxlRWxlbWVudChhc3NpZ25lZEVsZW1lbnQsIGZvcndhcmQpO1xuICAgICAgICAgICAgICAgIGlmIChmb2N1c2FibGVFbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvY3VzYWJsZUVsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENhc2UgMzogdGhpcyBpcyBhIHJlZ3VsYXIgTGlnaHQgRE9NIG5vZGUuIFNlYXJjaCBpdHMgc3VidHJlZS5cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAvLyBEZXNjZW5kIGludG8gdGhpcyBzdWJ0cmVlLlxuICAgICAgICAgICAgbGV0IG5leHQgPSBnZXROZXh0Q2hpbGRFbChub2RlLCBmb3J3YXJkKTtcbiAgICAgICAgICAgIC8vIFRyYXZlcnNlIHNpYmxpbmdzLCBzZWFyY2hpbmcgdGhlIHN1YnRyZWUgb2YgZWFjaCBvbmVcbiAgICAgICAgICAgIC8vIGZvciBmb2N1c2FibGUgZWxlbWVudHMuXG4gICAgICAgICAgICB3aGlsZSAobmV4dCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvY3VzYWJsZUVsID0gZmluZEZvY3VzYWJsZUVsZW1lbnQobmV4dCwgZm9yd2FyZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvY3VzYWJsZUVsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9jdXNhYmxlRWw7XG4gICAgICAgICAgICAgICAgbmV4dCA9IGdldE5leHRTaWJsaW5nRWwobmV4dCwgZm9yd2FyZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gSWYgd2VcdTIwMTlyZSB3YWxraW5nIGJhY2t3YXJkLCB3ZSB3YW50IHRvIGNoZWNrIHRoZSBub2RlXHUyMDE5cyBlbnRpcmUgc3VidHJlZVxuICAgIC8vIGJlZm9yZSBjaGVja2luZyB0aGUgbm9kZSBpdHNlbGYuIElmIHRoaXMgbm9kZSBpcyBmb2N1c2FibGUsIHJldHVybiBpdC5cbiAgICBpZiAoIWZvcndhcmQgJiYgaXNGb2N1c2FibGUobm9kZSkpXG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gZ2V0TmV4dENoaWxkRWwobm9kZSwgZm9yd2FyZCkge1xuICAgIHJldHVybiBmb3J3YXJkID8gbm9kZS5maXJzdEVsZW1lbnRDaGlsZCA6IG5vZGUubGFzdEVsZW1lbnRDaGlsZDtcbn1cbmZ1bmN0aW9uIGdldE5leHRTaWJsaW5nRWwoZWwsIGZvcndhcmQpIHtcbiAgICByZXR1cm4gZm9yd2FyZCA/IGVsLm5leHRFbGVtZW50U2libGluZyA6IGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG59XG4vKipcbiAqIERldGVybWluZSBpZiBhbiBlbGVtZW50IGlzIGhpZGRlbiBmcm9tIHRoZSB1c2VyLlxuICovXG5jb25zdCBpc0hpZGRlbiA9IChlbCkgPT4ge1xuICAgIC8vIEJyb3dzZXJzIGhpZGUgYWxsIG5vbi08c3VtbWFyeT4gZGVzY2VuZGFudHMgb2YgY2xvc2VkIDxkZXRhaWxzPiBlbGVtZW50c1xuICAgIC8vIGZyb20gdXNlciBpbnRlcmFjdGlvbiwgYnV0IHRob3NlIG5vbi08c3VtbWFyeT4gZWxlbWVudHMgbWF5IHN0aWxsIG1hdGNoIG91clxuICAgIC8vIGZvY3VzYWJsZS1zZWxlY3RvcnMgYW5kIG1heSBzdGlsbCBoYXZlIGRpbWVuc2lvbnMsIHNvIHdlIG5lZWQgYSBzcGVjaWFsXG4gICAgLy8gY2FzZSB0byBpZ25vcmUgdGhlbS5cbiAgICBpZiAoZWwubWF0Y2hlcygnZGV0YWlsczpub3QoW29wZW5dKSAqJykgJiZcbiAgICAgICAgIWVsLm1hdGNoZXMoJ2RldGFpbHM+c3VtbWFyeTpmaXJzdC1vZi10eXBlJykpXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIC8vIElmIHRoaXMgZWxlbWVudCBoYXMgbm8gcGFpbnRlZCBkaW1lbnNpb25zLCBpdCdzIGhpZGRlbi5cbiAgICByZXR1cm4gIShlbC5vZmZzZXRXaWR0aCB8fCBlbC5vZmZzZXRIZWlnaHQgfHwgZWwuZ2V0Q2xpZW50UmVjdHMoKS5sZW5ndGgpO1xufTtcbi8qKlxuICogRGV0ZXJtaW5lIGlmIGFuIGVsZW1lbnQgaXMgZm9jdXNhYmxlIGFuZCBoYXMgdXNlci12aXNpYmxlIHBhaW50ZWQgZGltZW5zaW9ucy5cbiAqL1xuY29uc3QgaXNGb2N1c2FibGUgPSAoZWwpID0+IHtcbiAgICAvLyBBIHNoYWRvdyBob3N0IHRoYXQgZGVsZWdhdGVzIGZvY3VzIHdpbGwgbmV2ZXIgZGlyZWN0bHkgcmVjZWl2ZSBmb2N1cyxcbiAgICAvLyBldmVuIHdpdGggYHRhYmluZGV4PTBgLiBDb25zaWRlciBvdXIgPGZhbmN5LWJ1dHRvbj4gY3VzdG9tIGVsZW1lbnQsIHdoaWNoXG4gICAgLy8gZGVsZWdhdGVzIGZvY3VzIHRvIGl0cyBzaGFkb3cgYnV0dG9uOlxuICAgIC8vXG4gICAgLy8gPGZhbmN5LWJ1dHRvbiB0YWJpbmRleD1cIjBcIj5cbiAgICAvLyAgI3NoYWRvdy1yb290XG4gICAgLy8gIDxidXR0b24+PHNsb3Q+PC9zbG90PjwvYnV0dG9uPlxuICAgIC8vIDwvZmFuY3ktYnV0dG9uPlxuICAgIC8vXG4gICAgLy8gVGhlIGJyb3dzZXIgYWN0cyBhcyBhcyBpZiB0aGVyZSBpcyBvbmx5IG9uZSBmb2N1c2FibGUgZWxlbWVudCBcdTIwMTMgdGhlIHNoYWRvd1xuICAgIC8vIGJ1dHRvbi4gT3VyIGxpYnJhcnkgc2hvdWxkIGJlaGF2ZSB0aGUgc2FtZSB3YXkuXG4gICAgaWYgKGVsLnNoYWRvd1Jvb3Q/LmRlbGVnYXRlc0ZvY3VzKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgcmV0dXJuIGVsLm1hdGNoZXMoZm9jdXNhYmxlU2VsZWN0b3JzLmpvaW4oJywnKSkgJiYgIWlzSGlkZGVuKGVsKTtcbn07XG4vKipcbiAqIERldGVybWluZSBpZiBhbiBlbGVtZW50IGNhbiBoYXZlIGZvY3VzYWJsZSBjaGlsZHJlbi4gVXNlZnVsIGZvciBiYWlsaW5nIG91dFxuICogZWFybHkgd2hlbiB3YWxraW5nIHRoZSBET00gdHJlZS5cbiAqIEBleGFtcGxlXG4gKiBUaGlzIGRpdiBpcyBpbmVydCwgc28gbm9uZSBvZiBpdHMgY2hpbGRyZW4gY2FuIGJlIGZvY3VzZWQsIGV2ZW4gdGhvdWdoIHRoZXlcbiAqIG1lZXQgb3VyIGNyaXRlcmlhIGZvciB3aGF0IGlzIGZvY3VzYWJsZS4gT25jZSB3ZSBjaGVjayB0aGUgZGl2LCB3ZSBjYW4gc2tpcFxuICogdGhlIHJlc3Qgb2YgdGhlIHN1YnRyZWUuXG4gKiBgYGBodG1sXG4gKiA8ZGl2IGluZXJ0PlxuICogICA8YnV0dG9uPkJ1dHRvbjwvYnV0dG9uPlxuICogICA8YSBocmVmPVwiI1wiPkxpbms8L2E+XG4gKiA8L2Rpdj5cbiAqIGBgYFxuICovXG5mdW5jdGlvbiBjYW5IYXZlRm9jdXNhYmxlQ2hpbGRyZW4oZWwpIHtcbiAgICAvLyBUaGUgYnJvd3NlciB3aWxsIG5ldmVyIHNlbmQgZm9jdXMgaW50byBhIFNoYWRvdyBET00gaWYgdGhlIGhvc3QgZWxlbWVudFxuICAgIC8vIGhhcyBhIG5lZ2F0aXZlIHRhYmluZGV4LiBUaGlzIGFwcGxpZXMgdG8gYm90aCBzbG90dGVkIExpZ2h0IERPTSBTaGFkb3cgRE9NXG4gICAgLy8gY2hpbGRyZW5cbiAgICBpZiAoZWwuc2hhZG93Um9vdCAmJiBlbC5nZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JykgPT09ICctMScpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAvLyBFbGVtbWVudHMgbWF0Y2hpbmcgdGhpcyBzZWxlY3RvciBhcmUgZWl0aGVyIGhpZGRlbiBlbnRpcmVseSBmcm9tIHRoZSB1c2VyLFxuICAgIC8vIG9yIGFyZSB2aXNpYmxlIGJ1dCB1bmF2YWlsYWJsZSBmb3IgaW50ZXJhY3Rpb24uIFRoZWlyIGRlc2NlbnRhbnRzIGNhbiBuZXZlclxuICAgIC8vIHJlY2VpdmUgZm9jdXMuXG4gICAgcmV0dXJuICFlbC5tYXRjaGVzKCc6ZGlzYWJsZWQsW2hpZGRlbl0sW2luZXJ0XScpO1xufVxuLyoqXG4gKiBHZXQgdGhlIGFjdGl2ZSBlbGVtZW50LCBhY2NvdW50aW5nIGZvciBTaGFkb3cgRE9NIHN1YnRyZWVzLlxuICogQGF1dGhvciBDb3J5IExhVmlza2FcbiAqIEBzZWU6IGh0dHBzOi8vd3d3LmFiZWF1dGlmdWxzaXRlLm5ldC9wb3N0cy9maW5kaW5nLXRoZS1hY3RpdmUtZWxlbWVudC1pbi1hLXNoYWRvdy1yb290L1xuICovXG5mdW5jdGlvbiBnZXRBY3RpdmVFbGVtZW50KHJvb3QgPSBkb2N1bWVudCkge1xuICAgIGNvbnN0IGFjdGl2ZUVsID0gcm9vdC5hY3RpdmVFbGVtZW50O1xuICAgIGlmICghYWN0aXZlRWwpXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIC8vIElmIHRoZXJlXHUyMDE5cyBhIHNoYWRvdyByb290LCByZWN1cnNpdmVseSBmaW5kIHRoZSBhY3RpdmUgZWxlbWVudCB3aXRoaW4gaXQuXG4gICAgLy8gSWYgdGhlIHJlY3Vyc2l2ZSBjYWxsIHJldHVybnMgbnVsbCwgcmV0dXJuIHRoZSBhY3RpdmUgZWxlbWVudFxuICAgIC8vIG9mIHRoZSB0b3AtbGV2ZWwgRG9jdW1lbnQuXG4gICAgaWYgKGFjdGl2ZUVsLnNoYWRvd1Jvb3QpXG4gICAgICAgIHJldHVybiBnZXRBY3RpdmVFbGVtZW50KGFjdGl2ZUVsLnNoYWRvd1Jvb3QpIHx8IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ7XG4gICAgLy8gSWYgbm90LCB3ZSBjYW4ganVzdCByZXR1cm4gdGhlIGFjdGl2ZSBlbGVtZW50XG4gICAgcmV0dXJuIGFjdGl2ZUVsO1xufVxuLyoqXG4gKiBUcmFwIHRoZSBmb2N1cyBpbnNpZGUgdGhlIGdpdmVuIGVsZW1lbnRcbiAqL1xuZnVuY3Rpb24gdHJhcFRhYktleShlbCwgZXZlbnQpIHtcbiAgICBjb25zdCBbZmlyc3RGb2N1c2FibGVDaGlsZCwgbGFzdEZvY3VzYWJsZUNoaWxkXSA9IGdldEZvY3VzYWJsZUVkZ2VzKGVsKTtcbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gZm9jdXNhYmxlIGNoaWxkcmVuIGluIHRoZSBkaWFsb2csIHByZXZlbnQgdGhlIHVzZXIgZnJvbVxuICAgIC8vIHRhYmJpbmcgb3V0IG9mIGl0XG4gICAgaWYgKCFmaXJzdEZvY3VzYWJsZUNoaWxkKVxuICAgICAgICByZXR1cm4gZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBhY3RpdmVFbGVtZW50ID0gZ2V0QWN0aXZlRWxlbWVudCgpO1xuICAgIC8vIElmIHRoZSBTSElGVCBrZXkgaXMgcHJlc3NlZCB3aGlsZSB0YWJiaW5nIChtb3ZpbmcgYmFja3dhcmRzKSBhbmQgdGhlXG4gICAgLy8gY3VycmVudGx5IGZvY3VzZWQgaXRlbSBpcyB0aGUgZmlyc3Qgb25lLCBtb3ZlIHRoZSBmb2N1cyB0byB0aGUgbGFzdFxuICAgIC8vIGZvY3VzYWJsZSBpdGVtIGZyb20gdGhlIGRpYWxvZyBlbGVtZW50XG4gICAgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIGFjdGl2ZUVsZW1lbnQgPT09IGZpcnN0Rm9jdXNhYmxlQ2hpbGQpIHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZTogd2Uga25vdyB0aGF0IGBsYXN0Rm9jdXNhYmxlQ2hpbGRgIGlzIG5vdCBudWxsIGhlcmVcbiAgICAgICAgbGFzdEZvY3VzYWJsZUNoaWxkLmZvY3VzKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICAgIC8vIElmIHRoZSBTSElGVCBrZXkgaXMgbm90IHByZXNzZWQgKG1vdmluZyBmb3J3YXJkcykgYW5kIHRoZSBjdXJyZW50bHkgZm9jdXNlZFxuICAgIC8vIGl0ZW0gaXMgdGhlIGxhc3Qgb25lLCBtb3ZlIHRoZSBmb2N1cyB0byB0aGUgZmlyc3QgZm9jdXNhYmxlIGl0ZW0gZnJvbSB0aGVcbiAgICAvLyBkaWFsb2cgZWxlbWVudFxuICAgIGVsc2UgaWYgKCFldmVudC5zaGlmdEtleSAmJiBhY3RpdmVFbGVtZW50ID09PSBsYXN0Rm9jdXNhYmxlQ2hpbGQpIHtcbiAgICAgICAgZmlyc3RGb2N1c2FibGVDaGlsZC5mb2N1cygpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbn1cblxuY2xhc3MgQTExeURpYWxvZyB7XG4gICAgJGVsO1xuICAgIGlkO1xuICAgIHByZXZpb3VzbHlGb2N1c2VkO1xuICAgIHNob3duO1xuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy4kZWwgPSBlbGVtZW50O1xuICAgICAgICB0aGlzLmlkID0gdGhpcy4kZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWExMXktZGlhbG9nJykgfHwgdGhpcy4kZWwuaWQ7XG4gICAgICAgIHRoaXMucHJldmlvdXNseUZvY3VzZWQgPSBudWxsO1xuICAgICAgICB0aGlzLnNob3duID0gZmFsc2U7XG4gICAgICAgIHRoaXMubWFpbnRhaW5Gb2N1cyA9IHRoaXMubWFpbnRhaW5Gb2N1cy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmJpbmRLZXlwcmVzcyA9IHRoaXMuYmluZEtleXByZXNzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGFuZGxlVHJpZ2dlckNsaWNrcyA9IHRoaXMuaGFuZGxlVHJpZ2dlckNsaWNrcy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLnNob3cgPSB0aGlzLnNob3cuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oaWRlID0gdGhpcy5oaWRlLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuJGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICB0aGlzLiRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtbW9kYWwnLCAndHJ1ZScpO1xuICAgICAgICB0aGlzLiRlbC5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgJy0xJyk7XG4gICAgICAgIGlmICghdGhpcy4kZWwuaGFzQXR0cmlidXRlKCdyb2xlJykpIHtcbiAgICAgICAgICAgIHRoaXMuJGVsLnNldEF0dHJpYnV0ZSgncm9sZScsICdkaWFsb2cnKTtcbiAgICAgICAgfVxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlVHJpZ2dlckNsaWNrcywgdHJ1ZSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERlc3Ryb3kgdGhlIGN1cnJlbnQgaW5zdGFuY2UgKGFmdGVyIG1ha2luZyBzdXJlIHRoZSBkaWFsb2cgaGFzIGJlZW4gaGlkZGVuKVxuICAgICAqIGFuZCByZW1vdmUgYWxsIGFzc29jaWF0ZWQgbGlzdGVuZXJzIGZyb20gZGlhbG9nIG9wZW5lcnMgYW5kIGNsb3NlcnNcbiAgICAgKi9cbiAgICBkZXN0cm95KCkge1xuICAgICAgICAvLyBIaWRlIHRoZSBkaWFsb2cgdG8gYXZvaWQgZGVzdHJveWluZyBhbiBvcGVuIGluc3RhbmNlXG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAvLyBSZW1vdmUgdGhlIGNsaWNrIGV2ZW50IGRlbGVnYXRlcyBmb3Igb3VyIG9wZW5lcnMgYW5kIGNsb3NlcnNcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZVRyaWdnZXJDbGlja3MsIHRydWUpO1xuICAgICAgICAvLyBDbG9uZSBhbmQgcmVwbGFjZSB0aGUgZGlhbG9nIGVsZW1lbnQgdG8gcHJldmVudCBtZW1vcnkgbGVha3MgY2F1c2VkIGJ5XG4gICAgICAgIC8vIGV2ZW50IGxpc3RlbmVycyB0aGF0IHRoZSBhdXRob3IgbWlnaHQgbm90IGhhdmUgY2xlYW5lZCB1cC5cbiAgICAgICAgdGhpcy4kZWwucmVwbGFjZVdpdGgodGhpcy4kZWwuY2xvbmVOb2RlKHRydWUpKTtcbiAgICAgICAgLy8gRGlzcGF0Y2ggYSBgZGVzdHJveWAgZXZlbnRcbiAgICAgICAgdGhpcy5maXJlKCdkZXN0cm95Jyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTaG93IHRoZSBkaWFsb2cgZWxlbWVudCwgdHJhcCB0aGUgY3VycmVudCBmb2N1cyB3aXRoaW4gaXQsIGxpc3RlbiBmb3Igc29tZVxuICAgICAqIHNwZWNpZmljIGtleSBwcmVzc2VzIGFuZCBmaXJlIGFsbCByZWdpc3RlcmVkIGNhbGxiYWNrcyBmb3IgYHNob3dgIGV2ZW50XG4gICAgICovXG4gICAgc2hvdyhldmVudCkge1xuICAgICAgICAvLyBJZiB0aGUgZGlhbG9nIGlzIGFscmVhZHkgb3BlbiwgYWJvcnRcbiAgICAgICAgaWYgKHRoaXMuc2hvd24pXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgLy8gS2VlcCBhIHJlZmVyZW5jZSB0byB0aGUgY3VycmVudGx5IGZvY3VzZWQgZWxlbWVudCB0byBiZSBhYmxlIHRvIHJlc3RvcmVcbiAgICAgICAgLy8gaXQgbGF0ZXJcbiAgICAgICAgdGhpcy5zaG93biA9IHRydWU7XG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nKTtcbiAgICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZCA9IGdldEFjdGl2ZUVsZW1lbnQoKTtcbiAgICAgICAgLy8gRHVlIHRvIGEgbG9uZyBsYXN0aW5nIGJ1ZyBpbiBTYWZhcmksIGNsaWNraW5nIGFuIGludGVyYWN0aXZlIGVsZW1lbnRcbiAgICAgICAgLy8gKGxpa2UgYSA8YnV0dG9uPikgZG9lcyAqbm90KiBtb3ZlIHRoZSBmb2N1cyB0byB0aGF0IGVsZW1lbnQsIHdoaWNoIG1lYW5zXG4gICAgICAgIC8vIGBkb2N1bWVudC5hY3RpdmVFbGVtZW50YCBpcyB3aGF0ZXZlciBlbGVtZW50IGlzIGN1cnJlbnRseSBmb2N1c2VkIChsaWtlXG4gICAgICAgIC8vIGFuIDxpbnB1dD4pLCBvciB0aGUgPGJvZHk+IGVsZW1lbnQgb3RoZXJ3aXNlLiBXZSBjYW4gd29yayBhcm91bmQgdGhhdFxuICAgICAgICAvLyBwcm9ibGVtIGJ5IGNoZWNraW5nIHdoZXRoZXIgdGhlIGZvY3VzZWQgZWxlbWVudCBpcyB0aGUgPGJvZHk+LCBhbmQgaWYgaXQsXG4gICAgICAgIC8vIHN0b3JlIHRoZSBjbGljayBldmVudCB0YXJnZXQuXG4gICAgICAgIC8vIFNlZTogaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTIyMjYxXG4gICAgICAgIGlmICh0aGlzLnByZXZpb3VzbHlGb2N1c2VkPy50YWdOYW1lID09PSAnQk9EWScgJiYgZXZlbnQ/LnRhcmdldCkge1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICAvLyBTZXQgdGhlIGZvY3VzIHRvIHRoZSBkaWFsb2cgZWxlbWVudFxuICAgICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9LaXR0eUdpcmF1ZGVsL2ExMXktZGlhbG9nL3B1bGwvNTgzXG4gICAgICAgIGlmIChldmVudD8udHlwZSA9PT0gJ2ZvY3VzJykge1xuICAgICAgICAgICAgdGhpcy5tYWludGFpbkZvY3VzKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIG1vdmVGb2N1c1RvRGlhbG9nKHRoaXMuJGVsKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBCaW5kIGEgZm9jdXMgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGJvZHkgZWxlbWVudCB0byBtYWtlIHN1cmUgdGhlIGZvY3VzXG4gICAgICAgIC8vIHN0YXlzIHRyYXBwZWQgaW5zaWRlIHRoZSBkaWFsb2cgd2hpbGUgb3BlbiwgYW5kIHN0YXJ0IGxpc3RlbmluZyBmb3Igc29tZVxuICAgICAgICAvLyBzcGVjaWZpYyBrZXkgcHJlc3NlcyAoVEFCIGFuZCBFU0MpXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLm1haW50YWluRm9jdXMsIHRydWUpO1xuICAgICAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5iaW5kS2V5cHJlc3MsIHRydWUpO1xuICAgICAgICAvLyBEaXNwYXRjaCBhIGBzaG93YCBldmVudFxuICAgICAgICB0aGlzLmZpcmUoJ3Nob3cnLCBldmVudCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBIaWRlIHRoZSBkaWFsb2cgZWxlbWVudCwgcmVzdG9yZSB0aGUgZm9jdXMgdG8gdGhlIHByZXZpb3VzbHkgYWN0aXZlXG4gICAgICogZWxlbWVudCwgc3RvcCBsaXN0ZW5pbmcgZm9yIHNvbWUgc3BlY2lmaWMga2V5IHByZXNzZXMgYW5kIGZpcmUgYWxsXG4gICAgICogcmVnaXN0ZXJlZCBjYWxsYmFja3MgZm9yIGBoaWRlYCBldmVudFxuICAgICAqL1xuICAgIGhpZGUoZXZlbnQpIHtcbiAgICAgICAgLy8gSWYgdGhlIGRpYWxvZyBpcyBhbHJlYWR5IGNsb3NlZCwgYWJvcnRcbiAgICAgICAgaWYgKCF0aGlzLnNob3duKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIHRoaXMuc2hvd24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy4kZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIHRoaXMucHJldmlvdXNseUZvY3VzZWQ/LmZvY3VzPy4oKTtcbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBmb2N1cyBldmVudCBsaXN0ZW5lciB0byB0aGUgYm9keSBlbGVtZW50IGFuZCBzdG9wIGxpc3RlbmluZ1xuICAgICAgICAvLyBmb3Igc3BlY2lmaWMga2V5IHByZXNzZXNcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMubWFpbnRhaW5Gb2N1cywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmJpbmRLZXlwcmVzcywgdHJ1ZSk7XG4gICAgICAgIC8vIERpc3BhdGNoIGEgYGhpZGVgIGV2ZW50XG4gICAgICAgIHRoaXMuZmlyZSgnaGlkZScsIGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFJlZ2lzdGVyIGEgbmV3IGNhbGxiYWNrIGZvciB0aGUgZ2l2ZW4gZXZlbnQgdHlwZVxuICAgICAqL1xuICAgIG9uKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFVucmVnaXN0ZXIgYW4gZXhpc3RpbmcgY2FsbGJhY2sgZm9yIHRoZSBnaXZlbiBldmVudCB0eXBlXG4gICAgICovXG4gICAgb2ZmKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyLCBvcHRpb25zKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIERpc3BhdGNoIGEgY3VzdG9tIGV2ZW50IGZyb20gdGhlIERPTSBlbGVtZW50IGFzc29jaWF0ZWQgd2l0aCB0aGlzIGRpYWxvZy5cbiAgICAgKiBUaGlzIGFsbG93cyBhdXRob3JzIHRvIGxpc3RlbiBmb3IgYW5kIHJlc3BvbmQgdG8gdGhlIGV2ZW50cyBpbiB0aGVpciBvd25cbiAgICAgKiBjb2RlXG4gICAgICovXG4gICAgZmlyZSh0eXBlLCBldmVudCkge1xuICAgICAgICB0aGlzLiRlbC5kaXNwYXRjaEV2ZW50KG5ldyBDdXN0b21FdmVudCh0eXBlLCB7XG4gICAgICAgICAgICBkZXRhaWw6IGV2ZW50LFxuICAgICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZSxcbiAgICAgICAgfSkpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBBZGQgYSBkZWxlZ2F0ZWQgZXZlbnQgbGlzdGVuZXIgZm9yIHdoZW4gZWxlbWVtdHMgdGhhdCBvcGVuIG9yIGNsb3NlIHRoZVxuICAgICAqIGRpYWxvZyBhcmUgY2xpY2tlZCwgYW5kIGNhbGwgYHNob3dgIG9yIGBoaWRlYCwgcmVzcGVjdGl2ZWx5XG4gICAgICovXG4gICAgaGFuZGxlVHJpZ2dlckNsaWNrcyhldmVudCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIC8vIFdlIHVzZSBgLmNsb3Nlc3QoLi4pYCBhbmQgbm90IGAubWF0Y2hlcyguLilgIGhlcmUgc28gdGhhdCBjbGlja2luZ1xuICAgICAgICAvLyBhbiBlbGVtZW50IG5lc3RlZCB3aXRoaW4gYSBkaWFsb2cgb3BlbmVyIGRvZXMgY2F1c2UgdGhlIGRpYWxvZyB0byBvcGVuXG4gICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdChgW2RhdGEtYTExeS1kaWFsb2ctc2hvdz1cIiR7dGhpcy5pZH1cIl1gKSkge1xuICAgICAgICAgICAgdGhpcy5zaG93KGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoYFtkYXRhLWExMXktZGlhbG9nLWhpZGU9XCIke3RoaXMuaWR9XCJdYCkgfHxcbiAgICAgICAgICAgICh0YXJnZXQuY2xvc2VzdCgnW2RhdGEtYTExeS1kaWFsb2ctaGlkZV0nKSAmJlxuICAgICAgICAgICAgICAgIHRhcmdldC5jbG9zZXN0KCdbYXJpYS1tb2RhbD1cInRydWVcIl0nKSA9PT0gdGhpcy4kZWwpKSB7XG4gICAgICAgICAgICB0aGlzLmhpZGUoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgZXZlbnQgaGFuZGxlciB1c2VkIHdoZW4gbGlzdGVuaW5nIHRvIHNvbWUgc3BlY2lmaWMga2V5IHByZXNzZXNcbiAgICAgKiAobmFtZWx5IEVTQyBhbmQgVEFCKVxuICAgICAqL1xuICAgIGJpbmRLZXlwcmVzcyhldmVudCkge1xuICAgICAgICAvLyBUaGlzIGlzIGFuIGVzY2FwZSBoYXRjaCBpbiBjYXNlIHRoZXJlIGFyZSBuZXN0ZWQgb3BlbiBkaWFsb2dzLCBzbyB0aGF0XG4gICAgICAgIC8vIG9ubHkgdGhlIHRvcCBtb3N0IGRpYWxvZyBnZXRzIGludGVyYWN0ZWQgd2l0aFxuICAgICAgICBpZiAoZG9jdW1lbnQuYWN0aXZlRWxlbWVudD8uY2xvc2VzdCgnW2FyaWEtbW9kYWw9XCJ0cnVlXCJdJykgIT09IHRoaXMuJGVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgbGV0IGhhc09wZW5Qb3BvdmVyID0gZmFsc2U7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBoYXNPcGVuUG9wb3ZlciA9ICEhdGhpcy4kZWwucXVlcnlTZWxlY3RvcignW3BvcG92ZXJdOm5vdChbcG9wb3Zlcj1cIm1hbnVhbFwiXSk6cG9wb3Zlci1vcGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2gge1xuICAgICAgICAgICAgLy8gUnVuIHRoYXQgRE9NIHF1ZXJ5IGluIGEgdHJ5L2NhdGNoIGJlY2F1c2Ugbm90IGFsbCBicm93c2VycyBzdXBwb3J0IHRoZVxuICAgICAgICAgICAgLy8gYDpwb3BvdmVyLW9wZW5gIHNlbGVjdG9yLCB3aGljaCB3b3VsZCBjYXVzZSB0aGUgd2hvbGUgZXhwcmVzc2lvbiB0b1xuICAgICAgICAgICAgLy8gZmFpbFxuICAgICAgICAgICAgLy8gU2VlOiBodHRwczovL2Nhbml1c2UuY29tL21kbi1jc3Nfc2VsZWN0b3JzX3BvcG92ZXItb3BlblxuICAgICAgICAgICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vS2l0dHlHaXJhdWRlbC9hMTF5LWRpYWxvZy9wdWxsLzU3OCNkaXNjdXNzaW9uX3IxMzQzMjE1MTQ5XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIGRpYWxvZyBpcyBzaG93biBhbmQgdGhlIEVTQyBrZXkgaXMgcHJlc3NlZCwgcHJldmVudCBhbnkgZnVydGhlclxuICAgICAgICAvLyBlZmZlY3RzIGZyb20gdGhlIEVTQyBrZXkgYW5kIGhpZGUgdGhlIGRpYWxvZywgdW5sZXNzOlxuICAgICAgICAvLyAtIGl0cyByb2xlIGlzIGBhbGVydGRpYWxvZ2AsIHdoaWNoIG1lYW5zIGl0IHNob3VsZCBiZSBtb2RhbFxuICAgICAgICAvLyAtIG9yIGl0IGNvbnRhaW5zIGFuIG9wZW4gcG9wb3ZlciwgaW4gd2hpY2ggY2FzZSBFU0Mgc2hvdWxkIGNsb3NlIGl0XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdFc2NhcGUnICYmXG4gICAgICAgICAgICB0aGlzLiRlbC5nZXRBdHRyaWJ1dGUoJ3JvbGUnKSAhPT0gJ2FsZXJ0ZGlhbG9nJyAmJlxuICAgICAgICAgICAgIWhhc09wZW5Qb3BvdmVyKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdGhpcy5oaWRlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgZGlhbG9nIGlzIHNob3duIGFuZCB0aGUgVEFCIGtleSBpcyBwcmVzc2VkLCBtYWtlIHN1cmUgdGhlIGZvY3VzXG4gICAgICAgIC8vIHN0YXlzIHRyYXBwZWQgd2l0aGluIHRoZSBkaWFsb2cgZWxlbWVudFxuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnVGFiJykge1xuICAgICAgICAgICAgdHJhcFRhYktleSh0aGlzLiRlbCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIElmIHRoZSBkaWFsb2cgaXMgc2hvd24gYW5kIHRoZSBmb2N1cyBpcyBub3Qgd2l0aGluIGEgZGlhbG9nIGVsZW1lbnQgKGVpdGhlclxuICAgICAqIHRoaXMgb25lIG9yIGFub3RoZXIgb25lIGluIGNhc2Ugb2YgbmVzdGVkIGRpYWxvZ3MpIG9yIGF0dHJpYnV0ZSwgbW92ZSBpdFxuICAgICAqIGJhY2sgdG8gdGhlIGRpYWxvZyBjb250YWluZXJcbiAgICAgKiBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9LaXR0eUdpcmF1ZGVsL2ExMXktZGlhbG9nL2lzc3Vlcy8xNzdcbiAgICAgKi9cbiAgICBtYWludGFpbkZvY3VzKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgaWYgKCF0YXJnZXQuY2xvc2VzdCgnW2FyaWEtbW9kYWw9XCJ0cnVlXCJdLCBbZGF0YS1hMTF5LWRpYWxvZy1pZ25vcmUtZm9jdXMtdHJhcF0nKSkge1xuICAgICAgICAgICAgbW92ZUZvY3VzVG9EaWFsb2codGhpcy4kZWwpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbnN0YW50aWF0ZURpYWxvZ3MoKSB7XG4gICAgZm9yIChjb25zdCBlbCBvZiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hMTF5LWRpYWxvZ10nKSkge1xuICAgICAgICBuZXcgQTExeURpYWxvZyhlbCk7XG4gICAgfVxufVxuaWYgKHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAoZG9jdW1lbnQucmVhZHlTdGF0ZSA9PT0gJ2xvYWRpbmcnKSB7XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBpbnN0YW50aWF0ZURpYWxvZ3MpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgICAgaW5zdGFudGlhdGVEaWFsb2dzKCk7XG4gICAgfVxufVxuXG5leHBvcnQgeyBBMTF5RGlhbG9nIGFzIGRlZmF1bHQgfTtcbiIsICJpbXBvcnQgQTExeURpYWxvZyBmcm9tICdhMTF5LWRpYWxvZyc7XHJcblxyXG5jb25zdCBkaWFsb2dzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZGlhbG9ncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1kaWFsb2cnKTtcclxuXHJcbiAgICBpZiAoIWRpYWxvZ3MubGVuZ3RoKSByZXR1cm47XHJcblxyXG4gICAgZGlhbG9ncy5mb3JFYWNoKGRpYWxvZyA9PiB7XHJcbiAgICAgICAgY29uc3QgZWwgPSBuZXcgQTExeURpYWxvZyhkaWFsb2cpO1xyXG5cclxuICAgICAgICBlbC5vbignc2hvdycsICgpID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ292ZXJmbG93LWhpZGRlbicpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBlbC5vbignaGlkZScsICgpID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ292ZXJmbG93LWhpZGRlbicpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmNvbnN0IGZvcm1zQWNjZXNzRGlhbG9nID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Zvcm1zLWxpYnJhcnktZGlhbG9nJyk7XHJcblxyXG4gICAgaWYgKCFkaWFsb2cpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBoaWRkZW5UcmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtYTExeS1kaWFsb2ctc2hvdz1cImZvcm1zLWxpYnJhcnktZGlhbG9nXCJdJyk7XHJcbiAgICBjb25zdCBjbG9zZVRyaWdnZXIgPSBkaWFsb2cucXVlcnlTZWxlY3RvcignW2RhdGEtYTExeS1kaWFsb2ctaGlkZV0nKTtcclxuICAgIGNvbnN0IGNoZWNrYm94ID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2ctY29udGVudC1mb290ZXIgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XHJcbiAgICBjb25zdCBzdWJtaXQgPSBkaWFsb2cucXVlcnlTZWxlY3RvcignLmRpYWxvZy1jb250ZW50LWZvb3RlciAuYnRuLXByaW1hcnknKTtcclxuICAgIFxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zvcm1zLWFjY2Vzcy1hcHByb3ZlZCcpKSB7XHJcbiAgICAgICAgICAgIGhpZGRlblRyaWdnZXIuY2xpY2soKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmIChlLnRhcmdldC5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgIHN1Ym1pdC5yZW1vdmVBdHRyaWJ1dGUoJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc3VibWl0LnNldEF0dHJpYnV0ZSgnZGlzYWJsZWQnLCAnZGlzYWJsZWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcbiAgICBzdWJtaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgIGlmICghbG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2Zvcm1zLWFjY2Vzcy1hcHByb3ZlZCcpKSB7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCdmb3Jtcy1hY2Nlc3MtYXBwcm92ZWQnLCB0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNsb3NlVHJpZ2dlci5jbGljaygpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCB7IGRpYWxvZ3MsIGZvcm1zQWNjZXNzRGlhbG9nIH07IiwgImNvbnN0IGhvbWVIZXJvID0gKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IHRhYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jYWxlbmRhci10YWInKTtcclxuICAgIGNvbnN0IHRhYlBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNhbGVuZGFyLXBhbmVsJyk7XHJcblxyXG4gICAgaWYgKCF0YWIpIHJldHVybjtcclxuXHJcbiAgICB0YWIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHRhYlBhbmVsLmNsYXNzTGlzdC50b2dnbGUoXCJpcy1hY3RpdmVcIik7XHJcbiAgICAgICAgdGFiLmNsYXNzTGlzdC50b2dnbGUoXCJpcy1hY3RpdmVcIik7XHJcbiAgICB9KTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBob21lSGVybzsiLCAiY29uc3QgcGxheUxpc3QgPSAoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgcGxheWVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2pzLXBsYXlsaXN0LXBsYXllcicpO1xyXG4gICAgY29uc3QgZGF0ZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcGxheWxpc3QtZGF0ZScpO1xyXG4gICAgY29uc3QgdGl0bGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBsYXlsaXN0LXRpdGxlJyk7XHJcbiAgICBjb25zdCBkZXNjclRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcGxheWxpc3QtZGVzY3JpcHRpb24nKTtcclxuICAgIGNvbnN0IHBsYXlsaXN0SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtcGxheWxpc3QtaXRlbScpO1xyXG5cclxuICAgIGNvbnN0IHVwZGF0ZVZpZXcgPSAoeyB0aXRsZSwgZGVzY3JpcHRpb24sIGRhdGUsIHl0IH0pID0+IHtcclxuXHJcbiAgICAgICAgd2luZG93LnNjcm9sbFRvKHtcclxuICAgICAgICAgICAgdG9wOiAxMjAsXHJcbiAgICAgICAgICAgIGxlZnQ6IDAsXHJcbiAgICAgICAgICAgIGJlaGF2aW9yOiBcInNtb290aFwiLFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwbGF5ZXIuc3JjID0gYGh0dHBzOi8vd3d3LnlvdXR1YmUuY29tL2VtYmVkLyR7eXR9P2F1dG9wbGF5PTFgO1xyXG4gICAgICAgIGRhdGVUZXh0LmlubmVySFRNTCA9IGRhdGU7XHJcbiAgICAgICAgdGl0bGVUZXh0LmlubmVySFRNTCA9IHRpdGxlO1xyXG4gICAgICAgIGRlc2NyVGV4dC5pbm5lckhUTUwgPSBkZXNjcmlwdGlvbjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoYW5kbGVBY3RpdmUgPSAoYWN0aXZlSXRlbSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRBY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcGxheWxpc3QtaXRlbVthcmlhLXNlbGVjdGVkPVwidHJ1ZVwiXScpO1xyXG4gICAgICAgIGN1cnJlbnRBY3RpdmUuc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBcImZhbHNlXCIpO1xyXG4gICAgICAgIGFjdGl2ZUl0ZW0uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBcInRydWVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheWxpc3RJdGVtcy5mb3JFYWNoKChpdGVtKSA9PiB7XHJcblxyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHVwZGF0ZVZpZXcoe1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IGl0ZW0uZGF0YXNldC50aXRsZSxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBpdGVtLmRhdGFzZXQuZGVzY3JpcHRpb24sXHJcbiAgICAgICAgICAgICAgICBkYXRlOiBpdGVtLmRhdGFzZXQuZGF0ZSxcclxuICAgICAgICAgICAgICAgIHl0OiBpdGVtLmRhdGFzZXQueXRcclxuICAgICAgICAgICAgfSlcclxuXHJcbiAgICAgICAgICAgIGhhbmRsZUFjdGl2ZShpdGVtKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGxheUxpc3Q7IiwgImNvbnN0IGhvdFRpcExpYnJhcnkgPSAoKSA9PiB7XHJcbiAgICBcclxuICAgIGNvbnN0IHBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcbiAgICBjb25zdCByZXN1bHRzTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1ob3QtdGlwLWxpc3QnKTtcclxuXHJcbiAgICBpZiAoIXJlc3VsdHNMaXN0KSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgbW9iaWxlQ2F0ZWdvcnlTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbW9iaWxlLWhvdC10aXAtY2F0ZWdvcnknKTtcclxuICAgIGNvbnN0IG1vYmlsZVN1YmNhdGVnb3J5U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1vYmlsZS1ob3QtdGlwLXN1YmNhdGVnb3J5Jyk7XHJcbiAgICBjb25zdCBkZXNrdG9wU3ViY2F0ZWdvcnlGaWx0ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWRlc2t0b3Atc3ViY2F0ZWdvcnktZmlsdGVyJyk7XHJcblxyXG4gICAgbGV0IHNlbGVjdGVkQ2F0ZWdvcmllcyA9IHBhcmFtcy5oYXMoJ2NhdGVnb3J5JykgPyBbcGFyYW1zLmdldCgnY2F0ZWdvcnknKV0gOiBbXTtcclxuICAgIGxldCBzZWxlY3RlZFN1YmNhdGVnb3JpZXMgPSBwYXJhbXMuaGFzKCdzdWJjYXRlZ29yeScpID8gW3BhcmFtcy5nZXQoJ3N1YmNhdGVnb3J5JyldIDogW107XHJcblxyXG4gICAgY29uc3QgcGFnaW5hdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1ob3QtdGlwLWxpc3QtcGFnaW5hdGlvbicpO1xyXG4gICAgbGV0IHBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgY29uc3QgcGFnZVNpemUgPSAxMDtcclxuICAgIGxldCB0b3RhbFJlc3VsdHMgPSAwO1xyXG4gICAgbGV0IHRvdGFsUmVzdWx0UGFnZXMgPSAwO1xyXG5cclxuICAgIGdldFJlc3VsdHMoKTtcclxuICAgIGhhbmRsZUZpbHRlckV2ZW50cygpO1xyXG5cclxuICAgIC8vL1xyXG5cclxuICAgIGNvbnN0IHNjcm9sbEJhY2tUb3AgPSAoKSA9PiB7XHJcbiAgICAgICAgcmVzdWx0c0xpc3Quc2Nyb2xsSW50b1ZpZXcoe1xyXG4gICAgICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCcsXHJcbiAgICAgICAgICAgIGJsb2NrOiAnc3RhcnQnLFxyXG4gICAgICAgICAgICBpbmxpbmU6ICduZWFyZXN0J1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyUmVzdWx0cygpIHtcclxuICAgICAgICByZXN1bHRzTGlzdC5pbm5lckhUTUwgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRSZXN1bHRzKCkge1xyXG4gICAgICAgIGZldGNoKCcvSG90VGlwcycsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgIFwiY2F0ZWdvcmllc1wiOiBzZWxlY3RlZENhdGVnb3JpZXMsXHJcbiAgICAgICAgICAgICAgICBcInN1YmNhdGVnb3JpZXNcIjogc2VsZWN0ZWRTdWJjYXRlZ29yaWVzLFxyXG4gICAgICAgICAgICAgICAgXCJwYWdpbmF0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInBhZ2VOdW1iZXJcIjogcGFnZU51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBcInBhZ2VTaXplXCI6IHBhZ2VTaXplXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlbmRlclJlc3VsdHMoZGF0YS5ob3RUaXBzKTtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUNhcmRUb2dnbGVzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdG90YWxSZXN1bHRzID0gZGF0YS5zZWFyY2hJbmZvLnRvdGFsUmVzdWx0cztcclxuICAgICAgICAgICAgICAgIHRvdGFsUmVzdWx0UGFnZXMgPSBNYXRoLmNlaWwodG90YWxSZXN1bHRzIC8gcGFnZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlUGFnaW5hdGlvbih0b3RhbFJlc3VsdFBhZ2VzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyUmVzdWx0cyhyZXN1bHRzKSB7XHJcbiAgICAgICAgY2xlYXJSZXN1bHRzKCk7XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXN1bHRzLmZvckVhY2gocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwdWJsaXNoRGF0ZSA9IG5ldyBEYXRlKHJlc3VsdC5wdWJsaXNoRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgY2F0ZWdvcmllcyA9IHJlc3VsdC5jYXRlZ29yaWVzO1xyXG4gICAgICAgICAgICAgICAgbGV0IHN1YmNhdGVnb3JpZXMgPSByZXN1bHQuc3ViQ2F0ZWdvcnk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVzdWx0c0xpc3QuaW5uZXJIVE1MICs9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWItMiBwLTQgcGItMiBiZy1saWdodFwiIGl0ZW1zY29wZSBpdGVtdHlwZT1cImh0dHBzOi8vc2NoZW1hLm9yZy9RdWVzdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGFsaWduLWl0ZW1zLWxnLWNlbnRlciBtYi0zIGZ3LXNlbWlib2xkXCIgc3R5bGU9XCJmb250LXNpemU6IDAuNzVyZW07XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZmxleC1ncm93LTFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke09iamVjdC5rZXlzKGNhdGVnb3JpZXMpLm1hcChjYXRlZ29yeSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCJkLWlubGluZS1ibG9jayBtYi0xIG1lLTEgcHgtMyBweS0yIHJvdW5kZWQtcGlsbCBiZy1zZWNvbmRhcnkgdGV4dC13aGl0ZVwiPiR7cmVzdWx0LmNhdGVnb3JpZXNbY2F0ZWdvcnldfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7T2JqZWN0LmtleXMoc3ViY2F0ZWdvcmllcykubWFwKHN1YmNhdGVnb3J5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cImQtaW5saW5lLWJsb2NrIG1iLTEgbWUtMSBweC0zIHB5LTIgcm91bmRlZC1waWxsIGJnLXByaW1hcnkgdGV4dC13aGl0ZVwiPiR7cmVzdWx0LnN1YkNhdGVnb3J5W3N1YmNhdGVnb3J5XX08L3NwYW4+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRpbWUgaXRlbXByb3A9XCJkYXRlQ3JlYXRlZFwiIGRhdGV0aW1lPVwiJHtwdWJsaXNoRGF0ZX1cIj4ke3B1Ymxpc2hEYXRlLmdldE1vbnRoKCkgKyAxfS8ke3B1Ymxpc2hEYXRlLmdldERhdGUoKX0vJHtwdWJsaXNoRGF0ZS5nZXRGdWxsWWVhcigpfTwvdGltZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3QtdGlwLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaXRlbXByb3A9XCJuYW1lXCIgY2xhc3M9XCJtYi0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtyZXN1bHQucXVlc3Rpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgaXRlbXByb3A9XCJhY2NlcHRlZEFuc3dlclwiIGl0ZW1zY29wZSBpdGVtdHlwZT1cImh0dHBzOi8vc2NoZW1hLm9yZy9BbnN3ZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGl0ZW1wcm9wPVwidGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Jlc3VsdC5hbnN3ZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJob3QtdGlwLXRvZ2dsZSBweS0zXCIgdHlwZT1cImJ1dHRvblwiPlJlYWQgQW5zd2VyPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHRzTGlzdC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cInBiLTUgcGItbGctMTAgdGV4dC1jZW50ZXJcIj5Tb3JyeSwgdGhlcmUgYXJlIG5vIHJlc3VsdHMgdGhhdCBtYXRjaCB0aGUgc2VhcmNoIGNyaXRlcmlhLjwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUNhcmRUb2dnbGVzKCkge1xyXG4gICAgICAgIGNvbnN0IHRvZ2dsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG90LXRpcC10b2dnbGUnKTtcclxuXHJcbiAgICAgICAgdG9nZ2xlcy5mb3JFYWNoKHRvZ2dsZSA9PiB7XHJcbiAgICAgICAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9nZ2xlID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9IGUudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50LmNsYXNzTGlzdC5jb250YWlucygnaG90LXRpcC1jb250ZW50LS1leHBhbmRlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlLmlubmVyVGV4dCA9ICdSZWFkIEFuc3dlcic7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdob3QtdGlwLWNvbnRlbnQtLWV4cGFuZGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZS5pbm5lclRleHQgPSAnQ2xvc2UgQW5zd2VyJztcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2hvdC10aXAtY29udGVudC0tZXhwYW5kZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlRmlsdGVyRXZlbnRzKCkge1xyXG4gICAgICAgIG1vYmlsZUNhdGVnb3J5U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5kZWxldGUoJ2NhdGVnb3J5Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuc2V0KCdjYXRlZ29yeScsIGUudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGFyYW1zLmRlbGV0ZSgnc3ViY2F0ZWdvcnknKTsgLy8gaWYgY2hhbmdpbmcgY2F0ZWdvcnkgdGhlbiBzdWJjYXRlZ29yaWVzIG5vIGxvbmdlciBtYXRjaFxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uc2VhcmNoID0gcGFyYW1zLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChtb2JpbGVTdWJjYXRlZ29yeVNlbGVjdCkge1xyXG4gICAgICAgICAgICBtb2JpbGVTdWJjYXRlZ29yeVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5kZWxldGUoJ3N1YmNhdGVnb3J5Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5zZXQoJ3N1YmNhdGVnb3J5JywgZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggPSBwYXJhbXMudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGVza3RvcFN1YmNhdGVnb3J5RmlsdGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZGVza3RvcFN1YmNhdGVnb3J5RmlsdGVycy5mb3JFYWNoKGZpbHRlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFN1YmNhdGVnb3J5ICE9IGUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5zZXQoJ3N1YmNhdGVnb3J5JywgZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uc2VhcmNoID0gcGFyYW1zLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbGVhclBhZ2luYXRpb24gKCkge1xyXG4gICAgICAgIGlmIChwYWdpbmF0aW9uQ29udGFpbmVyLm5leHRFbGVtZW50U2libGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAocGFnaW5hdGlvbkNvbnRhaW5lci5uZXh0RWxlbWVudFNpYmxpbmcudGFnTmFtZSA9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvbnRhaW5lci5uZXh0RWxlbWVudFNpYmxpbmcucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYWdpbmF0aW9uQ29udGFpbmVyLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHBhZ2luYXRpb25Db250YWluZXIucHJldmlvdXNFbGVtZW50U2libGluZy50YWdOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uQ29udGFpbmVyLnByZXZpb3VzRWxlbWVudFNpYmxpbmcucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhZ2luYXRpb25Db250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlUGFnaW5hdGlvbih0b3RhbFBhZ2VzKSB7XHJcblxyXG4gICAgICAgIHRvdGFsUmVzdWx0UGFnZXMgPSBwYXJzZUludCh0b3RhbFJlc3VsdFBhZ2VzKTtcclxuXHJcbiAgICAgICAgY2xlYXJQYWdpbmF0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFBhZ2VzID4gMSkge1xyXG4gICAgICAgICAgICBwYWdpbmF0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3B5LTQnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxQYWdlczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcclxuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBgR28gdG8gcGFnZSAke2kgKyAxfWApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYWdlTnVtYmVyID09IChpICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb25seSBzaG93cyBwYWdpbmF0aW9uIG51bWJlcnMgLSszIG9mIGN1cnJlbnQgZm9yIHJlc3VsdHMgbW9yZSB0aGFuIDcgcGFnZXNcclxuICAgICAgICAgICAgICAgIGlmICh0b3RhbFBhZ2VzID4gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoaSA8IHBhZ2VOdW1iZXIgJiYgaSA+IChwYWdlTnVtYmVyIC0gNSkpIHx8IChpID4gKHBhZ2VOdW1iZXIgLSAxKSAmJiBpIDwgKChwYWdlTnVtYmVyIC0gMSkgKyA0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnZC1pbmxpbmUtYmxvY2snKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxpLnRleHRDb250ZW50ID0gaSArIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbGVhclJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFja1RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwYWdlTnVtYmVyID4gMSkgeyAvLyBzaG93IHByZXZpb3VzIGJ1dHRvblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgICAgICBwcmV2QnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1wcmV2Jyk7XHJcbiAgICAgICAgICAgICAgICBwcmV2QnRuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnR28gdG8gcHJldmlvdXMgcGFnZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciAtPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbGVhclJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFja1RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvbnRhaW5lci5iZWZvcmUocHJldkJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwYWdlTnVtYmVyIDwgdG90YWxQYWdlcykgeyAvLyBzaG93IG5leHQgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgICAgIG5leHRCdG4uY2xhc3NMaXN0LmFkZCgnYnRuLW5leHQnKTtcclxuICAgICAgICAgICAgICAgIG5leHRCdG4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdHbyB0byBuZXh0IHBhZ2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXIgKz0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0UmVzdWx0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJhY2tUb3AoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25Db250YWluZXIuYWZ0ZXIobmV4dEJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaG90VGlwTGlicmFyeTsiLCAiY29uc3QgYWxlcnQgPSAoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgY2xvc2VBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1hbGVydC1jbG9zZScpO1xyXG4gICAgY29uc3QgYWxlcnRCYW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2l0ZS1hbGVydCcpO1xyXG5cclxuICAgIGNvbnN0IHNldENvb2tpZSA9ICh0aW1lc3RhbXAsIGV4cCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSA2MCAqIDI0ICogcGFyc2VJbnQoZXhwKTsvLzEgbW9udGhcclxuICAgICAgICBub3cuc2V0VGltZShub3cuZ2V0VGltZSgpICsgKG1pbnV0ZXMgKiA2MCAqIDEwMDApKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gYHdyYV9hbGVydF9iYW5uZXI9JHt0aW1lc3RhbXB9O2V4cGlyZXM9YCArIG5vdy50b1VUQ1N0cmluZygpICsgXCI7XCI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsb3NlQWxlcnQgIT09IG51bGwpIHtcclxuICAgICAgICBjbG9zZUFsZXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGFsZXJ0QmFubmVyLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGltZXN0YW1wID0gYWxlcnRCYW5uZXIuZGF0YXNldC50aW1lc3RhbXA7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4cCA9IGFsZXJ0QmFubmVyLmRhdGFzZXQuZXhwaXJhdGlvbjtcclxuICAgICAgICAgICAgc2V0Q29va2llKHRpbWVzdGFtcCwgZXhwKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFsZXJ0OyIsICJjb25zdCBhcnRpY2xlRmlsdGVycyA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBmaWx0ZXJSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWFydGljbGUtcmVzdWx0cycpO1xyXG5cclxuICAgIGlmICghZmlsdGVyUmVzdWx0cykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGZpbHRlckJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtYXJ0aWNsZS1maWx0ZXInKTtcclxuICAgIGNvbnN0IGZpbHRlckRyb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWFydGljbGUtZHJvcGRvd24nKTtcclxuXHJcbiAgICBjb25zdCBzZWFyY2hGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld3Mtc2VhcmNoJyk7XHJcbiAgICBjb25zdCBwYWdpbmF0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWFydGljbGVzLXBhZ2luYXRpb24nKTtcclxuICAgIGNvbnN0IHJlc3VsdHNMb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcmVzdWx0cy1sb2FkZXInKTtcclxuICAgIGNvbnN0IGZlYXR1cmVkQXJ0aWNsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLWZlYXR1cmVkLWFydGljbGVcIik7XHJcblxyXG4gICAgY29uc3QgYXBpRW5kcG9pbnRVcmwgPSBcIi9OZXdzQW5kVXBkYXRlc1wiO1xyXG4gICAgbGV0IHBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgY29uc3QgcGFnZVNpemUgPSAxNTtcclxuXHJcbiAgICBsZXQgdG90YWxSZXN1bHRzID0gMDtcclxuICAgIGxldCB0b3RhbFJlc3VsdFBhZ2VzID0gMDtcclxuXHJcbiAgICAvL1VybHNcclxuXHJcbiAgICBjb25zdCB3aW5kb3dMb2FkUXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xyXG4gICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3dMb2FkUXVlcnlTdHJpbmcpO1xyXG5cclxuICAgIGxldCBzZWFyY2hQaHJhc2UgPSBcIlwiO1xyXG5cclxuICAgIGlmICh1cmxQYXJhbXMuaGFzKFwic2VhcmNoXCIpKSB7XHJcbiAgICAgICAgc2VhcmNoUGhyYXNlID0gdXJsUGFyYW1zLmdldChcInNlYXJjaFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY2F0ZWdvcnkgPSBcIlwiO1xyXG5cclxuICAgIGlmICh1cmxQYXJhbXMuaGFzKFwiY2F0ZWdvcnlcIikpIHtcclxuICAgICAgICBjYXRlZ29yeSA9IHVybFBhcmFtcy5nZXQoXCJjYXRlZ29yeVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1Jlc3VsdHNcclxuXHJcbiAgICBjb25zdCBzY3JvbGxCYWNrVG9wID0gKCkgPT4ge1xyXG4gICAgICAgIGZpbHRlclJlc3VsdHMuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwic3RhcnRcIiwgaW5saW5lOiBcIm5lYXJlc3RcIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoYW5kbGVJbmRpY2F0b3JzID0gKHNob3csIHdhaXRMb2FkZXJFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHNob3cgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB3YWl0TG9hZGVyRWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3YWl0TG9hZGVyRWxlbWVudC5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBraWxsUmVzdWx0cyA9ICgpID0+IHtcclxuICAgICAgICBmaWx0ZXJSZXN1bHRzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnRuU3RhdGVzID0gKGNsZWFyQWxsLCBzZXRUb0NhdCkgPT4ge1xyXG5cclxuICAgICAgICBmaWx0ZXJCdG5zLmZvckVhY2goKGZpbHRlckJ0bikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZmlsdGVyQnRuLnZhbHVlID09IHNldFRvQ2F0ICYmIGNsZWFyQWxsICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJCdG4uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJEcm9wZG93bi52YWx1ZSA9IHNldFRvQ2F0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyQnRuLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoZmlsdGVyRHJvcGRvd24udmFsdWUgPT0gc2V0VG9DYXQpIHtcclxuICAgICAgICAgICAgZmlsdGVyRHJvcGRvd24udmFsdWUgPSBzZXRUb0NhdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmaWx0ZXJEcm9wZG93bi52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZlYXR1cmVkQXJ0aWNsZUhhbmRsZXIgPSAoYWN0aXZlRmVhdHVyZSwgaGlkZUFsbCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBmaXJzdENhdFNsdWcgPSBmZWF0dXJlZEFydGljbGVzWzBdLmRhdGFzZXQuZmVhdHVyZWRjYXQ7XHJcblxyXG4gICAgICAgIGZlYXR1cmVkQXJ0aWNsZXMuZm9yRWFjaCgoZmVhdHVyZWRBcnRpY2xlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoaGlkZUFsbCkge1xyXG4gICAgICAgICAgICAgICAgZmVhdHVyZWRBcnRpY2xlLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmVhdHVyZUNhdGVnb3J5ID0gZmVhdHVyZWRBcnRpY2xlLmRhdGFzZXQuZmVhdHVyZWRjYXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChmZWF0dXJlQ2F0ZWdvcnkgPT0gYWN0aXZlRmVhdHVyZSAmJiBmZWF0dXJlQ2F0ZWdvcnkgIT09IFwiYWxsXCIpIHx8IChmZWF0dXJlQ2F0ZWdvcnkgPT0gXCJhbGxcIiAmJiBhY3RpdmVGZWF0dXJlID09IFwiXCIpIHx8IGFjdGl2ZUZlYXR1cmUgPT0gXCJcIiAmJiBmZWF0dXJlQ2F0ZWdvcnkgPT0gZmlyc3RDYXRTbHVnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZWRBcnRpY2xlLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlZEFydGljbGUuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUmVzdWx0cyA9IChyZXN1bHRzKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChzZWFyY2hQaHJhc2UgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgYnRuU3RhdGVzKHRydWUsIGNhdGVnb3J5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBidG5TdGF0ZXMoZmFsc2UsIGNhdGVnb3J5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHsgXHJcblxyXG4gICAgICAgICAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNldEltYWdlID0gcmVzdWx0LmltYWdlICE9PSBcIlwiID8gcmVzdWx0LmltYWdlIDogZmlsdGVyUmVzdWx0cy5kYXRhc2V0LmZhbGxiYWNrO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpbHRlclJlc3VsdHMuaW5uZXJIVE1MICs9IChcclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWJsb2NrIGNvbC1tZC02IGNvbC1sZy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtyZXN1bHQudXJsfVwiIGNsYXNzPVwibmV3cy1jYXJkIG5ld3MtY2FyZC0tbGcgdGV4dC1kZWNvcmF0aW9uLW5vbmUgZC1ibG9jayBwLTRcIiBzdHlsZT1cImNvbG9yOiB2YXIoLS1icy1kYXJrKTtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWItNCByYXRpbyByYXRpby0xNng5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzZXRJbWFnZX1cIiBsb2FkaW5nPVwibGF6eVwiIGNsYXNzPVwiaW1nLWZsdWlkXCIgd2lkdGg9XCI2NjBcIiBoZWlnaHQ9XCIzMzBcIiBhbHQ9XCIke3Jlc3VsdC50aXRsZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1iLTIgZC1mbGV4IGZsZXgtcm93IGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGltZSBjbGFzcz1cImZzLXhzIGZ3LWJvbGRcIiBkYXRldGltZT1cIiR7cmVzdWx0LmRhdGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Jlc3VsdC5kYXRlRGlzcGxheX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aW1lPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoaXAgY2hpcC0tbm8taG92ZXIgYWxpZ24tc2VsZi1zdGFydFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtyZXN1bHQuY2F0ZWdvcnl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJoNiBtYi0yXCI+JHtyZXN1bHQudGl0bGV9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImZzLXNtXCI+JHtyZXN1bHQuZXhjZXJwdH08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlclJlc3VsdHMuaW5uZXJIVE1MID0gKGA8ZGl2IGNsYXNzPVwiZC1ibG9jayBjb2wtbWQtMTAgbXgtYXV0byBoNSB0ZXh0LWNlbnRlclwiPk5vIHJlc3VsdHMuIFRyeSBhZ2Fpbi48L2Rpdj5gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBoYW5kbGVJbmRpY2F0b3JzKGZhbHNlLCByZXN1bHRzTG9hZGVyKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0IGhhbmRsZUNsZWFyUGFnaW5hdGlvbiA9IChwYWdpbmF0aW9uRWxlbWVudCkgPT4ge1xyXG5cclxuICAgICAgICBpZiAocGFnaW5hdGlvbkVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChwYWdpbmF0aW9uRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcudGFnTmFtZSA9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFnaW5hdGlvbkVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAocGFnaW5hdGlvbkVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50YWdOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgIH0gIFxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZVBhZ2luYXRpb24gPSAocGFnaW5hdGlvbkVsZW1lbnQsIHJlc3VsdFBhZ2VDb3VudCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCB0b3RhbFBhZ2VzID0gcGFyc2VJbnQocmVzdWx0UGFnZUNvdW50KTtcclxuXHJcbiAgICAgICAgaGFuZGxlQ2xlYXJQYWdpbmF0aW9uKHBhZ2luYXRpb25Db250YWluZXIpOy8vY2xlYXIgZmlyc3RcclxuXHJcbiAgICAgICAgLy9udW1iZXJlZCBwYWdlIGJ1dHRvbnNcclxuICAgICAgICBpZiAodG90YWxQYWdlcyA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxQYWdlczsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgYEdvIHRvIHBhZ2UgJHtpICsgMX1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFnZU51bWJlciA9PSAoaSArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcImN1cnJlbnRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9vbmx5IHNob3dzIHBhZ2luYXRpb24gbnVtYmVycyAtKzMgb2YgY3VycmVudCBmb3IgcmVzdWx0cyBtb3JlIHRoYW4gNyBwYWdlc1xyXG4gICAgICAgICAgICAgICAgaWYgKHRvdGFsUGFnZXMgPiA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChpIDwgcGFnZU51bWJlciAmJiBpID4gKHBhZ2VOdW1iZXIgLSA1KSkgfHwgKGkgPiAocGFnZU51bWJlciAtIDEpICYmIGkgPCAoKHBhZ2VOdW1iZXIgLSAxKSArIDQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKFwiZC1pbmxpbmUtYmxvY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsaS50ZXh0Q29udGVudCA9IGkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYWNrVG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbmV4dC9wcmV2IGJ1dHRvbnNcclxuICAgICAgICBpZiAodG90YWxQYWdlcyA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYWdlTnVtYmVyID4gMSkgeyAvL3Nob3cgcHJldmlvdXMgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgICAgIHByZXZCdG4uY2xhc3NMaXN0LmFkZChcImJ0bi1wcmV2XCIpO1xyXG4gICAgICAgICAgICAgICAgcHJldkJ0bi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIkdvIHRvIHByZXZpb3VzIHBhZ2VcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwYWdlTnVtYmVyIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYWNrVG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5iZWZvcmUocHJldkJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwYWdlTnVtYmVyIDwgdG90YWxQYWdlcykgeyAvL3Nob3cgbmV4dCBidXR0b25cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgbmV4dEJ0bi5jbGFzc0xpc3QuYWRkKFwiYnRuLW5leHRcIik7XHJcbiAgICAgICAgICAgICAgICBuZXh0QnRuLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiR28gdG8gbmV4dCBwYWdlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFja1RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQuYWZ0ZXIobmV4dEJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgY29uc3QgcG9zdFJlc3VsdHMgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUluZGljYXRvcnModHJ1ZSwgcmVzdWx0c0xvYWRlcik7XHJcblxyXG4gICAgICAgIGxldCBib2R5T2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBcInNlYXJjaFBocmFzZVwiOiBzZWFyY2hQaHJhc2UsXHJcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogZGVjb2RlVVJJQ29tcG9uZW50KGNhdGVnb3J5KSwgLy9uZWVkIHRvIGRlY29kZSBmb3IgQVBJIHBvc3RcclxuICAgICAgICAgICAgXCJwYWdpbmF0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGFnZU51bWJlclwiOiBwYWdlTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgXCJwYWdlU2l6ZVwiOiBwYWdlU2l6ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2F0ZWdvcnkgPT0gXCJcIiAmJiBzZWFyY2hQaHJhc2UgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgZmVhdHVyZWRBcnRpY2xlSGFuZGxlcihjYXRlZ29yeSwgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmVhdHVyZWRBcnRpY2xlSGFuZGxlcihjYXRlZ29yeSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYm9keVJlcXVlc3QgPSBKU09OLnN0cmluZ2lmeShib2R5T2JqZWN0KTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhib2R5UmVxdWVzdClcclxuXHJcbiAgICAgICAgZmV0Y2goYXBpRW5kcG9pbnRVcmwsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBtb2RlOiBcImNvcnNcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlZmVycmVyUG9saWN5OiBcIm5vLXJlZmVycmVyXCIsXHJcbiAgICAgICAgICAgIGJvZHk6IGJvZHlSZXF1ZXN0XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzKTtcclxuXHJcbiAgICAgICAgICAgcmVuZGVyUmVzdWx0cyhyZXMubmV3c1JlY29yZHMpO1xyXG5cclxuICAgICAgICAgICB0b3RhbFJlc3VsdHMgPSByZXMuc2VhcmNoUmVzdWx0SW5mby50b3RhbFJlc3VsdHM7XHJcbiAgICAgICAgICAgdG90YWxSZXN1bHRQYWdlcyA9IE1hdGguY2VpbCh0b3RhbFJlc3VsdHMgLyBwYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgY3JlYXRlUGFnaW5hdGlvbihwYWdpbmF0aW9uQ29udGFpbmVyLCB0b3RhbFJlc3VsdFBhZ2VzKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXJsSGFuZGxlciA9IChpc0NhdGVnb3J5KSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChpc0NhdGVnb3J5KSB7IC8vdXNlcyBjYXRlZ29yeSBidXR0b25zXHJcbiAgICAgICAgICAgIHVybFBhcmFtcy5zZXQoJ2NhdGVnb3J5JywgY2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBpZDogYGNhdGVnb3J5LSR7Y2F0ZWdvcnl9YCB9LCAnJywgYCR7bG9jYXRpb24ucGF0aG5hbWV9P2NhdGVnb3J5PSR7Y2F0ZWdvcnl9YCk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy91c2VzIHNlYXJjaCBmaWVsZFxyXG4gICAgICAgICAgICB1cmxQYXJhbXMuc2V0KCdzZWFyY2gnLCBzZWFyY2hQaHJhc2UpO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBpZDogJ3NlYXJjaC1zZWFyY2hQaHJhc2UnIH0sICcnLCBgJHtsb2NhdGlvbi5wYXRobmFtZX0/c2VhcmNoPSR7c2VhcmNoUGhyYXNlfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzZXRFbGVtZW50cyA9IChyZXNldEZvcm0pID0+IHtcclxuICAgICAgICBpZiAocmVzZXRGb3JtKSB7XHJcbiAgICAgICAgICAgIHNlYXJjaEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnRuU3RhdGVzKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL0V2ZW50IEhhbmRsZXJzXHJcblxyXG4gICAgZmlsdGVyQnRucy5mb3JFYWNoKChmaWx0ZXJCdG4pID0+IHtcclxuICAgICAgICBmaWx0ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgIHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5ID0gZmlsdGVyQnRuLnZhbHVlO1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuXHJcbiAgICAgICAgICAgIHVybEhhbmRsZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIGZpbHRlckRyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuICAgICAgICBzZWFyY2hQaHJhc2UgPSBcIlwiO1xyXG4gICAgICAgIGNhdGVnb3J5ID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcblxyXG4gICAgICAgIHVybEhhbmRsZXIodHJ1ZSk7XHJcbiAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIHNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG5cclxuICAgICAgICBjYXRlZ29yeSA9IFwiXCI7XHJcbiAgICAgICAgY29uc3QgdGV4dEZpZWxkID0gc2VhcmNoRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xyXG4gICAgICAgIHNlYXJjaFBocmFzZSA9IHRleHRGaWVsZC52YWx1ZTtcclxuICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuXHJcbiAgICAgICAgdXJsSGFuZGxlcihmYWxzZSk7XHJcbiAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgKCkgPT4ge1xyXG5cclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICBjb25zdCBwb3BVcmxDYXRQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG5cclxuICAgICAgICBpZiAocG9wVXJsQ2F0UGFyYW1zLmhhcyhcImNhdGVnb3J5XCIpKSB7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5ID0gcG9wVXJsQ2F0UGFyYW1zLmdldChcImNhdGVnb3J5XCIpO1xyXG4gICAgICAgICAgICBmZWF0dXJlZEFydGljbGVIYW5kbGVyKGNhdGVnb3J5LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2F0ZWdvcnkgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXNldEVsZW1lbnRzKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcG9wVXJsU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcclxuXHJcbiAgICAgICAgaWYgKHBvcFVybFNlYXJjaFBhcmFtcy5oYXMoXCJzZWFyY2hcIikpIHtcclxuICAgICAgICAgICAgc2VhcmNoUGhyYXNlID0gcG9wVXJsU2VhcmNoUGFyYW1zLmdldChcInNlYXJjaFwiKTtcclxuICAgICAgICAgICAgc2VhcmNoRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID0gc2VhcmNoUGhyYXNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBvbnBhZ2UgbG9hZFxyXG4gICAgaWYgKHVybFBhcmFtcy5oYXMoXCJzZWFyY2hcIikpIHtcclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICBjYXRlZ29yeSA9IFwiXCI7XHJcbiAgICAgICAgc2VhcmNoUGhyYXNlID0gdXJsUGFyYW1zLmdldChcInNlYXJjaFwiKTtcclxuICAgICAgICBzZWFyY2hGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUgPSBzZWFyY2hQaHJhc2U7XHJcbiAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgICAgIGNyZWF0ZVBhZ2luYXRpb24ocGFnaW5hdGlvbkNvbnRhaW5lciwgZmlsdGVyUmVzdWx0cy5kYXRhc2V0LmNhdHRvdGFsKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXJ0aWNsZUZpbHRlcnM7IiwgIlxyXG5jb25zdCBtdWx0aW1lZGlhRmlsdGVycyA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBmaWx0ZXJSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW11bHRpbWVkaWEtcmVzdWx0cycpO1xyXG4gICAgaWYgKCFmaWx0ZXJSZXN1bHRzKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZmlsdGVyQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1tdWx0aW1lZGlhLWZpbHRlcicpO1xyXG4gICAgY29uc3QgZmlsdGVyRHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbXVsdGltZWRpYS1kcm9wZG93bicpO1xyXG5cclxuICAgIGNvbnN0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVsdGltZWRpYS1zZWFyY2gnKTtcclxuICAgIGNvbnN0IHBhZ2luYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbXVsdGltZWRpYS1wYWdpbmF0aW9uJyk7XHJcbiAgICBjb25zdCByZXN1bHRzTG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXJlc3VsdHMtbG9hZGVyJyk7XHJcblxyXG4gICAgY29uc3QgZmVhdHVyZWRJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtZmVhdHVyZWRcIik7XHJcblxyXG4gICAgY29uc3QgYXBpRW5kcG9pbnRVcmwgPSBcIi9NdWx0aW1lZGlhXCI7XHJcbiAgICBsZXQgcGFnZU51bWJlciA9IDE7XHJcbiAgICBjb25zdCBwYWdlU2l6ZSA9IDE1O1xyXG5cclxuICAgIGxldCB0b3RhbFJlc3VsdHMgPSAwO1xyXG4gICAgbGV0IHRvdGFsUmVzdWx0UGFnZXMgPSAwO1xyXG5cclxuICAgIC8vVXJsc1xyXG5cclxuICAgIGNvbnN0IHdpbmRvd0xvYWRRdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvd0xvYWRRdWVyeVN0cmluZyk7XHJcblxyXG4gICAgbGV0IHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcblxyXG4gICAgaWYgKHVybFBhcmFtcy5oYXMoXCJzZWFyY2hcIikpIHtcclxuICAgICAgICBzZWFyY2hQaHJhc2UgPSB1cmxQYXJhbXMuZ2V0KFwic2VhcmNoXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0eXBlID0gXCJcIjtcclxuXHJcbiAgICBpZiAodXJsUGFyYW1zLmhhcyhcInR5cGVcIikpIHtcclxuICAgICAgICB0eXBlID0gdXJsUGFyYW1zLmdldChcInR5cGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLy9SZXN1bHRzXHJcblxyXG4gICAgY29uc3Qgc2Nyb2xsQmFja1RvcCA9ICgpID0+IHtcclxuICAgICAgICBmaWx0ZXJSZXN1bHRzLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIsIGJsb2NrOiBcInN0YXJ0XCIsIGlubGluZTogXCJuZWFyZXN0XCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaGFuZGxlSW5kaWNhdG9ycyA9IChzaG93LCB3YWl0TG9hZGVyRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlmIChzaG93ID09IHRydWUpIHtcclxuICAgICAgICAgICAgd2FpdExvYWRlckVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2FpdExvYWRlckVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qga2lsbFJlc3VsdHMgPSAoKSA9PiB7XHJcbiAgICAgICAgZmlsdGVyUmVzdWx0cy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ0blN0YXRlcyA9IChjbGVhckFsbCwgc2V0VG9DYXQpID0+IHtcclxuXHJcbiAgICAgICAgZmlsdGVyQnRucy5mb3JFYWNoKChmaWx0ZXJCdG4pID0+IHtcclxuICAgICAgICAgICAgaWYgKGZpbHRlckJ0bi52YWx1ZSA9PSBzZXRUb0NhdCAmJiBjbGVhckFsbCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyQnRuLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyRHJvcGRvd24udmFsdWUgPSBzZXRUb0NhdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlckJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGZpbHRlckRyb3Bkb3duLnZhbHVlID09IHNldFRvQ2F0KSB7XHJcbiAgICAgICAgICAgIGZpbHRlckRyb3Bkb3duLnZhbHVlID0gc2V0VG9DYXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmlsdGVyRHJvcGRvd24udmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmZWF0dXJlZEhhbmRsZXIgPSAoYWN0aXZlRmVhdHVyZSwgaGlkZUFsbCkgPT4ge1xyXG5cclxuICAgICAgICBmZWF0dXJlZEl0ZW1zLmZvckVhY2goKGZlYXR1cmVkSXRlbSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGhpZGVBbGwpIHtcclxuICAgICAgICAgICAgICAgIGZlYXR1cmVkSXRlbS5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmVhdHVyZXR5cGUgPSBmZWF0dXJlZEl0ZW0uZGF0YXNldC5mZWF0dXJlZHR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChmZWF0dXJldHlwZSA9PSBhY3RpdmVGZWF0dXJlICYmIGZlYXR1cmV0eXBlICE9PSBcImFsbFwiKSB8fCAoZmVhdHVyZXR5cGUgPT0gXCJhbGxcIiAmJiBhY3RpdmVGZWF0dXJlID09IFwiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZWRJdGVtLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlZEl0ZW0uaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUmVzdWx0cyA9IChyZXN1bHRzKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChzZWFyY2hQaHJhc2UgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgYnRuU3RhdGVzKHRydWUsIHR5cGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJ0blN0YXRlcyhmYWxzZSwgdHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7IFxyXG5cclxuICAgICAgICAgICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc2V0SW1hZ2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaXNQbGF5bGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudGh1bWJuYWlsT3ZlcnJpZGUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2UgPSByZXN1bHQudGh1bWJuYWlsT3ZlcnJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jaGlsZHJlblswXS50aHVtYm5haWxPdmVycmlkZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2UgPSByZXN1bHQuY2hpbGRyZW5bMF0udGh1bWJuYWlsT3ZlcnJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZSA9IGBodHRwczovL2kzLnl0aW1nLmNvbS92aS8ke3Jlc3VsdC5jaGlsZHJlblswXS55b3VUdWJlSWR9L21heHJlc2RlZmF1bHQuanBnYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2UgPSByZXN1bHQudGh1bWJuYWlsT3ZlcnJpZGUgIT09IFwiXCIgPyByZXN1bHQudGh1bWJuYWlsT3ZlcnJpZGUgOiBgaHR0cHM6Ly9pMy55dGltZy5jb20vdmkvJHtyZXN1bHQueW91VHViZUlkfS9tYXhyZXNkZWZhdWx0LmpwZ2A7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0Q2hpcCA9IHJlc3VsdC5pc1BsYXlsaXN0ID8gXCI8c3BhbiBjbGFzcz1cXFwiY2hpcCBjaGlwLS1uby1ob3ZlclxcXCI+UGxheWxpc3Q8L3NwYW4+XCIgOiBgPHNwYW4gY2xhc3M9XFxcImNoaXAgY2hpcC0tbm8taG92ZXIgYWxpZ24tc2VsZi1zdGFydFxcXCI+JHtyZXN1bHQudHlwZX08L3NwYW4+YDsvL25lZWQgdG8gY2hhbmdlIHRoaXMgcHJvcGVydHkgd2hlbiBwbGF5bGlzdCBpcyBhZGRlZFxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0Q1NTID0gcmVzdWx0LmlzUGxheWxpc3QgPyBcImNhcmQtbWVkaWEtLXBsYXlsaXN0XCIgOiBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpbHRlclJlc3VsdHMuaW5uZXJIVE1MICs9IChcclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtYmxvY2sgY29sLW1kLTYgY29sLWxnLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7cmVzdWx0LnVybH1cIiBjbGFzcz1cImNhcmQgY2FyZC1tZWRpYSAke3NldENTU30gcC00IGZsZXgtbWQtY29sdW1uIGFsaWduLWl0ZW1zLXN0YXJ0IHRleHQtZGVjb3JhdGlvbi1ub25lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmF0aW8gcmF0aW8tMTZ4OSBtYi0zIGNhcmQtbWVkaWFfX2ltZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzZXRJbWFnZX1cIiBsb2FkaW5nPVwibGF6eVwiIGNsYXNzPVwiaW1nLWZsdWlkXCIgd2lkdGg9XCI2NjBcIiBoZWlnaHQ9XCIzMzBcIiBhbHQ9XCIke3Jlc3VsdC50aXRsZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBmbGV4LXJvdyBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWJldHdlZW4gdy0xMDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGltZSBjbGFzcz1cImZzLXhzIGZ3LWJvbGRcIiBkYXRldGltZT1cIiR7cmVzdWx0LmRhdGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7cmVzdWx0LmRhdGVEaXNwbGF5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGltZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3NldENoaXB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImg2IG1iLTJcIj4ke3Jlc3VsdC50aXRsZX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJmcy1zbVwiPiR7cmVzdWx0LmRlc2NyaXB0aW9ufTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jaGlsZHJlbi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmNoaWxkcmVuLmZvckVhY2goKHJlc3VsdENoaWxkKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXRDaGlsZEltYWdlID0gcmVzdWx0Q2hpbGQudGh1bWJuYWlsT3ZlcnJpZGUgIT09IFwiXCIgPyByZXN1bHRDaGlsZC50aHVtYm5haWxPdmVycmlkZSA6IGBodHRwczovL2kzLnl0aW1nLmNvbS92aS8ke3Jlc3VsdENoaWxkLnlvdVR1YmVJZH0vbWF4cmVzZGVmYXVsdC5qcGdgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyUmVzdWx0cy5pbm5lckhUTUwgKz0gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtYmxvY2sgY29sLW1kLTYgY29sLWxnLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtyZXN1bHRDaGlsZC51cmx9XCIgY2xhc3M9XCJjYXJkIGNhcmQtbWVkaWEgcC00IGZsZXgtbWQtY29sdW1uIGFsaWduLWl0ZW1zLXN0YXJ0IHRleHQtZGVjb3JhdGlvbi1ub25lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYXRpbyByYXRpby0xNng5IG1iLTMgY2FyZC1tZWRpYV9faW1nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c2V0Q2hpbGRJbWFnZX1cIiBsb2FkaW5nPVwibGF6eVwiIGNsYXNzPVwiaW1nLWZsdWlkXCIgd2lkdGg9XCI2NjBcIiBoZWlnaHQ9XCIzMzBcIiBhbHQ9XCIke3Jlc3VsdENoaWxkLnRpdGxlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBmbGV4LXJvdyBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWJldHdlZW4gdy0xMDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aW1lIGNsYXNzPVwiZnMteHMgZnctYm9sZFwiIGRhdGV0aW1lPVwiJHtyZXN1bHRDaGlsZC5kYXRlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7cmVzdWx0Q2hpbGQuZGF0ZURpc3BsYXl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RpbWU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJoNiBtYi0yXCI+JHtyZXN1bHRDaGlsZC50aXRsZX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImZzLXNtXCI+JHtyZXN1bHRDaGlsZC5kZXNjcmlwdGlvbn08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmlsdGVyUmVzdWx0cy5pbm5lckhUTUwgPSAoYDxkaXYgY2xhc3M9XCJkLWJsb2NrIGNvbC1tZC0xMCBteC1hdXRvIGg1IHRleHQtY2VudGVyXCI+Tm8gcmVzdWx0cy4gVHJ5IGFnYWluLjwvZGl2PmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGFuZGxlSW5kaWNhdG9ycyhmYWxzZSwgcmVzdWx0c0xvYWRlcik7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25zdCBoYW5kbGVDbGVhclBhZ2luYXRpb24gPSAocGFnaW5hdGlvbkVsZW1lbnQpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHBhZ2luYXRpb25FbGVtZW50Lm5leHRFbGVtZW50U2libGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAocGFnaW5hdGlvbkVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLnRhZ05hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25FbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhZ2luYXRpb25FbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHBhZ2luYXRpb25FbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGFnTmFtZSA9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICB9ICBcclxuXHJcbiAgICBjb25zdCBjcmVhdGVQYWdpbmF0aW9uID0gKHBhZ2luYXRpb25FbGVtZW50LCByZXN1bHRQYWdlQ291bnQpID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IHBhcnNlSW50KHJlc3VsdFBhZ2VDb3VudCk7XHJcblxyXG4gICAgICAgIGhhbmRsZUNsZWFyUGFnaW5hdGlvbihwYWdpbmF0aW9uQ29udGFpbmVyKTsvL2NsZWFyIGZpcnN0XHJcblxyXG4gICAgICAgIC8vbnVtYmVyZWQgcGFnZSBidXR0b25zXHJcbiAgICAgICAgaWYgKHRvdGFsUGFnZXMgPiAxKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsUGFnZXM7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGBHbyB0byBwYWdlICR7aSArIDF9YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2VOdW1iZXIgPT0gKGkgKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vb25seSBzaG93cyBwYWdpbmF0aW9uIG51bWJlcnMgLSszIG9mIGN1cnJlbnQgZm9yIHJlc3VsdHMgbW9yZSB0aGFuIDcgcGFnZXNcclxuICAgICAgICAgICAgICAgIGlmICh0b3RhbFBhZ2VzID4gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoaSA8IHBhZ2VOdW1iZXIgJiYgaSA+IChwYWdlTnVtYmVyIC0gNSkpIHx8IChpID4gKHBhZ2VOdW1iZXIgLSAxKSAmJiBpIDwgKChwYWdlTnVtYmVyIC0gMSkgKyA0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcImQtaW5saW5lLWJsb2NrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGkudGV4dENvbnRlbnQgPSBpICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSBlLnRhcmdldC50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFja1RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL25leHQvcHJldiBidXR0b25zXHJcbiAgICAgICAgaWYgKHRvdGFsUGFnZXMgPiAxKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAocGFnZU51bWJlciA+IDEpIHsgLy9zaG93IHByZXZpb3VzIGJ1dHRvblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgICAgICBwcmV2QnRuLmNsYXNzTGlzdC5hZGQoXCJidG4tcHJldlwiKTtcclxuICAgICAgICAgICAgICAgIHByZXZCdG4uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJHbyB0byBwcmV2aW91cyBwYWdlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciAtPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFja1RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQuYmVmb3JlKHByZXZCdG4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocGFnZU51bWJlciA8IHRvdGFsUGFnZXMpIHsgLy9zaG93IG5leHQgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgICAgIG5leHRCdG4uY2xhc3NMaXN0LmFkZChcImJ0bi1uZXh0XCIpO1xyXG4gICAgICAgICAgICAgICAgbmV4dEJ0bi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIkdvIHRvIG5leHQgcGFnZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXIgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJhY2tUb3AoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25FbGVtZW50LmFmdGVyKG5leHRCdG4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIGNvbnN0IHBvc3RSZXN1bHRzID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBoYW5kbGVJbmRpY2F0b3JzKHRydWUsIHJlc3VsdHNMb2FkZXIpO1xyXG5cclxuICAgICAgICBsZXQgYm9keU9iamVjdCA9IHtcclxuICAgICAgICAgICAgXCJzZWFyY2hQaHJhc2VcIjogc2VhcmNoUGhyYXNlLFxyXG4gICAgICAgICAgICBcIm1lZGlhVHlwZVwiOiBkZWNvZGVVUklDb21wb25lbnQodHlwZSksIC8vbmVlZCB0byBkZWNvZGUgZm9yIEFQSSBwb3N0XHJcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCJcIixcclxuICAgICAgICAgICAgXCJwYWdpbmF0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGFnZU51bWJlclwiOiBwYWdlTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgXCJwYWdlU2l6ZVwiOiBwYWdlU2l6ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09IFwiXCIgJiYgc2VhcmNoUGhyYXNlICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVkSGFuZGxlcih0eXBlLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmZWF0dXJlZEhhbmRsZXIodHlwZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYm9keVJlcXVlc3QgPSBKU09OLnN0cmluZ2lmeShib2R5T2JqZWN0KTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhib2R5UmVxdWVzdClcclxuXHJcbiAgICAgICAgZmV0Y2goYXBpRW5kcG9pbnRVcmwsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBtb2RlOiBcImNvcnNcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlZmVycmVyUG9saWN5OiBcIm5vLXJlZmVycmVyXCIsXHJcbiAgICAgICAgICAgIGJvZHk6IGJvZHlSZXF1ZXN0XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlcy5tdWx0aW1lZGlhSXRlbXMpO1xyXG5cclxuICAgICAgICAgICAgcmVuZGVyUmVzdWx0cyhyZXMubXVsdGltZWRpYUl0ZW1zKTtcclxuXHJcbiAgICAgICAgICAgdG90YWxSZXN1bHRzID0gcmVzLnNlYXJjaFJlc3VsdEluZm8udG90YWxSZXN1bHRzO1xyXG4gICAgICAgICAgIHRvdGFsUmVzdWx0UGFnZXMgPSBNYXRoLmNlaWwodG90YWxSZXN1bHRzIC8gcGFnZVNpemUpO1xyXG4gICAgICAgICAgIGNyZWF0ZVBhZ2luYXRpb24ocGFnaW5hdGlvbkNvbnRhaW5lciwgdG90YWxSZXN1bHRQYWdlcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXJsSGFuZGxlciA9IChpc3R5cGUpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKGlzdHlwZSkgeyAvL3VzZXMgdHlwZSBidXR0b25zXHJcbiAgICAgICAgICAgIHVybFBhcmFtcy5zZXQoJ3R5cGUnLCB0eXBlKTtcclxuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHsgaWQ6IGB0eXBlLSR7dHlwZX1gIH0sICcnLCBgJHtsb2NhdGlvbi5wYXRobmFtZX0/dHlwZT0ke3R5cGV9YCk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy91c2VzIHNlYXJjaCBmaWVsZFxyXG4gICAgICAgICAgICB1cmxQYXJhbXMuc2V0KCdzZWFyY2gnLCBzZWFyY2hQaHJhc2UpO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBpZDogJ3NlYXJjaC1zZWFyY2hQaHJhc2UnIH0sICcnLCBgJHtsb2NhdGlvbi5wYXRobmFtZX0/c2VhcmNoPSR7c2VhcmNoUGhyYXNlfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzZXRFbGVtZW50cyA9IChyZXNldEZvcm0pID0+IHtcclxuICAgICAgICBpZiAocmVzZXRGb3JtKSB7XHJcbiAgICAgICAgICAgIHNlYXJjaEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnRuU3RhdGVzKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL0V2ZW50IEhhbmRsZXJzXHJcblxyXG4gICAgZmlsdGVyQnRucy5mb3JFYWNoKChmaWx0ZXJCdG4pID0+IHtcclxuICAgICAgICBmaWx0ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgIHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHR5cGUgPSBmaWx0ZXJCdG4udmFsdWU7XHJcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICAgICAgdXJsSGFuZGxlcih0cnVlKTtcclxuICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgZmlsdGVyRHJvcGRvd24uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgcmVzZXRFbGVtZW50cyh0cnVlKTtcclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgIHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcbiAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcblxyXG4gICAgICAgIHR5cGUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICB1cmxIYW5kbGVyKHRydWUpO1xyXG4gICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcblxyXG4gICAgfSlcclxuXHJcbiAgICBzZWFyY2hGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgdHlwZSA9IFwiXCI7XHJcbiAgICAgICAgY29uc3QgdGV4dEZpZWxkID0gc2VhcmNoRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xyXG4gICAgICAgIHNlYXJjaFBocmFzZSA9IHRleHRGaWVsZC52YWx1ZTtcclxuICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuXHJcbiAgICAgICAgdXJsSGFuZGxlcihmYWxzZSk7XHJcbiAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgKCkgPT4ge1xyXG5cclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICBjb25zdCBwb3BVcmxDYXRQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG5cclxuICAgICAgICBpZiAocG9wVXJsQ2F0UGFyYW1zLmhhcyhcInR5cGVcIikpIHtcclxuICAgICAgICAgICAgdHlwZSA9IHBvcFVybENhdFBhcmFtcy5nZXQoXCJ0eXBlXCIpO1xyXG4gICAgICAgICAgICBmZWF0dXJlZEhhbmRsZXIodHlwZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXNldEVsZW1lbnRzKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXNldEVsZW1lbnRzKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcG9wVXJsU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcclxuXHJcbiAgICAgICAgaWYgKHBvcFVybFNlYXJjaFBhcmFtcy5oYXMoXCJzZWFyY2hcIikpIHtcclxuICAgICAgICAgICAgc2VhcmNoUGhyYXNlID0gcG9wVXJsU2VhcmNoUGFyYW1zLmdldChcInNlYXJjaFwiKTtcclxuICAgICAgICAgICAgc2VhcmNoRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID0gc2VhcmNoUGhyYXNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBvbnBhZ2UgbG9hZFxyXG4gICAgaWYgKHVybFBhcmFtcy5oYXMoXCJzZWFyY2hcIikpIHtcclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICB0eXBlID0gXCJcIjtcclxuICAgICAgICBzZWFyY2hQaHJhc2UgPSB1cmxQYXJhbXMuZ2V0KFwic2VhcmNoXCIpO1xyXG4gICAgICAgIHNlYXJjaEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9IHNlYXJjaFBocmFzZTtcclxuICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcbiAgICAgICAgY3JlYXRlUGFnaW5hdGlvbihwYWdpbmF0aW9uQ29udGFpbmVyLCBmaWx0ZXJSZXN1bHRzLmRhdGFzZXQuY2F0dG90YWwpO1xyXG4gICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbXVsdGltZWRpYUZpbHRlcnM7IiwgIlx1RkVGRi8vaHR0cHM6Ly9naXRodWIuY29tL3ZrdXJrby9jYWxlbmRhciBcclxuXHJcbmNvbnN0IGNhbGVuZGFyID0gKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGNhbGVuZGFyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlY1wiKTtcclxuICAgIGNvbnN0IGNhbGVuZGFyRmlsdGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtY2FsZW5kYXItZmlsdGVyc1wiKTtcclxuICAgIGNvbnN0IGFwaUVuZHBvaW50VXJsID0gXCIvR2V0UHJvZHVjdHNcIjtcclxuICAgIGNvbnN0IHN0eWxlU2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWZpbHRlci1zdHlsZXMnKTtcclxuXHJcbiAgICBsZXQgYm9keU9iamVjdCA9IHtcclxuICAgICAgICBcInByb2R1Y3RUeXBlXCI6IFwiRXZlbnRzXCIsXHJcbiAgICAgICAgXCJjYXRlZ29yeVwiOiBcIlwiLFxyXG4gICAgICAgIFwic3ViQ2F0ZWdvcnlcIjogXCJcIixcclxuICAgICAgICBcInRheG9ub215XCI6IFwiXCIsXHJcbiAgICAgICAgXCJwYWdpbmF0aW9uXCI6IHtcclxuICAgICAgICAgICAgXCJwYWdlTnVtYmVyXCI6IDEsXHJcbiAgICAgICAgICAgIFwicGFnZVNpemVcIjogMTAwXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgXHJcbiAgICBjb25zdCBib2R5UmVxdWVzdCA9IEpTT04uc3RyaW5naWZ5KGJvZHlPYmplY3QpO1xyXG5cclxuICAgIGNvbnN0IGdldFZhbHVlID0gKGNoZWNrQm94ZXMpID0+IHtcclxuXHJcbiAgICAgICAgc3R5bGVTZXQuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgY2hlY2tCb3hlcy5mb3JFYWNoKChjaGVja0JveCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWNoZWNrQm94LmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlU2V0LmlubmVySFRNTCArPSAoYFtkYXRhLXJlc291cmNlPVwiJHtjaGVja0JveC52YWx1ZX1cIl0geyBvcGFjaXR5OiAwIH1gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlU2V0LmlubmVySFRNTCArPSAoYFtkYXRhLXJlc291cmNlPVwiJHtjaGVja0JveC52YWx1ZX1cIl0geyBvcGFjaXR5OiAxIH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5ldyBFdmVudENhbGVuZGFyKGNhbGVuZGFyQ29udGFpbmVyLCB7XHJcbiAgICAgICAgdmlldzogJ2RheUdyaWRNb250aCcsXHJcbiAgICAgICAgaGVhZGVyVG9vbGJhcjoge1xyXG4gICAgICAgICAgICBzdGFydDogJ3ByZXYsbmV4dCB0b2RheScsXHJcbiAgICAgICAgICAgIGNlbnRlcjogJ3RpdGxlJyxcclxuICAgICAgICAgICAgZW5kOiAnZGF5R3JpZE1vbnRoLHRpbWVHcmlkV2Vlayx0aW1lR3JpZERheSxsaXN0V2VlayByZXNvdXJjZVRpbWVHcmlkV2VlaydcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1dHRvblRleHQ6IGZ1bmN0aW9uICh0ZXh0cykge1xyXG4gICAgICAgICAgICB0ZXh0cy5yZXNvdXJjZVRpbWVHcmlkV2VlayA9ICdyZXNvdXJjZXMnO1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dHM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNvdXJjZXM6IHdpbmRvdy5zZXRSZXNvdXJjZXMsXHJcbiAgICAgICAgc2Nyb2xsVGltZTogJzA5OjAwOjAwJyxcclxuICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICB0aW1lR3JpZFdlZWs6IHsgcG9pbnRlcjogdHJ1ZSB9LFxyXG4gICAgICAgICAgICByZXNvdXJjZVRpbWVHcmlkV2VlazogeyBwb2ludGVyOiB0cnVlIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vd0luZGljYXRvcjogdHJ1ZSxcclxuICAgICAgICBldmVudENsYXNzTmFtZXM6IFsnd3JhLWV2ZW50J10sXHJcbiAgICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIGV2ZW50U3RhcnRFZGl0YWJsZTogZmFsc2UsIC8vIG5lZWQgdG8gZGlzYWJsZSBldmVudCBkcm9wIG4nZHJhZ1xyXG4gICAgICAgIGV2ZW50RHVyYXRpb25FZGl0YWJsZTogZmFsc2UsIC8vIG5lZWQgdG8gZGlzYWJsZSBldmVudCBkcm9wIG4nZHJhZ1xyXG4gICAgICAgIGV2ZW50U291cmNlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBldmVudHM6IGZ1bmN0aW9uIChmZXRjaEluZm8sIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7IFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmZXRjaChhcGlFbmRwb2ludFVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k6IFwibm8tcmVmZXJyZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IGJvZHlSZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2socmVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGV2ZW50RGlkTW91bnQ6IGZ1bmN0aW9uIChpbmZvKSB7IC8vYWRkaW5nIGRhdGEgaWQgYXR0cmlidXRlIHRvIGVhY2ggZXZlbnRcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdldEV2ZW50c1Jlc291cmNlSWQgPSBpbmZvLmV2ZW50LnJlc291cmNlSWRzWzBdICE9PSB1bmRlZmluZWQgPyBpbmZvLmV2ZW50LnJlc291cmNlSWRzWzBdLnRvU3RyaW5nKCkgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpbmZvLmVsLmdldEF0dHJpYnV0ZShcImRhdGEtcmVzb3VyY2VcIikgJiYgZ2V0RXZlbnRzUmVzb3VyY2VJZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaW5mby5lbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXJlc291cmNlXCIsIGdldEV2ZW50c1Jlc291cmNlSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2FkaW5nOiBmdW5jdGlvbiAoaXNMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coaXNMb2FkaW5nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0xvYWRpbmcgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZGluZyBkb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9yZW1vdmUgaWYgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICBjYWxlbmRhckZpbHRlcnMuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2J1aWxkIG91dCBcclxuICAgICAgICAgICAgICAgIHNldFJlc291cmNlcy5mb3JFYWNoKChyZXNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyRmlsdGVycy5pbm5lckhUTUwgKz0gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1maWx0ZXIgZC1mbGV4IGZsZXgtcm93IGdhcC0zIHJvdW5kZWQgcC0xIHBzLTIgbWItMyB0ZXh0LXdoaXRlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiR7cmVzb3VyY2UuZXZlbnRCYWNrZ3JvdW5kQ29sb3J9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCIke3Jlc291cmNlLmlkfVwiIG5hbWU9XCJyZXNvdXJjZVwiIGNsYXNzPVwianMtY2FsZW5kYXItZmlsdGVyIGZvcm0tY2hlY2staW5wdXRcIiBjaGVja2VkIHZhbHVlPVwiJHtyZXNvdXJjZS5pZH1cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1jaGVjay1sYWJlbFwiIGZvcj1cIiR7cmVzb3VyY2UuaWR9XCI+JHtyZXNvdXJjZS50aXRsZX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2F0dGFjaCBldmVudCBoYW5kbGVyc1xyXG4gICAgICAgICAgICAgICAgY2FsZW5kYXJGaWx0ZXJzLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRWYWx1ZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtY2FsZW5kYXItZmlsdGVyJykpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBldmVudENsaWNrOiBmdW5jdGlvbiAoaW5mbykgeyAvLyBoYW5kbGVzIG9wZW5pbmcgZXZlbnQgaW50byBuZXcgdGFiXHJcbiAgICAgICAgICAgIGlmIChpbmZvLmV2ZW50LmV4dGVuZGVkUHJvcHMgIT09IFwiXCIgfHwgaW5mby5ldmVudC5leHRlbmRlZFByb3BzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihpbmZvLmV2ZW50LmV4dGVuZGVkUHJvcHMsICdfYmxhbmsnKS5mb2N1cygpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNhbGVuZGFyO1xyXG5cclxuXHJcblxyXG4iLCAiY29uc3QgcXVhbnRpdHlTZWxlY3RvciA9ICgpID0+IHtcclxuICAgIGNvbnN0IHF1YW50aXR5U2VsZWN0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXF1YW50aXR5LXNlbGVjdG9yJyk7XHJcblxyXG4gICAgaWYgKCFxdWFudGl0eVNlbGVjdG9ycy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICBxdWFudGl0eVNlbGVjdG9ycy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IHF1YW50aXR5SW5wdXQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5qcy1xdWFudGl0eS1zZWxlY3Rvci1pbnB1dCcpO1xyXG4gICAgICAgIGNvbnN0IGluY3JlbWVudEJ0biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmpzLXF1YW50aXR5LXNlbGVjdG9yLWluY3JlbWVudCcpO1xyXG4gICAgICAgIGNvbnN0IGRlY3JlbWVudEJ0biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmpzLXF1YW50aXR5LXNlbGVjdG9yLWRlY3JlbWVudCcpO1xyXG5cclxuICAgICAgICBpbmNyZW1lbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHF1YW50aXR5SW5wdXQudmFsdWUrKztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVjcmVtZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocXVhbnRpdHlJbnB1dC52YWx1ZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHF1YW50aXR5SW5wdXQudmFsdWUtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHF1YW50aXR5U2VsZWN0b3I7IiwgImNvbnN0IGNoZWNrb3V0ID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc3RhdGVEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jaGVja291dC1zdGF0ZScpO1xyXG4gICAgY29uc3QgY291bnR5RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY2hlY2tvdXQtY291bnR5Jyk7XHJcbiAgICBcclxuICAgIGlmIChzdGF0ZURyb3Bkb3duKSB7XHJcbiAgICAgICAgc3RhdGVEcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUgPT0gJ1dJJykge1xyXG4gICAgICAgICAgICAgICAgY291bnR5RmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudHlGaWVsZC5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG5cclxuICAgIGNvbnN0IGJpbGxpbmdBZGRyZXNzUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYWx0LWJpbGxpbmctYWRkcmVzcycpO1xyXG4gICAgY29uc3QgYmlsbGluZ0FkZHJlc3NGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYWx0LWJpbGxpbmctYWRkcmVzcy1maWVsZHMnKTtcclxuXHJcbiAgICBpZiAoYmlsbGluZ0FkZHJlc3NSYWRpbykge1xyXG4gICAgICAgIGJpbGxpbmdBZGRyZXNzUmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGJpbGxpbmdBZGRyZXNzUmFkaW8uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgYmlsbGluZ0FkZHJlc3NGaWVsZHMuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBiaWxsaW5nQWRkcmVzc0ZpZWxkcy5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjaGVja291dDsiLCAiY29uc3QgcHJvZHVjdHMgPSAoKSA9PiB7XHJcblxyXG4gICAgLy9ET00gcHJlc2VudGF0aW9uIGVsZW1lbnRzXHJcbiAgICBjb25zdCBwcm9kdWN0UmVzdWx0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wcm9kdWN0LWNvbGxlY3Rpb24nKTtcclxuICAgIGNvbnN0IGNvbGxlY3Rpb25UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb2xsZWN0aW9uLXRpdGxlJyk7XHJcbiAgICBjb25zdCBsaXN0aW5nc1RpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWxpc3RpbmdzLXRpdGxlJyk7XHJcbiAgICBjb25zdCBjdXJyZW50QnJlYWRjcnVtYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1icmVhZGNydW1iLWN1cnJlbnQnKTtcclxuICAgIGNvbnN0IHJlc3VsdHNMb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcmVzdWx0cy1sb2FkZXInKTtcclxuXHJcblxyXG4gICAgLy9ET00gZXZlbnQgZWxlbWVudHNcclxuICAgIGNvbnN0IHByb2R1Y3RDYXRlZ29yeURyb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNvbGxlY3Rpb24tY2F0ZWdvcnktZmlsdGVyJyk7XHJcbiAgICBjb25zdCBwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb2xsZWN0aW9uLXN1YmNhdGVnb3J5LWZpbHRlcicpO1xyXG4gICAgY29uc3QgcHJvZHVjdFN1YkNhdGVnb3J5Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNvbGxlY3Rpb24tc3ViY2F0ZWdvcnktY29udGFpbmVyJyk7XHJcblxyXG4gICAgLy9TdGF0aWMgdmFyc1xyXG4gICAgY29uc3QgYXBpRW5kcG9pbnRVcmwgPSBcIi9HZXRQcm9kdWN0c1wiO1xyXG4gICAgbGV0IHBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgY29uc3QgcGFnZVNpemUgPSAxMDA7XHJcbiAgICBsZXQgc3ViY2F0ZWdvcnlBcnJheSA9IFtcIkFsbFwiXTtcclxuXHJcbiAgICAvL1VybHNcclxuXHJcbiAgICBjb25zdCB3aW5kb3dMb2FkUXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xyXG4gICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3dMb2FkUXVlcnlTdHJpbmcpO1xyXG5cclxuICAgIGxldCB0eXBlID0gXCJcIjtcclxuXHJcbiAgICBpZiAodXJsUGFyYW1zLmhhcyhcInR5cGVcIikpIHtcclxuICAgICAgICB0eXBlID0gdXJsUGFyYW1zLmdldChcInR5cGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHN1YmNhdGVnb3J5ID0gXCJcIjsgXHJcblxyXG4gICAgaWYgKHVybFBhcmFtcy5oYXMoXCJzdWJjYXRlZ29yeVwiKSkge1xyXG4gICAgICAgIHN1YmNhdGVnb3J5ID0gdXJsUGFyYW1zLmdldChcInN1YmNhdGVnb3J5XCIpO1xyXG4gICAgfVxyXG4gICAgXHJcbiAgICBsZXQgY2F0ZWdvcnkgPSBcIlwiO1xyXG5cclxuICAgIGlmICh1cmxQYXJhbXMuaGFzKFwiY2F0ZWdvcnlcIikpIHtcclxuICAgICAgICBjYXRlZ29yeSA9IHVybFBhcmFtcy5nZXQoXCJjYXRlZ29yeVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1Jlc3VsdHNcclxuXHJcbiAgICBjb25zdCBoYW5kbGVJbmRpY2F0b3JzID0gKHNob3csIHdhaXRMb2FkZXJFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHNob3cgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB3YWl0TG9hZGVyRWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3YWl0TG9hZGVyRWxlbWVudC5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJSZXN1bHRzID0gKHJlc3VsdHMpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzdWx0KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL0hvdyB3ZSBkZXRlcm1pbmUgYnV0dG9uIGRpc3BsYXkgdGV4dD9cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNldENUQSA9IHJlc3VsdC5wcm9kdWN0VHlwZSA9PSBcIlByb2R1Y3RzXCIgPyBgPGEgaHJlZj1cIiR7cmVzdWx0LnVybH1cIiBpZD1cImFkZC10by1jYXJ0XCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc20gYm9yZGVyLTAgIGZsZXgtZ3Jvdy0xXCI+QWRkIFRvIENhcnQ8L2E+YCA6IGA8YSBocmVmPVwiJHtyZXN1bHQudXJsfVwiIGlkPVwidmlldy1wcm9kdWN0XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtIGZsZXgtZ3Jvdy0xXCI+UmVnaXN0ZXI8L2E+YDtcclxuXHJcbiAgICAgICAgICAgICAgICBwcm9kdWN0UmVzdWx0cy5pbm5lckhUTUwgKz0gKFxyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLW1kLTYgY29sLWxnLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhcmQtY2xhc3MgYmctbGlnaHQgcC00IGgtMTAwIGQtZmxleCBmbGV4LWNvbHVtbiBhbGlnbi1pdGVtcy1zdGFydFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJmcy14c1wiPkNsYXNzIDxzcGFuIGNsYXNzPVwiZnctYm9sZFwiPkNyZWRpdCBIb3VyczogWFhYWDwvc3Bhbj48L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImQtaW5saW5lLWJsb2NrIG1iLTQgcHgtMiBweS0xIGJnLXdoaXRlIGZ3LXNlbWlib2xkIGZzLXNtIHRleHQtdXBwZXJjYXNlXCI+JHtyZXN1bHQudGF4b25vbXl9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiZnMtbGcgdGV4dC1jYXBpdGFsaXplIGZ3LXNlbWlib2xkIG1iLTRcIj4ke3Jlc3VsdC50aXRsZX08L2gzPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWJsb2NrIG1iLTFcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImgzIGZ3LWJvbGRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtyZXN1bHQubWVtYmVyUHJpY2V9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnMtc21cIiBzdHlsZT1cImNvbG9yOiB2YXIoLS1icy1ncmF5LTMwKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAmbmJzcDttZW1iZXIgcHJpY2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtYmxvY2sgZnMtc20gbWItMFwiIHN0eWxlPVwiY29sb3I6IHZhcigtLWJzLWdyYXktMzApXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtyZXN1bHQucHJpY2V9ICZuYnNwO25vbi1tZW1iZXIgcHJpY2luZ1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBzZWxmLWFsaWduLWVuZCBmbGV4LWNvbHVtbiBmbGV4LW1kLXJvdyBhbGlnbi1pdGVtcy1jZW50ZXIgZ2FwLTMgbXQtYXV0byBwdC0zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtzZXRDVEF9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3ViQ2F0ZWdvcnkgIT0gXCJBbGxcIiAmJiAhc3ViY2F0ZWdvcnlBcnJheS5pbmNsdWRlcyhyZXN1bHQuc3ViQ2F0ZWdvcnksIHN1YmNhdGVnb3J5QXJyYXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnlBcnJheS5wdXNoKHJlc3VsdC5zdWJDYXRlZ29yeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9wdWxhdGVTdWJDYXRlZ29yaWVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvZHVjdFJlc3VsdHMuaW5uZXJIVE1MID0gKGA8ZGl2IGNsYXNzPVwiZC1ibG9jayBjb2wtbWQtMTAgbXgtYXV0byBoNSB0ZXh0LWNlbnRlclwiPk5vIHJlc3VsdHMuIFRyeSBhZ2Fpbi48L2Rpdj5gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGhhbmRsZUluZGljYXRvcnMoZmFsc2UsIHJlc3VsdHNMb2FkZXIpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHBvcHVsYXRlU3ViQ2F0ZWdvcmllcyA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgcHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24uaW5uZXJIVE1MID0gXCJcIjsvL2NsZWFyIDxvcHRpb24+IHRhZ3NcclxuXHJcbiAgICAgICAgaWYgKHN1YmNhdGVnb3J5QXJyYXkubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICBwcm9kdWN0U3ViQ2F0ZWdvcnlDb250YWluZXIucmVtb3ZlQXR0cmlidXRlKFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBzdWJjYXRlZ29yeUFycmF5LmZvckVhY2goKHN1YkNhdE9wdGlvbikgPT4ge1xyXG5cclxuICAgICAgICAgICAgY29uc3QgY2hlY2tJZkFjdGl2ZSA9IHN1YkNhdE9wdGlvbiA9PSBzdWJjYXRlZ29yeSA/IFwic2VsZWN0ZWRcIiA6IFwiXCI7XHJcblxyXG4gICAgICAgICAgICBwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93bi5pbm5lckhUTUwgKz0gKFxyXG4gICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgPG9wdGlvbiAke2NoZWNrSWZBY3RpdmV9IHZhbHVlPVwiJHtzdWJDYXRPcHRpb259XCI+JHtzdWJDYXRPcHRpb259PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcG9zdFJlc3VsdHMgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUluZGljYXRvcnModHJ1ZSwgcmVzdWx0c0xvYWRlcik7XHJcbiAgICAgICAgdXBkYXRlRG9tRWxlbWVudHMoY2F0ZWdvcnkpO1xyXG5cclxuICAgICAgICBsZXQgYm9keU9iamVjdCA9IHtcclxuICAgICAgICAgICAgXCJwcm9kdWN0VHlwZVwiOiBkZWNvZGVVUklDb21wb25lbnQodHlwZSksIC8vRXZlbnRzLCBQcm9kdWN0cywgQ291cnNlc1xyXG4gICAgICAgICAgICBcImNhdGVnb3J5XCI6IGRlY29kZVVSSUNvbXBvbmVudChjYXRlZ29yeSksIC8vUHJvZmVzc2lvbmFsIERldmVsb3BtZW50LCBQdWJsaWNhdGlvbnMsIENvbmZlcmVuY2VzL0NvbnZlbnRpb25zLCBldGMuXHJcbiAgICAgICAgICAgIFwic3ViQ2F0ZWdvcnlcIjogZGVjb2RlVVJJQ29tcG9uZW50KHN1YmNhdGVnb3J5ID09IFwiQWxsXCIgPyBcIlwiIDogc3ViY2F0ZWdvcnkpLC8vY2hpbGRyZW4gb2YgY2F0ZWdvcnlcclxuICAgICAgICAgICAgXCJ0YXhvbm9teVwiOiBcIlwiLC8vUmVmZXJlbmNlIE1hbnVhbHMsIEJvb2tzLCBWaXJ0dWFsLCBldGMuXHJcbiAgICAgICAgICAgIFwicGFnaW5hdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInBhZ2VOdW1iZXJcIjogcGFnZU51bWJlcixcclxuICAgICAgICAgICAgICAgIFwicGFnZVNpemVcIjogcGFnZVNpemVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGJvZHlSZXF1ZXN0ID0gSlNPTi5zdHJpbmdpZnkoYm9keU9iamVjdCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGJvZHlSZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgZmV0Y2goYXBpRW5kcG9pbnRVcmwsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBtb2RlOiBcImNvcnNcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZWZlcnJlclBvbGljeTogXCJuby1yZWZlcnJlclwiLFxyXG4gICAgICAgICAgICBib2R5OiBib2R5UmVxdWVzdFxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIHJlbmRlclJlc3VsdHMocmVzKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qga2lsbFJlc3VsdHMgPSAoKSA9PiB7XHJcbiAgICAgICAgcHJvZHVjdFJlc3VsdHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cmxIYW5kbGVyID0gKGlzQ2F0ZWdvcnksIGlzU3ViQ2F0ZWdvcnkpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKGlzQ2F0ZWdvcnkgJiYgIWlzU3ViQ2F0ZWdvcnkpIHtcclxuICAgICAgICAgICAgdXJsUGFyYW1zLnNldCgnY2F0ZWdvcnknLCBjYXRlZ29yeSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7IGlkOiBgJHt0eXBlfS1jYXRlZ29yeS0ke2NhdGVnb3J5fWAgfSwgJycsIGAke2xvY2F0aW9uLnBhdGhuYW1lfT90eXBlPSR7dHlwZX0mY2F0ZWdvcnk9JHtjYXRlZ29yeX1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0NhdGVnb3J5ICYmIGlzU3ViQ2F0ZWdvcnkpIHtcclxuICAgICAgICAgICAgdXJsUGFyYW1zLnNldCgnY2F0ZWdvcnknLCBjYXRlZ29yeSk7XHJcbiAgICAgICAgICAgIHVybFBhcmFtcy5zZXQoJ3N1YmNhdGVnb3J5Jywgc3ViY2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBpZDogYCR7dHlwZX0tY2F0ZWdvcnktJHtjYXRlZ29yeX1zdWJjYXRlZ29yeS0ke3N1YmNhdGVnb3J5fWAgfSwgJycsIGAke2xvY2F0aW9uLnBhdGhuYW1lfT90eXBlPSR7dHlwZX0mY2F0ZWdvcnk9JHtjYXRlZ29yeX0mc3ViY2F0ZWdvcnk9JHtzdWJjYXRlZ29yeX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cGRhdGVEb21FbGVtZW50cyA9ICh0aXRsZVRleHQpID0+IHtcclxuICAgICAgICBjb2xsZWN0aW9uVGl0bGUuaW5uZXJIVE1MID0gdGl0bGVUZXh0O1xyXG4gICAgICAgIGN1cnJlbnRCcmVhZGNydW1iLmlubmVySFRNTCA9IHRpdGxlVGV4dDtcclxuICAgICAgICBsaXN0aW5nc1RpdGxlLmlubmVySFRNTCA9IHRpdGxlVGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNldERyb3Bkb3duID0gKGRyb3Bkb3duRWxlbWVudCwgc2V0VmFsdWUpID0+IHtcclxuICAgICAgICBkcm9wZG93bkVsZW1lbnQudmFsdWUgPSBzZXRWYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9FdmVudCBIYW5kbGVyc1xyXG4gICAgaWYgKHByb2R1Y3RDYXRlZ29yeURyb3Bkb3duKSB7XHJcblxyXG4gICAgICAgIHByb2R1Y3RDYXRlZ29yeURyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgICAgIGNhdGVnb3J5ID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG4gICAgICAgICAgICAvL2NsZWFyaW5nIHN1YmNhdGVnb3J5IGRyb3Bkb3duXHJcbiAgICAgICAgICAgIHN1YmNhdGVnb3J5ID0gXCJcIjtcclxuICAgICAgICAgICAgc3ViY2F0ZWdvcnlBcnJheSA9IFtcIkFsbFwiXTtcclxuICAgICAgICAgICAgcHJvZHVjdFN1YkNhdGVnb3J5Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgcHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24uaW5uZXJIVE1MID0gXCJcIjsvL2NsZWFyIDxvcHRpb24+IHRhZ3NcclxuXHJcbiAgICAgICAgICAgIGlmIChwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93bikge1xyXG4gICAgICAgICAgICAgICAgcmVzZXREcm9wZG93bihwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93biwgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHVybEhhbmRsZXIodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93bikge1xyXG5cclxuICAgICAgICBwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVEb21FbGVtZW50cyhjYXRlZ29yeSk7XHJcbiAgICAgICAgICAgIHN1YmNhdGVnb3J5ID0gZS50YXJnZXQudmFsdWU7O1xyXG5cclxuICAgICAgICAgICAgdXJsSGFuZGxlcih0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsICgpID0+IHtcclxuXHJcbiAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgY29uc3QgcG9wVXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcclxuXHJcbiAgICAgICAgaWYgKHBvcFVybFBhcmFtcy5oYXMoXCJjYXRlZ29yeVwiKSAmJiAhcG9wVXJsUGFyYW1zLmhhcyhcInN1YmNhdGVnb3J5XCIpKSB7XHJcblxyXG4gICAgICAgICAgICBjYXRlZ29yeSA9IHBvcFVybFBhcmFtcy5nZXQoXCJjYXRlZ29yeVwiKTtcclxuICAgICAgICAgICAgcmVzZXREcm9wZG93bihwcm9kdWN0Q2F0ZWdvcnlEcm9wZG93biwgY2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICByZXNldERyb3Bkb3duKHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLCBcIkFsbFwiKTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAocG9wVXJsUGFyYW1zLmhhcyhcImNhdGVnb3J5XCIpICYmIHBvcFVybFBhcmFtcy5oYXMoXCJzdWJjYXRlZ29yeVwiKSkge1xyXG5cclxuICAgICAgICAgICAgY2F0ZWdvcnkgPSBwb3BVcmxQYXJhbXMuZ2V0KFwiY2F0ZWdvcnlcIik7XHJcbiAgICAgICAgICAgIHN1YmNhdGVnb3J5ID0gcG9wVXJsUGFyYW1zLmdldChcInN1YmNhdGVnb3J5XCIpO1xyXG4gICAgICAgICAgICByZXNldERyb3Bkb3duKHByb2R1Y3RDYXRlZ29yeURyb3Bkb3duLCBjYXRlZ29yeSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24pIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0RHJvcGRvd24ocHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24sIHN1YmNhdGVnb3J5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYXRlZ29yeSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHN1YmNhdGVnb3J5ID0gXCJcIjtcclxuICAgICAgICAgICAgcmVzZXREcm9wZG93bihwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93biwgXCJBbGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9QYWdlIExvYWRcclxuXHJcbiAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHByb2R1Y3RzOyIsICJjb25zdCBjb3Vyc2VTZWFyY2ggPSAoKSA9PiB7XHJcblxyXG4gICAgLy9ET00gcHJlc2VudGF0aW9uIGVsZW1lbnRzXHJcbiAgICBjb25zdCByZXN1bHRzTG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXJlc3VsdHMtbG9hZGVyLWNvdXJzZXMnKTtcclxuICAgIGNvbnN0IGNvdXJzZVNlYXJjaEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY291cnNlLXNlYXJjaCcpO1xyXG5cclxuICAgIC8vRE9NIGV2ZW50IGVsZW1lbnRzXHJcbiAgICBjb25zdCBwcm9kdWN0Q2F0ZWdvcnlEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb3Vyc2VzLWNhdGVnb3J5LWZpbHRlcicpO1xyXG4gICAgY29uc3QgcHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY291cnNlcy1zdWJjYXRlZ29yeS1maWx0ZXInKTtcclxuICAgIGNvbnN0IHByb2R1Y3RTdWJDYXRlZ29yeUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb3Vyc2VzLXN1YmNhdGVnb3J5LWNvbnRhaW5lcicpO1xyXG5cclxuICAgIC8vU3RhdGljIHZhcnNcclxuICAgIGNvbnN0IGFjdGlvbkluaXRpYWwgPSBjb3Vyc2VTZWFyY2hGb3JtLmdldEF0dHJpYnV0ZShcImFjdGlvblwiKTtcclxuICAgIGNvbnN0IGFwaUVuZHBvaW50VXJsID0gXCIvR2V0UHJvZHVjdHNcIjtcclxuICAgIGxldCBwYWdlTnVtYmVyID0gMTtcclxuICAgIGNvbnN0IHBhZ2VTaXplID0gMTAwO1xyXG4gICAgbGV0IHN1YmNhdGVnb3J5QXJyYXkgPSBbXCJBbGxcIl07XHJcblxyXG4gICAgbGV0IGNhdGVnb3J5ID0gXCJcIjtcclxuICAgIGxldCBzdWJjYXRlZ29yeSA9IFwiXCI7IFxyXG5cclxuICAgIC8vUmVzdWx0c1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUluZGljYXRvcnMgPSAoc2hvdywgd2FpdExvYWRlckVsZW1lbnQpID0+IHtcclxuICAgICAgICBpZiAoc2hvdyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHdhaXRMb2FkZXJFbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdhaXRMb2FkZXJFbGVtZW50LmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlclJlc3VsdHMgPSAocmVzdWx0cykgPT4ge1xyXG5cclxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWJDYXRlZ29yeSAhPSBcIkFsbFwiICYmICFzdWJjYXRlZ29yeUFycmF5LmluY2x1ZGVzKHJlc3VsdC5zdWJDYXRlZ29yeSwgc3ViY2F0ZWdvcnlBcnJheSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeUFycmF5LnB1c2gocmVzdWx0LnN1YkNhdGVnb3J5KTtcclxuICAgICAgICAgICAgICAgICAgICBwb3B1bGF0ZVN1YkNhdGVnb3JpZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoYW5kbGVJbmRpY2F0b3JzKGZhbHNlLCByZXN1bHRzTG9hZGVyKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwb3B1bGF0ZVN1YkNhdGVnb3JpZXMgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLmlubmVySFRNTCA9IFwiXCI7Ly9jbGVhciA8b3B0aW9uPiB0YWdzXHJcblxyXG4gICAgICAgIGlmIChzdWJjYXRlZ29yeUFycmF5Lmxlbmd0aCA+IDEgJiYgY2F0ZWdvcnkgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgcHJvZHVjdFN1YkNhdGVnb3J5Q29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9kdWN0U3ViQ2F0ZWdvcnlDb250YWluZXIuc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3ViY2F0ZWdvcnlBcnJheS5mb3JFYWNoKChzdWJDYXRPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgcHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24uaW5uZXJIVE1MICs9IChcclxuICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIke3N1YkNhdE9wdGlvbn1cIj4ke3N1YkNhdE9wdGlvbn08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwb3N0UmVzdWx0cyA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgaGFuZGxlSW5kaWNhdG9ycyh0cnVlLCByZXN1bHRzTG9hZGVyKTtcclxuXHJcbiAgICAgICAgbGV0IGJvZHlPYmplY3QgPSB7XHJcbiAgICAgICAgICAgIFwicHJvZHVjdFR5cGVcIjogXCJDb3Vyc2VzXCIsIC8vRXZlbnRzLCBQcm9kdWN0cywgQ291cnNlc1xyXG4gICAgICAgICAgICBcImNhdGVnb3J5XCI6IGNhdGVnb3J5LCAvL1Byb2Zlc3Npb25hbCBEZXZlbG9wbWVudCwgUHVibGljYXRpb25zLCBDb25mZXJlbmNlcy9Db252ZW50aW9ucywgZXRjLlxyXG4gICAgICAgICAgICBcInN1YkNhdGVnb3J5XCI6IHN1YmNhdGVnb3J5ID09IFwiQWxsXCIgPyBcIlwiIDogc3ViY2F0ZWdvcnksLy9jaGlsZHJlbiBvZiBjYXRlZ29yeVxyXG4gICAgICAgICAgICBcInRheG9ub215XCI6IFwiXCIsLy9SZWZlcmVuY2UgTWFudWFscywgQm9va3MsIFZpcnR1YWwsIGV0Yy5cclxuICAgICAgICAgICAgXCJwYWdpbmF0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGFnZU51bWJlclwiOiBwYWdlTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgXCJwYWdlU2l6ZVwiOiBwYWdlU2l6ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgYm9keVJlcXVlc3QgPSBKU09OLnN0cmluZ2lmeShib2R5T2JqZWN0KTtcclxuXHJcbiAgICAgICAgZmV0Y2goYXBpRW5kcG9pbnRVcmwsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBtb2RlOiBcImNvcnNcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZWZlcnJlclBvbGljeTogXCJuby1yZWZlcnJlclwiLFxyXG4gICAgICAgICAgICBib2R5OiBib2R5UmVxdWVzdFxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIHJlbmRlclJlc3VsdHMocmVzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNldERyb3Bkb3duID0gKGRyb3Bkb3duRWxlbWVudCwgc2V0VmFsdWUpID0+IHtcclxuICAgICAgICBkcm9wZG93bkVsZW1lbnQudmFsdWUgPSBzZXRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL0V2ZW50IEhhbmRsZXJzXHJcbiAgICBpZiAocHJvZHVjdENhdGVnb3J5RHJvcGRvd24pIHtcclxuICAgICAgICBwcm9kdWN0Q2F0ZWdvcnlEcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY2F0ZWdvcnkgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgLy9jbGVhcmluZyBzdWJjYXRlZ29yeSBkcm9wZG93blxyXG4gICAgICAgICAgICBzdWJjYXRlZ29yeSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHN1YmNhdGVnb3J5QXJyYXkgPSBbXCJBbGxcIl07XHJcbiAgICAgICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLmlubmVySFRNTCA9IFwiXCI7Ly9jbGVhciA8b3B0aW9uPiB0YWdzXHJcblxyXG4gICAgICAgICAgICBpZiAocHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24pIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0RHJvcGRvd24ocHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24sIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duKSB7XHJcblxyXG4gICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBzdWJjYXRlZ29yeSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHVwZGF0ZWRBY3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCB1cGRhdGVBY3Rpb25VcmwgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHNldFBhcmFtcyA9IHN1YmNhdGVnb3J5ICE9PSBcIlwiID8gYCR7YWN0aW9uSW5pdGlhbH0/dHlwZT1Db3Vyc2VzJmNhdGVnb3J5PSR7Y2F0ZWdvcnl9JnN1YmNhdGVnb3J5PSR7c3ViY2F0ZWdvcnl9YCA6IGAke2FjdGlvbkluaXRpYWx9P3R5cGU9Q291cnNlcyZjYXRlZ29yeT0ke2NhdGVnb3J5fWA7XHJcbiAgICAgICAgY291cnNlU2VhcmNoRm9ybS5zZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIiwgc2V0UGFyYW1zKTtcclxuXHJcbiAgICAgICAgdXBkYXRlZEFjdGlvbiA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICh1cGRhdGVkQWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNvdXJzZVNlYXJjaEZvcm0uc3VibWl0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvdXJzZVNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB1cGRhdGVBY3Rpb25VcmwoKTtcclxuICAgIH0pXHJcblxyXG4gICAgLy9QYWdlIExvYWRcclxuXHJcbiAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNvdXJzZVNlYXJjaDsiLCAiY29uc3QgYnVuZGxlcyA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBidW5kbGVCYWcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYnVuZGxlLWJhZycpLFxyXG4gICAgICAgIGJ1bmRsZUNvdW50ID0gYnVuZGxlQmFnLnF1ZXJ5U2VsZWN0b3IoJy5qcy1idW5kbGUtY291bnQnKTtcclxuICAgIGNvbnN0IGJ1bmRsZXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYnVuZGxlcy1mb3JtJyksXHJcbiAgICAgICAgYnVuZGxlc0Zvcm0gPSBidW5kbGVzQ29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcclxuXHJcbiAgICBjb25zdCBidW5kbGVQb3BEZXRhaWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWJ1bmRsZS1wb3AtZGV0YWlscycpO1xyXG4gICAgY29uc3QgYnVuZGxlTW9kYWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLW1vZGFsJyk7XHJcbiAgICBjb25zdCBidW5kbGVQb3BDbG9zZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLW1vZGFsLWNsb3NlJyk7XHJcblxyXG5cclxuICAgIC8vSXRlbXMgRGlzcGxheVxyXG5cclxuICAgIGNvbnN0IGRpc3BsYXlDb3VudCA9IChjb3VudCkgPT4ge1xyXG4gICAgICAgIGJ1bmRsZUNvdW50LmlubmVySFRNTCA9IChcclxuICAgICAgICAgICAgYCR7Y291bnR9YFxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc2VsZWN0ZWRDb3VudCA9IChmb3JtRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkRWxlbWVudCA9IGZvcm1FbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dFt0eXBlPWNoZWNrYm94XTpjaGVja2VkXCIpO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRFbGVtZW50Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgYnVuZGxlQmFnLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJ1bmRsZUJhZy5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZGlzcGxheUNvdW50KHNlbGVjdGVkRWxlbWVudC5sZW5ndGgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJ1bmRsZXNGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICBzZWxlY3RlZENvdW50KGJ1bmRsZXNGb3JtKVxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9Qb3AgRGV0YWlsc1xyXG5cclxuICAgIGNvbnN0IGNsb3NlUG9wcyA9ICgpID0+IHtcclxuICAgICAgICBidW5kbGVNb2RhbHMuZm9yRWFjaCgobW9kYWwpID0+IHtcclxuICAgICAgICAgICAgbW9kYWwuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgYnVuZGxlUG9wRGV0YWlscy5mb3JFYWNoKChidW5kbGVQb3BEZXRhaWwpID0+IHtcclxuICAgICAgICBidW5kbGVQb3BEZXRhaWwuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY29uc3QgZ2V0TW9kYWxJZCA9IGJ1bmRsZVBvcERldGFpbC5nZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIpLFxyXG4gICAgICAgICAgICAgICAgZ2V0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChnZXRNb2RhbElkKTtcclxuXHJcbiAgICAgICAgICAgIGdldE1vZGFsLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBidW5kbGVQb3BDbG9zZXJzLmZvckVhY2goKGJ1bmRsZVBvcENsb3NlcikgPT4ge1xyXG4gICAgICAgIGJ1bmRsZVBvcENsb3Nlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZ2V0TW9kYWxJZCA9IGJ1bmRsZVBvcENsb3Nlci5nZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIpLFxyXG4gICAgICAgICAgICAgICAgZ2V0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChnZXRNb2RhbElkKTtcclxuXHJcbiAgICAgICAgICAgIGdldE1vZGFsLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcclxuICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnKSB7XHJcbiAgICAgICAgICAgIGNsb3NlUG9wcygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGJ1bmRsZXM7IiwgImltcG9ydCBleHBhbmRhYmxlVGV4dENhcmRzIGZyb20gJy4vY29tcG9uZW50cy9leHBhbmRhYmxlLXRleHQtY2FyZHMnO1xyXG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXInO1xyXG5pbXBvcnQgbmF2IGZyb20gJy4vY29tcG9uZW50cy9uYXYnO1xyXG5pbXBvcnQgc3dpcGVyIGZyb20gJy4vY29tcG9uZW50cy9zd2lwZXInO1xyXG5pbXBvcnQgdGFicyBmcm9tICcuL2NvbXBvbmVudHMvdGFicyc7XHJcbmltcG9ydCB7IGRpYWxvZ3MsIGZvcm1zQWNjZXNzRGlhbG9nIH0gZnJvbSAnLi9jb21wb25lbnRzL2RpYWxvZ3MnO1xyXG5pbXBvcnQgaG9tZUhlcm8gZnJvbSAnLi9jb21wb25lbnRzL2hvbWUtaGVybyc7XHJcbmltcG9ydCBwbGF5TGlzdCBmcm9tICcuL2NvbXBvbmVudHMvcGxheWxpc3QnO1xyXG5pbXBvcnQgaG90VGlwTGlicmFyeSBmcm9tICcuL2NvbXBvbmVudHMvaG90LXRpcC1saWJyYXJ5JztcclxuaW1wb3J0IGFsZXJ0IGZyb20gJy4vY29tcG9uZW50cy9hbGVydCc7XHJcbmltcG9ydCBhcnRpY2xlRmlsdGVycyBmcm9tICcuL2NvbXBvbmVudHMvYXJ0aWNsZS1maWx0ZXJzJztcclxuaW1wb3J0IG11bHRpbWVkaWFGaWx0ZXJzIGZyb20gJy4vY29tcG9uZW50cy9tdWx0aW1lZGlhLWZpbHRlcnMnO1xyXG5pbXBvcnQgY2FsZW5kYXIgZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJztcclxuaW1wb3J0IHF1YW50aXR5U2VsZWN0b3IgZnJvbSAnLi9jb21wb25lbnRzL3F1YW50aXR5LXNlbGVjdG9yJztcclxuaW1wb3J0IGNoZWNrb3V0IGZyb20gJy4vY29tcG9uZW50cy9jaGVja291dCc7XHJcbmltcG9ydCBwcm9kdWN0cyBmcm9tICcuL2NvbXBvbmVudHMvcHJvZHVjdHMnO1xyXG5pbXBvcnQgY291cnNlU2VhcmNoIGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2Utc2VhcmNoJztcclxuaW1wb3J0IGJ1bmRsZXMgZnJvbSAnLi9jb21wb25lbnRzL2J1bmRsZXMnO1xyXG5cclxuZXhwYW5kYWJsZVRleHRDYXJkcygpO1xyXG5oZWFkZXIoKTtcclxubmF2KCk7XHJcbnN3aXBlcigpO1xyXG50YWJzKCk7XHJcbmRpYWxvZ3MoKTtcclxuZm9ybXNBY2Nlc3NEaWFsb2coKTtcclxuaG9tZUhlcm8oKTtcclxucGxheUxpc3QoKTtcclxuaG90VGlwTGlicmFyeSgpO1xyXG5hbGVydCgpO1xyXG5hcnRpY2xlRmlsdGVycygpO1xyXG5tdWx0aW1lZGlhRmlsdGVycygpO1xyXG5xdWFudGl0eVNlbGVjdG9yKCk7XHJcbmNoZWNrb3V0KCk7XHJcblxyXG5pZiAoZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJwYWdlLXRlbXBsYXRlLWNvbGxlY3Rpb25QYWdlXCIpKSB7XHJcbiAgICBwcm9kdWN0cygpO1xyXG59XHJcblxyXG5pZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlY1wiKSkge1xyXG4gICAgY2FsZW5kYXIoKTtcclxufVxyXG5cclxuaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY291cnNlLXNlYXJjaFwiKSkge1xyXG4gICAgY291cnNlU2VhcmNoKCk7XHJcbn1cclxuXHJcbmlmIChkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5jb250YWlucyhcInBhZ2UtdGVtcGxhdGUtYnVuZGxlUGFnZVwiKSkge1xyXG4gICAgYnVuZGxlcygpO1xyXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFNQSxPQUFD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QUFTLGVBQWUsSUFBSSxHQUFHO0FBQy9CLHFCQUFTO0FBQUEsRUFDYjtBQUVBLE1BQUksU0FBUyxlQUFlLGVBQWUsR0FBRztBQUMxQywwQkFBYTtBQUFBLEVBQ2pCO0FBRUEsTUFBSSxTQUFTLEtBQUssVUFBVSxTQUFTLDBCQUEwQixHQUFHO0FBQzlELG9CQUFRO0FBQUEsRUFDWjsiLAogICJuYW1lcyI6IFsiQWNjb3JkaW9uVGFicyIsICJvYmoiLCAiaGVhZGVyIiwgImhlYWRlciIsICJuYXYiLCAiZXh0ZW5kIiwgIkN1c3RvbUV2ZW50IiwgImNsYXNzZXMiLCAiZ2V0Q29tcHV0ZWRTdHlsZSIsICJ3aW5kb3ciLCAiaXNPYmplY3QiLCAiZXh0ZW5kIiwgInN3aXBlciIsICJkb2N1bWVudCIsICJ3aW5kb3ciLCAiZG9jdW1lbnQiLCAic3VwcG9ydCIsICJzd2lwZXIiLCAib2JzZXJ2ZXJVcGRhdGUiLCAiZXZlbnRzIiwgInNlbGYiLCAiZXZlbnQiLCAic2xpZGUiLCAidHJhbnNsYXRlIiwgInJlYWxJbmRleCIsICJtaW5UcmFuc2xhdGUiLCAibWF4VHJhbnNsYXRlIiwgInRyYW5zaXRpb25FbmQiLCAic2xpZGVUbyIsICJzZXRUcmFuc2xhdGUiLCAiaSIsICJpbmNyZW1lbnQiLCAiYnJlYWtwb2ludHMiLCAiZXh0ZW5kIiwgInN3aXBlciIsICJzd2lwZXIiLCAidXBkYXRlIiwgImlzSGlkZGVuIiwgImNsYXNzZXMiLCAic3dpcGVyIiwgInVwZGF0ZSIsICJpc0hpZGRlbiIsICJzd2lwZXIiLCAiZG9jdW1lbnQiLCAic2V0VHJhbnNsYXRlIiwgInNldFRyYW5zaXRpb24iLCAidXBkYXRlU2l6ZSIsICJldmVudHMiLCAic3dpcGVyIiwgImRvY3VtZW50IiwgInN3aXBlciIsICJzZXRUcmFuc2xhdGUiLCAic2V0VHJhbnNpdGlvbiIsICJzd2lwZXIiLCAic2xpZGUiLCAic3dpcGVyIiwgInNldFRyYW5zbGF0ZSIsICJzZXRUcmFuc2l0aW9uIiwgIkFjY29yZGlvblRhYnMiLCAiZXZlbnQiLCAiZGlhbG9ncyIsICJ0b2dnbGUiLCAibm93IiwgInBvc3RSZXN1bHRzIiwgInBvc3RSZXN1bHRzIl0KfQo=
