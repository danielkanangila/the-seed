import Utils from './Utils.js'
import _ from 'lodash'

const FR = 'FR'
const EN = 'EN'

class ResourceFactory {
    files = null;
    html_string = '';
    context = null;
    contents = [];
    range = 0;
    title = ''

    constructor(files) {
        this.files = files.metadata;
        this.html_string = files.xml;
        this.range = files.range;
    }

    extract_isbn_from_filename() {
        let chunks = this.files[0].name.split('_');
        return chunks[0].replace('-', '');
    }

    extract_origin_title_from_filename() {
        let chunks = this.files[0].name.split('_');
        chunks.shift();
        chunks.pop();
        return chunks.join(' ');
    }

    extract_origin_date_from_isbn(isbn) {
        let extracted = isbn.match(/\d+/)

        if (extracted) {
            let str_date = '19' + Utils.str_split(extracted[0], 2).join('-')
            return str_date
        } else {
            return '1900-01-01'
        }
    }

    extract_resource_lang() {
        if (_.startsWith(this.files[0].name, FR)) {
            return FR
        } else {
            return EN
        }
    }

    parse_content() {
        let chunks = this.truncate(),
            title = '', n = 1

        for (let i = 0; i < chunks.length; i++) {

            if (i == 0 || i == 1 && _.startsWith(chunks[i], '<H')) {
                title += Utils.strip_tags(chunks[i])
            } else if (i == 1 && !_.startsWith(chunks[i], '<H')) {
                this.set_new_index(this.range.start, chunks[i])
            } else {
                if (isNaN(parseInt(chunks[i]))) {
                    this.concat_paragraph(n, chunks[i])
                } else {
                    n = parseInt(chunks[i])
                    if (this.contents[n] == undefined) {
                        this.set_new_index(n, chunks[i], null)
                    }
                }
            }
        }

        this.complete()
        this.title = title
        /*
        return {
            title: title,
            content: this.contents
        }*/
    }

    complete() {
        let end = parseInt(this.range.end) + 1,
            start = parseInt(this.range.start),
            orders = _.range(start, end),
            prfs = Utils.find_all_paragraph_number(this.contents),
            missing_indexes = _.difference(orders, prfs)

        if (missing_indexes.length > 0) {

            for (var i = 0; i < missing_indexes.length; i++) {

                let index = missing_indexes[i],
                    position = index - 1,
                    last_index = _.findIndex(this.contents, { 'paragraph_number': position }),
                    pattern = ' ' + index + ' ',
                    rgx = new RegExp(pattern, 'gi'),
                    content = _.find(this.contents, { 'paragraph_number': position })
                
                if (content) {
                    let matched = this.contents[last_index].paragraph_content.match(rgx)
                    
                    if (matched) {

                        let chunks = this.contents[last_index].paragraph_content.split(rgx)
                        this.contents[last_index].paragraph_content = chunks[0]
                        this.set_new_index(index, chunks[1], position)
                    }
                } else {
                    console.log('The key ' + position + ' don\'t exist in this brochure')
                }

            }
        }
    }

    isSketchy (contents) {
        let range = _.range(this.range.start, this.range.end),
            paragraphs_number = Utils.find_all_paragraph_number(contents),
            missing_paragraphs = _.difference(range, paragraphs_number)

        if (missing_paragraphs.length == 0) {
            return undefined
        } else {
            return missing_paragraphs
        }
    }

    truncate() {
        let chunk = _.split(this.html_string, '<Part>')[1],
            rgx_p = /(<\/P>)/g,
            ps1 = _.replace(chunk, rgx_p, ''),
            ps2 = _.split(ps1, '<P>'),
            ps3 = _.map(ps2, (p) => {
                return _.trim(_.replace(_.replace(p, /`/g, ''), /[\^]/g, '...'))
            })

        return ps3
    }

    set_new_index(index, content, position) {
        if (position) {
            this.contents.splice(position, 0, {
                paragraph_number: index,
                paragraph_content: Utils.strip_tags(content)
            })
        } else {
            this.contents.push({
                paragraph_number: index,
                paragraph_content: Utils.strip_tags(Utils.pull_starting_num(content))
            })
        }
    }

    concat_paragraph(index, chunk) {
        let last_index = this.contents.length - 1,
            last_prf = this.contents[last_index].paragraph_content

        this.contents[last_index].paragraph_content = Utils.strip_tags(last_prf + ' ' + chunk)
    }
}

export default ResourceFactory