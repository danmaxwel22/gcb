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
    'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.1.3/js/bootstrap.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js',
    'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.17.5/xlsx.full.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/sweetalert/2.1.2/sweetalert.min.js',
];

// Function to load libraries sequentially
function loadLibraries(index) {
    if (index < libraryUrls.length) {
        loadScript(libraryUrls[index], function() {
            // Continue loading the next library
            loadLibraries(index + 1);
        });
    } else {
    
      $(function() {

        function getParameterValue(url, paramName) {
            var urlParts = url.split('?');
            
            if (urlParts.length > 1) {
                var queryParams = urlParts;
          
                for (var i = 0; i < queryParams.length; i++) {
                    var param = queryParams[i].split('=');
                  
                    if (param[0] === paramName) {
                        return decodeURIComponent(param[1]);
                    }
                }
            }
            return null;
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
      
        function sheetReader(member, coolors) {
          return new Promise((resolve, reject) => {
            fetch('assets/test.xlsx')
              .then(response => response.blob())
              .then(data => {
                var reader = new FileReader();
                reader.onload = function (e) {
                  var workbook = XLSX.read(new Uint8Array(e.target.result), { type: 'array' });
                  var sheetName = workbook.SheetNames[0];
                  var sheet = workbook.Sheets[sheetName];
                  var excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
                  var nonEmptyRows = excelData.filter(row => row.some(cell => cell !== ''));
                  var transposedData = excelData[0].map((col, i) => excelData.map(row => row[i]));
                  var nonEmptyColumns = transposedData.filter(col => col.some(cell => cell !== ''));
                  var r = nonEmptyRows.length;
                  var c = nonEmptyColumns.length;
                  var name = member;
                  var arrayOfObjects = [];
                  const iname = nonEmptyRows[0].indexOf("Name", 0);
                  const mainItems = ["Role", "Task Description", "Name"];
                  const indices = [];
                  nonEmptyRows[0].forEach((item, index) => {
                    if (!mainItems.includes(item)) {
                      indices.push(index);
                    }
                  });
                  const imember = nonEmptyColumns[+iname].indexOf(name);
      
                  if(coolors) {
                    for (let i = 0; i < indices.length; i++) {
                      var obj = {};
                      obj["title"] = nonEmptyRows[0][indices[i]];
                      obj["value"] = nonEmptyColumns[indices[i]][imember];
                      obj["color"] = coolors[i];
                      arrayOfObjects.push(obj);
                    }
                  } else {
                    var roleI = nonEmptyRows[0].indexOf("Role");
                    var taskI = nonEmptyRows[0].indexOf("Task Description");
                    for (let i = 1; i < r; i++) {
                      var obj = {};
                      var x = 0;
                      indices.forEach(row => {
                        x = x + +nonEmptyRows[i][row];
                      });
                      obj["value"] = x;
                      obj["desc"] = nonEmptyRows[i][iname];
                      obj["task"] = nonEmptyRows[i][taskI];
                      obj["role"] = nonEmptyRows[i][roleI];
                      arrayOfObjects.push(obj);
                    }
                  }
      
                  resolve(arrayOfObjects); 
                };
                reader.readAsArrayBuffer(data);
              })
              .catch(error => {
                console.error('Error fetching Excel file:', error);
                reject(error); 
              });
          });
        }
        
          (function() {
            (function() {
      
            sheetReader("All")
            .then(data => {
              var ANIM_DELAY, ANIM_DURATION, BAR_HEIGHT, COLORS, COLORS_G, DATA, H, INITIAL_WIDTH, M, MAX_VALUE, NAME, TOTAL_VALUE, W, container, g, highlight, highlightClear, host, oH, oW, percentScale, randomize, resize, svg, update, xScale, yScale;
              NAME = 'horizontal-bar';
              M = 0;
              COLORS_G = ['#b5b5b5', '#999999', '#808080', '#6b6b6b', '#565656'];
              DATA = data.filter(item => item.role === "Developer");
              DATA_designer = data.filter(item => item.role === "Designer");
      
              var original2DArray = [
                ['#0d47a1', '#1565c0', '#1976d2', '#1e88e5', '#2196f3'],
                ['#006466', '#065a60', '#0b525b', '#144552', '#1b3a4b'],
                ['#718355', '#87986a', '#97a97c', '#9dae84', '#a9b893'],
                ['#ed2c59', '#ef436b', '#ef476f', '#f15b7e', '#f37290'],
                ['#ae1e2c', '#c52233', '#da2537', '#de3b4b', '#e1515f']
              ];
      
              var randomNumber = Math.floor(Math.random() * original2DArray.length - 1);
              COLORS = original2DArray[randomNumber];
              
              var currentUrl = window.location.href;
              var sValueGC = getParameterValue(currentUrl, 'p');
              var rValueGC = getParameterValue(currentUrl, 'r');
              
              if(!sValueGC) { sValueGC = 1; }
              if(rValueGC) { DATA = DATA_designer; }
      
              var pageGC = sValueGC;
              var itemsPerPageGC = 5;
              var startIndexGC = (pageGC - 1) * itemsPerPageGC;
              var totalPages = Math.ceil(DATA.length / itemsPerPageGC);
              DATA = DATA.slice(startIndexGC, startIndexGC + itemsPerPageGC);
      
              if(sValueGC == 1) {
                $("#gc-prev").prop('disabled', true);
              }
              
              if(sValueGC >= totalPages) {
                $("#gc-next").prop('disabled', true);
              }
      
              $(document).on("click", ".fab-container .fab", function(){
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
                    window.location.href = updatedUrlGC;
                    break;
                  case "gc-next":
                    pn = +(sValueGC) + 1;
                    updatedUrl = removeQueryParams(currentUrl, ['p']);
                    updatedUrlGC = updatedUrl + "?p=" + pn++;
                    window.location.href = updatedUrlGC;
                    break;
                  case "gc-prev":
                    pn = +(sValueGC) - 1;
                    updatedUrl = removeQueryParams(currentUrl, ['p']);
                    updatedUrlGC = updatedUrl + "?p=" + pn--;
                    window.location.href = updatedUrlGC;
                    break;
                  case 'i-ask':
                      swal({
                        className: "swal-widget",
                        icon: "https://s5.gifyu.com/images/Si3hC.png",
                        text: 'Ask me anything ... ',
                        content: "input",
                        button: {
                          text: "Search!",
                          closeModal: true,
                        },
                      })
                      .then(name => {
                        if (!name) throw null;
                        window.open(`https://iask.ai/?mode=question&options[detail_level]=detailed&q=${name}`, '_blank');
                      })
                    break;
                  default:
                    break;
                }
              });
      
              document.addEventListener('click', function(e) {
                  var parentID = e.target.parentNode.id;
                  if(parentID == "chart") {
                    var yCoordinate = e.clientY;
                    var clickedRow = Math.floor(yCoordinate / BAR_HEIGHT);
                    sheetReader(DATA[clickedRow].desc, COLORS)
                    .then(data => {
                      let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('defaultModal')) 
          
                      $('#defaultModal .modal-body').html('<div id="doughnutChart" class="chart"></div>');
          
                      $(document).on('show.bs.modal', '#defaultModal', () => { 
                        $("#doughnutChart").drawDoughnutChart(data);
                      }) 
          
                      $(document).on('hidden.bs.modal', '#defaultModal', () => { 
                        $(".chart").remove();
                      }) 
          
                      modal.show();
                    })
                    .catch(error => {
                      // Handle errors if needed
                      console.error(error);
                    });
                  }
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
                //d3.event.stopPropagation(); 
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
              xScale = d3.scale.linear().domain([0, MAX_VALUE * 1]).range([INITIAL_WIDTH, oW]);
              percentScale = d3.scale.linear().domain([0, TOTAL_VALUE]).range([0, 100]);
              yScale = d3.scale.linear().domain([0, DATA.length]).range([0, oH]);
              g = svg.selectAll('g').data(DATA);
              container = g.enter().append('g');
              
              container.append('rect').attr('class', 'bar').attr('x', 0).attr('y', function(d, i) {
                return i * BAR_HEIGHT;
              }).attr('width', 15).attr('height', BAR_HEIGHT).attr('fill', function(d, i) {
                if(!COLORS) {
                  COLORS = ['#0d47a1', '#1565c0', '#1976d2', '#1e88e5', '#2196f3'];
                }
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
              // host = window.location.hostname;
              // if (host === 's.codepen.io' || host === 'localhost') {
              //   return setInterval((function() {
              //     return update(randomize(0, 20));
              //   }), 6000);
              // }
            })
            .catch(error => {
              // Handle errors if needed
              console.error(error);
            });
            
            })(window);
          }).call(this);
      
      });
      

    }
}

// Start loading libraries from index 0
loadLibraries(0);
