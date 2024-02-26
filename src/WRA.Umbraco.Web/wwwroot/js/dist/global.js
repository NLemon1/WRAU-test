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
    let selectedCategory = params.has("category") ? params.get("category") : "";
    let selectedSubcategory = params.has("subcategory") ? [params.get("subcategory")] : [];
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
          "category": selectedCategory,
          "subCategory": selectedSubcategory,
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
          let subcategories = result.subCategory;
          resultsList.innerHTML += `
                <div class="mb-2 p-4 pb-2 bg-light" itemscope itemtype="https://schema.org/Question">
                    <div class="d-flex align-items-lg-center mb-3 fw-semibold" style="font-size: 0.75rem;">
                        <div class="flex-grow-1">
                            <span class="d-inline-block mb-1 me-1 px-3 py-2 rounded-pill bg-secondary text-white">${result.category}</span>
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
          const setCTA = result.taxonomy == "Reference Manuals" || result.taxonomy == "Books" ? `<a href="${result.url}" id="add-to-cart" class="btn btn-secondary btn-sm border-0  flex-grow-1">Add To Cart</a>` : `<a href="${result.url}" id="view-product" class="btn btn-primary btn-sm flex-grow-1">View Product</a>`;
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
      console.log(subcategoryArray);
    };
    const populateSubCategories = () => {
      productSubCategoryDropdown.innerHTML = "";
      if (subcategoryArray.length > 1) {
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
        console.log(res);
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
      const setParams = subcategory !== "" ? `${actionInitial}?type=Courses&category=${category}&subcategory=${subcategory}` : `${actionInitial}?type=courses&category=${category}`;
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
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ExMXktYWNjb3JkaW9uLXRhYnMvYTExeS1hY2NvcmRpb24tdGFicy5qcyIsICIuLi9zcmMvY29tcG9uZW50cy9leHBhbmRhYmxlLXRleHQtY2FyZHMuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvaGVhZGVyLmpzIiwgIi4uL3NyYy9jb21wb25lbnRzL25hdi5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9zc3Itd2luZG93LmVzbS5tanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvdXRpbHMubWpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL3N3aXBlci1jb3JlLm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9jcmVhdGUtZWxlbWVudC1pZi1ub3QtZGVmaW5lZC5tanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL25hdmlnYXRpb24ubWpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2NsYXNzZXMtdG8tc2VsZWN0b3IubWpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9wYWdpbmF0aW9uLm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvc2Nyb2xsYmFyLm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvYXV0b3BsYXkubWpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2VmZmVjdC1pbml0Lm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9lZmZlY3QtdGFyZ2V0Lm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9lZmZlY3QtdmlydHVhbC10cmFuc2l0aW9uLWVuZC5tanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1mYWRlLm1qcyIsICIuLi9zcmMvY29tcG9uZW50cy9zd2lwZXIuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvdGFicy5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYTExeS1kaWFsb2cvZGlzdC9hMTF5LWRpYWxvZy5lc20uanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvZGlhbG9ncy5qcyIsICIuLi9zcmMvY29tcG9uZW50cy9ob21lLWhlcm8uanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvcGxheWxpc3QuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvaG90LXRpcC1saWJyYXJ5LmpzIiwgIi4uL3NyYy9jb21wb25lbnRzL2FsZXJ0LmpzIiwgIi4uL3NyYy9jb21wb25lbnRzL2FydGljbGUtZmlsdGVycy5qcyIsICIuLi9zcmMvY29tcG9uZW50cy9tdWx0aW1lZGlhLWZpbHRlcnMuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvY2FsZW5kYXIuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvcXVhbnRpdHktc2VsZWN0b3IuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvY2hlY2tvdXQuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvcHJvZHVjdHMuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvY291cnNlLXNlYXJjaC5qcyIsICIuLi9zcmMvZ2xvYmFsLmpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvKlxuKiAgQWNjZXNzaWJsZSBBY2NvcmRpb25UYWJzLCBieSBNYXR0aGlhcyBPdHQgKEBtX290dClcbipcbiogIEJhc2VkIG9uIHRoZSB3b3JrIG9mIEBzdG93YmFsbCAoaHR0cHM6Ly9jb2RlcGVuLmlvL3N0b3diYWxsL3Blbi94Vld3V2UpXG4qXG4qL1xuKGZ1bmN0aW9uICgpIHtcblxuICAndXNlIHN0cmljdCc7XG5cbiAgZnVuY3Rpb24gQWNjb3JkaW9uVGFicyAoZWwsIG9wdGlvbnMpIHtcblxuICAgIGlmICghZWwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmVsID0gZWw7XG4gICAgdGhpcy50YWJUcmlnZ2VycyA9IHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtdGFicy10cmlnZ2VyJyk7XG4gICAgdGhpcy50YWJQYW5lbHMgPSB0aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pzLXRhYnMtcGFuZWwnKTtcbiAgICB0aGlzLmFjY29yZGlvblRyaWdnZXJzID0gdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy1hY2NvcmRpb24tdHJpZ2dlcicpO1xuXG4gICAgdGhpcy5vcHRpb25zID0gdGhpcy5fZXh0ZW5kKHtcbiAgICAgIGJyZWFrcG9pbnQ6IDY0MCxcbiAgICAgIHRhYnNBbGxvd2VkOiB0cnVlLFxuICAgICAgc2VsZWN0ZWRUYWI6IDAsXG4gICAgICBzdGFydENvbGxhcHNlZDogZmFsc2VcbiAgICB9LCBvcHRpb25zKTtcblxuICAgIGlmKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJzLWFsbG93ZWQnKSA9PSBcInRydWVcIil7XG4gICAgICB0aGlzLm9wdGlvbnMudGFic0FsbG93ZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXRhYnMtYWxsb3dlZCcpID09IFwiZmFsc2VcIikge1xuICAgICAgdGhpcy5vcHRpb25zLnRhYnNBbGxvd2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLWJyZWFrcG9pbnQnKSl7XG4gICAgICB0aGlzLm9wdGlvbnMuYnJlYWtwb2ludCA9IHBhcnNlSW50KGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1icmVha3BvaW50JykpO1xuICAgIH1cblxuICAgIGlmKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zZWxlY3RlZC10YWInKSl7XG4gICAgICB0aGlzLm9wdGlvbnMuc2VsZWN0ZWRUYWIgPSBwYXJzZUludChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0ZWQtdGFiJykpO1xuICAgIH1cblxuICAgIGlmKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zdGFydC1jb2xsYXBzZWQnKSA9PSBcInRydWVcIil7XG4gICAgICB0aGlzLm9wdGlvbnMuc3RhcnRDb2xsYXBzZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXN0YXJ0LWNvbGxhcHNlZCcpID09IFwiZmFsc2VcIikge1xuICAgICAgdGhpcy5vcHRpb25zLnN0YXJ0Q29sbGFwc2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGFiVHJpZ2dlcnMubGVuZ3RoID09PSAwIHx8IHRoaXMudGFiVHJpZ2dlcnMubGVuZ3RoICE9PSB0aGlzLnRhYlBhbmVscy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLl9pbml0KCk7XG4gIH1cblxuICBBY2NvcmRpb25UYWJzLnByb3RvdHlwZS5faW5pdCA9IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBfdGhpcyA9IHRoaXM7XG5cbiAgICB0aGlzLnRhYlRyaWdnZXJzTGVuZ3RoID0gdGhpcy50YWJUcmlnZ2Vycy5sZW5ndGg7XG4gICAgdGhpcy5hY2NvcmRpb25UcmlnZ2Vyc0xlbmd0aCA9IHRoaXMuYWNjb3JkaW9uVHJpZ2dlcnMubGVuZ3RoO1xuICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSAwO1xuICAgIHRoaXMucHJldlNlbGVjdGVkVGFiID0gbnVsbDtcbiAgICB0aGlzLmNsaWNrTGlzdGVuZXIgPSB0aGlzLl9jbGlja0V2ZW50LmJpbmQodGhpcyk7XG4gICAgdGhpcy5rZXlkb3duTGlzdGVuZXIgPSB0aGlzLl9rZXlkb3duRXZlbnQuYmluZCh0aGlzKTtcbiAgICB0aGlzLmtleXMgPSB7XG4gICAgICBwcmV2OiAzNyxcbiAgICAgIG5leHQ6IDM5LFxuICAgICAgc3BhY2U6IDMyLFxuICAgICAgZW50ZXI6IDEzXG4gICAgfTtcblxuICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoID49IHRoaXMub3B0aW9ucy5icmVha3BvaW50ICYmIHRoaXMub3B0aW9ucy50YWJzQWxsb3dlZCkge1xuICAgICAgICB0aGlzLmlzQWNjb3JkaW9uID0gZmFsc2U7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5pc0FjY29yZGlvbiA9IHRydWU7XG4gICAgfVxuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRhYlRyaWdnZXJzTGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMudGFiVHJpZ2dlcnNbaV0uaW5kZXggPSBpO1xuICAgICAgdGhpcy50YWJUcmlnZ2Vyc1tpXS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tMaXN0ZW5lciwgZmFsc2UpO1xuICAgICAgdGhpcy50YWJUcmlnZ2Vyc1tpXS5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5rZXlkb3duTGlzdGVuZXIsIGZhbHNlKTtcblxuICAgICAgaWYgKHRoaXMudGFiVHJpZ2dlcnNbaV0uY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1zZWxlY3RlZCcpKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSBpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9oaWRlKGkpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5hY2NvcmRpb25UcmlnZ2Vyc0xlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLmFjY29yZGlvblRyaWdnZXJzW2ldLmluZGV4ID0gaTtcbiAgICAgIHRoaXMuYWNjb3JkaW9uVHJpZ2dlcnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgIHRoaXMuYWNjb3JkaW9uVHJpZ2dlcnNbaV0uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkxpc3RlbmVyLCBmYWxzZSk7XG5cbiAgICAgIGlmICh0aGlzLmFjY29yZGlvblRyaWdnZXJzW2ldLmNsYXNzTGlzdC5jb250YWlucygnaXMtc2VsZWN0ZWQnKSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gaTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWlzTmFOKHRoaXMub3B0aW9ucy5zZWxlY3RlZFRhYikpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSB0aGlzLm9wdGlvbnMuc2VsZWN0ZWRUYWIgPCB0aGlzLnRhYlRyaWdnZXJzTGVuZ3RoID8gdGhpcy5vcHRpb25zLnNlbGVjdGVkVGFiIDogdGhpcy50YWJUcmlnZ2Vyc0xlbmd0aCAtIDE7XG4gICAgfVxuXG4gICAgdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCdpcy1pbml0aWFsaXplZCcpO1xuICAgIGlmICh0aGlzLm9wdGlvbnMudGFic0FsbG93ZWQpIHtcbiAgICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgndGFicy1hbGxvd2VkJyk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlIGFjY29yZGlvbiBzaG91bGQgbm90IHN0YXJ0IGNvbGxhcHNlZCwgb3BlbiB0aGUgZmlyc3QgZWxlbWVudFxuICAgIGlmKCF0aGlzLm9wdGlvbnMuc3RhcnRDb2xsYXBzZWQgfHwgIXRoaXMuaXNBY2NvcmRpb24pe1xuICAgICAgdGhpcy5zZWxlY3RUYWIodGhpcy5zZWxlY3RlZFRhYiwgZmFsc2UpO1xuICAgIH1cblxuICAgIHZhciByZXNpemVUYWJzID0gdGhpcy5fZGVib3VuY2UoZnVuY3Rpb24oKSB7XG4gICAgICAvLyBUaGlzIGdldHMgZGVsYXllZCBmb3IgcGVyZm9ybWFuY2UgcmVhc29uc1xuICAgICAgaWYod2luZG93LmlubmVyV2lkdGggPj0gX3RoaXMub3B0aW9ucy5icmVha3BvaW50ICYmIF90aGlzLm9wdGlvbnMudGFic0FsbG93ZWQpIHtcbiAgICAgICAgX3RoaXMuaXNBY2NvcmRpb24gPSBmYWxzZTtcbiAgICAgICAgaWYgKF90aGlzLm9wdGlvbnMudGFic0FsbG93ZWQpIHtcbiAgICAgICAgICBfdGhpcy5lbC5jbGFzc0xpc3QuYWRkKCd0YWJzLWFsbG93ZWQnKTtcbiAgICAgICAgfVxuICAgICAgICBfdGhpcy5zZWxlY3RUYWIoX3RoaXMuc2VsZWN0ZWRUYWIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgX3RoaXMuaXNBY2NvcmRpb24gPSB0cnVlO1xuICAgICAgICBfdGhpcy5lbC5jbGFzc0xpc3QucmVtb3ZlKCd0YWJzLWFsbG93ZWQnKTtcbiAgICAgICAgaWYoIV90aGlzLm9wdGlvbnMuc3RhcnRDb2xsYXBzZWQpe1xuICAgICAgICAgIF90aGlzLnNlbGVjdFRhYihfdGhpcy5zZWxlY3RlZFRhYik7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgIH0sIDUwKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVUYWJzKTtcblxuICB9O1xuXG4gIEFjY29yZGlvblRhYnMucHJvdG90eXBlLl9jbGlja0V2ZW50ID0gZnVuY3Rpb24gKGUpIHtcblxuICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgIHZhciBjbG9zZXN0VHJpZ2dlciA9IHRoaXMuX2dldENsb3Nlc3QoZS50YXJnZXQsICcuanMtdGFicy10cmlnZ2VyJyk7XG4gICAgdmFyIGNsb3Nlc3RUYWIgPSAwO1xuXG4gICAgaWYgKGNsb3Nlc3RUcmlnZ2VyID09IG51bGwpIHtcbiAgICAgIGNsb3Nlc3RUcmlnZ2VyID0gdGhpcy5fZ2V0Q2xvc2VzdChlLnRhcmdldCwgJy5qcy1hY2NvcmRpb24tdHJpZ2dlcicpO1xuICAgICAgY2xvc2VzdFRhYiA9IHRoaXMuX2dldENsb3Nlc3QoY2xvc2VzdFRyaWdnZXIsICcuanMtdGFicy1wYW5lbCcpO1xuICAgICAgdGhpcy5pc0FjY29yZGlvbiA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuaXNBY2NvcmRpb24gPSBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdGFyZ2V0SW5kZXggPSBlLnRhcmdldC5pbmRleCAhPSBudWxsID8gZS50YXJnZXQuaW5kZXggOiBjbG9zZXN0VGFiLmluZGV4O1xuXG4gICAgaWYgKHRhcmdldEluZGV4ID09PSB0aGlzLnNlbGVjdGVkVGFiICYmICF0aGlzLmlzQWNjb3JkaW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RUYWIodGFyZ2V0SW5kZXgsIHRydWUpO1xuICB9O1xuXG4gIEFjY29yZGlvblRhYnMucHJvdG90eXBlLl9rZXlkb3duRXZlbnQgPSBmdW5jdGlvbiAoZSkge1xuXG4gICAgdmFyIHRhcmdldEluZGV4O1xuXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gdGhpcy5rZXlzLnByZXYgfHwgZS5rZXlDb2RlID09PSB0aGlzLmtleXMubmV4dCB8fCBlLmtleUNvZGUgPT09IHRoaXMua2V5cy5zcGFjZSB8fCBlLmtleUNvZGUgPT09IHRoaXMua2V5cy5lbnRlcikge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZS5rZXlDb2RlID09PSB0aGlzLmtleXMucHJldiAmJiBlLnRhcmdldC5pbmRleCA+IDAgJiYgIXRoaXMuaXNBY2NvcmRpb24pIHtcbiAgICAgIHRhcmdldEluZGV4ID0gZS50YXJnZXQuaW5kZXggLSAxO1xuICAgIH1cbiAgICBlbHNlIGlmIChlLmtleUNvZGUgPT09IHRoaXMua2V5cy5uZXh0ICYmIGUudGFyZ2V0LmluZGV4IDwgdGhpcy50YWJUcmlnZ2Vyc0xlbmd0aCAtIDEgJiYgIXRoaXMuaXNBY2NvcmRpb24pIHtcbiAgICAgIHRhcmdldEluZGV4ID0gZS50YXJnZXQuaW5kZXggKyAxO1xuICAgIH1cbiAgICBlbHNlIGlmIChlLmtleUNvZGUgPT09IHRoaXMua2V5cy5zcGFjZSB8fCBlLmtleUNvZGUgPT09IHRoaXMua2V5cy5lbnRlcikge1xuICAgICAgdGFyZ2V0SW5kZXggPSBlLnRhcmdldC5pbmRleDtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5zZWxlY3RUYWIodGFyZ2V0SW5kZXgsIHRydWUpO1xuICB9O1xuXG4gIEFjY29yZGlvblRhYnMucHJvdG90eXBlLl9zaG93ID0gZnVuY3Rpb24gKGluZGV4LCB1c2VySW52b2tlZCkge1xuXG4gICAgdGhpcy50YWJQYW5lbHNbaW5kZXhdLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcblxuICAgIHRoaXMudGFiVHJpZ2dlcnNbaW5kZXhdLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcbiAgICB0aGlzLnRhYlRyaWdnZXJzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdpcy1zZWxlY3RlZCcpO1xuICAgIHRoaXMudGFiVHJpZ2dlcnNbaW5kZXhdLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIHRydWUpO1xuXG4gICAgdGhpcy5hY2NvcmRpb25UcmlnZ2Vyc1tpbmRleF0uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgdHJ1ZSk7XG5cbiAgICB2YXIgcGFuZWxDb250ZW50ID0gdGhpcy50YWJQYW5lbHNbaW5kZXhdLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoXCJjb250ZW50XCIpWzBdO1xuICAgIHBhbmVsQ29udGVudC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgZmFsc2UpO1xuICAgIHBhbmVsQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcbiAgICBwYW5lbENvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaXMtb3BlbicpO1xuXG4gICAgdGhpcy50YWJQYW5lbHNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgIHRoaXMudGFiUGFuZWxzW2luZGV4XS5jbGFzc0xpc3QuYWRkKCdpcy1vcGVuJyk7XG5cbiAgICBpZiAodXNlckludm9rZWQpIHtcbiAgICAgIHRoaXMudGFiVHJpZ2dlcnNbaW5kZXhdLmZvY3VzKCk7XG4gICAgfVxuICB9O1xuXG4gIEFjY29yZGlvblRhYnMucHJvdG90eXBlLl9oaWRlID0gZnVuY3Rpb24gKGluZGV4KSB7XG5cbiAgICB0aGlzLnRhYlRyaWdnZXJzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1zZWxlY3RlZCcpO1xuICAgIHRoaXMudGFiVHJpZ2dlcnNbaW5kZXhdLnNldEF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcsIGZhbHNlKTtcbiAgICB0aGlzLnRhYlRyaWdnZXJzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuXG4gICAgdGhpcy5hY2NvcmRpb25UcmlnZ2Vyc1tpbmRleF0uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgZmFsc2UpO1xuXG4gICAgdmFyIHBhbmVsQ29udGVudCA9IHRoaXMudGFiUGFuZWxzW2luZGV4XS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udGVudFwiKVswXTtcbiAgICBwYW5lbENvbnRlbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIHRydWUpO1xuICAgIHBhbmVsQ29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XG4gICAgcGFuZWxDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuXG4gICAgdGhpcy50YWJQYW5lbHNbaW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcbiAgICB0aGlzLnRhYlBhbmVsc1tpbmRleF0uY2xhc3NMaXN0LmFkZCgnaXMtaGlkZGVuJyk7XG4gICAgdGhpcy50YWJQYW5lbHNbaW5kZXhdLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAtMSk7XG4gIH07XG5cbiAgQWNjb3JkaW9uVGFicy5wcm90b3R5cGUuc2VsZWN0VGFiID0gZnVuY3Rpb24gKGluZGV4LCB1c2VySW52b2tlZCkge1xuXG4gICAgaWYgKGluZGV4ID09PSBudWxsKSB7XG4gICAgICBpZih0aGlzLmlzQWNjb3JkaW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGluZGV4ID0gMDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZighdGhpcy50YWJQYW5lbHNbaW5kZXhdLmNsYXNzTGlzdC5jb250YWlucygnaXMtaGlkZGVuJykgJiYgdXNlckludm9rZWQpIHtcblxuICAgICAgaWYgKGluZGV4ID09PSB0aGlzLnNlbGVjdGVkVGFiKSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSBudWxsO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IG51bGw7XG4gICAgICAgIHRoaXMucHJldlNlbGVjdGVkVGFiID0gaW5kZXg7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuX2hpZGUoaW5kZXgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNBY2NvcmRpb24pIHtcblxuICAgICAgdGhpcy5wcmV2U2VsZWN0ZWRUYWIgPSB0aGlzLnNlbGVjdGVkVGFiO1xuICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IGluZGV4O1xuXG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnByZXZTZWxlY3RlZFRhYiA9PT0gbnVsbCB8fCAhdGhpcy5pc0FjY29yZGlvbikge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMudGFiVHJpZ2dlcnNMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGlmIChpICE9PSBpbmRleCkge1xuICAgICAgICAgICAgdGhpcy5faGlkZShpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLl9oaWRlKHRoaXMuc2VsZWN0ZWRUYWIpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLnByZXZTZWxlY3RlZFRhYiA9IHRoaXMuc2VsZWN0ZWRUYWI7XG4gICAgICB0aGlzLnNlbGVjdGVkVGFiID0gaW5kZXg7XG4gICAgfVxuXG4gICAgdGhpcy5fc2hvdyh0aGlzLnNlbGVjdGVkVGFiLCB1c2VySW52b2tlZCk7XG5cbiAgfTtcblxuICBBY2NvcmRpb25UYWJzLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gKCkge1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRhYlRyaWdnZXJzTGVuZ3RoOyBpKyspIHtcbiAgICAgIHRoaXMudGFiVHJpZ2dlcnNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtc2VsZWN0ZWQnKTtcbiAgICAgIHRoaXMudGFiVHJpZ2dlcnNbaV0ucmVtb3ZlQXR0cmlidXRlKCdhcmlhLXNlbGVjdGVkJyk7XG4gICAgICB0aGlzLnRhYlRyaWdnZXJzW2ldLnJlbW92ZUF0dHJpYnV0ZSgndGFiaW5kZXgnKTtcblxuICAgICAgdGhpcy50YWJQYW5lbHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG4gICAgICB0aGlzLnRhYlBhbmVsc1tpXS5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICB0aGlzLnRhYlBhbmVsc1tpXS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG5cbiAgICAgIHRoaXMudGFiVHJpZ2dlcnNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgIHRoaXMudGFiVHJpZ2dlcnNbaV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkxpc3RlbmVyLCBmYWxzZSk7XG5cbiAgICAgIGRlbGV0ZSB0aGlzLnRhYlRyaWdnZXJzW2ldLmluZGV4O1xuICAgIH1cblxuICAgIHRoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaW5pdGlhbGl6ZWQnKTtcbiAgfTtcblxuICAvKipcbiAgICAqIEdldCB0aGUgY2xvc2VzdCBtYXRjaGluZyBlbGVtZW50IHVwIHRoZSBET00gdHJlZS5cbiAgICAqIEBwcml2YXRlXG4gICAgKiBAcGFyYW0gIHtFbGVtZW50fSBlbGVtICAgICBTdGFydGluZyBlbGVtZW50XG4gICAgKiBAcGFyYW0gIHtTdHJpbmd9ICBzZWxlY3RvciBTZWxlY3RvciB0byBtYXRjaCBhZ2FpbnN0XG4gICAgKiBAcmV0dXJuIHtCb29sZWFufEVsZW1lbnR9ICBSZXR1cm5zIG51bGwgaWYgbm90IG1hdGNoIGZvdW5kXG4gICAgKi9cbiAgQWNjb3JkaW9uVGFicy5wcm90b3R5cGUuX2dldENsb3Nlc3QgPSBmdW5jdGlvbiAoIGVsZW0sIHNlbGVjdG9yICkge1xuXG4gICAgLy8gRWxlbWVudC5tYXRjaGVzKCkgcG9seWZpbGxcbiAgICBpZiAoIUVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMpIHtcbiAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcyA9XG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1vek1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm9NYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fFxuICAgICAgICAgICAgZnVuY3Rpb24ocykge1xuICAgICAgICAgICAgICAgIHZhciBtYXRjaGVzID0gKHRoaXMuZG9jdW1lbnQgfHwgdGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKHMpLFxuICAgICAgICAgICAgICAgICAgICBpID0gbWF0Y2hlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKC0taSA+PSAwICYmIG1hdGNoZXMuaXRlbShpKSAhPT0gdGhpcykge31cbiAgICAgICAgICAgICAgICByZXR1cm4gaSA+IC0xO1xuICAgICAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBHZXQgY2xvc2VzdCBtYXRjaFxuICAgIGZvciAoIDsgZWxlbSAmJiBlbGVtICE9PSBkb2N1bWVudDsgZWxlbSA9IGVsZW0ucGFyZW50Tm9kZSApIHtcbiAgICAgICAgaWYgKCBlbGVtLm1hdGNoZXMoIHNlbGVjdG9yICkgKSByZXR1cm4gZWxlbTtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcblxuICB9O1xuXG4gIC8vIFBhc3MgaW4gdGhlIG9iamVjdHMgdG8gbWVyZ2UgYXMgYXJndW1lbnRzLlxuICAvLyBGb3IgYSBkZWVwIGV4dGVuZCwgc2V0IHRoZSBmaXJzdCBhcmd1bWVudCB0byBgdHJ1ZWAuXG4gIEFjY29yZGlvblRhYnMucHJvdG90eXBlLl9leHRlbmQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIFZhcmlhYmxlc1xuICAgICAgdmFyIGV4dGVuZGVkID0ge307XG4gICAgICB2YXIgZGVlcCA9IGZhbHNlO1xuICAgICAgdmFyIGkgPSAwO1xuICAgICAgdmFyIGxlbmd0aCA9IGFyZ3VtZW50cy5sZW5ndGg7XG5cbiAgICAgIC8vIENoZWNrIGlmIGEgZGVlcCBtZXJnZVxuICAgICAgaWYgKCBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoIGFyZ3VtZW50c1swXSApID09PSAnW29iamVjdCBCb29sZWFuXScgKSB7XG4gICAgICAgICAgZGVlcCA9IGFyZ3VtZW50c1swXTtcbiAgICAgICAgICBpKys7XG4gICAgICB9XG5cbiAgICAgIC8vIE1lcmdlIHRoZSBvYmplY3QgaW50byB0aGUgZXh0ZW5kZWQgb2JqZWN0XG4gICAgICB2YXIgbWVyZ2UgPSBmdW5jdGlvbiAob2JqKSB7XG4gICAgICAgICAgZm9yICggdmFyIHByb3AgaW4gb2JqICkge1xuICAgICAgICAgICAgICBpZiAoIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbCggb2JqLCBwcm9wICkgKSB7XG4gICAgICAgICAgICAgICAgICAvLyBJZiBkZWVwIG1lcmdlIGFuZCBwcm9wZXJ0eSBpcyBhbiBvYmplY3QsIG1lcmdlIHByb3BlcnRpZXNcbiAgICAgICAgICAgICAgICAgIGlmICggZGVlcCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwob2JqW3Byb3BdKSA9PT0gJ1tvYmplY3QgT2JqZWN0XScgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBleHRlbmQoIHRydWUsIGV4dGVuZGVkW3Byb3BdLCBvYmpbcHJvcF0gKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgZXh0ZW5kZWRbcHJvcF0gPSBvYmpbcHJvcF07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvLyBMb29wIHRocm91Z2ggZWFjaCBvYmplY3QgYW5kIGNvbmR1Y3QgYSBtZXJnZVxuICAgICAgZm9yICggOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgdmFyIG9iaiA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgICBtZXJnZShvYmopO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZXh0ZW5kZWQ7XG5cbiAgfTtcblxuICAvLyBSZXR1cm5zIGEgZnVuY3Rpb24sIHRoYXQsIGFzIGxvbmcgYXMgaXQgY29udGludWVzIHRvIGJlIGludm9rZWQsIHdpbGwgbm90XG4gIC8vIGJlIHRyaWdnZXJlZC4gVGhlIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIGFmdGVyIGl0IHN0b3BzIGJlaW5nIGNhbGxlZCBmb3JcbiAgLy8gTiBtaWxsaXNlY29uZHMuIElmIGBpbW1lZGlhdGVgIGlzIHBhc3NlZCwgdHJpZ2dlciB0aGUgZnVuY3Rpb24gb24gdGhlXG4gIC8vIGxlYWRpbmcgZWRnZSwgaW5zdGVhZCBvZiB0aGUgdHJhaWxpbmcuXG4gIEFjY29yZGlvblRhYnMucHJvdG90eXBlLl9kZWJvdW5jZSA9IGZ1bmN0aW9uIChmdW5jLCB3YWl0LCBpbW1lZGlhdGUpIHtcbiAgICB2YXIgdGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgY29udGV4dCA9IHRoaXMsIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICB2YXIgbGF0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdGltZW91dCA9IG51bGw7XG4gICAgICAgIGlmICghaW1tZWRpYXRlKSB7IGZ1bmMuYXBwbHkoY29udGV4dCwgYXJncyk7IH07XG4gICAgICB9O1xuICAgICAgdmFyIGNhbGxOb3cgPSBpbW1lZGlhdGUgJiYgIXRpbWVvdXQ7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dChsYXRlciwgd2FpdCk7XG4gICAgICBpZiAoY2FsbE5vdykgeyBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpIH07XG4gICAgfTtcbiAgfTtcblxuICB2YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG5cbiAgZnVuY3Rpb24gJChleHByLCBjb24pIHtcbiAgICByZXR1cm4gdHlwZW9mIGV4cHIgPT09IFwic3RyaW5nXCIgPyAoY29uIHx8IGRvY3VtZW50KS5xdWVyeVNlbGVjdG9yKGV4cHIpIDogZXhwciB8fCBudWxsO1xuICB9XG5cbiAgZnVuY3Rpb24gJCQoZXhwciwgY29uKSB7XG4gICAgcmV0dXJuIHNsaWNlLmNhbGwoKGNvbiB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChleHByKSk7XG4gIH1cblxuICAvLyBJbml0aWFsaXphdGlvblxuXG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgJCQoXCIuanMtdGFic1wiKS5mb3JFYWNoKGZ1bmN0aW9uIChpbnB1dCkge1xuICAgICAgbmV3IEFjY29yZGlvblRhYnMoaW5wdXQpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gQXJlIHdlIGluIGEgYnJvd3Nlcj8gQ2hlY2sgZm9yIERvY3VtZW50IGNvbnN0cnVjdG9yXG4gIGlmICh0eXBlb2YgRG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAvLyBET00gYWxyZWFkeSBsb2FkZWQ/XG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgIT09IFwibG9hZGluZ1wiKSB7XG4gICAgICBpbml0KCk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgLy8gV2FpdCBmb3IgaXRcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsIGluaXQpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEV4cG9ydCBvbiBzZWxmIHdoZW4gaW4gYSBicm93c2VyXG4gIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHNlbGYuQWNjb3JkaW9uVGFicyA9IEFjY29yZGlvblRhYnM7XG4gIH1cblxuICAvLyBFeHBvc2UgYXMgYSBDSlMgbW9kdWxlXG4gIGlmICh0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiICYmIG1vZHVsZS5leHBvcnRzKSB7XG4gICAgbW9kdWxlLmV4cG9ydHMgPSBBY2NvcmRpb25UYWJzO1xuICB9XG5cbiAgcmV0dXJuIEFjY29yZGlvblRhYnM7XG5cbn0pKCk7XG4iLCAiY29uc3QgZXhwYW5kYWJsZVRleHRDYXJkcyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWV4cGFuZGFibGUtdGV4dC1jYXJkJyk7XHJcblxyXG4gICAgY2FyZHMuZm9yRWFjaChjYXJkID0+IHtcclxuICAgICAgICBjb25zdCBvcGVuID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuanMtZXhwYW5kYWJsZS10ZXh0LWNhcmRfX29wZW4nKTtcclxuICAgICAgICBjb25zdCBjbG9zZSA9IGNhcmQucXVlcnlTZWxlY3RvcignLmpzLWV4cGFuZGFibGUtdGV4dC1jYXJkX19jbG9zZScpO1xyXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5qcy1leHBhbmRhYmxlLXRleHQtY2FyZF9fb3ZlcmxheScpO1xyXG5cclxuICAgICAgICBvcGVuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBvdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBvcGVuLmFyaWFFeHBhbmRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuYXJpYUhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgb3Blbi5hcmlhRXhwYW5kZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgb3ZlcmxheS5hcmlhSGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZXhwYW5kYWJsZVRleHRDYXJkczsiLCAiY29uc3QgaGVhZGVyID0gKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGhlYWRlclNlYXJjaE92ZXJsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtaGVhZGVyX19zZWFyY2gtb3ZlcmxheScpO1xyXG4gICAgY29uc3QgaGVhZGVyU2VhcmNoT3ZlcmxheU9wZW5lcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtaGVhZGVyX19zZWFyY2gtb3ZlcmxheS10b2dnbGUnKTtcclxuICAgIGNvbnN0IGhlYWRlclNlYXJjaE92ZXJsYXlDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1oZWFkZXJfX3NlYXJjaC1vdmVybGF5LWNsb3NlJyk7XHJcbiAgICBjb25zdCBoZWFkZXJTZWFyY2hJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdoZWFkZXItc2VhcmNoLWlucHV0Jyk7XHJcblxyXG4gICAgY29uc3Qgc2l0ZU1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc2l0ZS1tYWluJyk7XHJcbiAgICBjb25zdCBoZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtaGVhZGVyJyk7XHJcbiAgICBjb25zdCBvZmZzZXRIZWlnaHQgPSAxMjA7XHJcblxyXG4gICAgbGV0IHRlbXBPcGVuZXIgPSBcIlwiO1xyXG5cclxuICAgIGNvbnN0IGtpbGxPdmVybGF5ID0gKCkgPT4ge1xyXG4gICAgICAgIGhlYWRlclNlYXJjaE92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xyXG4gICAgICAgIGhlYWRlclNlYXJjaE92ZXJsYXkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcbiAgICAgICAgdGVtcE9wZW5lci5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XHJcbiAgICAgICAgdGVtcE9wZW5lci5zZXRBdHRyaWJ1dGUoJ2FyaWEtZXhwYW5kZWQnLCAnZmFsc2UnKTtcclxuICAgICAgICBoZWFkZXJTZWFyY2hJbnB1dC5ibHVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaW5pdE92ZXJsYXkgPSAob3BlbkJ0bikgPT4ge1xyXG4gICAgICAgIGhlYWRlclNlYXJjaE92ZXJsYXkuY2xhc3NMaXN0LmFkZCgnaXMtb3BlbicpO1xyXG4gICAgICAgIGhlYWRlclNlYXJjaE92ZXJsYXkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xyXG4gICAgICAgIG9wZW5CdG4uY2xhc3NMaXN0LmFkZCgnaXMtb3BlbicpO1xyXG4gICAgICAgIG9wZW5CdG4uc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ3RydWUnKTtcclxuICAgICAgICB0ZW1wT3BlbmVyID0gb3BlbkJ0bjtcclxuICAgICAgICBoZWFkZXJTZWFyY2hJbnB1dC5mb2N1cygpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChoZWFkZXJTZWFyY2hPdmVybGF5KSB7XHJcblxyXG4gICAgICAgIGhlYWRlclNlYXJjaE92ZXJsYXlPcGVuZXJzLmZvckVhY2goKGhlYWRlclNlYXJjaE92ZXJsYXlPcGVuZXIpID0+IHtcclxuICAgICAgICAgICAgaGVhZGVyU2VhcmNoT3ZlcmxheU9wZW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKGhlYWRlclNlYXJjaE92ZXJsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBraWxsT3ZlcmxheSgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpbml0T3ZlcmxheShoZWFkZXJTZWFyY2hPdmVybGF5T3BlbmVyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFc2NhcGUnICYmIGhlYWRlclNlYXJjaE92ZXJsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdpcy1vcGVuJykpIHtcclxuICAgICAgICAgICAgICAgIGtpbGxPdmVybGF5KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaGVhZGVyU2VhcmNoT3ZlcmxheUNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAga2lsbE92ZXJsYXkodGVtcE9wZW5lcik7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgaWYgKGhlYWRlcikge1xyXG5cclxuICAgICAgICBpZiAoaGVhZGVyLmNsYXNzTGlzdC5jb250YWlucygnc2l0ZS1oZWFkZXItLXNob3ctb24tc2Nyb2xsLXVwJykpIHtcclxuXHJcbiAgICAgICAgICAgIGxldCBzY3JvbGxQb3MgPSAwO1xyXG5cclxuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsICgpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHRvcCB9ID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGlzU3RpY2t5ID0gaGVhZGVyLmNsYXNzTGlzdC5jb250YWlucygncG9zaXRpb24tc3RpY2t5Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlU2Nyb2xsVG9wID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdzaXRlLWhlYWRlci0tdG9wJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Bvc2l0aW9uLXN0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVTY3JvbGxVcCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzU3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdwb3NpdGlvbi1zdGlja3knKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZVNjcm9sbERvd24gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NpdGUtaGVhZGVyLS10b3AnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzU3RpY2t5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbC5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdsb2JhbC5zZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgncG9zaXRpb24tc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCAyNTApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgICAgIGlmICghc2l0ZU1haW4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaGFzLW92ZXJsYXlcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodG9wID49IG9mZnNldEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTY3JvbGxUb3AoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRvcCA+IHNjcm9sbFBvcykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTY3JvbGxVcCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZVNjcm9sbERvd24oKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsUG9zID0gdG9wO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKGhlYWRlci5jbGFzc0xpc3QuY29udGFpbnMoJ3Bvc2l0aW9uLXN0aWNreScpKSB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB7IHRvcCB9ID0gZG9jdW1lbnQuYm9keS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAodG9wID49IG9mZnNldEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QuYWRkKCdzaXRlLWhlYWRlci0tdG9wJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzaXRlLWhlYWRlci0tdG9wJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhlYWRlcjsiLCAiY29uc3QgbmF2ID0gKCkgPT4ge1xyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpdGUtaGVhZGVyJyk7XHJcbiAgICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXNpdGUtbWFpbicpO1xyXG4gICAgY29uc3QgbmF2SXRlbXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtbmF2LWl0ZW0nKTtcclxuICAgIGNvbnN0IG5hdlN1Yk1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLW5hdi1zdWItbWVudScpO1xyXG4gICAgY29uc3QgbmF2U3ViTWVudUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXN1Yi1tZW51LWNsb3NlJyk7XHJcblxyXG4gICAgY29uc3QgbmF2VG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW5hdi10b2dnbGUnKTtcclxuICAgIGNvbnN0IG5hdk1vYmlsZUl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLW5hdi1tb2JpbGUtaXRlbScpO1xyXG4gICAgY29uc3QgbmF2TW9iaWxlU3ViTWVudXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtbmF2LW1vYmlsZS1zdWItbWVudScpO1xyXG4gICAgY29uc3QgbmF2TW9iaWxlU3ViTWVudUNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXN1Yi1tZW51LW1vYmlsZS1iYWNrJyk7XHJcblxyXG5cclxuICAgIGNvbnN0IGRhcmtuZXNzID0gKHNob3cpID0+IHtcclxuICAgICAgICBpZiAoc2hvdykge1xyXG4gICAgICAgICAgICBtYWluLmNsYXNzTGlzdC5hZGQoXCJoYXMtb3ZlcmxheVwiKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG1haW4uY2xhc3NMaXN0LnJlbW92ZShcImhhcy1vdmVybGF5XCIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGNsb3NlTWVudSA9IChjbGVhck5hdkl0ZW1zLCBjbGVhclN1Yk5hdkl0ZW1zKSA9PiB7XHJcbiAgICAgICAgY2xlYXJOYXZJdGVtcy5mb3JFYWNoKChjbGVhck5hdkl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY2xlYXJOYXZJdGVtLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBjbGVhclN1Yk5hdkl0ZW1zLmZvckVhY2goKGNsZWFyU3ViTmF2SXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhclN1Yk5hdkl0ZW0uY2xhc3NMaXN0LmFkZChcImlzLWhpZGRlblwiKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGFya25lc3MoZmFsc2UpXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChuYXZJdGVtcykge1xyXG5cclxuICAgICAgICBuYXZJdGVtcy5mb3JFYWNoKChuYXZJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdkl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZU1lbnUobmF2SXRlbXMsIG5hdlN1Yk1lbnVzKTtcclxuICAgICAgICAgICAgICAgIG5hdkl0ZW0uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBnZXRUYXJnZXRJZCA9IG5hdkl0ZW0uZ2V0QXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiKSxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGdldFRhcmdldElkKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldFBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgICAgICAgICBkYXJrbmVzcyh0cnVlKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBuYXZJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbmF2U3ViTWVudUNsb3NlLmZvckVhY2goKGNsb3NlKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgZGFya25lc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgY2xvc2VNZW51KG5hdkl0ZW1zLCBuYXZTdWJNZW51cyk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGhlYWRlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlzU3ViTmF2SXRlbSA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuanMtbmF2LXN1Yi1tZW51XCIpID09IG51bGw7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzTmF2SXRlbSA9IGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImpzLW5hdi1pdGVtXCIpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzU3ViTmF2SXRlbSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpc05hdkl0ZW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjbG9zZU1lbnUobmF2SXRlbXMsIG5hdlN1Yk1lbnVzKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXJrbmVzcyhmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1haW4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGNsb3NlTWVudShuYXZJdGVtcywgbmF2U3ViTWVudXMpO1xyXG4gICAgICAgICAgICBkYXJrbmVzcyhmYWxzZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChuYXZNb2JpbGVJdGVtcykge1xyXG5cclxuICAgICAgICBuYXZNb2JpbGVJdGVtcy5mb3JFYWNoKChuYXZNb2JpbGVJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdk1vYmlsZUl0ZW0uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgbmF2TW9iaWxlSXRlbS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIFwidHJ1ZVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdldFRhcmdldElkID0gbmF2TW9iaWxlSXRlbS5nZXRBdHRyaWJ1dGUoXCJhcmlhLWNvbnRyb2xzXCIpLFxyXG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFBhbmVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZ2V0VGFyZ2V0SWQpO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0UGFuZWwuY2xhc3NMaXN0LnJlbW92ZShcImlzLWhpZGRlblwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG5hdk1vYmlsZVN1Yk1lbnVDbG9zZS5mb3JFYWNoKChuYXZNb2JpbGVDbG9zZSkgPT4ge1xyXG4gICAgICAgICAgICBuYXZNb2JpbGVDbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGNsb3NlTWVudShuYXZNb2JpbGVJdGVtcywgbmF2TW9iaWxlU3ViTWVudXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKG5hdlRvZ2dsZSkge1xyXG5cclxuICAgICAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChuYXZUb2dnbGUuZ2V0QXR0cmlidXRlKCdhcmlhLWNvbnRyb2xzJykpO1xyXG5cclxuICAgICAgICBjb25zdCBvcGVuTmF2ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBuYXYuYXJpYUhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICBuYXZUb2dnbGUuYXJpYUV4cGFuZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2hhcy1vcGVuLW5hdicpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGNsb3NlTmF2ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBuYXYuYXJpYUhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIG5hdlRvZ2dsZS5hcmlhRXhwYW5kZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hhcy1vcGVuLW5hdicpO1xyXG4gICAgICAgICAgICBjbG9zZU1lbnUobmF2TW9iaWxlSXRlbXMsIG5hdk1vYmlsZVN1Yk1lbnVzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBuYXZUb2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChuYXZUb2dnbGUuYXJpYUV4cGFuZGVkID09PSAndHJ1ZScpIHtcclxuICAgICAgICAgICAgICAgIGNsb3NlTmF2KCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBvcGVuTmF2KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGRvY3VtZW50Lm9ua2V5ZG93biA9IGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgaWYgKGUua2V5ID09IFwiRXNjYXBlXCIpIHtcclxuICAgICAgICAgICAgY2xvc2VNZW51KG5hdkl0ZW1zLCBuYXZTdWJNZW51cyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBuYXY7IiwgIi8qKlxuICogU1NSIFdpbmRvdyA0LjAuMlxuICogQmV0dGVyIGhhbmRsaW5nIGZvciB3aW5kb3cgb2JqZWN0IGluIFNTUiBlbnZpcm9ubWVudFxuICogaHR0cHM6Ly9naXRodWIuY29tL25vbGltaXRzNHdlYi9zc3Itd2luZG93XG4gKlxuICogQ29weXJpZ2h0IDIwMjEsIFZsYWRpbWlyIEtoYXJsYW1waWRpXG4gKlxuICogTGljZW5zZWQgdW5kZXIgTUlUXG4gKlxuICogUmVsZWFzZWQgb246IERlY2VtYmVyIDEzLCAyMDIxXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgcmV0dXJuIG9iaiAhPT0gbnVsbCAmJiB0eXBlb2Ygb2JqID09PSAnb2JqZWN0JyAmJiAnY29uc3RydWN0b3InIGluIG9iaiAmJiBvYmouY29uc3RydWN0b3IgPT09IE9iamVjdDtcbn1cbmZ1bmN0aW9uIGV4dGVuZCh0YXJnZXQsIHNyYykge1xuICBpZiAodGFyZ2V0ID09PSB2b2lkIDApIHtcbiAgICB0YXJnZXQgPSB7fTtcbiAgfVxuICBpZiAoc3JjID09PSB2b2lkIDApIHtcbiAgICBzcmMgPSB7fTtcbiAgfVxuICBPYmplY3Qua2V5cyhzcmMpLmZvckVhY2goa2V5ID0+IHtcbiAgICBpZiAodHlwZW9mIHRhcmdldFtrZXldID09PSAndW5kZWZpbmVkJykgdGFyZ2V0W2tleV0gPSBzcmNba2V5XTtlbHNlIGlmIChpc09iamVjdChzcmNba2V5XSkgJiYgaXNPYmplY3QodGFyZ2V0W2tleV0pICYmIE9iamVjdC5rZXlzKHNyY1trZXldKS5sZW5ndGggPiAwKSB7XG4gICAgICBleHRlbmQodGFyZ2V0W2tleV0sIHNyY1trZXldKTtcbiAgICB9XG4gIH0pO1xufVxuY29uc3Qgc3NyRG9jdW1lbnQgPSB7XG4gIGJvZHk6IHt9LFxuICBhZGRFdmVudExpc3RlbmVyKCkge30sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSB7fSxcbiAgYWN0aXZlRWxlbWVudDoge1xuICAgIGJsdXIoKSB7fSxcbiAgICBub2RlTmFtZTogJydcbiAgfSxcbiAgcXVlcnlTZWxlY3RvcigpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgcXVlcnlTZWxlY3RvckFsbCgpIHtcbiAgICByZXR1cm4gW107XG4gIH0sXG4gIGdldEVsZW1lbnRCeUlkKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBjcmVhdGVFdmVudCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5pdEV2ZW50KCkge31cbiAgICB9O1xuICB9LFxuICBjcmVhdGVFbGVtZW50KCkge1xuICAgIHJldHVybiB7XG4gICAgICBjaGlsZHJlbjogW10sXG4gICAgICBjaGlsZE5vZGVzOiBbXSxcbiAgICAgIHN0eWxlOiB7fSxcbiAgICAgIHNldEF0dHJpYnV0ZSgpIHt9LFxuICAgICAgZ2V0RWxlbWVudHNCeVRhZ05hbWUoKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuICBjcmVhdGVFbGVtZW50TlMoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9LFxuICBpbXBvcnROb2RlKCkge1xuICAgIHJldHVybiBudWxsO1xuICB9LFxuICBsb2NhdGlvbjoge1xuICAgIGhhc2g6ICcnLFxuICAgIGhvc3Q6ICcnLFxuICAgIGhvc3RuYW1lOiAnJyxcbiAgICBocmVmOiAnJyxcbiAgICBvcmlnaW46ICcnLFxuICAgIHBhdGhuYW1lOiAnJyxcbiAgICBwcm90b2NvbDogJycsXG4gICAgc2VhcmNoOiAnJ1xuICB9XG59O1xuZnVuY3Rpb24gZ2V0RG9jdW1lbnQoKSB7XG4gIGNvbnN0IGRvYyA9IHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCcgPyBkb2N1bWVudCA6IHt9O1xuICBleHRlbmQoZG9jLCBzc3JEb2N1bWVudCk7XG4gIHJldHVybiBkb2M7XG59XG5jb25zdCBzc3JXaW5kb3cgPSB7XG4gIGRvY3VtZW50OiBzc3JEb2N1bWVudCxcbiAgbmF2aWdhdG9yOiB7XG4gICAgdXNlckFnZW50OiAnJ1xuICB9LFxuICBsb2NhdGlvbjoge1xuICAgIGhhc2g6ICcnLFxuICAgIGhvc3Q6ICcnLFxuICAgIGhvc3RuYW1lOiAnJyxcbiAgICBocmVmOiAnJyxcbiAgICBvcmlnaW46ICcnLFxuICAgIHBhdGhuYW1lOiAnJyxcbiAgICBwcm90b2NvbDogJycsXG4gICAgc2VhcmNoOiAnJ1xuICB9LFxuICBoaXN0b3J5OiB7XG4gICAgcmVwbGFjZVN0YXRlKCkge30sXG4gICAgcHVzaFN0YXRlKCkge30sXG4gICAgZ28oKSB7fSxcbiAgICBiYWNrKCkge31cbiAgfSxcbiAgQ3VzdG9tRXZlbnQ6IGZ1bmN0aW9uIEN1c3RvbUV2ZW50KCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBhZGRFdmVudExpc3RlbmVyKCkge30sXG4gIHJlbW92ZUV2ZW50TGlzdGVuZXIoKSB7fSxcbiAgZ2V0Q29tcHV0ZWRTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0UHJvcGVydHlWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgIH07XG4gIH0sXG4gIEltYWdlKCkge30sXG4gIERhdGUoKSB7fSxcbiAgc2NyZWVuOiB7fSxcbiAgc2V0VGltZW91dCgpIHt9LFxuICBjbGVhclRpbWVvdXQoKSB7fSxcbiAgbWF0Y2hNZWRpYSgpIHtcbiAgICByZXR1cm4ge307XG4gIH0sXG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZShjYWxsYmFjaykge1xuICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHNldFRpbWVvdXQoY2FsbGJhY2ssIDApO1xuICB9LFxuICBjYW5jZWxBbmltYXRpb25GcmFtZShpZCkge1xuICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY2xlYXJUaW1lb3V0KGlkKTtcbiAgfVxufTtcbmZ1bmN0aW9uIGdldFdpbmRvdygpIHtcbiAgY29uc3Qgd2luID0gdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgPyB3aW5kb3cgOiB7fTtcbiAgZXh0ZW5kKHdpbiwgc3NyV2luZG93KTtcbiAgcmV0dXJuIHdpbjtcbn1cblxuZXhwb3J0IHsgZ2V0V2luZG93IGFzIGEsIGdldERvY3VtZW50IGFzIGcgfTtcbiIsICJpbXBvcnQgeyBhIGFzIGdldFdpbmRvdywgZyBhcyBnZXREb2N1bWVudCB9IGZyb20gJy4vc3NyLXdpbmRvdy5lc20ubWpzJztcblxuZnVuY3Rpb24gY2xhc3Nlc1RvVG9rZW5zKGNsYXNzZXMpIHtcbiAgaWYgKGNsYXNzZXMgPT09IHZvaWQgMCkge1xuICAgIGNsYXNzZXMgPSAnJztcbiAgfVxuICByZXR1cm4gY2xhc3Nlcy50cmltKCkuc3BsaXQoJyAnKS5maWx0ZXIoYyA9PiAhIWMudHJpbSgpKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvcHMob2JqKSB7XG4gIGNvbnN0IG9iamVjdCA9IG9iajtcbiAgT2JqZWN0LmtleXMob2JqZWN0KS5mb3JFYWNoKGtleSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIG9iamVjdFtrZXldID0gbnVsbDtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBubyBnZXR0ZXIgZm9yIG9iamVjdFxuICAgIH1cbiAgICB0cnkge1xuICAgICAgZGVsZXRlIG9iamVjdFtrZXldO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIC8vIHNvbWV0aGluZyBnb3Qgd3JvbmdcbiAgICB9XG4gIH0pO1xufVxuZnVuY3Rpb24gbmV4dFRpY2soY2FsbGJhY2ssIGRlbGF5KSB7XG4gIGlmIChkZWxheSA9PT0gdm9pZCAwKSB7XG4gICAgZGVsYXkgPSAwO1xuICB9XG4gIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCBkZWxheSk7XG59XG5mdW5jdGlvbiBub3coKSB7XG4gIHJldHVybiBEYXRlLm5vdygpO1xufVxuZnVuY3Rpb24gZ2V0Q29tcHV0ZWRTdHlsZShlbCkge1xuICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgbGV0IHN0eWxlO1xuICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcbiAgICBzdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKTtcbiAgfVxuICBpZiAoIXN0eWxlICYmIGVsLmN1cnJlbnRTdHlsZSkge1xuICAgIHN0eWxlID0gZWwuY3VycmVudFN0eWxlO1xuICB9XG4gIGlmICghc3R5bGUpIHtcbiAgICBzdHlsZSA9IGVsLnN0eWxlO1xuICB9XG4gIHJldHVybiBzdHlsZTtcbn1cbmZ1bmN0aW9uIGdldFRyYW5zbGF0ZShlbCwgYXhpcykge1xuICBpZiAoYXhpcyA9PT0gdm9pZCAwKSB7XG4gICAgYXhpcyA9ICd4JztcbiAgfVxuICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgbGV0IG1hdHJpeDtcbiAgbGV0IGN1clRyYW5zZm9ybTtcbiAgbGV0IHRyYW5zZm9ybU1hdHJpeDtcbiAgY29uc3QgY3VyU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGVsKTtcbiAgaWYgKHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgpIHtcbiAgICBjdXJUcmFuc2Zvcm0gPSBjdXJTdHlsZS50cmFuc2Zvcm0gfHwgY3VyU3R5bGUud2Via2l0VHJhbnNmb3JtO1xuICAgIGlmIChjdXJUcmFuc2Zvcm0uc3BsaXQoJywnKS5sZW5ndGggPiA2KSB7XG4gICAgICBjdXJUcmFuc2Zvcm0gPSBjdXJUcmFuc2Zvcm0uc3BsaXQoJywgJykubWFwKGEgPT4gYS5yZXBsYWNlKCcsJywgJy4nKSkuam9pbignLCAnKTtcbiAgICB9XG4gICAgLy8gU29tZSBvbGQgdmVyc2lvbnMgb2YgV2Via2l0IGNob2tlIHdoZW4gJ25vbmUnIGlzIHBhc3NlZDsgcGFzc1xuICAgIC8vIGVtcHR5IHN0cmluZyBpbnN0ZWFkIGluIHRoaXMgY2FzZVxuICAgIHRyYW5zZm9ybU1hdHJpeCA9IG5ldyB3aW5kb3cuV2ViS2l0Q1NTTWF0cml4KGN1clRyYW5zZm9ybSA9PT0gJ25vbmUnID8gJycgOiBjdXJUcmFuc2Zvcm0pO1xuICB9IGVsc2Uge1xuICAgIHRyYW5zZm9ybU1hdHJpeCA9IGN1clN0eWxlLk1velRyYW5zZm9ybSB8fCBjdXJTdHlsZS5PVHJhbnNmb3JtIHx8IGN1clN0eWxlLk1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLm1zVHJhbnNmb3JtIHx8IGN1clN0eWxlLnRyYW5zZm9ybSB8fCBjdXJTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCd0cmFuc2Zvcm0nKS5yZXBsYWNlKCd0cmFuc2xhdGUoJywgJ21hdHJpeCgxLCAwLCAwLCAxLCcpO1xuICAgIG1hdHJpeCA9IHRyYW5zZm9ybU1hdHJpeC50b1N0cmluZygpLnNwbGl0KCcsJyk7XG4gIH1cbiAgaWYgKGF4aXMgPT09ICd4Jykge1xuICAgIC8vIExhdGVzdCBDaHJvbWUgYW5kIHdlYmtpdHMgRml4XG4gICAgaWYgKHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgpIGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDE7XG4gICAgLy8gQ3JhenkgSUUxMCBNYXRyaXhcbiAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNikgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbMTJdKTtcbiAgICAvLyBOb3JtYWwgQnJvd3NlcnNcbiAgICBlbHNlIGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzRdKTtcbiAgfVxuICBpZiAoYXhpcyA9PT0gJ3knKSB7XG4gICAgLy8gTGF0ZXN0IENocm9tZSBhbmQgd2Via2l0cyBGaXhcbiAgICBpZiAod2luZG93LldlYktpdENTU01hdHJpeCkgY3VyVHJhbnNmb3JtID0gdHJhbnNmb3JtTWF0cml4Lm00MjtcbiAgICAvLyBDcmF6eSBJRTEwIE1hdHJpeFxuICAgIGVsc2UgaWYgKG1hdHJpeC5sZW5ndGggPT09IDE2KSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFsxM10pO1xuICAgIC8vIE5vcm1hbCBCcm93c2Vyc1xuICAgIGVsc2UgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbNV0pO1xuICB9XG4gIHJldHVybiBjdXJUcmFuc2Zvcm0gfHwgMDtcbn1cbmZ1bmN0aW9uIGlzT2JqZWN0KG8pIHtcbiAgcmV0dXJuIHR5cGVvZiBvID09PSAnb2JqZWN0JyAmJiBvICE9PSBudWxsICYmIG8uY29uc3RydWN0b3IgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG8pLnNsaWNlKDgsIC0xKSA9PT0gJ09iamVjdCc7XG59XG5mdW5jdGlvbiBpc05vZGUobm9kZSkge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgaWYgKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiB3aW5kb3cuSFRNTEVsZW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIG5vZGUgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbiAgfVxuICByZXR1cm4gbm9kZSAmJiAobm9kZS5ub2RlVHlwZSA9PT0gMSB8fCBub2RlLm5vZGVUeXBlID09PSAxMSk7XG59XG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gIGNvbnN0IHRvID0gT2JqZWN0KGFyZ3VtZW50cy5sZW5ndGggPD0gMCA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1swXSk7XG4gIGNvbnN0IG5vRXh0ZW5kID0gWydfX3Byb3RvX18nLCAnY29uc3RydWN0b3InLCAncHJvdG90eXBlJ107XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgbmV4dFNvdXJjZSA9IGkgPCAwIHx8IGFyZ3VtZW50cy5sZW5ndGggPD0gaSA/IHVuZGVmaW5lZCA6IGFyZ3VtZW50c1tpXTtcbiAgICBpZiAobmV4dFNvdXJjZSAhPT0gdW5kZWZpbmVkICYmIG5leHRTb3VyY2UgIT09IG51bGwgJiYgIWlzTm9kZShuZXh0U291cmNlKSkge1xuICAgICAgY29uc3Qga2V5c0FycmF5ID0gT2JqZWN0LmtleXMoT2JqZWN0KG5leHRTb3VyY2UpKS5maWx0ZXIoa2V5ID0+IG5vRXh0ZW5kLmluZGV4T2Yoa2V5KSA8IDApO1xuICAgICAgZm9yIChsZXQgbmV4dEluZGV4ID0gMCwgbGVuID0ga2V5c0FycmF5Lmxlbmd0aDsgbmV4dEluZGV4IDwgbGVuOyBuZXh0SW5kZXggKz0gMSkge1xuICAgICAgICBjb25zdCBuZXh0S2V5ID0ga2V5c0FycmF5W25leHRJbmRleF07XG4gICAgICAgIGNvbnN0IGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG5leHRTb3VyY2UsIG5leHRLZXkpO1xuICAgICAgICBpZiAoZGVzYyAhPT0gdW5kZWZpbmVkICYmIGRlc2MuZW51bWVyYWJsZSkge1xuICAgICAgICAgIGlmIChpc09iamVjdCh0b1tuZXh0S2V5XSkgJiYgaXNPYmplY3QobmV4dFNvdXJjZVtuZXh0S2V5XSkpIHtcbiAgICAgICAgICAgIGlmIChuZXh0U291cmNlW25leHRLZXldLl9fc3dpcGVyX18pIHtcbiAgICAgICAgICAgICAgdG9bbmV4dEtleV0gPSBuZXh0U291cmNlW25leHRLZXldO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXh0ZW5kKHRvW25leHRLZXldLCBuZXh0U291cmNlW25leHRLZXldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKCFpc09iamVjdCh0b1tuZXh0S2V5XSkgJiYgaXNPYmplY3QobmV4dFNvdXJjZVtuZXh0S2V5XSkpIHtcbiAgICAgICAgICAgIHRvW25leHRLZXldID0ge307XG4gICAgICAgICAgICBpZiAobmV4dFNvdXJjZVtuZXh0S2V5XS5fX3N3aXBlcl9fKSB7XG4gICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGV4dGVuZCh0b1tuZXh0S2V5XSwgbmV4dFNvdXJjZVtuZXh0S2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRvO1xufVxuZnVuY3Rpb24gc2V0Q1NTUHJvcGVydHkoZWwsIHZhck5hbWUsIHZhclZhbHVlKSB7XG4gIGVsLnN0eWxlLnNldFByb3BlcnR5KHZhck5hbWUsIHZhclZhbHVlKTtcbn1cbmZ1bmN0aW9uIGFuaW1hdGVDU1NNb2RlU2Nyb2xsKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgdGFyZ2V0UG9zaXRpb24sXG4gICAgc2lkZVxuICB9ID0gX3JlZjtcbiAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IHN0YXJ0UG9zaXRpb24gPSAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgbGV0IHN0YXJ0VGltZSA9IG51bGw7XG4gIGxldCB0aW1lO1xuICBjb25zdCBkdXJhdGlvbiA9IHN3aXBlci5wYXJhbXMuc3BlZWQ7XG4gIHN3aXBlci53cmFwcGVyRWwuc3R5bGUuc2Nyb2xsU25hcFR5cGUgPSAnbm9uZSc7XG4gIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShzd2lwZXIuY3NzTW9kZUZyYW1lSUQpO1xuICBjb25zdCBkaXIgPSB0YXJnZXRQb3NpdGlvbiA+IHN0YXJ0UG9zaXRpb24gPyAnbmV4dCcgOiAncHJldic7XG4gIGNvbnN0IGlzT3V0T2ZCb3VuZCA9IChjdXJyZW50LCB0YXJnZXQpID0+IHtcbiAgICByZXR1cm4gZGlyID09PSAnbmV4dCcgJiYgY3VycmVudCA+PSB0YXJnZXQgfHwgZGlyID09PSAncHJldicgJiYgY3VycmVudCA8PSB0YXJnZXQ7XG4gIH07XG4gIGNvbnN0IGFuaW1hdGUgPSAoKSA9PiB7XG4gICAgdGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIGlmIChzdGFydFRpbWUgPT09IG51bGwpIHtcbiAgICAgIHN0YXJ0VGltZSA9IHRpbWU7XG4gICAgfVxuICAgIGNvbnN0IHByb2dyZXNzID0gTWF0aC5tYXgoTWF0aC5taW4oKHRpbWUgLSBzdGFydFRpbWUpIC8gZHVyYXRpb24sIDEpLCAwKTtcbiAgICBjb25zdCBlYXNlUHJvZ3Jlc3MgPSAwLjUgLSBNYXRoLmNvcyhwcm9ncmVzcyAqIE1hdGguUEkpIC8gMjtcbiAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gc3RhcnRQb3NpdGlvbiArIGVhc2VQcm9ncmVzcyAqICh0YXJnZXRQb3NpdGlvbiAtIHN0YXJ0UG9zaXRpb24pO1xuICAgIGlmIChpc091dE9mQm91bmQoY3VycmVudFBvc2l0aW9uLCB0YXJnZXRQb3NpdGlvbikpIHtcbiAgICAgIGN1cnJlbnRQb3NpdGlvbiA9IHRhcmdldFBvc2l0aW9uO1xuICAgIH1cbiAgICBzd2lwZXIud3JhcHBlckVsLnNjcm9sbFRvKHtcbiAgICAgIFtzaWRlXTogY3VycmVudFBvc2l0aW9uXG4gICAgfSk7XG4gICAgaWYgKGlzT3V0T2ZCb3VuZChjdXJyZW50UG9zaXRpb24sIHRhcmdldFBvc2l0aW9uKSkge1xuICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xuICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5zY3JvbGxTbmFwVHlwZSA9ICcnO1xuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUub3ZlcmZsb3cgPSAnJztcbiAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zY3JvbGxUbyh7XG4gICAgICAgICAgW3NpZGVdOiBjdXJyZW50UG9zaXRpb25cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShzd2lwZXIuY3NzTW9kZUZyYW1lSUQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2lwZXIuY3NzTW9kZUZyYW1lSUQgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKGFuaW1hdGUpO1xuICB9O1xuICBhbmltYXRlKCk7XG59XG5mdW5jdGlvbiBnZXRTbGlkZVRyYW5zZm9ybUVsKHNsaWRlRWwpIHtcbiAgcmV0dXJuIHNsaWRlRWwucXVlcnlTZWxlY3RvcignLnN3aXBlci1zbGlkZS10cmFuc2Zvcm0nKSB8fCBzbGlkZUVsLnNoYWRvd1Jvb3QgJiYgc2xpZGVFbC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItc2xpZGUtdHJhbnNmb3JtJykgfHwgc2xpZGVFbDtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRDaGlsZHJlbihlbGVtZW50LCBzZWxlY3Rvcikge1xuICBpZiAoc2VsZWN0b3IgPT09IHZvaWQgMCkge1xuICAgIHNlbGVjdG9yID0gJyc7XG4gIH1cbiAgcmV0dXJuIFsuLi5lbGVtZW50LmNoaWxkcmVuXS5maWx0ZXIoZWwgPT4gZWwubWF0Y2hlcyhzZWxlY3RvcikpO1xufVxuZnVuY3Rpb24gc2hvd1dhcm5pbmcodGV4dCkge1xuICB0cnkge1xuICAgIGNvbnNvbGUud2Fybih0ZXh0KTtcbiAgICByZXR1cm47XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIC8vIGVyclxuICB9XG59XG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50KHRhZywgY2xhc3Nlcykge1xuICBpZiAoY2xhc3NlcyA9PT0gdm9pZCAwKSB7XG4gICAgY2xhc3NlcyA9IFtdO1xuICB9XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpO1xuICBlbC5jbGFzc0xpc3QuYWRkKC4uLihBcnJheS5pc0FycmF5KGNsYXNzZXMpID8gY2xhc3NlcyA6IGNsYXNzZXNUb1Rva2VucyhjbGFzc2VzKSkpO1xuICByZXR1cm4gZWw7XG59XG5mdW5jdGlvbiBlbGVtZW50T2Zmc2V0KGVsKSB7XG4gIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gIGNvbnN0IGJveCA9IGVsLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICBjb25zdCBib2R5ID0gZG9jdW1lbnQuYm9keTtcbiAgY29uc3QgY2xpZW50VG9wID0gZWwuY2xpZW50VG9wIHx8IGJvZHkuY2xpZW50VG9wIHx8IDA7XG4gIGNvbnN0IGNsaWVudExlZnQgPSBlbC5jbGllbnRMZWZ0IHx8IGJvZHkuY2xpZW50TGVmdCB8fCAwO1xuICBjb25zdCBzY3JvbGxUb3AgPSBlbCA9PT0gd2luZG93ID8gd2luZG93LnNjcm9sbFkgOiBlbC5zY3JvbGxUb3A7XG4gIGNvbnN0IHNjcm9sbExlZnQgPSBlbCA9PT0gd2luZG93ID8gd2luZG93LnNjcm9sbFggOiBlbC5zY3JvbGxMZWZ0O1xuICByZXR1cm4ge1xuICAgIHRvcDogYm94LnRvcCArIHNjcm9sbFRvcCAtIGNsaWVudFRvcCxcbiAgICBsZWZ0OiBib3gubGVmdCArIHNjcm9sbExlZnQgLSBjbGllbnRMZWZ0XG4gIH07XG59XG5mdW5jdGlvbiBlbGVtZW50UHJldkFsbChlbCwgc2VsZWN0b3IpIHtcbiAgY29uc3QgcHJldkVscyA9IFtdO1xuICB3aGlsZSAoZWwucHJldmlvdXNFbGVtZW50U2libGluZykge1xuICAgIGNvbnN0IHByZXYgPSBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICBpZiAocHJldi5tYXRjaGVzKHNlbGVjdG9yKSkgcHJldkVscy5wdXNoKHByZXYpO1xuICAgIH0gZWxzZSBwcmV2RWxzLnB1c2gocHJldik7XG4gICAgZWwgPSBwcmV2O1xuICB9XG4gIHJldHVybiBwcmV2RWxzO1xufVxuZnVuY3Rpb24gZWxlbWVudE5leHRBbGwoZWwsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IG5leHRFbHMgPSBbXTtcbiAgd2hpbGUgKGVsLm5leHRFbGVtZW50U2libGluZykge1xuICAgIGNvbnN0IG5leHQgPSBlbC5uZXh0RWxlbWVudFNpYmxpbmc7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmIChuZXh0Lm1hdGNoZXMoc2VsZWN0b3IpKSBuZXh0RWxzLnB1c2gobmV4dCk7XG4gICAgfSBlbHNlIG5leHRFbHMucHVzaChuZXh0KTtcbiAgICBlbCA9IG5leHQ7XG4gIH1cbiAgcmV0dXJuIG5leHRFbHM7XG59XG5mdW5jdGlvbiBlbGVtZW50U3R5bGUoZWwsIHByb3ApIHtcbiAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wKTtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRJbmRleChlbCkge1xuICBsZXQgY2hpbGQgPSBlbDtcbiAgbGV0IGk7XG4gIGlmIChjaGlsZCkge1xuICAgIGkgPSAwO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHdoaWxlICgoY2hpbGQgPSBjaGlsZC5wcmV2aW91c1NpYmxpbmcpICE9PSBudWxsKSB7XG4gICAgICBpZiAoY2hpbGQubm9kZVR5cGUgPT09IDEpIGkgKz0gMTtcbiAgICB9XG4gICAgcmV0dXJuIGk7XG4gIH1cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbmZ1bmN0aW9uIGVsZW1lbnRQYXJlbnRzKGVsLCBzZWxlY3Rvcikge1xuICBjb25zdCBwYXJlbnRzID0gW107IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgbGV0IHBhcmVudCA9IGVsLnBhcmVudEVsZW1lbnQ7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgd2hpbGUgKHBhcmVudCkge1xuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgaWYgKHBhcmVudC5tYXRjaGVzKHNlbGVjdG9yKSkgcGFyZW50cy5wdXNoKHBhcmVudCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgIH1cbiAgICBwYXJlbnQgPSBwYXJlbnQucGFyZW50RWxlbWVudDtcbiAgfVxuICByZXR1cm4gcGFyZW50cztcbn1cbmZ1bmN0aW9uIGVsZW1lbnRUcmFuc2l0aW9uRW5kKGVsLCBjYWxsYmFjaykge1xuICBmdW5jdGlvbiBmaXJlQ2FsbEJhY2soZSkge1xuICAgIGlmIChlLnRhcmdldCAhPT0gZWwpIHJldHVybjtcbiAgICBjYWxsYmFjay5jYWxsKGVsLCBlKTtcbiAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZmlyZUNhbGxCYWNrKTtcbiAgfVxuICBpZiAoY2FsbGJhY2spIHtcbiAgICBlbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgZmlyZUNhbGxCYWNrKTtcbiAgfVxufVxuZnVuY3Rpb24gZWxlbWVudE91dGVyU2l6ZShlbCwgc2l6ZSwgaW5jbHVkZU1hcmdpbnMpIHtcbiAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gIGlmIChpbmNsdWRlTWFyZ2lucykge1xuICAgIHJldHVybiBlbFtzaXplID09PSAnd2lkdGgnID8gJ29mZnNldFdpZHRoJyA6ICdvZmZzZXRIZWlnaHQnXSArIHBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUoc2l6ZSA9PT0gJ3dpZHRoJyA/ICdtYXJnaW4tcmlnaHQnIDogJ21hcmdpbi10b3AnKSkgKyBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHNpemUgPT09ICd3aWR0aCcgPyAnbWFyZ2luLWxlZnQnIDogJ21hcmdpbi1ib3R0b20nKSk7XG4gIH1cbiAgcmV0dXJuIGVsLm9mZnNldFdpZHRoO1xufVxuXG5leHBvcnQgeyBlbGVtZW50UGFyZW50cyBhcyBhLCBlbGVtZW50T2Zmc2V0IGFzIGIsIGNyZWF0ZUVsZW1lbnQgYXMgYywgbm93IGFzIGQsIGVsZW1lbnRDaGlsZHJlbiBhcyBlLCBlbGVtZW50T3V0ZXJTaXplIGFzIGYsIGVsZW1lbnRJbmRleCBhcyBnLCBjbGFzc2VzVG9Ub2tlbnMgYXMgaCwgZ2V0VHJhbnNsYXRlIGFzIGksIGVsZW1lbnRUcmFuc2l0aW9uRW5kIGFzIGosIGlzT2JqZWN0IGFzIGssIGdldFNsaWRlVHJhbnNmb3JtRWwgYXMgbCwgZWxlbWVudFN0eWxlIGFzIG0sIG5leHRUaWNrIGFzIG4sIGVsZW1lbnROZXh0QWxsIGFzIG8sIGVsZW1lbnRQcmV2QWxsIGFzIHAsIGFuaW1hdGVDU1NNb2RlU2Nyb2xsIGFzIHEsIHNob3dXYXJuaW5nIGFzIHIsIHNldENTU1Byb3BlcnR5IGFzIHMsIGV4dGVuZCBhcyB0LCBkZWxldGVQcm9wcyBhcyB1IH07XG4iLCAiaW1wb3J0IHsgYSBhcyBnZXRXaW5kb3csIGcgYXMgZ2V0RG9jdW1lbnQgfSBmcm9tICcuL3Nzci13aW5kb3cuZXNtLm1qcyc7XG5pbXBvcnQgeyBhIGFzIGVsZW1lbnRQYXJlbnRzLCBtIGFzIGVsZW1lbnRTdHlsZSwgZSBhcyBlbGVtZW50Q2hpbGRyZW4sIHMgYXMgc2V0Q1NTUHJvcGVydHksIGYgYXMgZWxlbWVudE91dGVyU2l6ZSwgbyBhcyBlbGVtZW50TmV4dEFsbCwgcCBhcyBlbGVtZW50UHJldkFsbCwgaSBhcyBnZXRUcmFuc2xhdGUsIHEgYXMgYW5pbWF0ZUNTU01vZGVTY3JvbGwsIG4gYXMgbmV4dFRpY2ssIHIgYXMgc2hvd1dhcm5pbmcsIGMgYXMgY3JlYXRlRWxlbWVudCwgZCBhcyBub3csIHQgYXMgZXh0ZW5kLCBnIGFzIGVsZW1lbnRJbmRleCwgdSBhcyBkZWxldGVQcm9wcyB9IGZyb20gJy4vdXRpbHMubWpzJztcblxubGV0IHN1cHBvcnQ7XG5mdW5jdGlvbiBjYWxjU3VwcG9ydCgpIHtcbiAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgcmV0dXJuIHtcbiAgICBzbW9vdGhTY3JvbGw6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUgJiYgJ3Njcm9sbEJlaGF2aW9yJyBpbiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc3R5bGUsXG4gICAgdG91Y2g6ICEhKCdvbnRvdWNoc3RhcnQnIGluIHdpbmRvdyB8fCB3aW5kb3cuRG9jdW1lbnRUb3VjaCAmJiBkb2N1bWVudCBpbnN0YW5jZW9mIHdpbmRvdy5Eb2N1bWVudFRvdWNoKVxuICB9O1xufVxuZnVuY3Rpb24gZ2V0U3VwcG9ydCgpIHtcbiAgaWYgKCFzdXBwb3J0KSB7XG4gICAgc3VwcG9ydCA9IGNhbGNTdXBwb3J0KCk7XG4gIH1cbiAgcmV0dXJuIHN1cHBvcnQ7XG59XG5cbmxldCBkZXZpY2VDYWNoZWQ7XG5mdW5jdGlvbiBjYWxjRGV2aWNlKF90ZW1wKSB7XG4gIGxldCB7XG4gICAgdXNlckFnZW50XG4gIH0gPSBfdGVtcCA9PT0gdm9pZCAwID8ge30gOiBfdGVtcDtcbiAgY29uc3Qgc3VwcG9ydCA9IGdldFN1cHBvcnQoKTtcbiAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IHBsYXRmb3JtID0gd2luZG93Lm5hdmlnYXRvci5wbGF0Zm9ybTtcbiAgY29uc3QgdWEgPSB1c2VyQWdlbnQgfHwgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ7XG4gIGNvbnN0IGRldmljZSA9IHtcbiAgICBpb3M6IGZhbHNlLFxuICAgIGFuZHJvaWQ6IGZhbHNlXG4gIH07XG4gIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LnNjcmVlbi53aWR0aDtcbiAgY29uc3Qgc2NyZWVuSGVpZ2h0ID0gd2luZG93LnNjcmVlbi5oZWlnaHQ7XG4gIGNvbnN0IGFuZHJvaWQgPSB1YS5tYXRjaCgvKEFuZHJvaWQpOz9bXFxzXFwvXSsoW1xcZC5dKyk/Lyk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgbGV0IGlwYWQgPSB1YS5tYXRjaCgvKGlQYWQpLipPU1xccyhbXFxkX10rKS8pO1xuICBjb25zdCBpcG9kID0gdWEubWF0Y2goLyhpUG9kKSguKk9TXFxzKFtcXGRfXSspKT8vKTtcbiAgY29uc3QgaXBob25lID0gIWlwYWQgJiYgdWEubWF0Y2goLyhpUGhvbmVcXHNPU3xpT1MpXFxzKFtcXGRfXSspLyk7XG4gIGNvbnN0IHdpbmRvd3MgPSBwbGF0Zm9ybSA9PT0gJ1dpbjMyJztcbiAgbGV0IG1hY29zID0gcGxhdGZvcm0gPT09ICdNYWNJbnRlbCc7XG5cbiAgLy8gaVBhZE9zIDEzIGZpeFxuICBjb25zdCBpUGFkU2NyZWVucyA9IFsnMTAyNHgxMzY2JywgJzEzNjZ4MTAyNCcsICc4MzR4MTE5NCcsICcxMTk0eDgzNCcsICc4MzR4MTExMicsICcxMTEyeDgzNCcsICc3Njh4MTAyNCcsICcxMDI0eDc2OCcsICc4MjB4MTE4MCcsICcxMTgweDgyMCcsICc4MTB4MTA4MCcsICcxMDgweDgxMCddO1xuICBpZiAoIWlwYWQgJiYgbWFjb3MgJiYgc3VwcG9ydC50b3VjaCAmJiBpUGFkU2NyZWVucy5pbmRleE9mKGAke3NjcmVlbldpZHRofXgke3NjcmVlbkhlaWdodH1gKSA+PSAwKSB7XG4gICAgaXBhZCA9IHVhLm1hdGNoKC8oVmVyc2lvbilcXC8oW1xcZC5dKykvKTtcbiAgICBpZiAoIWlwYWQpIGlwYWQgPSBbMCwgMSwgJzEzXzBfMCddO1xuICAgIG1hY29zID0gZmFsc2U7XG4gIH1cblxuICAvLyBBbmRyb2lkXG4gIGlmIChhbmRyb2lkICYmICF3aW5kb3dzKSB7XG4gICAgZGV2aWNlLm9zID0gJ2FuZHJvaWQnO1xuICAgIGRldmljZS5hbmRyb2lkID0gdHJ1ZTtcbiAgfVxuICBpZiAoaXBhZCB8fCBpcGhvbmUgfHwgaXBvZCkge1xuICAgIGRldmljZS5vcyA9ICdpb3MnO1xuICAgIGRldmljZS5pb3MgPSB0cnVlO1xuICB9XG5cbiAgLy8gRXhwb3J0IG9iamVjdFxuICByZXR1cm4gZGV2aWNlO1xufVxuZnVuY3Rpb24gZ2V0RGV2aWNlKG92ZXJyaWRlcykge1xuICBpZiAob3ZlcnJpZGVzID09PSB2b2lkIDApIHtcbiAgICBvdmVycmlkZXMgPSB7fTtcbiAgfVxuICBpZiAoIWRldmljZUNhY2hlZCkge1xuICAgIGRldmljZUNhY2hlZCA9IGNhbGNEZXZpY2Uob3ZlcnJpZGVzKTtcbiAgfVxuICByZXR1cm4gZGV2aWNlQ2FjaGVkO1xufVxuXG5sZXQgYnJvd3NlcjtcbmZ1bmN0aW9uIGNhbGNCcm93c2VyKCkge1xuICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgbGV0IG5lZWRQZXJzcGVjdGl2ZUZpeCA9IGZhbHNlO1xuICBmdW5jdGlvbiBpc1NhZmFyaSgpIHtcbiAgICBjb25zdCB1YSA9IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCk7XG4gICAgcmV0dXJuIHVhLmluZGV4T2YoJ3NhZmFyaScpID49IDAgJiYgdWEuaW5kZXhPZignY2hyb21lJykgPCAwICYmIHVhLmluZGV4T2YoJ2FuZHJvaWQnKSA8IDA7XG4gIH1cbiAgaWYgKGlzU2FmYXJpKCkpIHtcbiAgICBjb25zdCB1YSA9IFN0cmluZyh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgaWYgKHVhLmluY2x1ZGVzKCdWZXJzaW9uLycpKSB7XG4gICAgICBjb25zdCBbbWFqb3IsIG1pbm9yXSA9IHVhLnNwbGl0KCdWZXJzaW9uLycpWzFdLnNwbGl0KCcgJylbMF0uc3BsaXQoJy4nKS5tYXAobnVtID0+IE51bWJlcihudW0pKTtcbiAgICAgIG5lZWRQZXJzcGVjdGl2ZUZpeCA9IG1ham9yIDwgMTYgfHwgbWFqb3IgPT09IDE2ICYmIG1pbm9yIDwgMjtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBpc1NhZmFyaTogbmVlZFBlcnNwZWN0aXZlRml4IHx8IGlzU2FmYXJpKCksXG4gICAgbmVlZFBlcnNwZWN0aXZlRml4LFxuICAgIGlzV2ViVmlldzogLyhpUGhvbmV8aVBvZHxpUGFkKS4qQXBwbGVXZWJLaXQoPyEuKlNhZmFyaSkvaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KVxuICB9O1xufVxuZnVuY3Rpb24gZ2V0QnJvd3NlcigpIHtcbiAgaWYgKCFicm93c2VyKSB7XG4gICAgYnJvd3NlciA9IGNhbGNCcm93c2VyKCk7XG4gIH1cbiAgcmV0dXJuIGJyb3dzZXI7XG59XG5cbmZ1bmN0aW9uIFJlc2l6ZShfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIG9uLFxuICAgIGVtaXRcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICBsZXQgb2JzZXJ2ZXIgPSBudWxsO1xuICBsZXQgYW5pbWF0aW9uRnJhbWUgPSBudWxsO1xuICBjb25zdCByZXNpemVIYW5kbGVyID0gKCkgPT4ge1xuICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5pbml0aWFsaXplZCkgcmV0dXJuO1xuICAgIGVtaXQoJ2JlZm9yZVJlc2l6ZScpO1xuICAgIGVtaXQoJ3Jlc2l6ZScpO1xuICB9O1xuICBjb25zdCBjcmVhdGVPYnNlcnZlciA9ICgpID0+IHtcbiAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuaW5pdGlhbGl6ZWQpIHJldHVybjtcbiAgICBvYnNlcnZlciA9IG5ldyBSZXNpemVPYnNlcnZlcihlbnRyaWVzID0+IHtcbiAgICAgIGFuaW1hdGlvbkZyYW1lID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICBoZWlnaHRcbiAgICAgICAgfSA9IHN3aXBlcjtcbiAgICAgICAgbGV0IG5ld1dpZHRoID0gd2lkdGg7XG4gICAgICAgIGxldCBuZXdIZWlnaHQgPSBoZWlnaHQ7XG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChfcmVmMiA9PiB7XG4gICAgICAgICAgbGV0IHtcbiAgICAgICAgICAgIGNvbnRlbnRCb3hTaXplLFxuICAgICAgICAgICAgY29udGVudFJlY3QsXG4gICAgICAgICAgICB0YXJnZXRcbiAgICAgICAgICB9ID0gX3JlZjI7XG4gICAgICAgICAgaWYgKHRhcmdldCAmJiB0YXJnZXQgIT09IHN3aXBlci5lbCkgcmV0dXJuO1xuICAgICAgICAgIG5ld1dpZHRoID0gY29udGVudFJlY3QgPyBjb250ZW50UmVjdC53aWR0aCA6IChjb250ZW50Qm94U2l6ZVswXSB8fCBjb250ZW50Qm94U2l6ZSkuaW5saW5lU2l6ZTtcbiAgICAgICAgICBuZXdIZWlnaHQgPSBjb250ZW50UmVjdCA/IGNvbnRlbnRSZWN0LmhlaWdodCA6IChjb250ZW50Qm94U2l6ZVswXSB8fCBjb250ZW50Qm94U2l6ZSkuYmxvY2tTaXplO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKG5ld1dpZHRoICE9PSB3aWR0aCB8fCBuZXdIZWlnaHQgIT09IGhlaWdodCkge1xuICAgICAgICAgIHJlc2l6ZUhhbmRsZXIoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZShzd2lwZXIuZWwpO1xuICB9O1xuICBjb25zdCByZW1vdmVPYnNlcnZlciA9ICgpID0+IHtcbiAgICBpZiAoYW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZShhbmltYXRpb25GcmFtZSk7XG4gICAgfVxuICAgIGlmIChvYnNlcnZlciAmJiBvYnNlcnZlci51bm9ic2VydmUgJiYgc3dpcGVyLmVsKSB7XG4gICAgICBvYnNlcnZlci51bm9ic2VydmUoc3dpcGVyLmVsKTtcbiAgICAgIG9ic2VydmVyID0gbnVsbDtcbiAgICB9XG4gIH07XG4gIGNvbnN0IG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlciA9ICgpID0+IHtcbiAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuaW5pdGlhbGl6ZWQpIHJldHVybjtcbiAgICBlbWl0KCdvcmllbnRhdGlvbmNoYW5nZScpO1xuICB9O1xuICBvbignaW5pdCcsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5yZXNpemVPYnNlcnZlciAmJiB0eXBlb2Ygd2luZG93LlJlc2l6ZU9ic2VydmVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY3JlYXRlT2JzZXJ2ZXIoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHJlc2l6ZUhhbmRsZXIpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcik7XG4gIH0pO1xuICBvbignZGVzdHJveScsICgpID0+IHtcbiAgICByZW1vdmVPYnNlcnZlcigpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVIYW5kbGVyKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gT2JzZXJ2ZXIoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBleHRlbmRQYXJhbXMsXG4gICAgb24sXG4gICAgZW1pdFxuICB9ID0gX3JlZjtcbiAgY29uc3Qgb2JzZXJ2ZXJzID0gW107XG4gIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICBjb25zdCBhdHRhY2ggPSBmdW5jdGlvbiAodGFyZ2V0LCBvcHRpb25zKSB7XG4gICAgaWYgKG9wdGlvbnMgPT09IHZvaWQgMCkge1xuICAgICAgb3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBPYnNlcnZlckZ1bmMgPSB3aW5kb3cuTXV0YXRpb25PYnNlcnZlciB8fCB3aW5kb3cuV2Via2l0TXV0YXRpb25PYnNlcnZlcjtcbiAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBPYnNlcnZlckZ1bmMobXV0YXRpb25zID0+IHtcbiAgICAgIC8vIFRoZSBvYnNlcnZlclVwZGF0ZSBldmVudCBzaG91bGQgb25seSBiZSB0cmlnZ2VyZWRcbiAgICAgIC8vIG9uY2UgZGVzcGl0ZSB0aGUgbnVtYmVyIG9mIG11dGF0aW9ucy4gIEFkZGl0aW9uYWxcbiAgICAgIC8vIHRyaWdnZXJzIGFyZSByZWR1bmRhbnQgYW5kIGFyZSB2ZXJ5IGNvc3RseVxuICAgICAgaWYgKHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fKSByZXR1cm47XG4gICAgICBpZiAobXV0YXRpb25zLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICBlbWl0KCdvYnNlcnZlclVwZGF0ZScsIG11dGF0aW9uc1swXSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9ic2VydmVyVXBkYXRlID0gZnVuY3Rpb24gb2JzZXJ2ZXJVcGRhdGUoKSB7XG4gICAgICAgIGVtaXQoJ29ic2VydmVyVXBkYXRlJywgbXV0YXRpb25zWzBdKTtcbiAgICAgIH07XG4gICAgICBpZiAod2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSkge1xuICAgICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKG9ic2VydmVyVXBkYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KG9ic2VydmVyVXBkYXRlLCAwKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBvYnNlcnZlci5vYnNlcnZlKHRhcmdldCwge1xuICAgICAgYXR0cmlidXRlczogdHlwZW9mIG9wdGlvbnMuYXR0cmlidXRlcyA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogb3B0aW9ucy5hdHRyaWJ1dGVzLFxuICAgICAgY2hpbGRMaXN0OiB0eXBlb2Ygb3B0aW9ucy5jaGlsZExpc3QgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IG9wdGlvbnMuY2hpbGRMaXN0LFxuICAgICAgY2hhcmFjdGVyRGF0YTogdHlwZW9mIG9wdGlvbnMuY2hhcmFjdGVyRGF0YSA9PT0gJ3VuZGVmaW5lZCcgPyB0cnVlIDogb3B0aW9ucy5jaGFyYWN0ZXJEYXRhXG4gICAgfSk7XG4gICAgb2JzZXJ2ZXJzLnB1c2gob2JzZXJ2ZXIpO1xuICB9O1xuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5vYnNlcnZlcikgcmV0dXJuO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLm9ic2VydmVQYXJlbnRzKSB7XG4gICAgICBjb25zdCBjb250YWluZXJQYXJlbnRzID0gZWxlbWVudFBhcmVudHMoc3dpcGVyLmhvc3RFbCk7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNvbnRhaW5lclBhcmVudHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgYXR0YWNoKGNvbnRhaW5lclBhcmVudHNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBPYnNlcnZlIGNvbnRhaW5lclxuICAgIGF0dGFjaChzd2lwZXIuaG9zdEVsLCB7XG4gICAgICBjaGlsZExpc3Q6IHN3aXBlci5wYXJhbXMub2JzZXJ2ZVNsaWRlQ2hpbGRyZW5cbiAgICB9KTtcblxuICAgIC8vIE9ic2VydmUgd3JhcHBlclxuICAgIGF0dGFjaChzd2lwZXIud3JhcHBlckVsLCB7XG4gICAgICBhdHRyaWJ1dGVzOiBmYWxzZVxuICAgIH0pO1xuICB9O1xuICBjb25zdCBkZXN0cm95ID0gKCkgPT4ge1xuICAgIG9ic2VydmVycy5mb3JFYWNoKG9ic2VydmVyID0+IHtcbiAgICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcbiAgICBvYnNlcnZlcnMuc3BsaWNlKDAsIG9ic2VydmVycy5sZW5ndGgpO1xuICB9O1xuICBleHRlbmRQYXJhbXMoe1xuICAgIG9ic2VydmVyOiBmYWxzZSxcbiAgICBvYnNlcnZlUGFyZW50czogZmFsc2UsXG4gICAgb2JzZXJ2ZVNsaWRlQ2hpbGRyZW46IGZhbHNlXG4gIH0pO1xuICBvbignaW5pdCcsIGluaXQpO1xuICBvbignZGVzdHJveScsIGRlc3Ryb3kpO1xufVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby11bmRlcnNjb3JlLWRhbmdsZSAqL1xuXG52YXIgZXZlbnRzRW1pdHRlciA9IHtcbiAgb24oZXZlbnRzLCBoYW5kbGVyLCBwcmlvcml0eSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHNlbGY7XG4gICAgY29uc3QgbWV0aG9kID0gcHJpb3JpdHkgPyAndW5zaGlmdCcgOiAncHVzaCc7XG4gICAgZXZlbnRzLnNwbGl0KCcgJykuZm9yRWFjaChldmVudCA9PiB7XG4gICAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XSkgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdID0gW107XG4gICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF1bbWV0aG9kXShoYW5kbGVyKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfSxcbiAgb25jZShldmVudHMsIGhhbmRsZXIsIHByaW9yaXR5KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gc2VsZjtcbiAgICBmdW5jdGlvbiBvbmNlSGFuZGxlcigpIHtcbiAgICAgIHNlbGYub2ZmKGV2ZW50cywgb25jZUhhbmRsZXIpO1xuICAgICAgaWYgKG9uY2VIYW5kbGVyLl9fZW1pdHRlclByb3h5KSB7XG4gICAgICAgIGRlbGV0ZSBvbmNlSGFuZGxlci5fX2VtaXR0ZXJQcm94eTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4pLCBfa2V5ID0gMDsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgfVxuICAgICAgaGFuZGxlci5hcHBseShzZWxmLCBhcmdzKTtcbiAgICB9XG4gICAgb25jZUhhbmRsZXIuX19lbWl0dGVyUHJveHkgPSBoYW5kbGVyO1xuICAgIHJldHVybiBzZWxmLm9uKGV2ZW50cywgb25jZUhhbmRsZXIsIHByaW9yaXR5KTtcbiAgfSxcbiAgb25BbnkoaGFuZGxlciwgcHJpb3JpdHkpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHJldHVybiBzZWxmO1xuICAgIGNvbnN0IG1ldGhvZCA9IHByaW9yaXR5ID8gJ3Vuc2hpZnQnIDogJ3B1c2gnO1xuICAgIGlmIChzZWxmLmV2ZW50c0FueUxpc3RlbmVycy5pbmRleE9mKGhhbmRsZXIpIDwgMCkge1xuICAgICAgc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnNbbWV0aG9kXShoYW5kbGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG4gIH0sXG4gIG9mZkFueShoYW5kbGVyKSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgaWYgKCFzZWxmLmV2ZW50c0FueUxpc3RlbmVycykgcmV0dXJuIHNlbGY7XG4gICAgY29uc3QgaW5kZXggPSBzZWxmLmV2ZW50c0FueUxpc3RlbmVycy5pbmRleE9mKGhhbmRsZXIpO1xuICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICBzZWxmLmV2ZW50c0FueUxpc3RlbmVycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZjtcbiAgfSxcbiAgb2ZmKGV2ZW50cywgaGFuZGxlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMpIHJldHVybiBzZWxmO1xuICAgIGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBoYW5kbGVyID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0gPSBbXTtcbiAgICAgIH0gZWxzZSBpZiAoc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdKSB7XG4gICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XS5mb3JFYWNoKChldmVudEhhbmRsZXIsIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGV2ZW50SGFuZGxlciA9PT0gaGFuZGxlciB8fCBldmVudEhhbmRsZXIuX19lbWl0dGVyUHJveHkgJiYgZXZlbnRIYW5kbGVyLl9fZW1pdHRlclByb3h5ID09PSBoYW5kbGVyKSB7XG4gICAgICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0uc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzZWxmO1xuICB9LFxuICBlbWl0KCkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMpIHJldHVybiBzZWxmO1xuICAgIGxldCBldmVudHM7XG4gICAgbGV0IGRhdGE7XG4gICAgbGV0IGNvbnRleHQ7XG4gICAgZm9yICh2YXIgX2xlbjIgPSBhcmd1bWVudHMubGVuZ3RoLCBhcmdzID0gbmV3IEFycmF5KF9sZW4yKSwgX2tleTIgPSAwOyBfa2V5MiA8IF9sZW4yOyBfa2V5MisrKSB7XG4gICAgICBhcmdzW19rZXkyXSA9IGFyZ3VtZW50c1tfa2V5Ml07XG4gICAgfVxuICAgIGlmICh0eXBlb2YgYXJnc1swXSA9PT0gJ3N0cmluZycgfHwgQXJyYXkuaXNBcnJheShhcmdzWzBdKSkge1xuICAgICAgZXZlbnRzID0gYXJnc1swXTtcbiAgICAgIGRhdGEgPSBhcmdzLnNsaWNlKDEsIGFyZ3MubGVuZ3RoKTtcbiAgICAgIGNvbnRleHQgPSBzZWxmO1xuICAgIH0gZWxzZSB7XG4gICAgICBldmVudHMgPSBhcmdzWzBdLmV2ZW50cztcbiAgICAgIGRhdGEgPSBhcmdzWzBdLmRhdGE7XG4gICAgICBjb250ZXh0ID0gYXJnc1swXS5jb250ZXh0IHx8IHNlbGY7XG4gICAgfVxuICAgIGRhdGEudW5zaGlmdChjb250ZXh0KTtcbiAgICBjb25zdCBldmVudHNBcnJheSA9IEFycmF5LmlzQXJyYXkoZXZlbnRzKSA/IGV2ZW50cyA6IGV2ZW50cy5zcGxpdCgnICcpO1xuICAgIGV2ZW50c0FycmF5LmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgaWYgKHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzICYmIHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzLmxlbmd0aCkge1xuICAgICAgICBzZWxmLmV2ZW50c0FueUxpc3RlbmVycy5mb3JFYWNoKGV2ZW50SGFuZGxlciA9PiB7XG4gICAgICAgICAgZXZlbnRIYW5kbGVyLmFwcGx5KGNvbnRleHQsIFtldmVudCwgLi4uZGF0YV0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChzZWxmLmV2ZW50c0xpc3RlbmVycyAmJiBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0pIHtcbiAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdLmZvckVhY2goZXZlbnRIYW5kbGVyID0+IHtcbiAgICAgICAgICBldmVudEhhbmRsZXIuYXBwbHkoY29udGV4dCwgZGF0YSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBzZWxmO1xuICB9XG59O1xuXG5mdW5jdGlvbiB1cGRhdGVTaXplKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBsZXQgd2lkdGg7XG4gIGxldCBoZWlnaHQ7XG4gIGNvbnN0IGVsID0gc3dpcGVyLmVsO1xuICBpZiAodHlwZW9mIHN3aXBlci5wYXJhbXMud2lkdGggIT09ICd1bmRlZmluZWQnICYmIHN3aXBlci5wYXJhbXMud2lkdGggIT09IG51bGwpIHtcbiAgICB3aWR0aCA9IHN3aXBlci5wYXJhbXMud2lkdGg7XG4gIH0gZWxzZSB7XG4gICAgd2lkdGggPSBlbC5jbGllbnRXaWR0aDtcbiAgfVxuICBpZiAodHlwZW9mIHN3aXBlci5wYXJhbXMuaGVpZ2h0ICE9PSAndW5kZWZpbmVkJyAmJiBzd2lwZXIucGFyYW1zLmhlaWdodCAhPT0gbnVsbCkge1xuICAgIGhlaWdodCA9IHN3aXBlci5wYXJhbXMuaGVpZ2h0O1xuICB9IGVsc2Uge1xuICAgIGhlaWdodCA9IGVsLmNsaWVudEhlaWdodDtcbiAgfVxuICBpZiAod2lkdGggPT09IDAgJiYgc3dpcGVyLmlzSG9yaXpvbnRhbCgpIHx8IGhlaWdodCA9PT0gMCAmJiBzd2lwZXIuaXNWZXJ0aWNhbCgpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gU3VidHJhY3QgcGFkZGluZ3NcbiAgd2lkdGggPSB3aWR0aCAtIHBhcnNlSW50KGVsZW1lbnRTdHlsZShlbCwgJ3BhZGRpbmctbGVmdCcpIHx8IDAsIDEwKSAtIHBhcnNlSW50KGVsZW1lbnRTdHlsZShlbCwgJ3BhZGRpbmctcmlnaHQnKSB8fCAwLCAxMCk7XG4gIGhlaWdodCA9IGhlaWdodCAtIHBhcnNlSW50KGVsZW1lbnRTdHlsZShlbCwgJ3BhZGRpbmctdG9wJykgfHwgMCwgMTApIC0gcGFyc2VJbnQoZWxlbWVudFN0eWxlKGVsLCAncGFkZGluZy1ib3R0b20nKSB8fCAwLCAxMCk7XG4gIGlmIChOdW1iZXIuaXNOYU4od2lkdGgpKSB3aWR0aCA9IDA7XG4gIGlmIChOdW1iZXIuaXNOYU4oaGVpZ2h0KSkgaGVpZ2h0ID0gMDtcbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICB3aWR0aCxcbiAgICBoZWlnaHQsXG4gICAgc2l6ZTogc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gd2lkdGggOiBoZWlnaHRcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNsaWRlcygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgZnVuY3Rpb24gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShub2RlLCBsYWJlbCkge1xuICAgIHJldHVybiBwYXJzZUZsb2F0KG5vZGUuZ2V0UHJvcGVydHlWYWx1ZShzd2lwZXIuZ2V0RGlyZWN0aW9uTGFiZWwobGFiZWwpKSB8fCAwKTtcbiAgfVxuICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICBjb25zdCB7XG4gICAgd3JhcHBlckVsLFxuICAgIHNsaWRlc0VsLFxuICAgIHNpemU6IHN3aXBlclNpemUsXG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgd3JvbmdSVExcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgY29uc3QgcHJldmlvdXNTbGlkZXNMZW5ndGggPSBpc1ZpcnR1YWwgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIDogc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG4gIGNvbnN0IHNsaWRlcyA9IGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApO1xuICBjb25zdCBzbGlkZXNMZW5ndGggPSBpc1ZpcnR1YWwgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIDogc2xpZGVzLmxlbmd0aDtcbiAgbGV0IHNuYXBHcmlkID0gW107XG4gIGNvbnN0IHNsaWRlc0dyaWQgPSBbXTtcbiAgY29uc3Qgc2xpZGVzU2l6ZXNHcmlkID0gW107XG4gIGxldCBvZmZzZXRCZWZvcmUgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QmVmb3JlO1xuICBpZiAodHlwZW9mIG9mZnNldEJlZm9yZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9mZnNldEJlZm9yZSA9IHBhcmFtcy5zbGlkZXNPZmZzZXRCZWZvcmUuY2FsbChzd2lwZXIpO1xuICB9XG4gIGxldCBvZmZzZXRBZnRlciA9IHBhcmFtcy5zbGlkZXNPZmZzZXRBZnRlcjtcbiAgaWYgKHR5cGVvZiBvZmZzZXRBZnRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9mZnNldEFmdGVyID0gcGFyYW1zLnNsaWRlc09mZnNldEFmdGVyLmNhbGwoc3dpcGVyKTtcbiAgfVxuICBjb25zdCBwcmV2aW91c1NuYXBHcmlkTGVuZ3RoID0gc3dpcGVyLnNuYXBHcmlkLmxlbmd0aDtcbiAgY29uc3QgcHJldmlvdXNTbGlkZXNHcmlkTGVuZ3RoID0gc3dpcGVyLnNsaWRlc0dyaWQubGVuZ3RoO1xuICBsZXQgc3BhY2VCZXR3ZWVuID0gcGFyYW1zLnNwYWNlQmV0d2VlbjtcbiAgbGV0IHNsaWRlUG9zaXRpb24gPSAtb2Zmc2V0QmVmb3JlO1xuICBsZXQgcHJldlNsaWRlU2l6ZSA9IDA7XG4gIGxldCBpbmRleCA9IDA7XG4gIGlmICh0eXBlb2Ygc3dpcGVyU2l6ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHR5cGVvZiBzcGFjZUJldHdlZW4gPT09ICdzdHJpbmcnICYmIHNwYWNlQmV0d2Vlbi5pbmRleE9mKCclJykgPj0gMCkge1xuICAgIHNwYWNlQmV0d2VlbiA9IHBhcnNlRmxvYXQoc3BhY2VCZXR3ZWVuLnJlcGxhY2UoJyUnLCAnJykpIC8gMTAwICogc3dpcGVyU2l6ZTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc3BhY2VCZXR3ZWVuID09PSAnc3RyaW5nJykge1xuICAgIHNwYWNlQmV0d2VlbiA9IHBhcnNlRmxvYXQoc3BhY2VCZXR3ZWVuKTtcbiAgfVxuICBzd2lwZXIudmlydHVhbFNpemUgPSAtc3BhY2VCZXR3ZWVuO1xuXG4gIC8vIHJlc2V0IG1hcmdpbnNcbiAgc2xpZGVzLmZvckVhY2goc2xpZGVFbCA9PiB7XG4gICAgaWYgKHJ0bCkge1xuICAgICAgc2xpZGVFbC5zdHlsZS5tYXJnaW5MZWZ0ID0gJyc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNsaWRlRWwuc3R5bGUubWFyZ2luUmlnaHQgPSAnJztcbiAgICB9XG4gICAgc2xpZGVFbC5zdHlsZS5tYXJnaW5Cb3R0b20gPSAnJztcbiAgICBzbGlkZUVsLnN0eWxlLm1hcmdpblRvcCA9ICcnO1xuICB9KTtcblxuICAvLyByZXNldCBjc3NNb2RlIG9mZnNldHNcbiAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBwYXJhbXMuY3NzTW9kZSkge1xuICAgIHNldENTU1Byb3BlcnR5KHdyYXBwZXJFbCwgJy0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1iZWZvcmUnLCAnJyk7XG4gICAgc2V0Q1NTUHJvcGVydHkod3JhcHBlckVsLCAnLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWFmdGVyJywgJycpO1xuICB9XG4gIGNvbnN0IGdyaWRFbmFibGVkID0gcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDEgJiYgc3dpcGVyLmdyaWQ7XG4gIGlmIChncmlkRW5hYmxlZCkge1xuICAgIHN3aXBlci5ncmlkLmluaXRTbGlkZXMoc2xpZGVzKTtcbiAgfSBlbHNlIGlmIChzd2lwZXIuZ3JpZCkge1xuICAgIHN3aXBlci5ncmlkLnVuc2V0U2xpZGVzKCk7XG4gIH1cblxuICAvLyBDYWxjIHNsaWRlc1xuICBsZXQgc2xpZGVTaXplO1xuICBjb25zdCBzaG91bGRSZXNldFNsaWRlU2l6ZSA9IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgJiYgcGFyYW1zLmJyZWFrcG9pbnRzICYmIE9iamVjdC5rZXlzKHBhcmFtcy5icmVha3BvaW50cykuZmlsdGVyKGtleSA9PiB7XG4gICAgcmV0dXJuIHR5cGVvZiBwYXJhbXMuYnJlYWtwb2ludHNba2V5XS5zbGlkZXNQZXJWaWV3ICE9PSAndW5kZWZpbmVkJztcbiAgfSkubGVuZ3RoID4gMDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNMZW5ndGg7IGkgKz0gMSkge1xuICAgIHNsaWRlU2l6ZSA9IDA7XG4gICAgbGV0IHNsaWRlO1xuICAgIGlmIChzbGlkZXNbaV0pIHNsaWRlID0gc2xpZGVzW2ldO1xuICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgc3dpcGVyLmdyaWQudXBkYXRlU2xpZGUoaSwgc2xpZGUsIHNsaWRlcyk7XG4gICAgfVxuICAgIGlmIChzbGlkZXNbaV0gJiYgZWxlbWVudFN0eWxlKHNsaWRlLCAnZGlzcGxheScpID09PSAnbm9uZScpIGNvbnRpbnVlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbiAgICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJykge1xuICAgICAgaWYgKHNob3VsZFJlc2V0U2xpZGVTaXplKSB7XG4gICAgICAgIHNsaWRlc1tpXS5zdHlsZVtzd2lwZXIuZ2V0RGlyZWN0aW9uTGFiZWwoJ3dpZHRoJyldID0gYGA7XG4gICAgICB9XG4gICAgICBjb25zdCBzbGlkZVN0eWxlcyA9IGdldENvbXB1dGVkU3R5bGUoc2xpZGUpO1xuICAgICAgY29uc3QgY3VycmVudFRyYW5zZm9ybSA9IHNsaWRlLnN0eWxlLnRyYW5zZm9ybTtcbiAgICAgIGNvbnN0IGN1cnJlbnRXZWJLaXRUcmFuc2Zvcm0gPSBzbGlkZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm07XG4gICAgICBpZiAoY3VycmVudFRyYW5zZm9ybSkge1xuICAgICAgICBzbGlkZS5zdHlsZS50cmFuc2Zvcm0gPSAnbm9uZSc7XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFdlYktpdFRyYW5zZm9ybSkge1xuICAgICAgICBzbGlkZS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSAnbm9uZSc7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykge1xuICAgICAgICBzbGlkZVNpemUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBlbGVtZW50T3V0ZXJTaXplKHNsaWRlLCAnd2lkdGgnLCB0cnVlKSA6IGVsZW1lbnRPdXRlclNpemUoc2xpZGUsICdoZWlnaHQnLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgICBjb25zdCB3aWR0aCA9IGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUoc2xpZGVTdHlsZXMsICd3aWR0aCcpO1xuICAgICAgICBjb25zdCBwYWRkaW5nTGVmdCA9IGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUoc2xpZGVTdHlsZXMsICdwYWRkaW5nLWxlZnQnKTtcbiAgICAgICAgY29uc3QgcGFkZGluZ1JpZ2h0ID0gZ2V0RGlyZWN0aW9uUHJvcGVydHlWYWx1ZShzbGlkZVN0eWxlcywgJ3BhZGRpbmctcmlnaHQnKTtcbiAgICAgICAgY29uc3QgbWFyZ2luTGVmdCA9IGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUoc2xpZGVTdHlsZXMsICdtYXJnaW4tbGVmdCcpO1xuICAgICAgICBjb25zdCBtYXJnaW5SaWdodCA9IGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUoc2xpZGVTdHlsZXMsICdtYXJnaW4tcmlnaHQnKTtcbiAgICAgICAgY29uc3QgYm94U2l6aW5nID0gc2xpZGVTdHlsZXMuZ2V0UHJvcGVydHlWYWx1ZSgnYm94LXNpemluZycpO1xuICAgICAgICBpZiAoYm94U2l6aW5nICYmIGJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnKSB7XG4gICAgICAgICAgc2xpZGVTaXplID0gd2lkdGggKyBtYXJnaW5MZWZ0ICsgbWFyZ2luUmlnaHQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3Qge1xuICAgICAgICAgICAgY2xpZW50V2lkdGgsXG4gICAgICAgICAgICBvZmZzZXRXaWR0aFxuICAgICAgICAgIH0gPSBzbGlkZTtcbiAgICAgICAgICBzbGlkZVNpemUgPSB3aWR0aCArIHBhZGRpbmdMZWZ0ICsgcGFkZGluZ1JpZ2h0ICsgbWFyZ2luTGVmdCArIG1hcmdpblJpZ2h0ICsgKG9mZnNldFdpZHRoIC0gY2xpZW50V2lkdGgpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoY3VycmVudFRyYW5zZm9ybSkge1xuICAgICAgICBzbGlkZS5zdHlsZS50cmFuc2Zvcm0gPSBjdXJyZW50VHJhbnNmb3JtO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRXZWJLaXRUcmFuc2Zvcm0pIHtcbiAgICAgICAgc2xpZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gY3VycmVudFdlYktpdFRyYW5zZm9ybTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZVNpemUgPSBNYXRoLmZsb29yKHNsaWRlU2l6ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNsaWRlU2l6ZSA9IChzd2lwZXJTaXplIC0gKHBhcmFtcy5zbGlkZXNQZXJWaWV3IC0gMSkgKiBzcGFjZUJldHdlZW4pIC8gcGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVTaXplID0gTWF0aC5mbG9vcihzbGlkZVNpemUpO1xuICAgICAgaWYgKHNsaWRlc1tpXSkge1xuICAgICAgICBzbGlkZXNbaV0uc3R5bGVbc3dpcGVyLmdldERpcmVjdGlvbkxhYmVsKCd3aWR0aCcpXSA9IGAke3NsaWRlU2l6ZX1weGA7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChzbGlkZXNbaV0pIHtcbiAgICAgIHNsaWRlc1tpXS5zd2lwZXJTbGlkZVNpemUgPSBzbGlkZVNpemU7XG4gICAgfVxuICAgIHNsaWRlc1NpemVzR3JpZC5wdXNoKHNsaWRlU2l6ZSk7XG4gICAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gKyBzbGlkZVNpemUgLyAyICsgcHJldlNsaWRlU2l6ZSAvIDIgKyBzcGFjZUJldHdlZW47XG4gICAgICBpZiAocHJldlNsaWRlU2l6ZSA9PT0gMCAmJiBpICE9PSAwKSBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiAtIHN3aXBlclNpemUgLyAyIC0gc3BhY2VCZXR3ZWVuO1xuICAgICAgaWYgKGkgPT09IDApIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uIC0gc3dpcGVyU2l6ZSAvIDIgLSBzcGFjZUJldHdlZW47XG4gICAgICBpZiAoTWF0aC5hYnMoc2xpZGVQb3NpdGlvbikgPCAxIC8gMTAwMCkgc2xpZGVQb3NpdGlvbiA9IDA7XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVQb3NpdGlvbiA9IE1hdGguZmxvb3Ioc2xpZGVQb3NpdGlvbik7XG4gICAgICBpZiAoaW5kZXggJSBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDApIHNuYXBHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICBzbGlkZXNHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZVBvc2l0aW9uID0gTWF0aC5mbG9vcihzbGlkZVBvc2l0aW9uKTtcbiAgICAgIGlmICgoaW5kZXggLSBNYXRoLm1pbihzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCwgaW5kZXgpKSAlIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDApIHNuYXBHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICBzbGlkZXNHcmlkLnB1c2goc2xpZGVQb3NpdGlvbik7XG4gICAgICBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiArIHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcbiAgICB9XG4gICAgc3dpcGVyLnZpcnR1YWxTaXplICs9IHNsaWRlU2l6ZSArIHNwYWNlQmV0d2VlbjtcbiAgICBwcmV2U2xpZGVTaXplID0gc2xpZGVTaXplO1xuICAgIGluZGV4ICs9IDE7XG4gIH1cbiAgc3dpcGVyLnZpcnR1YWxTaXplID0gTWF0aC5tYXgoc3dpcGVyLnZpcnR1YWxTaXplLCBzd2lwZXJTaXplKSArIG9mZnNldEFmdGVyO1xuICBpZiAocnRsICYmIHdyb25nUlRMICYmIChwYXJhbXMuZWZmZWN0ID09PSAnc2xpZGUnIHx8IHBhcmFtcy5lZmZlY3QgPT09ICdjb3ZlcmZsb3cnKSkge1xuICAgIHdyYXBwZXJFbC5zdHlsZS53aWR0aCA9IGAke3N3aXBlci52aXJ0dWFsU2l6ZSArIHNwYWNlQmV0d2Vlbn1weGA7XG4gIH1cbiAgaWYgKHBhcmFtcy5zZXRXcmFwcGVyU2l6ZSkge1xuICAgIHdyYXBwZXJFbC5zdHlsZVtzd2lwZXIuZ2V0RGlyZWN0aW9uTGFiZWwoJ3dpZHRoJyldID0gYCR7c3dpcGVyLnZpcnR1YWxTaXplICsgc3BhY2VCZXR3ZWVufXB4YDtcbiAgfVxuICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICBzd2lwZXIuZ3JpZC51cGRhdGVXcmFwcGVyU2l6ZShzbGlkZVNpemUsIHNuYXBHcmlkKTtcbiAgfVxuXG4gIC8vIFJlbW92ZSBsYXN0IGdyaWQgZWxlbWVudHMgZGVwZW5kaW5nIG9uIHdpZHRoXG4gIGlmICghcGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgY29uc3QgbmV3U2xpZGVzR3JpZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc25hcEdyaWQubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGxldCBzbGlkZXNHcmlkSXRlbSA9IHNuYXBHcmlkW2ldO1xuICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlc0dyaWRJdGVtID0gTWF0aC5mbG9vcihzbGlkZXNHcmlkSXRlbSk7XG4gICAgICBpZiAoc25hcEdyaWRbaV0gPD0gc3dpcGVyLnZpcnR1YWxTaXplIC0gc3dpcGVyU2l6ZSkge1xuICAgICAgICBuZXdTbGlkZXNHcmlkLnB1c2goc2xpZGVzR3JpZEl0ZW0pO1xuICAgICAgfVxuICAgIH1cbiAgICBzbmFwR3JpZCA9IG5ld1NsaWRlc0dyaWQ7XG4gICAgaWYgKE1hdGguZmxvb3Ioc3dpcGVyLnZpcnR1YWxTaXplIC0gc3dpcGVyU2l6ZSkgLSBNYXRoLmZsb29yKHNuYXBHcmlkW3NuYXBHcmlkLmxlbmd0aCAtIDFdKSA+IDEpIHtcbiAgICAgIHNuYXBHcmlkLnB1c2goc3dpcGVyLnZpcnR1YWxTaXplIC0gc3dpcGVyU2l6ZSk7XG4gICAgfVxuICB9XG4gIGlmIChpc1ZpcnR1YWwgJiYgcGFyYW1zLmxvb3ApIHtcbiAgICBjb25zdCBzaXplID0gc2xpZGVzU2l6ZXNHcmlkWzBdICsgc3BhY2VCZXR3ZWVuO1xuICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPiAxKSB7XG4gICAgICBjb25zdCBncm91cHMgPSBNYXRoLmNlaWwoKHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZSArIHN3aXBlci52aXJ0dWFsLnNsaWRlc0FmdGVyKSAvIHBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gICAgICBjb25zdCBncm91cFNpemUgPSBzaXplICogcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBncm91cHM7IGkgKz0gMSkge1xuICAgICAgICBzbmFwR3JpZC5wdXNoKHNuYXBHcmlkW3NuYXBHcmlkLmxlbmd0aCAtIDFdICsgZ3JvdXBTaXplKTtcbiAgICAgIH1cbiAgICB9XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmUgKyBzd2lwZXIudmlydHVhbC5zbGlkZXNBZnRlcjsgaSArPSAxKSB7XG4gICAgICBpZiAocGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAxKSB7XG4gICAgICAgIHNuYXBHcmlkLnB1c2goc25hcEdyaWRbc25hcEdyaWQubGVuZ3RoIC0gMV0gKyBzaXplKTtcbiAgICAgIH1cbiAgICAgIHNsaWRlc0dyaWQucHVzaChzbGlkZXNHcmlkW3NsaWRlc0dyaWQubGVuZ3RoIC0gMV0gKyBzaXplKTtcbiAgICAgIHN3aXBlci52aXJ0dWFsU2l6ZSArPSBzaXplO1xuICAgIH1cbiAgfVxuICBpZiAoc25hcEdyaWQubGVuZ3RoID09PSAwKSBzbmFwR3JpZCA9IFswXTtcbiAgaWYgKHNwYWNlQmV0d2VlbiAhPT0gMCkge1xuICAgIGNvbnN0IGtleSA9IHN3aXBlci5pc0hvcml6b250YWwoKSAmJiBydGwgPyAnbWFyZ2luTGVmdCcgOiBzd2lwZXIuZ2V0RGlyZWN0aW9uTGFiZWwoJ21hcmdpblJpZ2h0Jyk7XG4gICAgc2xpZGVzLmZpbHRlcigoXywgc2xpZGVJbmRleCkgPT4ge1xuICAgICAgaWYgKCFwYXJhbXMuY3NzTW9kZSB8fCBwYXJhbXMubG9vcCkgcmV0dXJuIHRydWU7XG4gICAgICBpZiAoc2xpZGVJbmRleCA9PT0gc2xpZGVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfSkuZm9yRWFjaChzbGlkZUVsID0+IHtcbiAgICAgIHNsaWRlRWwuc3R5bGVba2V5XSA9IGAke3NwYWNlQmV0d2Vlbn1weGA7XG4gICAgfSk7XG4gIH1cbiAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBwYXJhbXMuY2VudGVyZWRTbGlkZXNCb3VuZHMpIHtcbiAgICBsZXQgYWxsU2xpZGVzU2l6ZSA9IDA7XG4gICAgc2xpZGVzU2l6ZXNHcmlkLmZvckVhY2goc2xpZGVTaXplVmFsdWUgPT4ge1xuICAgICAgYWxsU2xpZGVzU2l6ZSArPSBzbGlkZVNpemVWYWx1ZSArIChzcGFjZUJldHdlZW4gfHwgMCk7XG4gICAgfSk7XG4gICAgYWxsU2xpZGVzU2l6ZSAtPSBzcGFjZUJldHdlZW47XG4gICAgY29uc3QgbWF4U25hcCA9IGFsbFNsaWRlc1NpemUgLSBzd2lwZXJTaXplO1xuICAgIHNuYXBHcmlkID0gc25hcEdyaWQubWFwKHNuYXAgPT4ge1xuICAgICAgaWYgKHNuYXAgPD0gMCkgcmV0dXJuIC1vZmZzZXRCZWZvcmU7XG4gICAgICBpZiAoc25hcCA+IG1heFNuYXApIHJldHVybiBtYXhTbmFwICsgb2Zmc2V0QWZ0ZXI7XG4gICAgICByZXR1cm4gc25hcDtcbiAgICB9KTtcbiAgfVxuICBpZiAocGFyYW1zLmNlbnRlckluc3VmZmljaWVudFNsaWRlcykge1xuICAgIGxldCBhbGxTbGlkZXNTaXplID0gMDtcbiAgICBzbGlkZXNTaXplc0dyaWQuZm9yRWFjaChzbGlkZVNpemVWYWx1ZSA9PiB7XG4gICAgICBhbGxTbGlkZXNTaXplICs9IHNsaWRlU2l6ZVZhbHVlICsgKHNwYWNlQmV0d2VlbiB8fCAwKTtcbiAgICB9KTtcbiAgICBhbGxTbGlkZXNTaXplIC09IHNwYWNlQmV0d2VlbjtcbiAgICBpZiAoYWxsU2xpZGVzU2l6ZSA8IHN3aXBlclNpemUpIHtcbiAgICAgIGNvbnN0IGFsbFNsaWRlc09mZnNldCA9IChzd2lwZXJTaXplIC0gYWxsU2xpZGVzU2l6ZSkgLyAyO1xuICAgICAgc25hcEdyaWQuZm9yRWFjaCgoc25hcCwgc25hcEluZGV4KSA9PiB7XG4gICAgICAgIHNuYXBHcmlkW3NuYXBJbmRleF0gPSBzbmFwIC0gYWxsU2xpZGVzT2Zmc2V0O1xuICAgICAgfSk7XG4gICAgICBzbGlkZXNHcmlkLmZvckVhY2goKHNuYXAsIHNuYXBJbmRleCkgPT4ge1xuICAgICAgICBzbGlkZXNHcmlkW3NuYXBJbmRleF0gPSBzbmFwICsgYWxsU2xpZGVzT2Zmc2V0O1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgc2xpZGVzLFxuICAgIHNuYXBHcmlkLFxuICAgIHNsaWRlc0dyaWQsXG4gICAgc2xpZGVzU2l6ZXNHcmlkXG4gIH0pO1xuICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHBhcmFtcy5jc3NNb2RlICYmICFwYXJhbXMuY2VudGVyZWRTbGlkZXNCb3VuZHMpIHtcbiAgICBzZXRDU1NQcm9wZXJ0eSh3cmFwcGVyRWwsICctLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYmVmb3JlJywgYCR7LXNuYXBHcmlkWzBdfXB4YCk7XG4gICAgc2V0Q1NTUHJvcGVydHkod3JhcHBlckVsLCAnLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWFmdGVyJywgYCR7c3dpcGVyLnNpemUgLyAyIC0gc2xpZGVzU2l6ZXNHcmlkW3NsaWRlc1NpemVzR3JpZC5sZW5ndGggLSAxXSAvIDJ9cHhgKTtcbiAgICBjb25zdCBhZGRUb1NuYXBHcmlkID0gLXN3aXBlci5zbmFwR3JpZFswXTtcbiAgICBjb25zdCBhZGRUb1NsaWRlc0dyaWQgPSAtc3dpcGVyLnNsaWRlc0dyaWRbMF07XG4gICAgc3dpcGVyLnNuYXBHcmlkID0gc3dpcGVyLnNuYXBHcmlkLm1hcCh2ID0+IHYgKyBhZGRUb1NuYXBHcmlkKTtcbiAgICBzd2lwZXIuc2xpZGVzR3JpZCA9IHN3aXBlci5zbGlkZXNHcmlkLm1hcCh2ID0+IHYgKyBhZGRUb1NsaWRlc0dyaWQpO1xuICB9XG4gIGlmIChzbGlkZXNMZW5ndGggIT09IHByZXZpb3VzU2xpZGVzTGVuZ3RoKSB7XG4gICAgc3dpcGVyLmVtaXQoJ3NsaWRlc0xlbmd0aENoYW5nZScpO1xuICB9XG4gIGlmIChzbmFwR3JpZC5sZW5ndGggIT09IHByZXZpb3VzU25hcEdyaWRMZW5ndGgpIHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93KSBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICAgIHN3aXBlci5lbWl0KCdzbmFwR3JpZExlbmd0aENoYW5nZScpO1xuICB9XG4gIGlmIChzbGlkZXNHcmlkLmxlbmd0aCAhPT0gcHJldmlvdXNTbGlkZXNHcmlkTGVuZ3RoKSB7XG4gICAgc3dpcGVyLmVtaXQoJ3NsaWRlc0dyaWRMZW5ndGhDaGFuZ2UnKTtcbiAgfVxuICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MpIHtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzT2Zmc2V0KCk7XG4gIH1cbiAgaWYgKCFpc1ZpcnR1YWwgJiYgIXBhcmFtcy5jc3NNb2RlICYmIChwYXJhbXMuZWZmZWN0ID09PSAnc2xpZGUnIHx8IHBhcmFtcy5lZmZlY3QgPT09ICdmYWRlJykpIHtcbiAgICBjb25zdCBiYWNrRmFjZUhpZGRlbkNsYXNzID0gYCR7cGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9YmFja2ZhY2UtaGlkZGVuYDtcbiAgICBjb25zdCBoYXNDbGFzc0JhY2tmYWNlQ2xhc3NBZGRlZCA9IHN3aXBlci5lbC5jbGFzc0xpc3QuY29udGFpbnMoYmFja0ZhY2VIaWRkZW5DbGFzcyk7XG4gICAgaWYgKHNsaWRlc0xlbmd0aCA8PSBwYXJhbXMubWF4QmFja2ZhY2VIaWRkZW5TbGlkZXMpIHtcbiAgICAgIGlmICghaGFzQ2xhc3NCYWNrZmFjZUNsYXNzQWRkZWQpIHN3aXBlci5lbC5jbGFzc0xpc3QuYWRkKGJhY2tGYWNlSGlkZGVuQ2xhc3MpO1xuICAgIH0gZWxzZSBpZiAoaGFzQ2xhc3NCYWNrZmFjZUNsYXNzQWRkZWQpIHtcbiAgICAgIHN3aXBlci5lbC5jbGFzc0xpc3QucmVtb3ZlKGJhY2tGYWNlSGlkZGVuQ2xhc3MpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVBdXRvSGVpZ2h0KHNwZWVkKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IGFjdGl2ZVNsaWRlcyA9IFtdO1xuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgbGV0IG5ld0hlaWdodCA9IDA7XG4gIGxldCBpO1xuICBpZiAodHlwZW9mIHNwZWVkID09PSAnbnVtYmVyJykge1xuICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHNwZWVkKTtcbiAgfSBlbHNlIGlmIChzcGVlZCA9PT0gdHJ1ZSkge1xuICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHN3aXBlci5wYXJhbXMuc3BlZWQpO1xuICB9XG4gIGNvbnN0IGdldFNsaWRlQnlJbmRleCA9IGluZGV4ID0+IHtcbiAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICByZXR1cm4gc3dpcGVyLnNsaWRlc1tzd2lwZXIuZ2V0U2xpZGVJbmRleEJ5RGF0YShpbmRleCldO1xuICAgIH1cbiAgICByZXR1cm4gc3dpcGVyLnNsaWRlc1tpbmRleF07XG4gIH07XG4gIC8vIEZpbmQgc2xpZGVzIGN1cnJlbnRseSBpbiB2aWV3XG4gIGlmIChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgIT09ICdhdXRvJyAmJiBzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIChzd2lwZXIudmlzaWJsZVNsaWRlcyB8fCBbXSkuZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgICAgIGFjdGl2ZVNsaWRlcy5wdXNoKHNsaWRlKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmb3IgKGkgPSAwOyBpIDwgTWF0aC5jZWlsKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyk7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBpbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleCArIGk7XG4gICAgICAgIGlmIChpbmRleCA+IHN3aXBlci5zbGlkZXMubGVuZ3RoICYmICFpc1ZpcnR1YWwpIGJyZWFrO1xuICAgICAgICBhY3RpdmVTbGlkZXMucHVzaChnZXRTbGlkZUJ5SW5kZXgoaW5kZXgpKTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYWN0aXZlU2xpZGVzLnB1c2goZ2V0U2xpZGVCeUluZGV4KHN3aXBlci5hY3RpdmVJbmRleCkpO1xuICB9XG5cbiAgLy8gRmluZCBuZXcgaGVpZ2h0IGZyb20gaGlnaGVzdCBzbGlkZSBpbiB2aWV3XG4gIGZvciAoaSA9IDA7IGkgPCBhY3RpdmVTbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBpZiAodHlwZW9mIGFjdGl2ZVNsaWRlc1tpXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IGhlaWdodCA9IGFjdGl2ZVNsaWRlc1tpXS5vZmZzZXRIZWlnaHQ7XG4gICAgICBuZXdIZWlnaHQgPSBoZWlnaHQgPiBuZXdIZWlnaHQgPyBoZWlnaHQgOiBuZXdIZWlnaHQ7XG4gICAgfVxuICB9XG5cbiAgLy8gVXBkYXRlIEhlaWdodFxuICBpZiAobmV3SGVpZ2h0IHx8IG5ld0hlaWdodCA9PT0gMCkgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5oZWlnaHQgPSBgJHtuZXdIZWlnaHR9cHhgO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVTbGlkZXNPZmZzZXQoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHNsaWRlcyA9IHN3aXBlci5zbGlkZXM7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBjb25zdCBtaW51c09mZnNldCA9IHN3aXBlci5pc0VsZW1lbnQgPyBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBzd2lwZXIud3JhcHBlckVsLm9mZnNldExlZnQgOiBzd2lwZXIud3JhcHBlckVsLm9mZnNldFRvcCA6IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgc2xpZGVzW2ldLnN3aXBlclNsaWRlT2Zmc2V0ID0gKHN3aXBlci5pc0hvcml6b250YWwoKSA/IHNsaWRlc1tpXS5vZmZzZXRMZWZ0IDogc2xpZGVzW2ldLm9mZnNldFRvcCkgLSBtaW51c09mZnNldCAtIHN3aXBlci5jc3NPdmVyZmxvd0FkanVzdG1lbnQoKTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1cGRhdGVTbGlkZXNQcm9ncmVzcyh0cmFuc2xhdGUpIHtcbiAgaWYgKHRyYW5zbGF0ZSA9PT0gdm9pZCAwKSB7XG4gICAgdHJhbnNsYXRlID0gdGhpcyAmJiB0aGlzLnRyYW5zbGF0ZSB8fCAwO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIGNvbnN0IHtcbiAgICBzbGlkZXMsXG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgc25hcEdyaWRcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKHNsaWRlcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgaWYgKHR5cGVvZiBzbGlkZXNbMF0uc3dpcGVyU2xpZGVPZmZzZXQgPT09ICd1bmRlZmluZWQnKSBzd2lwZXIudXBkYXRlU2xpZGVzT2Zmc2V0KCk7XG4gIGxldCBvZmZzZXRDZW50ZXIgPSAtdHJhbnNsYXRlO1xuICBpZiAocnRsKSBvZmZzZXRDZW50ZXIgPSB0cmFuc2xhdGU7XG5cbiAgLy8gVmlzaWJsZSBTbGlkZXNcbiAgc2xpZGVzLmZvckVhY2goc2xpZGVFbCA9PiB7XG4gICAgc2xpZGVFbC5jbGFzc0xpc3QucmVtb3ZlKHBhcmFtcy5zbGlkZVZpc2libGVDbGFzcywgcGFyYW1zLnNsaWRlRnVsbHlWaXNpYmxlQ2xhc3MpO1xuICB9KTtcbiAgc3dpcGVyLnZpc2libGVTbGlkZXNJbmRleGVzID0gW107XG4gIHN3aXBlci52aXNpYmxlU2xpZGVzID0gW107XG4gIGxldCBzcGFjZUJldHdlZW4gPSBwYXJhbXMuc3BhY2VCZXR3ZWVuO1xuICBpZiAodHlwZW9mIHNwYWNlQmV0d2VlbiA9PT0gJ3N0cmluZycgJiYgc3BhY2VCZXR3ZWVuLmluZGV4T2YoJyUnKSA+PSAwKSB7XG4gICAgc3BhY2VCZXR3ZWVuID0gcGFyc2VGbG9hdChzcGFjZUJldHdlZW4ucmVwbGFjZSgnJScsICcnKSkgLyAxMDAgKiBzd2lwZXIuc2l6ZTtcbiAgfSBlbHNlIGlmICh0eXBlb2Ygc3BhY2VCZXR3ZWVuID09PSAnc3RyaW5nJykge1xuICAgIHNwYWNlQmV0d2VlbiA9IHBhcnNlRmxvYXQoc3BhY2VCZXR3ZWVuKTtcbiAgfVxuICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHNsaWRlID0gc2xpZGVzW2ldO1xuICAgIGxldCBzbGlkZU9mZnNldCA9IHNsaWRlLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgIGlmIChwYXJhbXMuY3NzTW9kZSAmJiBwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIHNsaWRlT2Zmc2V0IC09IHNsaWRlc1swXS5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICB9XG4gICAgY29uc3Qgc2xpZGVQcm9ncmVzcyA9IChvZmZzZXRDZW50ZXIgKyAocGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIDogMCkgLSBzbGlkZU9mZnNldCkgLyAoc2xpZGUuc3dpcGVyU2xpZGVTaXplICsgc3BhY2VCZXR3ZWVuKTtcbiAgICBjb25zdCBvcmlnaW5hbFNsaWRlUHJvZ3Jlc3MgPSAob2Zmc2V0Q2VudGVyIC0gc25hcEdyaWRbMF0gKyAocGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIDogMCkgLSBzbGlkZU9mZnNldCkgLyAoc2xpZGUuc3dpcGVyU2xpZGVTaXplICsgc3BhY2VCZXR3ZWVuKTtcbiAgICBjb25zdCBzbGlkZUJlZm9yZSA9IC0ob2Zmc2V0Q2VudGVyIC0gc2xpZGVPZmZzZXQpO1xuICAgIGNvbnN0IHNsaWRlQWZ0ZXIgPSBzbGlkZUJlZm9yZSArIHN3aXBlci5zbGlkZXNTaXplc0dyaWRbaV07XG4gICAgY29uc3QgaXNGdWxseVZpc2libGUgPSBzbGlkZUJlZm9yZSA+PSAwICYmIHNsaWRlQmVmb3JlIDw9IHN3aXBlci5zaXplIC0gc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtpXTtcbiAgICBjb25zdCBpc1Zpc2libGUgPSBzbGlkZUJlZm9yZSA+PSAwICYmIHNsaWRlQmVmb3JlIDwgc3dpcGVyLnNpemUgLSAxIHx8IHNsaWRlQWZ0ZXIgPiAxICYmIHNsaWRlQWZ0ZXIgPD0gc3dpcGVyLnNpemUgfHwgc2xpZGVCZWZvcmUgPD0gMCAmJiBzbGlkZUFmdGVyID49IHN3aXBlci5zaXplO1xuICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgIHN3aXBlci52aXNpYmxlU2xpZGVzLnB1c2goc2xpZGUpO1xuICAgICAgc3dpcGVyLnZpc2libGVTbGlkZXNJbmRleGVzLnB1c2goaSk7XG4gICAgICBzbGlkZXNbaV0uY2xhc3NMaXN0LmFkZChwYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MpO1xuICAgIH1cbiAgICBpZiAoaXNGdWxseVZpc2libGUpIHtcbiAgICAgIHNsaWRlc1tpXS5jbGFzc0xpc3QuYWRkKHBhcmFtcy5zbGlkZUZ1bGx5VmlzaWJsZUNsYXNzKTtcbiAgICB9XG4gICAgc2xpZGUucHJvZ3Jlc3MgPSBydGwgPyAtc2xpZGVQcm9ncmVzcyA6IHNsaWRlUHJvZ3Jlc3M7XG4gICAgc2xpZGUub3JpZ2luYWxQcm9ncmVzcyA9IHJ0bCA/IC1vcmlnaW5hbFNsaWRlUHJvZ3Jlc3MgOiBvcmlnaW5hbFNsaWRlUHJvZ3Jlc3M7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmICh0eXBlb2YgdHJhbnNsYXRlID09PSAndW5kZWZpbmVkJykge1xuICAgIGNvbnN0IG11bHRpcGxpZXIgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gLTEgOiAxO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHRyYW5zbGF0ZSA9IHN3aXBlciAmJiBzd2lwZXIudHJhbnNsYXRlICYmIHN3aXBlci50cmFuc2xhdGUgKiBtdWx0aXBsaWVyIHx8IDA7XG4gIH1cbiAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgY29uc3QgdHJhbnNsYXRlc0RpZmYgPSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gIGxldCB7XG4gICAgcHJvZ3Jlc3MsXG4gICAgaXNCZWdpbm5pbmcsXG4gICAgaXNFbmQsXG4gICAgcHJvZ3Jlc3NMb29wXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IHdhc0JlZ2lubmluZyA9IGlzQmVnaW5uaW5nO1xuICBjb25zdCB3YXNFbmQgPSBpc0VuZDtcbiAgaWYgKHRyYW5zbGF0ZXNEaWZmID09PSAwKSB7XG4gICAgcHJvZ3Jlc3MgPSAwO1xuICAgIGlzQmVnaW5uaW5nID0gdHJ1ZTtcbiAgICBpc0VuZCA9IHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcHJvZ3Jlc3MgPSAodHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAvIHRyYW5zbGF0ZXNEaWZmO1xuICAgIGNvbnN0IGlzQmVnaW5uaW5nUm91bmRlZCA9IE1hdGguYWJzKHRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgPCAxO1xuICAgIGNvbnN0IGlzRW5kUm91bmRlZCA9IE1hdGguYWJzKHRyYW5zbGF0ZSAtIHN3aXBlci5tYXhUcmFuc2xhdGUoKSkgPCAxO1xuICAgIGlzQmVnaW5uaW5nID0gaXNCZWdpbm5pbmdSb3VuZGVkIHx8IHByb2dyZXNzIDw9IDA7XG4gICAgaXNFbmQgPSBpc0VuZFJvdW5kZWQgfHwgcHJvZ3Jlc3MgPj0gMTtcbiAgICBpZiAoaXNCZWdpbm5pbmdSb3VuZGVkKSBwcm9ncmVzcyA9IDA7XG4gICAgaWYgKGlzRW5kUm91bmRlZCkgcHJvZ3Jlc3MgPSAxO1xuICB9XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIGNvbnN0IGZpcnN0U2xpZGVJbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4QnlEYXRhKDApO1xuICAgIGNvbnN0IGxhc3RTbGlkZUluZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXhCeURhdGEoc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxKTtcbiAgICBjb25zdCBmaXJzdFNsaWRlVHJhbnNsYXRlID0gc3dpcGVyLnNsaWRlc0dyaWRbZmlyc3RTbGlkZUluZGV4XTtcbiAgICBjb25zdCBsYXN0U2xpZGVUcmFuc2xhdGUgPSBzd2lwZXIuc2xpZGVzR3JpZFtsYXN0U2xpZGVJbmRleF07XG4gICAgY29uc3QgdHJhbnNsYXRlTWF4ID0gc3dpcGVyLnNsaWRlc0dyaWRbc3dpcGVyLnNsaWRlc0dyaWQubGVuZ3RoIC0gMV07XG4gICAgY29uc3QgdHJhbnNsYXRlQWJzID0gTWF0aC5hYnModHJhbnNsYXRlKTtcbiAgICBpZiAodHJhbnNsYXRlQWJzID49IGZpcnN0U2xpZGVUcmFuc2xhdGUpIHtcbiAgICAgIHByb2dyZXNzTG9vcCA9ICh0cmFuc2xhdGVBYnMgLSBmaXJzdFNsaWRlVHJhbnNsYXRlKSAvIHRyYW5zbGF0ZU1heDtcbiAgICB9IGVsc2Uge1xuICAgICAgcHJvZ3Jlc3NMb29wID0gKHRyYW5zbGF0ZUFicyArIHRyYW5zbGF0ZU1heCAtIGxhc3RTbGlkZVRyYW5zbGF0ZSkgLyB0cmFuc2xhdGVNYXg7XG4gICAgfVxuICAgIGlmIChwcm9ncmVzc0xvb3AgPiAxKSBwcm9ncmVzc0xvb3AgLT0gMTtcbiAgfVxuICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgIHByb2dyZXNzLFxuICAgIHByb2dyZXNzTG9vcCxcbiAgICBpc0JlZ2lubmluZyxcbiAgICBpc0VuZFxuICB9KTtcbiAgaWYgKHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzIHx8IHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBwYXJhbXMuYXV0b0hlaWdodCkgc3dpcGVyLnVwZGF0ZVNsaWRlc1Byb2dyZXNzKHRyYW5zbGF0ZSk7XG4gIGlmIChpc0JlZ2lubmluZyAmJiAhd2FzQmVnaW5uaW5nKSB7XG4gICAgc3dpcGVyLmVtaXQoJ3JlYWNoQmVnaW5uaW5nIHRvRWRnZScpO1xuICB9XG4gIGlmIChpc0VuZCAmJiAhd2FzRW5kKSB7XG4gICAgc3dpcGVyLmVtaXQoJ3JlYWNoRW5kIHRvRWRnZScpO1xuICB9XG4gIGlmICh3YXNCZWdpbm5pbmcgJiYgIWlzQmVnaW5uaW5nIHx8IHdhc0VuZCAmJiAhaXNFbmQpIHtcbiAgICBzd2lwZXIuZW1pdCgnZnJvbUVkZ2UnKTtcbiAgfVxuICBzd2lwZXIuZW1pdCgncHJvZ3Jlc3MnLCBwcm9ncmVzcyk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVNsaWRlc0NsYXNzZXMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBzbGlkZXMsXG4gICAgcGFyYW1zLFxuICAgIHNsaWRlc0VsLFxuICAgIGFjdGl2ZUluZGV4XG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gIGNvbnN0IGdyaWRFbmFibGVkID0gc3dpcGVyLmdyaWQgJiYgcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDE7XG4gIGNvbnN0IGdldEZpbHRlcmVkU2xpZGUgPSBzZWxlY3RvciA9PiB7XG4gICAgcmV0dXJuIGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSR7c2VsZWN0b3J9LCBzd2lwZXItc2xpZGUke3NlbGVjdG9yfWApWzBdO1xuICB9O1xuICBzbGlkZXMuZm9yRWFjaChzbGlkZUVsID0+IHtcbiAgICBzbGlkZUVsLmNsYXNzTGlzdC5yZW1vdmUocGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MsIHBhcmFtcy5zbGlkZU5leHRDbGFzcywgcGFyYW1zLnNsaWRlUHJldkNsYXNzKTtcbiAgfSk7XG4gIGxldCBhY3RpdmVTbGlkZTtcbiAgbGV0IHByZXZTbGlkZTtcbiAgbGV0IG5leHRTbGlkZTtcbiAgaWYgKGlzVmlydHVhbCkge1xuICAgIGlmIChwYXJhbXMubG9vcCkge1xuICAgICAgbGV0IHNsaWRlSW5kZXggPSBhY3RpdmVJbmRleCAtIHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZTtcbiAgICAgIGlmIChzbGlkZUluZGV4IDwgMCkgc2xpZGVJbmRleCA9IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggKyBzbGlkZUluZGV4O1xuICAgICAgaWYgKHNsaWRlSW5kZXggPj0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCkgc2xpZGVJbmRleCAtPSBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoO1xuICAgICAgYWN0aXZlU2xpZGUgPSBnZXRGaWx0ZXJlZFNsaWRlKGBbZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3NsaWRlSW5kZXh9XCJdYCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZVNsaWRlID0gZ2V0RmlsdGVyZWRTbGlkZShgW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHthY3RpdmVJbmRleH1cIl1gKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICBhY3RpdmVTbGlkZSA9IHNsaWRlcy5maWx0ZXIoc2xpZGVFbCA9PiBzbGlkZUVsLmNvbHVtbiA9PT0gYWN0aXZlSW5kZXgpWzBdO1xuICAgICAgbmV4dFNsaWRlID0gc2xpZGVzLmZpbHRlcihzbGlkZUVsID0+IHNsaWRlRWwuY29sdW1uID09PSBhY3RpdmVJbmRleCArIDEpWzBdO1xuICAgICAgcHJldlNsaWRlID0gc2xpZGVzLmZpbHRlcihzbGlkZUVsID0+IHNsaWRlRWwuY29sdW1uID09PSBhY3RpdmVJbmRleCAtIDEpWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVTbGlkZSA9IHNsaWRlc1thY3RpdmVJbmRleF07XG4gICAgfVxuICB9XG4gIGlmIChhY3RpdmVTbGlkZSkge1xuICAgIC8vIEFjdGl2ZSBjbGFzc2VzXG4gICAgYWN0aXZlU2xpZGUuY2xhc3NMaXN0LmFkZChwYXJhbXMuc2xpZGVBY3RpdmVDbGFzcyk7XG4gICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICBpZiAobmV4dFNsaWRlKSB7XG4gICAgICAgIG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKHBhcmFtcy5zbGlkZU5leHRDbGFzcyk7XG4gICAgICB9XG4gICAgICBpZiAocHJldlNsaWRlKSB7XG4gICAgICAgIHByZXZTbGlkZS5jbGFzc0xpc3QuYWRkKHBhcmFtcy5zbGlkZVByZXZDbGFzcyk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5leHQgU2xpZGVcbiAgICAgIG5leHRTbGlkZSA9IGVsZW1lbnROZXh0QWxsKGFjdGl2ZVNsaWRlLCBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKVswXTtcbiAgICAgIGlmIChwYXJhbXMubG9vcCAmJiAhbmV4dFNsaWRlKSB7XG4gICAgICAgIG5leHRTbGlkZSA9IHNsaWRlc1swXTtcbiAgICAgIH1cbiAgICAgIGlmIChuZXh0U2xpZGUpIHtcbiAgICAgICAgbmV4dFNsaWRlLmNsYXNzTGlzdC5hZGQocGFyYW1zLnNsaWRlTmV4dENsYXNzKTtcbiAgICAgIH1cblxuICAgICAgLy8gUHJldiBTbGlkZVxuICAgICAgcHJldlNsaWRlID0gZWxlbWVudFByZXZBbGwoYWN0aXZlU2xpZGUsIGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApWzBdO1xuICAgICAgaWYgKHBhcmFtcy5sb29wICYmICFwcmV2U2xpZGUgPT09IDApIHtcbiAgICAgICAgcHJldlNsaWRlID0gc2xpZGVzW3NsaWRlcy5sZW5ndGggLSAxXTtcbiAgICAgIH1cbiAgICAgIGlmIChwcmV2U2xpZGUpIHtcbiAgICAgICAgcHJldlNsaWRlLmNsYXNzTGlzdC5hZGQocGFyYW1zLnNsaWRlUHJldkNsYXNzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc3dpcGVyLmVtaXRTbGlkZXNDbGFzc2VzKCk7XG59XG5cbmNvbnN0IHByb2Nlc3NMYXp5UHJlbG9hZGVyID0gKHN3aXBlciwgaW1hZ2VFbCkgPT4ge1xuICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIucGFyYW1zKSByZXR1cm47XG4gIGNvbnN0IHNsaWRlU2VsZWN0b3IgPSAoKSA9PiBzd2lwZXIuaXNFbGVtZW50ID8gYHN3aXBlci1zbGlkZWAgOiBgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfWA7XG4gIGNvbnN0IHNsaWRlRWwgPSBpbWFnZUVsLmNsb3Nlc3Qoc2xpZGVTZWxlY3RvcigpKTtcbiAgaWYgKHNsaWRlRWwpIHtcbiAgICBsZXQgbGF6eUVsID0gc2xpZGVFbC5xdWVyeVNlbGVjdG9yKGAuJHtzd2lwZXIucGFyYW1zLmxhenlQcmVsb2FkZXJDbGFzc31gKTtcbiAgICBpZiAoIWxhenlFbCAmJiBzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgICBpZiAoc2xpZGVFbC5zaGFkb3dSb290KSB7XG4gICAgICAgIGxhenlFbCA9IHNsaWRlRWwuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKGAuJHtzd2lwZXIucGFyYW1zLmxhenlQcmVsb2FkZXJDbGFzc31gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGluaXQgbGF0ZXJcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBpZiAoc2xpZGVFbC5zaGFkb3dSb290KSB7XG4gICAgICAgICAgICBsYXp5RWwgPSBzbGlkZUVsLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihgLiR7c3dpcGVyLnBhcmFtcy5sYXp5UHJlbG9hZGVyQ2xhc3N9YCk7XG4gICAgICAgICAgICBpZiAobGF6eUVsKSBsYXp5RWwucmVtb3ZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGxhenlFbCkgbGF6eUVsLnJlbW92ZSgpO1xuICB9XG59O1xuY29uc3QgdW5sYXp5ID0gKHN3aXBlciwgaW5kZXgpID0+IHtcbiAgaWYgKCFzd2lwZXIuc2xpZGVzW2luZGV4XSkgcmV0dXJuO1xuICBjb25zdCBpbWFnZUVsID0gc3dpcGVyLnNsaWRlc1tpbmRleF0ucXVlcnlTZWxlY3RvcignW2xvYWRpbmc9XCJsYXp5XCJdJyk7XG4gIGlmIChpbWFnZUVsKSBpbWFnZUVsLnJlbW92ZUF0dHJpYnV0ZSgnbG9hZGluZycpO1xufTtcbmNvbnN0IHByZWxvYWQgPSBzd2lwZXIgPT4ge1xuICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIucGFyYW1zKSByZXR1cm47XG4gIGxldCBhbW91bnQgPSBzd2lwZXIucGFyYW1zLmxhenlQcmVsb2FkUHJldk5leHQ7XG4gIGNvbnN0IGxlbiA9IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICBpZiAoIWxlbiB8fCAhYW1vdW50IHx8IGFtb3VudCA8IDApIHJldHVybjtcbiAgYW1vdW50ID0gTWF0aC5taW4oYW1vdW50LCBsZW4pO1xuICBjb25zdCBzbGlkZXNQZXJWaWV3ID0gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgPyBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKSA6IE1hdGguY2VpbChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcpO1xuICBjb25zdCBhY3RpdmVJbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgaWYgKHN3aXBlci5wYXJhbXMuZ3JpZCAmJiBzd2lwZXIucGFyYW1zLmdyaWQucm93cyA+IDEpIHtcbiAgICBjb25zdCBhY3RpdmVDb2x1bW4gPSBhY3RpdmVJbmRleDtcbiAgICBjb25zdCBwcmVsb2FkQ29sdW1ucyA9IFthY3RpdmVDb2x1bW4gLSBhbW91bnRdO1xuICAgIHByZWxvYWRDb2x1bW5zLnB1c2goLi4uQXJyYXkuZnJvbSh7XG4gICAgICBsZW5ndGg6IGFtb3VudFxuICAgIH0pLm1hcCgoXywgaSkgPT4ge1xuICAgICAgcmV0dXJuIGFjdGl2ZUNvbHVtbiArIHNsaWRlc1BlclZpZXcgKyBpO1xuICAgIH0pKTtcbiAgICBzd2lwZXIuc2xpZGVzLmZvckVhY2goKHNsaWRlRWwsIGkpID0+IHtcbiAgICAgIGlmIChwcmVsb2FkQ29sdW1ucy5pbmNsdWRlcyhzbGlkZUVsLmNvbHVtbikpIHVubGF6eShzd2lwZXIsIGkpO1xuICAgIH0pO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBzbGlkZUluZGV4TGFzdEluVmlldyA9IGFjdGl2ZUluZGV4ICsgc2xpZGVzUGVyVmlldyAtIDE7XG4gIGlmIChzd2lwZXIucGFyYW1zLnJld2luZCB8fCBzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggLSBhbW91bnQ7IGkgPD0gc2xpZGVJbmRleExhc3RJblZpZXcgKyBhbW91bnQ7IGkgKz0gMSkge1xuICAgICAgY29uc3QgcmVhbEluZGV4ID0gKGkgJSBsZW4gKyBsZW4pICUgbGVuO1xuICAgICAgaWYgKHJlYWxJbmRleCA8IGFjdGl2ZUluZGV4IHx8IHJlYWxJbmRleCA+IHNsaWRlSW5kZXhMYXN0SW5WaWV3KSB1bmxhenkoc3dpcGVyLCByZWFsSW5kZXgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3IgKGxldCBpID0gTWF0aC5tYXgoYWN0aXZlSW5kZXggLSBhbW91bnQsIDApOyBpIDw9IE1hdGgubWluKHNsaWRlSW5kZXhMYXN0SW5WaWV3ICsgYW1vdW50LCBsZW4gLSAxKTsgaSArPSAxKSB7XG4gICAgICBpZiAoaSAhPT0gYWN0aXZlSW5kZXggJiYgKGkgPiBzbGlkZUluZGV4TGFzdEluVmlldyB8fCBpIDwgYWN0aXZlSW5kZXgpKSB7XG4gICAgICAgIHVubGF6eShzd2lwZXIsIGkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuZnVuY3Rpb24gZ2V0QWN0aXZlSW5kZXhCeVRyYW5zbGF0ZShzd2lwZXIpIHtcbiAgY29uc3Qge1xuICAgIHNsaWRlc0dyaWQsXG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IHRyYW5zbGF0ZSA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG4gIGxldCBhY3RpdmVJbmRleDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNHcmlkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHR5cGVvZiBzbGlkZXNHcmlkW2kgKyAxXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSAmJiB0cmFuc2xhdGUgPCBzbGlkZXNHcmlkW2kgKyAxXSAtIChzbGlkZXNHcmlkW2kgKyAxXSAtIHNsaWRlc0dyaWRbaV0pIC8gMikge1xuICAgICAgICBhY3RpdmVJbmRleCA9IGk7XG4gICAgICB9IGVsc2UgaWYgKHRyYW5zbGF0ZSA+PSBzbGlkZXNHcmlkW2ldICYmIHRyYW5zbGF0ZSA8IHNsaWRlc0dyaWRbaSArIDFdKSB7XG4gICAgICAgIGFjdGl2ZUluZGV4ID0gaSArIDE7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSkge1xuICAgICAgYWN0aXZlSW5kZXggPSBpO1xuICAgIH1cbiAgfVxuICAvLyBOb3JtYWxpemUgc2xpZGVJbmRleFxuICBpZiAocGFyYW1zLm5vcm1hbGl6ZVNsaWRlSW5kZXgpIHtcbiAgICBpZiAoYWN0aXZlSW5kZXggPCAwIHx8IHR5cGVvZiBhY3RpdmVJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIGFjdGl2ZUluZGV4ID0gMDtcbiAgfVxuICByZXR1cm4gYWN0aXZlSW5kZXg7XG59XG5mdW5jdGlvbiB1cGRhdGVBY3RpdmVJbmRleChuZXdBY3RpdmVJbmRleCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB0cmFuc2xhdGUgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuICBjb25zdCB7XG4gICAgc25hcEdyaWQsXG4gICAgcGFyYW1zLFxuICAgIGFjdGl2ZUluZGV4OiBwcmV2aW91c0luZGV4LFxuICAgIHJlYWxJbmRleDogcHJldmlvdXNSZWFsSW5kZXgsXG4gICAgc25hcEluZGV4OiBwcmV2aW91c1NuYXBJbmRleFxuICB9ID0gc3dpcGVyO1xuICBsZXQgYWN0aXZlSW5kZXggPSBuZXdBY3RpdmVJbmRleDtcbiAgbGV0IHNuYXBJbmRleDtcbiAgY29uc3QgZ2V0VmlydHVhbFJlYWxJbmRleCA9IGFJbmRleCA9PiB7XG4gICAgbGV0IHJlYWxJbmRleCA9IGFJbmRleCAtIHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZTtcbiAgICBpZiAocmVhbEluZGV4IDwgMCkge1xuICAgICAgcmVhbEluZGV4ID0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCArIHJlYWxJbmRleDtcbiAgICB9XG4gICAgaWYgKHJlYWxJbmRleCA+PSBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICByZWFsSW5kZXggLT0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aDtcbiAgICB9XG4gICAgcmV0dXJuIHJlYWxJbmRleDtcbiAgfTtcbiAgaWYgKHR5cGVvZiBhY3RpdmVJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBhY3RpdmVJbmRleCA9IGdldEFjdGl2ZUluZGV4QnlUcmFuc2xhdGUoc3dpcGVyKTtcbiAgfVxuICBpZiAoc25hcEdyaWQuaW5kZXhPZih0cmFuc2xhdGUpID49IDApIHtcbiAgICBzbmFwSW5kZXggPSBzbmFwR3JpZC5pbmRleE9mKHRyYW5zbGF0ZSk7XG4gIH0gZWxzZSB7XG4gICAgY29uc3Qgc2tpcCA9IE1hdGgubWluKHBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAsIGFjdGl2ZUluZGV4KTtcbiAgICBzbmFwSW5kZXggPSBza2lwICsgTWF0aC5mbG9vcigoYWN0aXZlSW5kZXggLSBza2lwKSAvIHBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gIH1cbiAgaWYgKHNuYXBJbmRleCA+PSBzbmFwR3JpZC5sZW5ndGgpIHNuYXBJbmRleCA9IHNuYXBHcmlkLmxlbmd0aCAtIDE7XG4gIGlmIChhY3RpdmVJbmRleCA9PT0gcHJldmlvdXNJbmRleCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgaWYgKHNuYXBJbmRleCAhPT0gcHJldmlvdXNTbmFwSW5kZXgpIHtcbiAgICAgIHN3aXBlci5zbmFwSW5kZXggPSBzbmFwSW5kZXg7XG4gICAgICBzd2lwZXIuZW1pdCgnc25hcEluZGV4Q2hhbmdlJyk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoYWN0aXZlSW5kZXggPT09IHByZXZpb3VzSW5kZXggJiYgc3dpcGVyLnBhcmFtcy5sb29wICYmIHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgc3dpcGVyLnJlYWxJbmRleCA9IGdldFZpcnR1YWxSZWFsSW5kZXgoYWN0aXZlSW5kZXgpO1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCBncmlkRW5hYmxlZCA9IHN3aXBlci5ncmlkICYmIHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxO1xuXG4gIC8vIEdldCByZWFsIGluZGV4XG4gIGxldCByZWFsSW5kZXg7XG4gIGlmIChzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkICYmIHBhcmFtcy5sb29wKSB7XG4gICAgcmVhbEluZGV4ID0gZ2V0VmlydHVhbFJlYWxJbmRleChhY3RpdmVJbmRleCk7XG4gIH0gZWxzZSBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICBjb25zdCBmaXJzdFNsaWRlSW5Db2x1bW4gPSBzd2lwZXIuc2xpZGVzLmZpbHRlcihzbGlkZUVsID0+IHNsaWRlRWwuY29sdW1uID09PSBhY3RpdmVJbmRleClbMF07XG4gICAgbGV0IGFjdGl2ZVNsaWRlSW5kZXggPSBwYXJzZUludChmaXJzdFNsaWRlSW5Db2x1bW4uZ2V0QXR0cmlidXRlKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpLCAxMCk7XG4gICAgaWYgKE51bWJlci5pc05hTihhY3RpdmVTbGlkZUluZGV4KSkge1xuICAgICAgYWN0aXZlU2xpZGVJbmRleCA9IE1hdGgubWF4KHN3aXBlci5zbGlkZXMuaW5kZXhPZihmaXJzdFNsaWRlSW5Db2x1bW4pLCAwKTtcbiAgICB9XG4gICAgcmVhbEluZGV4ID0gTWF0aC5mbG9vcihhY3RpdmVTbGlkZUluZGV4IC8gcGFyYW1zLmdyaWQucm93cyk7XG4gIH0gZWxzZSBpZiAoc3dpcGVyLnNsaWRlc1thY3RpdmVJbmRleF0pIHtcbiAgICBjb25zdCBzbGlkZUluZGV4ID0gc3dpcGVyLnNsaWRlc1thY3RpdmVJbmRleF0uZ2V0QXR0cmlidXRlKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuICAgIGlmIChzbGlkZUluZGV4KSB7XG4gICAgICByZWFsSW5kZXggPSBwYXJzZUludChzbGlkZUluZGV4LCAxMCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlYWxJbmRleCA9IGFjdGl2ZUluZGV4O1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZWFsSW5kZXggPSBhY3RpdmVJbmRleDtcbiAgfVxuICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgIHByZXZpb3VzU25hcEluZGV4LFxuICAgIHNuYXBJbmRleCxcbiAgICBwcmV2aW91c1JlYWxJbmRleCxcbiAgICByZWFsSW5kZXgsXG4gICAgcHJldmlvdXNJbmRleCxcbiAgICBhY3RpdmVJbmRleFxuICB9KTtcbiAgaWYgKHN3aXBlci5pbml0aWFsaXplZCkge1xuICAgIHByZWxvYWQoc3dpcGVyKTtcbiAgfVxuICBzd2lwZXIuZW1pdCgnYWN0aXZlSW5kZXhDaGFuZ2UnKTtcbiAgc3dpcGVyLmVtaXQoJ3NuYXBJbmRleENoYW5nZScpO1xuICBpZiAoc3dpcGVyLmluaXRpYWxpemVkIHx8IHN3aXBlci5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0KSB7XG4gICAgaWYgKHByZXZpb3VzUmVhbEluZGV4ICE9PSByZWFsSW5kZXgpIHtcbiAgICAgIHN3aXBlci5lbWl0KCdyZWFsSW5kZXhDaGFuZ2UnKTtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoJ3NsaWRlQ2hhbmdlJyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQ2xpY2tlZFNsaWRlKGVsLCBwYXRoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIGxldCBzbGlkZSA9IGVsLmNsb3Nlc3QoYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYCk7XG4gIGlmICghc2xpZGUgJiYgc3dpcGVyLmlzRWxlbWVudCAmJiBwYXRoICYmIHBhdGgubGVuZ3RoID4gMSAmJiBwYXRoLmluY2x1ZGVzKGVsKSkge1xuICAgIFsuLi5wYXRoLnNsaWNlKHBhdGguaW5kZXhPZihlbCkgKyAxLCBwYXRoLmxlbmd0aCldLmZvckVhY2gocGF0aEVsID0+IHtcbiAgICAgIGlmICghc2xpZGUgJiYgcGF0aEVsLm1hdGNoZXMgJiYgcGF0aEVsLm1hdGNoZXMoYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYCkpIHtcbiAgICAgICAgc2xpZGUgPSBwYXRoRWw7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgbGV0IHNsaWRlRm91bmQgPSBmYWxzZTtcbiAgbGV0IHNsaWRlSW5kZXg7XG4gIGlmIChzbGlkZSkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dpcGVyLnNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKHN3aXBlci5zbGlkZXNbaV0gPT09IHNsaWRlKSB7XG4gICAgICAgIHNsaWRlRm91bmQgPSB0cnVlO1xuICAgICAgICBzbGlkZUluZGV4ID0gaTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChzbGlkZSAmJiBzbGlkZUZvdW5kKSB7XG4gICAgc3dpcGVyLmNsaWNrZWRTbGlkZSA9IHNsaWRlO1xuICAgIGlmIChzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgICAgc3dpcGVyLmNsaWNrZWRJbmRleCA9IHBhcnNlSW50KHNsaWRlLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuY2xpY2tlZEluZGV4ID0gc2xpZGVJbmRleDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLmNsaWNrZWRTbGlkZSA9IHVuZGVmaW5lZDtcbiAgICBzd2lwZXIuY2xpY2tlZEluZGV4ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGFyYW1zLnNsaWRlVG9DbGlja2VkU2xpZGUgJiYgc3dpcGVyLmNsaWNrZWRJbmRleCAhPT0gdW5kZWZpbmVkICYmIHN3aXBlci5jbGlja2VkSW5kZXggIT09IHN3aXBlci5hY3RpdmVJbmRleCkge1xuICAgIHN3aXBlci5zbGlkZVRvQ2xpY2tlZFNsaWRlKCk7XG4gIH1cbn1cblxudmFyIHVwZGF0ZSA9IHtcbiAgdXBkYXRlU2l6ZSxcbiAgdXBkYXRlU2xpZGVzLFxuICB1cGRhdGVBdXRvSGVpZ2h0LFxuICB1cGRhdGVTbGlkZXNPZmZzZXQsXG4gIHVwZGF0ZVNsaWRlc1Byb2dyZXNzLFxuICB1cGRhdGVQcm9ncmVzcyxcbiAgdXBkYXRlU2xpZGVzQ2xhc3NlcyxcbiAgdXBkYXRlQWN0aXZlSW5kZXgsXG4gIHVwZGF0ZUNsaWNrZWRTbGlkZVxufTtcblxuZnVuY3Rpb24gZ2V0U3dpcGVyVHJhbnNsYXRlKGF4aXMpIHtcbiAgaWYgKGF4aXMgPT09IHZvaWQgMCkge1xuICAgIGF4aXMgPSB0aGlzLmlzSG9yaXpvbnRhbCgpID8gJ3gnIDogJ3knO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgdHJhbnNsYXRlLFxuICAgIHdyYXBwZXJFbFxuICB9ID0gc3dpcGVyO1xuICBpZiAocGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUpIHtcbiAgICByZXR1cm4gcnRsID8gLXRyYW5zbGF0ZSA6IHRyYW5zbGF0ZTtcbiAgfVxuICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICByZXR1cm4gdHJhbnNsYXRlO1xuICB9XG4gIGxldCBjdXJyZW50VHJhbnNsYXRlID0gZ2V0VHJhbnNsYXRlKHdyYXBwZXJFbCwgYXhpcyk7XG4gIGN1cnJlbnRUcmFuc2xhdGUgKz0gc3dpcGVyLmNzc092ZXJmbG93QWRqdXN0bWVudCgpO1xuICBpZiAocnRsKSBjdXJyZW50VHJhbnNsYXRlID0gLWN1cnJlbnRUcmFuc2xhdGU7XG4gIHJldHVybiBjdXJyZW50VHJhbnNsYXRlIHx8IDA7XG59XG5cbmZ1bmN0aW9uIHNldFRyYW5zbGF0ZSh0cmFuc2xhdGUsIGJ5Q29udHJvbGxlcikge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgcGFyYW1zLFxuICAgIHdyYXBwZXJFbCxcbiAgICBwcm9ncmVzc1xuICB9ID0gc3dpcGVyO1xuICBsZXQgeCA9IDA7XG4gIGxldCB5ID0gMDtcbiAgY29uc3QgeiA9IDA7XG4gIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICB4ID0gcnRsID8gLXRyYW5zbGF0ZSA6IHRyYW5zbGF0ZTtcbiAgfSBlbHNlIHtcbiAgICB5ID0gdHJhbnNsYXRlO1xuICB9XG4gIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSB7XG4gICAgeCA9IE1hdGguZmxvb3IoeCk7XG4gICAgeSA9IE1hdGguZmxvb3IoeSk7XG4gIH1cbiAgc3dpcGVyLnByZXZpb3VzVHJhbnNsYXRlID0gc3dpcGVyLnRyYW5zbGF0ZTtcbiAgc3dpcGVyLnRyYW5zbGF0ZSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHggOiB5O1xuICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICB3cmFwcGVyRWxbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ3Njcm9sbExlZnQnIDogJ3Njcm9sbFRvcCddID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gLXggOiAteTtcbiAgfSBlbHNlIGlmICghcGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUpIHtcbiAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICB4IC09IHN3aXBlci5jc3NPdmVyZmxvd0FkanVzdG1lbnQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeSAtPSBzd2lwZXIuY3NzT3ZlcmZsb3dBZGp1c3RtZW50KCk7XG4gICAgfVxuICAgIHdyYXBwZXJFbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHt4fXB4LCAke3l9cHgsICR7en1weClgO1xuICB9XG5cbiAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byB1cGRhdGUgcHJvZ3Jlc3NcbiAgbGV0IG5ld1Byb2dyZXNzO1xuICBjb25zdCB0cmFuc2xhdGVzRGlmZiA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgaWYgKHRyYW5zbGF0ZXNEaWZmID09PSAwKSB7XG4gICAgbmV3UHJvZ3Jlc3MgPSAwO1xuICB9IGVsc2Uge1xuICAgIG5ld1Byb2dyZXNzID0gKHRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyB0cmFuc2xhdGVzRGlmZjtcbiAgfVxuICBpZiAobmV3UHJvZ3Jlc3MgIT09IHByb2dyZXNzKSB7XG4gICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHRyYW5zbGF0ZSk7XG4gIH1cbiAgc3dpcGVyLmVtaXQoJ3NldFRyYW5zbGF0ZScsIHN3aXBlci50cmFuc2xhdGUsIGJ5Q29udHJvbGxlcik7XG59XG5cbmZ1bmN0aW9uIG1pblRyYW5zbGF0ZSgpIHtcbiAgcmV0dXJuIC10aGlzLnNuYXBHcmlkWzBdO1xufVxuXG5mdW5jdGlvbiBtYXhUcmFuc2xhdGUoKSB7XG4gIHJldHVybiAtdGhpcy5zbmFwR3JpZFt0aGlzLnNuYXBHcmlkLmxlbmd0aCAtIDFdO1xufVxuXG5mdW5jdGlvbiB0cmFuc2xhdGVUbyh0cmFuc2xhdGUsIHNwZWVkLCBydW5DYWxsYmFja3MsIHRyYW5zbGF0ZUJvdW5kcywgaW50ZXJuYWwpIHtcbiAgaWYgKHRyYW5zbGF0ZSA9PT0gdm9pZCAwKSB7XG4gICAgdHJhbnNsYXRlID0gMDtcbiAgfVxuICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBpZiAodHJhbnNsYXRlQm91bmRzID09PSB2b2lkIDApIHtcbiAgICB0cmFuc2xhdGVCb3VuZHMgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgd3JhcHBlckVsXG4gIH0gPSBzd2lwZXI7XG4gIGlmIChzd2lwZXIuYW5pbWF0aW5nICYmIHBhcmFtcy5wcmV2ZW50SW50ZXJhY3Rpb25PblRyYW5zaXRpb24pIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3QgbWluVHJhbnNsYXRlID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICBjb25zdCBtYXhUcmFuc2xhdGUgPSBzd2lwZXIubWF4VHJhbnNsYXRlKCk7XG4gIGxldCBuZXdUcmFuc2xhdGU7XG4gIGlmICh0cmFuc2xhdGVCb3VuZHMgJiYgdHJhbnNsYXRlID4gbWluVHJhbnNsYXRlKSBuZXdUcmFuc2xhdGUgPSBtaW5UcmFuc2xhdGU7ZWxzZSBpZiAodHJhbnNsYXRlQm91bmRzICYmIHRyYW5zbGF0ZSA8IG1heFRyYW5zbGF0ZSkgbmV3VHJhbnNsYXRlID0gbWF4VHJhbnNsYXRlO2Vsc2UgbmV3VHJhbnNsYXRlID0gdHJhbnNsYXRlO1xuXG4gIC8vIFVwZGF0ZSBwcm9ncmVzc1xuICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MobmV3VHJhbnNsYXRlKTtcbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgY29uc3QgaXNIID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpO1xuICAgIGlmIChzcGVlZCA9PT0gMCkge1xuICAgICAgd3JhcHBlckVsW2lzSCA/ICdzY3JvbGxMZWZ0JyA6ICdzY3JvbGxUb3AnXSA9IC1uZXdUcmFuc2xhdGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghc3dpcGVyLnN1cHBvcnQuc21vb3RoU2Nyb2xsKSB7XG4gICAgICAgIGFuaW1hdGVDU1NNb2RlU2Nyb2xsKHtcbiAgICAgICAgICBzd2lwZXIsXG4gICAgICAgICAgdGFyZ2V0UG9zaXRpb246IC1uZXdUcmFuc2xhdGUsXG4gICAgICAgICAgc2lkZTogaXNIID8gJ2xlZnQnIDogJ3RvcCdcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgd3JhcHBlckVsLnNjcm9sbFRvKHtcbiAgICAgICAgW2lzSCA/ICdsZWZ0JyA6ICd0b3AnXTogLW5ld1RyYW5zbGF0ZSxcbiAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnXG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG4gICAgc3dpcGVyLnNldFRyYW5zbGF0ZShuZXdUcmFuc2xhdGUpO1xuICAgIGlmIChydW5DYWxsYmFja3MpIHtcbiAgICAgIHN3aXBlci5lbWl0KCdiZWZvcmVUcmFuc2l0aW9uU3RhcnQnLCBzcGVlZCwgaW50ZXJuYWwpO1xuICAgICAgc3dpcGVyLmVtaXQoJ3RyYW5zaXRpb25FbmQnKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLnNldFRyYW5zaXRpb24oc3BlZWQpO1xuICAgIHN3aXBlci5zZXRUcmFuc2xhdGUobmV3VHJhbnNsYXRlKTtcbiAgICBpZiAocnVuQ2FsbGJhY2tzKSB7XG4gICAgICBzd2lwZXIuZW1pdCgnYmVmb3JlVHJhbnNpdGlvblN0YXJ0Jywgc3BlZWQsIGludGVybmFsKTtcbiAgICAgIHN3aXBlci5lbWl0KCd0cmFuc2l0aW9uU3RhcnQnKTtcbiAgICB9XG4gICAgaWYgKCFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgICBzd2lwZXIuYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICAgIGlmICghc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCkge1xuICAgICAgICBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kID0gZnVuY3Rpb24gdHJhbnNpdGlvbkVuZChlKSB7XG4gICAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykgcmV0dXJuO1xuICAgICAgICAgIHN3aXBlci53cmFwcGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xuICAgICAgICAgIHN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQgPSBudWxsO1xuICAgICAgICAgIGRlbGV0ZSBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kO1xuICAgICAgICAgIGlmIChydW5DYWxsYmFja3MpIHtcbiAgICAgICAgICAgIHN3aXBlci5lbWl0KCd0cmFuc2l0aW9uRW5kJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgc3dpcGVyLndyYXBwZXJFbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCk7XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG52YXIgdHJhbnNsYXRlID0ge1xuICBnZXRUcmFuc2xhdGU6IGdldFN3aXBlclRyYW5zbGF0ZSxcbiAgc2V0VHJhbnNsYXRlLFxuICBtaW5UcmFuc2xhdGUsXG4gIG1heFRyYW5zbGF0ZSxcbiAgdHJhbnNsYXRlVG9cbn07XG5cbmZ1bmN0aW9uIHNldFRyYW5zaXRpb24oZHVyYXRpb24sIGJ5Q29udHJvbGxlcikge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoIXN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7ZHVyYXRpb259bXNgO1xuICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUudHJhbnNpdGlvbkRlbGF5ID0gZHVyYXRpb24gPT09IDAgPyBgMG1zYCA6ICcnO1xuICB9XG4gIHN3aXBlci5lbWl0KCdzZXRUcmFuc2l0aW9uJywgZHVyYXRpb24sIGJ5Q29udHJvbGxlcik7XG59XG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25FbWl0KF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgcnVuQ2FsbGJhY2tzLFxuICAgIGRpcmVjdGlvbixcbiAgICBzdGVwXG4gIH0gPSBfcmVmO1xuICBjb25zdCB7XG4gICAgYWN0aXZlSW5kZXgsXG4gICAgcHJldmlvdXNJbmRleFxuICB9ID0gc3dpcGVyO1xuICBsZXQgZGlyID0gZGlyZWN0aW9uO1xuICBpZiAoIWRpcikge1xuICAgIGlmIChhY3RpdmVJbmRleCA+IHByZXZpb3VzSW5kZXgpIGRpciA9ICduZXh0JztlbHNlIGlmIChhY3RpdmVJbmRleCA8IHByZXZpb3VzSW5kZXgpIGRpciA9ICdwcmV2JztlbHNlIGRpciA9ICdyZXNldCc7XG4gIH1cbiAgc3dpcGVyLmVtaXQoYHRyYW5zaXRpb24ke3N0ZXB9YCk7XG4gIGlmIChydW5DYWxsYmFja3MgJiYgYWN0aXZlSW5kZXggIT09IHByZXZpb3VzSW5kZXgpIHtcbiAgICBpZiAoZGlyID09PSAncmVzZXQnKSB7XG4gICAgICBzd2lwZXIuZW1pdChgc2xpZGVSZXNldFRyYW5zaXRpb24ke3N0ZXB9YCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KGBzbGlkZUNoYW5nZVRyYW5zaXRpb24ke3N0ZXB9YCk7XG4gICAgaWYgKGRpciA9PT0gJ25leHQnKSB7XG4gICAgICBzd2lwZXIuZW1pdChgc2xpZGVOZXh0VHJhbnNpdGlvbiR7c3RlcH1gKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLmVtaXQoYHNsaWRlUHJldlRyYW5zaXRpb24ke3N0ZXB9YCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25TdGFydChydW5DYWxsYmFja3MsIGRpcmVjdGlvbikge1xuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSByZXR1cm47XG4gIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gIH1cbiAgdHJhbnNpdGlvbkVtaXQoe1xuICAgIHN3aXBlcixcbiAgICBydW5DYWxsYmFja3MsXG4gICAgZGlyZWN0aW9uLFxuICAgIHN0ZXA6ICdTdGFydCdcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pIHtcbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIHN3aXBlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSByZXR1cm47XG4gIHN3aXBlci5zZXRUcmFuc2l0aW9uKDApO1xuICB0cmFuc2l0aW9uRW1pdCh7XG4gICAgc3dpcGVyLFxuICAgIHJ1bkNhbGxiYWNrcyxcbiAgICBkaXJlY3Rpb24sXG4gICAgc3RlcDogJ0VuZCdcbiAgfSk7XG59XG5cbnZhciB0cmFuc2l0aW9uID0ge1xuICBzZXRUcmFuc2l0aW9uLFxuICB0cmFuc2l0aW9uU3RhcnQsXG4gIHRyYW5zaXRpb25FbmRcbn07XG5cbmZ1bmN0aW9uIHNsaWRlVG8oaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsLCBpbml0aWFsKSB7XG4gIGlmIChpbmRleCA9PT0gdm9pZCAwKSB7XG4gICAgaW5kZXggPSAwO1xuICB9XG4gIGlmIChzcGVlZCA9PT0gdm9pZCAwKSB7XG4gICAgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgfVxuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGlmICh0eXBlb2YgaW5kZXggPT09ICdzdHJpbmcnKSB7XG4gICAgaW5kZXggPSBwYXJzZUludChpbmRleCwgMTApO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGxldCBzbGlkZUluZGV4ID0gaW5kZXg7XG4gIGlmIChzbGlkZUluZGV4IDwgMCkgc2xpZGVJbmRleCA9IDA7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgc25hcEdyaWQsXG4gICAgc2xpZGVzR3JpZCxcbiAgICBwcmV2aW91c0luZGV4LFxuICAgIGFjdGl2ZUluZGV4LFxuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIHdyYXBwZXJFbCxcbiAgICBlbmFibGVkXG4gIH0gPSBzd2lwZXI7XG4gIGlmIChzd2lwZXIuYW5pbWF0aW5nICYmIHBhcmFtcy5wcmV2ZW50SW50ZXJhY3Rpb25PblRyYW5zaXRpb24gfHwgIWVuYWJsZWQgJiYgIWludGVybmFsICYmICFpbml0aWFsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IHNraXAgPSBNYXRoLm1pbihzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCwgc2xpZGVJbmRleCk7XG4gIGxldCBzbmFwSW5kZXggPSBza2lwICsgTWF0aC5mbG9vcigoc2xpZGVJbmRleCAtIHNraXApIC8gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gIGlmIChzbmFwSW5kZXggPj0gc25hcEdyaWQubGVuZ3RoKSBzbmFwSW5kZXggPSBzbmFwR3JpZC5sZW5ndGggLSAxO1xuICBjb25zdCB0cmFuc2xhdGUgPSAtc25hcEdyaWRbc25hcEluZGV4XTtcbiAgLy8gTm9ybWFsaXplIHNsaWRlSW5kZXhcbiAgaWYgKHBhcmFtcy5ub3JtYWxpemVTbGlkZUluZGV4KSB7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNHcmlkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBub3JtYWxpemVkVHJhbnNsYXRlID0gLU1hdGguZmxvb3IodHJhbnNsYXRlICogMTAwKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRHcmlkID0gTWF0aC5mbG9vcihzbGlkZXNHcmlkW2ldICogMTAwKTtcbiAgICAgIGNvbnN0IG5vcm1hbGl6ZWRHcmlkTmV4dCA9IE1hdGguZmxvb3Ioc2xpZGVzR3JpZFtpICsgMV0gKiAxMDApO1xuICAgICAgaWYgKHR5cGVvZiBzbGlkZXNHcmlkW2kgKyAxXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKG5vcm1hbGl6ZWRUcmFuc2xhdGUgPj0gbm9ybWFsaXplZEdyaWQgJiYgbm9ybWFsaXplZFRyYW5zbGF0ZSA8IG5vcm1hbGl6ZWRHcmlkTmV4dCAtIChub3JtYWxpemVkR3JpZE5leHQgLSBub3JtYWxpemVkR3JpZCkgLyAyKSB7XG4gICAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICAgIH0gZWxzZSBpZiAobm9ybWFsaXplZFRyYW5zbGF0ZSA+PSBub3JtYWxpemVkR3JpZCAmJiBub3JtYWxpemVkVHJhbnNsYXRlIDwgbm9ybWFsaXplZEdyaWROZXh0KSB7XG4gICAgICAgICAgc2xpZGVJbmRleCA9IGkgKyAxO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5vcm1hbGl6ZWRUcmFuc2xhdGUgPj0gbm9ybWFsaXplZEdyaWQpIHtcbiAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIC8vIERpcmVjdGlvbnMgbG9ja3NcbiAgaWYgKHN3aXBlci5pbml0aWFsaXplZCAmJiBzbGlkZUluZGV4ICE9PSBhY3RpdmVJbmRleCkge1xuICAgIGlmICghc3dpcGVyLmFsbG93U2xpZGVOZXh0ICYmIChydGwgPyB0cmFuc2xhdGUgPiBzd2lwZXIudHJhbnNsYXRlICYmIHRyYW5zbGF0ZSA+IHN3aXBlci5taW5UcmFuc2xhdGUoKSA6IHRyYW5zbGF0ZSA8IHN3aXBlci50cmFuc2xhdGUgJiYgdHJhbnNsYXRlIDwgc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlUHJldiAmJiB0cmFuc2xhdGUgPiBzd2lwZXIudHJhbnNsYXRlICYmIHRyYW5zbGF0ZSA+IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgaWYgKChhY3RpdmVJbmRleCB8fCAwKSAhPT0gc2xpZGVJbmRleCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChzbGlkZUluZGV4ICE9PSAocHJldmlvdXNJbmRleCB8fCAwKSAmJiBydW5DYWxsYmFja3MpIHtcbiAgICBzd2lwZXIuZW1pdCgnYmVmb3JlU2xpZGVDaGFuZ2VTdGFydCcpO1xuICB9XG5cbiAgLy8gVXBkYXRlIHByb2dyZXNzXG4gIHN3aXBlci51cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUpO1xuICBsZXQgZGlyZWN0aW9uO1xuICBpZiAoc2xpZGVJbmRleCA+IGFjdGl2ZUluZGV4KSBkaXJlY3Rpb24gPSAnbmV4dCc7ZWxzZSBpZiAoc2xpZGVJbmRleCA8IGFjdGl2ZUluZGV4KSBkaXJlY3Rpb24gPSAncHJldic7ZWxzZSBkaXJlY3Rpb24gPSAncmVzZXQnO1xuXG4gIC8vIFVwZGF0ZSBJbmRleFxuICBpZiAocnRsICYmIC10cmFuc2xhdGUgPT09IHN3aXBlci50cmFuc2xhdGUgfHwgIXJ0bCAmJiB0cmFuc2xhdGUgPT09IHN3aXBlci50cmFuc2xhdGUpIHtcbiAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoc2xpZGVJbmRleCk7XG4gICAgLy8gVXBkYXRlIEhlaWdodFxuICAgIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgc3dpcGVyLnVwZGF0ZUF1dG9IZWlnaHQoKTtcbiAgICB9XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICBpZiAocGFyYW1zLmVmZmVjdCAhPT0gJ3NsaWRlJykge1xuICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xuICAgIH1cbiAgICBpZiAoZGlyZWN0aW9uICE9PSAncmVzZXQnKSB7XG4gICAgICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgIGNvbnN0IGlzSCA9IHN3aXBlci5pc0hvcml6b250YWwoKTtcbiAgICBjb25zdCB0ID0gcnRsID8gdHJhbnNsYXRlIDogLXRyYW5zbGF0ZTtcbiAgICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICAgIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICAgICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnNjcm9sbFNuYXBUeXBlID0gJ25vbmUnO1xuICAgICAgICBzd2lwZXIuX2ltbWVkaWF0ZVZpcnR1YWwgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKGlzVmlydHVhbCAmJiAhc3dpcGVyLl9jc3NNb2RlVmlydHVhbEluaXRpYWxTZXQgJiYgc3dpcGVyLnBhcmFtcy5pbml0aWFsU2xpZGUgPiAwKSB7XG4gICAgICAgIHN3aXBlci5fY3NzTW9kZVZpcnR1YWxJbml0aWFsU2V0ID0gdHJ1ZTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICB3cmFwcGVyRWxbaXNIID8gJ3Njcm9sbExlZnQnIDogJ3Njcm9sbFRvcCddID0gdDtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cmFwcGVyRWxbaXNIID8gJ3Njcm9sbExlZnQnIDogJ3Njcm9sbFRvcCddID0gdDtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnNjcm9sbFNuYXBUeXBlID0gJyc7XG4gICAgICAgICAgc3dpcGVyLl9pbW1lZGlhdGVWaXJ0dWFsID0gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXN3aXBlci5zdXBwb3J0LnNtb290aFNjcm9sbCkge1xuICAgICAgICBhbmltYXRlQ1NTTW9kZVNjcm9sbCh7XG4gICAgICAgICAgc3dpcGVyLFxuICAgICAgICAgIHRhcmdldFBvc2l0aW9uOiB0LFxuICAgICAgICAgIHNpZGU6IGlzSCA/ICdsZWZ0JyA6ICd0b3AnXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHdyYXBwZXJFbC5zY3JvbGxUbyh7XG4gICAgICAgIFtpc0ggPyAnbGVmdCcgOiAndG9wJ106IHQsXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHN3aXBlci5zZXRUcmFuc2l0aW9uKHNwZWVkKTtcbiAgc3dpcGVyLnNldFRyYW5zbGF0ZSh0cmFuc2xhdGUpO1xuICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoc2xpZGVJbmRleCk7XG4gIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gIHN3aXBlci5lbWl0KCdiZWZvcmVUcmFuc2l0aW9uU3RhcnQnLCBzcGVlZCwgaW50ZXJuYWwpO1xuICBzd2lwZXIudHJhbnNpdGlvblN0YXJ0KHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgc3dpcGVyLnRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICB9IGVsc2UgaWYgKCFzd2lwZXIuYW5pbWF0aW5nKSB7XG4gICAgc3dpcGVyLmFuaW1hdGluZyA9IHRydWU7XG4gICAgaWYgKCFzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpIHtcbiAgICAgIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoZSkge1xuICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgIGlmIChlLnRhcmdldCAhPT0gdGhpcykgcmV0dXJuO1xuICAgICAgICBzd2lwZXIud3JhcHBlckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xuICAgICAgICBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQgPSBudWxsO1xuICAgICAgICBkZWxldGUgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kO1xuICAgICAgICBzd2lwZXIudHJhbnNpdGlvbkVuZChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gICAgICB9O1xuICAgIH1cbiAgICBzd2lwZXIud3JhcHBlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG5mdW5jdGlvbiBzbGlkZVRvTG9vcChpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgaWYgKGluZGV4ID09PSB2b2lkIDApIHtcbiAgICBpbmRleCA9IDA7XG4gIH1cbiAgaWYgKHNwZWVkID09PSB2b2lkIDApIHtcbiAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICB9XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgaWYgKHR5cGVvZiBpbmRleCA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25zdCBpbmRleEFzTnVtYmVyID0gcGFyc2VJbnQoaW5kZXgsIDEwKTtcbiAgICBpbmRleCA9IGluZGV4QXNOdW1iZXI7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgZ3JpZEVuYWJsZWQgPSBzd2lwZXIuZ3JpZCAmJiBzd2lwZXIucGFyYW1zLmdyaWQgJiYgc3dpcGVyLnBhcmFtcy5ncmlkLnJvd3MgPiAxO1xuICBsZXQgbmV3SW5kZXggPSBpbmRleDtcbiAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgIGlmIChzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBuZXdJbmRleCA9IG5ld0luZGV4ICsgc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgdGFyZ2V0U2xpZGVJbmRleDtcbiAgICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgICBjb25zdCBzbGlkZUluZGV4ID0gbmV3SW5kZXggKiBzd2lwZXIucGFyYW1zLmdyaWQucm93cztcbiAgICAgICAgdGFyZ2V0U2xpZGVJbmRleCA9IHN3aXBlci5zbGlkZXMuZmlsdGVyKHNsaWRlRWwgPT4gc2xpZGVFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykgKiAxID09PSBzbGlkZUluZGV4KVswXS5jb2x1bW47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRTbGlkZUluZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXhCeURhdGEobmV3SW5kZXgpO1xuICAgICAgfVxuICAgICAgY29uc3QgY29scyA9IGdyaWRFbmFibGVkID8gTWF0aC5jZWlsKHN3aXBlci5zbGlkZXMubGVuZ3RoIC8gc3dpcGVyLnBhcmFtcy5ncmlkLnJvd3MpIDogc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNlbnRlcmVkU2xpZGVzXG4gICAgICB9ID0gc3dpcGVyLnBhcmFtcztcbiAgICAgIGxldCBzbGlkZXNQZXJWaWV3ID0gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgICAgaWYgKHNsaWRlc1BlclZpZXcgPT09ICdhdXRvJykge1xuICAgICAgICBzbGlkZXNQZXJWaWV3ID0gc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZXNQZXJWaWV3ID0gTWF0aC5jZWlsKHBhcnNlRmxvYXQoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3LCAxMCkpO1xuICAgICAgICBpZiAoY2VudGVyZWRTbGlkZXMgJiYgc2xpZGVzUGVyVmlldyAlIDIgPT09IDApIHtcbiAgICAgICAgICBzbGlkZXNQZXJWaWV3ID0gc2xpZGVzUGVyVmlldyArIDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxldCBuZWVkTG9vcEZpeCA9IGNvbHMgLSB0YXJnZXRTbGlkZUluZGV4IDwgc2xpZGVzUGVyVmlldztcbiAgICAgIGlmIChjZW50ZXJlZFNsaWRlcykge1xuICAgICAgICBuZWVkTG9vcEZpeCA9IG5lZWRMb29wRml4IHx8IHRhcmdldFNsaWRlSW5kZXggPCBNYXRoLmNlaWwoc2xpZGVzUGVyVmlldyAvIDIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMb29wRml4KSB7XG4gICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IGNlbnRlcmVkU2xpZGVzID8gdGFyZ2V0U2xpZGVJbmRleCA8IHN3aXBlci5hY3RpdmVJbmRleCA/ICdwcmV2JyA6ICduZXh0JyA6IHRhcmdldFNsaWRlSW5kZXggLSBzd2lwZXIuYWN0aXZlSW5kZXggLSAxIDwgc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID8gJ25leHQnIDogJ3ByZXYnO1xuICAgICAgICBzd2lwZXIubG9vcEZpeCh7XG4gICAgICAgICAgZGlyZWN0aW9uLFxuICAgICAgICAgIHNsaWRlVG86IHRydWUsXG4gICAgICAgICAgYWN0aXZlU2xpZGVJbmRleDogZGlyZWN0aW9uID09PSAnbmV4dCcgPyB0YXJnZXRTbGlkZUluZGV4ICsgMSA6IHRhcmdldFNsaWRlSW5kZXggLSBjb2xzICsgMSxcbiAgICAgICAgICBzbGlkZVJlYWxJbmRleDogZGlyZWN0aW9uID09PSAnbmV4dCcgPyBzd2lwZXIucmVhbEluZGV4IDogdW5kZWZpbmVkXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICAgIGNvbnN0IHNsaWRlSW5kZXggPSBuZXdJbmRleCAqIHN3aXBlci5wYXJhbXMuZ3JpZC5yb3dzO1xuICAgICAgICBuZXdJbmRleCA9IHN3aXBlci5zbGlkZXMuZmlsdGVyKHNsaWRlRWwgPT4gc2xpZGVFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykgKiAxID09PSBzbGlkZUluZGV4KVswXS5jb2x1bW47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXdJbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4QnlEYXRhKG5ld0luZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICBzd2lwZXIuc2xpZGVUbyhuZXdJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICB9KTtcbiAgcmV0dXJuIHN3aXBlcjtcbn1cblxuLyogZXNsaW50IG5vLXVudXNlZC12YXJzOiBcIm9mZlwiICovXG5mdW5jdGlvbiBzbGlkZU5leHQoc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgaWYgKHNwZWVkID09PSB2b2lkIDApIHtcbiAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICB9XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIGVuYWJsZWQsXG4gICAgcGFyYW1zLFxuICAgIGFuaW1hdGluZ1xuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVuYWJsZWQpIHJldHVybiBzd2lwZXI7XG4gIGxldCBwZXJHcm91cCA9IHBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgJiYgcGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAxICYmIHBhcmFtcy5zbGlkZXNQZXJHcm91cEF1dG8pIHtcbiAgICBwZXJHcm91cCA9IE1hdGgubWF4KHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygnY3VycmVudCcsIHRydWUpLCAxKTtcbiAgfVxuICBjb25zdCBpbmNyZW1lbnQgPSBzd2lwZXIuYWN0aXZlSW5kZXggPCBwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwID8gMSA6IHBlckdyb3VwO1xuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoYW5pbWF0aW5nICYmICFpc1ZpcnR1YWwgJiYgcGFyYW1zLmxvb3BQcmV2ZW50c1NsaWRpbmcpIHJldHVybiBmYWxzZTtcbiAgICBzd2lwZXIubG9vcEZpeCh7XG4gICAgICBkaXJlY3Rpb246ICduZXh0J1xuICAgIH0pO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHN3aXBlci5fY2xpZW50TGVmdCA9IHN3aXBlci53cmFwcGVyRWwuY2xpZW50TGVmdDtcbiAgICBpZiAoc3dpcGVyLmFjdGl2ZUluZGV4ID09PSBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEgJiYgcGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCArIGluY3JlbWVudCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgaWYgKHBhcmFtcy5yZXdpbmQgJiYgc3dpcGVyLmlzRW5kKSB7XG4gICAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKDAsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgfVxuICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4ICsgaW5jcmVtZW50LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG59XG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuZnVuY3Rpb24gc2xpZGVQcmV2KHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gIGlmIChzcGVlZCA9PT0gdm9pZCAwKSB7XG4gICAgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgfVxuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgc25hcEdyaWQsXG4gICAgc2xpZGVzR3JpZCxcbiAgICBydGxUcmFuc2xhdGUsXG4gICAgZW5hYmxlZCxcbiAgICBhbmltYXRpbmdcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbmFibGVkKSByZXR1cm4gc3dpcGVyO1xuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoYW5pbWF0aW5nICYmICFpc1ZpcnR1YWwgJiYgcGFyYW1zLmxvb3BQcmV2ZW50c1NsaWRpbmcpIHJldHVybiBmYWxzZTtcbiAgICBzd2lwZXIubG9vcEZpeCh7XG4gICAgICBkaXJlY3Rpb246ICdwcmV2J1xuICAgIH0pO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgIHN3aXBlci5fY2xpZW50TGVmdCA9IHN3aXBlci53cmFwcGVyRWwuY2xpZW50TGVmdDtcbiAgfVxuICBjb25zdCB0cmFuc2xhdGUgPSBydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG4gIGZ1bmN0aW9uIG5vcm1hbGl6ZSh2YWwpIHtcbiAgICBpZiAodmFsIDwgMCkgcmV0dXJuIC1NYXRoLmZsb29yKE1hdGguYWJzKHZhbCkpO1xuICAgIHJldHVybiBNYXRoLmZsb29yKHZhbCk7XG4gIH1cbiAgY29uc3Qgbm9ybWFsaXplZFRyYW5zbGF0ZSA9IG5vcm1hbGl6ZSh0cmFuc2xhdGUpO1xuICBjb25zdCBub3JtYWxpemVkU25hcEdyaWQgPSBzbmFwR3JpZC5tYXAodmFsID0+IG5vcm1hbGl6ZSh2YWwpKTtcbiAgbGV0IHByZXZTbmFwID0gc25hcEdyaWRbbm9ybWFsaXplZFNuYXBHcmlkLmluZGV4T2Yobm9ybWFsaXplZFRyYW5zbGF0ZSkgLSAxXTtcbiAgaWYgKHR5cGVvZiBwcmV2U25hcCA9PT0gJ3VuZGVmaW5lZCcgJiYgcGFyYW1zLmNzc01vZGUpIHtcbiAgICBsZXQgcHJldlNuYXBJbmRleDtcbiAgICBzbmFwR3JpZC5mb3JFYWNoKChzbmFwLCBzbmFwSW5kZXgpID0+IHtcbiAgICAgIGlmIChub3JtYWxpemVkVHJhbnNsYXRlID49IHNuYXApIHtcbiAgICAgICAgLy8gcHJldlNuYXAgPSBzbmFwO1xuICAgICAgICBwcmV2U25hcEluZGV4ID0gc25hcEluZGV4O1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmICh0eXBlb2YgcHJldlNuYXBJbmRleCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHByZXZTbmFwID0gc25hcEdyaWRbcHJldlNuYXBJbmRleCA+IDAgPyBwcmV2U25hcEluZGV4IC0gMSA6IHByZXZTbmFwSW5kZXhdO1xuICAgIH1cbiAgfVxuICBsZXQgcHJldkluZGV4ID0gMDtcbiAgaWYgKHR5cGVvZiBwcmV2U25hcCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBwcmV2SW5kZXggPSBzbGlkZXNHcmlkLmluZGV4T2YocHJldlNuYXApO1xuICAgIGlmIChwcmV2SW5kZXggPCAwKSBwcmV2SW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXggLSAxO1xuICAgIGlmIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nICYmIHBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMSAmJiBwYXJhbXMuc2xpZGVzUGVyR3JvdXBBdXRvKSB7XG4gICAgICBwcmV2SW5kZXggPSBwcmV2SW5kZXggLSBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoJ3ByZXZpb3VzJywgdHJ1ZSkgKyAxO1xuICAgICAgcHJldkluZGV4ID0gTWF0aC5tYXgocHJldkluZGV4LCAwKTtcbiAgICB9XG4gIH1cbiAgaWYgKHBhcmFtcy5yZXdpbmQgJiYgc3dpcGVyLmlzQmVnaW5uaW5nKSB7XG4gICAgY29uc3QgbGFzdEluZGV4ID0gc3dpcGVyLnBhcmFtcy52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkICYmIHN3aXBlci52aXJ0dWFsID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCAtIDEgOiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKGxhc3RJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xuICB9IGVsc2UgaWYgKHBhcmFtcy5sb29wICYmIHN3aXBlci5hY3RpdmVJbmRleCA9PT0gMCAmJiBwYXJhbXMuY3NzTW9kZSkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhwcmV2SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gc3dpcGVyLnNsaWRlVG8ocHJldkluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG59XG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuZnVuY3Rpb24gc2xpZGVSZXNldChzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xuICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG59XG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuZnVuY3Rpb24gc2xpZGVUb0Nsb3Nlc3Qoc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwsIHRocmVzaG9sZCkge1xuICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBpZiAodGhyZXNob2xkID09PSB2b2lkIDApIHtcbiAgICB0aHJlc2hvbGQgPSAwLjU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgbGV0IGluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICBjb25zdCBza2lwID0gTWF0aC5taW4oc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAsIGluZGV4KTtcbiAgY29uc3Qgc25hcEluZGV4ID0gc2tpcCArIE1hdGguZmxvb3IoKGluZGV4IC0gc2tpcCkgLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKTtcbiAgY29uc3QgdHJhbnNsYXRlID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgaWYgKHRyYW5zbGF0ZSA+PSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4XSkge1xuICAgIC8vIFRoZSBjdXJyZW50IHRyYW5zbGF0ZSBpcyBvbiBvciBhZnRlciB0aGUgY3VycmVudCBzbmFwIGluZGV4LCBzbyB0aGUgY2hvaWNlXG4gICAgLy8gaXMgYmV0d2VlbiB0aGUgY3VycmVudCBpbmRleCBhbmQgdGhlIG9uZSBhZnRlciBpdC5cbiAgICBjb25zdCBjdXJyZW50U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXhdO1xuICAgIGNvbnN0IG5leHRTbmFwID0gc3dpcGVyLnNuYXBHcmlkW3NuYXBJbmRleCArIDFdO1xuICAgIGlmICh0cmFuc2xhdGUgLSBjdXJyZW50U25hcCA+IChuZXh0U25hcCAtIGN1cnJlbnRTbmFwKSAqIHRocmVzaG9sZCkge1xuICAgICAgaW5kZXggKz0gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gVGhlIGN1cnJlbnQgdHJhbnNsYXRlIGlzIGJlZm9yZSB0aGUgY3VycmVudCBzbmFwIGluZGV4LCBzbyB0aGUgY2hvaWNlXG4gICAgLy8gaXMgYmV0d2VlbiB0aGUgY3VycmVudCBpbmRleCBhbmQgdGhlIG9uZSBiZWZvcmUgaXQuXG4gICAgY29uc3QgcHJldlNuYXAgPSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4IC0gMV07XG4gICAgY29uc3QgY3VycmVudFNuYXAgPSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4XTtcbiAgICBpZiAodHJhbnNsYXRlIC0gcHJldlNuYXAgPD0gKGN1cnJlbnRTbmFwIC0gcHJldlNuYXApICogdGhyZXNob2xkKSB7XG4gICAgICBpbmRleCAtPSBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICAgIH1cbiAgfVxuICBpbmRleCA9IE1hdGgubWF4KGluZGV4LCAwKTtcbiAgaW5kZXggPSBNYXRoLm1pbihpbmRleCwgc3dpcGVyLnNsaWRlc0dyaWQubGVuZ3RoIC0gMSk7XG4gIHJldHVybiBzd2lwZXIuc2xpZGVUbyhpbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufVxuXG5mdW5jdGlvbiBzbGlkZVRvQ2xpY2tlZFNsaWRlKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHNsaWRlc0VsXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IHNsaWRlc1BlclZpZXcgPSBwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nID8gc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCkgOiBwYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgbGV0IHNsaWRlVG9JbmRleCA9IHN3aXBlci5jbGlja2VkSW5kZXg7XG4gIGxldCByZWFsSW5kZXg7XG4gIGNvbnN0IHNsaWRlU2VsZWN0b3IgPSBzd2lwZXIuaXNFbGVtZW50ID8gYHN3aXBlci1zbGlkZWAgOiBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9YDtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgaWYgKHN3aXBlci5hbmltYXRpbmcpIHJldHVybjtcbiAgICByZWFsSW5kZXggPSBwYXJzZUludChzd2lwZXIuY2xpY2tlZFNsaWRlLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApO1xuICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIGlmIChzbGlkZVRvSW5kZXggPCBzd2lwZXIubG9vcGVkU2xpZGVzIC0gc2xpZGVzUGVyVmlldyAvIDIgfHwgc2xpZGVUb0luZGV4ID4gc3dpcGVyLnNsaWRlcy5sZW5ndGggLSBzd2lwZXIubG9vcGVkU2xpZGVzICsgc2xpZGVzUGVyVmlldyAvIDIpIHtcbiAgICAgICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgICAgICAgc2xpZGVUb0luZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXgoZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgJHtzbGlkZVNlbGVjdG9yfVtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7cmVhbEluZGV4fVwiXWApWzBdKTtcbiAgICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNsaWRlVG9JbmRleCA+IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gc2xpZGVzUGVyVmlldykge1xuICAgICAgc3dpcGVyLmxvb3BGaXgoKTtcbiAgICAgIHNsaWRlVG9JbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4KGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYCR7c2xpZGVTZWxlY3Rvcn1bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3JlYWxJbmRleH1cIl1gKVswXSk7XG4gICAgICBuZXh0VGljaygoKSA9PiB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLnNsaWRlVG8oc2xpZGVUb0luZGV4KTtcbiAgfVxufVxuXG52YXIgc2xpZGUgPSB7XG4gIHNsaWRlVG8sXG4gIHNsaWRlVG9Mb29wLFxuICBzbGlkZU5leHQsXG4gIHNsaWRlUHJldixcbiAgc2xpZGVSZXNldCxcbiAgc2xpZGVUb0Nsb3Nlc3QsXG4gIHNsaWRlVG9DbGlja2VkU2xpZGVcbn07XG5cbmZ1bmN0aW9uIGxvb3BDcmVhdGUoc2xpZGVSZWFsSW5kZXgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBzbGlkZXNFbFxuICB9ID0gc3dpcGVyO1xuICBpZiAoIXBhcmFtcy5sb29wIHx8IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSByZXR1cm47XG4gIGNvbnN0IGluaXRTbGlkZXMgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2xpZGVzID0gZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKTtcbiAgICBzbGlkZXMuZm9yRWFjaCgoZWwsIGluZGV4KSA9PiB7XG4gICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JywgaW5kZXgpO1xuICAgIH0pO1xuICB9O1xuICBjb25zdCBncmlkRW5hYmxlZCA9IHN3aXBlci5ncmlkICYmIHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxO1xuICBjb25zdCBzbGlkZXNQZXJHcm91cCA9IHBhcmFtcy5zbGlkZXNQZXJHcm91cCAqIChncmlkRW5hYmxlZCA/IHBhcmFtcy5ncmlkLnJvd3MgOiAxKTtcbiAgY29uc3Qgc2hvdWxkRmlsbEdyb3VwID0gc3dpcGVyLnNsaWRlcy5sZW5ndGggJSBzbGlkZXNQZXJHcm91cCAhPT0gMDtcbiAgY29uc3Qgc2hvdWxkRmlsbEdyaWQgPSBncmlkRW5hYmxlZCAmJiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAlIHBhcmFtcy5ncmlkLnJvd3MgIT09IDA7XG4gIGNvbnN0IGFkZEJsYW5rU2xpZGVzID0gYW1vdW50T2ZTbGlkZXMgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYW1vdW50T2ZTbGlkZXM7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc2xpZGVFbCA9IHN3aXBlci5pc0VsZW1lbnQgPyBjcmVhdGVFbGVtZW50KCdzd2lwZXItc2xpZGUnLCBbcGFyYW1zLnNsaWRlQmxhbmtDbGFzc10pIDogY3JlYXRlRWxlbWVudCgnZGl2JywgW3BhcmFtcy5zbGlkZUNsYXNzLCBwYXJhbXMuc2xpZGVCbGFua0NsYXNzXSk7XG4gICAgICBzd2lwZXIuc2xpZGVzRWwuYXBwZW5kKHNsaWRlRWwpO1xuICAgIH1cbiAgfTtcbiAgaWYgKHNob3VsZEZpbGxHcm91cCkge1xuICAgIGlmIChwYXJhbXMubG9vcEFkZEJsYW5rU2xpZGVzKSB7XG4gICAgICBjb25zdCBzbGlkZXNUb0FkZCA9IHNsaWRlc1Blckdyb3VwIC0gc3dpcGVyLnNsaWRlcy5sZW5ndGggJSBzbGlkZXNQZXJHcm91cDtcbiAgICAgIGFkZEJsYW5rU2xpZGVzKHNsaWRlc1RvQWRkKTtcbiAgICAgIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvd1dhcm5pbmcoJ1N3aXBlciBMb29wIFdhcm5pbmc6IFRoZSBudW1iZXIgb2Ygc2xpZGVzIGlzIG5vdCBldmVuIHRvIHNsaWRlc1Blckdyb3VwLCBsb29wIG1vZGUgbWF5IG5vdCBmdW5jdGlvbiBwcm9wZXJseS4gWW91IG5lZWQgdG8gYWRkIG1vcmUgc2xpZGVzIChvciBtYWtlIGR1cGxpY2F0ZXMsIG9yIGVtcHR5IHNsaWRlcyknKTtcbiAgICB9XG4gICAgaW5pdFNsaWRlcygpO1xuICB9IGVsc2UgaWYgKHNob3VsZEZpbGxHcmlkKSB7XG4gICAgaWYgKHBhcmFtcy5sb29wQWRkQmxhbmtTbGlkZXMpIHtcbiAgICAgIGNvbnN0IHNsaWRlc1RvQWRkID0gcGFyYW1zLmdyaWQucm93cyAtIHN3aXBlci5zbGlkZXMubGVuZ3RoICUgcGFyYW1zLmdyaWQucm93cztcbiAgICAgIGFkZEJsYW5rU2xpZGVzKHNsaWRlc1RvQWRkKTtcbiAgICAgIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc2hvd1dhcm5pbmcoJ1N3aXBlciBMb29wIFdhcm5pbmc6IFRoZSBudW1iZXIgb2Ygc2xpZGVzIGlzIG5vdCBldmVuIHRvIGdyaWQucm93cywgbG9vcCBtb2RlIG1heSBub3QgZnVuY3Rpb24gcHJvcGVybHkuIFlvdSBuZWVkIHRvIGFkZCBtb3JlIHNsaWRlcyAob3IgbWFrZSBkdXBsaWNhdGVzLCBvciBlbXB0eSBzbGlkZXMpJyk7XG4gICAgfVxuICAgIGluaXRTbGlkZXMoKTtcbiAgfSBlbHNlIHtcbiAgICBpbml0U2xpZGVzKCk7XG4gIH1cbiAgc3dpcGVyLmxvb3BGaXgoe1xuICAgIHNsaWRlUmVhbEluZGV4LFxuICAgIGRpcmVjdGlvbjogcGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gdW5kZWZpbmVkIDogJ25leHQnXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBsb29wRml4KF90ZW1wKSB7XG4gIGxldCB7XG4gICAgc2xpZGVSZWFsSW5kZXgsXG4gICAgc2xpZGVUbyA9IHRydWUsXG4gICAgZGlyZWN0aW9uLFxuICAgIHNldFRyYW5zbGF0ZSxcbiAgICBhY3RpdmVTbGlkZUluZGV4LFxuICAgIGJ5Q29udHJvbGxlcixcbiAgICBieU1vdXNld2hlZWxcbiAgfSA9IF90ZW1wID09PSB2b2lkIDAgPyB7fSA6IF90ZW1wO1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoIXN3aXBlci5wYXJhbXMubG9vcCkgcmV0dXJuO1xuICBzd2lwZXIuZW1pdCgnYmVmb3JlTG9vcEZpeCcpO1xuICBjb25zdCB7XG4gICAgc2xpZGVzLFxuICAgIGFsbG93U2xpZGVQcmV2LFxuICAgIGFsbG93U2xpZGVOZXh0LFxuICAgIHNsaWRlc0VsLFxuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBjb25zdCB7XG4gICAgY2VudGVyZWRTbGlkZXNcbiAgfSA9IHBhcmFtcztcbiAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gdHJ1ZTtcbiAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gdHJ1ZTtcbiAgaWYgKHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICBpZiAoc2xpZGVUbykge1xuICAgICAgaWYgKCFwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgc3dpcGVyLnNuYXBJbmRleCA9PT0gMCkge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBzd2lwZXIuc25hcEluZGV4IDwgcGFyYW1zLnNsaWRlc1BlclZpZXcpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCArIHN3aXBlci5zbmFwSW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH0gZWxzZSBpZiAoc3dpcGVyLnNuYXBJbmRleCA9PT0gc3dpcGVyLnNuYXBHcmlkLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IGFsbG93U2xpZGVQcmV2O1xuICAgIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IGFsbG93U2xpZGVOZXh0O1xuICAgIHN3aXBlci5lbWl0KCdsb29wRml4Jyk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGxldCBzbGlkZXNQZXJWaWV3ID0gcGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gIGlmIChzbGlkZXNQZXJWaWV3ID09PSAnYXV0bycpIHtcbiAgICBzbGlkZXNQZXJWaWV3ID0gc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCk7XG4gIH0gZWxzZSB7XG4gICAgc2xpZGVzUGVyVmlldyA9IE1hdGguY2VpbChwYXJzZUZsb2F0KHBhcmFtcy5zbGlkZXNQZXJWaWV3LCAxMCkpO1xuICAgIGlmIChjZW50ZXJlZFNsaWRlcyAmJiBzbGlkZXNQZXJWaWV3ICUgMiA9PT0gMCkge1xuICAgICAgc2xpZGVzUGVyVmlldyA9IHNsaWRlc1BlclZpZXcgKyAxO1xuICAgIH1cbiAgfVxuICBjb25zdCBzbGlkZXNQZXJHcm91cCA9IHBhcmFtcy5zbGlkZXNQZXJHcm91cEF1dG8gPyBzbGlkZXNQZXJWaWV3IDogcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICBsZXQgbG9vcGVkU2xpZGVzID0gc2xpZGVzUGVyR3JvdXA7XG4gIGlmIChsb29wZWRTbGlkZXMgJSBzbGlkZXNQZXJHcm91cCAhPT0gMCkge1xuICAgIGxvb3BlZFNsaWRlcyArPSBzbGlkZXNQZXJHcm91cCAtIGxvb3BlZFNsaWRlcyAlIHNsaWRlc1Blckdyb3VwO1xuICB9XG4gIGxvb3BlZFNsaWRlcyArPSBwYXJhbXMubG9vcEFkZGl0aW9uYWxTbGlkZXM7XG4gIHN3aXBlci5sb29wZWRTbGlkZXMgPSBsb29wZWRTbGlkZXM7XG4gIGNvbnN0IGdyaWRFbmFibGVkID0gc3dpcGVyLmdyaWQgJiYgcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDE7XG4gIGlmIChzbGlkZXMubGVuZ3RoIDwgc2xpZGVzUGVyVmlldyArIGxvb3BlZFNsaWRlcykge1xuICAgIHNob3dXYXJuaW5nKCdTd2lwZXIgTG9vcCBXYXJuaW5nOiBUaGUgbnVtYmVyIG9mIHNsaWRlcyBpcyBub3QgZW5vdWdoIGZvciBsb29wIG1vZGUsIGl0IHdpbGwgYmUgZGlzYWJsZWQgYW5kIG5vdCBmdW5jdGlvbiBwcm9wZXJseS4gWW91IG5lZWQgdG8gYWRkIG1vcmUgc2xpZGVzIChvciBtYWtlIGR1cGxpY2F0ZXMpIG9yIGxvd2VyIHRoZSB2YWx1ZXMgb2Ygc2xpZGVzUGVyVmlldyBhbmQgc2xpZGVzUGVyR3JvdXAgcGFyYW1ldGVycycpO1xuICB9IGVsc2UgaWYgKGdyaWRFbmFibGVkICYmIHBhcmFtcy5ncmlkLmZpbGwgPT09ICdyb3cnKSB7XG4gICAgc2hvd1dhcm5pbmcoJ1N3aXBlciBMb29wIFdhcm5pbmc6IExvb3AgbW9kZSBpcyBub3QgY29tcGF0aWJsZSB3aXRoIGdyaWQuZmlsbCA9IGByb3dgJyk7XG4gIH1cbiAgY29uc3QgcHJlcGVuZFNsaWRlc0luZGV4ZXMgPSBbXTtcbiAgY29uc3QgYXBwZW5kU2xpZGVzSW5kZXhlcyA9IFtdO1xuICBsZXQgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gIGlmICh0eXBlb2YgYWN0aXZlU2xpZGVJbmRleCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBhY3RpdmVTbGlkZUluZGV4ID0gc3dpcGVyLmdldFNsaWRlSW5kZXgoc2xpZGVzLmZpbHRlcihlbCA9PiBlbC5jbGFzc0xpc3QuY29udGFpbnMocGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpKVswXSk7XG4gIH0gZWxzZSB7XG4gICAgYWN0aXZlSW5kZXggPSBhY3RpdmVTbGlkZUluZGV4O1xuICB9XG4gIGNvbnN0IGlzTmV4dCA9IGRpcmVjdGlvbiA9PT0gJ25leHQnIHx8ICFkaXJlY3Rpb247XG4gIGNvbnN0IGlzUHJldiA9IGRpcmVjdGlvbiA9PT0gJ3ByZXYnIHx8ICFkaXJlY3Rpb247XG4gIGxldCBzbGlkZXNQcmVwZW5kZWQgPSAwO1xuICBsZXQgc2xpZGVzQXBwZW5kZWQgPSAwO1xuICBjb25zdCBjb2xzID0gZ3JpZEVuYWJsZWQgPyBNYXRoLmNlaWwoc2xpZGVzLmxlbmd0aCAvIHBhcmFtcy5ncmlkLnJvd3MpIDogc2xpZGVzLmxlbmd0aDtcbiAgY29uc3QgYWN0aXZlQ29sSW5kZXggPSBncmlkRW5hYmxlZCA/IHNsaWRlc1thY3RpdmVTbGlkZUluZGV4XS5jb2x1bW4gOiBhY3RpdmVTbGlkZUluZGV4O1xuICBjb25zdCBhY3RpdmVDb2xJbmRleFdpdGhTaGlmdCA9IGFjdGl2ZUNvbEluZGV4ICsgKGNlbnRlcmVkU2xpZGVzICYmIHR5cGVvZiBzZXRUcmFuc2xhdGUgPT09ICd1bmRlZmluZWQnID8gLXNsaWRlc1BlclZpZXcgLyAyICsgMC41IDogMCk7XG4gIC8vIHByZXBlbmQgbGFzdCBzbGlkZXMgYmVmb3JlIHN0YXJ0XG4gIGlmIChhY3RpdmVDb2xJbmRleFdpdGhTaGlmdCA8IGxvb3BlZFNsaWRlcykge1xuICAgIHNsaWRlc1ByZXBlbmRlZCA9IE1hdGgubWF4KGxvb3BlZFNsaWRlcyAtIGFjdGl2ZUNvbEluZGV4V2l0aFNoaWZ0LCBzbGlkZXNQZXJHcm91cCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsb29wZWRTbGlkZXMgLSBhY3RpdmVDb2xJbmRleFdpdGhTaGlmdDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBpbmRleCA9IGkgLSBNYXRoLmZsb29yKGkgLyBjb2xzKSAqIGNvbHM7XG4gICAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgICAgY29uc3QgY29sSW5kZXhUb1ByZXBlbmQgPSBjb2xzIC0gaW5kZXggLSAxO1xuICAgICAgICBmb3IgKGxldCBpID0gc2xpZGVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAgICAgaWYgKHNsaWRlc1tpXS5jb2x1bW4gPT09IGNvbEluZGV4VG9QcmVwZW5kKSBwcmVwZW5kU2xpZGVzSW5kZXhlcy5wdXNoKGkpO1xuICAgICAgICB9XG4gICAgICAgIC8vIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgc2xpZGVJbmRleCkgPT4ge1xuICAgICAgICAvLyAgIGlmIChzbGlkZS5jb2x1bW4gPT09IGNvbEluZGV4VG9QcmVwZW5kKSBwcmVwZW5kU2xpZGVzSW5kZXhlcy5wdXNoKHNsaWRlSW5kZXgpO1xuICAgICAgICAvLyB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHByZXBlbmRTbGlkZXNJbmRleGVzLnB1c2goY29scyAtIGluZGV4IC0gMSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2UgaWYgKGFjdGl2ZUNvbEluZGV4V2l0aFNoaWZ0ICsgc2xpZGVzUGVyVmlldyA+IGNvbHMgLSBsb29wZWRTbGlkZXMpIHtcbiAgICBzbGlkZXNBcHBlbmRlZCA9IE1hdGgubWF4KGFjdGl2ZUNvbEluZGV4V2l0aFNoaWZ0IC0gKGNvbHMgLSBsb29wZWRTbGlkZXMgKiAyKSwgc2xpZGVzUGVyR3JvdXApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzQXBwZW5kZWQ7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaW5kZXggPSBpIC0gTWF0aC5mbG9vcihpIC8gY29scykgKiBjb2xzO1xuICAgICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICAgIHNsaWRlcy5mb3JFYWNoKChzbGlkZSwgc2xpZGVJbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChzbGlkZS5jb2x1bW4gPT09IGluZGV4KSBhcHBlbmRTbGlkZXNJbmRleGVzLnB1c2goc2xpZGVJbmRleCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXBwZW5kU2xpZGVzSW5kZXhlcy5wdXNoKGluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18gPSB0cnVlO1xuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgIHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fID0gZmFsc2U7XG4gIH0pO1xuICBpZiAoaXNQcmV2KSB7XG4gICAgcHJlcGVuZFNsaWRlc0luZGV4ZXMuZm9yRWFjaChpbmRleCA9PiB7XG4gICAgICBzbGlkZXNbaW5kZXhdLnN3aXBlckxvb3BNb3ZlRE9NID0gdHJ1ZTtcbiAgICAgIHNsaWRlc0VsLnByZXBlbmQoc2xpZGVzW2luZGV4XSk7XG4gICAgICBzbGlkZXNbaW5kZXhdLnN3aXBlckxvb3BNb3ZlRE9NID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzTmV4dCkge1xuICAgIGFwcGVuZFNsaWRlc0luZGV4ZXMuZm9yRWFjaChpbmRleCA9PiB7XG4gICAgICBzbGlkZXNbaW5kZXhdLnN3aXBlckxvb3BNb3ZlRE9NID0gdHJ1ZTtcbiAgICAgIHNsaWRlc0VsLmFwcGVuZChzbGlkZXNbaW5kZXhdKTtcbiAgICAgIHNsaWRlc1tpbmRleF0uc3dpcGVyTG9vcE1vdmVET00gPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gIGlmIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nKSB7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICB9IGVsc2UgaWYgKGdyaWRFbmFibGVkICYmIChwcmVwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGggPiAwICYmIGlzUHJldiB8fCBhcHBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aCA+IDAgJiYgaXNOZXh0KSkge1xuICAgIHN3aXBlci5zbGlkZXMuZm9yRWFjaCgoc2xpZGUsIHNsaWRlSW5kZXgpID0+IHtcbiAgICAgIHN3aXBlci5ncmlkLnVwZGF0ZVNsaWRlKHNsaWRlSW5kZXgsIHNsaWRlLCBzd2lwZXIuc2xpZGVzKTtcbiAgICB9KTtcbiAgfVxuICBpZiAocGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MpIHtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzT2Zmc2V0KCk7XG4gIH1cbiAgaWYgKHNsaWRlVG8pIHtcbiAgICBpZiAocHJlcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoID4gMCAmJiBpc1ByZXYpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2xpZGVSZWFsSW5kZXggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZVRyYW5zbGF0ZSA9IHN3aXBlci5zbGlkZXNHcmlkW2FjdGl2ZUluZGV4XTtcbiAgICAgICAgY29uc3QgbmV3U2xpZGVUcmFuc2xhdGUgPSBzd2lwZXIuc2xpZGVzR3JpZFthY3RpdmVJbmRleCArIHNsaWRlc1ByZXBlbmRlZF07XG4gICAgICAgIGNvbnN0IGRpZmYgPSBuZXdTbGlkZVRyYW5zbGF0ZSAtIGN1cnJlbnRTbGlkZVRyYW5zbGF0ZTtcbiAgICAgICAgaWYgKGJ5TW91c2V3aGVlbCkge1xuICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUoc3dpcGVyLnRyYW5zbGF0ZSAtIGRpZmYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKGFjdGl2ZUluZGV4ICsgc2xpZGVzUHJlcGVuZGVkLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICAgICAgaWYgKHNldFRyYW5zbGF0ZSkge1xuICAgICAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5zdGFydFRyYW5zbGF0ZSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGEuc3RhcnRUcmFuc2xhdGUgLSBkaWZmO1xuICAgICAgICAgICAgc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5jdXJyZW50VHJhbnNsYXRlID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5jdXJyZW50VHJhbnNsYXRlIC0gZGlmZjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzZXRUcmFuc2xhdGUpIHtcbiAgICAgICAgICBjb25zdCBzaGlmdCA9IGdyaWRFbmFibGVkID8gcHJlcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoIC8gcGFyYW1zLmdyaWQucm93cyA6IHByZXBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aDtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXggKyBzaGlmdCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgIHN3aXBlci50b3VjaEV2ZW50c0RhdGEuY3VycmVudFRyYW5zbGF0ZSA9IHN3aXBlci50cmFuc2xhdGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGFwcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoID4gMCAmJiBpc05leHQpIHtcbiAgICAgIGlmICh0eXBlb2Ygc2xpZGVSZWFsSW5kZXggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRTbGlkZVRyYW5zbGF0ZSA9IHN3aXBlci5zbGlkZXNHcmlkW2FjdGl2ZUluZGV4XTtcbiAgICAgICAgY29uc3QgbmV3U2xpZGVUcmFuc2xhdGUgPSBzd2lwZXIuc2xpZGVzR3JpZFthY3RpdmVJbmRleCAtIHNsaWRlc0FwcGVuZGVkXTtcbiAgICAgICAgY29uc3QgZGlmZiA9IG5ld1NsaWRlVHJhbnNsYXRlIC0gY3VycmVudFNsaWRlVHJhbnNsYXRlO1xuICAgICAgICBpZiAoYnlNb3VzZXdoZWVsKSB7XG4gICAgICAgICAgc3dpcGVyLnNldFRyYW5zbGF0ZShzd2lwZXIudHJhbnNsYXRlIC0gZGlmZik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oYWN0aXZlSW5kZXggLSBzbGlkZXNBcHBlbmRlZCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgIGlmIChzZXRUcmFuc2xhdGUpIHtcbiAgICAgICAgICAgIHN3aXBlci50b3VjaEV2ZW50c0RhdGEuc3RhcnRUcmFuc2xhdGUgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhLnN0YXJ0VHJhbnNsYXRlIC0gZGlmZjtcbiAgICAgICAgICAgIHN3aXBlci50b3VjaEV2ZW50c0RhdGEuY3VycmVudFRyYW5zbGF0ZSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGEuY3VycmVudFRyYW5zbGF0ZSAtIGRpZmY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBzaGlmdCA9IGdyaWRFbmFibGVkID8gYXBwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGggLyBwYXJhbXMuZ3JpZC5yb3dzIDogYXBwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGg7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCAtIHNoaWZ0LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IGFsbG93U2xpZGVQcmV2O1xuICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSBhbGxvd1NsaWRlTmV4dDtcbiAgaWYgKHN3aXBlci5jb250cm9sbGVyICYmIHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wgJiYgIWJ5Q29udHJvbGxlcikge1xuICAgIGNvbnN0IGxvb3BQYXJhbXMgPSB7XG4gICAgICBzbGlkZVJlYWxJbmRleCxcbiAgICAgIGRpcmVjdGlvbixcbiAgICAgIHNldFRyYW5zbGF0ZSxcbiAgICAgIGFjdGl2ZVNsaWRlSW5kZXgsXG4gICAgICBieUNvbnRyb2xsZXI6IHRydWVcbiAgICB9O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wpKSB7XG4gICAgICBzd2lwZXIuY29udHJvbGxlci5jb250cm9sLmZvckVhY2goYyA9PiB7XG4gICAgICAgIGlmICghYy5kZXN0cm95ZWQgJiYgYy5wYXJhbXMubG9vcCkgYy5sb29wRml4KHtcbiAgICAgICAgICAuLi5sb29wUGFyYW1zLFxuICAgICAgICAgIHNsaWRlVG86IGMucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID8gc2xpZGVUbyA6IGZhbHNlXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChzd2lwZXIuY29udHJvbGxlci5jb250cm9sIGluc3RhbmNlb2Ygc3dpcGVyLmNvbnN0cnVjdG9yICYmIHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wucGFyYW1zLmxvb3ApIHtcbiAgICAgIHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wubG9vcEZpeCh7XG4gICAgICAgIC4uLmxvb3BQYXJhbXMsXG4gICAgICAgIHNsaWRlVG86IHN3aXBlci5jb250cm9sbGVyLmNvbnRyb2wucGFyYW1zLnNsaWRlc1BlclZpZXcgPT09IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID8gc2xpZGVUbyA6IGZhbHNlXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgc3dpcGVyLmVtaXQoJ2xvb3BGaXgnKTtcbn1cblxuZnVuY3Rpb24gbG9vcERlc3Ryb3koKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgc2xpZGVzRWxcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFwYXJhbXMubG9vcCB8fCBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkgcmV0dXJuO1xuICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gIGNvbnN0IG5ld1NsaWRlc09yZGVyID0gW107XG4gIHN3aXBlci5zbGlkZXMuZm9yRWFjaChzbGlkZUVsID0+IHtcbiAgICBjb25zdCBpbmRleCA9IHR5cGVvZiBzbGlkZUVsLnN3aXBlclNsaWRlSW5kZXggPT09ICd1bmRlZmluZWQnID8gc2xpZGVFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykgKiAxIDogc2xpZGVFbC5zd2lwZXJTbGlkZUluZGV4O1xuICAgIG5ld1NsaWRlc09yZGVyW2luZGV4XSA9IHNsaWRlRWw7XG4gIH0pO1xuICBzd2lwZXIuc2xpZGVzLmZvckVhY2goc2xpZGVFbCA9PiB7XG4gICAgc2xpZGVFbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XG4gIH0pO1xuICBuZXdTbGlkZXNPcmRlci5mb3JFYWNoKHNsaWRlRWwgPT4ge1xuICAgIHNsaWRlc0VsLmFwcGVuZChzbGlkZUVsKTtcbiAgfSk7XG4gIHN3aXBlci5yZWNhbGNTbGlkZXMoKTtcbiAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnJlYWxJbmRleCwgMCk7XG59XG5cbnZhciBsb29wID0ge1xuICBsb29wQ3JlYXRlLFxuICBsb29wRml4LFxuICBsb29wRGVzdHJveVxufTtcblxuZnVuY3Rpb24gc2V0R3JhYkN1cnNvcihtb3ZpbmcpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKCFzd2lwZXIucGFyYW1zLnNpbXVsYXRlVG91Y2ggfHwgc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5pc0xvY2tlZCB8fCBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHJldHVybjtcbiAgY29uc3QgZWwgPSBzd2lwZXIucGFyYW1zLnRvdWNoRXZlbnRzVGFyZ2V0ID09PSAnY29udGFpbmVyJyA/IHN3aXBlci5lbCA6IHN3aXBlci53cmFwcGVyRWw7XG4gIGlmIChzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18gPSB0cnVlO1xuICB9XG4gIGVsLnN0eWxlLmN1cnNvciA9ICdtb3ZlJztcbiAgZWwuc3R5bGUuY3Vyc29yID0gbW92aW5nID8gJ2dyYWJiaW5nJyA6ICdncmFiJztcbiAgaWYgKHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18gPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiB1bnNldEdyYWJDdXJzb3IoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmlzTG9ja2VkIHx8IHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoc3dpcGVyLmlzRWxlbWVudCkge1xuICAgIHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fID0gdHJ1ZTtcbiAgfVxuICBzd2lwZXJbc3dpcGVyLnBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gJ2NvbnRhaW5lcicgPyAnZWwnIDogJ3dyYXBwZXJFbCddLnN0eWxlLmN1cnNvciA9ICcnO1xuICBpZiAoc3dpcGVyLmlzRWxlbWVudCkge1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXyA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG59XG5cbnZhciBncmFiQ3Vyc29yID0ge1xuICBzZXRHcmFiQ3Vyc29yLFxuICB1bnNldEdyYWJDdXJzb3Jcbn07XG5cbi8vIE1vZGlmaWVkIGZyb20gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNTQ1MjA1NTQvY3VzdG9tLWVsZW1lbnQtZ2V0cm9vdG5vZGUtY2xvc2VzdC1mdW5jdGlvbi1jcm9zc2luZy1tdWx0aXBsZS1wYXJlbnQtc2hhZG93ZFxuZnVuY3Rpb24gY2xvc2VzdEVsZW1lbnQoc2VsZWN0b3IsIGJhc2UpIHtcbiAgaWYgKGJhc2UgPT09IHZvaWQgMCkge1xuICAgIGJhc2UgPSB0aGlzO1xuICB9XG4gIGZ1bmN0aW9uIF9fY2xvc2VzdEZyb20oZWwpIHtcbiAgICBpZiAoIWVsIHx8IGVsID09PSBnZXREb2N1bWVudCgpIHx8IGVsID09PSBnZXRXaW5kb3coKSkgcmV0dXJuIG51bGw7XG4gICAgaWYgKGVsLmFzc2lnbmVkU2xvdCkgZWwgPSBlbC5hc3NpZ25lZFNsb3Q7XG4gICAgY29uc3QgZm91bmQgPSBlbC5jbG9zZXN0KHNlbGVjdG9yKTtcbiAgICBpZiAoIWZvdW5kICYmICFlbC5nZXRSb290Tm9kZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBmb3VuZCB8fCBfX2Nsb3Nlc3RGcm9tKGVsLmdldFJvb3ROb2RlKCkuaG9zdCk7XG4gIH1cbiAgcmV0dXJuIF9fY2xvc2VzdEZyb20oYmFzZSk7XG59XG5mdW5jdGlvbiBwcmV2ZW50RWRnZVN3aXBlKHN3aXBlciwgZXZlbnQsIHN0YXJ0WCkge1xuICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgY29uc3Qge1xuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBjb25zdCBlZGdlU3dpcGVEZXRlY3Rpb24gPSBwYXJhbXMuZWRnZVN3aXBlRGV0ZWN0aW9uO1xuICBjb25zdCBlZGdlU3dpcGVUaHJlc2hvbGQgPSBwYXJhbXMuZWRnZVN3aXBlVGhyZXNob2xkO1xuICBpZiAoZWRnZVN3aXBlRGV0ZWN0aW9uICYmIChzdGFydFggPD0gZWRnZVN3aXBlVGhyZXNob2xkIHx8IHN0YXJ0WCA+PSB3aW5kb3cuaW5uZXJXaWR0aCAtIGVkZ2VTd2lwZVRocmVzaG9sZCkpIHtcbiAgICBpZiAoZWRnZVN3aXBlRGV0ZWN0aW9uID09PSAncHJldmVudCcpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gb25Ub3VjaFN0YXJ0KGV2ZW50KSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgbGV0IGUgPSBldmVudDtcbiAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgY29uc3QgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG4gIGlmIChlLnR5cGUgPT09ICdwb2ludGVyZG93bicpIHtcbiAgICBpZiAoZGF0YS5wb2ludGVySWQgIT09IG51bGwgJiYgZGF0YS5wb2ludGVySWQgIT09IGUucG9pbnRlcklkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGRhdGEucG9pbnRlcklkID0gZS5wb2ludGVySWQ7XG4gIH0gZWxzZSBpZiAoZS50eXBlID09PSAndG91Y2hzdGFydCcgJiYgZS50YXJnZXRUb3VjaGVzLmxlbmd0aCA9PT0gMSkge1xuICAgIGRhdGEudG91Y2hJZCA9IGUudGFyZ2V0VG91Y2hlc1swXS5pZGVudGlmaWVyO1xuICB9XG4gIGlmIChlLnR5cGUgPT09ICd0b3VjaHN0YXJ0Jykge1xuICAgIC8vIGRvbid0IHByb2NlZWQgdG91Y2ggZXZlbnRcbiAgICBwcmV2ZW50RWRnZVN3aXBlKHN3aXBlciwgZSwgZS50YXJnZXRUb3VjaGVzWzBdLnBhZ2VYKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICB0b3VjaGVzLFxuICAgIGVuYWJsZWRcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbmFibGVkKSByZXR1cm47XG4gIGlmICghcGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgZS5wb2ludGVyVHlwZSA9PT0gJ21vdXNlJykgcmV0dXJuO1xuICBpZiAoc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMucHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMuY3NzTW9kZSAmJiBwYXJhbXMubG9vcCkge1xuICAgIHN3aXBlci5sb29wRml4KCk7XG4gIH1cbiAgbGV0IHRhcmdldEVsID0gZS50YXJnZXQ7XG4gIGlmIChwYXJhbXMudG91Y2hFdmVudHNUYXJnZXQgPT09ICd3cmFwcGVyJykge1xuICAgIGlmICghc3dpcGVyLndyYXBwZXJFbC5jb250YWlucyh0YXJnZXRFbCkpIHJldHVybjtcbiAgfVxuICBpZiAoJ3doaWNoJyBpbiBlICYmIGUud2hpY2ggPT09IDMpIHJldHVybjtcbiAgaWYgKCdidXR0b24nIGluIGUgJiYgZS5idXR0b24gPiAwKSByZXR1cm47XG4gIGlmIChkYXRhLmlzVG91Y2hlZCAmJiBkYXRhLmlzTW92ZWQpIHJldHVybjtcblxuICAvLyBjaGFuZ2UgdGFyZ2V0IGVsIGZvciBzaGFkb3cgcm9vdCBjb21wb25lbnRcbiAgY29uc3Qgc3dpcGluZ0NsYXNzSGFzVmFsdWUgPSAhIXBhcmFtcy5ub1N3aXBpbmdDbGFzcyAmJiBwYXJhbXMubm9Td2lwaW5nQ2xhc3MgIT09ICcnO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgY29uc3QgZXZlbnRQYXRoID0gZS5jb21wb3NlZFBhdGggPyBlLmNvbXBvc2VkUGF0aCgpIDogZS5wYXRoO1xuICBpZiAoc3dpcGluZ0NsYXNzSGFzVmFsdWUgJiYgZS50YXJnZXQgJiYgZS50YXJnZXQuc2hhZG93Um9vdCAmJiBldmVudFBhdGgpIHtcbiAgICB0YXJnZXRFbCA9IGV2ZW50UGF0aFswXTtcbiAgfVxuICBjb25zdCBub1N3aXBpbmdTZWxlY3RvciA9IHBhcmFtcy5ub1N3aXBpbmdTZWxlY3RvciA/IHBhcmFtcy5ub1N3aXBpbmdTZWxlY3RvciA6IGAuJHtwYXJhbXMubm9Td2lwaW5nQ2xhc3N9YDtcbiAgY29uc3QgaXNUYXJnZXRTaGFkb3cgPSAhIShlLnRhcmdldCAmJiBlLnRhcmdldC5zaGFkb3dSb290KTtcblxuICAvLyB1c2UgY2xvc2VzdEVsZW1lbnQgZm9yIHNoYWRvdyByb290IGVsZW1lbnQgdG8gZ2V0IHRoZSBhY3R1YWwgY2xvc2VzdCBmb3IgbmVzdGVkIHNoYWRvdyByb290IGVsZW1lbnRcbiAgaWYgKHBhcmFtcy5ub1N3aXBpbmcgJiYgKGlzVGFyZ2V0U2hhZG93ID8gY2xvc2VzdEVsZW1lbnQobm9Td2lwaW5nU2VsZWN0b3IsIHRhcmdldEVsKSA6IHRhcmdldEVsLmNsb3Nlc3Qobm9Td2lwaW5nU2VsZWN0b3IpKSkge1xuICAgIHN3aXBlci5hbGxvd0NsaWNrID0gdHJ1ZTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHBhcmFtcy5zd2lwZUhhbmRsZXIpIHtcbiAgICBpZiAoIXRhcmdldEVsLmNsb3Nlc3QocGFyYW1zLnN3aXBlSGFuZGxlcikpIHJldHVybjtcbiAgfVxuICB0b3VjaGVzLmN1cnJlbnRYID0gZS5wYWdlWDtcbiAgdG91Y2hlcy5jdXJyZW50WSA9IGUucGFnZVk7XG4gIGNvbnN0IHN0YXJ0WCA9IHRvdWNoZXMuY3VycmVudFg7XG4gIGNvbnN0IHN0YXJ0WSA9IHRvdWNoZXMuY3VycmVudFk7XG5cbiAgLy8gRG8gTk9UIHN0YXJ0IGlmIGlPUyBlZGdlIHN3aXBlIGlzIGRldGVjdGVkLiBPdGhlcndpc2UgaU9TIGFwcCBjYW5ub3Qgc3dpcGUtdG8tZ28tYmFjayBhbnltb3JlXG5cbiAgaWYgKCFwcmV2ZW50RWRnZVN3aXBlKHN3aXBlciwgZSwgc3RhcnRYKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBPYmplY3QuYXNzaWduKGRhdGEsIHtcbiAgICBpc1RvdWNoZWQ6IHRydWUsXG4gICAgaXNNb3ZlZDogZmFsc2UsXG4gICAgYWxsb3dUb3VjaENhbGxiYWNrczogdHJ1ZSxcbiAgICBpc1Njcm9sbGluZzogdW5kZWZpbmVkLFxuICAgIHN0YXJ0TW92aW5nOiB1bmRlZmluZWRcbiAgfSk7XG4gIHRvdWNoZXMuc3RhcnRYID0gc3RhcnRYO1xuICB0b3VjaGVzLnN0YXJ0WSA9IHN0YXJ0WTtcbiAgZGF0YS50b3VjaFN0YXJ0VGltZSA9IG5vdygpO1xuICBzd2lwZXIuYWxsb3dDbGljayA9IHRydWU7XG4gIHN3aXBlci51cGRhdGVTaXplKCk7XG4gIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9IHVuZGVmaW5lZDtcbiAgaWYgKHBhcmFtcy50aHJlc2hvbGQgPiAwKSBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSA9IGZhbHNlO1xuICBsZXQgcHJldmVudERlZmF1bHQgPSB0cnVlO1xuICBpZiAodGFyZ2V0RWwubWF0Y2hlcyhkYXRhLmZvY3VzYWJsZUVsZW1lbnRzKSkge1xuICAgIHByZXZlbnREZWZhdWx0ID0gZmFsc2U7XG4gICAgaWYgKHRhcmdldEVsLm5vZGVOYW1lID09PSAnU0VMRUNUJykge1xuICAgICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICB9XG4gIH1cbiAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5tYXRjaGVzKGRhdGEuZm9jdXNhYmxlRWxlbWVudHMpICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgIT09IHRhcmdldEVsKSB7XG4gICAgZG9jdW1lbnQuYWN0aXZlRWxlbWVudC5ibHVyKCk7XG4gIH1cbiAgY29uc3Qgc2hvdWxkUHJldmVudERlZmF1bHQgPSBwcmV2ZW50RGVmYXVsdCAmJiBzd2lwZXIuYWxsb3dUb3VjaE1vdmUgJiYgcGFyYW1zLnRvdWNoU3RhcnRQcmV2ZW50RGVmYXVsdDtcbiAgaWYgKChwYXJhbXMudG91Y2hTdGFydEZvcmNlUHJldmVudERlZmF1bHQgfHwgc2hvdWxkUHJldmVudERlZmF1bHQpICYmICF0YXJnZXRFbC5pc0NvbnRlbnRFZGl0YWJsZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBpZiAocGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkICYmIHN3aXBlci5mcmVlTW9kZSAmJiBzd2lwZXIuYW5pbWF0aW5nICYmICFwYXJhbXMuY3NzTW9kZSkge1xuICAgIHN3aXBlci5mcmVlTW9kZS5vblRvdWNoU3RhcnQoKTtcbiAgfVxuICBzd2lwZXIuZW1pdCgndG91Y2hTdGFydCcsIGUpO1xufVxuXG5mdW5jdGlvbiBvblRvdWNoTW92ZShldmVudCkge1xuICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IGRhdGEgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHRvdWNoZXMsXG4gICAgcnRsVHJhbnNsYXRlOiBydGwsXG4gICAgZW5hYmxlZFxuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVuYWJsZWQpIHJldHVybjtcbiAgaWYgKCFwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiBldmVudC5wb2ludGVyVHlwZSA9PT0gJ21vdXNlJykgcmV0dXJuO1xuICBsZXQgZSA9IGV2ZW50O1xuICBpZiAoZS5vcmlnaW5hbEV2ZW50KSBlID0gZS5vcmlnaW5hbEV2ZW50O1xuICBpZiAoZS50eXBlID09PSAncG9pbnRlcm1vdmUnKSB7XG4gICAgaWYgKGRhdGEudG91Y2hJZCAhPT0gbnVsbCkgcmV0dXJuOyAvLyByZXR1cm4gZnJvbSBwb2ludGVyIGlmIHdlIHVzZSB0b3VjaFxuICAgIGNvbnN0IGlkID0gZS5wb2ludGVySWQ7XG4gICAgaWYgKGlkICE9PSBkYXRhLnBvaW50ZXJJZCkgcmV0dXJuO1xuICB9XG4gIGxldCB0YXJnZXRUb3VjaDtcbiAgaWYgKGUudHlwZSA9PT0gJ3RvdWNobW92ZScpIHtcbiAgICB0YXJnZXRUb3VjaCA9IFsuLi5lLmNoYW5nZWRUb3VjaGVzXS5maWx0ZXIodCA9PiB0LmlkZW50aWZpZXIgPT09IGRhdGEudG91Y2hJZClbMF07XG4gICAgaWYgKCF0YXJnZXRUb3VjaCB8fCB0YXJnZXRUb3VjaC5pZGVudGlmaWVyICE9PSBkYXRhLnRvdWNoSWQpIHJldHVybjtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXRUb3VjaCA9IGU7XG4gIH1cbiAgaWYgKCFkYXRhLmlzVG91Y2hlZCkge1xuICAgIGlmIChkYXRhLnN0YXJ0TW92aW5nICYmIGRhdGEuaXNTY3JvbGxpbmcpIHtcbiAgICAgIHN3aXBlci5lbWl0KCd0b3VjaE1vdmVPcHBvc2l0ZScsIGUpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgcGFnZVggPSB0YXJnZXRUb3VjaC5wYWdlWDtcbiAgY29uc3QgcGFnZVkgPSB0YXJnZXRUb3VjaC5wYWdlWTtcbiAgaWYgKGUucHJldmVudGVkQnlOZXN0ZWRTd2lwZXIpIHtcbiAgICB0b3VjaGVzLnN0YXJ0WCA9IHBhZ2VYO1xuICAgIHRvdWNoZXMuc3RhcnRZID0gcGFnZVk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghc3dpcGVyLmFsbG93VG91Y2hNb3ZlKSB7XG4gICAgaWYgKCFlLnRhcmdldC5tYXRjaGVzKGRhdGEuZm9jdXNhYmxlRWxlbWVudHMpKSB7XG4gICAgICBzd2lwZXIuYWxsb3dDbGljayA9IGZhbHNlO1xuICAgIH1cbiAgICBpZiAoZGF0YS5pc1RvdWNoZWQpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24odG91Y2hlcywge1xuICAgICAgICBzdGFydFg6IHBhZ2VYLFxuICAgICAgICBzdGFydFk6IHBhZ2VZLFxuICAgICAgICBjdXJyZW50WDogcGFnZVgsXG4gICAgICAgIGN1cnJlbnRZOiBwYWdlWVxuICAgICAgfSk7XG4gICAgICBkYXRhLnRvdWNoU3RhcnRUaW1lID0gbm93KCk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAocGFyYW1zLnRvdWNoUmVsZWFzZU9uRWRnZXMgJiYgIXBhcmFtcy5sb29wKSB7XG4gICAgaWYgKHN3aXBlci5pc1ZlcnRpY2FsKCkpIHtcbiAgICAgIC8vIFZlcnRpY2FsXG4gICAgICBpZiAocGFnZVkgPCB0b3VjaGVzLnN0YXJ0WSAmJiBzd2lwZXIudHJhbnNsYXRlIDw9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSB8fCBwYWdlWSA+IHRvdWNoZXMuc3RhcnRZICYmIHN3aXBlci50cmFuc2xhdGUgPj0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICAgIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChwYWdlWCA8IHRvdWNoZXMuc3RhcnRYICYmIHN3aXBlci50cmFuc2xhdGUgPD0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIHx8IHBhZ2VYID4gdG91Y2hlcy5zdGFydFggJiYgc3dpcGVyLnRyYW5zbGF0ZSA+PSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpIHtcbiAgICBpZiAoZS50YXJnZXQgPT09IGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQgJiYgZS50YXJnZXQubWF0Y2hlcyhkYXRhLmZvY3VzYWJsZUVsZW1lbnRzKSkge1xuICAgICAgZGF0YS5pc01vdmVkID0gdHJ1ZTtcbiAgICAgIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGlmIChkYXRhLmFsbG93VG91Y2hDYWxsYmFja3MpIHtcbiAgICBzd2lwZXIuZW1pdCgndG91Y2hNb3ZlJywgZSk7XG4gIH1cbiAgdG91Y2hlcy5wcmV2aW91c1ggPSB0b3VjaGVzLmN1cnJlbnRYO1xuICB0b3VjaGVzLnByZXZpb3VzWSA9IHRvdWNoZXMuY3VycmVudFk7XG4gIHRvdWNoZXMuY3VycmVudFggPSBwYWdlWDtcbiAgdG91Y2hlcy5jdXJyZW50WSA9IHBhZ2VZO1xuICBjb25zdCBkaWZmWCA9IHRvdWNoZXMuY3VycmVudFggLSB0b3VjaGVzLnN0YXJ0WDtcbiAgY29uc3QgZGlmZlkgPSB0b3VjaGVzLmN1cnJlbnRZIC0gdG91Y2hlcy5zdGFydFk7XG4gIGlmIChzd2lwZXIucGFyYW1zLnRocmVzaG9sZCAmJiBNYXRoLnNxcnQoZGlmZlggKiogMiArIGRpZmZZICoqIDIpIDwgc3dpcGVyLnBhcmFtcy50aHJlc2hvbGQpIHJldHVybjtcbiAgaWYgKHR5cGVvZiBkYXRhLmlzU2Nyb2xsaW5nID09PSAndW5kZWZpbmVkJykge1xuICAgIGxldCB0b3VjaEFuZ2xlO1xuICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkgJiYgdG91Y2hlcy5jdXJyZW50WSA9PT0gdG91Y2hlcy5zdGFydFkgfHwgc3dpcGVyLmlzVmVydGljYWwoKSAmJiB0b3VjaGVzLmN1cnJlbnRYID09PSB0b3VjaGVzLnN0YXJ0WCkge1xuICAgICAgZGF0YS5pc1Njcm9sbGluZyA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIGlmIChkaWZmWCAqIGRpZmZYICsgZGlmZlkgKiBkaWZmWSA+PSAyNSkge1xuICAgICAgICB0b3VjaEFuZ2xlID0gTWF0aC5hdGFuMihNYXRoLmFicyhkaWZmWSksIE1hdGguYWJzKGRpZmZYKSkgKiAxODAgLyBNYXRoLlBJO1xuICAgICAgICBkYXRhLmlzU2Nyb2xsaW5nID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gdG91Y2hBbmdsZSA+IHBhcmFtcy50b3VjaEFuZ2xlIDogOTAgLSB0b3VjaEFuZ2xlID4gcGFyYW1zLnRvdWNoQW5nbGU7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChkYXRhLmlzU2Nyb2xsaW5nKSB7XG4gICAgc3dpcGVyLmVtaXQoJ3RvdWNoTW92ZU9wcG9zaXRlJywgZSk7XG4gIH1cbiAgaWYgKHR5cGVvZiBkYXRhLnN0YXJ0TW92aW5nID09PSAndW5kZWZpbmVkJykge1xuICAgIGlmICh0b3VjaGVzLmN1cnJlbnRYICE9PSB0b3VjaGVzLnN0YXJ0WCB8fCB0b3VjaGVzLmN1cnJlbnRZICE9PSB0b3VjaGVzLnN0YXJ0WSkge1xuICAgICAgZGF0YS5zdGFydE1vdmluZyA9IHRydWU7XG4gICAgfVxuICB9XG4gIGlmIChkYXRhLmlzU2Nyb2xsaW5nKSB7XG4gICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCFkYXRhLnN0YXJ0TW92aW5nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHN3aXBlci5hbGxvd0NsaWNrID0gZmFsc2U7XG4gIGlmICghcGFyYW1zLmNzc01vZGUgJiYgZS5jYW5jZWxhYmxlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGlmIChwYXJhbXMudG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uICYmICFwYXJhbXMubmVzdGVkKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuICBsZXQgZGlmZiA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IGRpZmZYIDogZGlmZlk7XG4gIGxldCB0b3VjaGVzRGlmZiA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHRvdWNoZXMuY3VycmVudFggLSB0b3VjaGVzLnByZXZpb3VzWCA6IHRvdWNoZXMuY3VycmVudFkgLSB0b3VjaGVzLnByZXZpb3VzWTtcbiAgaWYgKHBhcmFtcy5vbmVXYXlNb3ZlbWVudCkge1xuICAgIGRpZmYgPSBNYXRoLmFicyhkaWZmKSAqIChydGwgPyAxIDogLTEpO1xuICAgIHRvdWNoZXNEaWZmID0gTWF0aC5hYnModG91Y2hlc0RpZmYpICogKHJ0bCA/IDEgOiAtMSk7XG4gIH1cbiAgdG91Y2hlcy5kaWZmID0gZGlmZjtcbiAgZGlmZiAqPSBwYXJhbXMudG91Y2hSYXRpbztcbiAgaWYgKHJ0bCkge1xuICAgIGRpZmYgPSAtZGlmZjtcbiAgICB0b3VjaGVzRGlmZiA9IC10b3VjaGVzRGlmZjtcbiAgfVxuICBjb25zdCBwcmV2VG91Y2hlc0RpcmVjdGlvbiA9IHN3aXBlci50b3VjaGVzRGlyZWN0aW9uO1xuICBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPSBkaWZmID4gMCA/ICdwcmV2JyA6ICduZXh0JztcbiAgc3dpcGVyLnRvdWNoZXNEaXJlY3Rpb24gPSB0b3VjaGVzRGlmZiA+IDAgPyAncHJldicgOiAnbmV4dCc7XG4gIGNvbnN0IGlzTG9vcCA9IHN3aXBlci5wYXJhbXMubG9vcCAmJiAhcGFyYW1zLmNzc01vZGU7XG4gIGNvbnN0IGFsbG93TG9vcEZpeCA9IHN3aXBlci50b3VjaGVzRGlyZWN0aW9uID09PSAnbmV4dCcgJiYgc3dpcGVyLmFsbG93U2xpZGVOZXh0IHx8IHN3aXBlci50b3VjaGVzRGlyZWN0aW9uID09PSAncHJldicgJiYgc3dpcGVyLmFsbG93U2xpZGVQcmV2O1xuICBpZiAoIWRhdGEuaXNNb3ZlZCkge1xuICAgIGlmIChpc0xvb3AgJiYgYWxsb3dMb29wRml4KSB7XG4gICAgICBzd2lwZXIubG9vcEZpeCh7XG4gICAgICAgIGRpcmVjdGlvbjogc3dpcGVyLnN3aXBlRGlyZWN0aW9uXG4gICAgICB9KTtcbiAgICB9XG4gICAgZGF0YS5zdGFydFRyYW5zbGF0ZSA9IHN3aXBlci5nZXRUcmFuc2xhdGUoKTtcbiAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgICBpZiAoc3dpcGVyLmFuaW1hdGluZykge1xuICAgICAgY29uc3QgZXZ0ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudCgndHJhbnNpdGlvbmVuZCcsIHtcbiAgICAgICAgYnViYmxlczogdHJ1ZSxcbiAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgICBzd2lwZXIud3JhcHBlckVsLmRpc3BhdGNoRXZlbnQoZXZ0KTtcbiAgICB9XG4gICAgZGF0YS5hbGxvd01vbWVudHVtQm91bmNlID0gZmFsc2U7XG4gICAgLy8gR3JhYiBDdXJzb3JcbiAgICBpZiAocGFyYW1zLmdyYWJDdXJzb3IgJiYgKHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9PT0gdHJ1ZSB8fCBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPT09IHRydWUpKSB7XG4gICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcih0cnVlKTtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoJ3NsaWRlckZpcnN0TW92ZScsIGUpO1xuICB9XG4gIGxldCBsb29wRml4ZWQ7XG4gIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBpZiAoZGF0YS5pc01vdmVkICYmIGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlICYmIHByZXZUb3VjaGVzRGlyZWN0aW9uICE9PSBzd2lwZXIudG91Y2hlc0RpcmVjdGlvbiAmJiBpc0xvb3AgJiYgYWxsb3dMb29wRml4ICYmIE1hdGguYWJzKGRpZmYpID49IDEpIHtcbiAgICBPYmplY3QuYXNzaWduKHRvdWNoZXMsIHtcbiAgICAgIHN0YXJ0WDogcGFnZVgsXG4gICAgICBzdGFydFk6IHBhZ2VZLFxuICAgICAgY3VycmVudFg6IHBhZ2VYLFxuICAgICAgY3VycmVudFk6IHBhZ2VZLFxuICAgICAgc3RhcnRUcmFuc2xhdGU6IGRhdGEuY3VycmVudFRyYW5zbGF0ZVxuICAgIH0pO1xuICAgIGRhdGEubG9vcFN3YXBSZXNldCA9IHRydWU7XG4gICAgZGF0YS5zdGFydFRyYW5zbGF0ZSA9IGRhdGEuY3VycmVudFRyYW5zbGF0ZTtcbiAgICByZXR1cm47XG4gIH1cbiAgc3dpcGVyLmVtaXQoJ3NsaWRlck1vdmUnLCBlKTtcbiAgZGF0YS5pc01vdmVkID0gdHJ1ZTtcbiAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGlmZiArIGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gIGxldCBkaXNhYmxlUGFyZW50U3dpcGVyID0gdHJ1ZTtcbiAgbGV0IHJlc2lzdGFuY2VSYXRpbyA9IHBhcmFtcy5yZXNpc3RhbmNlUmF0aW87XG4gIGlmIChwYXJhbXMudG91Y2hSZWxlYXNlT25FZGdlcykge1xuICAgIHJlc2lzdGFuY2VSYXRpbyA9IDA7XG4gIH1cbiAgaWYgKGRpZmYgPiAwKSB7XG4gICAgaWYgKGlzTG9vcCAmJiBhbGxvd0xvb3BGaXggJiYgIWxvb3BGaXhlZCAmJiBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSAmJiBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIC0gc3dpcGVyLnNsaWRlc1NpemVzR3JpZFtzd2lwZXIuYWN0aXZlSW5kZXggKyAxXSA6IHN3aXBlci5taW5UcmFuc2xhdGUoKSkpIHtcbiAgICAgIHN3aXBlci5sb29wRml4KHtcbiAgICAgICAgZGlyZWN0aW9uOiAncHJldicsXG4gICAgICAgIHNldFRyYW5zbGF0ZTogdHJ1ZSxcbiAgICAgICAgYWN0aXZlU2xpZGVJbmRleDogMFxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPiBzd2lwZXIubWluVHJhbnNsYXRlKCkpIHtcbiAgICAgIGRpc2FibGVQYXJlbnRTd2lwZXIgPSBmYWxzZTtcbiAgICAgIGlmIChwYXJhbXMucmVzaXN0YW5jZSkge1xuICAgICAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBzd2lwZXIubWluVHJhbnNsYXRlKCkgLSAxICsgKC1zd2lwZXIubWluVHJhbnNsYXRlKCkgKyBkYXRhLnN0YXJ0VHJhbnNsYXRlICsgZGlmZikgKiogcmVzaXN0YW5jZVJhdGlvO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChkaWZmIDwgMCkge1xuICAgIGlmIChpc0xvb3AgJiYgYWxsb3dMb29wRml4ICYmICFsb29wRml4ZWQgJiYgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlIDwgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHN3aXBlci5tYXhUcmFuc2xhdGUoKSArIHN3aXBlci5zbGlkZXNTaXplc0dyaWRbc3dpcGVyLnNsaWRlc1NpemVzR3JpZC5sZW5ndGggLSAxXSA6IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkpIHtcbiAgICAgIHN3aXBlci5sb29wRml4KHtcbiAgICAgICAgZGlyZWN0aW9uOiAnbmV4dCcsXG4gICAgICAgIHNldFRyYW5zbGF0ZTogdHJ1ZSxcbiAgICAgICAgYWN0aXZlU2xpZGVJbmRleDogc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyA/IHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygpIDogTWF0aC5jZWlsKHBhcnNlRmxvYXQocGFyYW1zLnNsaWRlc1BlclZpZXcsIDEwKSkpXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGRhdGEuY3VycmVudFRyYW5zbGF0ZSA8IHN3aXBlci5tYXhUcmFuc2xhdGUoKSkge1xuICAgICAgZGlzYWJsZVBhcmVudFN3aXBlciA9IGZhbHNlO1xuICAgICAgaWYgKHBhcmFtcy5yZXNpc3RhbmNlKSB7XG4gICAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSArIDEgLSAoc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gZGF0YS5zdGFydFRyYW5zbGF0ZSAtIGRpZmYpICoqIHJlc2lzdGFuY2VSYXRpbztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKGRpc2FibGVQYXJlbnRTd2lwZXIpIHtcbiAgICBlLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIERpcmVjdGlvbnMgbG9ja3NcbiAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZU5leHQgJiYgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlIDwgZGF0YS5zdGFydFRyYW5zbGF0ZSkge1xuICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gIH1cbiAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlID4gZGF0YS5zdGFydFRyYW5zbGF0ZSkge1xuICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gIH1cbiAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgIXN3aXBlci5hbGxvd1NsaWRlTmV4dCkge1xuICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gIH1cblxuICAvLyBUaHJlc2hvbGRcbiAgaWYgKHBhcmFtcy50aHJlc2hvbGQgPiAwKSB7XG4gICAgaWYgKE1hdGguYWJzKGRpZmYpID4gcGFyYW1zLnRocmVzaG9sZCB8fCBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSkge1xuICAgICAgaWYgKCFkYXRhLmFsbG93VGhyZXNob2xkTW92ZSkge1xuICAgICAgICBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSA9IHRydWU7XG4gICAgICAgIHRvdWNoZXMuc3RhcnRYID0gdG91Y2hlcy5jdXJyZW50WDtcbiAgICAgICAgdG91Y2hlcy5zdGFydFkgPSB0b3VjaGVzLmN1cnJlbnRZO1xuICAgICAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICAgICAgICB0b3VjaGVzLmRpZmYgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB0b3VjaGVzLmN1cnJlbnRYIC0gdG91Y2hlcy5zdGFydFggOiB0b3VjaGVzLmN1cnJlbnRZIC0gdG91Y2hlcy5zdGFydFk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cbiAgaWYgKCFwYXJhbXMuZm9sbG93RmluZ2VyIHx8IHBhcmFtcy5jc3NNb2RlKSByZXR1cm47XG5cbiAgLy8gVXBkYXRlIGFjdGl2ZSBpbmRleCBpbiBmcmVlIG1vZGVcbiAgaWYgKHBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCAmJiBzd2lwZXIuZnJlZU1vZGUgfHwgcGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3MpIHtcbiAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICB9XG4gIGlmIChwYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQgJiYgc3dpcGVyLmZyZWVNb2RlKSB7XG4gICAgc3dpcGVyLmZyZWVNb2RlLm9uVG91Y2hNb3ZlKCk7XG4gIH1cbiAgLy8gVXBkYXRlIHByb2dyZXNzXG4gIHN3aXBlci51cGRhdGVQcm9ncmVzcyhkYXRhLmN1cnJlbnRUcmFuc2xhdGUpO1xuICAvLyBVcGRhdGUgdHJhbnNsYXRlXG4gIHN3aXBlci5zZXRUcmFuc2xhdGUoZGF0YS5jdXJyZW50VHJhbnNsYXRlKTtcbn1cblxuZnVuY3Rpb24gb25Ub3VjaEVuZChldmVudCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBkYXRhID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YTtcbiAgbGV0IGUgPSBldmVudDtcbiAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgbGV0IHRhcmdldFRvdWNoO1xuICBjb25zdCBpc1RvdWNoRXZlbnQgPSBlLnR5cGUgPT09ICd0b3VjaGVuZCcgfHwgZS50eXBlID09PSAndG91Y2hjYW5jZWwnO1xuICBpZiAoIWlzVG91Y2hFdmVudCkge1xuICAgIGlmIChkYXRhLnRvdWNoSWQgIT09IG51bGwpIHJldHVybjsgLy8gcmV0dXJuIGZyb20gcG9pbnRlciBpZiB3ZSB1c2UgdG91Y2hcbiAgICBpZiAoZS5wb2ludGVySWQgIT09IGRhdGEucG9pbnRlcklkKSByZXR1cm47XG4gICAgdGFyZ2V0VG91Y2ggPSBlO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldFRvdWNoID0gWy4uLmUuY2hhbmdlZFRvdWNoZXNdLmZpbHRlcih0ID0+IHQuaWRlbnRpZmllciA9PT0gZGF0YS50b3VjaElkKVswXTtcbiAgICBpZiAoIXRhcmdldFRvdWNoIHx8IHRhcmdldFRvdWNoLmlkZW50aWZpZXIgIT09IGRhdGEudG91Y2hJZCkgcmV0dXJuO1xuICB9XG4gIGlmIChbJ3BvaW50ZXJjYW5jZWwnLCAncG9pbnRlcm91dCcsICdwb2ludGVybGVhdmUnLCAnY29udGV4dG1lbnUnXS5pbmNsdWRlcyhlLnR5cGUpKSB7XG4gICAgY29uc3QgcHJvY2VlZCA9IFsncG9pbnRlcmNhbmNlbCcsICdjb250ZXh0bWVudSddLmluY2x1ZGVzKGUudHlwZSkgJiYgKHN3aXBlci5icm93c2VyLmlzU2FmYXJpIHx8IHN3aXBlci5icm93c2VyLmlzV2ViVmlldyk7XG4gICAgaWYgKCFwcm9jZWVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGRhdGEucG9pbnRlcklkID0gbnVsbDtcbiAgZGF0YS50b3VjaElkID0gbnVsbDtcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICB0b3VjaGVzLFxuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIHNsaWRlc0dyaWQsXG4gICAgZW5hYmxlZFxuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVuYWJsZWQpIHJldHVybjtcbiAgaWYgKCFwYXJhbXMuc2ltdWxhdGVUb3VjaCAmJiBlLnBvaW50ZXJUeXBlID09PSAnbW91c2UnKSByZXR1cm47XG4gIGlmIChkYXRhLmFsbG93VG91Y2hDYWxsYmFja3MpIHtcbiAgICBzd2lwZXIuZW1pdCgndG91Y2hFbmQnLCBlKTtcbiAgfVxuICBkYXRhLmFsbG93VG91Y2hDYWxsYmFja3MgPSBmYWxzZTtcbiAgaWYgKCFkYXRhLmlzVG91Y2hlZCkge1xuICAgIGlmIChkYXRhLmlzTW92ZWQgJiYgcGFyYW1zLmdyYWJDdXJzb3IpIHtcbiAgICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKGZhbHNlKTtcbiAgICB9XG4gICAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gICAgZGF0YS5zdGFydE1vdmluZyA9IGZhbHNlO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFJldHVybiBHcmFiIEN1cnNvclxuICBpZiAocGFyYW1zLmdyYWJDdXJzb3IgJiYgZGF0YS5pc01vdmVkICYmIGRhdGEuaXNUb3VjaGVkICYmIChzd2lwZXIuYWxsb3dTbGlkZU5leHQgPT09IHRydWUgfHwgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID09PSB0cnVlKSkge1xuICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKGZhbHNlKTtcbiAgfVxuXG4gIC8vIFRpbWUgZGlmZlxuICBjb25zdCB0b3VjaEVuZFRpbWUgPSBub3coKTtcbiAgY29uc3QgdGltZURpZmYgPSB0b3VjaEVuZFRpbWUgLSBkYXRhLnRvdWNoU3RhcnRUaW1lO1xuXG4gIC8vIFRhcCwgZG91YmxlVGFwLCBDbGlja1xuICBpZiAoc3dpcGVyLmFsbG93Q2xpY2spIHtcbiAgICBjb25zdCBwYXRoVHJlZSA9IGUucGF0aCB8fCBlLmNvbXBvc2VkUGF0aCAmJiBlLmNvbXBvc2VkUGF0aCgpO1xuICAgIHN3aXBlci51cGRhdGVDbGlja2VkU2xpZGUocGF0aFRyZWUgJiYgcGF0aFRyZWVbMF0gfHwgZS50YXJnZXQsIHBhdGhUcmVlKTtcbiAgICBzd2lwZXIuZW1pdCgndGFwIGNsaWNrJywgZSk7XG4gICAgaWYgKHRpbWVEaWZmIDwgMzAwICYmIHRvdWNoRW5kVGltZSAtIGRhdGEubGFzdENsaWNrVGltZSA8IDMwMCkge1xuICAgICAgc3dpcGVyLmVtaXQoJ2RvdWJsZVRhcCBkb3VibGVDbGljaycsIGUpO1xuICAgIH1cbiAgfVxuICBkYXRhLmxhc3RDbGlja1RpbWUgPSBub3coKTtcbiAgbmV4dFRpY2soKCkgPT4ge1xuICAgIGlmICghc3dpcGVyLmRlc3Ryb3llZCkgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICB9KTtcbiAgaWYgKCFkYXRhLmlzVG91Y2hlZCB8fCAhZGF0YS5pc01vdmVkIHx8ICFzd2lwZXIuc3dpcGVEaXJlY3Rpb24gfHwgdG91Y2hlcy5kaWZmID09PSAwICYmICFkYXRhLmxvb3BTd2FwUmVzZXQgfHwgZGF0YS5jdXJyZW50VHJhbnNsYXRlID09PSBkYXRhLnN0YXJ0VHJhbnNsYXRlICYmICFkYXRhLmxvb3BTd2FwUmVzZXQpIHtcbiAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xuICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cbiAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgZGF0YS5pc01vdmVkID0gZmFsc2U7XG4gIGRhdGEuc3RhcnRNb3ZpbmcgPSBmYWxzZTtcbiAgbGV0IGN1cnJlbnRQb3M7XG4gIGlmIChwYXJhbXMuZm9sbG93RmluZ2VyKSB7XG4gICAgY3VycmVudFBvcyA9IHJ0bCA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgfSBlbHNlIHtcbiAgICBjdXJyZW50UG9zID0gLWRhdGEuY3VycmVudFRyYW5zbGF0ZTtcbiAgfVxuICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCkge1xuICAgIHN3aXBlci5mcmVlTW9kZS5vblRvdWNoRW5kKHtcbiAgICAgIGN1cnJlbnRQb3NcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGaW5kIGN1cnJlbnQgc2xpZGVcbiAgbGV0IHN0b3BJbmRleCA9IDA7XG4gIGxldCBncm91cFNpemUgPSBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkWzBdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0dyaWQubGVuZ3RoOyBpICs9IGkgPCBwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwID8gMSA6IHBhcmFtcy5zbGlkZXNQZXJHcm91cCkge1xuICAgIGNvbnN0IGluY3JlbWVudCA9IGkgPCBwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwIC0gMSA/IDEgOiBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gICAgaWYgKHR5cGVvZiBzbGlkZXNHcmlkW2kgKyBpbmNyZW1lbnRdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgaWYgKGN1cnJlbnRQb3MgPj0gc2xpZGVzR3JpZFtpXSAmJiBjdXJyZW50UG9zIDwgc2xpZGVzR3JpZFtpICsgaW5jcmVtZW50XSkge1xuICAgICAgICBzdG9wSW5kZXggPSBpO1xuICAgICAgICBncm91cFNpemUgPSBzbGlkZXNHcmlkW2kgKyBpbmNyZW1lbnRdIC0gc2xpZGVzR3JpZFtpXTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGN1cnJlbnRQb3MgPj0gc2xpZGVzR3JpZFtpXSkge1xuICAgICAgc3RvcEluZGV4ID0gaTtcbiAgICAgIGdyb3VwU2l6ZSA9IHNsaWRlc0dyaWRbc2xpZGVzR3JpZC5sZW5ndGggLSAxXSAtIHNsaWRlc0dyaWRbc2xpZGVzR3JpZC5sZW5ndGggLSAyXTtcbiAgICB9XG4gIH1cbiAgbGV0IHJld2luZEZpcnN0SW5kZXggPSBudWxsO1xuICBsZXQgcmV3aW5kTGFzdEluZGV4ID0gbnVsbDtcbiAgaWYgKHBhcmFtcy5yZXdpbmQpIHtcbiAgICBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nKSB7XG4gICAgICByZXdpbmRMYXN0SW5kZXggPSBwYXJhbXMudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkICYmIHN3aXBlci52aXJ0dWFsID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCAtIDEgOiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIGlmIChzd2lwZXIuaXNFbmQpIHtcbiAgICAgIHJld2luZEZpcnN0SW5kZXggPSAwO1xuICAgIH1cbiAgfVxuICAvLyBGaW5kIGN1cnJlbnQgc2xpZGUgc2l6ZVxuICBjb25zdCByYXRpbyA9IChjdXJyZW50UG9zIC0gc2xpZGVzR3JpZFtzdG9wSW5kZXhdKSAvIGdyb3VwU2l6ZTtcbiAgY29uc3QgaW5jcmVtZW50ID0gc3RvcEluZGV4IDwgcGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCAtIDEgPyAxIDogcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICBpZiAodGltZURpZmYgPiBwYXJhbXMubG9uZ1N3aXBlc01zKSB7XG4gICAgLy8gTG9uZyB0b3VjaGVzXG4gICAgaWYgKCFwYXJhbXMubG9uZ1N3aXBlcykge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICBpZiAocmF0aW8gPj0gcGFyYW1zLmxvbmdTd2lwZXNSYXRpbykgc3dpcGVyLnNsaWRlVG8ocGFyYW1zLnJld2luZCAmJiBzd2lwZXIuaXNFbmQgPyByZXdpbmRGaXJzdEluZGV4IDogc3RvcEluZGV4ICsgaW5jcmVtZW50KTtlbHNlIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCk7XG4gICAgfVxuICAgIGlmIChzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICdwcmV2Jykge1xuICAgICAgaWYgKHJhdGlvID4gMSAtIHBhcmFtcy5sb25nU3dpcGVzUmF0aW8pIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4ICsgaW5jcmVtZW50KTtcbiAgICAgIH0gZWxzZSBpZiAocmV3aW5kTGFzdEluZGV4ICE9PSBudWxsICYmIHJhdGlvIDwgMCAmJiBNYXRoLmFicyhyYXRpbykgPiBwYXJhbXMubG9uZ1N3aXBlc1JhdGlvKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHJld2luZExhc3RJbmRleCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBTaG9ydCBzd2lwZXNcbiAgICBpZiAoIXBhcmFtcy5zaG9ydFN3aXBlcykge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgaXNOYXZCdXR0b25UYXJnZXQgPSBzd2lwZXIubmF2aWdhdGlvbiAmJiAoZS50YXJnZXQgPT09IHN3aXBlci5uYXZpZ2F0aW9uLm5leHRFbCB8fCBlLnRhcmdldCA9PT0gc3dpcGVyLm5hdmlnYXRpb24ucHJldkVsKTtcbiAgICBpZiAoIWlzTmF2QnV0dG9uVGFyZ2V0KSB7XG4gICAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAnbmV4dCcpIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8ocmV3aW5kRmlyc3RJbmRleCAhPT0gbnVsbCA/IHJld2luZEZpcnN0SW5kZXggOiBzdG9wSW5kZXggKyBpbmNyZW1lbnQpO1xuICAgICAgfVxuICAgICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ3ByZXYnKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHJld2luZExhc3RJbmRleCAhPT0gbnVsbCA/IHJld2luZExhc3RJbmRleCA6IHN0b3BJbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldCA9PT0gc3dpcGVyLm5hdmlnYXRpb24ubmV4dEVsKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXggKyBpbmNyZW1lbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBvblJlc2l6ZSgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBlbFxuICB9ID0gc3dpcGVyO1xuICBpZiAoZWwgJiYgZWwub2Zmc2V0V2lkdGggPT09IDApIHJldHVybjtcblxuICAvLyBCcmVha3BvaW50c1xuICBpZiAocGFyYW1zLmJyZWFrcG9pbnRzKSB7XG4gICAgc3dpcGVyLnNldEJyZWFrcG9pbnQoKTtcbiAgfVxuXG4gIC8vIFNhdmUgbG9ja3NcbiAgY29uc3Qge1xuICAgIGFsbG93U2xpZGVOZXh0LFxuICAgIGFsbG93U2xpZGVQcmV2LFxuICAgIHNuYXBHcmlkXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkO1xuXG4gIC8vIERpc2FibGUgbG9ja3Mgb24gcmVzaXplXG4gIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IHRydWU7XG4gIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IHRydWU7XG4gIHN3aXBlci51cGRhdGVTaXplKCk7XG4gIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgY29uc3QgaXNWaXJ0dWFsTG9vcCA9IGlzVmlydHVhbCAmJiBwYXJhbXMubG9vcDtcbiAgaWYgKChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nIHx8IHBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkgJiYgc3dpcGVyLmlzRW5kICYmICFzd2lwZXIuaXNCZWdpbm5pbmcgJiYgIXN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgIWlzVmlydHVhbExvb3ApIHtcbiAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIDEsIDAsIGZhbHNlLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wICYmICFpc1ZpcnR1YWwpIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvTG9vcChzd2lwZXIucmVhbEluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgIH1cbiAgfVxuICBpZiAoc3dpcGVyLmF1dG9wbGF5ICYmIHN3aXBlci5hdXRvcGxheS5ydW5uaW5nICYmIHN3aXBlci5hdXRvcGxheS5wYXVzZWQpIHtcbiAgICBjbGVhclRpbWVvdXQoc3dpcGVyLmF1dG9wbGF5LnJlc2l6ZVRpbWVvdXQpO1xuICAgIHN3aXBlci5hdXRvcGxheS5yZXNpemVUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBpZiAoc3dpcGVyLmF1dG9wbGF5ICYmIHN3aXBlci5hdXRvcGxheS5ydW5uaW5nICYmIHN3aXBlci5hdXRvcGxheS5wYXVzZWQpIHtcbiAgICAgICAgc3dpcGVyLmF1dG9wbGF5LnJlc3VtZSgpO1xuICAgICAgfVxuICAgIH0sIDUwMCk7XG4gIH1cbiAgLy8gUmV0dXJuIGxvY2tzIGFmdGVyIHJlc2l6ZVxuICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSBhbGxvd1NsaWRlUHJldjtcbiAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gYWxsb3dTbGlkZU5leHQ7XG4gIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc25hcEdyaWQgIT09IHN3aXBlci5zbmFwR3JpZCkge1xuICAgIHN3aXBlci5jaGVja092ZXJmbG93KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gb25DbGljayhlKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmICghc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgaWYgKCFzd2lwZXIuYWxsb3dDbGljaykge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnByZXZlbnRDbGlja3MpIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24gJiYgc3dpcGVyLmFuaW1hdGluZykge1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgIGUuc3RvcEltbWVkaWF0ZVByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG9uU2Nyb2xsKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgd3JhcHBlckVsLFxuICAgIHJ0bFRyYW5zbGF0ZSxcbiAgICBlbmFibGVkXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZW5hYmxlZCkgcmV0dXJuO1xuICBzd2lwZXIucHJldmlvdXNUcmFuc2xhdGUgPSBzd2lwZXIudHJhbnNsYXRlO1xuICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgc3dpcGVyLnRyYW5zbGF0ZSA9IC13cmFwcGVyRWwuc2Nyb2xsTGVmdDtcbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIudHJhbnNsYXRlID0gLXdyYXBwZXJFbC5zY3JvbGxUb3A7XG4gIH1cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIGlmIChzd2lwZXIudHJhbnNsYXRlID09PSAwKSBzd2lwZXIudHJhbnNsYXRlID0gMDtcbiAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gIGxldCBuZXdQcm9ncmVzcztcbiAgY29uc3QgdHJhbnNsYXRlc0RpZmYgPSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gIGlmICh0cmFuc2xhdGVzRGlmZiA9PT0gMCkge1xuICAgIG5ld1Byb2dyZXNzID0gMDtcbiAgfSBlbHNlIHtcbiAgICBuZXdQcm9ncmVzcyA9IChzd2lwZXIudHJhbnNsYXRlIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAvIHRyYW5zbGF0ZXNEaWZmO1xuICB9XG4gIGlmIChuZXdQcm9ncmVzcyAhPT0gc3dpcGVyLnByb2dyZXNzKSB7XG4gICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHJ0bFRyYW5zbGF0ZSA/IC1zd2lwZXIudHJhbnNsYXRlIDogc3dpcGVyLnRyYW5zbGF0ZSk7XG4gIH1cbiAgc3dpcGVyLmVtaXQoJ3NldFRyYW5zbGF0ZScsIHN3aXBlci50cmFuc2xhdGUsIGZhbHNlKTtcbn1cblxuZnVuY3Rpb24gb25Mb2FkKGUpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgcHJvY2Vzc0xhenlQcmVsb2FkZXIoc3dpcGVyLCBlLnRhcmdldCk7XG4gIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUgfHwgc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSAnYXV0bycgJiYgIXN3aXBlci5wYXJhbXMuYXV0b0hlaWdodCkge1xuICAgIHJldHVybjtcbiAgfVxuICBzd2lwZXIudXBkYXRlKCk7XG59XG5cbmZ1bmN0aW9uIG9uRG9jdW1lbnRUb3VjaFN0YXJ0KCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoc3dpcGVyLmRvY3VtZW50VG91Y2hIYW5kbGVyUHJvY2VlZGVkKSByZXR1cm47XG4gIHN3aXBlci5kb2N1bWVudFRvdWNoSGFuZGxlclByb2NlZWRlZCA9IHRydWU7XG4gIGlmIChzd2lwZXIucGFyYW1zLnRvdWNoUmVsZWFzZU9uRWRnZXMpIHtcbiAgICBzd2lwZXIuZWwuc3R5bGUudG91Y2hBY3Rpb24gPSAnYXV0byc7XG4gIH1cbn1cblxuY29uc3QgZXZlbnRzID0gKHN3aXBlciwgbWV0aG9kKSA9PiB7XG4gIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBlbCxcbiAgICB3cmFwcGVyRWwsXG4gICAgZGV2aWNlXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IGNhcHR1cmUgPSAhIXBhcmFtcy5uZXN0ZWQ7XG4gIGNvbnN0IGRvbU1ldGhvZCA9IG1ldGhvZCA9PT0gJ29uJyA/ICdhZGRFdmVudExpc3RlbmVyJyA6ICdyZW1vdmVFdmVudExpc3RlbmVyJztcbiAgY29uc3Qgc3dpcGVyTWV0aG9kID0gbWV0aG9kO1xuXG4gIC8vIFRvdWNoIEV2ZW50c1xuICBkb2N1bWVudFtkb21NZXRob2RdKCd0b3VjaHN0YXJ0Jywgc3dpcGVyLm9uRG9jdW1lbnRUb3VjaFN0YXJ0LCB7XG4gICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgY2FwdHVyZVxuICB9KTtcbiAgZWxbZG9tTWV0aG9kXSgndG91Y2hzdGFydCcsIHN3aXBlci5vblRvdWNoU3RhcnQsIHtcbiAgICBwYXNzaXZlOiBmYWxzZVxuICB9KTtcbiAgZWxbZG9tTWV0aG9kXSgncG9pbnRlcmRvd24nLCBzd2lwZXIub25Ub3VjaFN0YXJ0LCB7XG4gICAgcGFzc2l2ZTogZmFsc2VcbiAgfSk7XG4gIGRvY3VtZW50W2RvbU1ldGhvZF0oJ3RvdWNobW92ZScsIHN3aXBlci5vblRvdWNoTW92ZSwge1xuICAgIHBhc3NpdmU6IGZhbHNlLFxuICAgIGNhcHR1cmVcbiAgfSk7XG4gIGRvY3VtZW50W2RvbU1ldGhvZF0oJ3BvaW50ZXJtb3ZlJywgc3dpcGVyLm9uVG91Y2hNb3ZlLCB7XG4gICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgY2FwdHVyZVxuICB9KTtcbiAgZG9jdW1lbnRbZG9tTWV0aG9kXSgndG91Y2hlbmQnLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgIHBhc3NpdmU6IHRydWVcbiAgfSk7XG4gIGRvY3VtZW50W2RvbU1ldGhvZF0oJ3BvaW50ZXJ1cCcsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgcGFzc2l2ZTogdHJ1ZVxuICB9KTtcbiAgZG9jdW1lbnRbZG9tTWV0aG9kXSgncG9pbnRlcmNhbmNlbCcsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgcGFzc2l2ZTogdHJ1ZVxuICB9KTtcbiAgZG9jdW1lbnRbZG9tTWV0aG9kXSgndG91Y2hjYW5jZWwnLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgIHBhc3NpdmU6IHRydWVcbiAgfSk7XG4gIGRvY3VtZW50W2RvbU1ldGhvZF0oJ3BvaW50ZXJvdXQnLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgIHBhc3NpdmU6IHRydWVcbiAgfSk7XG4gIGRvY3VtZW50W2RvbU1ldGhvZF0oJ3BvaW50ZXJsZWF2ZScsIHN3aXBlci5vblRvdWNoRW5kLCB7XG4gICAgcGFzc2l2ZTogdHJ1ZVxuICB9KTtcbiAgZG9jdW1lbnRbZG9tTWV0aG9kXSgnY29udGV4dG1lbnUnLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgIHBhc3NpdmU6IHRydWVcbiAgfSk7XG5cbiAgLy8gUHJldmVudCBMaW5rcyBDbGlja3NcbiAgaWYgKHBhcmFtcy5wcmV2ZW50Q2xpY2tzIHx8IHBhcmFtcy5wcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb24pIHtcbiAgICBlbFtkb21NZXRob2RdKCdjbGljaycsIHN3aXBlci5vbkNsaWNrLCB0cnVlKTtcbiAgfVxuICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICB3cmFwcGVyRWxbZG9tTWV0aG9kXSgnc2Nyb2xsJywgc3dpcGVyLm9uU2Nyb2xsKTtcbiAgfVxuXG4gIC8vIFJlc2l6ZSBoYW5kbGVyXG4gIGlmIChwYXJhbXMudXBkYXRlT25XaW5kb3dSZXNpemUpIHtcbiAgICBzd2lwZXJbc3dpcGVyTWV0aG9kXShkZXZpY2UuaW9zIHx8IGRldmljZS5hbmRyb2lkID8gJ3Jlc2l6ZSBvcmllbnRhdGlvbmNoYW5nZSBvYnNlcnZlclVwZGF0ZScgOiAncmVzaXplIG9ic2VydmVyVXBkYXRlJywgb25SZXNpemUsIHRydWUpO1xuICB9IGVsc2Uge1xuICAgIHN3aXBlcltzd2lwZXJNZXRob2RdKCdvYnNlcnZlclVwZGF0ZScsIG9uUmVzaXplLCB0cnVlKTtcbiAgfVxuXG4gIC8vIEltYWdlcyBsb2FkZXJcbiAgZWxbZG9tTWV0aG9kXSgnbG9hZCcsIHN3aXBlci5vbkxvYWQsIHtcbiAgICBjYXB0dXJlOiB0cnVlXG4gIH0pO1xufTtcbmZ1bmN0aW9uIGF0dGFjaEV2ZW50cygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBzd2lwZXIub25Ub3VjaFN0YXJ0ID0gb25Ub3VjaFN0YXJ0LmJpbmQoc3dpcGVyKTtcbiAgc3dpcGVyLm9uVG91Y2hNb3ZlID0gb25Ub3VjaE1vdmUuYmluZChzd2lwZXIpO1xuICBzd2lwZXIub25Ub3VjaEVuZCA9IG9uVG91Y2hFbmQuYmluZChzd2lwZXIpO1xuICBzd2lwZXIub25Eb2N1bWVudFRvdWNoU3RhcnQgPSBvbkRvY3VtZW50VG91Y2hTdGFydC5iaW5kKHN3aXBlcik7XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgIHN3aXBlci5vblNjcm9sbCA9IG9uU2Nyb2xsLmJpbmQoc3dpcGVyKTtcbiAgfVxuICBzd2lwZXIub25DbGljayA9IG9uQ2xpY2suYmluZChzd2lwZXIpO1xuICBzd2lwZXIub25Mb2FkID0gb25Mb2FkLmJpbmQoc3dpcGVyKTtcbiAgZXZlbnRzKHN3aXBlciwgJ29uJyk7XG59XG5mdW5jdGlvbiBkZXRhY2hFdmVudHMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGV2ZW50cyhzd2lwZXIsICdvZmYnKTtcbn1cbnZhciBldmVudHMkMSA9IHtcbiAgYXR0YWNoRXZlbnRzLFxuICBkZXRhY2hFdmVudHNcbn07XG5cbmNvbnN0IGlzR3JpZEVuYWJsZWQgPSAoc3dpcGVyLCBwYXJhbXMpID0+IHtcbiAgcmV0dXJuIHN3aXBlci5ncmlkICYmIHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxO1xufTtcbmZ1bmN0aW9uIHNldEJyZWFrcG9pbnQoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICByZWFsSW5kZXgsXG4gICAgaW5pdGlhbGl6ZWQsXG4gICAgcGFyYW1zLFxuICAgIGVsXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IGJyZWFrcG9pbnRzID0gcGFyYW1zLmJyZWFrcG9pbnRzO1xuICBpZiAoIWJyZWFrcG9pbnRzIHx8IGJyZWFrcG9pbnRzICYmIE9iamVjdC5rZXlzKGJyZWFrcG9pbnRzKS5sZW5ndGggPT09IDApIHJldHVybjtcblxuICAvLyBHZXQgYnJlYWtwb2ludCBmb3Igd2luZG93IHdpZHRoIGFuZCB1cGRhdGUgcGFyYW1ldGVyc1xuICBjb25zdCBicmVha3BvaW50ID0gc3dpcGVyLmdldEJyZWFrcG9pbnQoYnJlYWtwb2ludHMsIHN3aXBlci5wYXJhbXMuYnJlYWtwb2ludHNCYXNlLCBzd2lwZXIuZWwpO1xuICBpZiAoIWJyZWFrcG9pbnQgfHwgc3dpcGVyLmN1cnJlbnRCcmVha3BvaW50ID09PSBicmVha3BvaW50KSByZXR1cm47XG4gIGNvbnN0IGJyZWFrcG9pbnRPbmx5UGFyYW1zID0gYnJlYWtwb2ludCBpbiBicmVha3BvaW50cyA/IGJyZWFrcG9pbnRzW2JyZWFrcG9pbnRdIDogdW5kZWZpbmVkO1xuICBjb25zdCBicmVha3BvaW50UGFyYW1zID0gYnJlYWtwb2ludE9ubHlQYXJhbXMgfHwgc3dpcGVyLm9yaWdpbmFsUGFyYW1zO1xuICBjb25zdCB3YXNNdWx0aVJvdyA9IGlzR3JpZEVuYWJsZWQoc3dpcGVyLCBwYXJhbXMpO1xuICBjb25zdCBpc011bHRpUm93ID0gaXNHcmlkRW5hYmxlZChzd2lwZXIsIGJyZWFrcG9pbnRQYXJhbXMpO1xuICBjb25zdCB3YXNFbmFibGVkID0gcGFyYW1zLmVuYWJsZWQ7XG4gIGlmICh3YXNNdWx0aVJvdyAmJiAhaXNNdWx0aVJvdykge1xuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7cGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9Z3JpZGAsIGAke3BhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfWdyaWQtY29sdW1uYCk7XG4gICAgc3dpcGVyLmVtaXRDb250YWluZXJDbGFzc2VzKCk7XG4gIH0gZWxzZSBpZiAoIXdhc011bHRpUm93ICYmIGlzTXVsdGlSb3cpIHtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKGAke3BhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfWdyaWRgKTtcbiAgICBpZiAoYnJlYWtwb2ludFBhcmFtcy5ncmlkLmZpbGwgJiYgYnJlYWtwb2ludFBhcmFtcy5ncmlkLmZpbGwgPT09ICdjb2x1bW4nIHx8ICFicmVha3BvaW50UGFyYW1zLmdyaWQuZmlsbCAmJiBwYXJhbXMuZ3JpZC5maWxsID09PSAnY29sdW1uJykge1xuICAgICAgZWwuY2xhc3NMaXN0LmFkZChgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ncmlkLWNvbHVtbmApO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbiAgfVxuXG4gIC8vIFRvZ2dsZSBuYXZpZ2F0aW9uLCBwYWdpbmF0aW9uLCBzY3JvbGxiYXJcbiAgWyduYXZpZ2F0aW9uJywgJ3BhZ2luYXRpb24nLCAnc2Nyb2xsYmFyJ10uZm9yRWFjaChwcm9wID0+IHtcbiAgICBpZiAodHlwZW9mIGJyZWFrcG9pbnRQYXJhbXNbcHJvcF0gPT09ICd1bmRlZmluZWQnKSByZXR1cm47XG4gICAgY29uc3Qgd2FzTW9kdWxlRW5hYmxlZCA9IHBhcmFtc1twcm9wXSAmJiBwYXJhbXNbcHJvcF0uZW5hYmxlZDtcbiAgICBjb25zdCBpc01vZHVsZUVuYWJsZWQgPSBicmVha3BvaW50UGFyYW1zW3Byb3BdICYmIGJyZWFrcG9pbnRQYXJhbXNbcHJvcF0uZW5hYmxlZDtcbiAgICBpZiAod2FzTW9kdWxlRW5hYmxlZCAmJiAhaXNNb2R1bGVFbmFibGVkKSB7XG4gICAgICBzd2lwZXJbcHJvcF0uZGlzYWJsZSgpO1xuICAgIH1cbiAgICBpZiAoIXdhc01vZHVsZUVuYWJsZWQgJiYgaXNNb2R1bGVFbmFibGVkKSB7XG4gICAgICBzd2lwZXJbcHJvcF0uZW5hYmxlKCk7XG4gICAgfVxuICB9KTtcbiAgY29uc3QgZGlyZWN0aW9uQ2hhbmdlZCA9IGJyZWFrcG9pbnRQYXJhbXMuZGlyZWN0aW9uICYmIGJyZWFrcG9pbnRQYXJhbXMuZGlyZWN0aW9uICE9PSBwYXJhbXMuZGlyZWN0aW9uO1xuICBjb25zdCBuZWVkc1JlTG9vcCA9IHBhcmFtcy5sb29wICYmIChicmVha3BvaW50UGFyYW1zLnNsaWRlc1BlclZpZXcgIT09IHBhcmFtcy5zbGlkZXNQZXJWaWV3IHx8IGRpcmVjdGlvbkNoYW5nZWQpO1xuICBjb25zdCB3YXNMb29wID0gcGFyYW1zLmxvb3A7XG4gIGlmIChkaXJlY3Rpb25DaGFuZ2VkICYmIGluaXRpYWxpemVkKSB7XG4gICAgc3dpcGVyLmNoYW5nZURpcmVjdGlvbigpO1xuICB9XG4gIGV4dGVuZChzd2lwZXIucGFyYW1zLCBicmVha3BvaW50UGFyYW1zKTtcbiAgY29uc3QgaXNFbmFibGVkID0gc3dpcGVyLnBhcmFtcy5lbmFibGVkO1xuICBjb25zdCBoYXNMb29wID0gc3dpcGVyLnBhcmFtcy5sb29wO1xuICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgIGFsbG93VG91Y2hNb3ZlOiBzd2lwZXIucGFyYW1zLmFsbG93VG91Y2hNb3ZlLFxuICAgIGFsbG93U2xpZGVOZXh0OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVOZXh0LFxuICAgIGFsbG93U2xpZGVQcmV2OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVQcmV2XG4gIH0pO1xuICBpZiAod2FzRW5hYmxlZCAmJiAhaXNFbmFibGVkKSB7XG4gICAgc3dpcGVyLmRpc2FibGUoKTtcbiAgfSBlbHNlIGlmICghd2FzRW5hYmxlZCAmJiBpc0VuYWJsZWQpIHtcbiAgICBzd2lwZXIuZW5hYmxlKCk7XG4gIH1cbiAgc3dpcGVyLmN1cnJlbnRCcmVha3BvaW50ID0gYnJlYWtwb2ludDtcbiAgc3dpcGVyLmVtaXQoJ19iZWZvcmVCcmVha3BvaW50JywgYnJlYWtwb2ludFBhcmFtcyk7XG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIGlmIChuZWVkc1JlTG9vcCkge1xuICAgICAgc3dpcGVyLmxvb3BEZXN0cm95KCk7XG4gICAgICBzd2lwZXIubG9vcENyZWF0ZShyZWFsSW5kZXgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgIH0gZWxzZSBpZiAoIXdhc0xvb3AgJiYgaGFzTG9vcCkge1xuICAgICAgc3dpcGVyLmxvb3BDcmVhdGUocmVhbEluZGV4KTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICB9IGVsc2UgaWYgKHdhc0xvb3AgJiYgIWhhc0xvb3ApIHtcbiAgICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICAgIH1cbiAgfVxuICBzd2lwZXIuZW1pdCgnYnJlYWtwb2ludCcsIGJyZWFrcG9pbnRQYXJhbXMpO1xufVxuXG5mdW5jdGlvbiBnZXRCcmVha3BvaW50KGJyZWFrcG9pbnRzLCBiYXNlLCBjb250YWluZXJFbCkge1xuICBpZiAoYmFzZSA9PT0gdm9pZCAwKSB7XG4gICAgYmFzZSA9ICd3aW5kb3cnO1xuICB9XG4gIGlmICghYnJlYWtwb2ludHMgfHwgYmFzZSA9PT0gJ2NvbnRhaW5lcicgJiYgIWNvbnRhaW5lckVsKSByZXR1cm4gdW5kZWZpbmVkO1xuICBsZXQgYnJlYWtwb2ludCA9IGZhbHNlO1xuICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgY29uc3QgY3VycmVudEhlaWdodCA9IGJhc2UgPT09ICd3aW5kb3cnID8gd2luZG93LmlubmVySGVpZ2h0IDogY29udGFpbmVyRWwuY2xpZW50SGVpZ2h0O1xuICBjb25zdCBwb2ludHMgPSBPYmplY3Qua2V5cyhicmVha3BvaW50cykubWFwKHBvaW50ID0+IHtcbiAgICBpZiAodHlwZW9mIHBvaW50ID09PSAnc3RyaW5nJyAmJiBwb2ludC5pbmRleE9mKCdAJykgPT09IDApIHtcbiAgICAgIGNvbnN0IG1pblJhdGlvID0gcGFyc2VGbG9hdChwb2ludC5zdWJzdHIoMSkpO1xuICAgICAgY29uc3QgdmFsdWUgPSBjdXJyZW50SGVpZ2h0ICogbWluUmF0aW87XG4gICAgICByZXR1cm4ge1xuICAgICAgICB2YWx1ZSxcbiAgICAgICAgcG9pbnRcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB2YWx1ZTogcG9pbnQsXG4gICAgICBwb2ludFxuICAgIH07XG4gIH0pO1xuICBwb2ludHMuc29ydCgoYSwgYikgPT4gcGFyc2VJbnQoYS52YWx1ZSwgMTApIC0gcGFyc2VJbnQoYi52YWx1ZSwgMTApKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb2ludHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCB7XG4gICAgICBwb2ludCxcbiAgICAgIHZhbHVlXG4gICAgfSA9IHBvaW50c1tpXTtcbiAgICBpZiAoYmFzZSA9PT0gJ3dpbmRvdycpIHtcbiAgICAgIGlmICh3aW5kb3cubWF0Y2hNZWRpYShgKG1pbi13aWR0aDogJHt2YWx1ZX1weClgKS5tYXRjaGVzKSB7XG4gICAgICAgIGJyZWFrcG9pbnQgPSBwb2ludDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZhbHVlIDw9IGNvbnRhaW5lckVsLmNsaWVudFdpZHRoKSB7XG4gICAgICBicmVha3BvaW50ID0gcG9pbnQ7XG4gICAgfVxuICB9XG4gIHJldHVybiBicmVha3BvaW50IHx8ICdtYXgnO1xufVxuXG52YXIgYnJlYWtwb2ludHMgPSB7XG4gIHNldEJyZWFrcG9pbnQsXG4gIGdldEJyZWFrcG9pbnRcbn07XG5cbmZ1bmN0aW9uIHByZXBhcmVDbGFzc2VzKGVudHJpZXMsIHByZWZpeCkge1xuICBjb25zdCByZXN1bHRDbGFzc2VzID0gW107XG4gIGVudHJpZXMuZm9yRWFjaChpdGVtID0+IHtcbiAgICBpZiAodHlwZW9mIGl0ZW0gPT09ICdvYmplY3QnKSB7XG4gICAgICBPYmplY3Qua2V5cyhpdGVtKS5mb3JFYWNoKGNsYXNzTmFtZXMgPT4ge1xuICAgICAgICBpZiAoaXRlbVtjbGFzc05hbWVzXSkge1xuICAgICAgICAgIHJlc3VsdENsYXNzZXMucHVzaChwcmVmaXggKyBjbGFzc05hbWVzKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlb2YgaXRlbSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJlc3VsdENsYXNzZXMucHVzaChwcmVmaXggKyBpdGVtKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0Q2xhc3Nlcztcbn1cbmZ1bmN0aW9uIGFkZENsYXNzZXMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBjbGFzc05hbWVzLFxuICAgIHBhcmFtcyxcbiAgICBydGwsXG4gICAgZWwsXG4gICAgZGV2aWNlXG4gIH0gPSBzd2lwZXI7XG4gIC8vIHByZXR0aWVyLWlnbm9yZVxuICBjb25zdCBzdWZmaXhlcyA9IHByZXBhcmVDbGFzc2VzKFsnaW5pdGlhbGl6ZWQnLCBwYXJhbXMuZGlyZWN0aW9uLCB7XG4gICAgJ2ZyZWUtbW9kZSc6IHN3aXBlci5wYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWRcbiAgfSwge1xuICAgICdhdXRvaGVpZ2h0JzogcGFyYW1zLmF1dG9IZWlnaHRcbiAgfSwge1xuICAgICdydGwnOiBydGxcbiAgfSwge1xuICAgICdncmlkJzogcGFyYW1zLmdyaWQgJiYgcGFyYW1zLmdyaWQucm93cyA+IDFcbiAgfSwge1xuICAgICdncmlkLWNvbHVtbic6IHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxICYmIHBhcmFtcy5ncmlkLmZpbGwgPT09ICdjb2x1bW4nXG4gIH0sIHtcbiAgICAnYW5kcm9pZCc6IGRldmljZS5hbmRyb2lkXG4gIH0sIHtcbiAgICAnaW9zJzogZGV2aWNlLmlvc1xuICB9LCB7XG4gICAgJ2Nzcy1tb2RlJzogcGFyYW1zLmNzc01vZGVcbiAgfSwge1xuICAgICdjZW50ZXJlZCc6IHBhcmFtcy5jc3NNb2RlICYmIHBhcmFtcy5jZW50ZXJlZFNsaWRlc1xuICB9LCB7XG4gICAgJ3dhdGNoLXByb2dyZXNzJzogcGFyYW1zLndhdGNoU2xpZGVzUHJvZ3Jlc3NcbiAgfV0sIHBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKTtcbiAgY2xhc3NOYW1lcy5wdXNoKC4uLnN1ZmZpeGVzKTtcbiAgZWwuY2xhc3NMaXN0LmFkZCguLi5jbGFzc05hbWVzKTtcbiAgc3dpcGVyLmVtaXRDb250YWluZXJDbGFzc2VzKCk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNsYXNzZXMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBlbCxcbiAgICBjbGFzc05hbWVzXG4gIH0gPSBzd2lwZXI7XG4gIGVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3NOYW1lcyk7XG4gIHN3aXBlci5lbWl0Q29udGFpbmVyQ2xhc3NlcygpO1xufVxuXG52YXIgY2xhc3NlcyA9IHtcbiAgYWRkQ2xhc3NlcyxcbiAgcmVtb3ZlQ2xhc3Nlc1xufTtcblxuZnVuY3Rpb24gY2hlY2tPdmVyZmxvdygpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIGlzTG9ja2VkOiB3YXNMb2NrZWQsXG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IHtcbiAgICBzbGlkZXNPZmZzZXRCZWZvcmVcbiAgfSA9IHBhcmFtcztcbiAgaWYgKHNsaWRlc09mZnNldEJlZm9yZSkge1xuICAgIGNvbnN0IGxhc3RTbGlkZUluZGV4ID0gc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxO1xuICAgIGNvbnN0IGxhc3RTbGlkZVJpZ2h0RWRnZSA9IHN3aXBlci5zbGlkZXNHcmlkW2xhc3RTbGlkZUluZGV4XSArIHN3aXBlci5zbGlkZXNTaXplc0dyaWRbbGFzdFNsaWRlSW5kZXhdICsgc2xpZGVzT2Zmc2V0QmVmb3JlICogMjtcbiAgICBzd2lwZXIuaXNMb2NrZWQgPSBzd2lwZXIuc2l6ZSA+IGxhc3RTbGlkZVJpZ2h0RWRnZTtcbiAgfSBlbHNlIHtcbiAgICBzd2lwZXIuaXNMb2NrZWQgPSBzd2lwZXIuc25hcEdyaWQubGVuZ3RoID09PSAxO1xuICB9XG4gIGlmIChwYXJhbXMuYWxsb3dTbGlkZU5leHQgPT09IHRydWUpIHtcbiAgICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSAhc3dpcGVyLmlzTG9ja2VkO1xuICB9XG4gIGlmIChwYXJhbXMuYWxsb3dTbGlkZVByZXYgPT09IHRydWUpIHtcbiAgICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSAhc3dpcGVyLmlzTG9ja2VkO1xuICB9XG4gIGlmICh3YXNMb2NrZWQgJiYgd2FzTG9ja2VkICE9PSBzd2lwZXIuaXNMb2NrZWQpIHtcbiAgICBzd2lwZXIuaXNFbmQgPSBmYWxzZTtcbiAgfVxuICBpZiAod2FzTG9ja2VkICE9PSBzd2lwZXIuaXNMb2NrZWQpIHtcbiAgICBzd2lwZXIuZW1pdChzd2lwZXIuaXNMb2NrZWQgPyAnbG9jaycgOiAndW5sb2NrJyk7XG4gIH1cbn1cbnZhciBjaGVja092ZXJmbG93JDEgPSB7XG4gIGNoZWNrT3ZlcmZsb3dcbn07XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgaW5pdDogdHJ1ZSxcbiAgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gIG9uZVdheU1vdmVtZW50OiBmYWxzZSxcbiAgdG91Y2hFdmVudHNUYXJnZXQ6ICd3cmFwcGVyJyxcbiAgaW5pdGlhbFNsaWRlOiAwLFxuICBzcGVlZDogMzAwLFxuICBjc3NNb2RlOiBmYWxzZSxcbiAgdXBkYXRlT25XaW5kb3dSZXNpemU6IHRydWUsXG4gIHJlc2l6ZU9ic2VydmVyOiB0cnVlLFxuICBuZXN0ZWQ6IGZhbHNlLFxuICBjcmVhdGVFbGVtZW50czogZmFsc2UsXG4gIGV2ZW50c1ByZWZpeDogJ3N3aXBlcicsXG4gIGVuYWJsZWQ6IHRydWUsXG4gIGZvY3VzYWJsZUVsZW1lbnRzOiAnaW5wdXQsIHNlbGVjdCwgb3B0aW9uLCB0ZXh0YXJlYSwgYnV0dG9uLCB2aWRlbywgbGFiZWwnLFxuICAvLyBPdmVycmlkZXNcbiAgd2lkdGg6IG51bGwsXG4gIGhlaWdodDogbnVsbCxcbiAgLy9cbiAgcHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uOiBmYWxzZSxcbiAgLy8gc3NyXG4gIHVzZXJBZ2VudDogbnVsbCxcbiAgdXJsOiBudWxsLFxuICAvLyBUbyBzdXBwb3J0IGlPUydzIHN3aXBlLXRvLWdvLWJhY2sgZ2VzdHVyZSAod2hlbiBiZWluZyB1c2VkIGluLWFwcCkuXG4gIGVkZ2VTd2lwZURldGVjdGlvbjogZmFsc2UsXG4gIGVkZ2VTd2lwZVRocmVzaG9sZDogMjAsXG4gIC8vIEF1dG9oZWlnaHRcbiAgYXV0b0hlaWdodDogZmFsc2UsXG4gIC8vIFNldCB3cmFwcGVyIHdpZHRoXG4gIHNldFdyYXBwZXJTaXplOiBmYWxzZSxcbiAgLy8gVmlydHVhbCBUcmFuc2xhdGVcbiAgdmlydHVhbFRyYW5zbGF0ZTogZmFsc2UsXG4gIC8vIEVmZmVjdHNcbiAgZWZmZWN0OiAnc2xpZGUnLFxuICAvLyAnc2xpZGUnIG9yICdmYWRlJyBvciAnY3ViZScgb3IgJ2NvdmVyZmxvdycgb3IgJ2ZsaXAnXG5cbiAgLy8gQnJlYWtwb2ludHNcbiAgYnJlYWtwb2ludHM6IHVuZGVmaW5lZCxcbiAgYnJlYWtwb2ludHNCYXNlOiAnd2luZG93JyxcbiAgLy8gU2xpZGVzIGdyaWRcbiAgc3BhY2VCZXR3ZWVuOiAwLFxuICBzbGlkZXNQZXJWaWV3OiAxLFxuICBzbGlkZXNQZXJHcm91cDogMSxcbiAgc2xpZGVzUGVyR3JvdXBTa2lwOiAwLFxuICBzbGlkZXNQZXJHcm91cEF1dG86IGZhbHNlLFxuICBjZW50ZXJlZFNsaWRlczogZmFsc2UsXG4gIGNlbnRlcmVkU2xpZGVzQm91bmRzOiBmYWxzZSxcbiAgc2xpZGVzT2Zmc2V0QmVmb3JlOiAwLFxuICAvLyBpbiBweFxuICBzbGlkZXNPZmZzZXRBZnRlcjogMCxcbiAgLy8gaW4gcHhcbiAgbm9ybWFsaXplU2xpZGVJbmRleDogdHJ1ZSxcbiAgY2VudGVySW5zdWZmaWNpZW50U2xpZGVzOiBmYWxzZSxcbiAgLy8gRGlzYWJsZSBzd2lwZXIgYW5kIGhpZGUgbmF2aWdhdGlvbiB3aGVuIGNvbnRhaW5lciBub3Qgb3ZlcmZsb3dcbiAgd2F0Y2hPdmVyZmxvdzogdHJ1ZSxcbiAgLy8gUm91bmQgbGVuZ3RoXG4gIHJvdW5kTGVuZ3RoczogZmFsc2UsXG4gIC8vIFRvdWNoZXNcbiAgdG91Y2hSYXRpbzogMSxcbiAgdG91Y2hBbmdsZTogNDUsXG4gIHNpbXVsYXRlVG91Y2g6IHRydWUsXG4gIHNob3J0U3dpcGVzOiB0cnVlLFxuICBsb25nU3dpcGVzOiB0cnVlLFxuICBsb25nU3dpcGVzUmF0aW86IDAuNSxcbiAgbG9uZ1N3aXBlc01zOiAzMDAsXG4gIGZvbGxvd0ZpbmdlcjogdHJ1ZSxcbiAgYWxsb3dUb3VjaE1vdmU6IHRydWUsXG4gIHRocmVzaG9sZDogNSxcbiAgdG91Y2hNb3ZlU3RvcFByb3BhZ2F0aW9uOiBmYWxzZSxcbiAgdG91Y2hTdGFydFByZXZlbnREZWZhdWx0OiB0cnVlLFxuICB0b3VjaFN0YXJ0Rm9yY2VQcmV2ZW50RGVmYXVsdDogZmFsc2UsXG4gIHRvdWNoUmVsZWFzZU9uRWRnZXM6IGZhbHNlLFxuICAvLyBVbmlxdWUgTmF2aWdhdGlvbiBFbGVtZW50c1xuICB1bmlxdWVOYXZFbGVtZW50czogdHJ1ZSxcbiAgLy8gUmVzaXN0YW5jZVxuICByZXNpc3RhbmNlOiB0cnVlLFxuICByZXNpc3RhbmNlUmF0aW86IDAuODUsXG4gIC8vIFByb2dyZXNzXG4gIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IGZhbHNlLFxuICAvLyBDdXJzb3JcbiAgZ3JhYkN1cnNvcjogZmFsc2UsXG4gIC8vIENsaWNrc1xuICBwcmV2ZW50Q2xpY2tzOiB0cnVlLFxuICBwcmV2ZW50Q2xpY2tzUHJvcGFnYXRpb246IHRydWUsXG4gIHNsaWRlVG9DbGlja2VkU2xpZGU6IGZhbHNlLFxuICAvLyBsb29wXG4gIGxvb3A6IGZhbHNlLFxuICBsb29wQWRkQmxhbmtTbGlkZXM6IHRydWUsXG4gIGxvb3BBZGRpdGlvbmFsU2xpZGVzOiAwLFxuICBsb29wUHJldmVudHNTbGlkaW5nOiB0cnVlLFxuICAvLyByZXdpbmRcbiAgcmV3aW5kOiBmYWxzZSxcbiAgLy8gU3dpcGluZy9ubyBzd2lwaW5nXG4gIGFsbG93U2xpZGVQcmV2OiB0cnVlLFxuICBhbGxvd1NsaWRlTmV4dDogdHJ1ZSxcbiAgc3dpcGVIYW5kbGVyOiBudWxsLFxuICAvLyAnLnN3aXBlLWhhbmRsZXInLFxuICBub1N3aXBpbmc6IHRydWUsXG4gIG5vU3dpcGluZ0NsYXNzOiAnc3dpcGVyLW5vLXN3aXBpbmcnLFxuICBub1N3aXBpbmdTZWxlY3RvcjogbnVsbCxcbiAgLy8gUGFzc2l2ZSBMaXN0ZW5lcnNcbiAgcGFzc2l2ZUxpc3RlbmVyczogdHJ1ZSxcbiAgbWF4QmFja2ZhY2VIaWRkZW5TbGlkZXM6IDEwLFxuICAvLyBOU1xuICBjb250YWluZXJNb2RpZmllckNsYXNzOiAnc3dpcGVyLScsXG4gIC8vIE5FV1xuICBzbGlkZUNsYXNzOiAnc3dpcGVyLXNsaWRlJyxcbiAgc2xpZGVCbGFua0NsYXNzOiAnc3dpcGVyLXNsaWRlLWJsYW5rJyxcbiAgc2xpZGVBY3RpdmVDbGFzczogJ3N3aXBlci1zbGlkZS1hY3RpdmUnLFxuICBzbGlkZVZpc2libGVDbGFzczogJ3N3aXBlci1zbGlkZS12aXNpYmxlJyxcbiAgc2xpZGVGdWxseVZpc2libGVDbGFzczogJ3N3aXBlci1zbGlkZS1mdWxseS12aXNpYmxlJyxcbiAgc2xpZGVOZXh0Q2xhc3M6ICdzd2lwZXItc2xpZGUtbmV4dCcsXG4gIHNsaWRlUHJldkNsYXNzOiAnc3dpcGVyLXNsaWRlLXByZXYnLFxuICB3cmFwcGVyQ2xhc3M6ICdzd2lwZXItd3JhcHBlcicsXG4gIGxhenlQcmVsb2FkZXJDbGFzczogJ3N3aXBlci1sYXp5LXByZWxvYWRlcicsXG4gIGxhenlQcmVsb2FkUHJldk5leHQ6IDAsXG4gIC8vIENhbGxiYWNrc1xuICBydW5DYWxsYmFja3NPbkluaXQ6IHRydWUsXG4gIC8vIEludGVybmFsc1xuICBfZW1pdENsYXNzZXM6IGZhbHNlXG59O1xuXG5mdW5jdGlvbiBtb2R1bGVFeHRlbmRQYXJhbXMocGFyYW1zLCBhbGxNb2R1bGVzUGFyYW1zKSB7XG4gIHJldHVybiBmdW5jdGlvbiBleHRlbmRQYXJhbXMob2JqKSB7XG4gICAgaWYgKG9iaiA9PT0gdm9pZCAwKSB7XG4gICAgICBvYmogPSB7fTtcbiAgICB9XG4gICAgY29uc3QgbW9kdWxlUGFyYW1OYW1lID0gT2JqZWN0LmtleXMob2JqKVswXTtcbiAgICBjb25zdCBtb2R1bGVQYXJhbXMgPSBvYmpbbW9kdWxlUGFyYW1OYW1lXTtcbiAgICBpZiAodHlwZW9mIG1vZHVsZVBhcmFtcyAhPT0gJ29iamVjdCcgfHwgbW9kdWxlUGFyYW1zID09PSBudWxsKSB7XG4gICAgICBleHRlbmQoYWxsTW9kdWxlc1BhcmFtcywgb2JqKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID09PSB0cnVlKSB7XG4gICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9IHtcbiAgICAgICAgZW5hYmxlZDogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gICAgaWYgKG1vZHVsZVBhcmFtTmFtZSA9PT0gJ25hdmlnYXRpb24nICYmIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdICYmIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLmVuYWJsZWQgJiYgIXBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLnByZXZFbCAmJiAhcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0ubmV4dEVsKSB7XG4gICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5hdXRvID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKFsncGFnaW5hdGlvbicsICdzY3JvbGxiYXInXS5pbmRleE9mKG1vZHVsZVBhcmFtTmFtZSkgPj0gMCAmJiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSAmJiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5lbmFibGVkICYmICFwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5lbCkge1xuICAgICAgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0uYXV0byA9IHRydWU7XG4gICAgfVxuICAgIGlmICghKG1vZHVsZVBhcmFtTmFtZSBpbiBwYXJhbXMgJiYgJ2VuYWJsZWQnIGluIG1vZHVsZVBhcmFtcykpIHtcbiAgICAgIGV4dGVuZChhbGxNb2R1bGVzUGFyYW1zLCBvYmopO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdID09PSAnb2JqZWN0JyAmJiAhKCdlbmFibGVkJyBpbiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSkpIHtcbiAgICAgIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLmVuYWJsZWQgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoIXBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdKSBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlXG4gICAgfTtcbiAgICBleHRlbmQoYWxsTW9kdWxlc1BhcmFtcywgb2JqKTtcbiAgfTtcbn1cblxuLyogZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOiBcIm9mZlwiICovXG5jb25zdCBwcm90b3R5cGVzID0ge1xuICBldmVudHNFbWl0dGVyLFxuICB1cGRhdGUsXG4gIHRyYW5zbGF0ZSxcbiAgdHJhbnNpdGlvbixcbiAgc2xpZGUsXG4gIGxvb3AsXG4gIGdyYWJDdXJzb3IsXG4gIGV2ZW50czogZXZlbnRzJDEsXG4gIGJyZWFrcG9pbnRzLFxuICBjaGVja092ZXJmbG93OiBjaGVja092ZXJmbG93JDEsXG4gIGNsYXNzZXNcbn07XG5jb25zdCBleHRlbmRlZERlZmF1bHRzID0ge307XG5jbGFzcyBTd2lwZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBsZXQgZWw7XG4gICAgbGV0IHBhcmFtcztcbiAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgIGFyZ3NbX2tleV0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgfVxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMSAmJiBhcmdzWzBdLmNvbnN0cnVjdG9yICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcmdzWzBdKS5zbGljZSg4LCAtMSkgPT09ICdPYmplY3QnKSB7XG4gICAgICBwYXJhbXMgPSBhcmdzWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBbZWwsIHBhcmFtc10gPSBhcmdzO1xuICAgIH1cbiAgICBpZiAoIXBhcmFtcykgcGFyYW1zID0ge307XG4gICAgcGFyYW1zID0gZXh0ZW5kKHt9LCBwYXJhbXMpO1xuICAgIGlmIChlbCAmJiAhcGFyYW1zLmVsKSBwYXJhbXMuZWwgPSBlbDtcbiAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgaWYgKHBhcmFtcy5lbCAmJiB0eXBlb2YgcGFyYW1zLmVsID09PSAnc3RyaW5nJyAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhcmFtcy5lbCkubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3Qgc3dpcGVycyA9IFtdO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwYXJhbXMuZWwpLmZvckVhY2goY29udGFpbmVyRWwgPT4ge1xuICAgICAgICBjb25zdCBuZXdQYXJhbXMgPSBleHRlbmQoe30sIHBhcmFtcywge1xuICAgICAgICAgIGVsOiBjb250YWluZXJFbFxuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVycy5wdXNoKG5ldyBTd2lwZXIobmV3UGFyYW1zKSk7XG4gICAgICB9KTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdHJ1Y3Rvci1yZXR1cm5cbiAgICAgIHJldHVybiBzd2lwZXJzO1xuICAgIH1cblxuICAgIC8vIFN3aXBlciBJbnN0YW5jZVxuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgc3dpcGVyLl9fc3dpcGVyX18gPSB0cnVlO1xuICAgIHN3aXBlci5zdXBwb3J0ID0gZ2V0U3VwcG9ydCgpO1xuICAgIHN3aXBlci5kZXZpY2UgPSBnZXREZXZpY2Uoe1xuICAgICAgdXNlckFnZW50OiBwYXJhbXMudXNlckFnZW50XG4gICAgfSk7XG4gICAgc3dpcGVyLmJyb3dzZXIgPSBnZXRCcm93c2VyKCk7XG4gICAgc3dpcGVyLmV2ZW50c0xpc3RlbmVycyA9IHt9O1xuICAgIHN3aXBlci5ldmVudHNBbnlMaXN0ZW5lcnMgPSBbXTtcbiAgICBzd2lwZXIubW9kdWxlcyA9IFsuLi5zd2lwZXIuX19tb2R1bGVzX19dO1xuICAgIGlmIChwYXJhbXMubW9kdWxlcyAmJiBBcnJheS5pc0FycmF5KHBhcmFtcy5tb2R1bGVzKSkge1xuICAgICAgc3dpcGVyLm1vZHVsZXMucHVzaCguLi5wYXJhbXMubW9kdWxlcyk7XG4gICAgfVxuICAgIGNvbnN0IGFsbE1vZHVsZXNQYXJhbXMgPSB7fTtcbiAgICBzd2lwZXIubW9kdWxlcy5mb3JFYWNoKG1vZCA9PiB7XG4gICAgICBtb2Qoe1xuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHN3aXBlcixcbiAgICAgICAgZXh0ZW5kUGFyYW1zOiBtb2R1bGVFeHRlbmRQYXJhbXMocGFyYW1zLCBhbGxNb2R1bGVzUGFyYW1zKSxcbiAgICAgICAgb246IHN3aXBlci5vbi5iaW5kKHN3aXBlciksXG4gICAgICAgIG9uY2U6IHN3aXBlci5vbmNlLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgb2ZmOiBzd2lwZXIub2ZmLmJpbmQoc3dpcGVyKSxcbiAgICAgICAgZW1pdDogc3dpcGVyLmVtaXQuYmluZChzd2lwZXIpXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIEV4dGVuZCBkZWZhdWx0cyB3aXRoIG1vZHVsZXMgcGFyYW1zXG4gICAgY29uc3Qgc3dpcGVyUGFyYW1zID0gZXh0ZW5kKHt9LCBkZWZhdWx0cywgYWxsTW9kdWxlc1BhcmFtcyk7XG5cbiAgICAvLyBFeHRlbmQgZGVmYXVsdHMgd2l0aCBwYXNzZWQgcGFyYW1zXG4gICAgc3dpcGVyLnBhcmFtcyA9IGV4dGVuZCh7fSwgc3dpcGVyUGFyYW1zLCBleHRlbmRlZERlZmF1bHRzLCBwYXJhbXMpO1xuICAgIHN3aXBlci5vcmlnaW5hbFBhcmFtcyA9IGV4dGVuZCh7fSwgc3dpcGVyLnBhcmFtcyk7XG4gICAgc3dpcGVyLnBhc3NlZFBhcmFtcyA9IGV4dGVuZCh7fSwgcGFyYW1zKTtcblxuICAgIC8vIGFkZCBldmVudCBsaXN0ZW5lcnNcbiAgICBpZiAoc3dpcGVyLnBhcmFtcyAmJiBzd2lwZXIucGFyYW1zLm9uKSB7XG4gICAgICBPYmplY3Qua2V5cyhzd2lwZXIucGFyYW1zLm9uKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICAgIHN3aXBlci5vbihldmVudE5hbWUsIHN3aXBlci5wYXJhbXMub25bZXZlbnROYW1lXSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMgJiYgc3dpcGVyLnBhcmFtcy5vbkFueSkge1xuICAgICAgc3dpcGVyLm9uQW55KHN3aXBlci5wYXJhbXMub25BbnkpO1xuICAgIH1cblxuICAgIC8vIEV4dGVuZCBTd2lwZXJcbiAgICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgICAgZW5hYmxlZDogc3dpcGVyLnBhcmFtcy5lbmFibGVkLFxuICAgICAgZWwsXG4gICAgICAvLyBDbGFzc2VzXG4gICAgICBjbGFzc05hbWVzOiBbXSxcbiAgICAgIC8vIFNsaWRlc1xuICAgICAgc2xpZGVzOiBbXSxcbiAgICAgIHNsaWRlc0dyaWQ6IFtdLFxuICAgICAgc25hcEdyaWQ6IFtdLFxuICAgICAgc2xpZGVzU2l6ZXNHcmlkOiBbXSxcbiAgICAgIC8vIGlzRGlyZWN0aW9uXG4gICAgICBpc0hvcml6b250YWwoKSB7XG4gICAgICAgIHJldHVybiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnO1xuICAgICAgfSxcbiAgICAgIGlzVmVydGljYWwoKSB7XG4gICAgICAgIHJldHVybiBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJztcbiAgICAgIH0sXG4gICAgICAvLyBJbmRleGVzXG4gICAgICBhY3RpdmVJbmRleDogMCxcbiAgICAgIHJlYWxJbmRleDogMCxcbiAgICAgIC8vXG4gICAgICBpc0JlZ2lubmluZzogdHJ1ZSxcbiAgICAgIGlzRW5kOiBmYWxzZSxcbiAgICAgIC8vIFByb3BzXG4gICAgICB0cmFuc2xhdGU6IDAsXG4gICAgICBwcmV2aW91c1RyYW5zbGF0ZTogMCxcbiAgICAgIHByb2dyZXNzOiAwLFxuICAgICAgdmVsb2NpdHk6IDAsXG4gICAgICBhbmltYXRpbmc6IGZhbHNlLFxuICAgICAgY3NzT3ZlcmZsb3dBZGp1c3RtZW50KCkge1xuICAgICAgICAvLyBSZXR1cm5zIDAgdW5sZXNzIGB0cmFuc2xhdGVgIGlzID4gMioqMjNcbiAgICAgICAgLy8gU2hvdWxkIGJlIHN1YnRyYWN0ZWQgZnJvbSBjc3MgdmFsdWVzIHRvIHByZXZlbnQgb3ZlcmZsb3dcbiAgICAgICAgcmV0dXJuIE1hdGgudHJ1bmModGhpcy50cmFuc2xhdGUgLyAyICoqIDIzKSAqIDIgKiogMjM7XG4gICAgICB9LFxuICAgICAgLy8gTG9ja3NcbiAgICAgIGFsbG93U2xpZGVOZXh0OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVOZXh0LFxuICAgICAgYWxsb3dTbGlkZVByZXY6IHN3aXBlci5wYXJhbXMuYWxsb3dTbGlkZVByZXYsXG4gICAgICAvLyBUb3VjaCBFdmVudHNcbiAgICAgIHRvdWNoRXZlbnRzRGF0YToge1xuICAgICAgICBpc1RvdWNoZWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNNb3ZlZDogdW5kZWZpbmVkLFxuICAgICAgICBhbGxvd1RvdWNoQ2FsbGJhY2tzOiB1bmRlZmluZWQsXG4gICAgICAgIHRvdWNoU3RhcnRUaW1lOiB1bmRlZmluZWQsXG4gICAgICAgIGlzU2Nyb2xsaW5nOiB1bmRlZmluZWQsXG4gICAgICAgIGN1cnJlbnRUcmFuc2xhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgc3RhcnRUcmFuc2xhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgYWxsb3dUaHJlc2hvbGRNb3ZlOiB1bmRlZmluZWQsXG4gICAgICAgIC8vIEZvcm0gZWxlbWVudHMgdG8gbWF0Y2hcbiAgICAgICAgZm9jdXNhYmxlRWxlbWVudHM6IHN3aXBlci5wYXJhbXMuZm9jdXNhYmxlRWxlbWVudHMsXG4gICAgICAgIC8vIExhc3QgY2xpY2sgdGltZVxuICAgICAgICBsYXN0Q2xpY2tUaW1lOiAwLFxuICAgICAgICBjbGlja1RpbWVvdXQ6IHVuZGVmaW5lZCxcbiAgICAgICAgLy8gVmVsb2NpdGllc1xuICAgICAgICB2ZWxvY2l0aWVzOiBbXSxcbiAgICAgICAgYWxsb3dNb21lbnR1bUJvdW5jZTogdW5kZWZpbmVkLFxuICAgICAgICBzdGFydE1vdmluZzogdW5kZWZpbmVkLFxuICAgICAgICBwb2ludGVySWQ6IG51bGwsXG4gICAgICAgIHRvdWNoSWQ6IG51bGxcbiAgICAgIH0sXG4gICAgICAvLyBDbGlja3NcbiAgICAgIGFsbG93Q2xpY2s6IHRydWUsXG4gICAgICAvLyBUb3VjaGVzXG4gICAgICBhbGxvd1RvdWNoTW92ZTogc3dpcGVyLnBhcmFtcy5hbGxvd1RvdWNoTW92ZSxcbiAgICAgIHRvdWNoZXM6IHtcbiAgICAgICAgc3RhcnRYOiAwLFxuICAgICAgICBzdGFydFk6IDAsXG4gICAgICAgIGN1cnJlbnRYOiAwLFxuICAgICAgICBjdXJyZW50WTogMCxcbiAgICAgICAgZGlmZjogMFxuICAgICAgfSxcbiAgICAgIC8vIEltYWdlc1xuICAgICAgaW1hZ2VzVG9Mb2FkOiBbXSxcbiAgICAgIGltYWdlc0xvYWRlZDogMFxuICAgIH0pO1xuICAgIHN3aXBlci5lbWl0KCdfc3dpcGVyJyk7XG5cbiAgICAvLyBJbml0XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuaW5pdCkge1xuICAgICAgc3dpcGVyLmluaXQoKTtcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYXBwIGluc3RhbmNlXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0cnVjdG9yLXJldHVyblxuICAgIHJldHVybiBzd2lwZXI7XG4gIH1cbiAgZ2V0RGlyZWN0aW9uTGFiZWwocHJvcGVydHkpIHtcbiAgICBpZiAodGhpcy5pc0hvcml6b250YWwoKSkge1xuICAgICAgcmV0dXJuIHByb3BlcnR5O1xuICAgIH1cbiAgICAvLyBwcmV0dGllci1pZ25vcmVcbiAgICByZXR1cm4ge1xuICAgICAgJ3dpZHRoJzogJ2hlaWdodCcsXG4gICAgICAnbWFyZ2luLXRvcCc6ICdtYXJnaW4tbGVmdCcsXG4gICAgICAnbWFyZ2luLWJvdHRvbSAnOiAnbWFyZ2luLXJpZ2h0JyxcbiAgICAgICdtYXJnaW4tbGVmdCc6ICdtYXJnaW4tdG9wJyxcbiAgICAgICdtYXJnaW4tcmlnaHQnOiAnbWFyZ2luLWJvdHRvbScsXG4gICAgICAncGFkZGluZy1sZWZ0JzogJ3BhZGRpbmctdG9wJyxcbiAgICAgICdwYWRkaW5nLXJpZ2h0JzogJ3BhZGRpbmctYm90dG9tJyxcbiAgICAgICdtYXJnaW5SaWdodCc6ICdtYXJnaW5Cb3R0b20nXG4gICAgfVtwcm9wZXJ0eV07XG4gIH1cbiAgZ2V0U2xpZGVJbmRleChzbGlkZUVsKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2xpZGVzRWwsXG4gICAgICBwYXJhbXNcbiAgICB9ID0gdGhpcztcbiAgICBjb25zdCBzbGlkZXMgPSBlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApO1xuICAgIGNvbnN0IGZpcnN0U2xpZGVJbmRleCA9IGVsZW1lbnRJbmRleChzbGlkZXNbMF0pO1xuICAgIHJldHVybiBlbGVtZW50SW5kZXgoc2xpZGVFbCkgLSBmaXJzdFNsaWRlSW5kZXg7XG4gIH1cbiAgZ2V0U2xpZGVJbmRleEJ5RGF0YShpbmRleCkge1xuICAgIHJldHVybiB0aGlzLmdldFNsaWRlSW5kZXgodGhpcy5zbGlkZXMuZmlsdGVyKHNsaWRlRWwgPT4gc2xpZGVFbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JykgKiAxID09PSBpbmRleClbMF0pO1xuICB9XG4gIHJlY2FsY1NsaWRlcygpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHtcbiAgICAgIHNsaWRlc0VsLFxuICAgICAgcGFyYW1zXG4gICAgfSA9IHN3aXBlcjtcbiAgICBzd2lwZXIuc2xpZGVzID0gZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKTtcbiAgfVxuICBlbmFibGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoc3dpcGVyLmVuYWJsZWQpIHJldHVybjtcbiAgICBzd2lwZXIuZW5hYmxlZCA9IHRydWU7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoKTtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXQoJ2VuYWJsZScpO1xuICB9XG4gIGRpc2FibGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIXN3aXBlci5lbmFibGVkKSByZXR1cm47XG4gICAgc3dpcGVyLmVuYWJsZWQgPSBmYWxzZTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICBzd2lwZXIudW5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KCdkaXNhYmxlJyk7XG4gIH1cbiAgc2V0UHJvZ3Jlc3MocHJvZ3Jlc3MsIHNwZWVkKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBwcm9ncmVzcyA9IE1hdGgubWluKE1hdGgubWF4KHByb2dyZXNzLCAwKSwgMSk7XG4gICAgY29uc3QgbWluID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICAgIGNvbnN0IG1heCA9IHN3aXBlci5tYXhUcmFuc2xhdGUoKTtcbiAgICBjb25zdCBjdXJyZW50ID0gKG1heCAtIG1pbikgKiBwcm9ncmVzcyArIG1pbjtcbiAgICBzd2lwZXIudHJhbnNsYXRlVG8oY3VycmVudCwgdHlwZW9mIHNwZWVkID09PSAndW5kZWZpbmVkJyA/IDAgOiBzcGVlZCk7XG4gICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgfVxuICBlbWl0Q29udGFpbmVyQ2xhc3NlcygpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5fZW1pdENsYXNzZXMgfHwgIXN3aXBlci5lbCkgcmV0dXJuO1xuICAgIGNvbnN0IGNscyA9IHN3aXBlci5lbC5jbGFzc05hbWUuc3BsaXQoJyAnKS5maWx0ZXIoY2xhc3NOYW1lID0+IHtcbiAgICAgIHJldHVybiBjbGFzc05hbWUuaW5kZXhPZignc3dpcGVyJykgPT09IDAgfHwgY2xhc3NOYW1lLmluZGV4T2Yoc3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzKSA9PT0gMDtcbiAgICB9KTtcbiAgICBzd2lwZXIuZW1pdCgnX2NvbnRhaW5lckNsYXNzZXMnLCBjbHMuam9pbignICcpKTtcbiAgfVxuICBnZXRTbGlkZUNsYXNzZXMoc2xpZGVFbCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKHN3aXBlci5kZXN0cm95ZWQpIHJldHVybiAnJztcbiAgICByZXR1cm4gc2xpZGVFbC5jbGFzc05hbWUuc3BsaXQoJyAnKS5maWx0ZXIoY2xhc3NOYW1lID0+IHtcbiAgICAgIHJldHVybiBjbGFzc05hbWUuaW5kZXhPZignc3dpcGVyLXNsaWRlJykgPT09IDAgfHwgY2xhc3NOYW1lLmluZGV4T2Yoc3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzKSA9PT0gMDtcbiAgICB9KS5qb2luKCcgJyk7XG4gIH1cbiAgZW1pdFNsaWRlc0NsYXNzZXMoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuX2VtaXRDbGFzc2VzIHx8ICFzd2lwZXIuZWwpIHJldHVybjtcbiAgICBjb25zdCB1cGRhdGVzID0gW107XG4gICAgc3dpcGVyLnNsaWRlcy5mb3JFYWNoKHNsaWRlRWwgPT4ge1xuICAgICAgY29uc3QgY2xhc3NOYW1lcyA9IHN3aXBlci5nZXRTbGlkZUNsYXNzZXMoc2xpZGVFbCk7XG4gICAgICB1cGRhdGVzLnB1c2goe1xuICAgICAgICBzbGlkZUVsLFxuICAgICAgICBjbGFzc05hbWVzXG4gICAgICB9KTtcbiAgICAgIHN3aXBlci5lbWl0KCdfc2xpZGVDbGFzcycsIHNsaWRlRWwsIGNsYXNzTmFtZXMpO1xuICAgIH0pO1xuICAgIHN3aXBlci5lbWl0KCdfc2xpZGVDbGFzc2VzJywgdXBkYXRlcyk7XG4gIH1cbiAgc2xpZGVzUGVyVmlld0R5bmFtaWModmlldywgZXhhY3QpIHtcbiAgICBpZiAodmlldyA9PT0gdm9pZCAwKSB7XG4gICAgICB2aWV3ID0gJ2N1cnJlbnQnO1xuICAgIH1cbiAgICBpZiAoZXhhY3QgPT09IHZvaWQgMCkge1xuICAgICAgZXhhY3QgPSBmYWxzZTtcbiAgICB9XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB7XG4gICAgICBwYXJhbXMsXG4gICAgICBzbGlkZXMsXG4gICAgICBzbGlkZXNHcmlkLFxuICAgICAgc2xpZGVzU2l6ZXNHcmlkLFxuICAgICAgc2l6ZTogc3dpcGVyU2l6ZSxcbiAgICAgIGFjdGl2ZUluZGV4XG4gICAgfSA9IHN3aXBlcjtcbiAgICBsZXQgc3B2ID0gMTtcbiAgICBpZiAodHlwZW9mIHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnbnVtYmVyJykgcmV0dXJuIHBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIGxldCBzbGlkZVNpemUgPSBzbGlkZXNbYWN0aXZlSW5kZXhdID8gc2xpZGVzW2FjdGl2ZUluZGV4XS5zd2lwZXJTbGlkZVNpemUgOiAwO1xuICAgICAgbGV0IGJyZWFrTG9vcDtcbiAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleCArIDE7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHNsaWRlc1tpXSAmJiAhYnJlYWtMb29wKSB7XG4gICAgICAgICAgc2xpZGVTaXplICs9IHNsaWRlc1tpXS5zd2lwZXJTbGlkZVNpemU7XG4gICAgICAgICAgc3B2ICs9IDE7XG4gICAgICAgICAgaWYgKHNsaWRlU2l6ZSA+IHN3aXBlclNpemUpIGJyZWFrTG9vcCA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSBhY3RpdmVJbmRleCAtIDE7IGkgPj0gMDsgaSAtPSAxKSB7XG4gICAgICAgIGlmIChzbGlkZXNbaV0gJiYgIWJyZWFrTG9vcCkge1xuICAgICAgICAgIHNsaWRlU2l6ZSArPSBzbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgIGlmIChzbGlkZVNpemUgPiBzd2lwZXJTaXplKSBicmVha0xvb3AgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgaWYgKHZpZXcgPT09ICdjdXJyZW50Jykge1xuICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggKyAxOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgY29uc3Qgc2xpZGVJblZpZXcgPSBleGFjdCA/IHNsaWRlc0dyaWRbaV0gKyBzbGlkZXNTaXplc0dyaWRbaV0gLSBzbGlkZXNHcmlkW2FjdGl2ZUluZGV4XSA8IHN3aXBlclNpemUgOiBzbGlkZXNHcmlkW2ldIC0gc2xpZGVzR3JpZFthY3RpdmVJbmRleF0gPCBzd2lwZXJTaXplO1xuICAgICAgICAgIGlmIChzbGlkZUluVmlldykge1xuICAgICAgICAgICAgc3B2ICs9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBwcmV2aW91c1xuICAgICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICAgIGNvbnN0IHNsaWRlSW5WaWV3ID0gc2xpZGVzR3JpZFthY3RpdmVJbmRleF0gLSBzbGlkZXNHcmlkW2ldIDwgc3dpcGVyU2l6ZTtcbiAgICAgICAgICBpZiAoc2xpZGVJblZpZXcpIHtcbiAgICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3B2O1xuICB9XG4gIHVwZGF0ZSgpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICBjb25zdCB7XG4gICAgICBzbmFwR3JpZCxcbiAgICAgIHBhcmFtc1xuICAgIH0gPSBzd2lwZXI7XG4gICAgLy8gQnJlYWtwb2ludHNcbiAgICBpZiAocGFyYW1zLmJyZWFrcG9pbnRzKSB7XG4gICAgICBzd2lwZXIuc2V0QnJlYWtwb2ludCgpO1xuICAgIH1cbiAgICBbLi4uc3dpcGVyLmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tsb2FkaW5nPVwibGF6eVwiXScpXS5mb3JFYWNoKGltYWdlRWwgPT4ge1xuICAgICAgaWYgKGltYWdlRWwuY29tcGxldGUpIHtcbiAgICAgICAgcHJvY2Vzc0xhenlQcmVsb2FkZXIoc3dpcGVyLCBpbWFnZUVsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoKTtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICAgIGZ1bmN0aW9uIHNldFRyYW5zbGF0ZSgpIHtcbiAgICAgIGNvbnN0IHRyYW5zbGF0ZVZhbHVlID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgKiAtMSA6IHN3aXBlci50cmFuc2xhdGU7XG4gICAgICBjb25zdCBuZXdUcmFuc2xhdGUgPSBNYXRoLm1pbihNYXRoLm1heCh0cmFuc2xhdGVWYWx1ZSwgc3dpcGVyLm1heFRyYW5zbGF0ZSgpKSwgc3dpcGVyLm1pblRyYW5zbGF0ZSgpKTtcbiAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUobmV3VHJhbnNsYXRlKTtcbiAgICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICB9XG4gICAgbGV0IHRyYW5zbGF0ZWQ7XG4gICAgaWYgKHBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCAmJiAhcGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIHNldFRyYW5zbGF0ZSgpO1xuICAgICAgaWYgKHBhcmFtcy5hdXRvSGVpZ2h0KSB7XG4gICAgICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICgocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyB8fCBwYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpICYmIHN3aXBlci5pc0VuZCAmJiAhcGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAgIGNvbnN0IHNsaWRlcyA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMgOiBzd2lwZXIuc2xpZGVzO1xuICAgICAgICB0cmFuc2xhdGVkID0gc3dpcGVyLnNsaWRlVG8oc2xpZGVzLmxlbmd0aCAtIDEsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRyYW5zbGF0ZWQgPSBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgIH1cbiAgICAgIGlmICghdHJhbnNsYXRlZCkge1xuICAgICAgICBzZXRUcmFuc2xhdGUoKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHNuYXBHcmlkICE9PSBzd2lwZXIuc25hcEdyaWQpIHtcbiAgICAgIHN3aXBlci5jaGVja092ZXJmbG93KCk7XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KCd1cGRhdGUnKTtcbiAgfVxuICBjaGFuZ2VEaXJlY3Rpb24obmV3RGlyZWN0aW9uLCBuZWVkVXBkYXRlKSB7XG4gICAgaWYgKG5lZWRVcGRhdGUgPT09IHZvaWQgMCkge1xuICAgICAgbmVlZFVwZGF0ZSA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3QgY3VycmVudERpcmVjdGlvbiA9IHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uO1xuICAgIGlmICghbmV3RGlyZWN0aW9uKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIG5ld0RpcmVjdGlvbiA9IGN1cnJlbnREaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG4gICAgfVxuICAgIGlmIChuZXdEaXJlY3Rpb24gPT09IGN1cnJlbnREaXJlY3Rpb24gfHwgbmV3RGlyZWN0aW9uICE9PSAnaG9yaXpvbnRhbCcgJiYgbmV3RGlyZWN0aW9uICE9PSAndmVydGljYWwnKSB7XG4gICAgICByZXR1cm4gc3dpcGVyO1xuICAgIH1cbiAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LnJlbW92ZShgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9JHtjdXJyZW50RGlyZWN0aW9ufWApO1xuICAgIHN3aXBlci5lbC5jbGFzc0xpc3QuYWRkKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc30ke25ld0RpcmVjdGlvbn1gKTtcbiAgICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbiAgICBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9IG5ld0RpcmVjdGlvbjtcbiAgICBzd2lwZXIuc2xpZGVzLmZvckVhY2goc2xpZGVFbCA9PiB7XG4gICAgICBpZiAobmV3RGlyZWN0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICAgIHNsaWRlRWwuc3R5bGUud2lkdGggPSAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNsaWRlRWwuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgICB9XG4gICAgfSk7XG4gICAgc3dpcGVyLmVtaXQoJ2NoYW5nZURpcmVjdGlvbicpO1xuICAgIGlmIChuZWVkVXBkYXRlKSBzd2lwZXIudXBkYXRlKCk7XG4gICAgcmV0dXJuIHN3aXBlcjtcbiAgfVxuICBjaGFuZ2VMYW5ndWFnZURpcmVjdGlvbihkaXJlY3Rpb24pIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmIChzd2lwZXIucnRsICYmIGRpcmVjdGlvbiA9PT0gJ3J0bCcgfHwgIXN3aXBlci5ydGwgJiYgZGlyZWN0aW9uID09PSAnbHRyJykgcmV0dXJuO1xuICAgIHN3aXBlci5ydGwgPSBkaXJlY3Rpb24gPT09ICdydGwnO1xuICAgIHN3aXBlci5ydGxUcmFuc2xhdGUgPSBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnICYmIHN3aXBlci5ydGw7XG4gICAgaWYgKHN3aXBlci5ydGwpIHtcbiAgICAgIHN3aXBlci5lbC5jbGFzc0xpc3QuYWRkKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ydGxgKTtcbiAgICAgIHN3aXBlci5lbC5kaXIgPSAncnRsJztcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfXJ0bGApO1xuICAgICAgc3dpcGVyLmVsLmRpciA9ICdsdHInO1xuICAgIH1cbiAgICBzd2lwZXIudXBkYXRlKCk7XG4gIH1cbiAgbW91bnQoZWxlbWVudCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKHN3aXBlci5tb3VudGVkKSByZXR1cm4gdHJ1ZTtcblxuICAgIC8vIEZpbmQgZWxcbiAgICBsZXQgZWwgPSBlbGVtZW50IHx8IHN3aXBlci5wYXJhbXMuZWw7XG4gICAgaWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlbCk7XG4gICAgfVxuICAgIGlmICghZWwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgZWwuc3dpcGVyID0gc3dpcGVyO1xuICAgIGlmIChlbC5wYXJlbnROb2RlICYmIGVsLnBhcmVudE5vZGUuaG9zdCAmJiBlbC5wYXJlbnROb2RlLmhvc3Qubm9kZU5hbWUgPT09ICdTV0lQRVItQ09OVEFJTkVSJykge1xuICAgICAgc3dpcGVyLmlzRWxlbWVudCA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IGdldFdyYXBwZXJTZWxlY3RvciA9ICgpID0+IHtcbiAgICAgIHJldHVybiBgLiR7KHN3aXBlci5wYXJhbXMud3JhcHBlckNsYXNzIHx8ICcnKS50cmltKCkuc3BsaXQoJyAnKS5qb2luKCcuJyl9YDtcbiAgICB9O1xuICAgIGNvbnN0IGdldFdyYXBwZXIgPSAoKSA9PiB7XG4gICAgICBpZiAoZWwgJiYgZWwuc2hhZG93Um9vdCAmJiBlbC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgcmVzID0gZWwuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKGdldFdyYXBwZXJTZWxlY3RvcigpKTtcbiAgICAgICAgLy8gQ2hpbGRyZW4gbmVlZHMgdG8gcmV0dXJuIHNsb3QgaXRlbXNcbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1cbiAgICAgIHJldHVybiBlbGVtZW50Q2hpbGRyZW4oZWwsIGdldFdyYXBwZXJTZWxlY3RvcigpKVswXTtcbiAgICB9O1xuICAgIC8vIEZpbmQgV3JhcHBlclxuICAgIGxldCB3cmFwcGVyRWwgPSBnZXRXcmFwcGVyKCk7XG4gICAgaWYgKCF3cmFwcGVyRWwgJiYgc3dpcGVyLnBhcmFtcy5jcmVhdGVFbGVtZW50cykge1xuICAgICAgd3JhcHBlckVsID0gY3JlYXRlRWxlbWVudCgnZGl2Jywgc3dpcGVyLnBhcmFtcy53cmFwcGVyQ2xhc3MpO1xuICAgICAgZWwuYXBwZW5kKHdyYXBwZXJFbCk7XG4gICAgICBlbGVtZW50Q2hpbGRyZW4oZWwsIGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9YCkuZm9yRWFjaChzbGlkZUVsID0+IHtcbiAgICAgICAgd3JhcHBlckVsLmFwcGVuZChzbGlkZUVsKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgICAgZWwsXG4gICAgICB3cmFwcGVyRWwsXG4gICAgICBzbGlkZXNFbDogc3dpcGVyLmlzRWxlbWVudCAmJiAhZWwucGFyZW50Tm9kZS5ob3N0LnNsaWRlU2xvdHMgPyBlbC5wYXJlbnROb2RlLmhvc3QgOiB3cmFwcGVyRWwsXG4gICAgICBob3N0RWw6IHN3aXBlci5pc0VsZW1lbnQgPyBlbC5wYXJlbnROb2RlLmhvc3QgOiBlbCxcbiAgICAgIG1vdW50ZWQ6IHRydWUsXG4gICAgICAvLyBSVExcbiAgICAgIHJ0bDogZWwuZGlyLnRvTG93ZXJDYXNlKCkgPT09ICdydGwnIHx8IGVsZW1lbnRTdHlsZShlbCwgJ2RpcmVjdGlvbicpID09PSAncnRsJyxcbiAgICAgIHJ0bFRyYW5zbGF0ZTogc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyAmJiAoZWwuZGlyLnRvTG93ZXJDYXNlKCkgPT09ICdydGwnIHx8IGVsZW1lbnRTdHlsZShlbCwgJ2RpcmVjdGlvbicpID09PSAncnRsJyksXG4gICAgICB3cm9uZ1JUTDogZWxlbWVudFN0eWxlKHdyYXBwZXJFbCwgJ2Rpc3BsYXknKSA9PT0gJy13ZWJraXQtYm94J1xuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGluaXQoZWwpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmIChzd2lwZXIuaW5pdGlhbGl6ZWQpIHJldHVybiBzd2lwZXI7XG4gICAgY29uc3QgbW91bnRlZCA9IHN3aXBlci5tb3VudChlbCk7XG4gICAgaWYgKG1vdW50ZWQgPT09IGZhbHNlKSByZXR1cm4gc3dpcGVyO1xuICAgIHN3aXBlci5lbWl0KCdiZWZvcmVJbml0Jyk7XG5cbiAgICAvLyBTZXQgYnJlYWtwb2ludFxuICAgIGlmIChzd2lwZXIucGFyYW1zLmJyZWFrcG9pbnRzKSB7XG4gICAgICBzd2lwZXIuc2V0QnJlYWtwb2ludCgpO1xuICAgIH1cblxuICAgIC8vIEFkZCBDbGFzc2VzXG4gICAgc3dpcGVyLmFkZENsYXNzZXMoKTtcblxuICAgIC8vIFVwZGF0ZSBzaXplXG4gICAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcblxuICAgIC8vIFVwZGF0ZSBzbGlkZXNcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdykge1xuICAgICAgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcbiAgICB9XG5cbiAgICAvLyBTZXQgR3JhYiBDdXJzb3JcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5ncmFiQ3Vyc29yICYmIHN3aXBlci5lbmFibGVkKSB7XG4gICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcigpO1xuICAgIH1cblxuICAgIC8vIFNsaWRlIFRvIEluaXRpYWwgU2xpZGVcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wICYmIHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIucGFyYW1zLmluaXRpYWxTbGlkZSArIHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZSwgMCwgc3dpcGVyLnBhcmFtcy5ydW5DYWxsYmFja3NPbkluaXQsIGZhbHNlLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnBhcmFtcy5pbml0aWFsU2xpZGUsIDAsIHN3aXBlci5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0LCBmYWxzZSwgdHJ1ZSk7XG4gICAgfVxuXG4gICAgLy8gQ3JlYXRlIGxvb3BcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICBzd2lwZXIubG9vcENyZWF0ZSgpO1xuICAgIH1cblxuICAgIC8vIEF0dGFjaCBldmVudHNcbiAgICBzd2lwZXIuYXR0YWNoRXZlbnRzKCk7XG4gICAgY29uc3QgbGF6eUVsZW1lbnRzID0gWy4uLnN3aXBlci5lbC5xdWVyeVNlbGVjdG9yQWxsKCdbbG9hZGluZz1cImxhenlcIl0nKV07XG4gICAgaWYgKHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICAgIGxhenlFbGVtZW50cy5wdXNoKC4uLnN3aXBlci5ob3N0RWwucXVlcnlTZWxlY3RvckFsbCgnW2xvYWRpbmc9XCJsYXp5XCJdJykpO1xuICAgIH1cbiAgICBsYXp5RWxlbWVudHMuZm9yRWFjaChpbWFnZUVsID0+IHtcbiAgICAgIGlmIChpbWFnZUVsLmNvbXBsZXRlKSB7XG4gICAgICAgIHByb2Nlc3NMYXp5UHJlbG9hZGVyKHN3aXBlciwgaW1hZ2VFbCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbWFnZUVsLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBlID0+IHtcbiAgICAgICAgICBwcm9jZXNzTGF6eVByZWxvYWRlcihzd2lwZXIsIGUudGFyZ2V0KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcHJlbG9hZChzd2lwZXIpO1xuXG4gICAgLy8gSW5pdCBGbGFnXG4gICAgc3dpcGVyLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICBwcmVsb2FkKHN3aXBlcik7XG5cbiAgICAvLyBFbWl0XG4gICAgc3dpcGVyLmVtaXQoJ2luaXQnKTtcbiAgICBzd2lwZXIuZW1pdCgnYWZ0ZXJJbml0Jyk7XG4gICAgcmV0dXJuIHN3aXBlcjtcbiAgfVxuICBkZXN0cm95KGRlbGV0ZUluc3RhbmNlLCBjbGVhblN0eWxlcykge1xuICAgIGlmIChkZWxldGVJbnN0YW5jZSA9PT0gdm9pZCAwKSB7XG4gICAgICBkZWxldGVJbnN0YW5jZSA9IHRydWU7XG4gICAgfVxuICAgIGlmIChjbGVhblN0eWxlcyA9PT0gdm9pZCAwKSB7XG4gICAgICBjbGVhblN0eWxlcyA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3Qge1xuICAgICAgcGFyYW1zLFxuICAgICAgZWwsXG4gICAgICB3cmFwcGVyRWwsXG4gICAgICBzbGlkZXNcbiAgICB9ID0gc3dpcGVyO1xuICAgIGlmICh0eXBlb2Ygc3dpcGVyLnBhcmFtcyA9PT0gJ3VuZGVmaW5lZCcgfHwgc3dpcGVyLmRlc3Ryb3llZCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KCdiZWZvcmVEZXN0cm95Jyk7XG5cbiAgICAvLyBJbml0IEZsYWdcbiAgICBzd2lwZXIuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcblxuICAgIC8vIERldGFjaCBldmVudHNcbiAgICBzd2lwZXIuZGV0YWNoRXZlbnRzKCk7XG5cbiAgICAvLyBEZXN0cm95IGxvb3BcbiAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICAgIH1cblxuICAgIC8vIENsZWFudXAgc3R5bGVzXG4gICAgaWYgKGNsZWFuU3R5bGVzKSB7XG4gICAgICBzd2lwZXIucmVtb3ZlQ2xhc3NlcygpO1xuICAgICAgZWwucmVtb3ZlQXR0cmlidXRlKCdzdHlsZScpO1xuICAgICAgd3JhcHBlckVsLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgIGlmIChzbGlkZXMgJiYgc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICBzbGlkZXMuZm9yRWFjaChzbGlkZUVsID0+IHtcbiAgICAgICAgICBzbGlkZUVsLmNsYXNzTGlzdC5yZW1vdmUocGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzLCBwYXJhbXMuc2xpZGVGdWxseVZpc2libGVDbGFzcywgcGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MsIHBhcmFtcy5zbGlkZU5leHRDbGFzcywgcGFyYW1zLnNsaWRlUHJldkNsYXNzKTtcbiAgICAgICAgICBzbGlkZUVsLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgICAgICBzbGlkZUVsLnJlbW92ZUF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KCdkZXN0cm95Jyk7XG5cbiAgICAvLyBEZXRhY2ggZW1pdHRlciBldmVudHNcbiAgICBPYmplY3Qua2V5cyhzd2lwZXIuZXZlbnRzTGlzdGVuZXJzKS5mb3JFYWNoKGV2ZW50TmFtZSA9PiB7XG4gICAgICBzd2lwZXIub2ZmKGV2ZW50TmFtZSk7XG4gICAgfSk7XG4gICAgaWYgKGRlbGV0ZUluc3RhbmNlICE9PSBmYWxzZSkge1xuICAgICAgc3dpcGVyLmVsLnN3aXBlciA9IG51bGw7XG4gICAgICBkZWxldGVQcm9wcyhzd2lwZXIpO1xuICAgIH1cbiAgICBzd2lwZXIuZGVzdHJveWVkID0gdHJ1ZTtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBzdGF0aWMgZXh0ZW5kRGVmYXVsdHMobmV3RGVmYXVsdHMpIHtcbiAgICBleHRlbmQoZXh0ZW5kZWREZWZhdWx0cywgbmV3RGVmYXVsdHMpO1xuICB9XG4gIHN0YXRpYyBnZXQgZXh0ZW5kZWREZWZhdWx0cygpIHtcbiAgICByZXR1cm4gZXh0ZW5kZWREZWZhdWx0cztcbiAgfVxuICBzdGF0aWMgZ2V0IGRlZmF1bHRzKCkge1xuICAgIHJldHVybiBkZWZhdWx0cztcbiAgfVxuICBzdGF0aWMgaW5zdGFsbE1vZHVsZShtb2QpIHtcbiAgICBpZiAoIVN3aXBlci5wcm90b3R5cGUuX19tb2R1bGVzX18pIFN3aXBlci5wcm90b3R5cGUuX19tb2R1bGVzX18gPSBbXTtcbiAgICBjb25zdCBtb2R1bGVzID0gU3dpcGVyLnByb3RvdHlwZS5fX21vZHVsZXNfXztcbiAgICBpZiAodHlwZW9mIG1vZCA9PT0gJ2Z1bmN0aW9uJyAmJiBtb2R1bGVzLmluZGV4T2YobW9kKSA8IDApIHtcbiAgICAgIG1vZHVsZXMucHVzaChtb2QpO1xuICAgIH1cbiAgfVxuICBzdGF0aWMgdXNlKG1vZHVsZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KG1vZHVsZSkpIHtcbiAgICAgIG1vZHVsZS5mb3JFYWNoKG0gPT4gU3dpcGVyLmluc3RhbGxNb2R1bGUobSkpO1xuICAgICAgcmV0dXJuIFN3aXBlcjtcbiAgICB9XG4gICAgU3dpcGVyLmluc3RhbGxNb2R1bGUobW9kdWxlKTtcbiAgICByZXR1cm4gU3dpcGVyO1xuICB9XG59XG5PYmplY3Qua2V5cyhwcm90b3R5cGVzKS5mb3JFYWNoKHByb3RvdHlwZUdyb3VwID0+IHtcbiAgT2JqZWN0LmtleXMocHJvdG90eXBlc1twcm90b3R5cGVHcm91cF0pLmZvckVhY2gocHJvdG9NZXRob2QgPT4ge1xuICAgIFN3aXBlci5wcm90b3R5cGVbcHJvdG9NZXRob2RdID0gcHJvdG90eXBlc1twcm90b3R5cGVHcm91cF1bcHJvdG9NZXRob2RdO1xuICB9KTtcbn0pO1xuU3dpcGVyLnVzZShbUmVzaXplLCBPYnNlcnZlcl0pO1xuXG5leHBvcnQgeyBTd2lwZXIgYXMgUywgZGVmYXVsdHMgYXMgZCB9O1xuIiwgImltcG9ydCB7IGUgYXMgZWxlbWVudENoaWxkcmVuLCBjIGFzIGNyZWF0ZUVsZW1lbnQgfSBmcm9tICcuL3V0aWxzLm1qcyc7XG5cbmZ1bmN0aW9uIGNyZWF0ZUVsZW1lbnRJZk5vdERlZmluZWQoc3dpcGVyLCBvcmlnaW5hbFBhcmFtcywgcGFyYW1zLCBjaGVja1Byb3BzKSB7XG4gIGlmIChzd2lwZXIucGFyYW1zLmNyZWF0ZUVsZW1lbnRzKSB7XG4gICAgT2JqZWN0LmtleXMoY2hlY2tQcm9wcykuZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKCFwYXJhbXNba2V5XSAmJiBwYXJhbXMuYXV0byA9PT0gdHJ1ZSkge1xuICAgICAgICBsZXQgZWxlbWVudCA9IGVsZW1lbnRDaGlsZHJlbihzd2lwZXIuZWwsIGAuJHtjaGVja1Byb3BzW2tleV19YClbMF07XG4gICAgICAgIGlmICghZWxlbWVudCkge1xuICAgICAgICAgIGVsZW1lbnQgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBjaGVja1Byb3BzW2tleV0pO1xuICAgICAgICAgIGVsZW1lbnQuY2xhc3NOYW1lID0gY2hlY2tQcm9wc1trZXldO1xuICAgICAgICAgIHN3aXBlci5lbC5hcHBlbmQoZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgICAgcGFyYW1zW2tleV0gPSBlbGVtZW50O1xuICAgICAgICBvcmlnaW5hbFBhcmFtc1trZXldID0gZWxlbWVudDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gcGFyYW1zO1xufVxuXG5leHBvcnQgeyBjcmVhdGVFbGVtZW50SWZOb3REZWZpbmVkIGFzIGMgfTtcbiIsICJpbXBvcnQgeyBjIGFzIGNyZWF0ZUVsZW1lbnRJZk5vdERlZmluZWQgfSBmcm9tICcuLi9zaGFyZWQvY3JlYXRlLWVsZW1lbnQtaWYtbm90LWRlZmluZWQubWpzJztcblxuZnVuY3Rpb24gTmF2aWdhdGlvbihfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIGV4dGVuZFBhcmFtcyxcbiAgICBvbixcbiAgICBlbWl0XG4gIH0gPSBfcmVmO1xuICBleHRlbmRQYXJhbXMoe1xuICAgIG5hdmlnYXRpb246IHtcbiAgICAgIG5leHRFbDogbnVsbCxcbiAgICAgIHByZXZFbDogbnVsbCxcbiAgICAgIGhpZGVPbkNsaWNrOiBmYWxzZSxcbiAgICAgIGRpc2FibGVkQ2xhc3M6ICdzd2lwZXItYnV0dG9uLWRpc2FibGVkJyxcbiAgICAgIGhpZGRlbkNsYXNzOiAnc3dpcGVyLWJ1dHRvbi1oaWRkZW4nLFxuICAgICAgbG9ja0NsYXNzOiAnc3dpcGVyLWJ1dHRvbi1sb2NrJyxcbiAgICAgIG5hdmlnYXRpb25EaXNhYmxlZENsYXNzOiAnc3dpcGVyLW5hdmlnYXRpb24tZGlzYWJsZWQnXG4gICAgfVxuICB9KTtcbiAgc3dpcGVyLm5hdmlnYXRpb24gPSB7XG4gICAgbmV4dEVsOiBudWxsLFxuICAgIHByZXZFbDogbnVsbFxuICB9O1xuICBjb25zdCBtYWtlRWxlbWVudHNBcnJheSA9IGVsID0+IChBcnJheS5pc0FycmF5KGVsKSA/IGVsIDogW2VsXSkuZmlsdGVyKGUgPT4gISFlKTtcbiAgZnVuY3Rpb24gZ2V0RWwoZWwpIHtcbiAgICBsZXQgcmVzO1xuICAgIGlmIChlbCAmJiB0eXBlb2YgZWwgPT09ICdzdHJpbmcnICYmIHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICAgIHJlcyA9IHN3aXBlci5lbC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICAgIGlmIChyZXMpIHJldHVybiByZXM7XG4gICAgfVxuICAgIGlmIChlbCkge1xuICAgICAgaWYgKHR5cGVvZiBlbCA9PT0gJ3N0cmluZycpIHJlcyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsKV07XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50cyAmJiB0eXBlb2YgZWwgPT09ICdzdHJpbmcnICYmIHJlcy5sZW5ndGggPiAxICYmIHN3aXBlci5lbC5xdWVyeVNlbGVjdG9yQWxsKGVsKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmVzID0gc3dpcGVyLmVsLnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZWwgJiYgIXJlcykgcmV0dXJuIGVsO1xuICAgIC8vIGlmIChBcnJheS5pc0FycmF5KHJlcykgJiYgcmVzLmxlbmd0aCA9PT0gMSkgcmVzID0gcmVzWzBdO1xuICAgIHJldHVybiByZXM7XG4gIH1cbiAgZnVuY3Rpb24gdG9nZ2xlRWwoZWwsIGRpc2FibGVkKSB7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uO1xuICAgIGVsID0gbWFrZUVsZW1lbnRzQXJyYXkoZWwpO1xuICAgIGVsLmZvckVhY2goc3ViRWwgPT4ge1xuICAgICAgaWYgKHN1YkVsKSB7XG4gICAgICAgIHN1YkVsLmNsYXNzTGlzdFtkaXNhYmxlZCA/ICdhZGQnIDogJ3JlbW92ZSddKC4uLnBhcmFtcy5kaXNhYmxlZENsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgICBpZiAoc3ViRWwudGFnTmFtZSA9PT0gJ0JVVFRPTicpIHN1YkVsLmRpc2FibGVkID0gZGlzYWJsZWQ7XG4gICAgICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cgJiYgc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgICAgICBzdWJFbC5jbGFzc0xpc3Rbc3dpcGVyLmlzTG9ja2VkID8gJ2FkZCcgOiAncmVtb3ZlJ10ocGFyYW1zLmxvY2tDbGFzcyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgLy8gVXBkYXRlIE5hdmlnYXRpb24gQnV0dG9uc1xuICAgIGNvbnN0IHtcbiAgICAgIG5leHRFbCxcbiAgICAgIHByZXZFbFxuICAgIH0gPSBzd2lwZXIubmF2aWdhdGlvbjtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICB0b2dnbGVFbChwcmV2RWwsIGZhbHNlKTtcbiAgICAgIHRvZ2dsZUVsKG5leHRFbCwgZmFsc2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0b2dnbGVFbChwcmV2RWwsIHN3aXBlci5pc0JlZ2lubmluZyAmJiAhc3dpcGVyLnBhcmFtcy5yZXdpbmQpO1xuICAgIHRvZ2dsZUVsKG5leHRFbCwgc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLnJld2luZCk7XG4gIH1cbiAgZnVuY3Rpb24gb25QcmV2Q2xpY2soZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmxvb3AgJiYgIXN3aXBlci5wYXJhbXMucmV3aW5kKSByZXR1cm47XG4gICAgc3dpcGVyLnNsaWRlUHJldigpO1xuICAgIGVtaXQoJ25hdmlnYXRpb25QcmV2Jyk7XG4gIH1cbiAgZnVuY3Rpb24gb25OZXh0Q2xpY2soZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBpZiAoc3dpcGVyLmlzRW5kICYmICFzd2lwZXIucGFyYW1zLmxvb3AgJiYgIXN3aXBlci5wYXJhbXMucmV3aW5kKSByZXR1cm47XG4gICAgc3dpcGVyLnNsaWRlTmV4dCgpO1xuICAgIGVtaXQoJ25hdmlnYXRpb25OZXh0Jyk7XG4gIH1cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb247XG4gICAgc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uID0gY3JlYXRlRWxlbWVudElmTm90RGVmaW5lZChzd2lwZXIsIHN3aXBlci5vcmlnaW5hbFBhcmFtcy5uYXZpZ2F0aW9uLCBzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24sIHtcbiAgICAgIG5leHRFbDogJ3N3aXBlci1idXR0b24tbmV4dCcsXG4gICAgICBwcmV2RWw6ICdzd2lwZXItYnV0dG9uLXByZXYnXG4gICAgfSk7XG4gICAgaWYgKCEocGFyYW1zLm5leHRFbCB8fCBwYXJhbXMucHJldkVsKSkgcmV0dXJuO1xuICAgIGxldCBuZXh0RWwgPSBnZXRFbChwYXJhbXMubmV4dEVsKTtcbiAgICBsZXQgcHJldkVsID0gZ2V0RWwocGFyYW1zLnByZXZFbCk7XG4gICAgT2JqZWN0LmFzc2lnbihzd2lwZXIubmF2aWdhdGlvbiwge1xuICAgICAgbmV4dEVsLFxuICAgICAgcHJldkVsXG4gICAgfSk7XG4gICAgbmV4dEVsID0gbWFrZUVsZW1lbnRzQXJyYXkobmV4dEVsKTtcbiAgICBwcmV2RWwgPSBtYWtlRWxlbWVudHNBcnJheShwcmV2RWwpO1xuICAgIGNvbnN0IGluaXRCdXR0b24gPSAoZWwsIGRpcikgPT4ge1xuICAgICAgaWYgKGVsKSB7XG4gICAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGlyID09PSAnbmV4dCcgPyBvbk5leHRDbGljayA6IG9uUHJldkNsaWNrKTtcbiAgICAgIH1cbiAgICAgIGlmICghc3dpcGVyLmVuYWJsZWQgJiYgZWwpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCguLi5wYXJhbXMubG9ja0NsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgfVxuICAgIH07XG4gICAgbmV4dEVsLmZvckVhY2goZWwgPT4gaW5pdEJ1dHRvbihlbCwgJ25leHQnKSk7XG4gICAgcHJldkVsLmZvckVhY2goZWwgPT4gaW5pdEJ1dHRvbihlbCwgJ3ByZXYnKSk7XG4gIH1cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBsZXQge1xuICAgICAgbmV4dEVsLFxuICAgICAgcHJldkVsXG4gICAgfSA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgIG5leHRFbCA9IG1ha2VFbGVtZW50c0FycmF5KG5leHRFbCk7XG4gICAgcHJldkVsID0gbWFrZUVsZW1lbnRzQXJyYXkocHJldkVsKTtcbiAgICBjb25zdCBkZXN0cm95QnV0dG9uID0gKGVsLCBkaXIpID0+IHtcbiAgICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZGlyID09PSAnbmV4dCcgPyBvbk5leHRDbGljayA6IG9uUHJldkNsaWNrKTtcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmRpc2FibGVkQ2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgfTtcbiAgICBuZXh0RWwuZm9yRWFjaChlbCA9PiBkZXN0cm95QnV0dG9uKGVsLCAnbmV4dCcpKTtcbiAgICBwcmV2RWwuZm9yRWFjaChlbCA9PiBkZXN0cm95QnV0dG9uKGVsLCAncHJldicpKTtcbiAgfVxuICBvbignaW5pdCcsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIGRpc2FibGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5pdCgpO1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuICB9KTtcbiAgb24oJ3RvRWRnZSBmcm9tRWRnZSBsb2NrIHVubG9jaycsICgpID0+IHtcbiAgICB1cGRhdGUoKTtcbiAgfSk7XG4gIG9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIGRlc3Ryb3koKTtcbiAgfSk7XG4gIG9uKCdlbmFibGUgZGlzYWJsZScsICgpID0+IHtcbiAgICBsZXQge1xuICAgICAgbmV4dEVsLFxuICAgICAgcHJldkVsXG4gICAgfSA9IHN3aXBlci5uYXZpZ2F0aW9uO1xuICAgIG5leHRFbCA9IG1ha2VFbGVtZW50c0FycmF5KG5leHRFbCk7XG4gICAgcHJldkVsID0gbWFrZUVsZW1lbnRzQXJyYXkocHJldkVsKTtcbiAgICBpZiAoc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgIHVwZGF0ZSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBbLi4ubmV4dEVsLCAuLi5wcmV2RWxdLmZpbHRlcihlbCA9PiAhIWVsKS5mb3JFYWNoKGVsID0+IGVsLmNsYXNzTGlzdC5hZGQoc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmxvY2tDbGFzcykpO1xuICB9KTtcbiAgb24oJ2NsaWNrJywgKF9zLCBlKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgIG5leHRFbCxcbiAgICAgIHByZXZFbFxuICAgIH0gPSBzd2lwZXIubmF2aWdhdGlvbjtcbiAgICBuZXh0RWwgPSBtYWtlRWxlbWVudHNBcnJheShuZXh0RWwpO1xuICAgIHByZXZFbCA9IG1ha2VFbGVtZW50c0FycmF5KHByZXZFbCk7XG4gICAgY29uc3QgdGFyZ2V0RWwgPSBlLnRhcmdldDtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGVPbkNsaWNrICYmICFwcmV2RWwuaW5jbHVkZXModGFyZ2V0RWwpICYmICFuZXh0RWwuaW5jbHVkZXModGFyZ2V0RWwpKSB7XG4gICAgICBpZiAoc3dpcGVyLnBhZ2luYXRpb24gJiYgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uICYmIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5jbGlja2FibGUgJiYgKHN3aXBlci5wYWdpbmF0aW9uLmVsID09PSB0YXJnZXRFbCB8fCBzd2lwZXIucGFnaW5hdGlvbi5lbC5jb250YWlucyh0YXJnZXRFbCkpKSByZXR1cm47XG4gICAgICBsZXQgaXNIaWRkZW47XG4gICAgICBpZiAobmV4dEVsLmxlbmd0aCkge1xuICAgICAgICBpc0hpZGRlbiA9IG5leHRFbFswXS5jbGFzc0xpc3QuY29udGFpbnMoc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgIH0gZWxzZSBpZiAocHJldkVsLmxlbmd0aCkge1xuICAgICAgICBpc0hpZGRlbiA9IHByZXZFbFswXS5jbGFzc0xpc3QuY29udGFpbnMoc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKTtcbiAgICAgIH1cbiAgICAgIGlmIChpc0hpZGRlbiA9PT0gdHJ1ZSkge1xuICAgICAgICBlbWl0KCduYXZpZ2F0aW9uU2hvdycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZW1pdCgnbmF2aWdhdGlvbkhpZGUnKTtcbiAgICAgIH1cbiAgICAgIFsuLi5uZXh0RWwsIC4uLnByZXZFbF0uZmlsdGVyKGVsID0+ICEhZWwpLmZvckVhY2goZWwgPT4gZWwuY2xhc3NMaXN0LnRvZ2dsZShzd2lwZXIucGFyYW1zLm5hdmlnYXRpb24uaGlkZGVuQ2xhc3MpKTtcbiAgICB9XG4gIH0pO1xuICBjb25zdCBlbmFibGUgPSAoKSA9PiB7XG4gICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLm5hdmlnYXRpb25EaXNhYmxlZENsYXNzLnNwbGl0KCcgJykpO1xuICAgIGluaXQoKTtcbiAgICB1cGRhdGUoKTtcbiAgfTtcbiAgY29uc3QgZGlzYWJsZSA9ICgpID0+IHtcbiAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LmFkZCguLi5zd2lwZXIucGFyYW1zLm5hdmlnYXRpb24ubmF2aWdhdGlvbkRpc2FibGVkQ2xhc3Muc3BsaXQoJyAnKSk7XG4gICAgZGVzdHJveSgpO1xuICB9O1xuICBPYmplY3QuYXNzaWduKHN3aXBlci5uYXZpZ2F0aW9uLCB7XG4gICAgZW5hYmxlLFxuICAgIGRpc2FibGUsXG4gICAgdXBkYXRlLFxuICAgIGluaXQsXG4gICAgZGVzdHJveVxuICB9KTtcbn1cblxuZXhwb3J0IHsgTmF2aWdhdGlvbiBhcyBkZWZhdWx0IH07XG4iLCAiZnVuY3Rpb24gY2xhc3Nlc1RvU2VsZWN0b3IoY2xhc3Nlcykge1xuICBpZiAoY2xhc3NlcyA9PT0gdm9pZCAwKSB7XG4gICAgY2xhc3NlcyA9ICcnO1xuICB9XG4gIHJldHVybiBgLiR7Y2xhc3Nlcy50cmltKCkucmVwbGFjZSgvKFtcXC46IStcXC9dKS9nLCAnXFxcXCQxJykgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAucmVwbGFjZSgvIC9nLCAnLicpfWA7XG59XG5cbmV4cG9ydCB7IGNsYXNzZXNUb1NlbGVjdG9yIGFzIGMgfTtcbiIsICJpbXBvcnQgeyBjIGFzIGNsYXNzZXNUb1NlbGVjdG9yIH0gZnJvbSAnLi4vc2hhcmVkL2NsYXNzZXMtdG8tc2VsZWN0b3IubWpzJztcbmltcG9ydCB7IGMgYXMgY3JlYXRlRWxlbWVudElmTm90RGVmaW5lZCB9IGZyb20gJy4uL3NoYXJlZC9jcmVhdGUtZWxlbWVudC1pZi1ub3QtZGVmaW5lZC5tanMnO1xuaW1wb3J0IHsgZiBhcyBlbGVtZW50T3V0ZXJTaXplLCBnIGFzIGVsZW1lbnRJbmRleCwgYSBhcyBlbGVtZW50UGFyZW50cyB9IGZyb20gJy4uL3NoYXJlZC91dGlscy5tanMnO1xuXG5mdW5jdGlvbiBQYWdpbmF0aW9uKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgZXh0ZW5kUGFyYW1zLFxuICAgIG9uLFxuICAgIGVtaXRcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IHBmeCA9ICdzd2lwZXItcGFnaW5hdGlvbic7XG4gIGV4dGVuZFBhcmFtcyh7XG4gICAgcGFnaW5hdGlvbjoge1xuICAgICAgZWw6IG51bGwsXG4gICAgICBidWxsZXRFbGVtZW50OiAnc3BhbicsXG4gICAgICBjbGlja2FibGU6IGZhbHNlLFxuICAgICAgaGlkZU9uQ2xpY2s6IGZhbHNlLFxuICAgICAgcmVuZGVyQnVsbGV0OiBudWxsLFxuICAgICAgcmVuZGVyUHJvZ3Jlc3NiYXI6IG51bGwsXG4gICAgICByZW5kZXJGcmFjdGlvbjogbnVsbCxcbiAgICAgIHJlbmRlckN1c3RvbTogbnVsbCxcbiAgICAgIHByb2dyZXNzYmFyT3Bwb3NpdGU6IGZhbHNlLFxuICAgICAgdHlwZTogJ2J1bGxldHMnLFxuICAgICAgLy8gJ2J1bGxldHMnIG9yICdwcm9ncmVzc2Jhcicgb3IgJ2ZyYWN0aW9uJyBvciAnY3VzdG9tJ1xuICAgICAgZHluYW1pY0J1bGxldHM6IGZhbHNlLFxuICAgICAgZHluYW1pY01haW5CdWxsZXRzOiAxLFxuICAgICAgZm9ybWF0RnJhY3Rpb25DdXJyZW50OiBudW1iZXIgPT4gbnVtYmVyLFxuICAgICAgZm9ybWF0RnJhY3Rpb25Ub3RhbDogbnVtYmVyID0+IG51bWJlcixcbiAgICAgIGJ1bGxldENsYXNzOiBgJHtwZnh9LWJ1bGxldGAsXG4gICAgICBidWxsZXRBY3RpdmVDbGFzczogYCR7cGZ4fS1idWxsZXQtYWN0aXZlYCxcbiAgICAgIG1vZGlmaWVyQ2xhc3M6IGAke3BmeH0tYCxcbiAgICAgIGN1cnJlbnRDbGFzczogYCR7cGZ4fS1jdXJyZW50YCxcbiAgICAgIHRvdGFsQ2xhc3M6IGAke3BmeH0tdG90YWxgLFxuICAgICAgaGlkZGVuQ2xhc3M6IGAke3BmeH0taGlkZGVuYCxcbiAgICAgIHByb2dyZXNzYmFyRmlsbENsYXNzOiBgJHtwZnh9LXByb2dyZXNzYmFyLWZpbGxgLFxuICAgICAgcHJvZ3Jlc3NiYXJPcHBvc2l0ZUNsYXNzOiBgJHtwZnh9LXByb2dyZXNzYmFyLW9wcG9zaXRlYCxcbiAgICAgIGNsaWNrYWJsZUNsYXNzOiBgJHtwZnh9LWNsaWNrYWJsZWAsXG4gICAgICBsb2NrQ2xhc3M6IGAke3BmeH0tbG9ja2AsXG4gICAgICBob3Jpem9udGFsQ2xhc3M6IGAke3BmeH0taG9yaXpvbnRhbGAsXG4gICAgICB2ZXJ0aWNhbENsYXNzOiBgJHtwZnh9LXZlcnRpY2FsYCxcbiAgICAgIHBhZ2luYXRpb25EaXNhYmxlZENsYXNzOiBgJHtwZnh9LWRpc2FibGVkYFxuICAgIH1cbiAgfSk7XG4gIHN3aXBlci5wYWdpbmF0aW9uID0ge1xuICAgIGVsOiBudWxsLFxuICAgIGJ1bGxldHM6IFtdXG4gIH07XG4gIGxldCBidWxsZXRTaXplO1xuICBsZXQgZHluYW1pY0J1bGxldEluZGV4ID0gMDtcbiAgY29uc3QgbWFrZUVsZW1lbnRzQXJyYXkgPSBlbCA9PiAoQXJyYXkuaXNBcnJheShlbCkgPyBlbCA6IFtlbF0pLmZpbHRlcihlID0+ICEhZSk7XG4gIGZ1bmN0aW9uIGlzUGFnaW5hdGlvbkRpc2FibGVkKCkge1xuICAgIHJldHVybiAhc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmVsIHx8ICFzd2lwZXIucGFnaW5hdGlvbi5lbCB8fCBBcnJheS5pc0FycmF5KHN3aXBlci5wYWdpbmF0aW9uLmVsKSAmJiBzd2lwZXIucGFnaW5hdGlvbi5lbC5sZW5ndGggPT09IDA7XG4gIH1cbiAgZnVuY3Rpb24gc2V0U2lkZUJ1bGxldHMoYnVsbGV0RWwsIHBvc2l0aW9uKSB7XG4gICAgY29uc3Qge1xuICAgICAgYnVsbGV0QWN0aXZlQ2xhc3NcbiAgICB9ID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgIGlmICghYnVsbGV0RWwpIHJldHVybjtcbiAgICBidWxsZXRFbCA9IGJ1bGxldEVsW2Ake3Bvc2l0aW9uID09PSAncHJldicgPyAncHJldmlvdXMnIDogJ25leHQnfUVsZW1lbnRTaWJsaW5nYF07XG4gICAgaWYgKGJ1bGxldEVsKSB7XG4gICAgICBidWxsZXRFbC5jbGFzc0xpc3QuYWRkKGAke2J1bGxldEFjdGl2ZUNsYXNzfS0ke3Bvc2l0aW9ufWApO1xuICAgICAgYnVsbGV0RWwgPSBidWxsZXRFbFtgJHtwb3NpdGlvbiA9PT0gJ3ByZXYnID8gJ3ByZXZpb3VzJyA6ICduZXh0J31FbGVtZW50U2libGluZ2BdO1xuICAgICAgaWYgKGJ1bGxldEVsKSB7XG4gICAgICAgIGJ1bGxldEVsLmNsYXNzTGlzdC5hZGQoYCR7YnVsbGV0QWN0aXZlQ2xhc3N9LSR7cG9zaXRpb259LSR7cG9zaXRpb259YCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIG9uQnVsbGV0Q2xpY2soZSkge1xuICAgIGNvbnN0IGJ1bGxldEVsID0gZS50YXJnZXQuY2xvc2VzdChjbGFzc2VzVG9TZWxlY3Rvcihzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uYnVsbGV0Q2xhc3MpKTtcbiAgICBpZiAoIWJ1bGxldEVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBjb25zdCBpbmRleCA9IGVsZW1lbnRJbmRleChidWxsZXRFbCkgKiBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgIGlmIChzd2lwZXIucmVhbEluZGV4ID09PSBpbmRleCkgcmV0dXJuO1xuICAgICAgc3dpcGVyLnNsaWRlVG9Mb29wKGluZGV4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oaW5kZXgpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiB1cGRhdGUoKSB7XG4gICAgLy8gUmVuZGVyIHx8IFVwZGF0ZSBQYWdpbmF0aW9uIGJ1bGxldHMvaXRlbXNcbiAgICBjb25zdCBydGwgPSBzd2lwZXIucnRsO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbjtcbiAgICBpZiAoaXNQYWdpbmF0aW9uRGlzYWJsZWQoKSkgcmV0dXJuO1xuICAgIGxldCBlbCA9IHN3aXBlci5wYWdpbmF0aW9uLmVsO1xuICAgIGVsID0gbWFrZUVsZW1lbnRzQXJyYXkoZWwpO1xuICAgIC8vIEN1cnJlbnQvVG90YWxcbiAgICBsZXQgY3VycmVudDtcbiAgICBsZXQgcHJldmlvdXNJbmRleDtcbiAgICBjb25zdCBzbGlkZXNMZW5ndGggPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggOiBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcbiAgICBjb25zdCB0b3RhbCA9IHN3aXBlci5wYXJhbXMubG9vcCA/IE1hdGguY2VpbChzbGlkZXNMZW5ndGggLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKSA6IHN3aXBlci5zbmFwR3JpZC5sZW5ndGg7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgcHJldmlvdXNJbmRleCA9IHN3aXBlci5wcmV2aW91c1JlYWxJbmRleCB8fCAwO1xuICAgICAgY3VycmVudCA9IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXAgPiAxID8gTWF0aC5mbG9vcihzd2lwZXIucmVhbEluZGV4IC8gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCkgOiBzd2lwZXIucmVhbEluZGV4O1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIHN3aXBlci5zbmFwSW5kZXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjdXJyZW50ID0gc3dpcGVyLnNuYXBJbmRleDtcbiAgICAgIHByZXZpb3VzSW5kZXggPSBzd2lwZXIucHJldmlvdXNTbmFwSW5kZXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByZXZpb3VzSW5kZXggPSBzd2lwZXIucHJldmlvdXNJbmRleCB8fCAwO1xuICAgICAgY3VycmVudCA9IHN3aXBlci5hY3RpdmVJbmRleCB8fCAwO1xuICAgIH1cbiAgICAvLyBUeXBlc1xuICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2J1bGxldHMnICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMgJiYgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBidWxsZXRzID0gc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cztcbiAgICAgIGxldCBmaXJzdEluZGV4O1xuICAgICAgbGV0IGxhc3RJbmRleDtcbiAgICAgIGxldCBtaWRJbmRleDtcbiAgICAgIGlmIChwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICAgYnVsbGV0U2l6ZSA9IGVsZW1lbnRPdXRlclNpemUoYnVsbGV0c1swXSwgc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ3dpZHRoJyA6ICdoZWlnaHQnLCB0cnVlKTtcbiAgICAgICAgZWwuZm9yRWFjaChzdWJFbCA9PiB7XG4gICAgICAgICAgc3ViRWwuc3R5bGVbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ3dpZHRoJyA6ICdoZWlnaHQnXSA9IGAke2J1bGxldFNpemUgKiAocGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyArIDQpfXB4YDtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzID4gMSAmJiBwcmV2aW91c0luZGV4ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBkeW5hbWljQnVsbGV0SW5kZXggKz0gY3VycmVudCAtIChwcmV2aW91c0luZGV4IHx8IDApO1xuICAgICAgICAgIGlmIChkeW5hbWljQnVsbGV0SW5kZXggPiBwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzIC0gMSkge1xuICAgICAgICAgICAgZHluYW1pY0J1bGxldEluZGV4ID0gcGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyAtIDE7XG4gICAgICAgICAgfSBlbHNlIGlmIChkeW5hbWljQnVsbGV0SW5kZXggPCAwKSB7XG4gICAgICAgICAgICBkeW5hbWljQnVsbGV0SW5kZXggPSAwO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmaXJzdEluZGV4ID0gTWF0aC5tYXgoY3VycmVudCAtIGR5bmFtaWNCdWxsZXRJbmRleCwgMCk7XG4gICAgICAgIGxhc3RJbmRleCA9IGZpcnN0SW5kZXggKyAoTWF0aC5taW4oYnVsbGV0cy5sZW5ndGgsIHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMpIC0gMSk7XG4gICAgICAgIG1pZEluZGV4ID0gKGxhc3RJbmRleCArIGZpcnN0SW5kZXgpIC8gMjtcbiAgICAgIH1cbiAgICAgIGJ1bGxldHMuZm9yRWFjaChidWxsZXRFbCA9PiB7XG4gICAgICAgIGNvbnN0IGNsYXNzZXNUb1JlbW92ZSA9IFsuLi5bJycsICctbmV4dCcsICctbmV4dC1uZXh0JywgJy1wcmV2JywgJy1wcmV2LXByZXYnLCAnLW1haW4nXS5tYXAoc3VmZml4ID0+IGAke3BhcmFtcy5idWxsZXRBY3RpdmVDbGFzc30ke3N1ZmZpeH1gKV0ubWFwKHMgPT4gdHlwZW9mIHMgPT09ICdzdHJpbmcnICYmIHMuaW5jbHVkZXMoJyAnKSA/IHMuc3BsaXQoJyAnKSA6IHMpLmZsYXQoKTtcbiAgICAgICAgYnVsbGV0RWwuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc2VzVG9SZW1vdmUpO1xuICAgICAgfSk7XG4gICAgICBpZiAoZWwubGVuZ3RoID4gMSkge1xuICAgICAgICBidWxsZXRzLmZvckVhY2goYnVsbGV0ID0+IHtcbiAgICAgICAgICBjb25zdCBidWxsZXRJbmRleCA9IGVsZW1lbnRJbmRleChidWxsZXQpO1xuICAgICAgICAgIGlmIChidWxsZXRJbmRleCA9PT0gY3VycmVudCkge1xuICAgICAgICAgICAgYnVsbGV0LmNsYXNzTGlzdC5hZGQoLi4ucGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc3dpcGVyLmlzRWxlbWVudCkge1xuICAgICAgICAgICAgYnVsbGV0LnNldEF0dHJpYnV0ZSgncGFydCcsICdidWxsZXQnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xuICAgICAgICAgICAgaWYgKGJ1bGxldEluZGV4ID49IGZpcnN0SW5kZXggJiYgYnVsbGV0SW5kZXggPD0gbGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgIGJ1bGxldC5jbGFzc0xpc3QuYWRkKC4uLmAke3BhcmFtcy5idWxsZXRBY3RpdmVDbGFzc30tbWFpbmAuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoYnVsbGV0SW5kZXggPT09IGZpcnN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgc2V0U2lkZUJ1bGxldHMoYnVsbGV0LCAncHJldicpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJ1bGxldEluZGV4ID09PSBsYXN0SW5kZXgpIHtcbiAgICAgICAgICAgICAgc2V0U2lkZUJ1bGxldHMoYnVsbGV0LCAnbmV4dCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBidWxsZXQgPSBidWxsZXRzW2N1cnJlbnRdO1xuICAgICAgICBpZiAoYnVsbGV0KSB7XG4gICAgICAgICAgYnVsbGV0LmNsYXNzTGlzdC5hZGQoLi4ucGFyYW1zLmJ1bGxldEFjdGl2ZUNsYXNzLnNwbGl0KCcgJykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgICAgICAgYnVsbGV0cy5mb3JFYWNoKChidWxsZXRFbCwgYnVsbGV0SW5kZXgpID0+IHtcbiAgICAgICAgICAgIGJ1bGxldEVsLnNldEF0dHJpYnV0ZSgncGFydCcsIGJ1bGxldEluZGV4ID09PSBjdXJyZW50ID8gJ2J1bGxldC1hY3RpdmUnIDogJ2J1bGxldCcpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICAgICBjb25zdCBmaXJzdERpc3BsYXllZEJ1bGxldCA9IGJ1bGxldHNbZmlyc3RJbmRleF07XG4gICAgICAgICAgY29uc3QgbGFzdERpc3BsYXllZEJ1bGxldCA9IGJ1bGxldHNbbGFzdEluZGV4XTtcbiAgICAgICAgICBmb3IgKGxldCBpID0gZmlyc3RJbmRleDsgaSA8PSBsYXN0SW5kZXg7IGkgKz0gMSkge1xuICAgICAgICAgICAgaWYgKGJ1bGxldHNbaV0pIHtcbiAgICAgICAgICAgICAgYnVsbGV0c1tpXS5jbGFzc0xpc3QuYWRkKC4uLmAke3BhcmFtcy5idWxsZXRBY3RpdmVDbGFzc30tbWFpbmAuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHNldFNpZGVCdWxsZXRzKGZpcnN0RGlzcGxheWVkQnVsbGV0LCAncHJldicpO1xuICAgICAgICAgIHNldFNpZGVCdWxsZXRzKGxhc3REaXNwbGF5ZWRCdWxsZXQsICduZXh0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICAgY29uc3QgZHluYW1pY0J1bGxldHNMZW5ndGggPSBNYXRoLm1pbihidWxsZXRzLmxlbmd0aCwgcGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyArIDQpO1xuICAgICAgICBjb25zdCBidWxsZXRzT2Zmc2V0ID0gKGJ1bGxldFNpemUgKiBkeW5hbWljQnVsbGV0c0xlbmd0aCAtIGJ1bGxldFNpemUpIC8gMiAtIG1pZEluZGV4ICogYnVsbGV0U2l6ZTtcbiAgICAgICAgY29uc3Qgb2Zmc2V0UHJvcCA9IHJ0bCA/ICdyaWdodCcgOiAnbGVmdCc7XG4gICAgICAgIGJ1bGxldHMuZm9yRWFjaChidWxsZXQgPT4ge1xuICAgICAgICAgIGJ1bGxldC5zdHlsZVtzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBvZmZzZXRQcm9wIDogJ3RvcCddID0gYCR7YnVsbGV0c09mZnNldH1weGA7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBlbC5mb3JFYWNoKChzdWJFbCwgc3ViRWxJbmRleCkgPT4ge1xuICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAnZnJhY3Rpb24nKSB7XG4gICAgICAgIHN1YkVsLnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3Nlc1RvU2VsZWN0b3IocGFyYW1zLmN1cnJlbnRDbGFzcykpLmZvckVhY2goZnJhY3Rpb25FbCA9PiB7XG4gICAgICAgICAgZnJhY3Rpb25FbC50ZXh0Q29udGVudCA9IHBhcmFtcy5mb3JtYXRGcmFjdGlvbkN1cnJlbnQoY3VycmVudCArIDEpO1xuICAgICAgICB9KTtcbiAgICAgICAgc3ViRWwucXVlcnlTZWxlY3RvckFsbChjbGFzc2VzVG9TZWxlY3RvcihwYXJhbXMudG90YWxDbGFzcykpLmZvckVhY2godG90YWxFbCA9PiB7XG4gICAgICAgICAgdG90YWxFbC50ZXh0Q29udGVudCA9IHBhcmFtcy5mb3JtYXRGcmFjdGlvblRvdGFsKHRvdGFsKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdwcm9ncmVzc2JhcicpIHtcbiAgICAgICAgbGV0IHByb2dyZXNzYmFyRGlyZWN0aW9uO1xuICAgICAgICBpZiAocGFyYW1zLnByb2dyZXNzYmFyT3Bwb3NpdGUpIHtcbiAgICAgICAgICBwcm9ncmVzc2JhckRpcmVjdGlvbiA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/ICd2ZXJ0aWNhbCcgOiAnaG9yaXpvbnRhbCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcHJvZ3Jlc3NiYXJEaXJlY3Rpb24gPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnaG9yaXpvbnRhbCcgOiAndmVydGljYWwnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHNjYWxlID0gKGN1cnJlbnQgKyAxKSAvIHRvdGFsO1xuICAgICAgICBsZXQgc2NhbGVYID0gMTtcbiAgICAgICAgbGV0IHNjYWxlWSA9IDE7XG4gICAgICAgIGlmIChwcm9ncmVzc2JhckRpcmVjdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgc2NhbGVYID0gc2NhbGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc2NhbGVZID0gc2NhbGU7XG4gICAgICAgIH1cbiAgICAgICAgc3ViRWwucXVlcnlTZWxlY3RvckFsbChjbGFzc2VzVG9TZWxlY3RvcihwYXJhbXMucHJvZ3Jlc3NiYXJGaWxsQ2xhc3MpKS5mb3JFYWNoKHByb2dyZXNzRWwgPT4ge1xuICAgICAgICAgIHByb2dyZXNzRWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKDAsMCwwKSBzY2FsZVgoJHtzY2FsZVh9KSBzY2FsZVkoJHtzY2FsZVl9KWA7XG4gICAgICAgICAgcHJvZ3Jlc3NFbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHtzd2lwZXIucGFyYW1zLnNwZWVkfW1zYDtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdjdXN0b20nICYmIHBhcmFtcy5yZW5kZXJDdXN0b20pIHtcbiAgICAgICAgc3ViRWwuaW5uZXJIVE1MID0gcGFyYW1zLnJlbmRlckN1c3RvbShzd2lwZXIsIGN1cnJlbnQgKyAxLCB0b3RhbCk7XG4gICAgICAgIGlmIChzdWJFbEluZGV4ID09PSAwKSBlbWl0KCdwYWdpbmF0aW9uUmVuZGVyJywgc3ViRWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHN1YkVsSW5kZXggPT09IDApIGVtaXQoJ3BhZ2luYXRpb25SZW5kZXInLCBzdWJFbCk7XG4gICAgICAgIGVtaXQoJ3BhZ2luYXRpb25VcGRhdGUnLCBzdWJFbCk7XG4gICAgICB9XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5lbmFibGVkKSB7XG4gICAgICAgIHN1YkVsLmNsYXNzTGlzdFtzd2lwZXIuaXNMb2NrZWQgPyAnYWRkJyA6ICdyZW1vdmUnXShwYXJhbXMubG9ja0NsYXNzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiByZW5kZXIoKSB7XG4gICAgLy8gUmVuZGVyIENvbnRhaW5lclxuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbjtcbiAgICBpZiAoaXNQYWdpbmF0aW9uRGlzYWJsZWQoKSkgcmV0dXJuO1xuICAgIGNvbnN0IHNsaWRlc0xlbmd0aCA9IHN3aXBlci52aXJ0dWFsICYmIHN3aXBlci5wYXJhbXMudmlydHVhbC5lbmFibGVkID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHN3aXBlci5ncmlkICYmIHN3aXBlci5wYXJhbXMuZ3JpZC5yb3dzID4gMSA/IHN3aXBlci5zbGlkZXMubGVuZ3RoIC8gTWF0aC5jZWlsKHN3aXBlci5wYXJhbXMuZ3JpZC5yb3dzKSA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICAgIGxldCBlbCA9IHN3aXBlci5wYWdpbmF0aW9uLmVsO1xuICAgIGVsID0gbWFrZUVsZW1lbnRzQXJyYXkoZWwpO1xuICAgIGxldCBwYWdpbmF0aW9uSFRNTCA9ICcnO1xuICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2J1bGxldHMnKSB7XG4gICAgICBsZXQgbnVtYmVyT2ZCdWxsZXRzID0gc3dpcGVyLnBhcmFtcy5sb29wID8gTWF0aC5jZWlsKHNsaWRlc0xlbmd0aCAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApIDogc3dpcGVyLnNuYXBHcmlkLmxlbmd0aDtcbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmZyZWVNb2RlICYmIHN3aXBlci5wYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCAmJiBudW1iZXJPZkJ1bGxldHMgPiBzbGlkZXNMZW5ndGgpIHtcbiAgICAgICAgbnVtYmVyT2ZCdWxsZXRzID0gc2xpZGVzTGVuZ3RoO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZkJ1bGxldHM7IGkgKz0gMSkge1xuICAgICAgICBpZiAocGFyYW1zLnJlbmRlckJ1bGxldCkge1xuICAgICAgICAgIHBhZ2luYXRpb25IVE1MICs9IHBhcmFtcy5yZW5kZXJCdWxsZXQuY2FsbChzd2lwZXIsIGksIHBhcmFtcy5idWxsZXRDbGFzcyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgICAgICAgcGFnaW5hdGlvbkhUTUwgKz0gYDwke3BhcmFtcy5idWxsZXRFbGVtZW50fSAke3N3aXBlci5pc0VsZW1lbnQgPyAncGFydD1cImJ1bGxldFwiJyA6ICcnfSBjbGFzcz1cIiR7cGFyYW1zLmJ1bGxldENsYXNzfVwiPjwvJHtwYXJhbXMuYnVsbGV0RWxlbWVudH0+YDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdmcmFjdGlvbicpIHtcbiAgICAgIGlmIChwYXJhbXMucmVuZGVyRnJhY3Rpb24pIHtcbiAgICAgICAgcGFnaW5hdGlvbkhUTUwgPSBwYXJhbXMucmVuZGVyRnJhY3Rpb24uY2FsbChzd2lwZXIsIHBhcmFtcy5jdXJyZW50Q2xhc3MsIHBhcmFtcy50b3RhbENsYXNzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhZ2luYXRpb25IVE1MID0gYDxzcGFuIGNsYXNzPVwiJHtwYXJhbXMuY3VycmVudENsYXNzfVwiPjwvc3Bhbj5gICsgJyAvICcgKyBgPHNwYW4gY2xhc3M9XCIke3BhcmFtcy50b3RhbENsYXNzfVwiPjwvc3Bhbj5gO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdwcm9ncmVzc2JhcicpIHtcbiAgICAgIGlmIChwYXJhbXMucmVuZGVyUHJvZ3Jlc3NiYXIpIHtcbiAgICAgICAgcGFnaW5hdGlvbkhUTUwgPSBwYXJhbXMucmVuZGVyUHJvZ3Jlc3NiYXIuY2FsbChzd2lwZXIsIHBhcmFtcy5wcm9ncmVzc2JhckZpbGxDbGFzcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IGA8c3BhbiBjbGFzcz1cIiR7cGFyYW1zLnByb2dyZXNzYmFyRmlsbENsYXNzfVwiPjwvc3Bhbj5gO1xuICAgICAgfVxuICAgIH1cbiAgICBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzID0gW107XG4gICAgZWwuZm9yRWFjaChzdWJFbCA9PiB7XG4gICAgICBpZiAocGFyYW1zLnR5cGUgIT09ICdjdXN0b20nKSB7XG4gICAgICAgIHN1YkVsLmlubmVySFRNTCA9IHBhZ2luYXRpb25IVE1MIHx8ICcnO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAnYnVsbGV0cycpIHtcbiAgICAgICAgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cy5wdXNoKC4uLnN1YkVsLnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3Nlc1RvU2VsZWN0b3IocGFyYW1zLmJ1bGxldENsYXNzKSkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChwYXJhbXMudHlwZSAhPT0gJ2N1c3RvbScpIHtcbiAgICAgIGVtaXQoJ3BhZ2luYXRpb25SZW5kZXInLCBlbFswXSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uID0gY3JlYXRlRWxlbWVudElmTm90RGVmaW5lZChzd2lwZXIsIHN3aXBlci5vcmlnaW5hbFBhcmFtcy5wYWdpbmF0aW9uLCBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24sIHtcbiAgICAgIGVsOiAnc3dpcGVyLXBhZ2luYXRpb24nXG4gICAgfSk7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uO1xuICAgIGlmICghcGFyYW1zLmVsKSByZXR1cm47XG4gICAgbGV0IGVsO1xuICAgIGlmICh0eXBlb2YgcGFyYW1zLmVsID09PSAnc3RyaW5nJyAmJiBzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgICBlbCA9IHN3aXBlci5lbC5xdWVyeVNlbGVjdG9yKHBhcmFtcy5lbCk7XG4gICAgfVxuICAgIGlmICghZWwgJiYgdHlwZW9mIHBhcmFtcy5lbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVsID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGFyYW1zLmVsKV07XG4gICAgfVxuICAgIGlmICghZWwpIHtcbiAgICAgIGVsID0gcGFyYW1zLmVsO1xuICAgIH1cbiAgICBpZiAoIWVsIHx8IGVsLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnVuaXF1ZU5hdkVsZW1lbnRzICYmIHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnICYmIEFycmF5LmlzQXJyYXkoZWwpICYmIGVsLmxlbmd0aCA+IDEpIHtcbiAgICAgIGVsID0gWy4uLnN3aXBlci5lbC5xdWVyeVNlbGVjdG9yQWxsKHBhcmFtcy5lbCldO1xuICAgICAgLy8gY2hlY2sgaWYgaXQgYmVsb25ncyB0byBhbm90aGVyIG5lc3RlZCBTd2lwZXJcbiAgICAgIGlmIChlbC5sZW5ndGggPiAxKSB7XG4gICAgICAgIGVsID0gZWwuZmlsdGVyKHN1YkVsID0+IHtcbiAgICAgICAgICBpZiAoZWxlbWVudFBhcmVudHMoc3ViRWwsICcuc3dpcGVyJylbMF0gIT09IHN3aXBlci5lbCkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KVswXTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZWwpICYmIGVsLmxlbmd0aCA9PT0gMSkgZWwgPSBlbFswXTtcbiAgICBPYmplY3QuYXNzaWduKHN3aXBlci5wYWdpbmF0aW9uLCB7XG4gICAgICBlbFxuICAgIH0pO1xuICAgIGVsID0gbWFrZUVsZW1lbnRzQXJyYXkoZWwpO1xuICAgIGVsLmZvckVhY2goc3ViRWwgPT4ge1xuICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAnYnVsbGV0cycgJiYgcGFyYW1zLmNsaWNrYWJsZSkge1xuICAgICAgICBzdWJFbC5jbGFzc0xpc3QuYWRkKC4uLihwYXJhbXMuY2xpY2thYmxlQ2xhc3MgfHwgJycpLnNwbGl0KCcgJykpO1xuICAgICAgfVxuICAgICAgc3ViRWwuY2xhc3NMaXN0LmFkZChwYXJhbXMubW9kaWZpZXJDbGFzcyArIHBhcmFtcy50eXBlKTtcbiAgICAgIHN1YkVsLmNsYXNzTGlzdC5hZGQoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gcGFyYW1zLmhvcml6b250YWxDbGFzcyA6IHBhcmFtcy52ZXJ0aWNhbENsYXNzKTtcbiAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2J1bGxldHMnICYmIHBhcmFtcy5keW5hbWljQnVsbGV0cykge1xuICAgICAgICBzdWJFbC5jbGFzc0xpc3QuYWRkKGAke3BhcmFtcy5tb2RpZmllckNsYXNzfSR7cGFyYW1zLnR5cGV9LWR5bmFtaWNgKTtcbiAgICAgICAgZHluYW1pY0J1bGxldEluZGV4ID0gMDtcbiAgICAgICAgaWYgKHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgPCAxKSB7XG4gICAgICAgICAgcGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyA9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ3Byb2dyZXNzYmFyJyAmJiBwYXJhbXMucHJvZ3Jlc3NiYXJPcHBvc2l0ZSkge1xuICAgICAgICBzdWJFbC5jbGFzc0xpc3QuYWRkKHBhcmFtcy5wcm9ncmVzc2Jhck9wcG9zaXRlQ2xhc3MpO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy5jbGlja2FibGUpIHtcbiAgICAgICAgc3ViRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkJ1bGxldENsaWNrKTtcbiAgICAgIH1cbiAgICAgIGlmICghc3dpcGVyLmVuYWJsZWQpIHtcbiAgICAgICAgc3ViRWwuY2xhc3NMaXN0LmFkZChwYXJhbXMubG9ja0NsYXNzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBmdW5jdGlvbiBkZXN0cm95KCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbjtcbiAgICBpZiAoaXNQYWdpbmF0aW9uRGlzYWJsZWQoKSkgcmV0dXJuO1xuICAgIGxldCBlbCA9IHN3aXBlci5wYWdpbmF0aW9uLmVsO1xuICAgIGlmIChlbCkge1xuICAgICAgZWwgPSBtYWtlRWxlbWVudHNBcnJheShlbCk7XG4gICAgICBlbC5mb3JFYWNoKHN1YkVsID0+IHtcbiAgICAgICAgc3ViRWwuY2xhc3NMaXN0LnJlbW92ZShwYXJhbXMuaGlkZGVuQ2xhc3MpO1xuICAgICAgICBzdWJFbC5jbGFzc0xpc3QucmVtb3ZlKHBhcmFtcy5tb2RpZmllckNsYXNzICsgcGFyYW1zLnR5cGUpO1xuICAgICAgICBzdWJFbC5jbGFzc0xpc3QucmVtb3ZlKHN3aXBlci5pc0hvcml6b250YWwoKSA/IHBhcmFtcy5ob3Jpem9udGFsQ2xhc3MgOiBwYXJhbXMudmVydGljYWxDbGFzcyk7XG4gICAgICAgIGlmIChwYXJhbXMuY2xpY2thYmxlKSB7XG4gICAgICAgICAgc3ViRWwuY2xhc3NMaXN0LnJlbW92ZSguLi4ocGFyYW1zLmNsaWNrYWJsZUNsYXNzIHx8ICcnKS5zcGxpdCgnICcpKTtcbiAgICAgICAgICBzdWJFbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIG9uQnVsbGV0Q2xpY2spO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMpIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMuZm9yRWFjaChzdWJFbCA9PiBzdWJFbC5jbGFzc0xpc3QucmVtb3ZlKC4uLnBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcy5zcGxpdCgnICcpKSk7XG4gIH1cbiAgb24oJ2NoYW5nZURpcmVjdGlvbicsICgpID0+IHtcbiAgICBpZiAoIXN3aXBlci5wYWdpbmF0aW9uIHx8ICFzd2lwZXIucGFnaW5hdGlvbi5lbCkgcmV0dXJuO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbjtcbiAgICBsZXQge1xuICAgICAgZWxcbiAgICB9ID0gc3dpcGVyLnBhZ2luYXRpb247XG4gICAgZWwgPSBtYWtlRWxlbWVudHNBcnJheShlbCk7XG4gICAgZWwuZm9yRWFjaChzdWJFbCA9PiB7XG4gICAgICBzdWJFbC5jbGFzc0xpc3QucmVtb3ZlKHBhcmFtcy5ob3Jpem9udGFsQ2xhc3MsIHBhcmFtcy52ZXJ0aWNhbENsYXNzKTtcbiAgICAgIHN1YkVsLmNsYXNzTGlzdC5hZGQoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gcGFyYW1zLmhvcml6b250YWxDbGFzcyA6IHBhcmFtcy52ZXJ0aWNhbENsYXNzKTtcbiAgICB9KTtcbiAgfSk7XG4gIG9uKCdpbml0JywgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uZW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgZGlzYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbml0KCk7XG4gICAgICByZW5kZXIoKTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cbiAgfSk7XG4gIG9uKCdhY3RpdmVJbmRleENoYW5nZScsICgpID0+IHtcbiAgICBpZiAodHlwZW9mIHN3aXBlci5zbmFwSW5kZXggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB1cGRhdGUoKTtcbiAgICB9XG4gIH0pO1xuICBvbignc25hcEluZGV4Q2hhbmdlJywgKCkgPT4ge1xuICAgIHVwZGF0ZSgpO1xuICB9KTtcbiAgb24oJ3NuYXBHcmlkTGVuZ3RoQ2hhbmdlJywgKCkgPT4ge1xuICAgIHJlbmRlcigpO1xuICAgIHVwZGF0ZSgpO1xuICB9KTtcbiAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgZGVzdHJveSgpO1xuICB9KTtcbiAgb24oJ2VuYWJsZSBkaXNhYmxlJywgKCkgPT4ge1xuICAgIGxldCB7XG4gICAgICBlbFxuICAgIH0gPSBzd2lwZXIucGFnaW5hdGlvbjtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsID0gbWFrZUVsZW1lbnRzQXJyYXkoZWwpO1xuICAgICAgZWwuZm9yRWFjaChzdWJFbCA9PiBzdWJFbC5jbGFzc0xpc3Rbc3dpcGVyLmVuYWJsZWQgPyAncmVtb3ZlJyA6ICdhZGQnXShzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24ubG9ja0NsYXNzKSk7XG4gICAgfVxuICB9KTtcbiAgb24oJ2xvY2sgdW5sb2NrJywgKCkgPT4ge1xuICAgIHVwZGF0ZSgpO1xuICB9KTtcbiAgb24oJ2NsaWNrJywgKF9zLCBlKSA9PiB7XG4gICAgY29uc3QgdGFyZ2V0RWwgPSBlLnRhcmdldDtcbiAgICBjb25zdCBlbCA9IG1ha2VFbGVtZW50c0FycmF5KHN3aXBlci5wYWdpbmF0aW9uLmVsKTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmVsICYmIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5oaWRlT25DbGljayAmJiBlbCAmJiBlbC5sZW5ndGggPiAwICYmICF0YXJnZXRFbC5jbGFzc0xpc3QuY29udGFpbnMoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmJ1bGxldENsYXNzKSkge1xuICAgICAgaWYgKHN3aXBlci5uYXZpZ2F0aW9uICYmIChzd2lwZXIubmF2aWdhdGlvbi5uZXh0RWwgJiYgdGFyZ2V0RWwgPT09IHN3aXBlci5uYXZpZ2F0aW9uLm5leHRFbCB8fCBzd2lwZXIubmF2aWdhdGlvbi5wcmV2RWwgJiYgdGFyZ2V0RWwgPT09IHN3aXBlci5uYXZpZ2F0aW9uLnByZXZFbCkpIHJldHVybjtcbiAgICAgIGNvbnN0IGlzSGlkZGVuID0gZWxbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5oaWRkZW5DbGFzcyk7XG4gICAgICBpZiAoaXNIaWRkZW4gPT09IHRydWUpIHtcbiAgICAgICAgZW1pdCgncGFnaW5hdGlvblNob3cnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVtaXQoJ3BhZ2luYXRpb25IaWRlJyk7XG4gICAgICB9XG4gICAgICBlbC5mb3JFYWNoKHN1YkVsID0+IHN1YkVsLmNsYXNzTGlzdC50b2dnbGUoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmhpZGRlbkNsYXNzKSk7XG4gICAgfVxuICB9KTtcbiAgY29uc3QgZW5hYmxlID0gKCkgPT4ge1xuICAgIHN3aXBlci5lbC5jbGFzc0xpc3QucmVtb3ZlKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5wYWdpbmF0aW9uRGlzYWJsZWRDbGFzcyk7XG4gICAgbGV0IHtcbiAgICAgIGVsXG4gICAgfSA9IHN3aXBlci5wYWdpbmF0aW9uO1xuICAgIGlmIChlbCkge1xuICAgICAgZWwgPSBtYWtlRWxlbWVudHNBcnJheShlbCk7XG4gICAgICBlbC5mb3JFYWNoKHN1YkVsID0+IHN1YkVsLmNsYXNzTGlzdC5yZW1vdmUoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLnBhZ2luYXRpb25EaXNhYmxlZENsYXNzKSk7XG4gICAgfVxuICAgIGluaXQoKTtcbiAgICByZW5kZXIoKTtcbiAgICB1cGRhdGUoKTtcbiAgfTtcbiAgY29uc3QgZGlzYWJsZSA9ICgpID0+IHtcbiAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LmFkZChzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24ucGFnaW5hdGlvbkRpc2FibGVkQ2xhc3MpO1xuICAgIGxldCB7XG4gICAgICBlbFxuICAgIH0gPSBzd2lwZXIucGFnaW5hdGlvbjtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsID0gbWFrZUVsZW1lbnRzQXJyYXkoZWwpO1xuICAgICAgZWwuZm9yRWFjaChzdWJFbCA9PiBzdWJFbC5jbGFzc0xpc3QuYWRkKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5wYWdpbmF0aW9uRGlzYWJsZWRDbGFzcykpO1xuICAgIH1cbiAgICBkZXN0cm95KCk7XG4gIH07XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLnBhZ2luYXRpb24sIHtcbiAgICBlbmFibGUsXG4gICAgZGlzYWJsZSxcbiAgICByZW5kZXIsXG4gICAgdXBkYXRlLFxuICAgIGluaXQsXG4gICAgZGVzdHJveVxuICB9KTtcbn1cblxuZXhwb3J0IHsgUGFnaW5hdGlvbiBhcyBkZWZhdWx0IH07XG4iLCAiaW1wb3J0IHsgZyBhcyBnZXREb2N1bWVudCB9IGZyb20gJy4uL3NoYXJlZC9zc3Itd2luZG93LmVzbS5tanMnO1xuaW1wb3J0IHsgaCBhcyBjbGFzc2VzVG9Ub2tlbnMsIGMgYXMgY3JlYXRlRWxlbWVudCwgbiBhcyBuZXh0VGljaywgYiBhcyBlbGVtZW50T2Zmc2V0IH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxzLm1qcyc7XG5pbXBvcnQgeyBjIGFzIGNyZWF0ZUVsZW1lbnRJZk5vdERlZmluZWQgfSBmcm9tICcuLi9zaGFyZWQvY3JlYXRlLWVsZW1lbnQtaWYtbm90LWRlZmluZWQubWpzJztcbmltcG9ydCB7IGMgYXMgY2xhc3Nlc1RvU2VsZWN0b3IgfSBmcm9tICcuLi9zaGFyZWQvY2xhc3Nlcy10by1zZWxlY3Rvci5tanMnO1xuXG5mdW5jdGlvbiBTY3JvbGxiYXIoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBleHRlbmRQYXJhbXMsXG4gICAgb24sXG4gICAgZW1pdFxuICB9ID0gX3JlZjtcbiAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICBsZXQgaXNUb3VjaGVkID0gZmFsc2U7XG4gIGxldCB0aW1lb3V0ID0gbnVsbDtcbiAgbGV0IGRyYWdUaW1lb3V0ID0gbnVsbDtcbiAgbGV0IGRyYWdTdGFydFBvcztcbiAgbGV0IGRyYWdTaXplO1xuICBsZXQgdHJhY2tTaXplO1xuICBsZXQgZGl2aWRlcjtcbiAgZXh0ZW5kUGFyYW1zKHtcbiAgICBzY3JvbGxiYXI6IHtcbiAgICAgIGVsOiBudWxsLFxuICAgICAgZHJhZ1NpemU6ICdhdXRvJyxcbiAgICAgIGhpZGU6IGZhbHNlLFxuICAgICAgZHJhZ2dhYmxlOiBmYWxzZSxcbiAgICAgIHNuYXBPblJlbGVhc2U6IHRydWUsXG4gICAgICBsb2NrQ2xhc3M6ICdzd2lwZXItc2Nyb2xsYmFyLWxvY2snLFxuICAgICAgZHJhZ0NsYXNzOiAnc3dpcGVyLXNjcm9sbGJhci1kcmFnJyxcbiAgICAgIHNjcm9sbGJhckRpc2FibGVkQ2xhc3M6ICdzd2lwZXItc2Nyb2xsYmFyLWRpc2FibGVkJyxcbiAgICAgIGhvcml6b250YWxDbGFzczogYHN3aXBlci1zY3JvbGxiYXItaG9yaXpvbnRhbGAsXG4gICAgICB2ZXJ0aWNhbENsYXNzOiBgc3dpcGVyLXNjcm9sbGJhci12ZXJ0aWNhbGBcbiAgICB9XG4gIH0pO1xuICBzd2lwZXIuc2Nyb2xsYmFyID0ge1xuICAgIGVsOiBudWxsLFxuICAgIGRyYWdFbDogbnVsbFxuICB9O1xuICBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgcmV0dXJuO1xuICAgIGNvbnN0IHtcbiAgICAgIHNjcm9sbGJhcixcbiAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsXG4gICAgfSA9IHN3aXBlcjtcbiAgICBjb25zdCB7XG4gICAgICBkcmFnRWwsXG4gICAgICBlbFxuICAgIH0gPSBzY3JvbGxiYXI7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XG4gICAgY29uc3QgcHJvZ3Jlc3MgPSBzd2lwZXIucGFyYW1zLmxvb3AgPyBzd2lwZXIucHJvZ3Jlc3NMb29wIDogc3dpcGVyLnByb2dyZXNzO1xuICAgIGxldCBuZXdTaXplID0gZHJhZ1NpemU7XG4gICAgbGV0IG5ld1BvcyA9ICh0cmFja1NpemUgLSBkcmFnU2l6ZSkgKiBwcm9ncmVzcztcbiAgICBpZiAocnRsKSB7XG4gICAgICBuZXdQb3MgPSAtbmV3UG9zO1xuICAgICAgaWYgKG5ld1BvcyA+IDApIHtcbiAgICAgICAgbmV3U2l6ZSA9IGRyYWdTaXplIC0gbmV3UG9zO1xuICAgICAgICBuZXdQb3MgPSAwO1xuICAgICAgfSBlbHNlIGlmICgtbmV3UG9zICsgZHJhZ1NpemUgPiB0cmFja1NpemUpIHtcbiAgICAgICAgbmV3U2l6ZSA9IHRyYWNrU2l6ZSArIG5ld1BvcztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG5ld1BvcyA8IDApIHtcbiAgICAgIG5ld1NpemUgPSBkcmFnU2l6ZSArIG5ld1BvcztcbiAgICAgIG5ld1BvcyA9IDA7XG4gICAgfSBlbHNlIGlmIChuZXdQb3MgKyBkcmFnU2l6ZSA+IHRyYWNrU2l6ZSkge1xuICAgICAgbmV3U2l6ZSA9IHRyYWNrU2l6ZSAtIG5ld1BvcztcbiAgICB9XG4gICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgZHJhZ0VsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke25ld1Bvc31weCwgMCwgMClgO1xuICAgICAgZHJhZ0VsLnN0eWxlLndpZHRoID0gYCR7bmV3U2l6ZX1weGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdFbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoMHB4LCAke25ld1Bvc31weCwgMClgO1xuICAgICAgZHJhZ0VsLnN0eWxlLmhlaWdodCA9IGAke25ld1NpemV9cHhgO1xuICAgIH1cbiAgICBpZiAocGFyYW1zLmhpZGUpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSAxO1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzQwMG1zJztcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKSB7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgcmV0dXJuO1xuICAgIHN3aXBlci5zY3JvbGxiYXIuZHJhZ0VsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGAke2R1cmF0aW9ufW1zYDtcbiAgfVxuICBmdW5jdGlvbiB1cGRhdGVTaXplKCkge1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwgfHwgIXN3aXBlci5zY3JvbGxiYXIuZWwpIHJldHVybjtcbiAgICBjb25zdCB7XG4gICAgICBzY3JvbGxiYXJcbiAgICB9ID0gc3dpcGVyO1xuICAgIGNvbnN0IHtcbiAgICAgIGRyYWdFbCxcbiAgICAgIGVsXG4gICAgfSA9IHNjcm9sbGJhcjtcbiAgICBkcmFnRWwuc3R5bGUud2lkdGggPSAnJztcbiAgICBkcmFnRWwuc3R5bGUuaGVpZ2h0ID0gJyc7XG4gICAgdHJhY2tTaXplID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gZWwub2Zmc2V0V2lkdGggOiBlbC5vZmZzZXRIZWlnaHQ7XG4gICAgZGl2aWRlciA9IHN3aXBlci5zaXplIC8gKHN3aXBlci52aXJ0dWFsU2l6ZSArIHN3aXBlci5wYXJhbXMuc2xpZGVzT2Zmc2V0QmVmb3JlIC0gKHN3aXBlci5wYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIuc25hcEdyaWRbMF0gOiAwKSk7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmRyYWdTaXplID09PSAnYXV0bycpIHtcbiAgICAgIGRyYWdTaXplID0gdHJhY2tTaXplICogZGl2aWRlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgZHJhZ1NpemUgPSBwYXJzZUludChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5kcmFnU2l6ZSwgMTApO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICBkcmFnRWwuc3R5bGUud2lkdGggPSBgJHtkcmFnU2l6ZX1weGA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdFbC5zdHlsZS5oZWlnaHQgPSBgJHtkcmFnU2l6ZX1weGA7XG4gICAgfVxuICAgIGlmIChkaXZpZGVyID49IDEpIHtcbiAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnJztcbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmhpZGUpIHtcbiAgICAgIGVsLnN0eWxlLm9wYWNpdHkgPSAwO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5lbmFibGVkKSB7XG4gICAgICBzY3JvbGxiYXIuZWwuY2xhc3NMaXN0W3N3aXBlci5pc0xvY2tlZCA/ICdhZGQnIDogJ3JlbW92ZSddKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmxvY2tDbGFzcyk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGdldFBvaW50ZXJQb3NpdGlvbihlKSB7XG4gICAgcmV0dXJuIHN3aXBlci5pc0hvcml6b250YWwoKSA/IGUuY2xpZW50WCA6IGUuY2xpZW50WTtcbiAgfVxuICBmdW5jdGlvbiBzZXREcmFnUG9zaXRpb24oZSkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNjcm9sbGJhcixcbiAgICAgIHJ0bFRyYW5zbGF0ZTogcnRsXG4gICAgfSA9IHN3aXBlcjtcbiAgICBjb25zdCB7XG4gICAgICBlbFxuICAgIH0gPSBzY3JvbGxiYXI7XG4gICAgbGV0IHBvc2l0aW9uUmF0aW87XG4gICAgcG9zaXRpb25SYXRpbyA9IChnZXRQb2ludGVyUG9zaXRpb24oZSkgLSBlbGVtZW50T2Zmc2V0KGVsKVtzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJ10gLSAoZHJhZ1N0YXJ0UG9zICE9PSBudWxsID8gZHJhZ1N0YXJ0UG9zIDogZHJhZ1NpemUgLyAyKSkgLyAodHJhY2tTaXplIC0gZHJhZ1NpemUpO1xuICAgIHBvc2l0aW9uUmF0aW8gPSBNYXRoLm1heChNYXRoLm1pbihwb3NpdGlvblJhdGlvLCAxKSwgMCk7XG4gICAgaWYgKHJ0bCkge1xuICAgICAgcG9zaXRpb25SYXRpbyA9IDEgLSBwb3NpdGlvblJhdGlvO1xuICAgIH1cbiAgICBjb25zdCBwb3NpdGlvbiA9IHN3aXBlci5taW5UcmFuc2xhdGUoKSArIChzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpICogcG9zaXRpb25SYXRpbztcbiAgICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MocG9zaXRpb24pO1xuICAgIHN3aXBlci5zZXRUcmFuc2xhdGUocG9zaXRpb24pO1xuICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gIH1cbiAgZnVuY3Rpb24gb25EcmFnU3RhcnQoZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyO1xuICAgIGNvbnN0IHtcbiAgICAgIHNjcm9sbGJhcixcbiAgICAgIHdyYXBwZXJFbFxuICAgIH0gPSBzd2lwZXI7XG4gICAgY29uc3Qge1xuICAgICAgZWwsXG4gICAgICBkcmFnRWxcbiAgICB9ID0gc2Nyb2xsYmFyO1xuICAgIGlzVG91Y2hlZCA9IHRydWU7XG4gICAgZHJhZ1N0YXJ0UG9zID0gZS50YXJnZXQgPT09IGRyYWdFbCA/IGdldFBvaW50ZXJQb3NpdGlvbihlKSAtIGUudGFyZ2V0LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpW3N3aXBlci5pc0hvcml6b250YWwoKSA/ICdsZWZ0JyA6ICd0b3AnXSA6IG51bGw7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgd3JhcHBlckVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcxMDBtcyc7XG4gICAgZHJhZ0VsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcxMDBtcyc7XG4gICAgc2V0RHJhZ1Bvc2l0aW9uKGUpO1xuICAgIGNsZWFyVGltZW91dChkcmFnVGltZW91dCk7XG4gICAgZWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzBtcyc7XG4gICAgaWYgKHBhcmFtcy5oaWRlKSB7XG4gICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZVsnc2Nyb2xsLXNuYXAtdHlwZSddID0gJ25vbmUnO1xuICAgIH1cbiAgICBlbWl0KCdzY3JvbGxiYXJEcmFnU3RhcnQnLCBlKTtcbiAgfVxuICBmdW5jdGlvbiBvbkRyYWdNb3ZlKGUpIHtcbiAgICBjb25zdCB7XG4gICAgICBzY3JvbGxiYXIsXG4gICAgICB3cmFwcGVyRWxcbiAgICB9ID0gc3dpcGVyO1xuICAgIGNvbnN0IHtcbiAgICAgIGVsLFxuICAgICAgZHJhZ0VsXG4gICAgfSA9IHNjcm9sbGJhcjtcbiAgICBpZiAoIWlzVG91Y2hlZCkgcmV0dXJuO1xuICAgIGlmIChlLnByZXZlbnREZWZhdWx0KSBlLnByZXZlbnREZWZhdWx0KCk7ZWxzZSBlLnJldHVyblZhbHVlID0gZmFsc2U7XG4gICAgc2V0RHJhZ1Bvc2l0aW9uKGUpO1xuICAgIHdyYXBwZXJFbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnMG1zJztcbiAgICBlbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnMG1zJztcbiAgICBkcmFnRWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzBtcyc7XG4gICAgZW1pdCgnc2Nyb2xsYmFyRHJhZ01vdmUnLCBlKTtcbiAgfVxuICBmdW5jdGlvbiBvbkRyYWdFbmQoZSkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyO1xuICAgIGNvbnN0IHtcbiAgICAgIHNjcm9sbGJhcixcbiAgICAgIHdyYXBwZXJFbFxuICAgIH0gPSBzd2lwZXI7XG4gICAgY29uc3Qge1xuICAgICAgZWxcbiAgICB9ID0gc2Nyb2xsYmFyO1xuICAgIGlmICghaXNUb3VjaGVkKSByZXR1cm47XG4gICAgaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZVsnc2Nyb2xsLXNuYXAtdHlwZSddID0gJyc7XG4gICAgICB3cmFwcGVyRWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJyc7XG4gICAgfVxuICAgIGlmIChwYXJhbXMuaGlkZSkge1xuICAgICAgY2xlYXJUaW1lb3V0KGRyYWdUaW1lb3V0KTtcbiAgICAgIGRyYWdUaW1lb3V0ID0gbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzQwMG1zJztcbiAgICAgIH0sIDEwMDApO1xuICAgIH1cbiAgICBlbWl0KCdzY3JvbGxiYXJEcmFnRW5kJywgZSk7XG4gICAgaWYgKHBhcmFtcy5zbmFwT25SZWxlYXNlKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUb0Nsb3Nlc3QoKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZXZlbnRzKG1ldGhvZCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNjcm9sbGJhcixcbiAgICAgIHBhcmFtc1xuICAgIH0gPSBzd2lwZXI7XG4gICAgY29uc3QgZWwgPSBzY3JvbGxiYXIuZWw7XG4gICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgIGNvbnN0IHRhcmdldCA9IGVsO1xuICAgIGNvbnN0IGFjdGl2ZUxpc3RlbmVyID0gcGFyYW1zLnBhc3NpdmVMaXN0ZW5lcnMgPyB7XG4gICAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICAgIGNhcHR1cmU6IGZhbHNlXG4gICAgfSA6IGZhbHNlO1xuICAgIGNvbnN0IHBhc3NpdmVMaXN0ZW5lciA9IHBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8ge1xuICAgICAgcGFzc2l2ZTogdHJ1ZSxcbiAgICAgIGNhcHR1cmU6IGZhbHNlXG4gICAgfSA6IGZhbHNlO1xuICAgIGlmICghdGFyZ2V0KSByZXR1cm47XG4gICAgY29uc3QgZXZlbnRNZXRob2QgPSBtZXRob2QgPT09ICdvbicgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG4gICAgdGFyZ2V0W2V2ZW50TWV0aG9kXSgncG9pbnRlcmRvd24nLCBvbkRyYWdTdGFydCwgYWN0aXZlTGlzdGVuZXIpO1xuICAgIGRvY3VtZW50W2V2ZW50TWV0aG9kXSgncG9pbnRlcm1vdmUnLCBvbkRyYWdNb3ZlLCBhY3RpdmVMaXN0ZW5lcik7XG4gICAgZG9jdW1lbnRbZXZlbnRNZXRob2RdKCdwb2ludGVydXAnLCBvbkRyYWdFbmQsIHBhc3NpdmVMaXN0ZW5lcik7XG4gIH1cbiAgZnVuY3Rpb24gZW5hYmxlRHJhZ2dhYmxlKCkge1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwgfHwgIXN3aXBlci5zY3JvbGxiYXIuZWwpIHJldHVybjtcbiAgICBldmVudHMoJ29uJyk7XG4gIH1cbiAgZnVuY3Rpb24gZGlzYWJsZURyYWdnYWJsZSgpIHtcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsIHx8ICFzd2lwZXIuc2Nyb2xsYmFyLmVsKSByZXR1cm47XG4gICAgZXZlbnRzKCdvZmYnKTtcbiAgfVxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNjcm9sbGJhcixcbiAgICAgIGVsOiBzd2lwZXJFbFxuICAgIH0gPSBzd2lwZXI7XG4gICAgc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIgPSBjcmVhdGVFbGVtZW50SWZOb3REZWZpbmVkKHN3aXBlciwgc3dpcGVyLm9yaWdpbmFsUGFyYW1zLnNjcm9sbGJhciwgc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIsIHtcbiAgICAgIGVsOiAnc3dpcGVyLXNjcm9sbGJhcidcbiAgICB9KTtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICBpZiAoIXBhcmFtcy5lbCkgcmV0dXJuO1xuICAgIGxldCBlbDtcbiAgICBpZiAodHlwZW9mIHBhcmFtcy5lbCA9PT0gJ3N0cmluZycgJiYgc3dpcGVyLmlzRWxlbWVudCkge1xuICAgICAgZWwgPSBzd2lwZXIuZWwucXVlcnlTZWxlY3RvcihwYXJhbXMuZWwpO1xuICAgIH1cbiAgICBpZiAoIWVsICYmIHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGFyYW1zLmVsKTtcbiAgICAgIGlmICghZWwubGVuZ3RoKSByZXR1cm47XG4gICAgfSBlbHNlIGlmICghZWwpIHtcbiAgICAgIGVsID0gcGFyYW1zLmVsO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50cyAmJiB0eXBlb2YgcGFyYW1zLmVsID09PSAnc3RyaW5nJyAmJiBlbC5sZW5ndGggPiAxICYmIHN3aXBlckVsLnF1ZXJ5U2VsZWN0b3JBbGwocGFyYW1zLmVsKS5sZW5ndGggPT09IDEpIHtcbiAgICAgIGVsID0gc3dpcGVyRWwucXVlcnlTZWxlY3RvcihwYXJhbXMuZWwpO1xuICAgIH1cbiAgICBpZiAoZWwubGVuZ3RoID4gMCkgZWwgPSBlbFswXTtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKHN3aXBlci5pc0hvcml6b250YWwoKSA/IHBhcmFtcy5ob3Jpem9udGFsQ2xhc3MgOiBwYXJhbXMudmVydGljYWxDbGFzcyk7XG4gICAgbGV0IGRyYWdFbDtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGRyYWdFbCA9IGVsLnF1ZXJ5U2VsZWN0b3IoY2xhc3Nlc1RvU2VsZWN0b3Ioc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ0NsYXNzKSk7XG4gICAgICBpZiAoIWRyYWdFbCkge1xuICAgICAgICBkcmFnRWwgPSBjcmVhdGVFbGVtZW50KCdkaXYnLCBzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5kcmFnQ2xhc3MpO1xuICAgICAgICBlbC5hcHBlbmQoZHJhZ0VsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbihzY3JvbGxiYXIsIHtcbiAgICAgIGVsLFxuICAgICAgZHJhZ0VsXG4gICAgfSk7XG4gICAgaWYgKHBhcmFtcy5kcmFnZ2FibGUpIHtcbiAgICAgIGVuYWJsZURyYWdnYWJsZSgpO1xuICAgIH1cbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsLmNsYXNzTGlzdFtzd2lwZXIuZW5hYmxlZCA/ICdyZW1vdmUnIDogJ2FkZCddKC4uLmNsYXNzZXNUb1Rva2Vucyhzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5sb2NrQ2xhc3MpKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICBjb25zdCBlbCA9IHN3aXBlci5zY3JvbGxiYXIuZWw7XG4gICAgaWYgKGVsKSB7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzZXNUb1Rva2Vucyhzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBwYXJhbXMuaG9yaXpvbnRhbENsYXNzIDogcGFyYW1zLnZlcnRpY2FsQ2xhc3MpKTtcbiAgICB9XG4gICAgZGlzYWJsZURyYWdnYWJsZSgpO1xuICB9XG4gIG9uKCdpbml0JywgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBkaXNhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluaXQoKTtcbiAgICAgIHVwZGF0ZVNpemUoKTtcbiAgICAgIHNldFRyYW5zbGF0ZSgpO1xuICAgIH1cbiAgfSk7XG4gIG9uKCd1cGRhdGUgcmVzaXplIG9ic2VydmVyVXBkYXRlIGxvY2sgdW5sb2NrJywgKCkgPT4ge1xuICAgIHVwZGF0ZVNpemUoKTtcbiAgfSk7XG4gIG9uKCdzZXRUcmFuc2xhdGUnLCAoKSA9PiB7XG4gICAgc2V0VHJhbnNsYXRlKCk7XG4gIH0pO1xuICBvbignc2V0VHJhbnNpdGlvbicsIChfcywgZHVyYXRpb24pID0+IHtcbiAgICBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgfSk7XG4gIG9uKCdlbmFibGUgZGlzYWJsZScsICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBlbFxuICAgIH0gPSBzd2lwZXIuc2Nyb2xsYmFyO1xuICAgIGlmIChlbCkge1xuICAgICAgZWwuY2xhc3NMaXN0W3N3aXBlci5lbmFibGVkID8gJ3JlbW92ZScgOiAnYWRkJ10oLi4uY2xhc3Nlc1RvVG9rZW5zKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmxvY2tDbGFzcykpO1xuICAgIH1cbiAgfSk7XG4gIG9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIGRlc3Ryb3koKTtcbiAgfSk7XG4gIGNvbnN0IGVuYWJsZSA9ICgpID0+IHtcbiAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc2VzVG9Ub2tlbnMoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuc2Nyb2xsYmFyRGlzYWJsZWRDbGFzcykpO1xuICAgIGlmIChzd2lwZXIuc2Nyb2xsYmFyLmVsKSB7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyLmVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3Nlc1RvVG9rZW5zKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLnNjcm9sbGJhckRpc2FibGVkQ2xhc3MpKTtcbiAgICB9XG4gICAgaW5pdCgpO1xuICAgIHVwZGF0ZVNpemUoKTtcbiAgICBzZXRUcmFuc2xhdGUoKTtcbiAgfTtcbiAgY29uc3QgZGlzYWJsZSA9ICgpID0+IHtcbiAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LmFkZCguLi5jbGFzc2VzVG9Ub2tlbnMoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuc2Nyb2xsYmFyRGlzYWJsZWRDbGFzcykpO1xuICAgIGlmIChzd2lwZXIuc2Nyb2xsYmFyLmVsKSB7XG4gICAgICBzd2lwZXIuc2Nyb2xsYmFyLmVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlc1RvVG9rZW5zKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLnNjcm9sbGJhckRpc2FibGVkQ2xhc3MpKTtcbiAgICB9XG4gICAgZGVzdHJveSgpO1xuICB9O1xuICBPYmplY3QuYXNzaWduKHN3aXBlci5zY3JvbGxiYXIsIHtcbiAgICBlbmFibGUsXG4gICAgZGlzYWJsZSxcbiAgICB1cGRhdGVTaXplLFxuICAgIHNldFRyYW5zbGF0ZSxcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfSk7XG59XG5cbmV4cG9ydCB7IFNjcm9sbGJhciBhcyBkZWZhdWx0IH07XG4iLCAiaW1wb3J0IHsgZyBhcyBnZXREb2N1bWVudCB9IGZyb20gJy4uL3NoYXJlZC9zc3Itd2luZG93LmVzbS5tanMnO1xuXG4vKiBlc2xpbnQgbm8tdW5kZXJzY29yZS1kYW5nbGU6IFwib2ZmXCIgKi9cbi8qIGVzbGludCBuby11c2UtYmVmb3JlLWRlZmluZTogXCJvZmZcIiAqL1xuZnVuY3Rpb24gQXV0b3BsYXkoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBleHRlbmRQYXJhbXMsXG4gICAgb24sXG4gICAgZW1pdCxcbiAgICBwYXJhbXNcbiAgfSA9IF9yZWY7XG4gIHN3aXBlci5hdXRvcGxheSA9IHtcbiAgICBydW5uaW5nOiBmYWxzZSxcbiAgICBwYXVzZWQ6IGZhbHNlLFxuICAgIHRpbWVMZWZ0OiAwXG4gIH07XG4gIGV4dGVuZFBhcmFtcyh7XG4gICAgYXV0b3BsYXk6IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgZGVsYXk6IDMwMDAsXG4gICAgICB3YWl0Rm9yVHJhbnNpdGlvbjogdHJ1ZSxcbiAgICAgIGRpc2FibGVPbkludGVyYWN0aW9uOiBmYWxzZSxcbiAgICAgIHN0b3BPbkxhc3RTbGlkZTogZmFsc2UsXG4gICAgICByZXZlcnNlRGlyZWN0aW9uOiBmYWxzZSxcbiAgICAgIHBhdXNlT25Nb3VzZUVudGVyOiBmYWxzZVxuICAgIH1cbiAgfSk7XG4gIGxldCB0aW1lb3V0O1xuICBsZXQgcmFmO1xuICBsZXQgYXV0b3BsYXlEZWxheVRvdGFsID0gcGFyYW1zICYmIHBhcmFtcy5hdXRvcGxheSA/IHBhcmFtcy5hdXRvcGxheS5kZWxheSA6IDMwMDA7XG4gIGxldCBhdXRvcGxheURlbGF5Q3VycmVudCA9IHBhcmFtcyAmJiBwYXJhbXMuYXV0b3BsYXkgPyBwYXJhbXMuYXV0b3BsYXkuZGVsYXkgOiAzMDAwO1xuICBsZXQgYXV0b3BsYXlUaW1lTGVmdDtcbiAgbGV0IGF1dG9wbGF5U3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gIGxldCB3YXNQYXVzZWQ7XG4gIGxldCBpc1RvdWNoZWQ7XG4gIGxldCBwYXVzZWRCeVRvdWNoO1xuICBsZXQgdG91Y2hTdGFydFRpbWVvdXQ7XG4gIGxldCBzbGlkZUNoYW5nZWQ7XG4gIGxldCBwYXVzZWRCeUludGVyYWN0aW9uO1xuICBsZXQgcGF1c2VkQnlQb2ludGVyRW50ZXI7XG4gIGZ1bmN0aW9uIG9uVHJhbnNpdGlvbkVuZChlKSB7XG4gICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLndyYXBwZXJFbCkgcmV0dXJuO1xuICAgIGlmIChlLnRhcmdldCAhPT0gc3dpcGVyLndyYXBwZXJFbCkgcmV0dXJuO1xuICAgIHN3aXBlci53cmFwcGVyRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIG9uVHJhbnNpdGlvbkVuZCk7XG4gICAgaWYgKHBhdXNlZEJ5UG9pbnRlckVudGVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlc3VtZSgpO1xuICB9XG4gIGNvbnN0IGNhbGNUaW1lTGVmdCA9ICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHJldHVybjtcbiAgICBpZiAoc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCkge1xuICAgICAgd2FzUGF1c2VkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKHdhc1BhdXNlZCkge1xuICAgICAgYXV0b3BsYXlEZWxheUN1cnJlbnQgPSBhdXRvcGxheVRpbWVMZWZ0O1xuICAgICAgd2FzUGF1c2VkID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHRpbWVMZWZ0ID0gc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCA/IGF1dG9wbGF5VGltZUxlZnQgOiBhdXRvcGxheVN0YXJ0VGltZSArIGF1dG9wbGF5RGVsYXlDdXJyZW50IC0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgc3dpcGVyLmF1dG9wbGF5LnRpbWVMZWZ0ID0gdGltZUxlZnQ7XG4gICAgZW1pdCgnYXV0b3BsYXlUaW1lTGVmdCcsIHRpbWVMZWZ0LCB0aW1lTGVmdCAvIGF1dG9wbGF5RGVsYXlUb3RhbCk7XG4gICAgcmFmID0gcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIGNhbGNUaW1lTGVmdCgpO1xuICAgIH0pO1xuICB9O1xuICBjb25zdCBnZXRTbGlkZURlbGF5ID0gKCkgPT4ge1xuICAgIGxldCBhY3RpdmVTbGlkZUVsO1xuICAgIGlmIChzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgICAgYWN0aXZlU2xpZGVFbCA9IHN3aXBlci5zbGlkZXMuZmlsdGVyKHNsaWRlRWwgPT4gc2xpZGVFbC5jbGFzc0xpc3QuY29udGFpbnMoJ3N3aXBlci1zbGlkZS1hY3RpdmUnKSlbMF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGFjdGl2ZVNsaWRlRWwgPSBzd2lwZXIuc2xpZGVzW3N3aXBlci5hY3RpdmVJbmRleF07XG4gICAgfVxuICAgIGlmICghYWN0aXZlU2xpZGVFbCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICBjb25zdCBjdXJyZW50U2xpZGVEZWxheSA9IHBhcnNlSW50KGFjdGl2ZVNsaWRlRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXN3aXBlci1hdXRvcGxheScpLCAxMCk7XG4gICAgcmV0dXJuIGN1cnJlbnRTbGlkZURlbGF5O1xuICB9O1xuICBjb25zdCBydW4gPSBkZWxheUZvcmNlID0+IHtcbiAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHJldHVybjtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpO1xuICAgIGNhbGNUaW1lTGVmdCgpO1xuICAgIGxldCBkZWxheSA9IHR5cGVvZiBkZWxheUZvcmNlID09PSAndW5kZWZpbmVkJyA/IHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGVsYXkgOiBkZWxheUZvcmNlO1xuICAgIGF1dG9wbGF5RGVsYXlUb3RhbCA9IHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGVsYXk7XG4gICAgYXV0b3BsYXlEZWxheUN1cnJlbnQgPSBzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRlbGF5O1xuICAgIGNvbnN0IGN1cnJlbnRTbGlkZURlbGF5ID0gZ2V0U2xpZGVEZWxheSgpO1xuICAgIGlmICghTnVtYmVyLmlzTmFOKGN1cnJlbnRTbGlkZURlbGF5KSAmJiBjdXJyZW50U2xpZGVEZWxheSA+IDAgJiYgdHlwZW9mIGRlbGF5Rm9yY2UgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBkZWxheSA9IGN1cnJlbnRTbGlkZURlbGF5O1xuICAgICAgYXV0b3BsYXlEZWxheVRvdGFsID0gY3VycmVudFNsaWRlRGVsYXk7XG4gICAgICBhdXRvcGxheURlbGF5Q3VycmVudCA9IGN1cnJlbnRTbGlkZURlbGF5O1xuICAgIH1cbiAgICBhdXRvcGxheVRpbWVMZWZ0ID0gZGVsYXk7XG4gICAgY29uc3Qgc3BlZWQgPSBzd2lwZXIucGFyYW1zLnNwZWVkO1xuICAgIGNvbnN0IHByb2NlZWQgPSAoKSA9PiB7XG4gICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5yZXZlcnNlRGlyZWN0aW9uKSB7XG4gICAgICAgIGlmICghc3dpcGVyLmlzQmVnaW5uaW5nIHx8IHN3aXBlci5wYXJhbXMubG9vcCB8fCBzd2lwZXIucGFyYW1zLnJld2luZCkge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVByZXYoc3BlZWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgIGVtaXQoJ2F1dG9wbGF5Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXN3aXBlci5wYXJhbXMuYXV0b3BsYXkuc3RvcE9uTGFzdFNsaWRlKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxLCBzcGVlZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgZW1pdCgnYXV0b3BsYXknKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFzd2lwZXIuaXNFbmQgfHwgc3dpcGVyLnBhcmFtcy5sb29wIHx8IHN3aXBlci5wYXJhbXMucmV3aW5kKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlTmV4dChzcGVlZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgZW1pdCgnYXV0b3BsYXknKTtcbiAgICAgICAgfSBlbHNlIGlmICghc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5zdG9wT25MYXN0U2xpZGUpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbygwLCBzcGVlZCwgdHJ1ZSwgdHJ1ZSk7XG4gICAgICAgICAgZW1pdCgnYXV0b3BsYXknKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuY3NzTW9kZSkge1xuICAgICAgICBhdXRvcGxheVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgIHJ1bigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGlmIChkZWxheSA+IDApIHtcbiAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgcHJvY2VlZCgpO1xuICAgICAgfSwgZGVsYXkpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBwcm9jZWVkKCk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICByZXR1cm4gZGVsYXk7XG4gIH07XG4gIGNvbnN0IHN0YXJ0ID0gKCkgPT4ge1xuICAgIGF1dG9wbGF5U3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcgPSB0cnVlO1xuICAgIHJ1bigpO1xuICAgIGVtaXQoJ2F1dG9wbGF5U3RhcnQnKTtcbiAgfTtcbiAgY29uc3Qgc3RvcCA9ICgpID0+IHtcbiAgICBzd2lwZXIuYXV0b3BsYXkucnVubmluZyA9IGZhbHNlO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICBjYW5jZWxBbmltYXRpb25GcmFtZShyYWYpO1xuICAgIGVtaXQoJ2F1dG9wbGF5U3RvcCcpO1xuICB9O1xuICBjb25zdCBwYXVzZSA9IChpbnRlcm5hbCwgcmVzZXQpID0+IHtcbiAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHJldHVybjtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgaWYgKCFpbnRlcm5hbCkge1xuICAgICAgcGF1c2VkQnlJbnRlcmFjdGlvbiA9IHRydWU7XG4gICAgfVxuICAgIGNvbnN0IHByb2NlZWQgPSAoKSA9PiB7XG4gICAgICBlbWl0KCdhdXRvcGxheVBhdXNlJyk7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheS53YWl0Rm9yVHJhbnNpdGlvbikge1xuICAgICAgICBzd2lwZXIud3JhcHBlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBvblRyYW5zaXRpb25FbmQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVzdW1lKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBzd2lwZXIuYXV0b3BsYXkucGF1c2VkID0gdHJ1ZTtcbiAgICBpZiAocmVzZXQpIHtcbiAgICAgIGlmIChzbGlkZUNoYW5nZWQpIHtcbiAgICAgICAgYXV0b3BsYXlUaW1lTGVmdCA9IHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGVsYXk7XG4gICAgICB9XG4gICAgICBzbGlkZUNoYW5nZWQgPSBmYWxzZTtcbiAgICAgIHByb2NlZWQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZGVsYXkgPSBhdXRvcGxheVRpbWVMZWZ0IHx8IHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGVsYXk7XG4gICAgYXV0b3BsYXlUaW1lTGVmdCA9IGRlbGF5IC0gKG5ldyBEYXRlKCkuZ2V0VGltZSgpIC0gYXV0b3BsYXlTdGFydFRpbWUpO1xuICAgIGlmIChzd2lwZXIuaXNFbmQgJiYgYXV0b3BsYXlUaW1lTGVmdCA8IDAgJiYgIXN3aXBlci5wYXJhbXMubG9vcCkgcmV0dXJuO1xuICAgIGlmIChhdXRvcGxheVRpbWVMZWZ0IDwgMCkgYXV0b3BsYXlUaW1lTGVmdCA9IDA7XG4gICAgcHJvY2VlZCgpO1xuICB9O1xuICBjb25zdCByZXN1bWUgPSAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5pc0VuZCAmJiBhdXRvcGxheVRpbWVMZWZ0IDwgMCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSByZXR1cm47XG4gICAgYXV0b3BsYXlTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBpZiAocGF1c2VkQnlJbnRlcmFjdGlvbikge1xuICAgICAgcGF1c2VkQnlJbnRlcmFjdGlvbiA9IGZhbHNlO1xuICAgICAgcnVuKGF1dG9wbGF5VGltZUxlZnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBydW4oKTtcbiAgICB9XG4gICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCA9IGZhbHNlO1xuICAgIGVtaXQoJ2F1dG9wbGF5UmVzdW1lJyk7XG4gIH07XG4gIGNvbnN0IG9uVmlzaWJpbGl0eUNoYW5nZSA9ICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHJldHVybjtcbiAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgaWYgKGRvY3VtZW50LnZpc2liaWxpdHlTdGF0ZSA9PT0gJ2hpZGRlbicpIHtcbiAgICAgIHBhdXNlZEJ5SW50ZXJhY3Rpb24gPSB0cnVlO1xuICAgICAgcGF1c2UodHJ1ZSk7XG4gICAgfVxuICAgIGlmIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09ICd2aXNpYmxlJykge1xuICAgICAgcmVzdW1lKCk7XG4gICAgfVxuICB9O1xuICBjb25zdCBvblBvaW50ZXJFbnRlciA9IGUgPT4ge1xuICAgIGlmIChlLnBvaW50ZXJUeXBlICE9PSAnbW91c2UnKSByZXR1cm47XG4gICAgcGF1c2VkQnlJbnRlcmFjdGlvbiA9IHRydWU7XG4gICAgcGF1c2VkQnlQb2ludGVyRW50ZXIgPSB0cnVlO1xuICAgIGlmIChzd2lwZXIuYW5pbWF0aW5nIHx8IHN3aXBlci5hdXRvcGxheS5wYXVzZWQpIHJldHVybjtcbiAgICBwYXVzZSh0cnVlKTtcbiAgfTtcbiAgY29uc3Qgb25Qb2ludGVyTGVhdmUgPSBlID0+IHtcbiAgICBpZiAoZS5wb2ludGVyVHlwZSAhPT0gJ21vdXNlJykgcmV0dXJuO1xuICAgIHBhdXNlZEJ5UG9pbnRlckVudGVyID0gZmFsc2U7XG4gICAgaWYgKHN3aXBlci5hdXRvcGxheS5wYXVzZWQpIHtcbiAgICAgIHJlc3VtZSgpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgYXR0YWNoTW91c2VFdmVudHMgPSAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b3BsYXkucGF1c2VPbk1vdXNlRW50ZXIpIHtcbiAgICAgIHN3aXBlci5lbC5hZGRFdmVudExpc3RlbmVyKCdwb2ludGVyZW50ZXInLCBvblBvaW50ZXJFbnRlcik7XG4gICAgICBzd2lwZXIuZWwuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmxlYXZlJywgb25Qb2ludGVyTGVhdmUpO1xuICAgIH1cbiAgfTtcbiAgY29uc3QgZGV0YWNoTW91c2VFdmVudHMgPSAoKSA9PiB7XG4gICAgc3dpcGVyLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJlbnRlcicsIG9uUG9pbnRlckVudGVyKTtcbiAgICBzd2lwZXIuZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigncG9pbnRlcmxlYXZlJywgb25Qb2ludGVyTGVhdmUpO1xuICB9O1xuICBjb25zdCBhdHRhY2hEb2N1bWVudEV2ZW50cyA9ICgpID0+IHtcbiAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIG9uVmlzaWJpbGl0eUNoYW5nZSk7XG4gIH07XG4gIGNvbnN0IGRldGFjaERvY3VtZW50RXZlbnRzID0gKCkgPT4ge1xuICAgIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd2aXNpYmlsaXR5Y2hhbmdlJywgb25WaXNpYmlsaXR5Q2hhbmdlKTtcbiAgfTtcbiAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZW5hYmxlZCkge1xuICAgICAgYXR0YWNoTW91c2VFdmVudHMoKTtcbiAgICAgIGF0dGFjaERvY3VtZW50RXZlbnRzKCk7XG4gICAgICBzdGFydCgpO1xuICAgIH1cbiAgfSk7XG4gIG9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIGRldGFjaE1vdXNlRXZlbnRzKCk7XG4gICAgZGV0YWNoRG9jdW1lbnRFdmVudHMoKTtcbiAgICBpZiAoc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHtcbiAgICAgIHN0b3AoKTtcbiAgICB9XG4gIH0pO1xuICBvbignX2ZyZWVNb2RlU3RhdGljUmVsZWFzZScsICgpID0+IHtcbiAgICBpZiAocGF1c2VkQnlUb3VjaCB8fCBwYXVzZWRCeUludGVyYWN0aW9uKSB7XG4gICAgICByZXN1bWUoKTtcbiAgICB9XG4gIH0pO1xuICBvbignX2ZyZWVNb2RlTm9Nb21lbnR1bVJlbGVhc2UnLCAoKSA9PiB7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRpc2FibGVPbkludGVyYWN0aW9uKSB7XG4gICAgICBwYXVzZSh0cnVlLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RvcCgpO1xuICAgIH1cbiAgfSk7XG4gIG9uKCdiZWZvcmVUcmFuc2l0aW9uU3RhcnQnLCAoX3MsIHNwZWVkLCBpbnRlcm5hbCkgPT4ge1xuICAgIGlmIChzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuYXV0b3BsYXkucnVubmluZykgcmV0dXJuO1xuICAgIGlmIChpbnRlcm5hbCB8fCAhc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgcGF1c2UodHJ1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0b3AoKTtcbiAgICB9XG4gIH0pO1xuICBvbignc2xpZGVyRmlyc3RNb3ZlJywgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuYXV0b3BsYXkucnVubmluZykgcmV0dXJuO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRpc2FibGVPbkludGVyYWN0aW9uKSB7XG4gICAgICBzdG9wKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlzVG91Y2hlZCA9IHRydWU7XG4gICAgcGF1c2VkQnlUb3VjaCA9IGZhbHNlO1xuICAgIHBhdXNlZEJ5SW50ZXJhY3Rpb24gPSBmYWxzZTtcbiAgICB0b3VjaFN0YXJ0VGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgcGF1c2VkQnlJbnRlcmFjdGlvbiA9IHRydWU7XG4gICAgICBwYXVzZWRCeVRvdWNoID0gdHJ1ZTtcbiAgICAgIHBhdXNlKHRydWUpO1xuICAgIH0sIDIwMCk7XG4gIH0pO1xuICBvbigndG91Y2hFbmQnLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nIHx8ICFpc1RvdWNoZWQpIHJldHVybjtcbiAgICBjbGVhclRpbWVvdXQodG91Y2hTdGFydFRpbWVvdXQpO1xuICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgcGF1c2VkQnlUb3VjaCA9IGZhbHNlO1xuICAgICAgaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChwYXVzZWRCeVRvdWNoICYmIHN3aXBlci5wYXJhbXMuY3NzTW9kZSkgcmVzdW1lKCk7XG4gICAgcGF1c2VkQnlUb3VjaCA9IGZhbHNlO1xuICAgIGlzVG91Y2hlZCA9IGZhbHNlO1xuICB9KTtcbiAgb24oJ3NsaWRlQ2hhbmdlJywgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuYXV0b3BsYXkucnVubmluZykgcmV0dXJuO1xuICAgIHNsaWRlQ2hhbmdlZCA9IHRydWU7XG4gIH0pO1xuICBPYmplY3QuYXNzaWduKHN3aXBlci5hdXRvcGxheSwge1xuICAgIHN0YXJ0LFxuICAgIHN0b3AsXG4gICAgcGF1c2UsXG4gICAgcmVzdW1lXG4gIH0pO1xufVxuXG5leHBvcnQgeyBBdXRvcGxheSBhcyBkZWZhdWx0IH07XG4iLCAiZnVuY3Rpb24gZWZmZWN0SW5pdChwYXJhbXMpIHtcbiAgY29uc3Qge1xuICAgIGVmZmVjdCxcbiAgICBzd2lwZXIsXG4gICAgb24sXG4gICAgc2V0VHJhbnNsYXRlLFxuICAgIHNldFRyYW5zaXRpb24sXG4gICAgb3ZlcndyaXRlUGFyYW1zLFxuICAgIHBlcnNwZWN0aXZlLFxuICAgIHJlY3JlYXRlU2hhZG93cyxcbiAgICBnZXRFZmZlY3RQYXJhbXNcbiAgfSA9IHBhcmFtcztcbiAgb24oJ2JlZm9yZUluaXQnLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSBlZmZlY3QpIHJldHVybjtcbiAgICBzd2lwZXIuY2xhc3NOYW1lcy5wdXNoKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc30ke2VmZmVjdH1gKTtcbiAgICBpZiAocGVyc3BlY3RpdmUgJiYgcGVyc3BlY3RpdmUoKSkge1xuICAgICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaChgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9M2RgKTtcbiAgICB9XG4gICAgY29uc3Qgb3ZlcndyaXRlUGFyYW1zUmVzdWx0ID0gb3ZlcndyaXRlUGFyYW1zID8gb3ZlcndyaXRlUGFyYW1zKCkgOiB7fTtcbiAgICBPYmplY3QuYXNzaWduKHN3aXBlci5wYXJhbXMsIG92ZXJ3cml0ZVBhcmFtc1Jlc3VsdCk7XG4gICAgT2JqZWN0LmFzc2lnbihzd2lwZXIub3JpZ2luYWxQYXJhbXMsIG92ZXJ3cml0ZVBhcmFtc1Jlc3VsdCk7XG4gIH0pO1xuICBvbignc2V0VHJhbnNsYXRlJywgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gZWZmZWN0KSByZXR1cm47XG4gICAgc2V0VHJhbnNsYXRlKCk7XG4gIH0pO1xuICBvbignc2V0VHJhbnNpdGlvbicsIChfcywgZHVyYXRpb24pID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09IGVmZmVjdCkgcmV0dXJuO1xuICAgIHNldFRyYW5zaXRpb24oZHVyYXRpb24pO1xuICB9KTtcbiAgb24oJ3RyYW5zaXRpb25FbmQnLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSBlZmZlY3QpIHJldHVybjtcbiAgICBpZiAocmVjcmVhdGVTaGFkb3dzKSB7XG4gICAgICBpZiAoIWdldEVmZmVjdFBhcmFtcyB8fCAhZ2V0RWZmZWN0UGFyYW1zKCkuc2xpZGVTaGFkb3dzKSByZXR1cm47XG4gICAgICAvLyByZW1vdmUgc2hhZG93c1xuICAgICAgc3dpcGVyLnNsaWRlcy5mb3JFYWNoKHNsaWRlRWwgPT4ge1xuICAgICAgICBzbGlkZUVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5zd2lwZXItc2xpZGUtc2hhZG93LXRvcCwgLnN3aXBlci1zbGlkZS1zaGFkb3ctcmlnaHQsIC5zd2lwZXItc2xpZGUtc2hhZG93LWJvdHRvbSwgLnN3aXBlci1zbGlkZS1zaGFkb3ctbGVmdCcpLmZvckVhY2goc2hhZG93RWwgPT4gc2hhZG93RWwucmVtb3ZlKCkpO1xuICAgICAgfSk7XG4gICAgICAvLyBjcmVhdGUgbmV3IG9uZVxuICAgICAgcmVjcmVhdGVTaGFkb3dzKCk7XG4gICAgfVxuICB9KTtcbiAgbGV0IHJlcXVpcmVVcGRhdGVPblZpcnR1YWw7XG4gIG9uKCd2aXJ0dWFsVXBkYXRlJywgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gZWZmZWN0KSByZXR1cm47XG4gICAgaWYgKCFzd2lwZXIuc2xpZGVzLmxlbmd0aCkge1xuICAgICAgcmVxdWlyZVVwZGF0ZU9uVmlydHVhbCA9IHRydWU7XG4gICAgfVxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBpZiAocmVxdWlyZVVwZGF0ZU9uVmlydHVhbCAmJiBzd2lwZXIuc2xpZGVzICYmIHN3aXBlci5zbGlkZXMubGVuZ3RoKSB7XG4gICAgICAgIHNldFRyYW5zbGF0ZSgpO1xuICAgICAgICByZXF1aXJlVXBkYXRlT25WaXJ0dWFsID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5leHBvcnQgeyBlZmZlY3RJbml0IGFzIGUgfTtcbiIsICJpbXBvcnQgeyBsIGFzIGdldFNsaWRlVHJhbnNmb3JtRWwgfSBmcm9tICcuL3V0aWxzLm1qcyc7XG5cbmZ1bmN0aW9uIGVmZmVjdFRhcmdldChlZmZlY3RQYXJhbXMsIHNsaWRlRWwpIHtcbiAgY29uc3QgdHJhbnNmb3JtRWwgPSBnZXRTbGlkZVRyYW5zZm9ybUVsKHNsaWRlRWwpO1xuICBpZiAodHJhbnNmb3JtRWwgIT09IHNsaWRlRWwpIHtcbiAgICB0cmFuc2Zvcm1FbC5zdHlsZS5iYWNrZmFjZVZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICB0cmFuc2Zvcm1FbC5zdHlsZVsnLXdlYmtpdC1iYWNrZmFjZS12aXNpYmlsaXR5J10gPSAnaGlkZGVuJztcbiAgfVxuICByZXR1cm4gdHJhbnNmb3JtRWw7XG59XG5cbmV4cG9ydCB7IGVmZmVjdFRhcmdldCBhcyBlIH07XG4iLCAiaW1wb3J0IHsgaiBhcyBlbGVtZW50VHJhbnNpdGlvbkVuZCB9IGZyb20gJy4vdXRpbHMubWpzJztcblxuZnVuY3Rpb24gZWZmZWN0VmlydHVhbFRyYW5zaXRpb25FbmQoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBkdXJhdGlvbixcbiAgICB0cmFuc2Zvcm1FbGVtZW50cyxcbiAgICBhbGxTbGlkZXNcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IHtcbiAgICBhY3RpdmVJbmRleFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBnZXRTbGlkZSA9IGVsID0+IHtcbiAgICBpZiAoIWVsLnBhcmVudEVsZW1lbnQpIHtcbiAgICAgIC8vIGFzc3VtZSBzaGFkb3cgcm9vdFxuICAgICAgY29uc3Qgc2xpZGUgPSBzd2lwZXIuc2xpZGVzLmZpbHRlcihzbGlkZUVsID0+IHNsaWRlRWwuc2hhZG93Um9vdCAmJiBzbGlkZUVsLnNoYWRvd1Jvb3QgPT09IGVsLnBhcmVudE5vZGUpWzBdO1xuICAgICAgcmV0dXJuIHNsaWRlO1xuICAgIH1cbiAgICByZXR1cm4gZWwucGFyZW50RWxlbWVudDtcbiAgfTtcbiAgaWYgKHN3aXBlci5wYXJhbXMudmlydHVhbFRyYW5zbGF0ZSAmJiBkdXJhdGlvbiAhPT0gMCkge1xuICAgIGxldCBldmVudFRyaWdnZXJlZCA9IGZhbHNlO1xuICAgIGxldCB0cmFuc2l0aW9uRW5kVGFyZ2V0O1xuICAgIGlmIChhbGxTbGlkZXMpIHtcbiAgICAgIHRyYW5zaXRpb25FbmRUYXJnZXQgPSB0cmFuc2Zvcm1FbGVtZW50cztcbiAgICB9IGVsc2Uge1xuICAgICAgdHJhbnNpdGlvbkVuZFRhcmdldCA9IHRyYW5zZm9ybUVsZW1lbnRzLmZpbHRlcih0cmFuc2Zvcm1FbCA9PiB7XG4gICAgICAgIGNvbnN0IGVsID0gdHJhbnNmb3JtRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzd2lwZXItc2xpZGUtdHJhbnNmb3JtJykgPyBnZXRTbGlkZSh0cmFuc2Zvcm1FbCkgOiB0cmFuc2Zvcm1FbDtcbiAgICAgICAgcmV0dXJuIHN3aXBlci5nZXRTbGlkZUluZGV4KGVsKSA9PT0gYWN0aXZlSW5kZXg7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdHJhbnNpdGlvbkVuZFRhcmdldC5mb3JFYWNoKGVsID0+IHtcbiAgICAgIGVsZW1lbnRUcmFuc2l0aW9uRW5kKGVsLCAoKSA9PiB7XG4gICAgICAgIGlmIChldmVudFRyaWdnZXJlZCkgcmV0dXJuO1xuICAgICAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgICAgIGV2ZW50VHJpZ2dlcmVkID0gdHJ1ZTtcbiAgICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgICBjb25zdCBldnQgPSBuZXcgd2luZG93LkN1c3RvbUV2ZW50KCd0cmFuc2l0aW9uZW5kJywge1xuICAgICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgICAgY2FuY2VsYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgeyBlZmZlY3RWaXJ0dWFsVHJhbnNpdGlvbkVuZCBhcyBlIH07XG4iLCAiaW1wb3J0IHsgZSBhcyBlZmZlY3RJbml0IH0gZnJvbSAnLi4vc2hhcmVkL2VmZmVjdC1pbml0Lm1qcyc7XG5pbXBvcnQgeyBlIGFzIGVmZmVjdFRhcmdldCB9IGZyb20gJy4uL3NoYXJlZC9lZmZlY3QtdGFyZ2V0Lm1qcyc7XG5pbXBvcnQgeyBlIGFzIGVmZmVjdFZpcnR1YWxUcmFuc2l0aW9uRW5kIH0gZnJvbSAnLi4vc2hhcmVkL2VmZmVjdC12aXJ0dWFsLXRyYW5zaXRpb24tZW5kLm1qcyc7XG5pbXBvcnQgeyBsIGFzIGdldFNsaWRlVHJhbnNmb3JtRWwgfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMubWpzJztcblxuZnVuY3Rpb24gRWZmZWN0RmFkZShfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIGV4dGVuZFBhcmFtcyxcbiAgICBvblxuICB9ID0gX3JlZjtcbiAgZXh0ZW5kUGFyYW1zKHtcbiAgICBmYWRlRWZmZWN0OiB7XG4gICAgICBjcm9zc0ZhZGU6IGZhbHNlXG4gICAgfVxuICB9KTtcbiAgY29uc3Qgc2V0VHJhbnNsYXRlID0gKCkgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIHNsaWRlc1xuICAgIH0gPSBzd2lwZXI7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5mYWRlRWZmZWN0O1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBjb25zdCBzbGlkZUVsID0gc3dpcGVyLnNsaWRlc1tpXTtcbiAgICAgIGNvbnN0IG9mZnNldCA9IHNsaWRlRWwuc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgICBsZXQgdHggPSAtb2Zmc2V0O1xuICAgICAgaWYgKCFzd2lwZXIucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUpIHR4IC09IHN3aXBlci50cmFuc2xhdGU7XG4gICAgICBsZXQgdHkgPSAwO1xuICAgICAgaWYgKCFzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgICAgdHkgPSB0eDtcbiAgICAgICAgdHggPSAwO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2xpZGVPcGFjaXR5ID0gc3dpcGVyLnBhcmFtcy5mYWRlRWZmZWN0LmNyb3NzRmFkZSA/IE1hdGgubWF4KDEgLSBNYXRoLmFicyhzbGlkZUVsLnByb2dyZXNzKSwgMCkgOiAxICsgTWF0aC5taW4oTWF0aC5tYXgoc2xpZGVFbC5wcm9ncmVzcywgLTEpLCAwKTtcbiAgICAgIGNvbnN0IHRhcmdldEVsID0gZWZmZWN0VGFyZ2V0KHBhcmFtcywgc2xpZGVFbCk7XG4gICAgICB0YXJnZXRFbC5zdHlsZS5vcGFjaXR5ID0gc2xpZGVPcGFjaXR5O1xuICAgICAgdGFyZ2V0RWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7dHh9cHgsICR7dHl9cHgsIDBweClgO1xuICAgIH1cbiAgfTtcbiAgY29uc3Qgc2V0VHJhbnNpdGlvbiA9IGR1cmF0aW9uID0+IHtcbiAgICBjb25zdCB0cmFuc2Zvcm1FbGVtZW50cyA9IHN3aXBlci5zbGlkZXMubWFwKHNsaWRlRWwgPT4gZ2V0U2xpZGVUcmFuc2Zvcm1FbChzbGlkZUVsKSk7XG4gICAgdHJhbnNmb3JtRWxlbWVudHMuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHtkdXJhdGlvbn1tc2A7XG4gICAgfSk7XG4gICAgZWZmZWN0VmlydHVhbFRyYW5zaXRpb25FbmQoe1xuICAgICAgc3dpcGVyLFxuICAgICAgZHVyYXRpb24sXG4gICAgICB0cmFuc2Zvcm1FbGVtZW50cyxcbiAgICAgIGFsbFNsaWRlczogdHJ1ZVxuICAgIH0pO1xuICB9O1xuICBlZmZlY3RJbml0KHtcbiAgICBlZmZlY3Q6ICdmYWRlJyxcbiAgICBzd2lwZXIsXG4gICAgb24sXG4gICAgc2V0VHJhbnNsYXRlLFxuICAgIHNldFRyYW5zaXRpb24sXG4gICAgb3ZlcndyaXRlUGFyYW1zOiAoKSA9PiAoe1xuICAgICAgc2xpZGVzUGVyVmlldzogMSxcbiAgICAgIHNsaWRlc1Blckdyb3VwOiAxLFxuICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgIHZpcnR1YWxUcmFuc2xhdGU6ICFzd2lwZXIucGFyYW1zLmNzc01vZGVcbiAgICB9KVxuICB9KTtcbn1cblxuZXhwb3J0IHsgRWZmZWN0RmFkZSBhcyBkZWZhdWx0IH07XG4iLCAiaW1wb3J0IFN3aXBlciBmcm9tICdzd2lwZXInO1xyXG5pbXBvcnQgeyBBdXRvcGxheSwgTmF2aWdhdGlvbiwgUGFnaW5hdGlvbiwgU2Nyb2xsYmFyLCBFZmZlY3RGYWRlIH0gZnJvbSAnc3dpcGVyL21vZHVsZXMnO1xyXG5cclxuY29uc3Qgc3dpcGVyID0gKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXN3aXBlcicpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgbGV0IG9wdGlvbnMgPSB7fTtcclxuXHJcbiAgICAgICAgaWYgKGl0ZW0uZGF0YXNldC5vcHRpb25zKSB7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBpdGVtLmRhdGFzZXQub3B0aW9ucy5yZXBsYWNlKC8nL2csICdcIicpLnJlcGxhY2UoLyxcXHMqKFtcXF19XSkvZywgJyQxJyk7XHJcbiAgICAgICAgICAgIG9wdGlvbnMgPSBKU09OLnBhcnNlKG9wdGlvbnMpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgb3B0aW9ucy5tb2R1bGVzID0gW0F1dG9wbGF5LCBOYXZpZ2F0aW9uLCBQYWdpbmF0aW9uLCBTY3JvbGxiYXIsIEVmZmVjdEZhZGVdO1xyXG5cclxuXHJcbiAgICAgICAgbmV3IFN3aXBlcihpdGVtLCBvcHRpb25zKTtcclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3dpcGVyOyIsICJpbXBvcnQgQWNjb3JkaW9uVGFicyBmcm9tICdhMTF5LWFjY29yZGlvbi10YWJzJztcclxuXHJcbmNvbnN0IHRhYnMgPSAoKSA9PiB7XHJcbiAgICAvLyBpbml0IHRhYnNcclxuICAgIG5ldyBBY2NvcmRpb25UYWJzKCk7XHJcblxyXG4gICAgLy8gdXBkYXRlIGhhc2hcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy10YWJzW2RhdGEtdXBkYXRlLWhhc2g9XCJ0cnVlXCJdIC5qcy10YWJzLXRyaWdnZXInKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5oaXN0b3J5LnB1c2hTdGF0ZSgnJywgJycsIGAjJHtpdGVtLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpfWApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKGdsb2JhbC5sb2NhdGlvbi5oYXNoKSB7XHJcbiAgICAgICAgY29uc3QgYWN0aXZlVGFic1RyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuanMtdGFic1tkYXRhLXVwZGF0ZS1oYXNoPVwidHJ1ZVwiXSAuanMtdGFicy10cmlnZ2VyW2hyZWY9XCIke2dsb2JhbC5sb2NhdGlvbi5oYXNofVwiXWApO1xyXG5cclxuICAgICAgICBpZiAoYWN0aXZlVGFic1RyaWdnZXIpIHtcclxuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhY3RpdmVUYWJzVHJpZ2dlci5jbGljaygpO1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlVGFic1RyaWdnZXIuYmx1cigpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZHJvcGRvd24gdG9nZ2xlXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtdGFicycpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgZHJvcGRvd24gPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5qcy10YWJzLWRyb3Bkb3duJyk7XHJcbiAgICBcclxuICAgICAgICBpZiAoZHJvcGRvd24pIHtcclxuICAgICAgICAgICAgZHJvcGRvd24uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnF1ZXJ5U2VsZWN0b3IoYC5qcy10YWJzLXRyaWdnZXJbaHJlZj1cIiR7ZS50YXJnZXQudmFsdWV9XCJdYCkuY2xpY2soKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yQWxsKCcuanMtdGFicy10cmlnZ2VyJykuZm9yRWFjaCh0YWIgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGRyb3Bkb3duLnZhbHVlID0gdGFiLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgdGFiczsiLCAiY29uc3Qgbm90ID0ge1xuICBpbmVydDogJzpub3QoW2luZXJ0XSk6bm90KFtpbmVydF0gKiknLFxuICBuZWdUYWJJbmRleDogJzpub3QoW3RhYmluZGV4Xj1cIi1cIl0pJyxcbiAgZGlzYWJsZWQ6ICc6bm90KDpkaXNhYmxlZCknLFxufTtcblxudmFyIGZvY3VzYWJsZVNlbGVjdG9ycyA9IFtcbiAgYGFbaHJlZl0ke25vdC5pbmVydH0ke25vdC5uZWdUYWJJbmRleH1gLFxuICBgYXJlYVtocmVmXSR7bm90LmluZXJ0fSR7bm90Lm5lZ1RhYkluZGV4fWAsXG4gIGBpbnB1dDpub3QoW3R5cGU9XCJoaWRkZW5cIl0pOm5vdChbdHlwZT1cInJhZGlvXCJdKSR7bm90LmluZXJ0fSR7bm90Lm5lZ1RhYkluZGV4fSR7bm90LmRpc2FibGVkfWAsXG4gIGBpbnB1dFt0eXBlPVwicmFkaW9cIl0ke25vdC5pbmVydH0ke25vdC5uZWdUYWJJbmRleH0ke25vdC5kaXNhYmxlZH1gLFxuICBgc2VsZWN0JHtub3QuaW5lcnR9JHtub3QubmVnVGFiSW5kZXh9JHtub3QuZGlzYWJsZWR9YCxcbiAgYHRleHRhcmVhJHtub3QuaW5lcnR9JHtub3QubmVnVGFiSW5kZXh9JHtub3QuZGlzYWJsZWR9YCxcbiAgYGJ1dHRvbiR7bm90LmluZXJ0fSR7bm90Lm5lZ1RhYkluZGV4fSR7bm90LmRpc2FibGVkfWAsXG4gIGBkZXRhaWxzJHtub3QuaW5lcnR9ID4gc3VtbWFyeTpmaXJzdC1vZi10eXBlJHtub3QubmVnVGFiSW5kZXh9YCxcbiAgLy8gRGlzY2FyZCB1bnRpbCBGaXJlZm94IHN1cHBvcnRzIGA6aGFzKClgXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL0tpdHR5R2lyYXVkZWwvZm9jdXNhYmxlLXNlbGVjdG9ycy9pc3N1ZXMvMTJcbiAgLy8gYGRldGFpbHM6bm90KDpoYXMoPiBzdW1tYXJ5KSkke25vdC5pbmVydH0ke25vdC5uZWdUYWJJbmRleH1gLFxuICBgaWZyYW1lJHtub3QuaW5lcnR9JHtub3QubmVnVGFiSW5kZXh9YCxcbiAgYGF1ZGlvW2NvbnRyb2xzXSR7bm90LmluZXJ0fSR7bm90Lm5lZ1RhYkluZGV4fWAsXG4gIGB2aWRlb1tjb250cm9sc10ke25vdC5pbmVydH0ke25vdC5uZWdUYWJJbmRleH1gLFxuICBgW2NvbnRlbnRlZGl0YWJsZV0ke25vdC5pbmVydH0ke25vdC5uZWdUYWJJbmRleH1gLFxuICBgW3RhYmluZGV4XSR7bm90LmluZXJ0fSR7bm90Lm5lZ1RhYkluZGV4fWAsXG5dO1xuXG4vKipcbiAqIFNldCB0aGUgZm9jdXMgdG8gdGhlIGZpcnN0IGVsZW1lbnQgd2l0aCBgYXV0b2ZvY3VzYCB3aXRoIHRoZSBlbGVtZW50IG9yIHRoZVxuICogZWxlbWVudCBpdHNlbGYuXG4gKi9cbmZ1bmN0aW9uIG1vdmVGb2N1c1RvRGlhbG9nKGVsKSB7XG4gICAgY29uc3QgZm9jdXNlZCA9IChlbC5xdWVyeVNlbGVjdG9yKCdbYXV0b2ZvY3VzXScpIHx8IGVsKTtcbiAgICBmb2N1c2VkLmZvY3VzKCk7XG59XG4vKipcbiAqIEdldCB0aGUgZmlyc3QgYW5kIGxhc3QgZm9jdXNhYmxlIGVsZW1lbnRzIGluIGEgZ2l2ZW4gdHJlZS5cbiAqL1xuZnVuY3Rpb24gZ2V0Rm9jdXNhYmxlRWRnZXMoZWwpIHtcbiAgICAvLyBDaGVjayBmb3IgYSBmb2N1c2FibGUgZWxlbWVudCB3aXRoaW4gdGhlIHN1YnRyZWUgb2YgYGVsYC5cbiAgICBjb25zdCBmaXJzdCA9IGZpbmRGb2N1c2FibGVFbGVtZW50KGVsLCB0cnVlKTtcbiAgICAvLyBPbmx5IGlmIHdlIGZpbmQgdGhlIGZpcnN0IGVsZW1lbnQgZG8gd2UgbmVlZCB0byBsb29rIGZvciB0aGUgbGFzdCBvbmUuIElmXG4gICAgLy8gdGhlcmVcdTIwMTlzIG5vIGxhc3QgZWxlbWVudCwgd2Ugc2V0IGBsYXN0YCBhcyBhIHJlZmVyZW5jZSB0byBgZmlyc3RgIHNvIHRoYXRcbiAgICAvLyB0aGUgcmV0dXJuZWQgYXJyYXkgaXMgYWx3YXlzIG9mIGxlbmd0aCAyLlxuICAgIGNvbnN0IGxhc3QgPSBmaXJzdCA/IGZpbmRGb2N1c2FibGVFbGVtZW50KGVsLCBmYWxzZSkgfHwgZmlyc3QgOiBudWxsO1xuICAgIHJldHVybiBbZmlyc3QsIGxhc3RdO1xufVxuLyoqXG4gKiBGaW5kIHRoZSBmaXJzdCBmb2N1c2FibGUgZWxlbWVudCBpbnNpZGUgdGhlIGdpdmVuIG5vZGUgaWYgYGZvcndhcmRgIGlzIHRydXRoeVxuICogb3IgdGhlIGxhc3QgZm9jdXNhYmxlIGVsZW1lbnQgb3RoZXJ3aXNlLlxuICovXG5mdW5jdGlvbiBmaW5kRm9jdXNhYmxlRWxlbWVudChub2RlLCBmb3J3YXJkKSB7XG4gICAgLy8gSWYgd2VcdTIwMTlyZSB3YWxraW5nIGZvcndhcmQsIGNoZWNrIGlmIHRoaXMgbm9kZSBpcyBmb2N1c2FibGUsIGFuZCByZXR1cm4gaXRcbiAgICAvLyBpbW1lZGlhdGVseSBpZiBpdCBpcy5cbiAgICBpZiAoZm9yd2FyZCAmJiBpc0ZvY3VzYWJsZShub2RlKSlcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgLy8gV2Ugc2hvdWxkIG9ubHkgc2VhcmNoIHRoZSBzdWJ0cmVlIG9mIHRoaXMgbm9kZSBpZiBpdCBjYW4gaGF2ZSBmb2N1c2FibGVcbiAgICAvLyBjaGlsZHJlbi5cbiAgICBpZiAoY2FuSGF2ZUZvY3VzYWJsZUNoaWxkcmVuKG5vZGUpKSB7XG4gICAgICAgIC8vIFN0YXJ0IHdhbGtpbmcgdGhlIERPTSB0cmVlLCBsb29raW5nIGZvciBmb2N1c2FibGUgZWxlbWVudHMuXG4gICAgICAgIC8vIENhc2UgMTogSWYgdGhpcyBub2RlIGhhcyBhIHNoYWRvdyByb290LCBzZWFyY2ggaXQgcmVjdXJzaXZlbHkuXG4gICAgICAgIGlmIChub2RlLnNoYWRvd1Jvb3QpIHtcbiAgICAgICAgICAgIC8vIERlc2NlbmQgaW50byB0aGlzIHN1YnRyZWUuXG4gICAgICAgICAgICBsZXQgbmV4dCA9IGdldE5leHRDaGlsZEVsKG5vZGUuc2hhZG93Um9vdCwgZm9yd2FyZCk7XG4gICAgICAgICAgICAvLyBUcmF2ZXJzZSBzaWJsaW5ncywgc2VhcmNoaW5nIHRoZSBzdWJ0cmVlIG9mIGVhY2ggb25lXG4gICAgICAgICAgICAvLyBmb3IgZm9jdXNhYmxlIGVsZW1lbnRzLlxuICAgICAgICAgICAgd2hpbGUgKG5leHQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb2N1c2FibGVFbCA9IGZpbmRGb2N1c2FibGVFbGVtZW50KG5leHQsIGZvcndhcmQpO1xuICAgICAgICAgICAgICAgIGlmIChmb2N1c2FibGVFbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvY3VzYWJsZUVsO1xuICAgICAgICAgICAgICAgIG5leHQgPSBnZXROZXh0U2libGluZ0VsKG5leHQsIGZvcndhcmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIENhc2UgMjogSWYgdGhpcyBub2RlIGlzIGEgc2xvdCBmb3IgYSBDdXN0b20gRWxlbWVudCwgc2VhcmNoIGl0cyBhc3NpZ25lZFxuICAgICAgICAvLyBub2RlcyByZWN1cnNpdmVseS5cbiAgICAgICAgZWxzZSBpZiAobm9kZS5sb2NhbE5hbWUgPT09ICdzbG90Jykge1xuICAgICAgICAgICAgY29uc3QgYXNzaWduZWRFbGVtZW50cyA9IG5vZGUuYXNzaWduZWRFbGVtZW50cyh7XG4gICAgICAgICAgICAgICAgZmxhdHRlbjogdHJ1ZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKCFmb3J3YXJkKVxuICAgICAgICAgICAgICAgIGFzc2lnbmVkRWxlbWVudHMucmV2ZXJzZSgpO1xuICAgICAgICAgICAgZm9yIChjb25zdCBhc3NpZ25lZEVsZW1lbnQgb2YgYXNzaWduZWRFbGVtZW50cykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZvY3VzYWJsZUVsID0gZmluZEZvY3VzYWJsZUVsZW1lbnQoYXNzaWduZWRFbGVtZW50LCBmb3J3YXJkKTtcbiAgICAgICAgICAgICAgICBpZiAoZm9jdXNhYmxlRWwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb2N1c2FibGVFbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBDYXNlIDM6IHRoaXMgaXMgYSByZWd1bGFyIExpZ2h0IERPTSBub2RlLiBTZWFyY2ggaXRzIHN1YnRyZWUuXG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgLy8gRGVzY2VuZCBpbnRvIHRoaXMgc3VidHJlZS5cbiAgICAgICAgICAgIGxldCBuZXh0ID0gZ2V0TmV4dENoaWxkRWwobm9kZSwgZm9yd2FyZCk7XG4gICAgICAgICAgICAvLyBUcmF2ZXJzZSBzaWJsaW5ncywgc2VhcmNoaW5nIHRoZSBzdWJ0cmVlIG9mIGVhY2ggb25lXG4gICAgICAgICAgICAvLyBmb3IgZm9jdXNhYmxlIGVsZW1lbnRzLlxuICAgICAgICAgICAgd2hpbGUgKG5leHQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb2N1c2FibGVFbCA9IGZpbmRGb2N1c2FibGVFbGVtZW50KG5leHQsIGZvcndhcmQpO1xuICAgICAgICAgICAgICAgIGlmIChmb2N1c2FibGVFbClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZvY3VzYWJsZUVsO1xuICAgICAgICAgICAgICAgIG5leHQgPSBnZXROZXh0U2libGluZ0VsKG5leHQsIGZvcndhcmQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIC8vIElmIHdlXHUyMDE5cmUgd2Fsa2luZyBiYWNrd2FyZCwgd2Ugd2FudCB0byBjaGVjayB0aGUgbm9kZVx1MjAxOXMgZW50aXJlIHN1YnRyZWVcbiAgICAvLyBiZWZvcmUgY2hlY2tpbmcgdGhlIG5vZGUgaXRzZWxmLiBJZiB0aGlzIG5vZGUgaXMgZm9jdXNhYmxlLCByZXR1cm4gaXQuXG4gICAgaWYgKCFmb3J3YXJkICYmIGlzRm9jdXNhYmxlKG5vZGUpKVxuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIGdldE5leHRDaGlsZEVsKG5vZGUsIGZvcndhcmQpIHtcbiAgICByZXR1cm4gZm9yd2FyZCA/IG5vZGUuZmlyc3RFbGVtZW50Q2hpbGQgOiBub2RlLmxhc3RFbGVtZW50Q2hpbGQ7XG59XG5mdW5jdGlvbiBnZXROZXh0U2libGluZ0VsKGVsLCBmb3J3YXJkKSB7XG4gICAgcmV0dXJuIGZvcndhcmQgPyBlbC5uZXh0RWxlbWVudFNpYmxpbmcgOiBlbC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xufVxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYW4gZWxlbWVudCBpcyBoaWRkZW4gZnJvbSB0aGUgdXNlci5cbiAqL1xuY29uc3QgaXNIaWRkZW4gPSAoZWwpID0+IHtcbiAgICAvLyBCcm93c2VycyBoaWRlIGFsbCBub24tPHN1bW1hcnk+IGRlc2NlbmRhbnRzIG9mIGNsb3NlZCA8ZGV0YWlscz4gZWxlbWVudHNcbiAgICAvLyBmcm9tIHVzZXIgaW50ZXJhY3Rpb24sIGJ1dCB0aG9zZSBub24tPHN1bW1hcnk+IGVsZW1lbnRzIG1heSBzdGlsbCBtYXRjaCBvdXJcbiAgICAvLyBmb2N1c2FibGUtc2VsZWN0b3JzIGFuZCBtYXkgc3RpbGwgaGF2ZSBkaW1lbnNpb25zLCBzbyB3ZSBuZWVkIGEgc3BlY2lhbFxuICAgIC8vIGNhc2UgdG8gaWdub3JlIHRoZW0uXG4gICAgaWYgKGVsLm1hdGNoZXMoJ2RldGFpbHM6bm90KFtvcGVuXSkgKicpICYmXG4gICAgICAgICFlbC5tYXRjaGVzKCdkZXRhaWxzPnN1bW1hcnk6Zmlyc3Qtb2YtdHlwZScpKVxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAvLyBJZiB0aGlzIGVsZW1lbnQgaGFzIG5vIHBhaW50ZWQgZGltZW5zaW9ucywgaXQncyBoaWRkZW4uXG4gICAgcmV0dXJuICEoZWwub2Zmc2V0V2lkdGggfHwgZWwub2Zmc2V0SGVpZ2h0IHx8IGVsLmdldENsaWVudFJlY3RzKCkubGVuZ3RoKTtcbn07XG4vKipcbiAqIERldGVybWluZSBpZiBhbiBlbGVtZW50IGlzIGZvY3VzYWJsZSBhbmQgaGFzIHVzZXItdmlzaWJsZSBwYWludGVkIGRpbWVuc2lvbnMuXG4gKi9cbmNvbnN0IGlzRm9jdXNhYmxlID0gKGVsKSA9PiB7XG4gICAgLy8gQSBzaGFkb3cgaG9zdCB0aGF0IGRlbGVnYXRlcyBmb2N1cyB3aWxsIG5ldmVyIGRpcmVjdGx5IHJlY2VpdmUgZm9jdXMsXG4gICAgLy8gZXZlbiB3aXRoIGB0YWJpbmRleD0wYC4gQ29uc2lkZXIgb3VyIDxmYW5jeS1idXR0b24+IGN1c3RvbSBlbGVtZW50LCB3aGljaFxuICAgIC8vIGRlbGVnYXRlcyBmb2N1cyB0byBpdHMgc2hhZG93IGJ1dHRvbjpcbiAgICAvL1xuICAgIC8vIDxmYW5jeS1idXR0b24gdGFiaW5kZXg9XCIwXCI+XG4gICAgLy8gICNzaGFkb3ctcm9vdFxuICAgIC8vICA8YnV0dG9uPjxzbG90Pjwvc2xvdD48L2J1dHRvbj5cbiAgICAvLyA8L2ZhbmN5LWJ1dHRvbj5cbiAgICAvL1xuICAgIC8vIFRoZSBicm93c2VyIGFjdHMgYXMgYXMgaWYgdGhlcmUgaXMgb25seSBvbmUgZm9jdXNhYmxlIGVsZW1lbnQgXHUyMDEzIHRoZSBzaGFkb3dcbiAgICAvLyBidXR0b24uIE91ciBsaWJyYXJ5IHNob3VsZCBiZWhhdmUgdGhlIHNhbWUgd2F5LlxuICAgIGlmIChlbC5zaGFkb3dSb290Py5kZWxlZ2F0ZXNGb2N1cylcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiBlbC5tYXRjaGVzKGZvY3VzYWJsZVNlbGVjdG9ycy5qb2luKCcsJykpICYmICFpc0hpZGRlbihlbCk7XG59O1xuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYW4gZWxlbWVudCBjYW4gaGF2ZSBmb2N1c2FibGUgY2hpbGRyZW4uIFVzZWZ1bCBmb3IgYmFpbGluZyBvdXRcbiAqIGVhcmx5IHdoZW4gd2Fsa2luZyB0aGUgRE9NIHRyZWUuXG4gKiBAZXhhbXBsZVxuICogVGhpcyBkaXYgaXMgaW5lcnQsIHNvIG5vbmUgb2YgaXRzIGNoaWxkcmVuIGNhbiBiZSBmb2N1c2VkLCBldmVuIHRob3VnaCB0aGV5XG4gKiBtZWV0IG91ciBjcml0ZXJpYSBmb3Igd2hhdCBpcyBmb2N1c2FibGUuIE9uY2Ugd2UgY2hlY2sgdGhlIGRpdiwgd2UgY2FuIHNraXBcbiAqIHRoZSByZXN0IG9mIHRoZSBzdWJ0cmVlLlxuICogYGBgaHRtbFxuICogPGRpdiBpbmVydD5cbiAqICAgPGJ1dHRvbj5CdXR0b248L2J1dHRvbj5cbiAqICAgPGEgaHJlZj1cIiNcIj5MaW5rPC9hPlxuICogPC9kaXY+XG4gKiBgYGBcbiAqL1xuZnVuY3Rpb24gY2FuSGF2ZUZvY3VzYWJsZUNoaWxkcmVuKGVsKSB7XG4gICAgLy8gVGhlIGJyb3dzZXIgd2lsbCBuZXZlciBzZW5kIGZvY3VzIGludG8gYSBTaGFkb3cgRE9NIGlmIHRoZSBob3N0IGVsZW1lbnRcbiAgICAvLyBoYXMgYSBuZWdhdGl2ZSB0YWJpbmRleC4gVGhpcyBhcHBsaWVzIHRvIGJvdGggc2xvdHRlZCBMaWdodCBET00gU2hhZG93IERPTVxuICAgIC8vIGNoaWxkcmVuXG4gICAgaWYgKGVsLnNoYWRvd1Jvb3QgJiYgZWwuZ2V0QXR0cmlidXRlKCd0YWJpbmRleCcpID09PSAnLTEnKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgLy8gRWxlbW1lbnRzIG1hdGNoaW5nIHRoaXMgc2VsZWN0b3IgYXJlIGVpdGhlciBoaWRkZW4gZW50aXJlbHkgZnJvbSB0aGUgdXNlcixcbiAgICAvLyBvciBhcmUgdmlzaWJsZSBidXQgdW5hdmFpbGFibGUgZm9yIGludGVyYWN0aW9uLiBUaGVpciBkZXNjZW50YW50cyBjYW4gbmV2ZXJcbiAgICAvLyByZWNlaXZlIGZvY3VzLlxuICAgIHJldHVybiAhZWwubWF0Y2hlcygnOmRpc2FibGVkLFtoaWRkZW5dLFtpbmVydF0nKTtcbn1cbi8qKlxuICogR2V0IHRoZSBhY3RpdmUgZWxlbWVudCwgYWNjb3VudGluZyBmb3IgU2hhZG93IERPTSBzdWJ0cmVlcy5cbiAqIEBhdXRob3IgQ29yeSBMYVZpc2thXG4gKiBAc2VlOiBodHRwczovL3d3dy5hYmVhdXRpZnVsc2l0ZS5uZXQvcG9zdHMvZmluZGluZy10aGUtYWN0aXZlLWVsZW1lbnQtaW4tYS1zaGFkb3ctcm9vdC9cbiAqL1xuZnVuY3Rpb24gZ2V0QWN0aXZlRWxlbWVudChyb290ID0gZG9jdW1lbnQpIHtcbiAgICBjb25zdCBhY3RpdmVFbCA9IHJvb3QuYWN0aXZlRWxlbWVudDtcbiAgICBpZiAoIWFjdGl2ZUVsKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAvLyBJZiB0aGVyZVx1MjAxOXMgYSBzaGFkb3cgcm9vdCwgcmVjdXJzaXZlbHkgZmluZCB0aGUgYWN0aXZlIGVsZW1lbnQgd2l0aGluIGl0LlxuICAgIC8vIElmIHRoZSByZWN1cnNpdmUgY2FsbCByZXR1cm5zIG51bGwsIHJldHVybiB0aGUgYWN0aXZlIGVsZW1lbnRcbiAgICAvLyBvZiB0aGUgdG9wLWxldmVsIERvY3VtZW50LlxuICAgIGlmIChhY3RpdmVFbC5zaGFkb3dSb290KVxuICAgICAgICByZXR1cm4gZ2V0QWN0aXZlRWxlbWVudChhY3RpdmVFbC5zaGFkb3dSb290KSB8fCBkb2N1bWVudC5hY3RpdmVFbGVtZW50O1xuICAgIC8vIElmIG5vdCwgd2UgY2FuIGp1c3QgcmV0dXJuIHRoZSBhY3RpdmUgZWxlbWVudFxuICAgIHJldHVybiBhY3RpdmVFbDtcbn1cbi8qKlxuICogVHJhcCB0aGUgZm9jdXMgaW5zaWRlIHRoZSBnaXZlbiBlbGVtZW50XG4gKi9cbmZ1bmN0aW9uIHRyYXBUYWJLZXkoZWwsIGV2ZW50KSB7XG4gICAgY29uc3QgW2ZpcnN0Rm9jdXNhYmxlQ2hpbGQsIGxhc3RGb2N1c2FibGVDaGlsZF0gPSBnZXRGb2N1c2FibGVFZGdlcyhlbCk7XG4gICAgLy8gSWYgdGhlcmUgYXJlIG5vIGZvY3VzYWJsZSBjaGlsZHJlbiBpbiB0aGUgZGlhbG9nLCBwcmV2ZW50IHRoZSB1c2VyIGZyb21cbiAgICAvLyB0YWJiaW5nIG91dCBvZiBpdFxuICAgIGlmICghZmlyc3RGb2N1c2FibGVDaGlsZClcbiAgICAgICAgcmV0dXJuIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgYWN0aXZlRWxlbWVudCA9IGdldEFjdGl2ZUVsZW1lbnQoKTtcbiAgICAvLyBJZiB0aGUgU0hJRlQga2V5IGlzIHByZXNzZWQgd2hpbGUgdGFiYmluZyAobW92aW5nIGJhY2t3YXJkcykgYW5kIHRoZVxuICAgIC8vIGN1cnJlbnRseSBmb2N1c2VkIGl0ZW0gaXMgdGhlIGZpcnN0IG9uZSwgbW92ZSB0aGUgZm9jdXMgdG8gdGhlIGxhc3RcbiAgICAvLyBmb2N1c2FibGUgaXRlbSBmcm9tIHRoZSBkaWFsb2cgZWxlbWVudFxuICAgIGlmIChldmVudC5zaGlmdEtleSAmJiBhY3RpdmVFbGVtZW50ID09PSBmaXJzdEZvY3VzYWJsZUNoaWxkKSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmU6IHdlIGtub3cgdGhhdCBgbGFzdEZvY3VzYWJsZUNoaWxkYCBpcyBub3QgbnVsbCBoZXJlXG4gICAgICAgIGxhc3RGb2N1c2FibGVDaGlsZC5mb2N1cygpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgICAvLyBJZiB0aGUgU0hJRlQga2V5IGlzIG5vdCBwcmVzc2VkIChtb3ZpbmcgZm9yd2FyZHMpIGFuZCB0aGUgY3VycmVudGx5IGZvY3VzZWRcbiAgICAvLyBpdGVtIGlzIHRoZSBsYXN0IG9uZSwgbW92ZSB0aGUgZm9jdXMgdG8gdGhlIGZpcnN0IGZvY3VzYWJsZSBpdGVtIGZyb20gdGhlXG4gICAgLy8gZGlhbG9nIGVsZW1lbnRcbiAgICBlbHNlIGlmICghZXZlbnQuc2hpZnRLZXkgJiYgYWN0aXZlRWxlbWVudCA9PT0gbGFzdEZvY3VzYWJsZUNoaWxkKSB7XG4gICAgICAgIGZpcnN0Rm9jdXNhYmxlQ2hpbGQuZm9jdXMoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG5cbmNsYXNzIEExMXlEaWFsb2cge1xuICAgICRlbDtcbiAgICBpZDtcbiAgICBwcmV2aW91c2x5Rm9jdXNlZDtcbiAgICBzaG93bjtcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuJGVsID0gZWxlbWVudDtcbiAgICAgICAgdGhpcy5pZCA9IHRoaXMuJGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1hMTF5LWRpYWxvZycpIHx8IHRoaXMuJGVsLmlkO1xuICAgICAgICB0aGlzLnByZXZpb3VzbHlGb2N1c2VkID0gbnVsbDtcbiAgICAgICAgdGhpcy5zaG93biA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1haW50YWluRm9jdXMgPSB0aGlzLm1haW50YWluRm9jdXMuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5iaW5kS2V5cHJlc3MgPSB0aGlzLmJpbmRLZXlwcmVzcy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhhbmRsZVRyaWdnZXJDbGlja3MgPSB0aGlzLmhhbmRsZVRyaWdnZXJDbGlja3MuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zaG93ID0gdGhpcy5zaG93LmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuaGlkZSA9IHRoaXMuaGlkZS5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLiRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy4kZWwuc2V0QXR0cmlidXRlKCdhcmlhLW1vZGFsJywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy4kZWwuc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsICctMScpO1xuICAgICAgICBpZiAoIXRoaXMuJGVsLmhhc0F0dHJpYnV0ZSgncm9sZScpKSB7XG4gICAgICAgICAgICB0aGlzLiRlbC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnZGlhbG9nJyk7XG4gICAgICAgIH1cbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmhhbmRsZVRyaWdnZXJDbGlja3MsIHRydWUpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEZXN0cm95IHRoZSBjdXJyZW50IGluc3RhbmNlIChhZnRlciBtYWtpbmcgc3VyZSB0aGUgZGlhbG9nIGhhcyBiZWVuIGhpZGRlbilcbiAgICAgKiBhbmQgcmVtb3ZlIGFsbCBhc3NvY2lhdGVkIGxpc3RlbmVycyBmcm9tIGRpYWxvZyBvcGVuZXJzIGFuZCBjbG9zZXJzXG4gICAgICovXG4gICAgZGVzdHJveSgpIHtcbiAgICAgICAgLy8gSGlkZSB0aGUgZGlhbG9nIHRvIGF2b2lkIGRlc3Ryb3lpbmcgYW4gb3BlbiBpbnN0YW5jZVxuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgLy8gUmVtb3ZlIHRoZSBjbGljayBldmVudCBkZWxlZ2F0ZXMgZm9yIG91ciBvcGVuZXJzIGFuZCBjbG9zZXJzXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVUcmlnZ2VyQ2xpY2tzLCB0cnVlKTtcbiAgICAgICAgLy8gQ2xvbmUgYW5kIHJlcGxhY2UgdGhlIGRpYWxvZyBlbGVtZW50IHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzIGNhdXNlZCBieVxuICAgICAgICAvLyBldmVudCBsaXN0ZW5lcnMgdGhhdCB0aGUgYXV0aG9yIG1pZ2h0IG5vdCBoYXZlIGNsZWFuZWQgdXAuXG4gICAgICAgIHRoaXMuJGVsLnJlcGxhY2VXaXRoKHRoaXMuJGVsLmNsb25lTm9kZSh0cnVlKSk7XG4gICAgICAgIC8vIERpc3BhdGNoIGEgYGRlc3Ryb3lgIGV2ZW50XG4gICAgICAgIHRoaXMuZmlyZSgnZGVzdHJveScpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2hvdyB0aGUgZGlhbG9nIGVsZW1lbnQsIHRyYXAgdGhlIGN1cnJlbnQgZm9jdXMgd2l0aGluIGl0LCBsaXN0ZW4gZm9yIHNvbWVcbiAgICAgKiBzcGVjaWZpYyBrZXkgcHJlc3NlcyBhbmQgZmlyZSBhbGwgcmVnaXN0ZXJlZCBjYWxsYmFja3MgZm9yIGBzaG93YCBldmVudFxuICAgICAqL1xuICAgIHNob3coZXZlbnQpIHtcbiAgICAgICAgLy8gSWYgdGhlIGRpYWxvZyBpcyBhbHJlYWR5IG9wZW4sIGFib3J0XG4gICAgICAgIGlmICh0aGlzLnNob3duKVxuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIC8vIEtlZXAgYSByZWZlcmVuY2UgdG8gdGhlIGN1cnJlbnRseSBmb2N1c2VkIGVsZW1lbnQgdG8gYmUgYWJsZSB0byByZXN0b3JlXG4gICAgICAgIC8vIGl0IGxhdGVyXG4gICAgICAgIHRoaXMuc2hvd24gPSB0cnVlO1xuICAgICAgICB0aGlzLiRlbC5yZW1vdmVBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJyk7XG4gICAgICAgIHRoaXMucHJldmlvdXNseUZvY3VzZWQgPSBnZXRBY3RpdmVFbGVtZW50KCk7XG4gICAgICAgIC8vIER1ZSB0byBhIGxvbmcgbGFzdGluZyBidWcgaW4gU2FmYXJpLCBjbGlja2luZyBhbiBpbnRlcmFjdGl2ZSBlbGVtZW50XG4gICAgICAgIC8vIChsaWtlIGEgPGJ1dHRvbj4pIGRvZXMgKm5vdCogbW92ZSB0aGUgZm9jdXMgdG8gdGhhdCBlbGVtZW50LCB3aGljaCBtZWFuc1xuICAgICAgICAvLyBgZG9jdW1lbnQuYWN0aXZlRWxlbWVudGAgaXMgd2hhdGV2ZXIgZWxlbWVudCBpcyBjdXJyZW50bHkgZm9jdXNlZCAobGlrZVxuICAgICAgICAvLyBhbiA8aW5wdXQ+KSwgb3IgdGhlIDxib2R5PiBlbGVtZW50IG90aGVyd2lzZS4gV2UgY2FuIHdvcmsgYXJvdW5kIHRoYXRcbiAgICAgICAgLy8gcHJvYmxlbSBieSBjaGVja2luZyB3aGV0aGVyIHRoZSBmb2N1c2VkIGVsZW1lbnQgaXMgdGhlIDxib2R5PiwgYW5kIGlmIGl0LFxuICAgICAgICAvLyBzdG9yZSB0aGUgY2xpY2sgZXZlbnQgdGFyZ2V0LlxuICAgICAgICAvLyBTZWU6IGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0yMjI2MVxuICAgICAgICBpZiAodGhpcy5wcmV2aW91c2x5Rm9jdXNlZD8udGFnTmFtZSA9PT0gJ0JPRFknICYmIGV2ZW50Py50YXJnZXQpIHtcbiAgICAgICAgICAgIHRoaXMucHJldmlvdXNseUZvY3VzZWQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgLy8gU2V0IHRoZSBmb2N1cyB0byB0aGUgZGlhbG9nIGVsZW1lbnRcbiAgICAgICAgLy8gU2VlOiBodHRwczovL2dpdGh1Yi5jb20vS2l0dHlHaXJhdWRlbC9hMTF5LWRpYWxvZy9wdWxsLzU4M1xuICAgICAgICBpZiAoZXZlbnQ/LnR5cGUgPT09ICdmb2N1cycpIHtcbiAgICAgICAgICAgIHRoaXMubWFpbnRhaW5Gb2N1cyhldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBtb3ZlRm9jdXNUb0RpYWxvZyh0aGlzLiRlbCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gQmluZCBhIGZvY3VzIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBib2R5IGVsZW1lbnQgdG8gbWFrZSBzdXJlIHRoZSBmb2N1c1xuICAgICAgICAvLyBzdGF5cyB0cmFwcGVkIGluc2lkZSB0aGUgZGlhbG9nIHdoaWxlIG9wZW4sIGFuZCBzdGFydCBsaXN0ZW5pbmcgZm9yIHNvbWVcbiAgICAgICAgLy8gc3BlY2lmaWMga2V5IHByZXNzZXMgKFRBQiBhbmQgRVNDKVxuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5tYWludGFpbkZvY3VzLCB0cnVlKTtcbiAgICAgICAgdGhpcy4kZWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYmluZEtleXByZXNzLCB0cnVlKTtcbiAgICAgICAgLy8gRGlzcGF0Y2ggYSBgc2hvd2AgZXZlbnRcbiAgICAgICAgdGhpcy5maXJlKCdzaG93JywgZXZlbnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogSGlkZSB0aGUgZGlhbG9nIGVsZW1lbnQsIHJlc3RvcmUgdGhlIGZvY3VzIHRvIHRoZSBwcmV2aW91c2x5IGFjdGl2ZVxuICAgICAqIGVsZW1lbnQsIHN0b3AgbGlzdGVuaW5nIGZvciBzb21lIHNwZWNpZmljIGtleSBwcmVzc2VzIGFuZCBmaXJlIGFsbFxuICAgICAqIHJlZ2lzdGVyZWQgY2FsbGJhY2tzIGZvciBgaGlkZWAgZXZlbnRcbiAgICAgKi9cbiAgICBoaWRlKGV2ZW50KSB7XG4gICAgICAgIC8vIElmIHRoZSBkaWFsb2cgaXMgYWxyZWFkeSBjbG9zZWQsIGFib3J0XG4gICAgICAgIGlmICghdGhpcy5zaG93bilcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB0aGlzLnNob3duID0gZmFsc2U7XG4gICAgICAgIHRoaXMuJGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICB0aGlzLnByZXZpb3VzbHlGb2N1c2VkPy5mb2N1cz8uKCk7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgZm9jdXMgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIGJvZHkgZWxlbWVudCBhbmQgc3RvcCBsaXN0ZW5pbmdcbiAgICAgICAgLy8gZm9yIHNwZWNpZmljIGtleSBwcmVzc2VzXG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcignZm9jdXMnLCB0aGlzLm1haW50YWluRm9jdXMsIHRydWUpO1xuICAgICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgdGhpcy5iaW5kS2V5cHJlc3MsIHRydWUpO1xuICAgICAgICAvLyBEaXNwYXRjaCBhIGBoaWRlYCBldmVudFxuICAgICAgICB0aGlzLmZpcmUoJ2hpZGUnLCBldmVudCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWdpc3RlciBhIG5ldyBjYWxsYmFjayBmb3IgdGhlIGdpdmVuIGV2ZW50IHR5cGVcbiAgICAgKi9cbiAgICBvbih0eXBlLCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVbnJlZ2lzdGVyIGFuIGV4aXN0aW5nIGNhbGxiYWNrIGZvciB0aGUgZ2l2ZW4gZXZlbnQgdHlwZVxuICAgICAqL1xuICAgIG9mZih0eXBlLCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgICAgIHRoaXMuJGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIodHlwZSwgaGFuZGxlciwgb3B0aW9ucyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBEaXNwYXRjaCBhIGN1c3RvbSBldmVudCBmcm9tIHRoZSBET00gZWxlbWVudCBhc3NvY2lhdGVkIHdpdGggdGhpcyBkaWFsb2cuXG4gICAgICogVGhpcyBhbGxvd3MgYXV0aG9ycyB0byBsaXN0ZW4gZm9yIGFuZCByZXNwb25kIHRvIHRoZSBldmVudHMgaW4gdGhlaXIgb3duXG4gICAgICogY29kZVxuICAgICAqL1xuICAgIGZpcmUodHlwZSwgZXZlbnQpIHtcbiAgICAgICAgdGhpcy4kZWwuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQodHlwZSwge1xuICAgICAgICAgICAgZGV0YWlsOiBldmVudCxcbiAgICAgICAgICAgIGNhbmNlbGFibGU6IHRydWUsXG4gICAgICAgIH0pKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQWRkIGEgZGVsZWdhdGVkIGV2ZW50IGxpc3RlbmVyIGZvciB3aGVuIGVsZW1lbXRzIHRoYXQgb3BlbiBvciBjbG9zZSB0aGVcbiAgICAgKiBkaWFsb2cgYXJlIGNsaWNrZWQsIGFuZCBjYWxsIGBzaG93YCBvciBgaGlkZWAsIHJlc3BlY3RpdmVseVxuICAgICAqL1xuICAgIGhhbmRsZVRyaWdnZXJDbGlja3MoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICAvLyBXZSB1c2UgYC5jbG9zZXN0KC4uKWAgYW5kIG5vdCBgLm1hdGNoZXMoLi4pYCBoZXJlIHNvIHRoYXQgY2xpY2tpbmdcbiAgICAgICAgLy8gYW4gZWxlbWVudCBuZXN0ZWQgd2l0aGluIGEgZGlhbG9nIG9wZW5lciBkb2VzIGNhdXNlIHRoZSBkaWFsb2cgdG8gb3BlblxuICAgICAgICBpZiAodGFyZ2V0LmNsb3Nlc3QoYFtkYXRhLWExMXktZGlhbG9nLXNob3c9XCIke3RoaXMuaWR9XCJdYCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2hvdyhldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KGBbZGF0YS1hMTF5LWRpYWxvZy1oaWRlPVwiJHt0aGlzLmlkfVwiXWApIHx8XG4gICAgICAgICAgICAodGFyZ2V0LmNsb3Nlc3QoJ1tkYXRhLWExMXktZGlhbG9nLWhpZGVdJykgJiZcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xvc2VzdCgnW2FyaWEtbW9kYWw9XCJ0cnVlXCJdJykgPT09IHRoaXMuJGVsKSkge1xuICAgICAgICAgICAgdGhpcy5oaWRlKGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBQcml2YXRlIGV2ZW50IGhhbmRsZXIgdXNlZCB3aGVuIGxpc3RlbmluZyB0byBzb21lIHNwZWNpZmljIGtleSBwcmVzc2VzXG4gICAgICogKG5hbWVseSBFU0MgYW5kIFRBQilcbiAgICAgKi9cbiAgICBiaW5kS2V5cHJlc3MoZXZlbnQpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhbiBlc2NhcGUgaGF0Y2ggaW4gY2FzZSB0aGVyZSBhcmUgbmVzdGVkIG9wZW4gZGlhbG9ncywgc28gdGhhdFxuICAgICAgICAvLyBvbmx5IHRoZSB0b3AgbW9zdCBkaWFsb2cgZ2V0cyBpbnRlcmFjdGVkIHdpdGhcbiAgICAgICAgaWYgKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQ/LmNsb3Nlc3QoJ1thcmlhLW1vZGFsPVwidHJ1ZVwiXScpICE9PSB0aGlzLiRlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGxldCBoYXNPcGVuUG9wb3ZlciA9IGZhbHNlO1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgaGFzT3BlblBvcG92ZXIgPSAhIXRoaXMuJGVsLnF1ZXJ5U2VsZWN0b3IoJ1twb3BvdmVyXTpub3QoW3BvcG92ZXI9XCJtYW51YWxcIl0pOnBvcG92ZXItb3BlbicpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIHtcbiAgICAgICAgICAgIC8vIFJ1biB0aGF0IERPTSBxdWVyeSBpbiBhIHRyeS9jYXRjaCBiZWNhdXNlIG5vdCBhbGwgYnJvd3NlcnMgc3VwcG9ydCB0aGVcbiAgICAgICAgICAgIC8vIGA6cG9wb3Zlci1vcGVuYCBzZWxlY3Rvciwgd2hpY2ggd291bGQgY2F1c2UgdGhlIHdob2xlIGV4cHJlc3Npb24gdG9cbiAgICAgICAgICAgIC8vIGZhaWxcbiAgICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly9jYW5pdXNlLmNvbS9tZG4tY3NzX3NlbGVjdG9yc19wb3BvdmVyLW9wZW5cbiAgICAgICAgICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL0tpdHR5R2lyYXVkZWwvYTExeS1kaWFsb2cvcHVsbC81NzgjZGlzY3Vzc2lvbl9yMTM0MzIxNTE0OVxuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBkaWFsb2cgaXMgc2hvd24gYW5kIHRoZSBFU0Mga2V5IGlzIHByZXNzZWQsIHByZXZlbnQgYW55IGZ1cnRoZXJcbiAgICAgICAgLy8gZWZmZWN0cyBmcm9tIHRoZSBFU0Mga2V5IGFuZCBoaWRlIHRoZSBkaWFsb2csIHVubGVzczpcbiAgICAgICAgLy8gLSBpdHMgcm9sZSBpcyBgYWxlcnRkaWFsb2dgLCB3aGljaCBtZWFucyBpdCBzaG91bGQgYmUgbW9kYWxcbiAgICAgICAgLy8gLSBvciBpdCBjb250YWlucyBhbiBvcGVuIHBvcG92ZXIsIGluIHdoaWNoIGNhc2UgRVNDIHNob3VsZCBjbG9zZSBpdFxuICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRXNjYXBlJyAmJlxuICAgICAgICAgICAgdGhpcy4kZWwuZ2V0QXR0cmlidXRlKCdyb2xlJykgIT09ICdhbGVydGRpYWxvZycgJiZcbiAgICAgICAgICAgICFoYXNPcGVuUG9wb3Zlcikge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHRoaXMuaGlkZShldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgLy8gSWYgdGhlIGRpYWxvZyBpcyBzaG93biBhbmQgdGhlIFRBQiBrZXkgaXMgcHJlc3NlZCwgbWFrZSBzdXJlIHRoZSBmb2N1c1xuICAgICAgICAvLyBzdGF5cyB0cmFwcGVkIHdpdGhpbiB0aGUgZGlhbG9nIGVsZW1lbnRcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ1RhYicpIHtcbiAgICAgICAgICAgIHRyYXBUYWJLZXkodGhpcy4kZWwsIGV2ZW50KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgZGlhbG9nIGlzIHNob3duIGFuZCB0aGUgZm9jdXMgaXMgbm90IHdpdGhpbiBhIGRpYWxvZyBlbGVtZW50IChlaXRoZXJcbiAgICAgKiB0aGlzIG9uZSBvciBhbm90aGVyIG9uZSBpbiBjYXNlIG9mIG5lc3RlZCBkaWFsb2dzKSBvciBhdHRyaWJ1dGUsIG1vdmUgaXRcbiAgICAgKiBiYWNrIHRvIHRoZSBkaWFsb2cgY29udGFpbmVyXG4gICAgICogU2VlOiBodHRwczovL2dpdGh1Yi5jb20vS2l0dHlHaXJhdWRlbC9hMTF5LWRpYWxvZy9pc3N1ZXMvMTc3XG4gICAgICovXG4gICAgbWFpbnRhaW5Gb2N1cyhldmVudCkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBldmVudC50YXJnZXQ7XG4gICAgICAgIGlmICghdGFyZ2V0LmNsb3Nlc3QoJ1thcmlhLW1vZGFsPVwidHJ1ZVwiXSwgW2RhdGEtYTExeS1kaWFsb2ctaWdub3JlLWZvY3VzLXRyYXBdJykpIHtcbiAgICAgICAgICAgIG1vdmVGb2N1c1RvRGlhbG9nKHRoaXMuJGVsKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5zdGFudGlhdGVEaWFsb2dzKCkge1xuICAgIGZvciAoY29uc3QgZWwgb2YgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYTExeS1kaWFsb2ddJykpIHtcbiAgICAgICAgbmV3IEExMXlEaWFsb2coZWwpO1xuICAgIH1cbn1cbmlmICh0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgaWYgKGRvY3VtZW50LnJlYWR5U3RhdGUgPT09ICdsb2FkaW5nJykge1xuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgaW5zdGFudGlhdGVEaWFsb2dzKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICAgIGluc3RhbnRpYXRlRGlhbG9ncygpO1xuICAgIH1cbn1cblxuZXhwb3J0IHsgQTExeURpYWxvZyBhcyBkZWZhdWx0IH07XG4iLCAiaW1wb3J0IEExMXlEaWFsb2cgZnJvbSAnYTExeS1kaWFsb2cnO1xyXG5cclxuY29uc3QgZGlhbG9ncyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGRpYWxvZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZGlhbG9nJyk7XHJcblxyXG4gICAgaWYgKCFkaWFsb2dzLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgIGRpYWxvZ3MuZm9yRWFjaChkaWFsb2cgPT4ge1xyXG4gICAgICAgIGNvbnN0IGVsID0gbmV3IEExMXlEaWFsb2coZGlhbG9nKTtcclxuXHJcbiAgICAgICAgZWwub24oJ3Nob3cnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdvdmVyZmxvdy1oaWRkZW4nKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZWwub24oJ2hpZGUnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdvdmVyZmxvdy1oaWRkZW4nKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5jb25zdCBmb3Jtc0FjY2Vzc0RpYWxvZyA9ICgpID0+IHtcclxuICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmb3Jtcy1saWJyYXJ5LWRpYWxvZycpO1xyXG5cclxuICAgIGlmICghZGlhbG9nKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgaGlkZGVuVHJpZ2dlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWExMXktZGlhbG9nLXNob3c9XCJmb3Jtcy1saWJyYXJ5LWRpYWxvZ1wiXScpO1xyXG4gICAgY29uc3QgY2xvc2VUcmlnZ2VyID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWExMXktZGlhbG9nLWhpZGVdJyk7XHJcbiAgICBjb25zdCBjaGVja2JveCA9IGRpYWxvZy5xdWVyeVNlbGVjdG9yKCcuZGlhbG9nLWNvbnRlbnQtZm9vdGVyIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xyXG4gICAgY29uc3Qgc3VibWl0ID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3IoJy5kaWFsb2ctY29udGVudC1mb290ZXIgLmJ0bi1wcmltYXJ5Jyk7XHJcbiAgICBcclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKGUpID0+IHtcclxuICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmb3Jtcy1hY2Nlc3MtYXBwcm92ZWQnKSkge1xyXG4gICAgICAgICAgICBoaWRkZW5UcmlnZ2VyLmNsaWNrKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgICBpZiAoZS50YXJnZXQuY2hlY2tlZCkge1xyXG4gICAgICAgICAgICBzdWJtaXQucmVtb3ZlQXR0cmlidXRlKCdkaXNhYmxlZCcpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHN1Ym1pdC5zZXRBdHRyaWJ1dGUoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG4gICAgc3VibWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICBpZiAoIWxvY2FsU3RvcmFnZS5nZXRJdGVtKCdmb3Jtcy1hY2Nlc3MtYXBwcm92ZWQnKSkge1xyXG4gICAgICAgICAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnZm9ybXMtYWNjZXNzLWFwcHJvdmVkJywgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjbG9zZVRyaWdnZXIuY2xpY2soKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5leHBvcnQgeyBkaWFsb2dzLCBmb3Jtc0FjY2Vzc0RpYWxvZyB9OyIsICJjb25zdCBob21lSGVybyA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCB0YWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY2FsZW5kYXItdGFiJyk7XHJcbiAgICBjb25zdCB0YWJQYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jYWxlbmRhci1wYW5lbCcpO1xyXG5cclxuICAgIGlmICghdGFiKSByZXR1cm47XHJcblxyXG4gICAgdGFiLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB0YWJQYW5lbC5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgICAgIHRhYi5jbGFzc0xpc3QudG9nZ2xlKFwiaXMtYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaG9tZUhlcm87IiwgImNvbnN0IHBsYXlMaXN0ID0gKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IHBsYXllciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqcy1wbGF5bGlzdC1wbGF5ZXInKTtcclxuICAgIGNvbnN0IGRhdGVUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBsYXlsaXN0LWRhdGUnKTtcclxuICAgIGNvbnN0IHRpdGxlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wbGF5bGlzdC10aXRsZScpO1xyXG4gICAgY29uc3QgZGVzY3JUZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBsYXlsaXN0LWRlc2NyaXB0aW9uJyk7XHJcbiAgICBjb25zdCBwbGF5bGlzdEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXBsYXlsaXN0LWl0ZW0nKTtcclxuXHJcbiAgICBjb25zdCB1cGRhdGVWaWV3ID0gKHsgdGl0bGUsIGRlc2NyaXB0aW9uLCBkYXRlLCB5dCB9KSA9PiB7XHJcblxyXG4gICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgIHRvcDogMTIwLFxyXG4gICAgICAgICAgICBsZWZ0OiAwLFxyXG4gICAgICAgICAgICBiZWhhdmlvcjogXCJzbW9vdGhcIixcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcGxheWVyLnNyYyA9IGBodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC8ke3l0fT9hdXRvcGxheT0xYDtcclxuICAgICAgICBkYXRlVGV4dC5pbm5lckhUTUwgPSBkYXRlO1xyXG4gICAgICAgIHRpdGxlVGV4dC5pbm5lckhUTUwgPSB0aXRsZTtcclxuICAgICAgICBkZXNjclRleHQuaW5uZXJIVE1MID0gZGVzY3JpcHRpb247XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaGFuZGxlQWN0aXZlID0gKGFjdGl2ZUl0ZW0pID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50QWN0aXZlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXBsYXlsaXN0LWl0ZW1bYXJpYS1zZWxlY3RlZD1cInRydWVcIl0nKTtcclxuICAgICAgICBjdXJyZW50QWN0aXZlLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgICBhY3RpdmVJdGVtLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgXCJ0cnVlXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlsaXN0SXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG5cclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVWaWV3KHtcclxuICAgICAgICAgICAgICAgIHRpdGxlOiBpdGVtLmRhdGFzZXQudGl0bGUsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogaXRlbS5kYXRhc2V0LmRlc2NyaXB0aW9uLFxyXG4gICAgICAgICAgICAgICAgZGF0ZTogaXRlbS5kYXRhc2V0LmRhdGUsXHJcbiAgICAgICAgICAgICAgICB5dDogaXRlbS5kYXRhc2V0Lnl0XHJcbiAgICAgICAgICAgIH0pXHJcblxyXG4gICAgICAgICAgICBoYW5kbGVBY3RpdmUoaXRlbSk7XHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHBsYXlMaXN0OyIsICJjb25zdCBob3RUaXBMaWJyYXJ5ID0gKCkgPT4ge1xyXG4gICAgXHJcbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG4gICAgY29uc3QgcmVzdWx0c0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtaG90LXRpcC1saXN0Jyk7XHJcblxyXG4gICAgaWYgKCFyZXN1bHRzTGlzdCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG1vYmlsZUNhdGVnb3J5U2VsZWN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW1vYmlsZS1ob3QtdGlwLWNhdGVnb3J5Jyk7XHJcbiAgICBjb25zdCBtb2JpbGVTdWJjYXRlZ29yeVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tb2JpbGUtaG90LXRpcC1zdWJjYXRlZ29yeScpO1xyXG4gICAgY29uc3QgZGVza3RvcFN1YmNhdGVnb3J5RmlsdGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1kZXNrdG9wLXN1YmNhdGVnb3J5LWZpbHRlcicpO1xyXG5cclxuICAgIGxldCBzZWxlY3RlZENhdGVnb3J5ID0gcGFyYW1zLmhhcygnY2F0ZWdvcnknKSA/IHBhcmFtcy5nZXQoJ2NhdGVnb3J5JykgOiAnJztcclxuICAgIGxldCBzZWxlY3RlZFN1YmNhdGVnb3J5ID0gcGFyYW1zLmhhcygnc3ViY2F0ZWdvcnknKSA/IFtwYXJhbXMuZ2V0KCdzdWJjYXRlZ29yeScpXSA6IFtdO1xyXG5cclxuICAgIGNvbnN0IHBhZ2luYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtaG90LXRpcC1saXN0LXBhZ2luYXRpb24nKTtcclxuICAgIGxldCBwYWdlTnVtYmVyID0gMTtcclxuICAgIGNvbnN0IHBhZ2VTaXplID0gMTA7XHJcbiAgICBsZXQgdG90YWxSZXN1bHRzID0gMDtcclxuICAgIGxldCB0b3RhbFJlc3VsdFBhZ2VzID0gMDtcclxuXHJcbiAgICBnZXRSZXN1bHRzKCk7XHJcbiAgICBoYW5kbGVGaWx0ZXJFdmVudHMoKTtcclxuXHJcbiAgICAvLy9cclxuXHJcbiAgICBjb25zdCBzY3JvbGxCYWNrVG9wID0gKCkgPT4ge1xyXG4gICAgICAgIHJlc3VsdHNMaXN0LnNjcm9sbEludG9WaWV3KHtcclxuICAgICAgICAgICAgYmVoYXZpb3I6ICdzbW9vdGgnLFxyXG4gICAgICAgICAgICBibG9jazogJ3N0YXJ0JyxcclxuICAgICAgICAgICAgaW5saW5lOiAnbmVhcmVzdCdcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbGVhclJlc3VsdHMoKSB7XHJcbiAgICAgICAgcmVzdWx0c0xpc3QuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0UmVzdWx0cygpIHtcclxuICAgICAgICBmZXRjaCgnL0hvdFRpcHMnLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICBcImNhdGVnb3J5XCI6IHNlbGVjdGVkQ2F0ZWdvcnksXHJcbiAgICAgICAgICAgICAgICBcInN1YkNhdGVnb3J5XCI6IHNlbGVjdGVkU3ViY2F0ZWdvcnksXHJcbiAgICAgICAgICAgICAgICBcInBhZ2luYXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgICAgIFwicGFnZU51bWJlclwiOiBwYWdlTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgICAgIFwicGFnZVNpemVcIjogcGFnZVNpemVcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuanNvbigpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coZGF0YSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmVuZGVyUmVzdWx0cyhkYXRhLmhvdFRpcHMpO1xyXG4gICAgICAgICAgICAgICAgaGFuZGxlQ2FyZFRvZ2dsZXMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICB0b3RhbFJlc3VsdHMgPSBkYXRhLnNlYXJjaEluZm8udG90YWxSZXN1bHRzO1xyXG4gICAgICAgICAgICAgICAgdG90YWxSZXN1bHRQYWdlcyA9IE1hdGguY2VpbCh0b3RhbFJlc3VsdHMgLyBwYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgICAgICBjcmVhdGVQYWdpbmF0aW9uKHRvdGFsUmVzdWx0UGFnZXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJSZXN1bHRzKHJlc3VsdHMpIHtcclxuICAgICAgICBjbGVhclJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHMuZm9yRWFjaChyZXN1bHQgPT4ge1xyXG4gICAgICAgICAgICAgICAgbGV0IHB1Ymxpc2hEYXRlID0gbmV3IERhdGUocmVzdWx0LnB1Ymxpc2hEYXRlKTtcclxuICAgICAgICAgICAgICAgIGxldCBzdWJjYXRlZ29yaWVzID0gcmVzdWx0LnN1YkNhdGVnb3J5O1xyXG5cclxuICAgICAgICAgICAgICAgIHJlc3VsdHNMaXN0LmlubmVySFRNTCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWItMiBwLTQgcGItMiBiZy1saWdodFwiIGl0ZW1zY29wZSBpdGVtdHlwZT1cImh0dHBzOi8vc2NoZW1hLm9yZy9RdWVzdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggYWxpZ24taXRlbXMtbGctY2VudGVyIG1iLTMgZnctc2VtaWJvbGRcIiBzdHlsZT1cImZvbnQtc2l6ZTogMC43NXJlbTtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZsZXgtZ3Jvdy0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImQtaW5saW5lLWJsb2NrIG1iLTEgbWUtMSBweC0zIHB5LTIgcm91bmRlZC1waWxsIGJnLXNlY29uZGFyeSB0ZXh0LXdoaXRlXCI+JHtyZXN1bHQuY2F0ZWdvcnl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtPYmplY3Qua2V5cyhzdWJjYXRlZ29yaWVzKS5tYXAoc3ViY2F0ZWdvcnkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCJkLWlubGluZS1ibG9jayBtYi0xIG1lLTEgcHgtMyBweS0yIHJvdW5kZWQtcGlsbCBiZy1wcmltYXJ5IHRleHQtd2hpdGVcIj4ke3Jlc3VsdC5zdWJDYXRlZ29yeVtzdWJjYXRlZ29yeV19PC9zcGFuPmA7XHJcbiAgICAgICAgICAgICAgICB9KS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0aW1lIGl0ZW1wcm9wPVwiZGF0ZUNyZWF0ZWRcIiBkYXRldGltZT1cIiR7cHVibGlzaERhdGV9XCI+JHtwdWJsaXNoRGF0ZS5nZXRNb250aCgpICsgMX0vJHtwdWJsaXNoRGF0ZS5nZXREYXRlKCl9LyR7cHVibGlzaERhdGUuZ2V0RnVsbFllYXIoKX08L3RpbWU+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImhvdC10aXAtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGl0ZW1wcm9wPVwibmFtZVwiIGNsYXNzPVwibWItM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtyZXN1bHQucXVlc3Rpb259XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGl0ZW1wcm9wPVwiYWNjZXB0ZWRBbnN3ZXJcIiBpdGVtc2NvcGUgaXRlbXR5cGU9XCJodHRwczovL3NjaGVtYS5vcmcvQW5zd2VyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGl0ZW1wcm9wPVwidGV4dFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7cmVzdWx0LmFuc3dlcn1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiaG90LXRpcC10b2dnbGUgcHktM1wiIHR5cGU9XCJidXR0b25cIj5SZWFkIEFuc3dlcjwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlc3VsdHNMaXN0LmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwicGItNSBwYi1sZy0xMCB0ZXh0LWNlbnRlclwiPlNvcnJ5LCB0aGVyZSBhcmUgbm8gcmVzdWx0cyB0aGF0IG1hdGNoIHRoZSBzZWFyY2ggY3JpdGVyaWEuPC9kaXY+JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlQ2FyZFRvZ2dsZXMoKSB7XHJcbiAgICAgICAgY29uc3QgdG9nZ2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ob3QtdGlwLXRvZ2dsZScpO1xyXG5cclxuICAgICAgICB0b2dnbGVzLmZvckVhY2godG9nZ2xlID0+IHtcclxuICAgICAgICAgICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCB0b2dnbGUgPSBlLnRhcmdldDtcclxuICAgICAgICAgICAgICAgIGxldCBjb250ZW50ID0gZS50YXJnZXQucHJldmlvdXNFbGVtZW50U2libGluZztcclxuICAgIFxyXG4gICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuY2xhc3NMaXN0LmNvbnRhaW5zKCdob3QtdGlwLWNvbnRlbnQtLWV4cGFuZGVkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICB0b2dnbGUuaW5uZXJUZXh0ID0gJ1JlYWQgQW5zd2VyJztcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ2hvdC10aXAtY29udGVudC0tZXhwYW5kZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlLmlubmVyVGV4dCA9ICdDbG9zZSBBbnN3ZXInO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZCgnaG90LXRpcC1jb250ZW50LS1leHBhbmRlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVGaWx0ZXJFdmVudHMoKSB7XHJcbiAgICAgICAgbW9iaWxlQ2F0ZWdvcnlTZWxlY3QuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgcGFyYW1zLmRlbGV0ZSgnY2F0ZWdvcnknKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5zZXQoJ2NhdGVnb3J5JywgZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwYXJhbXMuZGVsZXRlKCdzdWJjYXRlZ29yeScpOyAvLyBpZiBjaGFuZ2luZyBjYXRlZ29yeSB0aGVuIHN1YmNhdGVnb3JpZXMgbm8gbG9uZ2VyIG1hdGNoXHJcbiAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggPSBwYXJhbXMudG9TdHJpbmcoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKG1vYmlsZVN1YmNhdGVnb3J5U2VsZWN0KSB7XHJcbiAgICAgICAgICAgIG1vYmlsZVN1YmNhdGVnb3J5U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUgPT09ICcnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLmRlbGV0ZSgnc3ViY2F0ZWdvcnknKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnNldCgnc3ViY2F0ZWdvcnknLCBlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnNlYXJjaCA9IHBhcmFtcy50b1N0cmluZygpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkZXNrdG9wU3ViY2F0ZWdvcnlGaWx0ZXJzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBkZXNrdG9wU3ViY2F0ZWdvcnlGaWx0ZXJzLmZvckVhY2goZmlsdGVyID0+IHtcclxuICAgICAgICAgICAgICAgIGZpbHRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkU3ViY2F0ZWdvcnkgIT0gZS50YXJnZXQudmFsdWUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLnNldCgnc3ViY2F0ZWdvcnknLCBlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggPSBwYXJhbXMudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsZWFyUGFnaW5hdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKHBhZ2luYXRpb25Db250YWluZXIubmV4dEVsZW1lbnRTaWJsaW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChwYWdpbmF0aW9uQ29udGFpbmVyLm5leHRFbGVtZW50U2libGluZy50YWdOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uQ29udGFpbmVyLm5leHRFbGVtZW50U2libGluZy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhZ2luYXRpb25Db250YWluZXIucHJldmlvdXNFbGVtZW50U2libGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAocGFnaW5hdGlvbkNvbnRhaW5lci5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnRhZ05hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25Db250YWluZXIucHJldmlvdXNFbGVtZW50U2libGluZy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGFnaW5hdGlvbkNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjcmVhdGVQYWdpbmF0aW9uKHRvdGFsUGFnZXMpIHtcclxuXHJcbiAgICAgICAgdG90YWxSZXN1bHRQYWdlcyA9IHBhcnNlSW50KHRvdGFsUmVzdWx0UGFnZXMpO1xyXG5cclxuICAgICAgICBjbGVhclBhZ2luYXRpb24oKTtcclxuXHJcbiAgICAgICAgaWYgKHRvdGFsUGFnZXMgPiAxKSB7XHJcbiAgICAgICAgICAgIHBhZ2luYXRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgncHktNCcpO1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3RhbFBhZ2VzOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCd0aXRsZScsIGBHbyB0byBwYWdlICR7aSArIDF9YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2VOdW1iZXIgPT0gKGkgKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2N1cnJlbnQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBvbmx5IHNob3dzIHBhZ2luYXRpb24gbnVtYmVycyAtKzMgb2YgY3VycmVudCBmb3IgcmVzdWx0cyBtb3JlIHRoYW4gNyBwYWdlc1xyXG4gICAgICAgICAgICAgICAgaWYgKHRvdGFsUGFnZXMgPiA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChpIDwgcGFnZU51bWJlciAmJiBpID4gKHBhZ2VOdW1iZXIgLSA1KSkgfHwgKGkgPiAocGFnZU51bWJlciAtIDEpICYmIGkgPCAoKHBhZ2VOdW1iZXIgLSAxKSArIDQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdkLWlubGluZS1ibG9jaycpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGkudGV4dENvbnRlbnQgPSBpICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwYWdlTnVtYmVyID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyUmVzdWx0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdldFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYWNrVG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uQ29udGFpbmVyLmFwcGVuZENoaWxkKGxpKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHBhZ2VOdW1iZXIgPiAxKSB7IC8vIHNob3cgcHJldmlvdXMgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgICAgIHByZXZCdG4uY2xhc3NMaXN0LmFkZCgnYnRuLXByZXYnKTtcclxuICAgICAgICAgICAgICAgIHByZXZCdG4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdHbyB0byBwcmV2aW91cyBwYWdlJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwYWdlTnVtYmVyIC09IDE7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGNsZWFyUmVzdWx0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIGdldFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYWNrVG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uQ29udGFpbmVyLmJlZm9yZShwcmV2QnRuKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHBhZ2VOdW1iZXIgPCB0b3RhbFBhZ2VzKSB7IC8vIHNob3cgbmV4dCBidXR0b25cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgbmV4dEJ0bi5jbGFzc0xpc3QuYWRkKCdidG4tbmV4dCcpO1xyXG4gICAgICAgICAgICAgICAgbmV4dEJ0bi5zZXRBdHRyaWJ1dGUoJ3RpdGxlJywgJ0dvIHRvIG5leHQgcGFnZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciArPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbGVhclJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFja1RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvbnRhaW5lci5hZnRlcihuZXh0QnRuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBob3RUaXBMaWJyYXJ5OyIsICJjb25zdCBhbGVydCA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBjbG9zZUFsZXJ0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWFsZXJ0LWNsb3NlJyk7XHJcbiAgICBjb25zdCBhbGVydEJhbm5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaXRlLWFsZXJ0Jyk7XHJcblxyXG4gICAgY29uc3Qgc2V0Q29va2llID0gKHRpbWVzdGFtcCwgZXhwKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCk7XHJcbiAgICAgICAgY29uc3QgbWludXRlcyA9IDYwICogMjQgKiBwYXJzZUludChleHApOy8vMSBtb250aFxyXG4gICAgICAgIG5vdy5zZXRUaW1lKG5vdy5nZXRUaW1lKCkgKyAobWludXRlcyAqIDYwICogMTAwMCkpO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBgd3JhX2FsZXJ0X2Jhbm5lcj0ke3RpbWVzdGFtcH07ZXhwaXJlcz1gICsgbm93LnRvVVRDU3RyaW5nKCkgKyBcIjtcIjtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoY2xvc2VBbGVydCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNsb3NlQWxlcnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgYWxlcnRCYW5uZXIucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBhbGVydEJhbm5lci5kYXRhc2V0LnRpbWVzdGFtcDtcclxuICAgICAgICAgICAgY29uc3QgZXhwID0gYWxlcnRCYW5uZXIuZGF0YXNldC5leHBpcmF0aW9uO1xyXG4gICAgICAgICAgICBzZXRDb29raWUodGltZXN0YW1wLCBleHApO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYWxlcnQ7IiwgImNvbnN0IGFydGljbGVGaWx0ZXJzID0gKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGZpbHRlclJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYXJ0aWNsZS1yZXN1bHRzJyk7XHJcblxyXG4gICAgaWYgKCFmaWx0ZXJSZXN1bHRzKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZmlsdGVyQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1hcnRpY2xlLWZpbHRlcicpO1xyXG4gICAgY29uc3QgZmlsdGVyRHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYXJ0aWNsZS1kcm9wZG93bicpO1xyXG5cclxuICAgIGNvbnN0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV3cy1zZWFyY2gnKTtcclxuICAgIGNvbnN0IHBhZ2luYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYXJ0aWNsZXMtcGFnaW5hdGlvbicpO1xyXG4gICAgY29uc3QgcmVzdWx0c0xvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1yZXN1bHRzLWxvYWRlcicpO1xyXG4gICAgY29uc3QgZmVhdHVyZWRBcnRpY2xlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtZmVhdHVyZWQtYXJ0aWNsZVwiKTtcclxuXHJcbiAgICBjb25zdCBhcGlFbmRwb2ludFVybCA9IFwiL05ld3NBbmRVcGRhdGVzXCI7XHJcbiAgICBsZXQgcGFnZU51bWJlciA9IDE7XHJcbiAgICBjb25zdCBwYWdlU2l6ZSA9IDE1O1xyXG5cclxuICAgIGxldCB0b3RhbFJlc3VsdHMgPSAwO1xyXG4gICAgbGV0IHRvdGFsUmVzdWx0UGFnZXMgPSAwO1xyXG5cclxuICAgIC8vVXJsc1xyXG5cclxuICAgIGNvbnN0IHdpbmRvd0xvYWRRdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvd0xvYWRRdWVyeVN0cmluZyk7XHJcblxyXG4gICAgbGV0IHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcblxyXG4gICAgaWYgKHVybFBhcmFtcy5oYXMoXCJzZWFyY2hcIikpIHtcclxuICAgICAgICBzZWFyY2hQaHJhc2UgPSB1cmxQYXJhbXMuZ2V0KFwic2VhcmNoXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCBjYXRlZ29yeSA9IFwiXCI7XHJcblxyXG4gICAgaWYgKHVybFBhcmFtcy5oYXMoXCJjYXRlZ29yeVwiKSkge1xyXG4gICAgICAgIGNhdGVnb3J5ID0gdXJsUGFyYW1zLmdldChcImNhdGVnb3J5XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vUmVzdWx0c1xyXG5cclxuICAgIGNvbnN0IHNjcm9sbEJhY2tUb3AgPSAoKSA9PiB7XHJcbiAgICAgICAgZmlsdGVyUmVzdWx0cy5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiBcInNtb290aFwiLCBibG9jazogXCJzdGFydFwiLCBpbmxpbmU6IFwibmVhcmVzdFwiIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhhbmRsZUluZGljYXRvcnMgPSAoc2hvdywgd2FpdExvYWRlckVsZW1lbnQpID0+IHtcclxuICAgICAgICBpZiAoc2hvdyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHdhaXRMb2FkZXJFbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdhaXRMb2FkZXJFbGVtZW50LmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGtpbGxSZXN1bHRzID0gKCkgPT4ge1xyXG4gICAgICAgIGZpbHRlclJlc3VsdHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBidG5TdGF0ZXMgPSAoY2xlYXJBbGwsIHNldFRvQ2F0KSA9PiB7XHJcblxyXG4gICAgICAgIGZpbHRlckJ0bnMuZm9yRWFjaCgoZmlsdGVyQnRuKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChmaWx0ZXJCdG4udmFsdWUgPT0gc2V0VG9DYXQgJiYgY2xlYXJBbGwgIT09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlckJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIFwidHJ1ZVwiKTtcclxuICAgICAgICAgICAgICAgIGZpbHRlckRyb3Bkb3duLnZhbHVlID0gc2V0VG9DYXQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJCdG4uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBcImZhbHNlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChmaWx0ZXJEcm9wZG93bi52YWx1ZSA9PSBzZXRUb0NhdCkge1xyXG4gICAgICAgICAgICBmaWx0ZXJEcm9wZG93bi52YWx1ZSA9IHNldFRvQ2F0O1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZpbHRlckRyb3Bkb3duLnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZmVhdHVyZWRBcnRpY2xlSGFuZGxlciA9IChhY3RpdmVGZWF0dXJlLCBoaWRlQWxsKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IGZpcnN0Q2F0U2x1ZyA9IGZlYXR1cmVkQXJ0aWNsZXNbMF0uZGF0YXNldC5mZWF0dXJlZGNhdDtcclxuXHJcbiAgICAgICAgZmVhdHVyZWRBcnRpY2xlcy5mb3JFYWNoKChmZWF0dXJlZEFydGljbGUpID0+IHtcclxuXHJcbiAgICAgICAgICAgIGlmIChoaWRlQWxsKSB7XHJcbiAgICAgICAgICAgICAgICBmZWF0dXJlZEFydGljbGUuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBmZWF0dXJlQ2F0ZWdvcnkgPSBmZWF0dXJlZEFydGljbGUuZGF0YXNldC5mZWF0dXJlZGNhdDtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKGZlYXR1cmVDYXRlZ29yeSA9PSBhY3RpdmVGZWF0dXJlICYmIGZlYXR1cmVDYXRlZ29yeSAhPT0gXCJhbGxcIikgfHwgKGZlYXR1cmVDYXRlZ29yeSA9PSBcImFsbFwiICYmIGFjdGl2ZUZlYXR1cmUgPT0gXCJcIikgfHwgYWN0aXZlRmVhdHVyZSA9PSBcIlwiICYmIGZlYXR1cmVDYXRlZ29yeSA9PSBmaXJzdENhdFNsdWcpIHtcclxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlZEFydGljbGUuaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmVkQXJ0aWNsZS5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJSZXN1bHRzID0gKHJlc3VsdHMpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHNlYXJjaFBocmFzZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBidG5TdGF0ZXModHJ1ZSwgY2F0ZWdvcnkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJ0blN0YXRlcyhmYWxzZSwgY2F0ZWdvcnkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkgeyBcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdHMuZm9yRWFjaCgocmVzdWx0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0SW1hZ2UgPSByZXN1bHQuaW1hZ2UgIT09IFwiXCIgPyByZXN1bHQuaW1hZ2UgOiBmaWx0ZXJSZXN1bHRzLmRhdGFzZXQuZmFsbGJhY2s7XHJcblxyXG4gICAgICAgICAgICAgICAgZmlsdGVyUmVzdWx0cy5pbm5lckhUTUwgKz0gKFxyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtYmxvY2sgY29sLW1kLTYgY29sLWxnLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3Jlc3VsdC51cmx9XCIgY2xhc3M9XCJuZXdzLWNhcmQgbmV3cy1jYXJkLS1sZyB0ZXh0LWRlY29yYXRpb24tbm9uZSBkLWJsb2NrIHAtNFwiIHN0eWxlPVwiY29sb3I6IHZhcigtLWJzLWRhcmspO1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJtYi00IHJhdGlvIHJhdGlvLTE2eDlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3NldEltYWdlfVwiIGxvYWRpbmc9XCJsYXp5XCIgY2xhc3M9XCJpbWctZmx1aWRcIiB3aWR0aD1cIjY2MFwiIGhlaWdodD1cIjMzMFwiIGFsdD1cIiR7cmVzdWx0LnRpdGxlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWItMiBkLWZsZXggZmxleC1yb3cgYWxpZ24taXRlbXMtY2VudGVyIGp1c3RpZnktY29udGVudC1iZXR3ZWVuXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aW1lIGNsYXNzPVwiZnMteHMgZnctYm9sZFwiIGRhdGV0aW1lPVwiJHtyZXN1bHQuZGF0ZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7cmVzdWx0LmRhdGVEaXNwbGF5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RpbWU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hpcCBjaGlwLS1uby1ob3ZlciBhbGlnbi1zZWxmLXN0YXJ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Jlc3VsdC5jYXRlZ29yeX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImg2IG1iLTJcIj4ke3Jlc3VsdC50aXRsZX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiZnMtc21cIj4ke3Jlc3VsdC5leGNlcnB0fTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyUmVzdWx0cy5pbm5lckhUTUwgPSAoYDxkaXYgY2xhc3M9XCJkLWJsb2NrIGNvbC1tZC0xMCBteC1hdXRvIGg1IHRleHQtY2VudGVyXCI+Tm8gcmVzdWx0cy4gVHJ5IGFnYWluLjwvZGl2PmApO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIGhhbmRsZUluZGljYXRvcnMoZmFsc2UsIHJlc3VsdHNMb2FkZXIpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG4gICAgY29uc3QgaGFuZGxlQ2xlYXJQYWdpbmF0aW9uID0gKHBhZ2luYXRpb25FbGVtZW50KSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChwYWdpbmF0aW9uRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHBhZ2luYXRpb25FbGVtZW50Lm5leHRFbGVtZW50U2libGluZy50YWdOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYWdpbmF0aW9uRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChwYWdpbmF0aW9uRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnRhZ05hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25FbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhZ2luYXRpb25FbGVtZW50LmlubmVySFRNTCA9IFwiXCI7XHJcblxyXG4gICAgfSAgXHJcblxyXG4gICAgY29uc3QgY3JlYXRlUGFnaW5hdGlvbiA9IChwYWdpbmF0aW9uRWxlbWVudCwgcmVzdWx0UGFnZUNvdW50KSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHRvdGFsUGFnZXMgPSBwYXJzZUludChyZXN1bHRQYWdlQ291bnQpO1xyXG5cclxuICAgICAgICBoYW5kbGVDbGVhclBhZ2luYXRpb24ocGFnaW5hdGlvbkNvbnRhaW5lcik7Ly9jbGVhciBmaXJzdFxyXG5cclxuICAgICAgICAvL251bWJlcmVkIHBhZ2UgYnV0dG9uc1xyXG4gICAgICAgIGlmICh0b3RhbFBhZ2VzID4gMSkge1xyXG5cclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b3RhbFBhZ2VzOyBpKyspIHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZShcInJvbGVcIiwgXCJidXR0b25cIik7XHJcbiAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBgR28gdG8gcGFnZSAke2kgKyAxfWApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYWdlTnVtYmVyID09IChpICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKFwiY3VycmVudFwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvL29ubHkgc2hvd3MgcGFnaW5hdGlvbiBudW1iZXJzIC0rMyBvZiBjdXJyZW50IGZvciByZXN1bHRzIG1vcmUgdGhhbiA3IHBhZ2VzXHJcbiAgICAgICAgICAgICAgICBpZiAodG90YWxQYWdlcyA+IDYpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoKGkgPCBwYWdlTnVtYmVyICYmIGkgPiAocGFnZU51bWJlciAtIDUpKSB8fCAoaSA+IChwYWdlTnVtYmVyIC0gMSkgJiYgaSA8ICgocGFnZU51bWJlciAtIDEpICsgNCkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJkLWlubGluZS1ibG9ja1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKFwiZC1ub25lXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoXCJhcmlhLWhpZGRlblwiLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxpLnRleHRDb250ZW50ID0gaSArIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgICAgICBwYWdlTnVtYmVyID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJhY2tUb3AoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25FbGVtZW50LmFwcGVuZENoaWxkKGxpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9uZXh0L3ByZXYgYnV0dG9uc1xyXG4gICAgICAgIGlmICh0b3RhbFBhZ2VzID4gMSkge1xyXG5cclxuICAgICAgICAgICAgaWYgKHBhZ2VOdW1iZXIgPiAxKSB7IC8vc2hvdyBwcmV2aW91cyBidXR0b25cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgcHJldkJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgcHJldkJ0bi5jbGFzc0xpc3QuYWRkKFwiYnRuLXByZXZcIik7XHJcbiAgICAgICAgICAgICAgICBwcmV2QnRuLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiR28gdG8gcHJldmlvdXMgcGFnZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBwcmV2QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXIgLT0gMTtcclxuICAgICAgICAgICAgICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJhY2tUb3AoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25FbGVtZW50LmJlZm9yZShwcmV2QnRuKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHBhZ2VOdW1iZXIgPCB0b3RhbFBhZ2VzKSB7IC8vc2hvdyBuZXh0IGJ1dHRvblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBuZXh0QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgICAgICBuZXh0QnRuLmNsYXNzTGlzdC5hZGQoXCJidG4tbmV4dFwiKTtcclxuICAgICAgICAgICAgICAgIG5leHRCdG4uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJHbyB0byBuZXh0IHBhZ2VcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgbmV4dEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwYWdlTnVtYmVyICs9IDE7XHJcbiAgICAgICAgICAgICAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYWNrVG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5hZnRlcihuZXh0QnRuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbiAgICBcclxuXHJcbiAgICBjb25zdCBwb3N0UmVzdWx0cyA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgaGFuZGxlSW5kaWNhdG9ycyh0cnVlLCByZXN1bHRzTG9hZGVyKTtcclxuXHJcbiAgICAgICAgbGV0IGJvZHlPYmplY3QgPSB7XHJcbiAgICAgICAgICAgIFwic2VhcmNoUGhyYXNlXCI6IHNlYXJjaFBocmFzZSxcclxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiBkZWNvZGVVUklDb21wb25lbnQoY2F0ZWdvcnkpLCAvL25lZWQgdG8gZGVjb2RlIGZvciBBUEkgcG9zdFxyXG4gICAgICAgICAgICBcInBhZ2luYXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwYWdlTnVtYmVyXCI6IHBhZ2VOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICBcInBhZ2VTaXplXCI6IHBhZ2VTaXplXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChjYXRlZ29yeSA9PSBcIlwiICYmIHNlYXJjaFBocmFzZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBmZWF0dXJlZEFydGljbGVIYW5kbGVyKGNhdGVnb3J5LCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmZWF0dXJlZEFydGljbGVIYW5kbGVyKGNhdGVnb3J5LCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBib2R5UmVxdWVzdCA9IEpTT04uc3RyaW5naWZ5KGJvZHlPYmplY3QpO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHlSZXF1ZXN0KVxyXG5cclxuICAgICAgICBmZXRjaChhcGlFbmRwb2ludFVybCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k6IFwibm8tcmVmZXJyZXJcIixcclxuICAgICAgICAgICAgYm9keTogYm9keVJlcXVlc3RcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXMpO1xyXG5cclxuICAgICAgICAgICByZW5kZXJSZXN1bHRzKHJlcy5uZXdzUmVjb3Jkcyk7XHJcblxyXG4gICAgICAgICAgIHRvdGFsUmVzdWx0cyA9IHJlcy5zZWFyY2hSZXN1bHRJbmZvLnRvdGFsUmVzdWx0cztcclxuICAgICAgICAgICB0b3RhbFJlc3VsdFBhZ2VzID0gTWF0aC5jZWlsKHRvdGFsUmVzdWx0cyAvIHBhZ2VTaXplKTtcclxuICAgICAgICAgICBjcmVhdGVQYWdpbmF0aW9uKHBhZ2luYXRpb25Db250YWluZXIsIHRvdGFsUmVzdWx0UGFnZXMpO1xyXG5cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cmxIYW5kbGVyID0gKGlzQ2F0ZWdvcnkpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKGlzQ2F0ZWdvcnkpIHsgLy91c2VzIGNhdGVnb3J5IGJ1dHRvbnNcclxuICAgICAgICAgICAgdXJsUGFyYW1zLnNldCgnY2F0ZWdvcnknLCBjYXRlZ29yeSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7IGlkOiBgY2F0ZWdvcnktJHtjYXRlZ29yeX1gIH0sICcnLCBgJHtsb2NhdGlvbi5wYXRobmFtZX0/Y2F0ZWdvcnk9JHtjYXRlZ29yeX1gKTtcclxuICAgICAgICB9IGVsc2UgeyAvL3VzZXMgc2VhcmNoIGZpZWxkXHJcbiAgICAgICAgICAgIHVybFBhcmFtcy5zZXQoJ3NlYXJjaCcsIHNlYXJjaFBocmFzZSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7IGlkOiAnc2VhcmNoLXNlYXJjaFBocmFzZScgfSwgJycsIGAke2xvY2F0aW9uLnBhdGhuYW1lfT9zZWFyY2g9JHtzZWFyY2hQaHJhc2V9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNldEVsZW1lbnRzID0gKHJlc2V0Rm9ybSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNldEZvcm0pIHtcclxuICAgICAgICAgICAgc2VhcmNoRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBidG5TdGF0ZXModHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vRXZlbnQgSGFuZGxlcnNcclxuXHJcbiAgICBmaWx0ZXJCdG5zLmZvckVhY2goKGZpbHRlckJ0bikgPT4ge1xyXG4gICAgICAgIGZpbHRlckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgcmVzZXRFbGVtZW50cyh0cnVlKTtcclxuICAgICAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgc2VhcmNoUGhyYXNlID0gXCJcIjtcclxuICAgICAgICAgICAgY2F0ZWdvcnkgPSBmaWx0ZXJCdG4udmFsdWU7XHJcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICAgICAgdXJsSGFuZGxlcih0cnVlKTtcclxuICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgZmlsdGVyRHJvcGRvd24uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgcmVzZXRFbGVtZW50cyh0cnVlKTtcclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgIHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcbiAgICAgICAgY2F0ZWdvcnkgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuXHJcbiAgICAgICAgdXJsSGFuZGxlcih0cnVlKTtcclxuICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxuICAgIH0pXHJcblxyXG4gICAgc2VhcmNoRm9ybS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcblxyXG4gICAgICAgIGNhdGVnb3J5ID0gXCJcIjtcclxuICAgICAgICBjb25zdCB0ZXh0RmllbGQgPSBzZWFyY2hGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XHJcbiAgICAgICAgc2VhcmNoUGhyYXNlID0gdGV4dEZpZWxkLnZhbHVlO1xyXG4gICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICB1cmxIYW5kbGVyKGZhbHNlKTtcclxuICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvcFVybENhdFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcblxyXG4gICAgICAgIGlmIChwb3BVcmxDYXRQYXJhbXMuaGFzKFwiY2F0ZWdvcnlcIikpIHtcclxuICAgICAgICAgICAgY2F0ZWdvcnkgPSBwb3BVcmxDYXRQYXJhbXMuZ2V0KFwiY2F0ZWdvcnlcIik7XHJcbiAgICAgICAgICAgIGZlYXR1cmVkQXJ0aWNsZUhhbmRsZXIoY2F0ZWdvcnksIGZhbHNlKTtcclxuICAgICAgICAgICAgcmVzZXRFbGVtZW50cyh0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYXRlZ29yeSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwb3BVcmxTZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG5cclxuICAgICAgICBpZiAocG9wVXJsU2VhcmNoUGFyYW1zLmhhcyhcInNlYXJjaFwiKSkge1xyXG4gICAgICAgICAgICBzZWFyY2hQaHJhc2UgPSBwb3BVcmxTZWFyY2hQYXJhbXMuZ2V0KFwic2VhcmNoXCIpO1xyXG4gICAgICAgICAgICBzZWFyY2hGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUgPSBzZWFyY2hQaHJhc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VhcmNoUGhyYXNlID0gXCJcIjtcclxuICAgICAgICAgICAgcmVzZXRFbGVtZW50cyh0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcblxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIG9ucGFnZSBsb2FkXHJcbiAgICBpZiAodXJsUGFyYW1zLmhhcyhcInNlYXJjaFwiKSkge1xyXG4gICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcblxyXG4gICAgICAgIGNhdGVnb3J5ID0gXCJcIjtcclxuICAgICAgICBzZWFyY2hQaHJhc2UgPSB1cmxQYXJhbXMuZ2V0KFwic2VhcmNoXCIpO1xyXG4gICAgICAgIHNlYXJjaEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9IHNlYXJjaFBocmFzZTtcclxuICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcbiAgICAgICAgY3JlYXRlUGFnaW5hdGlvbihwYWdpbmF0aW9uQ29udGFpbmVyLCBmaWx0ZXJSZXN1bHRzLmRhdGFzZXQuY2F0dG90YWwpO1xyXG5cclxuICAgIH1cclxuXHJcblxyXG5cclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBhcnRpY2xlRmlsdGVyczsiLCAiXHJcbmNvbnN0IG11bHRpbWVkaWFGaWx0ZXJzID0gKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGZpbHRlclJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbXVsdGltZWRpYS1yZXN1bHRzJyk7XHJcbiAgICBpZiAoIWZpbHRlclJlc3VsdHMpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBmaWx0ZXJCdG5zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLW11bHRpbWVkaWEtZmlsdGVyJyk7XHJcbiAgICBjb25zdCBmaWx0ZXJEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tdWx0aW1lZGlhLWRyb3Bkb3duJyk7XHJcblxyXG4gICAgY29uc3Qgc2VhcmNoRm9ybSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtdWx0aW1lZGlhLXNlYXJjaCcpO1xyXG4gICAgY29uc3QgcGFnaW5hdGlvbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tdWx0aW1lZGlhLXBhZ2luYXRpb24nKTtcclxuICAgIGNvbnN0IHJlc3VsdHNMb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcmVzdWx0cy1sb2FkZXInKTtcclxuXHJcbiAgICBjb25zdCBmZWF0dXJlZEl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qcy1mZWF0dXJlZFwiKTtcclxuXHJcbiAgICBjb25zdCBhcGlFbmRwb2ludFVybCA9IFwiL011bHRpbWVkaWFcIjtcclxuICAgIGxldCBwYWdlTnVtYmVyID0gMTtcclxuICAgIGNvbnN0IHBhZ2VTaXplID0gMTU7XHJcblxyXG4gICAgbGV0IHRvdGFsUmVzdWx0cyA9IDA7XHJcbiAgICBsZXQgdG90YWxSZXN1bHRQYWdlcyA9IDA7XHJcblxyXG4gICAgLy9VcmxzXHJcblxyXG4gICAgY29uc3Qgd2luZG93TG9hZFF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcclxuICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93TG9hZFF1ZXJ5U3RyaW5nKTtcclxuXHJcbiAgICBsZXQgc2VhcmNoUGhyYXNlID0gXCJcIjtcclxuXHJcbiAgICBpZiAodXJsUGFyYW1zLmhhcyhcInNlYXJjaFwiKSkge1xyXG4gICAgICAgIHNlYXJjaFBocmFzZSA9IHVybFBhcmFtcy5nZXQoXCJzZWFyY2hcIik7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHR5cGUgPSBcIlwiO1xyXG5cclxuICAgIGlmICh1cmxQYXJhbXMuaGFzKFwidHlwZVwiKSkge1xyXG4gICAgICAgIHR5cGUgPSB1cmxQYXJhbXMuZ2V0KFwidHlwZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1Jlc3VsdHNcclxuXHJcbiAgICBjb25zdCBzY3JvbGxCYWNrVG9wID0gKCkgPT4ge1xyXG4gICAgICAgIGZpbHRlclJlc3VsdHMuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwic3RhcnRcIiwgaW5saW5lOiBcIm5lYXJlc3RcIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoYW5kbGVJbmRpY2F0b3JzID0gKHNob3csIHdhaXRMb2FkZXJFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHNob3cgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB3YWl0TG9hZGVyRWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3YWl0TG9hZGVyRWxlbWVudC5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBraWxsUmVzdWx0cyA9ICgpID0+IHtcclxuICAgICAgICBmaWx0ZXJSZXN1bHRzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnRuU3RhdGVzID0gKGNsZWFyQWxsLCBzZXRUb0NhdCkgPT4ge1xyXG5cclxuICAgICAgICBmaWx0ZXJCdG5zLmZvckVhY2goKGZpbHRlckJ0bikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZmlsdGVyQnRuLnZhbHVlID09IHNldFRvQ2F0ICYmIGNsZWFyQWxsICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJCdG4uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJEcm9wZG93bi52YWx1ZSA9IHNldFRvQ2F0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyQnRuLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoZmlsdGVyRHJvcGRvd24udmFsdWUgPT0gc2V0VG9DYXQpIHtcclxuICAgICAgICAgICAgZmlsdGVyRHJvcGRvd24udmFsdWUgPSBzZXRUb0NhdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmaWx0ZXJEcm9wZG93bi52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZlYXR1cmVkSGFuZGxlciA9IChhY3RpdmVGZWF0dXJlLCBoaWRlQWxsKSA9PiB7XHJcblxyXG4gICAgICAgIGZlYXR1cmVkSXRlbXMuZm9yRWFjaCgoZmVhdHVyZWRJdGVtKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoaGlkZUFsbCkge1xyXG4gICAgICAgICAgICAgICAgZmVhdHVyZWRJdGVtLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBmZWF0dXJldHlwZSA9IGZlYXR1cmVkSXRlbS5kYXRhc2V0LmZlYXR1cmVkdHlwZTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoKGZlYXR1cmV0eXBlID09IGFjdGl2ZUZlYXR1cmUgJiYgZmVhdHVyZXR5cGUgIT09IFwiYWxsXCIpIHx8IChmZWF0dXJldHlwZSA9PSBcImFsbFwiICYmIGFjdGl2ZUZlYXR1cmUgPT0gXCJcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlZEl0ZW0uaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGZlYXR1cmVkSXRlbS5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJSZXN1bHRzID0gKHJlc3VsdHMpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHNlYXJjaFBocmFzZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBidG5TdGF0ZXModHJ1ZSwgdHlwZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnRuU3RhdGVzKGZhbHNlLCB0eXBlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHsgXHJcblxyXG4gICAgICAgICAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBzZXRJbWFnZSA9IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5pc1BsYXlsaXN0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC50aHVtYm5haWxPdmVycmlkZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZSA9IHJlc3VsdC50aHVtYm5haWxPdmVycmlkZTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmNoaWxkcmVuWzBdLnRodW1ibmFpbE92ZXJyaWRlICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZSA9IHJlc3VsdC5jaGlsZHJlblswXS50aHVtYm5haWxPdmVycmlkZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldEltYWdlID0gYGh0dHBzOi8vaTMueXRpbWcuY29tL3ZpLyR7cmVzdWx0LmNoaWxkcmVuWzBdLnlvdVR1YmVJZH0vbWF4cmVzZGVmYXVsdC5qcGdgO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZSA9IHJlc3VsdC50aHVtYm5haWxPdmVycmlkZSAhPT0gXCJcIiA/IHJlc3VsdC50aHVtYm5haWxPdmVycmlkZSA6IGBodHRwczovL2kzLnl0aW1nLmNvbS92aS8ke3Jlc3VsdC55b3VUdWJlSWR9L21heHJlc2RlZmF1bHQuanBnYDtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXRDaGlwID0gcmVzdWx0LmlzUGxheWxpc3QgPyBcIjxzcGFuIGNsYXNzPVxcXCJjaGlwIGNoaXAtLW5vLWhvdmVyXFxcIj5QbGF5bGlzdDwvc3Bhbj5cIiA6IGA8c3BhbiBjbGFzcz1cXFwiY2hpcCBjaGlwLS1uby1ob3ZlciBhbGlnbi1zZWxmLXN0YXJ0XFxcIj4ke3Jlc3VsdC50eXBlfTwvc3Bhbj5gOy8vbmVlZCB0byBjaGFuZ2UgdGhpcyBwcm9wZXJ0eSB3aGVuIHBsYXlsaXN0IGlzIGFkZGVkXHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXRDU1MgPSByZXN1bHQuaXNQbGF5bGlzdCA/IFwiY2FyZC1tZWRpYS0tcGxheWxpc3RcIiA6IFwiXCI7XHJcblxyXG4gICAgICAgICAgICAgICAgZmlsdGVyUmVzdWx0cy5pbm5lckhUTUwgKz0gKFxyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1ibG9jayBjb2wtbWQtNiBjb2wtbGctNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtyZXN1bHQudXJsfVwiIGNsYXNzPVwiY2FyZCBjYXJkLW1lZGlhICR7c2V0Q1NTfSBwLTQgZmxleC1tZC1jb2x1bW4gYWxpZ24taXRlbXMtc3RhcnQgdGV4dC1kZWNvcmF0aW9uLW5vbmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYXRpbyByYXRpby0xNng5IG1iLTMgY2FyZC1tZWRpYV9faW1nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3NldEltYWdlfVwiIGxvYWRpbmc9XCJsYXp5XCIgY2xhc3M9XCJpbWctZmx1aWRcIiB3aWR0aD1cIjY2MFwiIGhlaWdodD1cIjMzMFwiIGFsdD1cIiR7cmVzdWx0LnRpdGxlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGZsZXgtcm93IGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiB3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aW1lIGNsYXNzPVwiZnMteHMgZnctYm9sZFwiIGRhdGV0aW1lPVwiJHtyZXN1bHQuZGF0ZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtyZXN1bHQuZGF0ZURpc3BsYXl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aW1lPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7c2V0Q2hpcH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwiaDYgbWItMlwiPiR7cmVzdWx0LnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImZzLXNtXCI+JHtyZXN1bHQuZGVzY3JpcHRpb259PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LmNoaWxkcmVuLmxlbmd0aCkge1xyXG5cclxuICAgICAgICAgICAgICAgICAgICByZXN1bHQuY2hpbGRyZW4uZm9yRWFjaCgocmVzdWx0Q2hpbGQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHNldENoaWxkSW1hZ2UgPSByZXN1bHRDaGlsZC50aHVtYm5haWxPdmVycmlkZSAhPT0gXCJcIiA/IHJlc3VsdENoaWxkLnRodW1ibmFpbE92ZXJyaWRlIDogYGh0dHBzOi8vaTMueXRpbWcuY29tL3ZpLyR7cmVzdWx0Q2hpbGQueW91VHViZUlkfS9tYXhyZXNkZWZhdWx0LmpwZ2A7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJSZXN1bHRzLmlubmVySFRNTCArPSAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1ibG9jayBjb2wtbWQtNiBjb2wtbGctNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIke3Jlc3VsdENoaWxkLnVybH1cIiBjbGFzcz1cImNhcmQgY2FyZC1tZWRpYSBwLTQgZmxleC1tZC1jb2x1bW4gYWxpZ24taXRlbXMtc3RhcnQgdGV4dC1kZWNvcmF0aW9uLW5vbmVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInJhdGlvIHJhdGlvLTE2eDkgbWItMyBjYXJkLW1lZGlhX19pbWdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzZXRDaGlsZEltYWdlfVwiIGxvYWRpbmc9XCJsYXp5XCIgY2xhc3M9XCJpbWctZmx1aWRcIiB3aWR0aD1cIjY2MFwiIGhlaWdodD1cIjMzMFwiIGFsdD1cIiR7cmVzdWx0Q2hpbGQudGl0bGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGZsZXgtcm93IGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiB3LTEwMFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRpbWUgY2xhc3M9XCJmcy14cyBmdy1ib2xkXCIgZGF0ZXRpbWU9XCIke3Jlc3VsdENoaWxkLmRhdGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtyZXN1bHRDaGlsZC5kYXRlRGlzcGxheX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGltZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImg2IG1iLTJcIj4ke3Jlc3VsdENoaWxkLnRpdGxlfTwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiZnMtc21cIj4ke3Jlc3VsdENoaWxkLmRlc2NyaXB0aW9ufTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmaWx0ZXJSZXN1bHRzLmlubmVySFRNTCA9IChgPGRpdiBjbGFzcz1cImQtYmxvY2sgY29sLW1kLTEwIG14LWF1dG8gaDUgdGV4dC1jZW50ZXJcIj5ObyByZXN1bHRzLiBUcnkgYWdhaW4uPC9kaXY+YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoYW5kbGVJbmRpY2F0b3JzKGZhbHNlLCByZXN1bHRzTG9hZGVyKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0IGhhbmRsZUNsZWFyUGFnaW5hdGlvbiA9IChwYWdpbmF0aW9uRWxlbWVudCkgPT4ge1xyXG5cclxuICAgICAgICBpZiAocGFnaW5hdGlvbkVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChwYWdpbmF0aW9uRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcudGFnTmFtZSA9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFnaW5hdGlvbkVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAocGFnaW5hdGlvbkVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50YWdOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgIH0gIFxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZVBhZ2luYXRpb24gPSAocGFnaW5hdGlvbkVsZW1lbnQsIHJlc3VsdFBhZ2VDb3VudCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCB0b3RhbFBhZ2VzID0gcGFyc2VJbnQocmVzdWx0UGFnZUNvdW50KTtcclxuXHJcbiAgICAgICAgaGFuZGxlQ2xlYXJQYWdpbmF0aW9uKHBhZ2luYXRpb25Db250YWluZXIpOy8vY2xlYXIgZmlyc3RcclxuXHJcbiAgICAgICAgLy9udW1iZXJlZCBwYWdlIGJ1dHRvbnNcclxuICAgICAgICBpZiAodG90YWxQYWdlcyA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxQYWdlczsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgYEdvIHRvIHBhZ2UgJHtpICsgMX1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFnZU51bWJlciA9PSAoaSArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcImN1cnJlbnRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9vbmx5IHNob3dzIHBhZ2luYXRpb24gbnVtYmVycyAtKzMgb2YgY3VycmVudCBmb3IgcmVzdWx0cyBtb3JlIHRoYW4gNyBwYWdlc1xyXG4gICAgICAgICAgICAgICAgaWYgKHRvdGFsUGFnZXMgPiA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChpIDwgcGFnZU51bWJlciAmJiBpID4gKHBhZ2VOdW1iZXIgLSA1KSkgfHwgKGkgPiAocGFnZU51bWJlciAtIDEpICYmIGkgPCAoKHBhZ2VOdW1iZXIgLSAxKSArIDQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKFwiZC1pbmxpbmUtYmxvY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsaS50ZXh0Q29udGVudCA9IGkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYWNrVG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbmV4dC9wcmV2IGJ1dHRvbnNcclxuICAgICAgICBpZiAodG90YWxQYWdlcyA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYWdlTnVtYmVyID4gMSkgeyAvL3Nob3cgcHJldmlvdXMgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgICAgIHByZXZCdG4uY2xhc3NMaXN0LmFkZChcImJ0bi1wcmV2XCIpO1xyXG4gICAgICAgICAgICAgICAgcHJldkJ0bi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIkdvIHRvIHByZXZpb3VzIHBhZ2VcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwYWdlTnVtYmVyIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYWNrVG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5iZWZvcmUocHJldkJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwYWdlTnVtYmVyIDwgdG90YWxQYWdlcykgeyAvL3Nob3cgbmV4dCBidXR0b25cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgbmV4dEJ0bi5jbGFzc0xpc3QuYWRkKFwiYnRuLW5leHRcIik7XHJcbiAgICAgICAgICAgICAgICBuZXh0QnRuLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiR28gdG8gbmV4dCBwYWdlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFja1RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQuYWZ0ZXIobmV4dEJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgY29uc3QgcG9zdFJlc3VsdHMgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUluZGljYXRvcnModHJ1ZSwgcmVzdWx0c0xvYWRlcik7XHJcblxyXG4gICAgICAgIGxldCBib2R5T2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBcInNlYXJjaFBocmFzZVwiOiBzZWFyY2hQaHJhc2UsXHJcbiAgICAgICAgICAgIFwibWVkaWFUeXBlXCI6IGRlY29kZVVSSUNvbXBvbmVudCh0eXBlKSwgLy9uZWVkIHRvIGRlY29kZSBmb3IgQVBJIHBvc3RcclxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiBcIlwiLFxyXG4gICAgICAgICAgICBcInBhZ2luYXRpb25cIjoge1xyXG4gICAgICAgICAgICAgICAgXCJwYWdlTnVtYmVyXCI6IHBhZ2VOdW1iZXIsXHJcbiAgICAgICAgICAgICAgICBcInBhZ2VTaXplXCI6IHBhZ2VTaXplXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gXCJcIiAmJiBzZWFyY2hQaHJhc2UgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgZmVhdHVyZWRIYW5kbGVyKHR5cGUsIHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVkSGFuZGxlcih0eXBlLCBmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBib2R5UmVxdWVzdCA9IEpTT04uc3RyaW5naWZ5KGJvZHlPYmplY3QpO1xyXG5cclxuICAgICAgICAvL2NvbnNvbGUubG9nKGJvZHlSZXF1ZXN0KVxyXG5cclxuICAgICAgICBmZXRjaChhcGlFbmRwb2ludFVybCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICAgICdBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW4nOiAnKidcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k6IFwibm8tcmVmZXJyZXJcIixcclxuICAgICAgICAgICAgYm9keTogYm9keVJlcXVlc3RcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHtcclxuXHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzLm11bHRpbWVkaWFJdGVtcyk7XHJcblxyXG4gICAgICAgICAgICByZW5kZXJSZXN1bHRzKHJlcy5tdWx0aW1lZGlhSXRlbXMpO1xyXG5cclxuICAgICAgICAgICB0b3RhbFJlc3VsdHMgPSByZXMuc2VhcmNoUmVzdWx0SW5mby50b3RhbFJlc3VsdHM7XHJcbiAgICAgICAgICAgdG90YWxSZXN1bHRQYWdlcyA9IE1hdGguY2VpbCh0b3RhbFJlc3VsdHMgLyBwYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgY3JlYXRlUGFnaW5hdGlvbihwYWdpbmF0aW9uQ29udGFpbmVyLCB0b3RhbFJlc3VsdFBhZ2VzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cmxIYW5kbGVyID0gKGlzdHlwZSkgPT4ge1xyXG5cclxuICAgICAgICBpZiAoaXN0eXBlKSB7IC8vdXNlcyB0eXBlIGJ1dHRvbnNcclxuICAgICAgICAgICAgdXJsUGFyYW1zLnNldCgndHlwZScsIHR5cGUpO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBpZDogYHR5cGUtJHt0eXBlfWAgfSwgJycsIGAke2xvY2F0aW9uLnBhdGhuYW1lfT90eXBlPSR7dHlwZX1gKTtcclxuICAgICAgICB9IGVsc2UgeyAvL3VzZXMgc2VhcmNoIGZpZWxkXHJcbiAgICAgICAgICAgIHVybFBhcmFtcy5zZXQoJ3NlYXJjaCcsIHNlYXJjaFBocmFzZSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7IGlkOiAnc2VhcmNoLXNlYXJjaFBocmFzZScgfSwgJycsIGAke2xvY2F0aW9uLnBhdGhuYW1lfT9zZWFyY2g9JHtzZWFyY2hQaHJhc2V9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNldEVsZW1lbnRzID0gKHJlc2V0Rm9ybSkgPT4ge1xyXG4gICAgICAgIGlmIChyZXNldEZvcm0pIHtcclxuICAgICAgICAgICAgc2VhcmNoRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID0gXCJcIjtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBidG5TdGF0ZXModHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vRXZlbnQgSGFuZGxlcnNcclxuXHJcbiAgICBmaWx0ZXJCdG5zLmZvckVhY2goKGZpbHRlckJ0bikgPT4ge1xyXG4gICAgICAgIGZpbHRlckJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgcmVzZXRFbGVtZW50cyh0cnVlKTtcclxuICAgICAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgc2VhcmNoUGhyYXNlID0gXCJcIjtcclxuICAgICAgICAgICAgdHlwZSA9IGZpbHRlckJ0bi52YWx1ZTtcclxuICAgICAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcblxyXG4gICAgICAgICAgICB1cmxIYW5kbGVyKHRydWUpO1xyXG4gICAgICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSlcclxuXHJcbiAgICBmaWx0ZXJEcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICByZXNldEVsZW1lbnRzKHRydWUpO1xyXG4gICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgc2VhcmNoUGhyYXNlID0gXCJcIjtcclxuICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuXHJcbiAgICAgICAgdHlwZSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHVybEhhbmRsZXIodHJ1ZSk7XHJcbiAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIHNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG5cclxuICAgICAgICB0eXBlID0gXCJcIjtcclxuICAgICAgICBjb25zdCB0ZXh0RmllbGQgPSBzZWFyY2hGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0Jyk7XHJcbiAgICAgICAgc2VhcmNoUGhyYXNlID0gdGV4dEZpZWxkLnZhbHVlO1xyXG4gICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICB1cmxIYW5kbGVyKGZhbHNlKTtcclxuICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvcFVybENhdFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcblxyXG4gICAgICAgIGlmIChwb3BVcmxDYXRQYXJhbXMuaGFzKFwidHlwZVwiKSkge1xyXG4gICAgICAgICAgICB0eXBlID0gcG9wVXJsQ2F0UGFyYW1zLmdldChcInR5cGVcIik7XHJcbiAgICAgICAgICAgIGZlYXR1cmVkSGFuZGxlcih0eXBlLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdHlwZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwb3BVcmxTZWFyY2hQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG5cclxuICAgICAgICBpZiAocG9wVXJsU2VhcmNoUGFyYW1zLmhhcyhcInNlYXJjaFwiKSkge1xyXG4gICAgICAgICAgICBzZWFyY2hQaHJhc2UgPSBwb3BVcmxTZWFyY2hQYXJhbXMuZ2V0KFwic2VhcmNoXCIpO1xyXG4gICAgICAgICAgICBzZWFyY2hGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUgPSBzZWFyY2hQaHJhc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VhcmNoUGhyYXNlID0gXCJcIjtcclxuICAgICAgICAgICAgcmVzZXRFbGVtZW50cyh0cnVlKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcblxyXG4gICAgfSk7XHJcbiAgICBcclxuICAgIC8vIG9ucGFnZSBsb2FkXHJcbiAgICBpZiAodXJsUGFyYW1zLmhhcyhcInNlYXJjaFwiKSkge1xyXG4gICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcblxyXG4gICAgICAgIHR5cGUgPSBcIlwiO1xyXG4gICAgICAgIHNlYXJjaFBocmFzZSA9IHVybFBhcmFtcy5nZXQoXCJzZWFyY2hcIik7XHJcbiAgICAgICAgc2VhcmNoRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID0gc2VhcmNoUGhyYXNlO1xyXG4gICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG5cclxuICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuICAgICAgICBjcmVhdGVQYWdpbmF0aW9uKHBhZ2luYXRpb25Db250YWluZXIsIGZpbHRlclJlc3VsdHMuZGF0YXNldC5jYXR0b3RhbCk7XHJcbiAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgIH1cclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBtdWx0aW1lZGlhRmlsdGVyczsiLCAiXHVGRUZGLy9odHRwczovL2dpdGh1Yi5jb20vdmt1cmtvL2NhbGVuZGFyIFxyXG5cclxuY29uc3QgY2FsZW5kYXIgPSAoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgY2FsZW5kYXJDb250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImVjXCIpO1xyXG4gICAgY29uc3QgY2FsZW5kYXJGaWx0ZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qcy1jYWxlbmRhci1maWx0ZXJzXCIpO1xyXG4gICAgY29uc3QgYXBpRW5kcG9pbnRVcmwgPSBcIi9HZXRQcm9kdWN0c1wiO1xyXG4gICAgY29uc3Qgc3R5bGVTZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtZmlsdGVyLXN0eWxlcycpO1xyXG5cclxuICAgIGxldCBib2R5T2JqZWN0ID0ge1xyXG4gICAgICAgIFwicHJvZHVjdFR5cGVcIjogXCJFdmVudHNcIixcclxuICAgICAgICBcImNhdGVnb3J5XCI6IFwiXCIsXHJcbiAgICAgICAgXCJzdWJDYXRlZ29yeVwiOiBcIlwiLFxyXG4gICAgICAgIFwidGF4b25vbXlcIjogXCJcIixcclxuICAgICAgICBcInBhZ2luYXRpb25cIjoge1xyXG4gICAgICAgICAgICBcInBhZ2VOdW1iZXJcIjogMSxcclxuICAgICAgICAgICAgXCJwYWdlU2l6ZVwiOiAxMDBcclxuICAgICAgICB9XHJcbiAgICB9O1xyXG4gICBcclxuICAgIGNvbnN0IGJvZHlSZXF1ZXN0ID0gSlNPTi5zdHJpbmdpZnkoYm9keU9iamVjdCk7XHJcblxyXG4gICAgY29uc3QgZ2V0VmFsdWUgPSAoY2hlY2tCb3hlcykgPT4ge1xyXG5cclxuICAgICAgICBzdHlsZVNldC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgICAgICBjaGVja0JveGVzLmZvckVhY2goKGNoZWNrQm94KSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghY2hlY2tCb3guY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgc3R5bGVTZXQuaW5uZXJIVE1MICs9IChgW2RhdGEtcmVzb3VyY2U9XCIke2NoZWNrQm94LnZhbHVlfVwiXSB7IG9wYWNpdHk6IDAgfWApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgc3R5bGVTZXQuaW5uZXJIVE1MICs9IChgW2RhdGEtcmVzb3VyY2U9XCIke2NoZWNrQm94LnZhbHVlfVwiXSB7IG9wYWNpdHk6IDEgfWApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmV3IEV2ZW50Q2FsZW5kYXIoY2FsZW5kYXJDb250YWluZXIsIHtcclxuICAgICAgICB2aWV3OiAnZGF5R3JpZE1vbnRoJyxcclxuICAgICAgICBoZWFkZXJUb29sYmFyOiB7XHJcbiAgICAgICAgICAgIHN0YXJ0OiAncHJldixuZXh0IHRvZGF5JyxcclxuICAgICAgICAgICAgY2VudGVyOiAndGl0bGUnLFxyXG4gICAgICAgICAgICBlbmQ6ICdkYXlHcmlkTW9udGgsdGltZUdyaWRXZWVrLHRpbWVHcmlkRGF5LGxpc3RXZWVrIHJlc291cmNlVGltZUdyaWRXZWVrJ1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgYnV0dG9uVGV4dDogZnVuY3Rpb24gKHRleHRzKSB7XHJcbiAgICAgICAgICAgIHRleHRzLnJlc291cmNlVGltZUdyaWRXZWVrID0gJ3Jlc291cmNlcyc7XHJcbiAgICAgICAgICAgIHJldHVybiB0ZXh0cztcclxuICAgICAgICB9LFxyXG4gICAgICAgIHJlc291cmNlczogd2luZG93LnNldFJlc291cmNlcyxcclxuICAgICAgICBzY3JvbGxUaW1lOiAnMDk6MDA6MDAnLFxyXG4gICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgIHRpbWVHcmlkV2VlazogeyBwb2ludGVyOiB0cnVlIH0sXHJcbiAgICAgICAgICAgIHJlc291cmNlVGltZUdyaWRXZWVrOiB7IHBvaW50ZXI6IHRydWUgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbm93SW5kaWNhdG9yOiB0cnVlLFxyXG4gICAgICAgIGV2ZW50Q2xhc3NOYW1lczogWyd3cmEtZXZlbnQnXSxcclxuICAgICAgICBzZWxlY3RhYmxlOiBmYWxzZSxcclxuICAgICAgICBlZGl0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgZXZlbnRTdGFydEVkaXRhYmxlOiBmYWxzZSwgLy8gbmVlZCB0byBkaXNhYmxlIGV2ZW50IGRyb3AgbidkcmFnXHJcbiAgICAgICAgZXZlbnREdXJhdGlvbkVkaXRhYmxlOiBmYWxzZSwgLy8gbmVlZCB0byBkaXNhYmxlIGV2ZW50IGRyb3AgbidkcmFnXHJcbiAgICAgICAgZXZlbnRTb3VyY2VzOiBbXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50czogZnVuY3Rpb24gKGZldGNoSW5mbywgc3VjY2Vzc0NhbGxiYWNrLCBmYWlsdXJlQ2FsbGJhY2spIHsgXHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoKGFwaUVuZHBvaW50VXJsLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogXCJjb3JzXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZWZlcnJlclBvbGljeTogXCJuby1yZWZlcnJlclwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYm9keTogYm9keVJlcXVlc3RcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5sb2cocmVzKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN1Y2Nlc3NDYWxsYmFjayhyZXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgZXZlbnREaWRNb3VudDogZnVuY3Rpb24gKGluZm8pIHsgLy9hZGRpbmcgZGF0YSBpZCBhdHRyaWJ1dGUgdG8gZWFjaCBldmVudFxyXG5cclxuICAgICAgICAgICAgY29uc3QgZ2V0RXZlbnRzUmVzb3VyY2VJZCA9IGluZm8uZXZlbnQucmVzb3VyY2VJZHNbMF0gIT09IHVuZGVmaW5lZCA/IGluZm8uZXZlbnQucmVzb3VyY2VJZHNbMF0udG9TdHJpbmcoKSA6IG51bGw7XHJcblxyXG4gICAgICAgICAgICBpZiAoIWluZm8uZWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1yZXNvdXJjZVwiKSAmJiBnZXRFdmVudHNSZXNvdXJjZUlkICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpbmZvLmVsLnNldEF0dHJpYnV0ZShcImRhdGEtcmVzb3VyY2VcIiwgZ2V0RXZlbnRzUmVzb3VyY2VJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGxvYWRpbmc6IGZ1bmN0aW9uIChpc0xvYWRpbmcpIHtcclxuICAgICAgICAgICAvLyBjb25zb2xlLmxvZyhpc0xvYWRpbmcpO1xyXG5cclxuICAgICAgICAgICAgaWYgKGlzTG9hZGluZyA9PSBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJsb2FkaW5nIGRvbmVcIik7XHJcbiAgICAgICAgICAgICAgICAvL3JlbW92ZSBpZiBleGlzdHNcclxuICAgICAgICAgICAgICAgIGNhbGVuZGFyRmlsdGVycy5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYnVpbGQgb3V0IFxyXG4gICAgICAgICAgICAgICAgc2V0UmVzb3VyY2VzLmZvckVhY2goKHJlc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2FsZW5kYXJGaWx0ZXJzLmlubmVySFRNTCArPSAoXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNhbGVuZGFyLWZpbHRlciBkLWZsZXggZmxleC1yb3cgZ2FwLTMgcm91bmRlZCBwLTEgcHMtMiBtYi0zIHRleHQtd2hpdGVcIiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6JHtyZXNvdXJjZS5ldmVudEJhY2tncm91bmRDb2xvcn1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIiR7cmVzb3VyY2UuaWR9XCIgbmFtZT1cInJlc291cmNlXCIgY2xhc3M9XCJqcy1jYWxlbmRhci1maWx0ZXIgZm9ybS1jaGVjay1pbnB1dFwiIGNoZWNrZWQgdmFsdWU9XCIke3Jlc291cmNlLmlkfVwiIC8+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb3JtLWNoZWNrLWxhYmVsXCIgZm9yPVwiJHtyZXNvdXJjZS5pZH1cIj4ke3Jlc291cmNlLnRpdGxlfTwvbGFiZWw+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vYXR0YWNoIGV2ZW50IGhhbmRsZXJzXHJcbiAgICAgICAgICAgICAgICBjYWxlbmRhckZpbHRlcnMuYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGdldFZhbHVlKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1jYWxlbmRhci1maWx0ZXInKSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGV2ZW50Q2xpY2s6IGZ1bmN0aW9uIChpbmZvKSB7IC8vIGhhbmRsZXMgb3BlbmluZyBldmVudCBpbnRvIG5ldyB0YWJcclxuICAgICAgICAgICAgaWYgKGluZm8uZXZlbnQuZXh0ZW5kZWRQcm9wcyAhPT0gXCJcIiB8fCBpbmZvLmV2ZW50LmV4dGVuZGVkUHJvcHMgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5vcGVuKGluZm8uZXZlbnQuZXh0ZW5kZWRQcm9wcywgJ19ibGFuaycpLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIH0gXHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgY2FsZW5kYXI7XHJcblxyXG5cclxuXHJcbiIsICJjb25zdCBxdWFudGl0eVNlbGVjdG9yID0gKCkgPT4ge1xyXG4gICAgY29uc3QgcXVhbnRpdHlTZWxlY3RvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtcXVhbnRpdHktc2VsZWN0b3InKTtcclxuXHJcbiAgICBpZiAoIXF1YW50aXR5U2VsZWN0b3JzLmxlbmd0aCkgcmV0dXJuO1xyXG5cclxuICAgIHF1YW50aXR5U2VsZWN0b3JzLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgY29uc3QgcXVhbnRpdHlJbnB1dCA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmpzLXF1YW50aXR5LXNlbGVjdG9yLWlucHV0Jyk7XHJcbiAgICAgICAgY29uc3QgaW5jcmVtZW50QnRuID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuanMtcXVhbnRpdHktc2VsZWN0b3ItaW5jcmVtZW50Jyk7XHJcbiAgICAgICAgY29uc3QgZGVjcmVtZW50QnRuID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuanMtcXVhbnRpdHktc2VsZWN0b3ItZGVjcmVtZW50Jyk7XHJcblxyXG4gICAgICAgIGluY3JlbWVudEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcXVhbnRpdHlJbnB1dC52YWx1ZSsrO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkZWNyZW1lbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChxdWFudGl0eUlucHV0LnZhbHVlID4gMSkge1xyXG4gICAgICAgICAgICAgICAgcXVhbnRpdHlJbnB1dC52YWx1ZS0tO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcXVhbnRpdHlTZWxlY3RvcjsiLCAiY29uc3QgY2hlY2tvdXQgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBzdGF0ZURyb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNoZWNrb3V0LXN0YXRlJyk7XHJcbiAgICBjb25zdCBjb3VudHlGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jaGVja291dC1jb3VudHknKTtcclxuICAgIFxyXG4gICAgaWYgKHN0YXRlRHJvcGRvd24pIHtcclxuICAgICAgICBzdGF0ZURyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52YWx1ZSA9PSAnV0knKSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudHlGaWVsZC5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvdW50eUZpZWxkLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8vXHJcblxyXG4gICAgY29uc3QgYmlsbGluZ0FkZHJlc3NSYWRpbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1hbHQtYmlsbGluZy1hZGRyZXNzJyk7XHJcbiAgICBjb25zdCBiaWxsaW5nQWRkcmVzc0ZpZWxkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1hbHQtYmlsbGluZy1hZGRyZXNzLWZpZWxkcycpO1xyXG5cclxuICAgIGlmIChiaWxsaW5nQWRkcmVzc1JhZGlvKSB7XHJcbiAgICAgICAgYmlsbGluZ0FkZHJlc3NSYWRpby5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoYmlsbGluZ0FkZHJlc3NSYWRpby5jaGVja2VkKSB7XHJcbiAgICAgICAgICAgICAgICBiaWxsaW5nQWRkcmVzc0ZpZWxkcy5jbGFzc0xpc3QucmVtb3ZlKCdkLW5vbmUnKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJpbGxpbmdBZGRyZXNzRmllbGRzLmNsYXNzTGlzdC5hZGQoJ2Qtbm9uZScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNoZWNrb3V0OyIsICJjb25zdCBwcm9kdWN0cyA9ICgpID0+IHtcclxuXHJcbiAgICAvL0RPTSBwcmVzZW50YXRpb24gZWxlbWVudHNcclxuICAgIGNvbnN0IHByb2R1Y3RSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXByb2R1Y3QtY29sbGVjdGlvbicpO1xyXG4gICAgY29uc3QgY29sbGVjdGlvblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNvbGxlY3Rpb24tdGl0bGUnKTtcclxuICAgIGNvbnN0IGxpc3RpbmdzVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbGlzdGluZ3MtdGl0bGUnKTtcclxuICAgIGNvbnN0IGN1cnJlbnRCcmVhZGNydW1iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWJyZWFkY3J1bWItY3VycmVudCcpO1xyXG4gICAgY29uc3QgcmVzdWx0c0xvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1yZXN1bHRzLWxvYWRlcicpO1xyXG5cclxuXHJcbiAgICAvL0RPTSBldmVudCBlbGVtZW50c1xyXG4gICAgY29uc3QgcHJvZHVjdENhdGVnb3J5RHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY29sbGVjdGlvbi1jYXRlZ29yeS1maWx0ZXInKTtcclxuICAgIGNvbnN0IHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNvbGxlY3Rpb24tc3ViY2F0ZWdvcnktZmlsdGVyJyk7XHJcbiAgICBjb25zdCBwcm9kdWN0U3ViQ2F0ZWdvcnlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY29sbGVjdGlvbi1zdWJjYXRlZ29yeS1jb250YWluZXInKTtcclxuXHJcbiAgICAvL1N0YXRpYyB2YXJzXHJcbiAgICBjb25zdCBhcGlFbmRwb2ludFVybCA9IFwiL0dldFByb2R1Y3RzXCI7XHJcbiAgICBsZXQgcGFnZU51bWJlciA9IDE7XHJcbiAgICBjb25zdCBwYWdlU2l6ZSA9IDEwMDtcclxuICAgIGxldCBzdWJjYXRlZ29yeUFycmF5ID0gW1wiQWxsXCJdO1xyXG5cclxuICAgIC8vVXJsc1xyXG5cclxuICAgIGNvbnN0IHdpbmRvd0xvYWRRdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvd0xvYWRRdWVyeVN0cmluZyk7XHJcblxyXG4gICAgbGV0IHR5cGUgPSBcIlwiO1xyXG5cclxuICAgIGlmICh1cmxQYXJhbXMuaGFzKFwidHlwZVwiKSkge1xyXG4gICAgICAgIHR5cGUgPSB1cmxQYXJhbXMuZ2V0KFwidHlwZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgc3ViY2F0ZWdvcnkgPSBcIlwiOyBcclxuXHJcbiAgICBpZiAodXJsUGFyYW1zLmhhcyhcInN1YmNhdGVnb3J5XCIpKSB7XHJcbiAgICAgICAgc3ViY2F0ZWdvcnkgPSB1cmxQYXJhbXMuZ2V0KFwic3ViY2F0ZWdvcnlcIik7XHJcbiAgICB9XHJcbiAgICBcclxuICAgIGxldCBjYXRlZ29yeSA9IFwiXCI7XHJcblxyXG4gICAgaWYgKHVybFBhcmFtcy5oYXMoXCJjYXRlZ29yeVwiKSkge1xyXG4gICAgICAgIGNhdGVnb3J5ID0gdXJsUGFyYW1zLmdldChcImNhdGVnb3J5XCIpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vUmVzdWx0c1xyXG5cclxuICAgIGNvbnN0IGhhbmRsZUluZGljYXRvcnMgPSAoc2hvdywgd2FpdExvYWRlckVsZW1lbnQpID0+IHtcclxuICAgICAgICBpZiAoc2hvdyA9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHdhaXRMb2FkZXJFbGVtZW50LmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdhaXRMb2FkZXJFbGVtZW50LmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHJlbmRlclJlc3VsdHMgPSAocmVzdWx0cykgPT4ge1xyXG5cclxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7XHJcblxyXG4gICAgICAgICAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIC8vSG93IHdlIGRldGVybWluZSBidXR0b24gZGlzcGxheSB0ZXh0P1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0Q1RBID0gcmVzdWx0LnRheG9ub215ID09IFwiUmVmZXJlbmNlIE1hbnVhbHNcIiB8fCByZXN1bHQudGF4b25vbXkgPT0gXCJCb29rc1wiID8gYDxhIGhyZWY9XCIke3Jlc3VsdC51cmx9XCIgaWQ9XCJhZGQtdG8tY2FydFwiIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnkgYnRuLXNtIGJvcmRlci0wICBmbGV4LWdyb3ctMVwiPkFkZCBUbyBDYXJ0PC9hPmAgOiBgPGEgaHJlZj1cIiR7cmVzdWx0LnVybH1cIiBpZD1cInZpZXctcHJvZHVjdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbSBmbGV4LWdyb3ctMVwiPlZpZXcgUHJvZHVjdDwvYT5gO1xyXG5cclxuICAgICAgICAgICAgICAgIHByb2R1Y3RSZXN1bHRzLmlubmVySFRNTCArPSAoXHJcbiAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtbWQtNiBjb2wtbGctNFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiY2FyZC1jbGFzcyBiZy1saWdodCBwLTQgaC0xMDAgZC1mbGV4IGZsZXgtY29sdW1uIGFsaWduLWl0ZW1zLXN0YXJ0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImZzLXhzXCI+Q2xhc3MgPHNwYW4gY2xhc3M9XCJmdy1ib2xkXCI+Q3JlZGl0IEhvdXJzOiBYWFhYPC9zcGFuPjwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiZC1pbmxpbmUtYmxvY2sgbWItNCBweC0yIHB5LTEgYmctd2hpdGUgZnctc2VtaWJvbGQgZnMtc20gdGV4dC11cHBlcmNhc2VcIj4ke3Jlc3VsdC50YXhvbm9teX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJmcy1sZyB0ZXh0LWNhcGl0YWxpemUgZnctc2VtaWJvbGQgbWItNFwiPiR7cmVzdWx0LnRpdGxlfTwvaDM+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtYmxvY2sgbWItMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaDMgZnctYm9sZFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Jlc3VsdC5tZW1iZXJQcmljZX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcy1zbVwiIHN0eWxlPVwiY29sb3I6IHZhcigtLWJzLWdyYXktMzApXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICZuYnNwO21lbWJlciBwcmljaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1ibG9jayBmcy1zbSBtYi0wXCIgc3R5bGU9XCJjb2xvcjogdmFyKC0tYnMtZ3JheS0zMClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Jlc3VsdC5wcmljZX0gJm5ic3A7bm9uLW1lbWJlciBwcmljaW5nXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IHNlbGYtYWxpZ24tZW5kIGZsZXgtY29sdW1uIGZsZXgtbWQtcm93IGFsaWduLWl0ZW1zLWNlbnRlciBnYXAtMyBtdC1hdXRvIHB0LTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3NldENUQX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5zdWJDYXRlZ29yeSAhPSBcIkFsbFwiICYmICFzdWJjYXRlZ29yeUFycmF5LmluY2x1ZGVzKHJlc3VsdC5zdWJDYXRlZ29yeSwgc3ViY2F0ZWdvcnlBcnJheSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeUFycmF5LnB1c2gocmVzdWx0LnN1YkNhdGVnb3J5KTtcclxuICAgICAgICAgICAgICAgICAgICBwb3B1bGF0ZVN1YkNhdGVnb3JpZXMoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9kdWN0UmVzdWx0cy5pbm5lckhUTUwgPSAoYDxkaXYgY2xhc3M9XCJkLWJsb2NrIGNvbC1tZC0xMCBteC1hdXRvIGg1IHRleHQtY2VudGVyXCI+Tm8gcmVzdWx0cy4gVHJ5IGFnYWluLjwvZGl2PmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGFuZGxlSW5kaWNhdG9ycyhmYWxzZSwgcmVzdWx0c0xvYWRlcik7XHJcbiAgICAgICAgY29uc29sZS5sb2coc3ViY2F0ZWdvcnlBcnJheSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcG9wdWxhdGVTdWJDYXRlZ29yaWVzID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93bi5pbm5lckhUTUwgPSBcIlwiOy8vY2xlYXIgPG9wdGlvbj4gdGFnc1xyXG5cclxuICAgICAgICBpZiAoc3ViY2F0ZWdvcnlBcnJheS5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeUNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvZHVjdFN1YkNhdGVnb3J5Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBcImhpZGRlblwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1YmNhdGVnb3J5QXJyYXkuZm9yRWFjaCgoc3ViQ2F0T3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLmlubmVySFRNTCArPSAoXHJcbiAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiJHtzdWJDYXRPcHRpb259XCI+JHtzdWJDYXRPcHRpb259PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcG9zdFJlc3VsdHMgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUluZGljYXRvcnModHJ1ZSwgcmVzdWx0c0xvYWRlcik7XHJcbiAgICAgICAgdXBkYXRlRG9tRWxlbWVudHMoY2F0ZWdvcnkpO1xyXG5cclxuICAgICAgICBsZXQgYm9keU9iamVjdCA9IHtcclxuICAgICAgICAgICAgXCJwcm9kdWN0VHlwZVwiOiBkZWNvZGVVUklDb21wb25lbnQodHlwZSksIC8vRXZlbnRzLCBQcm9kdWN0cywgQ291cnNlc1xyXG4gICAgICAgICAgICBcImNhdGVnb3J5XCI6IGRlY29kZVVSSUNvbXBvbmVudChjYXRlZ29yeSksIC8vUHJvZmVzc2lvbmFsIERldmVsb3BtZW50LCBQdWJsaWNhdGlvbnMsIENvbmZlcmVuY2VzL0NvbnZlbnRpb25zLCBldGMuXHJcbiAgICAgICAgICAgIFwic3ViQ2F0ZWdvcnlcIjogZGVjb2RlVVJJQ29tcG9uZW50KHN1YmNhdGVnb3J5ID09IFwiQWxsXCIgPyBcIlwiIDogc3ViY2F0ZWdvcnkpLC8vY2hpbGRyZW4gb2YgY2F0ZWdvcnlcclxuICAgICAgICAgICAgXCJ0YXhvbm9teVwiOiBcIlwiLC8vUmVmZXJlbmNlIE1hbnVhbHMsIEJvb2tzLCBWaXJ0dWFsLCBldGMuXHJcbiAgICAgICAgICAgIFwicGFnaW5hdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInBhZ2VOdW1iZXJcIjogcGFnZU51bWJlcixcclxuICAgICAgICAgICAgICAgIFwicGFnZVNpemVcIjogcGFnZVNpemVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGJvZHlSZXF1ZXN0ID0gSlNPTi5zdHJpbmdpZnkoYm9keU9iamVjdCk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKGJvZHlSZXF1ZXN0KTtcclxuXHJcbiAgICAgICAgZmV0Y2goYXBpRW5kcG9pbnRVcmwsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBtb2RlOiBcImNvcnNcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZWZlcnJlclBvbGljeTogXCJuby1yZWZlcnJlclwiLFxyXG4gICAgICAgICAgICBib2R5OiBib2R5UmVxdWVzdFxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICByZW5kZXJSZXN1bHRzKHJlcyk7XHJcblxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGtpbGxSZXN1bHRzID0gKCkgPT4ge1xyXG4gICAgICAgIHByb2R1Y3RSZXN1bHRzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXJsSGFuZGxlciA9IChpc0NhdGVnb3J5LCBpc1N1YkNhdGVnb3J5KSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChpc0NhdGVnb3J5ICYmICFpc1N1YkNhdGVnb3J5KSB7XHJcbiAgICAgICAgICAgIHVybFBhcmFtcy5zZXQoJ2NhdGVnb3J5JywgY2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBpZDogYCR7dHlwZX0tY2F0ZWdvcnktJHtjYXRlZ29yeX1gIH0sICcnLCBgJHtsb2NhdGlvbi5wYXRobmFtZX0/dHlwZT0ke3R5cGV9JmNhdGVnb3J5PSR7Y2F0ZWdvcnl9YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaXNDYXRlZ29yeSAmJiBpc1N1YkNhdGVnb3J5KSB7XHJcbiAgICAgICAgICAgIHVybFBhcmFtcy5zZXQoJ2NhdGVnb3J5JywgY2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICB1cmxQYXJhbXMuc2V0KCdzdWJjYXRlZ29yeScsIHN1YmNhdGVnb3J5KTtcclxuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHsgaWQ6IGAke3R5cGV9LWNhdGVnb3J5LSR7Y2F0ZWdvcnl9c3ViY2F0ZWdvcnktJHtzdWJjYXRlZ29yeX1gIH0sICcnLCBgJHtsb2NhdGlvbi5wYXRobmFtZX0/dHlwZT0ke3R5cGV9JmNhdGVnb3J5PSR7Y2F0ZWdvcnl9JnN1YmNhdGVnb3J5PSR7c3ViY2F0ZWdvcnl9YCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXBkYXRlRG9tRWxlbWVudHMgPSAodGl0bGVUZXh0KSA9PiB7XHJcbiAgICAgICAgY29sbGVjdGlvblRpdGxlLmlubmVySFRNTCA9IHRpdGxlVGV4dDtcclxuICAgICAgICBjdXJyZW50QnJlYWRjcnVtYi5pbm5lckhUTUwgPSB0aXRsZVRleHQ7XHJcbiAgICAgICAgbGlzdGluZ3NUaXRsZS5pbm5lckhUTUwgPSB0aXRsZVRleHQ7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzZXREcm9wZG93biA9IChkcm9wZG93bkVsZW1lbnQsIHNldFZhbHVlKSA9PiB7XHJcbiAgICAgICAgZHJvcGRvd25FbGVtZW50LnZhbHVlID0gc2V0VmFsdWU7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vRXZlbnQgSGFuZGxlcnNcclxuICAgIGlmIChwcm9kdWN0Q2F0ZWdvcnlEcm9wZG93bikge1xyXG5cclxuICAgICAgICBwcm9kdWN0Q2F0ZWdvcnlEcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcblxyXG4gICAgICAgICAgICBjYXRlZ29yeSA9IGUudGFyZ2V0LnZhbHVlO1xyXG5cclxuICAgICAgICAgICAgLy9jbGVhcmluZyBzdWJjYXRlZ29yeSBkcm9wZG93blxyXG4gICAgICAgICAgICBzdWJjYXRlZ29yeSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHN1YmNhdGVnb3J5QXJyYXkgPSBbXCJBbGxcIl07XHJcbiAgICAgICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLmlubmVySFRNTCA9IFwiXCI7Ly9jbGVhciA8b3B0aW9uPiB0YWdzXHJcblxyXG4gICAgICAgICAgICBpZiAocHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24pIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0RHJvcGRvd24ocHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24sIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICB1cmxIYW5kbGVyKHRydWUsIGZhbHNlKTtcclxuICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICBpZiAocHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24pIHtcclxuXHJcbiAgICAgICAgcHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICBraWxsUmVzdWx0cygpO1xyXG5cclxuICAgICAgICAgICAgdXBkYXRlRG9tRWxlbWVudHMoY2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICBzdWJjYXRlZ29yeSA9IGUudGFyZ2V0LnZhbHVlOztcclxuXHJcbiAgICAgICAgICAgIHVybEhhbmRsZXIodHJ1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcblxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcblxyXG4gICAgICAgIGNvbnN0IHBvcFVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93LmxvY2F0aW9uLnNlYXJjaCk7XHJcblxyXG4gICAgICAgIGlmIChwb3BVcmxQYXJhbXMuaGFzKFwiY2F0ZWdvcnlcIikgJiYgIXBvcFVybFBhcmFtcy5oYXMoXCJzdWJjYXRlZ29yeVwiKSkge1xyXG5cclxuICAgICAgICAgICAgY2F0ZWdvcnkgPSBwb3BVcmxQYXJhbXMuZ2V0KFwiY2F0ZWdvcnlcIik7XHJcbiAgICAgICAgICAgIHJlc2V0RHJvcGRvd24ocHJvZHVjdENhdGVnb3J5RHJvcGRvd24sIGNhdGVnb3J5KTtcclxuICAgICAgICAgICAgcmVzZXREcm9wZG93bihwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93biwgXCJBbGxcIik7XHJcblxyXG5cclxuICAgICAgICB9IGVsc2UgaWYgKHBvcFVybFBhcmFtcy5oYXMoXCJjYXRlZ29yeVwiKSAmJiBwb3BVcmxQYXJhbXMuaGFzKFwic3ViY2F0ZWdvcnlcIikpIHtcclxuXHJcbiAgICAgICAgICAgIGNhdGVnb3J5ID0gcG9wVXJsUGFyYW1zLmdldChcImNhdGVnb3J5XCIpO1xyXG4gICAgICAgICAgICBzdWJjYXRlZ29yeSA9IHBvcFVybFBhcmFtcy5nZXQoXCJzdWJjYXRlZ29yeVwiKTtcclxuICAgICAgICAgICAgcmVzZXREcm9wZG93bihwcm9kdWN0Q2F0ZWdvcnlEcm9wZG93biwgY2F0ZWdvcnkpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duKSB7XHJcbiAgICAgICAgICAgICAgICByZXNldERyb3Bkb3duKHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLCBzdWJjYXRlZ29yeSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2F0ZWdvcnkgPSBcIlwiO1xyXG4gICAgICAgICAgICBzdWJjYXRlZ29yeSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJlc2V0RHJvcGRvd24ocHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24sIFwiQWxsXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxuICAgIH0pO1xyXG5cclxuICAgIC8vUGFnZSBMb2FkXHJcblxyXG4gICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwcm9kdWN0czsiLCAiY29uc3QgY291cnNlU2VhcmNoID0gKCkgPT4ge1xyXG5cclxuICAgIC8vRE9NIHByZXNlbnRhdGlvbiBlbGVtZW50c1xyXG4gICAgY29uc3QgcmVzdWx0c0xvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1yZXN1bHRzLWxvYWRlci1jb3Vyc2VzJyk7XHJcbiAgICBjb25zdCBjb3Vyc2VTZWFyY2hGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdXJzZS1zZWFyY2gnKTtcclxuXHJcbiAgICAvL0RPTSBldmVudCBlbGVtZW50c1xyXG4gICAgY29uc3QgcHJvZHVjdENhdGVnb3J5RHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY291cnNlcy1jYXRlZ29yeS1maWx0ZXInKTtcclxuICAgIGNvbnN0IHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNvdXJzZXMtc3ViY2F0ZWdvcnktZmlsdGVyJyk7XHJcbiAgICBjb25zdCBwcm9kdWN0U3ViQ2F0ZWdvcnlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY291cnNlcy1zdWJjYXRlZ29yeS1jb250YWluZXInKTtcclxuXHJcbiAgICAvL1N0YXRpYyB2YXJzXHJcbiAgICBjb25zdCBhY3Rpb25Jbml0aWFsID0gY291cnNlU2VhcmNoRm9ybS5nZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIik7XHJcbiAgICBjb25zdCBhcGlFbmRwb2ludFVybCA9IFwiL0dldFByb2R1Y3RzXCI7XHJcbiAgICBsZXQgcGFnZU51bWJlciA9IDE7XHJcbiAgICBjb25zdCBwYWdlU2l6ZSA9IDEwMDtcclxuICAgIGxldCBzdWJjYXRlZ29yeUFycmF5ID0gW1wiQWxsXCJdO1xyXG5cclxuICAgIGxldCBjYXRlZ29yeSA9IFwiXCI7XHJcbiAgICBsZXQgc3ViY2F0ZWdvcnkgPSBcIlwiOyBcclxuXHJcbiAgICAvL1Jlc3VsdHNcclxuXHJcbiAgICBjb25zdCBoYW5kbGVJbmRpY2F0b3JzID0gKHNob3csIHdhaXRMb2FkZXJFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHNob3cgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB3YWl0TG9hZGVyRWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3YWl0TG9hZGVyRWxlbWVudC5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJSZXN1bHRzID0gKHJlc3VsdHMpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3ViQ2F0ZWdvcnkgIT0gXCJBbGxcIiAmJiAhc3ViY2F0ZWdvcnlBcnJheS5pbmNsdWRlcyhyZXN1bHQuc3ViQ2F0ZWdvcnksIHN1YmNhdGVnb3J5QXJyYXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnlBcnJheS5wdXNoKHJlc3VsdC5zdWJDYXRlZ29yeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9wdWxhdGVTdWJDYXRlZ29yaWVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGFuZGxlSW5kaWNhdG9ycyhmYWxzZSwgcmVzdWx0c0xvYWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcG9wdWxhdGVTdWJDYXRlZ29yaWVzID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93bi5pbm5lckhUTUwgPSBcIlwiOy8vY2xlYXIgPG9wdGlvbj4gdGFnc1xyXG5cclxuICAgICAgICBpZiAoc3ViY2F0ZWdvcnlBcnJheS5sZW5ndGggPiAxICYmIGNhdGVnb3J5ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeUNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvZHVjdFN1YkNhdGVnb3J5Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBcImhpZGRlblwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1YmNhdGVnb3J5QXJyYXkuZm9yRWFjaCgoc3ViQ2F0T3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLmlubmVySFRNTCArPSAoXHJcbiAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiJHtzdWJDYXRPcHRpb259XCI+JHtzdWJDYXRPcHRpb259PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcG9zdFJlc3VsdHMgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUluZGljYXRvcnModHJ1ZSwgcmVzdWx0c0xvYWRlcik7XHJcblxyXG4gICAgICAgIGxldCBib2R5T2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBcInByb2R1Y3RUeXBlXCI6IFwiQ291cnNlc1wiLCAvL0V2ZW50cywgUHJvZHVjdHMsIENvdXJzZXNcclxuICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiBjYXRlZ29yeSwgLy9Qcm9mZXNzaW9uYWwgRGV2ZWxvcG1lbnQsIFB1YmxpY2F0aW9ucywgQ29uZmVyZW5jZXMvQ29udmVudGlvbnMsIGV0Yy5cclxuICAgICAgICAgICAgXCJzdWJDYXRlZ29yeVwiOiBzdWJjYXRlZ29yeSA9PSBcIkFsbFwiID8gXCJcIiA6IHN1YmNhdGVnb3J5LC8vY2hpbGRyZW4gb2YgY2F0ZWdvcnlcclxuICAgICAgICAgICAgXCJ0YXhvbm9teVwiOiBcIlwiLC8vUmVmZXJlbmNlIE1hbnVhbHMsIEJvb2tzLCBWaXJ0dWFsLCBldGMuXHJcbiAgICAgICAgICAgIFwicGFnaW5hdGlvblwiOiB7XHJcbiAgICAgICAgICAgICAgICBcInBhZ2VOdW1iZXJcIjogcGFnZU51bWJlcixcclxuICAgICAgICAgICAgICAgIFwicGFnZVNpemVcIjogcGFnZVNpemVcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgIGNvbnN0IGJvZHlSZXF1ZXN0ID0gSlNPTi5zdHJpbmdpZnkoYm9keU9iamVjdCk7XHJcblxyXG4gICAgICAgIGZldGNoKGFwaUVuZHBvaW50VXJsLFxyXG4gICAgICAgIHtcclxuICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgbW9kZTogXCJjb3JzXCIsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgXCJBY2Nlc3MtQ29udHJvbC1BbGxvdy1PcmlnaW5cIjogXCIqXCJcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k6IFwibm8tcmVmZXJyZXJcIixcclxuICAgICAgICAgICAgYm9keTogYm9keVJlcXVlc3RcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhyZXMpO1xyXG4gICAgICAgICAgICByZW5kZXJSZXN1bHRzKHJlcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzZXREcm9wZG93biA9IChkcm9wZG93bkVsZW1lbnQsIHNldFZhbHVlKSA9PiB7XHJcbiAgICAgICAgZHJvcGRvd25FbGVtZW50LnZhbHVlID0gc2V0VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy9FdmVudCBIYW5kbGVyc1xyXG4gICAgaWYgKHByb2R1Y3RDYXRlZ29yeURyb3Bkb3duKSB7XHJcbiAgICAgICAgcHJvZHVjdENhdGVnb3J5RHJvcGRvd24uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5ID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgICAgIC8vY2xlYXJpbmcgc3ViY2F0ZWdvcnkgZHJvcGRvd25cclxuICAgICAgICAgICAgc3ViY2F0ZWdvcnkgPSBcIlwiO1xyXG4gICAgICAgICAgICBzdWJjYXRlZ29yeUFycmF5ID0gW1wiQWxsXCJdO1xyXG4gICAgICAgICAgICBwcm9kdWN0U3ViQ2F0ZWdvcnlDb250YWluZXIuc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIFwiaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICBwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93bi5pbm5lckhUTUwgPSBcIlwiOy8vY2xlYXIgPG9wdGlvbj4gdGFnc1xyXG5cclxuICAgICAgICAgICAgaWYgKHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duKSB7XHJcbiAgICAgICAgICAgICAgICByZXNldERyb3Bkb3duKHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLCBcIlwiKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93bikge1xyXG5cclxuICAgICAgICBwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgc3ViY2F0ZWdvcnkgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGxldCB1cGRhdGVkQWN0aW9uID0gZmFsc2U7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlQWN0aW9uVXJsID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBzZXRQYXJhbXMgPSBzdWJjYXRlZ29yeSAhPT0gXCJcIiA/IGAke2FjdGlvbkluaXRpYWx9P3R5cGU9Q291cnNlcyZjYXRlZ29yeT0ke2NhdGVnb3J5fSZzdWJjYXRlZ29yeT0ke3N1YmNhdGVnb3J5fWAgOiBgJHthY3Rpb25Jbml0aWFsfT90eXBlPWNvdXJzZXMmY2F0ZWdvcnk9JHtjYXRlZ29yeX1gO1xyXG4gICAgICAgIGNvdXJzZVNlYXJjaEZvcm0uc2V0QXR0cmlidXRlKFwiYWN0aW9uXCIsIHNldFBhcmFtcyk7XHJcblxyXG4gICAgICAgIHVwZGF0ZWRBY3Rpb24gPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAodXBkYXRlZEFjdGlvbikge1xyXG4gICAgICAgICAgICBjb3Vyc2VTZWFyY2hGb3JtLnN1Ym1pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb3Vyc2VTZWFyY2hGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdXBkYXRlQWN0aW9uVXJsKCk7XHJcbiAgICB9KVxyXG5cclxuICAgIC8vUGFnZSBMb2FkXHJcblxyXG4gICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb3Vyc2VTZWFyY2g7IiwgImltcG9ydCBleHBhbmRhYmxlVGV4dENhcmRzIGZyb20gJy4vY29tcG9uZW50cy9leHBhbmRhYmxlLXRleHQtY2FyZHMnO1xyXG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXInO1xyXG5pbXBvcnQgbmF2IGZyb20gJy4vY29tcG9uZW50cy9uYXYnO1xyXG5pbXBvcnQgc3dpcGVyIGZyb20gJy4vY29tcG9uZW50cy9zd2lwZXInO1xyXG5pbXBvcnQgdGFicyBmcm9tICcuL2NvbXBvbmVudHMvdGFicyc7XHJcbmltcG9ydCB7IGRpYWxvZ3MsIGZvcm1zQWNjZXNzRGlhbG9nIH0gZnJvbSAnLi9jb21wb25lbnRzL2RpYWxvZ3MnO1xyXG5pbXBvcnQgaG9tZUhlcm8gZnJvbSAnLi9jb21wb25lbnRzL2hvbWUtaGVybyc7XHJcbmltcG9ydCBwbGF5TGlzdCBmcm9tICcuL2NvbXBvbmVudHMvcGxheWxpc3QnO1xyXG5pbXBvcnQgaG90VGlwTGlicmFyeSBmcm9tICcuL2NvbXBvbmVudHMvaG90LXRpcC1saWJyYXJ5JztcclxuaW1wb3J0IGFsZXJ0IGZyb20gJy4vY29tcG9uZW50cy9hbGVydCc7XHJcbmltcG9ydCBhcnRpY2xlRmlsdGVycyBmcm9tICcuL2NvbXBvbmVudHMvYXJ0aWNsZS1maWx0ZXJzJztcclxuaW1wb3J0IG11bHRpbWVkaWFGaWx0ZXJzIGZyb20gJy4vY29tcG9uZW50cy9tdWx0aW1lZGlhLWZpbHRlcnMnO1xyXG5pbXBvcnQgY2FsZW5kYXIgZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJztcclxuaW1wb3J0IHF1YW50aXR5U2VsZWN0b3IgZnJvbSAnLi9jb21wb25lbnRzL3F1YW50aXR5LXNlbGVjdG9yJztcclxuaW1wb3J0IGNoZWNrb3V0IGZyb20gJy4vY29tcG9uZW50cy9jaGVja291dCc7XHJcbmltcG9ydCBwcm9kdWN0cyBmcm9tICcuL2NvbXBvbmVudHMvcHJvZHVjdHMnO1xyXG5pbXBvcnQgY291cnNlU2VhcmNoIGZyb20gJy4vY29tcG9uZW50cy9jb3Vyc2Utc2VhcmNoJztcclxuXHJcbmV4cGFuZGFibGVUZXh0Q2FyZHMoKTtcclxuaGVhZGVyKCk7XHJcbm5hdigpO1xyXG5zd2lwZXIoKTtcclxudGFicygpO1xyXG5kaWFsb2dzKCk7XHJcbmZvcm1zQWNjZXNzRGlhbG9nKCk7XHJcbmhvbWVIZXJvKCk7XHJcbnBsYXlMaXN0KCk7XHJcbmhvdFRpcExpYnJhcnkoKTtcclxuYWxlcnQoKTtcclxuYXJ0aWNsZUZpbHRlcnMoKTtcclxubXVsdGltZWRpYUZpbHRlcnMoKTtcclxucXVhbnRpdHlTZWxlY3RvcigpO1xyXG5jaGVja291dCgpO1xyXG5cclxuaWYgKGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmNvbnRhaW5zKFwicGFnZS10ZW1wbGF0ZS1jb2xsZWN0aW9uUGFnZVwiKSkge1xyXG4gICAgcHJvZHVjdHMoKTtcclxufVxyXG5cclxuaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWNcIikpIHtcclxuICAgIGNhbGVuZGFyKCk7XHJcbn1cclxuXHJcbmlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdXJzZS1zZWFyY2hcIikpIHtcclxuICAgIGNvdXJzZVNlYXJjaCgpO1xyXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFNQSxPQUFDLFdBQVk7QUFFWDtBQUVBLGlCQUFTQSxlQUFlLElBQUksU0FBUztBQUVuQyxjQUFJLENBQUMsSUFBSTtBQUNQO0FBQUEsVUFDRjtBQUVBLGVBQUssS0FBSztBQUNWLGVBQUssY0FBYyxLQUFLLEdBQUcsdUJBQXVCLGlCQUFpQjtBQUNuRSxlQUFLLFlBQVksS0FBSyxHQUFHLHVCQUF1QixlQUFlO0FBQy9ELGVBQUssb0JBQW9CLEtBQUssR0FBRyx1QkFBdUIsc0JBQXNCO0FBRTlFLGVBQUssVUFBVSxLQUFLLFFBQVE7QUFBQSxZQUMxQixZQUFZO0FBQUEsWUFDWixhQUFhO0FBQUEs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O0FBQ3BCLGlCQUFPO0FBQ1AsY0FBSTtBQUNKLGlCQUFPO0FBQ1AsZUFBSztBQUNMLFVBQVE7QUFDUixvQkFBa0I7QUFDbEIsb0JBQVM7QUFDVCxtQkFBUztBQUNULDBCQUFjO0FBQ2QsZ0JBQU07QUFDTiwwQkFBZTtBQUNmLDZCQUFrQjtBQUNsQiw0QkFBaUI7QUFDakIsbUJBQVM7QUFFVCxNQUFJLFNBQVMsS0FBSyxVQUFVLFNBQVMsOEJBQThCLEdBQUc7QUFDbEUscUJBQVM7QUFBQSxFQUNiO0FBRUEsTUFBSSxTQUFTLGVBQWUsSUFBSSxHQUFHO0FBQy9CLHFCQUFTO0FBQUEsRUFDYjtBQUVBLE1BQUksU0FBUyxlQUFlLGVBQWUsR0FBRztBQUMxQywwQkFBYTtBQUFBLEVBQ2pCOyIsCiAgIm5hbWVzIjogWyJBY2NvcmRpb25UYWJzIiwgIm9iaiIsICJoZWFkZXIiLCAiaGVhZGVyIiwgIm5hdiIsICJleHRlbmQiLCAiQ3VzdG9tRXZlbnQiLCAiY2xhc3NlcyIsICJnZXRDb21wdXRlZFN0eWxlIiwgIndpbmRvdyIsICJpc09iamVjdCIsICJleHRlbmQiLCAic3dpcGVyIiwgImRvY3VtZW50IiwgIndpbmRvdyIsICJkb2N1bWVudCIsICJzdXBwb3J0IiwgInN3aXBlciIsICJvYnNlcnZlclVwZGF0ZSIsICJldmVudHMiLCAic2VsZiIsICJldmVudCIsICJzbGlkZSIsICJ0cmFuc2xhdGUiLCAicmVhbEluZGV4IiwgIm1pblRyYW5zbGF0ZSIsICJtYXhUcmFuc2xhdGUiLCAidHJhbnNpdGlvbkVuZCIsICJzbGlkZVRvIiwgInNldFRyYW5zbGF0ZSIsICJpIiwgImluY3JlbWVudCIsICJicmVha3BvaW50cyIsICJleHRlbmQiLCAic3dpcGVyIiwgInN3aXBlciIsICJ1cGRhdGUiLCAiaXNIaWRkZW4iLCAiY2xhc3NlcyIsICJzd2lwZXIiLCAidXBkYXRlIiwgImlzSGlkZGVuIiwgInN3aXBlciIsICJkb2N1bWVudCIsICJzZXRUcmFuc2xhdGUiLCAic2V0VHJhbnNpdGlvbiIsICJ1cGRhdGVTaXplIiwgImV2ZW50cyIsICJzd2lwZXIiLCAiZG9jdW1lbnQiLCAic3dpcGVyIiwgInNldFRyYW5zbGF0ZSIsICJzZXRUcmFuc2l0aW9uIiwgInN3aXBlciIsICJzbGlkZSIsICJzd2lwZXIiLCAic2V0VHJhbnNsYXRlIiwgInNldFRyYW5zaXRpb24iLCAiQWNjb3JkaW9uVGFicyIsICJldmVudCIsICJkaWFsb2dzIiwgInRvZ2dsZSIsICJub3ciLCAicG9zdFJlc3VsdHMiLCAicG9zdFJlc3VsdHMiXQp9Cg==
