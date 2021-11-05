const toxicity = require('@tensorflow-models/toxicity');

module.exports = class Toxicity {
  model;

  static async getModel() {
    if (!this.model) {
      this.model = await toxicity.load(0.9);
    }
    return this.model;
  }

  static async isToxic(text) {
    const model = await this.getModel();
    const predictions = await model.classify(text);
    let isToxic = false;
    predictions.forEach(pred => {
      if(pred.label === 'toxicity' && pred.results[0]?.match)
        isToxic = true;
    });
    return isToxic;
  }
};
