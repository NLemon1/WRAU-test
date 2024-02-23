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

  // wwwroot/js/src/components/education.js
  var education = () => {
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
        "productType": "Products",
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
        window.history.pushState({ id: `category-${category}` }, "", `${location.pathname}?category=${category}`);
      }
      if (isCategory && isSubCategory) {
        urlParams.set("category", category);
        urlParams.set("subcategory", subcategory);
        window.history.pushState({ id: `category-${category}subcategory-${subcategory}` }, "", `${location.pathname}?category=${category}&subcategory=${subcategory}`);
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
  var education_default = education;

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
        "productType": "Events",
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
      const setParams = subcategory !== "" ? `${actionInitial}?category=${category}&subcategory=${subcategory}` : `${actionInitial}?category=${category}`;
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
    education_default();
  }
  if (document.getElementById("ec")) {
    calendar_default();
  }
  if (document.getElementById("course-search")) {
    course_search_default();
  }
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2ExMXktYWNjb3JkaW9uLXRhYnMvYTExeS1hY2NvcmRpb24tdGFicy5qcyIsICIuLi9zcmMvY29tcG9uZW50cy9leHBhbmRhYmxlLXRleHQtY2FyZHMuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvaGVhZGVyLmpzIiwgIi4uL3NyYy9jb21wb25lbnRzL25hdi5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9zc3Itd2luZG93LmVzbS5tanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9zaGFyZWQvdXRpbHMubWpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL3N3aXBlci1jb3JlLm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9jcmVhdGUtZWxlbWVudC1pZi1ub3QtZGVmaW5lZC5tanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL25hdmlnYXRpb24ubWpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2NsYXNzZXMtdG8tc2VsZWN0b3IubWpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvbW9kdWxlcy9wYWdpbmF0aW9uLm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvc2Nyb2xsYmFyLm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL21vZHVsZXMvYXV0b3BsYXkubWpzIiwgIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9zd2lwZXIvc2hhcmVkL2VmZmVjdC1pbml0Lm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9lZmZlY3QtdGFyZ2V0Lm1qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3dpcGVyL3NoYXJlZC9lZmZlY3QtdmlydHVhbC10cmFuc2l0aW9uLWVuZC5tanMiLCAiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N3aXBlci9tb2R1bGVzL2VmZmVjdC1mYWRlLm1qcyIsICIuLi9zcmMvY29tcG9uZW50cy9zd2lwZXIuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvdGFicy5qcyIsICIuLi8uLi8uLi9ub2RlX21vZHVsZXMvYTExeS1kaWFsb2cvZGlzdC9hMTF5LWRpYWxvZy5lc20uanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvZGlhbG9ncy5qcyIsICIuLi9zcmMvY29tcG9uZW50cy9ob21lLWhlcm8uanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvcGxheWxpc3QuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvaG90LXRpcC1saWJyYXJ5LmpzIiwgIi4uL3NyYy9jb21wb25lbnRzL2FsZXJ0LmpzIiwgIi4uL3NyYy9jb21wb25lbnRzL2FydGljbGUtZmlsdGVycy5qcyIsICIuLi9zcmMvY29tcG9uZW50cy9tdWx0aW1lZGlhLWZpbHRlcnMuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvY2FsZW5kYXIuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvcXVhbnRpdHktc2VsZWN0b3IuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvY2hlY2tvdXQuanMiLCAiLi4vc3JjL2NvbXBvbmVudHMvZWR1Y2F0aW9uLmpzIiwgIi4uL3NyYy9jb21wb25lbnRzL2NvdXJzZS1zZWFyY2guanMiLCAiLi4vc3JjL2dsb2JhbC5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLypcbiogIEFjY2Vzc2libGUgQWNjb3JkaW9uVGFicywgYnkgTWF0dGhpYXMgT3R0IChAbV9vdHQpXG4qXG4qICBCYXNlZCBvbiB0aGUgd29yayBvZiBAc3Rvd2JhbGwgKGh0dHBzOi8vY29kZXBlbi5pby9zdG93YmFsbC9wZW4veFZXd1dlKVxuKlxuKi9cbihmdW5jdGlvbiAoKSB7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIGZ1bmN0aW9uIEFjY29yZGlvblRhYnMgKGVsLCBvcHRpb25zKSB7XG5cbiAgICBpZiAoIWVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5lbCA9IGVsO1xuICAgIHRoaXMudGFiVHJpZ2dlcnMgPSB0aGlzLmVsLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ2pzLXRhYnMtdHJpZ2dlcicpO1xuICAgIHRoaXMudGFiUGFuZWxzID0gdGhpcy5lbC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCdqcy10YWJzLXBhbmVsJyk7XG4gICAgdGhpcy5hY2NvcmRpb25UcmlnZ2VycyA9IHRoaXMuZWwuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnanMtYWNjb3JkaW9uLXRyaWdnZXInKTtcblxuICAgIHRoaXMub3B0aW9ucyA9IHRoaXMuX2V4dGVuZCh7XG4gICAgICBicmVha3BvaW50OiA2NDAsXG4gICAgICB0YWJzQWxsb3dlZDogdHJ1ZSxcbiAgICAgIHNlbGVjdGVkVGFiOiAwLFxuICAgICAgc3RhcnRDb2xsYXBzZWQ6IGZhbHNlXG4gICAgfSwgb3B0aW9ucyk7XG5cbiAgICBpZihlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFicy1hbGxvd2VkJykgPT0gXCJ0cnVlXCIpe1xuICAgICAgdGhpcy5vcHRpb25zLnRhYnNBbGxvd2VkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS10YWJzLWFsbG93ZWQnKSA9PSBcImZhbHNlXCIpIHtcbiAgICAgIHRoaXMub3B0aW9ucy50YWJzQWxsb3dlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1icmVha3BvaW50Jykpe1xuICAgICAgdGhpcy5vcHRpb25zLmJyZWFrcG9pbnQgPSBwYXJzZUludChlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYnJlYWtwb2ludCcpKTtcbiAgICB9XG5cbiAgICBpZihlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc2VsZWN0ZWQtdGFiJykpe1xuICAgICAgdGhpcy5vcHRpb25zLnNlbGVjdGVkVGFiID0gcGFyc2VJbnQoZWwuZ2V0QXR0cmlidXRlKCdkYXRhLXNlbGVjdGVkLXRhYicpKTtcbiAgICB9XG5cbiAgICBpZihlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3RhcnQtY29sbGFwc2VkJykgPT0gXCJ0cnVlXCIpe1xuICAgICAgdGhpcy5vcHRpb25zLnN0YXJ0Q29sbGFwc2VkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zdGFydC1jb2xsYXBzZWQnKSA9PSBcImZhbHNlXCIpIHtcbiAgICAgIHRoaXMub3B0aW9ucy5zdGFydENvbGxhcHNlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnRhYlRyaWdnZXJzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLnRhYlRyaWdnZXJzLmxlbmd0aCAhPT0gdGhpcy50YWJQYW5lbHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5faW5pdCgpO1xuICB9XG5cbiAgQWNjb3JkaW9uVGFicy5wcm90b3R5cGUuX2luaXQgPSBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuXG4gICAgdGhpcy50YWJUcmlnZ2Vyc0xlbmd0aCA9IHRoaXMudGFiVHJpZ2dlcnMubGVuZ3RoO1xuICAgIHRoaXMuYWNjb3JkaW9uVHJpZ2dlcnNMZW5ndGggPSB0aGlzLmFjY29yZGlvblRyaWdnZXJzLmxlbmd0aDtcbiAgICB0aGlzLnNlbGVjdGVkVGFiID0gMDtcbiAgICB0aGlzLnByZXZTZWxlY3RlZFRhYiA9IG51bGw7XG4gICAgdGhpcy5jbGlja0xpc3RlbmVyID0gdGhpcy5fY2xpY2tFdmVudC5iaW5kKHRoaXMpO1xuICAgIHRoaXMua2V5ZG93bkxpc3RlbmVyID0gdGhpcy5fa2V5ZG93bkV2ZW50LmJpbmQodGhpcyk7XG4gICAgdGhpcy5rZXlzID0ge1xuICAgICAgcHJldjogMzcsXG4gICAgICBuZXh0OiAzOSxcbiAgICAgIHNwYWNlOiAzMixcbiAgICAgIGVudGVyOiAxM1xuICAgIH07XG5cbiAgICBpZih3aW5kb3cuaW5uZXJXaWR0aCA+PSB0aGlzLm9wdGlvbnMuYnJlYWtwb2ludCAmJiB0aGlzLm9wdGlvbnMudGFic0FsbG93ZWQpIHtcbiAgICAgICAgdGhpcy5pc0FjY29yZGlvbiA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuaXNBY2NvcmRpb24gPSB0cnVlO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50YWJUcmlnZ2Vyc0xlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnRhYlRyaWdnZXJzW2ldLmluZGV4ID0gaTtcbiAgICAgIHRoaXMudGFiVHJpZ2dlcnNbaV0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGlzdGVuZXIsIGZhbHNlKTtcbiAgICAgIHRoaXMudGFiVHJpZ2dlcnNbaV0uYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMua2V5ZG93bkxpc3RlbmVyLCBmYWxzZSk7XG5cbiAgICAgIGlmICh0aGlzLnRhYlRyaWdnZXJzW2ldLmNsYXNzTGlzdC5jb250YWlucygnaXMtc2VsZWN0ZWQnKSkge1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gaTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5faGlkZShpKTtcbiAgICB9XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuYWNjb3JkaW9uVHJpZ2dlcnNMZW5ndGg7IGkrKykge1xuICAgICAgdGhpcy5hY2NvcmRpb25UcmlnZ2Vyc1tpXS5pbmRleCA9IGk7XG4gICAgICB0aGlzLmFjY29yZGlvblRyaWdnZXJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0xpc3RlbmVyLCBmYWxzZSk7XG4gICAgICB0aGlzLmFjY29yZGlvblRyaWdnZXJzW2ldLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmtleWRvd25MaXN0ZW5lciwgZmFsc2UpO1xuXG4gICAgICBpZiAodGhpcy5hY2NvcmRpb25UcmlnZ2Vyc1tpXS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLXNlbGVjdGVkJykpIHtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IGk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFpc05hTih0aGlzLm9wdGlvbnMuc2VsZWN0ZWRUYWIpKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVGFiID0gdGhpcy5vcHRpb25zLnNlbGVjdGVkVGFiIDwgdGhpcy50YWJUcmlnZ2Vyc0xlbmd0aCA/IHRoaXMub3B0aW9ucy5zZWxlY3RlZFRhYiA6IHRoaXMudGFiVHJpZ2dlcnNMZW5ndGggLSAxO1xuICAgIH1cblxuICAgIHRoaXMuZWwuY2xhc3NMaXN0LmFkZCgnaXMtaW5pdGlhbGl6ZWQnKTtcbiAgICBpZiAodGhpcy5vcHRpb25zLnRhYnNBbGxvd2VkKSB7XG4gICAgICB0aGlzLmVsLmNsYXNzTGlzdC5hZGQoJ3RhYnMtYWxsb3dlZCcpO1xuICAgIH1cblxuICAgIC8vIElmIHRoZSBhY2NvcmRpb24gc2hvdWxkIG5vdCBzdGFydCBjb2xsYXBzZWQsIG9wZW4gdGhlIGZpcnN0IGVsZW1lbnRcbiAgICBpZighdGhpcy5vcHRpb25zLnN0YXJ0Q29sbGFwc2VkIHx8ICF0aGlzLmlzQWNjb3JkaW9uKXtcbiAgICAgIHRoaXMuc2VsZWN0VGFiKHRoaXMuc2VsZWN0ZWRUYWIsIGZhbHNlKTtcbiAgICB9XG5cbiAgICB2YXIgcmVzaXplVGFicyA9IHRoaXMuX2RlYm91bmNlKGZ1bmN0aW9uKCkge1xuICAgICAgLy8gVGhpcyBnZXRzIGRlbGF5ZWQgZm9yIHBlcmZvcm1hbmNlIHJlYXNvbnNcbiAgICAgIGlmKHdpbmRvdy5pbm5lcldpZHRoID49IF90aGlzLm9wdGlvbnMuYnJlYWtwb2ludCAmJiBfdGhpcy5vcHRpb25zLnRhYnNBbGxvd2VkKSB7XG4gICAgICAgIF90aGlzLmlzQWNjb3JkaW9uID0gZmFsc2U7XG4gICAgICAgIGlmIChfdGhpcy5vcHRpb25zLnRhYnNBbGxvd2VkKSB7XG4gICAgICAgICAgX3RoaXMuZWwuY2xhc3NMaXN0LmFkZCgndGFicy1hbGxvd2VkJyk7XG4gICAgICAgIH1cbiAgICAgICAgX3RoaXMuc2VsZWN0VGFiKF90aGlzLnNlbGVjdGVkVGFiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIF90aGlzLmlzQWNjb3JkaW9uID0gdHJ1ZTtcbiAgICAgICAgX3RoaXMuZWwuY2xhc3NMaXN0LnJlbW92ZSgndGFicy1hbGxvd2VkJyk7XG4gICAgICAgIGlmKCFfdGhpcy5vcHRpb25zLnN0YXJ0Q29sbGFwc2VkKXtcbiAgICAgICAgICBfdGhpcy5zZWxlY3RUYWIoX3RoaXMuc2VsZWN0ZWRUYWIpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICB9LCA1MCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplVGFicyk7XG5cbiAgfTtcblxuICBBY2NvcmRpb25UYWJzLnByb3RvdHlwZS5fY2xpY2tFdmVudCA9IGZ1bmN0aW9uIChlKSB7XG5cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICB2YXIgY2xvc2VzdFRyaWdnZXIgPSB0aGlzLl9nZXRDbG9zZXN0KGUudGFyZ2V0LCAnLmpzLXRhYnMtdHJpZ2dlcicpO1xuICAgIHZhciBjbG9zZXN0VGFiID0gMDtcblxuICAgIGlmIChjbG9zZXN0VHJpZ2dlciA9PSBudWxsKSB7XG4gICAgICBjbG9zZXN0VHJpZ2dlciA9IHRoaXMuX2dldENsb3Nlc3QoZS50YXJnZXQsICcuanMtYWNjb3JkaW9uLXRyaWdnZXInKTtcbiAgICAgIGNsb3Nlc3RUYWIgPSB0aGlzLl9nZXRDbG9zZXN0KGNsb3Nlc3RUcmlnZ2VyLCAnLmpzLXRhYnMtcGFuZWwnKTtcbiAgICAgIHRoaXMuaXNBY2NvcmRpb24gPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmlzQWNjb3JkaW9uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgdmFyIHRhcmdldEluZGV4ID0gZS50YXJnZXQuaW5kZXggIT0gbnVsbCA/IGUudGFyZ2V0LmluZGV4IDogY2xvc2VzdFRhYi5pbmRleDtcblxuICAgIGlmICh0YXJnZXRJbmRleCA9PT0gdGhpcy5zZWxlY3RlZFRhYiAmJiAhdGhpcy5pc0FjY29yZGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0VGFiKHRhcmdldEluZGV4LCB0cnVlKTtcbiAgfTtcblxuICBBY2NvcmRpb25UYWJzLnByb3RvdHlwZS5fa2V5ZG93bkV2ZW50ID0gZnVuY3Rpb24gKGUpIHtcblxuICAgIHZhciB0YXJnZXRJbmRleDtcblxuICAgIGlmIChlLmtleUNvZGUgPT09IHRoaXMua2V5cy5wcmV2IHx8IGUua2V5Q29kZSA9PT0gdGhpcy5rZXlzLm5leHQgfHwgZS5rZXlDb2RlID09PSB0aGlzLmtleXMuc3BhY2UgfHwgZS5rZXlDb2RlID09PSB0aGlzLmtleXMuZW50ZXIpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGUua2V5Q29kZSA9PT0gdGhpcy5rZXlzLnByZXYgJiYgZS50YXJnZXQuaW5kZXggPiAwICYmICF0aGlzLmlzQWNjb3JkaW9uKSB7XG4gICAgICB0YXJnZXRJbmRleCA9IGUudGFyZ2V0LmluZGV4IC0gMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5rZXlDb2RlID09PSB0aGlzLmtleXMubmV4dCAmJiBlLnRhcmdldC5pbmRleCA8IHRoaXMudGFiVHJpZ2dlcnNMZW5ndGggLSAxICYmICF0aGlzLmlzQWNjb3JkaW9uKSB7XG4gICAgICB0YXJnZXRJbmRleCA9IGUudGFyZ2V0LmluZGV4ICsgMTtcbiAgICB9XG4gICAgZWxzZSBpZiAoZS5rZXlDb2RlID09PSB0aGlzLmtleXMuc3BhY2UgfHwgZS5rZXlDb2RlID09PSB0aGlzLmtleXMuZW50ZXIpIHtcbiAgICAgIHRhcmdldEluZGV4ID0gZS50YXJnZXQuaW5kZXg7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc2VsZWN0VGFiKHRhcmdldEluZGV4LCB0cnVlKTtcbiAgfTtcblxuICBBY2NvcmRpb25UYWJzLnByb3RvdHlwZS5fc2hvdyA9IGZ1bmN0aW9uIChpbmRleCwgdXNlckludm9rZWQpIHtcblxuICAgIHRoaXMudGFiUGFuZWxzW2luZGV4XS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG5cbiAgICB0aGlzLnRhYlRyaWdnZXJzW2luZGV4XS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgdGhpcy50YWJUcmlnZ2Vyc1tpbmRleF0uY2xhc3NMaXN0LmFkZCgnaXMtc2VsZWN0ZWQnKTtcbiAgICB0aGlzLnRhYlRyaWdnZXJzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCB0cnVlKTtcblxuICAgIHRoaXMuYWNjb3JkaW9uVHJpZ2dlcnNbaW5kZXhdLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIHRydWUpO1xuXG4gICAgdmFyIHBhbmVsQ29udGVudCA9IHRoaXMudGFiUGFuZWxzW2luZGV4XS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKFwiY29udGVudFwiKVswXTtcbiAgICBwYW5lbENvbnRlbnQuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsIGZhbHNlKTtcbiAgICBwYW5lbENvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtaGlkZGVuJyk7XG4gICAgcGFuZWxDb250ZW50LmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcblxuICAgIHRoaXMudGFiUGFuZWxzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1oaWRkZW4nKTtcbiAgICB0aGlzLnRhYlBhbmVsc1tpbmRleF0uY2xhc3NMaXN0LmFkZCgnaXMtb3BlbicpO1xuXG4gICAgaWYgKHVzZXJJbnZva2VkKSB7XG4gICAgICB0aGlzLnRhYlRyaWdnZXJzW2luZGV4XS5mb2N1cygpO1xuICAgIH1cbiAgfTtcblxuICBBY2NvcmRpb25UYWJzLnByb3RvdHlwZS5faGlkZSA9IGZ1bmN0aW9uIChpbmRleCkge1xuXG4gICAgdGhpcy50YWJUcmlnZ2Vyc1tpbmRleF0uY2xhc3NMaXN0LnJlbW92ZSgnaXMtc2VsZWN0ZWQnKTtcbiAgICB0aGlzLnRhYlRyaWdnZXJzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ2FyaWEtc2VsZWN0ZWQnLCBmYWxzZSk7XG4gICAgdGhpcy50YWJUcmlnZ2Vyc1tpbmRleF0uc2V0QXR0cmlidXRlKCd0YWJpbmRleCcsIC0xKTtcblxuICAgIHRoaXMuYWNjb3JkaW9uVHJpZ2dlcnNbaW5kZXhdLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsIGZhbHNlKTtcblxuICAgIHZhciBwYW5lbENvbnRlbnQgPSB0aGlzLnRhYlBhbmVsc1tpbmRleF0uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShcImNvbnRlbnRcIilbMF07XG4gICAgcGFuZWxDb250ZW50LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCB0cnVlKTtcbiAgICBwYW5lbENvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xuICAgIHBhbmVsQ29udGVudC5jbGFzc0xpc3QuYWRkKCdpcy1oaWRkZW4nKTtcblxuICAgIHRoaXMudGFiUGFuZWxzW2luZGV4XS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1vcGVuJyk7XG4gICAgdGhpcy50YWJQYW5lbHNbaW5kZXhdLmNsYXNzTGlzdC5hZGQoJ2lzLWhpZGRlbicpO1xuICAgIHRoaXMudGFiUGFuZWxzW2luZGV4XS5zZXRBdHRyaWJ1dGUoJ3RhYmluZGV4JywgLTEpO1xuICB9O1xuXG4gIEFjY29yZGlvblRhYnMucHJvdG90eXBlLnNlbGVjdFRhYiA9IGZ1bmN0aW9uIChpbmRleCwgdXNlckludm9rZWQpIHtcblxuICAgIGlmIChpbmRleCA9PT0gbnVsbCkge1xuICAgICAgaWYodGhpcy5pc0FjY29yZGlvbikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpbmRleCA9IDA7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYoIXRoaXMudGFiUGFuZWxzW2luZGV4XS5jbGFzc0xpc3QuY29udGFpbnMoJ2lzLWhpZGRlbicpICYmIHVzZXJJbnZva2VkKSB7XG5cbiAgICAgIGlmIChpbmRleCA9PT0gdGhpcy5zZWxlY3RlZFRhYikge1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGFiID0gbnVsbDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSBudWxsO1xuICAgICAgICB0aGlzLnByZXZTZWxlY3RlZFRhYiA9IGluZGV4O1xuICAgICAgfVxuXG4gICAgICB0aGlzLl9oaWRlKGluZGV4KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzQWNjb3JkaW9uKSB7XG5cbiAgICAgIHRoaXMucHJldlNlbGVjdGVkVGFiID0gdGhpcy5zZWxlY3RlZFRhYjtcbiAgICAgIHRoaXMuc2VsZWN0ZWRUYWIgPSBpbmRleDtcblxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5wcmV2U2VsZWN0ZWRUYWIgPT09IG51bGwgfHwgIXRoaXMuaXNBY2NvcmRpb24pIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnRhYlRyaWdnZXJzTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBpZiAoaSAhPT0gaW5kZXgpIHtcbiAgICAgICAgICAgIHRoaXMuX2hpZGUoaSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5faGlkZSh0aGlzLnNlbGVjdGVkVGFiKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5wcmV2U2VsZWN0ZWRUYWIgPSB0aGlzLnNlbGVjdGVkVGFiO1xuICAgICAgdGhpcy5zZWxlY3RlZFRhYiA9IGluZGV4O1xuICAgIH1cblxuICAgIHRoaXMuX3Nob3codGhpcy5zZWxlY3RlZFRhYiwgdXNlckludm9rZWQpO1xuXG4gIH07XG5cbiAgQWNjb3JkaW9uVGFicy5wcm90b3R5cGUuZGVzdHJveSA9IGZ1bmN0aW9uICgpIHtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy50YWJUcmlnZ2Vyc0xlbmd0aDsgaSsrKSB7XG4gICAgICB0aGlzLnRhYlRyaWdnZXJzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLXNlbGVjdGVkJyk7XG4gICAgICB0aGlzLnRhYlRyaWdnZXJzW2ldLnJlbW92ZUF0dHJpYnV0ZSgnYXJpYS1zZWxlY3RlZCcpO1xuICAgICAgdGhpcy50YWJUcmlnZ2Vyc1tpXS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG5cbiAgICAgIHRoaXMudGFiUGFuZWxzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWhpZGRlbicpO1xuICAgICAgdGhpcy50YWJQYW5lbHNbaV0ucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuICAgICAgdGhpcy50YWJQYW5lbHNbaV0ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuXG4gICAgICB0aGlzLnRhYlRyaWdnZXJzW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0xpc3RlbmVyLCBmYWxzZSk7XG4gICAgICB0aGlzLnRhYlRyaWdnZXJzW2ldLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmtleWRvd25MaXN0ZW5lciwgZmFsc2UpO1xuXG4gICAgICBkZWxldGUgdGhpcy50YWJUcmlnZ2Vyc1tpXS5pbmRleDtcbiAgICB9XG5cbiAgICB0aGlzLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWluaXRpYWxpemVkJyk7XG4gIH07XG5cbiAgLyoqXG4gICAgKiBHZXQgdGhlIGNsb3Nlc3QgbWF0Y2hpbmcgZWxlbWVudCB1cCB0aGUgRE9NIHRyZWUuXG4gICAgKiBAcHJpdmF0ZVxuICAgICogQHBhcmFtICB7RWxlbWVudH0gZWxlbSAgICAgU3RhcnRpbmcgZWxlbWVudFxuICAgICogQHBhcmFtICB7U3RyaW5nfSAgc2VsZWN0b3IgU2VsZWN0b3IgdG8gbWF0Y2ggYWdhaW5zdFxuICAgICogQHJldHVybiB7Qm9vbGVhbnxFbGVtZW50fSAgUmV0dXJucyBudWxsIGlmIG5vdCBtYXRjaCBmb3VuZFxuICAgICovXG4gIEFjY29yZGlvblRhYnMucHJvdG90eXBlLl9nZXRDbG9zZXN0ID0gZnVuY3Rpb24gKCBlbGVtLCBzZWxlY3RvciApIHtcblxuICAgIC8vIEVsZW1lbnQubWF0Y2hlcygpIHBvbHlmaWxsXG4gICAgaWYgKCFFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzKSB7XG4gICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1hdGNoZXMgPVxuICAgICAgICAgICAgRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tb3pNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgIEVsZW1lbnQucHJvdG90eXBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5vTWF0Y2hlc1NlbGVjdG9yIHx8XG4gICAgICAgICAgICBFbGVtZW50LnByb3RvdHlwZS53ZWJraXRNYXRjaGVzU2VsZWN0b3IgfHxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHMpIHtcbiAgICAgICAgICAgICAgICB2YXIgbWF0Y2hlcyA9ICh0aGlzLmRvY3VtZW50IHx8IHRoaXMub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChzKSxcbiAgICAgICAgICAgICAgICAgICAgaSA9IG1hdGNoZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlICgtLWkgPj0gMCAmJiBtYXRjaGVzLml0ZW0oaSkgIT09IHRoaXMpIHt9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGkgPiAtMTtcbiAgICAgICAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gR2V0IGNsb3Nlc3QgbWF0Y2hcbiAgICBmb3IgKCA7IGVsZW0gJiYgZWxlbSAhPT0gZG9jdW1lbnQ7IGVsZW0gPSBlbGVtLnBhcmVudE5vZGUgKSB7XG4gICAgICAgIGlmICggZWxlbS5tYXRjaGVzKCBzZWxlY3RvciApICkgcmV0dXJuIGVsZW07XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG5cbiAgfTtcblxuICAvLyBQYXNzIGluIHRoZSBvYmplY3RzIHRvIG1lcmdlIGFzIGFyZ3VtZW50cy5cbiAgLy8gRm9yIGEgZGVlcCBleHRlbmQsIHNldCB0aGUgZmlyc3QgYXJndW1lbnQgdG8gYHRydWVgLlxuICBBY2NvcmRpb25UYWJzLnByb3RvdHlwZS5fZXh0ZW5kID0gZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBWYXJpYWJsZXNcbiAgICAgIHZhciBleHRlbmRlZCA9IHt9O1xuICAgICAgdmFyIGRlZXAgPSBmYWxzZTtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuXG4gICAgICAvLyBDaGVjayBpZiBhIGRlZXAgbWVyZ2VcbiAgICAgIGlmICggT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKCBhcmd1bWVudHNbMF0gKSA9PT0gJ1tvYmplY3QgQm9vbGVhbl0nICkge1xuICAgICAgICAgIGRlZXAgPSBhcmd1bWVudHNbMF07XG4gICAgICAgICAgaSsrO1xuICAgICAgfVxuXG4gICAgICAvLyBNZXJnZSB0aGUgb2JqZWN0IGludG8gdGhlIGV4dGVuZGVkIG9iamVjdFxuICAgICAgdmFyIG1lcmdlID0gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgIGZvciAoIHZhciBwcm9wIGluIG9iaiApIHtcbiAgICAgICAgICAgICAgaWYgKCBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoIG9iaiwgcHJvcCApICkge1xuICAgICAgICAgICAgICAgICAgLy8gSWYgZGVlcCBtZXJnZSBhbmQgcHJvcGVydHkgaXMgYW4gb2JqZWN0LCBtZXJnZSBwcm9wZXJ0aWVzXG4gICAgICAgICAgICAgICAgICBpZiAoIGRlZXAgJiYgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9ialtwcm9wXSkgPT09ICdbb2JqZWN0IE9iamVjdF0nICkge1xuICAgICAgICAgICAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gZXh0ZW5kKCB0cnVlLCBleHRlbmRlZFtwcm9wXSwgb2JqW3Byb3BdICk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGV4dGVuZGVkW3Byb3BdID0gb2JqW3Byb3BdO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy8gTG9vcCB0aHJvdWdoIGVhY2ggb2JqZWN0IGFuZCBjb25kdWN0IGEgbWVyZ2VcbiAgICAgIGZvciAoIDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgICAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbaV07XG4gICAgICAgICAgbWVyZ2Uob2JqKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGV4dGVuZGVkO1xuXG4gIH07XG5cbiAgLy8gUmV0dXJucyBhIGZ1bmN0aW9uLCB0aGF0LCBhcyBsb25nIGFzIGl0IGNvbnRpbnVlcyB0byBiZSBpbnZva2VkLCB3aWxsIG5vdFxuICAvLyBiZSB0cmlnZ2VyZWQuIFRoZSBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCBhZnRlciBpdCBzdG9wcyBiZWluZyBjYWxsZWQgZm9yXG4gIC8vIE4gbWlsbGlzZWNvbmRzLiBJZiBgaW1tZWRpYXRlYCBpcyBwYXNzZWQsIHRyaWdnZXIgdGhlIGZ1bmN0aW9uIG9uIHRoZVxuICAvLyBsZWFkaW5nIGVkZ2UsIGluc3RlYWQgb2YgdGhlIHRyYWlsaW5nLlxuICBBY2NvcmRpb25UYWJzLnByb3RvdHlwZS5fZGVib3VuY2UgPSBmdW5jdGlvbiAoZnVuYywgd2FpdCwgaW1tZWRpYXRlKSB7XG4gICAgdmFyIHRpbWVvdXQ7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGNvbnRleHQgPSB0aGlzLCBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdmFyIGxhdGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHRpbWVvdXQgPSBudWxsO1xuICAgICAgICBpZiAoIWltbWVkaWF0ZSkgeyBmdW5jLmFwcGx5KGNvbnRleHQsIGFyZ3MpOyB9O1xuICAgICAgfTtcbiAgICAgIHZhciBjYWxsTm93ID0gaW1tZWRpYXRlICYmICF0aW1lb3V0O1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQobGF0ZXIsIHdhaXQpO1xuICAgICAgaWYgKGNhbGxOb3cpIHsgZnVuYy5hcHBseShjb250ZXh0LCBhcmdzKSB9O1xuICAgIH07XG4gIH07XG5cbiAgdmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xuXG4gIGZ1bmN0aW9uICQoZXhwciwgY29uKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBleHByID09PSBcInN0cmluZ1wiID8gKGNvbiB8fCBkb2N1bWVudCkucXVlcnlTZWxlY3RvcihleHByKSA6IGV4cHIgfHwgbnVsbDtcbiAgfVxuXG4gIGZ1bmN0aW9uICQkKGV4cHIsIGNvbikge1xuICAgIHJldHVybiBzbGljZS5jYWxsKChjb24gfHwgZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoZXhwcikpO1xuICB9XG5cbiAgLy8gSW5pdGlhbGl6YXRpb25cblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgICQkKFwiLmpzLXRhYnNcIikuZm9yRWFjaChmdW5jdGlvbiAoaW5wdXQpIHtcbiAgICAgIG5ldyBBY2NvcmRpb25UYWJzKGlucHV0KTtcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEFyZSB3ZSBpbiBhIGJyb3dzZXI/IENoZWNrIGZvciBEb2N1bWVudCBjb25zdHJ1Y3RvclxuICBpZiAodHlwZW9mIERvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgLy8gRE9NIGFscmVhZHkgbG9hZGVkP1xuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImxvYWRpbmdcIikge1xuICAgICAgaW5pdCgpO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIC8vIFdhaXQgZm9yIGl0XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCBpbml0KTtcbiAgICB9XG4gIH1cblxuICAvLyBFeHBvcnQgb24gc2VsZiB3aGVuIGluIGEgYnJvd3NlclxuICBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBzZWxmLkFjY29yZGlvblRhYnMgPSBBY2NvcmRpb25UYWJzO1xuICB9XG5cbiAgLy8gRXhwb3NlIGFzIGEgQ0pTIG1vZHVsZVxuICBpZiAodHlwZW9mIG1vZHVsZSA9PT0gXCJvYmplY3RcIiAmJiBtb2R1bGUuZXhwb3J0cykge1xuICAgIG1vZHVsZS5leHBvcnRzID0gQWNjb3JkaW9uVGFicztcbiAgfVxuXG4gIHJldHVybiBBY2NvcmRpb25UYWJzO1xuXG59KSgpO1xuIiwgImNvbnN0IGV4cGFuZGFibGVUZXh0Q2FyZHMgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1leHBhbmRhYmxlLXRleHQtY2FyZCcpO1xyXG5cclxuICAgIGNhcmRzLmZvckVhY2goY2FyZCA9PiB7XHJcbiAgICAgICAgY29uc3Qgb3BlbiA9IGNhcmQucXVlcnlTZWxlY3RvcignLmpzLWV4cGFuZGFibGUtdGV4dC1jYXJkX19vcGVuJyk7XHJcbiAgICAgICAgY29uc3QgY2xvc2UgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5qcy1leHBhbmRhYmxlLXRleHQtY2FyZF9fY2xvc2UnKTtcclxuICAgICAgICBjb25zdCBvdmVybGF5ID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcuanMtZXhwYW5kYWJsZS10ZXh0LWNhcmRfX292ZXJsYXknKTtcclxuXHJcbiAgICAgICAgb3Blbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKTtcclxuICAgICAgICAgICAgb3Blbi5hcmlhRXhwYW5kZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBvdmVybGF5LmFyaWFIaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIG9wZW4uYXJpYUV4cGFuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIG92ZXJsYXkuYXJpYUhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGV4cGFuZGFibGVUZXh0Q2FyZHM7IiwgImNvbnN0IGhlYWRlciA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBoZWFkZXJTZWFyY2hPdmVybGF5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWhlYWRlcl9fc2VhcmNoLW92ZXJsYXknKTtcclxuICAgIGNvbnN0IGhlYWRlclNlYXJjaE92ZXJsYXlPcGVuZXJzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWhlYWRlcl9fc2VhcmNoLW92ZXJsYXktdG9nZ2xlJyk7XHJcbiAgICBjb25zdCBoZWFkZXJTZWFyY2hPdmVybGF5Q2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtaGVhZGVyX19zZWFyY2gtb3ZlcmxheS1jbG9zZScpO1xyXG4gICAgY29uc3QgaGVhZGVyU2VhcmNoSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnaGVhZGVyLXNlYXJjaC1pbnB1dCcpO1xyXG5cclxuICAgIGNvbnN0IHNpdGVNYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXNpdGUtbWFpbicpO1xyXG4gICAgY29uc3QgaGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWhlYWRlcicpO1xyXG4gICAgY29uc3Qgb2Zmc2V0SGVpZ2h0ID0gMTIwO1xyXG5cclxuICAgIGxldCB0ZW1wT3BlbmVyID0gXCJcIjtcclxuXHJcbiAgICBjb25zdCBraWxsT3ZlcmxheSA9ICgpID0+IHtcclxuICAgICAgICBoZWFkZXJTZWFyY2hPdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLW9wZW4nKTtcclxuICAgICAgICBoZWFkZXJTZWFyY2hPdmVybGF5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAndHJ1ZScpO1xyXG4gICAgICAgIHRlbXBPcGVuZXIuY2xhc3NMaXN0LnJlbW92ZSgnaXMtb3BlbicpO1xyXG4gICAgICAgIHRlbXBPcGVuZXIuc2V0QXR0cmlidXRlKCdhcmlhLWV4cGFuZGVkJywgJ2ZhbHNlJyk7XHJcbiAgICAgICAgaGVhZGVyU2VhcmNoSW5wdXQuYmx1cigpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGluaXRPdmVybGF5ID0gKG9wZW5CdG4pID0+IHtcclxuICAgICAgICBoZWFkZXJTZWFyY2hPdmVybGF5LmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcclxuICAgICAgICBoZWFkZXJTZWFyY2hPdmVybGF5LnNldEF0dHJpYnV0ZSgnYXJpYS1oaWRkZW4nLCAnZmFsc2UnKTtcclxuICAgICAgICBvcGVuQnRuLmNsYXNzTGlzdC5hZGQoJ2lzLW9wZW4nKTtcclxuICAgICAgICBvcGVuQnRuLnNldEF0dHJpYnV0ZSgnYXJpYS1leHBhbmRlZCcsICd0cnVlJyk7XHJcbiAgICAgICAgdGVtcE9wZW5lciA9IG9wZW5CdG47XHJcbiAgICAgICAgaGVhZGVyU2VhcmNoSW5wdXQuZm9jdXMoKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoaGVhZGVyU2VhcmNoT3ZlcmxheSkge1xyXG5cclxuICAgICAgICBoZWFkZXJTZWFyY2hPdmVybGF5T3BlbmVycy5mb3JFYWNoKChoZWFkZXJTZWFyY2hPdmVybGF5T3BlbmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGhlYWRlclNlYXJjaE92ZXJsYXlPcGVuZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChoZWFkZXJTZWFyY2hPdmVybGF5LmNsYXNzTGlzdC5jb250YWlucygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAga2lsbE92ZXJsYXkoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdE92ZXJsYXkoaGVhZGVyU2VhcmNoT3ZlcmxheU9wZW5lcik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBlID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRXNjYXBlJyAmJiBoZWFkZXJTZWFyY2hPdmVybGF5LmNsYXNzTGlzdC5jb250YWlucygnaXMtb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBraWxsT3ZlcmxheSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGhlYWRlclNlYXJjaE92ZXJsYXlDbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGtpbGxPdmVybGF5KHRlbXBPcGVuZXIpO1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGlmIChoZWFkZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKGhlYWRlci5jbGFzc0xpc3QuY29udGFpbnMoJ3NpdGUtaGVhZGVyLS1zaG93LW9uLXNjcm9sbC11cCcpKSB7XHJcblxyXG4gICAgICAgICAgICBsZXQgc2Nyb2xsUG9zID0gMDtcclxuXHJcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgeyB0b3AgfSA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBpc1N0aWNreSA9IGhlYWRlci5jbGFzc0xpc3QuY29udGFpbnMoJ3Bvc2l0aW9uLXN0aWNreScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IGhhbmRsZVNjcm9sbFRvcCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2l0ZS1oZWFkZXItLXRvcCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdwb3NpdGlvbi1zdGlja3knKTtcclxuICAgICAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgaGFuZGxlU2Nyb2xsVXAgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc1N0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgncG9zaXRpb24tc3RpY2t5Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBjb25zdCBoYW5kbGVTY3JvbGxEb3duID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKCdzaXRlLWhlYWRlci0tdG9wJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1N0aWNreSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWwuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWwuc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3Bvc2l0aW9uLXN0aWNreScpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgMjUwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoIXNpdGVNYWluLmNsYXNzTGlzdC5jb250YWlucyhcImhhcy1vdmVybGF5XCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRvcCA+PSBvZmZzZXRIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2Nyb2xsVG9wKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0b3AgPiBzY3JvbGxQb3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlU2Nyb2xsVXAoKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVTY3JvbGxEb3duKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHNjcm9sbFBvcyA9IHRvcDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChoZWFkZXIuY2xhc3NMaXN0LmNvbnRhaW5zKCdwb3NpdGlvbi1zdGlja3knKSkge1xyXG4gICAgICAgICAgICBnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgeyB0b3AgfSA9IGRvY3VtZW50LmJvZHkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHRvcCA+PSBvZmZzZXRIZWlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LmFkZCgnc2l0ZS1oZWFkZXItLXRvcCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSgnc2l0ZS1oZWFkZXItLXRvcCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG5cclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBoZWFkZXI7IiwgImNvbnN0IG5hdiA9ICgpID0+IHtcclxuICAgIGNvbnN0IGhlYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaXRlLWhlYWRlcicpO1xyXG4gICAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zaXRlLW1haW4nKTtcclxuICAgIGNvbnN0IG5hdkl0ZW1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLW5hdi1pdGVtJyk7XHJcbiAgICBjb25zdCBuYXZTdWJNZW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1uYXYtc3ViLW1lbnUnKTtcclxuICAgIGNvbnN0IG5hdlN1Yk1lbnVDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1zdWItbWVudS1jbG9zZScpO1xyXG5cclxuICAgIGNvbnN0IG5hdlRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1uYXYtdG9nZ2xlJyk7XHJcbiAgICBjb25zdCBuYXZNb2JpbGVJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1uYXYtbW9iaWxlLWl0ZW0nKTtcclxuICAgIGNvbnN0IG5hdk1vYmlsZVN1Yk1lbnVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLW5hdi1tb2JpbGUtc3ViLW1lbnUnKTtcclxuICAgIGNvbnN0IG5hdk1vYmlsZVN1Yk1lbnVDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1zdWItbWVudS1tb2JpbGUtYmFjaycpO1xyXG5cclxuXHJcbiAgICBjb25zdCBkYXJrbmVzcyA9IChzaG93KSA9PiB7XHJcbiAgICAgICAgaWYgKHNob3cpIHtcclxuICAgICAgICAgICAgbWFpbi5jbGFzc0xpc3QuYWRkKFwiaGFzLW92ZXJsYXlcIilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBtYWluLmNsYXNzTGlzdC5yZW1vdmUoXCJoYXMtb3ZlcmxheVwiKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBjbG9zZU1lbnUgPSAoY2xlYXJOYXZJdGVtcywgY2xlYXJTdWJOYXZJdGVtcykgPT4ge1xyXG4gICAgICAgIGNsZWFyTmF2SXRlbXMuZm9yRWFjaCgoY2xlYXJOYXZJdGVtKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyTmF2SXRlbS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgY2xlYXJTdWJOYXZJdGVtcy5mb3JFYWNoKChjbGVhclN1Yk5hdkl0ZW0pID0+IHtcclxuICAgICAgICAgICAgY2xlYXJTdWJOYXZJdGVtLmNsYXNzTGlzdC5hZGQoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRhcmtuZXNzKGZhbHNlKVxyXG4gICAgfTtcclxuXHJcbiAgICBpZiAobmF2SXRlbXMpIHtcclxuXHJcbiAgICAgICAgbmF2SXRlbXMuZm9yRWFjaCgobmF2SXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBuYXZJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY2xvc2VNZW51KG5hdkl0ZW1zLCBuYXZTdWJNZW51cyk7XHJcbiAgICAgICAgICAgICAgICBuYXZJdGVtLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZ2V0VGFyZ2V0SWQgPSBuYXZJdGVtLmdldEF0dHJpYnV0ZShcImFyaWEtY29udHJvbHNcIiksXHJcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0UGFuZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChnZXRUYXJnZXRJZCk7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXRQYW5lbC5jbGFzc0xpc3QucmVtb3ZlKFwiaXMtaGlkZGVuXCIpO1xyXG4gICAgICAgICAgICAgICAgZGFya25lc3ModHJ1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgbmF2SXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG5hdlN1Yk1lbnVDbG9zZS5mb3JFYWNoKChjbG9zZSkgPT4ge1xyXG4gICAgICAgICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGRhcmtuZXNzKGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGNsb3NlTWVudShuYXZJdGVtcywgbmF2U3ViTWVudXMpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBoZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpc1N1Yk5hdkl0ZW0gPSBlLnRhcmdldC5jbG9zZXN0KFwiLmpzLW5hdi1zdWItbWVudVwiKSA9PSBudWxsO1xyXG4gICAgICAgICAgICBjb25zdCBpc05hdkl0ZW0gPSBlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJqcy1uYXYtaXRlbVwiKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc1N1Yk5hdkl0ZW0pIHtcclxuICAgICAgICAgICAgICAgIGlmICghaXNOYXZJdGVtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY2xvc2VNZW51KG5hdkl0ZW1zLCBuYXZTdWJNZW51cyk7XHJcbiAgICAgICAgICAgICAgICAgICAgZGFya25lc3MoZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtYWluLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBjbG9zZU1lbnUobmF2SXRlbXMsIG5hdlN1Yk1lbnVzKTtcclxuICAgICAgICAgICAgZGFya25lc3MoZmFsc2UpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBpZiAobmF2TW9iaWxlSXRlbXMpIHtcclxuXHJcbiAgICAgICAgbmF2TW9iaWxlSXRlbXMuZm9yRWFjaCgobmF2TW9iaWxlSXRlbSkgPT4ge1xyXG4gICAgICAgICAgICBuYXZNb2JpbGVJdGVtLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIG5hdk1vYmlsZUl0ZW0uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBnZXRUYXJnZXRJZCA9IG5hdk1vYmlsZUl0ZW0uZ2V0QXR0cmlidXRlKFwiYXJpYS1jb250cm9sc1wiKSxcclxuICAgICAgICAgICAgICAgICAgICB0YXJnZXRQYW5lbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGdldFRhcmdldElkKTtcclxuICAgICAgICAgICAgICAgIHRhcmdldFBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoXCJpcy1oaWRkZW5cIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBuYXZNb2JpbGVTdWJNZW51Q2xvc2UuZm9yRWFjaCgobmF2TW9iaWxlQ2xvc2UpID0+IHtcclxuICAgICAgICAgICAgbmF2TW9iaWxlQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBjbG9zZU1lbnUobmF2TW9iaWxlSXRlbXMsIG5hdk1vYmlsZVN1Yk1lbnVzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfVxyXG5cclxuICAgIGlmIChuYXZUb2dnbGUpIHtcclxuXHJcbiAgICAgICAgY29uc3QgbmF2ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobmF2VG9nZ2xlLmdldEF0dHJpYnV0ZSgnYXJpYS1jb250cm9scycpKTtcclxuXHJcbiAgICAgICAgY29uc3Qgb3Blbk5hdiA9ICgpID0+IHtcclxuICAgICAgICAgICAgbmF2LmFyaWFIaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgbmF2VG9nZ2xlLmFyaWFFeHBhbmRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdoYXMtb3Blbi1uYXYnKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBjb25zdCBjbG9zZU5hdiA9ICgpID0+IHtcclxuICAgICAgICAgICAgbmF2LmFyaWFIaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICBuYXZUb2dnbGUuYXJpYUV4cGFuZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdoYXMtb3Blbi1uYXYnKTtcclxuICAgICAgICAgICAgY2xvc2VNZW51KG5hdk1vYmlsZUl0ZW1zLCBuYXZNb2JpbGVTdWJNZW51cyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgbmF2VG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAobmF2VG9nZ2xlLmFyaWFFeHBhbmRlZCA9PT0gJ3RydWUnKSB7XHJcbiAgICAgICAgICAgICAgICBjbG9zZU5hdigpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgb3Blbk5hdigpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5vbmtleWRvd24gPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGlmIChlLmtleSA9PSBcIkVzY2FwZVwiKSB7XHJcbiAgICAgICAgICAgIGNsb3NlTWVudShuYXZJdGVtcywgbmF2U3ViTWVudXMpO1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbmF2OyIsICIvKipcbiAqIFNTUiBXaW5kb3cgNC4wLjJcbiAqIEJldHRlciBoYW5kbGluZyBmb3Igd2luZG93IG9iamVjdCBpbiBTU1IgZW52aXJvbm1lbnRcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9ub2xpbWl0czR3ZWIvc3NyLXdpbmRvd1xuICpcbiAqIENvcHlyaWdodCAyMDIxLCBWbGFkaW1pciBLaGFybGFtcGlkaVxuICpcbiAqIExpY2Vuc2VkIHVuZGVyIE1JVFxuICpcbiAqIFJlbGVhc2VkIG9uOiBEZWNlbWJlciAxMywgMjAyMVxuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuZnVuY3Rpb24gaXNPYmplY3Qob2JqKSB7XG4gIHJldHVybiBvYmogIT09IG51bGwgJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvYmogJiYgb2JqLmNvbnN0cnVjdG9yID09PSBPYmplY3Q7XG59XG5mdW5jdGlvbiBleHRlbmQodGFyZ2V0LCBzcmMpIHtcbiAgaWYgKHRhcmdldCA9PT0gdm9pZCAwKSB7XG4gICAgdGFyZ2V0ID0ge307XG4gIH1cbiAgaWYgKHNyYyA9PT0gdm9pZCAwKSB7XG4gICAgc3JjID0ge307XG4gIH1cbiAgT2JqZWN0LmtleXMoc3JjKS5mb3JFYWNoKGtleSA9PiB7XG4gICAgaWYgKHR5cGVvZiB0YXJnZXRba2V5XSA9PT0gJ3VuZGVmaW5lZCcpIHRhcmdldFtrZXldID0gc3JjW2tleV07ZWxzZSBpZiAoaXNPYmplY3Qoc3JjW2tleV0pICYmIGlzT2JqZWN0KHRhcmdldFtrZXldKSAmJiBPYmplY3Qua2V5cyhzcmNba2V5XSkubGVuZ3RoID4gMCkge1xuICAgICAgZXh0ZW5kKHRhcmdldFtrZXldLCBzcmNba2V5XSk7XG4gICAgfVxuICB9KTtcbn1cbmNvbnN0IHNzckRvY3VtZW50ID0ge1xuICBib2R5OiB7fSxcbiAgYWRkRXZlbnRMaXN0ZW5lcigpIHt9LFxuICByZW1vdmVFdmVudExpc3RlbmVyKCkge30sXG4gIGFjdGl2ZUVsZW1lbnQ6IHtcbiAgICBibHVyKCkge30sXG4gICAgbm9kZU5hbWU6ICcnXG4gIH0sXG4gIHF1ZXJ5U2VsZWN0b3IoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG4gIHF1ZXJ5U2VsZWN0b3JBbGwoKSB7XG4gICAgcmV0dXJuIFtdO1xuICB9LFxuICBnZXRFbGVtZW50QnlJZCgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgY3JlYXRlRXZlbnQoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluaXRFdmVudCgpIHt9XG4gICAgfTtcbiAgfSxcbiAgY3JlYXRlRWxlbWVudCgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY2hpbGRyZW46IFtdLFxuICAgICAgY2hpbGROb2RlczogW10sXG4gICAgICBzdHlsZToge30sXG4gICAgICBzZXRBdHRyaWJ1dGUoKSB7fSxcbiAgICAgIGdldEVsZW1lbnRzQnlUYWdOYW1lKCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG4gICAgfTtcbiAgfSxcbiAgY3JlYXRlRWxlbWVudE5TKCkge1xuICAgIHJldHVybiB7fTtcbiAgfSxcbiAgaW1wb3J0Tm9kZSgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfSxcbiAgbG9jYXRpb246IHtcbiAgICBoYXNoOiAnJyxcbiAgICBob3N0OiAnJyxcbiAgICBob3N0bmFtZTogJycsXG4gICAgaHJlZjogJycsXG4gICAgb3JpZ2luOiAnJyxcbiAgICBwYXRobmFtZTogJycsXG4gICAgcHJvdG9jb2w6ICcnLFxuICAgIHNlYXJjaDogJydcbiAgfVxufTtcbmZ1bmN0aW9uIGdldERvY3VtZW50KCkge1xuICBjb25zdCBkb2MgPSB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnID8gZG9jdW1lbnQgOiB7fTtcbiAgZXh0ZW5kKGRvYywgc3NyRG9jdW1lbnQpO1xuICByZXR1cm4gZG9jO1xufVxuY29uc3Qgc3NyV2luZG93ID0ge1xuICBkb2N1bWVudDogc3NyRG9jdW1lbnQsXG4gIG5hdmlnYXRvcjoge1xuICAgIHVzZXJBZ2VudDogJydcbiAgfSxcbiAgbG9jYXRpb246IHtcbiAgICBoYXNoOiAnJyxcbiAgICBob3N0OiAnJyxcbiAgICBob3N0bmFtZTogJycsXG4gICAgaHJlZjogJycsXG4gICAgb3JpZ2luOiAnJyxcbiAgICBwYXRobmFtZTogJycsXG4gICAgcHJvdG9jb2w6ICcnLFxuICAgIHNlYXJjaDogJydcbiAgfSxcbiAgaGlzdG9yeToge1xuICAgIHJlcGxhY2VTdGF0ZSgpIHt9LFxuICAgIHB1c2hTdGF0ZSgpIHt9LFxuICAgIGdvKCkge30sXG4gICAgYmFjaygpIHt9XG4gIH0sXG4gIEN1c3RvbUV2ZW50OiBmdW5jdGlvbiBDdXN0b21FdmVudCgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgYWRkRXZlbnRMaXN0ZW5lcigpIHt9LFxuICByZW1vdmVFdmVudExpc3RlbmVyKCkge30sXG4gIGdldENvbXB1dGVkU3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGdldFByb3BlcnR5VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICB9O1xuICB9LFxuICBJbWFnZSgpIHt9LFxuICBEYXRlKCkge30sXG4gIHNjcmVlbjoge30sXG4gIHNldFRpbWVvdXQoKSB7fSxcbiAgY2xlYXJUaW1lb3V0KCkge30sXG4gIG1hdGNoTWVkaWEoKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9LFxuICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoY2FsbGJhY2spIHtcbiAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjYWxsYmFjaygpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcbiAgfSxcbiAgY2FuY2VsQW5pbWF0aW9uRnJhbWUoaWQpIHtcbiAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNsZWFyVGltZW91dChpZCk7XG4gIH1cbn07XG5mdW5jdGlvbiBnZXRXaW5kb3coKSB7XG4gIGNvbnN0IHdpbiA9IHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnID8gd2luZG93IDoge307XG4gIGV4dGVuZCh3aW4sIHNzcldpbmRvdyk7XG4gIHJldHVybiB3aW47XG59XG5cbmV4cG9ydCB7IGdldFdpbmRvdyBhcyBhLCBnZXREb2N1bWVudCBhcyBnIH07XG4iLCAiaW1wb3J0IHsgYSBhcyBnZXRXaW5kb3csIGcgYXMgZ2V0RG9jdW1lbnQgfSBmcm9tICcuL3Nzci13aW5kb3cuZXNtLm1qcyc7XG5cbmZ1bmN0aW9uIGNsYXNzZXNUb1Rva2VucyhjbGFzc2VzKSB7XG4gIGlmIChjbGFzc2VzID09PSB2b2lkIDApIHtcbiAgICBjbGFzc2VzID0gJyc7XG4gIH1cbiAgcmV0dXJuIGNsYXNzZXMudHJpbSgpLnNwbGl0KCcgJykuZmlsdGVyKGMgPT4gISFjLnRyaW0oKSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb3BzKG9iaikge1xuICBjb25zdCBvYmplY3QgPSBvYmo7XG4gIE9iamVjdC5rZXlzKG9iamVjdCkuZm9yRWFjaChrZXkgPT4ge1xuICAgIHRyeSB7XG4gICAgICBvYmplY3Rba2V5XSA9IG51bGw7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgLy8gbm8gZ2V0dGVyIGZvciBvYmplY3RcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGRlbGV0ZSBvYmplY3Rba2V5XTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAvLyBzb21ldGhpbmcgZ290IHdyb25nXG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIG5leHRUaWNrKGNhbGxiYWNrLCBkZWxheSkge1xuICBpZiAoZGVsYXkgPT09IHZvaWQgMCkge1xuICAgIGRlbGF5ID0gMDtcbiAgfVxuICByZXR1cm4gc2V0VGltZW91dChjYWxsYmFjaywgZGVsYXkpO1xufVxuZnVuY3Rpb24gbm93KCkge1xuICByZXR1cm4gRGF0ZS5ub3coKTtcbn1cbmZ1bmN0aW9uIGdldENvbXB1dGVkU3R5bGUoZWwpIHtcbiAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gIGxldCBzdHlsZTtcbiAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgc3R5bGUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCk7XG4gIH1cbiAgaWYgKCFzdHlsZSAmJiBlbC5jdXJyZW50U3R5bGUpIHtcbiAgICBzdHlsZSA9IGVsLmN1cnJlbnRTdHlsZTtcbiAgfVxuICBpZiAoIXN0eWxlKSB7XG4gICAgc3R5bGUgPSBlbC5zdHlsZTtcbiAgfVxuICByZXR1cm4gc3R5bGU7XG59XG5mdW5jdGlvbiBnZXRUcmFuc2xhdGUoZWwsIGF4aXMpIHtcbiAgaWYgKGF4aXMgPT09IHZvaWQgMCkge1xuICAgIGF4aXMgPSAneCc7XG4gIH1cbiAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gIGxldCBtYXRyaXg7XG4gIGxldCBjdXJUcmFuc2Zvcm07XG4gIGxldCB0cmFuc2Zvcm1NYXRyaXg7XG4gIGNvbnN0IGN1clN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShlbCk7XG4gIGlmICh3aW5kb3cuV2ViS2l0Q1NTTWF0cml4KSB7XG4gICAgY3VyVHJhbnNmb3JtID0gY3VyU3R5bGUudHJhbnNmb3JtIHx8IGN1clN0eWxlLndlYmtpdFRyYW5zZm9ybTtcbiAgICBpZiAoY3VyVHJhbnNmb3JtLnNwbGl0KCcsJykubGVuZ3RoID4gNikge1xuICAgICAgY3VyVHJhbnNmb3JtID0gY3VyVHJhbnNmb3JtLnNwbGl0KCcsICcpLm1hcChhID0+IGEucmVwbGFjZSgnLCcsICcuJykpLmpvaW4oJywgJyk7XG4gICAgfVxuICAgIC8vIFNvbWUgb2xkIHZlcnNpb25zIG9mIFdlYmtpdCBjaG9rZSB3aGVuICdub25lJyBpcyBwYXNzZWQ7IHBhc3NcbiAgICAvLyBlbXB0eSBzdHJpbmcgaW5zdGVhZCBpbiB0aGlzIGNhc2VcbiAgICB0cmFuc2Zvcm1NYXRyaXggPSBuZXcgd2luZG93LldlYktpdENTU01hdHJpeChjdXJUcmFuc2Zvcm0gPT09ICdub25lJyA/ICcnIDogY3VyVHJhbnNmb3JtKTtcbiAgfSBlbHNlIHtcbiAgICB0cmFuc2Zvcm1NYXRyaXggPSBjdXJTdHlsZS5Nb3pUcmFuc2Zvcm0gfHwgY3VyU3R5bGUuT1RyYW5zZm9ybSB8fCBjdXJTdHlsZS5Nc1RyYW5zZm9ybSB8fCBjdXJTdHlsZS5tc1RyYW5zZm9ybSB8fCBjdXJTdHlsZS50cmFuc2Zvcm0gfHwgY3VyU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgndHJhbnNmb3JtJykucmVwbGFjZSgndHJhbnNsYXRlKCcsICdtYXRyaXgoMSwgMCwgMCwgMSwnKTtcbiAgICBtYXRyaXggPSB0cmFuc2Zvcm1NYXRyaXgudG9TdHJpbmcoKS5zcGxpdCgnLCcpO1xuICB9XG4gIGlmIChheGlzID09PSAneCcpIHtcbiAgICAvLyBMYXRlc3QgQ2hyb21lIGFuZCB3ZWJraXRzIEZpeFxuICAgIGlmICh3aW5kb3cuV2ViS2l0Q1NTTWF0cml4KSBjdXJUcmFuc2Zvcm0gPSB0cmFuc2Zvcm1NYXRyaXgubTQxO1xuICAgIC8vIENyYXp5IElFMTAgTWF0cml4XG4gICAgZWxzZSBpZiAobWF0cml4Lmxlbmd0aCA9PT0gMTYpIGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzEyXSk7XG4gICAgLy8gTm9ybWFsIEJyb3dzZXJzXG4gICAgZWxzZSBjdXJUcmFuc2Zvcm0gPSBwYXJzZUZsb2F0KG1hdHJpeFs0XSk7XG4gIH1cbiAgaWYgKGF4aXMgPT09ICd5Jykge1xuICAgIC8vIExhdGVzdCBDaHJvbWUgYW5kIHdlYmtpdHMgRml4XG4gICAgaWYgKHdpbmRvdy5XZWJLaXRDU1NNYXRyaXgpIGN1clRyYW5zZm9ybSA9IHRyYW5zZm9ybU1hdHJpeC5tNDI7XG4gICAgLy8gQ3JhenkgSUUxMCBNYXRyaXhcbiAgICBlbHNlIGlmIChtYXRyaXgubGVuZ3RoID09PSAxNikgY3VyVHJhbnNmb3JtID0gcGFyc2VGbG9hdChtYXRyaXhbMTNdKTtcbiAgICAvLyBOb3JtYWwgQnJvd3NlcnNcbiAgICBlbHNlIGN1clRyYW5zZm9ybSA9IHBhcnNlRmxvYXQobWF0cml4WzVdKTtcbiAgfVxuICByZXR1cm4gY3VyVHJhbnNmb3JtIHx8IDA7XG59XG5mdW5jdGlvbiBpc09iamVjdChvKSB7XG4gIHJldHVybiB0eXBlb2YgbyA9PT0gJ29iamVjdCcgJiYgbyAhPT0gbnVsbCAmJiBvLmNvbnN0cnVjdG9yICYmIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvKS5zbGljZSg4LCAtMSkgPT09ICdPYmplY3QnO1xufVxuZnVuY3Rpb24gaXNOb2RlKG5vZGUpIHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2Ygd2luZG93LkhUTUxFbGVtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHJldHVybiBub2RlIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIG5vZGUgJiYgKG5vZGUubm9kZVR5cGUgPT09IDEgfHwgbm9kZS5ub2RlVHlwZSA9PT0gMTEpO1xufVxuZnVuY3Rpb24gZXh0ZW5kKCkge1xuICBjb25zdCB0byA9IE9iamVjdChhcmd1bWVudHMubGVuZ3RoIDw9IDAgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbMF0pO1xuICBjb25zdCBub0V4dGVuZCA9IFsnX19wcm90b19fJywgJ2NvbnN0cnVjdG9yJywgJ3Byb3RvdHlwZSddO1xuICBmb3IgKGxldCBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGNvbnN0IG5leHRTb3VyY2UgPSBpIDwgMCB8fCBhcmd1bWVudHMubGVuZ3RoIDw9IGkgPyB1bmRlZmluZWQgOiBhcmd1bWVudHNbaV07XG4gICAgaWYgKG5leHRTb3VyY2UgIT09IHVuZGVmaW5lZCAmJiBuZXh0U291cmNlICE9PSBudWxsICYmICFpc05vZGUobmV4dFNvdXJjZSkpIHtcbiAgICAgIGNvbnN0IGtleXNBcnJheSA9IE9iamVjdC5rZXlzKE9iamVjdChuZXh0U291cmNlKSkuZmlsdGVyKGtleSA9PiBub0V4dGVuZC5pbmRleE9mKGtleSkgPCAwKTtcbiAgICAgIGZvciAobGV0IG5leHRJbmRleCA9IDAsIGxlbiA9IGtleXNBcnJheS5sZW5ndGg7IG5leHRJbmRleCA8IGxlbjsgbmV4dEluZGV4ICs9IDEpIHtcbiAgICAgICAgY29uc3QgbmV4dEtleSA9IGtleXNBcnJheVtuZXh0SW5kZXhdO1xuICAgICAgICBjb25zdCBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuZXh0U291cmNlLCBuZXh0S2V5KTtcbiAgICAgICAgaWYgKGRlc2MgIT09IHVuZGVmaW5lZCAmJiBkZXNjLmVudW1lcmFibGUpIHtcbiAgICAgICAgICBpZiAoaXNPYmplY3QodG9bbmV4dEtleV0pICYmIGlzT2JqZWN0KG5leHRTb3VyY2VbbmV4dEtleV0pKSB7XG4gICAgICAgICAgICBpZiAobmV4dFNvdXJjZVtuZXh0S2V5XS5fX3N3aXBlcl9fKSB7XG4gICAgICAgICAgICAgIHRvW25leHRLZXldID0gbmV4dFNvdXJjZVtuZXh0S2V5XTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGV4dGVuZCh0b1tuZXh0S2V5XSwgbmV4dFNvdXJjZVtuZXh0S2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICghaXNPYmplY3QodG9bbmV4dEtleV0pICYmIGlzT2JqZWN0KG5leHRTb3VyY2VbbmV4dEtleV0pKSB7XG4gICAgICAgICAgICB0b1tuZXh0S2V5XSA9IHt9O1xuICAgICAgICAgICAgaWYgKG5leHRTb3VyY2VbbmV4dEtleV0uX19zd2lwZXJfXykge1xuICAgICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBleHRlbmQodG9bbmV4dEtleV0sIG5leHRTb3VyY2VbbmV4dEtleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0b1tuZXh0S2V5XSA9IG5leHRTb3VyY2VbbmV4dEtleV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0bztcbn1cbmZ1bmN0aW9uIHNldENTU1Byb3BlcnR5KGVsLCB2YXJOYW1lLCB2YXJWYWx1ZSkge1xuICBlbC5zdHlsZS5zZXRQcm9wZXJ0eSh2YXJOYW1lLCB2YXJWYWx1ZSk7XG59XG5mdW5jdGlvbiBhbmltYXRlQ1NTTW9kZVNjcm9sbChfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIHRhcmdldFBvc2l0aW9uLFxuICAgIHNpZGVcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICBjb25zdCBzdGFydFBvc2l0aW9uID0gLXN3aXBlci50cmFuc2xhdGU7XG4gIGxldCBzdGFydFRpbWUgPSBudWxsO1xuICBsZXQgdGltZTtcbiAgY29uc3QgZHVyYXRpb24gPSBzd2lwZXIucGFyYW1zLnNwZWVkO1xuICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnNjcm9sbFNuYXBUeXBlID0gJ25vbmUnO1xuICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3dpcGVyLmNzc01vZGVGcmFtZUlEKTtcbiAgY29uc3QgZGlyID0gdGFyZ2V0UG9zaXRpb24gPiBzdGFydFBvc2l0aW9uID8gJ25leHQnIDogJ3ByZXYnO1xuICBjb25zdCBpc091dE9mQm91bmQgPSAoY3VycmVudCwgdGFyZ2V0KSA9PiB7XG4gICAgcmV0dXJuIGRpciA9PT0gJ25leHQnICYmIGN1cnJlbnQgPj0gdGFyZ2V0IHx8IGRpciA9PT0gJ3ByZXYnICYmIGN1cnJlbnQgPD0gdGFyZ2V0O1xuICB9O1xuICBjb25zdCBhbmltYXRlID0gKCkgPT4ge1xuICAgIHRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICBpZiAoc3RhcnRUaW1lID09PSBudWxsKSB7XG4gICAgICBzdGFydFRpbWUgPSB0aW1lO1xuICAgIH1cbiAgICBjb25zdCBwcm9ncmVzcyA9IE1hdGgubWF4KE1hdGgubWluKCh0aW1lIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uLCAxKSwgMCk7XG4gICAgY29uc3QgZWFzZVByb2dyZXNzID0gMC41IC0gTWF0aC5jb3MocHJvZ3Jlc3MgKiBNYXRoLlBJKSAvIDI7XG4gICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IHN0YXJ0UG9zaXRpb24gKyBlYXNlUHJvZ3Jlc3MgKiAodGFyZ2V0UG9zaXRpb24gLSBzdGFydFBvc2l0aW9uKTtcbiAgICBpZiAoaXNPdXRPZkJvdW5kKGN1cnJlbnRQb3NpdGlvbiwgdGFyZ2V0UG9zaXRpb24pKSB7XG4gICAgICBjdXJyZW50UG9zaXRpb24gPSB0YXJnZXRQb3NpdGlvbjtcbiAgICB9XG4gICAgc3dpcGVyLndyYXBwZXJFbC5zY3JvbGxUbyh7XG4gICAgICBbc2lkZV06IGN1cnJlbnRQb3NpdGlvblxuICAgIH0pO1xuICAgIGlmIChpc091dE9mQm91bmQoY3VycmVudFBvc2l0aW9uLCB0YXJnZXRQb3NpdGlvbikpIHtcbiAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcbiAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGUuc2Nyb2xsU25hcFR5cGUgPSAnJztcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLm92ZXJmbG93ID0gJyc7XG4gICAgICAgIHN3aXBlci53cmFwcGVyRWwuc2Nyb2xsVG8oe1xuICAgICAgICAgIFtzaWRlXTogY3VycmVudFBvc2l0aW9uXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoc3dpcGVyLmNzc01vZGVGcmFtZUlEKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgc3dpcGVyLmNzc01vZGVGcmFtZUlEID0gd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShhbmltYXRlKTtcbiAgfTtcbiAgYW5pbWF0ZSgpO1xufVxuZnVuY3Rpb24gZ2V0U2xpZGVUcmFuc2Zvcm1FbChzbGlkZUVsKSB7XG4gIHJldHVybiBzbGlkZUVsLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItc2xpZGUtdHJhbnNmb3JtJykgfHwgc2xpZGVFbC5zaGFkb3dSb290ICYmIHNsaWRlRWwuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLXNsaWRlLXRyYW5zZm9ybScpIHx8IHNsaWRlRWw7XG59XG5mdW5jdGlvbiBlbGVtZW50Q2hpbGRyZW4oZWxlbWVudCwgc2VsZWN0b3IpIHtcbiAgaWYgKHNlbGVjdG9yID09PSB2b2lkIDApIHtcbiAgICBzZWxlY3RvciA9ICcnO1xuICB9XG4gIHJldHVybiBbLi4uZWxlbWVudC5jaGlsZHJlbl0uZmlsdGVyKGVsID0+IGVsLm1hdGNoZXMoc2VsZWN0b3IpKTtcbn1cbmZ1bmN0aW9uIHNob3dXYXJuaW5nKHRleHQpIHtcbiAgdHJ5IHtcbiAgICBjb25zb2xlLndhcm4odGV4dCk7XG4gICAgcmV0dXJuO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICAvLyBlcnJcbiAgfVxufVxuZnVuY3Rpb24gY3JlYXRlRWxlbWVudCh0YWcsIGNsYXNzZXMpIHtcbiAgaWYgKGNsYXNzZXMgPT09IHZvaWQgMCkge1xuICAgIGNsYXNzZXMgPSBbXTtcbiAgfVxuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnKTtcbiAgZWwuY2xhc3NMaXN0LmFkZCguLi4oQXJyYXkuaXNBcnJheShjbGFzc2VzKSA/IGNsYXNzZXMgOiBjbGFzc2VzVG9Ub2tlbnMoY2xhc3NlcykpKTtcbiAgcmV0dXJuIGVsO1xufVxuZnVuY3Rpb24gZWxlbWVudE9mZnNldChlbCkge1xuICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICBjb25zdCBib3ggPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgY29uc3QgYm9keSA9IGRvY3VtZW50LmJvZHk7XG4gIGNvbnN0IGNsaWVudFRvcCA9IGVsLmNsaWVudFRvcCB8fCBib2R5LmNsaWVudFRvcCB8fCAwO1xuICBjb25zdCBjbGllbnRMZWZ0ID0gZWwuY2xpZW50TGVmdCB8fCBib2R5LmNsaWVudExlZnQgfHwgMDtcbiAgY29uc3Qgc2Nyb2xsVG9wID0gZWwgPT09IHdpbmRvdyA/IHdpbmRvdy5zY3JvbGxZIDogZWwuc2Nyb2xsVG9wO1xuICBjb25zdCBzY3JvbGxMZWZ0ID0gZWwgPT09IHdpbmRvdyA/IHdpbmRvdy5zY3JvbGxYIDogZWwuc2Nyb2xsTGVmdDtcbiAgcmV0dXJuIHtcbiAgICB0b3A6IGJveC50b3AgKyBzY3JvbGxUb3AgLSBjbGllbnRUb3AsXG4gICAgbGVmdDogYm94LmxlZnQgKyBzY3JvbGxMZWZ0IC0gY2xpZW50TGVmdFxuICB9O1xufVxuZnVuY3Rpb24gZWxlbWVudFByZXZBbGwoZWwsIHNlbGVjdG9yKSB7XG4gIGNvbnN0IHByZXZFbHMgPSBbXTtcbiAgd2hpbGUgKGVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICBjb25zdCBwcmV2ID0gZWwucHJldmlvdXNFbGVtZW50U2libGluZzsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgaWYgKHByZXYubWF0Y2hlcyhzZWxlY3RvcikpIHByZXZFbHMucHVzaChwcmV2KTtcbiAgICB9IGVsc2UgcHJldkVscy5wdXNoKHByZXYpO1xuICAgIGVsID0gcHJldjtcbiAgfVxuICByZXR1cm4gcHJldkVscztcbn1cbmZ1bmN0aW9uIGVsZW1lbnROZXh0QWxsKGVsLCBzZWxlY3Rvcikge1xuICBjb25zdCBuZXh0RWxzID0gW107XG4gIHdoaWxlIChlbC5uZXh0RWxlbWVudFNpYmxpbmcpIHtcbiAgICBjb25zdCBuZXh0ID0gZWwubmV4dEVsZW1lbnRTaWJsaW5nOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICBpZiAobmV4dC5tYXRjaGVzKHNlbGVjdG9yKSkgbmV4dEVscy5wdXNoKG5leHQpO1xuICAgIH0gZWxzZSBuZXh0RWxzLnB1c2gobmV4dCk7XG4gICAgZWwgPSBuZXh0O1xuICB9XG4gIHJldHVybiBuZXh0RWxzO1xufVxuZnVuY3Rpb24gZWxlbWVudFN0eWxlKGVsLCBwcm9wKSB7XG4gIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUoZWwsIG51bGwpLmdldFByb3BlcnR5VmFsdWUocHJvcCk7XG59XG5mdW5jdGlvbiBlbGVtZW50SW5kZXgoZWwpIHtcbiAgbGV0IGNoaWxkID0gZWw7XG4gIGxldCBpO1xuICBpZiAoY2hpbGQpIHtcbiAgICBpID0gMDtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICB3aGlsZSAoKGNoaWxkID0gY2hpbGQucHJldmlvdXNTaWJsaW5nKSAhPT0gbnVsbCkge1xuICAgICAgaWYgKGNoaWxkLm5vZGVUeXBlID09PSAxKSBpICs9IDE7XG4gICAgfVxuICAgIHJldHVybiBpO1xuICB9XG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG5mdW5jdGlvbiBlbGVtZW50UGFyZW50cyhlbCwgc2VsZWN0b3IpIHtcbiAgY29uc3QgcGFyZW50cyA9IFtdOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGxldCBwYXJlbnQgPSBlbC5wYXJlbnRFbGVtZW50OyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIHdoaWxlIChwYXJlbnQpIHtcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgIGlmIChwYXJlbnQubWF0Y2hlcyhzZWxlY3RvcikpIHBhcmVudHMucHVzaChwYXJlbnQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBwYXJlbnRzLnB1c2gocGFyZW50KTtcbiAgICB9XG4gICAgcGFyZW50ID0gcGFyZW50LnBhcmVudEVsZW1lbnQ7XG4gIH1cbiAgcmV0dXJuIHBhcmVudHM7XG59XG5mdW5jdGlvbiBlbGVtZW50VHJhbnNpdGlvbkVuZChlbCwgY2FsbGJhY2spIHtcbiAgZnVuY3Rpb24gZmlyZUNhbGxCYWNrKGUpIHtcbiAgICBpZiAoZS50YXJnZXQgIT09IGVsKSByZXR1cm47XG4gICAgY2FsbGJhY2suY2FsbChlbCwgZSk7XG4gICAgZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZpcmVDYWxsQmFjayk7XG4gIH1cbiAgaWYgKGNhbGxiYWNrKSB7XG4gICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIGZpcmVDYWxsQmFjayk7XG4gIH1cbn1cbmZ1bmN0aW9uIGVsZW1lbnRPdXRlclNpemUoZWwsIHNpemUsIGluY2x1ZGVNYXJnaW5zKSB7XG4gIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICBpZiAoaW5jbHVkZU1hcmdpbnMpIHtcbiAgICByZXR1cm4gZWxbc2l6ZSA9PT0gJ3dpZHRoJyA/ICdvZmZzZXRXaWR0aCcgOiAnb2Zmc2V0SGVpZ2h0J10gKyBwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGVsLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKHNpemUgPT09ICd3aWR0aCcgPyAnbWFyZ2luLXJpZ2h0JyA6ICdtYXJnaW4tdG9wJykpICsgcGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlbCwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShzaXplID09PSAnd2lkdGgnID8gJ21hcmdpbi1sZWZ0JyA6ICdtYXJnaW4tYm90dG9tJykpO1xuICB9XG4gIHJldHVybiBlbC5vZmZzZXRXaWR0aDtcbn1cblxuZXhwb3J0IHsgZWxlbWVudFBhcmVudHMgYXMgYSwgZWxlbWVudE9mZnNldCBhcyBiLCBjcmVhdGVFbGVtZW50IGFzIGMsIG5vdyBhcyBkLCBlbGVtZW50Q2hpbGRyZW4gYXMgZSwgZWxlbWVudE91dGVyU2l6ZSBhcyBmLCBlbGVtZW50SW5kZXggYXMgZywgY2xhc3Nlc1RvVG9rZW5zIGFzIGgsIGdldFRyYW5zbGF0ZSBhcyBpLCBlbGVtZW50VHJhbnNpdGlvbkVuZCBhcyBqLCBpc09iamVjdCBhcyBrLCBnZXRTbGlkZVRyYW5zZm9ybUVsIGFzIGwsIGVsZW1lbnRTdHlsZSBhcyBtLCBuZXh0VGljayBhcyBuLCBlbGVtZW50TmV4dEFsbCBhcyBvLCBlbGVtZW50UHJldkFsbCBhcyBwLCBhbmltYXRlQ1NTTW9kZVNjcm9sbCBhcyBxLCBzaG93V2FybmluZyBhcyByLCBzZXRDU1NQcm9wZXJ0eSBhcyBzLCBleHRlbmQgYXMgdCwgZGVsZXRlUHJvcHMgYXMgdSB9O1xuIiwgImltcG9ydCB7IGEgYXMgZ2V0V2luZG93LCBnIGFzIGdldERvY3VtZW50IH0gZnJvbSAnLi9zc3Itd2luZG93LmVzbS5tanMnO1xuaW1wb3J0IHsgYSBhcyBlbGVtZW50UGFyZW50cywgbSBhcyBlbGVtZW50U3R5bGUsIGUgYXMgZWxlbWVudENoaWxkcmVuLCBzIGFzIHNldENTU1Byb3BlcnR5LCBmIGFzIGVsZW1lbnRPdXRlclNpemUsIG8gYXMgZWxlbWVudE5leHRBbGwsIHAgYXMgZWxlbWVudFByZXZBbGwsIGkgYXMgZ2V0VHJhbnNsYXRlLCBxIGFzIGFuaW1hdGVDU1NNb2RlU2Nyb2xsLCBuIGFzIG5leHRUaWNrLCByIGFzIHNob3dXYXJuaW5nLCBjIGFzIGNyZWF0ZUVsZW1lbnQsIGQgYXMgbm93LCB0IGFzIGV4dGVuZCwgZyBhcyBlbGVtZW50SW5kZXgsIHUgYXMgZGVsZXRlUHJvcHMgfSBmcm9tICcuL3V0aWxzLm1qcyc7XG5cbmxldCBzdXBwb3J0O1xuZnVuY3Rpb24gY2FsY1N1cHBvcnQoKSB7XG4gIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gIHJldHVybiB7XG4gICAgc21vb3RoU2Nyb2xsOiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlICYmICdzY3JvbGxCZWhhdmlvcicgaW4gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnN0eWxlLFxuICAgIHRvdWNoOiAhISgnb250b3VjaHN0YXJ0JyBpbiB3aW5kb3cgfHwgd2luZG93LkRvY3VtZW50VG91Y2ggJiYgZG9jdW1lbnQgaW5zdGFuY2VvZiB3aW5kb3cuRG9jdW1lbnRUb3VjaClcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldFN1cHBvcnQoKSB7XG4gIGlmICghc3VwcG9ydCkge1xuICAgIHN1cHBvcnQgPSBjYWxjU3VwcG9ydCgpO1xuICB9XG4gIHJldHVybiBzdXBwb3J0O1xufVxuXG5sZXQgZGV2aWNlQ2FjaGVkO1xuZnVuY3Rpb24gY2FsY0RldmljZShfdGVtcCkge1xuICBsZXQge1xuICAgIHVzZXJBZ2VudFxuICB9ID0gX3RlbXAgPT09IHZvaWQgMCA/IHt9IDogX3RlbXA7XG4gIGNvbnN0IHN1cHBvcnQgPSBnZXRTdXBwb3J0KCk7XG4gIGNvbnN0IHdpbmRvdyA9IGdldFdpbmRvdygpO1xuICBjb25zdCBwbGF0Zm9ybSA9IHdpbmRvdy5uYXZpZ2F0b3IucGxhdGZvcm07XG4gIGNvbnN0IHVhID0gdXNlckFnZW50IHx8IHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50O1xuICBjb25zdCBkZXZpY2UgPSB7XG4gICAgaW9zOiBmYWxzZSxcbiAgICBhbmRyb2lkOiBmYWxzZVxuICB9O1xuICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5zY3JlZW4ud2lkdGg7XG4gIGNvbnN0IHNjcmVlbkhlaWdodCA9IHdpbmRvdy5zY3JlZW4uaGVpZ2h0O1xuICBjb25zdCBhbmRyb2lkID0gdWEubWF0Y2goLyhBbmRyb2lkKTs/W1xcc1xcL10rKFtcXGQuXSspPy8pOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG4gIGxldCBpcGFkID0gdWEubWF0Y2goLyhpUGFkKS4qT1NcXHMoW1xcZF9dKykvKTtcbiAgY29uc3QgaXBvZCA9IHVhLm1hdGNoKC8oaVBvZCkoLipPU1xccyhbXFxkX10rKSk/Lyk7XG4gIGNvbnN0IGlwaG9uZSA9ICFpcGFkICYmIHVhLm1hdGNoKC8oaVBob25lXFxzT1N8aU9TKVxccyhbXFxkX10rKS8pO1xuICBjb25zdCB3aW5kb3dzID0gcGxhdGZvcm0gPT09ICdXaW4zMic7XG4gIGxldCBtYWNvcyA9IHBsYXRmb3JtID09PSAnTWFjSW50ZWwnO1xuXG4gIC8vIGlQYWRPcyAxMyBmaXhcbiAgY29uc3QgaVBhZFNjcmVlbnMgPSBbJzEwMjR4MTM2NicsICcxMzY2eDEwMjQnLCAnODM0eDExOTQnLCAnMTE5NHg4MzQnLCAnODM0eDExMTInLCAnMTExMng4MzQnLCAnNzY4eDEwMjQnLCAnMTAyNHg3NjgnLCAnODIweDExODAnLCAnMTE4MHg4MjAnLCAnODEweDEwODAnLCAnMTA4MHg4MTAnXTtcbiAgaWYgKCFpcGFkICYmIG1hY29zICYmIHN1cHBvcnQudG91Y2ggJiYgaVBhZFNjcmVlbnMuaW5kZXhPZihgJHtzY3JlZW5XaWR0aH14JHtzY3JlZW5IZWlnaHR9YCkgPj0gMCkge1xuICAgIGlwYWQgPSB1YS5tYXRjaCgvKFZlcnNpb24pXFwvKFtcXGQuXSspLyk7XG4gICAgaWYgKCFpcGFkKSBpcGFkID0gWzAsIDEsICcxM18wXzAnXTtcbiAgICBtYWNvcyA9IGZhbHNlO1xuICB9XG5cbiAgLy8gQW5kcm9pZFxuICBpZiAoYW5kcm9pZCAmJiAhd2luZG93cykge1xuICAgIGRldmljZS5vcyA9ICdhbmRyb2lkJztcbiAgICBkZXZpY2UuYW5kcm9pZCA9IHRydWU7XG4gIH1cbiAgaWYgKGlwYWQgfHwgaXBob25lIHx8IGlwb2QpIHtcbiAgICBkZXZpY2Uub3MgPSAnaW9zJztcbiAgICBkZXZpY2UuaW9zID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIEV4cG9ydCBvYmplY3RcbiAgcmV0dXJuIGRldmljZTtcbn1cbmZ1bmN0aW9uIGdldERldmljZShvdmVycmlkZXMpIHtcbiAgaWYgKG92ZXJyaWRlcyA9PT0gdm9pZCAwKSB7XG4gICAgb3ZlcnJpZGVzID0ge307XG4gIH1cbiAgaWYgKCFkZXZpY2VDYWNoZWQpIHtcbiAgICBkZXZpY2VDYWNoZWQgPSBjYWxjRGV2aWNlKG92ZXJyaWRlcyk7XG4gIH1cbiAgcmV0dXJuIGRldmljZUNhY2hlZDtcbn1cblxubGV0IGJyb3dzZXI7XG5mdW5jdGlvbiBjYWxjQnJvd3NlcigpIHtcbiAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gIGxldCBuZWVkUGVyc3BlY3RpdmVGaXggPSBmYWxzZTtcbiAgZnVuY3Rpb24gaXNTYWZhcmkoKSB7XG4gICAgY29uc3QgdWEgPSB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpO1xuICAgIHJldHVybiB1YS5pbmRleE9mKCdzYWZhcmknKSA+PSAwICYmIHVhLmluZGV4T2YoJ2Nocm9tZScpIDwgMCAmJiB1YS5pbmRleE9mKCdhbmRyb2lkJykgPCAwO1xuICB9XG4gIGlmIChpc1NhZmFyaSgpKSB7XG4gICAgY29uc3QgdWEgPSBTdHJpbmcod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpO1xuICAgIGlmICh1YS5pbmNsdWRlcygnVmVyc2lvbi8nKSkge1xuICAgICAgY29uc3QgW21ham9yLCBtaW5vcl0gPSB1YS5zcGxpdCgnVmVyc2lvbi8nKVsxXS5zcGxpdCgnICcpWzBdLnNwbGl0KCcuJykubWFwKG51bSA9PiBOdW1iZXIobnVtKSk7XG4gICAgICBuZWVkUGVyc3BlY3RpdmVGaXggPSBtYWpvciA8IDE2IHx8IG1ham9yID09PSAxNiAmJiBtaW5vciA8IDI7XG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgaXNTYWZhcmk6IG5lZWRQZXJzcGVjdGl2ZUZpeCB8fCBpc1NhZmFyaSgpLFxuICAgIG5lZWRQZXJzcGVjdGl2ZUZpeCxcbiAgICBpc1dlYlZpZXc6IC8oaVBob25lfGlQb2R8aVBhZCkuKkFwcGxlV2ViS2l0KD8hLipTYWZhcmkpL2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudClcbiAgfTtcbn1cbmZ1bmN0aW9uIGdldEJyb3dzZXIoKSB7XG4gIGlmICghYnJvd3Nlcikge1xuICAgIGJyb3dzZXIgPSBjYWxjQnJvd3NlcigpO1xuICB9XG4gIHJldHVybiBicm93c2VyO1xufVxuXG5mdW5jdGlvbiBSZXNpemUoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBvbixcbiAgICBlbWl0XG4gIH0gPSBfcmVmO1xuICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgbGV0IG9ic2VydmVyID0gbnVsbDtcbiAgbGV0IGFuaW1hdGlvbkZyYW1lID0gbnVsbDtcbiAgY29uc3QgcmVzaXplSGFuZGxlciA9ICgpID0+IHtcbiAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuaW5pdGlhbGl6ZWQpIHJldHVybjtcbiAgICBlbWl0KCdiZWZvcmVSZXNpemUnKTtcbiAgICBlbWl0KCdyZXNpemUnKTtcbiAgfTtcbiAgY29uc3QgY3JlYXRlT2JzZXJ2ZXIgPSAoKSA9PiB7XG4gICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmluaXRpYWxpemVkKSByZXR1cm47XG4gICAgb2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoZW50cmllcyA9PiB7XG4gICAgICBhbmltYXRpb25GcmFtZSA9IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBjb25zdCB7XG4gICAgICAgICAgd2lkdGgsXG4gICAgICAgICAgaGVpZ2h0XG4gICAgICAgIH0gPSBzd2lwZXI7XG4gICAgICAgIGxldCBuZXdXaWR0aCA9IHdpZHRoO1xuICAgICAgICBsZXQgbmV3SGVpZ2h0ID0gaGVpZ2h0O1xuICAgICAgICBlbnRyaWVzLmZvckVhY2goX3JlZjIgPT4ge1xuICAgICAgICAgIGxldCB7XG4gICAgICAgICAgICBjb250ZW50Qm94U2l6ZSxcbiAgICAgICAgICAgIGNvbnRlbnRSZWN0LFxuICAgICAgICAgICAgdGFyZ2V0XG4gICAgICAgICAgfSA9IF9yZWYyO1xuICAgICAgICAgIGlmICh0YXJnZXQgJiYgdGFyZ2V0ICE9PSBzd2lwZXIuZWwpIHJldHVybjtcbiAgICAgICAgICBuZXdXaWR0aCA9IGNvbnRlbnRSZWN0ID8gY29udGVudFJlY3Qud2lkdGggOiAoY29udGVudEJveFNpemVbMF0gfHwgY29udGVudEJveFNpemUpLmlubGluZVNpemU7XG4gICAgICAgICAgbmV3SGVpZ2h0ID0gY29udGVudFJlY3QgPyBjb250ZW50UmVjdC5oZWlnaHQgOiAoY29udGVudEJveFNpemVbMF0gfHwgY29udGVudEJveFNpemUpLmJsb2NrU2l6ZTtcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChuZXdXaWR0aCAhPT0gd2lkdGggfHwgbmV3SGVpZ2h0ICE9PSBoZWlnaHQpIHtcbiAgICAgICAgICByZXNpemVIYW5kbGVyKCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIG9ic2VydmVyLm9ic2VydmUoc3dpcGVyLmVsKTtcbiAgfTtcbiAgY29uc3QgcmVtb3ZlT2JzZXJ2ZXIgPSAoKSA9PiB7XG4gICAgaWYgKGFuaW1hdGlvbkZyYW1lKSB7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUoYW5pbWF0aW9uRnJhbWUpO1xuICAgIH1cbiAgICBpZiAob2JzZXJ2ZXIgJiYgb2JzZXJ2ZXIudW5vYnNlcnZlICYmIHN3aXBlci5lbCkge1xuICAgICAgb2JzZXJ2ZXIudW5vYnNlcnZlKHN3aXBlci5lbCk7XG4gICAgICBvYnNlcnZlciA9IG51bGw7XG4gICAgfVxuICB9O1xuICBjb25zdCBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIgPSAoKSA9PiB7XG4gICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmluaXRpYWxpemVkKSByZXR1cm47XG4gICAgZW1pdCgnb3JpZW50YXRpb25jaGFuZ2UnKTtcbiAgfTtcbiAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMucmVzaXplT2JzZXJ2ZXIgJiYgdHlwZW9mIHdpbmRvdy5SZXNpemVPYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNyZWF0ZU9ic2VydmVyKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCByZXNpemVIYW5kbGVyKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIpO1xuICB9KTtcbiAgb24oJ2Rlc3Ryb3knLCAoKSA9PiB7XG4gICAgcmVtb3ZlT2JzZXJ2ZXIoKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgcmVzaXplSGFuZGxlcik7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgb3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIE9ic2VydmVyKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgZXh0ZW5kUGFyYW1zLFxuICAgIG9uLFxuICAgIGVtaXRcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IG9ic2VydmVycyA9IFtdO1xuICBjb25zdCB3aW5kb3cgPSBnZXRXaW5kb3coKTtcbiAgY29uc3QgYXR0YWNoID0gZnVuY3Rpb24gKHRhcmdldCwgb3B0aW9ucykge1xuICAgIGlmIChvcHRpb25zID09PSB2b2lkIDApIHtcbiAgICAgIG9wdGlvbnMgPSB7fTtcbiAgICB9XG4gICAgY29uc3QgT2JzZXJ2ZXJGdW5jID0gd2luZG93Lk11dGF0aW9uT2JzZXJ2ZXIgfHwgd2luZG93LldlYmtpdE11dGF0aW9uT2JzZXJ2ZXI7XG4gICAgY29uc3Qgb2JzZXJ2ZXIgPSBuZXcgT2JzZXJ2ZXJGdW5jKG11dGF0aW9ucyA9PiB7XG4gICAgICAvLyBUaGUgb2JzZXJ2ZXJVcGRhdGUgZXZlbnQgc2hvdWxkIG9ubHkgYmUgdHJpZ2dlcmVkXG4gICAgICAvLyBvbmNlIGRlc3BpdGUgdGhlIG51bWJlciBvZiBtdXRhdGlvbnMuICBBZGRpdGlvbmFsXG4gICAgICAvLyB0cmlnZ2VycyBhcmUgcmVkdW5kYW50IGFuZCBhcmUgdmVyeSBjb3N0bHlcbiAgICAgIGlmIChzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXykgcmV0dXJuO1xuICAgICAgaWYgKG11dGF0aW9ucy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgZW1pdCgnb2JzZXJ2ZXJVcGRhdGUnLCBtdXRhdGlvbnNbMF0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvYnNlcnZlclVwZGF0ZSA9IGZ1bmN0aW9uIG9ic2VydmVyVXBkYXRlKCkge1xuICAgICAgICBlbWl0KCdvYnNlcnZlclVwZGF0ZScsIG11dGF0aW9uc1swXSk7XG4gICAgICB9O1xuICAgICAgaWYgKHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpIHtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShvYnNlcnZlclVwZGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3aW5kb3cuc2V0VGltZW91dChvYnNlcnZlclVwZGF0ZSwgMCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgb2JzZXJ2ZXIub2JzZXJ2ZSh0YXJnZXQsIHtcbiAgICAgIGF0dHJpYnV0ZXM6IHR5cGVvZiBvcHRpb25zLmF0dHJpYnV0ZXMgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IG9wdGlvbnMuYXR0cmlidXRlcyxcbiAgICAgIGNoaWxkTGlzdDogdHlwZW9mIG9wdGlvbnMuY2hpbGRMaXN0ID09PSAndW5kZWZpbmVkJyA/IHRydWUgOiBvcHRpb25zLmNoaWxkTGlzdCxcbiAgICAgIGNoYXJhY3RlckRhdGE6IHR5cGVvZiBvcHRpb25zLmNoYXJhY3RlckRhdGEgPT09ICd1bmRlZmluZWQnID8gdHJ1ZSA6IG9wdGlvbnMuY2hhcmFjdGVyRGF0YVxuICAgIH0pO1xuICAgIG9ic2VydmVycy5wdXNoKG9ic2VydmVyKTtcbiAgfTtcbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMub2JzZXJ2ZXIpIHJldHVybjtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5vYnNlcnZlUGFyZW50cykge1xuICAgICAgY29uc3QgY29udGFpbmVyUGFyZW50cyA9IGVsZW1lbnRQYXJlbnRzKHN3aXBlci5ob3N0RWwpO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250YWluZXJQYXJlbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGF0dGFjaChjb250YWluZXJQYXJlbnRzW2ldKTtcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gT2JzZXJ2ZSBjb250YWluZXJcbiAgICBhdHRhY2goc3dpcGVyLmhvc3RFbCwge1xuICAgICAgY2hpbGRMaXN0OiBzd2lwZXIucGFyYW1zLm9ic2VydmVTbGlkZUNoaWxkcmVuXG4gICAgfSk7XG5cbiAgICAvLyBPYnNlcnZlIHdyYXBwZXJcbiAgICBhdHRhY2goc3dpcGVyLndyYXBwZXJFbCwge1xuICAgICAgYXR0cmlidXRlczogZmFsc2VcbiAgICB9KTtcbiAgfTtcbiAgY29uc3QgZGVzdHJveSA9ICgpID0+IHtcbiAgICBvYnNlcnZlcnMuZm9yRWFjaChvYnNlcnZlciA9PiB7XG4gICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgb2JzZXJ2ZXJzLnNwbGljZSgwLCBvYnNlcnZlcnMubGVuZ3RoKTtcbiAgfTtcbiAgZXh0ZW5kUGFyYW1zKHtcbiAgICBvYnNlcnZlcjogZmFsc2UsXG4gICAgb2JzZXJ2ZVBhcmVudHM6IGZhbHNlLFxuICAgIG9ic2VydmVTbGlkZUNoaWxkcmVuOiBmYWxzZVxuICB9KTtcbiAgb24oJ2luaXQnLCBpbml0KTtcbiAgb24oJ2Rlc3Ryb3knLCBkZXN0cm95KTtcbn1cblxuLyogZXNsaW50LWRpc2FibGUgbm8tdW5kZXJzY29yZS1kYW5nbGUgKi9cblxudmFyIGV2ZW50c0VtaXR0ZXIgPSB7XG4gIG9uKGV2ZW50cywgaGFuZGxlciwgcHJpb3JpdHkpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICBpZiAodHlwZW9mIGhhbmRsZXIgIT09ICdmdW5jdGlvbicpIHJldHVybiBzZWxmO1xuICAgIGNvbnN0IG1ldGhvZCA9IHByaW9yaXR5ID8gJ3Vuc2hpZnQnIDogJ3B1c2gnO1xuICAgIGV2ZW50cy5zcGxpdCgnICcpLmZvckVhY2goZXZlbnQgPT4ge1xuICAgICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0pIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XSA9IFtdO1xuICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdW21ldGhvZF0oaGFuZGxlcik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNlbGY7XG4gIH0sXG4gIG9uY2UoZXZlbnRzLCBoYW5kbGVyLCBwcmlvcml0eSkge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgIGlmICh0eXBlb2YgaGFuZGxlciAhPT0gJ2Z1bmN0aW9uJykgcmV0dXJuIHNlbGY7XG4gICAgZnVuY3Rpb24gb25jZUhhbmRsZXIoKSB7XG4gICAgICBzZWxmLm9mZihldmVudHMsIG9uY2VIYW5kbGVyKTtcbiAgICAgIGlmIChvbmNlSGFuZGxlci5fX2VtaXR0ZXJQcm94eSkge1xuICAgICAgICBkZWxldGUgb25jZUhhbmRsZXIuX19lbWl0dGVyUHJveHk7XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuKSwgX2tleSA9IDA7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgYXJnc1tfa2V5XSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgIH1cbiAgICAgIGhhbmRsZXIuYXBwbHkoc2VsZiwgYXJncyk7XG4gICAgfVxuICAgIG9uY2VIYW5kbGVyLl9fZW1pdHRlclByb3h5ID0gaGFuZGxlcjtcbiAgICByZXR1cm4gc2VsZi5vbihldmVudHMsIG9uY2VIYW5kbGVyLCBwcmlvcml0eSk7XG4gIH0sXG4gIG9uQW55KGhhbmRsZXIsIHByaW9yaXR5KSB7XG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XG4gICAgaWYgKCFzZWxmLmV2ZW50c0xpc3RlbmVycyB8fCBzZWxmLmRlc3Ryb3llZCkgcmV0dXJuIHNlbGY7XG4gICAgaWYgKHR5cGVvZiBoYW5kbGVyICE9PSAnZnVuY3Rpb24nKSByZXR1cm4gc2VsZjtcbiAgICBjb25zdCBtZXRob2QgPSBwcmlvcml0eSA/ICd1bnNoaWZ0JyA6ICdwdXNoJztcbiAgICBpZiAoc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMuaW5kZXhPZihoYW5kbGVyKSA8IDApIHtcbiAgICAgIHNlbGYuZXZlbnRzQW55TGlzdGVuZXJzW21ldGhvZF0oaGFuZGxlcik7XG4gICAgfVxuICAgIHJldHVybiBzZWxmO1xuICB9LFxuICBvZmZBbnkoaGFuZGxlcikge1xuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xuICAgIGlmICghc2VsZi5ldmVudHNMaXN0ZW5lcnMgfHwgc2VsZi5kZXN0cm95ZWQpIHJldHVybiBzZWxmO1xuICAgIGlmICghc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMpIHJldHVybiBzZWxmO1xuICAgIGNvbnN0IGluZGV4ID0gc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMuaW5kZXhPZihoYW5kbGVyKTtcbiAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG4gIH0sXG4gIG9mZihldmVudHMsIGhhbmRsZXIpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzKSByZXR1cm4gc2VsZjtcbiAgICBldmVudHMuc3BsaXQoJyAnKS5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgIGlmICh0eXBlb2YgaGFuZGxlciA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdID0gW107XG4gICAgICB9IGVsc2UgaWYgKHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XSkge1xuICAgICAgICBzZWxmLmV2ZW50c0xpc3RlbmVyc1tldmVudF0uZm9yRWFjaCgoZXZlbnRIYW5kbGVyLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChldmVudEhhbmRsZXIgPT09IGhhbmRsZXIgfHwgZXZlbnRIYW5kbGVyLl9fZW1pdHRlclByb3h5ICYmIGV2ZW50SGFuZGxlci5fX2VtaXR0ZXJQcm94eSA9PT0gaGFuZGxlcikge1xuICAgICAgICAgICAgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfSxcbiAgZW1pdCgpIHtcbiAgICBjb25zdCBzZWxmID0gdGhpcztcbiAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzIHx8IHNlbGYuZGVzdHJveWVkKSByZXR1cm4gc2VsZjtcbiAgICBpZiAoIXNlbGYuZXZlbnRzTGlzdGVuZXJzKSByZXR1cm4gc2VsZjtcbiAgICBsZXQgZXZlbnRzO1xuICAgIGxldCBkYXRhO1xuICAgIGxldCBjb250ZXh0O1xuICAgIGZvciAodmFyIF9sZW4yID0gYXJndW1lbnRzLmxlbmd0aCwgYXJncyA9IG5ldyBBcnJheShfbGVuMiksIF9rZXkyID0gMDsgX2tleTIgPCBfbGVuMjsgX2tleTIrKykge1xuICAgICAgYXJnc1tfa2V5Ml0gPSBhcmd1bWVudHNbX2tleTJdO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGFyZ3NbMF0gPT09ICdzdHJpbmcnIHx8IEFycmF5LmlzQXJyYXkoYXJnc1swXSkpIHtcbiAgICAgIGV2ZW50cyA9IGFyZ3NbMF07XG4gICAgICBkYXRhID0gYXJncy5zbGljZSgxLCBhcmdzLmxlbmd0aCk7XG4gICAgICBjb250ZXh0ID0gc2VsZjtcbiAgICB9IGVsc2Uge1xuICAgICAgZXZlbnRzID0gYXJnc1swXS5ldmVudHM7XG4gICAgICBkYXRhID0gYXJnc1swXS5kYXRhO1xuICAgICAgY29udGV4dCA9IGFyZ3NbMF0uY29udGV4dCB8fCBzZWxmO1xuICAgIH1cbiAgICBkYXRhLnVuc2hpZnQoY29udGV4dCk7XG4gICAgY29uc3QgZXZlbnRzQXJyYXkgPSBBcnJheS5pc0FycmF5KGV2ZW50cykgPyBldmVudHMgOiBldmVudHMuc3BsaXQoJyAnKTtcbiAgICBldmVudHNBcnJheS5mb3JFYWNoKGV2ZW50ID0+IHtcbiAgICAgIGlmIChzZWxmLmV2ZW50c0FueUxpc3RlbmVycyAmJiBzZWxmLmV2ZW50c0FueUxpc3RlbmVycy5sZW5ndGgpIHtcbiAgICAgICAgc2VsZi5ldmVudHNBbnlMaXN0ZW5lcnMuZm9yRWFjaChldmVudEhhbmRsZXIgPT4ge1xuICAgICAgICAgIGV2ZW50SGFuZGxlci5hcHBseShjb250ZXh0LCBbZXZlbnQsIC4uLmRhdGFdKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBpZiAoc2VsZi5ldmVudHNMaXN0ZW5lcnMgJiYgc2VsZi5ldmVudHNMaXN0ZW5lcnNbZXZlbnRdKSB7XG4gICAgICAgIHNlbGYuZXZlbnRzTGlzdGVuZXJzW2V2ZW50XS5mb3JFYWNoKGV2ZW50SGFuZGxlciA9PiB7XG4gICAgICAgICAgZXZlbnRIYW5kbGVyLmFwcGx5KGNvbnRleHQsIGRhdGEpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfVxufTtcblxuZnVuY3Rpb24gdXBkYXRlU2l6ZSgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgbGV0IHdpZHRoO1xuICBsZXQgaGVpZ2h0O1xuICBjb25zdCBlbCA9IHN3aXBlci5lbDtcbiAgaWYgKHR5cGVvZiBzd2lwZXIucGFyYW1zLndpZHRoICE9PSAndW5kZWZpbmVkJyAmJiBzd2lwZXIucGFyYW1zLndpZHRoICE9PSBudWxsKSB7XG4gICAgd2lkdGggPSBzd2lwZXIucGFyYW1zLndpZHRoO1xuICB9IGVsc2Uge1xuICAgIHdpZHRoID0gZWwuY2xpZW50V2lkdGg7XG4gIH1cbiAgaWYgKHR5cGVvZiBzd2lwZXIucGFyYW1zLmhlaWdodCAhPT0gJ3VuZGVmaW5lZCcgJiYgc3dpcGVyLnBhcmFtcy5oZWlnaHQgIT09IG51bGwpIHtcbiAgICBoZWlnaHQgPSBzd2lwZXIucGFyYW1zLmhlaWdodDtcbiAgfSBlbHNlIHtcbiAgICBoZWlnaHQgPSBlbC5jbGllbnRIZWlnaHQ7XG4gIH1cbiAgaWYgKHdpZHRoID09PSAwICYmIHN3aXBlci5pc0hvcml6b250YWwoKSB8fCBoZWlnaHQgPT09IDAgJiYgc3dpcGVyLmlzVmVydGljYWwoKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFN1YnRyYWN0IHBhZGRpbmdzXG4gIHdpZHRoID0gd2lkdGggLSBwYXJzZUludChlbGVtZW50U3R5bGUoZWwsICdwYWRkaW5nLWxlZnQnKSB8fCAwLCAxMCkgLSBwYXJzZUludChlbGVtZW50U3R5bGUoZWwsICdwYWRkaW5nLXJpZ2h0JykgfHwgMCwgMTApO1xuICBoZWlnaHQgPSBoZWlnaHQgLSBwYXJzZUludChlbGVtZW50U3R5bGUoZWwsICdwYWRkaW5nLXRvcCcpIHx8IDAsIDEwKSAtIHBhcnNlSW50KGVsZW1lbnRTdHlsZShlbCwgJ3BhZGRpbmctYm90dG9tJykgfHwgMCwgMTApO1xuICBpZiAoTnVtYmVyLmlzTmFOKHdpZHRoKSkgd2lkdGggPSAwO1xuICBpZiAoTnVtYmVyLmlzTmFOKGhlaWdodCkpIGhlaWdodCA9IDA7XG4gIE9iamVjdC5hc3NpZ24oc3dpcGVyLCB7XG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHNpemU6IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHdpZHRoIDogaGVpZ2h0XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVTbGlkZXMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGZ1bmN0aW9uIGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUobm9kZSwgbGFiZWwpIHtcbiAgICByZXR1cm4gcGFyc2VGbG9hdChub2RlLmdldFByb3BlcnR5VmFsdWUoc3dpcGVyLmdldERpcmVjdGlvbkxhYmVsKGxhYmVsKSkgfHwgMCk7XG4gIH1cbiAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcztcbiAgY29uc3Qge1xuICAgIHdyYXBwZXJFbCxcbiAgICBzbGlkZXNFbCxcbiAgICBzaXplOiBzd2lwZXJTaXplLFxuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIHdyb25nUlRMXG4gIH0gPSBzd2lwZXI7XG4gIGNvbnN0IGlzVmlydHVhbCA9IHN3aXBlci52aXJ0dWFsICYmIHBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gIGNvbnN0IHByZXZpb3VzU2xpZGVzTGVuZ3RoID0gaXNWaXJ0dWFsID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICBjb25zdCBzbGlkZXMgPSBlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAuJHtzd2lwZXIucGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKTtcbiAgY29uc3Qgc2xpZGVzTGVuZ3RoID0gaXNWaXJ0dWFsID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCA6IHNsaWRlcy5sZW5ndGg7XG4gIGxldCBzbmFwR3JpZCA9IFtdO1xuICBjb25zdCBzbGlkZXNHcmlkID0gW107XG4gIGNvbnN0IHNsaWRlc1NpemVzR3JpZCA9IFtdO1xuICBsZXQgb2Zmc2V0QmVmb3JlID0gcGFyYW1zLnNsaWRlc09mZnNldEJlZm9yZTtcbiAgaWYgKHR5cGVvZiBvZmZzZXRCZWZvcmUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvZmZzZXRCZWZvcmUgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QmVmb3JlLmNhbGwoc3dpcGVyKTtcbiAgfVxuICBsZXQgb2Zmc2V0QWZ0ZXIgPSBwYXJhbXMuc2xpZGVzT2Zmc2V0QWZ0ZXI7XG4gIGlmICh0eXBlb2Ygb2Zmc2V0QWZ0ZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICBvZmZzZXRBZnRlciA9IHBhcmFtcy5zbGlkZXNPZmZzZXRBZnRlci5jYWxsKHN3aXBlcik7XG4gIH1cbiAgY29uc3QgcHJldmlvdXNTbmFwR3JpZExlbmd0aCA9IHN3aXBlci5zbmFwR3JpZC5sZW5ndGg7XG4gIGNvbnN0IHByZXZpb3VzU2xpZGVzR3JpZExlbmd0aCA9IHN3aXBlci5zbGlkZXNHcmlkLmxlbmd0aDtcbiAgbGV0IHNwYWNlQmV0d2VlbiA9IHBhcmFtcy5zcGFjZUJldHdlZW47XG4gIGxldCBzbGlkZVBvc2l0aW9uID0gLW9mZnNldEJlZm9yZTtcbiAgbGV0IHByZXZTbGlkZVNpemUgPSAwO1xuICBsZXQgaW5kZXggPSAwO1xuICBpZiAodHlwZW9mIHN3aXBlclNpemUgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICh0eXBlb2Ygc3BhY2VCZXR3ZWVuID09PSAnc3RyaW5nJyAmJiBzcGFjZUJldHdlZW4uaW5kZXhPZignJScpID49IDApIHtcbiAgICBzcGFjZUJldHdlZW4gPSBwYXJzZUZsb2F0KHNwYWNlQmV0d2Vlbi5yZXBsYWNlKCclJywgJycpKSAvIDEwMCAqIHN3aXBlclNpemU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHNwYWNlQmV0d2VlbiA9PT0gJ3N0cmluZycpIHtcbiAgICBzcGFjZUJldHdlZW4gPSBwYXJzZUZsb2F0KHNwYWNlQmV0d2Vlbik7XG4gIH1cbiAgc3dpcGVyLnZpcnR1YWxTaXplID0gLXNwYWNlQmV0d2VlbjtcblxuICAvLyByZXNldCBtYXJnaW5zXG4gIHNsaWRlcy5mb3JFYWNoKHNsaWRlRWwgPT4ge1xuICAgIGlmIChydGwpIHtcbiAgICAgIHNsaWRlRWwuc3R5bGUubWFyZ2luTGVmdCA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZUVsLnN0eWxlLm1hcmdpblJpZ2h0ID0gJyc7XG4gICAgfVxuICAgIHNsaWRlRWwuc3R5bGUubWFyZ2luQm90dG9tID0gJyc7XG4gICAgc2xpZGVFbC5zdHlsZS5tYXJnaW5Ub3AgPSAnJztcbiAgfSk7XG5cbiAgLy8gcmVzZXQgY3NzTW9kZSBvZmZzZXRzXG4gIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgcGFyYW1zLmNzc01vZGUpIHtcbiAgICBzZXRDU1NQcm9wZXJ0eSh3cmFwcGVyRWwsICctLXN3aXBlci1jZW50ZXJlZC1vZmZzZXQtYmVmb3JlJywgJycpO1xuICAgIHNldENTU1Byb3BlcnR5KHdyYXBwZXJFbCwgJy0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1hZnRlcicsICcnKTtcbiAgfVxuICBjb25zdCBncmlkRW5hYmxlZCA9IHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxICYmIHN3aXBlci5ncmlkO1xuICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICBzd2lwZXIuZ3JpZC5pbml0U2xpZGVzKHNsaWRlcyk7XG4gIH0gZWxzZSBpZiAoc3dpcGVyLmdyaWQpIHtcbiAgICBzd2lwZXIuZ3JpZC51bnNldFNsaWRlcygpO1xuICB9XG5cbiAgLy8gQ2FsYyBzbGlkZXNcbiAgbGV0IHNsaWRlU2l6ZTtcbiAgY29uc3Qgc2hvdWxkUmVzZXRTbGlkZVNpemUgPSBwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nICYmIHBhcmFtcy5icmVha3BvaW50cyAmJiBPYmplY3Qua2V5cyhwYXJhbXMuYnJlYWtwb2ludHMpLmZpbHRlcihrZXkgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgcGFyYW1zLmJyZWFrcG9pbnRzW2tleV0uc2xpZGVzUGVyVmlldyAhPT0gJ3VuZGVmaW5lZCc7XG4gIH0pLmxlbmd0aCA+IDA7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzTGVuZ3RoOyBpICs9IDEpIHtcbiAgICBzbGlkZVNpemUgPSAwO1xuICAgIGxldCBzbGlkZTtcbiAgICBpZiAoc2xpZGVzW2ldKSBzbGlkZSA9IHNsaWRlc1tpXTtcbiAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgIHN3aXBlci5ncmlkLnVwZGF0ZVNsaWRlKGksIHNsaWRlLCBzbGlkZXMpO1xuICAgIH1cbiAgICBpZiAoc2xpZGVzW2ldICYmIGVsZW1lbnRTdHlsZShzbGlkZSwgJ2Rpc3BsYXknKSA9PT0gJ25vbmUnKSBjb250aW51ZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG4gICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycpIHtcbiAgICAgIGlmIChzaG91bGRSZXNldFNsaWRlU2l6ZSkge1xuICAgICAgICBzbGlkZXNbaV0uc3R5bGVbc3dpcGVyLmdldERpcmVjdGlvbkxhYmVsKCd3aWR0aCcpXSA9IGBgO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2xpZGVTdHlsZXMgPSBnZXRDb21wdXRlZFN0eWxlKHNsaWRlKTtcbiAgICAgIGNvbnN0IGN1cnJlbnRUcmFuc2Zvcm0gPSBzbGlkZS5zdHlsZS50cmFuc2Zvcm07XG4gICAgICBjb25zdCBjdXJyZW50V2ViS2l0VHJhbnNmb3JtID0gc2xpZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtO1xuICAgICAgaWYgKGN1cnJlbnRUcmFuc2Zvcm0pIHtcbiAgICAgICAgc2xpZGUuc3R5bGUudHJhbnNmb3JtID0gJ25vbmUnO1xuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRXZWJLaXRUcmFuc2Zvcm0pIHtcbiAgICAgICAgc2xpZGUuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gJ25vbmUnO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHtcbiAgICAgICAgc2xpZGVTaXplID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gZWxlbWVudE91dGVyU2l6ZShzbGlkZSwgJ3dpZHRoJywgdHJ1ZSkgOiBlbGVtZW50T3V0ZXJTaXplKHNsaWRlLCAnaGVpZ2h0JywgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgICAgY29uc3Qgd2lkdGggPSBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKHNsaWRlU3R5bGVzLCAnd2lkdGgnKTtcbiAgICAgICAgY29uc3QgcGFkZGluZ0xlZnQgPSBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKHNsaWRlU3R5bGVzLCAncGFkZGluZy1sZWZ0Jyk7XG4gICAgICAgIGNvbnN0IHBhZGRpbmdSaWdodCA9IGdldERpcmVjdGlvblByb3BlcnR5VmFsdWUoc2xpZGVTdHlsZXMsICdwYWRkaW5nLXJpZ2h0Jyk7XG4gICAgICAgIGNvbnN0IG1hcmdpbkxlZnQgPSBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKHNsaWRlU3R5bGVzLCAnbWFyZ2luLWxlZnQnKTtcbiAgICAgICAgY29uc3QgbWFyZ2luUmlnaHQgPSBnZXREaXJlY3Rpb25Qcm9wZXJ0eVZhbHVlKHNsaWRlU3R5bGVzLCAnbWFyZ2luLXJpZ2h0Jyk7XG4gICAgICAgIGNvbnN0IGJveFNpemluZyA9IHNsaWRlU3R5bGVzLmdldFByb3BlcnR5VmFsdWUoJ2JveC1zaXppbmcnKTtcbiAgICAgICAgaWYgKGJveFNpemluZyAmJiBib3hTaXppbmcgPT09ICdib3JkZXItYm94Jykge1xuICAgICAgICAgIHNsaWRlU2l6ZSA9IHdpZHRoICsgbWFyZ2luTGVmdCArIG1hcmdpblJpZ2h0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IHtcbiAgICAgICAgICAgIGNsaWVudFdpZHRoLFxuICAgICAgICAgICAgb2Zmc2V0V2lkdGhcbiAgICAgICAgICB9ID0gc2xpZGU7XG4gICAgICAgICAgc2xpZGVTaXplID0gd2lkdGggKyBwYWRkaW5nTGVmdCArIHBhZGRpbmdSaWdodCArIG1hcmdpbkxlZnQgKyBtYXJnaW5SaWdodCArIChvZmZzZXRXaWR0aCAtIGNsaWVudFdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGN1cnJlbnRUcmFuc2Zvcm0pIHtcbiAgICAgICAgc2xpZGUuc3R5bGUudHJhbnNmb3JtID0gY3VycmVudFRyYW5zZm9ybTtcbiAgICAgIH1cbiAgICAgIGlmIChjdXJyZW50V2ViS2l0VHJhbnNmb3JtKSB7XG4gICAgICAgIHNsaWRlLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IGN1cnJlbnRXZWJLaXRUcmFuc2Zvcm07XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVTaXplID0gTWF0aC5mbG9vcihzbGlkZVNpemUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzbGlkZVNpemUgPSAoc3dpcGVyU2l6ZSAtIChwYXJhbXMuc2xpZGVzUGVyVmlldyAtIDEpICogc3BhY2VCZXR3ZWVuKSAvIHBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlU2l6ZSA9IE1hdGguZmxvb3Ioc2xpZGVTaXplKTtcbiAgICAgIGlmIChzbGlkZXNbaV0pIHtcbiAgICAgICAgc2xpZGVzW2ldLnN0eWxlW3N3aXBlci5nZXREaXJlY3Rpb25MYWJlbCgnd2lkdGgnKV0gPSBgJHtzbGlkZVNpemV9cHhgO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoc2xpZGVzW2ldKSB7XG4gICAgICBzbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplID0gc2xpZGVTaXplO1xuICAgIH1cbiAgICBzbGlkZXNTaXplc0dyaWQucHVzaChzbGlkZVNpemUpO1xuICAgIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgIHNsaWRlUG9zaXRpb24gPSBzbGlkZVBvc2l0aW9uICsgc2xpZGVTaXplIC8gMiArIHByZXZTbGlkZVNpemUgLyAyICsgc3BhY2VCZXR3ZWVuO1xuICAgICAgaWYgKHByZXZTbGlkZVNpemUgPT09IDAgJiYgaSAhPT0gMCkgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gLSBzd2lwZXJTaXplIC8gMiAtIHNwYWNlQmV0d2VlbjtcbiAgICAgIGlmIChpID09PSAwKSBzbGlkZVBvc2l0aW9uID0gc2xpZGVQb3NpdGlvbiAtIHN3aXBlclNpemUgLyAyIC0gc3BhY2VCZXR3ZWVuO1xuICAgICAgaWYgKE1hdGguYWJzKHNsaWRlUG9zaXRpb24pIDwgMSAvIDEwMDApIHNsaWRlUG9zaXRpb24gPSAwO1xuICAgICAgaWYgKHBhcmFtcy5yb3VuZExlbmd0aHMpIHNsaWRlUG9zaXRpb24gPSBNYXRoLmZsb29yKHNsaWRlUG9zaXRpb24pO1xuICAgICAgaWYgKGluZGV4ICUgcGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAwKSBzbmFwR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgc2xpZGVzR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykgc2xpZGVQb3NpdGlvbiA9IE1hdGguZmxvb3Ioc2xpZGVQb3NpdGlvbik7XG4gICAgICBpZiAoKGluZGV4IC0gTWF0aC5taW4oc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAsIGluZGV4KSkgJSBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwID09PSAwKSBzbmFwR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgc2xpZGVzR3JpZC5wdXNoKHNsaWRlUG9zaXRpb24pO1xuICAgICAgc2xpZGVQb3NpdGlvbiA9IHNsaWRlUG9zaXRpb24gKyBzbGlkZVNpemUgKyBzcGFjZUJldHdlZW47XG4gICAgfVxuICAgIHN3aXBlci52aXJ0dWFsU2l6ZSArPSBzbGlkZVNpemUgKyBzcGFjZUJldHdlZW47XG4gICAgcHJldlNsaWRlU2l6ZSA9IHNsaWRlU2l6ZTtcbiAgICBpbmRleCArPSAxO1xuICB9XG4gIHN3aXBlci52aXJ0dWFsU2l6ZSA9IE1hdGgubWF4KHN3aXBlci52aXJ0dWFsU2l6ZSwgc3dpcGVyU2l6ZSkgKyBvZmZzZXRBZnRlcjtcbiAgaWYgKHJ0bCAmJiB3cm9uZ1JUTCAmJiAocGFyYW1zLmVmZmVjdCA9PT0gJ3NsaWRlJyB8fCBwYXJhbXMuZWZmZWN0ID09PSAnY292ZXJmbG93JykpIHtcbiAgICB3cmFwcGVyRWwuc3R5bGUud2lkdGggPSBgJHtzd2lwZXIudmlydHVhbFNpemUgKyBzcGFjZUJldHdlZW59cHhgO1xuICB9XG4gIGlmIChwYXJhbXMuc2V0V3JhcHBlclNpemUpIHtcbiAgICB3cmFwcGVyRWwuc3R5bGVbc3dpcGVyLmdldERpcmVjdGlvbkxhYmVsKCd3aWR0aCcpXSA9IGAke3N3aXBlci52aXJ0dWFsU2l6ZSArIHNwYWNlQmV0d2Vlbn1weGA7XG4gIH1cbiAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgc3dpcGVyLmdyaWQudXBkYXRlV3JhcHBlclNpemUoc2xpZGVTaXplLCBzbmFwR3JpZCk7XG4gIH1cblxuICAvLyBSZW1vdmUgbGFzdCBncmlkIGVsZW1lbnRzIGRlcGVuZGluZyBvbiB3aWR0aFxuICBpZiAoIXBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgIGNvbnN0IG5ld1NsaWRlc0dyaWQgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNuYXBHcmlkLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBsZXQgc2xpZGVzR3JpZEl0ZW0gPSBzbmFwR3JpZFtpXTtcbiAgICAgIGlmIChwYXJhbXMucm91bmRMZW5ndGhzKSBzbGlkZXNHcmlkSXRlbSA9IE1hdGguZmxvb3Ioc2xpZGVzR3JpZEl0ZW0pO1xuICAgICAgaWYgKHNuYXBHcmlkW2ldIDw9IHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpIHtcbiAgICAgICAgbmV3U2xpZGVzR3JpZC5wdXNoKHNsaWRlc0dyaWRJdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc25hcEdyaWQgPSBuZXdTbGlkZXNHcmlkO1xuICAgIGlmIChNYXRoLmZsb29yKHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpIC0gTWF0aC5mbG9vcihzbmFwR3JpZFtzbmFwR3JpZC5sZW5ndGggLSAxXSkgPiAxKSB7XG4gICAgICBzbmFwR3JpZC5wdXNoKHN3aXBlci52aXJ0dWFsU2l6ZSAtIHN3aXBlclNpemUpO1xuICAgIH1cbiAgfVxuICBpZiAoaXNWaXJ0dWFsICYmIHBhcmFtcy5sb29wKSB7XG4gICAgY29uc3Qgc2l6ZSA9IHNsaWRlc1NpemVzR3JpZFswXSArIHNwYWNlQmV0d2VlbjtcbiAgICBpZiAocGFyYW1zLnNsaWRlc1Blckdyb3VwID4gMSkge1xuICAgICAgY29uc3QgZ3JvdXBzID0gTWF0aC5jZWlsKChzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmUgKyBzd2lwZXIudmlydHVhbC5zbGlkZXNBZnRlcikgLyBwYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICAgICAgY29uc3QgZ3JvdXBTaXplID0gc2l6ZSAqIHBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZ3JvdXBzOyBpICs9IDEpIHtcbiAgICAgICAgc25hcEdyaWQucHVzaChzbmFwR3JpZFtzbmFwR3JpZC5sZW5ndGggLSAxXSArIGdyb3VwU2l6ZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3dpcGVyLnZpcnR1YWwuc2xpZGVzQmVmb3JlICsgc3dpcGVyLnZpcnR1YWwuc2xpZGVzQWZ0ZXI7IGkgKz0gMSkge1xuICAgICAgaWYgKHBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMSkge1xuICAgICAgICBzbmFwR3JpZC5wdXNoKHNuYXBHcmlkW3NuYXBHcmlkLmxlbmd0aCAtIDFdICsgc2l6ZSk7XG4gICAgICB9XG4gICAgICBzbGlkZXNHcmlkLnB1c2goc2xpZGVzR3JpZFtzbGlkZXNHcmlkLmxlbmd0aCAtIDFdICsgc2l6ZSk7XG4gICAgICBzd2lwZXIudmlydHVhbFNpemUgKz0gc2l6ZTtcbiAgICB9XG4gIH1cbiAgaWYgKHNuYXBHcmlkLmxlbmd0aCA9PT0gMCkgc25hcEdyaWQgPSBbMF07XG4gIGlmIChzcGFjZUJldHdlZW4gIT09IDApIHtcbiAgICBjb25zdCBrZXkgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgJiYgcnRsID8gJ21hcmdpbkxlZnQnIDogc3dpcGVyLmdldERpcmVjdGlvbkxhYmVsKCdtYXJnaW5SaWdodCcpO1xuICAgIHNsaWRlcy5maWx0ZXIoKF8sIHNsaWRlSW5kZXgpID0+IHtcbiAgICAgIGlmICghcGFyYW1zLmNzc01vZGUgfHwgcGFyYW1zLmxvb3ApIHJldHVybiB0cnVlO1xuICAgICAgaWYgKHNsaWRlSW5kZXggPT09IHNsaWRlcy5sZW5ndGggLSAxKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pLmZvckVhY2goc2xpZGVFbCA9PiB7XG4gICAgICBzbGlkZUVsLnN0eWxlW2tleV0gPSBgJHtzcGFjZUJldHdlZW59cHhgO1xuICAgIH0pO1xuICB9XG4gIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgcGFyYW1zLmNlbnRlcmVkU2xpZGVzQm91bmRzKSB7XG4gICAgbGV0IGFsbFNsaWRlc1NpemUgPSAwO1xuICAgIHNsaWRlc1NpemVzR3JpZC5mb3JFYWNoKHNsaWRlU2l6ZVZhbHVlID0+IHtcbiAgICAgIGFsbFNsaWRlc1NpemUgKz0gc2xpZGVTaXplVmFsdWUgKyAoc3BhY2VCZXR3ZWVuIHx8IDApO1xuICAgIH0pO1xuICAgIGFsbFNsaWRlc1NpemUgLT0gc3BhY2VCZXR3ZWVuO1xuICAgIGNvbnN0IG1heFNuYXAgPSBhbGxTbGlkZXNTaXplIC0gc3dpcGVyU2l6ZTtcbiAgICBzbmFwR3JpZCA9IHNuYXBHcmlkLm1hcChzbmFwID0+IHtcbiAgICAgIGlmIChzbmFwIDw9IDApIHJldHVybiAtb2Zmc2V0QmVmb3JlO1xuICAgICAgaWYgKHNuYXAgPiBtYXhTbmFwKSByZXR1cm4gbWF4U25hcCArIG9mZnNldEFmdGVyO1xuICAgICAgcmV0dXJuIHNuYXA7XG4gICAgfSk7XG4gIH1cbiAgaWYgKHBhcmFtcy5jZW50ZXJJbnN1ZmZpY2llbnRTbGlkZXMpIHtcbiAgICBsZXQgYWxsU2xpZGVzU2l6ZSA9IDA7XG4gICAgc2xpZGVzU2l6ZXNHcmlkLmZvckVhY2goc2xpZGVTaXplVmFsdWUgPT4ge1xuICAgICAgYWxsU2xpZGVzU2l6ZSArPSBzbGlkZVNpemVWYWx1ZSArIChzcGFjZUJldHdlZW4gfHwgMCk7XG4gICAgfSk7XG4gICAgYWxsU2xpZGVzU2l6ZSAtPSBzcGFjZUJldHdlZW47XG4gICAgaWYgKGFsbFNsaWRlc1NpemUgPCBzd2lwZXJTaXplKSB7XG4gICAgICBjb25zdCBhbGxTbGlkZXNPZmZzZXQgPSAoc3dpcGVyU2l6ZSAtIGFsbFNsaWRlc1NpemUpIC8gMjtcbiAgICAgIHNuYXBHcmlkLmZvckVhY2goKHNuYXAsIHNuYXBJbmRleCkgPT4ge1xuICAgICAgICBzbmFwR3JpZFtzbmFwSW5kZXhdID0gc25hcCAtIGFsbFNsaWRlc09mZnNldDtcbiAgICAgIH0pO1xuICAgICAgc2xpZGVzR3JpZC5mb3JFYWNoKChzbmFwLCBzbmFwSW5kZXgpID0+IHtcbiAgICAgICAgc2xpZGVzR3JpZFtzbmFwSW5kZXhdID0gc25hcCArIGFsbFNsaWRlc09mZnNldDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBPYmplY3QuYXNzaWduKHN3aXBlciwge1xuICAgIHNsaWRlcyxcbiAgICBzbmFwR3JpZCxcbiAgICBzbGlkZXNHcmlkLFxuICAgIHNsaWRlc1NpemVzR3JpZFxuICB9KTtcbiAgaWYgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyAmJiBwYXJhbXMuY3NzTW9kZSAmJiAhcGFyYW1zLmNlbnRlcmVkU2xpZGVzQm91bmRzKSB7XG4gICAgc2V0Q1NTUHJvcGVydHkod3JhcHBlckVsLCAnLS1zd2lwZXItY2VudGVyZWQtb2Zmc2V0LWJlZm9yZScsIGAkey1zbmFwR3JpZFswXX1weGApO1xuICAgIHNldENTU1Byb3BlcnR5KHdyYXBwZXJFbCwgJy0tc3dpcGVyLWNlbnRlcmVkLW9mZnNldC1hZnRlcicsIGAke3N3aXBlci5zaXplIC8gMiAtIHNsaWRlc1NpemVzR3JpZFtzbGlkZXNTaXplc0dyaWQubGVuZ3RoIC0gMV0gLyAyfXB4YCk7XG4gICAgY29uc3QgYWRkVG9TbmFwR3JpZCA9IC1zd2lwZXIuc25hcEdyaWRbMF07XG4gICAgY29uc3QgYWRkVG9TbGlkZXNHcmlkID0gLXN3aXBlci5zbGlkZXNHcmlkWzBdO1xuICAgIHN3aXBlci5zbmFwR3JpZCA9IHN3aXBlci5zbmFwR3JpZC5tYXAodiA9PiB2ICsgYWRkVG9TbmFwR3JpZCk7XG4gICAgc3dpcGVyLnNsaWRlc0dyaWQgPSBzd2lwZXIuc2xpZGVzR3JpZC5tYXAodiA9PiB2ICsgYWRkVG9TbGlkZXNHcmlkKTtcbiAgfVxuICBpZiAoc2xpZGVzTGVuZ3RoICE9PSBwcmV2aW91c1NsaWRlc0xlbmd0aCkge1xuICAgIHN3aXBlci5lbWl0KCdzbGlkZXNMZW5ndGhDaGFuZ2UnKTtcbiAgfVxuICBpZiAoc25hcEdyaWQubGVuZ3RoICE9PSBwcmV2aW91c1NuYXBHcmlkTGVuZ3RoKSB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdykgc3dpcGVyLmNoZWNrT3ZlcmZsb3coKTtcbiAgICBzd2lwZXIuZW1pdCgnc25hcEdyaWRMZW5ndGhDaGFuZ2UnKTtcbiAgfVxuICBpZiAoc2xpZGVzR3JpZC5sZW5ndGggIT09IHByZXZpb3VzU2xpZGVzR3JpZExlbmd0aCkge1xuICAgIHN3aXBlci5lbWl0KCdzbGlkZXNHcmlkTGVuZ3RoQ2hhbmdlJyk7XG4gIH1cbiAgaWYgKHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzKSB7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc09mZnNldCgpO1xuICB9XG4gIGlmICghaXNWaXJ0dWFsICYmICFwYXJhbXMuY3NzTW9kZSAmJiAocGFyYW1zLmVmZmVjdCA9PT0gJ3NsaWRlJyB8fCBwYXJhbXMuZWZmZWN0ID09PSAnZmFkZScpKSB7XG4gICAgY29uc3QgYmFja0ZhY2VIaWRkZW5DbGFzcyA9IGAke3BhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfWJhY2tmYWNlLWhpZGRlbmA7XG4gICAgY29uc3QgaGFzQ2xhc3NCYWNrZmFjZUNsYXNzQWRkZWQgPSBzd2lwZXIuZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGJhY2tGYWNlSGlkZGVuQ2xhc3MpO1xuICAgIGlmIChzbGlkZXNMZW5ndGggPD0gcGFyYW1zLm1heEJhY2tmYWNlSGlkZGVuU2xpZGVzKSB7XG4gICAgICBpZiAoIWhhc0NsYXNzQmFja2ZhY2VDbGFzc0FkZGVkKSBzd2lwZXIuZWwuY2xhc3NMaXN0LmFkZChiYWNrRmFjZUhpZGRlbkNsYXNzKTtcbiAgICB9IGVsc2UgaWYgKGhhc0NsYXNzQmFja2ZhY2VDbGFzc0FkZGVkKSB7XG4gICAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LnJlbW92ZShiYWNrRmFjZUhpZGRlbkNsYXNzKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlQXV0b0hlaWdodChzcGVlZCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBhY3RpdmVTbGlkZXMgPSBbXTtcbiAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQ7XG4gIGxldCBuZXdIZWlnaHQgPSAwO1xuICBsZXQgaTtcbiAgaWYgKHR5cGVvZiBzcGVlZCA9PT0gJ251bWJlcicpIHtcbiAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihzcGVlZCk7XG4gIH0gZWxzZSBpZiAoc3BlZWQgPT09IHRydWUpIHtcbiAgICBzd2lwZXIuc2V0VHJhbnNpdGlvbihzd2lwZXIucGFyYW1zLnNwZWVkKTtcbiAgfVxuICBjb25zdCBnZXRTbGlkZUJ5SW5kZXggPSBpbmRleCA9PiB7XG4gICAgaWYgKGlzVmlydHVhbCkge1xuICAgICAgcmV0dXJuIHN3aXBlci5zbGlkZXNbc3dpcGVyLmdldFNsaWRlSW5kZXhCeURhdGEoaW5kZXgpXTtcbiAgICB9XG4gICAgcmV0dXJuIHN3aXBlci5zbGlkZXNbaW5kZXhdO1xuICB9O1xuICAvLyBGaW5kIHNsaWRlcyBjdXJyZW50bHkgaW4gdmlld1xuICBpZiAoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSAnYXV0bycgJiYgc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID4gMSkge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICAoc3dpcGVyLnZpc2libGVTbGlkZXMgfHwgW10pLmZvckVhY2goc2xpZGUgPT4ge1xuICAgICAgICBhY3RpdmVTbGlkZXMucHVzaChzbGlkZSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZm9yIChpID0gMDsgaSA8IE1hdGguY2VpbChzd2lwZXIucGFyYW1zLnNsaWRlc1BlclZpZXcpOyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXggKyBpO1xuICAgICAgICBpZiAoaW5kZXggPiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAmJiAhaXNWaXJ0dWFsKSBicmVhaztcbiAgICAgICAgYWN0aXZlU2xpZGVzLnB1c2goZ2V0U2xpZGVCeUluZGV4KGluZGV4KSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGFjdGl2ZVNsaWRlcy5wdXNoKGdldFNsaWRlQnlJbmRleChzd2lwZXIuYWN0aXZlSW5kZXgpKTtcbiAgfVxuXG4gIC8vIEZpbmQgbmV3IGhlaWdodCBmcm9tIGhpZ2hlc3Qgc2xpZGUgaW4gdmlld1xuICBmb3IgKGkgPSAwOyBpIDwgYWN0aXZlU2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgaWYgKHR5cGVvZiBhY3RpdmVTbGlkZXNbaV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBjb25zdCBoZWlnaHQgPSBhY3RpdmVTbGlkZXNbaV0ub2Zmc2V0SGVpZ2h0O1xuICAgICAgbmV3SGVpZ2h0ID0gaGVpZ2h0ID4gbmV3SGVpZ2h0ID8gaGVpZ2h0IDogbmV3SGVpZ2h0O1xuICAgIH1cbiAgfVxuXG4gIC8vIFVwZGF0ZSBIZWlnaHRcbiAgaWYgKG5ld0hlaWdodCB8fCBuZXdIZWlnaHQgPT09IDApIHN3aXBlci53cmFwcGVyRWwuc3R5bGUuaGVpZ2h0ID0gYCR7bmV3SGVpZ2h0fXB4YDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlU2xpZGVzT2Zmc2V0KCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBzbGlkZXMgPSBzd2lwZXIuc2xpZGVzO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgY29uc3QgbWludXNPZmZzZXQgPSBzd2lwZXIuaXNFbGVtZW50ID8gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gc3dpcGVyLndyYXBwZXJFbC5vZmZzZXRMZWZ0IDogc3dpcGVyLndyYXBwZXJFbC5vZmZzZXRUb3AgOiAwO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgIHNsaWRlc1tpXS5zd2lwZXJTbGlkZU9mZnNldCA9IChzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBzbGlkZXNbaV0ub2Zmc2V0TGVmdCA6IHNsaWRlc1tpXS5vZmZzZXRUb3ApIC0gbWludXNPZmZzZXQgLSBzd2lwZXIuY3NzT3ZlcmZsb3dBZGp1c3RtZW50KCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlU2xpZGVzUHJvZ3Jlc3ModHJhbnNsYXRlKSB7XG4gIGlmICh0cmFuc2xhdGUgPT09IHZvaWQgMCkge1xuICAgIHRyYW5zbGF0ZSA9IHRoaXMgJiYgdGhpcy50cmFuc2xhdGUgfHwgMDtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICBjb25zdCB7XG4gICAgc2xpZGVzLFxuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIHNuYXBHcmlkXG4gIH0gPSBzd2lwZXI7XG4gIGlmIChzbGlkZXMubGVuZ3RoID09PSAwKSByZXR1cm47XG4gIGlmICh0eXBlb2Ygc2xpZGVzWzBdLnN3aXBlclNsaWRlT2Zmc2V0ID09PSAndW5kZWZpbmVkJykgc3dpcGVyLnVwZGF0ZVNsaWRlc09mZnNldCgpO1xuICBsZXQgb2Zmc2V0Q2VudGVyID0gLXRyYW5zbGF0ZTtcbiAgaWYgKHJ0bCkgb2Zmc2V0Q2VudGVyID0gdHJhbnNsYXRlO1xuXG4gIC8vIFZpc2libGUgU2xpZGVzXG4gIHNsaWRlcy5mb3JFYWNoKHNsaWRlRWwgPT4ge1xuICAgIHNsaWRlRWwuY2xhc3NMaXN0LnJlbW92ZShwYXJhbXMuc2xpZGVWaXNpYmxlQ2xhc3MsIHBhcmFtcy5zbGlkZUZ1bGx5VmlzaWJsZUNsYXNzKTtcbiAgfSk7XG4gIHN3aXBlci52aXNpYmxlU2xpZGVzSW5kZXhlcyA9IFtdO1xuICBzd2lwZXIudmlzaWJsZVNsaWRlcyA9IFtdO1xuICBsZXQgc3BhY2VCZXR3ZWVuID0gcGFyYW1zLnNwYWNlQmV0d2VlbjtcbiAgaWYgKHR5cGVvZiBzcGFjZUJldHdlZW4gPT09ICdzdHJpbmcnICYmIHNwYWNlQmV0d2Vlbi5pbmRleE9mKCclJykgPj0gMCkge1xuICAgIHNwYWNlQmV0d2VlbiA9IHBhcnNlRmxvYXQoc3BhY2VCZXR3ZWVuLnJlcGxhY2UoJyUnLCAnJykpIC8gMTAwICogc3dpcGVyLnNpemU7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHNwYWNlQmV0d2VlbiA9PT0gJ3N0cmluZycpIHtcbiAgICBzcGFjZUJldHdlZW4gPSBwYXJzZUZsb2F0KHNwYWNlQmV0d2Vlbik7XG4gIH1cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICBjb25zdCBzbGlkZSA9IHNsaWRlc1tpXTtcbiAgICBsZXQgc2xpZGVPZmZzZXQgPSBzbGlkZS5zd2lwZXJTbGlkZU9mZnNldDtcbiAgICBpZiAocGFyYW1zLmNzc01vZGUgJiYgcGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICBzbGlkZU9mZnNldCAtPSBzbGlkZXNbMF0uc3dpcGVyU2xpZGVPZmZzZXQ7XG4gICAgfVxuICAgIGNvbnN0IHNsaWRlUHJvZ3Jlc3MgPSAob2Zmc2V0Q2VudGVyICsgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHN3aXBlci5taW5UcmFuc2xhdGUoKSA6IDApIC0gc2xpZGVPZmZzZXQpIC8gKHNsaWRlLnN3aXBlclNsaWRlU2l6ZSArIHNwYWNlQmV0d2Vlbik7XG4gICAgY29uc3Qgb3JpZ2luYWxTbGlkZVByb2dyZXNzID0gKG9mZnNldENlbnRlciAtIHNuYXBHcmlkWzBdICsgKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHN3aXBlci5taW5UcmFuc2xhdGUoKSA6IDApIC0gc2xpZGVPZmZzZXQpIC8gKHNsaWRlLnN3aXBlclNsaWRlU2l6ZSArIHNwYWNlQmV0d2Vlbik7XG4gICAgY29uc3Qgc2xpZGVCZWZvcmUgPSAtKG9mZnNldENlbnRlciAtIHNsaWRlT2Zmc2V0KTtcbiAgICBjb25zdCBzbGlkZUFmdGVyID0gc2xpZGVCZWZvcmUgKyBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW2ldO1xuICAgIGNvbnN0IGlzRnVsbHlWaXNpYmxlID0gc2xpZGVCZWZvcmUgPj0gMCAmJiBzbGlkZUJlZm9yZSA8PSBzd2lwZXIuc2l6ZSAtIHN3aXBlci5zbGlkZXNTaXplc0dyaWRbaV07XG4gICAgY29uc3QgaXNWaXNpYmxlID0gc2xpZGVCZWZvcmUgPj0gMCAmJiBzbGlkZUJlZm9yZSA8IHN3aXBlci5zaXplIC0gMSB8fCBzbGlkZUFmdGVyID4gMSAmJiBzbGlkZUFmdGVyIDw9IHN3aXBlci5zaXplIHx8IHNsaWRlQmVmb3JlIDw9IDAgJiYgc2xpZGVBZnRlciA+PSBzd2lwZXIuc2l6ZTtcbiAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICBzd2lwZXIudmlzaWJsZVNsaWRlcy5wdXNoKHNsaWRlKTtcbiAgICAgIHN3aXBlci52aXNpYmxlU2xpZGVzSW5kZXhlcy5wdXNoKGkpO1xuICAgICAgc2xpZGVzW2ldLmNsYXNzTGlzdC5hZGQocGFyYW1zLnNsaWRlVmlzaWJsZUNsYXNzKTtcbiAgICB9XG4gICAgaWYgKGlzRnVsbHlWaXNpYmxlKSB7XG4gICAgICBzbGlkZXNbaV0uY2xhc3NMaXN0LmFkZChwYXJhbXMuc2xpZGVGdWxseVZpc2libGVDbGFzcyk7XG4gICAgfVxuICAgIHNsaWRlLnByb2dyZXNzID0gcnRsID8gLXNsaWRlUHJvZ3Jlc3MgOiBzbGlkZVByb2dyZXNzO1xuICAgIHNsaWRlLm9yaWdpbmFsUHJvZ3Jlc3MgPSBydGwgPyAtb3JpZ2luYWxTbGlkZVByb2dyZXNzIDogb3JpZ2luYWxTbGlkZVByb2dyZXNzO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVByb2dyZXNzKHRyYW5zbGF0ZSkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAodHlwZW9mIHRyYW5zbGF0ZSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBjb25zdCBtdWx0aXBsaWVyID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IC0xIDogMTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICB0cmFuc2xhdGUgPSBzd2lwZXIgJiYgc3dpcGVyLnRyYW5zbGF0ZSAmJiBzd2lwZXIudHJhbnNsYXRlICogbXVsdGlwbGllciB8fCAwO1xuICB9XG4gIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXM7XG4gIGNvbnN0IHRyYW5zbGF0ZXNEaWZmID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICBsZXQge1xuICAgIHByb2dyZXNzLFxuICAgIGlzQmVnaW5uaW5nLFxuICAgIGlzRW5kLFxuICAgIHByb2dyZXNzTG9vcFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCB3YXNCZWdpbm5pbmcgPSBpc0JlZ2lubmluZztcbiAgY29uc3Qgd2FzRW5kID0gaXNFbmQ7XG4gIGlmICh0cmFuc2xhdGVzRGlmZiA9PT0gMCkge1xuICAgIHByb2dyZXNzID0gMDtcbiAgICBpc0JlZ2lubmluZyA9IHRydWU7XG4gICAgaXNFbmQgPSB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHByb2dyZXNzID0gKHRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyB0cmFuc2xhdGVzRGlmZjtcbiAgICBjb25zdCBpc0JlZ2lubmluZ1JvdW5kZWQgPSBNYXRoLmFicyh0cmFuc2xhdGUgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIDwgMTtcbiAgICBjb25zdCBpc0VuZFJvdW5kZWQgPSBNYXRoLmFicyh0cmFuc2xhdGUgLSBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIDwgMTtcbiAgICBpc0JlZ2lubmluZyA9IGlzQmVnaW5uaW5nUm91bmRlZCB8fCBwcm9ncmVzcyA8PSAwO1xuICAgIGlzRW5kID0gaXNFbmRSb3VuZGVkIHx8IHByb2dyZXNzID49IDE7XG4gICAgaWYgKGlzQmVnaW5uaW5nUm91bmRlZCkgcHJvZ3Jlc3MgPSAwO1xuICAgIGlmIChpc0VuZFJvdW5kZWQpIHByb2dyZXNzID0gMTtcbiAgfVxuICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICBjb25zdCBmaXJzdFNsaWRlSW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleEJ5RGF0YSgwKTtcbiAgICBjb25zdCBsYXN0U2xpZGVJbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4QnlEYXRhKHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMSk7XG4gICAgY29uc3QgZmlyc3RTbGlkZVRyYW5zbGF0ZSA9IHN3aXBlci5zbGlkZXNHcmlkW2ZpcnN0U2xpZGVJbmRleF07XG4gICAgY29uc3QgbGFzdFNsaWRlVHJhbnNsYXRlID0gc3dpcGVyLnNsaWRlc0dyaWRbbGFzdFNsaWRlSW5kZXhdO1xuICAgIGNvbnN0IHRyYW5zbGF0ZU1heCA9IHN3aXBlci5zbGlkZXNHcmlkW3N3aXBlci5zbGlkZXNHcmlkLmxlbmd0aCAtIDFdO1xuICAgIGNvbnN0IHRyYW5zbGF0ZUFicyA9IE1hdGguYWJzKHRyYW5zbGF0ZSk7XG4gICAgaWYgKHRyYW5zbGF0ZUFicyA+PSBmaXJzdFNsaWRlVHJhbnNsYXRlKSB7XG4gICAgICBwcm9ncmVzc0xvb3AgPSAodHJhbnNsYXRlQWJzIC0gZmlyc3RTbGlkZVRyYW5zbGF0ZSkgLyB0cmFuc2xhdGVNYXg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2dyZXNzTG9vcCA9ICh0cmFuc2xhdGVBYnMgKyB0cmFuc2xhdGVNYXggLSBsYXN0U2xpZGVUcmFuc2xhdGUpIC8gdHJhbnNsYXRlTWF4O1xuICAgIH1cbiAgICBpZiAocHJvZ3Jlc3NMb29wID4gMSkgcHJvZ3Jlc3NMb29wIC09IDE7XG4gIH1cbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICBwcm9ncmVzcyxcbiAgICBwcm9ncmVzc0xvb3AsXG4gICAgaXNCZWdpbm5pbmcsXG4gICAgaXNFbmRcbiAgfSk7XG4gIGlmIChwYXJhbXMud2F0Y2hTbGlkZXNQcm9ncmVzcyB8fCBwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgcGFyYW1zLmF1dG9IZWlnaHQpIHN3aXBlci51cGRhdGVTbGlkZXNQcm9ncmVzcyh0cmFuc2xhdGUpO1xuICBpZiAoaXNCZWdpbm5pbmcgJiYgIXdhc0JlZ2lubmluZykge1xuICAgIHN3aXBlci5lbWl0KCdyZWFjaEJlZ2lubmluZyB0b0VkZ2UnKTtcbiAgfVxuICBpZiAoaXNFbmQgJiYgIXdhc0VuZCkge1xuICAgIHN3aXBlci5lbWl0KCdyZWFjaEVuZCB0b0VkZ2UnKTtcbiAgfVxuICBpZiAod2FzQmVnaW5uaW5nICYmICFpc0JlZ2lubmluZyB8fCB3YXNFbmQgJiYgIWlzRW5kKSB7XG4gICAgc3dpcGVyLmVtaXQoJ2Zyb21FZGdlJyk7XG4gIH1cbiAgc3dpcGVyLmVtaXQoJ3Byb2dyZXNzJywgcHJvZ3Jlc3MpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVTbGlkZXNDbGFzc2VzKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgc2xpZGVzLFxuICAgIHBhcmFtcyxcbiAgICBzbGlkZXNFbCxcbiAgICBhY3RpdmVJbmRleFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkO1xuICBjb25zdCBncmlkRW5hYmxlZCA9IHN3aXBlci5ncmlkICYmIHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxO1xuICBjb25zdCBnZXRGaWx0ZXJlZFNsaWRlID0gc2VsZWN0b3IgPT4ge1xuICAgIHJldHVybiBlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAuJHtwYXJhbXMuc2xpZGVDbGFzc30ke3NlbGVjdG9yfSwgc3dpcGVyLXNsaWRlJHtzZWxlY3Rvcn1gKVswXTtcbiAgfTtcbiAgc2xpZGVzLmZvckVhY2goc2xpZGVFbCA9PiB7XG4gICAgc2xpZGVFbC5jbGFzc0xpc3QucmVtb3ZlKHBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzLCBwYXJhbXMuc2xpZGVOZXh0Q2xhc3MsIHBhcmFtcy5zbGlkZVByZXZDbGFzcyk7XG4gIH0pO1xuICBsZXQgYWN0aXZlU2xpZGU7XG4gIGxldCBwcmV2U2xpZGU7XG4gIGxldCBuZXh0U2xpZGU7XG4gIGlmIChpc1ZpcnR1YWwpIHtcbiAgICBpZiAocGFyYW1zLmxvb3ApIHtcbiAgICAgIGxldCBzbGlkZUluZGV4ID0gYWN0aXZlSW5kZXggLSBzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmU7XG4gICAgICBpZiAoc2xpZGVJbmRleCA8IDApIHNsaWRlSW5kZXggPSBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoICsgc2xpZGVJbmRleDtcbiAgICAgIGlmIChzbGlkZUluZGV4ID49IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGgpIHNsaWRlSW5kZXggLT0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aDtcbiAgICAgIGFjdGl2ZVNsaWRlID0gZ2V0RmlsdGVyZWRTbGlkZShgW2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtzbGlkZUluZGV4fVwiXWApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVTbGlkZSA9IGdldEZpbHRlcmVkU2xpZGUoYFtkYXRhLXN3aXBlci1zbGlkZS1pbmRleD1cIiR7YWN0aXZlSW5kZXh9XCJdYCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgYWN0aXZlU2xpZGUgPSBzbGlkZXMuZmlsdGVyKHNsaWRlRWwgPT4gc2xpZGVFbC5jb2x1bW4gPT09IGFjdGl2ZUluZGV4KVswXTtcbiAgICAgIG5leHRTbGlkZSA9IHNsaWRlcy5maWx0ZXIoc2xpZGVFbCA9PiBzbGlkZUVsLmNvbHVtbiA9PT0gYWN0aXZlSW5kZXggKyAxKVswXTtcbiAgICAgIHByZXZTbGlkZSA9IHNsaWRlcy5maWx0ZXIoc2xpZGVFbCA9PiBzbGlkZUVsLmNvbHVtbiA9PT0gYWN0aXZlSW5kZXggLSAxKVswXTtcbiAgICB9IGVsc2Uge1xuICAgICAgYWN0aXZlU2xpZGUgPSBzbGlkZXNbYWN0aXZlSW5kZXhdO1xuICAgIH1cbiAgfVxuICBpZiAoYWN0aXZlU2xpZGUpIHtcbiAgICAvLyBBY3RpdmUgY2xhc3Nlc1xuICAgIGFjdGl2ZVNsaWRlLmNsYXNzTGlzdC5hZGQocGFyYW1zLnNsaWRlQWN0aXZlQ2xhc3MpO1xuICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgaWYgKG5leHRTbGlkZSkge1xuICAgICAgICBuZXh0U2xpZGUuY2xhc3NMaXN0LmFkZChwYXJhbXMuc2xpZGVOZXh0Q2xhc3MpO1xuICAgICAgfVxuICAgICAgaWYgKHByZXZTbGlkZSkge1xuICAgICAgICBwcmV2U2xpZGUuY2xhc3NMaXN0LmFkZChwYXJhbXMuc2xpZGVQcmV2Q2xhc3MpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBOZXh0IFNsaWRlXG4gICAgICBuZXh0U2xpZGUgPSBlbGVtZW50TmV4dEFsbChhY3RpdmVTbGlkZSwgYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYClbMF07XG4gICAgICBpZiAocGFyYW1zLmxvb3AgJiYgIW5leHRTbGlkZSkge1xuICAgICAgICBuZXh0U2xpZGUgPSBzbGlkZXNbMF07XG4gICAgICB9XG4gICAgICBpZiAobmV4dFNsaWRlKSB7XG4gICAgICAgIG5leHRTbGlkZS5jbGFzc0xpc3QuYWRkKHBhcmFtcy5zbGlkZU5leHRDbGFzcyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXYgU2xpZGVcbiAgICAgIHByZXZTbGlkZSA9IGVsZW1lbnRQcmV2QWxsKGFjdGl2ZVNsaWRlLCBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKVswXTtcbiAgICAgIGlmIChwYXJhbXMubG9vcCAmJiAhcHJldlNsaWRlID09PSAwKSB7XG4gICAgICAgIHByZXZTbGlkZSA9IHNsaWRlc1tzbGlkZXMubGVuZ3RoIC0gMV07XG4gICAgICB9XG4gICAgICBpZiAocHJldlNsaWRlKSB7XG4gICAgICAgIHByZXZTbGlkZS5jbGFzc0xpc3QuYWRkKHBhcmFtcy5zbGlkZVByZXZDbGFzcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHN3aXBlci5lbWl0U2xpZGVzQ2xhc3NlcygpO1xufVxuXG5jb25zdCBwcm9jZXNzTGF6eVByZWxvYWRlciA9IChzd2lwZXIsIGltYWdlRWwpID0+IHtcbiAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLnBhcmFtcykgcmV0dXJuO1xuICBjb25zdCBzbGlkZVNlbGVjdG9yID0gKCkgPT4gc3dpcGVyLmlzRWxlbWVudCA/IGBzd2lwZXItc2xpZGVgIDogYC4ke3N3aXBlci5wYXJhbXMuc2xpZGVDbGFzc31gO1xuICBjb25zdCBzbGlkZUVsID0gaW1hZ2VFbC5jbG9zZXN0KHNsaWRlU2VsZWN0b3IoKSk7XG4gIGlmIChzbGlkZUVsKSB7XG4gICAgbGV0IGxhenlFbCA9IHNsaWRlRWwucXVlcnlTZWxlY3RvcihgLiR7c3dpcGVyLnBhcmFtcy5sYXp5UHJlbG9hZGVyQ2xhc3N9YCk7XG4gICAgaWYgKCFsYXp5RWwgJiYgc3dpcGVyLmlzRWxlbWVudCkge1xuICAgICAgaWYgKHNsaWRlRWwuc2hhZG93Um9vdCkge1xuICAgICAgICBsYXp5RWwgPSBzbGlkZUVsLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihgLiR7c3dpcGVyLnBhcmFtcy5sYXp5UHJlbG9hZGVyQ2xhc3N9YCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBpbml0IGxhdGVyXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgaWYgKHNsaWRlRWwuc2hhZG93Um9vdCkge1xuICAgICAgICAgICAgbGF6eUVsID0gc2xpZGVFbC5zaGFkb3dSb290LnF1ZXJ5U2VsZWN0b3IoYC4ke3N3aXBlci5wYXJhbXMubGF6eVByZWxvYWRlckNsYXNzfWApO1xuICAgICAgICAgICAgaWYgKGxhenlFbCkgbGF6eUVsLnJlbW92ZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChsYXp5RWwpIGxhenlFbC5yZW1vdmUoKTtcbiAgfVxufTtcbmNvbnN0IHVubGF6eSA9IChzd2lwZXIsIGluZGV4KSA9PiB7XG4gIGlmICghc3dpcGVyLnNsaWRlc1tpbmRleF0pIHJldHVybjtcbiAgY29uc3QgaW1hZ2VFbCA9IHN3aXBlci5zbGlkZXNbaW5kZXhdLnF1ZXJ5U2VsZWN0b3IoJ1tsb2FkaW5nPVwibGF6eVwiXScpO1xuICBpZiAoaW1hZ2VFbCkgaW1hZ2VFbC5yZW1vdmVBdHRyaWJ1dGUoJ2xvYWRpbmcnKTtcbn07XG5jb25zdCBwcmVsb2FkID0gc3dpcGVyID0+IHtcbiAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLnBhcmFtcykgcmV0dXJuO1xuICBsZXQgYW1vdW50ID0gc3dpcGVyLnBhcmFtcy5sYXp5UHJlbG9hZFByZXZOZXh0O1xuICBjb25zdCBsZW4gPSBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcbiAgaWYgKCFsZW4gfHwgIWFtb3VudCB8fCBhbW91bnQgPCAwKSByZXR1cm47XG4gIGFtb3VudCA9IE1hdGgubWluKGFtb3VudCwgbGVuKTtcbiAgY29uc3Qgc2xpZGVzUGVyVmlldyA9IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nID8gc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCkgOiBNYXRoLmNlaWwoc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJWaWV3KTtcbiAgY29uc3QgYWN0aXZlSW5kZXggPSBzd2lwZXIuYWN0aXZlSW5kZXg7XG4gIGlmIChzd2lwZXIucGFyYW1zLmdyaWQgJiYgc3dpcGVyLnBhcmFtcy5ncmlkLnJvd3MgPiAxKSB7XG4gICAgY29uc3QgYWN0aXZlQ29sdW1uID0gYWN0aXZlSW5kZXg7XG4gICAgY29uc3QgcHJlbG9hZENvbHVtbnMgPSBbYWN0aXZlQ29sdW1uIC0gYW1vdW50XTtcbiAgICBwcmVsb2FkQ29sdW1ucy5wdXNoKC4uLkFycmF5LmZyb20oe1xuICAgICAgbGVuZ3RoOiBhbW91bnRcbiAgICB9KS5tYXAoKF8sIGkpID0+IHtcbiAgICAgIHJldHVybiBhY3RpdmVDb2x1bW4gKyBzbGlkZXNQZXJWaWV3ICsgaTtcbiAgICB9KSk7XG4gICAgc3dpcGVyLnNsaWRlcy5mb3JFYWNoKChzbGlkZUVsLCBpKSA9PiB7XG4gICAgICBpZiAocHJlbG9hZENvbHVtbnMuaW5jbHVkZXMoc2xpZGVFbC5jb2x1bW4pKSB1bmxhenkoc3dpcGVyLCBpKTtcbiAgICB9KTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3Qgc2xpZGVJbmRleExhc3RJblZpZXcgPSBhY3RpdmVJbmRleCArIHNsaWRlc1BlclZpZXcgLSAxO1xuICBpZiAoc3dpcGVyLnBhcmFtcy5yZXdpbmQgfHwgc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgZm9yIChsZXQgaSA9IGFjdGl2ZUluZGV4IC0gYW1vdW50OyBpIDw9IHNsaWRlSW5kZXhMYXN0SW5WaWV3ICsgYW1vdW50OyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHJlYWxJbmRleCA9IChpICUgbGVuICsgbGVuKSAlIGxlbjtcbiAgICAgIGlmIChyZWFsSW5kZXggPCBhY3RpdmVJbmRleCB8fCByZWFsSW5kZXggPiBzbGlkZUluZGV4TGFzdEluVmlldykgdW5sYXp5KHN3aXBlciwgcmVhbEluZGV4KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChsZXQgaSA9IE1hdGgubWF4KGFjdGl2ZUluZGV4IC0gYW1vdW50LCAwKTsgaSA8PSBNYXRoLm1pbihzbGlkZUluZGV4TGFzdEluVmlldyArIGFtb3VudCwgbGVuIC0gMSk7IGkgKz0gMSkge1xuICAgICAgaWYgKGkgIT09IGFjdGl2ZUluZGV4ICYmIChpID4gc2xpZGVJbmRleExhc3RJblZpZXcgfHwgaSA8IGFjdGl2ZUluZGV4KSkge1xuICAgICAgICB1bmxhenkoc3dpcGVyLCBpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldEFjdGl2ZUluZGV4QnlUcmFuc2xhdGUoc3dpcGVyKSB7XG4gIGNvbnN0IHtcbiAgICBzbGlkZXNHcmlkLFxuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBjb25zdCB0cmFuc2xhdGUgPSBzd2lwZXIucnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuICBsZXQgYWN0aXZlSW5kZXg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzR3JpZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgIGlmICh0eXBlb2Ygc2xpZGVzR3JpZFtpICsgMV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBpZiAodHJhbnNsYXRlID49IHNsaWRlc0dyaWRbaV0gJiYgdHJhbnNsYXRlIDwgc2xpZGVzR3JpZFtpICsgMV0gLSAoc2xpZGVzR3JpZFtpICsgMV0gLSBzbGlkZXNHcmlkW2ldKSAvIDIpIHtcbiAgICAgICAgYWN0aXZlSW5kZXggPSBpO1xuICAgICAgfSBlbHNlIGlmICh0cmFuc2xhdGUgPj0gc2xpZGVzR3JpZFtpXSAmJiB0cmFuc2xhdGUgPCBzbGlkZXNHcmlkW2kgKyAxXSkge1xuICAgICAgICBhY3RpdmVJbmRleCA9IGkgKyAxO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodHJhbnNsYXRlID49IHNsaWRlc0dyaWRbaV0pIHtcbiAgICAgIGFjdGl2ZUluZGV4ID0gaTtcbiAgICB9XG4gIH1cbiAgLy8gTm9ybWFsaXplIHNsaWRlSW5kZXhcbiAgaWYgKHBhcmFtcy5ub3JtYWxpemVTbGlkZUluZGV4KSB7XG4gICAgaWYgKGFjdGl2ZUluZGV4IDwgMCB8fCB0eXBlb2YgYWN0aXZlSW5kZXggPT09ICd1bmRlZmluZWQnKSBhY3RpdmVJbmRleCA9IDA7XG4gIH1cbiAgcmV0dXJuIGFjdGl2ZUluZGV4O1xufVxuZnVuY3Rpb24gdXBkYXRlQWN0aXZlSW5kZXgobmV3QWN0aXZlSW5kZXgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgdHJhbnNsYXRlID0gc3dpcGVyLnJ0bFRyYW5zbGF0ZSA/IHN3aXBlci50cmFuc2xhdGUgOiAtc3dpcGVyLnRyYW5zbGF0ZTtcbiAgY29uc3Qge1xuICAgIHNuYXBHcmlkLFxuICAgIHBhcmFtcyxcbiAgICBhY3RpdmVJbmRleDogcHJldmlvdXNJbmRleCxcbiAgICByZWFsSW5kZXg6IHByZXZpb3VzUmVhbEluZGV4LFxuICAgIHNuYXBJbmRleDogcHJldmlvdXNTbmFwSW5kZXhcbiAgfSA9IHN3aXBlcjtcbiAgbGV0IGFjdGl2ZUluZGV4ID0gbmV3QWN0aXZlSW5kZXg7XG4gIGxldCBzbmFwSW5kZXg7XG4gIGNvbnN0IGdldFZpcnR1YWxSZWFsSW5kZXggPSBhSW5kZXggPT4ge1xuICAgIGxldCByZWFsSW5kZXggPSBhSW5kZXggLSBzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmU7XG4gICAgaWYgKHJlYWxJbmRleCA8IDApIHtcbiAgICAgIHJlYWxJbmRleCA9IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggKyByZWFsSW5kZXg7XG4gICAgfVxuICAgIGlmIChyZWFsSW5kZXggPj0gc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCkge1xuICAgICAgcmVhbEluZGV4IC09IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGg7XG4gICAgfVxuICAgIHJldHVybiByZWFsSW5kZXg7XG4gIH07XG4gIGlmICh0eXBlb2YgYWN0aXZlSW5kZXggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgYWN0aXZlSW5kZXggPSBnZXRBY3RpdmVJbmRleEJ5VHJhbnNsYXRlKHN3aXBlcik7XG4gIH1cbiAgaWYgKHNuYXBHcmlkLmluZGV4T2YodHJhbnNsYXRlKSA+PSAwKSB7XG4gICAgc25hcEluZGV4ID0gc25hcEdyaWQuaW5kZXhPZih0cmFuc2xhdGUpO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHNraXAgPSBNYXRoLm1pbihwYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwLCBhY3RpdmVJbmRleCk7XG4gICAgc25hcEluZGV4ID0gc2tpcCArIE1hdGguZmxvb3IoKGFjdGl2ZUluZGV4IC0gc2tpcCkgLyBwYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICB9XG4gIGlmIChzbmFwSW5kZXggPj0gc25hcEdyaWQubGVuZ3RoKSBzbmFwSW5kZXggPSBzbmFwR3JpZC5sZW5ndGggLSAxO1xuICBpZiAoYWN0aXZlSW5kZXggPT09IHByZXZpb3VzSW5kZXggJiYgIXN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgIGlmIChzbmFwSW5kZXggIT09IHByZXZpb3VzU25hcEluZGV4KSB7XG4gICAgICBzd2lwZXIuc25hcEluZGV4ID0gc25hcEluZGV4O1xuICAgICAgc3dpcGVyLmVtaXQoJ3NuYXBJbmRleENoYW5nZScpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGFjdGl2ZUluZGV4ID09PSBwcmV2aW91c0luZGV4ICYmIHN3aXBlci5wYXJhbXMubG9vcCAmJiBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgIHN3aXBlci5yZWFsSW5kZXggPSBnZXRWaXJ0dWFsUmVhbEluZGV4KGFjdGl2ZUluZGV4KTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgZ3JpZEVuYWJsZWQgPSBzd2lwZXIuZ3JpZCAmJiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMTtcblxuICAvLyBHZXQgcmVhbCBpbmRleFxuICBsZXQgcmVhbEluZGV4O1xuICBpZiAoc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZCAmJiBwYXJhbXMubG9vcCkge1xuICAgIHJlYWxJbmRleCA9IGdldFZpcnR1YWxSZWFsSW5kZXgoYWN0aXZlSW5kZXgpO1xuICB9IGVsc2UgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgY29uc3QgZmlyc3RTbGlkZUluQ29sdW1uID0gc3dpcGVyLnNsaWRlcy5maWx0ZXIoc2xpZGVFbCA9PiBzbGlkZUVsLmNvbHVtbiA9PT0gYWN0aXZlSW5kZXgpWzBdO1xuICAgIGxldCBhY3RpdmVTbGlkZUluZGV4ID0gcGFyc2VJbnQoZmlyc3RTbGlkZUluQ29sdW1uLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKSwgMTApO1xuICAgIGlmIChOdW1iZXIuaXNOYU4oYWN0aXZlU2xpZGVJbmRleCkpIHtcbiAgICAgIGFjdGl2ZVNsaWRlSW5kZXggPSBNYXRoLm1heChzd2lwZXIuc2xpZGVzLmluZGV4T2YoZmlyc3RTbGlkZUluQ29sdW1uKSwgMCk7XG4gICAgfVxuICAgIHJlYWxJbmRleCA9IE1hdGguZmxvb3IoYWN0aXZlU2xpZGVJbmRleCAvIHBhcmFtcy5ncmlkLnJvd3MpO1xuICB9IGVsc2UgaWYgKHN3aXBlci5zbGlkZXNbYWN0aXZlSW5kZXhdKSB7XG4gICAgY29uc3Qgc2xpZGVJbmRleCA9IHN3aXBlci5zbGlkZXNbYWN0aXZlSW5kZXhdLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItc2xpZGUtaW5kZXgnKTtcbiAgICBpZiAoc2xpZGVJbmRleCkge1xuICAgICAgcmVhbEluZGV4ID0gcGFyc2VJbnQoc2xpZGVJbmRleCwgMTApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZWFsSW5kZXggPSBhY3RpdmVJbmRleDtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmVhbEluZGV4ID0gYWN0aXZlSW5kZXg7XG4gIH1cbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICBwcmV2aW91c1NuYXBJbmRleCxcbiAgICBzbmFwSW5kZXgsXG4gICAgcHJldmlvdXNSZWFsSW5kZXgsXG4gICAgcmVhbEluZGV4LFxuICAgIHByZXZpb3VzSW5kZXgsXG4gICAgYWN0aXZlSW5kZXhcbiAgfSk7XG4gIGlmIChzd2lwZXIuaW5pdGlhbGl6ZWQpIHtcbiAgICBwcmVsb2FkKHN3aXBlcik7XG4gIH1cbiAgc3dpcGVyLmVtaXQoJ2FjdGl2ZUluZGV4Q2hhbmdlJyk7XG4gIHN3aXBlci5lbWl0KCdzbmFwSW5kZXhDaGFuZ2UnKTtcbiAgaWYgKHN3aXBlci5pbml0aWFsaXplZCB8fCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCkge1xuICAgIGlmIChwcmV2aW91c1JlYWxJbmRleCAhPT0gcmVhbEluZGV4KSB7XG4gICAgICBzd2lwZXIuZW1pdCgncmVhbEluZGV4Q2hhbmdlJyk7XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KCdzbGlkZUNoYW5nZScpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUNsaWNrZWRTbGlkZShlbCwgcGF0aCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zO1xuICBsZXQgc2xpZGUgPSBlbC5jbG9zZXN0KGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApO1xuICBpZiAoIXNsaWRlICYmIHN3aXBlci5pc0VsZW1lbnQgJiYgcGF0aCAmJiBwYXRoLmxlbmd0aCA+IDEgJiYgcGF0aC5pbmNsdWRlcyhlbCkpIHtcbiAgICBbLi4ucGF0aC5zbGljZShwYXRoLmluZGV4T2YoZWwpICsgMSwgcGF0aC5sZW5ndGgpXS5mb3JFYWNoKHBhdGhFbCA9PiB7XG4gICAgICBpZiAoIXNsaWRlICYmIHBhdGhFbC5tYXRjaGVzICYmIHBhdGhFbC5tYXRjaGVzKGAuJHtwYXJhbXMuc2xpZGVDbGFzc30sIHN3aXBlci1zbGlkZWApKSB7XG4gICAgICAgIHNsaWRlID0gcGF0aEVsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGxldCBzbGlkZUZvdW5kID0gZmFsc2U7XG4gIGxldCBzbGlkZUluZGV4O1xuICBpZiAoc2xpZGUpIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN3aXBlci5zbGlkZXMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGlmIChzd2lwZXIuc2xpZGVzW2ldID09PSBzbGlkZSkge1xuICAgICAgICBzbGlkZUZvdW5kID0gdHJ1ZTtcbiAgICAgICAgc2xpZGVJbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoc2xpZGUgJiYgc2xpZGVGb3VuZCkge1xuICAgIHN3aXBlci5jbGlja2VkU2xpZGUgPSBzbGlkZTtcbiAgICBpZiAoc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICAgIHN3aXBlci5jbGlja2VkSW5kZXggPSBwYXJzZUludChzbGlkZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JyksIDEwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLmNsaWNrZWRJbmRleCA9IHNsaWRlSW5kZXg7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN3aXBlci5jbGlja2VkU2xpZGUgPSB1bmRlZmluZWQ7XG4gICAgc3dpcGVyLmNsaWNrZWRJbmRleCA9IHVuZGVmaW5lZDtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHBhcmFtcy5zbGlkZVRvQ2xpY2tlZFNsaWRlICYmIHN3aXBlci5jbGlja2VkSW5kZXggIT09IHVuZGVmaW5lZCAmJiBzd2lwZXIuY2xpY2tlZEluZGV4ICE9PSBzd2lwZXIuYWN0aXZlSW5kZXgpIHtcbiAgICBzd2lwZXIuc2xpZGVUb0NsaWNrZWRTbGlkZSgpO1xuICB9XG59XG5cbnZhciB1cGRhdGUgPSB7XG4gIHVwZGF0ZVNpemUsXG4gIHVwZGF0ZVNsaWRlcyxcbiAgdXBkYXRlQXV0b0hlaWdodCxcbiAgdXBkYXRlU2xpZGVzT2Zmc2V0LFxuICB1cGRhdGVTbGlkZXNQcm9ncmVzcyxcbiAgdXBkYXRlUHJvZ3Jlc3MsXG4gIHVwZGF0ZVNsaWRlc0NsYXNzZXMsXG4gIHVwZGF0ZUFjdGl2ZUluZGV4LFxuICB1cGRhdGVDbGlja2VkU2xpZGVcbn07XG5cbmZ1bmN0aW9uIGdldFN3aXBlclRyYW5zbGF0ZShheGlzKSB7XG4gIGlmIChheGlzID09PSB2b2lkIDApIHtcbiAgICBheGlzID0gdGhpcy5pc0hvcml6b250YWwoKSA/ICd4JyA6ICd5JztcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIHRyYW5zbGF0ZSxcbiAgICB3cmFwcGVyRWxcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKHBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB7XG4gICAgcmV0dXJuIHJ0bCA/IC10cmFuc2xhdGUgOiB0cmFuc2xhdGU7XG4gIH1cbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgcmV0dXJuIHRyYW5zbGF0ZTtcbiAgfVxuICBsZXQgY3VycmVudFRyYW5zbGF0ZSA9IGdldFRyYW5zbGF0ZSh3cmFwcGVyRWwsIGF4aXMpO1xuICBjdXJyZW50VHJhbnNsYXRlICs9IHN3aXBlci5jc3NPdmVyZmxvd0FkanVzdG1lbnQoKTtcbiAgaWYgKHJ0bCkgY3VycmVudFRyYW5zbGF0ZSA9IC1jdXJyZW50VHJhbnNsYXRlO1xuICByZXR1cm4gY3VycmVudFRyYW5zbGF0ZSB8fCAwO1xufVxuXG5mdW5jdGlvbiBzZXRUcmFuc2xhdGUodHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIHBhcmFtcyxcbiAgICB3cmFwcGVyRWwsXG4gICAgcHJvZ3Jlc3NcbiAgfSA9IHN3aXBlcjtcbiAgbGV0IHggPSAwO1xuICBsZXQgeSA9IDA7XG4gIGNvbnN0IHogPSAwO1xuICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgeCA9IHJ0bCA/IC10cmFuc2xhdGUgOiB0cmFuc2xhdGU7XG4gIH0gZWxzZSB7XG4gICAgeSA9IHRyYW5zbGF0ZTtcbiAgfVxuICBpZiAocGFyYW1zLnJvdW5kTGVuZ3Rocykge1xuICAgIHggPSBNYXRoLmZsb29yKHgpO1xuICAgIHkgPSBNYXRoLmZsb29yKHkpO1xuICB9XG4gIHN3aXBlci5wcmV2aW91c1RyYW5zbGF0ZSA9IHN3aXBlci50cmFuc2xhdGU7XG4gIHN3aXBlci50cmFuc2xhdGUgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB4IDogeTtcbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgd3JhcHBlckVsW3N3aXBlci5pc0hvcml6b250YWwoKSA/ICdzY3JvbGxMZWZ0JyA6ICdzY3JvbGxUb3AnXSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IC14IDogLXk7XG4gIH0gZWxzZSBpZiAoIXBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB7XG4gICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgeCAtPSBzd2lwZXIuY3NzT3ZlcmZsb3dBZGp1c3RtZW50KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHkgLT0gc3dpcGVyLmNzc092ZXJmbG93QWRqdXN0bWVudCgpO1xuICAgIH1cbiAgICB3cmFwcGVyRWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKCR7eH1weCwgJHt5fXB4LCAke3p9cHgpYDtcbiAgfVxuXG4gIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gdXBkYXRlIHByb2dyZXNzXG4gIGxldCBuZXdQcm9ncmVzcztcbiAgY29uc3QgdHJhbnNsYXRlc0RpZmYgPSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgLSBzd2lwZXIubWluVHJhbnNsYXRlKCk7XG4gIGlmICh0cmFuc2xhdGVzRGlmZiA9PT0gMCkge1xuICAgIG5ld1Byb2dyZXNzID0gMDtcbiAgfSBlbHNlIHtcbiAgICBuZXdQcm9ncmVzcyA9ICh0cmFuc2xhdGUgLSBzd2lwZXIubWluVHJhbnNsYXRlKCkpIC8gdHJhbnNsYXRlc0RpZmY7XG4gIH1cbiAgaWYgKG5ld1Byb2dyZXNzICE9PSBwcm9ncmVzcykge1xuICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyh0cmFuc2xhdGUpO1xuICB9XG4gIHN3aXBlci5lbWl0KCdzZXRUcmFuc2xhdGUnLCBzd2lwZXIudHJhbnNsYXRlLCBieUNvbnRyb2xsZXIpO1xufVxuXG5mdW5jdGlvbiBtaW5UcmFuc2xhdGUoKSB7XG4gIHJldHVybiAtdGhpcy5zbmFwR3JpZFswXTtcbn1cblxuZnVuY3Rpb24gbWF4VHJhbnNsYXRlKCkge1xuICByZXR1cm4gLXRoaXMuc25hcEdyaWRbdGhpcy5zbmFwR3JpZC5sZW5ndGggLSAxXTtcbn1cblxuZnVuY3Rpb24gdHJhbnNsYXRlVG8odHJhbnNsYXRlLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCB0cmFuc2xhdGVCb3VuZHMsIGludGVybmFsKSB7XG4gIGlmICh0cmFuc2xhdGUgPT09IHZvaWQgMCkge1xuICAgIHRyYW5zbGF0ZSA9IDA7XG4gIH1cbiAgaWYgKHNwZWVkID09PSB2b2lkIDApIHtcbiAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICB9XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgaWYgKHRyYW5zbGF0ZUJvdW5kcyA9PT0gdm9pZCAwKSB7XG4gICAgdHJhbnNsYXRlQm91bmRzID0gdHJ1ZTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHdyYXBwZXJFbFxuICB9ID0gc3dpcGVyO1xuICBpZiAoc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMucHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IG1pblRyYW5zbGF0ZSA9IHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgY29uc3QgbWF4VHJhbnNsYXRlID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpO1xuICBsZXQgbmV3VHJhbnNsYXRlO1xuICBpZiAodHJhbnNsYXRlQm91bmRzICYmIHRyYW5zbGF0ZSA+IG1pblRyYW5zbGF0ZSkgbmV3VHJhbnNsYXRlID0gbWluVHJhbnNsYXRlO2Vsc2UgaWYgKHRyYW5zbGF0ZUJvdW5kcyAmJiB0cmFuc2xhdGUgPCBtYXhUcmFuc2xhdGUpIG5ld1RyYW5zbGF0ZSA9IG1heFRyYW5zbGF0ZTtlbHNlIG5ld1RyYW5zbGF0ZSA9IHRyYW5zbGF0ZTtcblxuICAvLyBVcGRhdGUgcHJvZ3Jlc3NcbiAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKG5ld1RyYW5zbGF0ZSk7XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkge1xuICAgIGNvbnN0IGlzSCA9IHN3aXBlci5pc0hvcml6b250YWwoKTtcbiAgICBpZiAoc3BlZWQgPT09IDApIHtcbiAgICAgIHdyYXBwZXJFbFtpc0ggPyAnc2Nyb2xsTGVmdCcgOiAnc2Nyb2xsVG9wJ10gPSAtbmV3VHJhbnNsYXRlO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoIXN3aXBlci5zdXBwb3J0LnNtb290aFNjcm9sbCkge1xuICAgICAgICBhbmltYXRlQ1NTTW9kZVNjcm9sbCh7XG4gICAgICAgICAgc3dpcGVyLFxuICAgICAgICAgIHRhcmdldFBvc2l0aW9uOiAtbmV3VHJhbnNsYXRlLFxuICAgICAgICAgIHNpZGU6IGlzSCA/ICdsZWZ0JyA6ICd0b3AnXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHdyYXBwZXJFbC5zY3JvbGxUbyh7XG4gICAgICAgIFtpc0ggPyAnbGVmdCcgOiAndG9wJ106IC1uZXdUcmFuc2xhdGUsXG4gICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJ1xuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChzcGVlZCA9PT0gMCkge1xuICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKDApO1xuICAgIHN3aXBlci5zZXRUcmFuc2xhdGUobmV3VHJhbnNsYXRlKTtcbiAgICBpZiAocnVuQ2FsbGJhY2tzKSB7XG4gICAgICBzd2lwZXIuZW1pdCgnYmVmb3JlVHJhbnNpdGlvblN0YXJ0Jywgc3BlZWQsIGludGVybmFsKTtcbiAgICAgIHN3aXBlci5lbWl0KCd0cmFuc2l0aW9uRW5kJyk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN3aXBlci5zZXRUcmFuc2l0aW9uKHNwZWVkKTtcbiAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1RyYW5zbGF0ZSk7XG4gICAgaWYgKHJ1bkNhbGxiYWNrcykge1xuICAgICAgc3dpcGVyLmVtaXQoJ2JlZm9yZVRyYW5zaXRpb25TdGFydCcsIHNwZWVkLCBpbnRlcm5hbCk7XG4gICAgICBzd2lwZXIuZW1pdCgndHJhbnNpdGlvblN0YXJ0Jyk7XG4gICAgfVxuICAgIGlmICghc3dpcGVyLmFuaW1hdGluZykge1xuICAgICAgc3dpcGVyLmFuaW1hdGluZyA9IHRydWU7XG4gICAgICBpZiAoIXN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpIHtcbiAgICAgICAgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZCA9IGZ1bmN0aW9uIHRyYW5zaXRpb25FbmQoZSkge1xuICAgICAgICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQpIHJldHVybjtcbiAgICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMpIHJldHVybjtcbiAgICAgICAgICBzd2lwZXIud3JhcHBlckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgICBzd2lwZXIub25UcmFuc2xhdGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kID0gbnVsbDtcbiAgICAgICAgICBkZWxldGUgc3dpcGVyLm9uVHJhbnNsYXRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZDtcbiAgICAgICAgICBpZiAocnVuQ2FsbGJhY2tzKSB7XG4gICAgICAgICAgICBzd2lwZXIuZW1pdCgndHJhbnNpdGlvbkVuZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIHN3aXBlci53cmFwcGVyRWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIHN3aXBlci5vblRyYW5zbGF0ZVRvV3JhcHBlclRyYW5zaXRpb25FbmQpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxudmFyIHRyYW5zbGF0ZSA9IHtcbiAgZ2V0VHJhbnNsYXRlOiBnZXRTd2lwZXJUcmFuc2xhdGUsXG4gIHNldFRyYW5zbGF0ZSxcbiAgbWluVHJhbnNsYXRlLFxuICBtYXhUcmFuc2xhdGUsXG4gIHRyYW5zbGF0ZVRvXG59O1xuXG5mdW5jdGlvbiBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKCFzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9IGAke2R1cmF0aW9ufW1zYDtcbiAgICBzd2lwZXIud3JhcHBlckVsLnN0eWxlLnRyYW5zaXRpb25EZWxheSA9IGR1cmF0aW9uID09PSAwID8gYDBtc2AgOiAnJztcbiAgfVxuICBzd2lwZXIuZW1pdCgnc2V0VHJhbnNpdGlvbicsIGR1cmF0aW9uLCBieUNvbnRyb2xsZXIpO1xufVxuXG5mdW5jdGlvbiB0cmFuc2l0aW9uRW1pdChfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIHJ1bkNhbGxiYWNrcyxcbiAgICBkaXJlY3Rpb24sXG4gICAgc3RlcFxuICB9ID0gX3JlZjtcbiAgY29uc3Qge1xuICAgIGFjdGl2ZUluZGV4LFxuICAgIHByZXZpb3VzSW5kZXhcbiAgfSA9IHN3aXBlcjtcbiAgbGV0IGRpciA9IGRpcmVjdGlvbjtcbiAgaWYgKCFkaXIpIHtcbiAgICBpZiAoYWN0aXZlSW5kZXggPiBwcmV2aW91c0luZGV4KSBkaXIgPSAnbmV4dCc7ZWxzZSBpZiAoYWN0aXZlSW5kZXggPCBwcmV2aW91c0luZGV4KSBkaXIgPSAncHJldic7ZWxzZSBkaXIgPSAncmVzZXQnO1xuICB9XG4gIHN3aXBlci5lbWl0KGB0cmFuc2l0aW9uJHtzdGVwfWApO1xuICBpZiAocnVuQ2FsbGJhY2tzICYmIGFjdGl2ZUluZGV4ICE9PSBwcmV2aW91c0luZGV4KSB7XG4gICAgaWYgKGRpciA9PT0gJ3Jlc2V0Jykge1xuICAgICAgc3dpcGVyLmVtaXQoYHNsaWRlUmVzZXRUcmFuc2l0aW9uJHtzdGVwfWApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdChgc2xpZGVDaGFuZ2VUcmFuc2l0aW9uJHtzdGVwfWApO1xuICAgIGlmIChkaXIgPT09ICduZXh0Jykge1xuICAgICAgc3dpcGVyLmVtaXQoYHNsaWRlTmV4dFRyYW5zaXRpb24ke3N0ZXB9YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5lbWl0KGBzbGlkZVByZXZUcmFuc2l0aW9uJHtzdGVwfWApO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiB0cmFuc2l0aW9uU3RhcnQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pIHtcbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zXG4gIH0gPSBzd2lwZXI7XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkgcmV0dXJuO1xuICBpZiAocGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICBzd2lwZXIudXBkYXRlQXV0b0hlaWdodCgpO1xuICB9XG4gIHRyYW5zaXRpb25FbWl0KHtcbiAgICBzd2lwZXIsXG4gICAgcnVuQ2FsbGJhY2tzLFxuICAgIGRpcmVjdGlvbixcbiAgICBzdGVwOiAnU3RhcnQnXG4gIH0pO1xufVxuXG5mdW5jdGlvbiB0cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKSB7XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBzd2lwZXIuYW5pbWF0aW5nID0gZmFsc2U7XG4gIGlmIChwYXJhbXMuY3NzTW9kZSkgcmV0dXJuO1xuICBzd2lwZXIuc2V0VHJhbnNpdGlvbigwKTtcbiAgdHJhbnNpdGlvbkVtaXQoe1xuICAgIHN3aXBlcixcbiAgICBydW5DYWxsYmFja3MsXG4gICAgZGlyZWN0aW9uLFxuICAgIHN0ZXA6ICdFbmQnXG4gIH0pO1xufVxuXG52YXIgdHJhbnNpdGlvbiA9IHtcbiAgc2V0VHJhbnNpdGlvbixcbiAgdHJhbnNpdGlvblN0YXJ0LFxuICB0cmFuc2l0aW9uRW5kXG59O1xuXG5mdW5jdGlvbiBzbGlkZVRvKGluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCwgaW5pdGlhbCkge1xuICBpZiAoaW5kZXggPT09IHZvaWQgMCkge1xuICAgIGluZGV4ID0gMDtcbiAgfVxuICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBpZiAodHlwZW9mIGluZGV4ID09PSAnc3RyaW5nJykge1xuICAgIGluZGV4ID0gcGFyc2VJbnQoaW5kZXgsIDEwKTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBsZXQgc2xpZGVJbmRleCA9IGluZGV4O1xuICBpZiAoc2xpZGVJbmRleCA8IDApIHNsaWRlSW5kZXggPSAwO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHNuYXBHcmlkLFxuICAgIHNsaWRlc0dyaWQsXG4gICAgcHJldmlvdXNJbmRleCxcbiAgICBhY3RpdmVJbmRleCxcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICB3cmFwcGVyRWwsXG4gICAgZW5hYmxlZFxuICB9ID0gc3dpcGVyO1xuICBpZiAoc3dpcGVyLmFuaW1hdGluZyAmJiBwYXJhbXMucHJldmVudEludGVyYWN0aW9uT25UcmFuc2l0aW9uIHx8ICFlbmFibGVkICYmICFpbnRlcm5hbCAmJiAhaW5pdGlhbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBza2lwID0gTWF0aC5taW4oc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAsIHNsaWRlSW5kZXgpO1xuICBsZXQgc25hcEluZGV4ID0gc2tpcCArIE1hdGguZmxvb3IoKHNsaWRlSW5kZXggLSBza2lwKSAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApO1xuICBpZiAoc25hcEluZGV4ID49IHNuYXBHcmlkLmxlbmd0aCkgc25hcEluZGV4ID0gc25hcEdyaWQubGVuZ3RoIC0gMTtcbiAgY29uc3QgdHJhbnNsYXRlID0gLXNuYXBHcmlkW3NuYXBJbmRleF07XG4gIC8vIE5vcm1hbGl6ZSBzbGlkZUluZGV4XG4gIGlmIChwYXJhbXMubm9ybWFsaXplU2xpZGVJbmRleCkge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2xpZGVzR3JpZC5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgbm9ybWFsaXplZFRyYW5zbGF0ZSA9IC1NYXRoLmZsb29yKHRyYW5zbGF0ZSAqIDEwMCk7XG4gICAgICBjb25zdCBub3JtYWxpemVkR3JpZCA9IE1hdGguZmxvb3Ioc2xpZGVzR3JpZFtpXSAqIDEwMCk7XG4gICAgICBjb25zdCBub3JtYWxpemVkR3JpZE5leHQgPSBNYXRoLmZsb29yKHNsaWRlc0dyaWRbaSArIDFdICogMTAwKTtcbiAgICAgIGlmICh0eXBlb2Ygc2xpZGVzR3JpZFtpICsgMV0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChub3JtYWxpemVkVHJhbnNsYXRlID49IG5vcm1hbGl6ZWRHcmlkICYmIG5vcm1hbGl6ZWRUcmFuc2xhdGUgPCBub3JtYWxpemVkR3JpZE5leHQgLSAobm9ybWFsaXplZEdyaWROZXh0IC0gbm9ybWFsaXplZEdyaWQpIC8gMikge1xuICAgICAgICAgIHNsaWRlSW5kZXggPSBpO1xuICAgICAgICB9IGVsc2UgaWYgKG5vcm1hbGl6ZWRUcmFuc2xhdGUgPj0gbm9ybWFsaXplZEdyaWQgJiYgbm9ybWFsaXplZFRyYW5zbGF0ZSA8IG5vcm1hbGl6ZWRHcmlkTmV4dCkge1xuICAgICAgICAgIHNsaWRlSW5kZXggPSBpICsgMTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChub3JtYWxpemVkVHJhbnNsYXRlID49IG5vcm1hbGl6ZWRHcmlkKSB7XG4gICAgICAgIHNsaWRlSW5kZXggPSBpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICAvLyBEaXJlY3Rpb25zIGxvY2tzXG4gIGlmIChzd2lwZXIuaW5pdGlhbGl6ZWQgJiYgc2xpZGVJbmRleCAhPT0gYWN0aXZlSW5kZXgpIHtcbiAgICBpZiAoIXN3aXBlci5hbGxvd1NsaWRlTmV4dCAmJiAocnRsID8gdHJhbnNsYXRlID4gc3dpcGVyLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUgPiBzd2lwZXIubWluVHJhbnNsYXRlKCkgOiB0cmFuc2xhdGUgPCBzd2lwZXIudHJhbnNsYXRlICYmIHRyYW5zbGF0ZSA8IHN3aXBlci5taW5UcmFuc2xhdGUoKSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFzd2lwZXIuYWxsb3dTbGlkZVByZXYgJiYgdHJhbnNsYXRlID4gc3dpcGVyLnRyYW5zbGF0ZSAmJiB0cmFuc2xhdGUgPiBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcbiAgICAgIGlmICgoYWN0aXZlSW5kZXggfHwgMCkgIT09IHNsaWRlSW5kZXgpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoc2xpZGVJbmRleCAhPT0gKHByZXZpb3VzSW5kZXggfHwgMCkgJiYgcnVuQ2FsbGJhY2tzKSB7XG4gICAgc3dpcGVyLmVtaXQoJ2JlZm9yZVNsaWRlQ2hhbmdlU3RhcnQnKTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSBwcm9ncmVzc1xuICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3ModHJhbnNsYXRlKTtcbiAgbGV0IGRpcmVjdGlvbjtcbiAgaWYgKHNsaWRlSW5kZXggPiBhY3RpdmVJbmRleCkgZGlyZWN0aW9uID0gJ25leHQnO2Vsc2UgaWYgKHNsaWRlSW5kZXggPCBhY3RpdmVJbmRleCkgZGlyZWN0aW9uID0gJ3ByZXYnO2Vsc2UgZGlyZWN0aW9uID0gJ3Jlc2V0JztcblxuICAvLyBVcGRhdGUgSW5kZXhcbiAgaWYgKHJ0bCAmJiAtdHJhbnNsYXRlID09PSBzd2lwZXIudHJhbnNsYXRlIHx8ICFydGwgJiYgdHJhbnNsYXRlID09PSBzd2lwZXIudHJhbnNsYXRlKSB7XG4gICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KHNsaWRlSW5kZXgpO1xuICAgIC8vIFVwZGF0ZSBIZWlnaHRcbiAgICBpZiAocGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICAgIHN3aXBlci51cGRhdGVBdXRvSGVpZ2h0KCk7XG4gICAgfVxuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgaWYgKHBhcmFtcy5lZmZlY3QgIT09ICdzbGlkZScpIHtcbiAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUodHJhbnNsYXRlKTtcbiAgICB9XG4gICAgaWYgKGRpcmVjdGlvbiAhPT0gJ3Jlc2V0Jykge1xuICAgICAgc3dpcGVyLnRyYW5zaXRpb25TdGFydChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gICAgICBzd2lwZXIudHJhbnNpdGlvbkVuZChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICBjb25zdCBpc0ggPSBzd2lwZXIuaXNIb3Jpem9udGFsKCk7XG4gICAgY29uc3QgdCA9IHJ0bCA/IHRyYW5zbGF0ZSA6IC10cmFuc2xhdGU7XG4gICAgaWYgKHNwZWVkID09PSAwKSB7XG4gICAgICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgICAgIGlmIChpc1ZpcnR1YWwpIHtcbiAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5zY3JvbGxTbmFwVHlwZSA9ICdub25lJztcbiAgICAgICAgc3dpcGVyLl9pbW1lZGlhdGVWaXJ0dWFsID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChpc1ZpcnR1YWwgJiYgIXN3aXBlci5fY3NzTW9kZVZpcnR1YWxJbml0aWFsU2V0ICYmIHN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlID4gMCkge1xuICAgICAgICBzd2lwZXIuX2Nzc01vZGVWaXJ0dWFsSW5pdGlhbFNldCA9IHRydWU7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgd3JhcHBlckVsW2lzSCA/ICdzY3JvbGxMZWZ0JyA6ICdzY3JvbGxUb3AnXSA9IHQ7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JhcHBlckVsW2lzSCA/ICdzY3JvbGxMZWZ0JyA6ICdzY3JvbGxUb3AnXSA9IHQ7XG4gICAgICB9XG4gICAgICBpZiAoaXNWaXJ0dWFsKSB7XG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5zdHlsZS5zY3JvbGxTbmFwVHlwZSA9ICcnO1xuICAgICAgICAgIHN3aXBlci5faW1tZWRpYXRlVmlydHVhbCA9IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKCFzd2lwZXIuc3VwcG9ydC5zbW9vdGhTY3JvbGwpIHtcbiAgICAgICAgYW5pbWF0ZUNTU01vZGVTY3JvbGwoe1xuICAgICAgICAgIHN3aXBlcixcbiAgICAgICAgICB0YXJnZXRQb3NpdGlvbjogdCxcbiAgICAgICAgICBzaWRlOiBpc0ggPyAnbGVmdCcgOiAndG9wJ1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICB3cmFwcGVyRWwuc2Nyb2xsVG8oe1xuICAgICAgICBbaXNIID8gJ2xlZnQnIDogJ3RvcCddOiB0LFxuICAgICAgICBiZWhhdmlvcjogJ3Ntb290aCdcbiAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBzd2lwZXIuc2V0VHJhbnNpdGlvbihzcGVlZCk7XG4gIHN3aXBlci5zZXRUcmFuc2xhdGUodHJhbnNsYXRlKTtcbiAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KHNsaWRlSW5kZXgpO1xuICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICBzd2lwZXIuZW1pdCgnYmVmb3JlVHJhbnNpdGlvblN0YXJ0Jywgc3BlZWQsIGludGVybmFsKTtcbiAgc3dpcGVyLnRyYW5zaXRpb25TdGFydChydW5DYWxsYmFja3MsIGRpcmVjdGlvbik7XG4gIGlmIChzcGVlZCA9PT0gMCkge1xuICAgIHN3aXBlci50cmFuc2l0aW9uRW5kKHJ1bkNhbGxiYWNrcywgZGlyZWN0aW9uKTtcbiAgfSBlbHNlIGlmICghc3dpcGVyLmFuaW1hdGluZykge1xuICAgIHN3aXBlci5hbmltYXRpbmcgPSB0cnVlO1xuICAgIGlmICghc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKSB7XG4gICAgICBzd2lwZXIub25TbGlkZVRvV3JhcHBlclRyYW5zaXRpb25FbmQgPSBmdW5jdGlvbiB0cmFuc2l0aW9uRW5kKGUpIHtcbiAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICBpZiAoZS50YXJnZXQgIT09IHRoaXMpIHJldHVybjtcbiAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5yZW1vdmVFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgICAgICAgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kID0gbnVsbDtcbiAgICAgICAgZGVsZXRlIHN3aXBlci5vblNsaWRlVG9XcmFwcGVyVHJhbnNpdGlvbkVuZDtcbiAgICAgICAgc3dpcGVyLnRyYW5zaXRpb25FbmQocnVuQ2FsbGJhY2tzLCBkaXJlY3Rpb24pO1xuICAgICAgfTtcbiAgICB9XG4gICAgc3dpcGVyLndyYXBwZXJFbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgc3dpcGVyLm9uU2xpZGVUb1dyYXBwZXJUcmFuc2l0aW9uRW5kKTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2xpZGVUb0xvb3AoaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gIGlmIChpbmRleCA9PT0gdm9pZCAwKSB7XG4gICAgaW5kZXggPSAwO1xuICB9XG4gIGlmIChzcGVlZCA9PT0gdm9pZCAwKSB7XG4gICAgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgfVxuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGlmICh0eXBlb2YgaW5kZXggPT09ICdzdHJpbmcnKSB7XG4gICAgY29uc3QgaW5kZXhBc051bWJlciA9IHBhcnNlSW50KGluZGV4LCAxMCk7XG4gICAgaW5kZXggPSBpbmRleEFzTnVtYmVyO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IGdyaWRFbmFibGVkID0gc3dpcGVyLmdyaWQgJiYgc3dpcGVyLnBhcmFtcy5ncmlkICYmIHN3aXBlci5wYXJhbXMuZ3JpZC5yb3dzID4gMTtcbiAgbGV0IG5ld0luZGV4ID0gaW5kZXg7XG4gIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICBpZiAoc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgbmV3SW5kZXggPSBuZXdJbmRleCArIHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IHRhcmdldFNsaWRlSW5kZXg7XG4gICAgICBpZiAoZ3JpZEVuYWJsZWQpIHtcbiAgICAgICAgY29uc3Qgc2xpZGVJbmRleCA9IG5ld0luZGV4ICogc3dpcGVyLnBhcmFtcy5ncmlkLnJvd3M7XG4gICAgICAgIHRhcmdldFNsaWRlSW5kZXggPSBzd2lwZXIuc2xpZGVzLmZpbHRlcihzbGlkZUVsID0+IHNsaWRlRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpICogMSA9PT0gc2xpZGVJbmRleClbMF0uY29sdW1uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGFyZ2V0U2xpZGVJbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4QnlEYXRhKG5ld0luZGV4KTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGNvbHMgPSBncmlkRW5hYmxlZCA/IE1hdGguY2VpbChzd2lwZXIuc2xpZGVzLmxlbmd0aCAvIHN3aXBlci5wYXJhbXMuZ3JpZC5yb3dzKSA6IHN3aXBlci5zbGlkZXMubGVuZ3RoO1xuICAgICAgY29uc3Qge1xuICAgICAgICBjZW50ZXJlZFNsaWRlc1xuICAgICAgfSA9IHN3aXBlci5wYXJhbXM7XG4gICAgICBsZXQgc2xpZGVzUGVyVmlldyA9IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICAgIGlmIChzbGlkZXNQZXJWaWV3ID09PSAnYXV0bycpIHtcbiAgICAgICAgc2xpZGVzUGVyVmlldyA9IHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2xpZGVzUGVyVmlldyA9IE1hdGguY2VpbChwYXJzZUZsb2F0KHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldywgMTApKTtcbiAgICAgICAgaWYgKGNlbnRlcmVkU2xpZGVzICYmIHNsaWRlc1BlclZpZXcgJSAyID09PSAwKSB7XG4gICAgICAgICAgc2xpZGVzUGVyVmlldyA9IHNsaWRlc1BlclZpZXcgKyAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsZXQgbmVlZExvb3BGaXggPSBjb2xzIC0gdGFyZ2V0U2xpZGVJbmRleCA8IHNsaWRlc1BlclZpZXc7XG4gICAgICBpZiAoY2VudGVyZWRTbGlkZXMpIHtcbiAgICAgICAgbmVlZExvb3BGaXggPSBuZWVkTG9vcEZpeCB8fCB0YXJnZXRTbGlkZUluZGV4IDwgTWF0aC5jZWlsKHNsaWRlc1BlclZpZXcgLyAyKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTG9vcEZpeCkge1xuICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBjZW50ZXJlZFNsaWRlcyA/IHRhcmdldFNsaWRlSW5kZXggPCBzd2lwZXIuYWN0aXZlSW5kZXggPyAncHJldicgOiAnbmV4dCcgOiB0YXJnZXRTbGlkZUluZGV4IC0gc3dpcGVyLmFjdGl2ZUluZGV4IC0gMSA8IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyA/ICduZXh0JyA6ICdwcmV2JztcbiAgICAgICAgc3dpcGVyLmxvb3BGaXgoe1xuICAgICAgICAgIGRpcmVjdGlvbixcbiAgICAgICAgICBzbGlkZVRvOiB0cnVlLFxuICAgICAgICAgIGFjdGl2ZVNsaWRlSW5kZXg6IGRpcmVjdGlvbiA9PT0gJ25leHQnID8gdGFyZ2V0U2xpZGVJbmRleCArIDEgOiB0YXJnZXRTbGlkZUluZGV4IC0gY29scyArIDEsXG4gICAgICAgICAgc2xpZGVSZWFsSW5kZXg6IGRpcmVjdGlvbiA9PT0gJ25leHQnID8gc3dpcGVyLnJlYWxJbmRleCA6IHVuZGVmaW5lZFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgICBjb25zdCBzbGlkZUluZGV4ID0gbmV3SW5kZXggKiBzd2lwZXIucGFyYW1zLmdyaWQucm93cztcbiAgICAgICAgbmV3SW5kZXggPSBzd2lwZXIuc2xpZGVzLmZpbHRlcihzbGlkZUVsID0+IHNsaWRlRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpICogMSA9PT0gc2xpZGVJbmRleClbMF0uY29sdW1uO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3SW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleEJ5RGF0YShuZXdJbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgc3dpcGVyLnNsaWRlVG8obmV3SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgfSk7XG4gIHJldHVybiBzd2lwZXI7XG59XG5cbi8qIGVzbGludCBuby11bnVzZWQtdmFyczogXCJvZmZcIiAqL1xuZnVuY3Rpb24gc2xpZGVOZXh0KHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKSB7XG4gIGlmIChzcGVlZCA9PT0gdm9pZCAwKSB7XG4gICAgc3BlZWQgPSB0aGlzLnBhcmFtcy5zcGVlZDtcbiAgfVxuICBpZiAocnVuQ2FsbGJhY2tzID09PSB2b2lkIDApIHtcbiAgICBydW5DYWxsYmFja3MgPSB0cnVlO1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBlbmFibGVkLFxuICAgIHBhcmFtcyxcbiAgICBhbmltYXRpbmdcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbmFibGVkKSByZXR1cm4gc3dpcGVyO1xuICBsZXQgcGVyR3JvdXAgPSBwYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gIGlmIChwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nICYmIHBhcmFtcy5zbGlkZXNQZXJHcm91cCA9PT0gMSAmJiBwYXJhbXMuc2xpZGVzUGVyR3JvdXBBdXRvKSB7XG4gICAgcGVyR3JvdXAgPSBNYXRoLm1heChzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoJ2N1cnJlbnQnLCB0cnVlKSwgMSk7XG4gIH1cbiAgY29uc3QgaW5jcmVtZW50ID0gc3dpcGVyLmFjdGl2ZUluZGV4IDwgcGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCA/IDEgOiBwZXJHcm91cDtcbiAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgaWYgKGFuaW1hdGluZyAmJiAhaXNWaXJ0dWFsICYmIHBhcmFtcy5sb29wUHJldmVudHNTbGlkaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgc3dpcGVyLmxvb3BGaXgoe1xuICAgICAgZGlyZWN0aW9uOiAnbmV4dCdcbiAgICB9KTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICBzd2lwZXIuX2NsaWVudExlZnQgPSBzd2lwZXIud3JhcHBlckVsLmNsaWVudExlZnQ7XG4gICAgaWYgKHN3aXBlci5hY3RpdmVJbmRleCA9PT0gc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxICYmIHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXggKyBpbmNyZW1lbnQsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIGlmIChwYXJhbXMucmV3aW5kICYmIHN3aXBlci5pc0VuZCkge1xuICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbygwLCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gIH1cbiAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCArIGluY3JlbWVudCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufVxuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cbmZ1bmN0aW9uIHNsaWRlUHJldihzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCkge1xuICBpZiAoc3BlZWQgPT09IHZvaWQgMCkge1xuICAgIHNwZWVkID0gdGhpcy5wYXJhbXMuc3BlZWQ7XG4gIH1cbiAgaWYgKHJ1bkNhbGxiYWNrcyA9PT0gdm9pZCAwKSB7XG4gICAgcnVuQ2FsbGJhY2tzID0gdHJ1ZTtcbiAgfVxuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHNuYXBHcmlkLFxuICAgIHNsaWRlc0dyaWQsXG4gICAgcnRsVHJhbnNsYXRlLFxuICAgIGVuYWJsZWQsXG4gICAgYW5pbWF0aW5nXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZW5hYmxlZCkgcmV0dXJuIHN3aXBlcjtcbiAgY29uc3QgaXNWaXJ0dWFsID0gc3dpcGVyLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcbiAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgaWYgKGFuaW1hdGluZyAmJiAhaXNWaXJ0dWFsICYmIHBhcmFtcy5sb29wUHJldmVudHNTbGlkaW5nKSByZXR1cm4gZmFsc2U7XG4gICAgc3dpcGVyLmxvb3BGaXgoe1xuICAgICAgZGlyZWN0aW9uOiAncHJldidcbiAgICB9KTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICBzd2lwZXIuX2NsaWVudExlZnQgPSBzd2lwZXIud3JhcHBlckVsLmNsaWVudExlZnQ7XG4gIH1cbiAgY29uc3QgdHJhbnNsYXRlID0gcnRsVHJhbnNsYXRlID8gc3dpcGVyLnRyYW5zbGF0ZSA6IC1zd2lwZXIudHJhbnNsYXRlO1xuICBmdW5jdGlvbiBub3JtYWxpemUodmFsKSB7XG4gICAgaWYgKHZhbCA8IDApIHJldHVybiAtTWF0aC5mbG9vcihNYXRoLmFicyh2YWwpKTtcbiAgICByZXR1cm4gTWF0aC5mbG9vcih2YWwpO1xuICB9XG4gIGNvbnN0IG5vcm1hbGl6ZWRUcmFuc2xhdGUgPSBub3JtYWxpemUodHJhbnNsYXRlKTtcbiAgY29uc3Qgbm9ybWFsaXplZFNuYXBHcmlkID0gc25hcEdyaWQubWFwKHZhbCA9PiBub3JtYWxpemUodmFsKSk7XG4gIGxldCBwcmV2U25hcCA9IHNuYXBHcmlkW25vcm1hbGl6ZWRTbmFwR3JpZC5pbmRleE9mKG5vcm1hbGl6ZWRUcmFuc2xhdGUpIC0gMV07XG4gIGlmICh0eXBlb2YgcHJldlNuYXAgPT09ICd1bmRlZmluZWQnICYmIHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgbGV0IHByZXZTbmFwSW5kZXg7XG4gICAgc25hcEdyaWQuZm9yRWFjaCgoc25hcCwgc25hcEluZGV4KSA9PiB7XG4gICAgICBpZiAobm9ybWFsaXplZFRyYW5zbGF0ZSA+PSBzbmFwKSB7XG4gICAgICAgIC8vIHByZXZTbmFwID0gc25hcDtcbiAgICAgICAgcHJldlNuYXBJbmRleCA9IHNuYXBJbmRleDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAodHlwZW9mIHByZXZTbmFwSW5kZXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICBwcmV2U25hcCA9IHNuYXBHcmlkW3ByZXZTbmFwSW5kZXggPiAwID8gcHJldlNuYXBJbmRleCAtIDEgOiBwcmV2U25hcEluZGV4XTtcbiAgICB9XG4gIH1cbiAgbGV0IHByZXZJbmRleCA9IDA7XG4gIGlmICh0eXBlb2YgcHJldlNuYXAgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgcHJldkluZGV4ID0gc2xpZGVzR3JpZC5pbmRleE9mKHByZXZTbmFwKTtcbiAgICBpZiAocHJldkluZGV4IDwgMCkgcHJldkluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4IC0gMTtcbiAgICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyAmJiBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgPT09IDEgJiYgcGFyYW1zLnNsaWRlc1Blckdyb3VwQXV0bykge1xuICAgICAgcHJldkluZGV4ID0gcHJldkluZGV4IC0gc3dpcGVyLnNsaWRlc1BlclZpZXdEeW5hbWljKCdwcmV2aW91cycsIHRydWUpICsgMTtcbiAgICAgIHByZXZJbmRleCA9IE1hdGgubWF4KHByZXZJbmRleCwgMCk7XG4gICAgfVxuICB9XG4gIGlmIChwYXJhbXMucmV3aW5kICYmIHN3aXBlci5pc0JlZ2lubmluZykge1xuICAgIGNvbnN0IGxhc3RJbmRleCA9IHN3aXBlci5wYXJhbXMudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCAmJiBzd2lwZXIudmlydHVhbCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggLSAxIDogc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxO1xuICAgIHJldHVybiBzd2lwZXIuc2xpZGVUbyhsYXN0SW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbiAgfSBlbHNlIGlmIChwYXJhbXMubG9vcCAmJiBzd2lwZXIuYWN0aXZlSW5kZXggPT09IDAgJiYgcGFyYW1zLmNzc01vZGUpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgc3dpcGVyLnNsaWRlVG8ocHJldkluZGV4LCBzcGVlZCwgcnVuQ2FsbGJhY2tzLCBpbnRlcm5hbCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHByZXZJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufVxuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cbmZ1bmN0aW9uIHNsaWRlUmVzZXQoc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpIHtcbiAgaWYgKHNwZWVkID09PSB2b2lkIDApIHtcbiAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICB9XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgcmV0dXJuIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCwgc3BlZWQsIHJ1bkNhbGxiYWNrcywgaW50ZXJuYWwpO1xufVxuXG4vKiBlc2xpbnQgbm8tdW51c2VkLXZhcnM6IFwib2ZmXCIgKi9cbmZ1bmN0aW9uIHNsaWRlVG9DbG9zZXN0KHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsLCB0aHJlc2hvbGQpIHtcbiAgaWYgKHNwZWVkID09PSB2b2lkIDApIHtcbiAgICBzcGVlZCA9IHRoaXMucGFyYW1zLnNwZWVkO1xuICB9XG4gIGlmIChydW5DYWxsYmFja3MgPT09IHZvaWQgMCkge1xuICAgIHJ1bkNhbGxiYWNrcyA9IHRydWU7XG4gIH1cbiAgaWYgKHRocmVzaG9sZCA9PT0gdm9pZCAwKSB7XG4gICAgdGhyZXNob2xkID0gMC41O1xuICB9XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGxldCBpbmRleCA9IHN3aXBlci5hY3RpdmVJbmRleDtcbiAgY29uc3Qgc2tpcCA9IE1hdGgubWluKHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXBTa2lwLCBpbmRleCk7XG4gIGNvbnN0IHNuYXBJbmRleCA9IHNraXAgKyBNYXRoLmZsb29yKChpbmRleCAtIHNraXApIC8gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCk7XG4gIGNvbnN0IHRyYW5zbGF0ZSA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG4gIGlmICh0cmFuc2xhdGUgPj0gc3dpcGVyLnNuYXBHcmlkW3NuYXBJbmRleF0pIHtcbiAgICAvLyBUaGUgY3VycmVudCB0cmFuc2xhdGUgaXMgb24gb3IgYWZ0ZXIgdGhlIGN1cnJlbnQgc25hcCBpbmRleCwgc28gdGhlIGNob2ljZVxuICAgIC8vIGlzIGJldHdlZW4gdGhlIGN1cnJlbnQgaW5kZXggYW5kIHRoZSBvbmUgYWZ0ZXIgaXQuXG4gICAgY29uc3QgY3VycmVudFNuYXAgPSBzd2lwZXIuc25hcEdyaWRbc25hcEluZGV4XTtcbiAgICBjb25zdCBuZXh0U25hcCA9IHN3aXBlci5zbmFwR3JpZFtzbmFwSW5kZXggKyAxXTtcbiAgICBpZiAodHJhbnNsYXRlIC0gY3VycmVudFNuYXAgPiAobmV4dFNuYXAgLSBjdXJyZW50U25hcCkgKiB0aHJlc2hvbGQpIHtcbiAgICAgIGluZGV4ICs9IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXA7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIC8vIFRoZSBjdXJyZW50IHRyYW5zbGF0ZSBpcyBiZWZvcmUgdGhlIGN1cnJlbnQgc25hcCBpbmRleCwgc28gdGhlIGNob2ljZVxuICAgIC8vIGlzIGJldHdlZW4gdGhlIGN1cnJlbnQgaW5kZXggYW5kIHRoZSBvbmUgYmVmb3JlIGl0LlxuICAgIGNvbnN0IHByZXZTbmFwID0gc3dpcGVyLnNuYXBHcmlkW3NuYXBJbmRleCAtIDFdO1xuICAgIGNvbnN0IGN1cnJlbnRTbmFwID0gc3dpcGVyLnNuYXBHcmlkW3NuYXBJbmRleF07XG4gICAgaWYgKHRyYW5zbGF0ZSAtIHByZXZTbmFwIDw9IChjdXJyZW50U25hcCAtIHByZXZTbmFwKSAqIHRocmVzaG9sZCkge1xuICAgICAgaW5kZXggLT0gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICB9XG4gIH1cbiAgaW5kZXggPSBNYXRoLm1heChpbmRleCwgMCk7XG4gIGluZGV4ID0gTWF0aC5taW4oaW5kZXgsIHN3aXBlci5zbGlkZXNHcmlkLmxlbmd0aCAtIDEpO1xuICByZXR1cm4gc3dpcGVyLnNsaWRlVG8oaW5kZXgsIHNwZWVkLCBydW5DYWxsYmFja3MsIGludGVybmFsKTtcbn1cblxuZnVuY3Rpb24gc2xpZGVUb0NsaWNrZWRTbGlkZSgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICBzbGlkZXNFbFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBzbGlkZXNQZXJWaWV3ID0gcGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyA/IHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygpIDogcGFyYW1zLnNsaWRlc1BlclZpZXc7XG4gIGxldCBzbGlkZVRvSW5kZXggPSBzd2lwZXIuY2xpY2tlZEluZGV4O1xuICBsZXQgcmVhbEluZGV4O1xuICBjb25zdCBzbGlkZVNlbGVjdG9yID0gc3dpcGVyLmlzRWxlbWVudCA/IGBzd2lwZXItc2xpZGVgIDogYC4ke3BhcmFtcy5zbGlkZUNsYXNzfWA7XG4gIGlmIChwYXJhbXMubG9vcCkge1xuICAgIGlmIChzd2lwZXIuYW5pbWF0aW5nKSByZXR1cm47XG4gICAgcmVhbEluZGV4ID0gcGFyc2VJbnQoc3dpcGVyLmNsaWNrZWRTbGlkZS5nZXRBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4JyksIDEwKTtcbiAgICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICBpZiAoc2xpZGVUb0luZGV4IDwgc3dpcGVyLmxvb3BlZFNsaWRlcyAtIHNsaWRlc1BlclZpZXcgLyAyIHx8IHNsaWRlVG9JbmRleCA+IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gc3dpcGVyLmxvb3BlZFNsaWRlcyArIHNsaWRlc1BlclZpZXcgLyAyKSB7XG4gICAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICAgIHNsaWRlVG9JbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4KGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYCR7c2xpZGVTZWxlY3Rvcn1bZGF0YS1zd2lwZXItc2xpZGUtaW5kZXg9XCIke3JlYWxJbmRleH1cIl1gKVswXSk7XG4gICAgICAgIG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChzbGlkZVRvSW5kZXggPiBzd2lwZXIuc2xpZGVzLmxlbmd0aCAtIHNsaWRlc1BlclZpZXcpIHtcbiAgICAgIHN3aXBlci5sb29wRml4KCk7XG4gICAgICBzbGlkZVRvSW5kZXggPSBzd2lwZXIuZ2V0U2xpZGVJbmRleChlbGVtZW50Q2hpbGRyZW4oc2xpZGVzRWwsIGAke3NsaWRlU2VsZWN0b3J9W2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4PVwiJHtyZWFsSW5kZXh9XCJdYClbMF0pO1xuICAgICAgbmV4dFRpY2soKCkgPT4ge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzbGlkZVRvSW5kZXgpO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHN3aXBlci5zbGlkZVRvKHNsaWRlVG9JbmRleCk7XG4gIH1cbn1cblxudmFyIHNsaWRlID0ge1xuICBzbGlkZVRvLFxuICBzbGlkZVRvTG9vcCxcbiAgc2xpZGVOZXh0LFxuICBzbGlkZVByZXYsXG4gIHNsaWRlUmVzZXQsXG4gIHNsaWRlVG9DbG9zZXN0LFxuICBzbGlkZVRvQ2xpY2tlZFNsaWRlXG59O1xuXG5mdW5jdGlvbiBsb29wQ3JlYXRlKHNsaWRlUmVhbEluZGV4KSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgc2xpZGVzRWxcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFwYXJhbXMubG9vcCB8fCBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkgcmV0dXJuO1xuICBjb25zdCBpbml0U2xpZGVzID0gKCkgPT4ge1xuICAgIGNvbnN0IHNsaWRlcyA9IGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYCk7XG4gICAgc2xpZGVzLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcsIGluZGV4KTtcbiAgICB9KTtcbiAgfTtcbiAgY29uc3QgZ3JpZEVuYWJsZWQgPSBzd2lwZXIuZ3JpZCAmJiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMTtcbiAgY29uc3Qgc2xpZGVzUGVyR3JvdXAgPSBwYXJhbXMuc2xpZGVzUGVyR3JvdXAgKiAoZ3JpZEVuYWJsZWQgPyBwYXJhbXMuZ3JpZC5yb3dzIDogMSk7XG4gIGNvbnN0IHNob3VsZEZpbGxHcm91cCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoICUgc2xpZGVzUGVyR3JvdXAgIT09IDA7XG4gIGNvbnN0IHNob3VsZEZpbGxHcmlkID0gZ3JpZEVuYWJsZWQgJiYgc3dpcGVyLnNsaWRlcy5sZW5ndGggJSBwYXJhbXMuZ3JpZC5yb3dzICE9PSAwO1xuICBjb25zdCBhZGRCbGFua1NsaWRlcyA9IGFtb3VudE9mU2xpZGVzID0+IHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFtb3VudE9mU2xpZGVzOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHNsaWRlRWwgPSBzd2lwZXIuaXNFbGVtZW50ID8gY3JlYXRlRWxlbWVudCgnc3dpcGVyLXNsaWRlJywgW3BhcmFtcy5zbGlkZUJsYW5rQ2xhc3NdKSA6IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIFtwYXJhbXMuc2xpZGVDbGFzcywgcGFyYW1zLnNsaWRlQmxhbmtDbGFzc10pO1xuICAgICAgc3dpcGVyLnNsaWRlc0VsLmFwcGVuZChzbGlkZUVsKTtcbiAgICB9XG4gIH07XG4gIGlmIChzaG91bGRGaWxsR3JvdXApIHtcbiAgICBpZiAocGFyYW1zLmxvb3BBZGRCbGFua1NsaWRlcykge1xuICAgICAgY29uc3Qgc2xpZGVzVG9BZGQgPSBzbGlkZXNQZXJHcm91cCAtIHN3aXBlci5zbGlkZXMubGVuZ3RoICUgc2xpZGVzUGVyR3JvdXA7XG4gICAgICBhZGRCbGFua1NsaWRlcyhzbGlkZXNUb0FkZCk7XG4gICAgICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dXYXJuaW5nKCdTd2lwZXIgTG9vcCBXYXJuaW5nOiBUaGUgbnVtYmVyIG9mIHNsaWRlcyBpcyBub3QgZXZlbiB0byBzbGlkZXNQZXJHcm91cCwgbG9vcCBtb2RlIG1heSBub3QgZnVuY3Rpb24gcHJvcGVybHkuIFlvdSBuZWVkIHRvIGFkZCBtb3JlIHNsaWRlcyAob3IgbWFrZSBkdXBsaWNhdGVzLCBvciBlbXB0eSBzbGlkZXMpJyk7XG4gICAgfVxuICAgIGluaXRTbGlkZXMoKTtcbiAgfSBlbHNlIGlmIChzaG91bGRGaWxsR3JpZCkge1xuICAgIGlmIChwYXJhbXMubG9vcEFkZEJsYW5rU2xpZGVzKSB7XG4gICAgICBjb25zdCBzbGlkZXNUb0FkZCA9IHBhcmFtcy5ncmlkLnJvd3MgLSBzd2lwZXIuc2xpZGVzLmxlbmd0aCAlIHBhcmFtcy5ncmlkLnJvd3M7XG4gICAgICBhZGRCbGFua1NsaWRlcyhzbGlkZXNUb0FkZCk7XG4gICAgICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNob3dXYXJuaW5nKCdTd2lwZXIgTG9vcCBXYXJuaW5nOiBUaGUgbnVtYmVyIG9mIHNsaWRlcyBpcyBub3QgZXZlbiB0byBncmlkLnJvd3MsIGxvb3AgbW9kZSBtYXkgbm90IGZ1bmN0aW9uIHByb3Blcmx5LiBZb3UgbmVlZCB0byBhZGQgbW9yZSBzbGlkZXMgKG9yIG1ha2UgZHVwbGljYXRlcywgb3IgZW1wdHkgc2xpZGVzKScpO1xuICAgIH1cbiAgICBpbml0U2xpZGVzKCk7XG4gIH0gZWxzZSB7XG4gICAgaW5pdFNsaWRlcygpO1xuICB9XG4gIHN3aXBlci5sb29wRml4KHtcbiAgICBzbGlkZVJlYWxJbmRleCxcbiAgICBkaXJlY3Rpb246IHBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHVuZGVmaW5lZCA6ICduZXh0J1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbG9vcEZpeChfdGVtcCkge1xuICBsZXQge1xuICAgIHNsaWRlUmVhbEluZGV4LFxuICAgIHNsaWRlVG8gPSB0cnVlLFxuICAgIGRpcmVjdGlvbixcbiAgICBzZXRUcmFuc2xhdGUsXG4gICAgYWN0aXZlU2xpZGVJbmRleCxcbiAgICBieUNvbnRyb2xsZXIsXG4gICAgYnlNb3VzZXdoZWVsXG4gIH0gPSBfdGVtcCA9PT0gdm9pZCAwID8ge30gOiBfdGVtcDtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKCFzd2lwZXIucGFyYW1zLmxvb3ApIHJldHVybjtcbiAgc3dpcGVyLmVtaXQoJ2JlZm9yZUxvb3BGaXgnKTtcbiAgY29uc3Qge1xuICAgIHNsaWRlcyxcbiAgICBhbGxvd1NsaWRlUHJldixcbiAgICBhbGxvd1NsaWRlTmV4dCxcbiAgICBzbGlkZXNFbCxcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3Qge1xuICAgIGNlbnRlcmVkU2xpZGVzXG4gIH0gPSBwYXJhbXM7XG4gIHN3aXBlci5hbGxvd1NsaWRlUHJldiA9IHRydWU7XG4gIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IHRydWU7XG4gIGlmIChzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkKSB7XG4gICAgaWYgKHNsaWRlVG8pIHtcbiAgICAgIGlmICghcGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmIHN3aXBlci5zbmFwSW5kZXggPT09IDApIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnZpcnR1YWwuc2xpZGVzLmxlbmd0aCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgfSBlbHNlIGlmIChwYXJhbXMuY2VudGVyZWRTbGlkZXMgJiYgc3dpcGVyLnNuYXBJbmRleCA8IHBhcmFtcy5zbGlkZXNQZXJWaWV3KSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggKyBzd2lwZXIuc25hcEluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHN3aXBlci5zbmFwSW5kZXggPT09IHN3aXBlci5zbmFwR3JpZC5sZW5ndGggLSAxKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci52aXJ0dWFsLnNsaWRlc0JlZm9yZSwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSBhbGxvd1NsaWRlUHJldjtcbiAgICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSBhbGxvd1NsaWRlTmV4dDtcbiAgICBzd2lwZXIuZW1pdCgnbG9vcEZpeCcpO1xuICAgIHJldHVybjtcbiAgfVxuICBsZXQgc2xpZGVzUGVyVmlldyA9IHBhcmFtcy5zbGlkZXNQZXJWaWV3O1xuICBpZiAoc2xpZGVzUGVyVmlldyA9PT0gJ2F1dG8nKSB7XG4gICAgc2xpZGVzUGVyVmlldyA9IHN3aXBlci5zbGlkZXNQZXJWaWV3RHluYW1pYygpO1xuICB9IGVsc2Uge1xuICAgIHNsaWRlc1BlclZpZXcgPSBNYXRoLmNlaWwocGFyc2VGbG9hdChwYXJhbXMuc2xpZGVzUGVyVmlldywgMTApKTtcbiAgICBpZiAoY2VudGVyZWRTbGlkZXMgJiYgc2xpZGVzUGVyVmlldyAlIDIgPT09IDApIHtcbiAgICAgIHNsaWRlc1BlclZpZXcgPSBzbGlkZXNQZXJWaWV3ICsgMTtcbiAgICB9XG4gIH1cbiAgY29uc3Qgc2xpZGVzUGVyR3JvdXAgPSBwYXJhbXMuc2xpZGVzUGVyR3JvdXBBdXRvID8gc2xpZGVzUGVyVmlldyA6IHBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgbGV0IGxvb3BlZFNsaWRlcyA9IHNsaWRlc1Blckdyb3VwO1xuICBpZiAobG9vcGVkU2xpZGVzICUgc2xpZGVzUGVyR3JvdXAgIT09IDApIHtcbiAgICBsb29wZWRTbGlkZXMgKz0gc2xpZGVzUGVyR3JvdXAgLSBsb29wZWRTbGlkZXMgJSBzbGlkZXNQZXJHcm91cDtcbiAgfVxuICBsb29wZWRTbGlkZXMgKz0gcGFyYW1zLmxvb3BBZGRpdGlvbmFsU2xpZGVzO1xuICBzd2lwZXIubG9vcGVkU2xpZGVzID0gbG9vcGVkU2xpZGVzO1xuICBjb25zdCBncmlkRW5hYmxlZCA9IHN3aXBlci5ncmlkICYmIHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxO1xuICBpZiAoc2xpZGVzLmxlbmd0aCA8IHNsaWRlc1BlclZpZXcgKyBsb29wZWRTbGlkZXMpIHtcbiAgICBzaG93V2FybmluZygnU3dpcGVyIExvb3AgV2FybmluZzogVGhlIG51bWJlciBvZiBzbGlkZXMgaXMgbm90IGVub3VnaCBmb3IgbG9vcCBtb2RlLCBpdCB3aWxsIGJlIGRpc2FibGVkIGFuZCBub3QgZnVuY3Rpb24gcHJvcGVybHkuIFlvdSBuZWVkIHRvIGFkZCBtb3JlIHNsaWRlcyAob3IgbWFrZSBkdXBsaWNhdGVzKSBvciBsb3dlciB0aGUgdmFsdWVzIG9mIHNsaWRlc1BlclZpZXcgYW5kIHNsaWRlc1Blckdyb3VwIHBhcmFtZXRlcnMnKTtcbiAgfSBlbHNlIGlmIChncmlkRW5hYmxlZCAmJiBwYXJhbXMuZ3JpZC5maWxsID09PSAncm93Jykge1xuICAgIHNob3dXYXJuaW5nKCdTd2lwZXIgTG9vcCBXYXJuaW5nOiBMb29wIG1vZGUgaXMgbm90IGNvbXBhdGlibGUgd2l0aCBncmlkLmZpbGwgPSBgcm93YCcpO1xuICB9XG4gIGNvbnN0IHByZXBlbmRTbGlkZXNJbmRleGVzID0gW107XG4gIGNvbnN0IGFwcGVuZFNsaWRlc0luZGV4ZXMgPSBbXTtcbiAgbGV0IGFjdGl2ZUluZGV4ID0gc3dpcGVyLmFjdGl2ZUluZGV4O1xuICBpZiAodHlwZW9mIGFjdGl2ZVNsaWRlSW5kZXggPT09ICd1bmRlZmluZWQnKSB7XG4gICAgYWN0aXZlU2xpZGVJbmRleCA9IHN3aXBlci5nZXRTbGlkZUluZGV4KHNsaWRlcy5maWx0ZXIoZWwgPT4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKHBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzKSlbMF0pO1xuICB9IGVsc2Uge1xuICAgIGFjdGl2ZUluZGV4ID0gYWN0aXZlU2xpZGVJbmRleDtcbiAgfVxuICBjb25zdCBpc05leHQgPSBkaXJlY3Rpb24gPT09ICduZXh0JyB8fCAhZGlyZWN0aW9uO1xuICBjb25zdCBpc1ByZXYgPSBkaXJlY3Rpb24gPT09ICdwcmV2JyB8fCAhZGlyZWN0aW9uO1xuICBsZXQgc2xpZGVzUHJlcGVuZGVkID0gMDtcbiAgbGV0IHNsaWRlc0FwcGVuZGVkID0gMDtcbiAgY29uc3QgY29scyA9IGdyaWRFbmFibGVkID8gTWF0aC5jZWlsKHNsaWRlcy5sZW5ndGggLyBwYXJhbXMuZ3JpZC5yb3dzKSA6IHNsaWRlcy5sZW5ndGg7XG4gIGNvbnN0IGFjdGl2ZUNvbEluZGV4ID0gZ3JpZEVuYWJsZWQgPyBzbGlkZXNbYWN0aXZlU2xpZGVJbmRleF0uY29sdW1uIDogYWN0aXZlU2xpZGVJbmRleDtcbiAgY29uc3QgYWN0aXZlQ29sSW5kZXhXaXRoU2hpZnQgPSBhY3RpdmVDb2xJbmRleCArIChjZW50ZXJlZFNsaWRlcyAmJiB0eXBlb2Ygc2V0VHJhbnNsYXRlID09PSAndW5kZWZpbmVkJyA/IC1zbGlkZXNQZXJWaWV3IC8gMiArIDAuNSA6IDApO1xuICAvLyBwcmVwZW5kIGxhc3Qgc2xpZGVzIGJlZm9yZSBzdGFydFxuICBpZiAoYWN0aXZlQ29sSW5kZXhXaXRoU2hpZnQgPCBsb29wZWRTbGlkZXMpIHtcbiAgICBzbGlkZXNQcmVwZW5kZWQgPSBNYXRoLm1heChsb29wZWRTbGlkZXMgLSBhY3RpdmVDb2xJbmRleFdpdGhTaGlmdCwgc2xpZGVzUGVyR3JvdXApO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbG9vcGVkU2xpZGVzIC0gYWN0aXZlQ29sSW5kZXhXaXRoU2hpZnQ7IGkgKz0gMSkge1xuICAgICAgY29uc3QgaW5kZXggPSBpIC0gTWF0aC5mbG9vcihpIC8gY29scykgKiBjb2xzO1xuICAgICAgaWYgKGdyaWRFbmFibGVkKSB7XG4gICAgICAgIGNvbnN0IGNvbEluZGV4VG9QcmVwZW5kID0gY29scyAtIGluZGV4IC0gMTtcbiAgICAgICAgZm9yIChsZXQgaSA9IHNsaWRlcy5sZW5ndGggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICAgIGlmIChzbGlkZXNbaV0uY29sdW1uID09PSBjb2xJbmRleFRvUHJlcGVuZCkgcHJlcGVuZFNsaWRlc0luZGV4ZXMucHVzaChpKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIHNsaWRlSW5kZXgpID0+IHtcbiAgICAgICAgLy8gICBpZiAoc2xpZGUuY29sdW1uID09PSBjb2xJbmRleFRvUHJlcGVuZCkgcHJlcGVuZFNsaWRlc0luZGV4ZXMucHVzaChzbGlkZUluZGV4KTtcbiAgICAgICAgLy8gfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmVwZW5kU2xpZGVzSW5kZXhlcy5wdXNoKGNvbHMgLSBpbmRleCAtIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIGlmIChhY3RpdmVDb2xJbmRleFdpdGhTaGlmdCArIHNsaWRlc1BlclZpZXcgPiBjb2xzIC0gbG9vcGVkU2xpZGVzKSB7XG4gICAgc2xpZGVzQXBwZW5kZWQgPSBNYXRoLm1heChhY3RpdmVDb2xJbmRleFdpdGhTaGlmdCAtIChjb2xzIC0gbG9vcGVkU2xpZGVzICogMiksIHNsaWRlc1Blckdyb3VwKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlc0FwcGVuZGVkOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IGluZGV4ID0gaSAtIE1hdGguZmxvb3IoaSAvIGNvbHMpICogY29scztcbiAgICAgIGlmIChncmlkRW5hYmxlZCkge1xuICAgICAgICBzbGlkZXMuZm9yRWFjaCgoc2xpZGUsIHNsaWRlSW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoc2xpZGUuY29sdW1uID09PSBpbmRleCkgYXBwZW5kU2xpZGVzSW5kZXhlcy5wdXNoKHNsaWRlSW5kZXgpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFwcGVuZFNsaWRlc0luZGV4ZXMucHVzaChpbmRleCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fID0gdHJ1ZTtcbiAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICBzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXyA9IGZhbHNlO1xuICB9KTtcbiAgaWYgKGlzUHJldikge1xuICAgIHByZXBlbmRTbGlkZXNJbmRleGVzLmZvckVhY2goaW5kZXggPT4ge1xuICAgICAgc2xpZGVzW2luZGV4XS5zd2lwZXJMb29wTW92ZURPTSA9IHRydWU7XG4gICAgICBzbGlkZXNFbC5wcmVwZW5kKHNsaWRlc1tpbmRleF0pO1xuICAgICAgc2xpZGVzW2luZGV4XS5zd2lwZXJMb29wTW92ZURPTSA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG4gIGlmIChpc05leHQpIHtcbiAgICBhcHBlbmRTbGlkZXNJbmRleGVzLmZvckVhY2goaW5kZXggPT4ge1xuICAgICAgc2xpZGVzW2luZGV4XS5zd2lwZXJMb29wTW92ZURPTSA9IHRydWU7XG4gICAgICBzbGlkZXNFbC5hcHBlbmQoc2xpZGVzW2luZGV4XSk7XG4gICAgICBzbGlkZXNbaW5kZXhdLnN3aXBlckxvb3BNb3ZlRE9NID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbiAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICBpZiAocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJykge1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgfSBlbHNlIGlmIChncmlkRW5hYmxlZCAmJiAocHJlcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoID4gMCAmJiBpc1ByZXYgfHwgYXBwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGggPiAwICYmIGlzTmV4dCkpIHtcbiAgICBzd2lwZXIuc2xpZGVzLmZvckVhY2goKHNsaWRlLCBzbGlkZUluZGV4KSA9PiB7XG4gICAgICBzd2lwZXIuZ3JpZC51cGRhdGVTbGlkZShzbGlkZUluZGV4LCBzbGlkZSwgc3dpcGVyLnNsaWRlcyk7XG4gICAgfSk7XG4gIH1cbiAgaWYgKHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzKSB7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc09mZnNldCgpO1xuICB9XG4gIGlmIChzbGlkZVRvKSB7XG4gICAgaWYgKHByZXBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aCA+IDAgJiYgaXNQcmV2KSB7XG4gICAgICBpZiAodHlwZW9mIHNsaWRlUmVhbEluZGV4ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zdCBjdXJyZW50U2xpZGVUcmFuc2xhdGUgPSBzd2lwZXIuc2xpZGVzR3JpZFthY3RpdmVJbmRleF07XG4gICAgICAgIGNvbnN0IG5ld1NsaWRlVHJhbnNsYXRlID0gc3dpcGVyLnNsaWRlc0dyaWRbYWN0aXZlSW5kZXggKyBzbGlkZXNQcmVwZW5kZWRdO1xuICAgICAgICBjb25zdCBkaWZmID0gbmV3U2xpZGVUcmFuc2xhdGUgLSBjdXJyZW50U2xpZGVUcmFuc2xhdGU7XG4gICAgICAgIGlmIChieU1vdXNld2hlZWwpIHtcbiAgICAgICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHN3aXBlci50cmFuc2xhdGUgLSBkaWZmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVUbyhhY3RpdmVJbmRleCArIHNsaWRlc1ByZXBlbmRlZCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgICAgIGlmIChzZXRUcmFuc2xhdGUpIHtcbiAgICAgICAgICAgIHN3aXBlci50b3VjaEV2ZW50c0RhdGEuc3RhcnRUcmFuc2xhdGUgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhLnN0YXJ0VHJhbnNsYXRlIC0gZGlmZjtcbiAgICAgICAgICAgIHN3aXBlci50b3VjaEV2ZW50c0RhdGEuY3VycmVudFRyYW5zbGF0ZSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGEuY3VycmVudFRyYW5zbGF0ZSAtIGRpZmY7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc2V0VHJhbnNsYXRlKSB7XG4gICAgICAgICAgY29uc3Qgc2hpZnQgPSBncmlkRW5hYmxlZCA/IHByZXBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aCAvIHBhcmFtcy5ncmlkLnJvd3MgOiBwcmVwZW5kU2xpZGVzSW5kZXhlcy5sZW5ndGg7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4ICsgc2hpZnQsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBzd2lwZXIudHJhbnNsYXRlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChhcHBlbmRTbGlkZXNJbmRleGVzLmxlbmd0aCA+IDAgJiYgaXNOZXh0KSB7XG4gICAgICBpZiAodHlwZW9mIHNsaWRlUmVhbEluZGV4ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBjb25zdCBjdXJyZW50U2xpZGVUcmFuc2xhdGUgPSBzd2lwZXIuc2xpZGVzR3JpZFthY3RpdmVJbmRleF07XG4gICAgICAgIGNvbnN0IG5ld1NsaWRlVHJhbnNsYXRlID0gc3dpcGVyLnNsaWRlc0dyaWRbYWN0aXZlSW5kZXggLSBzbGlkZXNBcHBlbmRlZF07XG4gICAgICAgIGNvbnN0IGRpZmYgPSBuZXdTbGlkZVRyYW5zbGF0ZSAtIGN1cnJlbnRTbGlkZVRyYW5zbGF0ZTtcbiAgICAgICAgaWYgKGJ5TW91c2V3aGVlbCkge1xuICAgICAgICAgIHN3aXBlci5zZXRUcmFuc2xhdGUoc3dpcGVyLnRyYW5zbGF0ZSAtIGRpZmYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKGFjdGl2ZUluZGV4IC0gc2xpZGVzQXBwZW5kZWQsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICAgICAgICBpZiAoc2V0VHJhbnNsYXRlKSB7XG4gICAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEYXRhLnN0YXJ0VHJhbnNsYXRlID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YS5zdGFydFRyYW5zbGF0ZSAtIGRpZmY7XG4gICAgICAgICAgICBzd2lwZXIudG91Y2hFdmVudHNEYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhLmN1cnJlbnRUcmFuc2xhdGUgLSBkaWZmO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3Qgc2hpZnQgPSBncmlkRW5hYmxlZCA/IGFwcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoIC8gcGFyYW1zLmdyaWQucm93cyA6IGFwcGVuZFNsaWRlc0luZGV4ZXMubGVuZ3RoO1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXggLSBzaGlmdCwgMCwgZmFsc2UsIHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSBhbGxvd1NsaWRlUHJldjtcbiAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gYWxsb3dTbGlkZU5leHQ7XG4gIGlmIChzd2lwZXIuY29udHJvbGxlciAmJiBzd2lwZXIuY29udHJvbGxlci5jb250cm9sICYmICFieUNvbnRyb2xsZXIpIHtcbiAgICBjb25zdCBsb29wUGFyYW1zID0ge1xuICAgICAgc2xpZGVSZWFsSW5kZXgsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBzZXRUcmFuc2xhdGUsXG4gICAgICBhY3RpdmVTbGlkZUluZGV4LFxuICAgICAgYnlDb250cm9sbGVyOiB0cnVlXG4gICAgfTtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShzd2lwZXIuY29udHJvbGxlci5jb250cm9sKSkge1xuICAgICAgc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBpZiAoIWMuZGVzdHJveWVkICYmIGMucGFyYW1zLmxvb3ApIGMubG9vcEZpeCh7XG4gICAgICAgICAgLi4ubG9vcFBhcmFtcyxcbiAgICAgICAgICBzbGlkZVRvOiBjLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBwYXJhbXMuc2xpZGVzUGVyVmlldyA/IHNsaWRlVG8gOiBmYWxzZVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoc3dpcGVyLmNvbnRyb2xsZXIuY29udHJvbCBpbnN0YW5jZW9mIHN3aXBlci5jb25zdHJ1Y3RvciAmJiBzd2lwZXIuY29udHJvbGxlci5jb250cm9sLnBhcmFtcy5sb29wKSB7XG4gICAgICBzd2lwZXIuY29udHJvbGxlci5jb250cm9sLmxvb3BGaXgoe1xuICAgICAgICAuLi5sb29wUGFyYW1zLFxuICAgICAgICBzbGlkZVRvOiBzd2lwZXIuY29udHJvbGxlci5jb250cm9sLnBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSBwYXJhbXMuc2xpZGVzUGVyVmlldyA/IHNsaWRlVG8gOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHN3aXBlci5lbWl0KCdsb29wRml4Jyk7XG59XG5cbmZ1bmN0aW9uIGxvb3BEZXN0cm95KCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcGFyYW1zLFxuICAgIHNsaWRlc0VsXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghcGFyYW1zLmxvb3AgfHwgc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHJldHVybjtcbiAgc3dpcGVyLnJlY2FsY1NsaWRlcygpO1xuICBjb25zdCBuZXdTbGlkZXNPcmRlciA9IFtdO1xuICBzd2lwZXIuc2xpZGVzLmZvckVhY2goc2xpZGVFbCA9PiB7XG4gICAgY29uc3QgaW5kZXggPSB0eXBlb2Ygc2xpZGVFbC5zd2lwZXJTbGlkZUluZGV4ID09PSAndW5kZWZpbmVkJyA/IHNsaWRlRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpICogMSA6IHNsaWRlRWwuc3dpcGVyU2xpZGVJbmRleDtcbiAgICBuZXdTbGlkZXNPcmRlcltpbmRleF0gPSBzbGlkZUVsO1xuICB9KTtcbiAgc3dpcGVyLnNsaWRlcy5mb3JFYWNoKHNsaWRlRWwgPT4ge1xuICAgIHNsaWRlRWwucmVtb3ZlQXR0cmlidXRlKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpO1xuICB9KTtcbiAgbmV3U2xpZGVzT3JkZXIuZm9yRWFjaChzbGlkZUVsID0+IHtcbiAgICBzbGlkZXNFbC5hcHBlbmQoc2xpZGVFbCk7XG4gIH0pO1xuICBzd2lwZXIucmVjYWxjU2xpZGVzKCk7XG4gIHN3aXBlci5zbGlkZVRvKHN3aXBlci5yZWFsSW5kZXgsIDApO1xufVxuXG52YXIgbG9vcCA9IHtcbiAgbG9vcENyZWF0ZSxcbiAgbG9vcEZpeCxcbiAgbG9vcERlc3Ryb3lcbn07XG5cbmZ1bmN0aW9uIHNldEdyYWJDdXJzb3IobW92aW5nKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGlmICghc3dpcGVyLnBhcmFtcy5zaW11bGF0ZVRvdWNoIHx8IHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuaXNMb2NrZWQgfHwgc3dpcGVyLnBhcmFtcy5jc3NNb2RlKSByZXR1cm47XG4gIGNvbnN0IGVsID0gc3dpcGVyLnBhcmFtcy50b3VjaEV2ZW50c1RhcmdldCA9PT0gJ2NvbnRhaW5lcicgPyBzd2lwZXIuZWwgOiBzd2lwZXIud3JhcHBlckVsO1xuICBpZiAoc3dpcGVyLmlzRWxlbWVudCkge1xuICAgIHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fID0gdHJ1ZTtcbiAgfVxuICBlbC5zdHlsZS5jdXJzb3IgPSAnbW92ZSc7XG4gIGVsLnN0eWxlLmN1cnNvciA9IG1vdmluZyA/ICdncmFiYmluZycgOiAnZ3JhYic7XG4gIGlmIChzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgIHN3aXBlci5fX3ByZXZlbnRPYnNlcnZlcl9fID0gZmFsc2U7XG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdW5zZXRHcmFiQ3Vyc29yKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5pc0xvY2tlZCB8fCBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICBzd2lwZXIuX19wcmV2ZW50T2JzZXJ2ZXJfXyA9IHRydWU7XG4gIH1cbiAgc3dpcGVyW3N3aXBlci5wYXJhbXMudG91Y2hFdmVudHNUYXJnZXQgPT09ICdjb250YWluZXInID8gJ2VsJyA6ICd3cmFwcGVyRWwnXS5zdHlsZS5jdXJzb3IgPSAnJztcbiAgaWYgKHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgc3dpcGVyLl9fcHJldmVudE9ic2VydmVyX18gPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxufVxuXG52YXIgZ3JhYkN1cnNvciA9IHtcbiAgc2V0R3JhYkN1cnNvcixcbiAgdW5zZXRHcmFiQ3Vyc29yXG59O1xuXG4vLyBNb2RpZmllZCBmcm9tIGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzU0NTIwNTU0L2N1c3RvbS1lbGVtZW50LWdldHJvb3Rub2RlLWNsb3Nlc3QtZnVuY3Rpb24tY3Jvc3NpbmctbXVsdGlwbGUtcGFyZW50LXNoYWRvd2RcbmZ1bmN0aW9uIGNsb3Nlc3RFbGVtZW50KHNlbGVjdG9yLCBiYXNlKSB7XG4gIGlmIChiYXNlID09PSB2b2lkIDApIHtcbiAgICBiYXNlID0gdGhpcztcbiAgfVxuICBmdW5jdGlvbiBfX2Nsb3Nlc3RGcm9tKGVsKSB7XG4gICAgaWYgKCFlbCB8fCBlbCA9PT0gZ2V0RG9jdW1lbnQoKSB8fCBlbCA9PT0gZ2V0V2luZG93KCkpIHJldHVybiBudWxsO1xuICAgIGlmIChlbC5hc3NpZ25lZFNsb3QpIGVsID0gZWwuYXNzaWduZWRTbG90O1xuICAgIGNvbnN0IGZvdW5kID0gZWwuY2xvc2VzdChzZWxlY3Rvcik7XG4gICAgaWYgKCFmb3VuZCAmJiAhZWwuZ2V0Um9vdE5vZGUpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gZm91bmQgfHwgX19jbG9zZXN0RnJvbShlbC5nZXRSb290Tm9kZSgpLmhvc3QpO1xuICB9XG4gIHJldHVybiBfX2Nsb3Nlc3RGcm9tKGJhc2UpO1xufVxuZnVuY3Rpb24gcHJldmVudEVkZ2VTd2lwZShzd2lwZXIsIGV2ZW50LCBzdGFydFgpIHtcbiAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgZWRnZVN3aXBlRGV0ZWN0aW9uID0gcGFyYW1zLmVkZ2VTd2lwZURldGVjdGlvbjtcbiAgY29uc3QgZWRnZVN3aXBlVGhyZXNob2xkID0gcGFyYW1zLmVkZ2VTd2lwZVRocmVzaG9sZDtcbiAgaWYgKGVkZ2VTd2lwZURldGVjdGlvbiAmJiAoc3RhcnRYIDw9IGVkZ2VTd2lwZVRocmVzaG9sZCB8fCBzdGFydFggPj0gd2luZG93LmlubmVyV2lkdGggLSBlZGdlU3dpcGVUaHJlc2hvbGQpKSB7XG4gICAgaWYgKGVkZ2VTd2lwZURldGVjdGlvbiA9PT0gJ3ByZXZlbnQnKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIG9uVG91Y2hTdGFydChldmVudCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gIGxldCBlID0gZXZlbnQ7XG4gIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gIGNvbnN0IGRhdGEgPSBzd2lwZXIudG91Y2hFdmVudHNEYXRhO1xuICBpZiAoZS50eXBlID09PSAncG9pbnRlcmRvd24nKSB7XG4gICAgaWYgKGRhdGEucG9pbnRlcklkICE9PSBudWxsICYmIGRhdGEucG9pbnRlcklkICE9PSBlLnBvaW50ZXJJZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkYXRhLnBvaW50ZXJJZCA9IGUucG9pbnRlcklkO1xuICB9IGVsc2UgaWYgKGUudHlwZSA9PT0gJ3RvdWNoc3RhcnQnICYmIGUudGFyZ2V0VG91Y2hlcy5sZW5ndGggPT09IDEpIHtcbiAgICBkYXRhLnRvdWNoSWQgPSBlLnRhcmdldFRvdWNoZXNbMF0uaWRlbnRpZmllcjtcbiAgfVxuICBpZiAoZS50eXBlID09PSAndG91Y2hzdGFydCcpIHtcbiAgICAvLyBkb24ndCBwcm9jZWVkIHRvdWNoIGV2ZW50XG4gICAgcHJldmVudEVkZ2VTd2lwZShzd2lwZXIsIGUsIGUudGFyZ2V0VG91Y2hlc1swXS5wYWdlWCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgdG91Y2hlcyxcbiAgICBlbmFibGVkXG4gIH0gPSBzd2lwZXI7XG4gIGlmICghZW5hYmxlZCkgcmV0dXJuO1xuICBpZiAoIXBhcmFtcy5zaW11bGF0ZVRvdWNoICYmIGUucG9pbnRlclR5cGUgPT09ICdtb3VzZScpIHJldHVybjtcbiAgaWYgKHN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLnByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXN3aXBlci5hbmltYXRpbmcgJiYgcGFyYW1zLmNzc01vZGUgJiYgcGFyYW1zLmxvb3ApIHtcbiAgICBzd2lwZXIubG9vcEZpeCgpO1xuICB9XG4gIGxldCB0YXJnZXRFbCA9IGUudGFyZ2V0O1xuICBpZiAocGFyYW1zLnRvdWNoRXZlbnRzVGFyZ2V0ID09PSAnd3JhcHBlcicpIHtcbiAgICBpZiAoIXN3aXBlci53cmFwcGVyRWwuY29udGFpbnModGFyZ2V0RWwpKSByZXR1cm47XG4gIH1cbiAgaWYgKCd3aGljaCcgaW4gZSAmJiBlLndoaWNoID09PSAzKSByZXR1cm47XG4gIGlmICgnYnV0dG9uJyBpbiBlICYmIGUuYnV0dG9uID4gMCkgcmV0dXJuO1xuICBpZiAoZGF0YS5pc1RvdWNoZWQgJiYgZGF0YS5pc01vdmVkKSByZXR1cm47XG5cbiAgLy8gY2hhbmdlIHRhcmdldCBlbCBmb3Igc2hhZG93IHJvb3QgY29tcG9uZW50XG4gIGNvbnN0IHN3aXBpbmdDbGFzc0hhc1ZhbHVlID0gISFwYXJhbXMubm9Td2lwaW5nQ2xhc3MgJiYgcGFyYW1zLm5vU3dpcGluZ0NsYXNzICE9PSAnJztcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIGNvbnN0IGV2ZW50UGF0aCA9IGUuY29tcG9zZWRQYXRoID8gZS5jb21wb3NlZFBhdGgoKSA6IGUucGF0aDtcbiAgaWYgKHN3aXBpbmdDbGFzc0hhc1ZhbHVlICYmIGUudGFyZ2V0ICYmIGUudGFyZ2V0LnNoYWRvd1Jvb3QgJiYgZXZlbnRQYXRoKSB7XG4gICAgdGFyZ2V0RWwgPSBldmVudFBhdGhbMF07XG4gIH1cbiAgY29uc3Qgbm9Td2lwaW5nU2VsZWN0b3IgPSBwYXJhbXMubm9Td2lwaW5nU2VsZWN0b3IgPyBwYXJhbXMubm9Td2lwaW5nU2VsZWN0b3IgOiBgLiR7cGFyYW1zLm5vU3dpcGluZ0NsYXNzfWA7XG4gIGNvbnN0IGlzVGFyZ2V0U2hhZG93ID0gISEoZS50YXJnZXQgJiYgZS50YXJnZXQuc2hhZG93Um9vdCk7XG5cbiAgLy8gdXNlIGNsb3Nlc3RFbGVtZW50IGZvciBzaGFkb3cgcm9vdCBlbGVtZW50IHRvIGdldCB0aGUgYWN0dWFsIGNsb3Nlc3QgZm9yIG5lc3RlZCBzaGFkb3cgcm9vdCBlbGVtZW50XG4gIGlmIChwYXJhbXMubm9Td2lwaW5nICYmIChpc1RhcmdldFNoYWRvdyA/IGNsb3Nlc3RFbGVtZW50KG5vU3dpcGluZ1NlbGVjdG9yLCB0YXJnZXRFbCkgOiB0YXJnZXRFbC5jbG9zZXN0KG5vU3dpcGluZ1NlbGVjdG9yKSkpIHtcbiAgICBzd2lwZXIuYWxsb3dDbGljayA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwYXJhbXMuc3dpcGVIYW5kbGVyKSB7XG4gICAgaWYgKCF0YXJnZXRFbC5jbG9zZXN0KHBhcmFtcy5zd2lwZUhhbmRsZXIpKSByZXR1cm47XG4gIH1cbiAgdG91Y2hlcy5jdXJyZW50WCA9IGUucGFnZVg7XG4gIHRvdWNoZXMuY3VycmVudFkgPSBlLnBhZ2VZO1xuICBjb25zdCBzdGFydFggPSB0b3VjaGVzLmN1cnJlbnRYO1xuICBjb25zdCBzdGFydFkgPSB0b3VjaGVzLmN1cnJlbnRZO1xuXG4gIC8vIERvIE5PVCBzdGFydCBpZiBpT1MgZWRnZSBzd2lwZSBpcyBkZXRlY3RlZC4gT3RoZXJ3aXNlIGlPUyBhcHAgY2Fubm90IHN3aXBlLXRvLWdvLWJhY2sgYW55bW9yZVxuXG4gIGlmICghcHJldmVudEVkZ2VTd2lwZShzd2lwZXIsIGUsIHN0YXJ0WCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgT2JqZWN0LmFzc2lnbihkYXRhLCB7XG4gICAgaXNUb3VjaGVkOiB0cnVlLFxuICAgIGlzTW92ZWQ6IGZhbHNlLFxuICAgIGFsbG93VG91Y2hDYWxsYmFja3M6IHRydWUsXG4gICAgaXNTY3JvbGxpbmc6IHVuZGVmaW5lZCxcbiAgICBzdGFydE1vdmluZzogdW5kZWZpbmVkXG4gIH0pO1xuICB0b3VjaGVzLnN0YXJ0WCA9IHN0YXJ0WDtcbiAgdG91Y2hlcy5zdGFydFkgPSBzdGFydFk7XG4gIGRhdGEudG91Y2hTdGFydFRpbWUgPSBub3coKTtcbiAgc3dpcGVyLmFsbG93Q2xpY2sgPSB0cnVlO1xuICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICBzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPSB1bmRlZmluZWQ7XG4gIGlmIChwYXJhbXMudGhyZXNob2xkID4gMCkgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgPSBmYWxzZTtcbiAgbGV0IHByZXZlbnREZWZhdWx0ID0gdHJ1ZTtcbiAgaWYgKHRhcmdldEVsLm1hdGNoZXMoZGF0YS5mb2N1c2FibGVFbGVtZW50cykpIHtcbiAgICBwcmV2ZW50RGVmYXVsdCA9IGZhbHNlO1xuICAgIGlmICh0YXJnZXRFbC5ub2RlTmFtZSA9PT0gJ1NFTEVDVCcpIHtcbiAgICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgfVxuICB9XG4gIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQubWF0Y2hlcyhkYXRhLmZvY3VzYWJsZUVsZW1lbnRzKSAmJiBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICE9PSB0YXJnZXRFbCkge1xuICAgIGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQuYmx1cigpO1xuICB9XG4gIGNvbnN0IHNob3VsZFByZXZlbnREZWZhdWx0ID0gcHJldmVudERlZmF1bHQgJiYgc3dpcGVyLmFsbG93VG91Y2hNb3ZlICYmIHBhcmFtcy50b3VjaFN0YXJ0UHJldmVudERlZmF1bHQ7XG4gIGlmICgocGFyYW1zLnRvdWNoU3RhcnRGb3JjZVByZXZlbnREZWZhdWx0IHx8IHNob3VsZFByZXZlbnREZWZhdWx0KSAmJiAhdGFyZ2V0RWwuaXNDb250ZW50RWRpdGFibGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaWYgKHBhcmFtcy5mcmVlTW9kZSAmJiBwYXJhbXMuZnJlZU1vZGUuZW5hYmxlZCAmJiBzd2lwZXIuZnJlZU1vZGUgJiYgc3dpcGVyLmFuaW1hdGluZyAmJiAhcGFyYW1zLmNzc01vZGUpIHtcbiAgICBzd2lwZXIuZnJlZU1vZGUub25Ub3VjaFN0YXJ0KCk7XG4gIH1cbiAgc3dpcGVyLmVtaXQoJ3RvdWNoU3RhcnQnLCBlKTtcbn1cblxuZnVuY3Rpb24gb25Ub3VjaE1vdmUoZXZlbnQpIHtcbiAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCBkYXRhID0gc3dpcGVyLnRvdWNoRXZlbnRzRGF0YTtcbiAgY29uc3Qge1xuICAgIHBhcmFtcyxcbiAgICB0b3VjaGVzLFxuICAgIHJ0bFRyYW5zbGF0ZTogcnRsLFxuICAgIGVuYWJsZWRcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbmFibGVkKSByZXR1cm47XG4gIGlmICghcGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgZXZlbnQucG9pbnRlclR5cGUgPT09ICdtb3VzZScpIHJldHVybjtcbiAgbGV0IGUgPSBldmVudDtcbiAgaWYgKGUub3JpZ2luYWxFdmVudCkgZSA9IGUub3JpZ2luYWxFdmVudDtcbiAgaWYgKGUudHlwZSA9PT0gJ3BvaW50ZXJtb3ZlJykge1xuICAgIGlmIChkYXRhLnRvdWNoSWQgIT09IG51bGwpIHJldHVybjsgLy8gcmV0dXJuIGZyb20gcG9pbnRlciBpZiB3ZSB1c2UgdG91Y2hcbiAgICBjb25zdCBpZCA9IGUucG9pbnRlcklkO1xuICAgIGlmIChpZCAhPT0gZGF0YS5wb2ludGVySWQpIHJldHVybjtcbiAgfVxuICBsZXQgdGFyZ2V0VG91Y2g7XG4gIGlmIChlLnR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XG4gICAgdGFyZ2V0VG91Y2ggPSBbLi4uZS5jaGFuZ2VkVG91Y2hlc10uZmlsdGVyKHQgPT4gdC5pZGVudGlmaWVyID09PSBkYXRhLnRvdWNoSWQpWzBdO1xuICAgIGlmICghdGFyZ2V0VG91Y2ggfHwgdGFyZ2V0VG91Y2guaWRlbnRpZmllciAhPT0gZGF0YS50b3VjaElkKSByZXR1cm47XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0VG91Y2ggPSBlO1xuICB9XG4gIGlmICghZGF0YS5pc1RvdWNoZWQpIHtcbiAgICBpZiAoZGF0YS5zdGFydE1vdmluZyAmJiBkYXRhLmlzU2Nyb2xsaW5nKSB7XG4gICAgICBzd2lwZXIuZW1pdCgndG91Y2hNb3ZlT3Bwb3NpdGUnLCBlKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHBhZ2VYID0gdGFyZ2V0VG91Y2gucGFnZVg7XG4gIGNvbnN0IHBhZ2VZID0gdGFyZ2V0VG91Y2gucGFnZVk7XG4gIGlmIChlLnByZXZlbnRlZEJ5TmVzdGVkU3dpcGVyKSB7XG4gICAgdG91Y2hlcy5zdGFydFggPSBwYWdlWDtcbiAgICB0b3VjaGVzLnN0YXJ0WSA9IHBhZ2VZO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoIXN3aXBlci5hbGxvd1RvdWNoTW92ZSkge1xuICAgIGlmICghZS50YXJnZXQubWF0Y2hlcyhkYXRhLmZvY3VzYWJsZUVsZW1lbnRzKSkge1xuICAgICAgc3dpcGVyLmFsbG93Q2xpY2sgPSBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGRhdGEuaXNUb3VjaGVkKSB7XG4gICAgICBPYmplY3QuYXNzaWduKHRvdWNoZXMsIHtcbiAgICAgICAgc3RhcnRYOiBwYWdlWCxcbiAgICAgICAgc3RhcnRZOiBwYWdlWSxcbiAgICAgICAgY3VycmVudFg6IHBhZ2VYLFxuICAgICAgICBjdXJyZW50WTogcGFnZVlcbiAgICAgIH0pO1xuICAgICAgZGF0YS50b3VjaFN0YXJ0VGltZSA9IG5vdygpO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKHBhcmFtcy50b3VjaFJlbGVhc2VPbkVkZ2VzICYmICFwYXJhbXMubG9vcCkge1xuICAgIGlmIChzd2lwZXIuaXNWZXJ0aWNhbCgpKSB7XG4gICAgICAvLyBWZXJ0aWNhbFxuICAgICAgaWYgKHBhZ2VZIDwgdG91Y2hlcy5zdGFydFkgJiYgc3dpcGVyLnRyYW5zbGF0ZSA8PSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgfHwgcGFnZVkgPiB0b3VjaGVzLnN0YXJ0WSAmJiBzd2lwZXIudHJhbnNsYXRlID49IHN3aXBlci5taW5UcmFuc2xhdGUoKSkge1xuICAgICAgICBkYXRhLmlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAocGFnZVggPCB0b3VjaGVzLnN0YXJ0WCAmJiBzd2lwZXIudHJhbnNsYXRlIDw9IHN3aXBlci5tYXhUcmFuc2xhdGUoKSB8fCBwYWdlWCA+IHRvdWNoZXMuc3RhcnRYICYmIHN3aXBlci50cmFuc2xhdGUgPj0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50KSB7XG4gICAgaWYgKGUudGFyZ2V0ID09PSBkb2N1bWVudC5hY3RpdmVFbGVtZW50ICYmIGUudGFyZ2V0Lm1hdGNoZXMoZGF0YS5mb2N1c2FibGVFbGVtZW50cykpIHtcbiAgICAgIGRhdGEuaXNNb3ZlZCA9IHRydWU7XG4gICAgICBzd2lwZXIuYWxsb3dDbGljayA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBpZiAoZGF0YS5hbGxvd1RvdWNoQ2FsbGJhY2tzKSB7XG4gICAgc3dpcGVyLmVtaXQoJ3RvdWNoTW92ZScsIGUpO1xuICB9XG4gIHRvdWNoZXMucHJldmlvdXNYID0gdG91Y2hlcy5jdXJyZW50WDtcbiAgdG91Y2hlcy5wcmV2aW91c1kgPSB0b3VjaGVzLmN1cnJlbnRZO1xuICB0b3VjaGVzLmN1cnJlbnRYID0gcGFnZVg7XG4gIHRvdWNoZXMuY3VycmVudFkgPSBwYWdlWTtcbiAgY29uc3QgZGlmZlggPSB0b3VjaGVzLmN1cnJlbnRYIC0gdG91Y2hlcy5zdGFydFg7XG4gIGNvbnN0IGRpZmZZID0gdG91Y2hlcy5jdXJyZW50WSAtIHRvdWNoZXMuc3RhcnRZO1xuICBpZiAoc3dpcGVyLnBhcmFtcy50aHJlc2hvbGQgJiYgTWF0aC5zcXJ0KGRpZmZYICoqIDIgKyBkaWZmWSAqKiAyKSA8IHN3aXBlci5wYXJhbXMudGhyZXNob2xkKSByZXR1cm47XG4gIGlmICh0eXBlb2YgZGF0YS5pc1Njcm9sbGluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBsZXQgdG91Y2hBbmdsZTtcbiAgICBpZiAoc3dpcGVyLmlzSG9yaXpvbnRhbCgpICYmIHRvdWNoZXMuY3VycmVudFkgPT09IHRvdWNoZXMuc3RhcnRZIHx8IHN3aXBlci5pc1ZlcnRpY2FsKCkgJiYgdG91Y2hlcy5jdXJyZW50WCA9PT0gdG91Y2hlcy5zdGFydFgpIHtcbiAgICAgIGRhdGEuaXNTY3JvbGxpbmcgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBpZiAoZGlmZlggKiBkaWZmWCArIGRpZmZZICogZGlmZlkgPj0gMjUpIHtcbiAgICAgICAgdG91Y2hBbmdsZSA9IE1hdGguYXRhbjIoTWF0aC5hYnMoZGlmZlkpLCBNYXRoLmFicyhkaWZmWCkpICogMTgwIC8gTWF0aC5QSTtcbiAgICAgICAgZGF0YS5pc1Njcm9sbGluZyA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IHRvdWNoQW5nbGUgPiBwYXJhbXMudG91Y2hBbmdsZSA6IDkwIC0gdG91Y2hBbmdsZSA+IHBhcmFtcy50b3VjaEFuZ2xlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBpZiAoZGF0YS5pc1Njcm9sbGluZykge1xuICAgIHN3aXBlci5lbWl0KCd0b3VjaE1vdmVPcHBvc2l0ZScsIGUpO1xuICB9XG4gIGlmICh0eXBlb2YgZGF0YS5zdGFydE1vdmluZyA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAodG91Y2hlcy5jdXJyZW50WCAhPT0gdG91Y2hlcy5zdGFydFggfHwgdG91Y2hlcy5jdXJyZW50WSAhPT0gdG91Y2hlcy5zdGFydFkpIHtcbiAgICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSB0cnVlO1xuICAgIH1cbiAgfVxuICBpZiAoZGF0YS5pc1Njcm9sbGluZykge1xuICAgIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICghZGF0YS5zdGFydE1vdmluZykge1xuICAgIHJldHVybjtcbiAgfVxuICBzd2lwZXIuYWxsb3dDbGljayA9IGZhbHNlO1xuICBpZiAoIXBhcmFtcy5jc3NNb2RlICYmIGUuY2FuY2VsYWJsZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBpZiAocGFyYW1zLnRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbiAmJiAhcGFyYW1zLm5lc3RlZCkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cbiAgbGV0IGRpZmYgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBkaWZmWCA6IGRpZmZZO1xuICBsZXQgdG91Y2hlc0RpZmYgPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyB0b3VjaGVzLmN1cnJlbnRYIC0gdG91Y2hlcy5wcmV2aW91c1ggOiB0b3VjaGVzLmN1cnJlbnRZIC0gdG91Y2hlcy5wcmV2aW91c1k7XG4gIGlmIChwYXJhbXMub25lV2F5TW92ZW1lbnQpIHtcbiAgICBkaWZmID0gTWF0aC5hYnMoZGlmZikgKiAocnRsID8gMSA6IC0xKTtcbiAgICB0b3VjaGVzRGlmZiA9IE1hdGguYWJzKHRvdWNoZXNEaWZmKSAqIChydGwgPyAxIDogLTEpO1xuICB9XG4gIHRvdWNoZXMuZGlmZiA9IGRpZmY7XG4gIGRpZmYgKj0gcGFyYW1zLnRvdWNoUmF0aW87XG4gIGlmIChydGwpIHtcbiAgICBkaWZmID0gLWRpZmY7XG4gICAgdG91Y2hlc0RpZmYgPSAtdG91Y2hlc0RpZmY7XG4gIH1cbiAgY29uc3QgcHJldlRvdWNoZXNEaXJlY3Rpb24gPSBzd2lwZXIudG91Y2hlc0RpcmVjdGlvbjtcbiAgc3dpcGVyLnN3aXBlRGlyZWN0aW9uID0gZGlmZiA+IDAgPyAncHJldicgOiAnbmV4dCc7XG4gIHN3aXBlci50b3VjaGVzRGlyZWN0aW9uID0gdG91Y2hlc0RpZmYgPiAwID8gJ3ByZXYnIDogJ25leHQnO1xuICBjb25zdCBpc0xvb3AgPSBzd2lwZXIucGFyYW1zLmxvb3AgJiYgIXBhcmFtcy5jc3NNb2RlO1xuICBjb25zdCBhbGxvd0xvb3BGaXggPSBzd2lwZXIudG91Y2hlc0RpcmVjdGlvbiA9PT0gJ25leHQnICYmIHN3aXBlci5hbGxvd1NsaWRlTmV4dCB8fCBzd2lwZXIudG91Y2hlc0RpcmVjdGlvbiA9PT0gJ3ByZXYnICYmIHN3aXBlci5hbGxvd1NsaWRlUHJldjtcbiAgaWYgKCFkYXRhLmlzTW92ZWQpIHtcbiAgICBpZiAoaXNMb29wICYmIGFsbG93TG9vcEZpeCkge1xuICAgICAgc3dpcGVyLmxvb3BGaXgoe1xuICAgICAgICBkaXJlY3Rpb246IHN3aXBlci5zd2lwZURpcmVjdGlvblxuICAgICAgfSk7XG4gICAgfVxuICAgIGRhdGEuc3RhcnRUcmFuc2xhdGUgPSBzd2lwZXIuZ2V0VHJhbnNsYXRlKCk7XG4gICAgc3dpcGVyLnNldFRyYW5zaXRpb24oMCk7XG4gICAgaWYgKHN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgIGNvbnN0IGV2dCA9IG5ldyB3aW5kb3cuQ3VzdG9tRXZlbnQoJ3RyYW5zaXRpb25lbmQnLCB7XG4gICAgICAgIGJ1YmJsZXM6IHRydWUsXG4gICAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICAgIH0pO1xuICAgICAgc3dpcGVyLndyYXBwZXJFbC5kaXNwYXRjaEV2ZW50KGV2dCk7XG4gICAgfVxuICAgIGRhdGEuYWxsb3dNb21lbnR1bUJvdW5jZSA9IGZhbHNlO1xuICAgIC8vIEdyYWIgQ3Vyc29yXG4gICAgaWYgKHBhcmFtcy5ncmFiQ3Vyc29yICYmIChzd2lwZXIuYWxsb3dTbGlkZU5leHQgPT09IHRydWUgfHwgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID09PSB0cnVlKSkge1xuICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IodHJ1ZSk7XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KCdzbGlkZXJGaXJzdE1vdmUnLCBlKTtcbiAgfVxuICBsZXQgbG9vcEZpeGVkO1xuICBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgaWYgKGRhdGEuaXNNb3ZlZCAmJiBkYXRhLmFsbG93VGhyZXNob2xkTW92ZSAmJiBwcmV2VG91Y2hlc0RpcmVjdGlvbiAhPT0gc3dpcGVyLnRvdWNoZXNEaXJlY3Rpb24gJiYgaXNMb29wICYmIGFsbG93TG9vcEZpeCAmJiBNYXRoLmFicyhkaWZmKSA+PSAxKSB7XG4gICAgT2JqZWN0LmFzc2lnbih0b3VjaGVzLCB7XG4gICAgICBzdGFydFg6IHBhZ2VYLFxuICAgICAgc3RhcnRZOiBwYWdlWSxcbiAgICAgIGN1cnJlbnRYOiBwYWdlWCxcbiAgICAgIGN1cnJlbnRZOiBwYWdlWSxcbiAgICAgIHN0YXJ0VHJhbnNsYXRlOiBkYXRhLmN1cnJlbnRUcmFuc2xhdGVcbiAgICB9KTtcbiAgICBkYXRhLmxvb3BTd2FwUmVzZXQgPSB0cnVlO1xuICAgIGRhdGEuc3RhcnRUcmFuc2xhdGUgPSBkYXRhLmN1cnJlbnRUcmFuc2xhdGU7XG4gICAgcmV0dXJuO1xuICB9XG4gIHN3aXBlci5lbWl0KCdzbGlkZXJNb3ZlJywgZSk7XG4gIGRhdGEuaXNNb3ZlZCA9IHRydWU7XG4gIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRpZmYgKyBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICBsZXQgZGlzYWJsZVBhcmVudFN3aXBlciA9IHRydWU7XG4gIGxldCByZXNpc3RhbmNlUmF0aW8gPSBwYXJhbXMucmVzaXN0YW5jZVJhdGlvO1xuICBpZiAocGFyYW1zLnRvdWNoUmVsZWFzZU9uRWRnZXMpIHtcbiAgICByZXNpc3RhbmNlUmF0aW8gPSAwO1xuICB9XG4gIGlmIChkaWZmID4gMCkge1xuICAgIGlmIChpc0xvb3AgJiYgYWxsb3dMb29wRml4ICYmICFsb29wRml4ZWQgJiYgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgJiYgZGF0YS5jdXJyZW50VHJhbnNsYXRlID4gKHBhcmFtcy5jZW50ZXJlZFNsaWRlcyA/IHN3aXBlci5taW5UcmFuc2xhdGUoKSAtIHN3aXBlci5zbGlkZXNTaXplc0dyaWRbc3dpcGVyLmFjdGl2ZUluZGV4ICsgMV0gOiBzd2lwZXIubWluVHJhbnNsYXRlKCkpKSB7XG4gICAgICBzd2lwZXIubG9vcEZpeCh7XG4gICAgICAgIGRpcmVjdGlvbjogJ3ByZXYnLFxuICAgICAgICBzZXRUcmFuc2xhdGU6IHRydWUsXG4gICAgICAgIGFjdGl2ZVNsaWRlSW5kZXg6IDBcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZGF0YS5jdXJyZW50VHJhbnNsYXRlID4gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSB7XG4gICAgICBkaXNhYmxlUGFyZW50U3dpcGVyID0gZmFsc2U7XG4gICAgICBpZiAocGFyYW1zLnJlc2lzdGFuY2UpIHtcbiAgICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpIC0gMSArICgtc3dpcGVyLm1pblRyYW5zbGF0ZSgpICsgZGF0YS5zdGFydFRyYW5zbGF0ZSArIGRpZmYpICoqIHJlc2lzdGFuY2VSYXRpbztcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSBpZiAoZGlmZiA8IDApIHtcbiAgICBpZiAoaXNMb29wICYmIGFsbG93TG9vcEZpeCAmJiAhbG9vcEZpeGVkICYmIGRhdGEuYWxsb3dUaHJlc2hvbGRNb3ZlICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA8IChwYXJhbXMuY2VudGVyZWRTbGlkZXMgPyBzd2lwZXIubWF4VHJhbnNsYXRlKCkgKyBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW3N3aXBlci5zbGlkZXNTaXplc0dyaWQubGVuZ3RoIC0gMV0gOiBzd2lwZXIubWF4VHJhbnNsYXRlKCkpKSB7XG4gICAgICBzd2lwZXIubG9vcEZpeCh7XG4gICAgICAgIGRpcmVjdGlvbjogJ25leHQnLFxuICAgICAgICBzZXRUcmFuc2xhdGU6IHRydWUsXG4gICAgICAgIGFjdGl2ZVNsaWRlSW5kZXg6IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgPyBzd2lwZXIuc2xpZGVzUGVyVmlld0R5bmFtaWMoKSA6IE1hdGguY2VpbChwYXJzZUZsb2F0KHBhcmFtcy5zbGlkZXNQZXJWaWV3LCAxMCkpKVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPCBzd2lwZXIubWF4VHJhbnNsYXRlKCkpIHtcbiAgICAgIGRpc2FibGVQYXJlbnRTd2lwZXIgPSBmYWxzZTtcbiAgICAgIGlmIChwYXJhbXMucmVzaXN0YW5jZSkge1xuICAgICAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBzd2lwZXIubWF4VHJhbnNsYXRlKCkgKyAxIC0gKHN3aXBlci5tYXhUcmFuc2xhdGUoKSAtIGRhdGEuc3RhcnRUcmFuc2xhdGUgLSBkaWZmKSAqKiByZXNpc3RhbmNlUmF0aW87XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGlmIChkaXNhYmxlUGFyZW50U3dpcGVyKSB7XG4gICAgZS5wcmV2ZW50ZWRCeU5lc3RlZFN3aXBlciA9IHRydWU7XG4gIH1cblxuICAvLyBEaXJlY3Rpb25zIGxvY2tzXG4gIGlmICghc3dpcGVyLmFsbG93U2xpZGVOZXh0ICYmIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA8IGRhdGEuc3RhcnRUcmFuc2xhdGUpIHtcbiAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICB9XG4gIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmIHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ3ByZXYnICYmIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA+IGRhdGEuc3RhcnRUcmFuc2xhdGUpIHtcbiAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICB9XG4gIGlmICghc3dpcGVyLmFsbG93U2xpZGVQcmV2ICYmICFzd2lwZXIuYWxsb3dTbGlkZU5leHQpIHtcbiAgICBkYXRhLmN1cnJlbnRUcmFuc2xhdGUgPSBkYXRhLnN0YXJ0VHJhbnNsYXRlO1xuICB9XG5cbiAgLy8gVGhyZXNob2xkXG4gIGlmIChwYXJhbXMudGhyZXNob2xkID4gMCkge1xuICAgIGlmIChNYXRoLmFicyhkaWZmKSA+IHBhcmFtcy50aHJlc2hvbGQgfHwgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUpIHtcbiAgICAgIGlmICghZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUpIHtcbiAgICAgICAgZGF0YS5hbGxvd1RocmVzaG9sZE1vdmUgPSB0cnVlO1xuICAgICAgICB0b3VjaGVzLnN0YXJ0WCA9IHRvdWNoZXMuY3VycmVudFg7XG4gICAgICAgIHRvdWNoZXMuc3RhcnRZID0gdG91Y2hlcy5jdXJyZW50WTtcbiAgICAgICAgZGF0YS5jdXJyZW50VHJhbnNsYXRlID0gZGF0YS5zdGFydFRyYW5zbGF0ZTtcbiAgICAgICAgdG91Y2hlcy5kaWZmID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gdG91Y2hlcy5jdXJyZW50WCAtIHRvdWNoZXMuc3RhcnRYIDogdG91Y2hlcy5jdXJyZW50WSAtIHRvdWNoZXMuc3RhcnRZO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9IGRhdGEuc3RhcnRUcmFuc2xhdGU7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGlmICghcGFyYW1zLmZvbGxvd0ZpbmdlciB8fCBwYXJhbXMuY3NzTW9kZSkgcmV0dXJuO1xuXG4gIC8vIFVwZGF0ZSBhY3RpdmUgaW5kZXggaW4gZnJlZSBtb2RlXG4gIGlmIChwYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQgJiYgc3dpcGVyLmZyZWVNb2RlIHx8IHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzKSB7XG4gICAgc3dpcGVyLnVwZGF0ZUFjdGl2ZUluZGV4KCk7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgfVxuICBpZiAocGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkICYmIHN3aXBlci5mcmVlTW9kZSkge1xuICAgIHN3aXBlci5mcmVlTW9kZS5vblRvdWNoTW92ZSgpO1xuICB9XG4gIC8vIFVwZGF0ZSBwcm9ncmVzc1xuICBzd2lwZXIudXBkYXRlUHJvZ3Jlc3MoZGF0YS5jdXJyZW50VHJhbnNsYXRlKTtcbiAgLy8gVXBkYXRlIHRyYW5zbGF0ZVxuICBzd2lwZXIuc2V0VHJhbnNsYXRlKGRhdGEuY3VycmVudFRyYW5zbGF0ZSk7XG59XG5cbmZ1bmN0aW9uIG9uVG91Y2hFbmQoZXZlbnQpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3QgZGF0YSA9IHN3aXBlci50b3VjaEV2ZW50c0RhdGE7XG4gIGxldCBlID0gZXZlbnQ7XG4gIGlmIChlLm9yaWdpbmFsRXZlbnQpIGUgPSBlLm9yaWdpbmFsRXZlbnQ7XG4gIGxldCB0YXJnZXRUb3VjaDtcbiAgY29uc3QgaXNUb3VjaEV2ZW50ID0gZS50eXBlID09PSAndG91Y2hlbmQnIHx8IGUudHlwZSA9PT0gJ3RvdWNoY2FuY2VsJztcbiAgaWYgKCFpc1RvdWNoRXZlbnQpIHtcbiAgICBpZiAoZGF0YS50b3VjaElkICE9PSBudWxsKSByZXR1cm47IC8vIHJldHVybiBmcm9tIHBvaW50ZXIgaWYgd2UgdXNlIHRvdWNoXG4gICAgaWYgKGUucG9pbnRlcklkICE9PSBkYXRhLnBvaW50ZXJJZCkgcmV0dXJuO1xuICAgIHRhcmdldFRvdWNoID0gZTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXRUb3VjaCA9IFsuLi5lLmNoYW5nZWRUb3VjaGVzXS5maWx0ZXIodCA9PiB0LmlkZW50aWZpZXIgPT09IGRhdGEudG91Y2hJZClbMF07XG4gICAgaWYgKCF0YXJnZXRUb3VjaCB8fCB0YXJnZXRUb3VjaC5pZGVudGlmaWVyICE9PSBkYXRhLnRvdWNoSWQpIHJldHVybjtcbiAgfVxuICBpZiAoWydwb2ludGVyY2FuY2VsJywgJ3BvaW50ZXJvdXQnLCAncG9pbnRlcmxlYXZlJywgJ2NvbnRleHRtZW51J10uaW5jbHVkZXMoZS50eXBlKSkge1xuICAgIGNvbnN0IHByb2NlZWQgPSBbJ3BvaW50ZXJjYW5jZWwnLCAnY29udGV4dG1lbnUnXS5pbmNsdWRlcyhlLnR5cGUpICYmIChzd2lwZXIuYnJvd3Nlci5pc1NhZmFyaSB8fCBzd2lwZXIuYnJvd3Nlci5pc1dlYlZpZXcpO1xuICAgIGlmICghcHJvY2VlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuICBkYXRhLnBvaW50ZXJJZCA9IG51bGw7XG4gIGRhdGEudG91Y2hJZCA9IG51bGw7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgdG91Y2hlcyxcbiAgICBydGxUcmFuc2xhdGU6IHJ0bCxcbiAgICBzbGlkZXNHcmlkLFxuICAgIGVuYWJsZWRcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKCFlbmFibGVkKSByZXR1cm47XG4gIGlmICghcGFyYW1zLnNpbXVsYXRlVG91Y2ggJiYgZS5wb2ludGVyVHlwZSA9PT0gJ21vdXNlJykgcmV0dXJuO1xuICBpZiAoZGF0YS5hbGxvd1RvdWNoQ2FsbGJhY2tzKSB7XG4gICAgc3dpcGVyLmVtaXQoJ3RvdWNoRW5kJywgZSk7XG4gIH1cbiAgZGF0YS5hbGxvd1RvdWNoQ2FsbGJhY2tzID0gZmFsc2U7XG4gIGlmICghZGF0YS5pc1RvdWNoZWQpIHtcbiAgICBpZiAoZGF0YS5pc01vdmVkICYmIHBhcmFtcy5ncmFiQ3Vyc29yKSB7XG4gICAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcihmYWxzZSk7XG4gICAgfVxuICAgIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xuICAgIGRhdGEuc3RhcnRNb3ZpbmcgPSBmYWxzZTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBSZXR1cm4gR3JhYiBDdXJzb3JcbiAgaWYgKHBhcmFtcy5ncmFiQ3Vyc29yICYmIGRhdGEuaXNNb3ZlZCAmJiBkYXRhLmlzVG91Y2hlZCAmJiAoc3dpcGVyLmFsbG93U2xpZGVOZXh0ID09PSB0cnVlIHx8IHN3aXBlci5hbGxvd1NsaWRlUHJldiA9PT0gdHJ1ZSkpIHtcbiAgICBzd2lwZXIuc2V0R3JhYkN1cnNvcihmYWxzZSk7XG4gIH1cblxuICAvLyBUaW1lIGRpZmZcbiAgY29uc3QgdG91Y2hFbmRUaW1lID0gbm93KCk7XG4gIGNvbnN0IHRpbWVEaWZmID0gdG91Y2hFbmRUaW1lIC0gZGF0YS50b3VjaFN0YXJ0VGltZTtcblxuICAvLyBUYXAsIGRvdWJsZVRhcCwgQ2xpY2tcbiAgaWYgKHN3aXBlci5hbGxvd0NsaWNrKSB7XG4gICAgY29uc3QgcGF0aFRyZWUgPSBlLnBhdGggfHwgZS5jb21wb3NlZFBhdGggJiYgZS5jb21wb3NlZFBhdGgoKTtcbiAgICBzd2lwZXIudXBkYXRlQ2xpY2tlZFNsaWRlKHBhdGhUcmVlICYmIHBhdGhUcmVlWzBdIHx8IGUudGFyZ2V0LCBwYXRoVHJlZSk7XG4gICAgc3dpcGVyLmVtaXQoJ3RhcCBjbGljaycsIGUpO1xuICAgIGlmICh0aW1lRGlmZiA8IDMwMCAmJiB0b3VjaEVuZFRpbWUgLSBkYXRhLmxhc3RDbGlja1RpbWUgPCAzMDApIHtcbiAgICAgIHN3aXBlci5lbWl0KCdkb3VibGVUYXAgZG91YmxlQ2xpY2snLCBlKTtcbiAgICB9XG4gIH1cbiAgZGF0YS5sYXN0Q2xpY2tUaW1lID0gbm93KCk7XG4gIG5leHRUaWNrKCgpID0+IHtcbiAgICBpZiAoIXN3aXBlci5kZXN0cm95ZWQpIHN3aXBlci5hbGxvd0NsaWNrID0gdHJ1ZTtcbiAgfSk7XG4gIGlmICghZGF0YS5pc1RvdWNoZWQgfHwgIWRhdGEuaXNNb3ZlZCB8fCAhc3dpcGVyLnN3aXBlRGlyZWN0aW9uIHx8IHRvdWNoZXMuZGlmZiA9PT0gMCAmJiAhZGF0YS5sb29wU3dhcFJlc2V0IHx8IGRhdGEuY3VycmVudFRyYW5zbGF0ZSA9PT0gZGF0YS5zdGFydFRyYW5zbGF0ZSAmJiAhZGF0YS5sb29wU3dhcFJlc2V0KSB7XG4gICAgZGF0YS5pc1RvdWNoZWQgPSBmYWxzZTtcbiAgICBkYXRhLmlzTW92ZWQgPSBmYWxzZTtcbiAgICBkYXRhLnN0YXJ0TW92aW5nID0gZmFsc2U7XG4gICAgcmV0dXJuO1xuICB9XG4gIGRhdGEuaXNUb3VjaGVkID0gZmFsc2U7XG4gIGRhdGEuaXNNb3ZlZCA9IGZhbHNlO1xuICBkYXRhLnN0YXJ0TW92aW5nID0gZmFsc2U7XG4gIGxldCBjdXJyZW50UG9zO1xuICBpZiAocGFyYW1zLmZvbGxvd0Zpbmdlcikge1xuICAgIGN1cnJlbnRQb3MgPSBydGwgPyBzd2lwZXIudHJhbnNsYXRlIDogLXN3aXBlci50cmFuc2xhdGU7XG4gIH0gZWxzZSB7XG4gICAgY3VycmVudFBvcyA9IC1kYXRhLmN1cnJlbnRUcmFuc2xhdGU7XG4gIH1cbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChwYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQpIHtcbiAgICBzd2lwZXIuZnJlZU1vZGUub25Ub3VjaEVuZCh7XG4gICAgICBjdXJyZW50UG9zXG4gICAgfSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRmluZCBjdXJyZW50IHNsaWRlXG4gIGxldCBzdG9wSW5kZXggPSAwO1xuICBsZXQgZ3JvdXBTaXplID0gc3dpcGVyLnNsaWRlc1NpemVzR3JpZFswXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBzbGlkZXNHcmlkLmxlbmd0aDsgaSArPSBpIDwgcGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCA/IDEgOiBwYXJhbXMuc2xpZGVzUGVyR3JvdXApIHtcbiAgICBjb25zdCBpbmNyZW1lbnQgPSBpIDwgcGFyYW1zLnNsaWRlc1Blckdyb3VwU2tpcCAtIDEgPyAxIDogcGFyYW1zLnNsaWRlc1Blckdyb3VwO1xuICAgIGlmICh0eXBlb2Ygc2xpZGVzR3JpZFtpICsgaW5jcmVtZW50XSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGlmIChjdXJyZW50UG9zID49IHNsaWRlc0dyaWRbaV0gJiYgY3VycmVudFBvcyA8IHNsaWRlc0dyaWRbaSArIGluY3JlbWVudF0pIHtcbiAgICAgICAgc3RvcEluZGV4ID0gaTtcbiAgICAgICAgZ3JvdXBTaXplID0gc2xpZGVzR3JpZFtpICsgaW5jcmVtZW50XSAtIHNsaWRlc0dyaWRbaV07XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChjdXJyZW50UG9zID49IHNsaWRlc0dyaWRbaV0pIHtcbiAgICAgIHN0b3BJbmRleCA9IGk7XG4gICAgICBncm91cFNpemUgPSBzbGlkZXNHcmlkW3NsaWRlc0dyaWQubGVuZ3RoIC0gMV0gLSBzbGlkZXNHcmlkW3NsaWRlc0dyaWQubGVuZ3RoIC0gMl07XG4gICAgfVxuICB9XG4gIGxldCByZXdpbmRGaXJzdEluZGV4ID0gbnVsbDtcbiAgbGV0IHJld2luZExhc3RJbmRleCA9IG51bGw7XG4gIGlmIChwYXJhbXMucmV3aW5kKSB7XG4gICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZykge1xuICAgICAgcmV3aW5kTGFzdEluZGV4ID0gcGFyYW1zLnZpcnR1YWwgJiYgcGFyYW1zLnZpcnR1YWwuZW5hYmxlZCAmJiBzd2lwZXIudmlydHVhbCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggLSAxIDogc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSBpZiAoc3dpcGVyLmlzRW5kKSB7XG4gICAgICByZXdpbmRGaXJzdEluZGV4ID0gMDtcbiAgICB9XG4gIH1cbiAgLy8gRmluZCBjdXJyZW50IHNsaWRlIHNpemVcbiAgY29uc3QgcmF0aW8gPSAoY3VycmVudFBvcyAtIHNsaWRlc0dyaWRbc3RvcEluZGV4XSkgLyBncm91cFNpemU7XG4gIGNvbnN0IGluY3JlbWVudCA9IHN0b3BJbmRleCA8IHBhcmFtcy5zbGlkZXNQZXJHcm91cFNraXAgLSAxID8gMSA6IHBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgaWYgKHRpbWVEaWZmID4gcGFyYW1zLmxvbmdTd2lwZXNNcykge1xuICAgIC8vIExvbmcgdG91Y2hlc1xuICAgIGlmICghcGFyYW1zLmxvbmdTd2lwZXMpIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICduZXh0Jykge1xuICAgICAgaWYgKHJhdGlvID49IHBhcmFtcy5sb25nU3dpcGVzUmF0aW8pIHN3aXBlci5zbGlkZVRvKHBhcmFtcy5yZXdpbmQgJiYgc3dpcGVyLmlzRW5kID8gcmV3aW5kRmlyc3RJbmRleCA6IHN0b3BJbmRleCArIGluY3JlbWVudCk7ZWxzZSBzd2lwZXIuc2xpZGVUbyhzdG9wSW5kZXgpO1xuICAgIH1cbiAgICBpZiAoc3dpcGVyLnN3aXBlRGlyZWN0aW9uID09PSAncHJldicpIHtcbiAgICAgIGlmIChyYXRpbyA+IDEgLSBwYXJhbXMubG9uZ1N3aXBlc1JhdGlvKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHN0b3BJbmRleCArIGluY3JlbWVudCk7XG4gICAgICB9IGVsc2UgaWYgKHJld2luZExhc3RJbmRleCAhPT0gbnVsbCAmJiByYXRpbyA8IDAgJiYgTWF0aC5hYnMocmF0aW8pID4gcGFyYW1zLmxvbmdTd2lwZXNSYXRpbykge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhyZXdpbmRMYXN0SW5kZXgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4KTtcbiAgICAgIH1cbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgLy8gU2hvcnQgc3dpcGVzXG4gICAgaWYgKCFwYXJhbXMuc2hvcnRTd2lwZXMpIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5hY3RpdmVJbmRleCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGlzTmF2QnV0dG9uVGFyZ2V0ID0gc3dpcGVyLm5hdmlnYXRpb24gJiYgKGUudGFyZ2V0ID09PSBzd2lwZXIubmF2aWdhdGlvbi5uZXh0RWwgfHwgZS50YXJnZXQgPT09IHN3aXBlci5uYXZpZ2F0aW9uLnByZXZFbCk7XG4gICAgaWYgKCFpc05hdkJ1dHRvblRhcmdldCkge1xuICAgICAgaWYgKHN3aXBlci5zd2lwZURpcmVjdGlvbiA9PT0gJ25leHQnKSB7XG4gICAgICAgIHN3aXBlci5zbGlkZVRvKHJld2luZEZpcnN0SW5kZXggIT09IG51bGwgPyByZXdpbmRGaXJzdEluZGV4IDogc3RvcEluZGV4ICsgaW5jcmVtZW50KTtcbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIuc3dpcGVEaXJlY3Rpb24gPT09ICdwcmV2Jykge1xuICAgICAgICBzd2lwZXIuc2xpZGVUbyhyZXdpbmRMYXN0SW5kZXggIT09IG51bGwgPyByZXdpbmRMYXN0SW5kZXggOiBzdG9wSW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQgPT09IHN3aXBlci5uYXZpZ2F0aW9uLm5leHRFbCkge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4ICsgaW5jcmVtZW50KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3RvcEluZGV4KTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gb25SZXNpemUoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgZWxcbiAgfSA9IHN3aXBlcjtcbiAgaWYgKGVsICYmIGVsLm9mZnNldFdpZHRoID09PSAwKSByZXR1cm47XG5cbiAgLy8gQnJlYWtwb2ludHNcbiAgaWYgKHBhcmFtcy5icmVha3BvaW50cykge1xuICAgIHN3aXBlci5zZXRCcmVha3BvaW50KCk7XG4gIH1cblxuICAvLyBTYXZlIGxvY2tzXG4gIGNvbnN0IHtcbiAgICBhbGxvd1NsaWRlTmV4dCxcbiAgICBhbGxvd1NsaWRlUHJldixcbiAgICBzbmFwR3JpZFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBpc1ZpcnR1YWwgPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZDtcblxuICAvLyBEaXNhYmxlIGxvY2tzIG9uIHJlc2l6ZVxuICBzd2lwZXIuYWxsb3dTbGlkZU5leHQgPSB0cnVlO1xuICBzd2lwZXIuYWxsb3dTbGlkZVByZXYgPSB0cnVlO1xuICBzd2lwZXIudXBkYXRlU2l6ZSgpO1xuICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gIGNvbnN0IGlzVmlydHVhbExvb3AgPSBpc1ZpcnR1YWwgJiYgcGFyYW1zLmxvb3A7XG4gIGlmICgocGFyYW1zLnNsaWRlc1BlclZpZXcgPT09ICdhdXRvJyB8fCBwYXJhbXMuc2xpZGVzUGVyVmlldyA+IDEpICYmIHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLmlzQmVnaW5uaW5nICYmICFzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzICYmICFpc1ZpcnR1YWxMb29wKSB7XG4gICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnNsaWRlcy5sZW5ndGggLSAxLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCAmJiAhaXNWaXJ0dWFsKSB7XG4gICAgICBzd2lwZXIuc2xpZGVUb0xvb3Aoc3dpcGVyLnJlYWxJbmRleCwgMCwgZmFsc2UsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzd2lwZXIuc2xpZGVUbyhzd2lwZXIuYWN0aXZlSW5kZXgsIDAsIGZhbHNlLCB0cnVlKTtcbiAgICB9XG4gIH1cbiAgaWYgKHN3aXBlci5hdXRvcGxheSAmJiBzd2lwZXIuYXV0b3BsYXkucnVubmluZyAmJiBzd2lwZXIuYXV0b3BsYXkucGF1c2VkKSB7XG4gICAgY2xlYXJUaW1lb3V0KHN3aXBlci5hdXRvcGxheS5yZXNpemVUaW1lb3V0KTtcbiAgICBzd2lwZXIuYXV0b3BsYXkucmVzaXplVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgaWYgKHN3aXBlci5hdXRvcGxheSAmJiBzd2lwZXIuYXV0b3BsYXkucnVubmluZyAmJiBzd2lwZXIuYXV0b3BsYXkucGF1c2VkKSB7XG4gICAgICAgIHN3aXBlci5hdXRvcGxheS5yZXN1bWUoKTtcbiAgICAgIH1cbiAgICB9LCA1MDApO1xuICB9XG4gIC8vIFJldHVybiBsb2NrcyBhZnRlciByZXNpemVcbiAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gYWxsb3dTbGlkZVByZXY7XG4gIHN3aXBlci5hbGxvd1NsaWRlTmV4dCA9IGFsbG93U2xpZGVOZXh0O1xuICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHNuYXBHcmlkICE9PSBzd2lwZXIuc25hcEdyaWQpIHtcbiAgICBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uQ2xpY2soZSkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBpZiAoIXN3aXBlci5lbmFibGVkKSByZXR1cm47XG4gIGlmICghc3dpcGVyLmFsbG93Q2xpY2spIHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5wcmV2ZW50Q2xpY2tzKSBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMucHJldmVudENsaWNrc1Byb3BhZ2F0aW9uICYmIHN3aXBlci5hbmltYXRpbmcpIHtcbiAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBlLnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBvblNjcm9sbCgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgY29uc3Qge1xuICAgIHdyYXBwZXJFbCxcbiAgICBydGxUcmFuc2xhdGUsXG4gICAgZW5hYmxlZFxuICB9ID0gc3dpcGVyO1xuICBpZiAoIWVuYWJsZWQpIHJldHVybjtcbiAgc3dpcGVyLnByZXZpb3VzVHJhbnNsYXRlID0gc3dpcGVyLnRyYW5zbGF0ZTtcbiAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgIHN3aXBlci50cmFuc2xhdGUgPSAtd3JhcHBlckVsLnNjcm9sbExlZnQ7XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLnRyYW5zbGF0ZSA9IC13cmFwcGVyRWwuc2Nyb2xsVG9wO1xuICB9XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBpZiAoc3dpcGVyLnRyYW5zbGF0ZSA9PT0gMCkgc3dpcGVyLnRyYW5zbGF0ZSA9IDA7XG4gIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICBsZXQgbmV3UHJvZ3Jlc3M7XG4gIGNvbnN0IHRyYW5zbGF0ZXNEaWZmID0gc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpO1xuICBpZiAodHJhbnNsYXRlc0RpZmYgPT09IDApIHtcbiAgICBuZXdQcm9ncmVzcyA9IDA7XG4gIH0gZWxzZSB7XG4gICAgbmV3UHJvZ3Jlc3MgPSAoc3dpcGVyLnRyYW5zbGF0ZSAtIHN3aXBlci5taW5UcmFuc2xhdGUoKSkgLyB0cmFuc2xhdGVzRGlmZjtcbiAgfVxuICBpZiAobmV3UHJvZ3Jlc3MgIT09IHN3aXBlci5wcm9ncmVzcykge1xuICAgIHN3aXBlci51cGRhdGVQcm9ncmVzcyhydGxUcmFuc2xhdGUgPyAtc3dpcGVyLnRyYW5zbGF0ZSA6IHN3aXBlci50cmFuc2xhdGUpO1xuICB9XG4gIHN3aXBlci5lbWl0KCdzZXRUcmFuc2xhdGUnLCBzd2lwZXIudHJhbnNsYXRlLCBmYWxzZSk7XG59XG5cbmZ1bmN0aW9uIG9uTG9hZChlKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIHByb2Nlc3NMYXp5UHJlbG9hZGVyKHN3aXBlciwgZS50YXJnZXQpO1xuICBpZiAoc3dpcGVyLnBhcmFtcy5jc3NNb2RlIHx8IHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyVmlldyAhPT0gJ2F1dG8nICYmICFzd2lwZXIucGFyYW1zLmF1dG9IZWlnaHQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc3dpcGVyLnVwZGF0ZSgpO1xufVxuXG5mdW5jdGlvbiBvbkRvY3VtZW50VG91Y2hTdGFydCgpIHtcbiAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgaWYgKHN3aXBlci5kb2N1bWVudFRvdWNoSGFuZGxlclByb2NlZWRlZCkgcmV0dXJuO1xuICBzd2lwZXIuZG9jdW1lbnRUb3VjaEhhbmRsZXJQcm9jZWVkZWQgPSB0cnVlO1xuICBpZiAoc3dpcGVyLnBhcmFtcy50b3VjaFJlbGVhc2VPbkVkZ2VzKSB7XG4gICAgc3dpcGVyLmVsLnN0eWxlLnRvdWNoQWN0aW9uID0gJ2F1dG8nO1xuICB9XG59XG5cbmNvbnN0IGV2ZW50cyA9IChzd2lwZXIsIG1ldGhvZCkgPT4ge1xuICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXMsXG4gICAgZWwsXG4gICAgd3JhcHBlckVsLFxuICAgIGRldmljZVxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBjYXB0dXJlID0gISFwYXJhbXMubmVzdGVkO1xuICBjb25zdCBkb21NZXRob2QgPSBtZXRob2QgPT09ICdvbicgPyAnYWRkRXZlbnRMaXN0ZW5lcicgOiAncmVtb3ZlRXZlbnRMaXN0ZW5lcic7XG4gIGNvbnN0IHN3aXBlck1ldGhvZCA9IG1ldGhvZDtcblxuICAvLyBUb3VjaCBFdmVudHNcbiAgZG9jdW1lbnRbZG9tTWV0aG9kXSgndG91Y2hzdGFydCcsIHN3aXBlci5vbkRvY3VtZW50VG91Y2hTdGFydCwge1xuICAgIHBhc3NpdmU6IGZhbHNlLFxuICAgIGNhcHR1cmVcbiAgfSk7XG4gIGVsW2RvbU1ldGhvZF0oJ3RvdWNoc3RhcnQnLCBzd2lwZXIub25Ub3VjaFN0YXJ0LCB7XG4gICAgcGFzc2l2ZTogZmFsc2VcbiAgfSk7XG4gIGVsW2RvbU1ldGhvZF0oJ3BvaW50ZXJkb3duJywgc3dpcGVyLm9uVG91Y2hTdGFydCwge1xuICAgIHBhc3NpdmU6IGZhbHNlXG4gIH0pO1xuICBkb2N1bWVudFtkb21NZXRob2RdKCd0b3VjaG1vdmUnLCBzd2lwZXIub25Ub3VjaE1vdmUsIHtcbiAgICBwYXNzaXZlOiBmYWxzZSxcbiAgICBjYXB0dXJlXG4gIH0pO1xuICBkb2N1bWVudFtkb21NZXRob2RdKCdwb2ludGVybW92ZScsIHN3aXBlci5vblRvdWNoTW92ZSwge1xuICAgIHBhc3NpdmU6IGZhbHNlLFxuICAgIGNhcHR1cmVcbiAgfSk7XG4gIGRvY3VtZW50W2RvbU1ldGhvZF0oJ3RvdWNoZW5kJywgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICBwYXNzaXZlOiB0cnVlXG4gIH0pO1xuICBkb2N1bWVudFtkb21NZXRob2RdKCdwb2ludGVydXAnLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgIHBhc3NpdmU6IHRydWVcbiAgfSk7XG4gIGRvY3VtZW50W2RvbU1ldGhvZF0oJ3BvaW50ZXJjYW5jZWwnLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgIHBhc3NpdmU6IHRydWVcbiAgfSk7XG4gIGRvY3VtZW50W2RvbU1ldGhvZF0oJ3RvdWNoY2FuY2VsJywgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICBwYXNzaXZlOiB0cnVlXG4gIH0pO1xuICBkb2N1bWVudFtkb21NZXRob2RdKCdwb2ludGVyb3V0Jywgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICBwYXNzaXZlOiB0cnVlXG4gIH0pO1xuICBkb2N1bWVudFtkb21NZXRob2RdKCdwb2ludGVybGVhdmUnLCBzd2lwZXIub25Ub3VjaEVuZCwge1xuICAgIHBhc3NpdmU6IHRydWVcbiAgfSk7XG4gIGRvY3VtZW50W2RvbU1ldGhvZF0oJ2NvbnRleHRtZW51Jywgc3dpcGVyLm9uVG91Y2hFbmQsIHtcbiAgICBwYXNzaXZlOiB0cnVlXG4gIH0pO1xuXG4gIC8vIFByZXZlbnQgTGlua3MgQ2xpY2tzXG4gIGlmIChwYXJhbXMucHJldmVudENsaWNrcyB8fCBwYXJhbXMucHJldmVudENsaWNrc1Byb3BhZ2F0aW9uKSB7XG4gICAgZWxbZG9tTWV0aG9kXSgnY2xpY2snLCBzd2lwZXIub25DbGljaywgdHJ1ZSk7XG4gIH1cbiAgaWYgKHBhcmFtcy5jc3NNb2RlKSB7XG4gICAgd3JhcHBlckVsW2RvbU1ldGhvZF0oJ3Njcm9sbCcsIHN3aXBlci5vblNjcm9sbCk7XG4gIH1cblxuICAvLyBSZXNpemUgaGFuZGxlclxuICBpZiAocGFyYW1zLnVwZGF0ZU9uV2luZG93UmVzaXplKSB7XG4gICAgc3dpcGVyW3N3aXBlck1ldGhvZF0oZGV2aWNlLmlvcyB8fCBkZXZpY2UuYW5kcm9pZCA/ICdyZXNpemUgb3JpZW50YXRpb25jaGFuZ2Ugb2JzZXJ2ZXJVcGRhdGUnIDogJ3Jlc2l6ZSBvYnNlcnZlclVwZGF0ZScsIG9uUmVzaXplLCB0cnVlKTtcbiAgfSBlbHNlIHtcbiAgICBzd2lwZXJbc3dpcGVyTWV0aG9kXSgnb2JzZXJ2ZXJVcGRhdGUnLCBvblJlc2l6ZSwgdHJ1ZSk7XG4gIH1cblxuICAvLyBJbWFnZXMgbG9hZGVyXG4gIGVsW2RvbU1ldGhvZF0oJ2xvYWQnLCBzd2lwZXIub25Mb2FkLCB7XG4gICAgY2FwdHVyZTogdHJ1ZVxuICB9KTtcbn07XG5mdW5jdGlvbiBhdHRhY2hFdmVudHMoKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBwYXJhbXNcbiAgfSA9IHN3aXBlcjtcbiAgc3dpcGVyLm9uVG91Y2hTdGFydCA9IG9uVG91Y2hTdGFydC5iaW5kKHN3aXBlcik7XG4gIHN3aXBlci5vblRvdWNoTW92ZSA9IG9uVG91Y2hNb3ZlLmJpbmQoc3dpcGVyKTtcbiAgc3dpcGVyLm9uVG91Y2hFbmQgPSBvblRvdWNoRW5kLmJpbmQoc3dpcGVyKTtcbiAgc3dpcGVyLm9uRG9jdW1lbnRUb3VjaFN0YXJ0ID0gb25Eb2N1bWVudFRvdWNoU3RhcnQuYmluZChzd2lwZXIpO1xuICBpZiAocGFyYW1zLmNzc01vZGUpIHtcbiAgICBzd2lwZXIub25TY3JvbGwgPSBvblNjcm9sbC5iaW5kKHN3aXBlcik7XG4gIH1cbiAgc3dpcGVyLm9uQ2xpY2sgPSBvbkNsaWNrLmJpbmQoc3dpcGVyKTtcbiAgc3dpcGVyLm9uTG9hZCA9IG9uTG9hZC5iaW5kKHN3aXBlcik7XG4gIGV2ZW50cyhzd2lwZXIsICdvbicpO1xufVxuZnVuY3Rpb24gZGV0YWNoRXZlbnRzKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBldmVudHMoc3dpcGVyLCAnb2ZmJyk7XG59XG52YXIgZXZlbnRzJDEgPSB7XG4gIGF0dGFjaEV2ZW50cyxcbiAgZGV0YWNoRXZlbnRzXG59O1xuXG5jb25zdCBpc0dyaWRFbmFibGVkID0gKHN3aXBlciwgcGFyYW1zKSA9PiB7XG4gIHJldHVybiBzd2lwZXIuZ3JpZCAmJiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMTtcbn07XG5mdW5jdGlvbiBzZXRCcmVha3BvaW50KCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgcmVhbEluZGV4LFxuICAgIGluaXRpYWxpemVkLFxuICAgIHBhcmFtcyxcbiAgICBlbFxuICB9ID0gc3dpcGVyO1xuICBjb25zdCBicmVha3BvaW50cyA9IHBhcmFtcy5icmVha3BvaW50cztcbiAgaWYgKCFicmVha3BvaW50cyB8fCBicmVha3BvaW50cyAmJiBPYmplY3Qua2V5cyhicmVha3BvaW50cykubGVuZ3RoID09PSAwKSByZXR1cm47XG5cbiAgLy8gR2V0IGJyZWFrcG9pbnQgZm9yIHdpbmRvdyB3aWR0aCBhbmQgdXBkYXRlIHBhcmFtZXRlcnNcbiAgY29uc3QgYnJlYWtwb2ludCA9IHN3aXBlci5nZXRCcmVha3BvaW50KGJyZWFrcG9pbnRzLCBzd2lwZXIucGFyYW1zLmJyZWFrcG9pbnRzQmFzZSwgc3dpcGVyLmVsKTtcbiAgaWYgKCFicmVha3BvaW50IHx8IHN3aXBlci5jdXJyZW50QnJlYWtwb2ludCA9PT0gYnJlYWtwb2ludCkgcmV0dXJuO1xuICBjb25zdCBicmVha3BvaW50T25seVBhcmFtcyA9IGJyZWFrcG9pbnQgaW4gYnJlYWtwb2ludHMgPyBicmVha3BvaW50c1ticmVha3BvaW50XSA6IHVuZGVmaW5lZDtcbiAgY29uc3QgYnJlYWtwb2ludFBhcmFtcyA9IGJyZWFrcG9pbnRPbmx5UGFyYW1zIHx8IHN3aXBlci5vcmlnaW5hbFBhcmFtcztcbiAgY29uc3Qgd2FzTXVsdGlSb3cgPSBpc0dyaWRFbmFibGVkKHN3aXBlciwgcGFyYW1zKTtcbiAgY29uc3QgaXNNdWx0aVJvdyA9IGlzR3JpZEVuYWJsZWQoc3dpcGVyLCBicmVha3BvaW50UGFyYW1zKTtcbiAgY29uc3Qgd2FzRW5hYmxlZCA9IHBhcmFtcy5lbmFibGVkO1xuICBpZiAod2FzTXVsdGlSb3cgJiYgIWlzTXVsdGlSb3cpIHtcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGAke3BhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfWdyaWRgLCBgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ncmlkLWNvbHVtbmApO1xuICAgIHN3aXBlci5lbWl0Q29udGFpbmVyQ2xhc3NlcygpO1xuICB9IGVsc2UgaWYgKCF3YXNNdWx0aVJvdyAmJiBpc011bHRpUm93KSB7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChgJHtwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ncmlkYCk7XG4gICAgaWYgKGJyZWFrcG9pbnRQYXJhbXMuZ3JpZC5maWxsICYmIGJyZWFrcG9pbnRQYXJhbXMuZ3JpZC5maWxsID09PSAnY29sdW1uJyB8fCAhYnJlYWtwb2ludFBhcmFtcy5ncmlkLmZpbGwgJiYgcGFyYW1zLmdyaWQuZmlsbCA9PT0gJ2NvbHVtbicpIHtcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoYCR7cGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9Z3JpZC1jb2x1bW5gKTtcbiAgICB9XG4gICAgc3dpcGVyLmVtaXRDb250YWluZXJDbGFzc2VzKCk7XG4gIH1cblxuICAvLyBUb2dnbGUgbmF2aWdhdGlvbiwgcGFnaW5hdGlvbiwgc2Nyb2xsYmFyXG4gIFsnbmF2aWdhdGlvbicsICdwYWdpbmF0aW9uJywgJ3Njcm9sbGJhciddLmZvckVhY2gocHJvcCA9PiB7XG4gICAgaWYgKHR5cGVvZiBicmVha3BvaW50UGFyYW1zW3Byb3BdID09PSAndW5kZWZpbmVkJykgcmV0dXJuO1xuICAgIGNvbnN0IHdhc01vZHVsZUVuYWJsZWQgPSBwYXJhbXNbcHJvcF0gJiYgcGFyYW1zW3Byb3BdLmVuYWJsZWQ7XG4gICAgY29uc3QgaXNNb2R1bGVFbmFibGVkID0gYnJlYWtwb2ludFBhcmFtc1twcm9wXSAmJiBicmVha3BvaW50UGFyYW1zW3Byb3BdLmVuYWJsZWQ7XG4gICAgaWYgKHdhc01vZHVsZUVuYWJsZWQgJiYgIWlzTW9kdWxlRW5hYmxlZCkge1xuICAgICAgc3dpcGVyW3Byb3BdLmRpc2FibGUoKTtcbiAgICB9XG4gICAgaWYgKCF3YXNNb2R1bGVFbmFibGVkICYmIGlzTW9kdWxlRW5hYmxlZCkge1xuICAgICAgc3dpcGVyW3Byb3BdLmVuYWJsZSgpO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGRpcmVjdGlvbkNoYW5nZWQgPSBicmVha3BvaW50UGFyYW1zLmRpcmVjdGlvbiAmJiBicmVha3BvaW50UGFyYW1zLmRpcmVjdGlvbiAhPT0gcGFyYW1zLmRpcmVjdGlvbjtcbiAgY29uc3QgbmVlZHNSZUxvb3AgPSBwYXJhbXMubG9vcCAmJiAoYnJlYWtwb2ludFBhcmFtcy5zbGlkZXNQZXJWaWV3ICE9PSBwYXJhbXMuc2xpZGVzUGVyVmlldyB8fCBkaXJlY3Rpb25DaGFuZ2VkKTtcbiAgY29uc3Qgd2FzTG9vcCA9IHBhcmFtcy5sb29wO1xuICBpZiAoZGlyZWN0aW9uQ2hhbmdlZCAmJiBpbml0aWFsaXplZCkge1xuICAgIHN3aXBlci5jaGFuZ2VEaXJlY3Rpb24oKTtcbiAgfVxuICBleHRlbmQoc3dpcGVyLnBhcmFtcywgYnJlYWtwb2ludFBhcmFtcyk7XG4gIGNvbnN0IGlzRW5hYmxlZCA9IHN3aXBlci5wYXJhbXMuZW5hYmxlZDtcbiAgY29uc3QgaGFzTG9vcCA9IHN3aXBlci5wYXJhbXMubG9vcDtcbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICBhbGxvd1RvdWNoTW92ZTogc3dpcGVyLnBhcmFtcy5hbGxvd1RvdWNoTW92ZSxcbiAgICBhbGxvd1NsaWRlTmV4dDogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlTmV4dCxcbiAgICBhbGxvd1NsaWRlUHJldjogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlUHJldlxuICB9KTtcbiAgaWYgKHdhc0VuYWJsZWQgJiYgIWlzRW5hYmxlZCkge1xuICAgIHN3aXBlci5kaXNhYmxlKCk7XG4gIH0gZWxzZSBpZiAoIXdhc0VuYWJsZWQgJiYgaXNFbmFibGVkKSB7XG4gICAgc3dpcGVyLmVuYWJsZSgpO1xuICB9XG4gIHN3aXBlci5jdXJyZW50QnJlYWtwb2ludCA9IGJyZWFrcG9pbnQ7XG4gIHN3aXBlci5lbWl0KCdfYmVmb3JlQnJlYWtwb2ludCcsIGJyZWFrcG9pbnRQYXJhbXMpO1xuICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICBpZiAobmVlZHNSZUxvb3ApIHtcbiAgICAgIHN3aXBlci5sb29wRGVzdHJveSgpO1xuICAgICAgc3dpcGVyLmxvb3BDcmVhdGUocmVhbEluZGV4KTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXMoKTtcbiAgICB9IGVsc2UgaWYgKCF3YXNMb29wICYmIGhhc0xvb3ApIHtcbiAgICAgIHN3aXBlci5sb29wQ3JlYXRlKHJlYWxJbmRleCk7XG4gICAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgfSBlbHNlIGlmICh3YXNMb29wICYmICFoYXNMb29wKSB7XG4gICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICB9XG4gIH1cbiAgc3dpcGVyLmVtaXQoJ2JyZWFrcG9pbnQnLCBicmVha3BvaW50UGFyYW1zKTtcbn1cblxuZnVuY3Rpb24gZ2V0QnJlYWtwb2ludChicmVha3BvaW50cywgYmFzZSwgY29udGFpbmVyRWwpIHtcbiAgaWYgKGJhc2UgPT09IHZvaWQgMCkge1xuICAgIGJhc2UgPSAnd2luZG93JztcbiAgfVxuICBpZiAoIWJyZWFrcG9pbnRzIHx8IGJhc2UgPT09ICdjb250YWluZXInICYmICFjb250YWluZXJFbCkgcmV0dXJuIHVuZGVmaW5lZDtcbiAgbGV0IGJyZWFrcG9pbnQgPSBmYWxzZTtcbiAgY29uc3Qgd2luZG93ID0gZ2V0V2luZG93KCk7XG4gIGNvbnN0IGN1cnJlbnRIZWlnaHQgPSBiYXNlID09PSAnd2luZG93JyA/IHdpbmRvdy5pbm5lckhlaWdodCA6IGNvbnRhaW5lckVsLmNsaWVudEhlaWdodDtcbiAgY29uc3QgcG9pbnRzID0gT2JqZWN0LmtleXMoYnJlYWtwb2ludHMpLm1hcChwb2ludCA9PiB7XG4gICAgaWYgKHR5cGVvZiBwb2ludCA9PT0gJ3N0cmluZycgJiYgcG9pbnQuaW5kZXhPZignQCcpID09PSAwKSB7XG4gICAgICBjb25zdCBtaW5SYXRpbyA9IHBhcnNlRmxvYXQocG9pbnQuc3Vic3RyKDEpKTtcbiAgICAgIGNvbnN0IHZhbHVlID0gY3VycmVudEhlaWdodCAqIG1pblJhdGlvO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdmFsdWUsXG4gICAgICAgIHBvaW50XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdmFsdWU6IHBvaW50LFxuICAgICAgcG9pbnRcbiAgICB9O1xuICB9KTtcbiAgcG9pbnRzLnNvcnQoKGEsIGIpID0+IHBhcnNlSW50KGEudmFsdWUsIDEwKSAtIHBhcnNlSW50KGIudmFsdWUsIDEwKSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgcG9pbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3Qge1xuICAgICAgcG9pbnQsXG4gICAgICB2YWx1ZVxuICAgIH0gPSBwb2ludHNbaV07XG4gICAgaWYgKGJhc2UgPT09ICd3aW5kb3cnKSB7XG4gICAgICBpZiAod2luZG93Lm1hdGNoTWVkaWEoYChtaW4td2lkdGg6ICR7dmFsdWV9cHgpYCkubWF0Y2hlcykge1xuICAgICAgICBicmVha3BvaW50ID0gcG9pbnQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA8PSBjb250YWluZXJFbC5jbGllbnRXaWR0aCkge1xuICAgICAgYnJlYWtwb2ludCA9IHBvaW50O1xuICAgIH1cbiAgfVxuICByZXR1cm4gYnJlYWtwb2ludCB8fCAnbWF4Jztcbn1cblxudmFyIGJyZWFrcG9pbnRzID0ge1xuICBzZXRCcmVha3BvaW50LFxuICBnZXRCcmVha3BvaW50XG59O1xuXG5mdW5jdGlvbiBwcmVwYXJlQ2xhc3NlcyhlbnRyaWVzLCBwcmVmaXgpIHtcbiAgY29uc3QgcmVzdWx0Q2xhc3NlcyA9IFtdO1xuICBlbnRyaWVzLmZvckVhY2goaXRlbSA9PiB7XG4gICAgaWYgKHR5cGVvZiBpdGVtID09PSAnb2JqZWN0Jykge1xuICAgICAgT2JqZWN0LmtleXMoaXRlbSkuZm9yRWFjaChjbGFzc05hbWVzID0+IHtcbiAgICAgICAgaWYgKGl0ZW1bY2xhc3NOYW1lc10pIHtcbiAgICAgICAgICByZXN1bHRDbGFzc2VzLnB1c2gocHJlZml4ICsgY2xhc3NOYW1lcyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICByZXN1bHRDbGFzc2VzLnB1c2gocHJlZml4ICsgaXRlbSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIHJlc3VsdENsYXNzZXM7XG59XG5mdW5jdGlvbiBhZGRDbGFzc2VzKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgY2xhc3NOYW1lcyxcbiAgICBwYXJhbXMsXG4gICAgcnRsLFxuICAgIGVsLFxuICAgIGRldmljZVxuICB9ID0gc3dpcGVyO1xuICAvLyBwcmV0dGllci1pZ25vcmVcbiAgY29uc3Qgc3VmZml4ZXMgPSBwcmVwYXJlQ2xhc3NlcyhbJ2luaXRpYWxpemVkJywgcGFyYW1zLmRpcmVjdGlvbiwge1xuICAgICdmcmVlLW1vZGUnOiBzd2lwZXIucGFyYW1zLmZyZWVNb2RlICYmIHBhcmFtcy5mcmVlTW9kZS5lbmFibGVkXG4gIH0sIHtcbiAgICAnYXV0b2hlaWdodCc6IHBhcmFtcy5hdXRvSGVpZ2h0XG4gIH0sIHtcbiAgICAncnRsJzogcnRsXG4gIH0sIHtcbiAgICAnZ3JpZCc6IHBhcmFtcy5ncmlkICYmIHBhcmFtcy5ncmlkLnJvd3MgPiAxXG4gIH0sIHtcbiAgICAnZ3JpZC1jb2x1bW4nOiBwYXJhbXMuZ3JpZCAmJiBwYXJhbXMuZ3JpZC5yb3dzID4gMSAmJiBwYXJhbXMuZ3JpZC5maWxsID09PSAnY29sdW1uJ1xuICB9LCB7XG4gICAgJ2FuZHJvaWQnOiBkZXZpY2UuYW5kcm9pZFxuICB9LCB7XG4gICAgJ2lvcyc6IGRldmljZS5pb3NcbiAgfSwge1xuICAgICdjc3MtbW9kZSc6IHBhcmFtcy5jc3NNb2RlXG4gIH0sIHtcbiAgICAnY2VudGVyZWQnOiBwYXJhbXMuY3NzTW9kZSAmJiBwYXJhbXMuY2VudGVyZWRTbGlkZXNcbiAgfSwge1xuICAgICd3YXRjaC1wcm9ncmVzcyc6IHBhcmFtcy53YXRjaFNsaWRlc1Byb2dyZXNzXG4gIH1dLCBwYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcyk7XG4gIGNsYXNzTmFtZXMucHVzaCguLi5zdWZmaXhlcyk7XG4gIGVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3NOYW1lcyk7XG4gIHN3aXBlci5lbWl0Q29udGFpbmVyQ2xhc3NlcygpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVDbGFzc2VzKCkge1xuICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICBjb25zdCB7XG4gICAgZWwsXG4gICAgY2xhc3NOYW1lc1xuICB9ID0gc3dpcGVyO1xuICBlbC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzTmFtZXMpO1xuICBzd2lwZXIuZW1pdENvbnRhaW5lckNsYXNzZXMoKTtcbn1cblxudmFyIGNsYXNzZXMgPSB7XG4gIGFkZENsYXNzZXMsXG4gIHJlbW92ZUNsYXNzZXNcbn07XG5cbmZ1bmN0aW9uIGNoZWNrT3ZlcmZsb3coKSB7XG4gIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gIGNvbnN0IHtcbiAgICBpc0xvY2tlZDogd2FzTG9ja2VkLFxuICAgIHBhcmFtc1xuICB9ID0gc3dpcGVyO1xuICBjb25zdCB7XG4gICAgc2xpZGVzT2Zmc2V0QmVmb3JlXG4gIH0gPSBwYXJhbXM7XG4gIGlmIChzbGlkZXNPZmZzZXRCZWZvcmUpIHtcbiAgICBjb25zdCBsYXN0U2xpZGVJbmRleCA9IHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMTtcbiAgICBjb25zdCBsYXN0U2xpZGVSaWdodEVkZ2UgPSBzd2lwZXIuc2xpZGVzR3JpZFtsYXN0U2xpZGVJbmRleF0gKyBzd2lwZXIuc2xpZGVzU2l6ZXNHcmlkW2xhc3RTbGlkZUluZGV4XSArIHNsaWRlc09mZnNldEJlZm9yZSAqIDI7XG4gICAgc3dpcGVyLmlzTG9ja2VkID0gc3dpcGVyLnNpemUgPiBsYXN0U2xpZGVSaWdodEVkZ2U7XG4gIH0gZWxzZSB7XG4gICAgc3dpcGVyLmlzTG9ja2VkID0gc3dpcGVyLnNuYXBHcmlkLmxlbmd0aCA9PT0gMTtcbiAgfVxuICBpZiAocGFyYW1zLmFsbG93U2xpZGVOZXh0ID09PSB0cnVlKSB7XG4gICAgc3dpcGVyLmFsbG93U2xpZGVOZXh0ID0gIXN3aXBlci5pc0xvY2tlZDtcbiAgfVxuICBpZiAocGFyYW1zLmFsbG93U2xpZGVQcmV2ID09PSB0cnVlKSB7XG4gICAgc3dpcGVyLmFsbG93U2xpZGVQcmV2ID0gIXN3aXBlci5pc0xvY2tlZDtcbiAgfVxuICBpZiAod2FzTG9ja2VkICYmIHdhc0xvY2tlZCAhPT0gc3dpcGVyLmlzTG9ja2VkKSB7XG4gICAgc3dpcGVyLmlzRW5kID0gZmFsc2U7XG4gIH1cbiAgaWYgKHdhc0xvY2tlZCAhPT0gc3dpcGVyLmlzTG9ja2VkKSB7XG4gICAgc3dpcGVyLmVtaXQoc3dpcGVyLmlzTG9ja2VkID8gJ2xvY2snIDogJ3VubG9jaycpO1xuICB9XG59XG52YXIgY2hlY2tPdmVyZmxvdyQxID0ge1xuICBjaGVja092ZXJmbG93XG59O1xuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGluaXQ6IHRydWUsXG4gIGRpcmVjdGlvbjogJ2hvcml6b250YWwnLFxuICBvbmVXYXlNb3ZlbWVudDogZmFsc2UsXG4gIHRvdWNoRXZlbnRzVGFyZ2V0OiAnd3JhcHBlcicsXG4gIGluaXRpYWxTbGlkZTogMCxcbiAgc3BlZWQ6IDMwMCxcbiAgY3NzTW9kZTogZmFsc2UsXG4gIHVwZGF0ZU9uV2luZG93UmVzaXplOiB0cnVlLFxuICByZXNpemVPYnNlcnZlcjogdHJ1ZSxcbiAgbmVzdGVkOiBmYWxzZSxcbiAgY3JlYXRlRWxlbWVudHM6IGZhbHNlLFxuICBldmVudHNQcmVmaXg6ICdzd2lwZXInLFxuICBlbmFibGVkOiB0cnVlLFxuICBmb2N1c2FibGVFbGVtZW50czogJ2lucHV0LCBzZWxlY3QsIG9wdGlvbiwgdGV4dGFyZWEsIGJ1dHRvbiwgdmlkZW8sIGxhYmVsJyxcbiAgLy8gT3ZlcnJpZGVzXG4gIHdpZHRoOiBudWxsLFxuICBoZWlnaHQ6IG51bGwsXG4gIC8vXG4gIHByZXZlbnRJbnRlcmFjdGlvbk9uVHJhbnNpdGlvbjogZmFsc2UsXG4gIC8vIHNzclxuICB1c2VyQWdlbnQ6IG51bGwsXG4gIHVybDogbnVsbCxcbiAgLy8gVG8gc3VwcG9ydCBpT1MncyBzd2lwZS10by1nby1iYWNrIGdlc3R1cmUgKHdoZW4gYmVpbmcgdXNlZCBpbi1hcHApLlxuICBlZGdlU3dpcGVEZXRlY3Rpb246IGZhbHNlLFxuICBlZGdlU3dpcGVUaHJlc2hvbGQ6IDIwLFxuICAvLyBBdXRvaGVpZ2h0XG4gIGF1dG9IZWlnaHQ6IGZhbHNlLFxuICAvLyBTZXQgd3JhcHBlciB3aWR0aFxuICBzZXRXcmFwcGVyU2l6ZTogZmFsc2UsXG4gIC8vIFZpcnR1YWwgVHJhbnNsYXRlXG4gIHZpcnR1YWxUcmFuc2xhdGU6IGZhbHNlLFxuICAvLyBFZmZlY3RzXG4gIGVmZmVjdDogJ3NsaWRlJyxcbiAgLy8gJ3NsaWRlJyBvciAnZmFkZScgb3IgJ2N1YmUnIG9yICdjb3ZlcmZsb3cnIG9yICdmbGlwJ1xuXG4gIC8vIEJyZWFrcG9pbnRzXG4gIGJyZWFrcG9pbnRzOiB1bmRlZmluZWQsXG4gIGJyZWFrcG9pbnRzQmFzZTogJ3dpbmRvdycsXG4gIC8vIFNsaWRlcyBncmlkXG4gIHNwYWNlQmV0d2VlbjogMCxcbiAgc2xpZGVzUGVyVmlldzogMSxcbiAgc2xpZGVzUGVyR3JvdXA6IDEsXG4gIHNsaWRlc1Blckdyb3VwU2tpcDogMCxcbiAgc2xpZGVzUGVyR3JvdXBBdXRvOiBmYWxzZSxcbiAgY2VudGVyZWRTbGlkZXM6IGZhbHNlLFxuICBjZW50ZXJlZFNsaWRlc0JvdW5kczogZmFsc2UsXG4gIHNsaWRlc09mZnNldEJlZm9yZTogMCxcbiAgLy8gaW4gcHhcbiAgc2xpZGVzT2Zmc2V0QWZ0ZXI6IDAsXG4gIC8vIGluIHB4XG4gIG5vcm1hbGl6ZVNsaWRlSW5kZXg6IHRydWUsXG4gIGNlbnRlckluc3VmZmljaWVudFNsaWRlczogZmFsc2UsXG4gIC8vIERpc2FibGUgc3dpcGVyIGFuZCBoaWRlIG5hdmlnYXRpb24gd2hlbiBjb250YWluZXIgbm90IG92ZXJmbG93XG4gIHdhdGNoT3ZlcmZsb3c6IHRydWUsXG4gIC8vIFJvdW5kIGxlbmd0aFxuICByb3VuZExlbmd0aHM6IGZhbHNlLFxuICAvLyBUb3VjaGVzXG4gIHRvdWNoUmF0aW86IDEsXG4gIHRvdWNoQW5nbGU6IDQ1LFxuICBzaW11bGF0ZVRvdWNoOiB0cnVlLFxuICBzaG9ydFN3aXBlczogdHJ1ZSxcbiAgbG9uZ1N3aXBlczogdHJ1ZSxcbiAgbG9uZ1N3aXBlc1JhdGlvOiAwLjUsXG4gIGxvbmdTd2lwZXNNczogMzAwLFxuICBmb2xsb3dGaW5nZXI6IHRydWUsXG4gIGFsbG93VG91Y2hNb3ZlOiB0cnVlLFxuICB0aHJlc2hvbGQ6IDUsXG4gIHRvdWNoTW92ZVN0b3BQcm9wYWdhdGlvbjogZmFsc2UsXG4gIHRvdWNoU3RhcnRQcmV2ZW50RGVmYXVsdDogdHJ1ZSxcbiAgdG91Y2hTdGFydEZvcmNlUHJldmVudERlZmF1bHQ6IGZhbHNlLFxuICB0b3VjaFJlbGVhc2VPbkVkZ2VzOiBmYWxzZSxcbiAgLy8gVW5pcXVlIE5hdmlnYXRpb24gRWxlbWVudHNcbiAgdW5pcXVlTmF2RWxlbWVudHM6IHRydWUsXG4gIC8vIFJlc2lzdGFuY2VcbiAgcmVzaXN0YW5jZTogdHJ1ZSxcbiAgcmVzaXN0YW5jZVJhdGlvOiAwLjg1LFxuICAvLyBQcm9ncmVzc1xuICB3YXRjaFNsaWRlc1Byb2dyZXNzOiBmYWxzZSxcbiAgLy8gQ3Vyc29yXG4gIGdyYWJDdXJzb3I6IGZhbHNlLFxuICAvLyBDbGlja3NcbiAgcHJldmVudENsaWNrczogdHJ1ZSxcbiAgcHJldmVudENsaWNrc1Byb3BhZ2F0aW9uOiB0cnVlLFxuICBzbGlkZVRvQ2xpY2tlZFNsaWRlOiBmYWxzZSxcbiAgLy8gbG9vcFxuICBsb29wOiBmYWxzZSxcbiAgbG9vcEFkZEJsYW5rU2xpZGVzOiB0cnVlLFxuICBsb29wQWRkaXRpb25hbFNsaWRlczogMCxcbiAgbG9vcFByZXZlbnRzU2xpZGluZzogdHJ1ZSxcbiAgLy8gcmV3aW5kXG4gIHJld2luZDogZmFsc2UsXG4gIC8vIFN3aXBpbmcvbm8gc3dpcGluZ1xuICBhbGxvd1NsaWRlUHJldjogdHJ1ZSxcbiAgYWxsb3dTbGlkZU5leHQ6IHRydWUsXG4gIHN3aXBlSGFuZGxlcjogbnVsbCxcbiAgLy8gJy5zd2lwZS1oYW5kbGVyJyxcbiAgbm9Td2lwaW5nOiB0cnVlLFxuICBub1N3aXBpbmdDbGFzczogJ3N3aXBlci1uby1zd2lwaW5nJyxcbiAgbm9Td2lwaW5nU2VsZWN0b3I6IG51bGwsXG4gIC8vIFBhc3NpdmUgTGlzdGVuZXJzXG4gIHBhc3NpdmVMaXN0ZW5lcnM6IHRydWUsXG4gIG1heEJhY2tmYWNlSGlkZGVuU2xpZGVzOiAxMCxcbiAgLy8gTlNcbiAgY29udGFpbmVyTW9kaWZpZXJDbGFzczogJ3N3aXBlci0nLFxuICAvLyBORVdcbiAgc2xpZGVDbGFzczogJ3N3aXBlci1zbGlkZScsXG4gIHNsaWRlQmxhbmtDbGFzczogJ3N3aXBlci1zbGlkZS1ibGFuaycsXG4gIHNsaWRlQWN0aXZlQ2xhc3M6ICdzd2lwZXItc2xpZGUtYWN0aXZlJyxcbiAgc2xpZGVWaXNpYmxlQ2xhc3M6ICdzd2lwZXItc2xpZGUtdmlzaWJsZScsXG4gIHNsaWRlRnVsbHlWaXNpYmxlQ2xhc3M6ICdzd2lwZXItc2xpZGUtZnVsbHktdmlzaWJsZScsXG4gIHNsaWRlTmV4dENsYXNzOiAnc3dpcGVyLXNsaWRlLW5leHQnLFxuICBzbGlkZVByZXZDbGFzczogJ3N3aXBlci1zbGlkZS1wcmV2JyxcbiAgd3JhcHBlckNsYXNzOiAnc3dpcGVyLXdyYXBwZXInLFxuICBsYXp5UHJlbG9hZGVyQ2xhc3M6ICdzd2lwZXItbGF6eS1wcmVsb2FkZXInLFxuICBsYXp5UHJlbG9hZFByZXZOZXh0OiAwLFxuICAvLyBDYWxsYmFja3NcbiAgcnVuQ2FsbGJhY2tzT25Jbml0OiB0cnVlLFxuICAvLyBJbnRlcm5hbHNcbiAgX2VtaXRDbGFzc2VzOiBmYWxzZVxufTtcblxuZnVuY3Rpb24gbW9kdWxlRXh0ZW5kUGFyYW1zKHBhcmFtcywgYWxsTW9kdWxlc1BhcmFtcykge1xuICByZXR1cm4gZnVuY3Rpb24gZXh0ZW5kUGFyYW1zKG9iaikge1xuICAgIGlmIChvYmogPT09IHZvaWQgMCkge1xuICAgICAgb2JqID0ge307XG4gICAgfVxuICAgIGNvbnN0IG1vZHVsZVBhcmFtTmFtZSA9IE9iamVjdC5rZXlzKG9iailbMF07XG4gICAgY29uc3QgbW9kdWxlUGFyYW1zID0gb2JqW21vZHVsZVBhcmFtTmFtZV07XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVQYXJhbXMgIT09ICdvYmplY3QnIHx8IG1vZHVsZVBhcmFtcyA9PT0gbnVsbCkge1xuICAgICAgZXh0ZW5kKGFsbE1vZHVsZXNQYXJhbXMsIG9iaik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9PT0gdHJ1ZSkge1xuICAgICAgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPSB7XG4gICAgICAgIGVuYWJsZWQ6IHRydWVcbiAgICAgIH07XG4gICAgfVxuICAgIGlmIChtb2R1bGVQYXJhbU5hbWUgPT09ICduYXZpZ2F0aW9uJyAmJiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSAmJiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5lbmFibGVkICYmICFwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5wcmV2RWwgJiYgIXBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLm5leHRFbCkge1xuICAgICAgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0uYXV0byA9IHRydWU7XG4gICAgfVxuICAgIGlmIChbJ3BhZ2luYXRpb24nLCAnc2Nyb2xsYmFyJ10uaW5kZXhPZihtb2R1bGVQYXJhbU5hbWUpID49IDAgJiYgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gJiYgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0uZW5hYmxlZCAmJiAhcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0uZWwpIHtcbiAgICAgIHBhcmFtc1ttb2R1bGVQYXJhbU5hbWVdLmF1dG8gPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoIShtb2R1bGVQYXJhbU5hbWUgaW4gcGFyYW1zICYmICdlbmFibGVkJyBpbiBtb2R1bGVQYXJhbXMpKSB7XG4gICAgICBleHRlbmQoYWxsTW9kdWxlc1BhcmFtcywgb2JqKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSA9PT0gJ29iamVjdCcgJiYgISgnZW5hYmxlZCcgaW4gcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0pKSB7XG4gICAgICBwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXS5lbmFibGVkID0gdHJ1ZTtcbiAgICB9XG4gICAgaWYgKCFwYXJhbXNbbW9kdWxlUGFyYW1OYW1lXSkgcGFyYW1zW21vZHVsZVBhcmFtTmFtZV0gPSB7XG4gICAgICBlbmFibGVkOiBmYWxzZVxuICAgIH07XG4gICAgZXh0ZW5kKGFsbE1vZHVsZXNQYXJhbXMsIG9iaik7XG4gIH07XG59XG5cbi8qIGVzbGludCBuby1wYXJhbS1yZWFzc2lnbjogXCJvZmZcIiAqL1xuY29uc3QgcHJvdG90eXBlcyA9IHtcbiAgZXZlbnRzRW1pdHRlcixcbiAgdXBkYXRlLFxuICB0cmFuc2xhdGUsXG4gIHRyYW5zaXRpb24sXG4gIHNsaWRlLFxuICBsb29wLFxuICBncmFiQ3Vyc29yLFxuICBldmVudHM6IGV2ZW50cyQxLFxuICBicmVha3BvaW50cyxcbiAgY2hlY2tPdmVyZmxvdzogY2hlY2tPdmVyZmxvdyQxLFxuICBjbGFzc2VzXG59O1xuY29uc3QgZXh0ZW5kZWREZWZhdWx0cyA9IHt9O1xuY2xhc3MgU3dpcGVyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgbGV0IGVsO1xuICAgIGxldCBwYXJhbXM7XG4gICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIGFyZ3MgPSBuZXcgQXJyYXkoX2xlbiksIF9rZXkgPSAwOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICBhcmdzW19rZXldID0gYXJndW1lbnRzW19rZXldO1xuICAgIH1cbiAgICBpZiAoYXJncy5sZW5ndGggPT09IDEgJiYgYXJnc1swXS5jb25zdHJ1Y3RvciAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoYXJnc1swXSkuc2xpY2UoOCwgLTEpID09PSAnT2JqZWN0Jykge1xuICAgICAgcGFyYW1zID0gYXJnc1swXTtcbiAgICB9IGVsc2Uge1xuICAgICAgW2VsLCBwYXJhbXNdID0gYXJncztcbiAgICB9XG4gICAgaWYgKCFwYXJhbXMpIHBhcmFtcyA9IHt9O1xuICAgIHBhcmFtcyA9IGV4dGVuZCh7fSwgcGFyYW1zKTtcbiAgICBpZiAoZWwgJiYgIXBhcmFtcy5lbCkgcGFyYW1zLmVsID0gZWw7XG4gICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgIGlmIChwYXJhbXMuZWwgJiYgdHlwZW9mIHBhcmFtcy5lbCA9PT0gJ3N0cmluZycgJiYgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChwYXJhbXMuZWwpLmxlbmd0aCA+IDEpIHtcbiAgICAgIGNvbnN0IHN3aXBlcnMgPSBbXTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGFyYW1zLmVsKS5mb3JFYWNoKGNvbnRhaW5lckVsID0+IHtcbiAgICAgICAgY29uc3QgbmV3UGFyYW1zID0gZXh0ZW5kKHt9LCBwYXJhbXMsIHtcbiAgICAgICAgICBlbDogY29udGFpbmVyRWxcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlcnMucHVzaChuZXcgU3dpcGVyKG5ld1BhcmFtcykpO1xuICAgICAgfSk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29uc3RydWN0b3ItcmV0dXJuXG4gICAgICByZXR1cm4gc3dpcGVycztcbiAgICB9XG5cbiAgICAvLyBTd2lwZXIgSW5zdGFuY2VcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIHN3aXBlci5fX3N3aXBlcl9fID0gdHJ1ZTtcbiAgICBzd2lwZXIuc3VwcG9ydCA9IGdldFN1cHBvcnQoKTtcbiAgICBzd2lwZXIuZGV2aWNlID0gZ2V0RGV2aWNlKHtcbiAgICAgIHVzZXJBZ2VudDogcGFyYW1zLnVzZXJBZ2VudFxuICAgIH0pO1xuICAgIHN3aXBlci5icm93c2VyID0gZ2V0QnJvd3NlcigpO1xuICAgIHN3aXBlci5ldmVudHNMaXN0ZW5lcnMgPSB7fTtcbiAgICBzd2lwZXIuZXZlbnRzQW55TGlzdGVuZXJzID0gW107XG4gICAgc3dpcGVyLm1vZHVsZXMgPSBbLi4uc3dpcGVyLl9fbW9kdWxlc19fXTtcbiAgICBpZiAocGFyYW1zLm1vZHVsZXMgJiYgQXJyYXkuaXNBcnJheShwYXJhbXMubW9kdWxlcykpIHtcbiAgICAgIHN3aXBlci5tb2R1bGVzLnB1c2goLi4ucGFyYW1zLm1vZHVsZXMpO1xuICAgIH1cbiAgICBjb25zdCBhbGxNb2R1bGVzUGFyYW1zID0ge307XG4gICAgc3dpcGVyLm1vZHVsZXMuZm9yRWFjaChtb2QgPT4ge1xuICAgICAgbW9kKHtcbiAgICAgICAgcGFyYW1zLFxuICAgICAgICBzd2lwZXIsXG4gICAgICAgIGV4dGVuZFBhcmFtczogbW9kdWxlRXh0ZW5kUGFyYW1zKHBhcmFtcywgYWxsTW9kdWxlc1BhcmFtcyksXG4gICAgICAgIG9uOiBzd2lwZXIub24uYmluZChzd2lwZXIpLFxuICAgICAgICBvbmNlOiBzd2lwZXIub25jZS5iaW5kKHN3aXBlciksXG4gICAgICAgIG9mZjogc3dpcGVyLm9mZi5iaW5kKHN3aXBlciksXG4gICAgICAgIGVtaXQ6IHN3aXBlci5lbWl0LmJpbmQoc3dpcGVyKVxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBFeHRlbmQgZGVmYXVsdHMgd2l0aCBtb2R1bGVzIHBhcmFtc1xuICAgIGNvbnN0IHN3aXBlclBhcmFtcyA9IGV4dGVuZCh7fSwgZGVmYXVsdHMsIGFsbE1vZHVsZXNQYXJhbXMpO1xuXG4gICAgLy8gRXh0ZW5kIGRlZmF1bHRzIHdpdGggcGFzc2VkIHBhcmFtc1xuICAgIHN3aXBlci5wYXJhbXMgPSBleHRlbmQoe30sIHN3aXBlclBhcmFtcywgZXh0ZW5kZWREZWZhdWx0cywgcGFyYW1zKTtcbiAgICBzd2lwZXIub3JpZ2luYWxQYXJhbXMgPSBleHRlbmQoe30sIHN3aXBlci5wYXJhbXMpO1xuICAgIHN3aXBlci5wYXNzZWRQYXJhbXMgPSBleHRlbmQoe30sIHBhcmFtcyk7XG5cbiAgICAvLyBhZGQgZXZlbnQgbGlzdGVuZXJzXG4gICAgaWYgKHN3aXBlci5wYXJhbXMgJiYgc3dpcGVyLnBhcmFtcy5vbikge1xuICAgICAgT2JqZWN0LmtleXMoc3dpcGVyLnBhcmFtcy5vbikuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgICBzd2lwZXIub24oZXZlbnROYW1lLCBzd2lwZXIucGFyYW1zLm9uW2V2ZW50TmFtZV0pO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFyYW1zICYmIHN3aXBlci5wYXJhbXMub25BbnkpIHtcbiAgICAgIHN3aXBlci5vbkFueShzd2lwZXIucGFyYW1zLm9uQW55KTtcbiAgICB9XG5cbiAgICAvLyBFeHRlbmQgU3dpcGVyXG4gICAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICAgIGVuYWJsZWQ6IHN3aXBlci5wYXJhbXMuZW5hYmxlZCxcbiAgICAgIGVsLFxuICAgICAgLy8gQ2xhc3Nlc1xuICAgICAgY2xhc3NOYW1lczogW10sXG4gICAgICAvLyBTbGlkZXNcbiAgICAgIHNsaWRlczogW10sXG4gICAgICBzbGlkZXNHcmlkOiBbXSxcbiAgICAgIHNuYXBHcmlkOiBbXSxcbiAgICAgIHNsaWRlc1NpemVzR3JpZDogW10sXG4gICAgICAvLyBpc0RpcmVjdGlvblxuICAgICAgaXNIb3Jpem9udGFsKCkge1xuICAgICAgICByZXR1cm4gc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJztcbiAgICAgIH0sXG4gICAgICBpc1ZlcnRpY2FsKCkge1xuICAgICAgICByZXR1cm4gc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCc7XG4gICAgICB9LFxuICAgICAgLy8gSW5kZXhlc1xuICAgICAgYWN0aXZlSW5kZXg6IDAsXG4gICAgICByZWFsSW5kZXg6IDAsXG4gICAgICAvL1xuICAgICAgaXNCZWdpbm5pbmc6IHRydWUsXG4gICAgICBpc0VuZDogZmFsc2UsXG4gICAgICAvLyBQcm9wc1xuICAgICAgdHJhbnNsYXRlOiAwLFxuICAgICAgcHJldmlvdXNUcmFuc2xhdGU6IDAsXG4gICAgICBwcm9ncmVzczogMCxcbiAgICAgIHZlbG9jaXR5OiAwLFxuICAgICAgYW5pbWF0aW5nOiBmYWxzZSxcbiAgICAgIGNzc092ZXJmbG93QWRqdXN0bWVudCgpIHtcbiAgICAgICAgLy8gUmV0dXJucyAwIHVubGVzcyBgdHJhbnNsYXRlYCBpcyA+IDIqKjIzXG4gICAgICAgIC8vIFNob3VsZCBiZSBzdWJ0cmFjdGVkIGZyb20gY3NzIHZhbHVlcyB0byBwcmV2ZW50IG92ZXJmbG93XG4gICAgICAgIHJldHVybiBNYXRoLnRydW5jKHRoaXMudHJhbnNsYXRlIC8gMiAqKiAyMykgKiAyICoqIDIzO1xuICAgICAgfSxcbiAgICAgIC8vIExvY2tzXG4gICAgICBhbGxvd1NsaWRlTmV4dDogc3dpcGVyLnBhcmFtcy5hbGxvd1NsaWRlTmV4dCxcbiAgICAgIGFsbG93U2xpZGVQcmV2OiBzd2lwZXIucGFyYW1zLmFsbG93U2xpZGVQcmV2LFxuICAgICAgLy8gVG91Y2ggRXZlbnRzXG4gICAgICB0b3VjaEV2ZW50c0RhdGE6IHtcbiAgICAgICAgaXNUb3VjaGVkOiB1bmRlZmluZWQsXG4gICAgICAgIGlzTW92ZWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgYWxsb3dUb3VjaENhbGxiYWNrczogdW5kZWZpbmVkLFxuICAgICAgICB0b3VjaFN0YXJ0VGltZTogdW5kZWZpbmVkLFxuICAgICAgICBpc1Njcm9sbGluZzogdW5kZWZpbmVkLFxuICAgICAgICBjdXJyZW50VHJhbnNsYXRlOiB1bmRlZmluZWQsXG4gICAgICAgIHN0YXJ0VHJhbnNsYXRlOiB1bmRlZmluZWQsXG4gICAgICAgIGFsbG93VGhyZXNob2xkTW92ZTogdW5kZWZpbmVkLFxuICAgICAgICAvLyBGb3JtIGVsZW1lbnRzIHRvIG1hdGNoXG4gICAgICAgIGZvY3VzYWJsZUVsZW1lbnRzOiBzd2lwZXIucGFyYW1zLmZvY3VzYWJsZUVsZW1lbnRzLFxuICAgICAgICAvLyBMYXN0IGNsaWNrIHRpbWVcbiAgICAgICAgbGFzdENsaWNrVGltZTogMCxcbiAgICAgICAgY2xpY2tUaW1lb3V0OiB1bmRlZmluZWQsXG4gICAgICAgIC8vIFZlbG9jaXRpZXNcbiAgICAgICAgdmVsb2NpdGllczogW10sXG4gICAgICAgIGFsbG93TW9tZW50dW1Cb3VuY2U6IHVuZGVmaW5lZCxcbiAgICAgICAgc3RhcnRNb3Zpbmc6IHVuZGVmaW5lZCxcbiAgICAgICAgcG9pbnRlcklkOiBudWxsLFxuICAgICAgICB0b3VjaElkOiBudWxsXG4gICAgICB9LFxuICAgICAgLy8gQ2xpY2tzXG4gICAgICBhbGxvd0NsaWNrOiB0cnVlLFxuICAgICAgLy8gVG91Y2hlc1xuICAgICAgYWxsb3dUb3VjaE1vdmU6IHN3aXBlci5wYXJhbXMuYWxsb3dUb3VjaE1vdmUsXG4gICAgICB0b3VjaGVzOiB7XG4gICAgICAgIHN0YXJ0WDogMCxcbiAgICAgICAgc3RhcnRZOiAwLFxuICAgICAgICBjdXJyZW50WDogMCxcbiAgICAgICAgY3VycmVudFk6IDAsXG4gICAgICAgIGRpZmY6IDBcbiAgICAgIH0sXG4gICAgICAvLyBJbWFnZXNcbiAgICAgIGltYWdlc1RvTG9hZDogW10sXG4gICAgICBpbWFnZXNMb2FkZWQ6IDBcbiAgICB9KTtcbiAgICBzd2lwZXIuZW1pdCgnX3N3aXBlcicpO1xuXG4gICAgLy8gSW5pdFxuICAgIGlmIChzd2lwZXIucGFyYW1zLmluaXQpIHtcbiAgICAgIHN3aXBlci5pbml0KCk7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFwcCBpbnN0YW5jZVxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zdHJ1Y3Rvci1yZXR1cm5cbiAgICByZXR1cm4gc3dpcGVyO1xuICB9XG4gIGdldERpcmVjdGlvbkxhYmVsKHByb3BlcnR5KSB7XG4gICAgaWYgKHRoaXMuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgIHJldHVybiBwcm9wZXJ0eTtcbiAgICB9XG4gICAgLy8gcHJldHRpZXItaWdub3JlXG4gICAgcmV0dXJuIHtcbiAgICAgICd3aWR0aCc6ICdoZWlnaHQnLFxuICAgICAgJ21hcmdpbi10b3AnOiAnbWFyZ2luLWxlZnQnLFxuICAgICAgJ21hcmdpbi1ib3R0b20gJzogJ21hcmdpbi1yaWdodCcsXG4gICAgICAnbWFyZ2luLWxlZnQnOiAnbWFyZ2luLXRvcCcsXG4gICAgICAnbWFyZ2luLXJpZ2h0JzogJ21hcmdpbi1ib3R0b20nLFxuICAgICAgJ3BhZGRpbmctbGVmdCc6ICdwYWRkaW5nLXRvcCcsXG4gICAgICAncGFkZGluZy1yaWdodCc6ICdwYWRkaW5nLWJvdHRvbScsXG4gICAgICAnbWFyZ2luUmlnaHQnOiAnbWFyZ2luQm90dG9tJ1xuICAgIH1bcHJvcGVydHldO1xuICB9XG4gIGdldFNsaWRlSW5kZXgoc2xpZGVFbCkge1xuICAgIGNvbnN0IHtcbiAgICAgIHNsaWRlc0VsLFxuICAgICAgcGFyYW1zXG4gICAgfSA9IHRoaXM7XG4gICAgY29uc3Qgc2xpZGVzID0gZWxlbWVudENoaWxkcmVuKHNsaWRlc0VsLCBgLiR7cGFyYW1zLnNsaWRlQ2xhc3N9LCBzd2lwZXItc2xpZGVgKTtcbiAgICBjb25zdCBmaXJzdFNsaWRlSW5kZXggPSBlbGVtZW50SW5kZXgoc2xpZGVzWzBdKTtcbiAgICByZXR1cm4gZWxlbWVudEluZGV4KHNsaWRlRWwpIC0gZmlyc3RTbGlkZUluZGV4O1xuICB9XG4gIGdldFNsaWRlSW5kZXhCeURhdGEoaW5kZXgpIHtcbiAgICByZXR1cm4gdGhpcy5nZXRTbGlkZUluZGV4KHRoaXMuc2xpZGVzLmZpbHRlcihzbGlkZUVsID0+IHNsaWRlRWwuZ2V0QXR0cmlidXRlKCdkYXRhLXN3aXBlci1zbGlkZS1pbmRleCcpICogMSA9PT0gaW5kZXgpWzBdKTtcbiAgfVxuICByZWNhbGNTbGlkZXMoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBjb25zdCB7XG4gICAgICBzbGlkZXNFbCxcbiAgICAgIHBhcmFtc1xuICAgIH0gPSBzd2lwZXI7XG4gICAgc3dpcGVyLnNsaWRlcyA9IGVsZW1lbnRDaGlsZHJlbihzbGlkZXNFbCwgYC4ke3BhcmFtcy5zbGlkZUNsYXNzfSwgc3dpcGVyLXNsaWRlYCk7XG4gIH1cbiAgZW5hYmxlKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKHN3aXBlci5lbmFibGVkKSByZXR1cm47XG4gICAgc3dpcGVyLmVuYWJsZWQgPSB0cnVlO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmdyYWJDdXJzb3IpIHtcbiAgICAgIHN3aXBlci5zZXRHcmFiQ3Vyc29yKCk7XG4gICAgfVxuICAgIHN3aXBlci5lbWl0KCdlbmFibGUnKTtcbiAgfVxuICBkaXNhYmxlKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIuZW5hYmxlZCkgcmV0dXJuO1xuICAgIHN3aXBlci5lbmFibGVkID0gZmFsc2U7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuZ3JhYkN1cnNvcikge1xuICAgICAgc3dpcGVyLnVuc2V0R3JhYkN1cnNvcigpO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdCgnZGlzYWJsZScpO1xuICB9XG4gIHNldFByb2dyZXNzKHByb2dyZXNzLCBzcGVlZCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgcHJvZ3Jlc3MgPSBNYXRoLm1pbihNYXRoLm1heChwcm9ncmVzcywgMCksIDEpO1xuICAgIGNvbnN0IG1pbiA9IHN3aXBlci5taW5UcmFuc2xhdGUoKTtcbiAgICBjb25zdCBtYXggPSBzd2lwZXIubWF4VHJhbnNsYXRlKCk7XG4gICAgY29uc3QgY3VycmVudCA9IChtYXggLSBtaW4pICogcHJvZ3Jlc3MgKyBtaW47XG4gICAgc3dpcGVyLnRyYW5zbGF0ZVRvKGN1cnJlbnQsIHR5cGVvZiBzcGVlZCA9PT0gJ3VuZGVmaW5lZCcgPyAwIDogc3BlZWQpO1xuICAgIHN3aXBlci51cGRhdGVBY3RpdmVJbmRleCgpO1xuICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gIH1cbiAgZW1pdENvbnRhaW5lckNsYXNzZXMoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuX2VtaXRDbGFzc2VzIHx8ICFzd2lwZXIuZWwpIHJldHVybjtcbiAgICBjb25zdCBjbHMgPSBzd2lwZXIuZWwuY2xhc3NOYW1lLnNwbGl0KCcgJykuZmlsdGVyKGNsYXNzTmFtZSA9PiB7XG4gICAgICByZXR1cm4gY2xhc3NOYW1lLmluZGV4T2YoJ3N3aXBlcicpID09PSAwIHx8IGNsYXNzTmFtZS5pbmRleE9mKHN3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzcykgPT09IDA7XG4gICAgfSk7XG4gICAgc3dpcGVyLmVtaXQoJ19jb250YWluZXJDbGFzc2VzJywgY2xzLmpvaW4oJyAnKSk7XG4gIH1cbiAgZ2V0U2xpZGVDbGFzc2VzKHNsaWRlRWwpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmIChzd2lwZXIuZGVzdHJveWVkKSByZXR1cm4gJyc7XG4gICAgcmV0dXJuIHNsaWRlRWwuY2xhc3NOYW1lLnNwbGl0KCcgJykuZmlsdGVyKGNsYXNzTmFtZSA9PiB7XG4gICAgICByZXR1cm4gY2xhc3NOYW1lLmluZGV4T2YoJ3N3aXBlci1zbGlkZScpID09PSAwIHx8IGNsYXNzTmFtZS5pbmRleE9mKHN3aXBlci5wYXJhbXMuc2xpZGVDbGFzcykgPT09IDA7XG4gICAgfSkuam9pbignICcpO1xuICB9XG4gIGVtaXRTbGlkZXNDbGFzc2VzKCkge1xuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLl9lbWl0Q2xhc3NlcyB8fCAhc3dpcGVyLmVsKSByZXR1cm47XG4gICAgY29uc3QgdXBkYXRlcyA9IFtdO1xuICAgIHN3aXBlci5zbGlkZXMuZm9yRWFjaChzbGlkZUVsID0+IHtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZXMgPSBzd2lwZXIuZ2V0U2xpZGVDbGFzc2VzKHNsaWRlRWwpO1xuICAgICAgdXBkYXRlcy5wdXNoKHtcbiAgICAgICAgc2xpZGVFbCxcbiAgICAgICAgY2xhc3NOYW1lc1xuICAgICAgfSk7XG4gICAgICBzd2lwZXIuZW1pdCgnX3NsaWRlQ2xhc3MnLCBzbGlkZUVsLCBjbGFzc05hbWVzKTtcbiAgICB9KTtcbiAgICBzd2lwZXIuZW1pdCgnX3NsaWRlQ2xhc3NlcycsIHVwZGF0ZXMpO1xuICB9XG4gIHNsaWRlc1BlclZpZXdEeW5hbWljKHZpZXcsIGV4YWN0KSB7XG4gICAgaWYgKHZpZXcgPT09IHZvaWQgMCkge1xuICAgICAgdmlldyA9ICdjdXJyZW50JztcbiAgICB9XG4gICAgaWYgKGV4YWN0ID09PSB2b2lkIDApIHtcbiAgICAgIGV4YWN0ID0gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHN3aXBlciA9IHRoaXM7XG4gICAgY29uc3Qge1xuICAgICAgcGFyYW1zLFxuICAgICAgc2xpZGVzLFxuICAgICAgc2xpZGVzR3JpZCxcbiAgICAgIHNsaWRlc1NpemVzR3JpZCxcbiAgICAgIHNpemU6IHN3aXBlclNpemUsXG4gICAgICBhY3RpdmVJbmRleFxuICAgIH0gPSBzd2lwZXI7XG4gICAgbGV0IHNwdiA9IDE7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMuc2xpZGVzUGVyVmlldyA9PT0gJ251bWJlcicpIHJldHVybiBwYXJhbXMuc2xpZGVzUGVyVmlldztcbiAgICBpZiAocGFyYW1zLmNlbnRlcmVkU2xpZGVzKSB7XG4gICAgICBsZXQgc2xpZGVTaXplID0gc2xpZGVzW2FjdGl2ZUluZGV4XSA/IHNsaWRlc1thY3RpdmVJbmRleF0uc3dpcGVyU2xpZGVTaXplIDogMDtcbiAgICAgIGxldCBicmVha0xvb3A7XG4gICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggKyAxOyBpIDwgc2xpZGVzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGlmIChzbGlkZXNbaV0gJiYgIWJyZWFrTG9vcCkge1xuICAgICAgICAgIHNsaWRlU2l6ZSArPSBzbGlkZXNbaV0uc3dpcGVyU2xpZGVTaXplO1xuICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgIGlmIChzbGlkZVNpemUgPiBzd2lwZXJTaXplKSBicmVha0xvb3AgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gYWN0aXZlSW5kZXggLSAxOyBpID49IDA7IGkgLT0gMSkge1xuICAgICAgICBpZiAoc2xpZGVzW2ldICYmICFicmVha0xvb3ApIHtcbiAgICAgICAgICBzbGlkZVNpemUgKz0gc2xpZGVzW2ldLnN3aXBlclNsaWRlU2l6ZTtcbiAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgICBpZiAoc2xpZGVTaXplID4gc3dpcGVyU2l6ZSkgYnJlYWtMb29wID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIGlmICh2aWV3ID09PSAnY3VycmVudCcpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IGFjdGl2ZUluZGV4ICsgMTsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICAgIGNvbnN0IHNsaWRlSW5WaWV3ID0gZXhhY3QgPyBzbGlkZXNHcmlkW2ldICsgc2xpZGVzU2l6ZXNHcmlkW2ldIC0gc2xpZGVzR3JpZFthY3RpdmVJbmRleF0gPCBzd2lwZXJTaXplIDogc2xpZGVzR3JpZFtpXSAtIHNsaWRlc0dyaWRbYWN0aXZlSW5kZXhdIDwgc3dpcGVyU2l6ZTtcbiAgICAgICAgICBpZiAoc2xpZGVJblZpZXcpIHtcbiAgICAgICAgICAgIHNwdiArPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gcHJldmlvdXNcbiAgICAgICAgZm9yIChsZXQgaSA9IGFjdGl2ZUluZGV4IC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgICAgICBjb25zdCBzbGlkZUluVmlldyA9IHNsaWRlc0dyaWRbYWN0aXZlSW5kZXhdIC0gc2xpZGVzR3JpZFtpXSA8IHN3aXBlclNpemU7XG4gICAgICAgICAgaWYgKHNsaWRlSW5WaWV3KSB7XG4gICAgICAgICAgICBzcHYgKz0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHNwdjtcbiAgfVxuICB1cGRhdGUoKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoIXN3aXBlciB8fCBzd2lwZXIuZGVzdHJveWVkKSByZXR1cm47XG4gICAgY29uc3Qge1xuICAgICAgc25hcEdyaWQsXG4gICAgICBwYXJhbXNcbiAgICB9ID0gc3dpcGVyO1xuICAgIC8vIEJyZWFrcG9pbnRzXG4gICAgaWYgKHBhcmFtcy5icmVha3BvaW50cykge1xuICAgICAgc3dpcGVyLnNldEJyZWFrcG9pbnQoKTtcbiAgICB9XG4gICAgWy4uLnN3aXBlci5lbC5xdWVyeVNlbGVjdG9yQWxsKCdbbG9hZGluZz1cImxhenlcIl0nKV0uZm9yRWFjaChpbWFnZUVsID0+IHtcbiAgICAgIGlmIChpbWFnZUVsLmNvbXBsZXRlKSB7XG4gICAgICAgIHByb2Nlc3NMYXp5UHJlbG9hZGVyKHN3aXBlciwgaW1hZ2VFbCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgc3dpcGVyLnVwZGF0ZVNpemUoKTtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzKCk7XG4gICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKCk7XG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlc0NsYXNzZXMoKTtcbiAgICBmdW5jdGlvbiBzZXRUcmFuc2xhdGUoKSB7XG4gICAgICBjb25zdCB0cmFuc2xhdGVWYWx1ZSA9IHN3aXBlci5ydGxUcmFuc2xhdGUgPyBzd2lwZXIudHJhbnNsYXRlICogLTEgOiBzd2lwZXIudHJhbnNsYXRlO1xuICAgICAgY29uc3QgbmV3VHJhbnNsYXRlID0gTWF0aC5taW4oTWF0aC5tYXgodHJhbnNsYXRlVmFsdWUsIHN3aXBlci5tYXhUcmFuc2xhdGUoKSksIHN3aXBlci5taW5UcmFuc2xhdGUoKSk7XG4gICAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKG5ld1RyYW5zbGF0ZSk7XG4gICAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICAgIHN3aXBlci51cGRhdGVTbGlkZXNDbGFzc2VzKCk7XG4gICAgfVxuICAgIGxldCB0cmFuc2xhdGVkO1xuICAgIGlmIChwYXJhbXMuZnJlZU1vZGUgJiYgcGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQgJiYgIXBhcmFtcy5jc3NNb2RlKSB7XG4gICAgICBzZXRUcmFuc2xhdGUoKTtcbiAgICAgIGlmIChwYXJhbXMuYXV0b0hlaWdodCkge1xuICAgICAgICBzd2lwZXIudXBkYXRlQXV0b0hlaWdodCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoKHBhcmFtcy5zbGlkZXNQZXJWaWV3ID09PSAnYXV0bycgfHwgcGFyYW1zLnNsaWRlc1BlclZpZXcgPiAxKSAmJiBzd2lwZXIuaXNFbmQgJiYgIXBhcmFtcy5jZW50ZXJlZFNsaWRlcykge1xuICAgICAgICBjb25zdCBzbGlkZXMgPSBzd2lwZXIudmlydHVhbCAmJiBwYXJhbXMudmlydHVhbC5lbmFibGVkID8gc3dpcGVyLnZpcnR1YWwuc2xpZGVzIDogc3dpcGVyLnNsaWRlcztcbiAgICAgICAgdHJhbnNsYXRlZCA9IHN3aXBlci5zbGlkZVRvKHNsaWRlcy5sZW5ndGggLSAxLCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0cmFuc2xhdGVkID0gc3dpcGVyLnNsaWRlVG8oc3dpcGVyLmFjdGl2ZUluZGV4LCAwLCBmYWxzZSwgdHJ1ZSk7XG4gICAgICB9XG4gICAgICBpZiAoIXRyYW5zbGF0ZWQpIHtcbiAgICAgICAgc2V0VHJhbnNsYXRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChwYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzbmFwR3JpZCAhPT0gc3dpcGVyLnNuYXBHcmlkKSB7XG4gICAgICBzd2lwZXIuY2hlY2tPdmVyZmxvdygpO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdCgndXBkYXRlJyk7XG4gIH1cbiAgY2hhbmdlRGlyZWN0aW9uKG5ld0RpcmVjdGlvbiwgbmVlZFVwZGF0ZSkge1xuICAgIGlmIChuZWVkVXBkYXRlID09PSB2b2lkIDApIHtcbiAgICAgIG5lZWRVcGRhdGUgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IGN1cnJlbnREaXJlY3Rpb24gPSBzd2lwZXIucGFyYW1zLmRpcmVjdGlvbjtcbiAgICBpZiAoIW5ld0RpcmVjdGlvbikge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBuZXdEaXJlY3Rpb24gPSBjdXJyZW50RGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuICAgIH1cbiAgICBpZiAobmV3RGlyZWN0aW9uID09PSBjdXJyZW50RGlyZWN0aW9uIHx8IG5ld0RpcmVjdGlvbiAhPT0gJ2hvcml6b250YWwnICYmIG5ld0RpcmVjdGlvbiAhPT0gJ3ZlcnRpY2FsJykge1xuICAgICAgcmV0dXJuIHN3aXBlcjtcbiAgICB9XG4gICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5yZW1vdmUoYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfSR7Y3VycmVudERpcmVjdGlvbn1gKTtcbiAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LmFkZChgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9JHtuZXdEaXJlY3Rpb259YCk7XG4gICAgc3dpcGVyLmVtaXRDb250YWluZXJDbGFzc2VzKCk7XG4gICAgc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPSBuZXdEaXJlY3Rpb247XG4gICAgc3dpcGVyLnNsaWRlcy5mb3JFYWNoKHNsaWRlRWwgPT4ge1xuICAgICAgaWYgKG5ld0RpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICBzbGlkZUVsLnN0eWxlLndpZHRoID0gJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzbGlkZUVsLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHN3aXBlci5lbWl0KCdjaGFuZ2VEaXJlY3Rpb24nKTtcbiAgICBpZiAobmVlZFVwZGF0ZSkgc3dpcGVyLnVwZGF0ZSgpO1xuICAgIHJldHVybiBzd2lwZXI7XG4gIH1cbiAgY2hhbmdlTGFuZ3VhZ2VEaXJlY3Rpb24oZGlyZWN0aW9uKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoc3dpcGVyLnJ0bCAmJiBkaXJlY3Rpb24gPT09ICdydGwnIHx8ICFzd2lwZXIucnRsICYmIGRpcmVjdGlvbiA9PT0gJ2x0cicpIHJldHVybjtcbiAgICBzd2lwZXIucnRsID0gZGlyZWN0aW9uID09PSAncnRsJztcbiAgICBzd2lwZXIucnRsVHJhbnNsYXRlID0gc3dpcGVyLnBhcmFtcy5kaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJyAmJiBzd2lwZXIucnRsO1xuICAgIGlmIChzd2lwZXIucnRsKSB7XG4gICAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LmFkZChgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9cnRsYCk7XG4gICAgICBzd2lwZXIuZWwuZGlyID0gJ3J0bCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5lbC5jbGFzc0xpc3QucmVtb3ZlKGAke3N3aXBlci5wYXJhbXMuY29udGFpbmVyTW9kaWZpZXJDbGFzc31ydGxgKTtcbiAgICAgIHN3aXBlci5lbC5kaXIgPSAnbHRyJztcbiAgICB9XG4gICAgc3dpcGVyLnVwZGF0ZSgpO1xuICB9XG4gIG1vdW50KGVsZW1lbnQpIHtcbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGlmIChzd2lwZXIubW91bnRlZCkgcmV0dXJuIHRydWU7XG5cbiAgICAvLyBGaW5kIGVsXG4gICAgbGV0IGVsID0gZWxlbWVudCB8fCBzd2lwZXIucGFyYW1zLmVsO1xuICAgIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZWwpO1xuICAgIH1cbiAgICBpZiAoIWVsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGVsLnN3aXBlciA9IHN3aXBlcjtcbiAgICBpZiAoZWwucGFyZW50Tm9kZSAmJiBlbC5wYXJlbnROb2RlLmhvc3QgJiYgZWwucGFyZW50Tm9kZS5ob3N0Lm5vZGVOYW1lID09PSAnU1dJUEVSLUNPTlRBSU5FUicpIHtcbiAgICAgIHN3aXBlci5pc0VsZW1lbnQgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBnZXRXcmFwcGVyU2VsZWN0b3IgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gYC4keyhzd2lwZXIucGFyYW1zLndyYXBwZXJDbGFzcyB8fCAnJykudHJpbSgpLnNwbGl0KCcgJykuam9pbignLicpfWA7XG4gICAgfTtcbiAgICBjb25zdCBnZXRXcmFwcGVyID0gKCkgPT4ge1xuICAgICAgaWYgKGVsICYmIGVsLnNoYWRvd1Jvb3QgJiYgZWwuc2hhZG93Um9vdC5xdWVyeVNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IHJlcyA9IGVsLnNoYWRvd1Jvb3QucXVlcnlTZWxlY3RvcihnZXRXcmFwcGVyU2VsZWN0b3IoKSk7XG4gICAgICAgIC8vIENoaWxkcmVuIG5lZWRzIHRvIHJldHVybiBzbG90IGl0ZW1zXG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9XG4gICAgICByZXR1cm4gZWxlbWVudENoaWxkcmVuKGVsLCBnZXRXcmFwcGVyU2VsZWN0b3IoKSlbMF07XG4gICAgfTtcbiAgICAvLyBGaW5kIFdyYXBwZXJcbiAgICBsZXQgd3JhcHBlckVsID0gZ2V0V3JhcHBlcigpO1xuICAgIGlmICghd3JhcHBlckVsICYmIHN3aXBlci5wYXJhbXMuY3JlYXRlRWxlbWVudHMpIHtcbiAgICAgIHdyYXBwZXJFbCA9IGNyZWF0ZUVsZW1lbnQoJ2RpdicsIHN3aXBlci5wYXJhbXMud3JhcHBlckNsYXNzKTtcbiAgICAgIGVsLmFwcGVuZCh3cmFwcGVyRWwpO1xuICAgICAgZWxlbWVudENoaWxkcmVuKGVsLCBgLiR7c3dpcGVyLnBhcmFtcy5zbGlkZUNsYXNzfWApLmZvckVhY2goc2xpZGVFbCA9PiB7XG4gICAgICAgIHdyYXBwZXJFbC5hcHBlbmQoc2xpZGVFbCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgT2JqZWN0LmFzc2lnbihzd2lwZXIsIHtcbiAgICAgIGVsLFxuICAgICAgd3JhcHBlckVsLFxuICAgICAgc2xpZGVzRWw6IHN3aXBlci5pc0VsZW1lbnQgJiYgIWVsLnBhcmVudE5vZGUuaG9zdC5zbGlkZVNsb3RzID8gZWwucGFyZW50Tm9kZS5ob3N0IDogd3JhcHBlckVsLFxuICAgICAgaG9zdEVsOiBzd2lwZXIuaXNFbGVtZW50ID8gZWwucGFyZW50Tm9kZS5ob3N0IDogZWwsXG4gICAgICBtb3VudGVkOiB0cnVlLFxuICAgICAgLy8gUlRMXG4gICAgICBydGw6IGVsLmRpci50b0xvd2VyQ2FzZSgpID09PSAncnRsJyB8fCBlbGVtZW50U3R5bGUoZWwsICdkaXJlY3Rpb24nKSA9PT0gJ3J0bCcsXG4gICAgICBydGxUcmFuc2xhdGU6IHN3aXBlci5wYXJhbXMuZGlyZWN0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgKGVsLmRpci50b0xvd2VyQ2FzZSgpID09PSAncnRsJyB8fCBlbGVtZW50U3R5bGUoZWwsICdkaXJlY3Rpb24nKSA9PT0gJ3J0bCcpLFxuICAgICAgd3JvbmdSVEw6IGVsZW1lbnRTdHlsZSh3cmFwcGVyRWwsICdkaXNwbGF5JykgPT09ICctd2Via2l0LWJveCdcbiAgICB9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpbml0KGVsKSB7XG4gICAgY29uc3Qgc3dpcGVyID0gdGhpcztcbiAgICBpZiAoc3dpcGVyLmluaXRpYWxpemVkKSByZXR1cm4gc3dpcGVyO1xuICAgIGNvbnN0IG1vdW50ZWQgPSBzd2lwZXIubW91bnQoZWwpO1xuICAgIGlmIChtb3VudGVkID09PSBmYWxzZSkgcmV0dXJuIHN3aXBlcjtcbiAgICBzd2lwZXIuZW1pdCgnYmVmb3JlSW5pdCcpO1xuXG4gICAgLy8gU2V0IGJyZWFrcG9pbnRcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5icmVha3BvaW50cykge1xuICAgICAgc3dpcGVyLnNldEJyZWFrcG9pbnQoKTtcbiAgICB9XG5cbiAgICAvLyBBZGQgQ2xhc3Nlc1xuICAgIHN3aXBlci5hZGRDbGFzc2VzKCk7XG5cbiAgICAvLyBVcGRhdGUgc2l6ZVxuICAgIHN3aXBlci51cGRhdGVTaXplKCk7XG5cbiAgICAvLyBVcGRhdGUgc2xpZGVzXG4gICAgc3dpcGVyLnVwZGF0ZVNsaWRlcygpO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLndhdGNoT3ZlcmZsb3cpIHtcbiAgICAgIHN3aXBlci5jaGVja092ZXJmbG93KCk7XG4gICAgfVxuXG4gICAgLy8gU2V0IEdyYWIgQ3Vyc29yXG4gICAgaWYgKHN3aXBlci5wYXJhbXMuZ3JhYkN1cnNvciAmJiBzd2lwZXIuZW5hYmxlZCkge1xuICAgICAgc3dpcGVyLnNldEdyYWJDdXJzb3IoKTtcbiAgICB9XG5cbiAgICAvLyBTbGlkZSBUbyBJbml0aWFsIFNsaWRlXG4gICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCAmJiBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCkge1xuICAgICAgc3dpcGVyLnNsaWRlVG8oc3dpcGVyLnBhcmFtcy5pbml0aWFsU2xpZGUgKyBzd2lwZXIudmlydHVhbC5zbGlkZXNCZWZvcmUsIDAsIHN3aXBlci5wYXJhbXMucnVuQ2FsbGJhY2tzT25Jbml0LCBmYWxzZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5wYXJhbXMuaW5pdGlhbFNsaWRlLCAwLCBzd2lwZXIucGFyYW1zLnJ1bkNhbGxiYWNrc09uSW5pdCwgZmFsc2UsIHRydWUpO1xuICAgIH1cblxuICAgIC8vIENyZWF0ZSBsb29wXG4gICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgc3dpcGVyLmxvb3BDcmVhdGUoKTtcbiAgICB9XG5cbiAgICAvLyBBdHRhY2ggZXZlbnRzXG4gICAgc3dpcGVyLmF0dGFjaEV2ZW50cygpO1xuICAgIGNvbnN0IGxhenlFbGVtZW50cyA9IFsuLi5zd2lwZXIuZWwucXVlcnlTZWxlY3RvckFsbCgnW2xvYWRpbmc9XCJsYXp5XCJdJyldO1xuICAgIGlmIChzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgICBsYXp5RWxlbWVudHMucHVzaCguLi5zd2lwZXIuaG9zdEVsLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tsb2FkaW5nPVwibGF6eVwiXScpKTtcbiAgICB9XG4gICAgbGF6eUVsZW1lbnRzLmZvckVhY2goaW1hZ2VFbCA9PiB7XG4gICAgICBpZiAoaW1hZ2VFbC5jb21wbGV0ZSkge1xuICAgICAgICBwcm9jZXNzTGF6eVByZWxvYWRlcihzd2lwZXIsIGltYWdlRWwpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaW1hZ2VFbC5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZSA9PiB7XG4gICAgICAgICAgcHJvY2Vzc0xhenlQcmVsb2FkZXIoc3dpcGVyLCBlLnRhcmdldCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHByZWxvYWQoc3dpcGVyKTtcblxuICAgIC8vIEluaXQgRmxhZ1xuICAgIHN3aXBlci5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgcHJlbG9hZChzd2lwZXIpO1xuXG4gICAgLy8gRW1pdFxuICAgIHN3aXBlci5lbWl0KCdpbml0Jyk7XG4gICAgc3dpcGVyLmVtaXQoJ2FmdGVySW5pdCcpO1xuICAgIHJldHVybiBzd2lwZXI7XG4gIH1cbiAgZGVzdHJveShkZWxldGVJbnN0YW5jZSwgY2xlYW5TdHlsZXMpIHtcbiAgICBpZiAoZGVsZXRlSW5zdGFuY2UgPT09IHZvaWQgMCkge1xuICAgICAgZGVsZXRlSW5zdGFuY2UgPSB0cnVlO1xuICAgIH1cbiAgICBpZiAoY2xlYW5TdHlsZXMgPT09IHZvaWQgMCkge1xuICAgICAgY2xlYW5TdHlsZXMgPSB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBzd2lwZXIgPSB0aGlzO1xuICAgIGNvbnN0IHtcbiAgICAgIHBhcmFtcyxcbiAgICAgIGVsLFxuICAgICAgd3JhcHBlckVsLFxuICAgICAgc2xpZGVzXG4gICAgfSA9IHN3aXBlcjtcbiAgICBpZiAodHlwZW9mIHN3aXBlci5wYXJhbXMgPT09ICd1bmRlZmluZWQnIHx8IHN3aXBlci5kZXN0cm95ZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBzd2lwZXIuZW1pdCgnYmVmb3JlRGVzdHJveScpO1xuXG4gICAgLy8gSW5pdCBGbGFnXG4gICAgc3dpcGVyLmluaXRpYWxpemVkID0gZmFsc2U7XG5cbiAgICAvLyBEZXRhY2ggZXZlbnRzXG4gICAgc3dpcGVyLmRldGFjaEV2ZW50cygpO1xuXG4gICAgLy8gRGVzdHJveSBsb29wXG4gICAgaWYgKHBhcmFtcy5sb29wKSB7XG4gICAgICBzd2lwZXIubG9vcERlc3Ryb3koKTtcbiAgICB9XG5cbiAgICAvLyBDbGVhbnVwIHN0eWxlc1xuICAgIGlmIChjbGVhblN0eWxlcykge1xuICAgICAgc3dpcGVyLnJlbW92ZUNsYXNzZXMoKTtcbiAgICAgIGVsLnJlbW92ZUF0dHJpYnV0ZSgnc3R5bGUnKTtcbiAgICAgIHdyYXBwZXJFbC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICBpZiAoc2xpZGVzICYmIHNsaWRlcy5sZW5ndGgpIHtcbiAgICAgICAgc2xpZGVzLmZvckVhY2goc2xpZGVFbCA9PiB7XG4gICAgICAgICAgc2xpZGVFbC5jbGFzc0xpc3QucmVtb3ZlKHBhcmFtcy5zbGlkZVZpc2libGVDbGFzcywgcGFyYW1zLnNsaWRlRnVsbHlWaXNpYmxlQ2xhc3MsIHBhcmFtcy5zbGlkZUFjdGl2ZUNsYXNzLCBwYXJhbXMuc2xpZGVOZXh0Q2xhc3MsIHBhcmFtcy5zbGlkZVByZXZDbGFzcyk7XG4gICAgICAgICAgc2xpZGVFbC5yZW1vdmVBdHRyaWJ1dGUoJ3N0eWxlJyk7XG4gICAgICAgICAgc2xpZGVFbC5yZW1vdmVBdHRyaWJ1dGUoJ2RhdGEtc3dpcGVyLXNsaWRlLWluZGV4Jyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICBzd2lwZXIuZW1pdCgnZGVzdHJveScpO1xuXG4gICAgLy8gRGV0YWNoIGVtaXR0ZXIgZXZlbnRzXG4gICAgT2JqZWN0LmtleXMoc3dpcGVyLmV2ZW50c0xpc3RlbmVycykuZm9yRWFjaChldmVudE5hbWUgPT4ge1xuICAgICAgc3dpcGVyLm9mZihldmVudE5hbWUpO1xuICAgIH0pO1xuICAgIGlmIChkZWxldGVJbnN0YW5jZSAhPT0gZmFsc2UpIHtcbiAgICAgIHN3aXBlci5lbC5zd2lwZXIgPSBudWxsO1xuICAgICAgZGVsZXRlUHJvcHMoc3dpcGVyKTtcbiAgICB9XG4gICAgc3dpcGVyLmRlc3Ryb3llZCA9IHRydWU7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgc3RhdGljIGV4dGVuZERlZmF1bHRzKG5ld0RlZmF1bHRzKSB7XG4gICAgZXh0ZW5kKGV4dGVuZGVkRGVmYXVsdHMsIG5ld0RlZmF1bHRzKTtcbiAgfVxuICBzdGF0aWMgZ2V0IGV4dGVuZGVkRGVmYXVsdHMoKSB7XG4gICAgcmV0dXJuIGV4dGVuZGVkRGVmYXVsdHM7XG4gIH1cbiAgc3RhdGljIGdldCBkZWZhdWx0cygpIHtcbiAgICByZXR1cm4gZGVmYXVsdHM7XG4gIH1cbiAgc3RhdGljIGluc3RhbGxNb2R1bGUobW9kKSB7XG4gICAgaWYgKCFTd2lwZXIucHJvdG90eXBlLl9fbW9kdWxlc19fKSBTd2lwZXIucHJvdG90eXBlLl9fbW9kdWxlc19fID0gW107XG4gICAgY29uc3QgbW9kdWxlcyA9IFN3aXBlci5wcm90b3R5cGUuX19tb2R1bGVzX187XG4gICAgaWYgKHR5cGVvZiBtb2QgPT09ICdmdW5jdGlvbicgJiYgbW9kdWxlcy5pbmRleE9mKG1vZCkgPCAwKSB7XG4gICAgICBtb2R1bGVzLnB1c2gobW9kKTtcbiAgICB9XG4gIH1cbiAgc3RhdGljIHVzZShtb2R1bGUpIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShtb2R1bGUpKSB7XG4gICAgICBtb2R1bGUuZm9yRWFjaChtID0+IFN3aXBlci5pbnN0YWxsTW9kdWxlKG0pKTtcbiAgICAgIHJldHVybiBTd2lwZXI7XG4gICAgfVxuICAgIFN3aXBlci5pbnN0YWxsTW9kdWxlKG1vZHVsZSk7XG4gICAgcmV0dXJuIFN3aXBlcjtcbiAgfVxufVxuT2JqZWN0LmtleXMocHJvdG90eXBlcykuZm9yRWFjaChwcm90b3R5cGVHcm91cCA9PiB7XG4gIE9iamVjdC5rZXlzKHByb3RvdHlwZXNbcHJvdG90eXBlR3JvdXBdKS5mb3JFYWNoKHByb3RvTWV0aG9kID0+IHtcbiAgICBTd2lwZXIucHJvdG90eXBlW3Byb3RvTWV0aG9kXSA9IHByb3RvdHlwZXNbcHJvdG90eXBlR3JvdXBdW3Byb3RvTWV0aG9kXTtcbiAgfSk7XG59KTtcblN3aXBlci51c2UoW1Jlc2l6ZSwgT2JzZXJ2ZXJdKTtcblxuZXhwb3J0IHsgU3dpcGVyIGFzIFMsIGRlZmF1bHRzIGFzIGQgfTtcbiIsICJpbXBvcnQgeyBlIGFzIGVsZW1lbnRDaGlsZHJlbiwgYyBhcyBjcmVhdGVFbGVtZW50IH0gZnJvbSAnLi91dGlscy5tanMnO1xuXG5mdW5jdGlvbiBjcmVhdGVFbGVtZW50SWZOb3REZWZpbmVkKHN3aXBlciwgb3JpZ2luYWxQYXJhbXMsIHBhcmFtcywgY2hlY2tQcm9wcykge1xuICBpZiAoc3dpcGVyLnBhcmFtcy5jcmVhdGVFbGVtZW50cykge1xuICAgIE9iamVjdC5rZXlzKGNoZWNrUHJvcHMpLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGlmICghcGFyYW1zW2tleV0gJiYgcGFyYW1zLmF1dG8gPT09IHRydWUpIHtcbiAgICAgICAgbGV0IGVsZW1lbnQgPSBlbGVtZW50Q2hpbGRyZW4oc3dpcGVyLmVsLCBgLiR7Y2hlY2tQcm9wc1trZXldfWApWzBdO1xuICAgICAgICBpZiAoIWVsZW1lbnQpIHtcbiAgICAgICAgICBlbGVtZW50ID0gY3JlYXRlRWxlbWVudCgnZGl2JywgY2hlY2tQcm9wc1trZXldKTtcbiAgICAgICAgICBlbGVtZW50LmNsYXNzTmFtZSA9IGNoZWNrUHJvcHNba2V5XTtcbiAgICAgICAgICBzd2lwZXIuZWwuYXBwZW5kKGVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICAgIHBhcmFtc1trZXldID0gZWxlbWVudDtcbiAgICAgICAgb3JpZ2luYWxQYXJhbXNba2V5XSA9IGVsZW1lbnQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHBhcmFtcztcbn1cblxuZXhwb3J0IHsgY3JlYXRlRWxlbWVudElmTm90RGVmaW5lZCBhcyBjIH07XG4iLCAiaW1wb3J0IHsgYyBhcyBjcmVhdGVFbGVtZW50SWZOb3REZWZpbmVkIH0gZnJvbSAnLi4vc2hhcmVkL2NyZWF0ZS1lbGVtZW50LWlmLW5vdC1kZWZpbmVkLm1qcyc7XG5cbmZ1bmN0aW9uIE5hdmlnYXRpb24oX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBleHRlbmRQYXJhbXMsXG4gICAgb24sXG4gICAgZW1pdFxuICB9ID0gX3JlZjtcbiAgZXh0ZW5kUGFyYW1zKHtcbiAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICBuZXh0RWw6IG51bGwsXG4gICAgICBwcmV2RWw6IG51bGwsXG4gICAgICBoaWRlT25DbGljazogZmFsc2UsXG4gICAgICBkaXNhYmxlZENsYXNzOiAnc3dpcGVyLWJ1dHRvbi1kaXNhYmxlZCcsXG4gICAgICBoaWRkZW5DbGFzczogJ3N3aXBlci1idXR0b24taGlkZGVuJyxcbiAgICAgIGxvY2tDbGFzczogJ3N3aXBlci1idXR0b24tbG9jaycsXG4gICAgICBuYXZpZ2F0aW9uRGlzYWJsZWRDbGFzczogJ3N3aXBlci1uYXZpZ2F0aW9uLWRpc2FibGVkJ1xuICAgIH1cbiAgfSk7XG4gIHN3aXBlci5uYXZpZ2F0aW9uID0ge1xuICAgIG5leHRFbDogbnVsbCxcbiAgICBwcmV2RWw6IG51bGxcbiAgfTtcbiAgY29uc3QgbWFrZUVsZW1lbnRzQXJyYXkgPSBlbCA9PiAoQXJyYXkuaXNBcnJheShlbCkgPyBlbCA6IFtlbF0pLmZpbHRlcihlID0+ICEhZSk7XG4gIGZ1bmN0aW9uIGdldEVsKGVsKSB7XG4gICAgbGV0IHJlcztcbiAgICBpZiAoZWwgJiYgdHlwZW9mIGVsID09PSAnc3RyaW5nJyAmJiBzd2lwZXIuaXNFbGVtZW50KSB7XG4gICAgICByZXMgPSBzd2lwZXIuZWwucXVlcnlTZWxlY3RvcihlbCk7XG4gICAgICBpZiAocmVzKSByZXR1cm4gcmVzO1xuICAgIH1cbiAgICBpZiAoZWwpIHtcbiAgICAgIGlmICh0eXBlb2YgZWwgPT09ICdzdHJpbmcnKSByZXMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbCldO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiYgdHlwZW9mIGVsID09PSAnc3RyaW5nJyAmJiByZXMubGVuZ3RoID4gMSAmJiBzd2lwZXIuZWwucXVlcnlTZWxlY3RvckFsbChlbCkubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJlcyA9IHN3aXBlci5lbC5xdWVyeVNlbGVjdG9yKGVsKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGVsICYmICFyZXMpIHJldHVybiBlbDtcbiAgICAvLyBpZiAoQXJyYXkuaXNBcnJheShyZXMpICYmIHJlcy5sZW5ndGggPT09IDEpIHJlcyA9IHJlc1swXTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG4gIGZ1bmN0aW9uIHRvZ2dsZUVsKGVsLCBkaXNhYmxlZCkge1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbjtcbiAgICBlbCA9IG1ha2VFbGVtZW50c0FycmF5KGVsKTtcbiAgICBlbC5mb3JFYWNoKHN1YkVsID0+IHtcbiAgICAgIGlmIChzdWJFbCkge1xuICAgICAgICBzdWJFbC5jbGFzc0xpc3RbZGlzYWJsZWQgPyAnYWRkJyA6ICdyZW1vdmUnXSguLi5wYXJhbXMuZGlzYWJsZWRDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgICAgaWYgKHN1YkVsLnRhZ05hbWUgPT09ICdCVVRUT04nKSBzdWJFbC5kaXNhYmxlZCA9IGRpc2FibGVkO1xuICAgICAgICBpZiAoc3dpcGVyLnBhcmFtcy53YXRjaE92ZXJmbG93ICYmIHN3aXBlci5lbmFibGVkKSB7XG4gICAgICAgICAgc3ViRWwuY2xhc3NMaXN0W3N3aXBlci5pc0xvY2tlZCA/ICdhZGQnIDogJ3JlbW92ZSddKHBhcmFtcy5sb2NrQ2xhc3MpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIC8vIFVwZGF0ZSBOYXZpZ2F0aW9uIEJ1dHRvbnNcbiAgICBjb25zdCB7XG4gICAgICBuZXh0RWwsXG4gICAgICBwcmV2RWxcbiAgICB9ID0gc3dpcGVyLm5hdmlnYXRpb247XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubG9vcCkge1xuICAgICAgdG9nZ2xlRWwocHJldkVsLCBmYWxzZSk7XG4gICAgICB0b2dnbGVFbChuZXh0RWwsIGZhbHNlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdG9nZ2xlRWwocHJldkVsLCBzd2lwZXIuaXNCZWdpbm5pbmcgJiYgIXN3aXBlci5wYXJhbXMucmV3aW5kKTtcbiAgICB0b2dnbGVFbChuZXh0RWwsIHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLnBhcmFtcy5yZXdpbmQpO1xuICB9XG4gIGZ1bmN0aW9uIG9uUHJldkNsaWNrKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHN3aXBlci5pc0JlZ2lubmluZyAmJiAhc3dpcGVyLnBhcmFtcy5sb29wICYmICFzd2lwZXIucGFyYW1zLnJld2luZCkgcmV0dXJuO1xuICAgIHN3aXBlci5zbGlkZVByZXYoKTtcbiAgICBlbWl0KCduYXZpZ2F0aW9uUHJldicpO1xuICB9XG4gIGZ1bmN0aW9uIG9uTmV4dENsaWNrKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgaWYgKHN3aXBlci5pc0VuZCAmJiAhc3dpcGVyLnBhcmFtcy5sb29wICYmICFzd2lwZXIucGFyYW1zLnJld2luZCkgcmV0dXJuO1xuICAgIHN3aXBlci5zbGlkZU5leHQoKTtcbiAgICBlbWl0KCduYXZpZ2F0aW9uTmV4dCcpO1xuICB9XG4gIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uO1xuICAgIHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbiA9IGNyZWF0ZUVsZW1lbnRJZk5vdERlZmluZWQoc3dpcGVyLCBzd2lwZXIub3JpZ2luYWxQYXJhbXMubmF2aWdhdGlvbiwgc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLCB7XG4gICAgICBuZXh0RWw6ICdzd2lwZXItYnV0dG9uLW5leHQnLFxuICAgICAgcHJldkVsOiAnc3dpcGVyLWJ1dHRvbi1wcmV2J1xuICAgIH0pO1xuICAgIGlmICghKHBhcmFtcy5uZXh0RWwgfHwgcGFyYW1zLnByZXZFbCkpIHJldHVybjtcbiAgICBsZXQgbmV4dEVsID0gZ2V0RWwocGFyYW1zLm5leHRFbCk7XG4gICAgbGV0IHByZXZFbCA9IGdldEVsKHBhcmFtcy5wcmV2RWwpO1xuICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLm5hdmlnYXRpb24sIHtcbiAgICAgIG5leHRFbCxcbiAgICAgIHByZXZFbFxuICAgIH0pO1xuICAgIG5leHRFbCA9IG1ha2VFbGVtZW50c0FycmF5KG5leHRFbCk7XG4gICAgcHJldkVsID0gbWFrZUVsZW1lbnRzQXJyYXkocHJldkVsKTtcbiAgICBjb25zdCBpbml0QnV0dG9uID0gKGVsLCBkaXIpID0+IHtcbiAgICAgIGlmIChlbCkge1xuICAgICAgICBlbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGRpciA9PT0gJ25leHQnID8gb25OZXh0Q2xpY2sgOiBvblByZXZDbGljayk7XG4gICAgICB9XG4gICAgICBpZiAoIXN3aXBlci5lbmFibGVkICYmIGVsKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoLi4ucGFyYW1zLmxvY2tDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIG5leHRFbC5mb3JFYWNoKGVsID0+IGluaXRCdXR0b24oZWwsICduZXh0JykpO1xuICAgIHByZXZFbC5mb3JFYWNoKGVsID0+IGluaXRCdXR0b24oZWwsICdwcmV2JykpO1xuICB9XG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgbGV0IHtcbiAgICAgIG5leHRFbCxcbiAgICAgIHByZXZFbFxuICAgIH0gPSBzd2lwZXIubmF2aWdhdGlvbjtcbiAgICBuZXh0RWwgPSBtYWtlRWxlbWVudHNBcnJheShuZXh0RWwpO1xuICAgIHByZXZFbCA9IG1ha2VFbGVtZW50c0FycmF5KHByZXZFbCk7XG4gICAgY29uc3QgZGVzdHJveUJ1dHRvbiA9IChlbCwgZGlyKSA9PiB7XG4gICAgICBlbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGRpciA9PT0gJ25leHQnID8gb25OZXh0Q2xpY2sgOiBvblByZXZDbGljayk7XG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKC4uLnN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5kaXNhYmxlZENsYXNzLnNwbGl0KCcgJykpO1xuICAgIH07XG4gICAgbmV4dEVsLmZvckVhY2goZWwgPT4gZGVzdHJveUJ1dHRvbihlbCwgJ25leHQnKSk7XG4gICAgcHJldkVsLmZvckVhY2goZWwgPT4gZGVzdHJveUJ1dHRvbihlbCwgJ3ByZXYnKSk7XG4gIH1cbiAgb24oJ2luaXQnLCAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5lbmFibGVkID09PSBmYWxzZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgICBkaXNhYmxlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGluaXQoKTtcbiAgICAgIHVwZGF0ZSgpO1xuICAgIH1cbiAgfSk7XG4gIG9uKCd0b0VkZ2UgZnJvbUVkZ2UgbG9jayB1bmxvY2snLCAoKSA9PiB7XG4gICAgdXBkYXRlKCk7XG4gIH0pO1xuICBvbignZGVzdHJveScsICgpID0+IHtcbiAgICBkZXN0cm95KCk7XG4gIH0pO1xuICBvbignZW5hYmxlIGRpc2FibGUnLCAoKSA9PiB7XG4gICAgbGV0IHtcbiAgICAgIG5leHRFbCxcbiAgICAgIHByZXZFbFxuICAgIH0gPSBzd2lwZXIubmF2aWdhdGlvbjtcbiAgICBuZXh0RWwgPSBtYWtlRWxlbWVudHNBcnJheShuZXh0RWwpO1xuICAgIHByZXZFbCA9IG1ha2VFbGVtZW50c0FycmF5KHByZXZFbCk7XG4gICAgaWYgKHN3aXBlci5lbmFibGVkKSB7XG4gICAgICB1cGRhdGUoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgWy4uLm5leHRFbCwgLi4ucHJldkVsXS5maWx0ZXIoZWwgPT4gISFlbCkuZm9yRWFjaChlbCA9PiBlbC5jbGFzc0xpc3QuYWRkKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5sb2NrQ2xhc3MpKTtcbiAgfSk7XG4gIG9uKCdjbGljaycsIChfcywgZSkgPT4ge1xuICAgIGxldCB7XG4gICAgICBuZXh0RWwsXG4gICAgICBwcmV2RWxcbiAgICB9ID0gc3dpcGVyLm5hdmlnYXRpb247XG4gICAgbmV4dEVsID0gbWFrZUVsZW1lbnRzQXJyYXkobmV4dEVsKTtcbiAgICBwcmV2RWwgPSBtYWtlRWxlbWVudHNBcnJheShwcmV2RWwpO1xuICAgIGNvbnN0IHRhcmdldEVsID0gZS50YXJnZXQ7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRlT25DbGljayAmJiAhcHJldkVsLmluY2x1ZGVzKHRhcmdldEVsKSAmJiAhbmV4dEVsLmluY2x1ZGVzKHRhcmdldEVsKSkge1xuICAgICAgaWYgKHN3aXBlci5wYWdpbmF0aW9uICYmIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbiAmJiBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uY2xpY2thYmxlICYmIChzd2lwZXIucGFnaW5hdGlvbi5lbCA9PT0gdGFyZ2V0RWwgfHwgc3dpcGVyLnBhZ2luYXRpb24uZWwuY29udGFpbnModGFyZ2V0RWwpKSkgcmV0dXJuO1xuICAgICAgbGV0IGlzSGlkZGVuO1xuICAgICAgaWYgKG5leHRFbC5sZW5ndGgpIHtcbiAgICAgICAgaXNIaWRkZW4gPSBuZXh0RWxbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcyk7XG4gICAgICB9IGVsc2UgaWYgKHByZXZFbC5sZW5ndGgpIHtcbiAgICAgICAgaXNIaWRkZW4gPSBwcmV2RWxbMF0uY2xhc3NMaXN0LmNvbnRhaW5zKHN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5oaWRkZW5DbGFzcyk7XG4gICAgICB9XG4gICAgICBpZiAoaXNIaWRkZW4gPT09IHRydWUpIHtcbiAgICAgICAgZW1pdCgnbmF2aWdhdGlvblNob3cnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVtaXQoJ25hdmlnYXRpb25IaWRlJyk7XG4gICAgICB9XG4gICAgICBbLi4ubmV4dEVsLCAuLi5wcmV2RWxdLmZpbHRlcihlbCA9PiAhIWVsKS5mb3JFYWNoKGVsID0+IGVsLmNsYXNzTGlzdC50b2dnbGUoc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLmhpZGRlbkNsYXNzKSk7XG4gICAgfVxuICB9KTtcbiAgY29uc3QgZW5hYmxlID0gKCkgPT4ge1xuICAgIHN3aXBlci5lbC5jbGFzc0xpc3QucmVtb3ZlKC4uLnN3aXBlci5wYXJhbXMubmF2aWdhdGlvbi5uYXZpZ2F0aW9uRGlzYWJsZWRDbGFzcy5zcGxpdCgnICcpKTtcbiAgICBpbml0KCk7XG4gICAgdXBkYXRlKCk7XG4gIH07XG4gIGNvbnN0IGRpc2FibGUgPSAoKSA9PiB7XG4gICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5hZGQoLi4uc3dpcGVyLnBhcmFtcy5uYXZpZ2F0aW9uLm5hdmlnYXRpb25EaXNhYmxlZENsYXNzLnNwbGl0KCcgJykpO1xuICAgIGRlc3Ryb3koKTtcbiAgfTtcbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIubmF2aWdhdGlvbiwge1xuICAgIGVuYWJsZSxcbiAgICBkaXNhYmxlLFxuICAgIHVwZGF0ZSxcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfSk7XG59XG5cbmV4cG9ydCB7IE5hdmlnYXRpb24gYXMgZGVmYXVsdCB9O1xuIiwgImZ1bmN0aW9uIGNsYXNzZXNUb1NlbGVjdG9yKGNsYXNzZXMpIHtcbiAgaWYgKGNsYXNzZXMgPT09IHZvaWQgMCkge1xuICAgIGNsYXNzZXMgPSAnJztcbiAgfVxuICByZXR1cm4gYC4ke2NsYXNzZXMudHJpbSgpLnJlcGxhY2UoLyhbXFwuOiErXFwvXSkvZywgJ1xcXFwkMScpIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcbiAgLnJlcGxhY2UoLyAvZywgJy4nKX1gO1xufVxuXG5leHBvcnQgeyBjbGFzc2VzVG9TZWxlY3RvciBhcyBjIH07XG4iLCAiaW1wb3J0IHsgYyBhcyBjbGFzc2VzVG9TZWxlY3RvciB9IGZyb20gJy4uL3NoYXJlZC9jbGFzc2VzLXRvLXNlbGVjdG9yLm1qcyc7XG5pbXBvcnQgeyBjIGFzIGNyZWF0ZUVsZW1lbnRJZk5vdERlZmluZWQgfSBmcm9tICcuLi9zaGFyZWQvY3JlYXRlLWVsZW1lbnQtaWYtbm90LWRlZmluZWQubWpzJztcbmltcG9ydCB7IGYgYXMgZWxlbWVudE91dGVyU2l6ZSwgZyBhcyBlbGVtZW50SW5kZXgsIGEgYXMgZWxlbWVudFBhcmVudHMgfSBmcm9tICcuLi9zaGFyZWQvdXRpbHMubWpzJztcblxuZnVuY3Rpb24gUGFnaW5hdGlvbihfcmVmKSB7XG4gIGxldCB7XG4gICAgc3dpcGVyLFxuICAgIGV4dGVuZFBhcmFtcyxcbiAgICBvbixcbiAgICBlbWl0XG4gIH0gPSBfcmVmO1xuICBjb25zdCBwZnggPSAnc3dpcGVyLXBhZ2luYXRpb24nO1xuICBleHRlbmRQYXJhbXMoe1xuICAgIHBhZ2luYXRpb246IHtcbiAgICAgIGVsOiBudWxsLFxuICAgICAgYnVsbGV0RWxlbWVudDogJ3NwYW4nLFxuICAgICAgY2xpY2thYmxlOiBmYWxzZSxcbiAgICAgIGhpZGVPbkNsaWNrOiBmYWxzZSxcbiAgICAgIHJlbmRlckJ1bGxldDogbnVsbCxcbiAgICAgIHJlbmRlclByb2dyZXNzYmFyOiBudWxsLFxuICAgICAgcmVuZGVyRnJhY3Rpb246IG51bGwsXG4gICAgICByZW5kZXJDdXN0b206IG51bGwsXG4gICAgICBwcm9ncmVzc2Jhck9wcG9zaXRlOiBmYWxzZSxcbiAgICAgIHR5cGU6ICdidWxsZXRzJyxcbiAgICAgIC8vICdidWxsZXRzJyBvciAncHJvZ3Jlc3NiYXInIG9yICdmcmFjdGlvbicgb3IgJ2N1c3RvbSdcbiAgICAgIGR5bmFtaWNCdWxsZXRzOiBmYWxzZSxcbiAgICAgIGR5bmFtaWNNYWluQnVsbGV0czogMSxcbiAgICAgIGZvcm1hdEZyYWN0aW9uQ3VycmVudDogbnVtYmVyID0+IG51bWJlcixcbiAgICAgIGZvcm1hdEZyYWN0aW9uVG90YWw6IG51bWJlciA9PiBudW1iZXIsXG4gICAgICBidWxsZXRDbGFzczogYCR7cGZ4fS1idWxsZXRgLFxuICAgICAgYnVsbGV0QWN0aXZlQ2xhc3M6IGAke3BmeH0tYnVsbGV0LWFjdGl2ZWAsXG4gICAgICBtb2RpZmllckNsYXNzOiBgJHtwZnh9LWAsXG4gICAgICBjdXJyZW50Q2xhc3M6IGAke3BmeH0tY3VycmVudGAsXG4gICAgICB0b3RhbENsYXNzOiBgJHtwZnh9LXRvdGFsYCxcbiAgICAgIGhpZGRlbkNsYXNzOiBgJHtwZnh9LWhpZGRlbmAsXG4gICAgICBwcm9ncmVzc2JhckZpbGxDbGFzczogYCR7cGZ4fS1wcm9ncmVzc2Jhci1maWxsYCxcbiAgICAgIHByb2dyZXNzYmFyT3Bwb3NpdGVDbGFzczogYCR7cGZ4fS1wcm9ncmVzc2Jhci1vcHBvc2l0ZWAsXG4gICAgICBjbGlja2FibGVDbGFzczogYCR7cGZ4fS1jbGlja2FibGVgLFxuICAgICAgbG9ja0NsYXNzOiBgJHtwZnh9LWxvY2tgLFxuICAgICAgaG9yaXpvbnRhbENsYXNzOiBgJHtwZnh9LWhvcml6b250YWxgLFxuICAgICAgdmVydGljYWxDbGFzczogYCR7cGZ4fS12ZXJ0aWNhbGAsXG4gICAgICBwYWdpbmF0aW9uRGlzYWJsZWRDbGFzczogYCR7cGZ4fS1kaXNhYmxlZGBcbiAgICB9XG4gIH0pO1xuICBzd2lwZXIucGFnaW5hdGlvbiA9IHtcbiAgICBlbDogbnVsbCxcbiAgICBidWxsZXRzOiBbXVxuICB9O1xuICBsZXQgYnVsbGV0U2l6ZTtcbiAgbGV0IGR5bmFtaWNCdWxsZXRJbmRleCA9IDA7XG4gIGNvbnN0IG1ha2VFbGVtZW50c0FycmF5ID0gZWwgPT4gKEFycmF5LmlzQXJyYXkoZWwpID8gZWwgOiBbZWxdKS5maWx0ZXIoZSA9PiAhIWUpO1xuICBmdW5jdGlvbiBpc1BhZ2luYXRpb25EaXNhYmxlZCgpIHtcbiAgICByZXR1cm4gIXN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5lbCB8fCAhc3dpcGVyLnBhZ2luYXRpb24uZWwgfHwgQXJyYXkuaXNBcnJheShzd2lwZXIucGFnaW5hdGlvbi5lbCkgJiYgc3dpcGVyLnBhZ2luYXRpb24uZWwubGVuZ3RoID09PSAwO1xuICB9XG4gIGZ1bmN0aW9uIHNldFNpZGVCdWxsZXRzKGJ1bGxldEVsLCBwb3NpdGlvbikge1xuICAgIGNvbnN0IHtcbiAgICAgIGJ1bGxldEFjdGl2ZUNsYXNzXG4gICAgfSA9IHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbjtcbiAgICBpZiAoIWJ1bGxldEVsKSByZXR1cm47XG4gICAgYnVsbGV0RWwgPSBidWxsZXRFbFtgJHtwb3NpdGlvbiA9PT0gJ3ByZXYnID8gJ3ByZXZpb3VzJyA6ICduZXh0J31FbGVtZW50U2libGluZ2BdO1xuICAgIGlmIChidWxsZXRFbCkge1xuICAgICAgYnVsbGV0RWwuY2xhc3NMaXN0LmFkZChgJHtidWxsZXRBY3RpdmVDbGFzc30tJHtwb3NpdGlvbn1gKTtcbiAgICAgIGJ1bGxldEVsID0gYnVsbGV0RWxbYCR7cG9zaXRpb24gPT09ICdwcmV2JyA/ICdwcmV2aW91cycgOiAnbmV4dCd9RWxlbWVudFNpYmxpbmdgXTtcbiAgICAgIGlmIChidWxsZXRFbCkge1xuICAgICAgICBidWxsZXRFbC5jbGFzc0xpc3QuYWRkKGAke2J1bGxldEFjdGl2ZUNsYXNzfS0ke3Bvc2l0aW9ufS0ke3Bvc2l0aW9ufWApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBvbkJ1bGxldENsaWNrKGUpIHtcbiAgICBjb25zdCBidWxsZXRFbCA9IGUudGFyZ2V0LmNsb3Nlc3QoY2xhc3Nlc1RvU2VsZWN0b3Ioc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmJ1bGxldENsYXNzKSk7XG4gICAgaWYgKCFidWxsZXRFbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgaW5kZXggPSBlbGVtZW50SW5kZXgoYnVsbGV0RWwpICogc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cDtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5sb29wKSB7XG4gICAgICBpZiAoc3dpcGVyLnJlYWxJbmRleCA9PT0gaW5kZXgpIHJldHVybjtcbiAgICAgIHN3aXBlci5zbGlkZVRvTG9vcChpbmRleCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN3aXBlci5zbGlkZVRvKGluZGV4KTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gdXBkYXRlKCkge1xuICAgIC8vIFJlbmRlciB8fCBVcGRhdGUgUGFnaW5hdGlvbiBidWxsZXRzL2l0ZW1zXG4gICAgY29uc3QgcnRsID0gc3dpcGVyLnJ0bDtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgaWYgKGlzUGFnaW5hdGlvbkRpc2FibGVkKCkpIHJldHVybjtcbiAgICBsZXQgZWwgPSBzd2lwZXIucGFnaW5hdGlvbi5lbDtcbiAgICBlbCA9IG1ha2VFbGVtZW50c0FycmF5KGVsKTtcbiAgICAvLyBDdXJyZW50L1RvdGFsXG4gICAgbGV0IGN1cnJlbnQ7XG4gICAgbGV0IHByZXZpb3VzSW5kZXg7XG4gICAgY29uc3Qgc2xpZGVzTGVuZ3RoID0gc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQgPyBzd2lwZXIudmlydHVhbC5zbGlkZXMubGVuZ3RoIDogc3dpcGVyLnNsaWRlcy5sZW5ndGg7XG4gICAgY29uc3QgdG90YWwgPSBzd2lwZXIucGFyYW1zLmxvb3AgPyBNYXRoLmNlaWwoc2xpZGVzTGVuZ3RoIC8gc3dpcGVyLnBhcmFtcy5zbGlkZXNQZXJHcm91cCkgOiBzd2lwZXIuc25hcEdyaWQubGVuZ3RoO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmxvb3ApIHtcbiAgICAgIHByZXZpb3VzSW5kZXggPSBzd2lwZXIucHJldmlvdXNSZWFsSW5kZXggfHwgMDtcbiAgICAgIGN1cnJlbnQgPSBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwID4gMSA/IE1hdGguZmxvb3Ioc3dpcGVyLnJlYWxJbmRleCAvIHN3aXBlci5wYXJhbXMuc2xpZGVzUGVyR3JvdXApIDogc3dpcGVyLnJlYWxJbmRleDtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBzd2lwZXIuc25hcEluZGV4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY3VycmVudCA9IHN3aXBlci5zbmFwSW5kZXg7XG4gICAgICBwcmV2aW91c0luZGV4ID0gc3dpcGVyLnByZXZpb3VzU25hcEluZGV4O1xuICAgIH0gZWxzZSB7XG4gICAgICBwcmV2aW91c0luZGV4ID0gc3dpcGVyLnByZXZpb3VzSW5kZXggfHwgMDtcbiAgICAgIGN1cnJlbnQgPSBzd2lwZXIuYWN0aXZlSW5kZXggfHwgMDtcbiAgICB9XG4gICAgLy8gVHlwZXNcbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJyAmJiBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzICYmIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYnVsbGV0cyA9IHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHM7XG4gICAgICBsZXQgZmlyc3RJbmRleDtcbiAgICAgIGxldCBsYXN0SW5kZXg7XG4gICAgICBsZXQgbWlkSW5kZXg7XG4gICAgICBpZiAocGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XG4gICAgICAgIGJ1bGxldFNpemUgPSBlbGVtZW50T3V0ZXJTaXplKGJ1bGxldHNbMF0sIHN3aXBlci5pc0hvcml6b250YWwoKSA/ICd3aWR0aCcgOiAnaGVpZ2h0JywgdHJ1ZSk7XG4gICAgICAgIGVsLmZvckVhY2goc3ViRWwgPT4ge1xuICAgICAgICAgIHN1YkVsLnN0eWxlW3N3aXBlci5pc0hvcml6b250YWwoKSA/ICd3aWR0aCcgOiAnaGVpZ2h0J10gPSBgJHtidWxsZXRTaXplICogKHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgKyA0KX1weGA7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAocGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyA+IDEgJiYgcHJldmlvdXNJbmRleCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgZHluYW1pY0J1bGxldEluZGV4ICs9IGN1cnJlbnQgLSAocHJldmlvdXNJbmRleCB8fCAwKTtcbiAgICAgICAgICBpZiAoZHluYW1pY0J1bGxldEluZGV4ID4gcGFyYW1zLmR5bmFtaWNNYWluQnVsbGV0cyAtIDEpIHtcbiAgICAgICAgICAgIGR5bmFtaWNCdWxsZXRJbmRleCA9IHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgLSAxO1xuICAgICAgICAgIH0gZWxzZSBpZiAoZHluYW1pY0J1bGxldEluZGV4IDwgMCkge1xuICAgICAgICAgICAgZHluYW1pY0J1bGxldEluZGV4ID0gMDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmlyc3RJbmRleCA9IE1hdGgubWF4KGN1cnJlbnQgLSBkeW5hbWljQnVsbGV0SW5kZXgsIDApO1xuICAgICAgICBsYXN0SW5kZXggPSBmaXJzdEluZGV4ICsgKE1hdGgubWluKGJ1bGxldHMubGVuZ3RoLCBwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzKSAtIDEpO1xuICAgICAgICBtaWRJbmRleCA9IChsYXN0SW5kZXggKyBmaXJzdEluZGV4KSAvIDI7XG4gICAgICB9XG4gICAgICBidWxsZXRzLmZvckVhY2goYnVsbGV0RWwgPT4ge1xuICAgICAgICBjb25zdCBjbGFzc2VzVG9SZW1vdmUgPSBbLi4uWycnLCAnLW5leHQnLCAnLW5leHQtbmV4dCcsICctcHJldicsICctcHJldi1wcmV2JywgJy1tYWluJ10ubWFwKHN1ZmZpeCA9PiBgJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9JHtzdWZmaXh9YCldLm1hcChzID0+IHR5cGVvZiBzID09PSAnc3RyaW5nJyAmJiBzLmluY2x1ZGVzKCcgJykgPyBzLnNwbGl0KCcgJykgOiBzKS5mbGF0KCk7XG4gICAgICAgIGJ1bGxldEVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3Nlc1RvUmVtb3ZlKTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGVsLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgYnVsbGV0cy5mb3JFYWNoKGJ1bGxldCA9PiB7XG4gICAgICAgICAgY29uc3QgYnVsbGV0SW5kZXggPSBlbGVtZW50SW5kZXgoYnVsbGV0KTtcbiAgICAgICAgICBpZiAoYnVsbGV0SW5kZXggPT09IGN1cnJlbnQpIHtcbiAgICAgICAgICAgIGJ1bGxldC5jbGFzc0xpc3QuYWRkKC4uLnBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICAgICAgICAgIGJ1bGxldC5zZXRBdHRyaWJ1dGUoJ3BhcnQnLCAnYnVsbGV0Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICAgICAgIGlmIChidWxsZXRJbmRleCA+PSBmaXJzdEluZGV4ICYmIGJ1bGxldEluZGV4IDw9IGxhc3RJbmRleCkge1xuICAgICAgICAgICAgICBidWxsZXQuY2xhc3NMaXN0LmFkZCguLi5gJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9LW1haW5gLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGJ1bGxldEluZGV4ID09PSBmaXJzdEluZGV4KSB7XG4gICAgICAgICAgICAgIHNldFNpZGVCdWxsZXRzKGJ1bGxldCwgJ3ByZXYnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChidWxsZXRJbmRleCA9PT0gbGFzdEluZGV4KSB7XG4gICAgICAgICAgICAgIHNldFNpZGVCdWxsZXRzKGJ1bGxldCwgJ25leHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgYnVsbGV0ID0gYnVsbGV0c1tjdXJyZW50XTtcbiAgICAgICAgaWYgKGJ1bGxldCkge1xuICAgICAgICAgIGJ1bGxldC5jbGFzc0xpc3QuYWRkKC4uLnBhcmFtcy5idWxsZXRBY3RpdmVDbGFzcy5zcGxpdCgnICcpKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3dpcGVyLmlzRWxlbWVudCkge1xuICAgICAgICAgIGJ1bGxldHMuZm9yRWFjaCgoYnVsbGV0RWwsIGJ1bGxldEluZGV4KSA9PiB7XG4gICAgICAgICAgICBidWxsZXRFbC5zZXRBdHRyaWJ1dGUoJ3BhcnQnLCBidWxsZXRJbmRleCA9PT0gY3VycmVudCA/ICdidWxsZXQtYWN0aXZlJyA6ICdidWxsZXQnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XG4gICAgICAgICAgY29uc3QgZmlyc3REaXNwbGF5ZWRCdWxsZXQgPSBidWxsZXRzW2ZpcnN0SW5kZXhdO1xuICAgICAgICAgIGNvbnN0IGxhc3REaXNwbGF5ZWRCdWxsZXQgPSBidWxsZXRzW2xhc3RJbmRleF07XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGZpcnN0SW5kZXg7IGkgPD0gbGFzdEluZGV4OyBpICs9IDEpIHtcbiAgICAgICAgICAgIGlmIChidWxsZXRzW2ldKSB7XG4gICAgICAgICAgICAgIGJ1bGxldHNbaV0uY2xhc3NMaXN0LmFkZCguLi5gJHtwYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3N9LW1haW5gLnNwbGl0KCcgJykpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRTaWRlQnVsbGV0cyhmaXJzdERpc3BsYXllZEJ1bGxldCwgJ3ByZXYnKTtcbiAgICAgICAgICBzZXRTaWRlQnVsbGV0cyhsYXN0RGlzcGxheWVkQnVsbGV0LCAnbmV4dCcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLmR5bmFtaWNCdWxsZXRzKSB7XG4gICAgICAgIGNvbnN0IGR5bmFtaWNCdWxsZXRzTGVuZ3RoID0gTWF0aC5taW4oYnVsbGV0cy5sZW5ndGgsIHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgKyA0KTtcbiAgICAgICAgY29uc3QgYnVsbGV0c09mZnNldCA9IChidWxsZXRTaXplICogZHluYW1pY0J1bGxldHNMZW5ndGggLSBidWxsZXRTaXplKSAvIDIgLSBtaWRJbmRleCAqIGJ1bGxldFNpemU7XG4gICAgICAgIGNvbnN0IG9mZnNldFByb3AgPSBydGwgPyAncmlnaHQnIDogJ2xlZnQnO1xuICAgICAgICBidWxsZXRzLmZvckVhY2goYnVsbGV0ID0+IHtcbiAgICAgICAgICBidWxsZXQuc3R5bGVbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gb2Zmc2V0UHJvcCA6ICd0b3AnXSA9IGAke2J1bGxldHNPZmZzZXR9cHhgO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgZWwuZm9yRWFjaCgoc3ViRWwsIHN1YkVsSW5kZXgpID0+IHtcbiAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2ZyYWN0aW9uJykge1xuICAgICAgICBzdWJFbC5xdWVyeVNlbGVjdG9yQWxsKGNsYXNzZXNUb1NlbGVjdG9yKHBhcmFtcy5jdXJyZW50Q2xhc3MpKS5mb3JFYWNoKGZyYWN0aW9uRWwgPT4ge1xuICAgICAgICAgIGZyYWN0aW9uRWwudGV4dENvbnRlbnQgPSBwYXJhbXMuZm9ybWF0RnJhY3Rpb25DdXJyZW50KGN1cnJlbnQgKyAxKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHN1YkVsLnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3Nlc1RvU2VsZWN0b3IocGFyYW1zLnRvdGFsQ2xhc3MpKS5mb3JFYWNoKHRvdGFsRWwgPT4ge1xuICAgICAgICAgIHRvdGFsRWwudGV4dENvbnRlbnQgPSBwYXJhbXMuZm9ybWF0RnJhY3Rpb25Ub3RhbCh0b3RhbCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAncHJvZ3Jlc3NiYXInKSB7XG4gICAgICAgIGxldCBwcm9ncmVzc2JhckRpcmVjdGlvbjtcbiAgICAgICAgaWYgKHBhcmFtcy5wcm9ncmVzc2Jhck9wcG9zaXRlKSB7XG4gICAgICAgICAgcHJvZ3Jlc3NiYXJEaXJlY3Rpb24gPSBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAndmVydGljYWwnIDogJ2hvcml6b250YWwnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHByb2dyZXNzYmFyRGlyZWN0aW9uID0gc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBzY2FsZSA9IChjdXJyZW50ICsgMSkgLyB0b3RhbDtcbiAgICAgICAgbGV0IHNjYWxlWCA9IDE7XG4gICAgICAgIGxldCBzY2FsZVkgPSAxO1xuICAgICAgICBpZiAocHJvZ3Jlc3NiYXJEaXJlY3Rpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgIHNjYWxlWCA9IHNjYWxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNjYWxlWSA9IHNjYWxlO1xuICAgICAgICB9XG4gICAgICAgIHN1YkVsLnF1ZXJ5U2VsZWN0b3JBbGwoY2xhc3Nlc1RvU2VsZWN0b3IocGFyYW1zLnByb2dyZXNzYmFyRmlsbENsYXNzKSkuZm9yRWFjaChwcm9ncmVzc0VsID0+IHtcbiAgICAgICAgICBwcm9ncmVzc0VsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgwLDAsMCkgc2NhbGVYKCR7c2NhbGVYfSkgc2NhbGVZKCR7c2NhbGVZfSlgO1xuICAgICAgICAgIHByb2dyZXNzRWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7c3dpcGVyLnBhcmFtcy5zcGVlZH1tc2A7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKHBhcmFtcy50eXBlID09PSAnY3VzdG9tJyAmJiBwYXJhbXMucmVuZGVyQ3VzdG9tKSB7XG4gICAgICAgIHN1YkVsLmlubmVySFRNTCA9IHBhcmFtcy5yZW5kZXJDdXN0b20oc3dpcGVyLCBjdXJyZW50ICsgMSwgdG90YWwpO1xuICAgICAgICBpZiAoc3ViRWxJbmRleCA9PT0gMCkgZW1pdCgncGFnaW5hdGlvblJlbmRlcicsIHN1YkVsKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChzdWJFbEluZGV4ID09PSAwKSBlbWl0KCdwYWdpbmF0aW9uUmVuZGVyJywgc3ViRWwpO1xuICAgICAgICBlbWl0KCdwYWdpbmF0aW9uVXBkYXRlJywgc3ViRWwpO1xuICAgICAgfVxuICAgICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuZW5hYmxlZCkge1xuICAgICAgICBzdWJFbC5jbGFzc0xpc3Rbc3dpcGVyLmlzTG9ja2VkID8gJ2FkZCcgOiAncmVtb3ZlJ10ocGFyYW1zLmxvY2tDbGFzcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gcmVuZGVyKCkge1xuICAgIC8vIFJlbmRlciBDb250YWluZXJcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgaWYgKGlzUGFnaW5hdGlvbkRpc2FibGVkKCkpIHJldHVybjtcbiAgICBjb25zdCBzbGlkZXNMZW5ndGggPSBzd2lwZXIudmlydHVhbCAmJiBzd2lwZXIucGFyYW1zLnZpcnR1YWwuZW5hYmxlZCA/IHN3aXBlci52aXJ0dWFsLnNsaWRlcy5sZW5ndGggOiBzd2lwZXIuZ3JpZCAmJiBzd2lwZXIucGFyYW1zLmdyaWQucm93cyA+IDEgPyBzd2lwZXIuc2xpZGVzLmxlbmd0aCAvIE1hdGguY2VpbChzd2lwZXIucGFyYW1zLmdyaWQucm93cykgOiBzd2lwZXIuc2xpZGVzLmxlbmd0aDtcbiAgICBsZXQgZWwgPSBzd2lwZXIucGFnaW5hdGlvbi5lbDtcbiAgICBlbCA9IG1ha2VFbGVtZW50c0FycmF5KGVsKTtcbiAgICBsZXQgcGFnaW5hdGlvbkhUTUwgPSAnJztcbiAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJykge1xuICAgICAgbGV0IG51bWJlck9mQnVsbGV0cyA9IHN3aXBlci5wYXJhbXMubG9vcCA/IE1hdGguY2VpbChzbGlkZXNMZW5ndGggLyBzd2lwZXIucGFyYW1zLnNsaWRlc1Blckdyb3VwKSA6IHN3aXBlci5zbmFwR3JpZC5sZW5ndGg7XG4gICAgICBpZiAoc3dpcGVyLnBhcmFtcy5mcmVlTW9kZSAmJiBzd2lwZXIucGFyYW1zLmZyZWVNb2RlLmVuYWJsZWQgJiYgbnVtYmVyT2ZCdWxsZXRzID4gc2xpZGVzTGVuZ3RoKSB7XG4gICAgICAgIG51bWJlck9mQnVsbGV0cyA9IHNsaWRlc0xlbmd0aDtcbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZCdWxsZXRzOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKHBhcmFtcy5yZW5kZXJCdWxsZXQpIHtcbiAgICAgICAgICBwYWdpbmF0aW9uSFRNTCArPSBwYXJhbXMucmVuZGVyQnVsbGV0LmNhbGwoc3dpcGVyLCBpLCBwYXJhbXMuYnVsbGV0Q2xhc3MpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHByZXR0aWVyLWlnbm9yZVxuICAgICAgICAgIHBhZ2luYXRpb25IVE1MICs9IGA8JHtwYXJhbXMuYnVsbGV0RWxlbWVudH0gJHtzd2lwZXIuaXNFbGVtZW50ID8gJ3BhcnQ9XCJidWxsZXRcIicgOiAnJ30gY2xhc3M9XCIke3BhcmFtcy5idWxsZXRDbGFzc31cIj48LyR7cGFyYW1zLmJ1bGxldEVsZW1lbnR9PmA7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhcmFtcy50eXBlID09PSAnZnJhY3Rpb24nKSB7XG4gICAgICBpZiAocGFyYW1zLnJlbmRlckZyYWN0aW9uKSB7XG4gICAgICAgIHBhZ2luYXRpb25IVE1MID0gcGFyYW1zLnJlbmRlckZyYWN0aW9uLmNhbGwoc3dpcGVyLCBwYXJhbXMuY3VycmVudENsYXNzLCBwYXJhbXMudG90YWxDbGFzcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYWdpbmF0aW9uSFRNTCA9IGA8c3BhbiBjbGFzcz1cIiR7cGFyYW1zLmN1cnJlbnRDbGFzc31cIj48L3NwYW4+YCArICcgLyAnICsgYDxzcGFuIGNsYXNzPVwiJHtwYXJhbXMudG90YWxDbGFzc31cIj48L3NwYW4+YDtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHBhcmFtcy50eXBlID09PSAncHJvZ3Jlc3NiYXInKSB7XG4gICAgICBpZiAocGFyYW1zLnJlbmRlclByb2dyZXNzYmFyKSB7XG4gICAgICAgIHBhZ2luYXRpb25IVE1MID0gcGFyYW1zLnJlbmRlclByb2dyZXNzYmFyLmNhbGwoc3dpcGVyLCBwYXJhbXMucHJvZ3Jlc3NiYXJGaWxsQ2xhc3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFnaW5hdGlvbkhUTUwgPSBgPHNwYW4gY2xhc3M9XCIke3BhcmFtcy5wcm9ncmVzc2JhckZpbGxDbGFzc31cIj48L3NwYW4+YDtcbiAgICAgIH1cbiAgICB9XG4gICAgc3dpcGVyLnBhZ2luYXRpb24uYnVsbGV0cyA9IFtdO1xuICAgIGVsLmZvckVhY2goc3ViRWwgPT4ge1xuICAgICAgaWYgKHBhcmFtcy50eXBlICE9PSAnY3VzdG9tJykge1xuICAgICAgICBzdWJFbC5pbm5lckhUTUwgPSBwYWdpbmF0aW9uSFRNTCB8fCAnJztcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2J1bGxldHMnKSB7XG4gICAgICAgIHN3aXBlci5wYWdpbmF0aW9uLmJ1bGxldHMucHVzaCguLi5zdWJFbC5xdWVyeVNlbGVjdG9yQWxsKGNsYXNzZXNUb1NlbGVjdG9yKHBhcmFtcy5idWxsZXRDbGFzcykpKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAocGFyYW1zLnR5cGUgIT09ICdjdXN0b20nKSB7XG4gICAgICBlbWl0KCdwYWdpbmF0aW9uUmVuZGVyJywgZWxbMF0pO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbiA9IGNyZWF0ZUVsZW1lbnRJZk5vdERlZmluZWQoc3dpcGVyLCBzd2lwZXIub3JpZ2luYWxQYXJhbXMucGFnaW5hdGlvbiwgc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLCB7XG4gICAgICBlbDogJ3N3aXBlci1wYWdpbmF0aW9uJ1xuICAgIH0pO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbjtcbiAgICBpZiAoIXBhcmFtcy5lbCkgcmV0dXJuO1xuICAgIGxldCBlbDtcbiAgICBpZiAodHlwZW9mIHBhcmFtcy5lbCA9PT0gJ3N0cmluZycgJiYgc3dpcGVyLmlzRWxlbWVudCkge1xuICAgICAgZWwgPSBzd2lwZXIuZWwucXVlcnlTZWxlY3RvcihwYXJhbXMuZWwpO1xuICAgIH1cbiAgICBpZiAoIWVsICYmIHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnKSB7XG4gICAgICBlbCA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhcmFtcy5lbCldO1xuICAgIH1cbiAgICBpZiAoIWVsKSB7XG4gICAgICBlbCA9IHBhcmFtcy5lbDtcbiAgICB9XG4gICAgaWYgKCFlbCB8fCBlbC5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy51bmlxdWVOYXZFbGVtZW50cyAmJiB0eXBlb2YgcGFyYW1zLmVsID09PSAnc3RyaW5nJyAmJiBBcnJheS5pc0FycmF5KGVsKSAmJiBlbC5sZW5ndGggPiAxKSB7XG4gICAgICBlbCA9IFsuLi5zd2lwZXIuZWwucXVlcnlTZWxlY3RvckFsbChwYXJhbXMuZWwpXTtcbiAgICAgIC8vIGNoZWNrIGlmIGl0IGJlbG9uZ3MgdG8gYW5vdGhlciBuZXN0ZWQgU3dpcGVyXG4gICAgICBpZiAoZWwubGVuZ3RoID4gMSkge1xuICAgICAgICBlbCA9IGVsLmZpbHRlcihzdWJFbCA9PiB7XG4gICAgICAgICAgaWYgKGVsZW1lbnRQYXJlbnRzKHN1YkVsLCAnLnN3aXBlcicpWzBdICE9PSBzd2lwZXIuZWwpIHJldHVybiBmYWxzZTtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSlbMF07XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KGVsKSAmJiBlbC5sZW5ndGggPT09IDEpIGVsID0gZWxbMF07XG4gICAgT2JqZWN0LmFzc2lnbihzd2lwZXIucGFnaW5hdGlvbiwge1xuICAgICAgZWxcbiAgICB9KTtcbiAgICBlbCA9IG1ha2VFbGVtZW50c0FycmF5KGVsKTtcbiAgICBlbC5mb3JFYWNoKHN1YkVsID0+IHtcbiAgICAgIGlmIChwYXJhbXMudHlwZSA9PT0gJ2J1bGxldHMnICYmIHBhcmFtcy5jbGlja2FibGUpIHtcbiAgICAgICAgc3ViRWwuY2xhc3NMaXN0LmFkZCguLi4ocGFyYW1zLmNsaWNrYWJsZUNsYXNzIHx8ICcnKS5zcGxpdCgnICcpKTtcbiAgICAgIH1cbiAgICAgIHN1YkVsLmNsYXNzTGlzdC5hZGQocGFyYW1zLm1vZGlmaWVyQ2xhc3MgKyBwYXJhbXMudHlwZSk7XG4gICAgICBzdWJFbC5jbGFzc0xpc3QuYWRkKHN3aXBlci5pc0hvcml6b250YWwoKSA/IHBhcmFtcy5ob3Jpem9udGFsQ2xhc3MgOiBwYXJhbXMudmVydGljYWxDbGFzcyk7XG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdidWxsZXRzJyAmJiBwYXJhbXMuZHluYW1pY0J1bGxldHMpIHtcbiAgICAgICAgc3ViRWwuY2xhc3NMaXN0LmFkZChgJHtwYXJhbXMubW9kaWZpZXJDbGFzc30ke3BhcmFtcy50eXBlfS1keW5hbWljYCk7XG4gICAgICAgIGR5bmFtaWNCdWxsZXRJbmRleCA9IDA7XG4gICAgICAgIGlmIChwYXJhbXMuZHluYW1pY01haW5CdWxsZXRzIDwgMSkge1xuICAgICAgICAgIHBhcmFtcy5keW5hbWljTWFpbkJ1bGxldHMgPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocGFyYW1zLnR5cGUgPT09ICdwcm9ncmVzc2JhcicgJiYgcGFyYW1zLnByb2dyZXNzYmFyT3Bwb3NpdGUpIHtcbiAgICAgICAgc3ViRWwuY2xhc3NMaXN0LmFkZChwYXJhbXMucHJvZ3Jlc3NiYXJPcHBvc2l0ZUNsYXNzKTtcbiAgICAgIH1cbiAgICAgIGlmIChwYXJhbXMuY2xpY2thYmxlKSB7XG4gICAgICAgIHN1YkVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb25CdWxsZXRDbGljayk7XG4gICAgICB9XG4gICAgICBpZiAoIXN3aXBlci5lbmFibGVkKSB7XG4gICAgICAgIHN1YkVsLmNsYXNzTGlzdC5hZGQocGFyYW1zLmxvY2tDbGFzcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgaWYgKGlzUGFnaW5hdGlvbkRpc2FibGVkKCkpIHJldHVybjtcbiAgICBsZXQgZWwgPSBzd2lwZXIucGFnaW5hdGlvbi5lbDtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsID0gbWFrZUVsZW1lbnRzQXJyYXkoZWwpO1xuICAgICAgZWwuZm9yRWFjaChzdWJFbCA9PiB7XG4gICAgICAgIHN1YkVsLmNsYXNzTGlzdC5yZW1vdmUocGFyYW1zLmhpZGRlbkNsYXNzKTtcbiAgICAgICAgc3ViRWwuY2xhc3NMaXN0LnJlbW92ZShwYXJhbXMubW9kaWZpZXJDbGFzcyArIHBhcmFtcy50eXBlKTtcbiAgICAgICAgc3ViRWwuY2xhc3NMaXN0LnJlbW92ZShzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBwYXJhbXMuaG9yaXpvbnRhbENsYXNzIDogcGFyYW1zLnZlcnRpY2FsQ2xhc3MpO1xuICAgICAgICBpZiAocGFyYW1zLmNsaWNrYWJsZSkge1xuICAgICAgICAgIHN1YkVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uKHBhcmFtcy5jbGlja2FibGVDbGFzcyB8fCAnJykuc3BsaXQoJyAnKSk7XG4gICAgICAgICAgc3ViRWwucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvbkJ1bGxldENsaWNrKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzKSBzd2lwZXIucGFnaW5hdGlvbi5idWxsZXRzLmZvckVhY2goc3ViRWwgPT4gc3ViRWwuY2xhc3NMaXN0LnJlbW92ZSguLi5wYXJhbXMuYnVsbGV0QWN0aXZlQ2xhc3Muc3BsaXQoJyAnKSkpO1xuICB9XG4gIG9uKCdjaGFuZ2VEaXJlY3Rpb24nLCAoKSA9PiB7XG4gICAgaWYgKCFzd2lwZXIucGFnaW5hdGlvbiB8fCAhc3dpcGVyLnBhZ2luYXRpb24uZWwpIHJldHVybjtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb247XG4gICAgbGV0IHtcbiAgICAgIGVsXG4gICAgfSA9IHN3aXBlci5wYWdpbmF0aW9uO1xuICAgIGVsID0gbWFrZUVsZW1lbnRzQXJyYXkoZWwpO1xuICAgIGVsLmZvckVhY2goc3ViRWwgPT4ge1xuICAgICAgc3ViRWwuY2xhc3NMaXN0LnJlbW92ZShwYXJhbXMuaG9yaXpvbnRhbENsYXNzLCBwYXJhbXMudmVydGljYWxDbGFzcyk7XG4gICAgICBzdWJFbC5jbGFzc0xpc3QuYWRkKHN3aXBlci5pc0hvcml6b250YWwoKSA/IHBhcmFtcy5ob3Jpem9udGFsQ2xhc3MgOiBwYXJhbXMudmVydGljYWxDbGFzcyk7XG4gICAgfSk7XG4gIH0pO1xuICBvbignaW5pdCcsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmVuYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmVcbiAgICAgIGRpc2FibGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaW5pdCgpO1xuICAgICAgcmVuZGVyKCk7XG4gICAgICB1cGRhdGUoKTtcbiAgICB9XG4gIH0pO1xuICBvbignYWN0aXZlSW5kZXhDaGFuZ2UnLCAoKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBzd2lwZXIuc25hcEluZGV4ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgdXBkYXRlKCk7XG4gICAgfVxuICB9KTtcbiAgb24oJ3NuYXBJbmRleENoYW5nZScsICgpID0+IHtcbiAgICB1cGRhdGUoKTtcbiAgfSk7XG4gIG9uKCdzbmFwR3JpZExlbmd0aENoYW5nZScsICgpID0+IHtcbiAgICByZW5kZXIoKTtcbiAgICB1cGRhdGUoKTtcbiAgfSk7XG4gIG9uKCdkZXN0cm95JywgKCkgPT4ge1xuICAgIGRlc3Ryb3koKTtcbiAgfSk7XG4gIG9uKCdlbmFibGUgZGlzYWJsZScsICgpID0+IHtcbiAgICBsZXQge1xuICAgICAgZWxcbiAgICB9ID0gc3dpcGVyLnBhZ2luYXRpb247XG4gICAgaWYgKGVsKSB7XG4gICAgICBlbCA9IG1ha2VFbGVtZW50c0FycmF5KGVsKTtcbiAgICAgIGVsLmZvckVhY2goc3ViRWwgPT4gc3ViRWwuY2xhc3NMaXN0W3N3aXBlci5lbmFibGVkID8gJ3JlbW92ZScgOiAnYWRkJ10oc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLmxvY2tDbGFzcykpO1xuICAgIH1cbiAgfSk7XG4gIG9uKCdsb2NrIHVubG9jaycsICgpID0+IHtcbiAgICB1cGRhdGUoKTtcbiAgfSk7XG4gIG9uKCdjbGljaycsIChfcywgZSkgPT4ge1xuICAgIGNvbnN0IHRhcmdldEVsID0gZS50YXJnZXQ7XG4gICAgY29uc3QgZWwgPSBtYWtlRWxlbWVudHNBcnJheShzd2lwZXIucGFnaW5hdGlvbi5lbCk7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5lbCAmJiBzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uaGlkZU9uQ2xpY2sgJiYgZWwgJiYgZWwubGVuZ3RoID4gMCAmJiAhdGFyZ2V0RWwuY2xhc3NMaXN0LmNvbnRhaW5zKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5idWxsZXRDbGFzcykpIHtcbiAgICAgIGlmIChzd2lwZXIubmF2aWdhdGlvbiAmJiAoc3dpcGVyLm5hdmlnYXRpb24ubmV4dEVsICYmIHRhcmdldEVsID09PSBzd2lwZXIubmF2aWdhdGlvbi5uZXh0RWwgfHwgc3dpcGVyLm5hdmlnYXRpb24ucHJldkVsICYmIHRhcmdldEVsID09PSBzd2lwZXIubmF2aWdhdGlvbi5wcmV2RWwpKSByZXR1cm47XG4gICAgICBjb25zdCBpc0hpZGRlbiA9IGVsWzBdLmNsYXNzTGlzdC5jb250YWlucyhzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24uaGlkZGVuQ2xhc3MpO1xuICAgICAgaWYgKGlzSGlkZGVuID09PSB0cnVlKSB7XG4gICAgICAgIGVtaXQoJ3BhZ2luYXRpb25TaG93Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbWl0KCdwYWdpbmF0aW9uSGlkZScpO1xuICAgICAgfVxuICAgICAgZWwuZm9yRWFjaChzdWJFbCA9PiBzdWJFbC5jbGFzc0xpc3QudG9nZ2xlKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5oaWRkZW5DbGFzcykpO1xuICAgIH1cbiAgfSk7XG4gIGNvbnN0IGVuYWJsZSA9ICgpID0+IHtcbiAgICBzd2lwZXIuZWwuY2xhc3NMaXN0LnJlbW92ZShzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24ucGFnaW5hdGlvbkRpc2FibGVkQ2xhc3MpO1xuICAgIGxldCB7XG4gICAgICBlbFxuICAgIH0gPSBzd2lwZXIucGFnaW5hdGlvbjtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsID0gbWFrZUVsZW1lbnRzQXJyYXkoZWwpO1xuICAgICAgZWwuZm9yRWFjaChzdWJFbCA9PiBzdWJFbC5jbGFzc0xpc3QucmVtb3ZlKHN3aXBlci5wYXJhbXMucGFnaW5hdGlvbi5wYWdpbmF0aW9uRGlzYWJsZWRDbGFzcykpO1xuICAgIH1cbiAgICBpbml0KCk7XG4gICAgcmVuZGVyKCk7XG4gICAgdXBkYXRlKCk7XG4gIH07XG4gIGNvbnN0IGRpc2FibGUgPSAoKSA9PiB7XG4gICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5hZGQoc3dpcGVyLnBhcmFtcy5wYWdpbmF0aW9uLnBhZ2luYXRpb25EaXNhYmxlZENsYXNzKTtcbiAgICBsZXQge1xuICAgICAgZWxcbiAgICB9ID0gc3dpcGVyLnBhZ2luYXRpb247XG4gICAgaWYgKGVsKSB7XG4gICAgICBlbCA9IG1ha2VFbGVtZW50c0FycmF5KGVsKTtcbiAgICAgIGVsLmZvckVhY2goc3ViRWwgPT4gc3ViRWwuY2xhc3NMaXN0LmFkZChzd2lwZXIucGFyYW1zLnBhZ2luYXRpb24ucGFnaW5hdGlvbkRpc2FibGVkQ2xhc3MpKTtcbiAgICB9XG4gICAgZGVzdHJveSgpO1xuICB9O1xuICBPYmplY3QuYXNzaWduKHN3aXBlci5wYWdpbmF0aW9uLCB7XG4gICAgZW5hYmxlLFxuICAgIGRpc2FibGUsXG4gICAgcmVuZGVyLFxuICAgIHVwZGF0ZSxcbiAgICBpbml0LFxuICAgIGRlc3Ryb3lcbiAgfSk7XG59XG5cbmV4cG9ydCB7IFBhZ2luYXRpb24gYXMgZGVmYXVsdCB9O1xuIiwgImltcG9ydCB7IGcgYXMgZ2V0RG9jdW1lbnQgfSBmcm9tICcuLi9zaGFyZWQvc3NyLXdpbmRvdy5lc20ubWpzJztcbmltcG9ydCB7IGggYXMgY2xhc3Nlc1RvVG9rZW5zLCBjIGFzIGNyZWF0ZUVsZW1lbnQsIG4gYXMgbmV4dFRpY2ssIGIgYXMgZWxlbWVudE9mZnNldCB9IGZyb20gJy4uL3NoYXJlZC91dGlscy5tanMnO1xuaW1wb3J0IHsgYyBhcyBjcmVhdGVFbGVtZW50SWZOb3REZWZpbmVkIH0gZnJvbSAnLi4vc2hhcmVkL2NyZWF0ZS1lbGVtZW50LWlmLW5vdC1kZWZpbmVkLm1qcyc7XG5pbXBvcnQgeyBjIGFzIGNsYXNzZXNUb1NlbGVjdG9yIH0gZnJvbSAnLi4vc2hhcmVkL2NsYXNzZXMtdG8tc2VsZWN0b3IubWpzJztcblxuZnVuY3Rpb24gU2Nyb2xsYmFyKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgZXh0ZW5kUGFyYW1zLFxuICAgIG9uLFxuICAgIGVtaXRcbiAgfSA9IF9yZWY7XG4gIGNvbnN0IGRvY3VtZW50ID0gZ2V0RG9jdW1lbnQoKTtcbiAgbGV0IGlzVG91Y2hlZCA9IGZhbHNlO1xuICBsZXQgdGltZW91dCA9IG51bGw7XG4gIGxldCBkcmFnVGltZW91dCA9IG51bGw7XG4gIGxldCBkcmFnU3RhcnRQb3M7XG4gIGxldCBkcmFnU2l6ZTtcbiAgbGV0IHRyYWNrU2l6ZTtcbiAgbGV0IGRpdmlkZXI7XG4gIGV4dGVuZFBhcmFtcyh7XG4gICAgc2Nyb2xsYmFyOiB7XG4gICAgICBlbDogbnVsbCxcbiAgICAgIGRyYWdTaXplOiAnYXV0bycsXG4gICAgICBoaWRlOiBmYWxzZSxcbiAgICAgIGRyYWdnYWJsZTogZmFsc2UsXG4gICAgICBzbmFwT25SZWxlYXNlOiB0cnVlLFxuICAgICAgbG9ja0NsYXNzOiAnc3dpcGVyLXNjcm9sbGJhci1sb2NrJyxcbiAgICAgIGRyYWdDbGFzczogJ3N3aXBlci1zY3JvbGxiYXItZHJhZycsXG4gICAgICBzY3JvbGxiYXJEaXNhYmxlZENsYXNzOiAnc3dpcGVyLXNjcm9sbGJhci1kaXNhYmxlZCcsXG4gICAgICBob3Jpem9udGFsQ2xhc3M6IGBzd2lwZXItc2Nyb2xsYmFyLWhvcml6b250YWxgLFxuICAgICAgdmVydGljYWxDbGFzczogYHN3aXBlci1zY3JvbGxiYXItdmVydGljYWxgXG4gICAgfVxuICB9KTtcbiAgc3dpcGVyLnNjcm9sbGJhciA9IHtcbiAgICBlbDogbnVsbCxcbiAgICBkcmFnRWw6IG51bGxcbiAgfTtcbiAgZnVuY3Rpb24gc2V0VHJhbnNsYXRlKCkge1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwgfHwgIXN3aXBlci5zY3JvbGxiYXIuZWwpIHJldHVybjtcbiAgICBjb25zdCB7XG4gICAgICBzY3JvbGxiYXIsXG4gICAgICBydGxUcmFuc2xhdGU6IHJ0bFxuICAgIH0gPSBzd2lwZXI7XG4gICAgY29uc3Qge1xuICAgICAgZHJhZ0VsLFxuICAgICAgZWxcbiAgICB9ID0gc2Nyb2xsYmFyO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyO1xuICAgIGNvbnN0IHByb2dyZXNzID0gc3dpcGVyLnBhcmFtcy5sb29wID8gc3dpcGVyLnByb2dyZXNzTG9vcCA6IHN3aXBlci5wcm9ncmVzcztcbiAgICBsZXQgbmV3U2l6ZSA9IGRyYWdTaXplO1xuICAgIGxldCBuZXdQb3MgPSAodHJhY2tTaXplIC0gZHJhZ1NpemUpICogcHJvZ3Jlc3M7XG4gICAgaWYgKHJ0bCkge1xuICAgICAgbmV3UG9zID0gLW5ld1BvcztcbiAgICAgIGlmIChuZXdQb3MgPiAwKSB7XG4gICAgICAgIG5ld1NpemUgPSBkcmFnU2l6ZSAtIG5ld1BvcztcbiAgICAgICAgbmV3UG9zID0gMDtcbiAgICAgIH0gZWxzZSBpZiAoLW5ld1BvcyArIGRyYWdTaXplID4gdHJhY2tTaXplKSB7XG4gICAgICAgIG5ld1NpemUgPSB0cmFja1NpemUgKyBuZXdQb3M7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChuZXdQb3MgPCAwKSB7XG4gICAgICBuZXdTaXplID0gZHJhZ1NpemUgKyBuZXdQb3M7XG4gICAgICBuZXdQb3MgPSAwO1xuICAgIH0gZWxzZSBpZiAobmV3UG9zICsgZHJhZ1NpemUgPiB0cmFja1NpemUpIHtcbiAgICAgIG5ld1NpemUgPSB0cmFja1NpemUgLSBuZXdQb3M7XG4gICAgfVxuICAgIGlmIChzd2lwZXIuaXNIb3Jpem9udGFsKCkpIHtcbiAgICAgIGRyYWdFbC5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoJHtuZXdQb3N9cHgsIDAsIDApYDtcbiAgICAgIGRyYWdFbC5zdHlsZS53aWR0aCA9IGAke25ld1NpemV9cHhgO1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnRWwuc3R5bGUudHJhbnNmb3JtID0gYHRyYW5zbGF0ZTNkKDBweCwgJHtuZXdQb3N9cHgsIDApYDtcbiAgICAgIGRyYWdFbC5zdHlsZS5oZWlnaHQgPSBgJHtuZXdTaXplfXB4YDtcbiAgICB9XG4gICAgaWYgKHBhcmFtcy5oaWRlKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gMTtcbiAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgZWwuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICc0MDBtcyc7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gc2V0VHJhbnNpdGlvbihkdXJhdGlvbikge1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZWwgfHwgIXN3aXBlci5zY3JvbGxiYXIuZWwpIHJldHVybjtcbiAgICBzd2lwZXIuc2Nyb2xsYmFyLmRyYWdFbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSBgJHtkdXJhdGlvbn1tc2A7XG4gIH1cbiAgZnVuY3Rpb24gdXBkYXRlU2l6ZSgpIHtcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsIHx8ICFzd2lwZXIuc2Nyb2xsYmFyLmVsKSByZXR1cm47XG4gICAgY29uc3Qge1xuICAgICAgc2Nyb2xsYmFyXG4gICAgfSA9IHN3aXBlcjtcbiAgICBjb25zdCB7XG4gICAgICBkcmFnRWwsXG4gICAgICBlbFxuICAgIH0gPSBzY3JvbGxiYXI7XG4gICAgZHJhZ0VsLnN0eWxlLndpZHRoID0gJyc7XG4gICAgZHJhZ0VsLnN0eWxlLmhlaWdodCA9ICcnO1xuICAgIHRyYWNrU2l6ZSA9IHN3aXBlci5pc0hvcml6b250YWwoKSA/IGVsLm9mZnNldFdpZHRoIDogZWwub2Zmc2V0SGVpZ2h0O1xuICAgIGRpdmlkZXIgPSBzd2lwZXIuc2l6ZSAvIChzd2lwZXIudmlydHVhbFNpemUgKyBzd2lwZXIucGFyYW1zLnNsaWRlc09mZnNldEJlZm9yZSAtIChzd2lwZXIucGFyYW1zLmNlbnRlcmVkU2xpZGVzID8gc3dpcGVyLnNuYXBHcmlkWzBdIDogMCkpO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5kcmFnU2l6ZSA9PT0gJ2F1dG8nKSB7XG4gICAgICBkcmFnU2l6ZSA9IHRyYWNrU2l6ZSAqIGRpdmlkZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRyYWdTaXplID0gcGFyc2VJbnQoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ1NpemUsIDEwKTtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5pc0hvcml6b250YWwoKSkge1xuICAgICAgZHJhZ0VsLnN0eWxlLndpZHRoID0gYCR7ZHJhZ1NpemV9cHhgO1xuICAgIH0gZWxzZSB7XG4gICAgICBkcmFnRWwuc3R5bGUuaGVpZ2h0ID0gYCR7ZHJhZ1NpemV9cHhgO1xuICAgIH1cbiAgICBpZiAoZGl2aWRlciA+PSAxKSB7XG4gICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJyc7XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5oaWRlKSB7XG4gICAgICBlbC5zdHlsZS5vcGFjaXR5ID0gMDtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMud2F0Y2hPdmVyZmxvdyAmJiBzd2lwZXIuZW5hYmxlZCkge1xuICAgICAgc2Nyb2xsYmFyLmVsLmNsYXNzTGlzdFtzd2lwZXIuaXNMb2NrZWQgPyAnYWRkJyA6ICdyZW1vdmUnXShzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5sb2NrQ2xhc3MpO1xuICAgIH1cbiAgfVxuICBmdW5jdGlvbiBnZXRQb2ludGVyUG9zaXRpb24oZSkge1xuICAgIHJldHVybiBzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBlLmNsaWVudFggOiBlLmNsaWVudFk7XG4gIH1cbiAgZnVuY3Rpb24gc2V0RHJhZ1Bvc2l0aW9uKGUpIHtcbiAgICBjb25zdCB7XG4gICAgICBzY3JvbGxiYXIsXG4gICAgICBydGxUcmFuc2xhdGU6IHJ0bFxuICAgIH0gPSBzd2lwZXI7XG4gICAgY29uc3Qge1xuICAgICAgZWxcbiAgICB9ID0gc2Nyb2xsYmFyO1xuICAgIGxldCBwb3NpdGlvblJhdGlvO1xuICAgIHBvc2l0aW9uUmF0aW8gPSAoZ2V0UG9pbnRlclBvc2l0aW9uKGUpIC0gZWxlbWVudE9mZnNldChlbClbc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gJ2xlZnQnIDogJ3RvcCddIC0gKGRyYWdTdGFydFBvcyAhPT0gbnVsbCA/IGRyYWdTdGFydFBvcyA6IGRyYWdTaXplIC8gMikpIC8gKHRyYWNrU2l6ZSAtIGRyYWdTaXplKTtcbiAgICBwb3NpdGlvblJhdGlvID0gTWF0aC5tYXgoTWF0aC5taW4ocG9zaXRpb25SYXRpbywgMSksIDApO1xuICAgIGlmIChydGwpIHtcbiAgICAgIHBvc2l0aW9uUmF0aW8gPSAxIC0gcG9zaXRpb25SYXRpbztcbiAgICB9XG4gICAgY29uc3QgcG9zaXRpb24gPSBzd2lwZXIubWluVHJhbnNsYXRlKCkgKyAoc3dpcGVyLm1heFRyYW5zbGF0ZSgpIC0gc3dpcGVyLm1pblRyYW5zbGF0ZSgpKSAqIHBvc2l0aW9uUmF0aW87XG4gICAgc3dpcGVyLnVwZGF0ZVByb2dyZXNzKHBvc2l0aW9uKTtcbiAgICBzd2lwZXIuc2V0VHJhbnNsYXRlKHBvc2l0aW9uKTtcbiAgICBzd2lwZXIudXBkYXRlQWN0aXZlSW5kZXgoKTtcbiAgICBzd2lwZXIudXBkYXRlU2xpZGVzQ2xhc3NlcygpO1xuICB9XG4gIGZ1bmN0aW9uIG9uRHJhZ1N0YXJ0KGUpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICBjb25zdCB7XG4gICAgICBzY3JvbGxiYXIsXG4gICAgICB3cmFwcGVyRWxcbiAgICB9ID0gc3dpcGVyO1xuICAgIGNvbnN0IHtcbiAgICAgIGVsLFxuICAgICAgZHJhZ0VsXG4gICAgfSA9IHNjcm9sbGJhcjtcbiAgICBpc1RvdWNoZWQgPSB0cnVlO1xuICAgIGRyYWdTdGFydFBvcyA9IGUudGFyZ2V0ID09PSBkcmFnRWwgPyBnZXRQb2ludGVyUG9zaXRpb24oZSkgLSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVtzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyAnbGVmdCcgOiAndG9wJ10gOiBudWxsO1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIHdyYXBwZXJFbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnMTAwbXMnO1xuICAgIGRyYWdFbC5zdHlsZS50cmFuc2l0aW9uRHVyYXRpb24gPSAnMTAwbXMnO1xuICAgIHNldERyYWdQb3NpdGlvbihlKTtcbiAgICBjbGVhclRpbWVvdXQoZHJhZ1RpbWVvdXQpO1xuICAgIGVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcwbXMnO1xuICAgIGlmIChwYXJhbXMuaGlkZSkge1xuICAgICAgZWwuc3R5bGUub3BhY2l0eSA9IDE7XG4gICAgfVxuICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGVbJ3Njcm9sbC1zbmFwLXR5cGUnXSA9ICdub25lJztcbiAgICB9XG4gICAgZW1pdCgnc2Nyb2xsYmFyRHJhZ1N0YXJ0JywgZSk7XG4gIH1cbiAgZnVuY3Rpb24gb25EcmFnTW92ZShlKSB7XG4gICAgY29uc3Qge1xuICAgICAgc2Nyb2xsYmFyLFxuICAgICAgd3JhcHBlckVsXG4gICAgfSA9IHN3aXBlcjtcbiAgICBjb25zdCB7XG4gICAgICBlbCxcbiAgICAgIGRyYWdFbFxuICAgIH0gPSBzY3JvbGxiYXI7XG4gICAgaWYgKCFpc1RvdWNoZWQpIHJldHVybjtcbiAgICBpZiAoZS5wcmV2ZW50RGVmYXVsdCkgZS5wcmV2ZW50RGVmYXVsdCgpO2Vsc2UgZS5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICAgIHNldERyYWdQb3NpdGlvbihlKTtcbiAgICB3cmFwcGVyRWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzBtcyc7XG4gICAgZWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gJzBtcyc7XG4gICAgZHJhZ0VsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcwbXMnO1xuICAgIGVtaXQoJ3Njcm9sbGJhckRyYWdNb3ZlJywgZSk7XG4gIH1cbiAgZnVuY3Rpb24gb25EcmFnRW5kKGUpIHtcbiAgICBjb25zdCBwYXJhbXMgPSBzd2lwZXIucGFyYW1zLnNjcm9sbGJhcjtcbiAgICBjb25zdCB7XG4gICAgICBzY3JvbGxiYXIsXG4gICAgICB3cmFwcGVyRWxcbiAgICB9ID0gc3dpcGVyO1xuICAgIGNvbnN0IHtcbiAgICAgIGVsXG4gICAgfSA9IHNjcm9sbGJhcjtcbiAgICBpZiAoIWlzVG91Y2hlZCkgcmV0dXJuO1xuICAgIGlzVG91Y2hlZCA9IGZhbHNlO1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgIHN3aXBlci53cmFwcGVyRWwuc3R5bGVbJ3Njcm9sbC1zbmFwLXR5cGUnXSA9ICcnO1xuICAgICAgd3JhcHBlckVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICcnO1xuICAgIH1cbiAgICBpZiAocGFyYW1zLmhpZGUpIHtcbiAgICAgIGNsZWFyVGltZW91dChkcmFnVGltZW91dCk7XG4gICAgICBkcmFnVGltZW91dCA9IG5leHRUaWNrKCgpID0+IHtcbiAgICAgICAgZWwuc3R5bGUub3BhY2l0eSA9IDA7XG4gICAgICAgIGVsLnN0eWxlLnRyYW5zaXRpb25EdXJhdGlvbiA9ICc0MDBtcyc7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9XG4gICAgZW1pdCgnc2Nyb2xsYmFyRHJhZ0VuZCcsIGUpO1xuICAgIGlmIChwYXJhbXMuc25hcE9uUmVsZWFzZSkge1xuICAgICAgc3dpcGVyLnNsaWRlVG9DbG9zZXN0KCk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGV2ZW50cyhtZXRob2QpIHtcbiAgICBjb25zdCB7XG4gICAgICBzY3JvbGxiYXIsXG4gICAgICBwYXJhbXNcbiAgICB9ID0gc3dpcGVyO1xuICAgIGNvbnN0IGVsID0gc2Nyb2xsYmFyLmVsO1xuICAgIGlmICghZWwpIHJldHVybjtcbiAgICBjb25zdCB0YXJnZXQgPSBlbDtcbiAgICBjb25zdCBhY3RpdmVMaXN0ZW5lciA9IHBhcmFtcy5wYXNzaXZlTGlzdGVuZXJzID8ge1xuICAgICAgcGFzc2l2ZTogZmFsc2UsXG4gICAgICBjYXB0dXJlOiBmYWxzZVxuICAgIH0gOiBmYWxzZTtcbiAgICBjb25zdCBwYXNzaXZlTGlzdGVuZXIgPSBwYXJhbXMucGFzc2l2ZUxpc3RlbmVycyA/IHtcbiAgICAgIHBhc3NpdmU6IHRydWUsXG4gICAgICBjYXB0dXJlOiBmYWxzZVxuICAgIH0gOiBmYWxzZTtcbiAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xuICAgIGNvbnN0IGV2ZW50TWV0aG9kID0gbWV0aG9kID09PSAnb24nID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ3JlbW92ZUV2ZW50TGlzdGVuZXInO1xuICAgIHRhcmdldFtldmVudE1ldGhvZF0oJ3BvaW50ZXJkb3duJywgb25EcmFnU3RhcnQsIGFjdGl2ZUxpc3RlbmVyKTtcbiAgICBkb2N1bWVudFtldmVudE1ldGhvZF0oJ3BvaW50ZXJtb3ZlJywgb25EcmFnTW92ZSwgYWN0aXZlTGlzdGVuZXIpO1xuICAgIGRvY3VtZW50W2V2ZW50TWV0aG9kXSgncG9pbnRlcnVwJywgb25EcmFnRW5kLCBwYXNzaXZlTGlzdGVuZXIpO1xuICB9XG4gIGZ1bmN0aW9uIGVuYWJsZURyYWdnYWJsZSgpIHtcbiAgICBpZiAoIXN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmVsIHx8ICFzd2lwZXIuc2Nyb2xsYmFyLmVsKSByZXR1cm47XG4gICAgZXZlbnRzKCdvbicpO1xuICB9XG4gIGZ1bmN0aW9uIGRpc2FibGVEcmFnZ2FibGUoKSB7XG4gICAgaWYgKCFzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5lbCB8fCAhc3dpcGVyLnNjcm9sbGJhci5lbCkgcmV0dXJuO1xuICAgIGV2ZW50cygnb2ZmJyk7XG4gIH1cbiAgZnVuY3Rpb24gaW5pdCgpIHtcbiAgICBjb25zdCB7XG4gICAgICBzY3JvbGxiYXIsXG4gICAgICBlbDogc3dpcGVyRWxcbiAgICB9ID0gc3dpcGVyO1xuICAgIHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyID0gY3JlYXRlRWxlbWVudElmTm90RGVmaW5lZChzd2lwZXIsIHN3aXBlci5vcmlnaW5hbFBhcmFtcy5zY3JvbGxiYXIsIHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLCB7XG4gICAgICBlbDogJ3N3aXBlci1zY3JvbGxiYXInXG4gICAgfSk7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XG4gICAgaWYgKCFwYXJhbXMuZWwpIHJldHVybjtcbiAgICBsZXQgZWw7XG4gICAgaWYgKHR5cGVvZiBwYXJhbXMuZWwgPT09ICdzdHJpbmcnICYmIHN3aXBlci5pc0VsZW1lbnQpIHtcbiAgICAgIGVsID0gc3dpcGVyLmVsLnF1ZXJ5U2VsZWN0b3IocGFyYW1zLmVsKTtcbiAgICB9XG4gICAgaWYgKCFlbCAmJiB0eXBlb2YgcGFyYW1zLmVsID09PSAnc3RyaW5nJykge1xuICAgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHBhcmFtcy5lbCk7XG4gICAgICBpZiAoIWVsLmxlbmd0aCkgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAoIWVsKSB7XG4gICAgICBlbCA9IHBhcmFtcy5lbDtcbiAgICB9XG4gICAgaWYgKHN3aXBlci5wYXJhbXMudW5pcXVlTmF2RWxlbWVudHMgJiYgdHlwZW9mIHBhcmFtcy5lbCA9PT0gJ3N0cmluZycgJiYgZWwubGVuZ3RoID4gMSAmJiBzd2lwZXJFbC5xdWVyeVNlbGVjdG9yQWxsKHBhcmFtcy5lbCkubGVuZ3RoID09PSAxKSB7XG4gICAgICBlbCA9IHN3aXBlckVsLnF1ZXJ5U2VsZWN0b3IocGFyYW1zLmVsKTtcbiAgICB9XG4gICAgaWYgKGVsLmxlbmd0aCA+IDApIGVsID0gZWxbMF07XG4gICAgZWwuY2xhc3NMaXN0LmFkZChzd2lwZXIuaXNIb3Jpem9udGFsKCkgPyBwYXJhbXMuaG9yaXpvbnRhbENsYXNzIDogcGFyYW1zLnZlcnRpY2FsQ2xhc3MpO1xuICAgIGxldCBkcmFnRWw7XG4gICAgaWYgKGVsKSB7XG4gICAgICBkcmFnRWwgPSBlbC5xdWVyeVNlbGVjdG9yKGNsYXNzZXNUb1NlbGVjdG9yKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLmRyYWdDbGFzcykpO1xuICAgICAgaWYgKCFkcmFnRWwpIHtcbiAgICAgICAgZHJhZ0VsID0gY3JlYXRlRWxlbWVudCgnZGl2Jywgc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZHJhZ0NsYXNzKTtcbiAgICAgICAgZWwuYXBwZW5kKGRyYWdFbCk7XG4gICAgICB9XG4gICAgfVxuICAgIE9iamVjdC5hc3NpZ24oc2Nyb2xsYmFyLCB7XG4gICAgICBlbCxcbiAgICAgIGRyYWdFbFxuICAgIH0pO1xuICAgIGlmIChwYXJhbXMuZHJhZ2dhYmxlKSB7XG4gICAgICBlbmFibGVEcmFnZ2FibGUoKTtcbiAgICB9XG4gICAgaWYgKGVsKSB7XG4gICAgICBlbC5jbGFzc0xpc3Rbc3dpcGVyLmVuYWJsZWQgPyAncmVtb3ZlJyA6ICdhZGQnXSguLi5jbGFzc2VzVG9Ub2tlbnMoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIubG9ja0NsYXNzKSk7XG4gICAgfVxuICB9XG4gIGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgY29uc3QgcGFyYW1zID0gc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXI7XG4gICAgY29uc3QgZWwgPSBzd2lwZXIuc2Nyb2xsYmFyLmVsO1xuICAgIGlmIChlbCkge1xuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSguLi5jbGFzc2VzVG9Ub2tlbnMoc3dpcGVyLmlzSG9yaXpvbnRhbCgpID8gcGFyYW1zLmhvcml6b250YWxDbGFzcyA6IHBhcmFtcy52ZXJ0aWNhbENsYXNzKSk7XG4gICAgfVxuICAgIGRpc2FibGVEcmFnZ2FibGUoKTtcbiAgfVxuICBvbignaW5pdCcsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5zY3JvbGxiYXIuZW5hYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICAgICAgZGlzYWJsZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpbml0KCk7XG4gICAgICB1cGRhdGVTaXplKCk7XG4gICAgICBzZXRUcmFuc2xhdGUoKTtcbiAgICB9XG4gIH0pO1xuICBvbigndXBkYXRlIHJlc2l6ZSBvYnNlcnZlclVwZGF0ZSBsb2NrIHVubG9jaycsICgpID0+IHtcbiAgICB1cGRhdGVTaXplKCk7XG4gIH0pO1xuICBvbignc2V0VHJhbnNsYXRlJywgKCkgPT4ge1xuICAgIHNldFRyYW5zbGF0ZSgpO1xuICB9KTtcbiAgb24oJ3NldFRyYW5zaXRpb24nLCAoX3MsIGR1cmF0aW9uKSA9PiB7XG4gICAgc2V0VHJhbnNpdGlvbihkdXJhdGlvbik7XG4gIH0pO1xuICBvbignZW5hYmxlIGRpc2FibGUnLCAoKSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgZWxcbiAgICB9ID0gc3dpcGVyLnNjcm9sbGJhcjtcbiAgICBpZiAoZWwpIHtcbiAgICAgIGVsLmNsYXNzTGlzdFtzd2lwZXIuZW5hYmxlZCA/ICdyZW1vdmUnIDogJ2FkZCddKC4uLmNsYXNzZXNUb1Rva2Vucyhzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5sb2NrQ2xhc3MpKTtcbiAgICB9XG4gIH0pO1xuICBvbignZGVzdHJveScsICgpID0+IHtcbiAgICBkZXN0cm95KCk7XG4gIH0pO1xuICBjb25zdCBlbmFibGUgPSAoKSA9PiB7XG4gICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5yZW1vdmUoLi4uY2xhc3Nlc1RvVG9rZW5zKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLnNjcm9sbGJhckRpc2FibGVkQ2xhc3MpKTtcbiAgICBpZiAoc3dpcGVyLnNjcm9sbGJhci5lbCkge1xuICAgICAgc3dpcGVyLnNjcm9sbGJhci5lbC5jbGFzc0xpc3QucmVtb3ZlKC4uLmNsYXNzZXNUb1Rva2Vucyhzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5zY3JvbGxiYXJEaXNhYmxlZENsYXNzKSk7XG4gICAgfVxuICAgIGluaXQoKTtcbiAgICB1cGRhdGVTaXplKCk7XG4gICAgc2V0VHJhbnNsYXRlKCk7XG4gIH07XG4gIGNvbnN0IGRpc2FibGUgPSAoKSA9PiB7XG4gICAgc3dpcGVyLmVsLmNsYXNzTGlzdC5hZGQoLi4uY2xhc3Nlc1RvVG9rZW5zKHN3aXBlci5wYXJhbXMuc2Nyb2xsYmFyLnNjcm9sbGJhckRpc2FibGVkQ2xhc3MpKTtcbiAgICBpZiAoc3dpcGVyLnNjcm9sbGJhci5lbCkge1xuICAgICAgc3dpcGVyLnNjcm9sbGJhci5lbC5jbGFzc0xpc3QuYWRkKC4uLmNsYXNzZXNUb1Rva2Vucyhzd2lwZXIucGFyYW1zLnNjcm9sbGJhci5zY3JvbGxiYXJEaXNhYmxlZENsYXNzKSk7XG4gICAgfVxuICAgIGRlc3Ryb3koKTtcbiAgfTtcbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIuc2Nyb2xsYmFyLCB7XG4gICAgZW5hYmxlLFxuICAgIGRpc2FibGUsXG4gICAgdXBkYXRlU2l6ZSxcbiAgICBzZXRUcmFuc2xhdGUsXG4gICAgaW5pdCxcbiAgICBkZXN0cm95XG4gIH0pO1xufVxuXG5leHBvcnQgeyBTY3JvbGxiYXIgYXMgZGVmYXVsdCB9O1xuIiwgImltcG9ydCB7IGcgYXMgZ2V0RG9jdW1lbnQgfSBmcm9tICcuLi9zaGFyZWQvc3NyLXdpbmRvdy5lc20ubWpzJztcblxuLyogZXNsaW50IG5vLXVuZGVyc2NvcmUtZGFuZ2xlOiBcIm9mZlwiICovXG4vKiBlc2xpbnQgbm8tdXNlLWJlZm9yZS1kZWZpbmU6IFwib2ZmXCIgKi9cbmZ1bmN0aW9uIEF1dG9wbGF5KF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgZXh0ZW5kUGFyYW1zLFxuICAgIG9uLFxuICAgIGVtaXQsXG4gICAgcGFyYW1zXG4gIH0gPSBfcmVmO1xuICBzd2lwZXIuYXV0b3BsYXkgPSB7XG4gICAgcnVubmluZzogZmFsc2UsXG4gICAgcGF1c2VkOiBmYWxzZSxcbiAgICB0aW1lTGVmdDogMFxuICB9O1xuICBleHRlbmRQYXJhbXMoe1xuICAgIGF1dG9wbGF5OiB7XG4gICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgIGRlbGF5OiAzMDAwLFxuICAgICAgd2FpdEZvclRyYW5zaXRpb246IHRydWUsXG4gICAgICBkaXNhYmxlT25JbnRlcmFjdGlvbjogZmFsc2UsXG4gICAgICBzdG9wT25MYXN0U2xpZGU6IGZhbHNlLFxuICAgICAgcmV2ZXJzZURpcmVjdGlvbjogZmFsc2UsXG4gICAgICBwYXVzZU9uTW91c2VFbnRlcjogZmFsc2VcbiAgICB9XG4gIH0pO1xuICBsZXQgdGltZW91dDtcbiAgbGV0IHJhZjtcbiAgbGV0IGF1dG9wbGF5RGVsYXlUb3RhbCA9IHBhcmFtcyAmJiBwYXJhbXMuYXV0b3BsYXkgPyBwYXJhbXMuYXV0b3BsYXkuZGVsYXkgOiAzMDAwO1xuICBsZXQgYXV0b3BsYXlEZWxheUN1cnJlbnQgPSBwYXJhbXMgJiYgcGFyYW1zLmF1dG9wbGF5ID8gcGFyYW1zLmF1dG9wbGF5LmRlbGF5IDogMzAwMDtcbiAgbGV0IGF1dG9wbGF5VGltZUxlZnQ7XG4gIGxldCBhdXRvcGxheVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICBsZXQgd2FzUGF1c2VkO1xuICBsZXQgaXNUb3VjaGVkO1xuICBsZXQgcGF1c2VkQnlUb3VjaDtcbiAgbGV0IHRvdWNoU3RhcnRUaW1lb3V0O1xuICBsZXQgc2xpZGVDaGFuZ2VkO1xuICBsZXQgcGF1c2VkQnlJbnRlcmFjdGlvbjtcbiAgbGV0IHBhdXNlZEJ5UG9pbnRlckVudGVyO1xuICBmdW5jdGlvbiBvblRyYW5zaXRpb25FbmQoZSkge1xuICAgIGlmICghc3dpcGVyIHx8IHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci53cmFwcGVyRWwpIHJldHVybjtcbiAgICBpZiAoZS50YXJnZXQgIT09IHN3aXBlci53cmFwcGVyRWwpIHJldHVybjtcbiAgICBzd2lwZXIud3JhcHBlckVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBvblRyYW5zaXRpb25FbmQpO1xuICAgIGlmIChwYXVzZWRCeVBvaW50ZXJFbnRlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZXN1bWUoKTtcbiAgfVxuICBjb25zdCBjYWxjVGltZUxlZnQgPSAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSByZXR1cm47XG4gICAgaWYgKHN3aXBlci5hdXRvcGxheS5wYXVzZWQpIHtcbiAgICAgIHdhc1BhdXNlZCA9IHRydWU7XG4gICAgfSBlbHNlIGlmICh3YXNQYXVzZWQpIHtcbiAgICAgIGF1dG9wbGF5RGVsYXlDdXJyZW50ID0gYXV0b3BsYXlUaW1lTGVmdDtcbiAgICAgIHdhc1BhdXNlZCA9IGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCB0aW1lTGVmdCA9IHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPyBhdXRvcGxheVRpbWVMZWZ0IDogYXV0b3BsYXlTdGFydFRpbWUgKyBhdXRvcGxheURlbGF5Q3VycmVudCAtIG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHN3aXBlci5hdXRvcGxheS50aW1lTGVmdCA9IHRpbWVMZWZ0O1xuICAgIGVtaXQoJ2F1dG9wbGF5VGltZUxlZnQnLCB0aW1lTGVmdCwgdGltZUxlZnQgLyBhdXRvcGxheURlbGF5VG90YWwpO1xuICAgIHJhZiA9IHJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICBjYWxjVGltZUxlZnQoKTtcbiAgICB9KTtcbiAgfTtcbiAgY29uc3QgZ2V0U2xpZGVEZWxheSA9ICgpID0+IHtcbiAgICBsZXQgYWN0aXZlU2xpZGVFbDtcbiAgICBpZiAoc3dpcGVyLnZpcnR1YWwgJiYgc3dpcGVyLnBhcmFtcy52aXJ0dWFsLmVuYWJsZWQpIHtcbiAgICAgIGFjdGl2ZVNsaWRlRWwgPSBzd2lwZXIuc2xpZGVzLmZpbHRlcihzbGlkZUVsID0+IHNsaWRlRWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdzd2lwZXItc2xpZGUtYWN0aXZlJykpWzBdO1xuICAgIH0gZWxzZSB7XG4gICAgICBhY3RpdmVTbGlkZUVsID0gc3dpcGVyLnNsaWRlc1tzd2lwZXIuYWN0aXZlSW5kZXhdO1xuICAgIH1cbiAgICBpZiAoIWFjdGl2ZVNsaWRlRWwpIHJldHVybiB1bmRlZmluZWQ7XG4gICAgY29uc3QgY3VycmVudFNsaWRlRGVsYXkgPSBwYXJzZUludChhY3RpdmVTbGlkZUVsLmdldEF0dHJpYnV0ZSgnZGF0YS1zd2lwZXItYXV0b3BsYXknKSwgMTApO1xuICAgIHJldHVybiBjdXJyZW50U2xpZGVEZWxheTtcbiAgfTtcbiAgY29uc3QgcnVuID0gZGVsYXlGb3JjZSA9PiB7XG4gICAgaWYgKHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSByZXR1cm47XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmKTtcbiAgICBjYWxjVGltZUxlZnQoKTtcbiAgICBsZXQgZGVsYXkgPSB0eXBlb2YgZGVsYXlGb3JjZSA9PT0gJ3VuZGVmaW5lZCcgPyBzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRlbGF5IDogZGVsYXlGb3JjZTtcbiAgICBhdXRvcGxheURlbGF5VG90YWwgPSBzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRlbGF5O1xuICAgIGF1dG9wbGF5RGVsYXlDdXJyZW50ID0gc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kZWxheTtcbiAgICBjb25zdCBjdXJyZW50U2xpZGVEZWxheSA9IGdldFNsaWRlRGVsYXkoKTtcbiAgICBpZiAoIU51bWJlci5pc05hTihjdXJyZW50U2xpZGVEZWxheSkgJiYgY3VycmVudFNsaWRlRGVsYXkgPiAwICYmIHR5cGVvZiBkZWxheUZvcmNlID09PSAndW5kZWZpbmVkJykge1xuICAgICAgZGVsYXkgPSBjdXJyZW50U2xpZGVEZWxheTtcbiAgICAgIGF1dG9wbGF5RGVsYXlUb3RhbCA9IGN1cnJlbnRTbGlkZURlbGF5O1xuICAgICAgYXV0b3BsYXlEZWxheUN1cnJlbnQgPSBjdXJyZW50U2xpZGVEZWxheTtcbiAgICB9XG4gICAgYXV0b3BsYXlUaW1lTGVmdCA9IGRlbGF5O1xuICAgIGNvbnN0IHNwZWVkID0gc3dpcGVyLnBhcmFtcy5zcGVlZDtcbiAgICBjb25zdCBwcm9jZWVkID0gKCkgPT4ge1xuICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b3BsYXkucmV2ZXJzZURpcmVjdGlvbikge1xuICAgICAgICBpZiAoIXN3aXBlci5pc0JlZ2lubmluZyB8fCBzd2lwZXIucGFyYW1zLmxvb3AgfHwgc3dpcGVyLnBhcmFtcy5yZXdpbmQpIHtcbiAgICAgICAgICBzd2lwZXIuc2xpZGVQcmV2KHNwZWVkLCB0cnVlLCB0cnVlKTtcbiAgICAgICAgICBlbWl0KCdhdXRvcGxheScpO1xuICAgICAgICB9IGVsc2UgaWYgKCFzd2lwZXIucGFyYW1zLmF1dG9wbGF5LnN0b3BPbkxhc3RTbGlkZSkge1xuICAgICAgICAgIHN3aXBlci5zbGlkZVRvKHN3aXBlci5zbGlkZXMubGVuZ3RoIC0gMSwgc3BlZWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgIGVtaXQoJ2F1dG9wbGF5Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghc3dpcGVyLmlzRW5kIHx8IHN3aXBlci5wYXJhbXMubG9vcCB8fCBzd2lwZXIucGFyYW1zLnJld2luZCkge1xuICAgICAgICAgIHN3aXBlci5zbGlkZU5leHQoc3BlZWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgIGVtaXQoJ2F1dG9wbGF5Jyk7XG4gICAgICAgIH0gZWxzZSBpZiAoIXN3aXBlci5wYXJhbXMuYXV0b3BsYXkuc3RvcE9uTGFzdFNsaWRlKSB7XG4gICAgICAgICAgc3dpcGVyLnNsaWRlVG8oMCwgc3BlZWQsIHRydWUsIHRydWUpO1xuICAgICAgICAgIGVtaXQoJ2F1dG9wbGF5Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzd2lwZXIucGFyYW1zLmNzc01vZGUpIHtcbiAgICAgICAgYXV0b3BsYXlTdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgICBydW4oKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBpZiAoZGVsYXkgPiAwKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgICB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHByb2NlZWQoKTtcbiAgICAgIH0sIGRlbGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcbiAgICAgICAgcHJvY2VlZCgpO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gICAgcmV0dXJuIGRlbGF5O1xuICB9O1xuICBjb25zdCBzdGFydCA9ICgpID0+IHtcbiAgICBhdXRvcGxheVN0YXJ0VGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgIHN3aXBlci5hdXRvcGxheS5ydW5uaW5nID0gdHJ1ZTtcbiAgICBydW4oKTtcbiAgICBlbWl0KCdhdXRvcGxheVN0YXJ0Jyk7XG4gIH07XG4gIGNvbnN0IHN0b3AgPSAoKSA9PiB7XG4gICAgc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcgPSBmYWxzZTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgY2FuY2VsQW5pbWF0aW9uRnJhbWUocmFmKTtcbiAgICBlbWl0KCdhdXRvcGxheVN0b3AnKTtcbiAgfTtcbiAgY29uc3QgcGF1c2UgPSAoaW50ZXJuYWwsIHJlc2V0KSA9PiB7XG4gICAgaWYgKHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSByZXR1cm47XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIGlmICghaW50ZXJuYWwpIHtcbiAgICAgIHBhdXNlZEJ5SW50ZXJhY3Rpb24gPSB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBwcm9jZWVkID0gKCkgPT4ge1xuICAgICAgZW1pdCgnYXV0b3BsYXlQYXVzZScpO1xuICAgICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b3BsYXkud2FpdEZvclRyYW5zaXRpb24pIHtcbiAgICAgICAgc3dpcGVyLndyYXBwZXJFbC5hZGRFdmVudExpc3RlbmVyKCd0cmFuc2l0aW9uZW5kJywgb25UcmFuc2l0aW9uRW5kKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VtZSgpO1xuICAgICAgfVxuICAgIH07XG4gICAgc3dpcGVyLmF1dG9wbGF5LnBhdXNlZCA9IHRydWU7XG4gICAgaWYgKHJlc2V0KSB7XG4gICAgICBpZiAoc2xpZGVDaGFuZ2VkKSB7XG4gICAgICAgIGF1dG9wbGF5VGltZUxlZnQgPSBzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRlbGF5O1xuICAgICAgfVxuICAgICAgc2xpZGVDaGFuZ2VkID0gZmFsc2U7XG4gICAgICBwcm9jZWVkKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGRlbGF5ID0gYXV0b3BsYXlUaW1lTGVmdCB8fCBzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmRlbGF5O1xuICAgIGF1dG9wbGF5VGltZUxlZnQgPSBkZWxheSAtIChuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIGF1dG9wbGF5U3RhcnRUaW1lKTtcbiAgICBpZiAoc3dpcGVyLmlzRW5kICYmIGF1dG9wbGF5VGltZUxlZnQgPCAwICYmICFzd2lwZXIucGFyYW1zLmxvb3ApIHJldHVybjtcbiAgICBpZiAoYXV0b3BsYXlUaW1lTGVmdCA8IDApIGF1dG9wbGF5VGltZUxlZnQgPSAwO1xuICAgIHByb2NlZWQoKTtcbiAgfTtcbiAgY29uc3QgcmVzdW1lID0gKCkgPT4ge1xuICAgIGlmIChzd2lwZXIuaXNFbmQgJiYgYXV0b3BsYXlUaW1lTGVmdCA8IDAgJiYgIXN3aXBlci5wYXJhbXMubG9vcCB8fCBzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuYXV0b3BsYXkucnVubmluZykgcmV0dXJuO1xuICAgIGF1dG9wbGF5U3RhcnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgaWYgKHBhdXNlZEJ5SW50ZXJhY3Rpb24pIHtcbiAgICAgIHBhdXNlZEJ5SW50ZXJhY3Rpb24gPSBmYWxzZTtcbiAgICAgIHJ1bihhdXRvcGxheVRpbWVMZWZ0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcnVuKCk7XG4gICAgfVxuICAgIHN3aXBlci5hdXRvcGxheS5wYXVzZWQgPSBmYWxzZTtcbiAgICBlbWl0KCdhdXRvcGxheVJlc3VtZScpO1xuICB9O1xuICBjb25zdCBvblZpc2liaWxpdHlDaGFuZ2UgPSAoKSA9PiB7XG4gICAgaWYgKHN3aXBlci5kZXN0cm95ZWQgfHwgIXN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSByZXR1cm47XG4gICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgIGlmIChkb2N1bWVudC52aXNpYmlsaXR5U3RhdGUgPT09ICdoaWRkZW4nKSB7XG4gICAgICBwYXVzZWRCeUludGVyYWN0aW9uID0gdHJ1ZTtcbiAgICAgIHBhdXNlKHRydWUpO1xuICAgIH1cbiAgICBpZiAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSAndmlzaWJsZScpIHtcbiAgICAgIHJlc3VtZSgpO1xuICAgIH1cbiAgfTtcbiAgY29uc3Qgb25Qb2ludGVyRW50ZXIgPSBlID0+IHtcbiAgICBpZiAoZS5wb2ludGVyVHlwZSAhPT0gJ21vdXNlJykgcmV0dXJuO1xuICAgIHBhdXNlZEJ5SW50ZXJhY3Rpb24gPSB0cnVlO1xuICAgIHBhdXNlZEJ5UG9pbnRlckVudGVyID0gdHJ1ZTtcbiAgICBpZiAoc3dpcGVyLmFuaW1hdGluZyB8fCBzd2lwZXIuYXV0b3BsYXkucGF1c2VkKSByZXR1cm47XG4gICAgcGF1c2UodHJ1ZSk7XG4gIH07XG4gIGNvbnN0IG9uUG9pbnRlckxlYXZlID0gZSA9PiB7XG4gICAgaWYgKGUucG9pbnRlclR5cGUgIT09ICdtb3VzZScpIHJldHVybjtcbiAgICBwYXVzZWRCeVBvaW50ZXJFbnRlciA9IGZhbHNlO1xuICAgIGlmIChzd2lwZXIuYXV0b3BsYXkucGF1c2VkKSB7XG4gICAgICByZXN1bWUoKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGF0dGFjaE1vdXNlRXZlbnRzID0gKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LnBhdXNlT25Nb3VzZUVudGVyKSB7XG4gICAgICBzd2lwZXIuZWwuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmVudGVyJywgb25Qb2ludGVyRW50ZXIpO1xuICAgICAgc3dpcGVyLmVsLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJsZWF2ZScsIG9uUG9pbnRlckxlYXZlKTtcbiAgICB9XG4gIH07XG4gIGNvbnN0IGRldGFjaE1vdXNlRXZlbnRzID0gKCkgPT4ge1xuICAgIHN3aXBlci5lbC5yZW1vdmVFdmVudExpc3RlbmVyKCdwb2ludGVyZW50ZXInLCBvblBvaW50ZXJFbnRlcik7XG4gICAgc3dpcGVyLmVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJsZWF2ZScsIG9uUG9pbnRlckxlYXZlKTtcbiAgfTtcbiAgY29uc3QgYXR0YWNoRG9jdW1lbnRFdmVudHMgPSAoKSA9PiB7XG4gICAgY29uc3QgZG9jdW1lbnQgPSBnZXREb2N1bWVudCgpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3Zpc2liaWxpdHljaGFuZ2UnLCBvblZpc2liaWxpdHlDaGFuZ2UpO1xuICB9O1xuICBjb25zdCBkZXRhY2hEb2N1bWVudEV2ZW50cyA9ICgpID0+IHtcbiAgICBjb25zdCBkb2N1bWVudCA9IGdldERvY3VtZW50KCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIG9uVmlzaWJpbGl0eUNoYW5nZSk7XG4gIH07XG4gIG9uKCdpbml0JywgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmF1dG9wbGF5LmVuYWJsZWQpIHtcbiAgICAgIGF0dGFjaE1vdXNlRXZlbnRzKCk7XG4gICAgICBhdHRhY2hEb2N1bWVudEV2ZW50cygpO1xuICAgICAgc3RhcnQoKTtcbiAgICB9XG4gIH0pO1xuICBvbignZGVzdHJveScsICgpID0+IHtcbiAgICBkZXRhY2hNb3VzZUV2ZW50cygpO1xuICAgIGRldGFjaERvY3VtZW50RXZlbnRzKCk7XG4gICAgaWYgKHN3aXBlci5hdXRvcGxheS5ydW5uaW5nKSB7XG4gICAgICBzdG9wKCk7XG4gICAgfVxuICB9KTtcbiAgb24oJ19mcmVlTW9kZVN0YXRpY1JlbGVhc2UnLCAoKSA9PiB7XG4gICAgaWYgKHBhdXNlZEJ5VG91Y2ggfHwgcGF1c2VkQnlJbnRlcmFjdGlvbikge1xuICAgICAgcmVzdW1lKCk7XG4gICAgfVxuICB9KTtcbiAgb24oJ19mcmVlTW9kZU5vTW9tZW50dW1SZWxlYXNlJywgKCkgPT4ge1xuICAgIGlmICghc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgcGF1c2UodHJ1ZSwgdHJ1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN0b3AoKTtcbiAgICB9XG4gIH0pO1xuICBvbignYmVmb3JlVHJhbnNpdGlvblN0YXJ0JywgKF9zLCBzcGVlZCwgaW50ZXJuYWwpID0+IHtcbiAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHJldHVybjtcbiAgICBpZiAoaW50ZXJuYWwgfHwgIXN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGlzYWJsZU9uSW50ZXJhY3Rpb24pIHtcbiAgICAgIHBhdXNlKHRydWUsIHRydWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdG9wKCk7XG4gICAgfVxuICB9KTtcbiAgb24oJ3NsaWRlckZpcnN0TW92ZScsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHJldHVybjtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5hdXRvcGxheS5kaXNhYmxlT25JbnRlcmFjdGlvbikge1xuICAgICAgc3RvcCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpc1RvdWNoZWQgPSB0cnVlO1xuICAgIHBhdXNlZEJ5VG91Y2ggPSBmYWxzZTtcbiAgICBwYXVzZWRCeUludGVyYWN0aW9uID0gZmFsc2U7XG4gICAgdG91Y2hTdGFydFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHBhdXNlZEJ5SW50ZXJhY3Rpb24gPSB0cnVlO1xuICAgICAgcGF1c2VkQnlUb3VjaCA9IHRydWU7XG4gICAgICBwYXVzZSh0cnVlKTtcbiAgICB9LCAyMDApO1xuICB9KTtcbiAgb24oJ3RvdWNoRW5kJywgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIuZGVzdHJveWVkIHx8ICFzd2lwZXIuYXV0b3BsYXkucnVubmluZyB8fCAhaXNUb3VjaGVkKSByZXR1cm47XG4gICAgY2xlYXJUaW1lb3V0KHRvdWNoU3RhcnRUaW1lb3V0KTtcbiAgICBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuYXV0b3BsYXkuZGlzYWJsZU9uSW50ZXJhY3Rpb24pIHtcbiAgICAgIHBhdXNlZEJ5VG91Y2ggPSBmYWxzZTtcbiAgICAgIGlzVG91Y2hlZCA9IGZhbHNlO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocGF1c2VkQnlUb3VjaCAmJiBzd2lwZXIucGFyYW1zLmNzc01vZGUpIHJlc3VtZSgpO1xuICAgIHBhdXNlZEJ5VG91Y2ggPSBmYWxzZTtcbiAgICBpc1RvdWNoZWQgPSBmYWxzZTtcbiAgfSk7XG4gIG9uKCdzbGlkZUNoYW5nZScsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLmRlc3Ryb3llZCB8fCAhc3dpcGVyLmF1dG9wbGF5LnJ1bm5pbmcpIHJldHVybjtcbiAgICBzbGlkZUNoYW5nZWQgPSB0cnVlO1xuICB9KTtcbiAgT2JqZWN0LmFzc2lnbihzd2lwZXIuYXV0b3BsYXksIHtcbiAgICBzdGFydCxcbiAgICBzdG9wLFxuICAgIHBhdXNlLFxuICAgIHJlc3VtZVxuICB9KTtcbn1cblxuZXhwb3J0IHsgQXV0b3BsYXkgYXMgZGVmYXVsdCB9O1xuIiwgImZ1bmN0aW9uIGVmZmVjdEluaXQocGFyYW1zKSB7XG4gIGNvbnN0IHtcbiAgICBlZmZlY3QsXG4gICAgc3dpcGVyLFxuICAgIG9uLFxuICAgIHNldFRyYW5zbGF0ZSxcbiAgICBzZXRUcmFuc2l0aW9uLFxuICAgIG92ZXJ3cml0ZVBhcmFtcyxcbiAgICBwZXJzcGVjdGl2ZSxcbiAgICByZWNyZWF0ZVNoYWRvd3MsXG4gICAgZ2V0RWZmZWN0UGFyYW1zXG4gIH0gPSBwYXJhbXM7XG4gIG9uKCdiZWZvcmVJbml0JywgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gZWZmZWN0KSByZXR1cm47XG4gICAgc3dpcGVyLmNsYXNzTmFtZXMucHVzaChgJHtzd2lwZXIucGFyYW1zLmNvbnRhaW5lck1vZGlmaWVyQ2xhc3N9JHtlZmZlY3R9YCk7XG4gICAgaWYgKHBlcnNwZWN0aXZlICYmIHBlcnNwZWN0aXZlKCkpIHtcbiAgICAgIHN3aXBlci5jbGFzc05hbWVzLnB1c2goYCR7c3dpcGVyLnBhcmFtcy5jb250YWluZXJNb2RpZmllckNsYXNzfTNkYCk7XG4gICAgfVxuICAgIGNvbnN0IG92ZXJ3cml0ZVBhcmFtc1Jlc3VsdCA9IG92ZXJ3cml0ZVBhcmFtcyA/IG92ZXJ3cml0ZVBhcmFtcygpIDoge307XG4gICAgT2JqZWN0LmFzc2lnbihzd2lwZXIucGFyYW1zLCBvdmVyd3JpdGVQYXJhbXNSZXN1bHQpO1xuICAgIE9iamVjdC5hc3NpZ24oc3dpcGVyLm9yaWdpbmFsUGFyYW1zLCBvdmVyd3JpdGVQYXJhbXNSZXN1bHQpO1xuICB9KTtcbiAgb24oJ3NldFRyYW5zbGF0ZScsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09IGVmZmVjdCkgcmV0dXJuO1xuICAgIHNldFRyYW5zbGF0ZSgpO1xuICB9KTtcbiAgb24oJ3NldFRyYW5zaXRpb24nLCAoX3MsIGR1cmF0aW9uKSA9PiB7XG4gICAgaWYgKHN3aXBlci5wYXJhbXMuZWZmZWN0ICE9PSBlZmZlY3QpIHJldHVybjtcbiAgICBzZXRUcmFuc2l0aW9uKGR1cmF0aW9uKTtcbiAgfSk7XG4gIG9uKCd0cmFuc2l0aW9uRW5kJywgKCkgPT4ge1xuICAgIGlmIChzd2lwZXIucGFyYW1zLmVmZmVjdCAhPT0gZWZmZWN0KSByZXR1cm47XG4gICAgaWYgKHJlY3JlYXRlU2hhZG93cykge1xuICAgICAgaWYgKCFnZXRFZmZlY3RQYXJhbXMgfHwgIWdldEVmZmVjdFBhcmFtcygpLnNsaWRlU2hhZG93cykgcmV0dXJuO1xuICAgICAgLy8gcmVtb3ZlIHNoYWRvd3NcbiAgICAgIHN3aXBlci5zbGlkZXMuZm9yRWFjaChzbGlkZUVsID0+IHtcbiAgICAgICAgc2xpZGVFbC5xdWVyeVNlbGVjdG9yQWxsKCcuc3dpcGVyLXNsaWRlLXNoYWRvdy10b3AsIC5zd2lwZXItc2xpZGUtc2hhZG93LXJpZ2h0LCAuc3dpcGVyLXNsaWRlLXNoYWRvdy1ib3R0b20sIC5zd2lwZXItc2xpZGUtc2hhZG93LWxlZnQnKS5mb3JFYWNoKHNoYWRvd0VsID0+IHNoYWRvd0VsLnJlbW92ZSgpKTtcbiAgICAgIH0pO1xuICAgICAgLy8gY3JlYXRlIG5ldyBvbmVcbiAgICAgIHJlY3JlYXRlU2hhZG93cygpO1xuICAgIH1cbiAgfSk7XG4gIGxldCByZXF1aXJlVXBkYXRlT25WaXJ0dWFsO1xuICBvbigndmlydHVhbFVwZGF0ZScsICgpID0+IHtcbiAgICBpZiAoc3dpcGVyLnBhcmFtcy5lZmZlY3QgIT09IGVmZmVjdCkgcmV0dXJuO1xuICAgIGlmICghc3dpcGVyLnNsaWRlcy5sZW5ndGgpIHtcbiAgICAgIHJlcXVpcmVVcGRhdGVPblZpcnR1YWwgPSB0cnVlO1xuICAgIH1cbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgaWYgKHJlcXVpcmVVcGRhdGVPblZpcnR1YWwgJiYgc3dpcGVyLnNsaWRlcyAmJiBzd2lwZXIuc2xpZGVzLmxlbmd0aCkge1xuICAgICAgICBzZXRUcmFuc2xhdGUoKTtcbiAgICAgICAgcmVxdWlyZVVwZGF0ZU9uVmlydHVhbCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZXhwb3J0IHsgZWZmZWN0SW5pdCBhcyBlIH07XG4iLCAiaW1wb3J0IHsgbCBhcyBnZXRTbGlkZVRyYW5zZm9ybUVsIH0gZnJvbSAnLi91dGlscy5tanMnO1xuXG5mdW5jdGlvbiBlZmZlY3RUYXJnZXQoZWZmZWN0UGFyYW1zLCBzbGlkZUVsKSB7XG4gIGNvbnN0IHRyYW5zZm9ybUVsID0gZ2V0U2xpZGVUcmFuc2Zvcm1FbChzbGlkZUVsKTtcbiAgaWYgKHRyYW5zZm9ybUVsICE9PSBzbGlkZUVsKSB7XG4gICAgdHJhbnNmb3JtRWwuc3R5bGUuYmFja2ZhY2VWaXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgdHJhbnNmb3JtRWwuc3R5bGVbJy13ZWJraXQtYmFja2ZhY2UtdmlzaWJpbGl0eSddID0gJ2hpZGRlbic7XG4gIH1cbiAgcmV0dXJuIHRyYW5zZm9ybUVsO1xufVxuXG5leHBvcnQgeyBlZmZlY3RUYXJnZXQgYXMgZSB9O1xuIiwgImltcG9ydCB7IGogYXMgZWxlbWVudFRyYW5zaXRpb25FbmQgfSBmcm9tICcuL3V0aWxzLm1qcyc7XG5cbmZ1bmN0aW9uIGVmZmVjdFZpcnR1YWxUcmFuc2l0aW9uRW5kKF9yZWYpIHtcbiAgbGV0IHtcbiAgICBzd2lwZXIsXG4gICAgZHVyYXRpb24sXG4gICAgdHJhbnNmb3JtRWxlbWVudHMsXG4gICAgYWxsU2xpZGVzXG4gIH0gPSBfcmVmO1xuICBjb25zdCB7XG4gICAgYWN0aXZlSW5kZXhcbiAgfSA9IHN3aXBlcjtcbiAgY29uc3QgZ2V0U2xpZGUgPSBlbCA9PiB7XG4gICAgaWYgKCFlbC5wYXJlbnRFbGVtZW50KSB7XG4gICAgICAvLyBhc3N1bWUgc2hhZG93IHJvb3RcbiAgICAgIGNvbnN0IHNsaWRlID0gc3dpcGVyLnNsaWRlcy5maWx0ZXIoc2xpZGVFbCA9PiBzbGlkZUVsLnNoYWRvd1Jvb3QgJiYgc2xpZGVFbC5zaGFkb3dSb290ID09PSBlbC5wYXJlbnROb2RlKVswXTtcbiAgICAgIHJldHVybiBzbGlkZTtcbiAgICB9XG4gICAgcmV0dXJuIGVsLnBhcmVudEVsZW1lbnQ7XG4gIH07XG4gIGlmIChzd2lwZXIucGFyYW1zLnZpcnR1YWxUcmFuc2xhdGUgJiYgZHVyYXRpb24gIT09IDApIHtcbiAgICBsZXQgZXZlbnRUcmlnZ2VyZWQgPSBmYWxzZTtcbiAgICBsZXQgdHJhbnNpdGlvbkVuZFRhcmdldDtcbiAgICBpZiAoYWxsU2xpZGVzKSB7XG4gICAgICB0cmFuc2l0aW9uRW5kVGFyZ2V0ID0gdHJhbnNmb3JtRWxlbWVudHM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zaXRpb25FbmRUYXJnZXQgPSB0cmFuc2Zvcm1FbGVtZW50cy5maWx0ZXIodHJhbnNmb3JtRWwgPT4ge1xuICAgICAgICBjb25zdCBlbCA9IHRyYW5zZm9ybUVsLmNsYXNzTGlzdC5jb250YWlucygnc3dpcGVyLXNsaWRlLXRyYW5zZm9ybScpID8gZ2V0U2xpZGUodHJhbnNmb3JtRWwpIDogdHJhbnNmb3JtRWw7XG4gICAgICAgIHJldHVybiBzd2lwZXIuZ2V0U2xpZGVJbmRleChlbCkgPT09IGFjdGl2ZUluZGV4O1xuICAgICAgfSk7XG4gICAgfVxuICAgIHRyYW5zaXRpb25FbmRUYXJnZXQuZm9yRWFjaChlbCA9PiB7XG4gICAgICBlbGVtZW50VHJhbnNpdGlvbkVuZChlbCwgKCkgPT4ge1xuICAgICAgICBpZiAoZXZlbnRUcmlnZ2VyZWQpIHJldHVybjtcbiAgICAgICAgaWYgKCFzd2lwZXIgfHwgc3dpcGVyLmRlc3Ryb3llZCkgcmV0dXJuO1xuICAgICAgICBldmVudFRyaWdnZXJlZCA9IHRydWU7XG4gICAgICAgIHN3aXBlci5hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgICAgY29uc3QgZXZ0ID0gbmV3IHdpbmRvdy5DdXN0b21FdmVudCgndHJhbnNpdGlvbmVuZCcsIHtcbiAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgIGNhbmNlbGFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHN3aXBlci53cmFwcGVyRWwuZGlzcGF0Y2hFdmVudChldnQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cbn1cblxuZXhwb3J0IHsgZWZmZWN0VmlydHVhbFRyYW5zaXRpb25FbmQgYXMgZSB9O1xuIiwgImltcG9ydCB7IGUgYXMgZWZmZWN0SW5pdCB9IGZyb20gJy4uL3NoYXJlZC9lZmZlY3QtaW5pdC5tanMnO1xuaW1wb3J0IHsgZSBhcyBlZmZlY3RUYXJnZXQgfSBmcm9tICcuLi9zaGFyZWQvZWZmZWN0LXRhcmdldC5tanMnO1xuaW1wb3J0IHsgZSBhcyBlZmZlY3RWaXJ0dWFsVHJhbnNpdGlvbkVuZCB9IGZyb20gJy4uL3NoYXJlZC9lZmZlY3QtdmlydHVhbC10cmFuc2l0aW9uLWVuZC5tanMnO1xuaW1wb3J0IHsgbCBhcyBnZXRTbGlkZVRyYW5zZm9ybUVsIH0gZnJvbSAnLi4vc2hhcmVkL3V0aWxzLm1qcyc7XG5cbmZ1bmN0aW9uIEVmZmVjdEZhZGUoX3JlZikge1xuICBsZXQge1xuICAgIHN3aXBlcixcbiAgICBleHRlbmRQYXJhbXMsXG4gICAgb25cbiAgfSA9IF9yZWY7XG4gIGV4dGVuZFBhcmFtcyh7XG4gICAgZmFkZUVmZmVjdDoge1xuICAgICAgY3Jvc3NGYWRlOiBmYWxzZVxuICAgIH1cbiAgfSk7XG4gIGNvbnN0IHNldFRyYW5zbGF0ZSA9ICgpID0+IHtcbiAgICBjb25zdCB7XG4gICAgICBzbGlkZXNcbiAgICB9ID0gc3dpcGVyO1xuICAgIGNvbnN0IHBhcmFtcyA9IHN3aXBlci5wYXJhbXMuZmFkZUVmZmVjdDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNsaWRlcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgY29uc3Qgc2xpZGVFbCA9IHN3aXBlci5zbGlkZXNbaV07XG4gICAgICBjb25zdCBvZmZzZXQgPSBzbGlkZUVsLnN3aXBlclNsaWRlT2Zmc2V0O1xuICAgICAgbGV0IHR4ID0gLW9mZnNldDtcbiAgICAgIGlmICghc3dpcGVyLnBhcmFtcy52aXJ0dWFsVHJhbnNsYXRlKSB0eCAtPSBzd2lwZXIudHJhbnNsYXRlO1xuICAgICAgbGV0IHR5ID0gMDtcbiAgICAgIGlmICghc3dpcGVyLmlzSG9yaXpvbnRhbCgpKSB7XG4gICAgICAgIHR5ID0gdHg7XG4gICAgICAgIHR4ID0gMDtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHNsaWRlT3BhY2l0eSA9IHN3aXBlci5wYXJhbXMuZmFkZUVmZmVjdC5jcm9zc0ZhZGUgPyBNYXRoLm1heCgxIC0gTWF0aC5hYnMoc2xpZGVFbC5wcm9ncmVzcyksIDApIDogMSArIE1hdGgubWluKE1hdGgubWF4KHNsaWRlRWwucHJvZ3Jlc3MsIC0xKSwgMCk7XG4gICAgICBjb25zdCB0YXJnZXRFbCA9IGVmZmVjdFRhcmdldChwYXJhbXMsIHNsaWRlRWwpO1xuICAgICAgdGFyZ2V0RWwuc3R5bGUub3BhY2l0eSA9IHNsaWRlT3BhY2l0eTtcbiAgICAgIHRhcmdldEVsLnN0eWxlLnRyYW5zZm9ybSA9IGB0cmFuc2xhdGUzZCgke3R4fXB4LCAke3R5fXB4LCAwcHgpYDtcbiAgICB9XG4gIH07XG4gIGNvbnN0IHNldFRyYW5zaXRpb24gPSBkdXJhdGlvbiA9PiB7XG4gICAgY29uc3QgdHJhbnNmb3JtRWxlbWVudHMgPSBzd2lwZXIuc2xpZGVzLm1hcChzbGlkZUVsID0+IGdldFNsaWRlVHJhbnNmb3JtRWwoc2xpZGVFbCkpO1xuICAgIHRyYW5zZm9ybUVsZW1lbnRzLmZvckVhY2goZWwgPT4ge1xuICAgICAgZWwuc3R5bGUudHJhbnNpdGlvbkR1cmF0aW9uID0gYCR7ZHVyYXRpb259bXNgO1xuICAgIH0pO1xuICAgIGVmZmVjdFZpcnR1YWxUcmFuc2l0aW9uRW5kKHtcbiAgICAgIHN3aXBlcixcbiAgICAgIGR1cmF0aW9uLFxuICAgICAgdHJhbnNmb3JtRWxlbWVudHMsXG4gICAgICBhbGxTbGlkZXM6IHRydWVcbiAgICB9KTtcbiAgfTtcbiAgZWZmZWN0SW5pdCh7XG4gICAgZWZmZWN0OiAnZmFkZScsXG4gICAgc3dpcGVyLFxuICAgIG9uLFxuICAgIHNldFRyYW5zbGF0ZSxcbiAgICBzZXRUcmFuc2l0aW9uLFxuICAgIG92ZXJ3cml0ZVBhcmFtczogKCkgPT4gKHtcbiAgICAgIHNsaWRlc1BlclZpZXc6IDEsXG4gICAgICBzbGlkZXNQZXJHcm91cDogMSxcbiAgICAgIHdhdGNoU2xpZGVzUHJvZ3Jlc3M6IHRydWUsXG4gICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICB2aXJ0dWFsVHJhbnNsYXRlOiAhc3dpcGVyLnBhcmFtcy5jc3NNb2RlXG4gICAgfSlcbiAgfSk7XG59XG5cbmV4cG9ydCB7IEVmZmVjdEZhZGUgYXMgZGVmYXVsdCB9O1xuIiwgImltcG9ydCBTd2lwZXIgZnJvbSAnc3dpcGVyJztcclxuaW1wb3J0IHsgQXV0b3BsYXksIE5hdmlnYXRpb24sIFBhZ2luYXRpb24sIFNjcm9sbGJhciwgRWZmZWN0RmFkZSB9IGZyb20gJ3N3aXBlci9tb2R1bGVzJztcclxuXHJcbmNvbnN0IHN3aXBlciA9ICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1zd2lwZXInKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGxldCBvcHRpb25zID0ge307XHJcblxyXG4gICAgICAgIGlmIChpdGVtLmRhdGFzZXQub3B0aW9ucykge1xyXG4gICAgICAgICAgICBvcHRpb25zID0gaXRlbS5kYXRhc2V0Lm9wdGlvbnMucmVwbGFjZSgvJy9nLCAnXCInKS5yZXBsYWNlKC8sXFxzKihbXFxdfV0pL2csICckMScpO1xyXG4gICAgICAgICAgICBvcHRpb25zID0gSlNPTi5wYXJzZShvcHRpb25zKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG9wdGlvbnMubW9kdWxlcyA9IFtBdXRvcGxheSwgTmF2aWdhdGlvbiwgUGFnaW5hdGlvbiwgU2Nyb2xsYmFyLCBFZmZlY3RGYWRlXTtcclxuXHJcblxyXG4gICAgICAgIG5ldyBTd2lwZXIoaXRlbSwgb3B0aW9ucyk7XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHN3aXBlcjsiLCAiaW1wb3J0IEFjY29yZGlvblRhYnMgZnJvbSAnYTExeS1hY2NvcmRpb24tdGFicyc7XHJcblxyXG5jb25zdCB0YWJzID0gKCkgPT4ge1xyXG4gICAgLy8gaW5pdCB0YWJzXHJcbiAgICBuZXcgQWNjb3JkaW9uVGFicygpO1xyXG5cclxuICAgIC8vIHVwZGF0ZSBoYXNoXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtdGFic1tkYXRhLXVwZGF0ZS1oYXNoPVwidHJ1ZVwiXSAuanMtdGFicy10cmlnZ2VyJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBnbG9iYWwuaGlzdG9yeS5wdXNoU3RhdGUoJycsICcnLCBgIyR7aXRlbS5nZXRBdHRyaWJ1dGUoJ2FyaWEtY29udHJvbHMnKX1gKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChnbG9iYWwubG9jYXRpb24uaGFzaCkge1xyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVRhYnNUcmlnZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmpzLXRhYnNbZGF0YS11cGRhdGUtaGFzaD1cInRydWVcIl0gLmpzLXRhYnMtdHJpZ2dlcltocmVmPVwiJHtnbG9iYWwubG9jYXRpb24uaGFzaH1cIl1gKTtcclxuXHJcbiAgICAgICAgaWYgKGFjdGl2ZVRhYnNUcmlnZ2VyKSB7XHJcbiAgICAgICAgICAgIGdsb2JhbC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWN0aXZlVGFic1RyaWdnZXIuY2xpY2soKTtcclxuICAgICAgICAgICAgICAgIGFjdGl2ZVRhYnNUcmlnZ2VyLmJsdXIoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGRyb3Bkb3duIHRvZ2dsZVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXRhYnMnKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IGRyb3Bkb3duID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuanMtdGFicy1kcm9wZG93bicpO1xyXG4gICAgXHJcbiAgICAgICAgaWYgKGRyb3Bkb3duKSB7XHJcbiAgICAgICAgICAgIGRyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5xdWVyeVNlbGVjdG9yKGAuanMtdGFicy10cmlnZ2VyW2hyZWY9XCIke2UudGFyZ2V0LnZhbHVlfVwiXWApLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGl0ZW0ucXVlcnlTZWxlY3RvckFsbCgnLmpzLXRhYnMtdHJpZ2dlcicpLmZvckVhY2godGFiID0+IHtcclxuICAgICAgICAgICAgICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBkcm9wZG93bi52YWx1ZSA9IHRhYi5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IHRhYnM7IiwgImNvbnN0IG5vdCA9IHtcbiAgaW5lcnQ6ICc6bm90KFtpbmVydF0pOm5vdChbaW5lcnRdICopJyxcbiAgbmVnVGFiSW5kZXg6ICc6bm90KFt0YWJpbmRleF49XCItXCJdKScsXG4gIGRpc2FibGVkOiAnOm5vdCg6ZGlzYWJsZWQpJyxcbn07XG5cbnZhciBmb2N1c2FibGVTZWxlY3RvcnMgPSBbXG4gIGBhW2hyZWZdJHtub3QuaW5lcnR9JHtub3QubmVnVGFiSW5kZXh9YCxcbiAgYGFyZWFbaHJlZl0ke25vdC5pbmVydH0ke25vdC5uZWdUYWJJbmRleH1gLFxuICBgaW5wdXQ6bm90KFt0eXBlPVwiaGlkZGVuXCJdKTpub3QoW3R5cGU9XCJyYWRpb1wiXSkke25vdC5pbmVydH0ke25vdC5uZWdUYWJJbmRleH0ke25vdC5kaXNhYmxlZH1gLFxuICBgaW5wdXRbdHlwZT1cInJhZGlvXCJdJHtub3QuaW5lcnR9JHtub3QubmVnVGFiSW5kZXh9JHtub3QuZGlzYWJsZWR9YCxcbiAgYHNlbGVjdCR7bm90LmluZXJ0fSR7bm90Lm5lZ1RhYkluZGV4fSR7bm90LmRpc2FibGVkfWAsXG4gIGB0ZXh0YXJlYSR7bm90LmluZXJ0fSR7bm90Lm5lZ1RhYkluZGV4fSR7bm90LmRpc2FibGVkfWAsXG4gIGBidXR0b24ke25vdC5pbmVydH0ke25vdC5uZWdUYWJJbmRleH0ke25vdC5kaXNhYmxlZH1gLFxuICBgZGV0YWlscyR7bm90LmluZXJ0fSA+IHN1bW1hcnk6Zmlyc3Qtb2YtdHlwZSR7bm90Lm5lZ1RhYkluZGV4fWAsXG4gIC8vIERpc2NhcmQgdW50aWwgRmlyZWZveCBzdXBwb3J0cyBgOmhhcygpYFxuICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9LaXR0eUdpcmF1ZGVsL2ZvY3VzYWJsZS1zZWxlY3RvcnMvaXNzdWVzLzEyXG4gIC8vIGBkZXRhaWxzOm5vdCg6aGFzKD4gc3VtbWFyeSkpJHtub3QuaW5lcnR9JHtub3QubmVnVGFiSW5kZXh9YCxcbiAgYGlmcmFtZSR7bm90LmluZXJ0fSR7bm90Lm5lZ1RhYkluZGV4fWAsXG4gIGBhdWRpb1tjb250cm9sc10ke25vdC5pbmVydH0ke25vdC5uZWdUYWJJbmRleH1gLFxuICBgdmlkZW9bY29udHJvbHNdJHtub3QuaW5lcnR9JHtub3QubmVnVGFiSW5kZXh9YCxcbiAgYFtjb250ZW50ZWRpdGFibGVdJHtub3QuaW5lcnR9JHtub3QubmVnVGFiSW5kZXh9YCxcbiAgYFt0YWJpbmRleF0ke25vdC5pbmVydH0ke25vdC5uZWdUYWJJbmRleH1gLFxuXTtcblxuLyoqXG4gKiBTZXQgdGhlIGZvY3VzIHRvIHRoZSBmaXJzdCBlbGVtZW50IHdpdGggYGF1dG9mb2N1c2Agd2l0aCB0aGUgZWxlbWVudCBvciB0aGVcbiAqIGVsZW1lbnQgaXRzZWxmLlxuICovXG5mdW5jdGlvbiBtb3ZlRm9jdXNUb0RpYWxvZyhlbCkge1xuICAgIGNvbnN0IGZvY3VzZWQgPSAoZWwucXVlcnlTZWxlY3RvcignW2F1dG9mb2N1c10nKSB8fCBlbCk7XG4gICAgZm9jdXNlZC5mb2N1cygpO1xufVxuLyoqXG4gKiBHZXQgdGhlIGZpcnN0IGFuZCBsYXN0IGZvY3VzYWJsZSBlbGVtZW50cyBpbiBhIGdpdmVuIHRyZWUuXG4gKi9cbmZ1bmN0aW9uIGdldEZvY3VzYWJsZUVkZ2VzKGVsKSB7XG4gICAgLy8gQ2hlY2sgZm9yIGEgZm9jdXNhYmxlIGVsZW1lbnQgd2l0aGluIHRoZSBzdWJ0cmVlIG9mIGBlbGAuXG4gICAgY29uc3QgZmlyc3QgPSBmaW5kRm9jdXNhYmxlRWxlbWVudChlbCwgdHJ1ZSk7XG4gICAgLy8gT25seSBpZiB3ZSBmaW5kIHRoZSBmaXJzdCBlbGVtZW50IGRvIHdlIG5lZWQgdG8gbG9vayBmb3IgdGhlIGxhc3Qgb25lLiBJZlxuICAgIC8vIHRoZXJlXHUyMDE5cyBubyBsYXN0IGVsZW1lbnQsIHdlIHNldCBgbGFzdGAgYXMgYSByZWZlcmVuY2UgdG8gYGZpcnN0YCBzbyB0aGF0XG4gICAgLy8gdGhlIHJldHVybmVkIGFycmF5IGlzIGFsd2F5cyBvZiBsZW5ndGggMi5cbiAgICBjb25zdCBsYXN0ID0gZmlyc3QgPyBmaW5kRm9jdXNhYmxlRWxlbWVudChlbCwgZmFsc2UpIHx8IGZpcnN0IDogbnVsbDtcbiAgICByZXR1cm4gW2ZpcnN0LCBsYXN0XTtcbn1cbi8qKlxuICogRmluZCB0aGUgZmlyc3QgZm9jdXNhYmxlIGVsZW1lbnQgaW5zaWRlIHRoZSBnaXZlbiBub2RlIGlmIGBmb3J3YXJkYCBpcyB0cnV0aHlcbiAqIG9yIHRoZSBsYXN0IGZvY3VzYWJsZSBlbGVtZW50IG90aGVyd2lzZS5cbiAqL1xuZnVuY3Rpb24gZmluZEZvY3VzYWJsZUVsZW1lbnQobm9kZSwgZm9yd2FyZCkge1xuICAgIC8vIElmIHdlXHUyMDE5cmUgd2Fsa2luZyBmb3J3YXJkLCBjaGVjayBpZiB0aGlzIG5vZGUgaXMgZm9jdXNhYmxlLCBhbmQgcmV0dXJuIGl0XG4gICAgLy8gaW1tZWRpYXRlbHkgaWYgaXQgaXMuXG4gICAgaWYgKGZvcndhcmQgJiYgaXNGb2N1c2FibGUobm9kZSkpXG4gICAgICAgIHJldHVybiBub2RlO1xuICAgIC8vIFdlIHNob3VsZCBvbmx5IHNlYXJjaCB0aGUgc3VidHJlZSBvZiB0aGlzIG5vZGUgaWYgaXQgY2FuIGhhdmUgZm9jdXNhYmxlXG4gICAgLy8gY2hpbGRyZW4uXG4gICAgaWYgKGNhbkhhdmVGb2N1c2FibGVDaGlsZHJlbihub2RlKSkge1xuICAgICAgICAvLyBTdGFydCB3YWxraW5nIHRoZSBET00gdHJlZSwgbG9va2luZyBmb3IgZm9jdXNhYmxlIGVsZW1lbnRzLlxuICAgICAgICAvLyBDYXNlIDE6IElmIHRoaXMgbm9kZSBoYXMgYSBzaGFkb3cgcm9vdCwgc2VhcmNoIGl0IHJlY3Vyc2l2ZWx5LlxuICAgICAgICBpZiAobm9kZS5zaGFkb3dSb290KSB7XG4gICAgICAgICAgICAvLyBEZXNjZW5kIGludG8gdGhpcyBzdWJ0cmVlLlxuICAgICAgICAgICAgbGV0IG5leHQgPSBnZXROZXh0Q2hpbGRFbChub2RlLnNoYWRvd1Jvb3QsIGZvcndhcmQpO1xuICAgICAgICAgICAgLy8gVHJhdmVyc2Ugc2libGluZ3MsIHNlYXJjaGluZyB0aGUgc3VidHJlZSBvZiBlYWNoIG9uZVxuICAgICAgICAgICAgLy8gZm9yIGZvY3VzYWJsZSBlbGVtZW50cy5cbiAgICAgICAgICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9jdXNhYmxlRWwgPSBmaW5kRm9jdXNhYmxlRWxlbWVudChuZXh0LCBmb3J3YXJkKTtcbiAgICAgICAgICAgICAgICBpZiAoZm9jdXNhYmxlRWwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb2N1c2FibGVFbDtcbiAgICAgICAgICAgICAgICBuZXh0ID0gZ2V0TmV4dFNpYmxpbmdFbChuZXh0LCBmb3J3YXJkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBDYXNlIDI6IElmIHRoaXMgbm9kZSBpcyBhIHNsb3QgZm9yIGEgQ3VzdG9tIEVsZW1lbnQsIHNlYXJjaCBpdHMgYXNzaWduZWRcbiAgICAgICAgLy8gbm9kZXMgcmVjdXJzaXZlbHkuXG4gICAgICAgIGVsc2UgaWYgKG5vZGUubG9jYWxOYW1lID09PSAnc2xvdCcpIHtcbiAgICAgICAgICAgIGNvbnN0IGFzc2lnbmVkRWxlbWVudHMgPSBub2RlLmFzc2lnbmVkRWxlbWVudHMoe1xuICAgICAgICAgICAgICAgIGZsYXR0ZW46IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICghZm9yd2FyZClcbiAgICAgICAgICAgICAgICBhc3NpZ25lZEVsZW1lbnRzLnJldmVyc2UoKTtcbiAgICAgICAgICAgIGZvciAoY29uc3QgYXNzaWduZWRFbGVtZW50IG9mIGFzc2lnbmVkRWxlbWVudHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmb2N1c2FibGVFbCA9IGZpbmRGb2N1c2FibGVFbGVtZW50KGFzc2lnbmVkRWxlbWVudCwgZm9yd2FyZCk7XG4gICAgICAgICAgICAgICAgaWYgKGZvY3VzYWJsZUVsKVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm9jdXNhYmxlRWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gQ2FzZSAzOiB0aGlzIGlzIGEgcmVndWxhciBMaWdodCBET00gbm9kZS4gU2VhcmNoIGl0cyBzdWJ0cmVlLlxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIERlc2NlbmQgaW50byB0aGlzIHN1YnRyZWUuXG4gICAgICAgICAgICBsZXQgbmV4dCA9IGdldE5leHRDaGlsZEVsKG5vZGUsIGZvcndhcmQpO1xuICAgICAgICAgICAgLy8gVHJhdmVyc2Ugc2libGluZ3MsIHNlYXJjaGluZyB0aGUgc3VidHJlZSBvZiBlYWNoIG9uZVxuICAgICAgICAgICAgLy8gZm9yIGZvY3VzYWJsZSBlbGVtZW50cy5cbiAgICAgICAgICAgIHdoaWxlIChuZXh0KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZm9jdXNhYmxlRWwgPSBmaW5kRm9jdXNhYmxlRWxlbWVudChuZXh0LCBmb3J3YXJkKTtcbiAgICAgICAgICAgICAgICBpZiAoZm9jdXNhYmxlRWwpXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmb2N1c2FibGVFbDtcbiAgICAgICAgICAgICAgICBuZXh0ID0gZ2V0TmV4dFNpYmxpbmdFbChuZXh0LCBmb3J3YXJkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBJZiB3ZVx1MjAxOXJlIHdhbGtpbmcgYmFja3dhcmQsIHdlIHdhbnQgdG8gY2hlY2sgdGhlIG5vZGVcdTIwMTlzIGVudGlyZSBzdWJ0cmVlXG4gICAgLy8gYmVmb3JlIGNoZWNraW5nIHRoZSBub2RlIGl0c2VsZi4gSWYgdGhpcyBub2RlIGlzIGZvY3VzYWJsZSwgcmV0dXJuIGl0LlxuICAgIGlmICghZm9yd2FyZCAmJiBpc0ZvY3VzYWJsZShub2RlKSlcbiAgICAgICAgcmV0dXJuIG5vZGU7XG4gICAgcmV0dXJuIG51bGw7XG59XG5mdW5jdGlvbiBnZXROZXh0Q2hpbGRFbChub2RlLCBmb3J3YXJkKSB7XG4gICAgcmV0dXJuIGZvcndhcmQgPyBub2RlLmZpcnN0RWxlbWVudENoaWxkIDogbm9kZS5sYXN0RWxlbWVudENoaWxkO1xufVxuZnVuY3Rpb24gZ2V0TmV4dFNpYmxpbmdFbChlbCwgZm9yd2FyZCkge1xuICAgIHJldHVybiBmb3J3YXJkID8gZWwubmV4dEVsZW1lbnRTaWJsaW5nIDogZWwucHJldmlvdXNFbGVtZW50U2libGluZztcbn1cbi8qKlxuICogRGV0ZXJtaW5lIGlmIGFuIGVsZW1lbnQgaXMgaGlkZGVuIGZyb20gdGhlIHVzZXIuXG4gKi9cbmNvbnN0IGlzSGlkZGVuID0gKGVsKSA9PiB7XG4gICAgLy8gQnJvd3NlcnMgaGlkZSBhbGwgbm9uLTxzdW1tYXJ5PiBkZXNjZW5kYW50cyBvZiBjbG9zZWQgPGRldGFpbHM+IGVsZW1lbnRzXG4gICAgLy8gZnJvbSB1c2VyIGludGVyYWN0aW9uLCBidXQgdGhvc2Ugbm9uLTxzdW1tYXJ5PiBlbGVtZW50cyBtYXkgc3RpbGwgbWF0Y2ggb3VyXG4gICAgLy8gZm9jdXNhYmxlLXNlbGVjdG9ycyBhbmQgbWF5IHN0aWxsIGhhdmUgZGltZW5zaW9ucywgc28gd2UgbmVlZCBhIHNwZWNpYWxcbiAgICAvLyBjYXNlIHRvIGlnbm9yZSB0aGVtLlxuICAgIGlmIChlbC5tYXRjaGVzKCdkZXRhaWxzOm5vdChbb3Blbl0pIConKSAmJlxuICAgICAgICAhZWwubWF0Y2hlcygnZGV0YWlscz5zdW1tYXJ5OmZpcnN0LW9mLXR5cGUnKSlcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgLy8gSWYgdGhpcyBlbGVtZW50IGhhcyBubyBwYWludGVkIGRpbWVuc2lvbnMsIGl0J3MgaGlkZGVuLlxuICAgIHJldHVybiAhKGVsLm9mZnNldFdpZHRoIHx8IGVsLm9mZnNldEhlaWdodCB8fCBlbC5nZXRDbGllbnRSZWN0cygpLmxlbmd0aCk7XG59O1xuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYW4gZWxlbWVudCBpcyBmb2N1c2FibGUgYW5kIGhhcyB1c2VyLXZpc2libGUgcGFpbnRlZCBkaW1lbnNpb25zLlxuICovXG5jb25zdCBpc0ZvY3VzYWJsZSA9IChlbCkgPT4ge1xuICAgIC8vIEEgc2hhZG93IGhvc3QgdGhhdCBkZWxlZ2F0ZXMgZm9jdXMgd2lsbCBuZXZlciBkaXJlY3RseSByZWNlaXZlIGZvY3VzLFxuICAgIC8vIGV2ZW4gd2l0aCBgdGFiaW5kZXg9MGAuIENvbnNpZGVyIG91ciA8ZmFuY3ktYnV0dG9uPiBjdXN0b20gZWxlbWVudCwgd2hpY2hcbiAgICAvLyBkZWxlZ2F0ZXMgZm9jdXMgdG8gaXRzIHNoYWRvdyBidXR0b246XG4gICAgLy9cbiAgICAvLyA8ZmFuY3ktYnV0dG9uIHRhYmluZGV4PVwiMFwiPlxuICAgIC8vICAjc2hhZG93LXJvb3RcbiAgICAvLyAgPGJ1dHRvbj48c2xvdD48L3Nsb3Q+PC9idXR0b24+XG4gICAgLy8gPC9mYW5jeS1idXR0b24+XG4gICAgLy9cbiAgICAvLyBUaGUgYnJvd3NlciBhY3RzIGFzIGFzIGlmIHRoZXJlIGlzIG9ubHkgb25lIGZvY3VzYWJsZSBlbGVtZW50IFx1MjAxMyB0aGUgc2hhZG93XG4gICAgLy8gYnV0dG9uLiBPdXIgbGlicmFyeSBzaG91bGQgYmVoYXZlIHRoZSBzYW1lIHdheS5cbiAgICBpZiAoZWwuc2hhZG93Um9vdD8uZGVsZWdhdGVzRm9jdXMpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gZWwubWF0Y2hlcyhmb2N1c2FibGVTZWxlY3RvcnMuam9pbignLCcpKSAmJiAhaXNIaWRkZW4oZWwpO1xufTtcbi8qKlxuICogRGV0ZXJtaW5lIGlmIGFuIGVsZW1lbnQgY2FuIGhhdmUgZm9jdXNhYmxlIGNoaWxkcmVuLiBVc2VmdWwgZm9yIGJhaWxpbmcgb3V0XG4gKiBlYXJseSB3aGVuIHdhbGtpbmcgdGhlIERPTSB0cmVlLlxuICogQGV4YW1wbGVcbiAqIFRoaXMgZGl2IGlzIGluZXJ0LCBzbyBub25lIG9mIGl0cyBjaGlsZHJlbiBjYW4gYmUgZm9jdXNlZCwgZXZlbiB0aG91Z2ggdGhleVxuICogbWVldCBvdXIgY3JpdGVyaWEgZm9yIHdoYXQgaXMgZm9jdXNhYmxlLiBPbmNlIHdlIGNoZWNrIHRoZSBkaXYsIHdlIGNhbiBza2lwXG4gKiB0aGUgcmVzdCBvZiB0aGUgc3VidHJlZS5cbiAqIGBgYGh0bWxcbiAqIDxkaXYgaW5lcnQ+XG4gKiAgIDxidXR0b24+QnV0dG9uPC9idXR0b24+XG4gKiAgIDxhIGhyZWY9XCIjXCI+TGluazwvYT5cbiAqIDwvZGl2PlxuICogYGBgXG4gKi9cbmZ1bmN0aW9uIGNhbkhhdmVGb2N1c2FibGVDaGlsZHJlbihlbCkge1xuICAgIC8vIFRoZSBicm93c2VyIHdpbGwgbmV2ZXIgc2VuZCBmb2N1cyBpbnRvIGEgU2hhZG93IERPTSBpZiB0aGUgaG9zdCBlbGVtZW50XG4gICAgLy8gaGFzIGEgbmVnYXRpdmUgdGFiaW5kZXguIFRoaXMgYXBwbGllcyB0byBib3RoIHNsb3R0ZWQgTGlnaHQgRE9NIFNoYWRvdyBET01cbiAgICAvLyBjaGlsZHJlblxuICAgIGlmIChlbC5zaGFkb3dSb290ICYmIGVsLmdldEF0dHJpYnV0ZSgndGFiaW5kZXgnKSA9PT0gJy0xJylcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIC8vIEVsZW1tZW50cyBtYXRjaGluZyB0aGlzIHNlbGVjdG9yIGFyZSBlaXRoZXIgaGlkZGVuIGVudGlyZWx5IGZyb20gdGhlIHVzZXIsXG4gICAgLy8gb3IgYXJlIHZpc2libGUgYnV0IHVuYXZhaWxhYmxlIGZvciBpbnRlcmFjdGlvbi4gVGhlaXIgZGVzY2VudGFudHMgY2FuIG5ldmVyXG4gICAgLy8gcmVjZWl2ZSBmb2N1cy5cbiAgICByZXR1cm4gIWVsLm1hdGNoZXMoJzpkaXNhYmxlZCxbaGlkZGVuXSxbaW5lcnRdJyk7XG59XG4vKipcbiAqIEdldCB0aGUgYWN0aXZlIGVsZW1lbnQsIGFjY291bnRpbmcgZm9yIFNoYWRvdyBET00gc3VidHJlZXMuXG4gKiBAYXV0aG9yIENvcnkgTGFWaXNrYVxuICogQHNlZTogaHR0cHM6Ly93d3cuYWJlYXV0aWZ1bHNpdGUubmV0L3Bvc3RzL2ZpbmRpbmctdGhlLWFjdGl2ZS1lbGVtZW50LWluLWEtc2hhZG93LXJvb3QvXG4gKi9cbmZ1bmN0aW9uIGdldEFjdGl2ZUVsZW1lbnQocm9vdCA9IGRvY3VtZW50KSB7XG4gICAgY29uc3QgYWN0aXZlRWwgPSByb290LmFjdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKCFhY3RpdmVFbClcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgLy8gSWYgdGhlcmVcdTIwMTlzIGEgc2hhZG93IHJvb3QsIHJlY3Vyc2l2ZWx5IGZpbmQgdGhlIGFjdGl2ZSBlbGVtZW50IHdpdGhpbiBpdC5cbiAgICAvLyBJZiB0aGUgcmVjdXJzaXZlIGNhbGwgcmV0dXJucyBudWxsLCByZXR1cm4gdGhlIGFjdGl2ZSBlbGVtZW50XG4gICAgLy8gb2YgdGhlIHRvcC1sZXZlbCBEb2N1bWVudC5cbiAgICBpZiAoYWN0aXZlRWwuc2hhZG93Um9vdClcbiAgICAgICAgcmV0dXJuIGdldEFjdGl2ZUVsZW1lbnQoYWN0aXZlRWwuc2hhZG93Um9vdCkgfHwgZG9jdW1lbnQuYWN0aXZlRWxlbWVudDtcbiAgICAvLyBJZiBub3QsIHdlIGNhbiBqdXN0IHJldHVybiB0aGUgYWN0aXZlIGVsZW1lbnRcbiAgICByZXR1cm4gYWN0aXZlRWw7XG59XG4vKipcbiAqIFRyYXAgdGhlIGZvY3VzIGluc2lkZSB0aGUgZ2l2ZW4gZWxlbWVudFxuICovXG5mdW5jdGlvbiB0cmFwVGFiS2V5KGVsLCBldmVudCkge1xuICAgIGNvbnN0IFtmaXJzdEZvY3VzYWJsZUNoaWxkLCBsYXN0Rm9jdXNhYmxlQ2hpbGRdID0gZ2V0Rm9jdXNhYmxlRWRnZXMoZWwpO1xuICAgIC8vIElmIHRoZXJlIGFyZSBubyBmb2N1c2FibGUgY2hpbGRyZW4gaW4gdGhlIGRpYWxvZywgcHJldmVudCB0aGUgdXNlciBmcm9tXG4gICAgLy8gdGFiYmluZyBvdXQgb2YgaXRcbiAgICBpZiAoIWZpcnN0Rm9jdXNhYmxlQ2hpbGQpXG4gICAgICAgIHJldHVybiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGFjdGl2ZUVsZW1lbnQgPSBnZXRBY3RpdmVFbGVtZW50KCk7XG4gICAgLy8gSWYgdGhlIFNISUZUIGtleSBpcyBwcmVzc2VkIHdoaWxlIHRhYmJpbmcgKG1vdmluZyBiYWNrd2FyZHMpIGFuZCB0aGVcbiAgICAvLyBjdXJyZW50bHkgZm9jdXNlZCBpdGVtIGlzIHRoZSBmaXJzdCBvbmUsIG1vdmUgdGhlIGZvY3VzIHRvIHRoZSBsYXN0XG4gICAgLy8gZm9jdXNhYmxlIGl0ZW0gZnJvbSB0aGUgZGlhbG9nIGVsZW1lbnRcbiAgICBpZiAoZXZlbnQuc2hpZnRLZXkgJiYgYWN0aXZlRWxlbWVudCA9PT0gZmlyc3RGb2N1c2FibGVDaGlsZCkge1xuICAgICAgICAvLyBAdHMtaWdub3JlOiB3ZSBrbm93IHRoYXQgYGxhc3RGb2N1c2FibGVDaGlsZGAgaXMgbm90IG51bGwgaGVyZVxuICAgICAgICBsYXN0Rm9jdXNhYmxlQ2hpbGQuZm9jdXMoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gICAgLy8gSWYgdGhlIFNISUZUIGtleSBpcyBub3QgcHJlc3NlZCAobW92aW5nIGZvcndhcmRzKSBhbmQgdGhlIGN1cnJlbnRseSBmb2N1c2VkXG4gICAgLy8gaXRlbSBpcyB0aGUgbGFzdCBvbmUsIG1vdmUgdGhlIGZvY3VzIHRvIHRoZSBmaXJzdCBmb2N1c2FibGUgaXRlbSBmcm9tIHRoZVxuICAgIC8vIGRpYWxvZyBlbGVtZW50XG4gICAgZWxzZSBpZiAoIWV2ZW50LnNoaWZ0S2V5ICYmIGFjdGl2ZUVsZW1lbnQgPT09IGxhc3RGb2N1c2FibGVDaGlsZCkge1xuICAgICAgICBmaXJzdEZvY3VzYWJsZUNoaWxkLmZvY3VzKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufVxuXG5jbGFzcyBBMTF5RGlhbG9nIHtcbiAgICAkZWw7XG4gICAgaWQ7XG4gICAgcHJldmlvdXNseUZvY3VzZWQ7XG4gICAgc2hvd247XG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xuICAgICAgICB0aGlzLiRlbCA9IGVsZW1lbnQ7XG4gICAgICAgIHRoaXMuaWQgPSB0aGlzLiRlbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtYTExeS1kaWFsb2cnKSB8fCB0aGlzLiRlbC5pZDtcbiAgICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZCA9IG51bGw7XG4gICAgICAgIHRoaXMuc2hvd24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tYWludGFpbkZvY3VzID0gdGhpcy5tYWludGFpbkZvY3VzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYmluZEtleXByZXNzID0gdGhpcy5iaW5kS2V5cHJlc3MuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5oYW5kbGVUcmlnZ2VyQ2xpY2tzID0gdGhpcy5oYW5kbGVUcmlnZ2VyQ2xpY2tzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuc2hvdyA9IHRoaXMuc2hvdy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmhpZGUgPSB0aGlzLmhpZGUuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy4kZWwuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG4gICAgICAgIHRoaXMuJGVsLnNldEF0dHJpYnV0ZSgnYXJpYS1tb2RhbCcsICd0cnVlJyk7XG4gICAgICAgIHRoaXMuJGVsLnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcbiAgICAgICAgaWYgKCF0aGlzLiRlbC5oYXNBdHRyaWJ1dGUoJ3JvbGUnKSkge1xuICAgICAgICAgICAgdGhpcy4kZWwuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2RpYWxvZycpO1xuICAgICAgICB9XG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5oYW5kbGVUcmlnZ2VyQ2xpY2tzLCB0cnVlKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGVzdHJveSB0aGUgY3VycmVudCBpbnN0YW5jZSAoYWZ0ZXIgbWFraW5nIHN1cmUgdGhlIGRpYWxvZyBoYXMgYmVlbiBoaWRkZW4pXG4gICAgICogYW5kIHJlbW92ZSBhbGwgYXNzb2NpYXRlZCBsaXN0ZW5lcnMgZnJvbSBkaWFsb2cgb3BlbmVycyBhbmQgY2xvc2Vyc1xuICAgICAqL1xuICAgIGRlc3Ryb3koKSB7XG4gICAgICAgIC8vIEhpZGUgdGhlIGRpYWxvZyB0byBhdm9pZCBkZXN0cm95aW5nIGFuIG9wZW4gaW5zdGFuY2VcbiAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgIC8vIFJlbW92ZSB0aGUgY2xpY2sgZXZlbnQgZGVsZWdhdGVzIGZvciBvdXIgb3BlbmVycyBhbmQgY2xvc2Vyc1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuaGFuZGxlVHJpZ2dlckNsaWNrcywgdHJ1ZSk7XG4gICAgICAgIC8vIENsb25lIGFuZCByZXBsYWNlIHRoZSBkaWFsb2cgZWxlbWVudCB0byBwcmV2ZW50IG1lbW9yeSBsZWFrcyBjYXVzZWQgYnlcbiAgICAgICAgLy8gZXZlbnQgbGlzdGVuZXJzIHRoYXQgdGhlIGF1dGhvciBtaWdodCBub3QgaGF2ZSBjbGVhbmVkIHVwLlxuICAgICAgICB0aGlzLiRlbC5yZXBsYWNlV2l0aCh0aGlzLiRlbC5jbG9uZU5vZGUodHJ1ZSkpO1xuICAgICAgICAvLyBEaXNwYXRjaCBhIGBkZXN0cm95YCBldmVudFxuICAgICAgICB0aGlzLmZpcmUoJ2Rlc3Ryb3knKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNob3cgdGhlIGRpYWxvZyBlbGVtZW50LCB0cmFwIHRoZSBjdXJyZW50IGZvY3VzIHdpdGhpbiBpdCwgbGlzdGVuIGZvciBzb21lXG4gICAgICogc3BlY2lmaWMga2V5IHByZXNzZXMgYW5kIGZpcmUgYWxsIHJlZ2lzdGVyZWQgY2FsbGJhY2tzIGZvciBgc2hvd2AgZXZlbnRcbiAgICAgKi9cbiAgICBzaG93KGV2ZW50KSB7XG4gICAgICAgIC8vIElmIHRoZSBkaWFsb2cgaXMgYWxyZWFkeSBvcGVuLCBhYm9ydFxuICAgICAgICBpZiAodGhpcy5zaG93bilcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAvLyBLZWVwIGEgcmVmZXJlbmNlIHRvIHRoZSBjdXJyZW50bHkgZm9jdXNlZCBlbGVtZW50IHRvIGJlIGFibGUgdG8gcmVzdG9yZVxuICAgICAgICAvLyBpdCBsYXRlclxuICAgICAgICB0aGlzLnNob3duID0gdHJ1ZTtcbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlQXR0cmlidXRlKCdhcmlhLWhpZGRlbicpO1xuICAgICAgICB0aGlzLnByZXZpb3VzbHlGb2N1c2VkID0gZ2V0QWN0aXZlRWxlbWVudCgpO1xuICAgICAgICAvLyBEdWUgdG8gYSBsb25nIGxhc3RpbmcgYnVnIGluIFNhZmFyaSwgY2xpY2tpbmcgYW4gaW50ZXJhY3RpdmUgZWxlbWVudFxuICAgICAgICAvLyAobGlrZSBhIDxidXR0b24+KSBkb2VzICpub3QqIG1vdmUgdGhlIGZvY3VzIHRvIHRoYXQgZWxlbWVudCwgd2hpY2ggbWVhbnNcbiAgICAgICAgLy8gYGRvY3VtZW50LmFjdGl2ZUVsZW1lbnRgIGlzIHdoYXRldmVyIGVsZW1lbnQgaXMgY3VycmVudGx5IGZvY3VzZWQgKGxpa2VcbiAgICAgICAgLy8gYW4gPGlucHV0PiksIG9yIHRoZSA8Ym9keT4gZWxlbWVudCBvdGhlcndpc2UuIFdlIGNhbiB3b3JrIGFyb3VuZCB0aGF0XG4gICAgICAgIC8vIHByb2JsZW0gYnkgY2hlY2tpbmcgd2hldGhlciB0aGUgZm9jdXNlZCBlbGVtZW50IGlzIHRoZSA8Ym9keT4sIGFuZCBpZiBpdCxcbiAgICAgICAgLy8gc3RvcmUgdGhlIGNsaWNrIGV2ZW50IHRhcmdldC5cbiAgICAgICAgLy8gU2VlOiBodHRwczovL2J1Z3Mud2Via2l0Lm9yZy9zaG93X2J1Zy5jZ2k/aWQ9MjIyNjFcbiAgICAgICAgaWYgKHRoaXMucHJldmlvdXNseUZvY3VzZWQ/LnRhZ05hbWUgPT09ICdCT0RZJyAmJiBldmVudD8udGFyZ2V0KSB7XG4gICAgICAgICAgICB0aGlzLnByZXZpb3VzbHlGb2N1c2VkID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIC8vIFNldCB0aGUgZm9jdXMgdG8gdGhlIGRpYWxvZyBlbGVtZW50XG4gICAgICAgIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL0tpdHR5R2lyYXVkZWwvYTExeS1kaWFsb2cvcHVsbC81ODNcbiAgICAgICAgaWYgKGV2ZW50Py50eXBlID09PSAnZm9jdXMnKSB7XG4gICAgICAgICAgICB0aGlzLm1haW50YWluRm9jdXMoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgbW92ZUZvY3VzVG9EaWFsb2codGhpcy4kZWwpO1xuICAgICAgICB9XG4gICAgICAgIC8vIEJpbmQgYSBmb2N1cyBldmVudCBsaXN0ZW5lciB0byB0aGUgYm9keSBlbGVtZW50IHRvIG1ha2Ugc3VyZSB0aGUgZm9jdXNcbiAgICAgICAgLy8gc3RheXMgdHJhcHBlZCBpbnNpZGUgdGhlIGRpYWxvZyB3aGlsZSBvcGVuLCBhbmQgc3RhcnQgbGlzdGVuaW5nIGZvciBzb21lXG4gICAgICAgIC8vIHNwZWNpZmljIGtleSBwcmVzc2VzIChUQUIgYW5kIEVTQylcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hZGRFdmVudExpc3RlbmVyKCdmb2N1cycsIHRoaXMubWFpbnRhaW5Gb2N1cywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuJGVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCB0aGlzLmJpbmRLZXlwcmVzcywgdHJ1ZSk7XG4gICAgICAgIC8vIERpc3BhdGNoIGEgYHNob3dgIGV2ZW50XG4gICAgICAgIHRoaXMuZmlyZSgnc2hvdycsIGV2ZW50KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEhpZGUgdGhlIGRpYWxvZyBlbGVtZW50LCByZXN0b3JlIHRoZSBmb2N1cyB0byB0aGUgcHJldmlvdXNseSBhY3RpdmVcbiAgICAgKiBlbGVtZW50LCBzdG9wIGxpc3RlbmluZyBmb3Igc29tZSBzcGVjaWZpYyBrZXkgcHJlc3NlcyBhbmQgZmlyZSBhbGxcbiAgICAgKiByZWdpc3RlcmVkIGNhbGxiYWNrcyBmb3IgYGhpZGVgIGV2ZW50XG4gICAgICovXG4gICAgaGlkZShldmVudCkge1xuICAgICAgICAvLyBJZiB0aGUgZGlhbG9nIGlzIGFscmVhZHkgY2xvc2VkLCBhYm9ydFxuICAgICAgICBpZiAoIXRoaXMuc2hvd24pXG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgdGhpcy5zaG93biA9IGZhbHNlO1xuICAgICAgICB0aGlzLiRlbC5zZXRBdHRyaWJ1dGUoJ2FyaWEtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgdGhpcy5wcmV2aW91c2x5Rm9jdXNlZD8uZm9jdXM/LigpO1xuICAgICAgICAvLyBSZW1vdmUgdGhlIGZvY3VzIGV2ZW50IGxpc3RlbmVyIHRvIHRoZSBib2R5IGVsZW1lbnQgYW5kIHN0b3AgbGlzdGVuaW5nXG4gICAgICAgIC8vIGZvciBzcGVjaWZpYyBrZXkgcHJlc3Nlc1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2ZvY3VzJywgdGhpcy5tYWludGFpbkZvY3VzLCB0cnVlKTtcbiAgICAgICAgdGhpcy4kZWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIHRoaXMuYmluZEtleXByZXNzLCB0cnVlKTtcbiAgICAgICAgLy8gRGlzcGF0Y2ggYSBgaGlkZWAgZXZlbnRcbiAgICAgICAgdGhpcy5maXJlKCdoaWRlJywgZXZlbnQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogUmVnaXN0ZXIgYSBuZXcgY2FsbGJhY2sgZm9yIHRoZSBnaXZlbiBldmVudCB0eXBlXG4gICAgICovXG4gICAgb24odHlwZSwgaGFuZGxlciwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLiRlbC5hZGRFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogVW5yZWdpc3RlciBhbiBleGlzdGluZyBjYWxsYmFjayBmb3IgdGhlIGdpdmVuIGV2ZW50IHR5cGVcbiAgICAgKi9cbiAgICBvZmYodHlwZSwgaGFuZGxlciwgb3B0aW9ucykge1xuICAgICAgICB0aGlzLiRlbC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIsIG9wdGlvbnMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGlzcGF0Y2ggYSBjdXN0b20gZXZlbnQgZnJvbSB0aGUgRE9NIGVsZW1lbnQgYXNzb2NpYXRlZCB3aXRoIHRoaXMgZGlhbG9nLlxuICAgICAqIFRoaXMgYWxsb3dzIGF1dGhvcnMgdG8gbGlzdGVuIGZvciBhbmQgcmVzcG9uZCB0byB0aGUgZXZlbnRzIGluIHRoZWlyIG93blxuICAgICAqIGNvZGVcbiAgICAgKi9cbiAgICBmaXJlKHR5cGUsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuJGVsLmRpc3BhdGNoRXZlbnQobmV3IEN1c3RvbUV2ZW50KHR5cGUsIHtcbiAgICAgICAgICAgIGRldGFpbDogZXZlbnQsXG4gICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlLFxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFkZCBhIGRlbGVnYXRlZCBldmVudCBsaXN0ZW5lciBmb3Igd2hlbiBlbGVtZW10cyB0aGF0IG9wZW4gb3IgY2xvc2UgdGhlXG4gICAgICogZGlhbG9nIGFyZSBjbGlja2VkLCBhbmQgY2FsbCBgc2hvd2Agb3IgYGhpZGVgLCByZXNwZWN0aXZlbHlcbiAgICAgKi9cbiAgICBoYW5kbGVUcmlnZ2VyQ2xpY2tzKGV2ZW50KSB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IGV2ZW50LnRhcmdldDtcbiAgICAgICAgLy8gV2UgdXNlIGAuY2xvc2VzdCguLilgIGFuZCBub3QgYC5tYXRjaGVzKC4uKWAgaGVyZSBzbyB0aGF0IGNsaWNraW5nXG4gICAgICAgIC8vIGFuIGVsZW1lbnQgbmVzdGVkIHdpdGhpbiBhIGRpYWxvZyBvcGVuZXIgZG9lcyBjYXVzZSB0aGUgZGlhbG9nIHRvIG9wZW5cbiAgICAgICAgaWYgKHRhcmdldC5jbG9zZXN0KGBbZGF0YS1hMTF5LWRpYWxvZy1zaG93PVwiJHt0aGlzLmlkfVwiXWApKSB7XG4gICAgICAgICAgICB0aGlzLnNob3coZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0YXJnZXQuY2xvc2VzdChgW2RhdGEtYTExeS1kaWFsb2ctaGlkZT1cIiR7dGhpcy5pZH1cIl1gKSB8fFxuICAgICAgICAgICAgKHRhcmdldC5jbG9zZXN0KCdbZGF0YS1hMTF5LWRpYWxvZy1oaWRlXScpICYmXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsb3Nlc3QoJ1thcmlhLW1vZGFsPVwidHJ1ZVwiXScpID09PSB0aGlzLiRlbCkpIHtcbiAgICAgICAgICAgIHRoaXMuaGlkZShldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogUHJpdmF0ZSBldmVudCBoYW5kbGVyIHVzZWQgd2hlbiBsaXN0ZW5pbmcgdG8gc29tZSBzcGVjaWZpYyBrZXkgcHJlc3Nlc1xuICAgICAqIChuYW1lbHkgRVNDIGFuZCBUQUIpXG4gICAgICovXG4gICAgYmluZEtleXByZXNzKGV2ZW50KSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYW4gZXNjYXBlIGhhdGNoIGluIGNhc2UgdGhlcmUgYXJlIG5lc3RlZCBvcGVuIGRpYWxvZ3MsIHNvIHRoYXRcbiAgICAgICAgLy8gb25seSB0aGUgdG9wIG1vc3QgZGlhbG9nIGdldHMgaW50ZXJhY3RlZCB3aXRoXG4gICAgICAgIGlmIChkb2N1bWVudC5hY3RpdmVFbGVtZW50Py5jbG9zZXN0KCdbYXJpYS1tb2RhbD1cInRydWVcIl0nKSAhPT0gdGhpcy4kZWwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBsZXQgaGFzT3BlblBvcG92ZXIgPSBmYWxzZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGhhc09wZW5Qb3BvdmVyID0gISF0aGlzLiRlbC5xdWVyeVNlbGVjdG9yKCdbcG9wb3Zlcl06bm90KFtwb3BvdmVyPVwibWFudWFsXCJdKTpwb3BvdmVyLW9wZW4nKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCB7XG4gICAgICAgICAgICAvLyBSdW4gdGhhdCBET00gcXVlcnkgaW4gYSB0cnkvY2F0Y2ggYmVjYXVzZSBub3QgYWxsIGJyb3dzZXJzIHN1cHBvcnQgdGhlXG4gICAgICAgICAgICAvLyBgOnBvcG92ZXItb3BlbmAgc2VsZWN0b3IsIHdoaWNoIHdvdWxkIGNhdXNlIHRoZSB3aG9sZSBleHByZXNzaW9uIHRvXG4gICAgICAgICAgICAvLyBmYWlsXG4gICAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vY2FuaXVzZS5jb20vbWRuLWNzc19zZWxlY3RvcnNfcG9wb3Zlci1vcGVuXG4gICAgICAgICAgICAvLyBTZWU6IGh0dHBzOi8vZ2l0aHViLmNvbS9LaXR0eUdpcmF1ZGVsL2ExMXktZGlhbG9nL3B1bGwvNTc4I2Rpc2N1c3Npb25fcjEzNDMyMTUxNDlcbiAgICAgICAgfVxuICAgICAgICAvLyBJZiB0aGUgZGlhbG9nIGlzIHNob3duIGFuZCB0aGUgRVNDIGtleSBpcyBwcmVzc2VkLCBwcmV2ZW50IGFueSBmdXJ0aGVyXG4gICAgICAgIC8vIGVmZmVjdHMgZnJvbSB0aGUgRVNDIGtleSBhbmQgaGlkZSB0aGUgZGlhbG9nLCB1bmxlc3M6XG4gICAgICAgIC8vIC0gaXRzIHJvbGUgaXMgYGFsZXJ0ZGlhbG9nYCwgd2hpY2ggbWVhbnMgaXQgc2hvdWxkIGJlIG1vZGFsXG4gICAgICAgIC8vIC0gb3IgaXQgY29udGFpbnMgYW4gb3BlbiBwb3BvdmVyLCBpbiB3aGljaCBjYXNlIEVTQyBzaG91bGQgY2xvc2UgaXRcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScgJiZcbiAgICAgICAgICAgIHRoaXMuJGVsLmdldEF0dHJpYnV0ZSgncm9sZScpICE9PSAnYWxlcnRkaWFsb2cnICYmXG4gICAgICAgICAgICAhaGFzT3BlblBvcG92ZXIpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGlzLmhpZGUoZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIC8vIElmIHRoZSBkaWFsb2cgaXMgc2hvd24gYW5kIHRoZSBUQUIga2V5IGlzIHByZXNzZWQsIG1ha2Ugc3VyZSB0aGUgZm9jdXNcbiAgICAgICAgLy8gc3RheXMgdHJhcHBlZCB3aXRoaW4gdGhlIGRpYWxvZyBlbGVtZW50XG4gICAgICAgIGlmIChldmVudC5rZXkgPT09ICdUYWInKSB7XG4gICAgICAgICAgICB0cmFwVGFiS2V5KHRoaXMuJGVsLCBldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogSWYgdGhlIGRpYWxvZyBpcyBzaG93biBhbmQgdGhlIGZvY3VzIGlzIG5vdCB3aXRoaW4gYSBkaWFsb2cgZWxlbWVudCAoZWl0aGVyXG4gICAgICogdGhpcyBvbmUgb3IgYW5vdGhlciBvbmUgaW4gY2FzZSBvZiBuZXN0ZWQgZGlhbG9ncykgb3IgYXR0cmlidXRlLCBtb3ZlIGl0XG4gICAgICogYmFjayB0byB0aGUgZGlhbG9nIGNvbnRhaW5lclxuICAgICAqIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL0tpdHR5R2lyYXVkZWwvYTExeS1kaWFsb2cvaXNzdWVzLzE3N1xuICAgICAqL1xuICAgIG1haW50YWluRm9jdXMoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgICBpZiAoIXRhcmdldC5jbG9zZXN0KCdbYXJpYS1tb2RhbD1cInRydWVcIl0sIFtkYXRhLWExMXktZGlhbG9nLWlnbm9yZS1mb2N1cy10cmFwXScpKSB7XG4gICAgICAgICAgICBtb3ZlRm9jdXNUb0RpYWxvZyh0aGlzLiRlbCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmZ1bmN0aW9uIGluc3RhbnRpYXRlRGlhbG9ncygpIHtcbiAgICBmb3IgKGNvbnN0IGVsIG9mIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWExMXktZGlhbG9nXScpKSB7XG4gICAgICAgIG5ldyBBMTF5RGlhbG9nKGVsKTtcbiAgICB9XG59XG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlID09PSAnbG9hZGluZycpIHtcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIGluc3RhbnRpYXRlRGlhbG9ncyk7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICBpbnN0YW50aWF0ZURpYWxvZ3MoKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7IEExMXlEaWFsb2cgYXMgZGVmYXVsdCB9O1xuIiwgImltcG9ydCBBMTF5RGlhbG9nIGZyb20gJ2ExMXktZGlhbG9nJztcclxuXHJcbmNvbnN0IGRpYWxvZ3MgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBkaWFsb2dzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLWRpYWxvZycpO1xyXG5cclxuICAgIGlmICghZGlhbG9ncy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICBkaWFsb2dzLmZvckVhY2goZGlhbG9nID0+IHtcclxuICAgICAgICBjb25zdCBlbCA9IG5ldyBBMTF5RGlhbG9nKGRpYWxvZyk7XHJcblxyXG4gICAgICAgIGVsLm9uKCdzaG93JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCgnb3ZlcmZsb3ctaGlkZGVuJyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGVsLm9uKCdoaWRlJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnb3ZlcmZsb3ctaGlkZGVuJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuY29uc3QgZm9ybXNBY2Nlc3NEaWFsb2cgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBkaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybXMtbGlicmFyeS1kaWFsb2cnKTtcclxuXHJcbiAgICBpZiAoIWRpYWxvZykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGhpZGRlblRyaWdnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hMTF5LWRpYWxvZy1zaG93PVwiZm9ybXMtbGlicmFyeS1kaWFsb2dcIl0nKTtcclxuICAgIGNvbnN0IGNsb3NlVHJpZ2dlciA9IGRpYWxvZy5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hMTF5LWRpYWxvZy1oaWRlXScpO1xyXG4gICAgY29uc3QgY2hlY2tib3ggPSBkaWFsb2cucXVlcnlTZWxlY3RvcignLmRpYWxvZy1jb250ZW50LWZvb3RlciBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcclxuICAgIGNvbnN0IHN1Ym1pdCA9IGRpYWxvZy5xdWVyeVNlbGVjdG9yKCcuZGlhbG9nLWNvbnRlbnQtZm9vdGVyIC5idG4tcHJpbWFyeScpO1xyXG4gICAgXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZm9ybXMtYWNjZXNzLWFwcHJvdmVkJykpIHtcclxuICAgICAgICAgICAgaGlkZGVuVHJpZ2dlci5jbGljaygpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKGUudGFyZ2V0LmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgc3VibWl0LnJlbW92ZUF0dHJpYnV0ZSgnZGlzYWJsZWQnKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzdWJtaXQuc2V0QXR0cmlidXRlKCdkaXNhYmxlZCcsICdkaXNhYmxlZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIHN1Ym1pdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnZm9ybXMtYWNjZXNzLWFwcHJvdmVkJykpIHtcclxuICAgICAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2Zvcm1zLWFjY2Vzcy1hcHByb3ZlZCcsIHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY2xvc2VUcmlnZ2VyLmNsaWNrKCk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuZXhwb3J0IHsgZGlhbG9ncywgZm9ybXNBY2Nlc3NEaWFsb2cgfTsiLCAiY29uc3QgaG9tZUhlcm8gPSAoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgdGFiID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNhbGVuZGFyLXRhYicpO1xyXG4gICAgY29uc3QgdGFiUGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY2FsZW5kYXItcGFuZWwnKTtcclxuXHJcbiAgICBpZiAoIXRhYikgcmV0dXJuO1xyXG5cclxuICAgIHRhYi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdGFiUGFuZWwuY2xhc3NMaXN0LnRvZ2dsZShcImlzLWFjdGl2ZVwiKTtcclxuICAgICAgICB0YWIuY2xhc3NMaXN0LnRvZ2dsZShcImlzLWFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGhvbWVIZXJvOyIsICJjb25zdCBwbGF5TGlzdCA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnanMtcGxheWxpc3QtcGxheWVyJyk7XHJcbiAgICBjb25zdCBkYXRlVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wbGF5bGlzdC1kYXRlJyk7XHJcbiAgICBjb25zdCB0aXRsZVRleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcGxheWxpc3QtdGl0bGUnKTtcclxuICAgIGNvbnN0IGRlc2NyVGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wbGF5bGlzdC1kZXNjcmlwdGlvbicpO1xyXG4gICAgY29uc3QgcGxheWxpc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1wbGF5bGlzdC1pdGVtJyk7XHJcblxyXG4gICAgY29uc3QgdXBkYXRlVmlldyA9ICh7IHRpdGxlLCBkZXNjcmlwdGlvbiwgZGF0ZSwgeXQgfSkgPT4ge1xyXG5cclxuICAgICAgICB3aW5kb3cuc2Nyb2xsVG8oe1xyXG4gICAgICAgICAgICB0b3A6IDEyMCxcclxuICAgICAgICAgICAgbGVmdDogMCxcclxuICAgICAgICAgICAgYmVoYXZpb3I6IFwic21vb3RoXCIsXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHBsYXllci5zcmMgPSBgaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvJHt5dH0/YXV0b3BsYXk9MWA7XHJcbiAgICAgICAgZGF0ZVRleHQuaW5uZXJIVE1MID0gZGF0ZTtcclxuICAgICAgICB0aXRsZVRleHQuaW5uZXJIVE1MID0gdGl0bGU7XHJcbiAgICAgICAgZGVzY3JUZXh0LmlubmVySFRNTCA9IGRlc2NyaXB0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGhhbmRsZUFjdGl2ZSA9IChhY3RpdmVJdGVtKSA9PiB7XHJcbiAgICAgICAgY29uc3QgY3VycmVudEFjdGl2ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1wbGF5bGlzdC1pdGVtW2FyaWEtc2VsZWN0ZWQ9XCJ0cnVlXCJdJyk7XHJcbiAgICAgICAgY3VycmVudEFjdGl2ZS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgICAgYWN0aXZlSXRlbS5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIFwidHJ1ZVwiKTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5bGlzdEl0ZW1zLmZvckVhY2goKGl0ZW0pID0+IHtcclxuXHJcbiAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgdXBkYXRlVmlldyh7XHJcbiAgICAgICAgICAgICAgICB0aXRsZTogaXRlbS5kYXRhc2V0LnRpdGxlLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246IGl0ZW0uZGF0YXNldC5kZXNjcmlwdGlvbixcclxuICAgICAgICAgICAgICAgIGRhdGU6IGl0ZW0uZGF0YXNldC5kYXRlLFxyXG4gICAgICAgICAgICAgICAgeXQ6IGl0ZW0uZGF0YXNldC55dFxyXG4gICAgICAgICAgICB9KVxyXG5cclxuICAgICAgICAgICAgaGFuZGxlQWN0aXZlKGl0ZW0pO1xyXG4gICAgICAgICAgICBcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBwbGF5TGlzdDsiLCAiY29uc3QgaG90VGlwTGlicmFyeSA9ICgpID0+IHtcclxuICAgIFxyXG4gICAgY29uc3QgcGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcclxuICAgIGNvbnN0IHJlc3VsdHNMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWhvdC10aXAtbGlzdCcpO1xyXG5cclxuICAgIGlmICghcmVzdWx0c0xpc3QpIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBtb2JpbGVDYXRlZ29yeVNlbGVjdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1tb2JpbGUtaG90LXRpcC1jYXRlZ29yeScpO1xyXG4gICAgY29uc3QgbW9iaWxlU3ViY2F0ZWdvcnlTZWxlY3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbW9iaWxlLWhvdC10aXAtc3ViY2F0ZWdvcnknKTtcclxuICAgIGNvbnN0IGRlc2t0b3BTdWJjYXRlZ29yeUZpbHRlcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtZGVza3RvcC1zdWJjYXRlZ29yeS1maWx0ZXInKTtcclxuXHJcbiAgICBsZXQgc2VsZWN0ZWRDYXRlZ29yeSA9IHBhcmFtcy5oYXMoJ2NhdGVnb3J5JykgPyBwYXJhbXMuZ2V0KCdjYXRlZ29yeScpIDogJyc7XHJcbiAgICBsZXQgc2VsZWN0ZWRTdWJjYXRlZ29yeSA9IHBhcmFtcy5oYXMoJ3N1YmNhdGVnb3J5JykgPyBbcGFyYW1zLmdldCgnc3ViY2F0ZWdvcnknKV0gOiBbXTtcclxuXHJcbiAgICBjb25zdCBwYWdpbmF0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWhvdC10aXAtbGlzdC1wYWdpbmF0aW9uJyk7XHJcbiAgICBsZXQgcGFnZU51bWJlciA9IDE7XHJcbiAgICBjb25zdCBwYWdlU2l6ZSA9IDEwO1xyXG4gICAgbGV0IHRvdGFsUmVzdWx0cyA9IDA7XHJcbiAgICBsZXQgdG90YWxSZXN1bHRQYWdlcyA9IDA7XHJcblxyXG4gICAgZ2V0UmVzdWx0cygpO1xyXG4gICAgaGFuZGxlRmlsdGVyRXZlbnRzKCk7XHJcblxyXG4gICAgLy8vXHJcblxyXG4gICAgY29uc3Qgc2Nyb2xsQmFja1RvcCA9ICgpID0+IHtcclxuICAgICAgICByZXN1bHRzTGlzdC5zY3JvbGxJbnRvVmlldyh7XHJcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcclxuICAgICAgICAgICAgYmxvY2s6ICdzdGFydCcsXHJcbiAgICAgICAgICAgIGlubGluZTogJ25lYXJlc3QnXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xlYXJSZXN1bHRzKCkge1xyXG4gICAgICAgIHJlc3VsdHNMaXN0LmlubmVySFRNTCA9ICcnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFJlc3VsdHMoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9Ib3RUaXBzJywge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgXCJjYXRlZ29yeVwiOiBzZWxlY3RlZENhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgXCJzdWJDYXRlZ29yeVwiOiBzZWxlY3RlZFN1YmNhdGVnb3J5LFxyXG4gICAgICAgICAgICAgICAgXCJwYWdpbmF0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgICAgICBcInBhZ2VOdW1iZXJcIjogcGFnZU51bWJlcixcclxuICAgICAgICAgICAgICAgICAgICBcInBhZ2VTaXplXCI6IHBhZ2VTaXplXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGRhdGEpO1xyXG5cclxuICAgICAgICAgICAgICAgIHJlbmRlclJlc3VsdHMoZGF0YS5ob3RUaXBzKTtcclxuICAgICAgICAgICAgICAgIGhhbmRsZUNhcmRUb2dnbGVzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgdG90YWxSZXN1bHRzID0gZGF0YS5zZWFyY2hJbmZvLnRvdGFsUmVzdWx0cztcclxuICAgICAgICAgICAgICAgIHRvdGFsUmVzdWx0UGFnZXMgPSBNYXRoLmNlaWwodG90YWxSZXN1bHRzIC8gcGFnZVNpemUpO1xyXG4gICAgICAgICAgICAgICAgY3JlYXRlUGFnaW5hdGlvbih0b3RhbFJlc3VsdFBhZ2VzKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyUmVzdWx0cyhyZXN1bHRzKSB7XHJcbiAgICAgICAgY2xlYXJSZXN1bHRzKCk7XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXN1bHRzLmZvckVhY2gocmVzdWx0ID0+IHtcclxuICAgICAgICAgICAgICAgIGxldCBwdWJsaXNoRGF0ZSA9IG5ldyBEYXRlKHJlc3VsdC5wdWJsaXNoRGF0ZSk7XHJcbiAgICAgICAgICAgICAgICBsZXQgc3ViY2F0ZWdvcmllcyA9IHJlc3VsdC5zdWJDYXRlZ29yeTtcclxuXHJcbiAgICAgICAgICAgICAgICByZXN1bHRzTGlzdC5pbm5lckhUTUwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1iLTIgcC00IHBiLTIgYmctbGlnaHRcIiBpdGVtc2NvcGUgaXRlbXR5cGU9XCJodHRwczovL3NjaGVtYS5vcmcvUXVlc3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1mbGV4IGFsaWduLWl0ZW1zLWxnLWNlbnRlciBtYi0zIGZ3LXNlbWlib2xkXCIgc3R5bGU9XCJmb250LXNpemU6IDAuNzVyZW07XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmbGV4LWdyb3ctMVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJkLWlubGluZS1ibG9jayBtYi0xIG1lLTEgcHgtMyBweS0yIHJvdW5kZWQtcGlsbCBiZy1zZWNvbmRhcnkgdGV4dC13aGl0ZVwiPiR7cmVzdWx0LmNhdGVnb3J5fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7T2JqZWN0LmtleXMoc3ViY2F0ZWdvcmllcykubWFwKHN1YmNhdGVnb3J5ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPVwiZC1pbmxpbmUtYmxvY2sgbWItMSBtZS0xIHB4LTMgcHktMiByb3VuZGVkLXBpbGwgYmctcHJpbWFyeSB0ZXh0LXdoaXRlXCI+JHtyZXN1bHQuc3ViQ2F0ZWdvcnlbc3ViY2F0ZWdvcnldfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgfSkuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8dGltZSBpdGVtcHJvcD1cImRhdGVDcmVhdGVkXCIgZGF0ZXRpbWU9XCIke3B1Ymxpc2hEYXRlfVwiPiR7cHVibGlzaERhdGUuZ2V0TW9udGgoKSArIDF9LyR7cHVibGlzaERhdGUuZ2V0RGF0ZSgpfS8ke3B1Ymxpc2hEYXRlLmdldEZ1bGxZZWFyKCl9PC90aW1lPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJob3QtdGlwLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpdGVtcHJvcD1cIm5hbWVcIiBjbGFzcz1cIm1iLTNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7cmVzdWx0LnF1ZXN0aW9ufVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpdGVtcHJvcD1cImFjY2VwdGVkQW5zd2VyXCIgaXRlbXNjb3BlIGl0ZW10eXBlPVwiaHR0cHM6Ly9zY2hlbWEub3JnL0Fuc3dlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBpdGVtcHJvcD1cInRleHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Jlc3VsdC5hbnN3ZXJ9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImhvdC10aXAtdG9nZ2xlIHB5LTNcIiB0eXBlPVwiYnV0dG9uXCI+UmVhZCBBbnN3ZXI8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXN1bHRzTGlzdC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cInBiLTUgcGItbGctMTAgdGV4dC1jZW50ZXJcIj5Tb3JyeSwgdGhlcmUgYXJlIG5vIHJlc3VsdHMgdGhhdCBtYXRjaCB0aGUgc2VhcmNoIGNyaXRlcmlhLjwvZGl2Pic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZUNhcmRUb2dnbGVzKCkge1xyXG4gICAgICAgIGNvbnN0IHRvZ2dsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuaG90LXRpcC10b2dnbGUnKTtcclxuXHJcbiAgICAgICAgdG9nZ2xlcy5mb3JFYWNoKHRvZ2dsZSA9PiB7XHJcbiAgICAgICAgICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsZXQgdG9nZ2xlID0gZS50YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICBsZXQgY29udGVudCA9IGUudGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgIGlmIChjb250ZW50LmNsYXNzTGlzdC5jb250YWlucygnaG90LXRpcC1jb250ZW50LS1leHBhbmRlZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlLmlubmVyVGV4dCA9ICdSZWFkIEFuc3dlcic7XHJcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKCdob3QtdGlwLWNvbnRlbnQtLWV4cGFuZGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvZ2dsZS5pbm5lclRleHQgPSAnQ2xvc2UgQW5zd2VyJztcclxuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5hZGQoJ2hvdC10aXAtY29udGVudC0tZXhwYW5kZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlRmlsdGVyRXZlbnRzKCkge1xyXG4gICAgICAgIG1vYmlsZUNhdGVnb3J5U2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLnRhcmdldC52YWx1ZSA9PT0gJycpIHtcclxuICAgICAgICAgICAgICAgIHBhcmFtcy5kZWxldGUoJ2NhdGVnb3J5Jyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwYXJhbXMuc2V0KCdjYXRlZ29yeScsIGUudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcGFyYW1zLmRlbGV0ZSgnc3ViY2F0ZWdvcnknKTsgLy8gaWYgY2hhbmdpbmcgY2F0ZWdvcnkgdGhlbiBzdWJjYXRlZ29yaWVzIG5vIGxvbmdlciBtYXRjaFxyXG4gICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uc2VhcmNoID0gcGFyYW1zLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChtb2JpbGVTdWJjYXRlZ29yeVNlbGVjdCkge1xyXG4gICAgICAgICAgICBtb2JpbGVTdWJjYXRlZ29yeVNlbGVjdC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LnZhbHVlID09PSAnJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5kZWxldGUoJ3N1YmNhdGVnb3J5Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhcmFtcy5zZXQoJ3N1YmNhdGVnb3J5JywgZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5zZWFyY2ggPSBwYXJhbXMudG9TdHJpbmcoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGVza3RvcFN1YmNhdGVnb3J5RmlsdGVycy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgZGVza3RvcFN1YmNhdGVnb3J5RmlsdGVycy5mb3JFYWNoKGZpbHRlciA9PiB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZFN1YmNhdGVnb3J5ICE9IGUudGFyZ2V0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcy5zZXQoJ3N1YmNhdGVnb3J5JywgZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uc2VhcmNoID0gcGFyYW1zLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbGVhclBhZ2luYXRpb24gKCkge1xyXG4gICAgICAgIGlmIChwYWdpbmF0aW9uQ29udGFpbmVyLm5leHRFbGVtZW50U2libGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAocGFnaW5hdGlvbkNvbnRhaW5lci5uZXh0RWxlbWVudFNpYmxpbmcudGFnTmFtZSA9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvbnRhaW5lci5uZXh0RWxlbWVudFNpYmxpbmcucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChwYWdpbmF0aW9uQ29udGFpbmVyLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHBhZ2luYXRpb25Db250YWluZXIucHJldmlvdXNFbGVtZW50U2libGluZy50YWdOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uQ29udGFpbmVyLnByZXZpb3VzRWxlbWVudFNpYmxpbmcucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHBhZ2luYXRpb25Db250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY3JlYXRlUGFnaW5hdGlvbih0b3RhbFBhZ2VzKSB7XHJcblxyXG4gICAgICAgIHRvdGFsUmVzdWx0UGFnZXMgPSBwYXJzZUludCh0b3RhbFJlc3VsdFBhZ2VzKTtcclxuXHJcbiAgICAgICAgY2xlYXJQYWdpbmF0aW9uKCk7XHJcblxyXG4gICAgICAgIGlmICh0b3RhbFBhZ2VzID4gMSkge1xyXG4gICAgICAgICAgICBwYWdpbmF0aW9uQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3B5LTQnKTtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxQYWdlczsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBsZXQgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xyXG5cclxuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgncm9sZScsICdidXR0b24nKTtcclxuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZSgndGl0bGUnLCBgR28gdG8gcGFnZSAke2kgKyAxfWApO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChwYWdlTnVtYmVyID09IChpICsgMSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdjdXJyZW50Jyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gb25seSBzaG93cyBwYWdpbmF0aW9uIG51bWJlcnMgLSszIG9mIGN1cnJlbnQgZm9yIHJlc3VsdHMgbW9yZSB0aGFuIDcgcGFnZXNcclxuICAgICAgICAgICAgICAgIGlmICh0b3RhbFBhZ2VzID4gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoaSA8IHBhZ2VOdW1iZXIgJiYgaSA+IChwYWdlTnVtYmVyIC0gNSkpIHx8IChpID4gKHBhZ2VOdW1iZXIgLSAxKSAmJiBpIDwgKChwYWdlTnVtYmVyIC0gMSkgKyA0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZCgnZC1pbmxpbmUtYmxvY2snKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGxpLnRleHRDb250ZW50ID0gaSArIDE7XHJcblxyXG4gICAgICAgICAgICAgICAgbGkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbGVhclJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFja1RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvbnRhaW5lci5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwYWdlTnVtYmVyID4gMSkgeyAvLyBzaG93IHByZXZpb3VzIGJ1dHRvblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgICAgICBwcmV2QnRuLmNsYXNzTGlzdC5hZGQoJ2J0bi1wcmV2Jyk7XHJcbiAgICAgICAgICAgICAgICBwcmV2QnRuLnNldEF0dHJpYnV0ZSgndGl0bGUnLCAnR28gdG8gcHJldmlvdXMgcGFnZScpO1xyXG5cclxuICAgICAgICAgICAgICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciAtPSAxO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjbGVhclJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBnZXRSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFja1RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkNvbnRhaW5lci5iZWZvcmUocHJldkJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwYWdlTnVtYmVyIDwgdG90YWxQYWdlcykgeyAvLyBzaG93IG5leHQgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgICAgIG5leHRCdG4uY2xhc3NMaXN0LmFkZCgnYnRuLW5leHQnKTtcclxuICAgICAgICAgICAgICAgIG5leHRCdG4uc2V0QXR0cmlidXRlKCd0aXRsZScsICdHbyB0byBuZXh0IHBhZ2UnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXIgKz0gMTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZ2V0UmVzdWx0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJhY2tUb3AoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25Db250YWluZXIuYWZ0ZXIobmV4dEJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgaG90VGlwTGlicmFyeTsiLCAiY29uc3QgYWxlcnQgPSAoKSA9PiB7XHJcblxyXG4gICAgY29uc3QgY2xvc2VBbGVydCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1hbGVydC1jbG9zZScpO1xyXG4gICAgY29uc3QgYWxlcnRCYW5uZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2l0ZS1hbGVydCcpO1xyXG5cclxuICAgIGNvbnN0IHNldENvb2tpZSA9ICh0aW1lc3RhbXAsIGV4cCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xyXG4gICAgICAgIGNvbnN0IG1pbnV0ZXMgPSA2MCAqIDI0ICogcGFyc2VJbnQoZXhwKTsvLzEgbW9udGhcclxuICAgICAgICBub3cuc2V0VGltZShub3cuZ2V0VGltZSgpICsgKG1pbnV0ZXMgKiA2MCAqIDEwMDApKTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gYHdyYV9hbGVydF9iYW5uZXI9JHt0aW1lc3RhbXB9O2V4cGlyZXM9YCArIG5vdy50b1VUQ1N0cmluZygpICsgXCI7XCI7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNsb3NlQWxlcnQgIT09IG51bGwpIHtcclxuICAgICAgICBjbG9zZUFsZXJ0LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIGFsZXJ0QmFubmVyLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgdGltZXN0YW1wID0gYWxlcnRCYW5uZXIuZGF0YXNldC50aW1lc3RhbXA7XHJcbiAgICAgICAgICAgIGNvbnN0IGV4cCA9IGFsZXJ0QmFubmVyLmRhdGFzZXQuZXhwaXJhdGlvbjtcclxuICAgICAgICAgICAgc2V0Q29va2llKHRpbWVzdGFtcCwgZXhwKTtcclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGFsZXJ0OyIsICJjb25zdCBhcnRpY2xlRmlsdGVycyA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBmaWx0ZXJSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWFydGljbGUtcmVzdWx0cycpO1xyXG5cclxuICAgIGlmICghZmlsdGVyUmVzdWx0cykgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IGZpbHRlckJ0bnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtYXJ0aWNsZS1maWx0ZXInKTtcclxuICAgIGNvbnN0IGZpbHRlckRyb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWFydGljbGUtZHJvcGRvd24nKTtcclxuXHJcbiAgICBjb25zdCBzZWFyY2hGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ25ld3Mtc2VhcmNoJyk7XHJcbiAgICBjb25zdCBwYWdpbmF0aW9uQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWFydGljbGVzLXBhZ2luYXRpb24nKTtcclxuICAgIGNvbnN0IHJlc3VsdHNMb2FkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcmVzdWx0cy1sb2FkZXInKTtcclxuICAgIGNvbnN0IGZlYXR1cmVkQXJ0aWNsZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzLWZlYXR1cmVkLWFydGljbGVcIik7XHJcblxyXG4gICAgY29uc3QgYXBpRW5kcG9pbnRVcmwgPSBcIi9OZXdzQW5kVXBkYXRlc1wiO1xyXG4gICAgbGV0IHBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgY29uc3QgcGFnZVNpemUgPSAxNTtcclxuXHJcbiAgICBsZXQgdG90YWxSZXN1bHRzID0gMDtcclxuICAgIGxldCB0b3RhbFJlc3VsdFBhZ2VzID0gMDtcclxuXHJcbiAgICAvL1VybHNcclxuXHJcbiAgICBjb25zdCB3aW5kb3dMb2FkUXVlcnlTdHJpbmcgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoO1xyXG4gICAgY29uc3QgdXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3dMb2FkUXVlcnlTdHJpbmcpO1xyXG5cclxuICAgIGxldCBzZWFyY2hQaHJhc2UgPSBcIlwiO1xyXG5cclxuICAgIGlmICh1cmxQYXJhbXMuaGFzKFwic2VhcmNoXCIpKSB7XHJcbiAgICAgICAgc2VhcmNoUGhyYXNlID0gdXJsUGFyYW1zLmdldChcInNlYXJjaFwiKTtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgY2F0ZWdvcnkgPSBcIlwiO1xyXG5cclxuICAgIGlmICh1cmxQYXJhbXMuaGFzKFwiY2F0ZWdvcnlcIikpIHtcclxuICAgICAgICBjYXRlZ29yeSA9IHVybFBhcmFtcy5nZXQoXCJjYXRlZ29yeVwiKTtcclxuICAgIH1cclxuXHJcbiAgICAvL1Jlc3VsdHNcclxuXHJcbiAgICBjb25zdCBzY3JvbGxCYWNrVG9wID0gKCkgPT4ge1xyXG4gICAgICAgIGZpbHRlclJlc3VsdHMuc2Nyb2xsSW50b1ZpZXcoeyBiZWhhdmlvcjogXCJzbW9vdGhcIiwgYmxvY2s6IFwic3RhcnRcIiwgaW5saW5lOiBcIm5lYXJlc3RcIiB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBoYW5kbGVJbmRpY2F0b3JzID0gKHNob3csIHdhaXRMb2FkZXJFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHNob3cgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB3YWl0TG9hZGVyRWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3YWl0TG9hZGVyRWxlbWVudC5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBraWxsUmVzdWx0cyA9ICgpID0+IHtcclxuICAgICAgICBmaWx0ZXJSZXN1bHRzLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgYnRuU3RhdGVzID0gKGNsZWFyQWxsLCBzZXRUb0NhdCkgPT4ge1xyXG5cclxuICAgICAgICBmaWx0ZXJCdG5zLmZvckVhY2goKGZpbHRlckJ0bikgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZmlsdGVyQnRuLnZhbHVlID09IHNldFRvQ2F0ICYmIGNsZWFyQWxsICE9PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJCdG4uc2V0QXR0cmlidXRlKFwiYXJpYS1zZWxlY3RlZFwiLCBcInRydWVcIik7XHJcbiAgICAgICAgICAgICAgICBmaWx0ZXJEcm9wZG93bi52YWx1ZSA9IHNldFRvQ2F0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyQnRuLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgXCJmYWxzZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoZmlsdGVyRHJvcGRvd24udmFsdWUgPT0gc2V0VG9DYXQpIHtcclxuICAgICAgICAgICAgZmlsdGVyRHJvcGRvd24udmFsdWUgPSBzZXRUb0NhdDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmaWx0ZXJEcm9wZG93bi52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGZlYXR1cmVkQXJ0aWNsZUhhbmRsZXIgPSAoYWN0aXZlRmVhdHVyZSwgaGlkZUFsbCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCBmaXJzdENhdFNsdWcgPSBmZWF0dXJlZEFydGljbGVzWzBdLmRhdGFzZXQuZmVhdHVyZWRjYXQ7XHJcblxyXG4gICAgICAgIGZlYXR1cmVkQXJ0aWNsZXMuZm9yRWFjaCgoZmVhdHVyZWRBcnRpY2xlKSA9PiB7XHJcblxyXG4gICAgICAgICAgICBpZiAoaGlkZUFsbCkge1xyXG4gICAgICAgICAgICAgICAgZmVhdHVyZWRBcnRpY2xlLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3QgZmVhdHVyZUNhdGVnb3J5ID0gZmVhdHVyZWRBcnRpY2xlLmRhdGFzZXQuZmVhdHVyZWRjYXQ7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChmZWF0dXJlQ2F0ZWdvcnkgPT0gYWN0aXZlRmVhdHVyZSAmJiBmZWF0dXJlQ2F0ZWdvcnkgIT09IFwiYWxsXCIpIHx8IChmZWF0dXJlQ2F0ZWdvcnkgPT0gXCJhbGxcIiAmJiBhY3RpdmVGZWF0dXJlID09IFwiXCIpIHx8IGFjdGl2ZUZlYXR1cmUgPT0gXCJcIiAmJiBmZWF0dXJlQ2F0ZWdvcnkgPT0gZmlyc3RDYXRTbHVnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZWRBcnRpY2xlLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlZEFydGljbGUuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUmVzdWx0cyA9IChyZXN1bHRzKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChzZWFyY2hQaHJhc2UgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgYnRuU3RhdGVzKHRydWUsIGNhdGVnb3J5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBidG5TdGF0ZXMoZmFsc2UsIGNhdGVnb3J5KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHsgXHJcblxyXG4gICAgICAgICAgICByZXN1bHRzLmZvckVhY2goKHJlc3VsdCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgICAgIGNvbnN0IHNldEltYWdlID0gcmVzdWx0LmltYWdlICE9PSBcIlwiID8gcmVzdWx0LmltYWdlIDogZmlsdGVyUmVzdWx0cy5kYXRhc2V0LmZhbGxiYWNrO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpbHRlclJlc3VsdHMuaW5uZXJIVE1MICs9IChcclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWJsb2NrIGNvbC1tZC02IGNvbC1sZy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtyZXN1bHQudXJsfVwiIGNsYXNzPVwibmV3cy1jYXJkIG5ld3MtY2FyZC0tbGcgdGV4dC1kZWNvcmF0aW9uLW5vbmUgZC1ibG9jayBwLTRcIiBzdHlsZT1cImNvbG9yOiB2YXIoLS1icy1kYXJrKTtcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWItNCByYXRpbyByYXRpby0xNng5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzZXRJbWFnZX1cIiBsb2FkaW5nPVwibGF6eVwiIGNsYXNzPVwiaW1nLWZsdWlkXCIgd2lkdGg9XCI2NjBcIiBoZWlnaHQ9XCIzMzBcIiBhbHQ9XCIke3Jlc3VsdC50aXRsZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1iLTIgZC1mbGV4IGZsZXgtcm93IGFsaWduLWl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGltZSBjbGFzcz1cImZzLXhzIGZ3LWJvbGRcIiBkYXRldGltZT1cIiR7cmVzdWx0LmRhdGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3Jlc3VsdC5kYXRlRGlzcGxheX1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC90aW1lPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoaXAgY2hpcC0tbm8taG92ZXIgYWxpZ24tc2VsZi1zdGFydFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtyZXN1bHQuY2F0ZWdvcnl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJoNiBtYi0yXCI+JHtyZXN1bHQudGl0bGV9PC9oMz5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImZzLXNtXCI+JHtyZXN1bHQuZXhjZXJwdH08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlclJlc3VsdHMuaW5uZXJIVE1MID0gKGA8ZGl2IGNsYXNzPVwiZC1ibG9jayBjb2wtbWQtMTAgbXgtYXV0byBoNSB0ZXh0LWNlbnRlclwiPk5vIHJlc3VsdHMuIFRyeSBhZ2Fpbi48L2Rpdj5gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBoYW5kbGVJbmRpY2F0b3JzKGZhbHNlLCByZXN1bHRzTG9hZGVyKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuICAgIGNvbnN0IGhhbmRsZUNsZWFyUGFnaW5hdGlvbiA9IChwYWdpbmF0aW9uRWxlbWVudCkgPT4ge1xyXG5cclxuICAgICAgICBpZiAocGFnaW5hdGlvbkVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmIChwYWdpbmF0aW9uRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmcudGFnTmFtZSA9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocGFnaW5hdGlvbkVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAocGFnaW5hdGlvbkVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy50YWdOYW1lID09ICdCVVRUT04nKSB7XHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG5cclxuICAgIH0gIFxyXG5cclxuICAgIGNvbnN0IGNyZWF0ZVBhZ2luYXRpb24gPSAocGFnaW5hdGlvbkVsZW1lbnQsIHJlc3VsdFBhZ2VDb3VudCkgPT4ge1xyXG5cclxuICAgICAgICBjb25zdCB0b3RhbFBhZ2VzID0gcGFyc2VJbnQocmVzdWx0UGFnZUNvdW50KTtcclxuXHJcbiAgICAgICAgaGFuZGxlQ2xlYXJQYWdpbmF0aW9uKHBhZ2luYXRpb25Db250YWluZXIpOy8vY2xlYXIgZmlyc3RcclxuXHJcbiAgICAgICAgLy9udW1iZXJlZCBwYWdlIGJ1dHRvbnNcclxuICAgICAgICBpZiAodG90YWxQYWdlcyA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdG90YWxQYWdlczsgaSsrKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcclxuXHJcbiAgICAgICAgICAgICAgICBsaS5zZXRBdHRyaWJ1dGUoXCJyb2xlXCIsIFwiYnV0dG9uXCIpO1xyXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgYEdvIHRvIHBhZ2UgJHtpICsgMX1gKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocGFnZU51bWJlciA9PSAoaSArIDEpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcImN1cnJlbnRcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy9vbmx5IHNob3dzIHBhZ2luYXRpb24gbnVtYmVycyAtKzMgb2YgY3VycmVudCBmb3IgcmVzdWx0cyBtb3JlIHRoYW4gNyBwYWdlc1xyXG4gICAgICAgICAgICAgICAgaWYgKHRvdGFsUGFnZXMgPiA2KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKChpIDwgcGFnZU51bWJlciAmJiBpID4gKHBhZ2VOdW1iZXIgLSA1KSkgfHwgKGkgPiAocGFnZU51bWJlciAtIDEpICYmIGkgPCAoKHBhZ2VOdW1iZXIgLSAxKSArIDQpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsaS5jbGFzc0xpc3QuYWRkKFwiZC1pbmxpbmUtYmxvY2tcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcImQtbm9uZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwiYXJpYS1oaWRkZW5cIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBsaS50ZXh0Q29udGVudCA9IGkgKyAxO1xyXG5cclxuICAgICAgICAgICAgICAgIGxpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYWNrVG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5hcHBlbmRDaGlsZChsaSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vbmV4dC9wcmV2IGJ1dHRvbnNcclxuICAgICAgICBpZiAodG90YWxQYWdlcyA+IDEpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChwYWdlTnVtYmVyID4gMSkgeyAvL3Nob3cgcHJldmlvdXMgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IHByZXZCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgICAgIHByZXZCdG4uY2xhc3NMaXN0LmFkZChcImJ0bi1wcmV2XCIpO1xyXG4gICAgICAgICAgICAgICAgcHJldkJ0bi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIkdvIHRvIHByZXZpb3VzIHBhZ2VcIik7XHJcblxyXG4gICAgICAgICAgICAgICAgcHJldkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBwYWdlTnVtYmVyIC09IDE7XHJcbiAgICAgICAgICAgICAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzY3JvbGxCYWNrVG9wKCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICBwYWdpbmF0aW9uRWxlbWVudC5iZWZvcmUocHJldkJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmIChwYWdlTnVtYmVyIDwgdG90YWxQYWdlcykgeyAvL3Nob3cgbmV4dCBidXR0b25cclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgbmV4dEJ0biA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xyXG4gICAgICAgICAgICAgICAgbmV4dEJ0bi5jbGFzc0xpc3QuYWRkKFwiYnRuLW5leHRcIik7XHJcbiAgICAgICAgICAgICAgICBuZXh0QnRuLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIFwiR28gdG8gbmV4dCBwYWdlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIG5leHRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciArPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFja1RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQuYWZ0ZXIobmV4dEJ0bik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgfVxyXG4gICAgXHJcblxyXG4gICAgY29uc3QgcG9zdFJlc3VsdHMgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUluZGljYXRvcnModHJ1ZSwgcmVzdWx0c0xvYWRlcik7XHJcblxyXG4gICAgICAgIGxldCBib2R5T2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBcInNlYXJjaFBocmFzZVwiOiBzZWFyY2hQaHJhc2UsXHJcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogZGVjb2RlVVJJQ29tcG9uZW50KGNhdGVnb3J5KSwgLy9uZWVkIHRvIGRlY29kZSBmb3IgQVBJIHBvc3RcclxuICAgICAgICAgICAgXCJwYWdpbmF0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGFnZU51bWJlclwiOiBwYWdlTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgXCJwYWdlU2l6ZVwiOiBwYWdlU2l6ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY2F0ZWdvcnkgPT0gXCJcIiAmJiBzZWFyY2hQaHJhc2UgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgZmVhdHVyZWRBcnRpY2xlSGFuZGxlcihjYXRlZ29yeSwgdHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmVhdHVyZWRBcnRpY2xlSGFuZGxlcihjYXRlZ29yeSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYm9keVJlcXVlc3QgPSBKU09OLnN0cmluZ2lmeShib2R5T2JqZWN0KTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhib2R5UmVxdWVzdClcclxuXHJcbiAgICAgICAgZmV0Y2goYXBpRW5kcG9pbnRVcmwsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBtb2RlOiBcImNvcnNcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlZmVycmVyUG9saWN5OiBcIm5vLXJlZmVycmVyXCIsXHJcbiAgICAgICAgICAgIGJvZHk6IGJvZHlSZXF1ZXN0XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIC8vY29uc29sZS5sb2cocmVzKTtcclxuXHJcbiAgICAgICAgICAgcmVuZGVyUmVzdWx0cyhyZXMubmV3c1JlY29yZHMpO1xyXG5cclxuICAgICAgICAgICB0b3RhbFJlc3VsdHMgPSByZXMuc2VhcmNoUmVzdWx0SW5mby50b3RhbFJlc3VsdHM7XHJcbiAgICAgICAgICAgdG90YWxSZXN1bHRQYWdlcyA9IE1hdGguY2VpbCh0b3RhbFJlc3VsdHMgLyBwYWdlU2l6ZSk7XHJcbiAgICAgICAgICAgY3JlYXRlUGFnaW5hdGlvbihwYWdpbmF0aW9uQ29udGFpbmVyLCB0b3RhbFJlc3VsdFBhZ2VzKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXJsSGFuZGxlciA9IChpc0NhdGVnb3J5KSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChpc0NhdGVnb3J5KSB7IC8vdXNlcyBjYXRlZ29yeSBidXR0b25zXHJcbiAgICAgICAgICAgIHVybFBhcmFtcy5zZXQoJ2NhdGVnb3J5JywgY2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBpZDogYGNhdGVnb3J5LSR7Y2F0ZWdvcnl9YCB9LCAnJywgYCR7bG9jYXRpb24ucGF0aG5hbWV9P2NhdGVnb3J5PSR7Y2F0ZWdvcnl9YCk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy91c2VzIHNlYXJjaCBmaWVsZFxyXG4gICAgICAgICAgICB1cmxQYXJhbXMuc2V0KCdzZWFyY2gnLCBzZWFyY2hQaHJhc2UpO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBpZDogJ3NlYXJjaC1zZWFyY2hQaHJhc2UnIH0sICcnLCBgJHtsb2NhdGlvbi5wYXRobmFtZX0/c2VhcmNoPSR7c2VhcmNoUGhyYXNlfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzZXRFbGVtZW50cyA9IChyZXNldEZvcm0pID0+IHtcclxuICAgICAgICBpZiAocmVzZXRGb3JtKSB7XHJcbiAgICAgICAgICAgIHNlYXJjaEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnRuU3RhdGVzKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL0V2ZW50IEhhbmRsZXJzXHJcblxyXG4gICAgZmlsdGVyQnRucy5mb3JFYWNoKChmaWx0ZXJCdG4pID0+IHtcclxuICAgICAgICBmaWx0ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgIHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5ID0gZmlsdGVyQnRuLnZhbHVlO1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuXHJcbiAgICAgICAgICAgIHVybEhhbmRsZXIodHJ1ZSk7XHJcbiAgICAgICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KVxyXG5cclxuICAgIGZpbHRlckRyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuICAgICAgICBzZWFyY2hQaHJhc2UgPSBcIlwiO1xyXG4gICAgICAgIGNhdGVnb3J5ID0gZS50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcblxyXG4gICAgICAgIHVybEhhbmRsZXIodHJ1ZSk7XHJcbiAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbiAgICB9KVxyXG5cclxuICAgIHNlYXJjaEZvcm0uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG5cclxuICAgICAgICBjYXRlZ29yeSA9IFwiXCI7XHJcbiAgICAgICAgY29uc3QgdGV4dEZpZWxkID0gc2VhcmNoRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xyXG4gICAgICAgIHNlYXJjaFBocmFzZSA9IHRleHRGaWVsZC52YWx1ZTtcclxuICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuXHJcbiAgICAgICAgdXJsSGFuZGxlcihmYWxzZSk7XHJcbiAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgKCkgPT4ge1xyXG5cclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICBjb25zdCBwb3BVcmxDYXRQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG5cclxuICAgICAgICBpZiAocG9wVXJsQ2F0UGFyYW1zLmhhcyhcImNhdGVnb3J5XCIpKSB7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5ID0gcG9wVXJsQ2F0UGFyYW1zLmdldChcImNhdGVnb3J5XCIpO1xyXG4gICAgICAgICAgICBmZWF0dXJlZEFydGljbGVIYW5kbGVyKGNhdGVnb3J5LCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2F0ZWdvcnkgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXNldEVsZW1lbnRzKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcG9wVXJsU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcclxuXHJcbiAgICAgICAgaWYgKHBvcFVybFNlYXJjaFBhcmFtcy5oYXMoXCJzZWFyY2hcIikpIHtcclxuICAgICAgICAgICAgc2VhcmNoUGhyYXNlID0gcG9wVXJsU2VhcmNoUGFyYW1zLmdldChcInNlYXJjaFwiKTtcclxuICAgICAgICAgICAgc2VhcmNoRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID0gc2VhcmNoUGhyYXNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBvbnBhZ2UgbG9hZFxyXG4gICAgaWYgKHVybFBhcmFtcy5oYXMoXCJzZWFyY2hcIikpIHtcclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICBjYXRlZ29yeSA9IFwiXCI7XHJcbiAgICAgICAgc2VhcmNoUGhyYXNlID0gdXJsUGFyYW1zLmdldChcInNlYXJjaFwiKTtcclxuICAgICAgICBzZWFyY2hGb3JtLnF1ZXJ5U2VsZWN0b3IoJ2lucHV0JykudmFsdWUgPSBzZWFyY2hQaHJhc2U7XHJcbiAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgIH0gZWxzZSB7XHJcblxyXG4gICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgICAgIGNyZWF0ZVBhZ2luYXRpb24ocGFnaW5hdGlvbkNvbnRhaW5lciwgZmlsdGVyUmVzdWx0cy5kYXRhc2V0LmNhdHRvdGFsKTtcclxuXHJcbiAgICB9XHJcblxyXG5cclxuXHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXJ0aWNsZUZpbHRlcnM7IiwgIlxyXG5jb25zdCBtdWx0aW1lZGlhRmlsdGVycyA9ICgpID0+IHtcclxuXHJcbiAgICBjb25zdCBmaWx0ZXJSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLW11bHRpbWVkaWEtcmVzdWx0cycpO1xyXG4gICAgaWYgKCFmaWx0ZXJSZXN1bHRzKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgZmlsdGVyQnRucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5qcy1tdWx0aW1lZGlhLWZpbHRlcicpO1xyXG4gICAgY29uc3QgZmlsdGVyRHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbXVsdGltZWRpYS1kcm9wZG93bicpO1xyXG5cclxuICAgIGNvbnN0IHNlYXJjaEZvcm0gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbXVsdGltZWRpYS1zZWFyY2gnKTtcclxuICAgIGNvbnN0IHBhZ2luYXRpb25Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtbXVsdGltZWRpYS1wYWdpbmF0aW9uJyk7XHJcbiAgICBjb25zdCByZXN1bHRzTG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXJlc3VsdHMtbG9hZGVyJyk7XHJcblxyXG4gICAgY29uc3QgZmVhdHVyZWRJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanMtZmVhdHVyZWRcIik7XHJcblxyXG4gICAgY29uc3QgYXBpRW5kcG9pbnRVcmwgPSBcIi9NdWx0aW1lZGlhXCI7XHJcbiAgICBsZXQgcGFnZU51bWJlciA9IDE7XHJcbiAgICBjb25zdCBwYWdlU2l6ZSA9IDE1O1xyXG5cclxuICAgIGxldCB0b3RhbFJlc3VsdHMgPSAwO1xyXG4gICAgbGV0IHRvdGFsUmVzdWx0UGFnZXMgPSAwO1xyXG5cclxuICAgIC8vVXJsc1xyXG5cclxuICAgIGNvbnN0IHdpbmRvd0xvYWRRdWVyeVN0cmluZyA9IHdpbmRvdy5sb2NhdGlvbi5zZWFyY2g7XHJcbiAgICBjb25zdCB1cmxQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvd0xvYWRRdWVyeVN0cmluZyk7XHJcblxyXG4gICAgbGV0IHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcblxyXG4gICAgaWYgKHVybFBhcmFtcy5oYXMoXCJzZWFyY2hcIikpIHtcclxuICAgICAgICBzZWFyY2hQaHJhc2UgPSB1cmxQYXJhbXMuZ2V0KFwic2VhcmNoXCIpO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB0eXBlID0gXCJcIjtcclxuXHJcbiAgICBpZiAodXJsUGFyYW1zLmhhcyhcInR5cGVcIikpIHtcclxuICAgICAgICB0eXBlID0gdXJsUGFyYW1zLmdldChcInR5cGVcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLy9SZXN1bHRzXHJcblxyXG4gICAgY29uc3Qgc2Nyb2xsQmFja1RvcCA9ICgpID0+IHtcclxuICAgICAgICBmaWx0ZXJSZXN1bHRzLnNjcm9sbEludG9WaWV3KHsgYmVoYXZpb3I6IFwic21vb3RoXCIsIGJsb2NrOiBcInN0YXJ0XCIsIGlubGluZTogXCJuZWFyZXN0XCIgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgaGFuZGxlSW5kaWNhdG9ycyA9IChzaG93LCB3YWl0TG9hZGVyRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlmIChzaG93ID09IHRydWUpIHtcclxuICAgICAgICAgICAgd2FpdExvYWRlckVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2FpdExvYWRlckVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qga2lsbFJlc3VsdHMgPSAoKSA9PiB7XHJcbiAgICAgICAgZmlsdGVyUmVzdWx0cy5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGJ0blN0YXRlcyA9IChjbGVhckFsbCwgc2V0VG9DYXQpID0+IHtcclxuXHJcbiAgICAgICAgZmlsdGVyQnRucy5mb3JFYWNoKChmaWx0ZXJCdG4pID0+IHtcclxuICAgICAgICAgICAgaWYgKGZpbHRlckJ0bi52YWx1ZSA9PSBzZXRUb0NhdCAmJiBjbGVhckFsbCAhPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyQnRuLnNldEF0dHJpYnV0ZShcImFyaWEtc2VsZWN0ZWRcIiwgXCJ0cnVlXCIpO1xyXG4gICAgICAgICAgICAgICAgZmlsdGVyRHJvcGRvd24udmFsdWUgPSBzZXRUb0NhdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGZpbHRlckJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLXNlbGVjdGVkXCIsIFwiZmFsc2VcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKGZpbHRlckRyb3Bkb3duLnZhbHVlID09IHNldFRvQ2F0KSB7XHJcbiAgICAgICAgICAgIGZpbHRlckRyb3Bkb3duLnZhbHVlID0gc2V0VG9DYXQ7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmlsdGVyRHJvcGRvd24udmFsdWUgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmZWF0dXJlZEhhbmRsZXIgPSAoYWN0aXZlRmVhdHVyZSwgaGlkZUFsbCkgPT4ge1xyXG5cclxuICAgICAgICBmZWF0dXJlZEl0ZW1zLmZvckVhY2goKGZlYXR1cmVkSXRlbSkgPT4ge1xyXG5cclxuICAgICAgICAgICAgaWYgKGhpZGVBbGwpIHtcclxuICAgICAgICAgICAgICAgIGZlYXR1cmVkSXRlbS5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZmVhdHVyZXR5cGUgPSBmZWF0dXJlZEl0ZW0uZGF0YXNldC5mZWF0dXJlZHR5cGU7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKChmZWF0dXJldHlwZSA9PSBhY3RpdmVGZWF0dXJlICYmIGZlYXR1cmV0eXBlICE9PSBcImFsbFwiKSB8fCAoZmVhdHVyZXR5cGUgPT0gXCJhbGxcIiAmJiBhY3RpdmVGZWF0dXJlID09IFwiXCIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmVhdHVyZWRJdGVtLmhpZGRlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBmZWF0dXJlZEl0ZW0uaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUmVzdWx0cyA9IChyZXN1bHRzKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChzZWFyY2hQaHJhc2UgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgYnRuU3RhdGVzKHRydWUsIHR5cGUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGJ0blN0YXRlcyhmYWxzZSwgdHlwZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAocmVzdWx0cy5sZW5ndGggPiAwKSB7IFxyXG5cclxuICAgICAgICAgICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQpID0+IHtcclxuXHJcbiAgICAgICAgICAgICAgICBsZXQgc2V0SW1hZ2UgPSBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuaXNQbGF5bGlzdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudGh1bWJuYWlsT3ZlcnJpZGUgIT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2UgPSByZXN1bHQudGh1bWJuYWlsT3ZlcnJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jaGlsZHJlblswXS50aHVtYm5haWxPdmVycmlkZSAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2UgPSByZXN1bHQuY2hpbGRyZW5bMF0udGh1bWJuYWlsT3ZlcnJpZGU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRJbWFnZSA9IGBodHRwczovL2kzLnl0aW1nLmNvbS92aS8ke3Jlc3VsdC5jaGlsZHJlblswXS55b3VUdWJlSWR9L21heHJlc2RlZmF1bHQuanBnYDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0SW1hZ2UgPSByZXN1bHQudGh1bWJuYWlsT3ZlcnJpZGUgIT09IFwiXCIgPyByZXN1bHQudGh1bWJuYWlsT3ZlcnJpZGUgOiBgaHR0cHM6Ly9pMy55dGltZy5jb20vdmkvJHtyZXN1bHQueW91VHViZUlkfS9tYXhyZXNkZWZhdWx0LmpwZ2A7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0Q2hpcCA9IHJlc3VsdC5pc1BsYXlsaXN0ID8gXCI8c3BhbiBjbGFzcz1cXFwiY2hpcCBjaGlwLS1uby1ob3ZlclxcXCI+UGxheWxpc3Q8L3NwYW4+XCIgOiBgPHNwYW4gY2xhc3M9XFxcImNoaXAgY2hpcC0tbm8taG92ZXIgYWxpZ24tc2VsZi1zdGFydFxcXCI+JHtyZXN1bHQudHlwZX08L3NwYW4+YDsvL25lZWQgdG8gY2hhbmdlIHRoaXMgcHJvcGVydHkgd2hlbiBwbGF5bGlzdCBpcyBhZGRlZFxyXG4gICAgICAgICAgICAgICAgY29uc3Qgc2V0Q1NTID0gcmVzdWx0LmlzUGxheWxpc3QgPyBcImNhcmQtbWVkaWEtLXBsYXlsaXN0XCIgOiBcIlwiO1xyXG5cclxuICAgICAgICAgICAgICAgIGZpbHRlclJlc3VsdHMuaW5uZXJIVE1MICs9IChcclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtYmxvY2sgY29sLW1kLTYgY29sLWxnLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7cmVzdWx0LnVybH1cIiBjbGFzcz1cImNhcmQgY2FyZC1tZWRpYSAke3NldENTU30gcC00IGZsZXgtbWQtY29sdW1uIGFsaWduLWl0ZW1zLXN0YXJ0IHRleHQtZGVjb3JhdGlvbi1ub25lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicmF0aW8gcmF0aW8tMTZ4OSBtYi0zIGNhcmQtbWVkaWFfX2ltZ1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzZXRJbWFnZX1cIiBsb2FkaW5nPVwibGF6eVwiIGNsYXNzPVwiaW1nLWZsdWlkXCIgd2lkdGg9XCI2NjBcIiBoZWlnaHQ9XCIzMzBcIiBhbHQ9XCIke3Jlc3VsdC50aXRsZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBmbGV4LXJvdyBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWJldHdlZW4gdy0xMDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dGltZSBjbGFzcz1cImZzLXhzIGZ3LWJvbGRcIiBkYXRldGltZT1cIiR7cmVzdWx0LmRhdGV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7cmVzdWx0LmRhdGVEaXNwbGF5fVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdGltZT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3NldENoaXB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImg2IG1iLTJcIj4ke3Jlc3VsdC50aXRsZX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJmcy1zbVwiPiR7cmVzdWx0LmRlc2NyaXB0aW9ufTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgICk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdC5jaGlsZHJlbi5sZW5ndGgpIHtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0LmNoaWxkcmVuLmZvckVhY2goKHJlc3VsdENoaWxkKSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZXRDaGlsZEltYWdlID0gcmVzdWx0Q2hpbGQudGh1bWJuYWlsT3ZlcnJpZGUgIT09IFwiXCIgPyByZXN1bHRDaGlsZC50aHVtYm5haWxPdmVycmlkZSA6IGBodHRwczovL2kzLnl0aW1nLmNvbS92aS8ke3Jlc3VsdENoaWxkLnlvdVR1YmVJZH0vbWF4cmVzZGVmYXVsdC5qcGdgO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyUmVzdWx0cy5pbm5lckhUTUwgKz0gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtYmxvY2sgY29sLW1kLTYgY29sLWxnLTRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiJHtyZXN1bHRDaGlsZC51cmx9XCIgY2xhc3M9XCJjYXJkIGNhcmQtbWVkaWEgcC00IGZsZXgtbWQtY29sdW1uIGFsaWduLWl0ZW1zLXN0YXJ0IHRleHQtZGVjb3JhdGlvbi1ub25lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJyYXRpbyByYXRpby0xNng5IG1iLTMgY2FyZC1tZWRpYV9faW1nXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c2V0Q2hpbGRJbWFnZX1cIiBsb2FkaW5nPVwibGF6eVwiIGNsYXNzPVwiaW1nLWZsdWlkXCIgd2lkdGg9XCI2NjBcIiBoZWlnaHQ9XCIzMzBcIiBhbHQ9XCIke3Jlc3VsdENoaWxkLnRpdGxlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImQtZmxleCBmbGV4LXJvdyBhbGlnbi1pdGVtcy1jZW50ZXIganVzdGlmeS1jb250ZW50LWJldHdlZW4gdy0xMDBcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aW1lIGNsYXNzPVwiZnMteHMgZnctYm9sZFwiIGRhdGV0aW1lPVwiJHtyZXN1bHRDaGlsZC5kYXRlfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7cmVzdWx0Q2hpbGQuZGF0ZURpc3BsYXl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3RpbWU+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJoNiBtYi0yXCI+JHtyZXN1bHRDaGlsZC50aXRsZX08L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImZzLXNtXCI+JHtyZXN1bHRDaGlsZC5kZXNjcmlwdGlvbn08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZmlsdGVyUmVzdWx0cy5pbm5lckhUTUwgPSAoYDxkaXYgY2xhc3M9XCJkLWJsb2NrIGNvbC1tZC0xMCBteC1hdXRvIGg1IHRleHQtY2VudGVyXCI+Tm8gcmVzdWx0cy4gVHJ5IGFnYWluLjwvZGl2PmApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGFuZGxlSW5kaWNhdG9ycyhmYWxzZSwgcmVzdWx0c0xvYWRlcik7XHJcblxyXG4gICAgfVxyXG5cclxuXHJcbiAgICBjb25zdCBoYW5kbGVDbGVhclBhZ2luYXRpb24gPSAocGFnaW5hdGlvbkVsZW1lbnQpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHBhZ2luYXRpb25FbGVtZW50Lm5leHRFbGVtZW50U2libGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAocGFnaW5hdGlvbkVsZW1lbnQubmV4dEVsZW1lbnRTaWJsaW5nLnRhZ05hbWUgPT0gJ0JVVFRPTicpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25FbGVtZW50Lm5leHRFbGVtZW50U2libGluZy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHBhZ2luYXRpb25FbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgaWYgKHBhZ2luYXRpb25FbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcudGFnTmFtZSA9PSAnQlVUVE9OJykge1xyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICB9ICBcclxuXHJcbiAgICBjb25zdCBjcmVhdGVQYWdpbmF0aW9uID0gKHBhZ2luYXRpb25FbGVtZW50LCByZXN1bHRQYWdlQ291bnQpID0+IHtcclxuXHJcbiAgICAgICAgY29uc3QgdG90YWxQYWdlcyA9IHBhcnNlSW50KHJlc3VsdFBhZ2VDb3VudCk7XHJcblxyXG4gICAgICAgIGhhbmRsZUNsZWFyUGFnaW5hdGlvbihwYWdpbmF0aW9uQ29udGFpbmVyKTsvL2NsZWFyIGZpcnN0XHJcblxyXG4gICAgICAgIC8vbnVtYmVyZWQgcGFnZSBidXR0b25zXHJcbiAgICAgICAgaWYgKHRvdGFsUGFnZXMgPiAxKSB7XHJcblxyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvdGFsUGFnZXM7IGkrKykge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgbGkuc2V0QXR0cmlidXRlKFwicm9sZVwiLCBcImJ1dHRvblwiKTtcclxuICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZShcInRpdGxlXCIsIGBHbyB0byBwYWdlICR7aSArIDF9YCk7XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHBhZ2VOdW1iZXIgPT0gKGkgKyAxKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50XCIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vb25seSBzaG93cyBwYWdpbmF0aW9uIG51bWJlcnMgLSszIG9mIGN1cnJlbnQgZm9yIHJlc3VsdHMgbW9yZSB0aGFuIDcgcGFnZXNcclxuICAgICAgICAgICAgICAgIGlmICh0b3RhbFBhZ2VzID4gNikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICgoaSA8IHBhZ2VOdW1iZXIgJiYgaSA+IChwYWdlTnVtYmVyIC0gNSkpIHx8IChpID4gKHBhZ2VOdW1iZXIgLSAxKSAmJiBpIDwgKChwYWdlTnVtYmVyIC0gMSkgKyA0KSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGkuY2xhc3NMaXN0LmFkZChcImQtaW5saW5lLWJsb2NrXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpLmNsYXNzTGlzdC5hZGQoXCJkLW5vbmVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxpLnNldEF0dHJpYnV0ZShcImFyaWEtaGlkZGVuXCIsIFwidHJ1ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgbGkudGV4dENvbnRlbnQgPSBpICsgMTtcclxuXHJcbiAgICAgICAgICAgICAgICBsaS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSBlLnRhcmdldC50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFja1RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQuYXBwZW5kQ2hpbGQobGkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL25leHQvcHJldiBidXR0b25zXHJcbiAgICAgICAgaWYgKHRvdGFsUGFnZXMgPiAxKSB7XHJcblxyXG4gICAgICAgICAgICBpZiAocGFnZU51bWJlciA+IDEpIHsgLy9zaG93IHByZXZpb3VzIGJ1dHRvblxyXG5cclxuICAgICAgICAgICAgICAgIGxldCBwcmV2QnRuID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XHJcbiAgICAgICAgICAgICAgICBwcmV2QnRuLmNsYXNzTGlzdC5hZGQoXCJidG4tcHJldlwiKTtcclxuICAgICAgICAgICAgICAgIHByZXZCdG4uc2V0QXR0cmlidXRlKFwidGl0bGVcIiwgXCJHbyB0byBwcmV2aW91cyBwYWdlXCIpO1xyXG5cclxuICAgICAgICAgICAgICAgIHByZXZCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgcGFnZU51bWJlciAtPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2Nyb2xsQmFja1RvcCgpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcGFnaW5hdGlvbkVsZW1lbnQuYmVmb3JlKHByZXZCdG4pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAocGFnZU51bWJlciA8IHRvdGFsUGFnZXMpIHsgLy9zaG93IG5leHQgYnV0dG9uXHJcblxyXG4gICAgICAgICAgICAgICAgbGV0IG5leHRCdG4gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcclxuICAgICAgICAgICAgICAgIG5leHRCdG4uY2xhc3NMaXN0LmFkZChcImJ0bi1uZXh0XCIpO1xyXG4gICAgICAgICAgICAgICAgbmV4dEJ0bi5zZXRBdHRyaWJ1dGUoXCJ0aXRsZVwiLCBcIkdvIHRvIG5leHQgcGFnZVwiKTtcclxuXHJcbiAgICAgICAgICAgICAgICBuZXh0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VOdW1iZXIgKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNjcm9sbEJhY2tUb3AoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgICAgIHBhZ2luYXRpb25FbGVtZW50LmFmdGVyKG5leHRCdG4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgIH1cclxuICAgIFxyXG5cclxuICAgIGNvbnN0IHBvc3RSZXN1bHRzID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBoYW5kbGVJbmRpY2F0b3JzKHRydWUsIHJlc3VsdHNMb2FkZXIpO1xyXG5cclxuICAgICAgICBsZXQgYm9keU9iamVjdCA9IHtcclxuICAgICAgICAgICAgXCJzZWFyY2hQaHJhc2VcIjogc2VhcmNoUGhyYXNlLFxyXG4gICAgICAgICAgICBcIm1lZGlhVHlwZVwiOiBkZWNvZGVVUklDb21wb25lbnQodHlwZSksIC8vbmVlZCB0byBkZWNvZGUgZm9yIEFQSSBwb3N0XHJcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogXCJcIixcclxuICAgICAgICAgICAgXCJwYWdpbmF0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGFnZU51bWJlclwiOiBwYWdlTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgXCJwYWdlU2l6ZVwiOiBwYWdlU2l6ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlID09IFwiXCIgJiYgc2VhcmNoUGhyYXNlICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGZlYXR1cmVkSGFuZGxlcih0eXBlLCB0cnVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBmZWF0dXJlZEhhbmRsZXIodHlwZSwgZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgYm9keVJlcXVlc3QgPSBKU09OLnN0cmluZ2lmeShib2R5T2JqZWN0KTtcclxuXHJcbiAgICAgICAgLy9jb25zb2xlLmxvZyhib2R5UmVxdWVzdClcclxuXHJcbiAgICAgICAgZmV0Y2goYXBpRW5kcG9pbnRVcmwsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBtb2RlOiBcImNvcnNcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICAnQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luJzogJyonXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlZmVycmVyUG9saWN5OiBcIm5vLXJlZmVycmVyXCIsXHJcbiAgICAgICAgICAgIGJvZHk6IGJvZHlSZXF1ZXN0XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiB7XHJcblxyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlcy5tdWx0aW1lZGlhSXRlbXMpO1xyXG5cclxuICAgICAgICAgICAgcmVuZGVyUmVzdWx0cyhyZXMubXVsdGltZWRpYUl0ZW1zKTtcclxuXHJcbiAgICAgICAgICAgdG90YWxSZXN1bHRzID0gcmVzLnNlYXJjaFJlc3VsdEluZm8udG90YWxSZXN1bHRzO1xyXG4gICAgICAgICAgIHRvdGFsUmVzdWx0UGFnZXMgPSBNYXRoLmNlaWwodG90YWxSZXN1bHRzIC8gcGFnZVNpemUpO1xyXG4gICAgICAgICAgIGNyZWF0ZVBhZ2luYXRpb24ocGFnaW5hdGlvbkNvbnRhaW5lciwgdG90YWxSZXN1bHRQYWdlcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgdXJsSGFuZGxlciA9IChpc3R5cGUpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKGlzdHlwZSkgeyAvL3VzZXMgdHlwZSBidXR0b25zXHJcbiAgICAgICAgICAgIHVybFBhcmFtcy5zZXQoJ3R5cGUnLCB0eXBlKTtcclxuICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHsgaWQ6IGB0eXBlLSR7dHlwZX1gIH0sICcnLCBgJHtsb2NhdGlvbi5wYXRobmFtZX0/dHlwZT0ke3R5cGV9YCk7XHJcbiAgICAgICAgfSBlbHNlIHsgLy91c2VzIHNlYXJjaCBmaWVsZFxyXG4gICAgICAgICAgICB1cmxQYXJhbXMuc2V0KCdzZWFyY2gnLCBzZWFyY2hQaHJhc2UpO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBpZDogJ3NlYXJjaC1zZWFyY2hQaHJhc2UnIH0sICcnLCBgJHtsb2NhdGlvbi5wYXRobmFtZX0/c2VhcmNoPSR7c2VhcmNoUGhyYXNlfWApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVzZXRFbGVtZW50cyA9IChyZXNldEZvcm0pID0+IHtcclxuICAgICAgICBpZiAocmVzZXRGb3JtKSB7XHJcbiAgICAgICAgICAgIHNlYXJjaEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYnRuU3RhdGVzKHRydWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvL0V2ZW50IEhhbmRsZXJzXHJcblxyXG4gICAgZmlsdGVyQnRucy5mb3JFYWNoKChmaWx0ZXJCdG4pID0+IHtcclxuICAgICAgICBmaWx0ZXJCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcbiAgICAgICAgICAgIHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHR5cGUgPSBmaWx0ZXJCdG4udmFsdWU7XHJcbiAgICAgICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICAgICAgdXJsSGFuZGxlcih0cnVlKTtcclxuICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pXHJcblxyXG4gICAgZmlsdGVyRHJvcGRvd24uYWRkRXZlbnRMaXN0ZW5lcihcImNoYW5nZVwiLCAoZSkgPT4ge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgcmVzZXRFbGVtZW50cyh0cnVlKTtcclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgIHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcbiAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcblxyXG4gICAgICAgIHR5cGUgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICB1cmxIYW5kbGVyKHRydWUpO1xyXG4gICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcblxyXG4gICAgfSlcclxuXHJcbiAgICBzZWFyY2hGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgdHlwZSA9IFwiXCI7XHJcbiAgICAgICAgY29uc3QgdGV4dEZpZWxkID0gc2VhcmNoRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpO1xyXG4gICAgICAgIHNlYXJjaFBocmFzZSA9IHRleHRGaWVsZC52YWx1ZTtcclxuICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuXHJcbiAgICAgICAgdXJsSGFuZGxlcihmYWxzZSk7XHJcbiAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgKCkgPT4ge1xyXG5cclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICBjb25zdCBwb3BVcmxDYXRQYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xyXG5cclxuICAgICAgICBpZiAocG9wVXJsQ2F0UGFyYW1zLmhhcyhcInR5cGVcIikpIHtcclxuICAgICAgICAgICAgdHlwZSA9IHBvcFVybENhdFBhcmFtcy5nZXQoXCJ0eXBlXCIpO1xyXG4gICAgICAgICAgICBmZWF0dXJlZEhhbmRsZXIodHlwZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICByZXNldEVsZW1lbnRzKHRydWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHR5cGUgPSBcIlwiO1xyXG4gICAgICAgICAgICByZXNldEVsZW1lbnRzKHRydWUpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcG9wVXJsU2VhcmNoUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcclxuXHJcbiAgICAgICAgaWYgKHBvcFVybFNlYXJjaFBhcmFtcy5oYXMoXCJzZWFyY2hcIikpIHtcclxuICAgICAgICAgICAgc2VhcmNoUGhyYXNlID0gcG9wVXJsU2VhcmNoUGFyYW1zLmdldChcInNlYXJjaFwiKTtcclxuICAgICAgICAgICAgc2VhcmNoRm9ybS5xdWVyeVNlbGVjdG9yKCdpbnB1dCcpLnZhbHVlID0gc2VhcmNoUGhyYXNlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlYXJjaFBocmFzZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHJlc2V0RWxlbWVudHModHJ1ZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxuICAgIH0pO1xyXG4gICAgXHJcbiAgICAvLyBvbnBhZ2UgbG9hZFxyXG4gICAgaWYgKHVybFBhcmFtcy5oYXMoXCJzZWFyY2hcIikpIHtcclxuICAgICAgICBraWxsUmVzdWx0cygpO1xyXG4gICAgICAgIHBhZ2VOdW1iZXIgPSAxO1xyXG5cclxuICAgICAgICB0eXBlID0gXCJcIjtcclxuICAgICAgICBzZWFyY2hQaHJhc2UgPSB1cmxQYXJhbXMuZ2V0KFwic2VhcmNoXCIpO1xyXG4gICAgICAgIHNlYXJjaEZvcm0ucXVlcnlTZWxlY3RvcignaW5wdXQnKS52YWx1ZSA9IHNlYXJjaFBocmFzZTtcclxuICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG4gICAgfSBlbHNlIHtcclxuXHJcbiAgICAgICAgcGFnZU51bWJlciA9IDE7XHJcbiAgICAgICAgY3JlYXRlUGFnaW5hdGlvbihwYWdpbmF0aW9uQ29udGFpbmVyLCBmaWx0ZXJSZXN1bHRzLmRhdGFzZXQuY2F0dG90YWwpO1xyXG4gICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcbiAgICB9XHJcblxyXG59O1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgbXVsdGltZWRpYUZpbHRlcnM7IiwgIlx1RkVGRi8vaHR0cHM6Ly9naXRodWIuY29tL3ZrdXJrby9jYWxlbmRhciBcclxuXHJcbmNvbnN0IGNhbGVuZGFyID0gKCkgPT4ge1xyXG5cclxuICAgIGNvbnN0IGNhbGVuZGFyQ29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJlY1wiKTtcclxuICAgIGNvbnN0IGNhbGVuZGFyRmlsdGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanMtY2FsZW5kYXItZmlsdGVyc1wiKTtcclxuICAgIGNvbnN0IGFwaUVuZHBvaW50VXJsID0gXCIvR2V0UHJvZHVjdHNcIjtcclxuICAgIGNvbnN0IHN0eWxlU2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWZpbHRlci1zdHlsZXMnKTtcclxuXHJcbiAgICBsZXQgYm9keU9iamVjdCA9IHtcclxuICAgICAgICBcInByb2R1Y3RUeXBlXCI6IFwiRXZlbnRzXCIsXHJcbiAgICAgICAgXCJjYXRlZ29yeVwiOiBcIlwiLFxyXG4gICAgICAgIFwic3ViQ2F0ZWdvcnlcIjogXCJcIixcclxuICAgICAgICBcInRheG9ub215XCI6IFwiXCIsXHJcbiAgICAgICAgXCJwYWdpbmF0aW9uXCI6IHtcclxuICAgICAgICAgICAgXCJwYWdlTnVtYmVyXCI6IDEsXHJcbiAgICAgICAgICAgIFwicGFnZVNpemVcIjogMTAwXHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuICAgXHJcbiAgICBjb25zdCBib2R5UmVxdWVzdCA9IEpTT04uc3RyaW5naWZ5KGJvZHlPYmplY3QpO1xyXG5cclxuICAgIGNvbnN0IGdldFZhbHVlID0gKGNoZWNrQm94ZXMpID0+IHtcclxuXHJcbiAgICAgICAgc3R5bGVTZXQuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgY2hlY2tCb3hlcy5mb3JFYWNoKChjaGVja0JveCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWNoZWNrQm94LmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlU2V0LmlubmVySFRNTCArPSAoYFtkYXRhLXJlc291cmNlPVwiJHtjaGVja0JveC52YWx1ZX1cIl0geyBvcGFjaXR5OiAwIH1gKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHN0eWxlU2V0LmlubmVySFRNTCArPSAoYFtkYXRhLXJlc291cmNlPVwiJHtjaGVja0JveC52YWx1ZX1cIl0geyBvcGFjaXR5OiAxIH1gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5ldyBFdmVudENhbGVuZGFyKGNhbGVuZGFyQ29udGFpbmVyLCB7XHJcbiAgICAgICAgdmlldzogJ2RheUdyaWRNb250aCcsXHJcbiAgICAgICAgaGVhZGVyVG9vbGJhcjoge1xyXG4gICAgICAgICAgICBzdGFydDogJ3ByZXYsbmV4dCB0b2RheScsXHJcbiAgICAgICAgICAgIGNlbnRlcjogJ3RpdGxlJyxcclxuICAgICAgICAgICAgZW5kOiAnZGF5R3JpZE1vbnRoLHRpbWVHcmlkV2Vlayx0aW1lR3JpZERheSxsaXN0V2VlayByZXNvdXJjZVRpbWVHcmlkV2VlaydcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJ1dHRvblRleHQ6IGZ1bmN0aW9uICh0ZXh0cykge1xyXG4gICAgICAgICAgICB0ZXh0cy5yZXNvdXJjZVRpbWVHcmlkV2VlayA9ICdyZXNvdXJjZXMnO1xyXG4gICAgICAgICAgICByZXR1cm4gdGV4dHM7XHJcbiAgICAgICAgfSxcclxuICAgICAgICByZXNvdXJjZXM6IHdpbmRvdy5zZXRSZXNvdXJjZXMsXHJcbiAgICAgICAgc2Nyb2xsVGltZTogJzA5OjAwOjAwJyxcclxuICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICB0aW1lR3JpZFdlZWs6IHsgcG9pbnRlcjogdHJ1ZSB9LFxyXG4gICAgICAgICAgICByZXNvdXJjZVRpbWVHcmlkV2VlazogeyBwb2ludGVyOiB0cnVlIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIG5vd0luZGljYXRvcjogdHJ1ZSxcclxuICAgICAgICBldmVudENsYXNzTmFtZXM6IFsnd3JhLWV2ZW50J10sXHJcbiAgICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXHJcbiAgICAgICAgZWRpdGFibGU6IGZhbHNlLFxyXG4gICAgICAgIGV2ZW50U3RhcnRFZGl0YWJsZTogZmFsc2UsIC8vIG5lZWQgdG8gZGlzYWJsZSBldmVudCBkcm9wIG4nZHJhZ1xyXG4gICAgICAgIGV2ZW50RHVyYXRpb25FZGl0YWJsZTogZmFsc2UsIC8vIG5lZWQgdG8gZGlzYWJsZSBldmVudCBkcm9wIG4nZHJhZ1xyXG4gICAgICAgIGV2ZW50U291cmNlczogW1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBldmVudHM6IGZ1bmN0aW9uIChmZXRjaEluZm8sIHN1Y2Nlc3NDYWxsYmFjaywgZmFpbHVyZUNhbGxiYWNrKSB7IFxyXG5cclxuICAgICAgICAgICAgICAgICAgICBmZXRjaChhcGlFbmRwb2ludFVybCxcclxuICAgICAgICAgICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQ29udGVudC1UeXBlXCI6IFwiYXBwbGljYXRpb24vanNvblwiLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVmZXJyZXJQb2xpY3k6IFwibm8tcmVmZXJyZXJcIixcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJvZHk6IGJvZHlSZXF1ZXN0XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiByZXMuanNvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdWNjZXNzQ2FsbGJhY2socmVzKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICBdLFxyXG4gICAgICAgIGV2ZW50RGlkTW91bnQ6IGZ1bmN0aW9uIChpbmZvKSB7IC8vYWRkaW5nIGRhdGEgaWQgYXR0cmlidXRlIHRvIGVhY2ggZXZlbnRcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGdldEV2ZW50c1Jlc291cmNlSWQgPSBpbmZvLmV2ZW50LnJlc291cmNlSWRzWzBdICE9PSB1bmRlZmluZWQgPyBpbmZvLmV2ZW50LnJlc291cmNlSWRzWzBdLnRvU3RyaW5nKCkgOiBudWxsO1xyXG5cclxuICAgICAgICAgICAgaWYgKCFpbmZvLmVsLmdldEF0dHJpYnV0ZShcImRhdGEtcmVzb3VyY2VcIikgJiYgZ2V0RXZlbnRzUmVzb3VyY2VJZCAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICAgICAgaW5mby5lbC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXJlc291cmNlXCIsIGdldEV2ZW50c1Jlc291cmNlSWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsb2FkaW5nOiBmdW5jdGlvbiAoaXNMb2FkaW5nKSB7XHJcbiAgICAgICAgICAgLy8gY29uc29sZS5sb2coaXNMb2FkaW5nKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChpc0xvYWRpbmcgPT0gZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwibG9hZGluZyBkb25lXCIpO1xyXG4gICAgICAgICAgICAgICAgLy9yZW1vdmUgaWYgZXhpc3RzXHJcbiAgICAgICAgICAgICAgICBjYWxlbmRhckZpbHRlcnMuaW5uZXJIVE1MID0gXCJcIjtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2J1aWxkIG91dCBcclxuICAgICAgICAgICAgICAgIHNldFJlc291cmNlcy5mb3JFYWNoKChyZXNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNhbGVuZGFyRmlsdGVycy5pbm5lckhUTUwgKz0gKFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYWxlbmRhci1maWx0ZXIgZC1mbGV4IGZsZXgtcm93IGdhcC0zIHJvdW5kZWQgcC0xIHBzLTIgbWItMyB0ZXh0LXdoaXRlXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiR7cmVzb3VyY2UuZXZlbnRCYWNrZ3JvdW5kQ29sb3J9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgaWQ9XCIke3Jlc291cmNlLmlkfVwiIG5hbWU9XCJyZXNvdXJjZVwiIGNsYXNzPVwianMtY2FsZW5kYXItZmlsdGVyIGZvcm0tY2hlY2staW5wdXRcIiBjaGVja2VkIHZhbHVlPVwiJHtyZXNvdXJjZS5pZH1cIiAvPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGxhYmVsIGNsYXNzPVwiZm9ybS1jaGVjay1sYWJlbFwiIGZvcj1cIiR7cmVzb3VyY2UuaWR9XCI+JHtyZXNvdXJjZS50aXRsZX08L2xhYmVsPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgICAgICk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgICAgICAvL2F0dGFjaCBldmVudCBoYW5kbGVyc1xyXG4gICAgICAgICAgICAgICAgY2FsZW5kYXJGaWx0ZXJzLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBnZXRWYWx1ZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuanMtY2FsZW5kYXItZmlsdGVyJykpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBldmVudENsaWNrOiBmdW5jdGlvbiAoaW5mbykgeyAvLyBoYW5kbGVzIG9wZW5pbmcgZXZlbnQgaW50byBuZXcgdGFiXHJcbiAgICAgICAgICAgIGlmIChpbmZvLmV2ZW50LmV4dGVuZGVkUHJvcHMgIT09IFwiXCIgfHwgaW5mby5ldmVudC5leHRlbmRlZFByb3BzICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cub3BlbihpbmZvLmV2ZW50LmV4dGVuZGVkUHJvcHMsICdfYmxhbmsnKS5mb2N1cygpO1xyXG4gICAgICAgICAgICB9IFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNhbGVuZGFyO1xyXG5cclxuXHJcblxyXG4iLCAiY29uc3QgcXVhbnRpdHlTZWxlY3RvciA9ICgpID0+IHtcclxuICAgIGNvbnN0IHF1YW50aXR5U2VsZWN0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmpzLXF1YW50aXR5LXNlbGVjdG9yJyk7XHJcblxyXG4gICAgaWYgKCFxdWFudGl0eVNlbGVjdG9ycy5sZW5ndGgpIHJldHVybjtcclxuXHJcbiAgICBxdWFudGl0eVNlbGVjdG9ycy5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgIGNvbnN0IHF1YW50aXR5SW5wdXQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5qcy1xdWFudGl0eS1zZWxlY3Rvci1pbnB1dCcpO1xyXG4gICAgICAgIGNvbnN0IGluY3JlbWVudEJ0biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmpzLXF1YW50aXR5LXNlbGVjdG9yLWluY3JlbWVudCcpO1xyXG4gICAgICAgIGNvbnN0IGRlY3JlbWVudEJ0biA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmpzLXF1YW50aXR5LXNlbGVjdG9yLWRlY3JlbWVudCcpO1xyXG5cclxuICAgICAgICBpbmNyZW1lbnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHF1YW50aXR5SW5wdXQudmFsdWUrKztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZGVjcmVtZW50QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAocXVhbnRpdHlJbnB1dC52YWx1ZSA+IDEpIHtcclxuICAgICAgICAgICAgICAgIHF1YW50aXR5SW5wdXQudmFsdWUtLTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IHF1YW50aXR5U2VsZWN0b3I7IiwgImNvbnN0IGNoZWNrb3V0ID0gKCkgPT4ge1xyXG4gICAgY29uc3Qgc3RhdGVEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jaGVja291dC1zdGF0ZScpO1xyXG4gICAgY29uc3QgY291bnR5RmllbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY2hlY2tvdXQtY291bnR5Jyk7XHJcbiAgICBcclxuICAgIGlmIChzdGF0ZURyb3Bkb3duKSB7XHJcbiAgICAgICAgc3RhdGVEcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2UnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS50YXJnZXQudmFsdWUgPT0gJ1dJJykge1xyXG4gICAgICAgICAgICAgICAgY291bnR5RmllbGQuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb3VudHlGaWVsZC5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vL1xyXG5cclxuICAgIGNvbnN0IGJpbGxpbmdBZGRyZXNzUmFkaW8gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYWx0LWJpbGxpbmctYWRkcmVzcycpO1xyXG4gICAgY29uc3QgYmlsbGluZ0FkZHJlc3NGaWVsZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYWx0LWJpbGxpbmctYWRkcmVzcy1maWVsZHMnKTtcclxuXHJcbiAgICBpZiAoYmlsbGluZ0FkZHJlc3NSYWRpbykge1xyXG4gICAgICAgIGJpbGxpbmdBZGRyZXNzUmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGJpbGxpbmdBZGRyZXNzUmFkaW8uY2hlY2tlZCkge1xyXG4gICAgICAgICAgICAgICAgYmlsbGluZ0FkZHJlc3NGaWVsZHMuY2xhc3NMaXN0LnJlbW92ZSgnZC1ub25lJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBiaWxsaW5nQWRkcmVzc0ZpZWxkcy5jbGFzc0xpc3QuYWRkKCdkLW5vbmUnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjaGVja291dDsiLCAiY29uc3QgZWR1Y2F0aW9uID0gKCkgPT4ge1xyXG5cclxuICAgIC8vRE9NIHByZXNlbnRhdGlvbiBlbGVtZW50c1xyXG4gICAgY29uc3QgcHJvZHVjdFJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtcHJvZHVjdC1jb2xsZWN0aW9uJyk7XHJcbiAgICBjb25zdCBjb2xsZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY29sbGVjdGlvbi10aXRsZScpO1xyXG4gICAgY29uc3QgbGlzdGluZ3NUaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1saXN0aW5ncy10aXRsZScpO1xyXG4gICAgY29uc3QgY3VycmVudEJyZWFkY3J1bWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtYnJlYWRjcnVtYi1jdXJyZW50Jyk7XHJcbiAgICBjb25zdCByZXN1bHRzTG9hZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXJlc3VsdHMtbG9hZGVyJyk7XHJcblxyXG5cclxuICAgIC8vRE9NIGV2ZW50IGVsZW1lbnRzXHJcbiAgICBjb25zdCBwcm9kdWN0Q2F0ZWdvcnlEcm9wZG93biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb2xsZWN0aW9uLWNhdGVnb3J5LWZpbHRlcicpO1xyXG4gICAgY29uc3QgcHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY29sbGVjdGlvbi1zdWJjYXRlZ29yeS1maWx0ZXInKTtcclxuICAgIGNvbnN0IHByb2R1Y3RTdWJDYXRlZ29yeUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1jb2xsZWN0aW9uLXN1YmNhdGVnb3J5LWNvbnRhaW5lcicpO1xyXG5cclxuICAgIC8vU3RhdGljIHZhcnNcclxuICAgIGNvbnN0IGFwaUVuZHBvaW50VXJsID0gXCIvR2V0UHJvZHVjdHNcIjtcclxuICAgIGxldCBwYWdlTnVtYmVyID0gMTtcclxuICAgIGNvbnN0IHBhZ2VTaXplID0gMTAwO1xyXG4gICAgbGV0IHN1YmNhdGVnb3J5QXJyYXkgPSBbXCJBbGxcIl07XHJcblxyXG4gICAgLy9VcmxzXHJcblxyXG4gICAgY29uc3Qgd2luZG93TG9hZFF1ZXJ5U3RyaW5nID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaDtcclxuICAgIGNvbnN0IHVybFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMod2luZG93TG9hZFF1ZXJ5U3RyaW5nKTtcclxuXHJcbiAgICBsZXQgc3ViY2F0ZWdvcnkgPSBcIlwiOyBcclxuXHJcbiAgICBpZiAodXJsUGFyYW1zLmhhcyhcInN1YmNhdGVnb3J5XCIpKSB7XHJcbiAgICAgICAgc3ViY2F0ZWdvcnkgPSB1cmxQYXJhbXMuZ2V0KFwic3ViY2F0ZWdvcnlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgbGV0IGNhdGVnb3J5ID0gXCJcIjtcclxuXHJcbiAgICBpZiAodXJsUGFyYW1zLmhhcyhcImNhdGVnb3J5XCIpKSB7XHJcbiAgICAgICAgY2F0ZWdvcnkgPSB1cmxQYXJhbXMuZ2V0KFwiY2F0ZWdvcnlcIik7XHJcbiAgICB9XHJcblxyXG4gICAgLy9SZXN1bHRzXHJcblxyXG4gICAgY29uc3QgaGFuZGxlSW5kaWNhdG9ycyA9IChzaG93LCB3YWl0TG9hZGVyRWxlbWVudCkgPT4ge1xyXG4gICAgICAgIGlmIChzaG93ID09IHRydWUpIHtcclxuICAgICAgICAgICAgd2FpdExvYWRlckVsZW1lbnQuaGlkZGVuID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2FpdExvYWRlckVsZW1lbnQuaGlkZGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcmVuZGVyUmVzdWx0cyA9IChyZXN1bHRzKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChyZXN1bHRzLmxlbmd0aCA+IDApIHtcclxuXHJcbiAgICAgICAgICAgIHJlc3VsdHMuZm9yRWFjaCgocmVzdWx0KSA9PiB7XHJcblxyXG4gICAgICAgICAgICAgICAgLy9Ib3cgd2UgZGV0ZXJtaW5lIGJ1dHRvbiBkaXNwbGF5IHRleHQ/XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzZXRDVEEgPSByZXN1bHQudGF4b25vbXkgPT0gXCJSZWZlcmVuY2UgTWFudWFsc1wiIHx8IHJlc3VsdC50YXhvbm9teSA9PSBcIkJvb2tzXCIgPyBgPGEgaHJlZj1cIiR7cmVzdWx0LnVybH1cIiBpZD1cImFkZC10by1jYXJ0XCIgY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeSBidG4tc20gYm9yZGVyLTAgIGZsZXgtZ3Jvdy0xXCI+QWRkIFRvIENhcnQ8L2E+YCA6IGA8YSBocmVmPVwiJHtyZXN1bHQudXJsfVwiIGlkPVwidmlldy1wcm9kdWN0XCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtIGZsZXgtZ3Jvdy0xXCI+VmlldyBQcm9kdWN0PC9hPmA7XHJcblxyXG4gICAgICAgICAgICAgICAgcHJvZHVjdFJlc3VsdHMuaW5uZXJIVE1MICs9IChcclxuICAgICAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImNvbC1tZC02IGNvbC1sZy00XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLWNsYXNzIGJnLWxpZ2h0IHAtNCBoLTEwMCBkLWZsZXggZmxleC1jb2x1bW4gYWxpZ24taXRlbXMtc3RhcnRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiZnMteHNcIj5DbGFzcyA8c3BhbiBjbGFzcz1cImZ3LWJvbGRcIj5DcmVkaXQgSG91cnM6IFhYWFg8L3NwYW4+PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJkLWlubGluZS1ibG9jayBtYi00IHB4LTIgcHktMSBiZy13aGl0ZSBmdy1zZW1pYm9sZCBmcy1zbSB0ZXh0LXVwcGVyY2FzZVwiPiR7cmVzdWx0LnRheG9ub215fTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cImZzLWxnIHRleHQtY2FwaXRhbGl6ZSBmdy1zZW1pYm9sZCBtYi00XCI+JHtyZXN1bHQudGl0bGV9PC9oMz5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZC1ibG9jayBtYi0xXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJoMyBmdy1ib2xkXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7cmVzdWx0Lm1lbWJlclByaWNlfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZzLXNtXCIgc3R5bGU9XCJjb2xvcjogdmFyKC0tYnMtZ3JheS0zMClcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJm5ic3A7bWVtYmVyIHByaWNpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWJsb2NrIGZzLXNtIG1iLTBcIiBzdHlsZT1cImNvbG9yOiB2YXIoLS1icy1ncmF5LTMwKVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7cmVzdWx0LnByaWNlfSAmbmJzcDtub24tbWVtYmVyIHByaWNpbmdcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJkLWZsZXggc2VsZi1hbGlnbi1lbmQgZmxleC1jb2x1bW4gZmxleC1tZC1yb3cgYWxpZ24taXRlbXMtY2VudGVyIGdhcC0zIG10LWF1dG8gcHQtM1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7c2V0Q1RBfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgYFxyXG4gICAgICAgICAgICAgICAgKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnN1YkNhdGVnb3J5ICE9IFwiQWxsXCIgJiYgIXN1YmNhdGVnb3J5QXJyYXkuaW5jbHVkZXMocmVzdWx0LnN1YkNhdGVnb3J5LCBzdWJjYXRlZ29yeUFycmF5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5QXJyYXkucHVzaChyZXN1bHQuc3ViQ2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcHVsYXRlU3ViQ2F0ZWdvcmllcygpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RSZXN1bHRzLmlubmVySFRNTCA9IChgPGRpdiBjbGFzcz1cImQtYmxvY2sgY29sLW1kLTEwIG14LWF1dG8gaDUgdGV4dC1jZW50ZXJcIj5ObyByZXN1bHRzLiBUcnkgYWdhaW4uPC9kaXY+YCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBoYW5kbGVJbmRpY2F0b3JzKGZhbHNlLCByZXN1bHRzTG9hZGVyKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhzdWJjYXRlZ29yeUFycmF5KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBwb3B1bGF0ZVN1YkNhdGVnb3JpZXMgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLmlubmVySFRNTCA9IFwiXCI7Ly9jbGVhciA8b3B0aW9uPiB0YWdzXHJcblxyXG4gICAgICAgIGlmIChzdWJjYXRlZ29yeUFycmF5Lmxlbmd0aCA+IDEpIHtcclxuICAgICAgICAgICAgcHJvZHVjdFN1YkNhdGVnb3J5Q29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShcImhpZGRlblwiKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwcm9kdWN0U3ViQ2F0ZWdvcnlDb250YWluZXIuc2V0QXR0cmlidXRlKFwiaGlkZGVuXCIsIFwiaGlkZGVuXCIpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgc3ViY2F0ZWdvcnlBcnJheS5mb3JFYWNoKChzdWJDYXRPcHRpb24pID0+IHtcclxuICAgICAgICAgICAgcHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24uaW5uZXJIVE1MICs9IChcclxuICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCIke3N1YkNhdE9wdGlvbn1cIj4ke3N1YkNhdE9wdGlvbn08L29wdGlvbj5cclxuICAgICAgICAgICAgICAgIGBcclxuICAgICAgICAgICAgKVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBwb3N0UmVzdWx0cyA9ICgpID0+IHtcclxuXHJcbiAgICAgICAgaGFuZGxlSW5kaWNhdG9ycyh0cnVlLCByZXN1bHRzTG9hZGVyKTtcclxuICAgICAgICB1cGRhdGVEb21FbGVtZW50cyhjYXRlZ29yeSk7XHJcblxyXG4gICAgICAgIGxldCBib2R5T2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBcInByb2R1Y3RUeXBlXCI6IFwiUHJvZHVjdHNcIiwgLy9FdmVudHMsIFByb2R1Y3RzLCBDb3Vyc2VzXHJcbiAgICAgICAgICAgIFwiY2F0ZWdvcnlcIjogZGVjb2RlVVJJQ29tcG9uZW50KGNhdGVnb3J5KSwgLy9Qcm9mZXNzaW9uYWwgRGV2ZWxvcG1lbnQsIFB1YmxpY2F0aW9ucywgQ29uZmVyZW5jZXMvQ29udmVudGlvbnMsIGV0Yy5cclxuICAgICAgICAgICAgXCJzdWJDYXRlZ29yeVwiOiBkZWNvZGVVUklDb21wb25lbnQoc3ViY2F0ZWdvcnkgPT0gXCJBbGxcIiA/IFwiXCIgOiBzdWJjYXRlZ29yeSksLy9jaGlsZHJlbiBvZiBjYXRlZ29yeVxyXG4gICAgICAgICAgICBcInRheG9ub215XCI6IFwiXCIsLy9SZWZlcmVuY2UgTWFudWFscywgQm9va3MsIFZpcnR1YWwsIGV0Yy5cclxuICAgICAgICAgICAgXCJwYWdpbmF0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGFnZU51bWJlclwiOiBwYWdlTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgXCJwYWdlU2l6ZVwiOiBwYWdlU2l6ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgYm9keVJlcXVlc3QgPSBKU09OLnN0cmluZ2lmeShib2R5T2JqZWN0KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coYm9keVJlcXVlc3QpO1xyXG5cclxuICAgICAgICBmZXRjaChhcGlFbmRwb2ludFVybCxcclxuICAgICAgICB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIG1vZGU6IFwiY29yc1wiLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICBcIkNvbnRlbnQtVHlwZVwiOiBcImFwcGxpY2F0aW9uL2pzb25cIixcclxuICAgICAgICAgICAgICAgIFwiQWNjZXNzLUNvbnRyb2wtQWxsb3ctT3JpZ2luXCI6IFwiKlwiXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHJlZmVycmVyUG9saWN5OiBcIm5vLXJlZmVycmVyXCIsXHJcbiAgICAgICAgICAgIGJvZHk6IGJvZHlSZXF1ZXN0XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzLmpzb24oKTtcclxuICAgICAgICB9KS50aGVuKHJlcyA9PiB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIHJlbmRlclJlc3VsdHMocmVzKTtcclxuXHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qga2lsbFJlc3VsdHMgPSAoKSA9PiB7XHJcbiAgICAgICAgcHJvZHVjdFJlc3VsdHMuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cmxIYW5kbGVyID0gKGlzQ2F0ZWdvcnksIGlzU3ViQ2F0ZWdvcnkpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKGlzQ2F0ZWdvcnkgJiYgIWlzU3ViQ2F0ZWdvcnkpIHtcclxuICAgICAgICAgICAgdXJsUGFyYW1zLnNldCgnY2F0ZWdvcnknLCBjYXRlZ29yeSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7IGlkOiBgY2F0ZWdvcnktJHtjYXRlZ29yeX1gIH0sICcnLCBgJHtsb2NhdGlvbi5wYXRobmFtZX0/Y2F0ZWdvcnk9JHtjYXRlZ29yeX1gKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChpc0NhdGVnb3J5ICYmIGlzU3ViQ2F0ZWdvcnkpIHtcclxuICAgICAgICAgICAgdXJsUGFyYW1zLnNldCgnY2F0ZWdvcnknLCBjYXRlZ29yeSk7XHJcbiAgICAgICAgICAgIHVybFBhcmFtcy5zZXQoJ3N1YmNhdGVnb3J5Jywgc3ViY2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoeyBpZDogYGNhdGVnb3J5LSR7Y2F0ZWdvcnl9c3ViY2F0ZWdvcnktJHtzdWJjYXRlZ29yeX1gIH0sICcnLCBgJHtsb2NhdGlvbi5wYXRobmFtZX0/Y2F0ZWdvcnk9JHtjYXRlZ29yeX0mc3ViY2F0ZWdvcnk9JHtzdWJjYXRlZ29yeX1gKTtcclxuICAgICAgICB9XHJcbiAgICAgICBcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCB1cGRhdGVEb21FbGVtZW50cyA9ICh0aXRsZVRleHQpID0+IHtcclxuICAgICAgICBjb2xsZWN0aW9uVGl0bGUuaW5uZXJIVE1MID0gdGl0bGVUZXh0O1xyXG4gICAgICAgIGN1cnJlbnRCcmVhZGNydW1iLmlubmVySFRNTCA9IHRpdGxlVGV4dDtcclxuICAgICAgICBsaXN0aW5nc1RpdGxlLmlubmVySFRNTCA9IHRpdGxlVGV4dDtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNldERyb3Bkb3duID0gKGRyb3Bkb3duRWxlbWVudCwgc2V0VmFsdWUpID0+IHtcclxuICAgICAgICBkcm9wZG93bkVsZW1lbnQudmFsdWUgPSBzZXRWYWx1ZTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgLy9FdmVudCBIYW5kbGVyc1xyXG4gICAgaWYgKHByb2R1Y3RDYXRlZ29yeURyb3Bkb3duKSB7XHJcblxyXG4gICAgICAgIHByb2R1Y3RDYXRlZ29yeURyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG5cclxuICAgICAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgICAgIGNhdGVnb3J5ID0gZS50YXJnZXQudmFsdWU7XHJcblxyXG4gICAgICAgICAgICAvL2NsZWFyaW5nIHN1YmNhdGVnb3J5IGRyb3Bkb3duXHJcbiAgICAgICAgICAgIHN1YmNhdGVnb3J5ID0gXCJcIjtcclxuICAgICAgICAgICAgc3ViY2F0ZWdvcnlBcnJheSA9IFtcIkFsbFwiXTtcclxuICAgICAgICAgICAgcHJvZHVjdFN1YkNhdGVnb3J5Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBcImhpZGRlblwiKTtcclxuICAgICAgICAgICAgcHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24uaW5uZXJIVE1MID0gXCJcIjsvL2NsZWFyIDxvcHRpb24+IHRhZ3NcclxuXHJcbiAgICAgICAgICAgIGlmIChwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93bikge1xyXG4gICAgICAgICAgICAgICAgcmVzZXREcm9wZG93bihwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93biwgXCJcIik7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHVybEhhbmRsZXIodHJ1ZSwgZmFsc2UpO1xyXG4gICAgICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93bikge1xyXG5cclxuICAgICAgICBwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuXHJcbiAgICAgICAgICAgIGtpbGxSZXN1bHRzKCk7XHJcblxyXG4gICAgICAgICAgICB1cGRhdGVEb21FbGVtZW50cyhjYXRlZ29yeSk7XHJcbiAgICAgICAgICAgIHN1YmNhdGVnb3J5ID0gZS50YXJnZXQudmFsdWU7O1xyXG5cclxuICAgICAgICAgICAgdXJsSGFuZGxlcih0cnVlLCB0cnVlKTtcclxuICAgICAgICAgICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgfSlcclxuICAgIH1cclxuXHJcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsICgpID0+IHtcclxuXHJcbiAgICAgICAga2lsbFJlc3VsdHMoKTtcclxuXHJcbiAgICAgICAgY29uc3QgcG9wVXJsUGFyYW1zID0gbmV3IFVSTFNlYXJjaFBhcmFtcyh3aW5kb3cubG9jYXRpb24uc2VhcmNoKTtcclxuXHJcbiAgICAgICAgaWYgKHBvcFVybFBhcmFtcy5oYXMoXCJjYXRlZ29yeVwiKSAmJiAhcG9wVXJsUGFyYW1zLmhhcyhcInN1YmNhdGVnb3J5XCIpKSB7XHJcblxyXG4gICAgICAgICAgICBjYXRlZ29yeSA9IHBvcFVybFBhcmFtcy5nZXQoXCJjYXRlZ29yeVwiKTtcclxuICAgICAgICAgICAgcmVzZXREcm9wZG93bihwcm9kdWN0Q2F0ZWdvcnlEcm9wZG93biwgY2F0ZWdvcnkpO1xyXG4gICAgICAgICAgICByZXNldERyb3Bkb3duKHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLCBcIkFsbFwiKTtcclxuXHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAocG9wVXJsUGFyYW1zLmhhcyhcImNhdGVnb3J5XCIpICYmIHBvcFVybFBhcmFtcy5oYXMoXCJzdWJjYXRlZ29yeVwiKSkge1xyXG5cclxuICAgICAgICAgICAgY2F0ZWdvcnkgPSBwb3BVcmxQYXJhbXMuZ2V0KFwiY2F0ZWdvcnlcIik7XHJcbiAgICAgICAgICAgIHN1YmNhdGVnb3J5ID0gcG9wVXJsUGFyYW1zLmdldChcInN1YmNhdGVnb3J5XCIpO1xyXG4gICAgICAgICAgICByZXNldERyb3Bkb3duKHByb2R1Y3RDYXRlZ29yeURyb3Bkb3duLCBjYXRlZ29yeSk7XHJcblxyXG4gICAgICAgICAgICBpZiAocHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24pIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0RHJvcGRvd24ocHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24sIHN1YmNhdGVnb3J5KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjYXRlZ29yeSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHN1YmNhdGVnb3J5ID0gXCJcIjtcclxuICAgICAgICAgICAgcmVzZXREcm9wZG93bihwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93biwgXCJBbGxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIHBvc3RSZXN1bHRzKCk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgLy9QYWdlIExvYWRcclxuXHJcbiAgICBwb3N0UmVzdWx0cygpO1xyXG5cclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGVkdWNhdGlvbjsiLCAiY29uc3QgY291cnNlU2VhcmNoID0gKCkgPT4ge1xyXG5cclxuICAgIC8vRE9NIHByZXNlbnRhdGlvbiBlbGVtZW50c1xyXG4gICAgY29uc3QgcmVzdWx0c0xvYWRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1yZXN1bHRzLWxvYWRlci1jb3Vyc2VzJyk7XHJcbiAgICBjb25zdCBjb3Vyc2VTZWFyY2hGb3JtID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvdXJzZS1zZWFyY2gnKTtcclxuXHJcbiAgICAvL0RPTSBldmVudCBlbGVtZW50c1xyXG4gICAgY29uc3QgcHJvZHVjdENhdGVnb3J5RHJvcGRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY291cnNlcy1jYXRlZ29yeS1maWx0ZXInKTtcclxuICAgIGNvbnN0IHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLWNvdXJzZXMtc3ViY2F0ZWdvcnktZmlsdGVyJyk7XHJcbiAgICBjb25zdCBwcm9kdWN0U3ViQ2F0ZWdvcnlDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtY291cnNlcy1zdWJjYXRlZ29yeS1jb250YWluZXInKTtcclxuXHJcbiAgICAvL1N0YXRpYyB2YXJzXHJcbiAgICBjb25zdCBhY3Rpb25Jbml0aWFsID0gY291cnNlU2VhcmNoRm9ybS5nZXRBdHRyaWJ1dGUoXCJhY3Rpb25cIik7XHJcbiAgICBjb25zdCBhcGlFbmRwb2ludFVybCA9IFwiL0dldFByb2R1Y3RzXCI7XHJcbiAgICBsZXQgcGFnZU51bWJlciA9IDE7XHJcbiAgICBjb25zdCBwYWdlU2l6ZSA9IDEwMDtcclxuICAgIGxldCBzdWJjYXRlZ29yeUFycmF5ID0gW1wiQWxsXCJdO1xyXG5cclxuICAgIGxldCBjYXRlZ29yeSA9IFwiXCI7XHJcbiAgICBsZXQgc3ViY2F0ZWdvcnkgPSBcIlwiOyBcclxuXHJcbiAgICAvL1Jlc3VsdHNcclxuXHJcbiAgICBjb25zdCBoYW5kbGVJbmRpY2F0b3JzID0gKHNob3csIHdhaXRMb2FkZXJFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgaWYgKHNob3cgPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICB3YWl0TG9hZGVyRWxlbWVudC5oaWRkZW4gPSBmYWxzZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3YWl0TG9hZGVyRWxlbWVudC5oaWRkZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZW5kZXJSZXN1bHRzID0gKHJlc3VsdHMpID0+IHtcclxuXHJcbiAgICAgICAgaWYgKHJlc3VsdHMubGVuZ3RoID4gMCkge1xyXG5cclxuICAgICAgICAgICAgcmVzdWx0cy5mb3JFYWNoKChyZXN1bHQpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQuc3ViQ2F0ZWdvcnkgIT0gXCJBbGxcIiAmJiAhc3ViY2F0ZWdvcnlBcnJheS5pbmNsdWRlcyhyZXN1bHQuc3ViQ2F0ZWdvcnksIHN1YmNhdGVnb3J5QXJyYXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnlBcnJheS5wdXNoKHJlc3VsdC5zdWJDYXRlZ29yeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9wdWxhdGVTdWJDYXRlZ29yaWVzKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaGFuZGxlSW5kaWNhdG9ycyhmYWxzZSwgcmVzdWx0c0xvYWRlcik7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgcG9wdWxhdGVTdWJDYXRlZ29yaWVzID0gKCkgPT4ge1xyXG5cclxuICAgICAgICBwcm9kdWN0U3ViQ2F0ZWdvcnlEcm9wZG93bi5pbm5lckhUTUwgPSBcIlwiOy8vY2xlYXIgPG9wdGlvbj4gdGFnc1xyXG5cclxuICAgICAgICBpZiAoc3ViY2F0ZWdvcnlBcnJheS5sZW5ndGggPiAxICYmIGNhdGVnb3J5ICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeUNvbnRhaW5lci5yZW1vdmVBdHRyaWJ1dGUoXCJoaWRkZW5cIik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcHJvZHVjdFN1YkNhdGVnb3J5Q29udGFpbmVyLnNldEF0dHJpYnV0ZShcImhpZGRlblwiLCBcImhpZGRlblwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHN1YmNhdGVnb3J5QXJyYXkuZm9yRWFjaCgoc3ViQ2F0T3B0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLmlubmVySFRNTCArPSAoXHJcbiAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiJHtzdWJDYXRPcHRpb259XCI+JHtzdWJDYXRPcHRpb259PC9vcHRpb24+XHJcbiAgICAgICAgICAgICAgICBgXHJcbiAgICAgICAgICAgIClcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9XHJcblxyXG4gICAgcG9zdFJlc3VsdHMgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGhhbmRsZUluZGljYXRvcnModHJ1ZSwgcmVzdWx0c0xvYWRlcik7XHJcblxyXG4gICAgICAgIGxldCBib2R5T2JqZWN0ID0ge1xyXG4gICAgICAgICAgICBcInByb2R1Y3RUeXBlXCI6IFwiRXZlbnRzXCIsIC8vRXZlbnRzLCBQcm9kdWN0cywgQ291cnNlc1xyXG4gICAgICAgICAgICBcImNhdGVnb3J5XCI6IGNhdGVnb3J5LCAvL1Byb2Zlc3Npb25hbCBEZXZlbG9wbWVudCwgUHVibGljYXRpb25zLCBDb25mZXJlbmNlcy9Db252ZW50aW9ucywgZXRjLlxyXG4gICAgICAgICAgICBcInN1YkNhdGVnb3J5XCI6IHN1YmNhdGVnb3J5ID09IFwiQWxsXCIgPyBcIlwiIDogc3ViY2F0ZWdvcnksLy9jaGlsZHJlbiBvZiBjYXRlZ29yeVxyXG4gICAgICAgICAgICBcInRheG9ub215XCI6IFwiXCIsLy9SZWZlcmVuY2UgTWFudWFscywgQm9va3MsIFZpcnR1YWwsIGV0Yy5cclxuICAgICAgICAgICAgXCJwYWdpbmF0aW9uXCI6IHtcclxuICAgICAgICAgICAgICAgIFwicGFnZU51bWJlclwiOiBwYWdlTnVtYmVyLFxyXG4gICAgICAgICAgICAgICAgXCJwYWdlU2l6ZVwiOiBwYWdlU2l6ZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgY29uc3QgYm9keVJlcXVlc3QgPSBKU09OLnN0cmluZ2lmeShib2R5T2JqZWN0KTtcclxuXHJcbiAgICAgICAgZmV0Y2goYXBpRW5kcG9pbnRVcmwsXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICBtb2RlOiBcImNvcnNcIixcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIsXHJcbiAgICAgICAgICAgICAgICBcIkFjY2Vzcy1Db250cm9sLUFsbG93LU9yaWdpblwiOiBcIipcIlxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICByZWZlcnJlclBvbGljeTogXCJuby1yZWZlcnJlclwiLFxyXG4gICAgICAgICAgICBib2R5OiBib2R5UmVxdWVzdFxyXG4gICAgICAgIH0pLnRoZW4ocmVzID0+IHtcclxuICAgICAgICAgICAgcmV0dXJuIHJlcy5qc29uKCk7XHJcbiAgICAgICAgfSkudGhlbihyZXMgPT4ge1xyXG4gICAgICAgICAgICAvL2NvbnNvbGUubG9nKHJlcyk7XHJcbiAgICAgICAgICAgIHJlbmRlclJlc3VsdHMocmVzKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCByZXNldERyb3Bkb3duID0gKGRyb3Bkb3duRWxlbWVudCwgc2V0VmFsdWUpID0+IHtcclxuICAgICAgICBkcm9wZG93bkVsZW1lbnQudmFsdWUgPSBzZXRWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvL0V2ZW50IEhhbmRsZXJzXHJcbiAgICBpZiAocHJvZHVjdENhdGVnb3J5RHJvcGRvd24pIHtcclxuICAgICAgICBwcm9kdWN0Q2F0ZWdvcnlEcm9wZG93bi5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgY2F0ZWdvcnkgPSBlLnRhcmdldC52YWx1ZTtcclxuICAgICAgICAgICAgLy9jbGVhcmluZyBzdWJjYXRlZ29yeSBkcm9wZG93blxyXG4gICAgICAgICAgICBzdWJjYXRlZ29yeSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHN1YmNhdGVnb3J5QXJyYXkgPSBbXCJBbGxcIl07XHJcbiAgICAgICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJoaWRkZW5cIiwgXCJoaWRkZW5cIik7XHJcbiAgICAgICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLmlubmVySFRNTCA9IFwiXCI7Ly9jbGVhciA8b3B0aW9uPiB0YWdzXHJcblxyXG4gICAgICAgICAgICBpZiAocHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24pIHtcclxuICAgICAgICAgICAgICAgIHJlc2V0RHJvcGRvd24ocHJvZHVjdFN1YkNhdGVnb3J5RHJvcGRvd24sIFwiXCIpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duKSB7XHJcblxyXG4gICAgICAgIHByb2R1Y3RTdWJDYXRlZ29yeURyb3Bkb3duLmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBzdWJjYXRlZ29yeSA9IGUudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgICAgICBwb3N0UmVzdWx0cygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgbGV0IHVwZGF0ZWRBY3Rpb24gPSBmYWxzZTtcclxuXHJcbiAgICBjb25zdCB1cGRhdGVBY3Rpb25VcmwgPSAoKSA9PiB7XHJcblxyXG4gICAgICAgIGNvbnN0IHNldFBhcmFtcyA9IHN1YmNhdGVnb3J5ICE9PSBcIlwiID8gYCR7YWN0aW9uSW5pdGlhbH0/Y2F0ZWdvcnk9JHtjYXRlZ29yeX0mc3ViY2F0ZWdvcnk9JHtzdWJjYXRlZ29yeX1gIDogYCR7YWN0aW9uSW5pdGlhbH0/Y2F0ZWdvcnk9JHtjYXRlZ29yeX1gO1xyXG4gICAgICAgIGNvdXJzZVNlYXJjaEZvcm0uc2V0QXR0cmlidXRlKFwiYWN0aW9uXCIsIHNldFBhcmFtcyk7XHJcblxyXG4gICAgICAgIHVwZGF0ZWRBY3Rpb24gPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAodXBkYXRlZEFjdGlvbikge1xyXG4gICAgICAgICAgICBjb3Vyc2VTZWFyY2hGb3JtLnN1Ym1pdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb3Vyc2VTZWFyY2hGb3JtLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdXBkYXRlQWN0aW9uVXJsKCk7XHJcbiAgICB9KVxyXG5cclxuICAgIC8vUGFnZSBMb2FkXHJcblxyXG4gICAgcG9zdFJlc3VsdHMoKTtcclxuXHJcbn07XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjb3Vyc2VTZWFyY2g7IiwgImltcG9ydCBleHBhbmRhYmxlVGV4dENhcmRzIGZyb20gJy4vY29tcG9uZW50cy9leHBhbmRhYmxlLXRleHQtY2FyZHMnO1xyXG5pbXBvcnQgaGVhZGVyIGZyb20gJy4vY29tcG9uZW50cy9oZWFkZXInO1xyXG5pbXBvcnQgbmF2IGZyb20gJy4vY29tcG9uZW50cy9uYXYnO1xyXG5pbXBvcnQgc3dpcGVyIGZyb20gJy4vY29tcG9uZW50cy9zd2lwZXInO1xyXG5pbXBvcnQgdGFicyBmcm9tICcuL2NvbXBvbmVudHMvdGFicyc7XHJcbmltcG9ydCB7IGRpYWxvZ3MsIGZvcm1zQWNjZXNzRGlhbG9nIH0gZnJvbSAnLi9jb21wb25lbnRzL2RpYWxvZ3MnO1xyXG5pbXBvcnQgaG9tZUhlcm8gZnJvbSAnLi9jb21wb25lbnRzL2hvbWUtaGVybyc7XHJcbmltcG9ydCBwbGF5TGlzdCBmcm9tICcuL2NvbXBvbmVudHMvcGxheWxpc3QnO1xyXG5pbXBvcnQgaG90VGlwTGlicmFyeSBmcm9tICcuL2NvbXBvbmVudHMvaG90LXRpcC1saWJyYXJ5JztcclxuaW1wb3J0IGFsZXJ0IGZyb20gJy4vY29tcG9uZW50cy9hbGVydCc7XHJcbmltcG9ydCBhcnRpY2xlRmlsdGVycyBmcm9tICcuL2NvbXBvbmVudHMvYXJ0aWNsZS1maWx0ZXJzJztcclxuaW1wb3J0IG11bHRpbWVkaWFGaWx0ZXJzIGZyb20gJy4vY29tcG9uZW50cy9tdWx0aW1lZGlhLWZpbHRlcnMnO1xyXG5pbXBvcnQgY2FsZW5kYXIgZnJvbSAnLi9jb21wb25lbnRzL2NhbGVuZGFyJztcclxuaW1wb3J0IHF1YW50aXR5U2VsZWN0b3IgZnJvbSAnLi9jb21wb25lbnRzL3F1YW50aXR5LXNlbGVjdG9yJztcclxuaW1wb3J0IGNoZWNrb3V0IGZyb20gJy4vY29tcG9uZW50cy9jaGVja291dCc7XHJcbmltcG9ydCBlZHVjYXRpb24gZnJvbSAnLi9jb21wb25lbnRzL2VkdWNhdGlvbic7XHJcbmltcG9ydCBjb3Vyc2VTZWFyY2ggZnJvbSAnLi9jb21wb25lbnRzL2NvdXJzZS1zZWFyY2gnO1xyXG5cclxuZXhwYW5kYWJsZVRleHRDYXJkcygpO1xyXG5oZWFkZXIoKTtcclxubmF2KCk7XHJcbnN3aXBlcigpO1xyXG50YWJzKCk7XHJcbmRpYWxvZ3MoKTtcclxuZm9ybXNBY2Nlc3NEaWFsb2coKTtcclxuaG9tZUhlcm8oKTtcclxucGxheUxpc3QoKTtcclxuaG90VGlwTGlicmFyeSgpO1xyXG5hbGVydCgpO1xyXG5hcnRpY2xlRmlsdGVycygpO1xyXG5tdWx0aW1lZGlhRmlsdGVycygpO1xyXG5xdWFudGl0eVNlbGVjdG9yKCk7XHJcbmNoZWNrb3V0KCk7XHJcblxyXG5pZiAoZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuY29udGFpbnMoXCJwYWdlLXRlbXBsYXRlLWNvbGxlY3Rpb25QYWdlXCIpKSB7XHJcbiAgICBlZHVjYXRpb24oKTtcclxufVxyXG5cclxuaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZWNcIikpIHtcclxuICAgIGNhbGVuZGFyKCk7XHJcbn1cclxuXHJcbmlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvdXJzZS1zZWFyY2hcIikpIHtcclxuICAgIGNvdXJzZVNlYXJjaCgpO1xyXG59Il0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFNQSxPQUFDLFdBQVk7QUFFWDtBQUVBLGlCQUFTQSxlQUFlLElBQUksU0FBUztBQUVuQyxjQUFJLENBQUMsSUFBSTtBQUNQO0FBQUEsVUFDRjtBQUVBLGVBQUssS0FBSztBQUNWLGVBQUssY0FBYyxLQUFLLEdBQUcsdUJBQXVCLGlCQUFpQjtBQUNuRSxlQUFLLFlBQVksS0FBSyxHQUFHLHVCQUF1QixlQUFlO0FBQy9ELGVBQUssb0JBQW9CLEtBQUssR0FBRyx1QkFBdUIsc0JBQXNCO0FBRTlFLGVBQUssVUFBVSxLQUFLLFFBQVE7QUFBQSxZQUMxQixZQUFZO0FBQUEsWUFDWixhQUFhO0FBQUEsWUFDYixhQUFhO0FBQUEsWUFDYixnQkFBZ0I7QUFBQSxVQUNsQixHQUFHLE9BQU87QUFFVixjQUFHLEdBQUcsYUFBYSxtQkFBbUIsS0FBSyxRQUFPO0FBQ2hELGlCQUFLLFFBQVEsY0FBYztBQUFBLFVBQzdCLFdBQVcsR0FBRyxhQUFhLG1CQUFtQixLQUFLLFNBQVM7QUFDMUQsaUJBQUssUUFBUSxjQUFjO0FBQUEsVUFDN0I7QUFFQSxjQUFHLEdBQUcsYUFB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OiBbIkFjY29yZGlvblRhYnMiLCAib2JqIiwgImhlYWRlciIsICJoZWFkZXIiLCAibmF2IiwgImV4dGVuZCIsICJDdXN0b21FdmVudCIsICJjbGFzc2VzIiwgImdldENvbXB1dGVkU3R5bGUiLCAid2luZG93IiwgImlzT2JqZWN0IiwgImV4dGVuZCIsICJzd2lwZXIiLCAiZG9jdW1lbnQiLCAid2luZG93IiwgImRvY3VtZW50IiwgInN1cHBvcnQiLCAic3dpcGVyIiwgIm9ic2VydmVyVXBkYXRlIiwgImV2ZW50cyIsICJzZWxmIiwgImV2ZW50IiwgInNsaWRlIiwgInRyYW5zbGF0ZSIsICJyZWFsSW5kZXgiLCAibWluVHJhbnNsYXRlIiwgIm1heFRyYW5zbGF0ZSIsICJ0cmFuc2l0aW9uRW5kIiwgInNsaWRlVG8iLCAic2V0VHJhbnNsYXRlIiwgImkiLCAiaW5jcmVtZW50IiwgImJyZWFrcG9pbnRzIiwgImV4dGVuZCIsICJzd2lwZXIiLCAic3dpcGVyIiwgInVwZGF0ZSIsICJpc0hpZGRlbiIsICJjbGFzc2VzIiwgInN3aXBlciIsICJ1cGRhdGUiLCAiaXNIaWRkZW4iLCAic3dpcGVyIiwgImRvY3VtZW50IiwgInNldFRyYW5zbGF0ZSIsICJzZXRUcmFuc2l0aW9uIiwgInVwZGF0ZVNpemUiLCAiZXZlbnRzIiwgInN3aXBlciIsICJkb2N1bWVudCIsICJzd2lwZXIiLCAic2V0VHJhbnNsYXRlIiwgInNldFRyYW5zaXRpb24iLCAic3dpcGVyIiwgInNsaWRlIiwgInN3aXBlciIsICJzZXRUcmFuc2xhdGUiLCAic2V0VHJhbnNpdGlvbiIsICJBY2NvcmRpb25UYWJzIiwgImV2ZW50IiwgImRpYWxvZ3MiLCAidG9nZ2xlIiwgIm5vdyIsICJwb3N0UmVzdWx0cyIsICJwb3N0UmVzdWx0cyJdCn0K
