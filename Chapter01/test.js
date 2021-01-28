// code logic

// get template from listElementTemplate
// use runTemplate render the template
// insert template into container

// runTemplate function
//  ::input `template`, `data`
//  ::output  html template

// 1. read the template by line
// 2. 
//    variable:
//      template: `id={{ id || __create }}`,
//                `id={{ text || __empty }}`
//      -->
//                `id=data.id` or `id=__create`
//                `id=
//    pure and inloop variable:
//                  push into loopTemplate(the rebuild template)
//    for:
//                  inloop = true,  // enter the loop
//    endfor:
//                  inloop = false  // end the loop
//                  rebuildtemp with loopTemplate
//

splitTemplate = [
  '<ul id="{{ id || __CREATE }}">',
  '  <% for element in items %>',
  '    <li id="{{ id || __CREATE }}">',
  '      <span class="text">{{ text || __EMPTY }}</span>',
  '      <button class="remove">Delete</button>',
  '    </li>',
  '  <% endfor %>',
  '</ul>'
]

// ::
// ||
// \/

// 1 <ul id="app">
// 2 <li id="1">
// 3   <span class="text">item one</span>
// 4    <button class="remove">Delete</button>
// 5 </li>
// 6 </ul>

template = `
<ul id="{{ id || __CREATE }}">
    <% for element in items %>
      <li id="{{ id || __CREATE }}">
        <span class="text">{{ text || __EMPTY }}</span>
        <button class="remove">Delete</button>
      </li>
    <% endfor %>
  </ul>
`
console.log(template.split(/\n|\r\n/g));