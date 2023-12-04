function loadScript(src, callback) {
    var scriptElement = document.createElement('script');
    scriptElement.src = src;
    document.head.appendChild(scriptElement);
    scriptElement.onload = callback;
}

// List of library URLs
var libraryUrls = [
    'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.min.js'
    // Add more library URLs as needed
];

// Function to load libraries sequentially
function loadLibraries(index) {
    if (index < libraryUrls.length) {
        loadScript(libraryUrls[index], function() {
            // Continue loading the next library
            loadLibraries(index + 1);
        });
    } else {
        // All libraries are loaded, your code using libraries can go here
        $(document).ready(function() {
            
  function getQueryParams(url) {
    var params = {};
    var queryString = url.split('?')[1];

    if (queryString) {
        var paramPairs = queryString.split('&');

        for (var i = 0; i < paramPairs.length; i++) {
            var pair = paramPairs[i].split('=');
            var key = decodeURIComponent(pair[0]);
            var value = decodeURIComponent(pair[1] || '');

            params[key] = value;
        }
    }

    return params;
}

function removeQueryParams(url, paramsToRemove) {
  var urlParts = url.split('?');
    
  if (urlParts.length > 1) {
      var baseUrl = urlParts[0];
      
      var queryParams = urlParts[1].split('&');

      var filteredParams = queryParams.filter(function(param) {
          var paramName = param.split('=')[0];
          return !paramsToRemove.includes(paramName);
      });
      var newQueryString = filteredParams.join('&');

      var newURL = baseUrl + (newQueryString ? '?' + newQueryString : '');

      return newURL;
  }
  return url;
}
    
  (function() {
    (function() {
      var ANIM_DELAY, ANIM_DURATION, BAR_HEIGHT, COLORS, COLORS_G, DATA, H, INITIAL_WIDTH, M, MAX_VALUE, NAME, TOTAL_VALUE, W, container, g, highlight, highlightClear, host, oH, oW, percentScale, randomize, resize, svg, update, xScale, yScale;
      NAME = 'horizontal-bar';
      M = 0;
      COLORS = ['#eaa54b', '#66a1e2', '#8065e4', '#48cb80', '#ff1d58', '#0049B7', '#00DDFF', '#a28089', '#68d388', '#2d545e', '#beef00', '#00a0a0', '#ff414e', '#F7882F'];
      COLORS_G = ['#b5b5b5', '#8c8c8c', '#6b6b6b', '#565656', '#999999', '#8c8c8c', '#8c8c8c', '#808080', '#6b6b6b', '#565656', '#b5b5b5', '#6b6b6b', '#808080', '#8c8c8c'];
      DATA = [
        {
          value: 60,
          desc: 'Paul',
          task: 'Membership with chat feature'
        },
        {
          value: 60,
          desc: 'Khayle',
          task: 'Membership with chat feature'
        },
        {
          value: 60,
          desc: 'Ardhen',
          task: 'Membership with chat feature'
        },
        {
          value: 65,
          desc: 'Joshua',
          task: 'Membership with chat feature'
        },
        {
          value: 70,
          desc: 'Lawrence',
          task: 'Membership with chat feature'
        },
        {
          value: 0,
          desc: 'Paulie',
          task: 'Membership with chat feature'
        },
        {
          value: 17,
          desc: 'Harold',
          task: 'Membership with chat feature'
        },
        {
          value: 65,
          desc: 'Kester',
          task: 'Membership with chat feature'
        },
        {
          value: 20,
          desc: 'Florence',
          task: 'Membership with chat feature'
        },
        {
          value: 35,
          desc: 'Melvin',
          task: 'Membership with chat feature'
        },
        {
          value: 46,
          desc: 'Christian',
          task: 'Membership with chat feature'
        },
        {
          value: 30,
          desc: 'Ron',
          task: 'Membership with chat feature'
        },
        {
          value: 0,
          desc: 'Kenneth',
          task: 'Membership with chat feature'
        },
        {
          value: 20,
          desc: 'Jayson',
          task: 'Membership with chat feature'
        }
      ];

      DATA_designer = [
        {
          value: 60,
          desc: 'Jeric',
          task: 'Learning Photoshop'
        },
        {
          value: 50,
          desc: 'John Mark',
          task: 'Learning Photoshop'
        },
        {
          value: 70,
          desc: 'Archie',
          task: 'Learn Lottie/LottieFiles'
        },
      ]


      var currentUrl = window.location.href;

var queryParams = getQueryParams(currentUrl);
      var sValueGC = queryParams['p'];
      var rValueGC = queryParams['r'];

      if(!sValueGC) { 
        sValueGC = 1; 
      }

      if(rValueGC) { 
        DATA = DATA_designer;
      }

      var pageGC = sValueGC;

      var itemsPerPageGC = 7;

      var startIndexGC = (pageGC - 1) * itemsPerPageGC;

      var totalPages = Math.ceil(DATA.length / itemsPerPageGC);

      DATA = DATA.slice(startIndexGC, startIndexGC + itemsPerPageGC);


      if(sValueGC == 1) {
        $("#gc-prev").prop('disabled', true);
        console.log("sValueGC")
      }
      
      if(sValueGC >= totalPages) {
        $("#gc-next").prop('disabled', true);
      }


      $(document).on("click", ".fab-container .sub-button", function(){
        var updatedUrlGC =  currentUrl;
        var pn, updatedUrl;
        switch($(this).attr("id")) {
          case "gc-user-role":
            updatedUrl = removeQueryParams(currentUrl, ['p']);
            updatedUrl = removeQueryParams(updatedUrl, ['r']);
            updatedUrlGC = updatedUrl;
            if(!rValueGC) { 
              updatedUrlGC = updatedUrlGC + "?r=d";
            }
            break;
          case "gc-next":
            pn = +(sValueGC) + 1;
            updatedUrl = removeQueryParams(currentUrl, ['p']);
            updatedUrlGC = updatedUrl + "?p=" + pn++;
            break;
          case "gc-prev":
            pn = +(sValueGC) - 1;
            updatedUrl = removeQueryParams(currentUrl, ['p']);
            updatedUrlGC = updatedUrl;
            break;
          default:
            break;
        }

        console.log(updatedUrlGC)
        window.location.href = updatedUrlGC;
      });
      
      
      randomize = function(min, max) {
        return DATA.map(function(d) {
          d.value = Math.floor(Math.random() * (max - min) + min);
          return d;
        });
      };
      highlight = function(seldata, seli) {
        d3.event.stopPropagation();
        svg.selectAll('.bar').attr('fill', function(d, i) {
          if (i === seli) {
            return COLORS[i];
          } else {
            return COLORS_G[i];
          }
        });
        return d3.select(this).attr('x', 15).attr('y', function() {
          return +this.getAttribute('y') + 15;
        }).attr('width', function(d) {
          return xScale(d.value) - 30;
        }).attr('height', BAR_HEIGHT - 30).transition().duration(500).ease('elastic').attr('x', 0).attr('y', function() {
          return +this.getAttribute('y') - 15;
        }).attr('height', BAR_HEIGHT).attr('width', function(d) {
          return xScale(d.value);
        });
      };
      highlightClear = function(seldata, seli) {
        d3.event.stopPropagation();
        return svg.selectAll('.bar').attr('fill', function(d, i) {
          return COLORS[i];
        });
      };
      MAX_VALUE = d3.max(DATA, function(d) {
        return d.value;
      });
      TOTAL_VALUE = DATA.reduce(function(p, c) {
        if (typeof p === 'object') {
          return p.value + c.value;
        } else {
          return p + c.value;
        }
      });
      ANIM_DURATION = 750;
      ANIM_DELAY = 300;
      oW = window.innerWidth;
      oH = window.innerHeight;
      W = oW - M - M;
      H = oH - M - M;
      BAR_HEIGHT = H / DATA.length;
      INITIAL_WIDTH = 15;
      svg = d3.select('#chart').append('svg').on('click', highlightClear).attr('class', NAME).attr('width', oW).attr('height', oH);
      xScale = d3.scale.linear().domain([0, MAX_VALUE * 1.5]).range([INITIAL_WIDTH, oW]);
      percentScale = d3.scale.linear().domain([0, TOTAL_VALUE]).range([0, 100]);
      yScale = d3.scale.linear().domain([0, DATA.length]).range([0, oH]);
      g = svg.selectAll('g').data(DATA);
      container = g.enter().append('g');
      
      container.append('rect').attr('class', 'bar').attr('x', 0).attr('y', function(d, i) {
        return i * BAR_HEIGHT;
      }).attr('width', INITIAL_WIDTH).attr('height', BAR_HEIGHT).attr('fill', function(d, i) {
        return COLORS[i % DATA.length];
      }).on('click', highlight).transition().duration(ANIM_DURATION).delay(function(d, i) {
        return i * 100;
      }).attr('width', function(d) {
        return xScale(d.value);
      });
      container.append('line').style('stroke', '#767676').style('fill', 'none').style('stroke-width', '1px').attr('x1', 0).attr('y1', function(d, i) {
        return yScale(i);
      }).attr('x2', oW).attr('y2', function(d, i) {
        return yScale(i);
      });

      container.append('text').attr('pointer-events', 'none').attr('class', 'portion').attr('x', function(d, i) {
        return BAR_HEIGHT * 0.8;
      }).attr('y', function(d, i) {
        return yScale(i) + BAR_HEIGHT / 2;
      }).attr('dy', ".35em").attr('font-size', `${BAR_HEIGHT / 2.5}px`).attr('text-anchor', 'end').attr('fill', '#fff').text("0").transition().duration(ANIM_DURATION).tween('text', function(d) {
        var i;
        i = d3.interpolate(this.textContent, d.value);
        return function(t) {
          return this.textContent = i(t).toFixed(0);
        };
      });

      container.append('text').attr('pointer-events', 'none').attr('class', 'portion_sign').attr('x', function(d, i) {
        return BAR_HEIGHT * 0.8 + 5;
      }).attr('y', function(d, i) {
        return yScale(i) + BAR_HEIGHT / 2;
      }).attr('dy', ".7em").attr('font-size', `${BAR_HEIGHT / 5}px`).attr('text-anchor', 'start').attr('fill', '#fff').text("%");
      container.append('text').attr('pointer-events', 'none').attr('class', 'desc').attr('x', function(d, i) {
        return BAR_HEIGHT * 1.3;
      }).attr('y', function(d, i) {
        return yScale(i) + BAR_HEIGHT / 2;
      }).attr('dy', "-.35em").attr('font-size', `${BAR_HEIGHT / 4.7}px`).attr('fill', '#fff').text(function(d) {
        return d.desc;
      });
      container.append('text').attr('pointer-events', 'none').attr('class', 'item_count').attr('x', function(d, i) {
        return BAR_HEIGHT * 1.3;
      }).attr('y', function(d, i) {
        return yScale(i) + BAR_HEIGHT / 2;
      }).attr('dy', "1.4em").attr('font-size', `${BAR_HEIGHT / 7.1}px`).attr('fill', '#fff').style('opacity', .7).text(function(d) {
        return d.task;
      });
      // path from "https://github.com/google/material-design-icons/blob/master/navigation/svg/design/ic_chevron_right_48px.svg"
      container.append('path').attr('class', 'arrow').attr('d', 'M15 9l-2.12 2.12L19.76 18l-6.88 6.88L15 27l9-9z').attr('viewBox', '0 0 36 36').attr('transform', function(d, i) {
        return `translate(${oW - 60}, ${yScale(i) + BAR_HEIGHT / 2 - 18})`;
      }).style('fill', '#fff');
      g.exit().remove();
      resize = function() {
        oW = window.innerWidth;
        oH = window.innerHeight;
        W = oW - M - M;
        H = oH - M - M;
        BAR_HEIGHT = H / DATA.length;
        svg.attr('width', oW).attr('height', oH);
        xScale.range([INITIAL_WIDTH, oW]);
        yScale.range([0, oH]);
        g = svg.selectAll('g');
        g.select('.bar').attr('y', function(d, i) {
          return i * BAR_HEIGHT;
        }).attr('height', BAR_HEIGHT).transition().duration(ANIM_DURATION).delay(function(d, i) {
          return i * 100;
        }).attr('width', function(d) {
          return xScale(d.value);
        });
        g.select('line').attr('y1', function(d, i) {
          return yScale(i);
        }).attr('x2', oW).attr('y2', function(d, i) {
          return yScale(i);
        });
        g.select('.portion').attr('x', function(d, i) {
          return BAR_HEIGHT * 0.8;
        }).attr('y', function(d, i) {
          return yScale(i) + BAR_HEIGHT / 2;
        }).attr('pointer-events', 'none').attr('font-size', `${BAR_HEIGHT / 2.5}px`);
        g.select('.portion_sign').attr('x', function(d, i) {
          return BAR_HEIGHT * 0.8 + 5;
        }).attr('y', function(d, i) {
          return yScale(i) + BAR_HEIGHT / 2;
        }).attr('pointer-events', 'none').attr('font-size', `${BAR_HEIGHT / 5}px`);
        g.select('.desc').attr('x', function(d, i) {
          return BAR_HEIGHT * 1.3;
        }).attr('y', function(d, i) {
          return yScale(i) + BAR_HEIGHT / 2;
        }).attr('pointer-events', 'none').attr('font-size', `${BAR_HEIGHT / 4.7}px`);
        g.select('.item_count').attr('x', function(d, i) {
          return BAR_HEIGHT * 1.3;
        }).attr('y', function(d, i) {
          return yScale(i) + BAR_HEIGHT / 2;
        }).attr('pointer-events', 'none').attr('font-size', `${BAR_HEIGHT / 7.1}px`);
        return g.select('.arrow').attr('pointer-events', 'none').attr('transform', function(d, i) {
          return `translate(${oW - 60}, ${yScale(i) + BAR_HEIGHT / 2 - 18})`;
        });
      };
      update = function(data) {
        MAX_VALUE = d3.max(DATA, function(d) {
          return d.value;
        });
        TOTAL_VALUE = DATA.reduce(function(p, c) {
          if (typeof p === 'object') {
            return p.value + c.value;
          } else {
            return p + c.value;
          }
        });
        BAR_HEIGHT = H / DATA.length;
        xScale.domain([0, MAX_VALUE * 1.5]);
        yScale.domain([0, DATA.length]);
        percentScale.domain([0, TOTAL_VALUE]);
        g = svg.selectAll('g').data(data);
        g.select('.bar').transition().duration(ANIM_DURATION).delay(function(d, i) {
          return i * 100;
        }).attr('width', function(d) {
          return xScale(d.value);
        }).attr('fill', function(d, i) {
          return COLORS[i];
        });
        g.select('.portion').transition().duration(ANIM_DURATION).tween('text', function(d) {
          var i;
          i = d3.interpolate(this.textContent, d.value);
          return function(t) {
            return this.textContent = i(t).toFixed(0);
          };
        });
        return g.select('.item_count').text(function(d) {
            return d.task;
        });
      };
      d3.select(window).on('resize', resize);
      // for DEBUG
      host = window.location.hostname;
      if (host === 's.codepen.io' || host === 'localhost') {
        return setInterval((function() {
          return update(randomize(0, 20));
        }), 6000);
      }
    })(window);
  
}).call(this);

            });
    }
}

// Start loading libraries from index 0
loadLibraries(0);
