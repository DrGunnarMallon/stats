"use strict";

//////////////////////////////////////////////////////////////////////////////
//
// Pooled variance
//
//////////////////////////////////////////////////////////////////////////////
document.querySelector(".pooled").addEventListener("click", function (e) {
  e.target.classList.contains("btn-clear") ? clearForm(e.target) : "";

  const s2Input = document.querySelector(".formula-pooled-s2");
  const sInput = document.querySelector(".formula-pooled-s");

  if (e.target.classList.contains("btn-calculate")) {
    const n = document
      .querySelector(".formula-pooled-n")
      .value.split(",")
      .map((n) => n.trim());
    const s = document
      .querySelector(".formula-pooled-s")
      .value.split(",")
      .map((s) => s.trim());
    const s2 = document
      .querySelector(".formula-pooled-s2")
      .value.split(",")
      .map((s_) => s_.trim());

    let numerator = 0;
    let denominator = 0;

    // Using Standard Deviation
    if (!(sInput.value === "")) {
      for (let i = 0; i < n.length; i++) {
        numerator += (n[i] - 1) * s[i] ** 2;
        denominator += n[i] - 1;
      }
    }

    // Using variance
    else if (!(s2Input.value === "")) {
      for (let i = 0; i < n.length; i++) {
        numerator += (n[i] - 1) * s2[i];
        denominator += n[i] - 1;
      }
    }

    document.querySelector(".formula-pooled-s2p").value = (numerator / denominator).toFixed(8);
    document.querySelector(".formula-pooled-sp").value = Math.sqrt(numerator / denominator).toFixed(8);
    document.querySelector(".formula-pooled-s2p").classList.add("calculated");
    document.querySelector(".formula-pooled-sp").classList.add("calculated");
  }

  if (e.target.classList.contains("btn-round")) {
    if (e.target.classList.contains("formula-pooled-sp-round")) {
      const spvalue = +document.querySelector(".formula-pooled-sp").value;
      document.querySelector(".formula-pooled-sp").value = spvalue.toFixed(4);
    } else if (e.target.classList.contains("formula-pooled-s2p-round")) {
      const s2pvalue = +document.querySelector(".formula-pooled-s2p").value;
      document.querySelector(".formula-pooled-s2p").value = s2pvalue.toFixed(4);
    }
  }
});

//////////////////////////////////////////////////////////////////////////////
//
// Confidence Interval
//
//////////////////////////////////////////////////////////////////////////////
document.querySelector(".confidence-interval").addEventListener("click", function (e) {
  const inputY = this.querySelector(".formula-confidence-y");
  const inputT = this.querySelector(".formula-confidence-t");
  const inputS = this.querySelector(".formula-confidence-s");
  const inputN = this.querySelector(".formula-confidence-n");
  const inputLow = this.querySelector(".formula-confidence-low");
  const inputUp = this.querySelector(".formula-confidence-up");
  const t = +inputT.value;
  const s = +inputS.value;
  const n = +inputN.value;
  const y = +inputY.value;
  const low = +inputLow.value;
  const up = +inputUp.value;

  e.target.classList.contains("btn-clear") ? clearForm(e.target) : "";

  // Only run if button is pressed
  if (!e.target.classList.contains("btn-calculate")) return;

  // y is missing

  if (inputY.value === "") {
    const ci = (t * s) / Math.sqrt(n);
    inputY.value = !(inputLow.value === "") ? low + ci : up - ci;
    inputY.classList.add("calculated");
    return;
  }

  // t is missing
  if (inputT.value === "") {
    inputT.value = !(inputLow === "") ? ((y - low) / s) * Math.sqrt(n) : ((up - y) / s) * Math.sqrt(n);
    inputT.classList.add("calculated");
    return;
  }

  // s is missing
  if (inputS.value === "") {
    inputS.value = !(inputLow === "") ? ((y - low) / t) * Math.sqrt(n) : ((up - y) / t) * Math.sqrt(n);
    inputS.classList.add("calculated");
    return;
  }

  // n is missing
  if (inputN.value === "") {
    inputN.value = !(inputLow === "") ? Math.sqrt((t * s) / (y - low)) : Math.sqrt((t * s) / (up - y));
    inputN.classList.add("calculated");
    return;
  }

  // CI is missing

  if (inputLow.value === "") {
    inputLow.value = (y - t * (s / Math.sqrt(n))).toFixed(8);
    inputLow.classList.add("calculated");
  }

  if (inputUp.value === "") {
    inputUp.value = (y + t * (s / Math.sqrt(n))).toFixed(8);
    inputUp.classList.add("calculated");
  }
});

document.querySelector(".t-test").addEventListener("click", function (e) {
  const inputY1 = this.querySelector(".formula-t-test-y1");
  const inputY2 = this.querySelector(".formula-t-test-y2");
  const inputN1 = this.querySelector(".formula-t-test-n1");
  const inputN2 = this.querySelector(".formula-t-test-n2");
  const inputSP = this.querySelector(".formula-t-test-sp");
  const inputT = this.querySelector(".formula-t-test-t");
  const y1 = +inputY1.value;
  const y2 = +inputY2.value;
  const n1 = +inputN1.value;
  const n2 = +inputN2.value;
  const sp = +inputSP.value;
  const t = +inputT.value;

  e.target.classList.contains("btn-clear") ? clearForm(e.target) : "";

  if (!e.target.classList.contains("btn-t-test")) return;

  // Calculate T
  if (inputT.value === "") {
    const numerator = y1 - y2;
    const denominator = sp * Math.sqrt(1 / n1 + 1 / n2);
    const value = numerator / denominator;
    console.log(`Numerator: ${numerator} || Denominator: ${denominator} || Value: ${value}`);
    inputT.value = ((y1 - y2) / (sp * Math.sqrt(1 / n1 + 1 / n2))).toFixed(8);
    inputT.classList.add("calculated");
  }

  // Calculate SP
  if (inputSP.value === "") {
    inputSP.value = (y1 - y2) / (t * Math.sqrt(1 / n1 + 1 / n2));
    inputSP.classList.add("calculated");
  }

  // Calculate N2
  if (inputN2.value === "") {
    inputN2.value = 1 / (((y1 - y2) / (t * sp)) ** 2 - 1 / n1);
    inputN2.classList.add("calculated");
  }

  // Calculate N1
  if (inputN1.value === "") {
    inputN1.value = 1 / (((y1 - y2) / (t * sp)) ** 2 - 1 / n2);
    inputN1.classList.add("calculated");
  }

  // Calculate Y2
  if (inputY2.value === "") {
    inputY2.value = y1 - t * sp * Math.sqrt(1 / n1 + 1 / n2);
    inputY2.classList.add("calculated");
  }

  // Calculate Y1
  if (inputY1.value === "") {
    inputY1.value = t * sp * Math.sqrt(1 / n1 + 1 / n2) + y2;
    inputY1.classList.add("calculated");
  }
});

document.querySelector(".test-h").addEventListener("click", function (e) {
  const inputR = this.querySelector(".formula-test-h-r");
  const inputN = this.querySelector(".formula-test-h-n");
  const inputT = this.querySelector(".formula-test-h-t");
  const r = +inputR.value;
  const n = +inputN.value;
  const t = +inputT.value;

  e.target.classList.contains("btn-clear") ? clearForm(e.target) : "";

  if (!e.target.classList.contains("btn-test-h")) return;

  // calculate R
  if (inputR.value === "") {
    inputR.value = Math.sqrt(t ** 2 / (n - 2 + t ** 2));
    inputR.classList.add("calculated");
  }

  // calculate N
  if (inputN.value === "") {
    inputN.value = ((t * Math.sqrt(1 - r ** 2)) / r) ** 2 + 2;
    inputN.classList.add("calculated");
  }

  // calculate T

  ////////////////////// CHECK THAT R < 1;
  if (inputT.value === "") {
    inputT.value = (r * Math.sqrt(n - 2)) / Math.sqrt(1 - r ** 2);
    inputT.classList.add("calculated");
  }
});

document.querySelector(".fisher-transform").addEventListener("click", function (e) {
  e.target.classList.contains("btn-clear") ? clearForm(e.target) : "";

  if (e.target.classList.contains("btn-fisher-transform")) {
    const r = +this.querySelector(".formula-fisher-transform-r").value;
    this.querySelector(".formula-fisher-transform-rz").value = (0.5 * Math.log((1 + r) / (1 - r))).toFixed(5);
    this.querySelector(".formula-fisher-transform-rz").classList.add("calculated");
  }
});

document.querySelector(".fisher-inverse").addEventListener("click", function (e) {
  e.target.classList.contains("btn-clear") ? clearForm(e.target) : "";

  if (e.target.classList.contains("btn-fisher-inverse")) {
    const rz = +this.querySelector(".formula-fisher-inverse-rz").value;
    this.querySelector(".formula-fisher-inverse-r").value = (
      (Math.exp(2 * rz) - 1) /
      (Math.exp(2 * rz) + 1)
    ).toFixed(5);
    this.querySelector(".formula-fisher-inverse-r").classList.add("calculated");
  }
});

document.querySelector(".adjusted").addEventListener("click", function (e) {
  e.target.classList.contains("btn-clear") ? clearForm(e.target) : "";

  if (e.target.classList.contains("btn-adjusted")) {
    const r2 = +document.querySelector(".formula-adjusted-r2").value;
    const n = +document.querySelector(".formula-adjusted-n").value;
    const p = +document.querySelector(".formula-adjusted-p").value;

    const r2adj = r2 - (p / (n - p - 1)) * (1 - r2 ** 2);
    document.querySelector(".formula-adjusted-r2adj").value = r2adj.toFixed(8);
    document.querySelector(".formula-adjusted-r2adj").classList.add("calculated");
  }
});

document.querySelector(".effect").addEventListener("click", function (e) {
  e.target.classList.contains("btn-clear") ? clearForm(e.target) : "";

  if (e.target.classList.contains("btn-effect")) {
    const dfEffectInput = this.querySelector(".effect-df-effect");
    const mseInput = this.querySelector(".effect-MSE");

    const ssEffect = +this.querySelector(".effect-ss-effect").value;
    const ssTotal = +this.querySelector(".effect-ss-total").value;
    const ssError = +this.querySelector(".effect-ss-error").value;
    const dfEffect = +this.querySelector(".effect-df-effect").value;
    const mse = +this.querySelector(".effect-MSE").value;

    this.querySelector(".effect-np2").value = (ssEffect / (ssEffect + ssError)).toFixed(5);
    this.querySelector(".effect-np2").classList.add("calculated");

    if (dfEffectInput.value !== "" && mseInput.value !== "") {
      console.log("TESTING");
      this.querySelector(".effect-w2").value = ((ssEffect - dfEffect * mse) / (mse + ssTotal)).toFixed(8);
      this.querySelector(".effect-w2").classList.add("calculated");
    }
  }
});

document.querySelector(".contrast").addEventListener("click", function (e) {
  e.target.classList.contains("btn-clear") ? clearForm(e.target) : "";

  if (e.target.classList.contains("btn-contrast")) {
    const a = this.querySelector(".formula-contrast-a")
      .value.split(",")
      .map((a) => a.trim());
    const x = this.querySelector(".formula-contrast-x")
      .value.split(",")
      .map((x) => x.trim());

    let tempValue = 0;
    for (let i = 0; i < a.length; i++) {
      tempValue += a[i] * x[i];
    }

    this.querySelector(".formula-contrast-c").value = tempValue.toFixed(5);
    this.querySelector(".formula-contrast-c").classList.add("calculated");
  }
});

document.querySelector(".contrast-se").addEventListener("click", function (e) {
  e.target.classList.contains("btn-clear") ? clearForm(e.target) : "";

  if (e.target.classList.contains("btn-contrast-se")) {
    const a = this.querySelector(".formula-contrast-se-a")
      .value.split(",")
      .map((a) => a.trim());
    const n = this.querySelector(".formula-contrast-se-n")
      .value.split(",")
      .map((a) => a.trim());
    const sp = +this.querySelector(".formula-contrast-se-sp").value;

    let tempValue = 0;
    for (let i = 0; i < a.length; i++) {
      tempValue += a[i] ** 2 / n[i];
    }

    this.querySelector(".formula-contrast-se-sec").value = (sp * Math.sqrt(tempValue)).toFixed(5);
    this.querySelector(".formula-contrast-se-sec").classList.add("calculated");
  }
});

document.querySelector(".fisher-chain").addEventListener("click", function (e) {
  toggleHidden(["formula-title", "formula-equation"], ".fisher-container", e.target);

  e.target.classList.contains("btn-clear") ? clearForm(e.target, ".fisher-parameters") : "";

  if (e.target.classList.contains("btn-fisher-chain")) {
    const valR = +this.querySelector(".fisher-chain-r").value;
    const valZ = +this.querySelector(".fisher-chain-z").value;
    const valN = +this.querySelector(".fisher-chain-n").value;
    const r = 0.5 * Math.log((1 + valR) / (1 - valR));
    const ci = valZ / Math.sqrt(valN - 3);
    const LBz = r - ci;
    const UBz = r + ci;
    const PLB = ((Math.exp(2 * LBz) - 1) / (Math.exp(2 * LBz) + 1)).toFixed(5);
    const PUB = ((Math.exp(2 * UBz) - 1) / (Math.exp(2 * UBz) + 1)).toFixed(5);

    this.querySelector(".fisher-chain-plb").value = PLB;
    this.querySelector(".fisher-chain-plb").classList.add("calculated");
    this.querySelector(".fisher-chain-pub").value = PUB;
    this.querySelector(".fisher-chain-pub").classList.add("calculated");
  }
});

document.querySelector(".semi-partial-pr1-m1").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-semi-partial-pr1-m1")) {
    const ry1Input = document.querySelector(".formula-semi-partial-pr1-m1-ry1");
    const ry2Input = document.querySelector(".formula-semi-partial-pr1-m1-ry2");
    const r12Input = document.querySelector(".formula-semi-partial-pr1-m1-r12");
    const pr1Input = document.querySelector(".formula-semi-partial-pr1-m1-pr1");

    const ry1 = ry1Input.value;
    const ry2 = ry2Input.value;
    const r12 = r12Input.value;

    const numerator = ry1 - ry2 * r12;
    const denominator = Math.sqrt((1 - ry2 ** 2) * (1 - r12 ** 2));

    pr1Input.value = (numerator / denominator).toFixed(8);
    pr1Input.classList.add("calculated");
  }

  e.target.classList.contains("btn-clear") ? clearForm(e.target, ".formula-parameters") : "";
});

document.querySelector(".semi-partial-pr1-m2").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-semi-partial-pr1-m2")) {
    const r2Input = document.querySelector(".formula-semi-partial-pr1-m2-r2");
    const ry2Input = document.querySelector(".formula-semi-partial-pr1-m2-ry2");
    const pr1Input = document.querySelector(".formula-semi-partial-pr1-m2-pr1");

    const r2 = r2Input.value;
    const ry2 = ry2Input.value;

    const numerator = r2 - ry2 ** 2;
    const denominator = 1 - ry2 ** 2;

    pr1Input.value = Math.sqrt(numerator / denominator).toFixed(8);
    pr1Input.classList.add("calculated");
  }

  e.target.classList.contains("btn-clear") ? clearForm(e.target, ".formula-parameters") : "";
});

document.querySelector(".semi-partial-sr1-m1").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-semi-partial-sr1-m1")) {
    const ry1Input = document.querySelector(".formula-semi-partial-sr1-m1-ry1");
    const ry2Input = document.querySelector(".formula-semi-partial-sr1-m1-ry2");
    const r12Input = document.querySelector(".formula-semi-partial-sr1-m1-r12");
    const sr1Input = document.querySelector(".formula-semi-partial-sr1-m1-sr1");

    const ry1 = ry1Input.value;
    const ry2 = ry2Input.value;
    const r12 = r12Input.value;

    const numerator = ry1 - ry2 * r12;
    const denominator = Math.sqrt(1 - r12 ** 2);

    sr1Input.value = (numerator / denominator).toFixed(8);
    sr1Input.classList.add("calculated");
  }

  e.target.classList.contains("btn-clear") ? clearForm(e.target, ".formula-parameters") : "";
});

document.querySelector(".semi-partial-sr1-m2").addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-semi-partial-sr1-m2")) {
    const r2Input = document.querySelector(".formula-semi-partial-sr1-m2-r2");
    const ry2Input = document.querySelector(".formula-semi-partial-sr1-m2-ry2");
    const sr1Input = document.querySelector(".formula-semi-partial-sr1-m2-sr1");

    const r2 = r2Input.value;
    const ry2 = ry2Input.value;

    sr1Input.value = Math.sqrt(r2 - ry2 ** 2).toFixed(8);
    sr1Input.classList.add("calculated");
  }

  e.target.classList.contains("btn-clear") ? clearForm(e.target, ".formula-parameters") : "";
});

////// HELPER FUNCTIONS

const toggleHidden = function (clickable, toHide, target) {
  clickable.forEach((tag) => {
    if (target.classList.contains(tag)) {
      document.querySelector(toHide).classList.toggle("hidden");
      return true;
    }
  });
  return false;
};

const clearForm = function (target, tag = ".formula-parameters") {
  const container = target.closest(tag);

  for (let i = 0; i < container.children.length; i++) {
    if (container.children[i].tagName === "INPUT") {
      container.children[i].value = "";
      container.children[i].classList.remove("calculated");
    }
  }
};
