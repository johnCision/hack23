/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/accordion/accordion.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/accordion/accordion.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Accordion": () => (/* binding */ Accordion)
/* harmony export */ });
class Accordion extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = Accordion.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/alert/alert.js":
/*!**************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/alert/alert.js ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALERT_EVENTS": () => (/* binding */ ALERT_EVENTS),
/* harmony export */   "Alert": () => (/* binding */ Alert)
/* harmony export */ });
const ALERT_EVENTS = ['close']

class Alert extends HTMLElement {
	static template

	static ATTRIBUTE_OPEN = 'open'

	static get observedAttributes() {
		return [Alert.ATTRIBUTE_OPEN]
	}

	constructor() {
		super()

		const templateElement = Alert.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.replaceChildren(content.cloneNode(true))
	}

	connectedCallback() {
		if (this.isConnected) {
			this.dialog.addEventListener('close', this.#handleOnClose)
		}
	}

	disconnectedCallback() {
		this.dialog.removeEventListener('close', this.#handleOnClose)
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === Alert.ATTRIBUTE_OPEN) {
			const shouldClose = newValue === null || newValue === 'false'

			if (shouldClose) {
				this.dialog.close()
			} else {
				this.dialog.show()
			}
		}
	}

	get dialog() {
		return this.shadowRoot.querySelector('dialog')
	}

	show() {
		this.toggleAttribute('open', true)
	}

	close() {
		this.toggleAttribute('open', false)
	}

	#handleOnClose = () => {
		this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/application-frame/application-frame.js":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/application-frame/application-frame.js ***!
  \**************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ApplicationFrame": () => (/* binding */ ApplicationFrame)
/* harmony export */ });
class ApplicationFrame extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = ApplicationFrame.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/avatar/avatar.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/avatar/avatar.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AVATAR_ATTRIBUTES": () => (/* binding */ AVATAR_ATTRIBUTES),
/* harmony export */   "Avatar": () => (/* binding */ Avatar),
/* harmony export */   "DISPLAY": () => (/* binding */ DISPLAY)
/* harmony export */ });
const AVATAR_ATTRIBUTES = {
	IMAGE_SOURCE: 'src',
	INITIALS: 'initials',
	VISIBLE: 'visible'
}

const DISPLAY = {
	src: 'image',
	initials: 'initials',
	fallback: 'fallback'
}

const priorityOrder = ['src', 'initials', 'fallback']

class Avatar extends HTMLElement {
	static template

	#content = {
		fallback: true
	}

	constructor() {
		super()
		const templateElement = Avatar.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined.')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	connectedCallback() {
		const currentVisibleValue = this.getAttribute(AVATAR_ATTRIBUTES.VISIBLE)
		this.setAttribute(AVATAR_ATTRIBUTES.VISIBLE, currentVisibleValue ?? DISPLAY.fallback)

		const imageElement = this.shadowRoot.querySelector('#image')
		imageElement.addEventListener('error', this.#handleImageError)
	}

	disconnectedCallback() {
		const imageElement = this.shadowRoot.querySelector('#image')
		imageElement.removeEventListener('error', this.#handleImageError)
	}

	static get observedAttributes() {
		return [AVATAR_ATTRIBUTES.IMAGE_SOURCE, AVATAR_ATTRIBUTES.INITIALS]
	}

	get visible() {
		return this.getAttribute(AVATAR_ATTRIBUTES.VISIBLE)
	}

	#handleImageError = () => {
		this.dispatchEvent(new CustomEvent('error', { bubbles: true, composed: true }))
	}

	#defineContent(name, value) {
		const imageElement = this.shadowRoot.querySelector('#image')
		const initialsElement = this.shadowRoot.querySelector('#initials')

		if (name === AVATAR_ATTRIBUTES.INITIALS) {
			initialsElement.innerHTML = value
		}

		if (name === AVATAR_ATTRIBUTES.IMAGE_SOURCE) {
			imageElement.setAttribute(AVATAR_ATTRIBUTES.IMAGE_SOURCE, value)
		}

		this.#content[name] = value
	}

	attributeChangedCallback(name, _, newValue) {
		this.#defineContent(name, newValue)

		const visibleAttr = priorityOrder.find(attr => this.#content[attr])

		this.setAttribute(AVATAR_ATTRIBUTES.VISIBLE, DISPLAY[visibleAttr])
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/button-set/button-set.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/button-set/button-set.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ButtonSet": () => (/* binding */ ButtonSet)
/* harmony export */ });
class ButtonSet extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = ButtonSet.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/button/button.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/button/button.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BUTTON_ATTRIBUTES": () => (/* binding */ BUTTON_ATTRIBUTES),
/* harmony export */   "Button": () => (/* binding */ Button)
/* harmony export */ });
const BUTTON_ATTRIBUTES = {
	KIND: 'kind',
	DISABLED: 'disabled',
	BOX_TYPE: 'box-type',
	SUBMIT: 'submit'
}

class Button extends HTMLElement {
	static template

	static formAssociated = true

	static get observedAttributes() {
		return Object.values(BUTTON_ATTRIBUTES)
	}

	constructor() {
		super()
		const templateElement = Button.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined.')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	attributeChangedCallback(name, _oldValue, newValue) {
		const { DISABLED } = BUTTON_ATTRIBUTES

		if (name === DISABLED) {
			const isDisabled = newValue !== null && newValue !== 'false'
			this.#buttonElement.toggleAttribute(DISABLED, isDisabled)
		}
	}

	connectedCallback() {
		if (!this.isConnected) {
			return
		}

		const submitAttr = this.getAttribute(BUTTON_ATTRIBUTES.SUBMIT)
		const isSubmitButton = submitAttr !== null && submitAttr !== 'false'

		const internals = this.attachInternals()
		this.form = internals.form

		if (this.form && isSubmitButton) {
			this.#buttonElement.addEventListener('click', this.#handleClick)
		}
	}

	disconnectedCallback() {
		this.#buttonElement.removeEventListener('click', this.#handleClick)
	}

	#handleClick = () => {
		this.form.requestSubmit()
	}

	get disabled() {
		const disabledAttr = this.getAttribute('disabled')
		return disabledAttr !== null && disabledAttr !== 'false'
	}

	set disabled(value) {
		this.toggleAttribute('disabled', value)
	}

	get #buttonElement() {
		return this.shadowRoot.querySelector('button')
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/chip-group/chip-group.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/chip-group/chip-group.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ChipGroup": () => (/* binding */ ChipGroup)
/* harmony export */ });
class ChipGroup extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = ChipGroup.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/chip/chip.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/chip/chip.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Chip": () => (/* binding */ Chip)
/* harmony export */ });
class Chip extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = Chip.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined.')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/dialog/dialog.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/dialog/dialog.js ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dialog": () => (/* binding */ Dialog),
/* harmony export */   "MODAL_EVENTS": () => (/* binding */ MODAL_EVENTS)
/* harmony export */ });
const MODAL_EVENTS = ['close']

class Dialog extends HTMLElement {
	static template

	static ATTRIBUTE_OPEN = 'open'

	constructor() {
		super()

		const templateElement = Dialog.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.replaceChildren(content.cloneNode(true))
	}

	static get observedAttributes() {
		return [Dialog.ATTRIBUTE_OPEN]
	}

	connectedCallback() {
		if (this.isConnected) {
			this.dialog.addEventListener('close', this.#handleOnClose)
		}
	}

	disconnectedCallback() {
		this.dialog.removeEventListener('close', this.#handleOnClose)
	}

	attributeChangedCallback(name, oldValue, newValue) {
		if (name === Dialog.ATTRIBUTE_OPEN) {
			const shouldClose = newValue === null || newValue === 'false'

			if (shouldClose) {
				this.dialog.close()
			} else {
				this.dialog.show()
			}
		}
	}

	get dialog() {
		return this.shadowRoot.querySelector('dialog')
	}

	show() {
		this.toggleAttribute('open', true)
	}

	close() {
		this.toggleAttribute('open', false)
	}

	#handleOnClose = () => {
		this.dispatchEvent(new CustomEvent('close', { bubbles: true, composed: true }))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/feed/feed.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/feed/feed.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Feed": () => (/* binding */ Feed)
/* harmony export */ });
class Feed extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = Feed.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/icon/icon.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/icon/icon.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ATTR_NAME": () => (/* binding */ ATTR_NAME),
/* harmony export */   "Icon": () => (/* binding */ Icon)
/* harmony export */ });
const ATTR_NAME = 'name'

class Icon extends HTMLElement {
	static mappings = {}

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	static get observedAttributes() {
		return [ATTR_NAME]
	}

	setIconAttributes(alt) {
		const iconElement = this.shadowRoot.querySelector('svg')

		if (iconElement) {
			iconElement.setAttribute('part', 'image')
			iconElement.setAttribute('aria-label', alt)
		}
	}

	getIconObject() {
		const name = this.attributes[ATTR_NAME]?.value
		return Icon.mappings[name] ?? { icon: '' }
	}

	connectedCallback() {
		const { icon, alt } = this.getIconObject()

		this.shadowRoot.innerHTML = icon
		this.setIconAttributes(alt)
	}

	attributeChangedCallback(name, _, _newValue) {
		if (name === ATTR_NAME) {
			const { icon, alt } = this.getIconObject()

			this.shadowRoot.innerHTML = icon
			this.setIconAttributes(alt)
		}
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/input-checkbox/input-checkbox.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/input-checkbox/input-checkbox.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CHECKBOX_ATTRIBUTES": () => (/* binding */ CHECKBOX_ATTRIBUTES),
/* harmony export */   "InputCheckbox": () => (/* binding */ InputCheckbox)
/* harmony export */ });
const CHECKBOX_ATTRIBUTES = {
	DISABLED: 'disabled',
	REQUIRED: 'required',
	CHECKED: 'checked',
	NAME: 'name',
	VALUE: 'value'
}

class InputCheckbox extends HTMLElement {
	static template

	static get observedAttributes() {
		return Object.values(CHECKBOX_ATTRIBUTES)
	}

	constructor() {
		super()

		const templateElement = InputCheckbox.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined.')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	attributeChangedCallback(name, _oldValue, newValue) {
		this.#attributePassthrought(name, newValue)
	}

	connectedCallback() {
		if (!this.isConnected) {
			return
		}

		this.#inputElem.addEventListener('change', this.#handleInputChange)
	}

	disconnectedCallback() {
		this.#inputElem.removeEventListener('change', this.#handleInputChange)
	}

	#attributePassthrought(name, value, exclude = []) {
		if (exclude.includes(name)) {
			return
		}

		const input = this.shadowRoot.getElementById('Input')
		if (value === null) {
			input.removeAttribute(name)
		} else {
			input.setAttribute(name, value)
		}
	}

	#handleInputChange = () => {
		this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
	}

	get #inputElem() {
		return this.shadowRoot.getElementById('Input')
	}

	get checked() {
		return this.#inputElem.checked
	}

	set checked(state) {
		this.#inputElem.checked = state
	}

	get value() {
		return this.#inputElem.value
	}

	set value(value) {
		this.#inputElem.value = value
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/input-chip-group/input-chip-group.js":
/*!************************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/input-chip-group/input-chip-group.js ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputChipGroup": () => (/* binding */ InputChipGroup)
/* harmony export */ });
class InputChipGroup extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = InputChipGroup.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/input-dropdown/input-dropdown.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/input-dropdown/input-dropdown.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputDropdown": () => (/* binding */ InputDropdown)
/* harmony export */ });
const DROPDOWN_ATTRIBUTES = ['open']

class InputDropdown extends HTMLElement {
	static template

	static get observedAttributes() {
		return DROPDOWN_ATTRIBUTES
	}

	constructor() {
		super()

		const templateElement = InputDropdown.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined.')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/input-search/input-search.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/input-search/input-search.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputSearch": () => (/* binding */ InputSearch),
/* harmony export */   "SEARCH_ATTRIBUTES": () => (/* binding */ SEARCH_ATTRIBUTES),
/* harmony export */   "SEARCH_EVENTS": () => (/* binding */ SEARCH_EVENTS)
/* harmony export */ });
const SEARCH_ATTRIBUTES = [
	'disabled',
	'maxlength',
	'pattern',
	'placeholder',
	'required',
	'readonly',
	'size',

	'value',

	'incremental'
]

const SEARCH_EVENTS = ['blur', 'focus', 'keydown', 'keyup', 'input', 'change']

class InputSearch extends HTMLElement {
	static template

	static get observedAttributes() {
		return [...SEARCH_ATTRIBUTES]
	}

	constructor() {
		super()

		const templateElement = InputSearch.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	connectedCallback() {
		if (!this.isConnected) {
			return
		}
		const input = this.shadowRoot.getElementById('Input')
		input.addEventListener('change', this.#handleOnChange)
	}

	disconnectedCallback() {
		const input = this.shadowRoot.getElementById('Input')
		input.removeEventListener('change', this.#handleOnChange)
	}

	#handleOnChange = () => {
		this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))
	}

	attributeChangedCallback(name, _oldValue, newValue) {
		if (SEARCH_ATTRIBUTES.includes(name.trim().toLowerCase())) {
			const input = this.shadowRoot.getElementById('Input')
			if (newValue === null) {
				input.removeAttribute(name)
			} else {
				input.setAttribute(name, newValue)
			}
		}

		// unknown attribute?
	}

	set value(text) {
		const input = this.shadowRoot.getElementById('Input')
		input.value = text
	}

	get value() {
		const input = this.shadowRoot.getElementById('Input')
		return input.value
	}

	set disabled(value) {
		// for toggle attributes, use toggle
		this.toggleAttribute('disabled', value)
	}

	get disabled() {
		// because disabled is a toggle attribute, its presents is all that matters
		return this.hasAttribute('disabled')
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/input-text/input-text.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/input-text/input-text.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "INPUT_TEXT_ATTRIBUTES": () => (/* binding */ INPUT_TEXT_ATTRIBUTES),
/* harmony export */   "InputText": () => (/* binding */ InputText)
/* harmony export */ });
const INPUT_TEXT_ATTRIBUTES = {
	DISABLED: 'disabled',
	REQUIRED: 'required',
	READONLY: 'readonly',
	NAME: 'name',
	VALUE: 'value',
	MAX_LENGTH: 'maxlength',
	PATTERN: 'pattern',
	PLACEHOLDER: 'placeholder',
	STATE: 'state'
}

const INPUT_STATES = {
	ATLAS_INVALID: 'atlas--invalid'
}

class InputText extends HTMLElement {
	static template

	static get observedAttributes() {
		return Object.values(INPUT_TEXT_ATTRIBUTES)
	}

	constructor() {
		super()

		const templateElement = InputText.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined.')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	attributeChangedCallback(name, _oldValue, newValue) {
		this.#attributePassthrought(name, newValue, [INPUT_TEXT_ATTRIBUTES.STATE])
	}

	connectedCallback() {
		if (!this.isConnected) {
			return
		}

		this.#inputElem.addEventListener('change', this.#handleInputChange)
		this.#inputElem.addEventListener('invalid', this.#handleInputInvalid)
	}

	disconnectedCallback() {
		this.#inputElem.removeEventListener('change', this.#handleInputChange)
		this.#inputElem.removeEventListener('invalid', this.#handleInputInvalid)
	}

	#attributePassthrought(name, value, exclude = []) {
		if (exclude.includes(name)) {
			return
		}

		if (value === null) {
			this.#inputElem.removeAttribute(name)
		} else {
			this.#inputElem.setAttribute(name, value)
		}
	}

	#handleInputChange = ({ target }) => {
		this.dispatchEvent(new CustomEvent('change', { bubbles: true, composed: true }))

		const isValid = target.checkValidity()
		this.toggleAttribute(INPUT_STATES.ATLAS_INVALID, !isValid)
	}

	#handleInputInvalid = () => {
		this.dispatchEvent(new CustomEvent('invalid', { bubbles: true, composed: true }))
	}

	get #inputElem() {
		return this.shadowRoot.getElementById('Input')
	}

	get value() {
		return this.#inputElem.value
	}

	set value(value) {
		this.#inputElem.value = value
	}

	get disabled() {
		const disabledAttr = this.getAttribute('disabled')
		return disabledAttr !== null && disabledAttr !== 'false'
	}

	set disabled(value) {
		this.toggleAttribute('disabled', value)
	}

	checkValidity() {
		const isValid = this.#inputElem.checkValidity()
		this.toggleAttribute(INPUT_STATES.ATLAS_INVALID, !isValid)
		return isValid
	}

	get valid() {
		return this.#inputElem.validity.valid
	}

	set valid(value) {
		this.#inputElem.setCustomValidity(value ? '' : 'invalid')
		this.#inputElem.checkValidity()

		this.toggleAttribute(INPUT_STATES.ATLAS_INVALID, !value)
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/input-textarea/input-textarea.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/input-textarea/input-textarea.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InputTextarea": () => (/* binding */ InputTextarea)
/* harmony export */ });
const TEXTAREA_ATTRIBUTES = [
	'disabled',
	'maxlength',
	'placeholder',
	'required',
	'readonly',

	'name',
	'value'
]

class InputTextarea extends HTMLElement {
	static template

	static get observedAttributes() {
		return TEXTAREA_ATTRIBUTES
	}

	constructor() {
		super()

		const templateElement = InputTextarea.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined.')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}

	attributeChangedCallback(name, _oldValue, newValue) {
		if (TEXTAREA_ATTRIBUTES.includes(name.trim().toLowerCase())) {
			const input = this.shadowRoot.getElementById('Input')
			if (newValue === null) {
				input.removeAttribute(name)
			} else {
				input.setAttribute(name, newValue)
			}
		}

		// unknown attribute?
	}

	get value() {
		const inputElem = this.shadowRoot.getElementById('Input')
		return inputElem.value
	}

	set value(val) {
		const inputElem = this.shadowRoot.getElementById('Input')
		inputElem.value = val
	}

	get disabled() {
		const dis = this.getAttribute('disabled')
		return dis !== null && dis !== 'false'
	}

	set disabled(value) {
		this.toggleAttribute('disabled', value)
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/logo/logo.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/logo/logo.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Logo": () => (/* binding */ Logo)
/* harmony export */ });
class Logo extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = Logo.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/main-nav-item/main-nav-item.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/main-nav-item/main-nav-item.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ERROR_TEMPLATE_UNDEFINED": () => (/* binding */ ERROR_TEMPLATE_UNDEFINED),
/* harmony export */   "MainNavItem": () => (/* binding */ MainNavItem)
/* harmony export */ });
const ERROR_TEMPLATE_UNDEFINED = 'Template undefined.'

class MainNavItem extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = MainNavItem.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error(ERROR_TEMPLATE_UNDEFINED)
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/main-nav/main-nav.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/main-nav/main-nav.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MainNav": () => (/* binding */ MainNav)
/* harmony export */ });
class MainNav extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = MainNav.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/number-display/abbreviate-number.js":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/number-display/abbreviate-number.js ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ abbreviateNumber)
/* harmony export */ });
function abbreviateNumber(value, language = 'en') {
	const DIGITS = 0
	const BASE_10 = 10
	const TRESHOLD_DIFF = 1
	const ZEROS_TO_M = 6
	const ZEROS_TO_K = 3

	const number = parseFloat(value)
	if (Number.isNaN(number)) {
		throw new TypeError('Input is not a Number')
	}

	const DECIMALS = {
		millionth: {
			refValue: BASE_10 ** ZEROS_TO_M,
			label: { en: 'M' }
		},
		thousandth: {
			refValue: BASE_10 ** ZEROS_TO_K,
			label: { en: 'K' }
		}
	}

	const abbreviatedNumber = Object.values(DECIMALS)
		.sort((a, b) => b.refValue - a.refValue)
		.reduce((acc, cur) => {
			const threshold = cur.refValue - TRESHOLD_DIFF

			if (acc) {
				return acc
			}

			if (number > threshold) {
				return (number / cur.refValue).toFixed(DIGITS) + cur.label[language]
			}

			return ''
		}, '')

	return abbreviatedNumber
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/number-display/number-display.js":
/*!********************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/number-display/number-display.js ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NumberDisplay": () => (/* binding */ NumberDisplay)
/* harmony export */ });
/* harmony import */ var _abbreviate_number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./abbreviate-number.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/number-display/abbreviate-number.js");


const BASE_10 = 10
const attrs = { SHORT: 'short', VALUE: 'value', DIGITS: 'float-digits', INT: 'int' }
const OBSERVED_ATTRIBUTES = Object.values(attrs)
const INVALID_TEXT = 'Value is not a valid number'
const DEFAULT_TEXT = ''
const LANG = 'en'

class NumberDisplay extends HTMLElement {
	static get observedAttributes() {
		return OBSERVED_ATTRIBUTES
	}

	static validateValue(value) {
		if (!value) {
			return DEFAULT_TEXT
		}

		const numberValue = parseFloat(value)

		if (Number.isNaN(numberValue)) {
			return INVALID_TEXT
		}

		return numberValue
	}

	decimalSeparator = {
		en: ','
	}

	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}

	static addSymbolToNumber(number) {
		const shortNumber = (0,_abbreviate_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(number, LANG)
		return shortNumber
	}

	getTextContent(value) {
		const { int, short } = this.attributes
		if (short && short.value !== 'false') {
			return NumberDisplay.addSymbolToNumber(value)
		}

		if (int && int.value !== 'false') {
			return parseInt(value, BASE_10).toString()
		}

		const separator = this.decimalSeparator[LANG]

		const checkFloatDigit = parseInt(this.attributes[attrs.DIGITS]?.value, BASE_10)
		if (checkFloatDigit) {
			const fixedValue = value.toFixed(this.attributes[attrs.DIGITS].value)
			return fixedValue.toString().replace('.', separator)
		}

		return value.toString().replace('.', separator)
	}

	attributeChangedCallback() {
		const currentValue = NumberDisplay.validateValue(this.attributes.value?.value)
		const valueIsNumber = typeof currentValue === 'number'

		this.shadowRoot.textContent = valueIsNumber ? this.getTextContent(currentValue) : currentValue
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/page/page.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/page/page.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Page": () => (/* binding */ Page)
/* harmony export */ });
class Page extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = Page.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/profile-control/profile-control.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/profile-control/profile-control.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProfileControl": () => (/* binding */ ProfileControl)
/* harmony export */ });
class ProfileControl extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = ProfileControl.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/snackbar/snackbar.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/snackbar/snackbar.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Snackbar": () => (/* binding */ Snackbar)
/* harmony export */ });
class Snackbar extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = Snackbar.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/stepper-step/stepper-step.js":
/*!****************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/stepper-step/stepper-step.js ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "STEPPER_STEP_ATTRIBUTES": () => (/* binding */ STEPPER_STEP_ATTRIBUTES),
/* harmony export */   "StepperStep": () => (/* binding */ StepperStep)
/* harmony export */ });
const STEPPER_STEP_ATTRIBUTES = ['finished', 'current']

class StepperStep extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = StepperStep.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/stepper/stepper.js":
/*!******************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/stepper/stepper.js ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Stepper": () => (/* binding */ Stepper)
/* harmony export */ });
class Stepper extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = Stepper.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/tile-board-tile/tile-board-tile.js":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/tile-board-tile/tile-board-tile.js ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TileBoardTile": () => (/* binding */ TileBoardTile)
/* harmony export */ });
class TileBoardTile extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = TileBoardTile.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/tile-board/tile-board.js":
/*!************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/tile-board/tile-board.js ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TileBoard": () => (/* binding */ TileBoard)
/* harmony export */ });
class TileBoard extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = TileBoard.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/workflow-step/workflow-step.js":
/*!******************************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/workflow-step/workflow-step.js ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "WORKFLOW_STEP_ATTRIBUTES": () => (/* binding */ WORKFLOW_STEP_ATTRIBUTES),
/* harmony export */   "WorkflowStep": () => (/* binding */ WorkflowStep)
/* harmony export */ });
const WORKFLOW_STEP_ATTRIBUTES = ['name', 'hero', 'active', 'hide-stepper']

class WorkflowStep extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = WorkflowStep.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/workflow/workflow.js":
/*!********************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/workflow/workflow.js ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Workflow": () => (/* binding */ Workflow)
/* harmony export */ });
class Workflow extends HTMLElement {
	static template

	constructor() {
		super()

		const templateElement = Workflow.template

		if (templateElement === undefined || templateElement === null) {
			throw new Error('Template undefined')
		}

		const { content } = templateElement
		const shadowRoot = this.attachShadow({ mode: 'open' })
		shadowRoot.appendChild(content.cloneNode(true))
	}
}


/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ALERT_EVENTS": () => (/* reexport safe */ _custom_elements_alert_alert_js__WEBPACK_IMPORTED_MODULE_0__.ALERT_EVENTS),
/* harmony export */   "ATTR_NAME": () => (/* reexport safe */ _custom_elements_icon_icon_js__WEBPACK_IMPORTED_MODULE_9__.ATTR_NAME),
/* harmony export */   "AVATAR_ATTRIBUTES": () => (/* reexport safe */ _custom_elements_avatar_avatar_js__WEBPACK_IMPORTED_MODULE_2__.AVATAR_ATTRIBUTES),
/* harmony export */   "Accordion": () => (/* reexport safe */ _custom_elements_accordion_accordion_js__WEBPACK_IMPORTED_MODULE_28__.Accordion),
/* harmony export */   "Alert": () => (/* reexport safe */ _custom_elements_alert_alert_js__WEBPACK_IMPORTED_MODULE_0__.Alert),
/* harmony export */   "ApplicationFrame": () => (/* reexport safe */ _custom_elements_application_frame_application_frame_js__WEBPACK_IMPORTED_MODULE_1__.ApplicationFrame),
/* harmony export */   "Avatar": () => (/* reexport safe */ _custom_elements_avatar_avatar_js__WEBPACK_IMPORTED_MODULE_2__.Avatar),
/* harmony export */   "BUTTON_ATTRIBUTES": () => (/* reexport safe */ _custom_elements_button_button_js__WEBPACK_IMPORTED_MODULE_4__.BUTTON_ATTRIBUTES),
/* harmony export */   "Button": () => (/* reexport safe */ _custom_elements_button_button_js__WEBPACK_IMPORTED_MODULE_4__.Button),
/* harmony export */   "ButtonSet": () => (/* reexport safe */ _custom_elements_button_set_button_set_js__WEBPACK_IMPORTED_MODULE_3__.ButtonSet),
/* harmony export */   "CHECKBOX_ATTRIBUTES": () => (/* reexport safe */ _custom_elements_input_checkbox_input_checkbox_js__WEBPACK_IMPORTED_MODULE_10__.CHECKBOX_ATTRIBUTES),
/* harmony export */   "Chip": () => (/* reexport safe */ _custom_elements_chip_chip_js__WEBPACK_IMPORTED_MODULE_6__.Chip),
/* harmony export */   "ChipGroup": () => (/* reexport safe */ _custom_elements_chip_group_chip_group_js__WEBPACK_IMPORTED_MODULE_5__.ChipGroup),
/* harmony export */   "DISPLAY": () => (/* reexport safe */ _custom_elements_avatar_avatar_js__WEBPACK_IMPORTED_MODULE_2__.DISPLAY),
/* harmony export */   "Dialog": () => (/* reexport safe */ _custom_elements_dialog_dialog_js__WEBPACK_IMPORTED_MODULE_7__.Dialog),
/* harmony export */   "ERROR_TEMPLATE_UNDEFINED": () => (/* reexport safe */ _custom_elements_main_nav_item_main_nav_item_js__WEBPACK_IMPORTED_MODULE_17__.ERROR_TEMPLATE_UNDEFINED),
/* harmony export */   "Feed": () => (/* reexport safe */ _custom_elements_feed_feed_js__WEBPACK_IMPORTED_MODULE_8__.Feed),
/* harmony export */   "INPUT_TEXT_ATTRIBUTES": () => (/* reexport safe */ _custom_elements_input_text_input_text_js__WEBPACK_IMPORTED_MODULE_15__.INPUT_TEXT_ATTRIBUTES),
/* harmony export */   "Icon": () => (/* reexport safe */ _custom_elements_icon_icon_js__WEBPACK_IMPORTED_MODULE_9__.Icon),
/* harmony export */   "InputCheckbox": () => (/* reexport safe */ _custom_elements_input_checkbox_input_checkbox_js__WEBPACK_IMPORTED_MODULE_10__.InputCheckbox),
/* harmony export */   "InputChipGroup": () => (/* reexport safe */ _custom_elements_input_chip_group_input_chip_group_js__WEBPACK_IMPORTED_MODULE_11__.InputChipGroup),
/* harmony export */   "InputDropdown": () => (/* reexport safe */ _custom_elements_input_dropdown_input_dropdown_js__WEBPACK_IMPORTED_MODULE_12__.InputDropdown),
/* harmony export */   "InputSearch": () => (/* reexport safe */ _custom_elements_input_search_input_search_js__WEBPACK_IMPORTED_MODULE_13__.InputSearch),
/* harmony export */   "InputText": () => (/* reexport safe */ _custom_elements_input_text_input_text_js__WEBPACK_IMPORTED_MODULE_15__.InputText),
/* harmony export */   "InputTextarea": () => (/* reexport safe */ _custom_elements_input_textarea_input_textarea_js__WEBPACK_IMPORTED_MODULE_14__.InputTextarea),
/* harmony export */   "Logo": () => (/* reexport safe */ _custom_elements_logo_logo_js__WEBPACK_IMPORTED_MODULE_16__.Logo),
/* harmony export */   "MODAL_EVENTS": () => (/* reexport safe */ _custom_elements_dialog_dialog_js__WEBPACK_IMPORTED_MODULE_7__.MODAL_EVENTS),
/* harmony export */   "MainNav": () => (/* reexport safe */ _custom_elements_main_nav_main_nav_js__WEBPACK_IMPORTED_MODULE_18__.MainNav),
/* harmony export */   "MainNavItem": () => (/* reexport safe */ _custom_elements_main_nav_item_main_nav_item_js__WEBPACK_IMPORTED_MODULE_17__.MainNavItem),
/* harmony export */   "NumberDisplay": () => (/* reexport safe */ _custom_elements_number_display_number_display_js__WEBPACK_IMPORTED_MODULE_19__.NumberDisplay),
/* harmony export */   "Page": () => (/* reexport safe */ _custom_elements_page_page_js__WEBPACK_IMPORTED_MODULE_20__.Page),
/* harmony export */   "ProfileControl": () => (/* reexport safe */ _custom_elements_profile_control_profile_control_js__WEBPACK_IMPORTED_MODULE_21__.ProfileControl),
/* harmony export */   "SEARCH_ATTRIBUTES": () => (/* reexport safe */ _custom_elements_input_search_input_search_js__WEBPACK_IMPORTED_MODULE_13__.SEARCH_ATTRIBUTES),
/* harmony export */   "SEARCH_EVENTS": () => (/* reexport safe */ _custom_elements_input_search_input_search_js__WEBPACK_IMPORTED_MODULE_13__.SEARCH_EVENTS),
/* harmony export */   "STEPPER_STEP_ATTRIBUTES": () => (/* reexport safe */ _custom_elements_stepper_step_stepper_step_js__WEBPACK_IMPORTED_MODULE_23__.STEPPER_STEP_ATTRIBUTES),
/* harmony export */   "Snackbar": () => (/* reexport safe */ _custom_elements_snackbar_snackbar_js__WEBPACK_IMPORTED_MODULE_29__.Snackbar),
/* harmony export */   "Stepper": () => (/* reexport safe */ _custom_elements_stepper_stepper_js__WEBPACK_IMPORTED_MODULE_22__.Stepper),
/* harmony export */   "StepperStep": () => (/* reexport safe */ _custom_elements_stepper_step_stepper_step_js__WEBPACK_IMPORTED_MODULE_23__.StepperStep),
/* harmony export */   "TileBoard": () => (/* reexport safe */ _custom_elements_tile_board_tile_board_js__WEBPACK_IMPORTED_MODULE_25__.TileBoard),
/* harmony export */   "TileBoardTile": () => (/* reexport safe */ _custom_elements_tile_board_tile_tile_board_tile_js__WEBPACK_IMPORTED_MODULE_24__.TileBoardTile),
/* harmony export */   "WORKFLOW_STEP_ATTRIBUTES": () => (/* reexport safe */ _custom_elements_workflow_step_workflow_step_js__WEBPACK_IMPORTED_MODULE_27__.WORKFLOW_STEP_ATTRIBUTES),
/* harmony export */   "Workflow": () => (/* reexport safe */ _custom_elements_workflow_workflow_js__WEBPACK_IMPORTED_MODULE_26__.Workflow),
/* harmony export */   "WorkflowStep": () => (/* reexport safe */ _custom_elements_workflow_step_workflow_step_js__WEBPACK_IMPORTED_MODULE_27__.WorkflowStep)
/* harmony export */ });
/* harmony import */ var _custom_elements_alert_alert_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./custom-elements/alert/alert.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/alert/alert.js");
/* harmony import */ var _custom_elements_application_frame_application_frame_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./custom-elements/application-frame/application-frame.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/application-frame/application-frame.js");
/* harmony import */ var _custom_elements_avatar_avatar_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./custom-elements/avatar/avatar.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/avatar/avatar.js");
/* harmony import */ var _custom_elements_button_set_button_set_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./custom-elements/button-set/button-set.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/button-set/button-set.js");
/* harmony import */ var _custom_elements_button_button_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./custom-elements/button/button.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/button/button.js");
/* harmony import */ var _custom_elements_chip_group_chip_group_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./custom-elements/chip-group/chip-group.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/chip-group/chip-group.js");
/* harmony import */ var _custom_elements_chip_chip_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./custom-elements/chip/chip.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/chip/chip.js");
/* harmony import */ var _custom_elements_dialog_dialog_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./custom-elements/dialog/dialog.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/dialog/dialog.js");
/* harmony import */ var _custom_elements_feed_feed_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./custom-elements/feed/feed.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/feed/feed.js");
/* harmony import */ var _custom_elements_icon_icon_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./custom-elements/icon/icon.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/icon/icon.js");
/* harmony import */ var _custom_elements_input_checkbox_input_checkbox_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./custom-elements/input-checkbox/input-checkbox.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/input-checkbox/input-checkbox.js");
/* harmony import */ var _custom_elements_input_chip_group_input_chip_group_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./custom-elements/input-chip-group/input-chip-group.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/input-chip-group/input-chip-group.js");
/* harmony import */ var _custom_elements_input_dropdown_input_dropdown_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./custom-elements/input-dropdown/input-dropdown.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/input-dropdown/input-dropdown.js");
/* harmony import */ var _custom_elements_input_search_input_search_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./custom-elements/input-search/input-search.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/input-search/input-search.js");
/* harmony import */ var _custom_elements_input_textarea_input_textarea_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./custom-elements/input-textarea/input-textarea.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/input-textarea/input-textarea.js");
/* harmony import */ var _custom_elements_input_text_input_text_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./custom-elements/input-text/input-text.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/input-text/input-text.js");
/* harmony import */ var _custom_elements_logo_logo_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./custom-elements/logo/logo.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/logo/logo.js");
/* harmony import */ var _custom_elements_main_nav_item_main_nav_item_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./custom-elements/main-nav-item/main-nav-item.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/main-nav-item/main-nav-item.js");
/* harmony import */ var _custom_elements_main_nav_main_nav_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./custom-elements/main-nav/main-nav.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/main-nav/main-nav.js");
/* harmony import */ var _custom_elements_number_display_number_display_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./custom-elements/number-display/number-display.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/number-display/number-display.js");
/* harmony import */ var _custom_elements_page_page_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./custom-elements/page/page.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/page/page.js");
/* harmony import */ var _custom_elements_profile_control_profile_control_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./custom-elements/profile-control/profile-control.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/profile-control/profile-control.js");
/* harmony import */ var _custom_elements_stepper_stepper_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./custom-elements/stepper/stepper.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/stepper/stepper.js");
/* harmony import */ var _custom_elements_stepper_step_stepper_step_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./custom-elements/stepper-step/stepper-step.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/stepper-step/stepper-step.js");
/* harmony import */ var _custom_elements_tile_board_tile_tile_board_tile_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./custom-elements/tile-board-tile/tile-board-tile.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/tile-board-tile/tile-board-tile.js");
/* harmony import */ var _custom_elements_tile_board_tile_board_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./custom-elements/tile-board/tile-board.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/tile-board/tile-board.js");
/* harmony import */ var _custom_elements_workflow_workflow_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./custom-elements/workflow/workflow.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/workflow/workflow.js");
/* harmony import */ var _custom_elements_workflow_step_workflow_step_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./custom-elements/workflow-step/workflow-step.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/workflow-step/workflow-step.js");
/* harmony import */ var _custom_elements_accordion_accordion_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./custom-elements/accordion/accordion.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/accordion/accordion.js");
/* harmony import */ var _custom_elements_snackbar_snackbar_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./custom-elements/snackbar/snackbar.js */ "./node_modules/@cision/atlas-raw-components/src/custom-elements/snackbar/snackbar.js");
































/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************************!*\
  !*** ./src/components/number-display.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");


if (!customElements.get('atlas-number-display')) {
	customElements.define('atlas-number-display', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_0__.NumberDisplay)
}

})();

/******/ })()
;
//# sourceMappingURL=number-display.js.map