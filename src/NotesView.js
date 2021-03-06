import React from 'react';
import { List, Icon, Container, Header, Menu } from 'semantic-ui-react';
import Dexie from 'dexie';
import html2pdf from 'html2pdf.js';

import htmlDocx from 'html-docx-js/dist/html-docx';
import FileSaver from 'file-saver';

import Duration from './components/Duration';
import RichText from './components/RichText';
import db from './db';

class NotesView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            meta: null,
            notes: [],
            id: this.props.match.params.id
        };
    }

    componentWillMount() {
        db.meta.where("videoId")
            .equals(this.state.id)
            .first()
            .then(meta => {
                this.setState({ meta });
                console.log(meta);
            }).catch(e => {
                console.log(e);
            })

        db.notes.where("[videoId+time]")
            .between([this.state.id, Dexie.minKey], [this.state.id, Dexie.maxKey])
            .toArray()
            .then(notes => {
                this.setState({ notes });
            });
    }

    // Download as PDF
    toPDF = () => {
        html2pdf(document.querySelector('.ui.text.container'), {
            filename: `${this.state.meta.title}.pdf`,
            html2canvas: { dpi: 300, useCORS: true },
            jsPDF: { unit: 'pt', format: 'letter', orientation: 'portrait' }
        })
    }

    // Download as JSON
    toJson = () => {
        // export both notes and meta
        // this.state.notes.

        db.meta.where('videoId').equals(this.state.id).first().then(meta => {
            // Prepare document
            const content = {
                meta,
                notes: this.state.notes
            };
            // Download JSON
            const blob = new Blob([JSON.stringify(content)], { type: 'application/json;charset=utf-8' });
            FileSaver.saveAs(blob, `${this.state.meta.title}.json`);
        });
    }

    // Download as Word
    toWord = () => {
        const contentDocument = document.querySelector('.ui.text.container')
        const content = `<!DOCTYPE html><html><body>${contentDocument.outerHTML}</body></html>`;
        var converted = htmlDocx.asBlob(content, {
            orientation: 'portrait'
        });
        FileSaver.saveAs(converted, `${this.state.meta.title}.docx`)
    }

    render() {
        const baseUrl = window.location.origin + window.location.pathname

        return (
            <div>
                <Menu text attached='top'>
                    <Menu.Item header>Note Taker</Menu.Item>
                    <Menu.Item
                        name="library"
                        href={baseUrl}
                    >
                        <Icon name='grid layout' /> Library
                    </Menu.Item>

                    <Menu.Item
                        as='a'
                        name='toJson'
                        onClick={this.toJson}
                    >
                        <Icon name='file text outline' /> JSON
                    </Menu.Item>

                    <Menu.Item
                        as='a'
                        name='toWord'
                        onClick={this.toWord}
                    >
                        <Icon name='file word outline' /> Word
                    </Menu.Item>

                    <Menu.Item
                        as='a'
                        name='toPDF'
                        onClick={this.toPDF}
                    >
                        <Icon name='file pdf outline' /> PDF
                    </Menu.Item>
                </Menu>

                <Container text>
                    <br />
                    {this.state.meta && (
                        <Header as='h2' textAlign='center'>
                            <Header.Content>
                                {this.state.meta.title}
                                <Header.Subheader>
                                    {this.state.meta.author}
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    )
                    }

                    <List divided relaxed>
                        {this.state.notes.map(note => {
                            return (
                                <List.Item>
                                    <List.Icon name='time' color='grey'/>
                                    <List.Content>
                                        <List.Header><Duration seconds={note.time} icon={false} asHeading={true}/></List.Header>
                                        <List.Description>
                                            <RichText readOnly={true} value={note.content} />
                                        </List.Description>
                                    </List.Content>
                                </List.Item>
                            )
                        })}
                    </List>

                    {/* <Item.Group divided>
                    {this.state.notes.map(note => {
                        return (
                            <Item>
                                <Item.Image 
                                src={`https://img.youtube.com/vi/${note.videoId}/hqdefault.jpg`} 
                                label={{color: 'teal', floating: true, content: <Duration seconds={note.time} icon={false} />}}
                                />
                                <Item.Content>
                                    <Item.Description>
                                        <RichText
                                            readOnly={true}
                                            value={note.content} />
                                    </Item.Description>
                                </Item.Content>
                            </Item>
                        )
                    })}
                </Item.Group> */}
                </Container>
            </div>
        )
    }
}

export default NotesView;