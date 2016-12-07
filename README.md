# jquery-progress-indicator
페이지에서 현재의 스크롤 위치를 다양한 방법으로 표시해 줍니다.

DEMO : http://codepen.io/zidell/pen/XNzQyV

## Usage
```
<script src="https://cdn.rawgit.com/tyleteam/jquery-progress-indicator/master/jquery-progress-indicator-1.0.5.min.js"></script>

<script>
    $.progressIndicator();
</script>
```

## Options
```
$.progressIndicator({
    direction : 'top',
    barColor: 'rgb(253, 191, 38)',
    percentageEnabled : true,
    percentageColor: '#222',
    easingSpeed : 0.5,
    height: 4,
    target : 'body', // selector
    onStart : function(){
        console.log("onStart");
    },
    onEnd : function(){
        console.log("onEnd");
    },
    onProgress : function(perecent){
        console.log(perecent);
    }
});
```
