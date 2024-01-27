const nav = () => {
    const header = document.querySelector('.site-header');
    const main = document.querySelector('.js-site-main');
    const navItems = document.querySelectorAll('.js-nav-item');
    const navSubMenus = document.querySelectorAll('.js-nav-sub-menu');
    const navSubMenuClose = document.querySelectorAll('.js-sub-menu-close');

    const navToggle = document.querySelector('.js-nav-toggle');
    const navMobileItems = document.querySelectorAll('.js-nav-mobile-item');
    const navMobileSubMenus = document.querySelectorAll('.js-nav-mobile-sub-menu');
    const navMobileSubMenuClose = document.querySelectorAll('.js-sub-menu-mobile-back');


    const darkness = (show) => {
        if (show) {
            main.classList.add("has-overlay")
        } else {
            main.classList.remove("has-overlay")
        }
    }

    const closeMenu = (clearNavItems, clearSubNavItems) => {
        clearNavItems.forEach((clearNavItem) => {
            clearNavItem.setAttribute("aria-selected", "false");
        });
        clearSubNavItems.forEach((clearSubNavItem) => {
            clearSubNavItem.classList.add("is-hidden");
        });

        darkness(false)
    };

    if (navItems) {

        navItems.forEach((navItem) => {
            navItem.addEventListener("click", (e) => {
                closeMenu(navItems, navSubMenus);
                navItem.setAttribute("aria-selected", "true");
                const getTargetId = navItem.getAttribute("aria-controls"),
                    targetPanel = document.getElementById(getTargetId);
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
            })
        });

        header.addEventListener("click", (e) => {

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
                const getTargetId = navMobileItem.getAttribute("aria-controls"),
                    targetPanel = document.getElementById(getTargetId);
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

        const nav = document.getElementById(navToggle.getAttribute('aria-controls'));

        const openNav = () => {
            nav.ariaHidden = false;
            navToggle.ariaExpanded = true;
            document.documentElement.classList.add('has-open-nav');
        };

        const closeNav = () => {
            nav.ariaHidden = true;
            navToggle.ariaExpanded = false;
            document.documentElement.classList.remove('has-open-nav');
            closeMenu(navMobileItems, navMobileSubMenus);
        };

        navToggle.addEventListener('click', () => {
            if (navToggle.ariaExpanded === 'true') {
                closeNav();
            } else {
                openNav();
            }
        });
    }
    document.onkeydown = function (e) {
        if (e.key == "Escape") {
            closeMenu(navItems, navSubMenus);
        }
    };

};

export default nav;