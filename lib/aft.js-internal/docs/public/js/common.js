/* eslint-disable prefer-arrow-callback, prefer-template,block-scoped-var */
(function () {
    if (window.PAGE_TYPE) {
        initSubHeaders();
        initLocationHashFuzzyMatching();
    }

    function parseRawHash(hash) {
        // Remove leading hash
        if (hash.charAt(0) === '#') {
            hash = hash.substr(1);
        }

        // Escape characthers
        try {
            hash = decodeURIComponent(hash);
        } catch (e) {
            //
        }
        return CSS.escape(hash);
    }

    function initLocationHashFuzzyMatching() {
        var rawHash = window.location.hash;
        if (!rawHash) {
            return;
        }
        var hash = parseRawHash(rawHash);
        var hashTarget = document.getElementById(hash);
        if (!hashTarget) {
            var normalizedHash = normalizeHash(hash);
            var possibleHashes = [].slice.call(document.querySelectorAll('[id]'))
                .map(function (el) {
                    return el.id;
                });
            possibleHashes.sort(function (hashA, hashB) {
                var distanceA = levenshteinDistance(normalizedHash, normalizeHash(hashA));
                var distanceB = levenshteinDistance(normalizedHash, normalizeHash(hashB));
                if (distanceA < distanceB) {
                    return -1;
                }
                if (distanceA > distanceB) {
                    return 1;
                }
                return 0;
            });
            window.location.hash = '#' + possibleHashes[0];
        }

        function normalizeHash(rawHash) {
            return rawHash
                .toLowerCase()
                .replace(/\-(?:deprecated|removed|replaced|changed|obsolete)$/, '');
        }

        function levenshteinDistance(a, b) {
            var m = [];
            if (!(a && b)) {
                return (b || a).length;
            }
            var i, j;
            for (i = 0; i <= b.length; m[i] = [i++]) {/**/}
            for (j = 0; j <= a.length; m[0][j] = j++) {/**/}
            for (i = 1; i <= b.length; i++) {
                for (j = 1; j <= a.length; j++) {
                    m[i][j] = b.charAt(i - 1) === a.charAt(j - 1) ?
                        m[i - 1][j - 1] :
                        m[i][j] = Math.min(
                            m[i - 1][j - 1] + 1,
                            Math.min(m[i][j - 1] + 1, m[i - 1][j] + 1));
                }
            }
            return m[b.length][a.length];
        }
    }

    /**
     * Sub headers in sidebar
     */

    function initSubHeaders() {
        var each = [].forEach;
        var sidebar = document.querySelector('.sidebar');
        var content = document.querySelector('.content');

        // build sidebar
        var currentPageAnchor = sidebar.querySelector('.sidebar-link.current');
        var isAPI = document.querySelector('.content').classList.contains('api');
        if (currentPageAnchor || isAPI) {
            var allHeaders = [];
            var sectionContainer;
            if (isAPI) {
                sectionContainer = document.querySelector('.menu-root');
            } else {
                sectionContainer = document.createElement('ul');
                sectionContainer.className = 'menu-sub';
                currentPageAnchor.parentNode.appendChild(sectionContainer);
            }
            var headers = content.querySelectorAll('h2');
            if (headers.length) {
                each.call(headers, function (h) {
                    sectionContainer.appendChild(makeLink(h));
                    var h3s = collectH3s(h);
                    allHeaders.push(h);
                    if (h3s.length) {
                        sectionContainer.appendChild(makeSubLinks(h3s, isAPI));
                    }
                });
            } else {
                headers = content.querySelectorAll('h3');
                each.call(headers, function (h) {
                    sectionContainer.appendChild(makeLink(h));
                    allHeaders.push(h);
                });
            }

            var animating = false;
            sectionContainer.addEventListener('click', function (e) {

                // Not prevent hashchange for smooth-scroll
                // e.preventDefault()

                if (e.target.classList.contains('section-link')) {
                    sidebar.classList.remove('open');
                    setActive(e.target);
                    animating = true;
                    setTimeout(function () {
                        animating = false;
                    }, 400);
                }
            }, true);

            // make links clickable
            allHeaders.forEach(makeHeaderClickable);

            window.smoothScroll.init({
                speed: 400,
                offset: 0
            });
        }

        var hoveredOverSidebar = false;
        sidebar.addEventListener('mouseover', function () {
            hoveredOverSidebar = true;
        });
        sidebar.addEventListener('mouseleave', function () {
            hoveredOverSidebar = false;
        });

        // listen for scroll event to do positioning & highlights
        window.addEventListener('scroll', updateSidebar);
        window.addEventListener('resize', updateSidebar);

        function updateSidebar() {
            var doc = document.documentElement;
            var top = doc && doc.scrollTop || document.body.scrollTop;
            if (animating || !allHeaders) {
                return;
            }
            var last;
            for (var i = 0; i < allHeaders.length; i++) {
                var link = allHeaders[i];
                if (link.offsetTop > top) {
                    if (!last) {
                        last = link;
                    }
                    break;
                } else {
                    last = link;
                }
            }
            if (last) {
                setActive(last.id, !hoveredOverSidebar);
            }
        }

        function addImport(h, type, module, name) {
            var next = h.nextSibling;
            var el = document.createElement('p');
            if (type === 'export') {
                name = '{' + name + '}';
            } else if (type === 'export-as') {
                name = '* as ' + name;
            }
            el.innerHTML = '<code>import ' + name + ' from \'' + window.NPM_NAME + '/' + module + '\'';
            next.parentNode.insertBefore(el, next);
        }

        function makeLink(h, isAPI) {
            var link = document.createElement('li');
            var text = h.textContent;
            var type = '';

            if (isAPI) {
                var splited = text.match(/^([\w\/]+?)(#|\.|@|:|=|~|\*)(.+)$/);
                if (splited) {
                    switch (splited[2]) {
                        case '#':
                            type = 'apiprefix memberof';
                            break;
                        case '.':
                            type = 'apiprefix static';
                            break;
                        case '@':
                            type = 'apiprefix eventemit';
                            break;
                        case ':':
                            type = 'moduleprefix export';
                            addImport(h, 'export', splited[1], splited[3]);
                            break;
                        case '=':
                            type = 'moduleprefix export-default';
                            addImport(h, 'export-default', splited[1], splited[3]);
                            break;
                        case '*':
                            type = 'moduleprefix export-as';
                            addImport(h, 'export-as', splited[1], splited[3]);
                        case '~':
                            type = 'moduleprefix inner';
                            break;
                        default:
                            break;
                    }
                    text = splited[3];
                }
            } else {
                text = text.replace(/\(.*\)$/, '');
            }

            h.textContent = text;
            h.className += ' ' + type;

            link.innerHTML =
                '<a class="section-link" data-scroll href="#' + h.id + '">' +
                htmlEscape(text.replace(/\(.*\)$/, '')) +
                '</a>';
            link.className += ' ' + type;
            return link;
        }

        function htmlEscape(text) {
            return text
                .replace(/&/g, '&amp;')
                .replace(/"/g, '&quot;')
                .replace(/'/g, '&#39;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;');
        }

        function collectH3s(h) {
            var h3s = [];
            var next = h.nextSibling;
            while (next && next.tagName !== 'H2') {
                if (next.tagName === 'H3') {
                    h3s.push(next);
                }
                next = next.nextSibling;
            }
            return h3s;
        }

        function collectH4s(h) {
            var h4s = [];
            var next = h.nextSibling;
            while (next && next.tagName !== 'H2' && next.tagName !== 'H3') {
                if (next.tagName === 'H4') {
                    h4s.push(next);
                }
                next = next.nextSibling;
            }
            return h4s;
        }


        function makeSubLinks(h3s, small) {
            var container = document.createElement('ul');
            if (small) {
                container.className = 'menu-sub';
            }

            h3s.forEach(function (h) {
                container.appendChild(makeLink(h, isAPI));
                var h4s = collectH4s(h);
                allHeaders.push(h);

                if (h4s.length) {
                    container.appendChild(makeAPILinks(h4s));
                }
            });

            return container;
        }

        function makeAPILinks(h4s) {
            var container = document.createElement('ul');
            container.className = 'menu-sub apis';

            h4s.forEach(function (h) {
                allHeaders.push(h);
                container.appendChild(makeLink(h, true));
            });

            return container;
        }

        function setVisible(li, status) {
            var ul = li.parentNode.parentNode;
            if (!ul.classList.contains('apis') &&
                    li.parentNode.nextSibling) {
                ul = li.parentNode.nextSibling;
            }
            status ? ul.classList.add('active') : ul.classList.remove('active');
        }

        function setActive(id, shouldScrollIntoView) {
            var previousActive = sidebar.querySelector('.section-link.active');
            var currentActive = typeof id === 'string' ?
                    sidebar.querySelector('.section-link[href="#' + id + '"]') :
                    id;
            if (currentActive !== previousActive) {
                if (previousActive) {
                    previousActive.classList.remove('active');
                    setVisible(previousActive, false);
                }
                currentActive.classList.add('active');
                setVisible(currentActive, true);

                if (shouldScrollIntoView) {
                    var option = {behavior: 'smooth'};
                    if (currentActive.scrollIntoViewIfNeeded) {
                        currentActive.scrollIntoViewIfNeeded(option);
                    } else if (currentActive.scrollIntoView) {
                        currentActive.scrollIntoView(option);
                    } else {
                        var currentPageOffset = currentPageAnchor ?
                            currentPageAnchor.offsetTop - 8 :
                            0;
                        var currentActiveOffset = currentActive.offsetTop + currentActive.parentNode.clientHeight;
                        var sidebarHeight = sidebar.clientHeight;
                        var currentActiveIsInView = (
                            currentActive.offsetTop >= sidebar.scrollTop &&
                            currentActiveOffset <= sidebar.scrollTop + sidebarHeight
                        );
                        var linkNotFurtherThanSidebarHeight = currentActiveOffset - currentPageOffset < sidebarHeight;
                        var newScrollTop = currentActiveIsInView ?
                            sidebar.scrollTop :
                            linkNotFurtherThanSidebarHeight ?
                            currentPageOffset :
                            currentActiveOffset - sidebarHeight;
                        sidebar.scrollTop = newScrollTop;
                    }
                }
            }
        }

        function makeHeaderClickable(link) {
            var wrapper = document.createElement('a');
            wrapper.href = '#' + link.id;
            wrapper.setAttribute('data-scroll', '');
            link.parentNode.insertBefore(wrapper, link);
            wrapper.appendChild(link);
        }
    }
})();
/* eslint-enable prefer-arrow-callback, prefer-template, block-scoped-var */