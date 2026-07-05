/**
 * IO + rAF + setTimeout shim injected into jsdom before the legacy main.js runs.
 * Exposes window.__fireIO() to trigger observed targets and
 * window.__advance(ms) to move rAF+timeouts forward deterministically.
 */
(function () {
  var ios = [];

  if (typeof window.matchMedia !== 'function') {
    window.matchMedia = function (q) {
      return {
        matches: false,
        media: q,
        onchange: null,
        addListener: function () {},
        removeListener: function () {},
        addEventListener: function () {},
        removeEventListener: function () {},
        dispatchEvent: function () {
          return false;
        },
      };
    };
  }

  function IO(cb, options) {
    this.cb = cb;
    this.opts = options;
    this.t = [];
    ios.push(this);
  }
  IO.prototype.observe = function (el) {
    this.t.push(el);
  };
  IO.prototype.unobserve = function (el) {
    this.t = this.t.filter(function (x) {
      return x !== el;
    });
  };
  IO.prototype.disconnect = function () {
    this.t = [];
  };
  IO.prototype.takeRecords = function () {
    return [];
  };
  window.IntersectionObserver = IO;

  window.__fireIO = function () {
    ios.forEach(function (io) {
      var entries = io.t.map(function (el) {
        return {
          target: el,
          isIntersecting: true,
          intersectionRatio: 1,
          boundingClientRect: el.getBoundingClientRect ? el.getBoundingClientRect() : {},
          intersectionRect: {},
          rootBounds: null,
          time: window.performance.now(),
        };
      });
      io.cb(entries, io);
    });
  };

  var now = 0;
  var rafs = [];
  var touts = [];

  window.performance = window.performance || {};
  window.performance.now = function () {
    return now;
  };

  window.requestAnimationFrame = function (fn) {
    rafs.push(fn);
    return rafs.length;
  };
  window.cancelAnimationFrame = function () {};

  var origSetTimeout = window.setTimeout;
  window.setTimeout = function (fn, ms) {
    touts.push({ fn: fn, at: now + (ms || 0), done: false });
    return touts.length;
  };
  window.clearTimeout = function () {};

  window.__advance = function (ms) {
    var end = now + ms;
    while (now < end) {
      now += 16;
      var pending = rafs;
      rafs = [];
      for (var i = 0; i < pending.length; i++) {
        try {
          pending[i](now);
        } catch (_) {}
      }
      for (var j = 0; j < touts.length; j++) {
        var t = touts[j];
        if (!t.done && t.at <= now) {
          t.done = true;
          try {
            t.fn();
          } catch (_) {}
        }
      }
    }
  };
})();
