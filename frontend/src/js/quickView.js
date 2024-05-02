import { state } from "./counter.js";

async function data() {
  const data =  state.quickView
  console.log(data);
}
data();
