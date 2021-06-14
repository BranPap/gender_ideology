var trial_counter = 0;

function slide_set() {

}

function make_slides(f) {
  var   slides = {};

  //set up initial slide
  slides.i0 = slide({
     name : "i0",
     start: function() {
      console.log("check",exp.example_stim);
      exp.startT = Date.now();
     }
  });

  //instructions slide
  slides.instructions = slide({
    name : "instructions",
    start : function() {
      $(document).bind("keydown",function(evt) {
        if (evt.keyCode == 32) {
          $(document).unbind("keydown");
          exp.go();
        }
      }); //use exp.go() if and only if there is no "present" data.
    }
  });

  ////////////////////////////////////////////example 1 slide///////////////////
  slides.example = slide({
    name: "example",
    start: function() {
      //sets stim for this iteration
      this.stim = exp.example_stim[0].condition[0].neutral_female[0];

      //sets our key press settings so that the participants can hit spacebar, but nothing else
      space_available = 0;
      allow_key_press = false;
      answer_keys = false;

      //select which condition you want for this item
      exp.selection == "neutral_female";

      //set the name for the item
      this.name = "Brittany";

      //initialize a trial-specific list of reading times
      this.response_times = [];

      //allows you to call this inside of functions
      var t = this;

      //set the number of presses in the current trial to 0
      var k = 0

      //get the length of the stimulus sentence, to be used later when determining when to stop
      var sentence_length = this.stim.words.length

      //set the intial words on the left and right sides, and assign them to the html
      var left_word = this.stim.words[k].form;
      var right_word = this.stim.words[k].distractor;
      $("#left_word").html(left_word);
      $("#right_word").html(right_word);

      //basically this hides everything on the page until such time as they are called by one of the lower maze functions
      $("#left_word").hide();
      $("#right_word").hide();
      $("#l").hide();
      $("#s").hide();
      $('.correct').hide();
      $('.err').hide();
      $('#ex_question_error').hide();
      $("#attention-question-sample").hide();
      $("#comprehension-question-answers-sample").hide();

      //set the attention check question and its answer
      var question_check = this.stim.question2; //set the attention check question
      this.stim.question_answer = this.stim.answer2; //set the attention check answer


      //This allows the webpage to use your keystrokes while .bind("keydown") is in effect, and allows us to execute different events depending on the particular key pressed
      $(document).bind("keydown",function(evt) {
        //if the participant presses the spacebar, and it is the first button pressed on the page (only true when space_available == 0), then start the timer and allow other key presses
        if (evt.keyCode == 32 && space_available == 0) {
          t.response_times.push(Date.now()); //start the timer
          t.allow_key_press = true; //allow the target keys [s] and [l] to be pressed
          t.space_available = 1; //disallow the pressing of the spacebar
          t.start_maze(t,k); //call the start_maze function below, and pass this and k values to it
        } else if (evt.keyCode == 76 && t.allow_key_press == true) { //if the participant presses the l key...
          space_available = 1; //disallow the pressing of the spacebar
          x = document.getElementById('right_word').textContent; //store the current vale of the right word as variable x, to be used for comparison
          if (k+1 < sentence_length && x == t.stim.words[k].form) { //if the turn value plus one is less than the length of the stimulus sentence AND the current value of x is the same as the correct grammatical continuation (ie if the participant has pressed the right button)...
            t.response_times.push(Date.now()); // record this timestamp
            k += 1; //add 1 to the turn value counter
            t.maze_turn(k,t); //call the maze_turn function, below, and pass k and t to it
          } else if (k+1 == sentence_length && x == t.stim.words[k].form) { //otherwise, if k+1 (current turn value + 1) is equal to the length of the stimulus sentence, AND the current value of X is the correct continuation///
            t.response_times.push(Date.now());//add the time to the timer list
            t.answer_keys = true;
            t.allow_key_press = false;
            t.exit_maze(k,t); //call the exit_maze function below, passing it t and k
          } else {//otherwise, if they pressed l and it was an illegal continuation of the sentence...
            $('.err').show(); //display the error message
            $('#trial_instructions').hide();
            $('#left_word').addClass('highlighted');
            var display_sentence = [];
            for (var d = 0; d < k; d++) {
              var word = t.stim.words[d].form;
              display_sentence.push(word);
            }
            display_sentence.push(x);
            var final_display = display_sentence.join(' ')
            var current_key = "[L]";
            document.getElementById('wrong_key_input').textContent=current_key; //push the updated left word to the html
            document.getElementById('current_sentence').textContent="\""+final_display+"\"";
            console.log("So far: ",final_display);
          }
        } else if (evt.keyCode == 83 && t.allow_key_press == true) {//if the participant presses the [S] key while such an action is permitted...
          x = document.getElementById('left_word').textContent;//get the current value of the left word, storing it as variable x
          if (k+1 < sentence_length && x == t.stim.words[k].form) { //if the value of the timer plus one is less than the stimulus sentence length (ie this word does not end the sentence) AND the participant has selected the correct continuation...
            if (x == t.name) {
              document.getElementById('trial_instructions').textContent="Great job! Now, press the button which corresponds to the word which continues the sentence beginning with \"Brittany\".";
              t.response_times.push(Date.now());//add the response time to the list
              k += 1; //increase the turn counter value by one
              t.maze_turn(k,t); //call the maze_turn function below
            } else {
            t.response_times.push(Date.now());//add the response time to the list
            k += 1; //increase the turn counter value by one
            t.maze_turn(k,t); //call the maze_turn function below
            }
          } else if (k+1 == sentence_length && x == t.stim.words[k].form) {//if the participant presses the final word in the sentence AND it is the correct word to continue the grammaticality, then...
            t.response_times.push(Date.now()); //record the time
            t.answer_keys = true;
            t.allow_key_press = false;
            t.exit_maze(k,t);//call the exit_maze function below
          } else { //if the participant presses the [S] key and it is an illegal contiuation of the sentence...
            $('.err').show(); //show the error message. Nothing else.
            $('#trial_instructions').hide();
            $('#right_word').addClass('highlighted');
            var display_sentence = [];
            for (var d = 0; d < k; d++) {
              var word = t.stim.words[d].form;
              display_sentence.push(word);
            }
            display_sentence.push(x);
            var final_display = display_sentence.join(' ')
            var current_key = "[S]";
            document.getElementById('wrong_key_input').textContent=current_key; //push the updated left word to the html
            document.getElementById('current_sentence').textContent="\""+final_display+"\"";
            console.log("So far: ",final_display);
          }
        } else if (evt.keyCode == 76 && t.answer_keys == true) {// if the participant presses [l], and we are at the comprehension question check stage (t.answer_keys == true), then...
            y = document.getElementById('No_Sample').textContent; //grab the value no and assign it to variable y
            t.response_correct = y == t.stim.question_answer; //evaluate the truth value of y == correct answer, and assign that to t.response_correct
            if (t.response_correct == 1) {//if the response is correct...
              $(document).unbind("keydown");//disallow key pressing
              t.log_responses();//log responses for this trial
              exp.go();//move to the next part of the experiment
            } else {//otherwise (if it's wrong)...
              document.getElementById('ex_question_correct').textContent="You've pressed the wrong answer! Try again, and be careful!";//update the message at the top of the page to tell them to try again.
            }
          } else if (evt.keyCode == 83 && t.answer_keys == true) {// if the participant presses [s], and we are at the comprehension question check stage (t.answer_keys == true), then...
            y = document.getElementById('Yes_Sample').textContent;//grab the value yes and assign it to variable y
            t.response_correct = y == t.stim.question_answer; //evaluate the truth value of y == correct answer, and assign that to t.response_correct
            if (t.response_correct == 1) {//if the response is correct...
              $(document).unbind("keydown");//disallow key pressing
              t.log_responses();//log responses for this trial
              exp.go();//move to the next part of the experiment
            } else {//otherwise (if it's wrong)...
              document.getElementById('ex_question_correct').textContent="You've pressed the wrong answer! Try again, and be careful!";//update the message at the top of the page to tell them to try again.
            }
      }});

      $("#attention-question-sample").text(question_check); //push the comprehension question to the html

      console.log('question',question_check)//log the question to be asked in this trial - debugging code
    },

//progresses the maze from one set of words to the next
maze_turn : function(k,t) {
  $('.err').hide(); //if there is an error currently being shown (only applicable in the example trial), hide it
  $('#trial_instructions').show();
  $('#right_word').removeClass('highlighted');
  $('#left_word').removeClass('highlighted');
  possible_pair = _.shuffle(["real", "distractor"]); //shuffle a 2 item list of real and distractor, in order to decide if the item goes on the right and the distractor on the left, or vice versa
  var left_word_status = possible_pair.pop(); //pop one of those two shuffled items
  var right_word_status = possible_pair.pop(); //pop the other!
  if (left_word_status == "real") { //if the left word has been designated as the real one...
    left_word = t.stim.words[k].form; //make the left word underlyingly the next word in the sentence (k)
    right_word = t.stim.words[k].distractor; //make the right word the corresponding distractor
  } else { //if the right word has been designated as the real one...
    left_word = t.stim.words[k].distractor; //make the left word the distractor
    right_word = t.stim.words[k].form; //make the right word the grammatical continuation
    };
  document.getElementById('left_word').textContent=left_word; //push the updated left word to the html
  document.getElementById('right_word').textContent=right_word; //push the updated right word to the html
  if (k != 1) {
    document.getElementById('trial_instructions').textContent="Great job! Keep going.";
  };
},

//initializes the first bit of the maze
start_maze : function(k,t) {
  document.getElementById('trial_instructions').textContent="Now click the key on your keyboard which correpsonds to the name \"Brittany\"."; //hide the spacebar instructions
  $("#left_word").show(); //show the word on the left
  $("#right_word").show(); //show the word on the right
  $("#l").show(); //show the key used to select the word on the left
  $("#s").show(); //show the key used to select the word on the right
},

//ends the current maze
exit_maze : function(k,t) {
  $('.err').hide(); //if there are any error messages currently displaying, hide them
  $('#trial_instructions').hide();
  $('.correct').show(); //show good job message section
  $('#ex_question_correct').show(); //show the good job message
  $("#comprehension-question-answers-sample").show();
  $("#attention-question-sample").show(); //show the comprehension question
  $("#left_word").hide();//hide the left word
  $("#right_word").hide();//hide the right word
  // $("#l").hide();//hide the right button indicator
  // $("#s").hide();//hide the left button indicator
  console.log("successful foo!"); //test code
  t.answer_keys = true;
  // $(document).unbind("keydown"); //stop allowing keylogging
},

log_responses : function() {//this logs everything, for each part of the sentence in question
for (var i = 0; i < this.stim.words.length; i++) {
var word = this.stim.words[i];
exp.data_trials.push({
  "trial_id": this.stim.id,
  "word_idx": i,
  "form": word.form,
  "region": word.region,
  "rt": this.response_times[i+1] - this.response_times[i],
  "condition": this.stim.condition,
  "lexeme": this.stim.lexeme,
  "response_correct": this.response_correct ? 1 : 0,
  "trial_no": trial_counter,
  "name": this.name
});
}
trial_counter++;
},
});


////////////////////////////////////////////example 2 slide///////////////////
slides.example2 = slide({
  name: "example2",
  start: function() {
    //sets stim for this iteration
    this.stim = exp.example_stim[0].condition[0].neutral_male[0];

    //sets our key press settings so that the participants can hit spacebar, but nothing else
    space_available = 0;
    allow_key_press = false;
    answer_keys = false;
    $(document).unbind("keydown");
    //select which condition you want for this item
    exp.selection == "neutral_male";

    //set the name for the item
    this.name = "Manuel";

    //initialize a trial-specific list of reading times
    this.response_times = [];

    //allows you to call this inside of functions
    var t = this;

    //set the number of presses in the current trial to 0
    var k = 0

    //get the length of the stimulus sentence, to be used later when determining when to stop
    var sentence_length = this.stim.words.length

    //set the intial words on the left and right sides, and assign them to the html
    var left_word = this.stim.words[k].form;
    var right_word = this.stim.words[k].distractor;
    $("#left_word2").html(left_word);
    $("#right_word2").html(right_word);

    //basically this hides everything on the page until such time as they are called by one of the lower maze functions
    $("#left_word2").hide();
    $("#right_word2").hide();
    $("#l2").hide();
    $("#s2").hide();
    $('.correct').hide();
    $('.err').hide();
    $('#ex_question_error2').hide();
    $("#attention-question-sample2").hide();
    $("#ex_question_correct2").hide();
    $("#comprehension-question-answers-sample2").hide();

    //set the attention check question and its answer
    var question_check = this.stim.question1; //set the attention check question
    this.stim.question_answer = this.stim.answer1; //set the attention check answer


    //This allows the webpage to use your keystrokes while .bind("keydown") is in effect, and allows us to execute different events depending on the particular key pressed
    $(document).bind("keydown",function(evt) {
      //if the participant presses the spacebar, and it is the first button pressed on the page (only true when space_available == 0), then start the timer and allow other key presses
      if (evt.keyCode == 32 && space_available == 0) {
        t.response_times.push(Date.now()); //start the timer
        t.allow_key_press = true; //allow the target keys [s] and [l] to be pressed
        t.space_available = 1; //disallow the pressing of the spacebar
        t.start_maze(t,k); //call the start_maze function below, and pass this and k values to it
      } else if (evt.keyCode == 76 && t.allow_key_press == true) { //if the participant presses the l key...
        space_available = 1; //disallow the pressing of the spacebar
        x = document.getElementById('right_word2').textContent; //store the current vale of the right word as variable x, to be used for comparison
        if (k+1 < sentence_length && x == t.stim.words[k].form) { //if the turn value plus one is less than the length of the stimulus sentence AND the current value of x is the same as the correct grammatical continuation (ie if the participant has pressed the right button)...
          t.response_times.push(Date.now()); // record this timestamp
          k += 1; //add 1 to the turn value counter
          t.maze_turn(k,t); //call the maze_turn function, below, and pass k and t to it
        } else if (k+1 == sentence_length && x == t.stim.words[k].form) { //otherwise, if k+1 (current turn value + 1) is equal to the length of the stimulus sentence, AND the current value of X is the correct continuation///
          t.response_times.push(Date.now());//add the time to the timer list
          t.answer_keys = true;
          t.allow_key_press = false;
          t.exit_maze(k,t); //call the exit_maze function below, passing it t and k
        } else {//otherwise, if they pressed l and it was an illegal continuation of the sentence...
          $('.err').show(); //display the error message
          $('#trial_instructions2').hide();
        }
      } else if (evt.keyCode == 83 && t.allow_key_press == true) {//if the participant presses the [S] key while such an action is permitted...
        x = document.getElementById('left_word2').textContent;//get the current value of the left word, storing it as variable x
        if (k+1 < sentence_length && x == t.stim.words[k].form) { //if the value of the timer plus one is less than the stimulus sentence length (ie this word does not end the sentence) AND the participant has selected the correct continuation...
          if (x == t.name) {
            document.getElementById('trial_instructions2').textContent="Great job! Now, press the button which corresponds to the word which grammatically continues the sentence beginning with \"Manuel\".";
            t.response_times.push(Date.now());//add the response time to the list
            k += 1; //increase the turn counter value by one
            t.maze_turn(k,t); //call the maze_turn function below
          } else {
          t.response_times.push(Date.now());//add the response time to the list
          k += 1; //increase the turn counter value by one
          t.maze_turn(k,t); //call the maze_turn function below
          }
        } else if (k+1 == sentence_length && x == t.stim.words[k].form) {//if the participant presses the final word in the sentence AND it is the correct word to continue the grammaticality, then...
          t.response_times.push(Date.now()); //record the time
          t.answer_keys = true;
          t.allow_key_press = false;
          t.exit_maze(k,t);//call the exit_maze function below
        } else { //if the participant presses the [S] key and it is an illegal contiuation of the sentence...
          $('.err').show(); //show the error message. Nothing else.
          $('#trial_instructions2').hide();
        }
      } else if (evt.keyCode == 76 && t.answer_keys == true) {// if the participant presses [l], and we are at the comprehension question check stage (t.answer_keys == true), then...
          y = document.getElementById('No_Sample2').textContent; //grab the value no and assign it to variable y
          t.response_correct = y == t.stim.question_answer; //evaluate the truth value of y == correct answer, and assign that to t.response_correct
          if (t.response_correct == 1) {//if the response is correct...
            $(document).unbind("keydown");//disallow key pressing
            t.log_responses();//log responses for this trial
            exp.go();//move to the next part of the experiment
          } else {//otherwise (if it's wrong)...
            document.getElementById('ex_question_correct2').textContent="You've pressed the wrong answer! Try again, and be careful!";//update the message at the top of the page to tell them to try again.
          }
        } else if (evt.keyCode == 83 && t.answer_keys == true) {// if the participant presses [s], and we are at the comprehension question check stage (t.answer_keys == true), then...
          y = document.getElementById('Yes_Sample2').textContent;//grab the value yes and assign it to variable y
          t.response_correct = y == t.stim.question_answer; //evaluate the truth value of y == correct answer, and assign that to t.response_correct
          if (t.response_correct == 1) {//if the response is correct...
            $(document).unbind("keydown");//disallow key pressing
            t.log_responses();//log responses for this trial
            exp.go();//move to the next part of the experiment
          } else {//otherwise (if it's wrong)...
            document.getElementById('ex_question_correct2').textContent="You've pressed the wrong answer! Try again, and be careful!";//update the message at the top of the page to tell them to try again.
          }
    }});

    $("#attention-question-sample2").text(question_check); //push the comprehension question to the html

    console.log('question',question_check)//log the question to be asked in this trial - debugging code
  },

//progresses the maze from one set of words to the next
maze_turn : function(k,t) {
$('.err').hide(); //if there is an error currently being shown (only applicable in the example trial), hide it
$('#trial_instructions2').hide();
possible_pair = _.shuffle(["real", "distractor"]); //shuffle a 2 item list of real and distractor, in order to decide if the item goes on the right and the distractor on the left, or vice versa
var left_word_status = possible_pair.pop(); //pop one of those two shuffled items
var right_word_status = possible_pair.pop(); //pop the other!
if (left_word_status == "real") { //if the left word has been designated as the real one...
  left_word = t.stim.words[k].form; //make the left word underlyingly the next word in the sentence (k)
  right_word = t.stim.words[k].distractor; //make the right word the corresponding distractor
} else { //if the right word has been designated as the real one...
  left_word = t.stim.words[k].distractor; //make the left word the distractor
  right_word = t.stim.words[k].form; //make the right word the grammatical continuation
  };
document.getElementById('left_word2').textContent=left_word; //push the updated left word to the html
document.getElementById('right_word2').textContent=right_word; //push the updated right word to the html
if (k != 1) {
  document.getElementById('trial_instructions2').textContent="Great job! Keep going.";
};
},

//initializes the first bit of the maze
start_maze : function(k,t) {
$("#trial_instructions2").hide(); //hide the spacebar instructions
$("#left_word2").show(); //show the word on the left
$("#right_word2").show(); //show the word on the right
$("#l2").show(); //show the key used to select the word on the left
$("#s2").show(); //show the key used to select the word on the right
},

//ends the current maze
exit_maze : function(k,t) {
$('.err').hide(); //if there are any error messages currently displaying, hide them
$('#trial_instructions2').hide();
$('.correct').show(); //show good job message section
$('#ex_question_correct2').show(); //show the good job message
$("#comprehension-question-answers-sample2").show();
$("#attention-question-sample2").show(); //show the comprehension question
$("#left_word2").hide();//hide the left word
$("#right_word2").hide();//hide the right word
// $("#l").hide();//hide the right button indicator
// $("#s").hide();//hide the left button indicator
console.log("successful foo!"); //test code
t.answer_keys = true;
// $(document).unbind("keydown"); //stop allowing keylogging
},

log_responses : function() {//this logs everything, for each part of the sentence in question
for (var i = 0; i < this.stim.words.length; i++) {
var word = this.stim.words[i];
exp.data_trials.push({
"trial_id": this.stim.id,
"word_idx": i,
"form": word.form,
"region": word.region,
"rt": this.response_times[i+1] - this.response_times[i],
"condition": this.stim.condition,
"lexeme": this.stim.lexeme,
"response_correct": this.response_correct ? 1 : 0,
"trial_no": trial_counter,
"name": this.name
});
}
trial_counter++;
},
});

//////////////////////////////////////////////////Pre-main trial slide//////////
  slides.almost = slide({
    name : "almost",
    start : function() {
      $(document).unbind("keydown");
      $(document).bind("keydown",function(evt) {
        if (evt.keyCode == 32) {
          $(document).unbind("keydown");
          exp.go();
        }
      }); //use exp.go() if and only if there is no "present" data.
    }
  })

/////////////////////////////////////////////////Main trial slide///////////////
  slides.trial = slide({
    name: "trial",
    present: exp.stimuli,
    present_handle: function(stim) {
      $(document).unbind("keydown"); //unbdind
      this.stim = stim;
      exp.selection = exp.gender.pop();
      this.space_available = 0;
      this.allow_key_press = false;
      this.answer_keys = false;

      console.log('this.stim.condition',this.stim);

      console.log('post-k:',exp.k);

      // This is going to randomize the condition that we get (gender and congruence), which are defined in an array way down at the bottom of the code
      if (exp.selection == "neutral_male") {
        this.stim =stim.condition[0].neutral_male[0];
        this.name = exp.male_names.pop();
      } else if (exp.selection == "congruent_female") {
        this.stim = stim.condition[0].congruent_female[0];
        this.name = exp.female_names.pop();
      } else if (exp.selection == "congruent_male") {
        this.stim = stim.condition[0].congruent_male[0];
        this.name = exp.male_names.pop();
      } else {
        this.stim = stim.condition[0].neutral_female[0];
        this.name = exp.female_names.pop();
      }

      //hide the various parts of the slide
      $("#comprehension-question-answers").hide();
      $('#attention-question').hide();
      $("#new_left_word").hide();
      $("#new_right_word").hide();
      $("#new_l").hide();
      $("#new_s").hide();
      $('#new_correct').hide();
      $('#new_err').hide();

      this.response_times = [];

      var t = this;

      exp.k = 0

      var sentence_length = this.stim.words.length

      possible_pair = _.shuffle(["real", "distractor"]);
      var left_word_status = possible_pair.pop();
      var right_word_status = possible_pair.pop();
      if (left_word_status == "real") {
        left_word = t.name;
        right_word = t.stim.words[exp.k].distractor;
      } else {
        left_word = t.stim.words[exp.k].distractor;
        right_word = t.name;
        };

      $("#new_left_word").html(left_word);
      $("#new_right_word").html(right_word);


      $("#new_trial_instructions").show();

      $(document).bind("keydown",function(evt) {
        if (evt.keyCode == 32 && t.space_available == 0) {
          t.response_times.push(Date.now());
          t.space_available = 1;
          t.allow_key_press = true;
          t.start_maze(exp.k,t)
        } else if (evt.keyCode == 76 && t.allow_key_press == true) {
          // t.response_times.push(Date.now());
          t.space_available = 1;
          x = document.getElementById('new_right_word').textContent;
          if (exp.k+1 < sentence_length && x == t.stim.words[exp.k].form || exp.k+1 < sentence_length && x == t.name) {
            t.response_times.push(Date.now());
            exp.k += 1;
            t.maze_turn(exp.k,t);
          } else if (exp.k+1 == sentence_length && x == t.stim.words[exp.k].form) {
            t.response_times.push(Date.now());
            t.answer_keys = true;
            t.allow_key_press = false;
            t.exit_maze(exp.k,t)
          } else {
            $('#new_err').show();
            t.space_available = 2;
            t.allow_key_press = false;
        }
        } else if (evt.keyCode == 83 && t.allow_key_press == true) {
          // t.response_times.push(Date.now());
          x = document.getElementById('new_left_word').textContent;
          if (exp.k+1 < sentence_length && x == t.stim.words[exp.k].form || exp.k+1 < sentence_length && x == t.name) {
            t.response_times.push(Date.now());
            exp.k += 1;
            t.maze_turn(exp.k,t);
          } else if (exp.k+1 == sentence_length && x == t.stim.words[exp.k].form) {
            t.response_times.push(Date.now());
            t.answer_keys = true;
            t.allow_key_press = false;
            t.exit_maze(exp.k,t)
          } else {
            $('#new_err').show();
            t.space_available = 2;
            t.allow_key_press = false;
          }
        } else if (evt.keyCode == 76 && t.answer_keys == true) {// if the participant presses [l], and we are at the comprehension question check stage (t.answer_keys == true), then...
          y = document.getElementById('new_No').textContent; //grab the value no and assign it to variable y
          console.log('y_val',y);
          t.move_along(y);
        } else if (evt.keyCode == 83 && t.answer_keys == true) {// if the participant presses [s], and we are at the comprehension question check stage (t.answer_keys == true), then...
          y = document.getElementById('new_Yes').textContent;//grab the value yes and assign it to variable y
          console.log('y_val',y);
          t.move_along(y);
        } else if (evt.keyCode == 32 && t.space_available == 2) {
          y = "none";
          t.move_along(y);
        }
    });

    // This should be randomized, not always this.stim.question2! This was the error in my code on the first pass.
      // var question_check = this.stim.question2;
      // this.stim.question_answer = this.stim.answer2;
      //
      // var individual_question = question_check.replace("NAME",t.name);
      //
      // $("#attention-question").text(individual_question);
      //
      // console.log('question',individual_question)

    //Randomly selects one of the comprehension questions, and substitutes in the correct name

      var question_check = _.shuffle([this.stim.question1, this.stim.question2]).pop()

      if (question_check == this.stim.question1) {
        this.stim.question_answer = this.stim.answer1;
      } else {
        this.stim.question_answer = this.stim.answer2;
      }

      var name = this.name;

      var individual_question = question_check.replace("NAME",name);

      $("#attention-question").text(individual_question);

      console.log('question',individual_question);
    },

    //progresses the maze from one set of words to the next
    maze_turn : function(k,t) {
      $('.err').hide(); //if there is an error currently being shown (only applicable in the example trial), hide it
      possible_pair = _.shuffle(["real", "distractor"]); //shuffle a 2 item list of real and distractor, in order to decide if the item goes on the right and the distractor on the left, or vice versa
      var left_word_status = possible_pair.pop(); //pop one of those two shuffled items
      var right_word_status = possible_pair.pop(); //pop the other!
      if (left_word_status == "real") { //if the left word has been designated as the real one...
        left_word = t.stim.words[k].form; //make the left word underlyingly the next word in the sentence (k)
        right_word = t.stim.words[k].distractor; //make the right word the corresponding distractor
      } else { //if the right word has been designated as the real one...
        left_word = t.stim.words[k].distractor; //make the left word the distractor
        right_word = t.stim.words[k].form; //make the right word the grammatical continuation
        };
      document.getElementById('new_left_word').textContent=left_word; //push the updated left word to the html
      document.getElementById('new_right_word').textContent=right_word; //push the updated right word to the html
    },

    //initializes the first bit of the maze
    start_maze : function(k,t) {
      $("#new_trial_instructions").hide(); //hide the spacebar instructions
      $("#new_left_word").show(); //show the word on the left
      $("#new_right_word").show(); //show the word on the right
      $("#new_l").show(); //show the key used to select the word on the left
      $("#new_s").show(); //show the key used to select the word on the right
    },

    //ends the current maze
    exit_maze : function(k,t) {
      $('#new_err').hide(); //if there are any error messages currently displaying, hide them
      $('#new_correct').show(); //show good job message section
      $("#attention-question").show();
      $('#comprehension-question-answers').show();
      $("#attention-question-table").show(); //show the comprehension question
      $("#new_left_word").hide();//hide the left word
      $("#new_right_word").hide();//hide the right word
      // $("#l").hide();//hide the right button indicator
      // $("#s").hide();//hide the left button indicator
      console.log("successful foo!"); //test code
      t.answer_keys = true;
      // $(document).unbind("keydown"); //stop allowing keylogging
    },

log_responses : function() {
for (var i = 0; i < this.stim.words.length; i++) {
var word = this.stim.words[i];
exp.data_trials.push({
  "trial_id": this.stim.id,
  "word_idx": i,
  "form": word.form,
  "region": word.region,
  "rt": this.response_times[i+1] - this.response_times[i],
  "condition": this.stim.condition,
  "lexeme": this.stim.lexeme,
  "response_correct": this.response_correct ? 1 : 0,
  "trial_no": trial_counter,
  "name": this.name
});
}
trial_counter++;
},

    move_along : function(y) {
      this.response_correct = y == this.stim.question_answer;
      this.log_responses();
      $(document).unbind("keydown");
      _stream.apply(this);
    },

    });


  slides.gender_quiz = slide({
    name : "gender_quiz",
    q1thumbVisible : function() {
      if ($("#gender_q1").val() != 50); {
        $('#gender_q1').addClass('visibleslider')
      };
    },
    q2thumbVisible : function() {
      if ($("#gender_q2").val() != 50); {
        $('#gender_q2').addClass('visibleslider')
      };
    },
    q3thumbVisible : function() {
      if ($("#gender_q3").val() != 50); {
        $('#gender_q3').addClass('visibleslider')
      };
    },
    q4thumbVisible : function() {
      if ($("#gender_q4").val() != 50); {
        $('#gender_q4').addClass('visibleslider')
      };
    },
    q5thumbVisible : function() {
      if ($("#gender_q5").val() != 50); {
        $('#gender_q5').addClass('visibleslider')
      };
    },
    collect_gender : function() {
      let q1_status = document.getElementById('gender_q1');
      let q2_status = document.getElementById('gender_q2');
      let q3_status = document.getElementById('gender_q3');
      let q4_status = document.getElementById('gender_q4');
      let q5_status = document.getElementById('gender_q5');
      if (q1_status.className != 'slider visibleslider' || q2_status.className != 'slider visibleslider' || q3_status.className != 'slider visibleslider' || q4_status.className != 'slider visibleslider' || q5_status.className != 'slider visibleslider') {
        let ef = document.getElementById('quiz_err_1');
        $('#quiz_err_1').addClass("visibleerr");
      } else {
          exp.gender_transendence = [{
            gender_q1 : $("#gender_q1").val(),
            gender_q2 : $("#gender_q2").val(),
            gender_q3 : $("#gender_q3").val(),
            gender_q4 : $("#gender_q4").val(),
            gender_q5 : $("#gender_q5").val(),
          }];
          exp.go();
        }
      }
  });

  slides.gender_quiz_two = slide({
    name : "gender_quiz_two",
    q6thumbVisible : function() {
      if ($("#gender_q6").val() != 50); {
        $('#gender_q6').addClass('visibleslider')
      };
    },
    q7thumbVisible : function() {
      if ($("#gender_q7").val() != 50); {
        $('#gender_q7').addClass('visibleslider')
      };
    },
    q8thumbVisible : function() {
      if ($("#gender_q8").val() != 50); {
        $('#gender_q8').addClass('visibleslider')
      };
    },
    q9thumbVisible : function() {
      if ($("#gender_q9").val() != 50); {
        $('#gender_q9').addClass('visibleslider')
      };
    },
    q10thumbVisible : function() {
      if ($("#gender_q10").val() != 50); {
        $('#gender_q10').addClass('visibleslider')
      };
    },
    q11thumbVisible : function() {
      if ($("#gender_q11").val() != 50); {
        $('#gender_q11').addClass('visibleslider')
      };
    },
    q12thumbVisible : function() {
      if ($("#gender_q12").val() != 50); {
        $('#gender_q12').addClass('visibleslider')
      };
    },
    q13thumbVisible : function() {
      if ($("#gender_q13").val() != 50); {
        $('#gender_q13').addClass('visibleslider')
      };
    },
    collect_gender_two : function() {
      let q6_status = document.getElementById('gender_q6');
      let q7_status = document.getElementById('gender_q7');
      let q8_status = document.getElementById('gender_q8');
      let q9_status = document.getElementById('gender_q9');
      let q10_status = document.getElementById('gender_q10');
      let q11_status = document.getElementById('gender_q11');
      let q12_status = document.getElementById('gender_q2');
      let q13_status = document.getElementById('gender_q13');
      if (q6_status.className != 'slider visibleslider' || q7_status.className != 'slider visibleslider' || q8_status.className != 'slider visibleslider' || q9_status.className != 'slider visibleslider' || q10_status.className != 'slider visibleslider' || q11_status.className != 'slider visibleslider' || q12_status.className != 'slider visibleslider' || q13_status.className != 'slider visibleslider') {
        let efg = document.getElementById('quiz_err_2');
        $('#quiz_err_2').addClass("visibleerr");
      } else {
            exp.go();
          };
      }
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        gender : $('#gender').val(),
        // tirednesslvl : $('#tirednesslvl').val(),
        age : $("#age").val(),
        enjoyment : $("#enjoyment").val(),
        education : $("#education").val(),
        party_alignment : $("input[name='number']:checked").val(),
        price : $("#fairprice").val(),
        asses: $('input[name="assess"]:checked').val(),
        comments: $("#comments").val(),
        gender_q1 : $("#gender_q1").val(),
        gender_q2 : $("#gender_q2").val(),
        gender_q3 : $("#gender_q3").val(),
        gender_q4 : $("#gender_q4").val(),
        gender_q5 : $("#gender_q5").val(),
        gender_q6 : $("#gender_q6").val(),
        gender_q7 : $("#gender_q7").val(),
        gender_q8 : $("#gender_q8").val(),
        gender_q9 : $("#gender_q9").val(),
        gender_q10 : $("#gender_q10").val(),
        gender_q11 : $("#gender_q11").val(),
        gender_q12 : $("#gender_q12").val(),
        gender_q13 : $("#gender_q13").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "system" : exp.system,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {proliferate.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {
  exp.trials = [];
  exp.catch_trials = [];
  var stimuli = all_stims;
  exp.stimuli = _.shuffle(stimuli);//can randomize between subject conditions here
  var example_stim = example_stims;
  exp.example_stim = example_stim;
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["i0",  "instructions", 'example', 'example2', 'almost', "trial", 'gender_quiz', 'gender_quiz_two', 'subj_info', 'thanks'];

  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  exp.gender = _.shuffle(['congruent_male','congruent_male','congruent_male','congruent_male','congruent_male','neutral_male','neutral_male','neutral_male','neutral_male','neutral_male','congruent_female','congruent_female','congruent_female','congruent_female','congruent_female','neutral_female','neutral_female','neutral_female','neutral_female','neutral_female']);

  exp.male_names = _.shuffle(["Michael","Jacob","Matthew","Joshua","Christopher","Nicholas", "Andrew", "Austin","Joseph","David","William","John"])

  exp.female_names = _.shuffle(["Emily", "Hannah", "Samantha", "Sarah", "Jessica", "Madison", "Elizabeth", "Alyssa", "Kalya","Megan","Lauren","Rachel"])

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  $(".response-buttons, .test-response-buttons").click(function() {
    _s.button($(this).val());
  });

  exp.go(); //show first slide
}
