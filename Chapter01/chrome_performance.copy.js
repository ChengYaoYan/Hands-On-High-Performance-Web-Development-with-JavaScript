const template = `<ul id="{{ id || __CREATE }}">
  <% for item in items %>
    <li id="{{ id || __CREATE }}">
      <span>{{ text || __EMPTY }}</span>
      <button>Delete</button>
    </li>
  <% endfor %>
</ul>`;

// console.log(template);

const data = {
  id: 'todoApp',
  items: [
    { text: "Wake Up" },
    { text: "Take Breakfast" },
    { text: "Write Some Code" },
    { text: "Learn English and Japanese" },
    { text: "Take Dinner" },
    { text: "Watch Some Videos" },
    { text: "Sleep" },
  ]
};
for (let i = 0; i < 10000; i++) {
  data.items.push({ text: `Another item ${i}`});
}
// console.log(data.items);

let count = 0;

const defaults = {
  __CREATE: function() {
    return count++;
  },
  __EMPTY: function() {
    return "";
  }
};

const runTemplate = function(template="", data) {
  let splitTemplate = template.split(/\n|\r\n/g);
  let inloop = false;
  const loopTemplate = [];
  let enterloopIndex = 0;

  if (splitTemplate.length == 0) {
    return ;
  }

  for (let i = 0; i < splitTemplate.length; i++) {
    const match = /{{(.*?)}}/g;
    const loop = /<% for (.*) %>/g;
    const endloop = /<% endfor %/g;

    if (find = match.exec(splitTemplate[i].trim())) {
      if (inloop) {
        loopTemplate.push(splitTemplate[i]);
      } else {
        let keys = find[1].split(" ");
        keys.shift();
        keys.pop();
        let replace = '';

        if (Object.keys(data).includes(keys[0])) {
          replace = data[keys[0]];
          splitTemplate[i] = splitTemplate[i].replace(match, replace);
        } else if (keys[1] == "||" && Object.keys(defaults).includes(keys[2])) {
          replace = defaults[keys[2]]();
          splitTemplate[i] = splitTemplate[i].replace(match, replace);
        }
      }
    } else if (find = loop.exec(splitTemplate[i].trim())) {
      inloop = true;
      enterloopIndex = i;
    } else if (find = endloop.exec(splitTemplate[i].trim())) {
      inloop = false;
      let runLoopTemplate = runTemplate.bind(null, loopTemplate.join("\n"));
      let templateEls = data.items.map(runLoopTemplate).join("");
      splitTemplate.splice(enterloopIndex, i - enterloopIndex + 1, templateEls);
    } else {
      loopTemplate.push(splitTemplate[i]);
    }
  }
  return splitTemplate.join("");
}