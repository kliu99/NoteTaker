import { Editor } from 'slate-react'
import { Value } from 'slate'

import React from 'react'
import initialValue from './value.json'

/**
 * The auto-markdown example.
 *
 * @type {Component}
 */

class RichText extends React.Component {
  /**
   * Deserialize the raw initial value.
   *
   * @type {Object}
   */

  constructor(props) {
    super(props)
    if (this.props.value) {
      this.state = { 
        value: Value.fromJSON(this.props.value)
      }
    } else {
      this.state = {
        value: Value.fromJSON(initialValue),
      }
    }
  }
  /**
   * Get the block type for a series of auto-markdown shortcut `chars`.
   *
   * @param {String} chars
   * @return {String} block
   */

  getType = chars => {
    switch (chars) {
      case '*':
      case '-':
      case '+':
        return 'unordered-item'
      case '1.':
        return 'ordered-item'
      case '>':
        return 'block-quote'
      case '#':
        return 'heading-one'
      case '##':
        return 'heading-two'
      case '###':
        return 'heading-three'
      case '####':
        return 'heading-four'
      case '#####':
        return 'heading-five'
      case '######':
        return 'heading-six'
      case '`':
        return 'code'
      default:
        return null
    }
  }

  /**
   *
   * Render the example.
   *
   * @return {Component} component
   */

  render() {
    return (
      <div className="editor">
        <Editor
          readOnly={this.props.readOnly}
          placeholder="Write some markdown..."
          value={this.state.value}
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
          renderNode={this.renderNode}
          onClick={this.onClick}
        />
      </div>
    )
  }

  /**
   * Render a Slate node.
   *
   * @param {Object} props
   * @return {Element}
   */

  renderNode = props => {
    const { attributes, children, node } = props
    switch (node.type) {
      case 'block-quote':
        return <blockquote {...attributes}>{children}</blockquote>
      case 'bulleted-list':
        return <ul {...attributes}>{children}</ul>
      case 'numbered-list':
        return <ol {...attributes}>{children}</ol>
      case 'heading-one':
        return <h1 {...attributes}>{children}</h1>
      case 'heading-two':
        return <h2 {...attributes}>{children}</h2>
      case 'heading-three':
        return <h3 {...attributes}>{children}</h3>
      case 'heading-four':
        return <h4 {...attributes}>{children}</h4>
      case 'heading-five':
        return <h5 {...attributes}>{children}</h5>
      case 'heading-six':
        return <h6 {...attributes}>{children}</h6>
      case 'unordered-item':
      case 'ordered-item':
        return <li {...attributes}>{children}</li>
      case 'code':
        return <code {...attributes}>{children}</code>
    }
  }

  /**
   * On change.
   *
   * @param {Change} change
   */

  onChange = ({ value }) => {
    // Check to see if the document has changed before saving.
    if (this.props.onChange && value.document != this.state.value.document) {
      this.props.onChange(value);
    }

    this.setState({ value })
  }

  /**
   * On key down, check for our specific key shortcuts.
   *
   * @param {Event} event
   * @param {Change} change
   */

  onKeyDown = (event, change) => {
    switch (event.key) {
      case ' ':
        return this.onSpace(event, change)
      case 'Backspace':
        return this.onBackspace(event, change)
      case 'Enter':
        return this.onEnter(event, change)
      case '`':
        return this.onCode(event, change)
    }
  }

  /**
   * On space, if it was after an auto-markdown shortcut, convert the current
   * node into the shortcut's corresponding type.
   *
   * @param {Event} event
   * @param {Change} change
   */

  onSpace = (event, change) => {
    const { value } = change
    if (value.isExpanded) return

    const { startBlock, startOffset } = value
    const chars = startBlock.text.slice(0, startOffset).replace(/\s*/g, '')
    const type = this.getType(chars)

    if (!type) return
    if (type == 'unordered-item' && startBlock.type == 'unordered-item') return
    if (type == 'ordered-item' && startBlock.type == 'ordered-item') return
    event.preventDefault()

    change.setBlocks(type)

    if (type == 'unordered-item') {
      change.wrapBlock('bulleted-list')
    }

    if (type == 'ordered-item') {
      change.wrapBlock('numbered-list')
    }

    change.extendToStartOf(startBlock).delete()
    return true
  }

  /**
   * On backspace, if at the start of a non-paragraph, convert it back into a
   * paragraph node.
   *
   * @param {Event} event
   * @param {Change} change
   */

  onBackspace = (event, change) => {
    const { value } = change
    if (value.isExpanded) return
    if (value.startOffset != 0) return

    const { startBlock } = value
    if (startBlock.type == 'paragraph') return

    event.preventDefault()
    change.setBlocks('paragraph')

    if (startBlock.type == 'unordered-item') {
      change.unwrapBlock('bulleted-list')
    } else if (startBlock.type == 'ordered-item') {
      change.unwrapBlock('numbered-list')
    }
    return true
  }

  /**
   * On return, if at the end of a node type that should not be extended,
   * create a new paragraph below it.
   *
   * @param {Event} event
   * @param {Change} change
   */

  onEnter = (event, change) => {
    const { value } = change
    if (value.isExpanded) return

    const { startBlock, startOffset, endOffset } = value
    if (startOffset == 0 && startBlock.text.length == 0)
      return this.onBackspace(event, change)
    if (endOffset != startBlock.text.length) return

    if (
      startBlock.type != 'heading-one' &&
      startBlock.type != 'heading-two' &&
      startBlock.type != 'heading-three' &&
      startBlock.type != 'heading-four' &&
      startBlock.type != 'heading-five' &&
      startBlock.type != 'heading-six' &&
      startBlock.type != 'block-quote'
    ) {
      return
    }

    event.preventDefault()
    change.splitBlock().setBlocks('paragraph')
    return true
  }

  /**
   * On code, if at the end of a node type that should not be extended,
   * create a new paragraph below it.
   *
   * @param {Event} event
   * @param {Change} change
   */
  onCode = (event, change) => {
    const { value } = change
    if (value.isExpanded) return

    const { startBlock, startOffset } = value

    // change.insertBlock('code')
    // change.insertInline('code')
    // change.setBlocks('code')
    // change.wrapInline('code')

    // change.insertInline
    // change.setInlines('code')
    // change.splitInline().setInlines('code')

    // change.addMark('code')

    return true
  }

  onClick = () => {
    // console.log("clicked");
  }
}

/**
 * Export.
 */

export default RichText