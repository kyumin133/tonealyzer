import React from "react";

const CATEGORIES = ["emotion_tone", "writing_tone", "social_tone"];
const CATEGORY_NAMES = ["Emotion", "Writing Style", "Social Tendencies"];

const TONES = [
                "anger", "disgust", "fear", "joy", "sadness",
                "analytical", "confident", "tentative",
                "openness_big5", "conscientiousness_big5", "extraversion_big5", "agreeableness_big5", "neuroticism_big5"
              ];
const TONE_NAMES =  [
                      "Anger", "Disgust", "Fear", "Joy", "Sadness",
                      "Analytical", "Confident", "Tentative",
                      "Openness", "Conscientiousness", "Extraversion", "Agreeableness", "Emotional Range"
                    ];


const COLORS = {
  anger: [178, 34, 34],
  disgust: [0, 100, 0],
  fear: [148, 0, 211],
  joy: [255, 215, 0],
  sadness: [70, 130, 180],
  analytical: [0, 0, 139],
  confident: [220, 20, 60],
  tentative: [184, 134, 11],
  openness_big5: [0, 128, 128],
  conscientiousness_big5: [128, 0, 0],
  extraversion_big5: [75, 0, 130],
  agreeableness_big5: [0, 128, 0],
  neuroticism_big5: [210, 105, 30]
};

class SentenceResults extends React.Component {
  constructor(props) {
    super(props);

    this.initializeState(props);

    this.updateBlurb(props.blurb);
    this.handleToneClick = this.handleToneClick.bind(this);
    this.handleCategoryClick = this.handleCategoryClick.bind(this);


    this.showHover = this.showHover.bind(this);
    this.hideHover = this.hideHover.bind(this);
  }

  handleToneClick(tone) {
    let selectedTones = this.state.selectedTones;
    selectedTones[tone] = !selectedTones[tone];

    // this.updateBlurb(this.props.blurb)
    this.setState({
      selectedTones
    });
  }

  handleCategoryClick(category) {
    let selectedCategories = this.state.selectedCategories;
    // selectedCategories[category] = true;
    for (let i = 0; i < CATEGORIES.length; i++) {
      selectedCategories[CATEGORIES[i]] = (CATEGORIES[i] === category);
    }

    let start = 0;
    let end = 4;

    if (category === "writing_tone") {
      start = 5;
      end = 7;
    } else if (category === "social_tone") {
      start = 8;
      end = 12;
    }

    let selectedTones = this.state.selectedTones;
    for (let i = 0; i <= TONES.length; i++) {
      if ((i >= start) && (i <= end)) {
        selectedTones[TONES[i]] = true;
      } else {
        selectedTones[TONES[i]] = false;
      }
    }

    this.setState({
      selectedCategories,
      selectedTones
    });
  }

  initializeState(props) {
    let selectedCategories = {};
    for (let i = 0; i < CATEGORIES.length; i++) {
      selectedCategories[CATEGORIES[i]] = (i === 0);
    }

    let selectedTones = {};
    for (let i = 0; i < TONES.length; i++) {
      selectedTones[TONES[i]] = (i < 5);
    }

    this.state = {
      showHover: false,
      selectedCategories,
      selectedTones
    };
  }

  showHover(e, idx) {
    let category;
    let categoryIndex;
    for (let i = 0; i < CATEGORIES.length; i++) {
      if (this.state.selectedCategories[CATEGORIES[i]]) {
        category = CATEGORIES[i];
        categoryIndex = i;
        break;
      }
    }

    let analysis = this.state.analyses[categoryIndex];
    let start = 0;
    let end = 4;

    if (categoryIndex === 1) {
      start = 5;
      end = 7;
    } else if (categoryIndex === 2) {
      start = 8;
      end = 12;
    }

    let hoverArr = [];

    for (let i = start; i <= end; i++) {
      hoverArr.push(<li key={i} className="hover-tone-li"><span className="hover-tone-name">{TONE_NAMES[i]}:</span><span className="hover-tone-score">{Math.round(1000 * analysis[idx][i - start].score) / 1000}</span></li>)
    }

    let bodyOffset = $(".sentence-results").offset();
    let left = e.clientX - bodyOffset.left;
    let top = e.clientY - bodyOffset.top + 30;

    if (top > 300) {
      top -= 210;
    }
    if (left > 850) {
      left -= 200;
    }
    let hover = <div className="sentence-hover" style={{left, top}}><ul className="hover-tone-ul">{hoverArr}</ul></div>;

    this.setState({
      showHover: true,
      hoverSentence: idx,
      hover
    })
  }

  hideHover(e) {
    this.setState({
      showHover: false
    })
  }

  componentWillUpdate() {
  }

  componentWillReceiveProps(newProps) {
    this.updateBlurb(newProps.blurb);
  }

  updateBlurb(newBlurb) {
    let bodyRaw = newBlurb.body.split("\\n");

    let body = [];

    for (let i = 0; i < bodyRaw.length; i++) {
      if (bodyRaw[i].length === 0) {
        continue;
      }
      body.push(bodyRaw[i]);
    }

    let lineBreak = [];

    let sentences = newBlurb.analysis.sentences_tone;
    let blurb = [];

    let bodyIndex = 0;
    let analyses = [[], [], []];

    for (let i = 0; i < sentences.length; i++) {
      let sentence = sentences[i];
      blurb.push(sentence.text);

      for (let j = 0; j < analyses.length; j++) {
        let category = sentence.tone_categories[j];
        let tones = category.tones;
        analyses[j].push(tones);
      }

      body[bodyIndex] = body[bodyIndex].replace(sentence.text, "");
      body[bodyIndex] = body[bodyIndex].replace(/^\s+/, "");

      if (body[bodyIndex] === "") {
        lineBreak.push(true);
        bodyIndex++;
      } else {
        lineBreak.push(false);
      }
    }

    if (!this.state.blurb) {
      this.state.blurb = blurb;
      this.state.analyses = analyses;
      this.state.lineBreak = lineBreak;

    } else {
      this.setState({
        blurb,
        analyses,
        lineBreak
      });
    }


  }

  getColor(index) {
    let highestScore = 0;
    let highestTone = "";

    for (let i = 0; i < TONES.length; i++) {
      if (!this.state.selectedTones[TONES[i]]) {
        continue;
      }

      let toneIndex = i;
      let catIndex = 0;

      if ((5 <= toneIndex) && (toneIndex < 8)) {
        toneIndex -= 5;
        catIndex = 1;
      } else if ((8 <= toneIndex) && (toneIndex < 13)) {
        toneIndex -= 8;
        catIndex = 2;
      }

      let score = this.state.analyses[catIndex][index][toneIndex]["score"];
      if ((score > highestScore) && (score >= 0.5)) {
        highestScore = score;
        highestTone = TONES[i];
      }
    }


    if ((highestTone === "") || (!this.state.selectedTones[highestTone])) {
      return "rgba(255, 255, 255, 0)";
    }

    return `rgba(${100 + COLORS[highestTone][0]}, ${100 + COLORS[highestTone][1]}, ${100 + COLORS[highestTone][2]}, ${highestScore})`;
  }

  render() {
    if (!this.state.blurb) {
      return null;
    }


    let categoriesArr = [];
    for (let i = 0; i < CATEGORIES.length; i++) {
      let category = CATEGORIES[i];
      if (this.state.selectedCategories[category]) {
        let tonesArr = [];
        let start, end;

        if (i === 0) {
          start = 0;
          end = 4;
        } else if (i === 1) {
          start = 5;
          end = 7;
        } else {
          start = 8;
          end = 12;
        }

        for (let j = start; j <= end; j++) {
          let tone = TONES[j];

          if (this.state.selectedTones[tone]) {
            let colors = COLORS[tone];
            tonesArr.push(<li onClick={() => {this.handleToneClick(tone)}} style={{backgroundColor: `rgb(${100 + colors[0]}, ${100 + colors[1]}, ${100 + colors[2]})`}} key={j}>{TONE_NAMES[j]}</li>)
          } else {
            tonesArr.push(<li onClick={() => {this.handleToneClick(tone)}} className="unselected-tone" key={j}>{TONE_NAMES[j]}</li>)
          }

        }
        categoriesArr.push(<li className="selected-category" key={i}><span onClick={() => {this.handleCategoryClick(category)}} >{CATEGORY_NAMES[i]}</span><ul>{tonesArr}</ul></li>)
      } else {
        categoriesArr.push(<li className="unselected-category" key={i}><span onClick={() => {this.handleCategoryClick(category)}}>{CATEGORY_NAMES[i]}</span></li>)
      }
    }
    let categories = <ul>{categoriesArr}</ul>;

    let hover = null;
    if (this.state.showHover) {
      hover =   this.state.hover;
    }

    let blurb = [];
    for (let i = 0; i < this.state.blurb.length; i++) {
      let backgroundColor = this.getColor(i);

      let style = { backgroundColor };
      let className = "sentence";
      if ((this.state.showHover) && (i === this.state.hoverSentence) && (backgroundColor === "rgba(255, 255, 255, 0)")) {
        console.log("hi!");
        className = "highlight";
        style = {};
      }

      if (this.state.lineBreak[i]) {
        blurb.push(<span className={className} onMouseOver={(e) => (this.showHover(e, i))} onMouseLeave={this.hideHover} key={i} style={style}>{this.state.blurb[i]}<br></br><br></br></span>);
      } else {
        blurb.push(<span className={className} onMouseOver={(e) => (this.showHover(e, i))} onMouseLeave={this.hideHover} key={i} style={style}>{this.state.blurb[i]}</span>);
        blurb.push(<span key={100 + i}> </span>)
      }
    }

    return <div className="dashboard-page">
      <div className="sentence-results">
        <div className="sentence-categories">{categories}</div>
        <div className="text-body">{blurb}</div>
        {hover}
      </div>
    </div>;
  }
}

export default SentenceResults;
