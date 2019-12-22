var xmlns = "http://www.w3.org/2000/svg",
  xlinkns = "http://www.w3.org/1999/xlink",
  select = function(s) {
    return document.querySelector(s);
  },
  selectAll = function(s) {
    return document.querySelectorAll(s);
  },
    whiteContainer = select('.whiteContainer'),
    yolkContainer = select('.yolkContainer'),
    allWhites = selectAll('.whiteContainer circle'),
    allYolks = selectAll('.yolkContainer use'),
    tl
  

TweenMax.set('svg', {
  visibility: 'visible'
})

TweenMax.set([allWhites, allYolks], {
 transformOrigin:'50% 50%'
})

var mainTl = new TimelineMax({repeat:-1});

for(var i = 0; i < 4; i++){
 
TweenMax.set(allYolks[i], {
 svgOrigin:(Number(allYolks[i].getAttribute('x'))+20.5) + ' ' + (Number(allYolks[i].getAttribute('y'))+20.5)
}) 
 
 tl = new TimelineMax({repeat:-1, repeatDelay:0.5});
 tl.from(allWhites[i], 1, {
  scaleX:-1,
  ease:Elastic.easeOut.config(0.7,0.7)
  })
.from(allWhites[i], 1, {
  scale:0,
  ease:Elastic.easeOut.config(0.16,0.7)
  },'-=1')
 .to(allWhites[i], 1, {
  scale:0,
  ease:Circ.easeInOut    
 })
.from( allYolks[i], 0.7, {
  scaleX:-1.3,
  //scaleX:0.2,
  ease:Elastic.easeOut.config(0.64,0.57)
  },'-=2')
.from( allYolks[i], 1, {
  //scaleY:0,
  scaleY:0,
  ease:Elastic.easeOut.config(1.2,0.77)
  },'-=2')
 .to( allYolks[i], 1, {
  scale:0,
  ease:Expo.easeInOut    
 },'-=1')
 
 mainTl.add(tl, i/2)//.timeScale(3)
}

mainTl.seek(100)

TweenMax.globalTimeScale(1.2)