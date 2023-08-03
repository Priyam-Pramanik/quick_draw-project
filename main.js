quick_draw_data_set = ["aircraft carrier","airplane","star","ball", "pencil", "car" ];
random_number = Math.floor((Math.random()*quick_draw_data_set.length)+1);
timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
sketch =  quick_draw_data_set[random_number];
console.log(sketch);

console.log()
  function preload() {
  
  
    classifier = ml5.imageClassifier('DoodleNet');
  }
function setUp(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
}
function updateCanvas(){
    background("white");
}
function draw() {
  strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
      line(pmouseX, pmouseY, mouseX, mouseY);
    }
    check_sketch(); 

    if ( drawn_sketch == sketch) {
      score++;
      document.getElementById("score").innerHTML = "Score: " + score;
    }
  }

  function check_sketch(){
    timer_counter++;
    document.getElementById("time").innerHTML = "Timer: " + timer_counter + "Ms";
    console.log(timer_counter);
    if(timer_counter>400){
      timer_counter= 0;
      timer_check = "Completed";
    }
    if(timer_check == "Completed", answer_holder== "Set"){
      timer_check = "";
      answer_holder="";
      updateCanvas();
    }
  }
  
  function classifyCanvas() {
    classifier.classify(canvas, gotResult);
  }
  
  function gotResult(error, results) {
    if (error) {
      console.error(error);
    }
    console.log(results);
    document.getElementById('yourSketch').innerHTML = 'Your Sketch: ' + drawn_sketch;
  
    document.getElementById('confidence').innerHTML = 'Accuracy: ' + Math.round(results[0].confidence * 100) + '%';
  }