import React from "react";

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
  agreeableness_big5: [0, 0, 128],
  neuroticism_big5: [210, 105, 30]
};

class SentenceResults extends React.Component {
  constructor(props) {
    super(props);
    this.showHover = this.showHover.bind(this);
    this.updateBlurb(props.blurb);

  }

  showHover(e) {
    // console.log(this.state.analyses[0][$(e.currentTarget).index()]);
  }

  componentWillReceiveProps(newProps) {
    this.updateBlurb(newProps.blurb);
  }

  updateBlurb(newBlurb) {
    let i = -1;

    let bodyRaw = newBlurb.body.split("\\n");

    let body = [];
    for (let i = 0; i < bodyRaw.length; i++) {
      if (bodyRaw[i].length === 0) {
        continue;
      }
      body.push(bodyRaw[i]);
    }

    let sentences = newBlurb.analysis.sentences_tone;
    let blurb = [];

    let bodyIndex = 0;
    let analyses = [[], [], []];

    for (let i = 0; i < sentences.length; i++) {
      let sentence = sentences[i];

      let highestScore = 0;
      let highestCategory = "emotion_tone";

      for (let j = 0; j < analyses.length; j++) {
        let category = sentence.tone_categories[j];
        let tones = category.tones;

        for (let k = 0; k < tones.length; k++) {
          let score = tones[k].score;
          if (score > highestScore) {
            highestScore = score;
            highestCategory = tones[k].tone_id;
          }
        }
        analyses[j].push(tones);
      }


      body[bodyIndex] = body[bodyIndex].replace(sentence.text, "");
      body[bodyIndex] = body[bodyIndex].replace(/^\s+/, "");
      console.log(highestScore);
      let color;
      if (highestScore >= 0.5) {
        color = `rgba(${100 + COLORS[highestCategory][0]}, ${100 + COLORS[highestCategory][1]}, ${100 + COLORS[highestCategory][2]}, ${highestScore * 0.5})`
      } else {
        color = "none";
      }


      if (body[bodyIndex] === "") {
        bodyIndex++;
        blurb.push(<span style={{backgroundColor: color}} onClick={this.showHover} key={i}>{sentence.text}<br/><br/></span>);
      } else {
        blurb.push(<span style={{backgroundColor: color}} onClick={this.showHover} key={i}>{sentence.text + " "}</span>);
      }
    }

    this.state = {
      blurb,
      analyses
    };
  }
  render() {
    return <div className="dashboard-page">
      <div className="text-body">{this.state.blurb}</div>
    </div>;
  }
}

export default SentenceResults;
