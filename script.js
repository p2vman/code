const md = window.markdownit({
    highlight: function (str, lang) {
      const Prism = window.Prism;
      if (lang && Prism.languages[lang]) {
        try {
          return '<pre><code class="language-' + lang + '">' +
            Prism.highlight(str, Prism.languages[lang], lang) +
            '</code></pre>';
        } catch (__) {}
      }
  
      return '<pre><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    }
  });

document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const lang = urlParams.get('lang');
    const exampleList = document.getElementById('example-list');
    const contentDiv = document.getElementById('content');

    if (!lang) {
        exampleList.innerHTML = '<p>Please select a language.</p>';
        return;
    }

    function getQueryParam(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    }

    function loadExample(exampleId) {
        if (exampleId === null) return;
        
        fetch(`examples/${exampleId}.md`)
            .then(response => response.text())
            .then(text => {
                contentDiv.innerHTML = md.render(text);
            })
            .catch(err => {
                contentDiv.innerHTML = '<p>Error loading example.</p>';
                console.error('Error loading example:', err);
            });
    }

    function loadExamples(language) {
        fetch(`examples/${language}.json`)
            .then(response => response.json())
            .then(data => {
                exampleList.innerHTML = '';
                render(exampleList, data);
            })
            .catch(err => {
                exampleList.innerHTML = '<p>Error loading examples.</p>';
                console.error('Error loading examples:', err);
            });
    }

    if (window.location.pathname.endsWith('example-page.html')) {
        const exampleId = getQueryParam('select');
        if (exampleId === null) {
            loadExamples(getQueryParam("lang"))
        }
        else {
            loadExample(exampleId);
        }
    }
});

function renderExamples(examples, container) {
    let listHtml = '<ul>';
    examples.forEach((example, index) => {
        listHtml += `<li><a href="#" data-type="${example.type}" data-file="${example.file || ''}" data-index="${index}">${example.name}</a></li>`;
    });
    listHtml += '</ul>';
    container.innerHTML = listHtml;
}


document.getElementById('backButton').addEventListener('click', function() {
    window.history.back();
});


function render(root, list) {
    list.forEach(example => {
        if (example.type === 0) {
            const item = document.createElement('div');
            item.classList.add('example-item');
            const link = document.createElement('a');
            link.href = `example-page.html?lang=${language}&select=${example.file}`;
            link.textContent = example.name;
            item.appendChild(link);
            root.appendChild(item);
        } else if (example.type === 1) {
            const lv = document.createElement('div');
            const h2 = document.createElement('h2');
            h2.innerHTML=example.name;
            lv.appendChild(h2);
            render(lv, example.entry);
            root.appendChild(lv);
        }
    });
}