console.log(DATA);
let CATE1_COUNT = {}
let CATE2_COUNT = {}

function count(m, key) {
    var c;
    if (!(key in m)) {
        c = 0;
    } else {
        c = m[key];
    }
    m[key] = c + 1;
}

function buildTree() {
    let cate1Map = {};
    let cate2Map = {};
    for (let i = 0; i < DATA.length; i += 1) {
        let r = DATA[i];
        let cate1Name = r.cate1;
        let cate2Name = r.cate2;
        var cate2;
        if (!(cate2Name in cate2Map)) {
            cate2 = [];
            cate2Map[cate2Name] = cate2;
        } else {
            cate2 = cate2Map[cate2Name];
        }
        cate2.push(r);

        var cate1;
        if (!(cate1Name in cate1Map)) {
            cate1 = {};
            cate1Map[cate1Name] = cate1;
        } else {
            cate1 = cate1Map[cate1Name];
        }
        cate1[cate2Name] = cate2;

        count(CATE1_COUNT, cate1Name);
        count(CATE2_COUNT, cate2Name);
    }
    return cate1Map;
}

let TREE = buildTree();
console.log(TREE);
console.log(CATE1_COUNT);
console.log(CATE2_COUNT);

var CATE1, CATE2;

function render_cate1_list() {
    let keys = Object.keys(TREE);
    keys.sort(function (a, b) { return CATE1_COUNT[b] - CATE1_COUNT[a] });
    let html = '';
    for (let i = 0; i < keys.length; i += 1) {
        html += ' <a class="cate1-item">' + keys[i] + '</a>' + '(' + CATE1_COUNT[keys[i]] + ')';
    }
    $('#cate1-list').html(html);
}

function render_cate2_list() {
    let data = TREE[CATE1];
    let keys = Object.keys(data);
    keys.sort(function (a, b) { return CATE2_COUNT[b] - CATE2_COUNT[a] });
    let html = '';
    for (let i = 0; i < keys.length; i += 1) {
        html += ' <a class="cate2-item">' + keys[i] + '</a>' + '(' + CATE2_COUNT[keys[i]] + ')';
    }
    $('#cate2-list').html(html);
    $('.cate2-item').click(
        function (e) {
            $('.cate2-item').attr('class', 'cate2-item');
            e.target.setAttribute('class', 'cate2-item selected');
            CATE2 = e.target.firstChild.nodeValue;
            render_major_list_of_cate2();
        }
    );
}

function render_major_list_of_cate2() {
    let data = TREE[CATE1][CATE2];
    render_major_list(data);
}

function render_major_list(data) {
    let html = '<table border="1">'
        + '<tr>'
        + '<th>门类</th>'
        + '<th>专业类</th>'
        + '<th>专业代码</th>'
        + '<th>专业名称</th>'
        + '<th>学位授予门类</th>'
        + '<th>修业年限</th>'
        + '<th>增设年份</th>'
        + '</tr>';
    for (let i = 0; i < data.length; i += 1) {
        let d = data[i];
        html += '<tr>'
            + '<td>' + d.cate1 + '</td>'
            + '<td>' + d.cate2 + '</td>'
            + '<td>' + d.id + '</td>'
            + '<td>' + d.name + '</td>'
            + '<td>' + d.degree_cate + '</td>'
            + '<td>' + d.year + '</td>'
            + '<td>' + d.created_at + '</td>'
            + '</tr>';
    }
    $('#major-list').html(html);
}

$(document).ready(function () {
    CATE1 = '工学';
    CATE2 = '力学类';

    render_cate1_list();
    // render_cate2_list();
    // render_major_list();



    $('.cate1-item').click(
        function (e) {
            $('.cate1-item').attr('class', 'cate1-item');
            e.target.setAttribute('class', 'cate1-item selected');
            CATE1 = e.target.firstChild.nodeValue;
            render_cate2_list();
            $('#major-list').html('');
        }
    );

    $('#search').click(
        function(e) {
            $('.cate1-item').attr('class', 'cate1-item');
            $('.cate2-item').attr('class', 'cate2-item');
            let data = [];
            let k = $('#keyword').val();
            for (let i = 0; i < DATA.length; i += 1) {
                let d = DATA[i];
                if (d.name.indexOf(k) != -1) {
                    data.push(d);
                }
            }
            render_major_list(data);
        }
    );
});

