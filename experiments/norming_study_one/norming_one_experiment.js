<!DOCTYPE html>
<html>
  <head>
    <title>
      Language Experiment
    </title><!--JS-->
    <!-- external general utilities -->
    <script src="shared/js/jquery-1.11.1.min.js"></script>
    <script src="shared/full-projects/jquery-ui/jquery-ui.min.js"></script>
    <script src="shared/js/underscore-min.js"></script>

    <!-- experiment logic -->
    <script src="shared/js/exp-V2.js"></script>
    <script src="shared/js/stream-V2.js"></script>

    <!-- utilities to submit data to proliferate -->
    <script src="https://proliferate.alps.science/static/js/proliferate.js"></script>

    <!-- general utilities -->
    <script src="shared/js/browserCheck.js"></script>
    <script src="shared/js/utils.js"></script>
    <link href="shared/full-projects/jquery-ui/jquery-ui.min.css" rel="stylesheet" type="text/css">
    <link href="shared/css/cocolab-style.css" rel="stylesheet" type="text/css">
    <link href="css/local-style.css" rel="stylesheet" type="text/css">

    <!-- experiment file -->
    <script src="js/experiment.js"></script>

    <!-- stimulus file -->
    <script src="js/stimuli.js"></script>
  </head>

  <body onload="init()">
    <noscript>This task requires JavaScript.</noscript>

    <!-- initial slide -->
    <div class="slide" id="i0">
      <p class="left">
        You will read some sentences. <strong>Your task is to answer a question about the sentence to the best of your ability.</strong><br>
        <br>
        The experiment will take approximately 10 minutes. Let's start with an example!
      </p><button id="start_button" type="button">Start experiment</button>
      <p class="left legal">
        <strong><br>
        <br>
        <br>
        LEGAL INFORMATION</strong>:<br>
        <br>
        IF APPLICABLE, MAKE SURE TO INCLUDE YOUR IRB CONSENT FORM HERE.
      </p>
    </div>

    <!-- first example slide -->
    <div class="slide" id="example1">
      <h3>
        Example 1
      </h3>
      <p class="title_frame">
        Someone is a teacher.
      </p>
      <div class="gender_question">
        <i>How likely is it that the person in question is a man or woman?</i>
      </div>
      <table class="likertscale">
        <tr>
          <td>
            very likely a man
          </td>
          <td>
            <input type="radio" name="number" value="1">
          </td>
          <td>
            <input type="radio" name="number" value="2">
          </td>
          <td>
            <input type="radio" name="number" value="3">
          </td>
          <td>
            <input type="radio" name="number" value="4">
          </td>
          <td>
            <input type="radio" name="number" value="5">
          </td>
          <td>
            <input type="radio" name="number" value="6">
          </td>
          <td>
            <input type="radio" name="number" value="7">
          </td>
          <td>
            very likely a woman
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            1
          </td>
          <td>
            2
          </td>
          <td>
            3
          </td>
          <td>
            4
          </td>
          <td>
            5
          </td>
          <td>
            6
          </td>
          <td>
            7
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class='unsure'>
            unsure
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table><br>
      <br>
      <div class="center">
        <button class="continueButton" onclick="_s.button()">Continue</button>
      </div>
      <div class="err">
        <p>
          Please make sure to select a value before continuing!
        </p>
      </div>
    </div>

    <!-- main instructions slide -->
    <div class="slide" id="startExp">
      <br>
      <br>
      <p id="instruct-text" class="left">
        Great! Now we can start the real experiment. You will now read 38 sentences. Your task is to rate how likely the individual in question is to be a woman or man. If you think they are equally likely to be of either gender, or some other non-binary gender, you can select the middle option.
      </p>
      <div class="center">
        <button class="continueButton" onclick="_s.button()">Continue</button>
      </div>
    </div>

    <!-- trial slide -->
    <div class="slide" id="trial">

      <!-- placeholders for stimuli -->
      <p class="title_frame" id="trial-title_frame">
        {{title_frame}}
      </p>
      <div class="gender_question">
        <i>How likely is it that the person in question is a man or woman?</i>
      </div>
      <table class="likertscale">
        <tr>
          <td>
            <p>
            very likely a man
            </p>
          </td>
          <td>
            <input type="radio" name="number" value="1">
          </td>
          <td>
            <input type="radio" name="number" value="2">
          </td>
          <td>
            <input type="radio" name="number" value="3">
          </td>
          <td>
            <input type="radio" name="number" value="4">
          </td>
          <td>
            <input type="radio" name="number" value="5">
          </td>
          <td>
            <input type="radio" name="number" value="6">
          </td>
          <td>
            <input type="radio" name="number" value="7">
          </td>
          <td>
            very likely a woman
          </td>
        </tr>
        <tr>
          <td></td>
          <td>
            1
          </td>
          <td>
            2
          </td>
          <td>
            3
          </td>
          <td>
            4
          </td>
          <td>
            5
          </td>
          <td>
            6
          </td>
          <td>
            7
          </td>
          <td></td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td class='unsure'>
            unsure
          </td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table><br>
      <div class="center">
        <button class="continueButton" onclick="_s.button()">Continue</button>
      </div>
      <div class="err">
        <br>
        <p>
          Make sure you select an answer before clicking 'Continue'.
        </p>
      </div>
    </div>

    <!-- subject information slide -->
    <div class="slide" id="subj_info">
      <div class="long_form">
        <div class="subj_info_title">
          Additional information
        </div>
        <p class="info">
          Answering these questions is optional, but will help us understand your answers.
        </p>
        <p>
          Did you read the instructions and do you think you did the HIT correctly?
        </p><label><input type="radio" name="assess" value="No">No</label> <label><input type="radio" name="assess" value="Yes">Yes</label> <label><input type="radio" name="assess" value="Confused">I was confused</label>
        <p>
          Gender: <select id="gender">
            <option value="">
            </option>
            <option value="Male">
              male
            </option>
            <option value="Female">
              female
            </option>
            <option value="Other">
              other
            </option>
          </select>
        </p>
        <p>
          Age: <input type="text" id="age">
        </p>
        <p>
          Level of education: <select id="education">
            <option value="-1">
            </option>
            <option value="0">
              Some high school
            </option>
            <option value="1">
              Graduated high school
            </option>
            <option value="2">
              Some college
            </option>
            <option value="3">
              Graduated college
            </option>
            <option value="4">
              Hold a higher degree
            </option>
          </select>
        </p>
        <p>
          Native language: <input type="text" id="language">
        </p><label>(the language(s) spoken at home when you were a child)</label>
        <p>
          Do you think the payment was fair?
        </p><select id="fairprice">
          <option value="-1">
          </option>
          <option value="0">
            The payment was too low
          </option>
          <option value="1">
            The payment was fair
          </option>
        </select>
        <p>
          Did you enjoy the experiment?
        </p><select id="enjoyment">
          <option value="-1">
          </option>
          <option value="0">
            Worse than the average experiment
          </option>
          <option value="1">
            An average experiment
          </option>
          <option value="2">
            Better than average experiment
          </option>
        </select>
        <p>
          We would be interested in any comments you have about this experiment. Please type them here:
        </p>
        <textarea id="comments" rows="3" cols="50"></textarea><br>
        <button onclick="_s.submit()">Submit</button>
      </div>
    </div>

    <!-- final slide -->
    <div id="thanks" class="slide js">
      <p class="subj_info_title">
        Thank you!
      </p>
      <p class="info">
        Your participation helps scholars of linguistics investigate the peculiarities of language.
      </p>
      <p class="info">
        We would also like to take a minute to acknowledge takes a simplified view of gender, which does not reflect the researchers' own conceptualizations of gender. It is our hope that this work will help to inform discussion around the use of non-binary and gender-neutral language in the long run.
    </div>

    <!-- progress bar -->
    <div class="progress">
      <span>Progress:</span>
      <div class="bar-wrapper">
        <div class="bar" style="width: 0%"></div>
      </div>
    </div>
  </body>
</html>
