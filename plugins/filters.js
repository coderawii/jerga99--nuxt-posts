import Vue from "vue";
import moment from "moment";

Vue.filter("formatDate", (date, dateFormat = "LLL") => {
  if (!date) return "";
  return moment(date).format(dateFormat);
});
