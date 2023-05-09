/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@cision/atlas-raw-components/src/custom-elements/accordion/accordion.js":
/*!**********************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/custom-elements/accordion/accordion.js ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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

"use strict";
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
































/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/index.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/index.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "accordionTemplate": () => (/* reexport safe */ _accordion_html__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "alertTemplate": () => (/* reexport safe */ _alert_html__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "applicationFrameTemplate": () => (/* reexport safe */ _application_frame_html__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "avatarTemplate": () => (/* reexport safe */ _avatar_html__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "buttonSetTemplate": () => (/* reexport safe */ _button_set_html__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "buttonTemplate": () => (/* reexport safe */ _button_html__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "chipGroupTemplate": () => (/* reexport safe */ _chip_group_html__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "chipTemplate": () => (/* reexport safe */ _chip_html__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "dialogTemplate": () => (/* reexport safe */ _dialog_html__WEBPACK_IMPORTED_MODULE_8__["default"]),
/* harmony export */   "feedTemplate": () => (/* reexport safe */ _feed_html__WEBPACK_IMPORTED_MODULE_9__["default"]),
/* harmony export */   "inputCheckboxTemplate": () => (/* reexport safe */ _input_checkbox_html__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "inputChipGroupTemplate": () => (/* reexport safe */ _input_chip_group_html__WEBPACK_IMPORTED_MODULE_11__["default"]),
/* harmony export */   "inputDropdownTemplate": () => (/* reexport safe */ _input_dropdown_html__WEBPACK_IMPORTED_MODULE_12__["default"]),
/* harmony export */   "inputSearchTemplate": () => (/* reexport safe */ _input_search_html__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "inputTextTemplate": () => (/* reexport safe */ _input_text_html__WEBPACK_IMPORTED_MODULE_14__["default"]),
/* harmony export */   "inputTextareaTemplate": () => (/* reexport safe */ _input_textarea_html__WEBPACK_IMPORTED_MODULE_15__["default"]),
/* harmony export */   "logoTemplate": () => (/* reexport safe */ _logo_html__WEBPACK_IMPORTED_MODULE_16__["default"]),
/* harmony export */   "mainNavItemTemplate": () => (/* reexport safe */ _main_nav_item_html__WEBPACK_IMPORTED_MODULE_17__["default"]),
/* harmony export */   "mainNavTemplate": () => (/* reexport safe */ _main_nav_html__WEBPACK_IMPORTED_MODULE_18__["default"]),
/* harmony export */   "pageTemplate": () => (/* reexport safe */ _page_html__WEBPACK_IMPORTED_MODULE_19__["default"]),
/* harmony export */   "profileControlTemplate": () => (/* reexport safe */ _profile_control_html__WEBPACK_IMPORTED_MODULE_20__["default"]),
/* harmony export */   "snackbarTemplate": () => (/* reexport safe */ _snackbar_html__WEBPACK_IMPORTED_MODULE_21__["default"]),
/* harmony export */   "stepperStepTemplate": () => (/* reexport safe */ _stepper_step_html__WEBPACK_IMPORTED_MODULE_22__["default"]),
/* harmony export */   "stepperTemplate": () => (/* reexport safe */ _stepper_html__WEBPACK_IMPORTED_MODULE_23__["default"]),
/* harmony export */   "tileBoardTemplate": () => (/* reexport safe */ _tile_board_html__WEBPACK_IMPORTED_MODULE_24__["default"]),
/* harmony export */   "tileBoardTileTemplate": () => (/* reexport safe */ _tile_board_tile_html__WEBPACK_IMPORTED_MODULE_25__["default"]),
/* harmony export */   "workflowStepTemplate": () => (/* reexport safe */ _workflow_step_html__WEBPACK_IMPORTED_MODULE_26__["default"]),
/* harmony export */   "workflowTemplate": () => (/* reexport safe */ _workflow_html__WEBPACK_IMPORTED_MODULE_27__["default"])
/* harmony export */ });
/* harmony import */ var _accordion_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accordion.html */ "./node_modules/@cision/atlas-raw-components/src/templates/accordion.html");
/* harmony import */ var _alert_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alert.html */ "./node_modules/@cision/atlas-raw-components/src/templates/alert.html");
/* harmony import */ var _application_frame_html__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./application-frame.html */ "./node_modules/@cision/atlas-raw-components/src/templates/application-frame.html");
/* harmony import */ var _avatar_html__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./avatar.html */ "./node_modules/@cision/atlas-raw-components/src/templates/avatar.html");
/* harmony import */ var _button_set_html__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./button-set.html */ "./node_modules/@cision/atlas-raw-components/src/templates/button-set.html");
/* harmony import */ var _button_html__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./button.html */ "./node_modules/@cision/atlas-raw-components/src/templates/button.html");
/* harmony import */ var _chip_group_html__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./chip-group.html */ "./node_modules/@cision/atlas-raw-components/src/templates/chip-group.html");
/* harmony import */ var _chip_html__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./chip.html */ "./node_modules/@cision/atlas-raw-components/src/templates/chip.html");
/* harmony import */ var _dialog_html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dialog.html */ "./node_modules/@cision/atlas-raw-components/src/templates/dialog.html");
/* harmony import */ var _feed_html__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./feed.html */ "./node_modules/@cision/atlas-raw-components/src/templates/feed.html");
/* harmony import */ var _input_checkbox_html__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./input-checkbox.html */ "./node_modules/@cision/atlas-raw-components/src/templates/input-checkbox.html");
/* harmony import */ var _input_chip_group_html__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./input-chip-group.html */ "./node_modules/@cision/atlas-raw-components/src/templates/input-chip-group.html");
/* harmony import */ var _input_dropdown_html__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./input-dropdown.html */ "./node_modules/@cision/atlas-raw-components/src/templates/input-dropdown.html");
/* harmony import */ var _input_search_html__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./input-search.html */ "./node_modules/@cision/atlas-raw-components/src/templates/input-search.html");
/* harmony import */ var _input_text_html__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./input-text.html */ "./node_modules/@cision/atlas-raw-components/src/templates/input-text.html");
/* harmony import */ var _input_textarea_html__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./input-textarea.html */ "./node_modules/@cision/atlas-raw-components/src/templates/input-textarea.html");
/* harmony import */ var _logo_html__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./logo.html */ "./node_modules/@cision/atlas-raw-components/src/templates/logo.html");
/* harmony import */ var _main_nav_item_html__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./main-nav-item.html */ "./node_modules/@cision/atlas-raw-components/src/templates/main-nav-item.html");
/* harmony import */ var _main_nav_html__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./main-nav.html */ "./node_modules/@cision/atlas-raw-components/src/templates/main-nav.html");
/* harmony import */ var _page_html__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./page.html */ "./node_modules/@cision/atlas-raw-components/src/templates/page.html");
/* harmony import */ var _profile_control_html__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./profile-control.html */ "./node_modules/@cision/atlas-raw-components/src/templates/profile-control.html");
/* harmony import */ var _snackbar_html__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./snackbar.html */ "./node_modules/@cision/atlas-raw-components/src/templates/snackbar.html");
/* harmony import */ var _stepper_step_html__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./stepper-step.html */ "./node_modules/@cision/atlas-raw-components/src/templates/stepper-step.html");
/* harmony import */ var _stepper_html__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./stepper.html */ "./node_modules/@cision/atlas-raw-components/src/templates/stepper.html");
/* harmony import */ var _tile_board_html__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./tile-board.html */ "./node_modules/@cision/atlas-raw-components/src/templates/tile-board.html");
/* harmony import */ var _tile_board_tile_html__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./tile-board-tile.html */ "./node_modules/@cision/atlas-raw-components/src/templates/tile-board-tile.html");
/* harmony import */ var _workflow_step_html__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./workflow-step.html */ "./node_modules/@cision/atlas-raw-components/src/templates/workflow-step.html");
/* harmony import */ var _workflow_html__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./workflow.html */ "./node_modules/@cision/atlas-raw-components/src/templates/workflow.html");
































/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/accordion.css":
/*!********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/accordion.css ***!
  \********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-accordion {\n\t\t--atlas-accordion-border-radius: 0.5rem;\n\t\t--atlas-accordion-header-padding-block: 1.125rem;\n\t\t--atlas-accordion-header-padding-inline: 1.25rem;\n\t\t--atlas-accordion-title-font-size: 1.125rem;\n\t\t--atlas-accordion-title-line-height: 1.5rem;\n\t\t--atlas-accordion-body-padding-inline: 1.25rem;\n\t\t--atlas-accordion-body-padding-block: 1.25rem;\n\n\t\tbackground: var(--atlas-color-primary-n50);\n\t\tborder-radius: var(--atlas-accordion-border-radius);\n\t\tbackground-clip: border-box;\n\t\twidth: 100%;\n\t}\n\n\tatlas-accordion,\n\tatlas-accordion::part(header) {\n\t\tdisplay: block;\n\t}\n\n\tatlas-accordion atlas-button[kind=\"generic\"]::part(label) {\n\t\tfont-size: var(--atlas-accordion-title-font-size);\n\t\tline-height: var(--atlas-accordion-title-line-height);\n\t}\n\n\tatlas-accordion atlas-button[kind=\"generic\"] {\n\t\tdisplay: block;\n\t}\n\n\tatlas-accordion > atlas-button[kind=\"generic\"]::part(button) {\n\t\twidth: 100%;\n\t\ttext-align: initial;\n\t\tbox-sizing: border-box;\n\t\tjustify-content: space-between;\n\t\tborder-radius: var(--atlas-accordion-border-radius);\n\t\tpadding-block: var(--atlas-accordion-header-padding-block);\n\t\tpadding-inline: var(--atlas-accordion-header-padding-inline);\n\t}\n\n\tatlas-accordion[expanded=\"false\"] > atlas-button[kind=\"generic\"]:hover,\n\tatlas-accordion:not([expanded]) > atlas-button[kind=\"generic\"]:hover {\n\t\tbox-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);\n\t\tborder-radius: var(--atlas-accordion-border-radius);\n\t}\n\n\tatlas-accordion > atlas-button[kind=\"generic\"] > atlas-icon {\n\t\tfont-size: 0.5rem;\n\t}\n\n\tatlas-accordion[expanded]:not([expanded=\"false\"]) > atlas-button[kind=\"generic\"] > atlas-icon {\n\t\ttransform: rotate(180deg);\n\t}\n\n\tatlas-accordion::part(body) {\n\t\tdisplay: none;\n\t\tpadding-inline: var(--atlas-accordion-body-padding-inline);\n\t\tpadding-block: 0 var(--atlas-accordion-body-padding-block);\n\t}\n\n\tatlas-accordion[expanded]:not([expanded=\"false\"])::part(body) {\n\t\tdisplay: block;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/accordion.css"],"names":[],"mappings":"AAAA;CACC;EACC,uCAAuC;EACvC,gDAAgD;EAChD,gDAAgD;EAChD,2CAA2C;EAC3C,2CAA2C;EAC3C,8CAA8C;EAC9C,6CAA6C;;EAE7C,0CAA0C;EAC1C,mDAAmD;EACnD,2BAA2B;EAC3B,WAAW;CACZ;;CAEA;;EAEC,cAAc;CACf;;CAEA;EACC,iDAAiD;EACjD,qDAAqD;CACtD;;CAEA;EACC,cAAc;CACf;;CAEA;EACC,WAAW;EACX,mBAAmB;EACnB,sBAAsB;EACtB,8BAA8B;EAC9B,mDAAmD;EACnD,0DAA0D;EAC1D,4DAA4D;CAC7D;;CAEA;;EAEC,wCAAwC;EACxC,mDAAmD;CACpD;;CAEA;EACC,iBAAiB;CAClB;;CAEA;EACC,yBAAyB;CAC1B;;CAEA;EACC,aAAa;EACb,0DAA0D;EAC1D,0DAA0D;CAC3D;;CAEA;EACC,cAAc;CACf;AACD","sourcesContent":["@layer atlas {\n\tatlas-accordion {\n\t\t--atlas-accordion-border-radius: 0.5rem;\n\t\t--atlas-accordion-header-padding-block: 1.125rem;\n\t\t--atlas-accordion-header-padding-inline: 1.25rem;\n\t\t--atlas-accordion-title-font-size: 1.125rem;\n\t\t--atlas-accordion-title-line-height: 1.5rem;\n\t\t--atlas-accordion-body-padding-inline: 1.25rem;\n\t\t--atlas-accordion-body-padding-block: 1.25rem;\n\n\t\tbackground: var(--atlas-color-primary-n50);\n\t\tborder-radius: var(--atlas-accordion-border-radius);\n\t\tbackground-clip: border-box;\n\t\twidth: 100%;\n\t}\n\n\tatlas-accordion,\n\tatlas-accordion::part(header) {\n\t\tdisplay: block;\n\t}\n\n\tatlas-accordion atlas-button[kind=\"generic\"]::part(label) {\n\t\tfont-size: var(--atlas-accordion-title-font-size);\n\t\tline-height: var(--atlas-accordion-title-line-height);\n\t}\n\n\tatlas-accordion atlas-button[kind=\"generic\"] {\n\t\tdisplay: block;\n\t}\n\n\tatlas-accordion > atlas-button[kind=\"generic\"]::part(button) {\n\t\twidth: 100%;\n\t\ttext-align: initial;\n\t\tbox-sizing: border-box;\n\t\tjustify-content: space-between;\n\t\tborder-radius: var(--atlas-accordion-border-radius);\n\t\tpadding-block: var(--atlas-accordion-header-padding-block);\n\t\tpadding-inline: var(--atlas-accordion-header-padding-inline);\n\t}\n\n\tatlas-accordion[expanded=\"false\"] > atlas-button[kind=\"generic\"]:hover,\n\tatlas-accordion:not([expanded]) > atlas-button[kind=\"generic\"]:hover {\n\t\tbox-shadow: 0 2px 2px rgba(0, 0, 0, 0.1);\n\t\tborder-radius: var(--atlas-accordion-border-radius);\n\t}\n\n\tatlas-accordion > atlas-button[kind=\"generic\"] > atlas-icon {\n\t\tfont-size: 0.5rem;\n\t}\n\n\tatlas-accordion[expanded]:not([expanded=\"false\"]) > atlas-button[kind=\"generic\"] > atlas-icon {\n\t\ttransform: rotate(180deg);\n\t}\n\n\tatlas-accordion::part(body) {\n\t\tdisplay: none;\n\t\tpadding-inline: var(--atlas-accordion-body-padding-inline);\n\t\tpadding-block: 0 var(--atlas-accordion-body-padding-block);\n\t}\n\n\tatlas-accordion[expanded]:not([expanded=\"false\"])::part(body) {\n\t\tdisplay: block;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/alert.css":
/*!****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/alert.css ***!
  \****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-alert {\n\t\t--alert-dialog-color: var(--atlas-color-primary-n400);\n\t\t--alert-dialog-width: 37em;\n\t\t--alert-dialog-height: 14em;\n\t\t--alert-dialog-padding-block: 2.5em 1.5em;\n\t\t--alert-dialog-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.2);\n\n\t\t--alert-icon-size: 1.22em;\n\n\t\t--alert-header-margin-inline-start: 0.6em;\n\t\t--alert-header-font-size: 1.5em;\n\t\t--alert-header-font-weight: 600;\n\n\t\t--alert-body-padding-inline: 5.5em;\n\t\t--alert-body-font-size: 1em;\n\t\t--alert-body-line-height: 1.4em;\n\t\t--alert-body-font-weight: 400;\n\n\t\t--icon-color: inherit;\n\t\t--button-background-color: inherit;\n\t\t--button-background-color-hover: inherit;\n\n\t\tdisplay: none;\n\t\theight: 100vh;\n\t\talign-items: center;\n\t}\n\n\tatlas-alert[open]:not([open=\"false\"]) {\n\t\tdisplay: flex;\n\t}\n\n\tatlas-alert::part(dialog) {\n\t\tdisplay: grid;\n\t\tgrid-template-rows: 1fr 1fr 2fr;\n\t\tgrid-template-columns: 4.5em auto;\n\t\tgrid-template-areas:\n\t\t\t\"icon header\"\n\t\t\t\"body body\"\n\t\t\t\"footer footer\";\n\n\t\tmax-width: var(--alert-dialog-width);\n\t\tmax-height: var(--alert-dialog-height);\n\n\t\tborder: none;\n\t\tborder-radius: var(--atlas-dialog-border-radius);\n\n\t\tpadding-inline: 0;\n\t\tpadding-block: var(--alert-dialog-padding-block);\n\n\t\tcolor: var(--alert-dialog-color);\n\n\t\tbox-shadow: var(--alert-dialog-box-shadow);\n\t}\n\n\tatlas-alert::part(icon),\n\tatlas-alert::part(header),\n\tatlas-alert::part(body) {\n\t\tdisplay: block;\n\t}\n\n\tatlas-alert::part(icon) {\n\t\tgrid-area: icon;\n\n\t\tmargin-left: auto;\n\t\tfont-size: var(--alert-icon-size);\n\t}\n\n\tatlas-alert::part(header) {\n\t\tgrid-area: header;\n\n\t\tmargin-inline-start: var(--alert-header-margin-inline-start);\n\t\tfont-size: var(--alert-header-font-size);\n\t\tfont-weight: var(--alert-header-font-weight);\n\t}\n\n\tatlas-alert::part(body) {\n\t\tgrid-area: body;\n\n\t\tpadding-inline: var(--alert-body-padding-inline);\n\t\tfont-size: var(--alert-body-font-size);\n\t\tline-height: var(--alert-body-line-height);\n\t\tfont-weight: var(--alert-body-font-weight);\n\t}\n\n\tatlas-alert::part(footer) {\n\t\tdisplay: flex;\n\t\talign-self: end;\n\t\tmargin-inline: auto;\n\t\tgrid-area: footer;\n\t}\n\n\t/* ALERT TYPE SETTINGS */\n\tatlas-alert[type] > atlas-button-set > [box-type=\"primary\"] {\n\t\tbackground-color: var(--button-background-color);\n\n\t\t--primary-border-color: var(--atlas-dialog-color-semantic-danger);\n\t}\n\n\tatlas-alert[type] > atlas-button-set > [box-type=\"primary\"]:hover {\n\t\tbackground-color: var(--button-background-color-hover);\n\t\tcolor: var(--button-color-hover);\n\t\tbox-shadow: var(--dialog-button-danger-shadow);\n\t}\n\n\tatlas-alert[type] > atlas-button-set > [box-type=\"primary\"]:active {\n\t\t--dialog-button-danger-shadow: none;\n\n\t\tbackground-color: var(--button-background-color-hover);\n\t}\n\n\tatlas-alert[type] > atlas-icon {\n\t\tcolor: var(--icon-color);\n\t}\n\n\t/* TYPE DANGER DEFINITION */\n\tatlas-alert[type=\"danger\"] {\n\t\t--dialog-button-danger-shadow: 0 0 5px 0 var(--atlas-dialog-color-semantic-danger);\n\t\t--icon-color: var(--atlas-dialog-color-semantic-danger);\n\t\t--button-background-color: var(--atlas-dialog-color-semantic-danger);\n\t\t--button-background-color-hover: var(--atlas-color-semantic-danger-light);\n\t\t--button-color-hover: var(--atlas-dialog-color-semantic-danger);\n\t}\n\n\t@media (max-width: 480px) {\n\t\tatlas-alert::part(dialog) {\n\t\t\tmargin-inline: 1em;\n\t\t}\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/alert.css"],"names":[],"mappings":"AAAA;CACC;EACC,qDAAqD;EACrD,0BAA0B;EAC1B,2BAA2B;EAC3B,yCAAyC;EACzC,0FAA0F;;EAE1F,yBAAyB;;EAEzB,yCAAyC;EACzC,+BAA+B;EAC/B,+BAA+B;;EAE/B,kCAAkC;EAClC,2BAA2B;EAC3B,+BAA+B;EAC/B,6BAA6B;;EAE7B,qBAAqB;EACrB,kCAAkC;EAClC,wCAAwC;;EAExC,aAAa;EACb,aAAa;EACb,mBAAmB;CACpB;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,aAAa;EACb,+BAA+B;EAC/B,iCAAiC;EACjC;;;kBAGgB;;EAEhB,oCAAoC;EACpC,sCAAsC;;EAEtC,YAAY;EACZ,gDAAgD;;EAEhD,iBAAiB;EACjB,gDAAgD;;EAEhD,gCAAgC;;EAEhC,0CAA0C;CAC3C;;CAEA;;;EAGC,cAAc;CACf;;CAEA;EACC,eAAe;;EAEf,iBAAiB;EACjB,iCAAiC;CAClC;;CAEA;EACC,iBAAiB;;EAEjB,4DAA4D;EAC5D,wCAAwC;EACxC,4CAA4C;CAC7C;;CAEA;EACC,eAAe;;EAEf,gDAAgD;EAChD,sCAAsC;EACtC,0CAA0C;EAC1C,0CAA0C;CAC3C;;CAEA;EACC,aAAa;EACb,eAAe;EACf,mBAAmB;EACnB,iBAAiB;CAClB;;CAEA,wBAAwB;CACxB;EACC,gDAAgD;;EAEhD,iEAAiE;CAClE;;CAEA;EACC,sDAAsD;EACtD,gCAAgC;EAChC,8CAA8C;CAC/C;;CAEA;EACC,mCAAmC;;EAEnC,sDAAsD;CACvD;;CAEA;EACC,wBAAwB;CACzB;;CAEA,2BAA2B;CAC3B;EACC,kFAAkF;EAClF,uDAAuD;EACvD,oEAAoE;EACpE,yEAAyE;EACzE,+DAA+D;CAChE;;CAEA;EACC;GACC,kBAAkB;EACnB;CACD;AACD","sourcesContent":["@layer atlas {\n\tatlas-alert {\n\t\t--alert-dialog-color: var(--atlas-color-primary-n400);\n\t\t--alert-dialog-width: 37em;\n\t\t--alert-dialog-height: 14em;\n\t\t--alert-dialog-padding-block: 2.5em 1.5em;\n\t\t--alert-dialog-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.2);\n\n\t\t--alert-icon-size: 1.22em;\n\n\t\t--alert-header-margin-inline-start: 0.6em;\n\t\t--alert-header-font-size: 1.5em;\n\t\t--alert-header-font-weight: 600;\n\n\t\t--alert-body-padding-inline: 5.5em;\n\t\t--alert-body-font-size: 1em;\n\t\t--alert-body-line-height: 1.4em;\n\t\t--alert-body-font-weight: 400;\n\n\t\t--icon-color: inherit;\n\t\t--button-background-color: inherit;\n\t\t--button-background-color-hover: inherit;\n\n\t\tdisplay: none;\n\t\theight: 100vh;\n\t\talign-items: center;\n\t}\n\n\tatlas-alert[open]:not([open=\"false\"]) {\n\t\tdisplay: flex;\n\t}\n\n\tatlas-alert::part(dialog) {\n\t\tdisplay: grid;\n\t\tgrid-template-rows: 1fr 1fr 2fr;\n\t\tgrid-template-columns: 4.5em auto;\n\t\tgrid-template-areas:\n\t\t\t\"icon header\"\n\t\t\t\"body body\"\n\t\t\t\"footer footer\";\n\n\t\tmax-width: var(--alert-dialog-width);\n\t\tmax-height: var(--alert-dialog-height);\n\n\t\tborder: none;\n\t\tborder-radius: var(--atlas-dialog-border-radius);\n\n\t\tpadding-inline: 0;\n\t\tpadding-block: var(--alert-dialog-padding-block);\n\n\t\tcolor: var(--alert-dialog-color);\n\n\t\tbox-shadow: var(--alert-dialog-box-shadow);\n\t}\n\n\tatlas-alert::part(icon),\n\tatlas-alert::part(header),\n\tatlas-alert::part(body) {\n\t\tdisplay: block;\n\t}\n\n\tatlas-alert::part(icon) {\n\t\tgrid-area: icon;\n\n\t\tmargin-left: auto;\n\t\tfont-size: var(--alert-icon-size);\n\t}\n\n\tatlas-alert::part(header) {\n\t\tgrid-area: header;\n\n\t\tmargin-inline-start: var(--alert-header-margin-inline-start);\n\t\tfont-size: var(--alert-header-font-size);\n\t\tfont-weight: var(--alert-header-font-weight);\n\t}\n\n\tatlas-alert::part(body) {\n\t\tgrid-area: body;\n\n\t\tpadding-inline: var(--alert-body-padding-inline);\n\t\tfont-size: var(--alert-body-font-size);\n\t\tline-height: var(--alert-body-line-height);\n\t\tfont-weight: var(--alert-body-font-weight);\n\t}\n\n\tatlas-alert::part(footer) {\n\t\tdisplay: flex;\n\t\talign-self: end;\n\t\tmargin-inline: auto;\n\t\tgrid-area: footer;\n\t}\n\n\t/* ALERT TYPE SETTINGS */\n\tatlas-alert[type] > atlas-button-set > [box-type=\"primary\"] {\n\t\tbackground-color: var(--button-background-color);\n\n\t\t--primary-border-color: var(--atlas-dialog-color-semantic-danger);\n\t}\n\n\tatlas-alert[type] > atlas-button-set > [box-type=\"primary\"]:hover {\n\t\tbackground-color: var(--button-background-color-hover);\n\t\tcolor: var(--button-color-hover);\n\t\tbox-shadow: var(--dialog-button-danger-shadow);\n\t}\n\n\tatlas-alert[type] > atlas-button-set > [box-type=\"primary\"]:active {\n\t\t--dialog-button-danger-shadow: none;\n\n\t\tbackground-color: var(--button-background-color-hover);\n\t}\n\n\tatlas-alert[type] > atlas-icon {\n\t\tcolor: var(--icon-color);\n\t}\n\n\t/* TYPE DANGER DEFINITION */\n\tatlas-alert[type=\"danger\"] {\n\t\t--dialog-button-danger-shadow: 0 0 5px 0 var(--atlas-dialog-color-semantic-danger);\n\t\t--icon-color: var(--atlas-dialog-color-semantic-danger);\n\t\t--button-background-color: var(--atlas-dialog-color-semantic-danger);\n\t\t--button-background-color-hover: var(--atlas-color-semantic-danger-light);\n\t\t--button-color-hover: var(--atlas-dialog-color-semantic-danger);\n\t}\n\n\t@media (max-width: 480px) {\n\t\tatlas-alert::part(dialog) {\n\t\t\tmargin-inline: 1em;\n\t\t}\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/application-frame.css":
/*!****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/application-frame.css ***!
  \****************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-application-frame {\n\t\t--atlas-backdrop-background-color: rgba(0, 0, 0, 0.6);\n\t\t--desktop-common-block-start: 1em;\n\t\t--feed-body-container-open-size: 300px;\n\t\t--feed-body-container-close-size: 0px;\n\n\t\t--feed-body-animation-expand: feed-expand;\n\t\t--feed-body-animation-collapse: feed-collapse;\n\t\t--desktop-content-common-inline-margin: 1em;\n\t}\n\n\tatlas-application-frame {\n\t\tdisplay: grid;\n\t\theight: 100vh;\n\t\tgrid-template-rows: min-content min-content 1fr;\n\t\tgrid-template-columns: min-content 1fr 1fr min-content min-content;\n\t\tgrid-template-areas: \"al pc cc sb f\" \"mn s s s f\" \"mn ca ca ca f\";\n\n\t\tcontainer: app-frame / inline-size;\n\t}\n\n\tatlas-application-frame::part(backdrop) {\n\t\tisolation: isolate;\n\t\tz-index: 1;\n\t\tbackground-color: var(--atlas-backdrop-background-color);\n\t\t/* setting NEWS grid lines to cover full application sans Menu and Logo based on Desktop layout grid-template-area defined above */\n\t\tgrid-area: al-start / al-start / f-end / f-end;\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[backdrop]::part(backdrop) {\n\t\tdisplay: grid;\n\t}\n\n\tatlas-application-frame {\n\t\tbackground-color: var(--atlas-application-frame-background-color);\n\t\tcolor: var(--atlas-application-frame-color);\n\t}\n\n\tatlas-application-frame::part(app-logo) {\n\t\tdisplay: block;\n\t\tgrid-area: al;\n\t\tborder-inline-end: var(--atlas-application-frame-separator-style);\n\t\tpadding-block-start: var(--desktop-common-block-start);\n\t}\n\n\tatlas-application-frame::part(contextual-controls) {\n\t\tdisplay: block;\n\t\tgrid-area: cc;\n\t\tpadding-block-start: var(--desktop-common-block-start);\n\t\tmargin-inline-end: var(--desktop-content-common-inline-margin);\n\t\tjustify-self: end;\n\t}\n\n\tatlas-application-frame::part(content-area) {\n\t\tdisplay: block;\n\t\tgrid-area: ca;\n\t\toverflow-y: auto;\n\n\t\tmargin-inline: var(--desktop-content-common-inline-margin);\n\t}\n\n\tatlas-application-frame::part(feed) {\n\t\tdisplay: block;\n\t\tgrid-area: f;\n\t\toverflow-y: auto;\n\t}\n\n\tatlas-application-frame > [slot=\"feed\"] {\n\t\tanimation-duration: 0.5s;\n\t\tanimation-name: var(--feed-body-animation-expand);\n\t}\n\n\t@keyframes feed-expand {\n\t\tfrom {\n\t\t\twidth: var(--feed-body-container-close-size);\n\t\t}\n\t\tto {\n\t\t\twidth: var(--feed-body-container-open-size);\n\t\t}\n\t}\n\n\tatlas-application-frame[hide-feed]:not([hide-feed=\"false\"]) > [slot=\"feed\"] {\n\t\tdisplay: block;\n\t\tanimation-duration: 0.5s;\n\t\tanimation-name: var(--feed-body-animation-collapse);\n\t\twidth: 0;\n\t\tpadding: 1em 0;\n\t}\n\n\t@keyframes feed-collapse {\n\t\tfrom {\n\t\t\twidth: var(--feed-body-container-open-size);\n\t\t}\n\t\tto {\n\t\t\twidth: var(--feed-body-container-close-size);\n\t\t}\n\t}\n\n\tatlas-application-frame::part(main-nav) {\n\t\tborder-inline-end: var(--atlas-application-frame-separator-style);\n\t\tdisplay: block;\n\t\tgrid-area: mn;\n\t}\n\n\tatlas-application-frame > [slot=\"main-nav\"] {\n\t\tcontainer: main-nav / inline-size;\n\t}\n\n\tatlas-application-frame::part(profile-controls) {\n\t\tdisplay: block;\n\t\tgrid-area: pc;\n\t\tpadding-block-start: var(--desktop-common-block-start);\n\t\tmargin-inline-start: var(--desktop-content-common-inline-margin);\n\t}\n\n\tatlas-application-frame::part(feed-toggle-control),\n\tatlas-application-frame::part(extended-control) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame::part(snackbar-container) {\n\t\tdisplay: block;\n\t\tgrid-row-start: 1;\n\t\tgrid-column-start: 4;\n\n\t\tposition: relative;\n\t\tisolation: isolate;\n\t\tz-index: 1;\n\t}\n\n\tatlas-application-frame::part(search) {\n\t\tdisplay: block;\n\t\tgrid-area: s;\n\t\tmargin-inline: var(--desktop-content-common-inline-margin);\n\t}\n\n\t/* Global Search */\n\tatlas-application-frame:where(:not([show-global-search]), [show-global-search=\"false\"])::part(\n\t\t\tsearch\n\t\t) {\n\t\tdisplay: none;\n\t}\n\n\t/* Application Frame Focus Mode*/\n\tatlas-application-frame[focus-mode]::part(main-nav) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode]::part(profile-controls) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode]::part(contextual-controls) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode]::part(search) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode]::part(feed) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode]::part(app-logo) {\n\t\tmargin: auto;\n\t\tborder: none;\n\t}\n\n\tatlas-application-frame[focus-mode] {\n\t\t--desktop-content-common-inline-margin: 0;\n\t\tgrid-template-rows: min-content min-content 1fr;\n\t\tgrid-template-columns: 1fr;\n\t\tgrid-template-areas:\n\t\t\t\"al sb\"\n\t\t\t\"s s\"\n\t\t\t\"ca ca\";\n\t}\n\n\tatlas-application-frame[focus-mode]::part(backdrop) {\n\t\tgrid-area: al-start / al-start / ca-end / ca-end;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/application-frame.css"],"names":[],"mappings":"AAAA;CACC;EACC,qDAAqD;EACrD,iCAAiC;EACjC,sCAAsC;EACtC,qCAAqC;;EAErC,yCAAyC;EACzC,6CAA6C;EAC7C,2CAA2C;CAC5C;;CAEA;EACC,aAAa;EACb,aAAa;EACb,+CAA+C;EAC/C,kEAAkE;EAClE,iEAAiE;;EAEjE,kCAAkC;CACnC;;CAEA;EACC,kBAAkB;EAClB,UAAU;EACV,wDAAwD;EACxD,kIAAkI;EAClI,8CAA8C;EAC9C,aAAa;CACd;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,iEAAiE;EACjE,2CAA2C;CAC5C;;CAEA;EACC,cAAc;EACd,aAAa;EACb,iEAAiE;EACjE,sDAAsD;CACvD;;CAEA;EACC,cAAc;EACd,aAAa;EACb,sDAAsD;EACtD,8DAA8D;EAC9D,iBAAiB;CAClB;;CAEA;EACC,cAAc;EACd,aAAa;EACb,gBAAgB;;EAEhB,0DAA0D;CAC3D;;CAEA;EACC,cAAc;EACd,YAAY;EACZ,gBAAgB;CACjB;;CAEA;EACC,wBAAwB;EACxB,iDAAiD;CAClD;;CAEA;EACC;GACC,4CAA4C;EAC7C;EACA;GACC,2CAA2C;EAC5C;CACD;;CAEA;EACC,cAAc;EACd,wBAAwB;EACxB,mDAAmD;EACnD,QAAQ;EACR,cAAc;CACf;;CAEA;EACC;GACC,2CAA2C;EAC5C;EACA;GACC,4CAA4C;EAC7C;CACD;;CAEA;EACC,iEAAiE;EACjE,cAAc;EACd,aAAa;CACd;;CAEA;EACC,iCAAiC;CAClC;;CAEA;EACC,cAAc;EACd,aAAa;EACb,sDAAsD;EACtD,gEAAgE;CACjE;;CAEA;;EAEC,aAAa;CACd;;CAEA;EACC,cAAc;EACd,iBAAiB;EACjB,oBAAoB;;EAEpB,kBAAkB;EAClB,kBAAkB;EAClB,UAAU;CACX;;CAEA;EACC,cAAc;EACd,YAAY;EACZ,0DAA0D;CAC3D;;CAEA,kBAAkB;CAClB;;;EAGC,aAAa;CACd;;CAEA,gCAAgC;CAChC;EACC,aAAa;CACd;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,YAAY;EACZ,YAAY;CACb;;CAEA;EACC,yCAAyC;EACzC,+CAA+C;EAC/C,0BAA0B;EAC1B;;;UAGQ;CACT;;CAEA;EACC,gDAAgD;CACjD;AACD","sourcesContent":["@layer atlas {\n\tatlas-application-frame {\n\t\t--atlas-backdrop-background-color: rgba(0, 0, 0, 0.6);\n\t\t--desktop-common-block-start: 1em;\n\t\t--feed-body-container-open-size: 300px;\n\t\t--feed-body-container-close-size: 0px;\n\n\t\t--feed-body-animation-expand: feed-expand;\n\t\t--feed-body-animation-collapse: feed-collapse;\n\t\t--desktop-content-common-inline-margin: 1em;\n\t}\n\n\tatlas-application-frame {\n\t\tdisplay: grid;\n\t\theight: 100vh;\n\t\tgrid-template-rows: min-content min-content 1fr;\n\t\tgrid-template-columns: min-content 1fr 1fr min-content min-content;\n\t\tgrid-template-areas: \"al pc cc sb f\" \"mn s s s f\" \"mn ca ca ca f\";\n\n\t\tcontainer: app-frame / inline-size;\n\t}\n\n\tatlas-application-frame::part(backdrop) {\n\t\tisolation: isolate;\n\t\tz-index: 1;\n\t\tbackground-color: var(--atlas-backdrop-background-color);\n\t\t/* setting NEWS grid lines to cover full application sans Menu and Logo based on Desktop layout grid-template-area defined above */\n\t\tgrid-area: al-start / al-start / f-end / f-end;\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[backdrop]::part(backdrop) {\n\t\tdisplay: grid;\n\t}\n\n\tatlas-application-frame {\n\t\tbackground-color: var(--atlas-application-frame-background-color);\n\t\tcolor: var(--atlas-application-frame-color);\n\t}\n\n\tatlas-application-frame::part(app-logo) {\n\t\tdisplay: block;\n\t\tgrid-area: al;\n\t\tborder-inline-end: var(--atlas-application-frame-separator-style);\n\t\tpadding-block-start: var(--desktop-common-block-start);\n\t}\n\n\tatlas-application-frame::part(contextual-controls) {\n\t\tdisplay: block;\n\t\tgrid-area: cc;\n\t\tpadding-block-start: var(--desktop-common-block-start);\n\t\tmargin-inline-end: var(--desktop-content-common-inline-margin);\n\t\tjustify-self: end;\n\t}\n\n\tatlas-application-frame::part(content-area) {\n\t\tdisplay: block;\n\t\tgrid-area: ca;\n\t\toverflow-y: auto;\n\n\t\tmargin-inline: var(--desktop-content-common-inline-margin);\n\t}\n\n\tatlas-application-frame::part(feed) {\n\t\tdisplay: block;\n\t\tgrid-area: f;\n\t\toverflow-y: auto;\n\t}\n\n\tatlas-application-frame > [slot=\"feed\"] {\n\t\tanimation-duration: 0.5s;\n\t\tanimation-name: var(--feed-body-animation-expand);\n\t}\n\n\t@keyframes feed-expand {\n\t\tfrom {\n\t\t\twidth: var(--feed-body-container-close-size);\n\t\t}\n\t\tto {\n\t\t\twidth: var(--feed-body-container-open-size);\n\t\t}\n\t}\n\n\tatlas-application-frame[hide-feed]:not([hide-feed=\"false\"]) > [slot=\"feed\"] {\n\t\tdisplay: block;\n\t\tanimation-duration: 0.5s;\n\t\tanimation-name: var(--feed-body-animation-collapse);\n\t\twidth: 0;\n\t\tpadding: 1em 0;\n\t}\n\n\t@keyframes feed-collapse {\n\t\tfrom {\n\t\t\twidth: var(--feed-body-container-open-size);\n\t\t}\n\t\tto {\n\t\t\twidth: var(--feed-body-container-close-size);\n\t\t}\n\t}\n\n\tatlas-application-frame::part(main-nav) {\n\t\tborder-inline-end: var(--atlas-application-frame-separator-style);\n\t\tdisplay: block;\n\t\tgrid-area: mn;\n\t}\n\n\tatlas-application-frame > [slot=\"main-nav\"] {\n\t\tcontainer: main-nav / inline-size;\n\t}\n\n\tatlas-application-frame::part(profile-controls) {\n\t\tdisplay: block;\n\t\tgrid-area: pc;\n\t\tpadding-block-start: var(--desktop-common-block-start);\n\t\tmargin-inline-start: var(--desktop-content-common-inline-margin);\n\t}\n\n\tatlas-application-frame::part(feed-toggle-control),\n\tatlas-application-frame::part(extended-control) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame::part(snackbar-container) {\n\t\tdisplay: block;\n\t\tgrid-row-start: 1;\n\t\tgrid-column-start: 4;\n\n\t\tposition: relative;\n\t\tisolation: isolate;\n\t\tz-index: 1;\n\t}\n\n\tatlas-application-frame::part(search) {\n\t\tdisplay: block;\n\t\tgrid-area: s;\n\t\tmargin-inline: var(--desktop-content-common-inline-margin);\n\t}\n\n\t/* Global Search */\n\tatlas-application-frame:where(:not([show-global-search]), [show-global-search=\"false\"])::part(\n\t\t\tsearch\n\t\t) {\n\t\tdisplay: none;\n\t}\n\n\t/* Application Frame Focus Mode*/\n\tatlas-application-frame[focus-mode]::part(main-nav) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode]::part(profile-controls) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode]::part(contextual-controls) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode]::part(search) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode]::part(feed) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode]::part(app-logo) {\n\t\tmargin: auto;\n\t\tborder: none;\n\t}\n\n\tatlas-application-frame[focus-mode] {\n\t\t--desktop-content-common-inline-margin: 0;\n\t\tgrid-template-rows: min-content min-content 1fr;\n\t\tgrid-template-columns: 1fr;\n\t\tgrid-template-areas:\n\t\t\t\"al sb\"\n\t\t\t\"s s\"\n\t\t\t\"ca ca\";\n\t}\n\n\tatlas-application-frame[focus-mode]::part(backdrop) {\n\t\tgrid-area: al-start / al-start / ca-end / ca-end;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/application-frame.small.css":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/application-frame.small.css ***!
  \**********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@media (max-width: 800px) {\n\tatlas-application-frame {\n\t\tgrid-template-rows: min-content min-content 1fr min-content;\n\t\tgrid-template-columns: 0.5fr 1fr 0.5fr;\n\t\tgrid-template-areas:\n\t\t\t\"extd-ctrl al feed-ctrl\"\n\t\t\t\"f f f\"\n\t\t\t\"ca ca ca\"\n\t\t\t\"mn mn mn\";\n\t}\n\n\tatlas-application-frame::part(feed) {\n\t\toverflow-y: unset;\n\t\twidth: 100%;\n\t}\n\n\tatlas-application-frame::part(main-nav),\n\tatlas-application-frame::part(app-logo) {\n\t\tborder-inline-end-width: 0;\n\t}\n\n\tatlas-application-frame::part(main-nav) {\n\t\twidth: 100%;\n\t}\n\n\tatlas-application-frame::part(content-area) {\n\t\tmargin-inline: 0;\n\t}\n\n\tatlas-application-frame::part(contextual-controls),\n\tatlas-application-frame::part(profile-controls),\n\tatlas-application-frame::part(feed),\n\tatlas-application-frame::part(search) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame::part(backdrop) {\n\t\tgrid-area: extd-ctrl-start / extd-ctrl-start / ca-end / ca-end;\n\t}\n\n\tatlas-application-frame::part(feed-toggle-control) {\n\t\tgrid-area: feed-ctrl;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: end;\n\t\tmargin-inline-end: var(--desktop-content-common-inline-margin);\n\t}\n\n\tatlas-application-frame::part(extended-control) {\n\t\tgrid-area: extd-ctrl;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: start;\n\t\tmargin-inline-start: var(--desktop-content-common-inline-margin);\n\t}\n\n\t/* SHOW FEED */\n\tatlas-application-frame[hide-feed=\"false\"] {\n\t\tgrid-template-rows: min-content 1fr;\n\t\tgrid-template-areas:\n\t\t\t\"extd-ctrl al feed-ctrl\"\n\t\t\t\"f f f\";\n\t}\n\n\tatlas-application-frame[hide-feed=\"false\"]::part(feed) {\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t}\n\n\tatlas-application-frame[hide-feed=\"false\"]::part(main-nav),\n\tatlas-application-frame[hide-feed=\"false\"]::part(content-area) {\n\t\tdisplay: none;\n\t}\n\n\t/* SHOW CONTROLS */\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"]) {\n\t\tgrid-template-rows: min-content min-content 1fr;\n\t\tgrid-template-areas:\n\t\t\t\"extd-ctrl al\"\n\t\t\t\"pc pc\"\n\t\t\t\"cc cc\";\n\t}\n\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"])::part(contextual-controls),\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"])::part(profile-controls) {\n\t\tdisplay: flex;\n\t\tjustify-self: start;\n\t}\n\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"])::part(content-area),\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"])::part(main-nav),\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"])::part(feed),\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"])::part(feed-toggle-control) {\n\t\tdisplay: none;\n\t}\n\n\t@keyframes feed-collapse {\n\t\tfrom {\n\t\t\theight: 100%;\n\t\t}\n\t\tto {\n\t\t\theight: var(--feed-body-container-close-size);\n\t\t}\n\t}\n\n\t@keyframes feed-expand {\n\t\tfrom {\n\t\t\theight: var(--feed-body-container-close-size);\n\t\t}\n\t\tto {\n\t\t\theight: 100%;\n\t\t}\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/application-frame.small.css"],"names":[],"mappings":"AAAA;CACC;EACC,2DAA2D;EAC3D,sCAAsC;EACtC;;;;aAIW;CACZ;;CAEA;EACC,iBAAiB;EACjB,WAAW;CACZ;;CAEA;;EAEC,0BAA0B;CAC3B;;CAEA;EACC,WAAW;CACZ;;CAEA;EACC,gBAAgB;CACjB;;CAEA;;;;EAIC,aAAa;CACd;;CAEA;EACC,8DAA8D;CAC/D;;CAEA;EACC,oBAAoB;EACpB,aAAa;EACb,mBAAmB;EACnB,oBAAoB;EACpB,8DAA8D;CAC/D;;CAEA;EACC,oBAAoB;EACpB,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,gEAAgE;CACjE;;CAEA,cAAc;CACd;EACC,mCAAmC;EACnC;;UAEQ;CACT;;CAEA;EACC,cAAc;EACd,WAAW;CACZ;;CAEA;;EAEC,aAAa;CACd;;CAEA,kBAAkB;CAClB;EACC,+CAA+C;EAC/C;;;UAGQ;CACT;;CAEA;;EAEC,aAAa;EACb,mBAAmB;CACpB;;CAEA;;;;EAIC,aAAa;CACd;;CAEA;EACC;GACC,YAAY;EACb;EACA;GACC,6CAA6C;EAC9C;CACD;;CAEA;EACC;GACC,6CAA6C;EAC9C;EACA;GACC,YAAY;EACb;CACD;AACD","sourcesContent":["@media (max-width: 800px) {\n\tatlas-application-frame {\n\t\tgrid-template-rows: min-content min-content 1fr min-content;\n\t\tgrid-template-columns: 0.5fr 1fr 0.5fr;\n\t\tgrid-template-areas:\n\t\t\t\"extd-ctrl al feed-ctrl\"\n\t\t\t\"f f f\"\n\t\t\t\"ca ca ca\"\n\t\t\t\"mn mn mn\";\n\t}\n\n\tatlas-application-frame::part(feed) {\n\t\toverflow-y: unset;\n\t\twidth: 100%;\n\t}\n\n\tatlas-application-frame::part(main-nav),\n\tatlas-application-frame::part(app-logo) {\n\t\tborder-inline-end-width: 0;\n\t}\n\n\tatlas-application-frame::part(main-nav) {\n\t\twidth: 100%;\n\t}\n\n\tatlas-application-frame::part(content-area) {\n\t\tmargin-inline: 0;\n\t}\n\n\tatlas-application-frame::part(contextual-controls),\n\tatlas-application-frame::part(profile-controls),\n\tatlas-application-frame::part(feed),\n\tatlas-application-frame::part(search) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame::part(backdrop) {\n\t\tgrid-area: extd-ctrl-start / extd-ctrl-start / ca-end / ca-end;\n\t}\n\n\tatlas-application-frame::part(feed-toggle-control) {\n\t\tgrid-area: feed-ctrl;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: end;\n\t\tmargin-inline-end: var(--desktop-content-common-inline-margin);\n\t}\n\n\tatlas-application-frame::part(extended-control) {\n\t\tgrid-area: extd-ctrl;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: start;\n\t\tmargin-inline-start: var(--desktop-content-common-inline-margin);\n\t}\n\n\t/* SHOW FEED */\n\tatlas-application-frame[hide-feed=\"false\"] {\n\t\tgrid-template-rows: min-content 1fr;\n\t\tgrid-template-areas:\n\t\t\t\"extd-ctrl al feed-ctrl\"\n\t\t\t\"f f f\";\n\t}\n\n\tatlas-application-frame[hide-feed=\"false\"]::part(feed) {\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t}\n\n\tatlas-application-frame[hide-feed=\"false\"]::part(main-nav),\n\tatlas-application-frame[hide-feed=\"false\"]::part(content-area) {\n\t\tdisplay: none;\n\t}\n\n\t/* SHOW CONTROLS */\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"]) {\n\t\tgrid-template-rows: min-content min-content 1fr;\n\t\tgrid-template-areas:\n\t\t\t\"extd-ctrl al\"\n\t\t\t\"pc pc\"\n\t\t\t\"cc cc\";\n\t}\n\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"])::part(contextual-controls),\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"])::part(profile-controls) {\n\t\tdisplay: flex;\n\t\tjustify-self: start;\n\t}\n\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"])::part(content-area),\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"])::part(main-nav),\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"])::part(feed),\n\tatlas-application-frame[show-controls]:not([show-controls=\"false\"])::part(feed-toggle-control) {\n\t\tdisplay: none;\n\t}\n\n\t@keyframes feed-collapse {\n\t\tfrom {\n\t\t\theight: 100%;\n\t\t}\n\t\tto {\n\t\t\theight: var(--feed-body-container-close-size);\n\t\t}\n\t}\n\n\t@keyframes feed-expand {\n\t\tfrom {\n\t\t\theight: var(--feed-body-container-close-size);\n\t\t}\n\t\tto {\n\t\t\theight: 100%;\n\t\t}\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/avatar.css":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/avatar.css ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-avatar {\n\t\t--atlas-avatar-vertex-clip-path: circle(50%);\n\t\t--atlas-avatar-default-width: 2em;\n\t\t--atlas-avatar-full-mode-min-width: 2em;\n\t}\n\n\tatlas-avatar::part(image),\n\tatlas-avatar::part(initials),\n\tatlas-avatar::part(fallback) {\n\t\tdisplay: none;\n\t\taspect-ratio: 1 / 1;\n\t\twidth: var(--atlas-avatar-default-width);\n\t\tclip-path: var(--atlas-avatar-vertex-clip-path);\n\t}\n\n\tatlas-avatar[visible=\"image\"]::part(image),\n\tatlas-avatar[visible=\"initials\"]::part(initials),\n\tatlas-avatar[visible=\"fallback\"]::part(fallback) {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t}\n\n\tatlas-avatar::part(image) {\n\t\tposition: relative;\n\t\tobject-fit: cover;\n\t}\n\n\tatlas-avatar[full-mode][visible=\"initials\"],\n\tatlas-avatar[full-mode][visible=\"fallback\"] {\n\t\tmin-width: var(--atlas-avatar-full-mode-min-width);\n\t\theight: auto;\n\t}\n\n\tatlas-avatar[full-mode][visible=\"image\"]::part(image),\n\tatlas-avatar[full-mode][visible=\"initials\"]::part(initials),\n\tatlas-avatar[full-mode][visible=\"fallback\"]::part(fallback) {\n\t\taspect-ratio: unset;\n\t\t--atlas-avatar-vertex-clip-path: inset(0% 0% 0% 0% round 0.3em);\n\t}\n\n\tatlas-avatar[full-mode][visible=\"initials\"]::part(initials),\n\tatlas-avatar[full-mode][visible=\"fallback\"]::part(fallback) {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/avatar.css"],"names":[],"mappings":"AAAA;CACC;EACC,4CAA4C;EAC5C,iCAAiC;EACjC,uCAAuC;CACxC;;CAEA;;;EAGC,aAAa;EACb,mBAAmB;EACnB,wCAAwC;EACxC,+CAA+C;CAChD;;CAEA;;;EAGC,aAAa;EACb,mBAAmB;EACnB,uBAAuB;CACxB;;CAEA;EACC,kBAAkB;EAClB,iBAAiB;CAClB;;CAEA;;EAEC,kDAAkD;EAClD,YAAY;CACb;;CAEA;;;EAGC,mBAAmB;EACnB,+DAA+D;CAChE;;CAEA;;EAEC,WAAW;EACX,YAAY;CACb;AACD","sourcesContent":["@layer atlas {\n\tatlas-avatar {\n\t\t--atlas-avatar-vertex-clip-path: circle(50%);\n\t\t--atlas-avatar-default-width: 2em;\n\t\t--atlas-avatar-full-mode-min-width: 2em;\n\t}\n\n\tatlas-avatar::part(image),\n\tatlas-avatar::part(initials),\n\tatlas-avatar::part(fallback) {\n\t\tdisplay: none;\n\t\taspect-ratio: 1 / 1;\n\t\twidth: var(--atlas-avatar-default-width);\n\t\tclip-path: var(--atlas-avatar-vertex-clip-path);\n\t}\n\n\tatlas-avatar[visible=\"image\"]::part(image),\n\tatlas-avatar[visible=\"initials\"]::part(initials),\n\tatlas-avatar[visible=\"fallback\"]::part(fallback) {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t}\n\n\tatlas-avatar::part(image) {\n\t\tposition: relative;\n\t\tobject-fit: cover;\n\t}\n\n\tatlas-avatar[full-mode][visible=\"initials\"],\n\tatlas-avatar[full-mode][visible=\"fallback\"] {\n\t\tmin-width: var(--atlas-avatar-full-mode-min-width);\n\t\theight: auto;\n\t}\n\n\tatlas-avatar[full-mode][visible=\"image\"]::part(image),\n\tatlas-avatar[full-mode][visible=\"initials\"]::part(initials),\n\tatlas-avatar[full-mode][visible=\"fallback\"]::part(fallback) {\n\t\taspect-ratio: unset;\n\t\t--atlas-avatar-vertex-clip-path: inset(0% 0% 0% 0% round 0.3em);\n\t}\n\n\tatlas-avatar[full-mode][visible=\"initials\"]::part(initials),\n\tatlas-avatar[full-mode][visible=\"fallback\"]::part(fallback) {\n\t\twidth: 100%;\n\t\theight: 100%;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/button-set.css":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/button-set.css ***!
  \*********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-button-set {\n\t\t--primary-spacing: 1em;\n\t\t--extended-gap: 1.25em;\n\t\t--space-around: 0.5em;\n\t}\n\n\tatlas-button-set {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\n\t\tmargin-block: var(--space-around);\n\t}\n\n\tatlas-button-set::part(primary) {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\n\t\tgap: var(--primary-spacing);\n\t}\n\n\tatlas-button-set::part(extended) {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t}\n\n\tatlas-button-set > [slot=\"extended\"] {\n\t\tmargin-block-start: var(--extended-gap);\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/button-set.css"],"names":[],"mappings":"AAAA;CACC;EACC,sBAAsB;EACtB,sBAAsB;EACtB,qBAAqB;CACtB;;CAEA;EACC,aAAa;EACb,sBAAsB;;EAEtB,iCAAiC;CAClC;;CAEA;EACC,aAAa;EACb,uBAAuB;;EAEvB,2BAA2B;CAC5B;;CAEA;EACC,aAAa;EACb,uBAAuB;CACxB;;CAEA;EACC,uCAAuC;CACxC;AACD","sourcesContent":["@layer atlas {\n\tatlas-button-set {\n\t\t--primary-spacing: 1em;\n\t\t--extended-gap: 1.25em;\n\t\t--space-around: 0.5em;\n\t}\n\n\tatlas-button-set {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\n\t\tmargin-block: var(--space-around);\n\t}\n\n\tatlas-button-set::part(primary) {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\n\t\tgap: var(--primary-spacing);\n\t}\n\n\tatlas-button-set::part(extended) {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t}\n\n\tatlas-button-set > [slot=\"extended\"] {\n\t\tmargin-block-start: var(--extended-gap);\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/button-set.tab-bar.css":
/*!*****************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/button-set.tab-bar.css ***!
  \*****************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-button-set[tab-bar] {\n\t\t--space-around: 0;\n\t\t--extended-gap: 0;\n\t\t--primary-spacing: 0;\n\n\t\t--selected-tab-accent-color: var(--atlas-color-primary-b400);\n\t\t--selected-tab-color: var(--atlas-color-primary-n400);\n\t\t--tab-color: var(--atlas-color-primary-n300);\n\t\t--disabled-tab-color: var(--atlas-color-primary-n100);\n\t\t--tab-button-min-heigh: 4em;\n\t\t--tab-label-border-color: transparent;\n\t\t--tab-label-border-size: 0.143em;\n\t\t--tab-label-heigh: 100%;\n\t}\n\n\tatlas-button-set[tab-bar] {\n\t\tposition: relative;\n\t\tisolation: isolate;\n\t\tflex-flow: nowrap;\n\n\t\tborder-block-end: 1px solid var(--atlas-color-primary-n100);\n\t}\n\n\tatlas-button-set[tab-bar]::part(primary) {\n\t\tjustify-content: flex-start;\n\t\tflex-grow: 2;\n\t}\n\n\tatlas-button-set[tab-bar]::part(extended) {\n\t\talign-items: center;\n\t}\n\n\tatlas-button-set[tab-bar] atlas-icon {\n\t\t--atlas-icon-default-color: inherit;\n\t}\n\n\tatlas-button-set[tab-bar] > atlas-button:not([slot=\"extended\"]) {\n\t\t--default-font-size: var(--medium-font-size);\n\t\t--atlas-button-primary-color: var(--tab-color);\n\t\t--atlas-button-hover-background-color: transparent;\n\t\t--atlas-button-primary-background-color: transparent;\n\t\t--primary-active-background: transparent;\n\t\t--atlas-button-primary-disabled-background-color: transparent;\n\t\t--large-padding-top-bottom: 0;\n\t\t--large-padding-left-right: 0.8em;\n\t\t--text-space-between: 0;\n\t}\n\n\tatlas-button-set[tab-bar]\n\t\t> atlas-button:not([slot=\"extended\"])[disabled]:not([disabled=\"false\"]) {\n\t\t--atlas-button-primary-color: var(--disabled-tab-color);\n\t}\n\n\tatlas-button-set[tab-bar] > atlas-button:not([slot=\"extended\"])::part(label) {\n\t\tborder-bottom: var(--tab-label-border-size) solid var(--tab-label-border-color);\n\t\tdisplay: flex;\n\t\theight: var(--tab-label-heigh);\n\t\talign-items: center;\n\t}\n\n\tatlas-button-set[tab-bar] > atlas-button:not([slot=\"extended\"]) {\n\t\toutline: none;\n\t\tborder: 0;\n\t\tmin-height: var(--tab-button-min-heigh);\n\t}\n\n\tatlas-button-set[tab-bar] > atlas-button[selected]:not([selected=\"false\"]) {\n\t\ttransform: scale(1.05);\n\t\t--tab-label-border-color: var(--selected-tab-accent-color);\n\t\t--atlas-button-primary-color: var(--selected-tab-color);\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/button-set.tab-bar.css"],"names":[],"mappings":"AAAA;CACC;EACC,iBAAiB;EACjB,iBAAiB;EACjB,oBAAoB;;EAEpB,4DAA4D;EAC5D,qDAAqD;EACrD,4CAA4C;EAC5C,qDAAqD;EACrD,2BAA2B;EAC3B,qCAAqC;EACrC,gCAAgC;EAChC,uBAAuB;CACxB;;CAEA;EACC,kBAAkB;EAClB,kBAAkB;EAClB,iBAAiB;;EAEjB,2DAA2D;CAC5D;;CAEA;EACC,2BAA2B;EAC3B,YAAY;CACb;;CAEA;EACC,mBAAmB;CACpB;;CAEA;EACC,mCAAmC;CACpC;;CAEA;EACC,4CAA4C;EAC5C,8CAA8C;EAC9C,kDAAkD;EAClD,oDAAoD;EACpD,wCAAwC;EACxC,6DAA6D;EAC7D,6BAA6B;EAC7B,iCAAiC;EACjC,uBAAuB;CACxB;;CAEA;;EAEC,uDAAuD;CACxD;;CAEA;EACC,+EAA+E;EAC/E,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;CACpB;;CAEA;EACC,aAAa;EACb,SAAS;EACT,uCAAuC;CACxC;;CAEA;EACC,sBAAsB;EACtB,0DAA0D;EAC1D,uDAAuD;CACxD;AACD","sourcesContent":["@layer atlas {\n\tatlas-button-set[tab-bar] {\n\t\t--space-around: 0;\n\t\t--extended-gap: 0;\n\t\t--primary-spacing: 0;\n\n\t\t--selected-tab-accent-color: var(--atlas-color-primary-b400);\n\t\t--selected-tab-color: var(--atlas-color-primary-n400);\n\t\t--tab-color: var(--atlas-color-primary-n300);\n\t\t--disabled-tab-color: var(--atlas-color-primary-n100);\n\t\t--tab-button-min-heigh: 4em;\n\t\t--tab-label-border-color: transparent;\n\t\t--tab-label-border-size: 0.143em;\n\t\t--tab-label-heigh: 100%;\n\t}\n\n\tatlas-button-set[tab-bar] {\n\t\tposition: relative;\n\t\tisolation: isolate;\n\t\tflex-flow: nowrap;\n\n\t\tborder-block-end: 1px solid var(--atlas-color-primary-n100);\n\t}\n\n\tatlas-button-set[tab-bar]::part(primary) {\n\t\tjustify-content: flex-start;\n\t\tflex-grow: 2;\n\t}\n\n\tatlas-button-set[tab-bar]::part(extended) {\n\t\talign-items: center;\n\t}\n\n\tatlas-button-set[tab-bar] atlas-icon {\n\t\t--atlas-icon-default-color: inherit;\n\t}\n\n\tatlas-button-set[tab-bar] > atlas-button:not([slot=\"extended\"]) {\n\t\t--default-font-size: var(--medium-font-size);\n\t\t--atlas-button-primary-color: var(--tab-color);\n\t\t--atlas-button-hover-background-color: transparent;\n\t\t--atlas-button-primary-background-color: transparent;\n\t\t--primary-active-background: transparent;\n\t\t--atlas-button-primary-disabled-background-color: transparent;\n\t\t--large-padding-top-bottom: 0;\n\t\t--large-padding-left-right: 0.8em;\n\t\t--text-space-between: 0;\n\t}\n\n\tatlas-button-set[tab-bar]\n\t\t> atlas-button:not([slot=\"extended\"])[disabled]:not([disabled=\"false\"]) {\n\t\t--atlas-button-primary-color: var(--disabled-tab-color);\n\t}\n\n\tatlas-button-set[tab-bar] > atlas-button:not([slot=\"extended\"])::part(label) {\n\t\tborder-bottom: var(--tab-label-border-size) solid var(--tab-label-border-color);\n\t\tdisplay: flex;\n\t\theight: var(--tab-label-heigh);\n\t\talign-items: center;\n\t}\n\n\tatlas-button-set[tab-bar] > atlas-button:not([slot=\"extended\"]) {\n\t\toutline: none;\n\t\tborder: 0;\n\t\tmin-height: var(--tab-button-min-heigh);\n\t}\n\n\tatlas-button-set[tab-bar] > atlas-button[selected]:not([selected=\"false\"]) {\n\t\ttransform: scale(1.05);\n\t\t--tab-label-border-color: var(--selected-tab-accent-color);\n\t\t--atlas-button-primary-color: var(--selected-tab-color);\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/button.css":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/button.css ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\t/* Variables */\n\tatlas-button {\n\t\t--default-font-size: 1em;\n\t\t--default-font-weight: 400;\n\t\t--default-line-heigh: 2.5ch;\n\t\t--default-background-color: unset;\n\t\t--default-disabled-text-color: var(--atlas-color-primary-n300);\n\n\t\t--large-padding-top-bottom: 0.7em;\n\t\t--large-padding-left-right: 1.25em;\n\n\t\t--medium-line-heigh: 1.25rem;\n\t\t--medium-font-size: 0.875em;\n\t\t--medium-padding-top-bottom: 0.375em;\n\n\t\t--primary-active-background: var(--atlas-color-primary-b300);\n\t\t--primary-border-color: var(--atlas-color-primary-b500);\n\n\t\t--secondary-border-color: var(--atlas-color-primary-b500);\n\t\t--secondary-color: var(--atlas-color-primary-b500);\n\t\t--secondary-hover-background-color: var(--atlas-color-primary-b25);\n\n\t\t--tertiary-text-color: var(--atlas-color-primary-n400);\n\t\t--tertiary-focus-shadow: var(--atlas-color-primary-n200);\n\t\t--tertiary-focus-outline: var(--atlas-color-primary-n200);\n\t\t--tertiary-border-color: var(--atlas-color-primary-n200);\n\t\t--tertiary-active: var(--atlas-color-primary-n100);\n\t\t--tertiary-background-hover: var(--atlas-color-primary-n25);\n\n\t\t--icon-default-color: var(--atlas-color-primary-n300);\n\t\t--icon-active-color: var(--atlas-color-primary-b300);\n\t\t--icon-hover-color: var(--atlas-color-primary-b400);\n\n\t\t--text-color: var(--atlas-color-primary-b400);\n\t\t--text-color-active: var(--atlas-color-primary-b400);\n\t\t--text-color-hover: var(--atlas-color-primary-b300);\n\t\t--text-disabled-color: var(--atlas-color-primary-n100);\n\t\t--text-space-between: 0.65em;\n\t\t--default-disabled-color: var(--atlas-color-primary-n100);\n\n\t\t--box-secondary-active: var(--atlas-color-primary-b50);\n\t\t--box-disabled-background: var(--atlas-color-primary-n50);\n\t\t--box-focus-shadow-blur-radius: 0.5em;\n\t\t--box-focus-shadow-spread-radius: 0.06em;\n\t\t--box-focus-shadow-color: var(--atlas-button-primary-background-color);\n\t\t--box-focus-shadow: 0 0 var(--box-focus-shadow-blur-radius)\n\t\t\tvar(--box-focus-shadow-spread-radius) var(--box-focus-shadow-color);\n\t\t--box-focus-shadow-tertiary: 0 0 var(--box-focus-shadow-blur-radius)\n\t\t\tvar(--box-focus-shadow-spread-radius) var(--tertiary-focus-shadow);\n\n\t\t--default-border-radius: 0.25em;\n\t\t--default-border-size: 0.04em;\n\t\t--default-focus-outline: 0.1em;\n\t}\n\n\t/* Shared styles */\n\tatlas-button {\n\t\tbackground-color: var(--default-background-color);\n\t\tdisplay: flex;\n\t\tfont-family: inherit;\n\t\tfont-weight: var(--default-font-weight);\n\t\tfont-size: var(--default-font-size);\n\t\tline-height: var(--default-line-heigh);\n\t\tmax-width: max-content;\n\t\tmin-width: max-content;\n\t}\n\n\tatlas-button[minor-action]:not([minor-action=\"false\"]) {\n\t\tline-height: var(--medium-line-heigh);\n\t\tfont-size: var(--medium-font-size);\n\t\tpadding: var(--medium-padding-top-bottom) 0;\n\t\tmax-width: max-content;\n\t\tmin-width: max-content;\n\t}\n\n\tatlas-button::part(button) {\n\t\talign-items: center;\n\t\tborder: none;\n\t\tdisplay: inline-flex;\n\t\tgap: var(--text-space-between);\n\t\tpadding: var(--large-padding-top-bottom) var(--large-padding-left-right);\n\n\t\tbackground-color: inherit;\n\t\tborder-radius: inherit;\n\t\tcolor: inherit;\n\t\tcursor: inherit;\n\t\tfont-size: inherit;\n\t\tfont-family: inherit;\n\t\tfont-weight: inherit;\n\t}\n\n\tatlas-button:hover {\n\t\tcursor: pointer;\n\t}\n\n\tatlas-button[disabled]:not([disabled=\"false\"]) {\n\t\tcursor: unset;\n\t\tpointer-events: none;\n\t\tborder-color: var(--box-disabled-background);\n\t}\n\n\t/* Box */\n\tatlas-button[box-type][disabled]:not([disabled=\"false\"]) {\n\t\tbackground-color: var(--box-disabled-background);\n\t\tcolor: var(--default-disabled-text-color);\n\t\tborder-color: var(--box-disabled-background);\n\t}\n\n\tatlas-button,\n\tatlas-button[kind=\"box\"],\n\tatlas-button[box-type] {\n\t\tborder-radius: var(--default-border-radius);\n\t}\n\n\t/* Icon button */\n\tatlas-button[kind=\"icon\"] atlas-icon {\n\t\tcolor: inherit;\n\t}\n\n\tatlas-button[kind=\"icon\"] {\n\t\tbackground-color: unset;\n\t\toutline: 0;\n\t\tcolor: var(--icon-default-color);\n\t\tborder: none;\n\t}\n\n\tatlas-button[kind=\"icon\"]:hover {\n\t\tcursor: pointer;\n\t\tcolor: var(--icon-hover-color);\n\t\tbackground-color: unset;\n\t}\n\n\tatlas-button[kind=\"icon\"]::part(button) {\n\t\tpadding: 0;\n\t}\n\n\tatlas-button[kind=\"icon\"]::part(prefix),\n\tatlas-button[kind=\"icon\"]::part(suffix) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-button[kind=\"icon\"]:active {\n\t\tcolor: var(--icon-active-color);\n\t}\n\n\tatlas-button[kind=\"icon\"][disabled]:not([disabled=\"false\"]) {\n\t\tbackground: transparent;\n\t\tcolor: var(--default-disabled-color);\n\t\tborder: none;\n\t}\n\n\t/* Text */\n\tatlas-button[kind=\"text\"] {\n\t\tbackground-color: unset;\n\t\tpadding: 0;\n\t\tcolor: var(--text-color);\n\t\toutline: 0;\n\t\tborder: none;\n\t}\n\n\tatlas-button[kind=\"text\"]::part(button) {\n\t\tpadding: 0;\n\t}\n\n\tatlas-button[kind=\"text\"]:hover {\n\t\tcolor: var(--text-color-hover);\n\t\tbackground-color: unset;\n\t}\n\n\tatlas-button[kind=\"text\"]:active {\n\t\tcolor: var(--text-color-active);\n\t}\n\n\tatlas-button[kind=\"text\"][disabled]:not([disabled=\"false\"]) {\n\t\tbackground-color: unset;\n\t\tcolor: var(--text-disabled-color);\n\t\tborder: none;\n\t}\n\n\t/* Primary */\n\tatlas-button,\n\tatlas-button[box-type=\"primary\"] {\n\t\tbackground-color: var(--atlas-button-primary-background-color);\n\t\tcolor: var(--atlas-button-primary-color);\n\t\tborder: var(--default-border-size) solid var(--primary-border-color);\n\t}\n\n\tatlas-button[disabled]:not([disabled=\"false\"]),\n\tatlas-button[box-type=\"primary\"][disabled]:not([disabled=\"false\"]) {\n\t\tbackground-color: var(--atlas-button-primary-disabled-background-color);\n\t\tborder-color: var(--atlas-button-primary-disabled-background-color);\n\t}\n\tatlas-button:hover,\n\tatlas-button[box-type=\"primary\"]:hover {\n\t\tbackground-color: var(--atlas-button-hover-background-color);\n\t\t--primary-border-color: var(--atlas-button-hover-background-color);\n\t}\n\n\tatlas-button:active,\n\tatlas-button[box-type=\"primary\"]:active {\n\t\tbackground-color: var(--primary-active-background);\n\t\t--primary-border-color: var(--primary-active-background);\n\t}\n\n\t/* Secondary */\n\tatlas-button[box-type=\"secondary\"] {\n\t\tbackground-color: transparent;\n\t\tborder: var(--default-border-size) solid var(--secondary-border-color);\n\t\tcolor: var(--secondary-color);\n\t}\n\n\tatlas-button[box-type=\"secondary\"]:hover {\n\t\tbackground-color: var(--secondary-hover-background-color);\n\t}\n\n\tatlas-button[box-type=\"secondary\"]:active {\n\t\tbackground-color: var(--box-secondary-active);\n\t}\n\n\t/* Tertiary */\n\tatlas-button[box-type=\"tertiary\"] {\n\t\tbackground-color: transparent;\n\t\tcolor: var(--tertiary-text-color);\n\t\tborder: var(--default-border-size) solid var(--tertiary-border-color);\n\t}\n\n\tatlas-button[box-type=\"tertiary\"]:hover {\n\t\tbackground-color: var(--tertiary-background-hover);\n\t}\n\tatlas-button[box-type=\"tertiary\"]:active {\n\t\tbackground-color: var(--tertiary-active);\n\t}\n\n\t/* Focus */\n\tatlas-button::part(button):focus-visible,\n\tatlas-button[box-type=\"primary\"]::part(button):focus-visible,\n\tatlas-button[box-type=\"secondary\"]::part(button):focus-visible {\n\t\t--primary-focus-outline-color: var(--atlas-button-primary-background-color);\n\n\t\tbox-shadow: var(--box-focus-shadow);\n\t\tborder-radius: var(--default-border-radius);\n\t\toutline: var(--default-focus-outline) solid var(--primary-focus-outline-color);\n\t}\n\n\tatlas-button[box-type=\"tertiary\"]::part(button):focus-visible {\n\t\tbox-shadow: var(--box-focus-shadow-tertiary);\n\t\tborder-radius: var(--default-border-radius);\n\t\toutline: var(--default-focus-outline) solid var(--tertiary-focus-outline);\n\t}\n\n\tatlas-button[kind=\"icon\"]::part(button):focus-visible,\n\tatlas-button[kind=\"text\"]::part(button):focus-visible {\n\t\tbox-shadow: none;\n\t\tborder-radius: 0;\n\t\toutline: 0;\n\t}\n\n\t/* Generic Button */\n\tatlas-button[kind=\"generic\"] {\n\t\tborder: none;\n\t\tdisplay: inline-block;\n\t\toutline: none;\n\t\tcolor: inherit;\n\t\tmax-width: inherit;\n\t\tmin-width: inherit;\n\t\tline-height: normal;\n\t\tbackground-color: inherit;\n\t}\n\n\tatlas-button[kind=\"generic\"]::part(button) {\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t}\n\n\tatlas-button::part(prefix),\n\tatlas-button::part(suffix) {\n\t\tline-height: 100%;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/button.css"],"names":[],"mappings":"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","sourcesContent":["@layer atlas {\n\t/* Variables */\n\tatlas-button {\n\t\t--default-font-size: 1em;\n\t\t--default-font-weight: 400;\n\t\t--default-line-heigh: 2.5ch;\n\t\t--default-background-color: unset;\n\t\t--default-disabled-text-color: var(--atlas-color-primary-n300);\n\n\t\t--large-padding-top-bottom: 0.7em;\n\t\t--large-padding-left-right: 1.25em;\n\n\t\t--medium-line-heigh: 1.25rem;\n\t\t--medium-font-size: 0.875em;\n\t\t--medium-padding-top-bottom: 0.375em;\n\n\t\t--primary-active-background: var(--atlas-color-primary-b300);\n\t\t--primary-border-color: var(--atlas-color-primary-b500);\n\n\t\t--secondary-border-color: var(--atlas-color-primary-b500);\n\t\t--secondary-color: var(--atlas-color-primary-b500);\n\t\t--secondary-hover-background-color: var(--atlas-color-primary-b25);\n\n\t\t--tertiary-text-color: var(--atlas-color-primary-n400);\n\t\t--tertiary-focus-shadow: var(--atlas-color-primary-n200);\n\t\t--tertiary-focus-outline: var(--atlas-color-primary-n200);\n\t\t--tertiary-border-color: var(--atlas-color-primary-n200);\n\t\t--tertiary-active: var(--atlas-color-primary-n100);\n\t\t--tertiary-background-hover: var(--atlas-color-primary-n25);\n\n\t\t--icon-default-color: var(--atlas-color-primary-n300);\n\t\t--icon-active-color: var(--atlas-color-primary-b300);\n\t\t--icon-hover-color: var(--atlas-color-primary-b400);\n\n\t\t--text-color: var(--atlas-color-primary-b400);\n\t\t--text-color-active: var(--atlas-color-primary-b400);\n\t\t--text-color-hover: var(--atlas-color-primary-b300);\n\t\t--text-disabled-color: var(--atlas-color-primary-n100);\n\t\t--text-space-between: 0.65em;\n\t\t--default-disabled-color: var(--atlas-color-primary-n100);\n\n\t\t--box-secondary-active: var(--atlas-color-primary-b50);\n\t\t--box-disabled-background: var(--atlas-color-primary-n50);\n\t\t--box-focus-shadow-blur-radius: 0.5em;\n\t\t--box-focus-shadow-spread-radius: 0.06em;\n\t\t--box-focus-shadow-color: var(--atlas-button-primary-background-color);\n\t\t--box-focus-shadow: 0 0 var(--box-focus-shadow-blur-radius)\n\t\t\tvar(--box-focus-shadow-spread-radius) var(--box-focus-shadow-color);\n\t\t--box-focus-shadow-tertiary: 0 0 var(--box-focus-shadow-blur-radius)\n\t\t\tvar(--box-focus-shadow-spread-radius) var(--tertiary-focus-shadow);\n\n\t\t--default-border-radius: 0.25em;\n\t\t--default-border-size: 0.04em;\n\t\t--default-focus-outline: 0.1em;\n\t}\n\n\t/* Shared styles */\n\tatlas-button {\n\t\tbackground-color: var(--default-background-color);\n\t\tdisplay: flex;\n\t\tfont-family: inherit;\n\t\tfont-weight: var(--default-font-weight);\n\t\tfont-size: var(--default-font-size);\n\t\tline-height: var(--default-line-heigh);\n\t\tmax-width: max-content;\n\t\tmin-width: max-content;\n\t}\n\n\tatlas-button[minor-action]:not([minor-action=\"false\"]) {\n\t\tline-height: var(--medium-line-heigh);\n\t\tfont-size: var(--medium-font-size);\n\t\tpadding: var(--medium-padding-top-bottom) 0;\n\t\tmax-width: max-content;\n\t\tmin-width: max-content;\n\t}\n\n\tatlas-button::part(button) {\n\t\talign-items: center;\n\t\tborder: none;\n\t\tdisplay: inline-flex;\n\t\tgap: var(--text-space-between);\n\t\tpadding: var(--large-padding-top-bottom) var(--large-padding-left-right);\n\n\t\tbackground-color: inherit;\n\t\tborder-radius: inherit;\n\t\tcolor: inherit;\n\t\tcursor: inherit;\n\t\tfont-size: inherit;\n\t\tfont-family: inherit;\n\t\tfont-weight: inherit;\n\t}\n\n\tatlas-button:hover {\n\t\tcursor: pointer;\n\t}\n\n\tatlas-button[disabled]:not([disabled=\"false\"]) {\n\t\tcursor: unset;\n\t\tpointer-events: none;\n\t\tborder-color: var(--box-disabled-background);\n\t}\n\n\t/* Box */\n\tatlas-button[box-type][disabled]:not([disabled=\"false\"]) {\n\t\tbackground-color: var(--box-disabled-background);\n\t\tcolor: var(--default-disabled-text-color);\n\t\tborder-color: var(--box-disabled-background);\n\t}\n\n\tatlas-button,\n\tatlas-button[kind=\"box\"],\n\tatlas-button[box-type] {\n\t\tborder-radius: var(--default-border-radius);\n\t}\n\n\t/* Icon button */\n\tatlas-button[kind=\"icon\"] atlas-icon {\n\t\tcolor: inherit;\n\t}\n\n\tatlas-button[kind=\"icon\"] {\n\t\tbackground-color: unset;\n\t\toutline: 0;\n\t\tcolor: var(--icon-default-color);\n\t\tborder: none;\n\t}\n\n\tatlas-button[kind=\"icon\"]:hover {\n\t\tcursor: pointer;\n\t\tcolor: var(--icon-hover-color);\n\t\tbackground-color: unset;\n\t}\n\n\tatlas-button[kind=\"icon\"]::part(button) {\n\t\tpadding: 0;\n\t}\n\n\tatlas-button[kind=\"icon\"]::part(prefix),\n\tatlas-button[kind=\"icon\"]::part(suffix) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-button[kind=\"icon\"]:active {\n\t\tcolor: var(--icon-active-color);\n\t}\n\n\tatlas-button[kind=\"icon\"][disabled]:not([disabled=\"false\"]) {\n\t\tbackground: transparent;\n\t\tcolor: var(--default-disabled-color);\n\t\tborder: none;\n\t}\n\n\t/* Text */\n\tatlas-button[kind=\"text\"] {\n\t\tbackground-color: unset;\n\t\tpadding: 0;\n\t\tcolor: var(--text-color);\n\t\toutline: 0;\n\t\tborder: none;\n\t}\n\n\tatlas-button[kind=\"text\"]::part(button) {\n\t\tpadding: 0;\n\t}\n\n\tatlas-button[kind=\"text\"]:hover {\n\t\tcolor: var(--text-color-hover);\n\t\tbackground-color: unset;\n\t}\n\n\tatlas-button[kind=\"text\"]:active {\n\t\tcolor: var(--text-color-active);\n\t}\n\n\tatlas-button[kind=\"text\"][disabled]:not([disabled=\"false\"]) {\n\t\tbackground-color: unset;\n\t\tcolor: var(--text-disabled-color);\n\t\tborder: none;\n\t}\n\n\t/* Primary */\n\tatlas-button,\n\tatlas-button[box-type=\"primary\"] {\n\t\tbackground-color: var(--atlas-button-primary-background-color);\n\t\tcolor: var(--atlas-button-primary-color);\n\t\tborder: var(--default-border-size) solid var(--primary-border-color);\n\t}\n\n\tatlas-button[disabled]:not([disabled=\"false\"]),\n\tatlas-button[box-type=\"primary\"][disabled]:not([disabled=\"false\"]) {\n\t\tbackground-color: var(--atlas-button-primary-disabled-background-color);\n\t\tborder-color: var(--atlas-button-primary-disabled-background-color);\n\t}\n\tatlas-button:hover,\n\tatlas-button[box-type=\"primary\"]:hover {\n\t\tbackground-color: var(--atlas-button-hover-background-color);\n\t\t--primary-border-color: var(--atlas-button-hover-background-color);\n\t}\n\n\tatlas-button:active,\n\tatlas-button[box-type=\"primary\"]:active {\n\t\tbackground-color: var(--primary-active-background);\n\t\t--primary-border-color: var(--primary-active-background);\n\t}\n\n\t/* Secondary */\n\tatlas-button[box-type=\"secondary\"] {\n\t\tbackground-color: transparent;\n\t\tborder: var(--default-border-size) solid var(--secondary-border-color);\n\t\tcolor: var(--secondary-color);\n\t}\n\n\tatlas-button[box-type=\"secondary\"]:hover {\n\t\tbackground-color: var(--secondary-hover-background-color);\n\t}\n\n\tatlas-button[box-type=\"secondary\"]:active {\n\t\tbackground-color: var(--box-secondary-active);\n\t}\n\n\t/* Tertiary */\n\tatlas-button[box-type=\"tertiary\"] {\n\t\tbackground-color: transparent;\n\t\tcolor: var(--tertiary-text-color);\n\t\tborder: var(--default-border-size) solid var(--tertiary-border-color);\n\t}\n\n\tatlas-button[box-type=\"tertiary\"]:hover {\n\t\tbackground-color: var(--tertiary-background-hover);\n\t}\n\tatlas-button[box-type=\"tertiary\"]:active {\n\t\tbackground-color: var(--tertiary-active);\n\t}\n\n\t/* Focus */\n\tatlas-button::part(button):focus-visible,\n\tatlas-button[box-type=\"primary\"]::part(button):focus-visible,\n\tatlas-button[box-type=\"secondary\"]::part(button):focus-visible {\n\t\t--primary-focus-outline-color: var(--atlas-button-primary-background-color);\n\n\t\tbox-shadow: var(--box-focus-shadow);\n\t\tborder-radius: var(--default-border-radius);\n\t\toutline: var(--default-focus-outline) solid var(--primary-focus-outline-color);\n\t}\n\n\tatlas-button[box-type=\"tertiary\"]::part(button):focus-visible {\n\t\tbox-shadow: var(--box-focus-shadow-tertiary);\n\t\tborder-radius: var(--default-border-radius);\n\t\toutline: var(--default-focus-outline) solid var(--tertiary-focus-outline);\n\t}\n\n\tatlas-button[kind=\"icon\"]::part(button):focus-visible,\n\tatlas-button[kind=\"text\"]::part(button):focus-visible {\n\t\tbox-shadow: none;\n\t\tborder-radius: 0;\n\t\toutline: 0;\n\t}\n\n\t/* Generic Button */\n\tatlas-button[kind=\"generic\"] {\n\t\tborder: none;\n\t\tdisplay: inline-block;\n\t\toutline: none;\n\t\tcolor: inherit;\n\t\tmax-width: inherit;\n\t\tmin-width: inherit;\n\t\tline-height: normal;\n\t\tbackground-color: inherit;\n\t}\n\n\tatlas-button[kind=\"generic\"]::part(button) {\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t}\n\n\tatlas-button::part(prefix),\n\tatlas-button::part(suffix) {\n\t\tline-height: 100%;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/button.states.css":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/button.states.css ***!
  \************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-button[state=\"danger\"] {\n\t\t--button-danger-color: var(--atlas-color-semantic-danger);\n\t\t--button-danger-color-light: var(--atlas-color-semantic-danger-light);\n\t\t--button-danger-disabled-light: #fff7f7;\n\t\t--button-danger-disabled: #e7a0a1;\n\t\t--button-danger-shadow: none;\n\n\t\t--atlas-button-primary-background-color: var(--button-danger-color);\n\t\t--primary-border-color: var(--button-danger-color);\n\t\t--atlas-button-hover-background-color: var(--button-danger-color-light);\n\t\t--primary-active-background: var(--button-danger-color-light);\n\t\t--atlas-button-primary-disabled-background-color: var(--button-danger-disabled);\n\n\t\t--secondary-color: var(--button-danger-color);\n\t\t--secondary-hover-background-color: var(--button-danger-color);\n\t\t--secondary-border-color: var(--button-danger-color);\n\t\t--box-secondary-active: var(--button-danger-color);\n\t\t--box-disabled-background: var(--button-danger-disabled-light);\n\t\t--default-disabled-text-color: var(--button-danger-disabled);\n\t}\n\n\tatlas-button[state=\"danger\"] {\n\t\tbox-shadow: var(--button-danger-shadow);\n\t}\n\n\tatlas-button[state=\"danger\"]:hover {\n\t\t--button-danger-shadow: 0 0 5px 0 var(--button-danger-color);\n\n\t\t--atlas-button-primary-color: var(--button-danger-color);\n\t\t--secondary-color: var(--atlas-color-white);\n\t}\n\n\tatlas-button[state=\"danger\"]:active {\n\t\t--primary-border-color: var(--button-danger-color);\n\t\t--button-danger-shadow: none;\n\t}\n\n\tatlas-button[state=\"danger\"]::part(button):focus-visible {\n\t\t--button-danger-shadow: 0 0 6px 0 var(--button-danger-color);\n\n\t\t--box-focus-shadow: var(--button-danger-shadow);\n\t\t--primary-focus-outline-color: var(--button-danger-color-light);\n\t}\n\n\tatlas-button[state=\"danger\"][disabled]:not([disabled=\"false\"]) {\n\t\t--atlas-button-primary-color: var(--button-danger-disabled-light);\n\t}\n\n\tatlas-button[state=\"danger\"][box-type=\"secondary\"]::part(button):focus-visible {\n\t\t--primary-focus-outline-color: var(--button-danger-color);\n\t}\n\n\tatlas-button[state=\"danger\"][box-type=\"secondary\"][disabled]:not([disabled=\"false\"]) {\n\t\tborder-color: var(--button-danger-disabled);\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/button.states.css"],"names":[],"mappings":"AAAA;CACC;EACC,yDAAyD;EACzD,qEAAqE;EACrE,uCAAuC;EACvC,iCAAiC;EACjC,4BAA4B;;EAE5B,mEAAmE;EACnE,kDAAkD;EAClD,uEAAuE;EACvE,6DAA6D;EAC7D,+EAA+E;;EAE/E,6CAA6C;EAC7C,8DAA8D;EAC9D,oDAAoD;EACpD,kDAAkD;EAClD,8DAA8D;EAC9D,4DAA4D;CAC7D;;CAEA;EACC,uCAAuC;CACxC;;CAEA;EACC,4DAA4D;;EAE5D,wDAAwD;EACxD,2CAA2C;CAC5C;;CAEA;EACC,kDAAkD;EAClD,4BAA4B;CAC7B;;CAEA;EACC,4DAA4D;;EAE5D,+CAA+C;EAC/C,+DAA+D;CAChE;;CAEA;EACC,iEAAiE;CAClE;;CAEA;EACC,yDAAyD;CAC1D;;CAEA;EACC,2CAA2C;CAC5C;AACD","sourcesContent":["@layer atlas {\n\tatlas-button[state=\"danger\"] {\n\t\t--button-danger-color: var(--atlas-color-semantic-danger);\n\t\t--button-danger-color-light: var(--atlas-color-semantic-danger-light);\n\t\t--button-danger-disabled-light: #fff7f7;\n\t\t--button-danger-disabled: #e7a0a1;\n\t\t--button-danger-shadow: none;\n\n\t\t--atlas-button-primary-background-color: var(--button-danger-color);\n\t\t--primary-border-color: var(--button-danger-color);\n\t\t--atlas-button-hover-background-color: var(--button-danger-color-light);\n\t\t--primary-active-background: var(--button-danger-color-light);\n\t\t--atlas-button-primary-disabled-background-color: var(--button-danger-disabled);\n\n\t\t--secondary-color: var(--button-danger-color);\n\t\t--secondary-hover-background-color: var(--button-danger-color);\n\t\t--secondary-border-color: var(--button-danger-color);\n\t\t--box-secondary-active: var(--button-danger-color);\n\t\t--box-disabled-background: var(--button-danger-disabled-light);\n\t\t--default-disabled-text-color: var(--button-danger-disabled);\n\t}\n\n\tatlas-button[state=\"danger\"] {\n\t\tbox-shadow: var(--button-danger-shadow);\n\t}\n\n\tatlas-button[state=\"danger\"]:hover {\n\t\t--button-danger-shadow: 0 0 5px 0 var(--button-danger-color);\n\n\t\t--atlas-button-primary-color: var(--button-danger-color);\n\t\t--secondary-color: var(--atlas-color-white);\n\t}\n\n\tatlas-button[state=\"danger\"]:active {\n\t\t--primary-border-color: var(--button-danger-color);\n\t\t--button-danger-shadow: none;\n\t}\n\n\tatlas-button[state=\"danger\"]::part(button):focus-visible {\n\t\t--button-danger-shadow: 0 0 6px 0 var(--button-danger-color);\n\n\t\t--box-focus-shadow: var(--button-danger-shadow);\n\t\t--primary-focus-outline-color: var(--button-danger-color-light);\n\t}\n\n\tatlas-button[state=\"danger\"][disabled]:not([disabled=\"false\"]) {\n\t\t--atlas-button-primary-color: var(--button-danger-disabled-light);\n\t}\n\n\tatlas-button[state=\"danger\"][box-type=\"secondary\"]::part(button):focus-visible {\n\t\t--primary-focus-outline-color: var(--button-danger-color);\n\t}\n\n\tatlas-button[state=\"danger\"][box-type=\"secondary\"][disabled]:not([disabled=\"false\"]) {\n\t\tborder-color: var(--button-danger-disabled);\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/chip-group.css":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/chip-group.css ***!
  \*********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-chip-group {\n\t\t--overflow-background: var(--atlas-color-white);\n\t\t--overflow-border-color: var(--atlas-color-primary-n200);\n\t\t--overflow-color: var(--atlas-color-primary-n400);\n\t}\n\n\tatlas-chip-group {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tpadding-block: 1em;\n\t\trow-gap: 1em;\n\t\tcolumn-gap: 0.7em;\n\t}\n\n\tatlas-chip-group[category] > atlas-chip[slot=\"suffix\"] {\n\t\tborder-color: var(--overflow-border-color);\n\t\tbackground-color: var(--overflow-background);\n\t\tcolor: var(--overflow-color);\n\t}\n\n\tatlas-chip-group:not([category]) > atlas-chip[slot=\"suffix\"] {\n\t\tborder-color: var(--overflow-border-color);\n\t\tbackground-color: var(--overflow-background);\n\t\tcolor: var(--overflow-color);\n\t}\n\n\tatlas-chip-group[category=\"outlets\"] {\n\t\t--atlas-chip-category-border-color: var(--atlas-chip-outlets-border-color);\n\t\t--atlas-chip-category-background-color: var(--atlas-chip-outlets-background-color);\n\t\t--atlas-chip-category-color: var(--atlas-chip-outlets-color);\n\t\t--atlas-chip-category-hover-background-color: var(--atlas-chip-outlets-color);\n\t\t--atlas-chip-category-hover-color: var(--atlas-chip-outlets-hover-color);\n\t\t--atlas-chip-category-active-color: var(--atlas-chip-outlets-color);\n\t\t--atlas-chip-category-active-shadow-color: var(--atlas-chip-outlets-active-shadow-color);\n\t\t--atlas-chip-category-active-background-color: var(\n\t\t\t--atlas-chip-outlets-active-background-color\n\t\t);\n\t}\n\n\tatlas-chip-group[category=\"hashtags\"] {\n\t\t--atlas-chip-category-border-color: var(--atlas-chip-hashtags-border-color);\n\t\t--atlas-chip-category-background-color: var(--atlas-chip-hashtags-background-color);\n\t}\n\n\tatlas-chip-group[category=\"topics\"] {\n\t\t--atlas-chip-category-border-color: var(--atlas-chip-topics-border-color);\n\t\t--atlas-chip-category-background-color: var(--atlas-chip-topics-background-color);\n\t\t--atlas-chip-category-color: var(--atlas-chip-topics-color);\n\t\t--atlas-chip-category-hover-background-color: var(--atlas-chip-topics-color);\n\t\t--atlas-chip-category-hover-color: var(--atlas-chip-topics-hover-color);\n\t\t--atlas-chip-category-active-color: var(--atlas-chip-topics-color);\n\t\t--atlas-chip-category-active-shadow-color: var(--atlas-chip-topics-active-shadow-color);\n\t\t--atlas-chip-category-active-background-color: var(--atlas-chip-topics-active-background-color);\n\t}\n\n\tatlas-chip-group[category] > atlas-chip {\n\t\tborder: 1px solid;\n\t\tborder-color: var(--atlas-chip-category-border-color);\n\t\tbackground-color: var(--atlas-chip-category-background-color);\n\t\tcolor: var(--atlas-chip-category-color);\n\t}\n\n\tatlas-chip-group[category] atlas-chip[type=\"filter\"] {\n\t\tcolor: var(--atlas-chip-type-filter-color);\n\t\tbackground-color: var(--atlas-chip-type-filter-background-color);\n\t\tborder-color: var(--atlas-chip-type-filter-border-color);\n\t}\n\n\tatlas-chip-group[category] > atlas-chip[highlighted] {\n\t\t--atlas-chip-category-background-color: var(--atlas-chip-category-active-background-color);\n\t\t--atlas-chip-category-color: var(--atlas-chip-category-active-color);\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/chip-group.css"],"names":[],"mappings":"AAAA;CACC;EACC,+CAA+C;EAC/C,wDAAwD;EACxD,iDAAiD;CAClD;;CAEA;EACC,aAAa;EACb,eAAe;EACf,kBAAkB;EAClB,YAAY;EACZ,iBAAiB;CAClB;;CAEA;EACC,0CAA0C;EAC1C,4CAA4C;EAC5C,4BAA4B;CAC7B;;CAEA;EACC,0CAA0C;EAC1C,4CAA4C;EAC5C,4BAA4B;CAC7B;;CAEA;EACC,0EAA0E;EAC1E,kFAAkF;EAClF,4DAA4D;EAC5D,6EAA6E;EAC7E,wEAAwE;EACxE,mEAAmE;EACnE,wFAAwF;EACxF;;GAEC;CACF;;CAEA;EACC,2EAA2E;EAC3E,mFAAmF;CACpF;;CAEA;EACC,yEAAyE;EACzE,iFAAiF;EACjF,2DAA2D;EAC3D,4EAA4E;EAC5E,uEAAuE;EACvE,kEAAkE;EAClE,uFAAuF;EACvF,+FAA+F;CAChG;;CAEA;EACC,iBAAiB;EACjB,qDAAqD;EACrD,6DAA6D;EAC7D,uCAAuC;CACxC;;CAEA;EACC,0CAA0C;EAC1C,gEAAgE;EAChE,wDAAwD;CACzD;;CAEA;EACC,0FAA0F;EAC1F,oEAAoE;CACrE;AACD","sourcesContent":["@layer atlas {\n\tatlas-chip-group {\n\t\t--overflow-background: var(--atlas-color-white);\n\t\t--overflow-border-color: var(--atlas-color-primary-n200);\n\t\t--overflow-color: var(--atlas-color-primary-n400);\n\t}\n\n\tatlas-chip-group {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tpadding-block: 1em;\n\t\trow-gap: 1em;\n\t\tcolumn-gap: 0.7em;\n\t}\n\n\tatlas-chip-group[category] > atlas-chip[slot=\"suffix\"] {\n\t\tborder-color: var(--overflow-border-color);\n\t\tbackground-color: var(--overflow-background);\n\t\tcolor: var(--overflow-color);\n\t}\n\n\tatlas-chip-group:not([category]) > atlas-chip[slot=\"suffix\"] {\n\t\tborder-color: var(--overflow-border-color);\n\t\tbackground-color: var(--overflow-background);\n\t\tcolor: var(--overflow-color);\n\t}\n\n\tatlas-chip-group[category=\"outlets\"] {\n\t\t--atlas-chip-category-border-color: var(--atlas-chip-outlets-border-color);\n\t\t--atlas-chip-category-background-color: var(--atlas-chip-outlets-background-color);\n\t\t--atlas-chip-category-color: var(--atlas-chip-outlets-color);\n\t\t--atlas-chip-category-hover-background-color: var(--atlas-chip-outlets-color);\n\t\t--atlas-chip-category-hover-color: var(--atlas-chip-outlets-hover-color);\n\t\t--atlas-chip-category-active-color: var(--atlas-chip-outlets-color);\n\t\t--atlas-chip-category-active-shadow-color: var(--atlas-chip-outlets-active-shadow-color);\n\t\t--atlas-chip-category-active-background-color: var(\n\t\t\t--atlas-chip-outlets-active-background-color\n\t\t);\n\t}\n\n\tatlas-chip-group[category=\"hashtags\"] {\n\t\t--atlas-chip-category-border-color: var(--atlas-chip-hashtags-border-color);\n\t\t--atlas-chip-category-background-color: var(--atlas-chip-hashtags-background-color);\n\t}\n\n\tatlas-chip-group[category=\"topics\"] {\n\t\t--atlas-chip-category-border-color: var(--atlas-chip-topics-border-color);\n\t\t--atlas-chip-category-background-color: var(--atlas-chip-topics-background-color);\n\t\t--atlas-chip-category-color: var(--atlas-chip-topics-color);\n\t\t--atlas-chip-category-hover-background-color: var(--atlas-chip-topics-color);\n\t\t--atlas-chip-category-hover-color: var(--atlas-chip-topics-hover-color);\n\t\t--atlas-chip-category-active-color: var(--atlas-chip-topics-color);\n\t\t--atlas-chip-category-active-shadow-color: var(--atlas-chip-topics-active-shadow-color);\n\t\t--atlas-chip-category-active-background-color: var(--atlas-chip-topics-active-background-color);\n\t}\n\n\tatlas-chip-group[category] > atlas-chip {\n\t\tborder: 1px solid;\n\t\tborder-color: var(--atlas-chip-category-border-color);\n\t\tbackground-color: var(--atlas-chip-category-background-color);\n\t\tcolor: var(--atlas-chip-category-color);\n\t}\n\n\tatlas-chip-group[category] atlas-chip[type=\"filter\"] {\n\t\tcolor: var(--atlas-chip-type-filter-color);\n\t\tbackground-color: var(--atlas-chip-type-filter-background-color);\n\t\tborder-color: var(--atlas-chip-type-filter-border-color);\n\t}\n\n\tatlas-chip-group[category] > atlas-chip[highlighted] {\n\t\t--atlas-chip-category-background-color: var(--atlas-chip-category-active-background-color);\n\t\t--atlas-chip-category-color: var(--atlas-chip-category-active-color);\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/chip.css":
/*!***************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/chip.css ***!
  \***************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-chip {\n\t\t--atlas-chip-base-font-size: 1em;\n\t\t--chip-body-min-width: 3ch;\n\t\t--chip-body-max-width: 100%;\n\n\t\tfont-size: var(--atlas-chip-base-font-size);\n\t\twidth: fit-content;\n\t\theight: var(--atlas-chip-body-height);\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\n\t\tborder-radius: 9em;\n\t\tborder: 1px solid var(--atlas-color-primary-n100);\n\t\tbackground-color: var(--atlas-color-primary-n25);\n\t\tpadding-inline: 0.63em;\n\t\tpadding-block: 0.38em;\n\t}\n\n\tatlas-chip::part(body) {\n\t\tdisplay: inline;\n\t\tmax-width: var(--chip-body-max-width);\n\t\tmin-width: var(--chip-body-min-width);\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\twhite-space: nowrap;\n\t\ttext-align: start;\n\t}\n\n\t/* :has([slot=\"prefix\"])::part(prefix) { */\n\tatlas-chip [slot=\"prefix\"] {\n\t\tdisplay: block;\n\t\tmargin-inline-end: 1ch;\n\t}\n\n\tatlas-chip :is([slot=\"dismisser\"], [slot=\"suffix\"]) {\n\t\tfont-size: calc(var(--atlas-chip-base-font-size) * 0.5);\n\t\tpadding-inline-start: 0.97em;\n\t}\n\n\tatlas-chip[type=\"filter\"] :is([slot=\"dismisser\"], [slot=\"suffix\"]) {\n\t\tfont-size: calc(var(--atlas-chip-base-font-size) * 0.7);\n\t\tpadding-inline-start: 0.5em;\n\t}\n\n\tatlas-chip atlas-button[kind=\"icon\"] {\n\t\tcolor: inherit;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/chip.css"],"names":[],"mappings":"AAAA;CACC;EACC,gCAAgC;EAChC,0BAA0B;EAC1B,2BAA2B;;EAE3B,2CAA2C;EAC3C,kBAAkB;EAClB,qCAAqC;EACrC,aAAa;EACb,mBAAmB;EACnB,uBAAuB;;EAEvB,kBAAkB;EAClB,iDAAiD;EACjD,gDAAgD;EAChD,sBAAsB;EACtB,qBAAqB;CACtB;;CAEA;EACC,eAAe;EACf,qCAAqC;EACrC,qCAAqC;EACrC,gBAAgB;EAChB,uBAAuB;EACvB,mBAAmB;EACnB,iBAAiB;CAClB;;CAEA,0CAA0C;CAC1C;EACC,cAAc;EACd,sBAAsB;CACvB;;CAEA;EACC,uDAAuD;EACvD,4BAA4B;CAC7B;;CAEA;EACC,uDAAuD;EACvD,2BAA2B;CAC5B;;CAEA;EACC,cAAc;CACf;AACD","sourcesContent":["@layer atlas {\n\tatlas-chip {\n\t\t--atlas-chip-base-font-size: 1em;\n\t\t--chip-body-min-width: 3ch;\n\t\t--chip-body-max-width: 100%;\n\n\t\tfont-size: var(--atlas-chip-base-font-size);\n\t\twidth: fit-content;\n\t\theight: var(--atlas-chip-body-height);\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\n\t\tborder-radius: 9em;\n\t\tborder: 1px solid var(--atlas-color-primary-n100);\n\t\tbackground-color: var(--atlas-color-primary-n25);\n\t\tpadding-inline: 0.63em;\n\t\tpadding-block: 0.38em;\n\t}\n\n\tatlas-chip::part(body) {\n\t\tdisplay: inline;\n\t\tmax-width: var(--chip-body-max-width);\n\t\tmin-width: var(--chip-body-min-width);\n\t\toverflow: hidden;\n\t\ttext-overflow: ellipsis;\n\t\twhite-space: nowrap;\n\t\ttext-align: start;\n\t}\n\n\t/* :has([slot=\"prefix\"])::part(prefix) { */\n\tatlas-chip [slot=\"prefix\"] {\n\t\tdisplay: block;\n\t\tmargin-inline-end: 1ch;\n\t}\n\n\tatlas-chip :is([slot=\"dismisser\"], [slot=\"suffix\"]) {\n\t\tfont-size: calc(var(--atlas-chip-base-font-size) * 0.5);\n\t\tpadding-inline-start: 0.97em;\n\t}\n\n\tatlas-chip[type=\"filter\"] :is([slot=\"dismisser\"], [slot=\"suffix\"]) {\n\t\tfont-size: calc(var(--atlas-chip-base-font-size) * 0.7);\n\t\tpadding-inline-start: 0.5em;\n\t}\n\n\tatlas-chip atlas-button[kind=\"icon\"] {\n\t\tcolor: inherit;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/dialog.css":
/*!*****************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/dialog.css ***!
  \*****************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-dialog[open=\"false\"],\n\tatlas-dialog:not([open]) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-dialog[open=\"true\"],\n\tatlas-dialog:is([open]) {\n\t\tdisplay: flex;\n\t}\n\n\tatlas-dialog {\n\t\t--atlas-dialog-dismissible-margin-block-end: 0.25rem;\n\t\t--atlas-dialog-background-color: var(--atlas-color-white);\n\t\t--atlas-dialog-footer-block-spacing: 2.5rem;\n\t\t--atlas-dialog-padding: 1rem;\n\t\t--atlas-dialog-inline-spacing: 3.75rem;\n\t\t--atlas-dialog-dismissible-padding: 1.25rem;\n\t\t--atlas-dialog-subtext-margin-block-end: 0;\n\t\t--atlas-dialog-body-block-start: 1.5rem;\n\t\t--atlas-dialog-max-width: 600px;\n\n\t\theight: 100vh;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tpadding: var(--atlas-dialog-padding);\n\t}\n\n\tatlas-dialog[open]::part(dialog) {\n\t\tborder: 0;\n\t\tbox-sizing: border-box;\n\t\tbackground: transparent;\n\t}\n\n\tatlas-dialog::part(container) {\n\t\tdisplay: grid;\n\t\tbox-sizing: border-box;\n\t\tgrid-template-columns: 1fr;\n\t\tmax-height: calc(100vh - (var(--atlas-dialog-padding) + var(--atlas-dialog-padding)));\n\t\tgrid-template-rows: auto auto 1fr auto;\n\t\tbackground: var(--atlas-dialog-background-color);\n\t\tborder-radius: var(--atlas-dialog-border-radius);\n\n\t\toverflow: hidden;\n\t}\n\n\tatlas-dialog::part(dismissible) {\n\t\tdisplay: grid;\n\t\tjustify-content: end;\n\t\tmargin-block-end: var(--atlas-dialog-dismissible-margin-block-end);\n\t\tpadding: var(--atlas-dialog-dismissible-padding);\n\t}\n\n\tatlas-dialog::part(title) {\n\t\tdisplay: block;\n\t\tmargin-block-end: 1rem;\n\t\tpadding-inline: var(--atlas-dialog-inline-spacing);\n\n\t\tfont: var(--atlas-type-title-large-semibold);\n\t\tcolor: var(--atlas-color-primary-n400);\n\t}\n\n\tatlas-dialog > [slot=\"subtext\"] {\n\t\tdisplay: block;\n\t\tmargin-block-end: var(--atlas-dialog-subtext-margin-block-end);\n\t\tpadding-inline: var(--atlas-dialog-inline-spacing);\n\n\t\tfont: var(--atlas-type-body-large-regular);\n\t\tfont-weight: var(--atlas-type-body-large-regular-font-weight);\n\t\tcolor: var(--atlas-color-primary-n400);\n\t}\n\n\tatlas-dialog::part(body) {\n\t\twidth: auto;\n\t\tdisplay: block;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\tmargin-inline: var(--atlas-dialog-inline-spacing);\n\n\t\tfont-family: var(--atlas-type-body-large-regular-font-family);\n\t\tcolor: var(--atlas-color-primary-n400);\n\n\t\tmargin-block-start: var(--atlas-dialog-body-block-start);\n\t\tpadding-block-end: var(--atlas-dialog-footer-block-spacing);\n\n\t\tmax-width: var(--atlas-dialog-max-width);\n\t}\n\n\tatlas-dialog::part(footer) {\n\t\tdisplay: block;\n\t\tpadding: var(--atlas-dialog-footer-block-spacing) var(--atlas-dialog-inline-spacing);\n\t\tpadding-block-start: 0;\n\t}\n\n\tatlas-dialog[blade]::part(container) {\n\t\tmax-height: 100vh;\n\t\theight: 100%;\n\t\tgrid-template-areas:\n\t\t\t\"title dismisser\"\n\t\t\t\"subtext subtext\"\n\t\t\t\"body body\"\n\t\t\t\"footer footer\";\n\t\tborder-radius: 0;\n\t\tbox-shadow: var(--atlas-shadow-100);\n\t}\n\n\tatlas-dialog[blade]::part(dismissible) {\n\t\tgrid-area: dismisser;\n\t\tmargin: 0;\n\t}\n\n\tatlas-dialog[blade]::part(title) {\n\t\tgrid-area: title;\n\t\tmargin: 0;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t}\n\n\tatlas-dialog[blade]::part(subtext) {\n\t\tgrid-area: subtext;\n\t}\n\n\tatlas-dialog[blade]::part(body) {\n\t\tgrid-area: body;\n\t\tmargin-block-start: var(--atlas-dialog-inline-spacing);\n\t}\n\n\tatlas-dialog[blade]::part(footer) {\n\t\tgrid-area: footer;\n\t}\n\n\tatlas-dialog[blade]::part(dialog) {\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tmargin: 0;\n\t\tmargin-inline-end: 0;\n\t\tmargin-inline-start: auto;\n\t\tpadding: 0;\n\t\theight: 100%;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/dialog.css"],"names":[],"mappings":"AAAA;CACC;;EAEC,aAAa;CACd;;CAEA;;EAEC,aAAa;CACd;;CAEA;EACC,oDAAoD;EACpD,yDAAyD;EACzD,2CAA2C;EAC3C,4BAA4B;EAC5B,sCAAsC;EACtC,2CAA2C;EAC3C,0CAA0C;EAC1C,uCAAuC;EACvC,+BAA+B;;EAE/B,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,oCAAoC;CACrC;;CAEA;EACC,SAAS;EACT,sBAAsB;EACtB,uBAAuB;CACxB;;CAEA;EACC,aAAa;EACb,sBAAsB;EACtB,0BAA0B;EAC1B,qFAAqF;EACrF,sCAAsC;EACtC,gDAAgD;EAChD,gDAAgD;;EAEhD,gBAAgB;CACjB;;CAEA;EACC,aAAa;EACb,oBAAoB;EACpB,kEAAkE;EAClE,gDAAgD;CACjD;;CAEA;EACC,cAAc;EACd,sBAAsB;EACtB,kDAAkD;;EAElD,4CAA4C;EAC5C,sCAAsC;CACvC;;CAEA;EACC,cAAc;EACd,8DAA8D;EAC9D,kDAAkD;;EAElD,0CAA0C;EAC1C,6DAA6D;EAC7D,sCAAsC;CACvC;;CAEA;EACC,WAAW;EACX,cAAc;EACd,gBAAgB;EAChB,kBAAkB;EAClB,iDAAiD;;EAEjD,6DAA6D;EAC7D,sCAAsC;;EAEtC,wDAAwD;EACxD,2DAA2D;;EAE3D,wCAAwC;CACzC;;CAEA;EACC,cAAc;EACd,oFAAoF;EACpF,sBAAsB;CACvB;;CAEA;EACC,iBAAiB;EACjB,YAAY;EACZ;;;;kBAIgB;EAChB,gBAAgB;EAChB,mCAAmC;CACpC;;CAEA;EACC,oBAAoB;EACpB,SAAS;CACV;;CAEA;EACC,gBAAgB;EAChB,SAAS;EACT,aAAa;EACb,mBAAmB;CACpB;;CAEA;EACC,kBAAkB;CACnB;;CAEA;EACC,eAAe;EACf,sDAAsD;CACvD;;CAEA;EACC,iBAAiB;CAClB;;CAEA;EACC,cAAc;EACd,kBAAkB;EAClB,SAAS;EACT,oBAAoB;EACpB,yBAAyB;EACzB,UAAU;EACV,YAAY;CACb;AACD","sourcesContent":["@layer atlas {\n\tatlas-dialog[open=\"false\"],\n\tatlas-dialog:not([open]) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-dialog[open=\"true\"],\n\tatlas-dialog:is([open]) {\n\t\tdisplay: flex;\n\t}\n\n\tatlas-dialog {\n\t\t--atlas-dialog-dismissible-margin-block-end: 0.25rem;\n\t\t--atlas-dialog-background-color: var(--atlas-color-white);\n\t\t--atlas-dialog-footer-block-spacing: 2.5rem;\n\t\t--atlas-dialog-padding: 1rem;\n\t\t--atlas-dialog-inline-spacing: 3.75rem;\n\t\t--atlas-dialog-dismissible-padding: 1.25rem;\n\t\t--atlas-dialog-subtext-margin-block-end: 0;\n\t\t--atlas-dialog-body-block-start: 1.5rem;\n\t\t--atlas-dialog-max-width: 600px;\n\n\t\theight: 100vh;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tpadding: var(--atlas-dialog-padding);\n\t}\n\n\tatlas-dialog[open]::part(dialog) {\n\t\tborder: 0;\n\t\tbox-sizing: border-box;\n\t\tbackground: transparent;\n\t}\n\n\tatlas-dialog::part(container) {\n\t\tdisplay: grid;\n\t\tbox-sizing: border-box;\n\t\tgrid-template-columns: 1fr;\n\t\tmax-height: calc(100vh - (var(--atlas-dialog-padding) + var(--atlas-dialog-padding)));\n\t\tgrid-template-rows: auto auto 1fr auto;\n\t\tbackground: var(--atlas-dialog-background-color);\n\t\tborder-radius: var(--atlas-dialog-border-radius);\n\n\t\toverflow: hidden;\n\t}\n\n\tatlas-dialog::part(dismissible) {\n\t\tdisplay: grid;\n\t\tjustify-content: end;\n\t\tmargin-block-end: var(--atlas-dialog-dismissible-margin-block-end);\n\t\tpadding: var(--atlas-dialog-dismissible-padding);\n\t}\n\n\tatlas-dialog::part(title) {\n\t\tdisplay: block;\n\t\tmargin-block-end: 1rem;\n\t\tpadding-inline: var(--atlas-dialog-inline-spacing);\n\n\t\tfont: var(--atlas-type-title-large-semibold);\n\t\tcolor: var(--atlas-color-primary-n400);\n\t}\n\n\tatlas-dialog > [slot=\"subtext\"] {\n\t\tdisplay: block;\n\t\tmargin-block-end: var(--atlas-dialog-subtext-margin-block-end);\n\t\tpadding-inline: var(--atlas-dialog-inline-spacing);\n\n\t\tfont: var(--atlas-type-body-large-regular);\n\t\tfont-weight: var(--atlas-type-body-large-regular-font-weight);\n\t\tcolor: var(--atlas-color-primary-n400);\n\t}\n\n\tatlas-dialog::part(body) {\n\t\twidth: auto;\n\t\tdisplay: block;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\tmargin-inline: var(--atlas-dialog-inline-spacing);\n\n\t\tfont-family: var(--atlas-type-body-large-regular-font-family);\n\t\tcolor: var(--atlas-color-primary-n400);\n\n\t\tmargin-block-start: var(--atlas-dialog-body-block-start);\n\t\tpadding-block-end: var(--atlas-dialog-footer-block-spacing);\n\n\t\tmax-width: var(--atlas-dialog-max-width);\n\t}\n\n\tatlas-dialog::part(footer) {\n\t\tdisplay: block;\n\t\tpadding: var(--atlas-dialog-footer-block-spacing) var(--atlas-dialog-inline-spacing);\n\t\tpadding-block-start: 0;\n\t}\n\n\tatlas-dialog[blade]::part(container) {\n\t\tmax-height: 100vh;\n\t\theight: 100%;\n\t\tgrid-template-areas:\n\t\t\t\"title dismisser\"\n\t\t\t\"subtext subtext\"\n\t\t\t\"body body\"\n\t\t\t\"footer footer\";\n\t\tborder-radius: 0;\n\t\tbox-shadow: var(--atlas-shadow-100);\n\t}\n\n\tatlas-dialog[blade]::part(dismissible) {\n\t\tgrid-area: dismisser;\n\t\tmargin: 0;\n\t}\n\n\tatlas-dialog[blade]::part(title) {\n\t\tgrid-area: title;\n\t\tmargin: 0;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t}\n\n\tatlas-dialog[blade]::part(subtext) {\n\t\tgrid-area: subtext;\n\t}\n\n\tatlas-dialog[blade]::part(body) {\n\t\tgrid-area: body;\n\t\tmargin-block-start: var(--atlas-dialog-inline-spacing);\n\t}\n\n\tatlas-dialog[blade]::part(footer) {\n\t\tgrid-area: footer;\n\t}\n\n\tatlas-dialog[blade]::part(dialog) {\n\t\tdisplay: block;\n\t\tposition: absolute;\n\t\tmargin: 0;\n\t\tmargin-inline-end: 0;\n\t\tmargin-inline-start: auto;\n\t\tpadding: 0;\n\t\theight: 100%;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/feed.css":
/*!***************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/feed.css ***!
  \***************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-feed {\n\t\t--default-background-color: var(--atlas-color-primary-n50);\n\t\t--default-container-width-size: 300px;\n\n\t\t--background-color-container: var(--default-background-color);\n\t\tbackground-color: var(--background-color-container);\n\t\tpadding: var(--desktop-common-block-start) 1em 1em 1em;\n\t\tdisplay: block;\n\t\theight: 100vh;\n\t\toverflow-y: auto;\n\t\twidth: var(--default-container-width-size);\n\t\tbox-sizing: border-box;\n\t}\n\n\tatlas-feed::part(prefix) {\n\t\tdisplay: flex;\n\t}\n\n\t@media (max-width: 800px) {\n\t\tatlas-feed {\n\t\t\twidth: 100%;\n\t\t}\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/feed.css"],"names":[],"mappings":"AAAA;CACC;EACC,0DAA0D;EAC1D,qCAAqC;;EAErC,6DAA6D;EAC7D,mDAAmD;EACnD,sDAAsD;EACtD,cAAc;EACd,aAAa;EACb,gBAAgB;EAChB,0CAA0C;EAC1C,sBAAsB;CACvB;;CAEA;EACC,aAAa;CACd;;CAEA;EACC;GACC,WAAW;EACZ;CACD;AACD","sourcesContent":["@layer atlas {\n\tatlas-feed {\n\t\t--default-background-color: var(--atlas-color-primary-n50);\n\t\t--default-container-width-size: 300px;\n\n\t\t--background-color-container: var(--default-background-color);\n\t\tbackground-color: var(--background-color-container);\n\t\tpadding: var(--desktop-common-block-start) 1em 1em 1em;\n\t\tdisplay: block;\n\t\theight: 100vh;\n\t\toverflow-y: auto;\n\t\twidth: var(--default-container-width-size);\n\t\tbox-sizing: border-box;\n\t}\n\n\tatlas-feed::part(prefix) {\n\t\tdisplay: flex;\n\t}\n\n\t@media (max-width: 800px) {\n\t\tatlas-feed {\n\t\t\twidth: 100%;\n\t\t}\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/icon.css":
/*!***************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/icon.css ***!
  \***************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-icon {\n\t\t--atlas-icon-default-color: var(--atlas-color-primary-n300);\n\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tcolor: var(--atlas-icon-default-color);\n\t}\n\n\tatlas-icon::part(image) {\n\t\taspect-ratio: 1/1;\n\t\twidth: 1.5em;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/icon.css"],"names":[],"mappings":"AAAA;CACC;EACC,2DAA2D;;EAE3D,aAAa;EACb,mBAAmB;EACnB,uBAAuB;EACvB,sCAAsC;CACvC;;CAEA;EACC,iBAAiB;EACjB,YAAY;CACb;AACD","sourcesContent":["@layer atlas {\n\tatlas-icon {\n\t\t--atlas-icon-default-color: var(--atlas-color-primary-n300);\n\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tcolor: var(--atlas-icon-default-color);\n\t}\n\n\tatlas-icon::part(image) {\n\t\taspect-ratio: 1/1;\n\t\twidth: 1.5em;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-checkbox.css":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-checkbox.css ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-checkbox {\n\t\t--custom-accent-color: #0b9ecd;\n\t\t--custom-outline-color: #0e7799;\n\t\t--box-width: 1.35em;\n\t\t--gap: 0.5em;\n\t}\n\n\tatlas-checkbox {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: var(--gap);\n\t}\n\n\tatlas-checkbox::part(input) {\n\t\tcursor: pointer;\n\t\twidth: var(--box-width);\n\t\taspect-ratio: 1 / 1;\n\n\t\taccent-color: var(--atlas-input-common-accent-color);\n\t\toutline-color: var(--atlas-input-common-accent-color);\n\t\toutline-offset: -1px;\n\t}\n\n\tatlas-checkbox::part(input):focus-visible {\n\t\tbox-shadow: 0 0 5px var(--atlas-input-common-accent-color);\n\t}\n\n\tatlas-checkbox::part(input):hover {\n\t\taccent-color: var(--custom-accent-color);\n\t\toutline-color: var(--custom-outline-color);\n\t}\n\n\tatlas-checkbox::part(input):active {\n\t\toutline: none;\n\t\tbox-shadow: none;\n\t}\n\n\tatlas-checkbox::part(label) {\n\t\tcursor: pointer;\n\t}\n\n\tatlas-checkbox::part(required) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-checkbox[required]:not([required=\"false\"])::part(required) {\n\t\tdisplay: inline;\n\t}\n\n\tatlas-checkbox::part(helper-text) {\n\t\tdisplay: none;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/input-checkbox.css"],"names":[],"mappings":"AAAA;CACC;EACC,8BAA8B;EAC9B,+BAA+B;EAC/B,mBAAmB;EACnB,YAAY;CACb;;CAEA;EACC,aAAa;EACb,mBAAmB;EACnB,eAAe;CAChB;;CAEA;EACC,eAAe;EACf,uBAAuB;EACvB,mBAAmB;;EAEnB,oDAAoD;EACpD,qDAAqD;EACrD,oBAAoB;CACrB;;CAEA;EACC,0DAA0D;CAC3D;;CAEA;EACC,wCAAwC;EACxC,0CAA0C;CAC3C;;CAEA;EACC,aAAa;EACb,gBAAgB;CACjB;;CAEA;EACC,eAAe;CAChB;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,eAAe;CAChB;;CAEA;EACC,aAAa;CACd;AACD","sourcesContent":["@layer atlas {\n\tatlas-checkbox {\n\t\t--custom-accent-color: #0b9ecd;\n\t\t--custom-outline-color: #0e7799;\n\t\t--box-width: 1.35em;\n\t\t--gap: 0.5em;\n\t}\n\n\tatlas-checkbox {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: var(--gap);\n\t}\n\n\tatlas-checkbox::part(input) {\n\t\tcursor: pointer;\n\t\twidth: var(--box-width);\n\t\taspect-ratio: 1 / 1;\n\n\t\taccent-color: var(--atlas-input-common-accent-color);\n\t\toutline-color: var(--atlas-input-common-accent-color);\n\t\toutline-offset: -1px;\n\t}\n\n\tatlas-checkbox::part(input):focus-visible {\n\t\tbox-shadow: 0 0 5px var(--atlas-input-common-accent-color);\n\t}\n\n\tatlas-checkbox::part(input):hover {\n\t\taccent-color: var(--custom-accent-color);\n\t\toutline-color: var(--custom-outline-color);\n\t}\n\n\tatlas-checkbox::part(input):active {\n\t\toutline: none;\n\t\tbox-shadow: none;\n\t}\n\n\tatlas-checkbox::part(label) {\n\t\tcursor: pointer;\n\t}\n\n\tatlas-checkbox::part(required) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-checkbox[required]:not([required=\"false\"])::part(required) {\n\t\tdisplay: inline;\n\t}\n\n\tatlas-checkbox::part(helper-text) {\n\t\tdisplay: none;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-chip-group.css":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-chip-group.css ***!
  \***************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-input-chip-group {\n\t\t--inset-size: 1em;\n\n\t\t--wrapper-border-radius: var(--atlas-input-common-border-radius);\n\t\t--wrapper-border: var(--atlas-input-common-border);\n\n\t\t--chips-label-font-size: var(--atlas-input-common-label-font-size);\n\t\t--chips-label-color: var(--atlas-input-common-label-color);\n\t\t--chips-label-padding-before: 0.5em;\n\t\t--chips-label-padding-after: 0.55em;\n\t\t--chips-label-margin-top: 1.2em;\n\n\t\t--chips-min-height: calc(var(--atlas-chip-body-height) * 5);\n\t\t--chips-max-height: calc(var(--atlas-chip-body-height) * 9);\n\n\t\t--suggestion-min-height: calc(var(--atlas-chip-body-height) * 2);\n\t\t--suggestion-max-height: calc(var(--atlas-chip-body-height) * 5);\n\t\t--suggestion-box-shadow: var(--atlas-input-common-box-shadow);\n\t\t--suggestion-inline-padding: 0.5em;\n\n\t\t--overall-control-padding: 0.5em;\n\t\t--overall-margin-block-end: 3em;\n\n\t\t--backdrop-opacity: 0.7;\n\t\t--backdrop-height: 100%;\n\n\t\tdisplay: grid;\n\t\tgrid-template-columns: 1fr;\n\t\tgrid-template-areas:\n\t\t\t\"label\"\n\t\t\t\"input\"\n\t\t\t\"suggestion\"\n\t\t\t\"controls\"\n\t\t\t\"chips-label\"\n\t\t\t\"chips\";\n\n\t\twidth: 100%;\n\t\tpadding-block: var(--overall-control-padding);\n\t\tmargin-block-end: var(--overall-margin-block-end);\n\t}\n\n\tatlas-input-chip-group::part(label) {\n\t\tgrid-area: label;\n\t\tfont-size: var(--atlas-input-common-label-font-size);\n\t}\n\n\tatlas-input-chip-group > [slot=\"label\"] {\n\t\tdisplay: block;\n\t\tmargin-block-end: var(--atlas-input-common-label-block-spacing);\n\t}\n\n\tatlas-input-chip-group::part(chips-label) {\n\t\tgrid-area: chips-label;\n\t\tdisplay: block;\n\t\tcolor: var(--chips-label-color);\n\t\tborder-inline: var(--wrapper-border);\n\t\tborder-block-start: var(--wrapper-border);\n\t\tpadding-block-start: var(--chips-label-padding-before);\n\t\tpadding-block-end: var(--chips-label-padding-after);\n\t\tpadding-inline-start: var(--inset-size);\n\t\tborder-radius: var(--wrapper-border-radius) var(--wrapper-border-radius) 0 0;\n\t}\n\n\tatlas-input-chip-group [slot=\"chips-label\"] {\n\t\tfont-size: var(--chips-label-font-size);\n\t}\n\n\tatlas-input-chip-group::part(chips-label),\n\tatlas-input-chip-group::part(chips-scroll-view) {\n\t\tbackground-color: var(--atlas-input-common-background-color);\n\t}\n\n\tatlas-input-chip-group::part(chips-scroll-view) {\n\t\tgrid-area: chips;\n\t\tdisplay: block;\n\n\t\tpadding-inline: var(--inset-size);\n\t\tpadding-block-end: var(--inset-size);\n\t\tpadding-block-end: var(--inset-size);\n\n\t\tborder-inline: var(--wrapper-border);\n\t\tborder-block-end: var(--wrapper-border);\n\n\t\tborder-radius: 0 0 var(--wrapper-border-radius) var(--wrapper-border-radius);\n\n\t\tmin-height: var(--chips-min-height);\n\t\tmax-height: var(--chips-max-height);\n\t}\n\n\tatlas-input-chip-group::part(chips) {\n\t\tdisplay: block;\n\t\theight: 100%;\n\t\toverflow-y: auto;\n\t}\n\n\tatlas-input-chip-group > atlas-chip-group:not([slot]) {\n\t\tpadding-block: 0;\n\t}\n\n\tatlas-input-chip-group::part(controls) {\n\t\tgrid-area: controls;\n\t\tdisplay: block;\n\t}\n\n\tatlas-input-chip-group::part(input) {\n\t\tgrid-area: input;\n\t\tdisplay: block;\n\t}\n\n\tatlas-input-chip-group::part(suggestion-scroll-view) {\n\t\tgrid-area: suggestion;\n\t\tdisplay: none;\n\t}\n\n\tatlas-input-chip-group::part(suggestion) {\n\t\tdisplay: inherit;\n\t}\n\n\tatlas-input-chip-group[show-suggestion]::part(suggestion-scroll-view) {\n\t\tdisplay: block;\n\t\tgrid-area: controls / chips / span 3;\n\t\tisolation: isolate;\n\t\tposition: relative;\n\t}\n\n\tatlas-input-chip-group[show-suggestion]::part(suggestion) {\n\t\tpadding-inline: var(--suggestion-inline-padding);\n\n\t\tmax-width: 100%;\n\t\tmin-height: var(--suggestion-min-height);\n\t\tmax-height: var(--suggestion-max-height);\n\t\toverflow-y: auto;\n\n\t\tborder: none;\n\t\tbox-shadow: var(--suggestion-box-shadow);\n\t\tbackground-color: var(--atlas-color-white);\n\t\tborder-radius: var(--atlas-input-common-border-radius);\n\t}\n\n\tatlas-input-chip-group[show-suggestion]::part(suggestion-scroll-view)::after {\n\t\tcontent: \"\";\n\t\tbackground-color: var(--atlas-color-white);\n\t\topacity: var(--backdrop-opacity);\n\t\theight: var(--backdrop-height);\n\n\t\tposition: absolute;\n\t\tbottom: 0;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tz-index: -1;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/input-chip-group.css"],"names":[],"mappings":"AAAA;CACC;EACC,iBAAiB;;EAEjB,gEAAgE;EAChE,kDAAkD;;EAElD,kEAAkE;EAClE,0DAA0D;EAC1D,mCAAmC;EACnC,mCAAmC;EACnC,+BAA+B;;EAE/B,2DAA2D;EAC3D,2DAA2D;;EAE3D,gEAAgE;EAChE,gEAAgE;EAChE,6DAA6D;EAC7D,kCAAkC;;EAElC,gCAAgC;EAChC,+BAA+B;;EAE/B,uBAAuB;EACvB,uBAAuB;;EAEvB,aAAa;EACb,0BAA0B;EAC1B;;;;;;UAMQ;;EAER,WAAW;EACX,6CAA6C;EAC7C,iDAAiD;CAClD;;CAEA;EACC,gBAAgB;EAChB,oDAAoD;CACrD;;CAEA;EACC,cAAc;EACd,+DAA+D;CAChE;;CAEA;EACC,sBAAsB;EACtB,cAAc;EACd,+BAA+B;EAC/B,oCAAoC;EACpC,yCAAyC;EACzC,sDAAsD;EACtD,mDAAmD;EACnD,uCAAuC;EACvC,4EAA4E;CAC7E;;CAEA;EACC,uCAAuC;CACxC;;CAEA;;EAEC,4DAA4D;CAC7D;;CAEA;EACC,gBAAgB;EAChB,cAAc;;EAEd,iCAAiC;EACjC,oCAAoC;EACpC,oCAAoC;;EAEpC,oCAAoC;EACpC,uCAAuC;;EAEvC,4EAA4E;;EAE5E,mCAAmC;EACnC,mCAAmC;CACpC;;CAEA;EACC,cAAc;EACd,YAAY;EACZ,gBAAgB;CACjB;;CAEA;EACC,gBAAgB;CACjB;;CAEA;EACC,mBAAmB;EACnB,cAAc;CACf;;CAEA;EACC,gBAAgB;EAChB,cAAc;CACf;;CAEA;EACC,qBAAqB;EACrB,aAAa;CACd;;CAEA;EACC,gBAAgB;CACjB;;CAEA;EACC,cAAc;EACd,oCAAoC;EACpC,kBAAkB;EAClB,kBAAkB;CACnB;;CAEA;EACC,gDAAgD;;EAEhD,eAAe;EACf,wCAAwC;EACxC,wCAAwC;EACxC,gBAAgB;;EAEhB,YAAY;EACZ,wCAAwC;EACxC,0CAA0C;EAC1C,sDAAsD;CACvD;;CAEA;EACC,WAAW;EACX,0CAA0C;EAC1C,gCAAgC;EAChC,8BAA8B;;EAE9B,kBAAkB;EAClB,SAAS;EACT,MAAM;EACN,OAAO;EACP,QAAQ;EACR,WAAW;CACZ;AACD","sourcesContent":["@layer atlas {\n\tatlas-input-chip-group {\n\t\t--inset-size: 1em;\n\n\t\t--wrapper-border-radius: var(--atlas-input-common-border-radius);\n\t\t--wrapper-border: var(--atlas-input-common-border);\n\n\t\t--chips-label-font-size: var(--atlas-input-common-label-font-size);\n\t\t--chips-label-color: var(--atlas-input-common-label-color);\n\t\t--chips-label-padding-before: 0.5em;\n\t\t--chips-label-padding-after: 0.55em;\n\t\t--chips-label-margin-top: 1.2em;\n\n\t\t--chips-min-height: calc(var(--atlas-chip-body-height) * 5);\n\t\t--chips-max-height: calc(var(--atlas-chip-body-height) * 9);\n\n\t\t--suggestion-min-height: calc(var(--atlas-chip-body-height) * 2);\n\t\t--suggestion-max-height: calc(var(--atlas-chip-body-height) * 5);\n\t\t--suggestion-box-shadow: var(--atlas-input-common-box-shadow);\n\t\t--suggestion-inline-padding: 0.5em;\n\n\t\t--overall-control-padding: 0.5em;\n\t\t--overall-margin-block-end: 3em;\n\n\t\t--backdrop-opacity: 0.7;\n\t\t--backdrop-height: 100%;\n\n\t\tdisplay: grid;\n\t\tgrid-template-columns: 1fr;\n\t\tgrid-template-areas:\n\t\t\t\"label\"\n\t\t\t\"input\"\n\t\t\t\"suggestion\"\n\t\t\t\"controls\"\n\t\t\t\"chips-label\"\n\t\t\t\"chips\";\n\n\t\twidth: 100%;\n\t\tpadding-block: var(--overall-control-padding);\n\t\tmargin-block-end: var(--overall-margin-block-end);\n\t}\n\n\tatlas-input-chip-group::part(label) {\n\t\tgrid-area: label;\n\t\tfont-size: var(--atlas-input-common-label-font-size);\n\t}\n\n\tatlas-input-chip-group > [slot=\"label\"] {\n\t\tdisplay: block;\n\t\tmargin-block-end: var(--atlas-input-common-label-block-spacing);\n\t}\n\n\tatlas-input-chip-group::part(chips-label) {\n\t\tgrid-area: chips-label;\n\t\tdisplay: block;\n\t\tcolor: var(--chips-label-color);\n\t\tborder-inline: var(--wrapper-border);\n\t\tborder-block-start: var(--wrapper-border);\n\t\tpadding-block-start: var(--chips-label-padding-before);\n\t\tpadding-block-end: var(--chips-label-padding-after);\n\t\tpadding-inline-start: var(--inset-size);\n\t\tborder-radius: var(--wrapper-border-radius) var(--wrapper-border-radius) 0 0;\n\t}\n\n\tatlas-input-chip-group [slot=\"chips-label\"] {\n\t\tfont-size: var(--chips-label-font-size);\n\t}\n\n\tatlas-input-chip-group::part(chips-label),\n\tatlas-input-chip-group::part(chips-scroll-view) {\n\t\tbackground-color: var(--atlas-input-common-background-color);\n\t}\n\n\tatlas-input-chip-group::part(chips-scroll-view) {\n\t\tgrid-area: chips;\n\t\tdisplay: block;\n\n\t\tpadding-inline: var(--inset-size);\n\t\tpadding-block-end: var(--inset-size);\n\t\tpadding-block-end: var(--inset-size);\n\n\t\tborder-inline: var(--wrapper-border);\n\t\tborder-block-end: var(--wrapper-border);\n\n\t\tborder-radius: 0 0 var(--wrapper-border-radius) var(--wrapper-border-radius);\n\n\t\tmin-height: var(--chips-min-height);\n\t\tmax-height: var(--chips-max-height);\n\t}\n\n\tatlas-input-chip-group::part(chips) {\n\t\tdisplay: block;\n\t\theight: 100%;\n\t\toverflow-y: auto;\n\t}\n\n\tatlas-input-chip-group > atlas-chip-group:not([slot]) {\n\t\tpadding-block: 0;\n\t}\n\n\tatlas-input-chip-group::part(controls) {\n\t\tgrid-area: controls;\n\t\tdisplay: block;\n\t}\n\n\tatlas-input-chip-group::part(input) {\n\t\tgrid-area: input;\n\t\tdisplay: block;\n\t}\n\n\tatlas-input-chip-group::part(suggestion-scroll-view) {\n\t\tgrid-area: suggestion;\n\t\tdisplay: none;\n\t}\n\n\tatlas-input-chip-group::part(suggestion) {\n\t\tdisplay: inherit;\n\t}\n\n\tatlas-input-chip-group[show-suggestion]::part(suggestion-scroll-view) {\n\t\tdisplay: block;\n\t\tgrid-area: controls / chips / span 3;\n\t\tisolation: isolate;\n\t\tposition: relative;\n\t}\n\n\tatlas-input-chip-group[show-suggestion]::part(suggestion) {\n\t\tpadding-inline: var(--suggestion-inline-padding);\n\n\t\tmax-width: 100%;\n\t\tmin-height: var(--suggestion-min-height);\n\t\tmax-height: var(--suggestion-max-height);\n\t\toverflow-y: auto;\n\n\t\tborder: none;\n\t\tbox-shadow: var(--suggestion-box-shadow);\n\t\tbackground-color: var(--atlas-color-white);\n\t\tborder-radius: var(--atlas-input-common-border-radius);\n\t}\n\n\tatlas-input-chip-group[show-suggestion]::part(suggestion-scroll-view)::after {\n\t\tcontent: \"\";\n\t\tbackground-color: var(--atlas-color-white);\n\t\topacity: var(--backdrop-opacity);\n\t\theight: var(--backdrop-height);\n\n\t\tposition: absolute;\n\t\tbottom: 0;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tz-index: -1;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-dropdown.css":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-dropdown.css ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-dropdown {\n\t\t--default-width: 100%;\n\t\t--menu-padding: 1em;\n\t\t--menu-margin-block-start: 0.35em;\n\t\t--menu-bg-color: var(--atlas-input-common-background-color);\n\t}\n\n\tatlas-dropdown {\n\t\tposition: relative;\n\t\tisolation: isolate;\n\t\tdisplay: inline-block;\n\t\twidth: var(--default-width);\n\t}\n\n\tatlas-dropdown::part(menu) {\n\t\tdisplay: none;\n\n\t\tmax-height: fit-content;\n\t\twidth: calc(var(--default-width) - (var(--menu-padding) * 2));\n\t\tpadding: var(--menu-padding);\n\t\tmargin-block-start: var(--menu-margin-block-start);\n\n\t\tbackground-color: var(--menu-bg-color);\n\t\tposition: absolute;\n\t\toverflow-y: auto;\n\n\t\tborder: none;\n\t\tbox-shadow: var(--atlas-input-common-box-shadow);\n\t\tborder-radius: var(--atlas-input-common-border-radius);\n\t}\n\n\tatlas-dropdown[open]:not([open=\"false\"])::part(menu) {\n\t\tdisplay: block;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/input-dropdown.css"],"names":[],"mappings":"AAAA;CACC;EACC,qBAAqB;EACrB,mBAAmB;EACnB,iCAAiC;EACjC,2DAA2D;CAC5D;;CAEA;EACC,kBAAkB;EAClB,kBAAkB;EAClB,qBAAqB;EACrB,2BAA2B;CAC5B;;CAEA;EACC,aAAa;;EAEb,uBAAuB;EACvB,6DAA6D;EAC7D,4BAA4B;EAC5B,kDAAkD;;EAElD,sCAAsC;EACtC,kBAAkB;EAClB,gBAAgB;;EAEhB,YAAY;EACZ,gDAAgD;EAChD,sDAAsD;CACvD;;CAEA;EACC,cAAc;CACf;AACD","sourcesContent":["@layer atlas {\n\tatlas-dropdown {\n\t\t--default-width: 100%;\n\t\t--menu-padding: 1em;\n\t\t--menu-margin-block-start: 0.35em;\n\t\t--menu-bg-color: var(--atlas-input-common-background-color);\n\t}\n\n\tatlas-dropdown {\n\t\tposition: relative;\n\t\tisolation: isolate;\n\t\tdisplay: inline-block;\n\t\twidth: var(--default-width);\n\t}\n\n\tatlas-dropdown::part(menu) {\n\t\tdisplay: none;\n\n\t\tmax-height: fit-content;\n\t\twidth: calc(var(--default-width) - (var(--menu-padding) * 2));\n\t\tpadding: var(--menu-padding);\n\t\tmargin-block-start: var(--menu-margin-block-start);\n\n\t\tbackground-color: var(--menu-bg-color);\n\t\tposition: absolute;\n\t\toverflow-y: auto;\n\n\t\tborder: none;\n\t\tbox-shadow: var(--atlas-input-common-box-shadow);\n\t\tborder-radius: var(--atlas-input-common-border-radius);\n\t}\n\n\tatlas-dropdown[open]:not([open=\"false\"])::part(menu) {\n\t\tdisplay: block;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-search.css":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-search.css ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-search {\n\t\t--border-color: var(--atlas-color-primary-n100);\n\n\t\t--disabled-search-text-color: var(--atlas-color-primary-n400);\n\t\t--disabled-background-color: var(--atlas-color-primary-n50);\n\n\t\t--border-radius: 0.25em;\n\t\t--border: 1px solid var(--atlas-color-primary-n200);\n\t\t--search-text-color: var(--atlas-color-primary-n400);\n\n\t\t--search-text-font-weight: 400;\n\t\t--search-text-font-size: 1em;\n\n\t\t--inner-space: 0.8em;\n\n\t\t--affix-color: var(--atlas-color-primary-n100);\n\t\t--affix-font-size: 0.75em;\n\t\t--affix-inline-margin: 1.25em;\n\t\t--affix-affordance: 3em;\n\t}\n\n\tatlas-search {\n\t\tdisplay: grid;\n\n\t\tgrid-template-columns: min-content 1fr min-content;\n\t\tgrid-template-areas:\n\t\t\t\"P I S\"\n\t\t\t\"M M M\";\n\t}\n\n\tatlas-search::part(label) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-search::part(menu) {\n\t\tgrid-area: M;\n\t}\n\n\tatlas-search:not([show-menu])::part(menu),\n\tatlas-search[show-menu=\"false\"]::part(menu) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-search::part(prefix) {\n\t\tdisplay: inline-block;\n\t\tgrid-area: P;\n\n\t\talign-self: center;\n\t\tfont-size: var(--affix-font-size);\n\n\t\tcolor: var(--affix-color);\n\n\t\tmargin-inline-start: var(--affix-inline-margin);\n\t}\n\n\tatlas-search::part(suffix) {\n\t\tdisplay: inline-block;\n\t\tgrid-area: S;\n\n\t\talign-self: center;\n\t\tfont-size: var(--affix-font-size);\n\n\t\tcolor: var(--affix-color);\n\n\t\tmargin-inline-end: var(--affix-inline-margin);\n\t}\n\n\tatlas-search::part(input) {\n\t\tdisplay: inline-block;\n\n\t\tgrid-row: 1;\n\t\tgrid-column: 1 / span 3;\n\n\t\twidth: auto;\n\t\tmargin: 0;\n\t\tpadding-block: 0;\n\n\t\tfont-weight: var(--search-text-font-weight);\n\t\tfont-size: var(--search-text-font-size);\n\n\t\tcolor: var(--search-text-color);\n\t\tbackground-color: var(--atlas-input-common-background-color);\n\t\tborder: var(--border);\n\t\tborder-radius: var(--border-radius);\n\n\t\tpadding-block: var(--inner-space);\n\t\tpadding-inline: var(--affix-affordance);\n\t}\n\n\tatlas-search[disabled]:not([disabled=\"false\"])::part(input) {\n\t\tbackground-color: var(--disabled-background-color);\n\t\tborder-color: var(--disabled-background-color);\n\t\tcolor: var(--disabled-search-text-color);\n\t\tpointer-events: none;\n\t\tcursor: auto;\n\t}\n\n\tatlas-search[disabled]:not([disabled=\"false\"])::part(suffix) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-search:focus-within::part(input) {\n\t\tbox-shadow: var(--atlas-input-common-box-shadow);\n\t\toutline: none;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/input-search.css"],"names":[],"mappings":"AAAA;CACC;EACC,+CAA+C;;EAE/C,6DAA6D;EAC7D,2DAA2D;;EAE3D,uBAAuB;EACvB,mDAAmD;EACnD,oDAAoD;;EAEpD,8BAA8B;EAC9B,4BAA4B;;EAE5B,oBAAoB;;EAEpB,8CAA8C;EAC9C,yBAAyB;EACzB,6BAA6B;EAC7B,uBAAuB;CACxB;;CAEA;EACC,aAAa;;EAEb,kDAAkD;EAClD;;UAEQ;CACT;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,YAAY;CACb;;CAEA;;EAEC,aAAa;CACd;;CAEA;EACC,qBAAqB;EACrB,YAAY;;EAEZ,kBAAkB;EAClB,iCAAiC;;EAEjC,yBAAyB;;EAEzB,+CAA+C;CAChD;;CAEA;EACC,qBAAqB;EACrB,YAAY;;EAEZ,kBAAkB;EAClB,iCAAiC;;EAEjC,yBAAyB;;EAEzB,6CAA6C;CAC9C;;CAEA;EACC,qBAAqB;;EAErB,WAAW;EACX,uBAAuB;;EAEvB,WAAW;EACX,SAAS;EACT,gBAAgB;;EAEhB,2CAA2C;EAC3C,uCAAuC;;EAEvC,+BAA+B;EAC/B,4DAA4D;EAC5D,qBAAqB;EACrB,mCAAmC;;EAEnC,iCAAiC;EACjC,uCAAuC;CACxC;;CAEA;EACC,kDAAkD;EAClD,8CAA8C;EAC9C,wCAAwC;EACxC,oBAAoB;EACpB,YAAY;CACb;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,gDAAgD;EAChD,aAAa;CACd;AACD","sourcesContent":["@layer atlas {\n\tatlas-search {\n\t\t--border-color: var(--atlas-color-primary-n100);\n\n\t\t--disabled-search-text-color: var(--atlas-color-primary-n400);\n\t\t--disabled-background-color: var(--atlas-color-primary-n50);\n\n\t\t--border-radius: 0.25em;\n\t\t--border: 1px solid var(--atlas-color-primary-n200);\n\t\t--search-text-color: var(--atlas-color-primary-n400);\n\n\t\t--search-text-font-weight: 400;\n\t\t--search-text-font-size: 1em;\n\n\t\t--inner-space: 0.8em;\n\n\t\t--affix-color: var(--atlas-color-primary-n100);\n\t\t--affix-font-size: 0.75em;\n\t\t--affix-inline-margin: 1.25em;\n\t\t--affix-affordance: 3em;\n\t}\n\n\tatlas-search {\n\t\tdisplay: grid;\n\n\t\tgrid-template-columns: min-content 1fr min-content;\n\t\tgrid-template-areas:\n\t\t\t\"P I S\"\n\t\t\t\"M M M\";\n\t}\n\n\tatlas-search::part(label) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-search::part(menu) {\n\t\tgrid-area: M;\n\t}\n\n\tatlas-search:not([show-menu])::part(menu),\n\tatlas-search[show-menu=\"false\"]::part(menu) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-search::part(prefix) {\n\t\tdisplay: inline-block;\n\t\tgrid-area: P;\n\n\t\talign-self: center;\n\t\tfont-size: var(--affix-font-size);\n\n\t\tcolor: var(--affix-color);\n\n\t\tmargin-inline-start: var(--affix-inline-margin);\n\t}\n\n\tatlas-search::part(suffix) {\n\t\tdisplay: inline-block;\n\t\tgrid-area: S;\n\n\t\talign-self: center;\n\t\tfont-size: var(--affix-font-size);\n\n\t\tcolor: var(--affix-color);\n\n\t\tmargin-inline-end: var(--affix-inline-margin);\n\t}\n\n\tatlas-search::part(input) {\n\t\tdisplay: inline-block;\n\n\t\tgrid-row: 1;\n\t\tgrid-column: 1 / span 3;\n\n\t\twidth: auto;\n\t\tmargin: 0;\n\t\tpadding-block: 0;\n\n\t\tfont-weight: var(--search-text-font-weight);\n\t\tfont-size: var(--search-text-font-size);\n\n\t\tcolor: var(--search-text-color);\n\t\tbackground-color: var(--atlas-input-common-background-color);\n\t\tborder: var(--border);\n\t\tborder-radius: var(--border-radius);\n\n\t\tpadding-block: var(--inner-space);\n\t\tpadding-inline: var(--affix-affordance);\n\t}\n\n\tatlas-search[disabled]:not([disabled=\"false\"])::part(input) {\n\t\tbackground-color: var(--disabled-background-color);\n\t\tborder-color: var(--disabled-background-color);\n\t\tcolor: var(--disabled-search-text-color);\n\t\tpointer-events: none;\n\t\tcursor: auto;\n\t}\n\n\tatlas-search[disabled]:not([disabled=\"false\"])::part(suffix) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-search:focus-within::part(input) {\n\t\tbox-shadow: var(--atlas-input-common-box-shadow);\n\t\toutline: none;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-text.css":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-text.css ***!
  \*********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-input-text {\n\t\t--border-color: var(--atlas-color-primary-n100);\n\t\t--background-color: var(--atlas-input-common-background-color);\n\t\t--disabled-background-color: var(--atlas-color-primary-n50);\n\t\t--invalid-background-color: var(--atlas-color-semantic-danger-light);\n\t\t--invalid-border-color: var(--atlas-color-semantic-danger);\n\t\t--text-color: var(--atlas-color-primary-n400);\n\t\t--label-color: var(--atlas-color-primary-n300);\n\n\t\t--common-block-margin: 0.5em;\n\t\t--common-padding: 1em;\n\t\t--common-padding-inline: 3em;\n\t\t--input-padding-block-start: 1.7em;\n\t\t--input-padding-block-end: 0.7em;\n\t\t--label-padding-block-start: 0.6em;\n\t\t--affix-padding: 1.6em;\n\t\t--default-font-size: 1em;\n\t\t--smaller-font-size: 0.75em;\n\t\t--label-gap: 0.3em;\n\n\t\t--moz-label-padding-block: 0.2em;\n\t}\n\n\tatlas-input-text {\n\t\taccent-color: var(--atlas-input-common-accent-color);\n\t\tcolor: var(--text-color);\n\t\tdisplay: grid;\n\t\tgrid-template-areas: \"Prefix Label Suffix\" \"Subtext Subtext Subtext\";\n\t\tgrid-template-columns: min-content 1fr min-content min-content;\n\t\tgrid-template-rows: min-content min-content;\n\t\tmargin-block: var(--common-block-margin);\n\t}\n\n\tatlas-input-text::part(input) {\n\t\tbackground-color: var(--background-color);\n\t\tborder-color: var(--border-color);\n\t\tborder-radius: var(--atlas-input-common-border-radius);\n\t\tborder: var(--atlas-input-common-border);\n\t\tcolor: var(--text-color);\n\t\tfont-size: var(--default-font-size);\n\t\tgrid-row: 1;\n\t\tgrid-column: 1 / span 4;\n\t\tpadding-block: var(--common-padding);\n\t\tpadding-inline: var(--common-padding-inline);\n\t}\n\n\tatlas-input-text[disabled]:not([disabled=\"false\"])::part(input) {\n\t\t--border-color: var(--disabled-background-color);\n\t\t--background-color: var(--disabled-background-color);\n\n\t\tpointer-events: none;\n\t\tcursor: auto;\n\t}\n\n\tatlas-input-text::part(input):focus {\n\t\tbox-shadow: var(--atlas-input-common-box-shadow);\n\t\toutline: none;\n\t}\n\n\tatlas-input-text::part(label-wrapper) {\n\t\tgrid-area: Label;\n\n\t\tposition: absolute;\n\t\tisolation: isolate;\n\n\t\tcolor: var(--label-color);\n\t\tdisplay: flex;\n\t\tgap: var(--label-gap);\n\n\t\tpadding-inline: var(--common-padding-inline);\n\t\tpadding-block-start: var(--moz-label-padding-block);\n\t}\n\n\tatlas-input-text::part(label) {\n\t\tfont-size: var(--smaller-font-size);\n\t}\n\n\tatlas-input-text[required]:not([required=\"false\"])::part(required) {\n\t\tdisplay: inline;\n\t}\n\n\tatlas-input-text::part(required) {\n\t\tdisplay: none;\n\t\tvertical-align: super;\n\t\tfont-size: smaller;\n\t}\n\n\tatlas-input-text::part(prefix),\n\tatlas-input-text::part(suffix) {\n\t\tfont-size: var(--smaller-font-size);\n\t\talign-content: center;\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t}\n\n\tatlas-input-text::part(prefix) {\n\t\tgrid-area: Prefix;\n\t\tpadding-inline-start: var(--affix-padding);\n\t}\n\n\tatlas-input-text::part(suffix) {\n\t\tgrid-area: Suffix;\n\t\tpadding-inline-end: var(--affix-padding);\n\t}\n\n\tatlas-input-text::part(helper-text) {\n\t\tgrid-area: Subtext;\n\n\t\tdisplay: none;\n\t\tfont-size: var(--smaller-font-size);\n\t}\n\n\tatlas-input-text::part(validation-text) {\n\t\tgrid-area: Subtext;\n\n\t\tcolor: var(--invalid-border-color);\n\t\tdisplay: none;\n\t\tfont-size: var(--smaller-font-size);\n\t}\n\n\t/* atlas--invalid CUSTOM STATE */\n\tatlas-input-text[atlas--invalid]::part(input) {\n\t\t--border-color: var(--invalid-border-color);\n\t\t--background-color: var(--invalid-background-color);\n\t}\n\n\tatlas-input-text:not([atlas--invalid])::part(helper-text) {\n\t\tdisplay: block;\n\t\tmargin-block-start: var(--common-block-margin);\n\t}\n\n\tatlas-input-text[atlas--invalid]::part(validation-text) {\n\t\tdisplay: block;\n\t\tmargin-block-start: var(--common-block-margin);\n\t}\n\n\t/* EXPERIMENTAL USE OF :has() */\n\tatlas-input-text:not(:has([slot=\"prefix\"]))::part(input),\n\tatlas-input-text:not(:has([slot=\"prefix\"]))::part(label-wrapper) {\n\t\tpadding-inline-start: var(--common-padding);\n\t}\n\n\tatlas-input-text:not(:has([slot=\"suffix\"]))::part(input) {\n\t\tpadding-inline-end: var(--common-padding);\n\t}\n\n\tatlas-input-text:has([slot=\"label\"])::part(input) {\n\t\tpadding-block-start: var(--input-padding-block-start);\n\t\tpadding-block-end: var(--input-padding-block-end);\n\t}\n\n\tatlas-input-text:has([slot=\"label\"])::part(label-wrapper) {\n\t\tpadding-block-start: var(--label-padding-block-start);\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/input-text.css"],"names":[],"mappings":"AAAA;CACC;EACC,+CAA+C;EAC/C,8DAA8D;EAC9D,2DAA2D;EAC3D,oEAAoE;EACpE,0DAA0D;EAC1D,6CAA6C;EAC7C,8CAA8C;;EAE9C,4BAA4B;EAC5B,qBAAqB;EACrB,4BAA4B;EAC5B,kCAAkC;EAClC,gCAAgC;EAChC,kCAAkC;EAClC,sBAAsB;EACtB,wBAAwB;EACxB,2BAA2B;EAC3B,kBAAkB;;EAElB,gCAAgC;CACjC;;CAEA;EACC,oDAAoD;EACpD,wBAAwB;EACxB,aAAa;EACb,oEAAoE;EACpE,8DAA8D;EAC9D,2CAA2C;EAC3C,wCAAwC;CACzC;;CAEA;EACC,yCAAyC;EACzC,iCAAiC;EACjC,sDAAsD;EACtD,wCAAwC;EACxC,wBAAwB;EACxB,mCAAmC;EACnC,WAAW;EACX,uBAAuB;EACvB,oCAAoC;EACpC,4CAA4C;CAC7C;;CAEA;EACC,gDAAgD;EAChD,oDAAoD;;EAEpD,oBAAoB;EACpB,YAAY;CACb;;CAEA;EACC,gDAAgD;EAChD,aAAa;CACd;;CAEA;EACC,gBAAgB;;EAEhB,kBAAkB;EAClB,kBAAkB;;EAElB,yBAAyB;EACzB,aAAa;EACb,qBAAqB;;EAErB,4CAA4C;EAC5C,mDAAmD;CACpD;;CAEA;EACC,mCAAmC;CACpC;;CAEA;EACC,eAAe;CAChB;;CAEA;EACC,aAAa;EACb,qBAAqB;EACrB,kBAAkB;CACnB;;CAEA;;EAEC,mCAAmC;EACnC,qBAAqB;EACrB,aAAa;EACb,eAAe;CAChB;;CAEA;EACC,iBAAiB;EACjB,0CAA0C;CAC3C;;CAEA;EACC,iBAAiB;EACjB,wCAAwC;CACzC;;CAEA;EACC,kBAAkB;;EAElB,aAAa;EACb,mCAAmC;CACpC;;CAEA;EACC,kBAAkB;;EAElB,kCAAkC;EAClC,aAAa;EACb,mCAAmC;CACpC;;CAEA,gCAAgC;CAChC;EACC,2CAA2C;EAC3C,mDAAmD;CACpD;;CAEA;EACC,cAAc;EACd,8CAA8C;CAC/C;;CAEA;EACC,cAAc;EACd,8CAA8C;CAC/C;;CAEA,+BAA+B;CAC/B;;EAEC,2CAA2C;CAC5C;;CAEA;EACC,yCAAyC;CAC1C;;CAEA;EACC,qDAAqD;EACrD,iDAAiD;CAClD;;CAEA;EACC,qDAAqD;CACtD;AACD","sourcesContent":["@layer atlas {\n\tatlas-input-text {\n\t\t--border-color: var(--atlas-color-primary-n100);\n\t\t--background-color: var(--atlas-input-common-background-color);\n\t\t--disabled-background-color: var(--atlas-color-primary-n50);\n\t\t--invalid-background-color: var(--atlas-color-semantic-danger-light);\n\t\t--invalid-border-color: var(--atlas-color-semantic-danger);\n\t\t--text-color: var(--atlas-color-primary-n400);\n\t\t--label-color: var(--atlas-color-primary-n300);\n\n\t\t--common-block-margin: 0.5em;\n\t\t--common-padding: 1em;\n\t\t--common-padding-inline: 3em;\n\t\t--input-padding-block-start: 1.7em;\n\t\t--input-padding-block-end: 0.7em;\n\t\t--label-padding-block-start: 0.6em;\n\t\t--affix-padding: 1.6em;\n\t\t--default-font-size: 1em;\n\t\t--smaller-font-size: 0.75em;\n\t\t--label-gap: 0.3em;\n\n\t\t--moz-label-padding-block: 0.2em;\n\t}\n\n\tatlas-input-text {\n\t\taccent-color: var(--atlas-input-common-accent-color);\n\t\tcolor: var(--text-color);\n\t\tdisplay: grid;\n\t\tgrid-template-areas: \"Prefix Label Suffix\" \"Subtext Subtext Subtext\";\n\t\tgrid-template-columns: min-content 1fr min-content min-content;\n\t\tgrid-template-rows: min-content min-content;\n\t\tmargin-block: var(--common-block-margin);\n\t}\n\n\tatlas-input-text::part(input) {\n\t\tbackground-color: var(--background-color);\n\t\tborder-color: var(--border-color);\n\t\tborder-radius: var(--atlas-input-common-border-radius);\n\t\tborder: var(--atlas-input-common-border);\n\t\tcolor: var(--text-color);\n\t\tfont-size: var(--default-font-size);\n\t\tgrid-row: 1;\n\t\tgrid-column: 1 / span 4;\n\t\tpadding-block: var(--common-padding);\n\t\tpadding-inline: var(--common-padding-inline);\n\t}\n\n\tatlas-input-text[disabled]:not([disabled=\"false\"])::part(input) {\n\t\t--border-color: var(--disabled-background-color);\n\t\t--background-color: var(--disabled-background-color);\n\n\t\tpointer-events: none;\n\t\tcursor: auto;\n\t}\n\n\tatlas-input-text::part(input):focus {\n\t\tbox-shadow: var(--atlas-input-common-box-shadow);\n\t\toutline: none;\n\t}\n\n\tatlas-input-text::part(label-wrapper) {\n\t\tgrid-area: Label;\n\n\t\tposition: absolute;\n\t\tisolation: isolate;\n\n\t\tcolor: var(--label-color);\n\t\tdisplay: flex;\n\t\tgap: var(--label-gap);\n\n\t\tpadding-inline: var(--common-padding-inline);\n\t\tpadding-block-start: var(--moz-label-padding-block);\n\t}\n\n\tatlas-input-text::part(label) {\n\t\tfont-size: var(--smaller-font-size);\n\t}\n\n\tatlas-input-text[required]:not([required=\"false\"])::part(required) {\n\t\tdisplay: inline;\n\t}\n\n\tatlas-input-text::part(required) {\n\t\tdisplay: none;\n\t\tvertical-align: super;\n\t\tfont-size: smaller;\n\t}\n\n\tatlas-input-text::part(prefix),\n\tatlas-input-text::part(suffix) {\n\t\tfont-size: var(--smaller-font-size);\n\t\talign-content: center;\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t}\n\n\tatlas-input-text::part(prefix) {\n\t\tgrid-area: Prefix;\n\t\tpadding-inline-start: var(--affix-padding);\n\t}\n\n\tatlas-input-text::part(suffix) {\n\t\tgrid-area: Suffix;\n\t\tpadding-inline-end: var(--affix-padding);\n\t}\n\n\tatlas-input-text::part(helper-text) {\n\t\tgrid-area: Subtext;\n\n\t\tdisplay: none;\n\t\tfont-size: var(--smaller-font-size);\n\t}\n\n\tatlas-input-text::part(validation-text) {\n\t\tgrid-area: Subtext;\n\n\t\tcolor: var(--invalid-border-color);\n\t\tdisplay: none;\n\t\tfont-size: var(--smaller-font-size);\n\t}\n\n\t/* atlas--invalid CUSTOM STATE */\n\tatlas-input-text[atlas--invalid]::part(input) {\n\t\t--border-color: var(--invalid-border-color);\n\t\t--background-color: var(--invalid-background-color);\n\t}\n\n\tatlas-input-text:not([atlas--invalid])::part(helper-text) {\n\t\tdisplay: block;\n\t\tmargin-block-start: var(--common-block-margin);\n\t}\n\n\tatlas-input-text[atlas--invalid]::part(validation-text) {\n\t\tdisplay: block;\n\t\tmargin-block-start: var(--common-block-margin);\n\t}\n\n\t/* EXPERIMENTAL USE OF :has() */\n\tatlas-input-text:not(:has([slot=\"prefix\"]))::part(input),\n\tatlas-input-text:not(:has([slot=\"prefix\"]))::part(label-wrapper) {\n\t\tpadding-inline-start: var(--common-padding);\n\t}\n\n\tatlas-input-text:not(:has([slot=\"suffix\"]))::part(input) {\n\t\tpadding-inline-end: var(--common-padding);\n\t}\n\n\tatlas-input-text:has([slot=\"label\"])::part(input) {\n\t\tpadding-block-start: var(--input-padding-block-start);\n\t\tpadding-block-end: var(--input-padding-block-end);\n\t}\n\n\tatlas-input-text:has([slot=\"label\"])::part(label-wrapper) {\n\t\tpadding-block-start: var(--label-padding-block-start);\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-textarea.css":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-textarea.css ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-input-textarea {\n\t\t--minimum-height: 7.25em;\n\n\t\t--disabled-background-color: var(--atlas-color-primary-n50);\n\n\t\t--padding-block: 0.5em;\n\t\t--padding-inline: 1em;\n\n\t\t--padding-block-start-label-spacer: calc(1em + 0.125em);\n\t\t--padding-block-start-calced: calc(\n\t\t\tvar(--padding-block) + var(--padding-block-start-label-spacer)\n\t\t);\n\t\t--total-block-padding: calc(var(--padding-block) + var(--padding-block-start-calced));\n\t\t--minimum-height-calced: calc(var(--minimum-height) - var(--total-block-padding));\n\t}\n\n\tatlas-input-textarea {\n\t\tposition: relative;\n\n\t\taccent-color: var(--atlas-input-common-accent-color);\n\n\t\tdisplay: grid;\n\t\tmargin-block: var(--atlas-input-common-block-margin);\n\t}\n\n\tatlas-input-textarea::part(input) {\n\t\tdisplay: block;\n\t\tmin-height: var(--minimum-height-calced);\n\n\t\tfont-size: inherit;\n\t\tfont-family: inherit;\n\n\t\tpadding-block-start: var(--padding-block-start-calced);\n\t\tpadding-block-end: var(--padding-block);\n\t\tpadding-inline: var(--padding-inline);\n\n\t\tcolor: var(--atlas-color-primary-n400);\n\n\t\tbackground-color: var(--atlas-input-common-background-color);\n\t\tborder-radius: var(--atlas-input-common-border-radius);\n\t\tborder: var(--atlas-input-common-border);\n\t}\n\n\tatlas-input-textarea[disabled]:not([disabled=\"false\"])::part(input) {\n\t\tbackground-color: var(--disabled-background-color);\n\t\tborder-color: var(--disabled-background-color);\n\t}\n\n\tatlas-input-textarea::part(input):focus {\n\t\toutline: none;\n\t\tbox-shadow: var(--atlas-input-common-box-shadow);\n\t}\n\n\tatlas-input-textarea::part(label-wrapper) {\n\t\tposition: absolute;\n\t\ttop: calc(var(--padding-block) + 0.125em);\n\t\tleft: var(--padding-inline);\n\n\t\tcolor: var(--atlas-color-primary-n300);\n\t}\n\n\tatlas-input-textarea::part(label) {\n\t\tfont-size: var(--atlas-input-common-label-font-size);\n\t}\n\n\tatlas-input-textarea::part(required) {\n\t\tfont-size: var(--atlas-input-common-label-font-size);\n\t\tdisplay: none;\n\t}\n\n\tatlas-input-textarea[required]:not([required=\"false\"])::part(required) {\n\t\tdisplay: inline-block;\n\t}\n\n\tatlas-input-textarea::part(helper-text) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-input-textarea::part(content) {\n\t\tdisplay: none;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/input-textarea.css"],"names":[],"mappings":"AAAA;CACC;EACC,wBAAwB;;EAExB,2DAA2D;;EAE3D,sBAAsB;EACtB,qBAAqB;;EAErB,uDAAuD;EACvD;;GAEC;EACD,qFAAqF;EACrF,iFAAiF;CAClF;;CAEA;EACC,kBAAkB;;EAElB,oDAAoD;;EAEpD,aAAa;EACb,oDAAoD;CACrD;;CAEA;EACC,cAAc;EACd,wCAAwC;;EAExC,kBAAkB;EAClB,oBAAoB;;EAEpB,sDAAsD;EACtD,uCAAuC;EACvC,qCAAqC;;EAErC,sCAAsC;;EAEtC,4DAA4D;EAC5D,sDAAsD;EACtD,wCAAwC;CACzC;;CAEA;EACC,kDAAkD;EAClD,8CAA8C;CAC/C;;CAEA;EACC,aAAa;EACb,gDAAgD;CACjD;;CAEA;EACC,kBAAkB;EAClB,yCAAyC;EACzC,2BAA2B;;EAE3B,sCAAsC;CACvC;;CAEA;EACC,oDAAoD;CACrD;;CAEA;EACC,oDAAoD;EACpD,aAAa;CACd;;CAEA;EACC,qBAAqB;CACtB;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,aAAa;CACd;AACD","sourcesContent":["@layer atlas {\n\tatlas-input-textarea {\n\t\t--minimum-height: 7.25em;\n\n\t\t--disabled-background-color: var(--atlas-color-primary-n50);\n\n\t\t--padding-block: 0.5em;\n\t\t--padding-inline: 1em;\n\n\t\t--padding-block-start-label-spacer: calc(1em + 0.125em);\n\t\t--padding-block-start-calced: calc(\n\t\t\tvar(--padding-block) + var(--padding-block-start-label-spacer)\n\t\t);\n\t\t--total-block-padding: calc(var(--padding-block) + var(--padding-block-start-calced));\n\t\t--minimum-height-calced: calc(var(--minimum-height) - var(--total-block-padding));\n\t}\n\n\tatlas-input-textarea {\n\t\tposition: relative;\n\n\t\taccent-color: var(--atlas-input-common-accent-color);\n\n\t\tdisplay: grid;\n\t\tmargin-block: var(--atlas-input-common-block-margin);\n\t}\n\n\tatlas-input-textarea::part(input) {\n\t\tdisplay: block;\n\t\tmin-height: var(--minimum-height-calced);\n\n\t\tfont-size: inherit;\n\t\tfont-family: inherit;\n\n\t\tpadding-block-start: var(--padding-block-start-calced);\n\t\tpadding-block-end: var(--padding-block);\n\t\tpadding-inline: var(--padding-inline);\n\n\t\tcolor: var(--atlas-color-primary-n400);\n\n\t\tbackground-color: var(--atlas-input-common-background-color);\n\t\tborder-radius: var(--atlas-input-common-border-radius);\n\t\tborder: var(--atlas-input-common-border);\n\t}\n\n\tatlas-input-textarea[disabled]:not([disabled=\"false\"])::part(input) {\n\t\tbackground-color: var(--disabled-background-color);\n\t\tborder-color: var(--disabled-background-color);\n\t}\n\n\tatlas-input-textarea::part(input):focus {\n\t\toutline: none;\n\t\tbox-shadow: var(--atlas-input-common-box-shadow);\n\t}\n\n\tatlas-input-textarea::part(label-wrapper) {\n\t\tposition: absolute;\n\t\ttop: calc(var(--padding-block) + 0.125em);\n\t\tleft: var(--padding-inline);\n\n\t\tcolor: var(--atlas-color-primary-n300);\n\t}\n\n\tatlas-input-textarea::part(label) {\n\t\tfont-size: var(--atlas-input-common-label-font-size);\n\t}\n\n\tatlas-input-textarea::part(required) {\n\t\tfont-size: var(--atlas-input-common-label-font-size);\n\t\tdisplay: none;\n\t}\n\n\tatlas-input-textarea[required]:not([required=\"false\"])::part(required) {\n\t\tdisplay: inline-block;\n\t}\n\n\tatlas-input-textarea::part(helper-text) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-input-textarea::part(content) {\n\t\tdisplay: none;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/logo.css":
/*!***************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/logo.css ***!
  \***************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-logo {\n\t\t--margin-inline-value: 0.5em;\n\t\t--text-font-size: 0.6em;\n\t\t--text-line-height: 2em;\n\t\t--text-separation-distance: 0.75em;\n\t\t--beta-logo-separator: 1em;\n\n\t\twidth: inherit;\n\t\theight: inherit;\n\n\t\tmargin-inline: var(--margin-inline-value);\n\t\tdisplay: block;\n\t}\n\n\tatlas-logo::part(graphic-fullsize),\n\tatlas-logo::part(graphic) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode] > atlas-logo::part(graphic) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode] atlas-logo::part(graphic-fullsize) {\n\t\tdisplay: block;\n\t}\n\n\tatlas-logo::part(graphic) {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t}\n\n\tatlas-logo::part(text) {\n\t\ttext-transform: uppercase;\n\t\ttext-align: center;\n\t\tdisplay: block;\n\t\tfont-size: var(--text-font-size);\n\t\tline-height: var(--text-line-height);\n\t\tmargin-block-start: var(--text-separation-distance);\n\t}\n\n\tatlas-logo::part(beta) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-logo[beta]:not([beta=\"false\"])::part(beta) {\n\t\tdisplay: block;\n\t\tmargin-block-start: var(--beta-logo-separator);\n\t\tmargin-inline: auto;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/logo.css"],"names":[],"mappings":"AAAA;CACC;EACC,4BAA4B;EAC5B,uBAAuB;EACvB,uBAAuB;EACvB,kCAAkC;EAClC,0BAA0B;;EAE1B,cAAc;EACd,eAAe;;EAEf,yCAAyC;EACzC,cAAc;CACf;;CAEA;;EAEC,aAAa;CACd;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,cAAc;CACf;;CAEA;EACC,aAAa;EACb,uBAAuB;CACxB;;CAEA;EACC,yBAAyB;EACzB,kBAAkB;EAClB,cAAc;EACd,gCAAgC;EAChC,oCAAoC;EACpC,mDAAmD;CACpD;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,cAAc;EACd,8CAA8C;EAC9C,mBAAmB;CACpB;AACD","sourcesContent":["@layer atlas {\n\tatlas-logo {\n\t\t--margin-inline-value: 0.5em;\n\t\t--text-font-size: 0.6em;\n\t\t--text-line-height: 2em;\n\t\t--text-separation-distance: 0.75em;\n\t\t--beta-logo-separator: 1em;\n\n\t\twidth: inherit;\n\t\theight: inherit;\n\n\t\tmargin-inline: var(--margin-inline-value);\n\t\tdisplay: block;\n\t}\n\n\tatlas-logo::part(graphic-fullsize),\n\tatlas-logo::part(graphic) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode] > atlas-logo::part(graphic) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-application-frame[focus-mode] atlas-logo::part(graphic-fullsize) {\n\t\tdisplay: block;\n\t}\n\n\tatlas-logo::part(graphic) {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t}\n\n\tatlas-logo::part(text) {\n\t\ttext-transform: uppercase;\n\t\ttext-align: center;\n\t\tdisplay: block;\n\t\tfont-size: var(--text-font-size);\n\t\tline-height: var(--text-line-height);\n\t\tmargin-block-start: var(--text-separation-distance);\n\t}\n\n\tatlas-logo::part(beta) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-logo[beta]:not([beta=\"false\"])::part(beta) {\n\t\tdisplay: block;\n\t\tmargin-block-start: var(--beta-logo-separator);\n\t\tmargin-inline: auto;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/main-nav.css":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/main-nav.css ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-main-nav {\n\t\talign-items: center;\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tjustify-content: space-evenly;\n\t\tmargin-block-start: 5em;\n\n\t\tflex-direction: column;\n\t\trow-gap: 2em;\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button {\n\t\t--atlas-button-primary-color: var(--atlas-color-primary-n300);\n\t\t--button-prefix-color: var(--atlas-color-primary-b400);\n\n\t\t--atlas-button-primary-background-color: transparent;\n\t\t--atlas-button-primary-disabled-background-color: transparent;\n\t\t--atlas-button-hover-background-color: transparent;\n\t\t--primary-active-background: transparent;\n\n\t\t--large-padding-top-bottom: 0;\n\t\t--large-padding-left-right: 0;\n\t\t--text-space-between: 0.5em;\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button:hover {\n\t\t--button-prefix-color: var(--atlas-color-primary-o500);\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button[selected]:not([selected=\"false\"]) {\n\t\t--atlas-button-primary-color: var(--atlas-color-primary-o500);\n\t\t--button-prefix-color: var(--atlas-color-primary-o500);\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button {\n\t\tborder: none;\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button::part(prefix) {\n\t\tcolor: var(--button-prefix-color);\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button::part(label) {\n\t\tdisplay: none;\n\t\tfont-size: var(--atlas-type-body-small-regular-font-size);\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button > atlas-icon {\n\t\tcolor: inherit;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/main-nav.css"],"names":[],"mappings":"AAAA;CACC;EACC,mBAAmB;EACnB,aAAa;EACb,eAAe;EACf,6BAA6B;EAC7B,uBAAuB;;EAEvB,sBAAsB;EACtB,YAAY;CACb;;CAEA;EACC,6DAA6D;EAC7D,sDAAsD;;EAEtD,oDAAoD;EACpD,6DAA6D;EAC7D,kDAAkD;EAClD,wCAAwC;;EAExC,6BAA6B;EAC7B,6BAA6B;EAC7B,2BAA2B;CAC5B;;CAEA;EACC,sDAAsD;CACvD;;CAEA;EACC,6DAA6D;EAC7D,sDAAsD;CACvD;;CAEA;EACC,YAAY;CACb;;CAEA;EACC,iCAAiC;CAClC;;CAEA;EACC,aAAa;EACb,yDAAyD;CAC1D;;CAEA;EACC,cAAc;CACf;AACD","sourcesContent":["@layer atlas {\n\tatlas-main-nav {\n\t\talign-items: center;\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tjustify-content: space-evenly;\n\t\tmargin-block-start: 5em;\n\n\t\tflex-direction: column;\n\t\trow-gap: 2em;\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button {\n\t\t--atlas-button-primary-color: var(--atlas-color-primary-n300);\n\t\t--button-prefix-color: var(--atlas-color-primary-b400);\n\n\t\t--atlas-button-primary-background-color: transparent;\n\t\t--atlas-button-primary-disabled-background-color: transparent;\n\t\t--atlas-button-hover-background-color: transparent;\n\t\t--primary-active-background: transparent;\n\n\t\t--large-padding-top-bottom: 0;\n\t\t--large-padding-left-right: 0;\n\t\t--text-space-between: 0.5em;\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button:hover {\n\t\t--button-prefix-color: var(--atlas-color-primary-o500);\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button[selected]:not([selected=\"false\"]) {\n\t\t--atlas-button-primary-color: var(--atlas-color-primary-o500);\n\t\t--button-prefix-color: var(--atlas-color-primary-o500);\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button {\n\t\tborder: none;\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button::part(prefix) {\n\t\tcolor: var(--button-prefix-color);\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button::part(label) {\n\t\tdisplay: none;\n\t\tfont-size: var(--atlas-type-body-small-regular-font-size);\n\t}\n\n\tatlas-main-nav > atlas-main-nav-item > atlas-button > atlas-icon {\n\t\tcolor: inherit;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/main-nav.small.css":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/main-nav.small.css ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\t@media (max-width: 800px) {\n\t\tatlas-main-nav {\n\t\t\tflex-direction: row;\n\t\t\tmargin-block: 0.5em;\n\t\t}\n\t}\n\n\t@container main-nav (min-width: 200px) {\n\t\tatlas-main-nav > atlas-main-nav-item > atlas-button::part(button) {\n\t\t\tflex-flow: column;\n\t\t}\n\n\t\tatlas-main-nav > atlas-main-nav-item > atlas-button::part(label) {\n\t\t\tdisplay: contents;\n\t\t}\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/main-nav.small.css"],"names":[],"mappings":"AAAA;CACC;EACC;GACC,mBAAmB;GACnB,mBAAmB;EACpB;CACD;;CAEA;EACC;GACC,iBAAiB;EAClB;;EAEA;GACC,iBAAiB;EAClB;CACD;AACD","sourcesContent":["@layer atlas {\n\t@media (max-width: 800px) {\n\t\tatlas-main-nav {\n\t\t\tflex-direction: row;\n\t\t\tmargin-block: 0.5em;\n\t\t}\n\t}\n\n\t@container main-nav (min-width: 200px) {\n\t\tatlas-main-nav > atlas-main-nav-item > atlas-button::part(button) {\n\t\t\tflex-flow: column;\n\t\t}\n\n\t\tatlas-main-nav > atlas-main-nav-item > atlas-button::part(label) {\n\t\t\tdisplay: contents;\n\t\t}\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/page.css":
/*!***************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/page.css ***!
  \***************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-page {\n\t\t--page-width: 1024px;\n\n\t\t--page-bg-color: var(--atlas-color-white);\n\t\t--page-color: var(--atlas-color-primary-n400);\n\t\t--page-boarder-radius: 0.5em;\n\t\t--page-min-height: 4em;\n\n\t\t--page-container-padding-block-end: 1em;\n\n\t\t--page-title-color: var(--atlas-color-primary-n400);\n\t\t--page-title-padding-block: 1em 0.5em;\n\n\t\t--page-content-inline-padding: 2em;\n\t\t--page-content-block-padding: 2em 2em;\n\t}\n\n\tatlas-page {\n\t\tdisplay: block;\n\t\tmargin-inline: auto;\n\n\t\tmax-width: var(--page-width);\n\t}\n\n\tatlas-page::part(title) {\n\t\tdisplay: block;\n\n\t\tfont-family: var(--atlas-type-display-medium-bold-font-family);\n\t\tfont-size: var(--atlas-type-display-medium-bold-font-size);\n\t\tfont-weight: bolder;\n\n\t\tpadding-block: var(--page-title-padding-block);\n\t\tpadding-inline: 0;\n\n\t\tcolor: var(--page-title-color);\n\t}\n\n\tatlas-page::part(page-container) {\n\t\tdisplay: block;\n\t\toverflow: hidden;\n\n\t\tbackground-color: var(--page-bg-color);\n\t\tcolor: var(--page-color);\n\t\tpadding: 0;\n\t\tmargin: 0;\n\n\t\tpadding-block-end: var(--page-container-padding-block-end);\n\n\t\tborder-radius: var(--page-boarder-radius);\n\t\tbox-shadow: var(--atlas-shadow-hard-100);\n\t}\n\n\tatlas-page::part(prefix) {\n\t}\n\n\tatlas-page::part(content) {\n\t\tdisplay: block;\n\t\tpadding-inline: var(--page-content-inline-padding);\n\t\tpadding-block: var(--page-content-block-padding);\n\n\t\tmin-height: var(--page-min-height);\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/page.css"],"names":[],"mappings":"AAAA;CACC;EACC,oBAAoB;;EAEpB,yCAAyC;EACzC,6CAA6C;EAC7C,4BAA4B;EAC5B,sBAAsB;;EAEtB,uCAAuC;;EAEvC,mDAAmD;EACnD,qCAAqC;;EAErC,kCAAkC;EAClC,qCAAqC;CACtC;;CAEA;EACC,cAAc;EACd,mBAAmB;;EAEnB,4BAA4B;CAC7B;;CAEA;EACC,cAAc;;EAEd,8DAA8D;EAC9D,0DAA0D;EAC1D,mBAAmB;;EAEnB,8CAA8C;EAC9C,iBAAiB;;EAEjB,8BAA8B;CAC/B;;CAEA;EACC,cAAc;EACd,gBAAgB;;EAEhB,sCAAsC;EACtC,wBAAwB;EACxB,UAAU;EACV,SAAS;;EAET,0DAA0D;;EAE1D,yCAAyC;EACzC,wCAAwC;CACzC;;CAEA;CACA;;CAEA;EACC,cAAc;EACd,kDAAkD;EAClD,gDAAgD;;EAEhD,kCAAkC;CACnC;AACD","sourcesContent":["@layer atlas {\n\tatlas-page {\n\t\t--page-width: 1024px;\n\n\t\t--page-bg-color: var(--atlas-color-white);\n\t\t--page-color: var(--atlas-color-primary-n400);\n\t\t--page-boarder-radius: 0.5em;\n\t\t--page-min-height: 4em;\n\n\t\t--page-container-padding-block-end: 1em;\n\n\t\t--page-title-color: var(--atlas-color-primary-n400);\n\t\t--page-title-padding-block: 1em 0.5em;\n\n\t\t--page-content-inline-padding: 2em;\n\t\t--page-content-block-padding: 2em 2em;\n\t}\n\n\tatlas-page {\n\t\tdisplay: block;\n\t\tmargin-inline: auto;\n\n\t\tmax-width: var(--page-width);\n\t}\n\n\tatlas-page::part(title) {\n\t\tdisplay: block;\n\n\t\tfont-family: var(--atlas-type-display-medium-bold-font-family);\n\t\tfont-size: var(--atlas-type-display-medium-bold-font-size);\n\t\tfont-weight: bolder;\n\n\t\tpadding-block: var(--page-title-padding-block);\n\t\tpadding-inline: 0;\n\n\t\tcolor: var(--page-title-color);\n\t}\n\n\tatlas-page::part(page-container) {\n\t\tdisplay: block;\n\t\toverflow: hidden;\n\n\t\tbackground-color: var(--page-bg-color);\n\t\tcolor: var(--page-color);\n\t\tpadding: 0;\n\t\tmargin: 0;\n\n\t\tpadding-block-end: var(--page-container-padding-block-end);\n\n\t\tborder-radius: var(--page-boarder-radius);\n\t\tbox-shadow: var(--atlas-shadow-hard-100);\n\t}\n\n\tatlas-page::part(prefix) {\n\t}\n\n\tatlas-page::part(content) {\n\t\tdisplay: block;\n\t\tpadding-inline: var(--page-content-inline-padding);\n\t\tpadding-block: var(--page-content-block-padding);\n\n\t\tmin-height: var(--page-min-height);\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/profile-control.css":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/profile-control.css ***!
  \**************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-profile-control {\n\t\t--avatar-as-button-hover-filter: drop-shadow(var(--atlas-shadow-soft-100))\n\t\t\tdrop-shadow(var(--atlas-shadow-hard-100));\n\t}\n\n\tatlas-profile-control {\n\t\t--text-name-text-font-size: 1.25em;\n\t\t--text-name-font-weigth: 700;\n\t\t--text-name-margin-left: 1em;\n\t\t--container-spacing: 0em;\n\t\t--icon-margin-left: 0.6rem;\n\n\t\tdisplay: inline-grid;\n\t\tgrid-template-columns: max-content;\n\t\tgrid-template-areas: \"img icon name\" \"menu menu menu\";\n\t\tjustify-content: stretch;\n\t\talign-items: stretch;\n\t}\n\n\tatlas-profile-control::part(image) {\n\t\tgrid-area: img;\n\t}\n\n\tatlas-profile-control atlas-avatar:hover {\n\t\tfilter: var(--avatar-as-button-hover-filter);\n\t}\n\n\tatlas-profile-control > [slot=\"icon\"] {\n\t\tgrid-area: icon;\n\t\tmargin-left: var(--icon-margin-left);\n\t\taspect-ratio: 1/1;\n\t\twidth: 0.7em;\n\t}\n\n\tatlas-profile-control::part(name) {\n\t\theight: 100%;\n\t\tgrid-area: name;\n\t\tflex-wrap: nowrap;\n\t\tmargin-inline-start: var(--text-name-margin-left);\n\t\tfont-size: var(--text-name-text-font-size);\n\t\tfont-weight: var(--text-name-font-weigth);\n\t}\n\n\tatlas-profile-control::part(menu) {\n\t\tdisplay: block;\n\t\tgrid-area: menu;\n\t}\n\n\tatlas-profile-control::part(name),\n\tatlas-profile-contro > [slot=\"icon\"] {\n\t\tdisplay: flex;\n\t\theight: 100%;\n\t\talign-items: center;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/profile-control.css"],"names":[],"mappings":"AAAA;CACC;EACC;4CAC0C;CAC3C;;CAEA;EACC,kCAAkC;EAClC,4BAA4B;EAC5B,4BAA4B;EAC5B,wBAAwB;EACxB,0BAA0B;;EAE1B,oBAAoB;EACpB,kCAAkC;EAClC,qDAAqD;EACrD,wBAAwB;EACxB,oBAAoB;CACrB;;CAEA;EACC,cAAc;CACf;;CAEA;EACC,4CAA4C;CAC7C;;CAEA;EACC,eAAe;EACf,oCAAoC;EACpC,iBAAiB;EACjB,YAAY;CACb;;CAEA;EACC,YAAY;EACZ,eAAe;EACf,iBAAiB;EACjB,iDAAiD;EACjD,0CAA0C;EAC1C,yCAAyC;CAC1C;;CAEA;EACC,cAAc;EACd,eAAe;CAChB;;CAEA;;EAEC,aAAa;EACb,YAAY;EACZ,mBAAmB;CACpB;AACD","sourcesContent":["@layer atlas {\n\tatlas-profile-control {\n\t\t--avatar-as-button-hover-filter: drop-shadow(var(--atlas-shadow-soft-100))\n\t\t\tdrop-shadow(var(--atlas-shadow-hard-100));\n\t}\n\n\tatlas-profile-control {\n\t\t--text-name-text-font-size: 1.25em;\n\t\t--text-name-font-weigth: 700;\n\t\t--text-name-margin-left: 1em;\n\t\t--container-spacing: 0em;\n\t\t--icon-margin-left: 0.6rem;\n\n\t\tdisplay: inline-grid;\n\t\tgrid-template-columns: max-content;\n\t\tgrid-template-areas: \"img icon name\" \"menu menu menu\";\n\t\tjustify-content: stretch;\n\t\talign-items: stretch;\n\t}\n\n\tatlas-profile-control::part(image) {\n\t\tgrid-area: img;\n\t}\n\n\tatlas-profile-control atlas-avatar:hover {\n\t\tfilter: var(--avatar-as-button-hover-filter);\n\t}\n\n\tatlas-profile-control > [slot=\"icon\"] {\n\t\tgrid-area: icon;\n\t\tmargin-left: var(--icon-margin-left);\n\t\taspect-ratio: 1/1;\n\t\twidth: 0.7em;\n\t}\n\n\tatlas-profile-control::part(name) {\n\t\theight: 100%;\n\t\tgrid-area: name;\n\t\tflex-wrap: nowrap;\n\t\tmargin-inline-start: var(--text-name-margin-left);\n\t\tfont-size: var(--text-name-text-font-size);\n\t\tfont-weight: var(--text-name-font-weigth);\n\t}\n\n\tatlas-profile-control::part(menu) {\n\t\tdisplay: block;\n\t\tgrid-area: menu;\n\t}\n\n\tatlas-profile-control::part(name),\n\tatlas-profile-contro > [slot=\"icon\"] {\n\t\tdisplay: flex;\n\t\theight: 100%;\n\t\talign-items: center;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/scratch.css":
/*!******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/scratch.css ***!
  \******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _css_loader_dist_cjs_js_tokens_layer_definitions_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../../../../css-loader/dist/cjs.js!./tokens/layer-definitions.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tokens/layer-definitions.css");
/* harmony import */ var _css_loader_dist_cjs_js_tokens_type_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! -!../../../../css-loader/dist/cjs.js!./tokens/type.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tokens/type.css");
/* harmony import */ var _css_loader_dist_cjs_js_tokens_palette_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! -!../../../../css-loader/dist/cjs.js!./tokens/palette.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tokens/palette.css");
/* harmony import */ var _css_loader_dist_cjs_js_tokens_shadow_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! -!../../../../css-loader/dist/cjs.js!./tokens/shadow.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tokens/shadow.css");
// Imports






var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_css_loader_dist_cjs_js_tokens_layer_definitions_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
___CSS_LOADER_EXPORT___.i(_css_loader_dist_cjs_js_tokens_type_css__WEBPACK_IMPORTED_MODULE_3__["default"], "", false, undefined, "atlas");
___CSS_LOADER_EXPORT___.i(_css_loader_dist_cjs_js_tokens_palette_css__WEBPACK_IMPORTED_MODULE_4__["default"], "", false, undefined, "atlas");
___CSS_LOADER_EXPORT___.i(_css_loader_dist_cjs_js_tokens_shadow_css__WEBPACK_IMPORTED_MODULE_5__["default"], "", false, undefined, "atlas");
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* the theme/scheme */\n@layer base {\n\t*,\n\t*::before,\n\t*::after {\n\t\tbox-sizing: border-box;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t}\n}\n\n@layer co {\n\thtml {\n\t\tfont-size: 100%;\n\t}\n\tbody {\n\t\tfont-family: var(--font-family-proxima);\n\t\tmin-height: 100vh;\n\t\tmargin: 0;\n\t}\n\n\t:root {\n\t\t--co-accent-color: var(--atlas-color-secondary-g500);\n\n\t\t--co-application-frame-background-color: var(--atlas-color-white);\n\t\t--co-application-frame-color: var(--atlas-color-grey-80);\n\t\t--co-application-frame-separator-color: var(--atlas-color-primary-n100);\n\t\t--co-application-frame-separator-style: 2px solid var(--co-application-frame-separator-color);\n\n\t\t--co-feed-background-color: var(--atlas-color-primary-n50);\n\t\t--co-feed-color: var(--atlas-color-primary-n400);\n\n\t\t--co-button-primary-color: var(--atlas-color-on-bg-white);\n\t\t--co-button-primary-background-color: var(--atlas-color-primary-b500);\n\t\t--co-button-hover-background-color: var(--atlas-color-primary-b400);\n\t\t--co-button-primary-disabled-background-color: var(--atlas-color-primary-n100);\n\n\t\t--co-chip-category-color: var(--atlas-color-primary-n400);\n\t\t--co-chip-category-focus-color: var(--atlas-color-on-bg-white);\n\t\t--co-chip-category-hover-color: var(--atlas-color-on-bg-white);\n\n\t\t--co-chip-outlets-border-color: var(--atlas-color-secondary-t300);\n\t\t--co-chip-outlets-background-color: var(--atlas-color-on-bg-white);\n\t\t--co-chip-outlets-color: var(--atlas-color-secondary-t500);\n\t\t--co-chip-outlets-active-shadow-color: rgba(14, 125, 121, 0.3);\n\t\t--co-chip-outlets-active-background-color: var(--atlas-color-chart-Xlightteal);\n\n\t\t--co-chip-hashtags-border-color: var(--atlas-color-secondary-p400);\n\t\t--co-chip-hashtags-background-color: var(--atlas-color-chart-Xlightpurple);\n\n\t\t--co-chip-topics-border-color: var(--atlas-color-chart-blue);\n\t\t--co-chip-topics-color: var(--atlas-color-chart-darkblue);\n\t\t--co-chip-topics-background-color: var(--atlas-color-on-bg-white);\n\t\t--co-chip-topics-active-shadow-color: rgba(45, 94, 161, 0.3);\n\t\t--co-chip-topics-active-background-color: var(--atlas-color-chart-Xlightblue);\n\n\t\t--co-chip-type-filter-color: var(--atlas-color-primary-n400);\n\t\t--co-chip-type-filter-background-color: var(--atlas-color-primary-n25);\n\t\t--co-chip-type-filter-border-color: var(--atlas-color-primary-n200);\n\t\t--co-chip-type-filter-hover-background-color: var(--atlas-color-primary-n50);\n\t\t--co-chip-type-filter-active-background-color: var(--atlas-color-primary-n50);\n\t\t--co-chip-type-filter-active-shadow-color: rgba(0, 0, 0, 0.3);\n\n\t\t/* Application layer menus and Dialogs  */\n\t\t--co-shadow-application-layer: var(--atlas-shadow-100);\n\n\t\t/* Input Controls and Dropdown */\n\t\t--co-shadow-controls-layer: var(--atlas-shadow-50);\n\n\t\t/* Feed inner Dialog */\n\t\t--co-shadow-feed-dialog-layer: var(--atlas-shadow-25);\n\n\t\t/* Tile Board Tile */\n\t\t--co-shadow-tile-board-tile-layer: var(--atlas-shadow-hard-100);\n\n\t\t/* --co-main-navigation-menu-icon-color--default: var(--atlas-color-primary-b400); */\n\t\t/* --co-main-navigation-menu-icon-color--hover: var(--atlas-color-primary-o500); */\n\t}\n\n\t/* @media (prefers-color-scheme: dark) {\n\t\t:root {\n\t\t\t--co-application-frame-background-color: var(--atlas-color-black);\n\t\t\t--co-application-frame-color: var(--atlas-color-white);\n\t\t\t--co-application-frame-separator-color: var(--atlas-color-white);\n\n\t\t\t--co-feed-background-color: var(--atlas-color-white);\n\t\t\t--co-feed-color: var(--atlas-color-black);\n\t\t}\n\t} */\n}\n\n*[data-theme=\"themeCisionOne\"] {\n\t--co-accent-color: var(--atlas-color-secondary-g500);\n\n\t--atlas-dialog-color-semantic-danger: var(--atlas-color-semantic-danger);\n\n\t--atlas-application-frame-background-color: var(--co-application-frame-background-color);\n\t--atlas-application-frame-color: var(--co-application-frame-color);\n\t--atlas-application-frame-separator-style: var(--co-application-frame-separator-style);\n\n\t--atlas-feed-background-color: var(--co-feed-background-color);\n\t--atlas-feed-color: var(--co-feed-color);\n\n\t--atlas-brand-logo-separator-style: var(--co-application-frame-separator-style);\n\n\t--atlas-tile-board-tile-shadow: var(--co-shadow-tile-board-tile-layer);\n\n\t--atlas-button-primary-color: var(--co-button-primary-color);\n\t--atlas-button-primary-background-color: var(--co-button-primary-background-color);\n\t--atlas-button-hover-background-color: var(--co-button-hover-background-color);\n\t--atlas-button-primary-disabled-background-color: var(\n\t\t--co-button-primary-disabled-background-color\n\t);\n\n\t--atlas-chip-body-height: 1.88em;\n\t--atlas-chip-category-color: var(--co-chip-category-color);\n\t--atlas-chip-category-focus-color: var(--co-chip-category-focus-color);\n\n\t--atlas-chip-outlets-border-color: var(--co-chip-outlets-border-color);\n\t--atlas-chip-outlets-background-color: var(--co-chip-outlets-background-color);\n\t--atlas-chip-outlets-color: var(--co-chip-outlets-color);\n\t--atlas-chip-outlets-hover-color: var(--co-chip-category-hover-color);\n\t--atlas-chip-outlets-active-shadow-color: var(--co-chip-outlets-active-shadow-color);\n\t--atlas-chip-outlets-active-background-color: var(--co-chip-outlets-active-background-color);\n\n\t--atlas-chip-hashtags-border-color: var(--co-chip-hashtags-border-color);\n\t--atlas-chip-hashtags-background-color: var(--co-chip-hashtags-background-color);\n\n\t--atlas-chip-topics-border-color: var(--co-chip-topics-border-color);\n\t--atlas-chip-topics-background-color: var(--co-chip-topics-background-color);\n\t--atlas-chip-topics-color: var(--co-chip-topics-color);\n\t--atlas-chip-topics-hover-color: var(--co-chip-category-hover-color);\n\t--atlas-chip-topics-active-shadow-color: var(--co-chip-topics-active-shadow-color);\n\t--atlas-chip-topics-active-background-color: var(--co-chip-topics-active-background-color);\n\n\t--atlas-chip-type-filter-color: var(--co-chip-type-filter-color);\n\t--atlas-chip-type-filter-background-color: var(--co-chip-type-filter-background-color);\n\t--atlas-chip-type-filter-border-color: var(--co-chip-type-filter-border-color);\n\t--atlas-chip-type-filter-hover-background-color: var(\n\t\t--co-chip-type-filter-hover-background-color\n\t);\n\t--atlas-chip-type-filter-active-background-color: var(\n\t\t--co-chip-type-filter-active-background-color\n\t);\n\t--atlas-chip-type-filter-active-shadow-color: var(--co-chip-type-filter-active-shadow-color);\n\n\t/* Common Input */\n\t--atlas-input-common-border-color: var(--atlas-color-primary-n200);\n\t--atlas-input-common-border-size: 1px;\n\t--atlas-input-common-border: var(--atlas-input-common-border-size) solid\n\t\tvar(--atlas-input-common-border-color);\n\t--atlas-input-common-border-radius: 0.25em;\n\n\t--atlas-input-common-label-color: var(--atlas-color-primary-n400);\n\t--atlas-input-common-label-font-size: 0.75em;\n\t--atlas-input-common-label-block-spacing: 1em;\n\n\t--atlas-input-common-background-color: var(--atlas-color-white);\n\t--atlas-input-common-box-shadow: var(--co-shadow-controls-layer);\n\n\t--atlas-input-common-accent-color: var(--atlas-color-primary-b500);\n\n\t--atlas-dialog-border-radius: 0.625rem;\n}\n\natlas-brand-logo {\n\tborder-inline-end: var(--atlas-brand-logo-separator-style);\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/scratch.css"],"names":[],"mappings":"AAMA,qBAAqB;AACrB;CACC;;;EAGC,sBAAsB;EACtB,UAAU;EACV,SAAS;CACV;AACD;;AAEA;CACC;EACC,eAAe;CAChB;CACA;EACC,uCAAuC;EACvC,iBAAiB;EACjB,SAAS;CACV;;CAEA;EACC,oDAAoD;;EAEpD,iEAAiE;EACjE,wDAAwD;EACxD,uEAAuE;EACvE,6FAA6F;;EAE7F,0DAA0D;EAC1D,gDAAgD;;EAEhD,yDAAyD;EACzD,qEAAqE;EACrE,mEAAmE;EACnE,8EAA8E;;EAE9E,yDAAyD;EACzD,8DAA8D;EAC9D,8DAA8D;;EAE9D,iEAAiE;EACjE,kEAAkE;EAClE,0DAA0D;EAC1D,8DAA8D;EAC9D,8EAA8E;;EAE9E,kEAAkE;EAClE,0EAA0E;;EAE1E,4DAA4D;EAC5D,yDAAyD;EACzD,iEAAiE;EACjE,4DAA4D;EAC5D,6EAA6E;;EAE7E,4DAA4D;EAC5D,sEAAsE;EACtE,mEAAmE;EACnE,4EAA4E;EAC5E,6EAA6E;EAC7E,6DAA6D;;EAE7D,yCAAyC;EACzC,sDAAsD;;EAEtD,gCAAgC;EAChC,kDAAkD;;EAElD,sBAAsB;EACtB,qDAAqD;;EAErD,oBAAoB;EACpB,+DAA+D;;EAE/D,oFAAoF;EACpF,kFAAkF;CACnF;;CAEA;;;;;;;;;IASG;AACJ;;AAEA;CACC,oDAAoD;;CAEpD,wEAAwE;;CAExE,wFAAwF;CACxF,kEAAkE;CAClE,sFAAsF;;CAEtF,8DAA8D;CAC9D,wCAAwC;;CAExC,+EAA+E;;CAE/E,sEAAsE;;CAEtE,4DAA4D;CAC5D,kFAAkF;CAClF,8EAA8E;CAC9E;;EAEC;;CAED,gCAAgC;CAChC,0DAA0D;CAC1D,sEAAsE;;CAEtE,sEAAsE;CACtE,8EAA8E;CAC9E,wDAAwD;CACxD,qEAAqE;CACrE,oFAAoF;CACpF,4FAA4F;;CAE5F,wEAAwE;CACxE,gFAAgF;;CAEhF,oEAAoE;CACpE,4EAA4E;CAC5E,sDAAsD;CACtD,oEAAoE;CACpE,kFAAkF;CAClF,0FAA0F;;CAE1F,gEAAgE;CAChE,sFAAsF;CACtF,8EAA8E;CAC9E;;EAEC;CACD;;EAEC;CACD,4FAA4F;;CAE5F,iBAAiB;CACjB,kEAAkE;CAClE,qCAAqC;CACrC;wCACuC;CACvC,0CAA0C;;CAE1C,iEAAiE;CACjE,4CAA4C;CAC5C,6CAA6C;;CAE7C,+DAA+D;CAC/D,gEAAgE;;CAEhE,kEAAkE;;CAElE,sCAAsC;AACvC;;AAEA;CACC,0DAA0D;AAC3D","sourcesContent":["@import \"./tokens/layer-definitions.css\";\n\n@import \"./tokens/type.css\" layer(atlas);\n@import \"./tokens/palette.css\" layer(atlas);\n@import \"./tokens/shadow.css\" layer(atlas);\n\n/* the theme/scheme */\n@layer base {\n\t*,\n\t*::before,\n\t*::after {\n\t\tbox-sizing: border-box;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t}\n}\n\n@layer co {\n\thtml {\n\t\tfont-size: 100%;\n\t}\n\tbody {\n\t\tfont-family: var(--font-family-proxima);\n\t\tmin-height: 100vh;\n\t\tmargin: 0;\n\t}\n\n\t:root {\n\t\t--co-accent-color: var(--atlas-color-secondary-g500);\n\n\t\t--co-application-frame-background-color: var(--atlas-color-white);\n\t\t--co-application-frame-color: var(--atlas-color-grey-80);\n\t\t--co-application-frame-separator-color: var(--atlas-color-primary-n100);\n\t\t--co-application-frame-separator-style: 2px solid var(--co-application-frame-separator-color);\n\n\t\t--co-feed-background-color: var(--atlas-color-primary-n50);\n\t\t--co-feed-color: var(--atlas-color-primary-n400);\n\n\t\t--co-button-primary-color: var(--atlas-color-on-bg-white);\n\t\t--co-button-primary-background-color: var(--atlas-color-primary-b500);\n\t\t--co-button-hover-background-color: var(--atlas-color-primary-b400);\n\t\t--co-button-primary-disabled-background-color: var(--atlas-color-primary-n100);\n\n\t\t--co-chip-category-color: var(--atlas-color-primary-n400);\n\t\t--co-chip-category-focus-color: var(--atlas-color-on-bg-white);\n\t\t--co-chip-category-hover-color: var(--atlas-color-on-bg-white);\n\n\t\t--co-chip-outlets-border-color: var(--atlas-color-secondary-t300);\n\t\t--co-chip-outlets-background-color: var(--atlas-color-on-bg-white);\n\t\t--co-chip-outlets-color: var(--atlas-color-secondary-t500);\n\t\t--co-chip-outlets-active-shadow-color: rgba(14, 125, 121, 0.3);\n\t\t--co-chip-outlets-active-background-color: var(--atlas-color-chart-Xlightteal);\n\n\t\t--co-chip-hashtags-border-color: var(--atlas-color-secondary-p400);\n\t\t--co-chip-hashtags-background-color: var(--atlas-color-chart-Xlightpurple);\n\n\t\t--co-chip-topics-border-color: var(--atlas-color-chart-blue);\n\t\t--co-chip-topics-color: var(--atlas-color-chart-darkblue);\n\t\t--co-chip-topics-background-color: var(--atlas-color-on-bg-white);\n\t\t--co-chip-topics-active-shadow-color: rgba(45, 94, 161, 0.3);\n\t\t--co-chip-topics-active-background-color: var(--atlas-color-chart-Xlightblue);\n\n\t\t--co-chip-type-filter-color: var(--atlas-color-primary-n400);\n\t\t--co-chip-type-filter-background-color: var(--atlas-color-primary-n25);\n\t\t--co-chip-type-filter-border-color: var(--atlas-color-primary-n200);\n\t\t--co-chip-type-filter-hover-background-color: var(--atlas-color-primary-n50);\n\t\t--co-chip-type-filter-active-background-color: var(--atlas-color-primary-n50);\n\t\t--co-chip-type-filter-active-shadow-color: rgba(0, 0, 0, 0.3);\n\n\t\t/* Application layer menus and Dialogs  */\n\t\t--co-shadow-application-layer: var(--atlas-shadow-100);\n\n\t\t/* Input Controls and Dropdown */\n\t\t--co-shadow-controls-layer: var(--atlas-shadow-50);\n\n\t\t/* Feed inner Dialog */\n\t\t--co-shadow-feed-dialog-layer: var(--atlas-shadow-25);\n\n\t\t/* Tile Board Tile */\n\t\t--co-shadow-tile-board-tile-layer: var(--atlas-shadow-hard-100);\n\n\t\t/* --co-main-navigation-menu-icon-color--default: var(--atlas-color-primary-b400); */\n\t\t/* --co-main-navigation-menu-icon-color--hover: var(--atlas-color-primary-o500); */\n\t}\n\n\t/* @media (prefers-color-scheme: dark) {\n\t\t:root {\n\t\t\t--co-application-frame-background-color: var(--atlas-color-black);\n\t\t\t--co-application-frame-color: var(--atlas-color-white);\n\t\t\t--co-application-frame-separator-color: var(--atlas-color-white);\n\n\t\t\t--co-feed-background-color: var(--atlas-color-white);\n\t\t\t--co-feed-color: var(--atlas-color-black);\n\t\t}\n\t} */\n}\n\n*[data-theme=\"themeCisionOne\"] {\n\t--co-accent-color: var(--atlas-color-secondary-g500);\n\n\t--atlas-dialog-color-semantic-danger: var(--atlas-color-semantic-danger);\n\n\t--atlas-application-frame-background-color: var(--co-application-frame-background-color);\n\t--atlas-application-frame-color: var(--co-application-frame-color);\n\t--atlas-application-frame-separator-style: var(--co-application-frame-separator-style);\n\n\t--atlas-feed-background-color: var(--co-feed-background-color);\n\t--atlas-feed-color: var(--co-feed-color);\n\n\t--atlas-brand-logo-separator-style: var(--co-application-frame-separator-style);\n\n\t--atlas-tile-board-tile-shadow: var(--co-shadow-tile-board-tile-layer);\n\n\t--atlas-button-primary-color: var(--co-button-primary-color);\n\t--atlas-button-primary-background-color: var(--co-button-primary-background-color);\n\t--atlas-button-hover-background-color: var(--co-button-hover-background-color);\n\t--atlas-button-primary-disabled-background-color: var(\n\t\t--co-button-primary-disabled-background-color\n\t);\n\n\t--atlas-chip-body-height: 1.88em;\n\t--atlas-chip-category-color: var(--co-chip-category-color);\n\t--atlas-chip-category-focus-color: var(--co-chip-category-focus-color);\n\n\t--atlas-chip-outlets-border-color: var(--co-chip-outlets-border-color);\n\t--atlas-chip-outlets-background-color: var(--co-chip-outlets-background-color);\n\t--atlas-chip-outlets-color: var(--co-chip-outlets-color);\n\t--atlas-chip-outlets-hover-color: var(--co-chip-category-hover-color);\n\t--atlas-chip-outlets-active-shadow-color: var(--co-chip-outlets-active-shadow-color);\n\t--atlas-chip-outlets-active-background-color: var(--co-chip-outlets-active-background-color);\n\n\t--atlas-chip-hashtags-border-color: var(--co-chip-hashtags-border-color);\n\t--atlas-chip-hashtags-background-color: var(--co-chip-hashtags-background-color);\n\n\t--atlas-chip-topics-border-color: var(--co-chip-topics-border-color);\n\t--atlas-chip-topics-background-color: var(--co-chip-topics-background-color);\n\t--atlas-chip-topics-color: var(--co-chip-topics-color);\n\t--atlas-chip-topics-hover-color: var(--co-chip-category-hover-color);\n\t--atlas-chip-topics-active-shadow-color: var(--co-chip-topics-active-shadow-color);\n\t--atlas-chip-topics-active-background-color: var(--co-chip-topics-active-background-color);\n\n\t--atlas-chip-type-filter-color: var(--co-chip-type-filter-color);\n\t--atlas-chip-type-filter-background-color: var(--co-chip-type-filter-background-color);\n\t--atlas-chip-type-filter-border-color: var(--co-chip-type-filter-border-color);\n\t--atlas-chip-type-filter-hover-background-color: var(\n\t\t--co-chip-type-filter-hover-background-color\n\t);\n\t--atlas-chip-type-filter-active-background-color: var(\n\t\t--co-chip-type-filter-active-background-color\n\t);\n\t--atlas-chip-type-filter-active-shadow-color: var(--co-chip-type-filter-active-shadow-color);\n\n\t/* Common Input */\n\t--atlas-input-common-border-color: var(--atlas-color-primary-n200);\n\t--atlas-input-common-border-size: 1px;\n\t--atlas-input-common-border: var(--atlas-input-common-border-size) solid\n\t\tvar(--atlas-input-common-border-color);\n\t--atlas-input-common-border-radius: 0.25em;\n\n\t--atlas-input-common-label-color: var(--atlas-color-primary-n400);\n\t--atlas-input-common-label-font-size: 0.75em;\n\t--atlas-input-common-label-block-spacing: 1em;\n\n\t--atlas-input-common-background-color: var(--atlas-color-white);\n\t--atlas-input-common-box-shadow: var(--co-shadow-controls-layer);\n\n\t--atlas-input-common-accent-color: var(--atlas-color-primary-b500);\n\n\t--atlas-dialog-border-radius: 0.625rem;\n}\n\natlas-brand-logo {\n\tborder-inline-end: var(--atlas-brand-logo-separator-style);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/snackbar-box.css":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/snackbar-box.css ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-snackbar-box {\n\t\t--snackbar-box-right-position: 0;\n\t\t--snackbar-box-top-position: 0;\n\t\t--snackbar-box-width: 431px;\n\t\t--snackbar-box-gap: 1em;\n\t\t--snackbar-box-spacing: 1em;\n\t}\n\n\tatlas-snackbar-box {\n\t\tcontainer: snackbar-box / inline-size;\n\n\t\twidth: var(--snackbar-box-width);\n\t\tpadding: var(--snackbar-box-spacing);\n\n\t\tposition: absolute;\n\t\ttop: var(--snackbar-box-top-position);\n\t\tright: var(--snackbar-box-right-position);\n\n\t\tbackground: transparent;\n\t\tdisplay: flex;\n\t\tflex-flow: column;\n\t\toverflow: hidden;\n\t}\n\n\tatlas-snackbar-box > * {\n\t\tanimation: add 0.3s;\n\t\tmax-height: 10em;\n\t}\n\n\tatlas-snackbar-box > *:not(:last-child) {\n\t\tmargin-block-end: 1em;\n\t}\n\n\tatlas-snackbar-box > *[dismiss] {\n\t\ttransform: translateX(500px);\n\t\ttransition: transform 0.3s;\n\n\t\tanimation: collapse 0.2s forwards 0.1s;\n\t}\n\n\t@keyframes add {\n\t\tfrom {\n\t\t\ttransform: translateX(500px);\n\t\t}\n\t\tto {\n\t\t\ttransform: translateX(0);\n\t\t}\n\t}\n\n\t@keyframes collapse {\n\t\tto {\n\t\t\tmax-height: 0;\n\t\t\tpadding: 0;\n\t\t\tmargin-block-end: 0;\n\t\t}\n\t}\n\n\t@container app-frame (max-width: 450px) {\n\t\tatlas-snackbar-box {\n\t\t\t--snackbar-box-width: 100cqw;\n\t\t\t--snackbar-box-spacing: 0.5em;\n\t\t}\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/snackbar-box.css"],"names":[],"mappings":"AAAA;CACC;EACC,gCAAgC;EAChC,8BAA8B;EAC9B,2BAA2B;EAC3B,uBAAuB;EACvB,2BAA2B;CAC5B;;CAEA;EACC,qCAAqC;;EAErC,gCAAgC;EAChC,oCAAoC;;EAEpC,kBAAkB;EAClB,qCAAqC;EACrC,yCAAyC;;EAEzC,uBAAuB;EACvB,aAAa;EACb,iBAAiB;EACjB,gBAAgB;CACjB;;CAEA;EACC,mBAAmB;EACnB,gBAAgB;CACjB;;CAEA;EACC,qBAAqB;CACtB;;CAEA;EACC,4BAA4B;EAC5B,0BAA0B;;EAE1B,sCAAsC;CACvC;;CAEA;EACC;GACC,4BAA4B;EAC7B;EACA;GACC,wBAAwB;EACzB;CACD;;CAEA;EACC;GACC,aAAa;GACb,UAAU;GACV,mBAAmB;EACpB;CACD;;CAEA;EACC;GACC,4BAA4B;GAC5B,6BAA6B;EAC9B;CACD;AACD","sourcesContent":["@layer atlas {\n\tatlas-snackbar-box {\n\t\t--snackbar-box-right-position: 0;\n\t\t--snackbar-box-top-position: 0;\n\t\t--snackbar-box-width: 431px;\n\t\t--snackbar-box-gap: 1em;\n\t\t--snackbar-box-spacing: 1em;\n\t}\n\n\tatlas-snackbar-box {\n\t\tcontainer: snackbar-box / inline-size;\n\n\t\twidth: var(--snackbar-box-width);\n\t\tpadding: var(--snackbar-box-spacing);\n\n\t\tposition: absolute;\n\t\ttop: var(--snackbar-box-top-position);\n\t\tright: var(--snackbar-box-right-position);\n\n\t\tbackground: transparent;\n\t\tdisplay: flex;\n\t\tflex-flow: column;\n\t\toverflow: hidden;\n\t}\n\n\tatlas-snackbar-box > * {\n\t\tanimation: add 0.3s;\n\t\tmax-height: 10em;\n\t}\n\n\tatlas-snackbar-box > *:not(:last-child) {\n\t\tmargin-block-end: 1em;\n\t}\n\n\tatlas-snackbar-box > *[dismiss] {\n\t\ttransform: translateX(500px);\n\t\ttransition: transform 0.3s;\n\n\t\tanimation: collapse 0.2s forwards 0.1s;\n\t}\n\n\t@keyframes add {\n\t\tfrom {\n\t\t\ttransform: translateX(500px);\n\t\t}\n\t\tto {\n\t\t\ttransform: translateX(0);\n\t\t}\n\t}\n\n\t@keyframes collapse {\n\t\tto {\n\t\t\tmax-height: 0;\n\t\t\tpadding: 0;\n\t\t\tmargin-block-end: 0;\n\t\t}\n\t}\n\n\t@container app-frame (max-width: 450px) {\n\t\tatlas-snackbar-box {\n\t\t\t--snackbar-box-width: 100cqw;\n\t\t\t--snackbar-box-spacing: 0.5em;\n\t\t}\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/snackbar.css":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/snackbar.css ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-snackbar {\n\t\t--snackbar-background-color: #eef8ec;\n\t\t--snackbar-max-width: 100%;\n\t\t--snackbar-prefix-icon-size: 1.25em;\n\t\t--snackbar-suffix-icon-size: 1em;\n\t\t--snackbar-prefix-icon-color: #047c25;\n\t\t--snackbar-title-color: #1b923c;\n\t\t--snackbar-title-line-hight: 1.375rem;\n\t\t--snackbar-title-font-weight: 600;\n\t\t--snackbar-subtitle-color: var(--atlas-color-primary-n500);\n\t\t--snackbar-subtitle-line-hight: 1.25rem;\n\t\t--snackbar-subtitle-font-weight: 400;\n\t\t--snackbar-prefix-right-margin: 1.188rem;\n\t\t--snackbar-subtitle-font-size: 0.875rem;\n\t\t--snackbar-suffix-margin-left: 2rem;\n\t\t--snackbar-shadow: 0 0.125rem 0.125rem rgba(0, 0, 0, 0.1),\n\t\t\t0 0.125rem 0.625rem rgba(0, 0, 0, 0.1);\n\t}\n\n\tatlas-snackbar {\n\t\tbackground: var(--snackbar-background-color);\n\t\twidth: var(--snackbar-max-width);\n\t\tdisplay: grid;\n\t\tborder-radius: 0.5rem;\n\t\talign-items: center;\n\t\tgrid-template-rows: 1fr 1fr;\n\t\tpadding: 1rem 1.375rem 1rem 1.188rem;\n\t\tgrid-template-columns: auto 1fr auto;\n\t\tbox-shadow: var(--snackbar-shadow);\n\t\tgrid-template-areas:\n\t\t\t\"prefix title suffix\"\n\t\t\t\"prefix sub-title suffix\";\n\t}\n\n\tatlas-snackbar > atlas-icon[slot=\"prefix\"] {\n\t\tcolor: var(--snackbar-prefix-icon-color);\n\t}\n\n\tatlas-snackbar::part(prefix) {\n\t\tdisplay: flex;\n\t\tgrid-area: prefix;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tfont-size: var(--snackbar-prefix-icon-size);\n\t\tmargin-inline-end: var(--snackbar-prefix-right-margin);\n\t}\n\n\tatlas-snackbar::part(title) {\n\t\tcolor: var(--snackbar-title-color);\n\t\tdisplay: block;\n\t\tgrid-area: title;\n\t\tfont-weight: var(--snackbar-title-font-weight);\n\t\tline-height: var(--snackbar-title-line-hight);\n\t}\n\n\tatlas-snackbar::part(sub-title) {\n\t\tcolor: var(--snackbar-subtitle-color);\n\t\tdisplay: block;\n\t\tfont-size: var(--snackbar-subtitle-font-size);\n\t\tfont-weight: var(--snackbar-subtitle-font-weight);\n\t\tline-height: var(--snackbar-subtitle-line-hight);\n\t\tgrid-area: sub-title;\n\t}\n\n\tatlas-snackbar::part(suffix) {\n\t\tdisplay: flex;\n\t\tgrid-area: suffix;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tfont-size: var(--snackbar-suffix-icon-size);\n\t\tmargin-inline-start: var(--snackbar-suffix-margin-left);\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/snackbar.css"],"names":[],"mappings":"AAAA;CACC;EACC,oCAAoC;EACpC,0BAA0B;EAC1B,mCAAmC;EACnC,gCAAgC;EAChC,qCAAqC;EACrC,+BAA+B;EAC/B,qCAAqC;EACrC,iCAAiC;EACjC,0DAA0D;EAC1D,uCAAuC;EACvC,oCAAoC;EACpC,wCAAwC;EACxC,uCAAuC;EACvC,mCAAmC;EACnC;yCACuC;CACxC;;CAEA;EACC,4CAA4C;EAC5C,gCAAgC;EAChC,aAAa;EACb,qBAAqB;EACrB,mBAAmB;EACnB,2BAA2B;EAC3B,oCAAoC;EACpC,oCAAoC;EACpC,kCAAkC;EAClC;;4BAE0B;CAC3B;;CAEA;EACC,wCAAwC;CACzC;;CAEA;EACC,aAAa;EACb,iBAAiB;EACjB,mBAAmB;EACnB,uBAAuB;EACvB,2CAA2C;EAC3C,sDAAsD;CACvD;;CAEA;EACC,kCAAkC;EAClC,cAAc;EACd,gBAAgB;EAChB,8CAA8C;EAC9C,6CAA6C;CAC9C;;CAEA;EACC,qCAAqC;EACrC,cAAc;EACd,6CAA6C;EAC7C,iDAAiD;EACjD,gDAAgD;EAChD,oBAAoB;CACrB;;CAEA;EACC,aAAa;EACb,iBAAiB;EACjB,mBAAmB;EACnB,uBAAuB;EACvB,2CAA2C;EAC3C,uDAAuD;CACxD;AACD","sourcesContent":["@layer atlas {\n\tatlas-snackbar {\n\t\t--snackbar-background-color: #eef8ec;\n\t\t--snackbar-max-width: 100%;\n\t\t--snackbar-prefix-icon-size: 1.25em;\n\t\t--snackbar-suffix-icon-size: 1em;\n\t\t--snackbar-prefix-icon-color: #047c25;\n\t\t--snackbar-title-color: #1b923c;\n\t\t--snackbar-title-line-hight: 1.375rem;\n\t\t--snackbar-title-font-weight: 600;\n\t\t--snackbar-subtitle-color: var(--atlas-color-primary-n500);\n\t\t--snackbar-subtitle-line-hight: 1.25rem;\n\t\t--snackbar-subtitle-font-weight: 400;\n\t\t--snackbar-prefix-right-margin: 1.188rem;\n\t\t--snackbar-subtitle-font-size: 0.875rem;\n\t\t--snackbar-suffix-margin-left: 2rem;\n\t\t--snackbar-shadow: 0 0.125rem 0.125rem rgba(0, 0, 0, 0.1),\n\t\t\t0 0.125rem 0.625rem rgba(0, 0, 0, 0.1);\n\t}\n\n\tatlas-snackbar {\n\t\tbackground: var(--snackbar-background-color);\n\t\twidth: var(--snackbar-max-width);\n\t\tdisplay: grid;\n\t\tborder-radius: 0.5rem;\n\t\talign-items: center;\n\t\tgrid-template-rows: 1fr 1fr;\n\t\tpadding: 1rem 1.375rem 1rem 1.188rem;\n\t\tgrid-template-columns: auto 1fr auto;\n\t\tbox-shadow: var(--snackbar-shadow);\n\t\tgrid-template-areas:\n\t\t\t\"prefix title suffix\"\n\t\t\t\"prefix sub-title suffix\";\n\t}\n\n\tatlas-snackbar > atlas-icon[slot=\"prefix\"] {\n\t\tcolor: var(--snackbar-prefix-icon-color);\n\t}\n\n\tatlas-snackbar::part(prefix) {\n\t\tdisplay: flex;\n\t\tgrid-area: prefix;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tfont-size: var(--snackbar-prefix-icon-size);\n\t\tmargin-inline-end: var(--snackbar-prefix-right-margin);\n\t}\n\n\tatlas-snackbar::part(title) {\n\t\tcolor: var(--snackbar-title-color);\n\t\tdisplay: block;\n\t\tgrid-area: title;\n\t\tfont-weight: var(--snackbar-title-font-weight);\n\t\tline-height: var(--snackbar-title-line-hight);\n\t}\n\n\tatlas-snackbar::part(sub-title) {\n\t\tcolor: var(--snackbar-subtitle-color);\n\t\tdisplay: block;\n\t\tfont-size: var(--snackbar-subtitle-font-size);\n\t\tfont-weight: var(--snackbar-subtitle-font-weight);\n\t\tline-height: var(--snackbar-subtitle-line-hight);\n\t\tgrid-area: sub-title;\n\t}\n\n\tatlas-snackbar::part(suffix) {\n\t\tdisplay: flex;\n\t\tgrid-area: suffix;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tfont-size: var(--snackbar-suffix-icon-size);\n\t\tmargin-inline-start: var(--snackbar-suffix-margin-left);\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/snackbar.small.css":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/snackbar.small.css ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\t@container snackbar-box (max-width: 350px) {\n\t\tatlas-snackbar {\n\t\t\t--snackbar-small-spacing: 0.5em;\n\t\t\t--snackbar-suffix-margin-left: var(--snackbar-small-spacing);\n\t\t\t--snackbar-prefix-right-margin: var(--snackbar-small-spacing);\n\t\t}\n\n\t\tatlas-snackbar::part(sub-title) {\n\t\t\toverflow: hidden;\n\t\t\twhite-space: nowrap;\n\t\t}\n\n\t\tatlas-snackbar > [slot=\"sub-title\"] {\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\t}\n\n\t@container snackbar-box (max-width: 300px) {\n\t\tatlas-snackbar {\n\t\t\tpadding: var(--snackbar-small-spacing);\n\t\t}\n\n\t\tatlas-snackbar::part(prefix) {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/snackbar.small.css"],"names":[],"mappings":"AAAA;CACC;EACC;GACC,+BAA+B;GAC/B,4DAA4D;GAC5D,6DAA6D;EAC9D;;EAEA;GACC,gBAAgB;GAChB,mBAAmB;EACpB;;EAEA;GACC,gBAAgB;GAChB,uBAAuB;EACxB;CACD;;CAEA;EACC;GACC,sCAAsC;EACvC;;EAEA;GACC,aAAa;EACd;CACD;AACD","sourcesContent":["@layer atlas {\n\t@container snackbar-box (max-width: 350px) {\n\t\tatlas-snackbar {\n\t\t\t--snackbar-small-spacing: 0.5em;\n\t\t\t--snackbar-suffix-margin-left: var(--snackbar-small-spacing);\n\t\t\t--snackbar-prefix-right-margin: var(--snackbar-small-spacing);\n\t\t}\n\n\t\tatlas-snackbar::part(sub-title) {\n\t\t\toverflow: hidden;\n\t\t\twhite-space: nowrap;\n\t\t}\n\n\t\tatlas-snackbar > [slot=\"sub-title\"] {\n\t\t\toverflow: hidden;\n\t\t\ttext-overflow: ellipsis;\n\t\t}\n\t}\n\n\t@container snackbar-box (max-width: 300px) {\n\t\tatlas-snackbar {\n\t\t\tpadding: var(--snackbar-small-spacing);\n\t\t}\n\n\t\tatlas-snackbar::part(prefix) {\n\t\t\tdisplay: none;\n\t\t}\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/stepper-step.css":
/*!***********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/stepper-step.css ***!
  \***********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\t:root {\n\t\t--step-color-accent: var(--atlas-color-primary-b400);\n\t\t--step-color-base: var(--atlas-color-primary-n200);\n\t\t--step-check-color: var(--atlas-color-on-bg-white);\n\n\t\t--step-check-size: 1.125em;\n\t\t--step-size: 2.5em;\n\t\t--step-border-width: 1.5px;\n\t\t--step-bar-length: 3em;\n\t\t--step-spacer: 1ch;\n\t\t--step-bar-width: 1px;\n\n\t\t--step-bar-border: var(--step-bar-width) dashed var(--step-color-base);\n\t\t--step-finished-bar-border: var(--step-bar-width) solid var(--step-color-accent);\n\n\t\t--step-color: var(--step-color-base);\n\t\t--step-background-color: inherit;\n\t\t--step-border: var(--step-border-width) dashed var(--step-color-base);\n\n\t\t--step-current-color: var(--step-color-accent);\n\t\t--step-current-background-color: inherit;\n\t\t--step-current-border: var(--step-border-width) solid var(--step-color-accent);\n\n\t\t--step-finished-color: var(--step-check-color);\n\t\t--step-finished-background-color: var(--step-color-accent);\n\t\t--step-finished-border: 0;\n\t}\n\n\tatlas-stepper-step {\n\t\tdisplay: flex;\n\t\tflex-wrap: nowrap;\n\t\talign-items: center;\n\t}\n\n\tatlas-stepper-step::part(check) {\n\t\tdisplay: none;\n\n\t\tcolor: var(--step-check-color);\n\n\t\twidth: 1em;\n\t\theight: 1em;\n\t\tfont-size: var(--step-check-size);\n\t}\n\n\tatlas-stepper-step::part(step) {\n\t\tdisplay: flex;\n\t\tmargin-inline: auto;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\n\t\twidth: var(--step-size);\n\t\taspect-ratio: 1 / 1;\n\t\tborder-radius: 100vw;\n\t\toverflow: hidden;\n\t\twhite-space: nowrap;\n\n\t\tbox-sizing: border-box;\n\n\t\tcolor: var(--step-color);\n\t\tbackground-color: var(--step-background-color);\n\t\tborder: var(--step-border);\n\t}\n\n\tatlas-stepper-step::part(before) {\n\t\tdisplay: block;\n\t\twidth: var(--step-bar-length);\n\t\theight: 0;\n\t\tborder-radius: 100vw;\n\t\tborder: var(--step-bar-border);\n\t\tmargin-inline: var(--step-spacer);\n\t}\n\n\tatlas-stepper-step::part(after) {\n\t\tdisplay: none;\n\t\twidth: var(--step-bar-length);\n\t\theight: 0;\n\t\tborder-radius: 100vw;\n\t\tborder: var(--step-bar-border);\n\t\tmargin-inline: var(--step-spacer);\n\t}\n\n\tatlas-stepper-step[current]::part(step) {\n\t\tcolor: var(--step-current-color);\n\t\tbackground-color: var(--step-current-background-color);\n\t\tborder: var(--step-current-border);\n\t}\n\tatlas-stepper-step[current]::part(before) {\n\t\tdisplay: none;\n\t}\n\tatlas-stepper-step[current]::part(after) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-stepper-step[finished]::part(step) {\n\t\tcolor: var(--step-finished-color);\n\t\tbackground-color: var(--step-finished-background-color);\n\t\tborder: var(--step-finished-border);\n\t}\n\tatlas-stepper-step[finished]::part(before) {\n\t\tdisplay: none;\n\t}\n\tatlas-stepper-step[finished]::part(after) {\n\t\tdisplay: block;\n\n\t\tbackground-color: var(--step-finished-bar-color);\n\t\tborder: var(--step-finished-bar-border);\n\t}\n\n\tatlas-stepper-step[finished]::part(content) {\n\t\tdisplay: none;\n\t}\n\tatlas-stepper-step[finished]::part(check) {\n\t\tdisplay: block;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/stepper-step.css"],"names":[],"mappings":"AAAA;CACC;EACC,oDAAoD;EACpD,kDAAkD;EAClD,kDAAkD;;EAElD,0BAA0B;EAC1B,kBAAkB;EAClB,0BAA0B;EAC1B,sBAAsB;EACtB,kBAAkB;EAClB,qBAAqB;;EAErB,sEAAsE;EACtE,gFAAgF;;EAEhF,oCAAoC;EACpC,gCAAgC;EAChC,qEAAqE;;EAErE,8CAA8C;EAC9C,wCAAwC;EACxC,8EAA8E;;EAE9E,8CAA8C;EAC9C,0DAA0D;EAC1D,yBAAyB;CAC1B;;CAEA;EACC,aAAa;EACb,iBAAiB;EACjB,mBAAmB;CACpB;;CAEA;EACC,aAAa;;EAEb,8BAA8B;;EAE9B,UAAU;EACV,WAAW;EACX,iCAAiC;CAClC;;CAEA;EACC,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,uBAAuB;;EAEvB,uBAAuB;EACvB,mBAAmB;EACnB,oBAAoB;EACpB,gBAAgB;EAChB,mBAAmB;;EAEnB,sBAAsB;;EAEtB,wBAAwB;EACxB,8CAA8C;EAC9C,0BAA0B;CAC3B;;CAEA;EACC,cAAc;EACd,6BAA6B;EAC7B,SAAS;EACT,oBAAoB;EACpB,8BAA8B;EAC9B,iCAAiC;CAClC;;CAEA;EACC,aAAa;EACb,6BAA6B;EAC7B,SAAS;EACT,oBAAoB;EACpB,8BAA8B;EAC9B,iCAAiC;CAClC;;CAEA;EACC,gCAAgC;EAChC,sDAAsD;EACtD,kCAAkC;CACnC;CACA;EACC,aAAa;CACd;CACA;EACC,aAAa;CACd;;CAEA;EACC,iCAAiC;EACjC,uDAAuD;EACvD,mCAAmC;CACpC;CACA;EACC,aAAa;CACd;CACA;EACC,cAAc;;EAEd,gDAAgD;EAChD,uCAAuC;CACxC;;CAEA;EACC,aAAa;CACd;CACA;EACC,cAAc;CACf;AACD","sourcesContent":["@layer atlas {\n\t:root {\n\t\t--step-color-accent: var(--atlas-color-primary-b400);\n\t\t--step-color-base: var(--atlas-color-primary-n200);\n\t\t--step-check-color: var(--atlas-color-on-bg-white);\n\n\t\t--step-check-size: 1.125em;\n\t\t--step-size: 2.5em;\n\t\t--step-border-width: 1.5px;\n\t\t--step-bar-length: 3em;\n\t\t--step-spacer: 1ch;\n\t\t--step-bar-width: 1px;\n\n\t\t--step-bar-border: var(--step-bar-width) dashed var(--step-color-base);\n\t\t--step-finished-bar-border: var(--step-bar-width) solid var(--step-color-accent);\n\n\t\t--step-color: var(--step-color-base);\n\t\t--step-background-color: inherit;\n\t\t--step-border: var(--step-border-width) dashed var(--step-color-base);\n\n\t\t--step-current-color: var(--step-color-accent);\n\t\t--step-current-background-color: inherit;\n\t\t--step-current-border: var(--step-border-width) solid var(--step-color-accent);\n\n\t\t--step-finished-color: var(--step-check-color);\n\t\t--step-finished-background-color: var(--step-color-accent);\n\t\t--step-finished-border: 0;\n\t}\n\n\tatlas-stepper-step {\n\t\tdisplay: flex;\n\t\tflex-wrap: nowrap;\n\t\talign-items: center;\n\t}\n\n\tatlas-stepper-step::part(check) {\n\t\tdisplay: none;\n\n\t\tcolor: var(--step-check-color);\n\n\t\twidth: 1em;\n\t\theight: 1em;\n\t\tfont-size: var(--step-check-size);\n\t}\n\n\tatlas-stepper-step::part(step) {\n\t\tdisplay: flex;\n\t\tmargin-inline: auto;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\n\t\twidth: var(--step-size);\n\t\taspect-ratio: 1 / 1;\n\t\tborder-radius: 100vw;\n\t\toverflow: hidden;\n\t\twhite-space: nowrap;\n\n\t\tbox-sizing: border-box;\n\n\t\tcolor: var(--step-color);\n\t\tbackground-color: var(--step-background-color);\n\t\tborder: var(--step-border);\n\t}\n\n\tatlas-stepper-step::part(before) {\n\t\tdisplay: block;\n\t\twidth: var(--step-bar-length);\n\t\theight: 0;\n\t\tborder-radius: 100vw;\n\t\tborder: var(--step-bar-border);\n\t\tmargin-inline: var(--step-spacer);\n\t}\n\n\tatlas-stepper-step::part(after) {\n\t\tdisplay: none;\n\t\twidth: var(--step-bar-length);\n\t\theight: 0;\n\t\tborder-radius: 100vw;\n\t\tborder: var(--step-bar-border);\n\t\tmargin-inline: var(--step-spacer);\n\t}\n\n\tatlas-stepper-step[current]::part(step) {\n\t\tcolor: var(--step-current-color);\n\t\tbackground-color: var(--step-current-background-color);\n\t\tborder: var(--step-current-border);\n\t}\n\tatlas-stepper-step[current]::part(before) {\n\t\tdisplay: none;\n\t}\n\tatlas-stepper-step[current]::part(after) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-stepper-step[finished]::part(step) {\n\t\tcolor: var(--step-finished-color);\n\t\tbackground-color: var(--step-finished-background-color);\n\t\tborder: var(--step-finished-border);\n\t}\n\tatlas-stepper-step[finished]::part(before) {\n\t\tdisplay: none;\n\t}\n\tatlas-stepper-step[finished]::part(after) {\n\t\tdisplay: block;\n\n\t\tbackground-color: var(--step-finished-bar-color);\n\t\tborder: var(--step-finished-bar-border);\n\t}\n\n\tatlas-stepper-step[finished]::part(content) {\n\t\tdisplay: none;\n\t}\n\tatlas-stepper-step[finished]::part(check) {\n\t\tdisplay: block;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/stepper.css":
/*!******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/stepper.css ***!
  \******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-stepper {\n\t\tdisplay: flex;\n\t\tflex-wrap: nowrap;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/stepper.css"],"names":[],"mappings":"AAAA;CACC;EACC,aAAa;EACb,iBAAiB;CAClB;AACD","sourcesContent":["@layer atlas {\n\tatlas-stepper {\n\t\tdisplay: flex;\n\t\tflex-wrap: nowrap;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tile-board-tile.css":
/*!**************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tile-board-tile.css ***!
  \**************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-tile-board-tile {\n\t\t--atlas-title-board-tile-border-radius: 0.5em;\n\t\t--atlas-title-board-padding: 1em;\n\n\t\tdisplay: flex;\n\t\tflex-flow: nowrap;\n\n\t\tbackground-color: var(--atlas-color-white);\n\t\tpadding: var(--atlas-title-board-padding);\n\t\tbox-shadow: var(--atlas-tile-board-tile-shadow);\n\t\tborder-radius: var(--atlas-title-board-tile-border-radius);\n\t}\n\n\tatlas-tile-board-tile::part(controls) {\n\t\tdisplay: block;\n\t}\n\n\tatlas-tile-board-tile::part(body) {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tflex-grow: max-content;\n\t\twidth: 100%;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/tile-board-tile.css"],"names":[],"mappings":"AAAA;CACC;EACC,6CAA6C;EAC7C,gCAAgC;;EAEhC,aAAa;EACb,iBAAiB;;EAEjB,0CAA0C;EAC1C,yCAAyC;EACzC,+CAA+C;EAC/C,0DAA0D;CAC3D;;CAEA;EACC,cAAc;CACf;;CAEA;EACC,aAAa;EACb,eAAe;EACf,sBAAsB;EACtB,WAAW;CACZ;AACD","sourcesContent":["@layer atlas {\n\tatlas-tile-board-tile {\n\t\t--atlas-title-board-tile-border-radius: 0.5em;\n\t\t--atlas-title-board-padding: 1em;\n\n\t\tdisplay: flex;\n\t\tflex-flow: nowrap;\n\n\t\tbackground-color: var(--atlas-color-white);\n\t\tpadding: var(--atlas-title-board-padding);\n\t\tbox-shadow: var(--atlas-tile-board-tile-shadow);\n\t\tborder-radius: var(--atlas-title-board-tile-border-radius);\n\t}\n\n\tatlas-tile-board-tile::part(controls) {\n\t\tdisplay: block;\n\t}\n\n\tatlas-tile-board-tile::part(body) {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tflex-grow: max-content;\n\t\twidth: 100%;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tile-board.css":
/*!*********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tile-board.css ***!
  \*********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-tile-board {\n\t\tcontainer-type: inline-size;\n\t\tcontainer-name: atlas-tile-board;\n\t\tdisplay: block;\n\t\t--atlas-tile-board-border-radius: 0.75em;\n\t\t--atlas-title-board-grid-gap: 1em;\n\t\t--atlas-title-board-padding: 1em;\n\t\t--atlas-tile-board-max-width: 1024px;\n\t\t--atlas-tile-board-prefix-font-weight: 700;\n\t\t--atlas-tile-board-prefix-gap: 1em;\n\t\t--atlas-tile-board-margin-block-start: 1em;\n\t\t--atlas-tile-board-padding-inline-start: 1em;\n\t}\n\n\tatlas-tile-board::part(prefix) {\n\t\tdisplay: flex;\n\t\tmargin-block-start: var(--atlas-tile-board-margin-block-start);\n\t\tmargin-inline: auto;\n\n\t\tmax-width: var(--atlas-tile-board-max-width);\n\t\tpadding-inline-start: var(--atlas-tile-board-padding-inline-start);\n\n\t\tfont-weight: var(--atlas-tile-board-prefix-font-weight);\n\t}\n\n\tatlas-tile-board::part(dashboard) {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: repeat(2, 1fr);\n\t\tgrid-template-rows: min-content;\n\n\t\tgap: var(--atlas-title-board-grid-gap);\n\t\tpadding: var(--atlas-title-board-padding);\n\t\tborder-radius: var(--atlas-tile-board-border-radius);\n\n\t\tmax-width: var(--atlas-tile-board-max-width);\n\t\tmargin: auto;\n\n\t\tbackground-color: var(--atlas-color-primary-n25);\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/tile-board.css"],"names":[],"mappings":"AAAA;CACC;EACC,2BAA2B;EAC3B,gCAAgC;EAChC,cAAc;EACd,wCAAwC;EACxC,iCAAiC;EACjC,gCAAgC;EAChC,oCAAoC;EACpC,0CAA0C;EAC1C,kCAAkC;EAClC,0CAA0C;EAC1C,4CAA4C;CAC7C;;CAEA;EACC,aAAa;EACb,8DAA8D;EAC9D,mBAAmB;;EAEnB,4CAA4C;EAC5C,kEAAkE;;EAElE,uDAAuD;CACxD;;CAEA;EACC,aAAa;EACb,qCAAqC;EACrC,+BAA+B;;EAE/B,sCAAsC;EACtC,yCAAyC;EACzC,oDAAoD;;EAEpD,4CAA4C;EAC5C,YAAY;;EAEZ,gDAAgD;CACjD;AACD","sourcesContent":["@layer atlas {\n\tatlas-tile-board {\n\t\tcontainer-type: inline-size;\n\t\tcontainer-name: atlas-tile-board;\n\t\tdisplay: block;\n\t\t--atlas-tile-board-border-radius: 0.75em;\n\t\t--atlas-title-board-grid-gap: 1em;\n\t\t--atlas-title-board-padding: 1em;\n\t\t--atlas-tile-board-max-width: 1024px;\n\t\t--atlas-tile-board-prefix-font-weight: 700;\n\t\t--atlas-tile-board-prefix-gap: 1em;\n\t\t--atlas-tile-board-margin-block-start: 1em;\n\t\t--atlas-tile-board-padding-inline-start: 1em;\n\t}\n\n\tatlas-tile-board::part(prefix) {\n\t\tdisplay: flex;\n\t\tmargin-block-start: var(--atlas-tile-board-margin-block-start);\n\t\tmargin-inline: auto;\n\n\t\tmax-width: var(--atlas-tile-board-max-width);\n\t\tpadding-inline-start: var(--atlas-tile-board-padding-inline-start);\n\n\t\tfont-weight: var(--atlas-tile-board-prefix-font-weight);\n\t}\n\n\tatlas-tile-board::part(dashboard) {\n\t\tdisplay: grid;\n\t\tgrid-template-columns: repeat(2, 1fr);\n\t\tgrid-template-rows: min-content;\n\n\t\tgap: var(--atlas-title-board-grid-gap);\n\t\tpadding: var(--atlas-title-board-padding);\n\t\tborder-radius: var(--atlas-tile-board-border-radius);\n\n\t\tmax-width: var(--atlas-tile-board-max-width);\n\t\tmargin: auto;\n\n\t\tbackground-color: var(--atlas-color-primary-n25);\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tile-board.small.css":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tile-board.small.css ***!
  \***************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@container atlas-tile-board (max-width: 700px) {\n\tatlas-tile-board::part(dashboard) {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/tile-board.small.css"],"names":[],"mappings":"AAAA;CACC;EACC,aAAa;EACb,sBAAsB;CACvB;AACD","sourcesContent":["@container atlas-tile-board (max-width: 700px) {\n\tatlas-tile-board::part(dashboard) {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tokens/layer-definitions.css":
/*!***********************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tokens/layer-definitions.css ***!
  \***********************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer base, atlas, co;\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/tokens/layer-definitions.css"],"names":[],"mappings":"AAAA,sBAAsB","sourcesContent":["@layer base, atlas, co;\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tokens/palette.css":
/*!*************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tokens/palette.css ***!
  \*************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* the theme/schemes pallet */\n:root {\n\t--atlas-color-wildberry: red;\n\t--atlas-color-white: white;\n\t--atlas-color-black: black;\n\t--atlas-color-grey-80: #677078;\n\t--atlas-color-on-bg-white: #ffffff;\n\n\t/* primary colors */\n\t/* blue */\n\t--atlas-color-primary-b500: #00607f;\n\t--atlas-color-primary-b400: #007fa8;\n\t--atlas-color-primary-b300: #009ed1;\n\t--atlas-color-primary-b200: #00bdf9;\n\t--atlas-color-primary-b100: #5ad7ff;\n\t--atlas-color-primary-b50: #9fe7ff;\n\t--atlas-color-primary-b25: #dff9ff;\n\n\t/* orange */\n\t--atlas-color-primary-o500: #fc5b08;\n\t--atlas-color-primary-o400: #fd7c3a;\n\t--atlas-color-primary-o300: #fd9e6d;\n\t--atlas-color-primary-o200: #febf9f;\n\t--atlas-color-primary-o100: #fee1d2;\n\t--atlas-color-primary-o50: #fff2eb;\n\t--atlas-color-primary-o25: #fffaf6;\n\n\t/* neutral */\n\t--atlas-color-primary-n500: #0a0d0f;\n\t--atlas-color-primary-n400: #34404b;\n\t--atlas-color-primary-n300: #677078;\n\t--atlas-color-primary-n200: #9aa0a5;\n\t--atlas-color-primary-n100: #cccfd2;\n\t--atlas-color-primary-n50: #ebeced;\n\t--atlas-color-primary-n25: #f7f7f7;\n\n\t/* secondary colors */\n\t/* purple */\n\t--atlas-color-secondary-p500: #7a53be;\n\t--atlas-color-secondary-p400: #9664d8;\n\t--atlas-color-secondary-p300: #b67ce2;\n\t--atlas-color-secondary-p200: #db93f0;\n\t--atlas-color-secondary-p100: #faaffb;\n\t--atlas-color-secondary-p50: #f7d6f7;\n\t--atlas-color-secondary-p25: #faf0fa;\n\n\t/* teal */\n\t--atlas-color-secondary-t500: #0e7d79;\n\t--atlas-color-secondary-t400: #19948f;\n\t--atlas-color-secondary-t300: #25afa9;\n\t--atlas-color-secondary-t200: #2fcbc5;\n\t--atlas-color-secondary-t100: #39e9e3;\n\t--atlas-color-secondary-t50: #51fdf7;\n\t--atlas-color-secondary-t25: #c3fefd;\n\n\t/* green */\n\t--atlas-color-secondary-g500: #2d7722;\n\t--atlas-color-secondary-g400: #26901a;\n\t--atlas-color-secondary-g300: #30ab0b;\n\t--atlas-color-secondary-g200: #72c21c;\n\t--atlas-color-secondary-g100: #a5d928;\n\t--atlas-color-secondary-g50: #d1ee32;\n\t--atlas-color-secondary-g25: #f0fe37;\n\n\t/* sienna */\n\t--atlas-color-secondary-s500: #be780d;\n\t--atlas-color-secondary-s400: #da890f;\n\t--atlas-color-secondary-s300: #f79b11;\n\t--atlas-color-secondary-s200: #ffb913;\n\t--atlas-color-secondary-s100: #ffd612;\n\t--atlas-color-secondary-s50: #ffed42;\n\t--atlas-color-secondary-s25: #fff7ab;\n\n\t/* semantics */\n\t--atlas-color-semantic-danger: #bf0002;\n\t--atlas-color-semantic-warning: #ffc700;\n\t--atlas-color-semantic-success: #047c25;\n\t--atlas-color-semantic-danger-light: #feebea;\n\t--atlas-color-semantic-warning-light: #fef8d3;\n\t--atlas-color-semantic-success-light: #e9fcf6;\n\n\t/* charts */\n\t--atlas-color-chart-darkblue: #2d5ea1;\n\t--atlas-color-chart-darkpurple: #5b4887;\n\t--atlas-color-chart-darkmagenta: #cb509e;\n\t--atlas-color-chart-darkteal: #2dafac;\n\t--atlas-color-chart-darkgreen: #009e71;\n\t--atlas-color-chart-darkred: #cb4e55;\n\t--atlas-color-chart-darkyellow: #fdd500;\n\t--atlas-color-chart-blue: #3487f7;\n\t--atlas-color-chart-purple: #9664d8;\n\t--atlas-color-chart-magenta: #ff64c6;\n\t--atlas-color-chart-teal: #39dbd8;\n\t--atlas-color-chart-green: #00c68d;\n\t--atlas-color-chart-red: #ff626b;\n\t--atlas-color-chart-yellow: #fde568;\n\t--atlas-color-chart-lightblue: #23c9ff;\n\t--atlas-color-chart-lightpurple: #db93f0;\n\t--atlas-color-chart-lightmagenta: #ffa4f6;\n\t--atlas-color-chart-lightteal: #52ebe7;\n\t--atlas-color-chart-lightgreen: #a1f0d7;\n\t--atlas-color-chart-lightred: #ffbbbe;\n\t--atlas-color-chart-lightyellow: #fff5c2;\n\t--atlas-color-chart-Xlightblue: #ecf4ff;\n\t--atlas-color-chart-Xlightpurple: #f4f1ff;\n\t--atlas-color-chart-Xlightmagenta: #fff3fb;\n\t--atlas-color-chart-Xlightteal: #e6faf9;\n\t--atlas-color-chart-Xlightgreen: #e6fdf6;\n\t--atlas-color-chart-Xlightred: #fff2f3;\n\t--atlas-color-chart-Xlightyellow: #fffae2;\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/tokens/palette.css"],"names":[],"mappings":"AAAA,6BAA6B;AAC7B;CACC,4BAA4B;CAC5B,0BAA0B;CAC1B,0BAA0B;CAC1B,8BAA8B;CAC9B,kCAAkC;;CAElC,mBAAmB;CACnB,SAAS;CACT,mCAAmC;CACnC,mCAAmC;CACnC,mCAAmC;CACnC,mCAAmC;CACnC,mCAAmC;CACnC,kCAAkC;CAClC,kCAAkC;;CAElC,WAAW;CACX,mCAAmC;CACnC,mCAAmC;CACnC,mCAAmC;CACnC,mCAAmC;CACnC,mCAAmC;CACnC,kCAAkC;CAClC,kCAAkC;;CAElC,YAAY;CACZ,mCAAmC;CACnC,mCAAmC;CACnC,mCAAmC;CACnC,mCAAmC;CACnC,mCAAmC;CACnC,kCAAkC;CAClC,kCAAkC;;CAElC,qBAAqB;CACrB,WAAW;CACX,qCAAqC;CACrC,qCAAqC;CACrC,qCAAqC;CACrC,qCAAqC;CACrC,qCAAqC;CACrC,oCAAoC;CACpC,oCAAoC;;CAEpC,SAAS;CACT,qCAAqC;CACrC,qCAAqC;CACrC,qCAAqC;CACrC,qCAAqC;CACrC,qCAAqC;CACrC,oCAAoC;CACpC,oCAAoC;;CAEpC,UAAU;CACV,qCAAqC;CACrC,qCAAqC;CACrC,qCAAqC;CACrC,qCAAqC;CACrC,qCAAqC;CACrC,oCAAoC;CACpC,oCAAoC;;CAEpC,WAAW;CACX,qCAAqC;CACrC,qCAAqC;CACrC,qCAAqC;CACrC,qCAAqC;CACrC,qCAAqC;CACrC,oCAAoC;CACpC,oCAAoC;;CAEpC,cAAc;CACd,sCAAsC;CACtC,uCAAuC;CACvC,uCAAuC;CACvC,4CAA4C;CAC5C,6CAA6C;CAC7C,6CAA6C;;CAE7C,WAAW;CACX,qCAAqC;CACrC,uCAAuC;CACvC,wCAAwC;CACxC,qCAAqC;CACrC,sCAAsC;CACtC,oCAAoC;CACpC,uCAAuC;CACvC,iCAAiC;CACjC,mCAAmC;CACnC,oCAAoC;CACpC,iCAAiC;CACjC,kCAAkC;CAClC,gCAAgC;CAChC,mCAAmC;CACnC,sCAAsC;CACtC,wCAAwC;CACxC,yCAAyC;CACzC,sCAAsC;CACtC,uCAAuC;CACvC,qCAAqC;CACrC,wCAAwC;CACxC,uCAAuC;CACvC,yCAAyC;CACzC,0CAA0C;CAC1C,uCAAuC;CACvC,wCAAwC;CACxC,sCAAsC;CACtC,yCAAyC;AAC1C","sourcesContent":["/* the theme/schemes pallet */\n:root {\n\t--atlas-color-wildberry: red;\n\t--atlas-color-white: white;\n\t--atlas-color-black: black;\n\t--atlas-color-grey-80: #677078;\n\t--atlas-color-on-bg-white: #ffffff;\n\n\t/* primary colors */\n\t/* blue */\n\t--atlas-color-primary-b500: #00607f;\n\t--atlas-color-primary-b400: #007fa8;\n\t--atlas-color-primary-b300: #009ed1;\n\t--atlas-color-primary-b200: #00bdf9;\n\t--atlas-color-primary-b100: #5ad7ff;\n\t--atlas-color-primary-b50: #9fe7ff;\n\t--atlas-color-primary-b25: #dff9ff;\n\n\t/* orange */\n\t--atlas-color-primary-o500: #fc5b08;\n\t--atlas-color-primary-o400: #fd7c3a;\n\t--atlas-color-primary-o300: #fd9e6d;\n\t--atlas-color-primary-o200: #febf9f;\n\t--atlas-color-primary-o100: #fee1d2;\n\t--atlas-color-primary-o50: #fff2eb;\n\t--atlas-color-primary-o25: #fffaf6;\n\n\t/* neutral */\n\t--atlas-color-primary-n500: #0a0d0f;\n\t--atlas-color-primary-n400: #34404b;\n\t--atlas-color-primary-n300: #677078;\n\t--atlas-color-primary-n200: #9aa0a5;\n\t--atlas-color-primary-n100: #cccfd2;\n\t--atlas-color-primary-n50: #ebeced;\n\t--atlas-color-primary-n25: #f7f7f7;\n\n\t/* secondary colors */\n\t/* purple */\n\t--atlas-color-secondary-p500: #7a53be;\n\t--atlas-color-secondary-p400: #9664d8;\n\t--atlas-color-secondary-p300: #b67ce2;\n\t--atlas-color-secondary-p200: #db93f0;\n\t--atlas-color-secondary-p100: #faaffb;\n\t--atlas-color-secondary-p50: #f7d6f7;\n\t--atlas-color-secondary-p25: #faf0fa;\n\n\t/* teal */\n\t--atlas-color-secondary-t500: #0e7d79;\n\t--atlas-color-secondary-t400: #19948f;\n\t--atlas-color-secondary-t300: #25afa9;\n\t--atlas-color-secondary-t200: #2fcbc5;\n\t--atlas-color-secondary-t100: #39e9e3;\n\t--atlas-color-secondary-t50: #51fdf7;\n\t--atlas-color-secondary-t25: #c3fefd;\n\n\t/* green */\n\t--atlas-color-secondary-g500: #2d7722;\n\t--atlas-color-secondary-g400: #26901a;\n\t--atlas-color-secondary-g300: #30ab0b;\n\t--atlas-color-secondary-g200: #72c21c;\n\t--atlas-color-secondary-g100: #a5d928;\n\t--atlas-color-secondary-g50: #d1ee32;\n\t--atlas-color-secondary-g25: #f0fe37;\n\n\t/* sienna */\n\t--atlas-color-secondary-s500: #be780d;\n\t--atlas-color-secondary-s400: #da890f;\n\t--atlas-color-secondary-s300: #f79b11;\n\t--atlas-color-secondary-s200: #ffb913;\n\t--atlas-color-secondary-s100: #ffd612;\n\t--atlas-color-secondary-s50: #ffed42;\n\t--atlas-color-secondary-s25: #fff7ab;\n\n\t/* semantics */\n\t--atlas-color-semantic-danger: #bf0002;\n\t--atlas-color-semantic-warning: #ffc700;\n\t--atlas-color-semantic-success: #047c25;\n\t--atlas-color-semantic-danger-light: #feebea;\n\t--atlas-color-semantic-warning-light: #fef8d3;\n\t--atlas-color-semantic-success-light: #e9fcf6;\n\n\t/* charts */\n\t--atlas-color-chart-darkblue: #2d5ea1;\n\t--atlas-color-chart-darkpurple: #5b4887;\n\t--atlas-color-chart-darkmagenta: #cb509e;\n\t--atlas-color-chart-darkteal: #2dafac;\n\t--atlas-color-chart-darkgreen: #009e71;\n\t--atlas-color-chart-darkred: #cb4e55;\n\t--atlas-color-chart-darkyellow: #fdd500;\n\t--atlas-color-chart-blue: #3487f7;\n\t--atlas-color-chart-purple: #9664d8;\n\t--atlas-color-chart-magenta: #ff64c6;\n\t--atlas-color-chart-teal: #39dbd8;\n\t--atlas-color-chart-green: #00c68d;\n\t--atlas-color-chart-red: #ff626b;\n\t--atlas-color-chart-yellow: #fde568;\n\t--atlas-color-chart-lightblue: #23c9ff;\n\t--atlas-color-chart-lightpurple: #db93f0;\n\t--atlas-color-chart-lightmagenta: #ffa4f6;\n\t--atlas-color-chart-lightteal: #52ebe7;\n\t--atlas-color-chart-lightgreen: #a1f0d7;\n\t--atlas-color-chart-lightred: #ffbbbe;\n\t--atlas-color-chart-lightyellow: #fff5c2;\n\t--atlas-color-chart-Xlightblue: #ecf4ff;\n\t--atlas-color-chart-Xlightpurple: #f4f1ff;\n\t--atlas-color-chart-Xlightmagenta: #fff3fb;\n\t--atlas-color-chart-Xlightteal: #e6faf9;\n\t--atlas-color-chart-Xlightgreen: #e6fdf6;\n\t--atlas-color-chart-Xlightred: #fff2f3;\n\t--atlas-color-chart-Xlightyellow: #fffae2;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tokens/shadow.css":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tokens/shadow.css ***!
  \************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n\t--atlas-shadow-offset: 0px 2px;\n\t--atlas-shadow-blur-hard: 2px;\n\t--atlas-shadow-blur-soft: 10px;\n\n\t/* 25 */\n\t--atlas-shadow-color-25: rgba(0, 0, 0, 0.05);\n\n\t--atlas-shadow-soft-25: var(--atlas-shadow-offset) var(--atlas-shadow-blur-soft)\n\t\tvar(--atlas-shadow-color-25);\n\n\t--atlas-shadow-hard-25: var(--atlas-shadow-offset) var(--atlas-shadow-blur-hard)\n\t\tvar(--atlas-shadow-color-25);\n\n\t--atlas-shadow-25: var(--atlas-shadow-hard-25), var(--atlas-shadow-soft-25);\n\n\t/* 50 */\n\t--atlas-shadow-color-50: rgba(0, 0, 0, 0.1);\n\n\t--atlas-shadow-soft-50: var(--atlas-shadow-offset) var(--atlas-shadow-blur-soft)\n\t\tvar(--atlas-shadow-color-50);\n\n\t--atlas-shadow-hard-50: var(--atlas-shadow-offset) var(--atlas-shadow-blur-hard)\n\t\tvar(--atlas-shadow-color-50);\n\n\t--atlas-shadow-50: var(--atlas-shadow-hard-50), var(--atlas-shadow-soft-50);\n\n\t/* 100 */\n\t--atlas-shadow-color-100: rgba(0, 0, 0, 0.2);\n\n\t--atlas-shadow-soft-100: var(--atlas-shadow-offset) var(--atlas-shadow-blur-soft)\n\t\tvar(--atlas-shadow-color-100);\n\n\t--atlas-shadow-hard-100: var(--atlas-shadow-offset) var(--atlas-shadow-blur-hard)\n\t\tvar(--atlas-shadow-color-100);\n\n\t--atlas-shadow-100: var(--atlas-shadow-hard-100), var(--atlas-shadow-soft-100);\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/tokens/shadow.css"],"names":[],"mappings":"AAAA;CACC,8BAA8B;CAC9B,6BAA6B;CAC7B,8BAA8B;;CAE9B,OAAO;CACP,4CAA4C;;CAE5C;8BAC6B;;CAE7B;8BAC6B;;CAE7B,2EAA2E;;CAE3E,OAAO;CACP,2CAA2C;;CAE3C;8BAC6B;;CAE7B;8BAC6B;;CAE7B,2EAA2E;;CAE3E,QAAQ;CACR,4CAA4C;;CAE5C;+BAC8B;;CAE9B;+BAC8B;;CAE9B,8EAA8E;AAC/E","sourcesContent":[":root {\n\t--atlas-shadow-offset: 0px 2px;\n\t--atlas-shadow-blur-hard: 2px;\n\t--atlas-shadow-blur-soft: 10px;\n\n\t/* 25 */\n\t--atlas-shadow-color-25: rgba(0, 0, 0, 0.05);\n\n\t--atlas-shadow-soft-25: var(--atlas-shadow-offset) var(--atlas-shadow-blur-soft)\n\t\tvar(--atlas-shadow-color-25);\n\n\t--atlas-shadow-hard-25: var(--atlas-shadow-offset) var(--atlas-shadow-blur-hard)\n\t\tvar(--atlas-shadow-color-25);\n\n\t--atlas-shadow-25: var(--atlas-shadow-hard-25), var(--atlas-shadow-soft-25);\n\n\t/* 50 */\n\t--atlas-shadow-color-50: rgba(0, 0, 0, 0.1);\n\n\t--atlas-shadow-soft-50: var(--atlas-shadow-offset) var(--atlas-shadow-blur-soft)\n\t\tvar(--atlas-shadow-color-50);\n\n\t--atlas-shadow-hard-50: var(--atlas-shadow-offset) var(--atlas-shadow-blur-hard)\n\t\tvar(--atlas-shadow-color-50);\n\n\t--atlas-shadow-50: var(--atlas-shadow-hard-50), var(--atlas-shadow-soft-50);\n\n\t/* 100 */\n\t--atlas-shadow-color-100: rgba(0, 0, 0, 0.2);\n\n\t--atlas-shadow-soft-100: var(--atlas-shadow-offset) var(--atlas-shadow-blur-soft)\n\t\tvar(--atlas-shadow-color-100);\n\n\t--atlas-shadow-hard-100: var(--atlas-shadow-offset) var(--atlas-shadow-blur-hard)\n\t\tvar(--atlas-shadow-color-100);\n\n\t--atlas-shadow-100: var(--atlas-shadow-hard-100), var(--atlas-shadow-soft-100);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tokens/type.css":
/*!**********************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tokens/type.css ***!
  \**********************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ":root {\n\t--font-family-proxima: \"ProximaNova\", Arial, Helvetica, sans-serif;\n\t--font-family-proxima-bold: \"ProximaNova-Bold\", Arial, Helvetica, sans-serif;\n\t--font-family-proxima-semibold: \"ProximaNova-Semibold\", Arial, Helvetica, sans-serif;\n\t--font-family-proxima-light: \"ProximaNova-Light\", Arial, Helvetica, sans-serif;\n\t--font-family-ibm-serif-bold: \"IBMPlexSerif-Bold\", \"Georgia\", Times, serif;\n\n\t/* atlas-type-headline-Xlarge-bold-uppercase */\n\t--atlas-type-headline-Xlarge-bold-uppercase-font-size: 3em;\n\t/* --atlas-type-headline-Xlarge-bold-uppercase-line-height: 56px; */\n\t/* --atlas-type-headline-Xlarge-bold-uppercase-font-weight: 700; */\n\t--atlas-type-headline-Xlarge-bold-uppercase-font-family: var(--font-family-proxima-bold);\n\t--atlas-type-headline-Xlarge-bold-uppercase-text-transform: uppercase;\n\n\t/* atlas-type-headline-large-bold */\n\t--atlas-type-headline-large-bold-font-size: 2.6em;\n\t/* --atlas-type-headline-large-bold-line-height: 48px; */\n\t/* --atlas-type-headline-large-bold-font-weight: 700; */\n\t--atlas-type-headline-large-bold-font-family: var(--font-family-proxima-bold);\n\n\t/* atlas-type-headline-medium-bold */\n\t--atlas-type-headline-medium-bold-font-size: 2em;\n\t/* --atlas-type-headline-medium-bold-line-height: 38px; */\n\t/* --atlas-type-headline-medium-bold-font-weight: 700; */\n\t--atlas-type-headline-medium-bold-font-family: var(--font-family-proxima-bold);\n\n\t/* atlas-type-headline-small-semibold */\n\t--atlas-type-headline-small-semibold-font-size: 1.5em;\n\t/* --atlas-type-headline-small-semibold-line-height: 30px; */\n\t/* --atlas-type-headline-small-semibold-font-weight: 700; */\n\t--atlas-type-headline-small-semibold-font-family: var(--font-family-proxima-bold);\n\n\t/* atlas-type-title-large-semibold */\n\t--atlas-type-title-large-semibold-font-size: 1.5em;\n\t/* --atlas-type-title-large-semibold-line-height: 30px; */\n\t/* --atlas-type-title-large-semibold-font-weight: 600; */\n\t--atlas-type-title-large-semibold-font-family: var(--font-family-proxima-semibold);\n\n\t/* atlas-type-title-large-light */\n\t--atlas-type-title-large-light-font-size: 1.5em;\n\t/* --atlas-type-title-large-light-line-height: 30px; */\n\t/* --atlas-type-title-large-light-font-weight: 300; */\n\t--atlas-type-title-large-light-font-family: var(--font-family-proxima-light);\n\n\t/* atlas-type-title-medium-semibold */\n\t--atlas-type-title-medium-semibold-font-size: 1.125em;\n\t/* --atlas-type-title-medium-semibold-line-height: 24px;\n\t--atlas-type-title-medium-semibold-font-weight: 600; */\n\t--atlas-type-title-medium-semiboldfont-family: var(--font-family-proxima-semibold);\n\n\t/* atlas-type-title-small-semibold */\n\t/* --atlas-type-title-small-semibold-line-height: 22px;\n\t--atlas-type-title-small-semibold-font-weight: 600; */\n\t--atlas-type-title-small-semibold-font-family: var(--font-family-proxima-semibold);\n\n\t/* atlas-type-title-medium-semibold-uppercase */\n\t--atlas-type-title-medium-semibold-uppercase-font-size: 1.12em;\n\t/* --atlas-type-title-medium-semibold-uppercase-line-height: 36px; */\n\t/* --atlas-type-title-medium-semibold-uppercase-font-weight: 600; */\n\t--atlas-type-title-medium-semibold-uppercase-font-family: var(--font-family-proxima-semibold);\n\t--atlas-type-title-medium-semibold-uppercase-text-transform: uppercase;\n\n\t/* atlas-type-title-small-semibold-uppercase */\n\t/* --atlas-type-title-small-semibold-uppercase-line-height: 36px; */\n\t/* --atlas-type-title-small-semibold-uppercase-font-weight: 600; */\n\t--atlas-type-title-small-semibold-uppercase-font-family: var(--font-family-proxima-semibold);\n\t--atlas-type-title-small-semibold-uppercase-text-transform: uppercase;\n\n\t/* atlas-type-title-Xsmall-semibold */\n\t--atlas-type-title-Xsmall-semibold-font-size: 0.875em;\n\t/* --atlas-type-title-Xsmall-semibold-line-height: 16px; */\n\t--atlas-type-title-Xsmall-semibold-font-weight: 600;\n\t--atlas-type-title-Xsmall-semibold-font-family: var(--font-family-proxima-semibold);\n\n\t/* atlas-type-body-large-bold */\n\t/* --atlas-type-body-large-bold-line-height: 22px; */\n\t/* --atlas-type-body-large-bold-font-weight: 600; */\n\t--atlas-type-body-large-bold-font-family: var(--font-family-proxima-bold);\n\n\t/* atlas-type-body-Xlarge-regular */\n\t--atlas-type-body-Xlarge-regular-font-size: 1.5em;\n\t/* --atlas-type-body-Xlarge-regular-line-height: 30px; */\n\t/* --atlas-type-body-Xlarge-regular-font-weight: 400; */\n\t--atlas-type-body-Xlarge-regular-font-family: var(--font-family-proxima);\n\n\t/* atlas-type-body-large-regular */\n\t/* --atlas-type-body-large-regular-line-height: 22px; */\n\t/* --atlas-type-body-large-regular-font-weight: 400; */\n\t--atlas-type-body-large-regular-font-family: var(--font-family-proxima);\n\n\t/* atlas-type-body-medium-regular */\n\t--atlas-type-body-medium-regular-font-size: 0.875em;\n\t/* --atlas-type-body-medium-regular-line-height: 20px; */\n\t--atlas-type-body-medium-regular-font-weight: 400;\n\t--atlas-type-body-medium-regular-font-family: var(--font-family-proxima);\n\n\t/* atlas-type-body-small-regular */\n\t--atlas-type-body-small-regular-font-size: 0.75em;\n\t/* --atlas-type-body-small-regular-line-height: 16px; */\n\t/* --atlas-type-body-small-regular-font-weight: 400; */\n\t--atlas-type-body-small-regular-font-family: var(--font-family-proxima);\n\n\t/* atlas-type-display-large-bold */\n\t--atlas-type-display-large-bold-font-size: 3em;\n\t/* --atlas-type-display-large-bold-line-height: 56px; */\n\t/* --atlas-type-display-large-bold-font-weight: 700; */\n\t--atlas-type-display-large-bold-font-family: var(--font-family-ibm-serif-bold);\n\n\t/* atlas-type-display-medium-bold */\n\t--atlas-type-display-medium-bold-font-size: 2em;\n\t/* --atlas-type-display-medium-bold-line-height: 38px; */\n\t/* --atlas-type-display-medium-bold-font-weight: 700; */\n\t--atlas-type-display-medium-bold-font-family: var(--font-family-ibm-serif-bold);\n\n\t/* atlas-type-display-small-bold */\n\t--atlas-type-display-small-bold-font-size: 1.125em;\n\t/* --atlas-type-display-small-bold-line-height: 24px; */\n\t/* --atlas-type-display-small-bold-font-weight: 700; */\n\t--atlas-type-display-small-bold-font-family: var(--font-family-ibm-serif-bold);\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/tokens/type.css"],"names":[],"mappings":"AAAA;CACC,kEAAkE;CAClE,4EAA4E;CAC5E,oFAAoF;CACpF,8EAA8E;CAC9E,0EAA0E;;CAE1E,8CAA8C;CAC9C,0DAA0D;CAC1D,mEAAmE;CACnE,kEAAkE;CAClE,wFAAwF;CACxF,qEAAqE;;CAErE,mCAAmC;CACnC,iDAAiD;CACjD,wDAAwD;CACxD,uDAAuD;CACvD,6EAA6E;;CAE7E,oCAAoC;CACpC,gDAAgD;CAChD,yDAAyD;CACzD,wDAAwD;CACxD,8EAA8E;;CAE9E,uCAAuC;CACvC,qDAAqD;CACrD,4DAA4D;CAC5D,2DAA2D;CAC3D,iFAAiF;;CAEjF,oCAAoC;CACpC,kDAAkD;CAClD,yDAAyD;CACzD,wDAAwD;CACxD,kFAAkF;;CAElF,iCAAiC;CACjC,+CAA+C;CAC/C,sDAAsD;CACtD,qDAAqD;CACrD,4EAA4E;;CAE5E,qCAAqC;CACrC,qDAAqD;CACrD;uDACsD;CACtD,kFAAkF;;CAElF,oCAAoC;CACpC;sDACqD;CACrD,kFAAkF;;CAElF,+CAA+C;CAC/C,8DAA8D;CAC9D,oEAAoE;CACpE,mEAAmE;CACnE,6FAA6F;CAC7F,sEAAsE;;CAEtE,8CAA8C;CAC9C,mEAAmE;CACnE,kEAAkE;CAClE,4FAA4F;CAC5F,qEAAqE;;CAErE,qCAAqC;CACrC,qDAAqD;CACrD,0DAA0D;CAC1D,mDAAmD;CACnD,mFAAmF;;CAEnF,+BAA+B;CAC/B,oDAAoD;CACpD,mDAAmD;CACnD,yEAAyE;;CAEzE,mCAAmC;CACnC,iDAAiD;CACjD,wDAAwD;CACxD,uDAAuD;CACvD,wEAAwE;;CAExE,kCAAkC;CAClC,uDAAuD;CACvD,sDAAsD;CACtD,uEAAuE;;CAEvE,mCAAmC;CACnC,mDAAmD;CACnD,wDAAwD;CACxD,iDAAiD;CACjD,wEAAwE;;CAExE,kCAAkC;CAClC,iDAAiD;CACjD,uDAAuD;CACvD,sDAAsD;CACtD,uEAAuE;;CAEvE,kCAAkC;CAClC,8CAA8C;CAC9C,uDAAuD;CACvD,sDAAsD;CACtD,8EAA8E;;CAE9E,mCAAmC;CACnC,+CAA+C;CAC/C,wDAAwD;CACxD,uDAAuD;CACvD,+EAA+E;;CAE/E,kCAAkC;CAClC,kDAAkD;CAClD,uDAAuD;CACvD,sDAAsD;CACtD,8EAA8E;AAC/E","sourcesContent":[":root {\n\t--font-family-proxima: \"ProximaNova\", Arial, Helvetica, sans-serif;\n\t--font-family-proxima-bold: \"ProximaNova-Bold\", Arial, Helvetica, sans-serif;\n\t--font-family-proxima-semibold: \"ProximaNova-Semibold\", Arial, Helvetica, sans-serif;\n\t--font-family-proxima-light: \"ProximaNova-Light\", Arial, Helvetica, sans-serif;\n\t--font-family-ibm-serif-bold: \"IBMPlexSerif-Bold\", \"Georgia\", Times, serif;\n\n\t/* atlas-type-headline-Xlarge-bold-uppercase */\n\t--atlas-type-headline-Xlarge-bold-uppercase-font-size: 3em;\n\t/* --atlas-type-headline-Xlarge-bold-uppercase-line-height: 56px; */\n\t/* --atlas-type-headline-Xlarge-bold-uppercase-font-weight: 700; */\n\t--atlas-type-headline-Xlarge-bold-uppercase-font-family: var(--font-family-proxima-bold);\n\t--atlas-type-headline-Xlarge-bold-uppercase-text-transform: uppercase;\n\n\t/* atlas-type-headline-large-bold */\n\t--atlas-type-headline-large-bold-font-size: 2.6em;\n\t/* --atlas-type-headline-large-bold-line-height: 48px; */\n\t/* --atlas-type-headline-large-bold-font-weight: 700; */\n\t--atlas-type-headline-large-bold-font-family: var(--font-family-proxima-bold);\n\n\t/* atlas-type-headline-medium-bold */\n\t--atlas-type-headline-medium-bold-font-size: 2em;\n\t/* --atlas-type-headline-medium-bold-line-height: 38px; */\n\t/* --atlas-type-headline-medium-bold-font-weight: 700; */\n\t--atlas-type-headline-medium-bold-font-family: var(--font-family-proxima-bold);\n\n\t/* atlas-type-headline-small-semibold */\n\t--atlas-type-headline-small-semibold-font-size: 1.5em;\n\t/* --atlas-type-headline-small-semibold-line-height: 30px; */\n\t/* --atlas-type-headline-small-semibold-font-weight: 700; */\n\t--atlas-type-headline-small-semibold-font-family: var(--font-family-proxima-bold);\n\n\t/* atlas-type-title-large-semibold */\n\t--atlas-type-title-large-semibold-font-size: 1.5em;\n\t/* --atlas-type-title-large-semibold-line-height: 30px; */\n\t/* --atlas-type-title-large-semibold-font-weight: 600; */\n\t--atlas-type-title-large-semibold-font-family: var(--font-family-proxima-semibold);\n\n\t/* atlas-type-title-large-light */\n\t--atlas-type-title-large-light-font-size: 1.5em;\n\t/* --atlas-type-title-large-light-line-height: 30px; */\n\t/* --atlas-type-title-large-light-font-weight: 300; */\n\t--atlas-type-title-large-light-font-family: var(--font-family-proxima-light);\n\n\t/* atlas-type-title-medium-semibold */\n\t--atlas-type-title-medium-semibold-font-size: 1.125em;\n\t/* --atlas-type-title-medium-semibold-line-height: 24px;\n\t--atlas-type-title-medium-semibold-font-weight: 600; */\n\t--atlas-type-title-medium-semiboldfont-family: var(--font-family-proxima-semibold);\n\n\t/* atlas-type-title-small-semibold */\n\t/* --atlas-type-title-small-semibold-line-height: 22px;\n\t--atlas-type-title-small-semibold-font-weight: 600; */\n\t--atlas-type-title-small-semibold-font-family: var(--font-family-proxima-semibold);\n\n\t/* atlas-type-title-medium-semibold-uppercase */\n\t--atlas-type-title-medium-semibold-uppercase-font-size: 1.12em;\n\t/* --atlas-type-title-medium-semibold-uppercase-line-height: 36px; */\n\t/* --atlas-type-title-medium-semibold-uppercase-font-weight: 600; */\n\t--atlas-type-title-medium-semibold-uppercase-font-family: var(--font-family-proxima-semibold);\n\t--atlas-type-title-medium-semibold-uppercase-text-transform: uppercase;\n\n\t/* atlas-type-title-small-semibold-uppercase */\n\t/* --atlas-type-title-small-semibold-uppercase-line-height: 36px; */\n\t/* --atlas-type-title-small-semibold-uppercase-font-weight: 600; */\n\t--atlas-type-title-small-semibold-uppercase-font-family: var(--font-family-proxima-semibold);\n\t--atlas-type-title-small-semibold-uppercase-text-transform: uppercase;\n\n\t/* atlas-type-title-Xsmall-semibold */\n\t--atlas-type-title-Xsmall-semibold-font-size: 0.875em;\n\t/* --atlas-type-title-Xsmall-semibold-line-height: 16px; */\n\t--atlas-type-title-Xsmall-semibold-font-weight: 600;\n\t--atlas-type-title-Xsmall-semibold-font-family: var(--font-family-proxima-semibold);\n\n\t/* atlas-type-body-large-bold */\n\t/* --atlas-type-body-large-bold-line-height: 22px; */\n\t/* --atlas-type-body-large-bold-font-weight: 600; */\n\t--atlas-type-body-large-bold-font-family: var(--font-family-proxima-bold);\n\n\t/* atlas-type-body-Xlarge-regular */\n\t--atlas-type-body-Xlarge-regular-font-size: 1.5em;\n\t/* --atlas-type-body-Xlarge-regular-line-height: 30px; */\n\t/* --atlas-type-body-Xlarge-regular-font-weight: 400; */\n\t--atlas-type-body-Xlarge-regular-font-family: var(--font-family-proxima);\n\n\t/* atlas-type-body-large-regular */\n\t/* --atlas-type-body-large-regular-line-height: 22px; */\n\t/* --atlas-type-body-large-regular-font-weight: 400; */\n\t--atlas-type-body-large-regular-font-family: var(--font-family-proxima);\n\n\t/* atlas-type-body-medium-regular */\n\t--atlas-type-body-medium-regular-font-size: 0.875em;\n\t/* --atlas-type-body-medium-regular-line-height: 20px; */\n\t--atlas-type-body-medium-regular-font-weight: 400;\n\t--atlas-type-body-medium-regular-font-family: var(--font-family-proxima);\n\n\t/* atlas-type-body-small-regular */\n\t--atlas-type-body-small-regular-font-size: 0.75em;\n\t/* --atlas-type-body-small-regular-line-height: 16px; */\n\t/* --atlas-type-body-small-regular-font-weight: 400; */\n\t--atlas-type-body-small-regular-font-family: var(--font-family-proxima);\n\n\t/* atlas-type-display-large-bold */\n\t--atlas-type-display-large-bold-font-size: 3em;\n\t/* --atlas-type-display-large-bold-line-height: 56px; */\n\t/* --atlas-type-display-large-bold-font-weight: 700; */\n\t--atlas-type-display-large-bold-font-family: var(--font-family-ibm-serif-bold);\n\n\t/* atlas-type-display-medium-bold */\n\t--atlas-type-display-medium-bold-font-size: 2em;\n\t/* --atlas-type-display-medium-bold-line-height: 38px; */\n\t/* --atlas-type-display-medium-bold-font-weight: 700; */\n\t--atlas-type-display-medium-bold-font-family: var(--font-family-ibm-serif-bold);\n\n\t/* atlas-type-display-small-bold */\n\t--atlas-type-display-small-bold-font-size: 1.125em;\n\t/* --atlas-type-display-small-bold-line-height: 24px; */\n\t/* --atlas-type-display-small-bold-font-weight: 700; */\n\t--atlas-type-display-small-bold-font-family: var(--font-family-ibm-serif-bold);\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/workflow-step.css":
/*!************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/workflow-step.css ***!
  \************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-workflow-step {\n\t\t--step-gap: 2em;\n\n\t\t--step-title-font-size: 3em;\n\t\t--step-sub-title-font-size: 1em;\n\t\t--step-sub-title-max-width: 40ch;\n\t\t--step-title-font-weight: 700;\n\n\t\t--step-hero-title-font-color: var(--atlas-color-primary-b400);\n\t\t--step-hero-sub-title-font-size: 1.5em;\n\t\t--step-here-sub-title-font-weight: 400;\n\n\t\t--step-general-margin-inline: 1em;\n\t}\n\n\tatlas-workflow-step {\n\t\tmin-height: 100%;\n\t\twidth: 100%;\n\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\tgap: var(--step-gap);\n\n\t\tpadding-block-start: var(--step-gap);\n\t}\n\n\tatlas-workflow-step:where(:not([active]), [active=\"false\"]) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-workflow-step::part(title) {\n\t\tdisplay: block;\n\n\t\tfont-size: var(--step-title-font-size);\n\t\tfont-weight: var(--step-title-font-weight);\n\n\t\tmargin-inline: var(--step-general-margin-inline);\n\t}\n\n\tatlas-workflow-step::part(subTitle) {\n\t\tfont-size: var(--step-sub-title-font-size);\n\t\tmargin-inline: var(--step-general-margin-inline);\n\t}\n\n\tatlas-workflow-step[hide-stepper]:not([hide-stepper=\"false\"])::part(stepper) {\n\t\tdisplay: none;\n\t\tjustify-content: center;\n\t}\n\n\tatlas-workflow-step[hero]:not([hero=\"false\"]) {\n\t\tbackground-image: var(--epic-hero-url, unset);\n\t\tbackground-size: cover;\n\t}\n\n\tatlas-workflow-step[hero]:not([hero=\"false\"])::part(title) {\n\t\tcolor: var(--step-hero-title-font-color);\n\t}\n\n\tatlas-workflow-step[hero]:not([hero=\"false\"])::part(subTitle) {\n\t\tfont-size: var(--step-hero-sub-title-font-size);\n\t\tfont-weight: var(--step-hero-sub-title-font-weight);\n\t\ttext-align: center;\n\n\t\tmax-width: var(--step-sub-title-max-width);\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/workflow-step.css"],"names":[],"mappings":"AAAA;CACC;EACC,eAAe;;EAEf,2BAA2B;EAC3B,+BAA+B;EAC/B,gCAAgC;EAChC,6BAA6B;;EAE7B,6DAA6D;EAC7D,sCAAsC;EACtC,sCAAsC;;EAEtC,iCAAiC;CAClC;;CAEA;EACC,gBAAgB;EAChB,WAAW;;EAEX,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,oBAAoB;;EAEpB,oCAAoC;CACrC;;CAEA;EACC,aAAa;CACd;;CAEA;EACC,cAAc;;EAEd,sCAAsC;EACtC,0CAA0C;;EAE1C,gDAAgD;CACjD;;CAEA;EACC,0CAA0C;EAC1C,gDAAgD;CACjD;;CAEA;EACC,aAAa;EACb,uBAAuB;CACxB;;CAEA;EACC,6CAA6C;EAC7C,sBAAsB;CACvB;;CAEA;EACC,wCAAwC;CACzC;;CAEA;EACC,+CAA+C;EAC/C,mDAAmD;EACnD,kBAAkB;;EAElB,0CAA0C;CAC3C;AACD","sourcesContent":["@layer atlas {\n\tatlas-workflow-step {\n\t\t--step-gap: 2em;\n\n\t\t--step-title-font-size: 3em;\n\t\t--step-sub-title-font-size: 1em;\n\t\t--step-sub-title-max-width: 40ch;\n\t\t--step-title-font-weight: 700;\n\n\t\t--step-hero-title-font-color: var(--atlas-color-primary-b400);\n\t\t--step-hero-sub-title-font-size: 1.5em;\n\t\t--step-here-sub-title-font-weight: 400;\n\n\t\t--step-general-margin-inline: 1em;\n\t}\n\n\tatlas-workflow-step {\n\t\tmin-height: 100%;\n\t\twidth: 100%;\n\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\tgap: var(--step-gap);\n\n\t\tpadding-block-start: var(--step-gap);\n\t}\n\n\tatlas-workflow-step:where(:not([active]), [active=\"false\"]) {\n\t\tdisplay: none;\n\t}\n\n\tatlas-workflow-step::part(title) {\n\t\tdisplay: block;\n\n\t\tfont-size: var(--step-title-font-size);\n\t\tfont-weight: var(--step-title-font-weight);\n\n\t\tmargin-inline: var(--step-general-margin-inline);\n\t}\n\n\tatlas-workflow-step::part(subTitle) {\n\t\tfont-size: var(--step-sub-title-font-size);\n\t\tmargin-inline: var(--step-general-margin-inline);\n\t}\n\n\tatlas-workflow-step[hide-stepper]:not([hide-stepper=\"false\"])::part(stepper) {\n\t\tdisplay: none;\n\t\tjustify-content: center;\n\t}\n\n\tatlas-workflow-step[hero]:not([hero=\"false\"]) {\n\t\tbackground-image: var(--epic-hero-url, unset);\n\t\tbackground-size: cover;\n\t}\n\n\tatlas-workflow-step[hero]:not([hero=\"false\"])::part(title) {\n\t\tcolor: var(--step-hero-title-font-color);\n\t}\n\n\tatlas-workflow-step[hero]:not([hero=\"false\"])::part(subTitle) {\n\t\tfont-size: var(--step-hero-sub-title-font-size);\n\t\tfont-weight: var(--step-hero-sub-title-font-weight);\n\t\ttext-align: center;\n\n\t\tmax-width: var(--step-sub-title-max-width);\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/workflow.css":
/*!*******************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/workflow.css ***!
  \*******************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "@layer atlas {\n\tatlas-workflow {\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t}\n}\n", "",{"version":3,"sources":["webpack://./node_modules/@cision/atlas-styles/dist/css/workflow.css"],"names":[],"mappings":"AAAA;CACC;EACC,cAAc;EACd,WAAW;CACZ;AACD","sourcesContent":["@layer atlas {\n\tatlas-workflow {\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t}\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {

"use strict";


module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/accordion.html":
/*!********************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/accordion.html ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot part=\"header\" name=\"header\"></slot>\n\t<slot part=\"body\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/alert.html":
/*!****************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/alert.html ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<dialog part=\"dialog\">\n\t\t<slot name=\"icon\" part=\"icon\"></slot>\n\t\t<slot name=\"header\" part=\"header\"></slot>\n\t\t<slot part=\"body\"></slot>\n\t\t<slot name=\"footer\" part=\"footer\"></slot>\n\t</dialog>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/application-frame.html":
/*!****************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/application-frame.html ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot name=\"contextual-controls\" part=\"contextual-controls\"></slot>\n\t<slot name=\"main-nav\" part=\"main-nav\"></slot>\n\t<slot name=\"app-logo\" part=\"app-logo\"></slot>\n\t<slot name=\"profile-controls\" part=\"profile-controls\"></slot>\n\t<slot name=\"content-area\" part=\"content-area\"></slot>\n\t<slot name=\"feed\" part=\"feed\"></slot>\n\t<slot name=\"search\" part=\"search\"></slot>\n\t<slot name=\"backdrop\" part=\"backdrop\"></slot>\n\t<slot name=\"feedToggleControl\" part=\"feed-toggle-control\"></slot>\n\t<slot name=\"extendedControl\" part=\"extended-control\"></slot>\n\t<slot name=\"snackbar-container\" part=\"snackbar-container\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/avatar.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/avatar.html ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<img id=\"image\" part=\"image\" />\n\t<div id=\"initials\" part=\"initials\"></div>\n\t<slot id=\"fallback\" part=\"fallback\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/button-set.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/button-set.html ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot part=\"primary\"></slot>\n\t<slot name=\"extended\" part=\"extended\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/button.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/button.html ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<button part=\"button\" type=\"button\">\n\t\t<slot name=\"prefix\" part=\"prefix\"></slot>\n\t\t<slot part=\"label\"></slot>\n\t\t<slot name=\"suffix\" part=\"suffix\"></slot>\n\t</button>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/chip-group.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/chip-group.html ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot part=\"defaultGroup\"></slot>\n\t<slot name=\"suffix\" part=\"suffix\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/chip.html":
/*!***************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/chip.html ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot name=\"prefix\" part=\"prefix\"></slot>\n\t<slot part=\"body\"></slot>\n\t<slot name=\"dismisser\" part=\"dismisser\"></slot>\n\t<slot name=\"suffix\" part=\"suffix\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/dialog.html":
/*!*****************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/dialog.html ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<dialog part=\"dialog\">\n\t\t<div part=\"container\">\n\t\t\t<slot name=\"dismissible\" part=\"dismissible\"></slot>\n\t\t\t<slot name=\"title\" part=\"title\"></slot>\n\t\t\t<slot name=\"subtext\" part=\"subtext\"></slot>\n\t\t\t<slot part=\"body\"></slot>\n\t\t\t<slot name=\"footer\" part=\"footer\"></slot>\n\t\t</div>\n\t</dialog>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/feed.html":
/*!***************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/feed.html ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot name=\"prefix\" part=\"prefix\"></slot>\n\t<slot name=\"filter\" part=\"filter\"></slot>\n\t<slot name=\"body\" part=\"body\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/input-checkbox.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/input-checkbox.html ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<input id=\"Input\" type=\"checkbox\" part=\"input\" />\n\n\t<label for=\"Input\" part=\"label-wrapper\">\n\t\t<slot name=\"label\" part=\"label\"></slot>\n\t\t<slot name=\"required\" part=\"required\">*</slot>\n\t</label>\n\n\t<slot name=\"helperText\" part=\"helper-text\"></slot>\n\t<slot name=\"validationText\" part=\"validation-text\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/input-chip-group.html":
/*!***************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/input-chip-group.html ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot name=\"label\" part=\"label\"></slot>\n\t<slot name=\"chips-label\" part=\"chips-label\"></slot>\n\t<div part=\"chips-scroll-view\">\n\t\t<slot part=\"chips\"></slot>\n\t</div>\n\t<slot name=\"controls\" part=\"controls\"></slot>\n\t<slot name=\"input\" part=\"input\"></slot>\n\t<div part=\"suggestion-scroll-view\">\n\t\t<slot name=\"suggestion\" part=\"suggestion\"></slot>\n\t</div>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/input-dropdown.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/input-dropdown.html ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot name=\"input\" part=\"input\"></slot>\n\t<slot name=\"menu\" part=\"menu\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/input-search.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/input-search.html ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<input id=\"Input\" type=\"text\" part=\"input\" />\n\n\t<label for=\"Input\" part=\"label\"><slot name=\"label\"></slot></label>\n\n\t<slot name=\"prefix\" part=\"prefix\"></slot>\n\t<slot name=\"suffix\" part=\"suffix\"></slot>\n\n\t<slot name=\"menu\" part=\"menu\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/input-text.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/input-text.html ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<input id=\"Input\" type=\"text\" part=\"input\" />\n\n\t<label for=\"Input\" part=\"label-wrapper\">\n\t\t<slot name=\"label\" part=\"label\"></slot>\n\t\t<slot name=\"required\" part=\"required\">*</slot>\n\t</label>\n\n\t<slot name=\"prefix\" part=\"prefix\"></slot>\n\t<slot name=\"suffix\" part=\"suffix\"></slot>\n\n\t<slot name=\"helperText\" part=\"helper-text\"></slot>\n\t<slot name=\"validationText\" part=\"validation-text\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/input-textarea.html":
/*!*************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/input-textarea.html ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<textarea id=\"Input\" part=\"input\"></textarea>\n\n\t<label for=\"Input\" part=\"label-wrapper\">\n\t\t<slot name=\"label\" part=\"label\"></slot>\n\t\t<slot name=\"required\" part=\"required\">*</slot>\n\t</label>\n\n\t<slot name=\"helperText\" part=\"helper-text\"></slot>\n\t<slot name=\"validationText\" part=\"validation-text\"></slot>\n\n\t<slot part=\"content\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/logo.html":
/*!***************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/logo.html ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot name=\"graphic\" part=\"graphic\">\n\t\t<svg width=\"19\" height=\"41\" viewBox=\"0 0 19 41\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t<path\n\t\t\t\td=\"M15.4639 2.73437C14.6564 1.90147 13.7031 1.22731 12.6522 0.746143C11.5621 0.24553 10.3771 -0.0090036 9.17976 0.000243205C8.09065 0.00549267 7.00688 0.154497 5.95595 0.443478C4.87682 0.73155 3.87115 1.2497 3.00647 1.96314C2.12958 2.68076 1.4097 3.62843 0.846823 4.80617C0.283945 5.98391 0.00167026 7.47529 0 9.2803V30.7202C0 32.5248 0.282274 34.0162 0.846823 35.1943C1.41137 36.3725 2.13125 37.3208 3.00647 38.0393C3.8715 38.7529 4.87762 39.271 5.9572 39.5589C7.00814 39.8479 8.09191 39.9969 9.18101 40.0021C10.3781 40.0106 11.5626 39.7554 12.6522 39.2543C13.7039 38.7732 14.6581 38.0991 15.4664 37.2661C16.2717 36.4297 16.911 35.445 17.3498 34.3655C17.8055 33.2624 18.038 32.0783 18.0338 30.8829V26.9926L12.3967 26.3594V28.0842C12.3967 29.2404 12.4136 31.8751 11.7628 32.9142C11.6061 33.1661 11.4165 33.3955 11.1991 33.5961C10.8833 33.8529 10.5219 34.0463 10.1343 34.166C9.84895 34.2563 9.55507 34.3163 9.25743 34.3452C9.17412 34.3515 9.08957 34.356 9.00125 34.3579H8.96179C7.68655 34.3579 6.80319 33.9712 6.31171 33.1979C5.82024 32.4245 5.5745 31.4697 5.5745 30.3333V9.66655C5.5745 8.52681 5.82045 7.56942 6.31234 6.79439C6.80423 6.01937 7.68717 5.63312 8.96117 5.63565C8.97432 5.63565 8.98747 5.63565 9.00063 5.63565C9.08894 5.63565 9.1735 5.64198 9.2568 5.64832C9.55443 5.67696 9.8483 5.73681 10.1337 5.82688C10.5214 5.94807 10.8828 6.14276 11.1985 6.40055C11.4157 6.60115 11.6053 6.8303 11.7622 7.08186C12.413 8.12156 12.3961 10.7544 12.3961 11.9125V13.6373L18.0225 12.9262L18.0307 9.11378C18.0352 7.92013 17.8037 6.73761 17.3498 5.63565C16.9104 4.55625 16.2707 3.57186 15.4652 2.73563\"\n\t\t\t\tfill=\"#19948F\"\n\t\t\t/>\n\t\t</svg>\n\t</slot>\n\n\t<slot name=\"graphic-fullsize\" part=\"graphic-fullsize\">\n\t\t<svg\n\t\t\twidth=\"153\"\n\t\t\theight=\"45\"\n\t\t\tviewBox=\"0 0 153 45\"\n\t\t\tfill=\"none\"\n\t\t\txmlns=\"http://www.w3.org/2000/svg\"\n\t\t\txmlns:xlink=\"http://www.w3.org/1999/xlink\"\n\t\t>\n\t\t\t<rect width=\"153\" height=\"45\" fill=\"url(#pattern0)\" />\n\t\t\t<defs>\n\t\t\t\t<pattern id=\"pattern0\" patternContentUnits=\"objectBoundingBox\" width=\"1\" height=\"1\">\n\t\t\t\t\t<use\n\t\t\t\t\t\txlink:href=\"#image0_8150_20465\"\n\t\t\t\t\t\ttransform=\"translate(0 -0.00291667) scale(0.000833333 0.00283333)\"\n\t\t\t\t\t/>\n\t\t\t\t</pattern>\n\t\t\t\t<image\n\t\t\t\t\tid=\"image0_8150_20465\"\n\t\t\t\t\twidth=\"1200\"\n\t\t\t\t\theight=\"355\"\n\t\t\t\t\txlink:href=\"data:image/png;base64,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\"\n\t\t\t\t/>\n\t\t\t</defs>\n\t\t</svg>\n\t</slot>\n\n\t<svg\n\t\tpart=\"beta\"\n\t\twidth=\"48\"\n\t\theight=\"23\"\n\t\tviewBox=\"0 0 48 23\"\n\t\tfill=\"none\"\n\t\txmlns=\"http://www.w3.org/2000/svg\"\n\t>\n\t\t<rect width=\"48\" height=\"23\" rx=\"8\" fill=\"#007FA8\" />\n\t\t<path\n\t\t\td=\"M14.4351 15.5C15.9351 15.5 16.7631 14.576 16.7631 13.34C16.7631 12.356 16.0671 11.504 15.2151 11.372C15.9591 11.216 16.6071 10.544 16.6071 9.536C16.6071 8.408 15.7911 7.496 14.3271 7.496H10.3911V15.5H14.4351ZM11.7951 8.732H14.0391C14.7591 8.732 15.1671 9.176 15.1671 9.776C15.1671 10.376 14.7591 10.808 14.0391 10.808H11.7951V8.732ZM11.7951 12.044H14.0991C14.9031 12.044 15.3231 12.548 15.3231 13.148C15.3231 13.844 14.8671 14.264 14.0991 14.264H11.7951V12.044ZM23.6563 15.5V14.264H19.5763V12.044H23.5723V10.808H19.5763V8.732H23.6563V7.496H18.1723V15.5H23.6563ZM28.4101 15.5V8.732H30.8341V7.496H24.5821V8.732H27.0061V15.5H28.4101ZM38.4387 15.5L35.2947 7.496H33.5427L30.3987 15.5H31.9347L32.5227 13.964H36.3147L36.9027 15.5H38.4387ZM35.9187 12.728H32.9187L34.4187 8.684L35.9187 12.728Z\"\n\t\t\tfill=\"white\"\n\t\t/>\n\t</svg>\n\n\t<slot name=\"text\" part=\"text\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/main-nav-item.html":
/*!************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/main-nav-item.html ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/main-nav.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/main-nav.html ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/page.html":
/*!***************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/page.html ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot name=\"title\" part=\"title\"></slot>\n\t<div part=\"page-container\">\n\t\t<slot name=\"prefix\" part=\"prefix\"></slot>\n\t\t<slot part=\"content\"></slot>\n\t</div>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/profile-control.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/profile-control.html ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot name=\"image\" part=\"image\"></slot>\n\t<slot name=\"icon\" part=\"icon\"></slot>\n\t<slot name=\"name\" part=\"name\"></slot>\n\t<slot name=\"menu\" part=\"menu\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/snackbar.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/snackbar.html ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot name=\"prefix\" part=\"prefix\"></slot>\n\t<slot name=\"title\" part=\"title\"></slot>\n\t<slot name=\"sub-title\" part=\"sub-title\"></slot>\n\t<slot name=\"suffix\" part=\"suffix\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/stepper-step.html":
/*!***********************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/stepper-step.html ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<div part=\"before\"></div>\n\t<div part=\"step\">\n\t\t<slot part=\"content\"></slot>\n\t\t<atlas-icon name=\"checkmark\" part=\"check\"></atlas-icon>\n\t</div>\n\t<div part=\"after\"></div>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/stepper.html":
/*!******************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/stepper.html ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot part=\"steps\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/tile-board-tile.html":
/*!**************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/tile-board-tile.html ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot part=\"body\"></slot>\n\t<slot name=\"controls\" part=\"controls\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/tile-board.html":
/*!*********************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/tile-board.html ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot name=\"prefix\" part=\"prefix\"></slot>\n\t<slot part=\"dashboard\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/workflow-step.html":
/*!************************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/workflow-step.html ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot name=\"previousControls\" part=\"previousControls\"></slot>\n\t<slot name=\"nextControls\" part=\"nextControls\"></slot>\n\n\t<slot name=\"title\" part=\"title\"></slot>\n\t<slot name=\"subTitle\" part=\"subTitle\"></slot>\n\t<slot name=\"stepper\" part=\"stepper\"></slot>\n\n\t<slot part=\"body\"></slot>\n\n\t<slot name=\"controls\" part=\"controls\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-raw-components/src/templates/workflow.html":
/*!*******************************************************************************!*\
  !*** ./node_modules/@cision/atlas-raw-components/src/templates/workflow.html ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
// Module
var code = "<template>\n\t<slot part=\"steps\"></slot>\n</template>\n";
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/accordion.css":
/*!******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/accordion.css ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_accordion_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./accordion.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/accordion.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_accordion_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_accordion_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_accordion_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_accordion_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/alert.css":
/*!**************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/alert.css ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_alert_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./alert.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/alert.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_alert_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_alert_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_alert_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_alert_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/application-frame.css":
/*!**************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/application-frame.css ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_application_frame_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./application-frame.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/application-frame.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_application_frame_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_application_frame_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_application_frame_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_application_frame_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/application-frame.small.css":
/*!********************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/application-frame.small.css ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_application_frame_small_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./application-frame.small.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/application-frame.small.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_application_frame_small_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_application_frame_small_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_application_frame_small_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_application_frame_small_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/avatar.css":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/avatar.css ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_avatar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./avatar.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/avatar.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_avatar_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_avatar_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_avatar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_avatar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/button-set.css":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/button-set.css ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_button_set_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./button-set.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/button-set.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_button_set_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_button_set_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_button_set_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_button_set_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/button-set.tab-bar.css":
/*!***************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/button-set.tab-bar.css ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_button_set_tab_bar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./button-set.tab-bar.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/button-set.tab-bar.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_button_set_tab_bar_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_button_set_tab_bar_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_button_set_tab_bar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_button_set_tab_bar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/button.css":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/button.css ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_button_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./button.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/button.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_button_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_button_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_button_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_button_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/button.states.css":
/*!**********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/button.states.css ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_button_states_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./button.states.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/button.states.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_button_states_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_button_states_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_button_states_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_button_states_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/chip-group.css":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/chip-group.css ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_chip_group_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./chip-group.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/chip-group.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_chip_group_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_chip_group_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_chip_group_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_chip_group_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/chip.css":
/*!*************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/chip.css ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_chip_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./chip.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/chip.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_chip_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_chip_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_chip_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_chip_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/dialog.css":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/dialog.css ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_dialog_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./dialog.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/dialog.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_dialog_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_dialog_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_dialog_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_dialog_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/feed.css":
/*!*************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/feed.css ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_feed_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./feed.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/feed.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_feed_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_feed_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_feed_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_feed_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/icon.css":
/*!*************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/icon.css ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./icon.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/icon.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_icon_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/input-checkbox.css":
/*!***********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/input-checkbox.css ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_input_checkbox_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./input-checkbox.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-checkbox.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_input_checkbox_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_input_checkbox_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_input_checkbox_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_input_checkbox_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/input-chip-group.css":
/*!*************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/input-chip-group.css ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_input_chip_group_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./input-chip-group.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-chip-group.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_input_chip_group_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_input_chip_group_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_input_chip_group_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_input_chip_group_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/input-dropdown.css":
/*!***********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/input-dropdown.css ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_input_dropdown_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./input-dropdown.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-dropdown.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_input_dropdown_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_input_dropdown_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_input_dropdown_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_input_dropdown_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/input-search.css":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/input-search.css ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_input_search_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./input-search.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-search.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_input_search_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_input_search_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_input_search_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_input_search_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/input-text.css":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/input-text.css ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_input_text_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./input-text.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-text.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_input_text_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_input_text_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_input_text_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_input_text_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/input-textarea.css":
/*!***********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/input-textarea.css ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_input_textarea_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./input-textarea.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/input-textarea.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_input_textarea_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_input_textarea_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_input_textarea_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_input_textarea_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/logo.css":
/*!*************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/logo.css ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_logo_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./logo.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/logo.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_logo_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_logo_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_logo_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_logo_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/main-nav.css":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/main-nav.css ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_main_nav_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./main-nav.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/main-nav.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_main_nav_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_main_nav_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_main_nav_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_main_nav_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/main-nav.small.css":
/*!***********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/main-nav.small.css ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_main_nav_small_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./main-nav.small.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/main-nav.small.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_main_nav_small_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_main_nav_small_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_main_nav_small_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_main_nav_small_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/page.css":
/*!*************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/page.css ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_page_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./page.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/page.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_page_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_page_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_page_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_page_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/profile-control.css":
/*!************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/profile-control.css ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_profile_control_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./profile-control.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/profile-control.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_profile_control_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_profile_control_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_profile_control_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_profile_control_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/scratch.css":
/*!****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/scratch.css ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_scratch_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./scratch.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/scratch.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_scratch_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_scratch_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_scratch_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_scratch_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/snackbar-box.css":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/snackbar-box.css ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_snackbar_box_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./snackbar-box.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/snackbar-box.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_snackbar_box_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_snackbar_box_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_snackbar_box_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_snackbar_box_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/snackbar.css":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/snackbar.css ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_snackbar_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./snackbar.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/snackbar.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_snackbar_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_snackbar_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_snackbar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_snackbar_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/snackbar.small.css":
/*!***********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/snackbar.small.css ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_snackbar_small_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./snackbar.small.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/snackbar.small.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_snackbar_small_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_snackbar_small_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_snackbar_small_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_snackbar_small_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/stepper-step.css":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/stepper-step.css ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_stepper_step_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./stepper-step.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/stepper-step.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_stepper_step_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_stepper_step_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_stepper_step_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_stepper_step_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/stepper.css":
/*!****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/stepper.css ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_stepper_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./stepper.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/stepper.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_stepper_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_stepper_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_stepper_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_stepper_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/tile-board-tile.css":
/*!************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/tile-board-tile.css ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_tile_board_tile_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./tile-board-tile.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tile-board-tile.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_tile_board_tile_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_tile_board_tile_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_tile_board_tile_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_tile_board_tile_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/tile-board.css":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/tile-board.css ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_tile_board_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./tile-board.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tile-board.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_tile_board_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_tile_board_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_tile_board_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_tile_board_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/tile-board.small.css":
/*!*************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/tile-board.small.css ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_tile_board_small_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./tile-board.small.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/tile-board.small.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_tile_board_small_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_tile_board_small_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_tile_board_small_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_tile_board_small_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/workflow-step.css":
/*!**********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/workflow-step.css ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_workflow_step_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./workflow-step.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/workflow-step.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_workflow_step_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_workflow_step_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_workflow_step_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_workflow_step_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/css/workflow.css":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/css/workflow.css ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_workflow_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../../../css-loader/dist/cjs.js!./workflow.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/@cision/atlas-styles/dist/css/workflow.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_workflow_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_workflow_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_workflow_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_workflow_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

"use strict";


var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

"use strict";


var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

"use strict";


/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/add-circle.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/add-circle.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/add.svg":
/*!**************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/add.svg ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M11.0004 11.0004L11.0004 4.00003L13.0001 4.00003L13.0001 11.0004H20.0004V13.0001H13.0001L13.0001 20.0004H11.0004L11.0004 13.0001H4V11.0004L11.0004 11.0004Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/align-center.svg":
/*!***********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/align-center.svg ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20253)\"><path d=\"M3 4H21V6H3V4ZM5 19H19V21H5V19ZM3 14H21V16H3V14ZM5 9H19V11H5V9Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20253\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/align-justify.svg":
/*!************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/align-justify.svg ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20252)\"><path d=\"M3 4H21V6H3V4ZM3 19H21V21H3V19ZM3 14H21V16H3V14ZM3 9H21V11H3V9Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20252\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/align-left.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/align-left.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20251)\"><path d=\"M3 4H21V6H3V4ZM3 19H17V21H3V19ZM3 14H21V16H3V14ZM3 9H17V11H3V9Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20251\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/align-right.svg":
/*!**********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/align-right.svg ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20250)\"><path d=\"M3 4H21V6H3V4ZM7 19H21V21H7V19ZM3 14H21V16H3V14ZM7 9H21V11H7V9Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20250\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/archive-1.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/archive-1.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20176)\"><path d=\"M4 3H20L22 7V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V7.004L4 3ZM20 9H4V19H20V9ZM19.764 7L18.764 5H5.237L4.237 7H19.764ZM13 14H16L12 18L8 14H11V10H13V14Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20176\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/archive-2.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/archive-2.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20177)\"><path d=\"M3 10H2V4.003C2 3.449 2.455 3 2.992 3H21.008C21.1393 2.99973 21.2693 3.02556 21.3905 3.07601C21.5117 3.12645 21.6217 3.2005 21.714 3.29383C21.8063 3.38717 21.8791 3.49794 21.9282 3.61969C21.9773 3.74144 22.0017 3.87173 22 4.003V10H21V20.001C21.0004 20.1318 20.975 20.2614 20.9253 20.3824C20.8756 20.5034 20.8026 20.6134 20.7104 20.7062C20.6182 20.7989 20.5086 20.8726 20.3879 20.923C20.2672 20.9735 20.1378 20.9996 20.007 21H3.993C3.8622 20.9996 3.73276 20.9735 3.61207 20.923C3.49139 20.8726 3.38181 20.7989 3.2896 20.7062C3.19739 20.6134 3.12436 20.5034 3.07467 20.3824C3.02498 20.2614 2.99961 20.1318 3 20.001V10ZM19 10H5V19H19V10ZM4 5V8H20V5H4ZM9 12H15V14H9V12Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20177\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/arrow-backward.svg":
/*!*************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/arrow-backward.svg ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20149)\"><path d=\"M7.828 11H20V13H7.828L13.192 18.364L11.778 19.778L4 12L11.778 4.222L13.192 5.636L7.828 11Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20149\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/arrow-down.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/arrow-down.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20148)\"><path d=\"M13.0002 16.172L18.3642 10.808L19.7782 12.222L12.0002 20L4.22217 12.222L5.63617 10.808L11.0002 16.172V4H13.0002V16.172Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20148\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/arrow-forward.svg":
/*!************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/arrow-forward.svg ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20150)\"><path d=\"M16.172 11L10.808 5.636L12.222 4.222L20 12L12.222 19.778L10.808 18.364L16.172 13H4V11H16.172Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20150\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/arrow-up.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/arrow-up.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20147)\"><path d=\"M13.0002 7.828V20H11.0002V7.828L5.63617 13.192L4.22217 11.778L12.0002 4L19.7782 11.778L18.3642 13.192L13.0002 7.828Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20147\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/at.svg":
/*!*************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/at.svg ***!
  \*************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20204)\"><path d=\"M20 12C19.9998 10.2169 19.4039 8.48494 18.3069 7.07919C17.2099 5.67345 15.6747 4.67448 13.9451 4.24094C12.2155 3.80739 10.3906 3.96411 8.76028 4.68621C7.12992 5.40831 5.78753 6.65439 4.94629 8.22659C4.10504 9.79879 3.81316 11.607 4.11699 13.364C4.42083 15.1211 5.30296 16.7262 6.62331 17.9246C7.94365 19.1231 9.62653 19.846 11.4047 19.9787C13.1829 20.1114 14.9544 19.6462 16.438 18.657L17.548 20.321C15.9062 21.4187 13.975 22.0032 12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12V13.5C22.0001 14.2488 21.7601 14.9778 21.3152 15.5801C20.8703 16.1823 20.244 16.626 19.5283 16.846C18.8126 17.066 18.0453 17.0507 17.3389 16.8023C16.6326 16.5539 16.0245 16.0855 15.604 15.466C14.9366 16.16 14.083 16.6465 13.1457 16.8671C12.2085 17.0877 11.2275 17.033 10.3206 16.7096C9.41366 16.3861 8.61943 15.8077 8.03331 15.0438C7.44718 14.2799 7.09408 13.363 7.01644 12.4033C6.9388 11.4436 7.13991 10.4819 7.59562 9.63367C8.05133 8.78549 8.74225 8.08692 9.58537 7.6219C10.4285 7.15688 11.3879 6.94519 12.3485 7.01227C13.309 7.07934 14.2297 7.42232 15 8H17V13.5C17 13.8978 17.158 14.2794 17.4393 14.5607C17.7206 14.842 18.1022 15 18.5 15C18.8978 15 19.2794 14.842 19.5607 14.5607C19.842 14.2794 20 13.8978 20 13.5V12ZM12 9C11.2044 9 10.4413 9.31607 9.87868 9.87868C9.31607 10.4413 9 11.2044 9 12C9 12.7956 9.31607 13.5587 9.87868 14.1213C10.4413 14.6839 11.2044 15 12 15C12.7956 15 13.5587 14.6839 14.1213 14.1213C14.6839 13.5587 15 12.7956 15 12C15 11.2044 14.6839 10.4413 14.1213 9.87868C13.5587 9.31607 12.7956 9 12 9Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20204\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/bank.svg":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/bank.svg ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20162)\"><path d=\"M2 20H22V22H2V20ZM4 12H6V19H4V12ZM9 12H11V19H9V12ZM13 12H15V19H13V12ZM18 12H20V19H18V12ZM2 7L12 2L22 7V11H2V7ZM4 8.236V9H20V8.236L12 4.236L4 8.236ZM12 8C11.7348 8 11.4804 7.89464 11.2929 7.70711C11.1054 7.51957 11 7.26522 11 7C11 6.73478 11.1054 6.48043 11.2929 6.29289C11.4804 6.10536 11.7348 6 12 6C12.2652 6 12.5196 6.10536 12.7071 6.29289C12.8946 6.48043 13 6.73478 13 7C13 7.26522 12.8946 7.51957 12.7071 7.70711C12.5196 7.89464 12.2652 8 12 8Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20162\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/bar-chart-1.svg":
/*!**********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/bar-chart-1.svg ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20212)\"><path d=\"M2 12H4V21H2V12ZM5 14H7V21H5V14ZM16 8H18V21H16V8ZM19 10H21V21H19V10ZM9 2H11V21H9V2ZM12 4H14V21H12V4Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20212\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/bar-chart-2.svg":
/*!**********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/bar-chart-2.svg ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20213)\"><path d=\"M2 13H8V21H2V13ZM16 8H22V21H16V8ZM9 3H15V21H9V3ZM4 15V19H6V15H4ZM11 5V19H13V5H11ZM18 10V19H20V10H18Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20213\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/bold.svg":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/bold.svg ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20255)\"><path d=\"M8 11H12.5C13.163 11 13.7989 10.7366 14.2678 10.2678C14.7366 9.79893 15 9.16304 15 8.5C15 7.83696 14.7366 7.20107 14.2678 6.73223C13.7989 6.26339 13.163 6 12.5 6H8V11ZM18 15.5C18 16.0909 17.8836 16.6761 17.6575 17.2221C17.4313 17.768 17.0998 18.2641 16.682 18.682C16.2641 19.0998 15.768 19.4313 15.2221 19.6575C14.6761 19.8836 14.0909 20 13.5 20H6V4H12.5C13.381 4.00004 14.2425 4.25865 14.9779 4.74378C15.7132 5.2289 16.29 5.9192 16.6367 6.72907C16.9834 7.53894 17.0847 8.43276 16.9282 9.29969C16.7716 10.1666 16.3641 10.9685 15.756 11.606C16.4386 12.0013 17.0053 12.5692 17.3992 13.2526C17.7931 13.9361 18.0003 14.7112 18 15.5ZM8 13V18H13.5C14.163 18 14.7989 17.7366 15.2678 17.2678C15.7366 16.7989 16 16.163 16 15.5C16 14.837 15.7366 14.2011 15.2678 13.7322C14.7989 13.2634 14.163 13 13.5 13H8Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20255\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/book-open.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/book-open.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20192)\"><path d=\"M13 21V23H11V21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73479 2.10536 3.48043 2.29289 3.2929C2.48043 3.10536 2.73478 3 3 3H9C9.56759 2.99933 10.1288 3.11976 10.6461 3.35325C11.1635 3.58674 11.625 3.92792 12 4.354C12.375 3.92792 12.8365 3.58674 13.3539 3.35325C13.8712 3.11976 14.4324 2.99933 15 3H21C21.2652 3 21.5196 3.10536 21.7071 3.2929C21.8946 3.48043 22 3.73479 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H13ZM20 19V5H15C14.4696 5 13.9609 5.21072 13.5858 5.58579C13.2107 5.96086 13 6.46957 13 7V19H20ZM11 19V7C11 6.46957 10.7893 5.96086 10.4142 5.58579C10.0391 5.21072 9.53043 5 9 5H4V19H11Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20192\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/bookmark.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/bookmark.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20202)\"><path d=\"M5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V22.143C20.0001 22.2324 19.9763 22.3202 19.9309 22.3973C19.8855 22.4743 19.8204 22.5378 19.7421 22.5811C19.6639 22.6244 19.5755 22.6459 19.4861 22.6434C19.3968 22.641 19.3097 22.6146 19.234 22.567L12 18.03L4.766 22.566C4.69037 22.6135 4.60339 22.6399 4.5141 22.6424C4.42482 22.6449 4.33649 22.6235 4.2583 22.5803C4.1801 22.5371 4.11491 22.4738 4.06948 22.3969C4.02406 22.32 4.00007 22.2323 4 22.143V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2ZM18 4H6V19.432L12 15.671L18 19.432V4Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20202\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/broadcast.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/broadcast.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20224)\"><path d=\"M4.92901 2.92896L6.34301 4.34296C5.59904 5.08503 5.00906 5.96682 4.60697 6.93763C4.20488 7.90845 3.99861 8.94916 4.00001 9.99996C4.00001 12.21 4.89501 14.21 6.34301 15.657L4.93001 17.07C3.99998 16.1426 3.26237 15.0406 2.75954 13.8273C2.25672 12.614 1.9986 11.3133 2.00001 9.99996C1.99833 8.68649 2.25623 7.38565 2.75889 6.17217C3.26154 4.95869 3.99904 3.85651 4.92901 2.92896V2.92896ZM19.071 2.92896C20.001 3.85651 20.7385 4.95869 21.2411 6.17217C21.7438 7.38565 22.0017 8.68649 22 9.99996C22.0017 11.3134 21.7438 12.6143 21.2411 13.8277C20.7385 15.0412 20.001 16.1434 19.071 17.071L17.657 15.657C18.401 14.9149 18.991 14.0331 19.393 13.0623C19.7951 12.0915 20.0014 11.0507 20 9.99996C20 7.78996 19.105 5.78996 17.657 4.34296L19.07 2.92996L19.071 2.92896ZM7.75701 5.75696L9.17201 7.17196C8.79997 7.54288 8.50491 7.98367 8.30378 8.46899C8.10264 8.95431 7.99941 9.4746 8.00001 9.99996C8.00001 11.105 8.44801 12.105 9.17201 12.828L7.75701 14.243C7.19904 13.6864 6.75657 13.025 6.45504 12.2968C6.15352 11.5686 5.99888 10.7881 6.00001 9.99996C6.00001 8.34296 6.67201 6.84296 7.75701 5.75696ZM16.243 5.75696C16.801 6.31355 17.2434 6.97494 17.545 7.7031C17.8465 8.43126 18.0011 9.21183 18 9.99996C18.0011 10.7881 17.8465 11.5686 17.545 12.2968C17.2434 13.025 16.801 13.6864 16.243 14.243L14.828 12.828C15.2 12.457 15.4951 12.0162 15.6962 11.5309C15.8974 11.0456 16.0006 10.5253 16 9.99996C16.0006 9.4746 15.8974 8.95431 15.6962 8.46899C15.4951 7.98367 15.2 7.54288 14.828 7.17196L16.243 5.75696V5.75696ZM12 12C11.4696 12 10.9609 11.7892 10.5858 11.4142C10.2107 11.0391 10 10.5304 10 9.99996C10 9.46952 10.2107 8.96081 10.5858 8.58574C10.9609 8.21067 11.4696 7.99996 12 7.99996C12.5304 7.99996 13.0391 8.21067 13.4142 8.58574C13.7893 8.96081 14 9.46952 14 9.99996C14 10.5304 13.7893 11.0391 13.4142 11.4142C13.0391 11.7892 12.5304 12 12 12ZM11 14H13V22H11V14Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20224\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/bubble.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/bubble.svg ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20211)\"><path d=\"M16 16C17.657 16 19 17.343 19 19C19 20.657 17.657 22 16 22C14.343 22 13 20.657 13 19C13 17.343 14.343 16 16 16ZM6 12C8.21 12 10 13.79 10 16C10 18.21 8.21 20 6 20C3.79 20 2 18.21 2 16C2 13.79 3.79 12 6 12ZM16 18C15.448 18 15 18.448 15 19C15 19.552 15.448 20 16 20C16.552 20 17 19.552 17 19C17 18.448 16.552 18 16 18ZM6 14C4.895 14 4 14.895 4 16C4 17.105 4.895 18 6 18C7.105 18 8 17.105 8 16C8 14.895 7.105 14 6 14ZM14.5 2C17.538 2 20 4.462 20 7.5C20 10.538 17.538 13 14.5 13C11.462 13 9 10.538 9 7.5C9 4.462 11.462 2 14.5 2ZM14.5 4C12.567 4 11 5.567 11 7.5C11 9.433 12.567 11 14.5 11C16.433 11 18 9.433 18 7.5C18 5.567 16.433 4 14.5 4Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20211\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/building-1.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/building-1.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20158)\"><path d=\"M22 21H2V19H3V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H18C18.2652 3 18.5196 3.10536 18.7071 3.29289C18.8946 3.48043 19 3.73478 19 4V9H21V19H22V21ZM17 19H19V11H13V19H15V13H17V19ZM17 9V5H5V19H11V9H17ZM7 11H9V13H7V11ZM7 15H9V17H7V15ZM7 7H9V9H7V7Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20158\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/building-2.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/building-2.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20160)\"><path d=\"M21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V12.487C1.99998 12.3441 2.03059 12.2029 2.08976 12.0728C2.14892 11.9428 2.23528 11.8269 2.343 11.733L6 8.544V4C6 3.73478 6.10536 3.48043 6.29289 3.29289C6.48043 3.10536 6.73478 3 7 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21ZM9 19H12V12.942L8 9.454L4 12.942V19H7V15H9V19ZM14 19H20V5H8V7.127C8.234 7.127 8.469 7.209 8.657 7.374L13.657 11.733C13.7647 11.8269 13.8511 11.9428 13.9102 12.0728C13.9694 12.2029 14 12.3441 14 12.487V19ZM16 11H18V13H16V11ZM16 15H18V17H16V15ZM16 7H18V9H16V7ZM12 7H14V9H12V7Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20160\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/building-3.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/building-3.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M21 20H23V22H1V20H3V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V20ZM19 20V4H5V20H19ZM8 11H11V13H8V11ZM8 7H11V9H8V7ZM8 15H11V17H8V15ZM13 15H16V17H13V15ZM13 11H16V13H13V11ZM13 7H16V9H13V7Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/business-profile.svg":
/*!***************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/business-profile.svg ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20188)\"><path d=\"M2 3.993C2.00183 3.73038 2.1069 3.47902 2.29251 3.29322C2.47813 3.10742 2.72938 3.00209 2.992 3H21.008C21.556 3 22 3.445 22 3.993V20.007C21.9982 20.2696 21.8931 20.521 21.7075 20.7068C21.5219 20.8926 21.2706 20.9979 21.008 21H2.992C2.72881 20.9997 2.4765 20.895 2.29049 20.7088C2.10448 20.5226 2 20.2702 2 20.007V3.993ZM4 5V19H20V5H4ZM6 7H12V13H6V7ZM8 9V11H10V9H8ZM6 15H18V17H6V15ZM14 7H18V9H14V7ZM14 11H18V13H14V11Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20188\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/calendar-check.svg":
/*!*************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/calendar-check.svg ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20190)\"><path d=\"M9 1V3H15V1H17V3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H7V1H9ZM20 10H4V19H20V10ZM15.036 11.136L16.45 12.55L11.5 17.5L7.964 13.964L9.38 12.55L11.501 14.672L15.037 11.136H15.036ZM7 5H4V8H20V5H17V6H15V5H9V6H7V5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20190\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/calendar-event.svg":
/*!*************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/calendar-event.svg ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20189)\"><path d=\"M17 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H7V1H9V3H15V1H17V3ZM20 9V5H17V7H15V5H9V7H7V5H4V9H20ZM20 11H4V19H20V11ZM6 13H11V17H6V13Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20189\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/camera.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/camera.svg ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20210)\"><path d=\"M9.828 5L7.828 7H4V19H20V7H16.172L14.172 5H9.828ZM9 3H15L17 5H21C21.2652 5 21.5196 5.10536 21.7071 5.29289C21.8946 5.48043 22 5.73478 22 6V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V6C2 5.73478 2.10536 5.48043 2.29289 5.29289C2.48043 5.10536 2.73478 5 3 5H7L9 3ZM12 18C10.5413 18 9.14236 17.4205 8.11091 16.3891C7.07946 15.3576 6.5 13.9587 6.5 12.5C6.5 11.0413 7.07946 9.64236 8.11091 8.61091C9.14236 7.57946 10.5413 7 12 7C13.4587 7 14.8576 7.57946 15.8891 8.61091C16.9205 9.64236 17.5 11.0413 17.5 12.5C17.5 13.9587 16.9205 15.3576 15.8891 16.3891C14.8576 17.4205 13.4587 18 12 18ZM12 16C12.9283 16 13.8185 15.6313 14.4749 14.9749C15.1313 14.3185 15.5 13.4283 15.5 12.5C15.5 11.5717 15.1313 10.6815 14.4749 10.0251C13.8185 9.36875 12.9283 9 12 9C11.0717 9 10.1815 9.36875 9.52513 10.0251C8.86875 10.6815 8.5 11.5717 8.5 12.5C8.5 13.4283 8.86875 14.3185 9.52513 14.9749C10.1815 15.6313 11.0717 16 12 16V16Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20210\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/chat-1.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/chat-1.svg ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20193)\"><path d=\"M5.763 17H20V5H4V18.385L5.763 17ZM6.455 19L2 22.5V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19H6.455Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20193\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/chat-2.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/chat-2.svg ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20194)\"><path d=\"M6.455 19L2 22.5V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19H6.455ZM5.763 17H20V5H4V18.385L5.763 17ZM11 10H13V12H11V10ZM7 10H9V12H7V10ZM15 10H17V12H15V10Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20194\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/chat-3.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/chat-3.svg ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20197)\"><path d=\"M14.45 19L12 22.5L9.55 19H3C2.73478 19 2.48043 18.8946 2.29289 18.7071C2.10536 18.5196 2 18.2652 2 18V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19H14.45ZM13.409 17H20V5H4V17H10.591L12 19.012L13.409 17V17Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20197\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/chat-add.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/chat-add.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20195)\"><path d=\"M14 3V5H4V18.385L5.763 17H20V10H22V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19H6.455L2 22.5V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H14ZM19 3V0H21V3H24V5H21V8H19V5H16V3H19Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20195\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/chat.svg":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/chat.svg ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20 3H4C2.897 3 2 3.897 2 5V17C2 18.103 2.897 19 4 19H7V22.767L13.277 19H20C21.103 19 22 18.103 22 17V5C22 3.897 21.103 3 20 3ZM20 17H12.723L9 19.233V17H4V5H20V17Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/check.svg":
/*!****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/check.svg ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM11.003 16L6.76 11.757L8.174 10.343L11.003 13.172L16.659 7.515L18.074 8.929L11.003 16Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/checkmark.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/checkmark.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20239)\"><path d=\"M10.0002 15.172L19.1922 5.979L20.6072 7.393L10.0002 18L3.63623 11.636L5.05023 10.222L10.0002 15.172Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20239\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/chevron-down.svg":
/*!***********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/chevron-down.svg ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12.0002 13.172L16.9502 8.222L18.3642 9.636L12.0002 16L5.63623 9.636L7.05023 8.222L12.0002 13.172Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/chevron-left.svg":
/*!***********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/chevron-left.svg ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10.828 12L15.778 16.95L14.364 18.364L8 12L14.364 5.636L15.778 7.05L10.828 12Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/chevron-right.svg":
/*!************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/chevron-right.svg ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.1722 12L8.22217 7.05L9.63617 5.636L16.0002 12L9.63617 18.364L8.22217 16.95L13.1722 12Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/chevron-up.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/chevron-up.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20154)\"><path d=\"M12.0002 10.828L7.05023 15.778L5.63623 14.364L12.0002 8L18.3642 14.364L16.9502 15.778L12.0002 10.828Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20154\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/close.svg":
/*!****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/close.svg ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12.0002 10.586L16.9502 5.63599L18.3642 7.04999L13.4142 12L18.3642 16.95L16.9502 18.364L12.0002 13.414L7.05023 18.364L5.63623 16.95L10.5862 12L5.63623 7.04999L7.05023 5.63599L12.0002 10.586Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/cloud.svg":
/*!****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/cloud.svg ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20165)\"><path d=\"M16.9999 21H6.99987C5.5831 21.0009 4.21172 20.5004 3.12856 19.5872C2.0454 18.674 1.32035 17.4069 1.08178 16.0103C0.843215 14.6138 1.10653 13.1779 1.82511 11.9569C2.54368 10.7359 3.67115 9.8085 5.00787 9.33902C4.96259 8.39268 5.10989 7.447 5.44083 6.55926C5.77178 5.67152 6.2795 4.8602 6.93322 4.17444C7.58694 3.48869 8.37307 2.94278 9.24398 2.56978C10.1149 2.19678 11.0525 2.00446 11.9999 2.00446C12.9473 2.00446 13.8849 2.19678 14.7558 2.56978C15.6267 2.94278 16.4128 3.48869 17.0665 4.17444C17.7203 4.8602 18.228 5.67152 18.5589 6.55926C18.8899 7.447 19.0372 8.39268 18.9919 9.33902C20.3286 9.8085 21.4561 10.7359 22.1746 11.9569C22.8932 13.1779 23.1565 14.6138 22.918 16.0103C22.6794 17.4069 21.9543 18.674 20.8712 19.5872C19.788 20.5004 18.4166 21.0009 16.9999 21ZM16.9999 9.00002C17.0001 8.33303 16.8669 7.67272 16.6081 7.05799C16.3493 6.44326 15.9701 5.88652 15.4928 5.42056C15.0156 4.9546 14.4499 4.58884 13.8292 4.34481C13.2084 4.10078 12.5451 3.98342 11.8783 3.99963C11.2115 4.01585 10.5547 4.16531 9.94657 4.43922C9.33841 4.71313 8.7912 5.10595 8.33716 5.59455C7.88312 6.08315 7.53143 6.65766 7.3028 7.28425C7.07417 7.91083 6.97321 8.57683 7.00587 9.24302L7.07587 10.731L5.67187 11.225C4.78238 11.5396 4.03263 12.1583 3.55497 12.9719C3.07732 13.7856 2.90249 14.7418 3.06133 15.6718C3.22018 16.6018 3.7025 17.4458 4.42314 18.0548C5.14378 18.6638 6.0564 18.9985 6.99987 19H16.9999C17.7362 18.9998 18.4582 18.7963 19.0863 18.412C19.7144 18.0277 20.2242 17.4774 20.5596 16.8219C20.895 16.1664 21.0429 15.431 20.9871 14.6968C20.9312 13.9625 20.6738 13.258 20.2432 12.6607C19.8126 12.0634 19.2254 11.5966 18.5464 11.3116C17.8675 11.0267 17.123 10.9347 16.3951 11.0458C15.6672 11.1569 14.9841 11.4668 14.421 11.9413C13.8579 12.4158 13.4367 13.0365 13.2039 13.735L11.3059 13.102C11.7047 11.9074 12.4692 10.8685 13.491 10.1323C14.5129 9.39616 15.7404 9.00003 16.9999 9.00002Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20165\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/community.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/community.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20164)\"><path d=\"M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM9.71 19.667C8.72341 17.5743 8.15187 15.3102 8.027 13H4.062C4.25659 14.5389 4.89392 15.9882 5.89657 17.1717C6.89922 18.3552 8.22401 19.2221 9.71 19.667V19.667ZM10.03 13C10.181 15.439 10.878 17.73 12 19.752C13.1523 17.6766 13.8254 15.3695 13.97 13H10.03V13ZM19.938 13H15.973C15.8481 15.3102 15.2766 17.5743 14.29 19.667C15.776 19.2221 17.1008 18.3552 18.1034 17.1717C19.1061 15.9882 19.7434 14.5389 19.938 13V13ZM4.062 11H8.027C8.15187 8.68979 8.72341 6.42569 9.71 4.333C8.22401 4.77788 6.89922 5.64475 5.89657 6.8283C4.89392 8.01184 4.25659 9.4611 4.062 11V11ZM10.031 11H13.969C13.8248 8.6306 13.152 6.32353 12 4.248C10.8477 6.32345 10.1746 8.63052 10.03 11H10.031ZM14.29 4.333C15.2766 6.42569 15.8481 8.68979 15.973 11H19.938C19.7434 9.4611 19.1061 8.01184 18.1034 6.8283C17.1008 5.64475 15.776 4.77788 14.29 4.333V4.333Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20164\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/contact-book.svg":
/*!***********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/contact-book.svg ***!
  \***********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20184)\"><path d=\"M3 2H19.005C20.107 2 21 2.898 21 3.99V20.01C21 21.109 20.107 22 19.005 22H3V2ZM7 4H5V20H7V4ZM9 20H19V4H9V20ZM11 16C11 15.2044 11.3161 14.4413 11.8787 13.8787C12.4413 13.3161 13.2044 13 14 13C14.7956 13 15.5587 13.3161 16.1213 13.8787C16.6839 14.4413 17 15.2044 17 16H11ZM14 12C13.4696 12 12.9609 11.7893 12.5858 11.4142C12.2107 11.0391 12 10.5304 12 10C12 9.46957 12.2107 8.96086 12.5858 8.58579C12.9609 8.21071 13.4696 8 14 8C14.5304 8 15.0391 8.21071 15.4142 8.58579C15.7893 8.96086 16 9.46957 16 10C16 10.5304 15.7893 11.0391 15.4142 11.4142C15.0391 11.7893 14.5304 12 14 12ZM22 6H24V10H22V6ZM22 12H24V16H22V12Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20184\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/contrast.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/contrast.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20219)\"><path d=\"M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20V20ZM12 18V6C13.5913 6 15.1174 6.63214 16.2426 7.75736C17.3679 8.88258 18 10.4087 18 12C18 13.5913 17.3679 15.1174 16.2426 16.2426C15.1174 17.3679 13.5913 18 12 18Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20219\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/control-1.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/control-1.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20225)\"><path d=\"M21 18V21H19V18H17V16H23V18H21ZM5 18V21H3V18H1V16H7V18H5ZM11 6V3H13V6H15V8H9V6H11ZM11 10H13V21H11V10ZM3 14V3H5V14H3ZM19 14V3H21V14H19Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20225\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/control-2.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/control-2.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20226)\"><path d=\"M6.17 18C6.3766 17.4145 6.75974 16.9074 7.2666 16.5488C7.77346 16.1902 8.37909 15.9976 9 15.9976C9.62091 15.9976 10.2265 16.1902 10.7334 16.5488C11.2403 16.9074 11.6234 17.4145 11.83 18H22V20H11.83C11.6234 20.5855 11.2403 21.0926 10.7334 21.4512C10.2265 21.8099 9.62091 22.0025 9 22.0025C8.37909 22.0025 7.77346 21.8099 7.2666 21.4512C6.75974 21.0926 6.3766 20.5855 6.17 20H2V18H6.17ZM12.17 11C12.3766 10.4145 12.7597 9.90744 13.2666 9.5488C13.7735 9.19015 14.3791 8.99756 15 8.99756C15.6209 8.99756 16.2265 9.19015 16.7334 9.5488C17.2403 9.90744 17.6234 10.4145 17.83 11H22V13H17.83C17.6234 13.5855 17.2403 14.0926 16.7334 14.4512C16.2265 14.8099 15.6209 15.0025 15 15.0025C14.3791 15.0025 13.7735 14.8099 13.2666 14.4512C12.7597 14.0926 12.3766 13.5855 12.17 13H2V11H12.17ZM6.17 4.00001C6.3766 3.41448 6.75974 2.90744 7.2666 2.5488C7.77346 2.19015 8.37909 1.99756 9 1.99756C9.62091 1.99756 10.2265 2.19015 10.7334 2.5488C11.2403 2.90744 11.6234 3.41448 11.83 4.00001H22V6.00001H11.83C11.6234 6.58554 11.2403 7.09258 10.7334 7.45122C10.2265 7.80986 9.62091 8.00246 9 8.00246C8.37909 8.00246 7.77346 7.80986 7.2666 7.45122C6.75974 7.09258 6.3766 6.58554 6.17 6.00001H2V4.00001H6.17ZM9 6.00001C9.26522 6.00001 9.51957 5.89465 9.70711 5.70712C9.89464 5.51958 10 5.26523 10 5.00001C10 4.73479 9.89464 4.48044 9.70711 4.2929C9.51957 4.10537 9.26522 4.00001 9 4.00001C8.73478 4.00001 8.48043 4.10537 8.29289 4.2929C8.10536 4.48044 8 4.73479 8 5.00001C8 5.26523 8.10536 5.51958 8.29289 5.70712C8.48043 5.89465 8.73478 6.00001 9 6.00001V6.00001ZM15 13C15.2652 13 15.5196 12.8947 15.7071 12.7071C15.8946 12.5196 16 12.2652 16 12C16 11.7348 15.8946 11.4804 15.7071 11.2929C15.5196 11.1054 15.2652 11 15 11C14.7348 11 14.4804 11.1054 14.2929 11.2929C14.1054 11.4804 14 11.7348 14 12C14 12.2652 14.1054 12.5196 14.2929 12.7071C14.4804 12.8947 14.7348 13 15 13V13ZM9 20C9.26522 20 9.51957 19.8947 9.70711 19.7071C9.89464 19.5196 10 19.2652 10 19C10 18.7348 9.89464 18.4804 9.70711 18.2929C9.51957 18.1054 9.26522 18 9 18C8.73478 18 8.48043 18.1054 8.29289 18.2929C8.10536 18.4804 8 18.7348 8 19C8 19.2652 8.10536 19.5196 8.29289 19.7071C8.48043 19.8947 8.73478 20 9 20V20Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20226\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/directions.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/directions.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20171)\"><path d=\"M1.92302 9.36998C1.41302 9.16498 1.41902 8.85998 1.95702 8.68098L21.043 2.31898C21.572 2.14298 21.875 2.43898 21.727 2.95698L16.273 22.043C16.123 22.572 15.798 22.596 15.556 22.113L11 13L1.92302 9.36998ZM6.81302 9.16998L12.449 11.425L15.489 17.507L19.035 5.09698L6.81202 9.16998H6.81302Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20171\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/document.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/document.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20181)\"><path d=\"M20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22ZM19 20V4H5V20H19ZM7 6H11V10H7V6ZM7 12H17V14H7V12ZM7 16H17V18H7V16ZM13 7H17V9H13V7Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20181\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/download.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/download.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20168)\"><path d=\"M12.9999 13V18.585L14.8279 16.757L16.2429 18.172L11.9999 22.414L7.75689 18.172L9.17189 16.757L10.9999 18.585V13H12.9999ZM11.9999 2C13.7169 2.00008 15.374 2.63111 16.6561 3.77312C17.9382 4.91512 18.756 6.48846 18.9539 8.194C20.1982 8.53332 21.2836 9.2991 22.0206 10.3575C22.7575 11.416 23.099 12.6997 22.9855 13.9844C22.872 15.2691 22.3106 16.473 21.3995 17.3858C20.4883 18.2986 19.2854 18.8622 18.0009 18.978V16.964C18.4611 16.8983 18.9035 16.7416 19.3025 16.503C19.7014 16.2644 20.0488 15.9487 20.3245 15.5744C20.6001 15.2001 20.7984 14.7746 20.9078 14.3228C21.0172 13.8711 21.0355 13.402 20.9616 12.9431C20.8878 12.4841 20.7232 12.0445 20.4776 11.6498C20.232 11.2552 19.9102 10.9134 19.5311 10.6445C19.152 10.3755 18.7231 10.1848 18.2694 10.0834C17.8158 9.98203 17.3465 9.97203 16.8889 10.054C17.0455 9.32489 17.037 8.56997 16.8641 7.84455C16.6912 7.11913 16.3582 6.44158 15.8895 5.86153C15.4208 5.28147 14.8283 4.81361 14.1554 4.49219C13.4824 4.17078 12.7461 4.00397 12.0004 4.00397C11.2546 4.00397 10.5183 4.17078 9.84542 4.49219C9.1725 4.81361 8.57999 5.28147 8.1113 5.86153C7.64261 6.44158 7.3096 7.11913 7.13668 7.84455C6.96375 8.56997 6.95528 9.32489 7.11189 10.054C6.19955 9.88267 5.25651 10.0808 4.49024 10.6048C3.72396 11.1287 3.19722 11.9357 3.02589 12.848C2.85456 13.7603 3.05268 14.7034 3.57666 15.4697C4.10063 16.2359 4.90755 16.7627 5.81989 16.934L5.99989 16.964V18.978C4.71534 18.8623 3.5123 18.2989 2.60103 17.3862C1.68976 16.4735 1.12822 15.2696 1.01457 13.9848C0.900915 12.7001 1.24237 11.4163 1.97926 10.3578C2.71615 9.29926 3.8016 8.53339 5.04589 8.194C5.2436 6.48838 6.0613 4.91491 7.34347 3.77287C8.62565 2.63082 10.2829 1.99986 11.9999 2V2Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20168\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/drag.svg":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/drag.svg ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 14H10V19H5V14ZM14 14H19V19H14V14ZM5 5H10V10H5V5ZM14 5H19V10H14V5Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/dropdown.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/dropdown.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10L12 15L17 10H7Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/edit.svg":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/edit.svg ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7.42024 17.9963L17.5808 7.83579L16.1642 6.4192L6.00366 16.5798V17.9963H7.42024ZM8.25076 20H4V15.7492L15.4559 4.29332C15.6438 4.10551 15.8986 4 16.1642 4C16.4299 4 16.6846 4.10551 16.8725 4.29332L19.7067 7.1275C19.8945 7.31537 20 7.57014 20 7.83579C20 8.10144 19.8945 8.35621 19.7067 8.54408L8.25076 20Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/exchange.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/exchange.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20238)\"><path d=\"M16.05 12.05L21 17L16.05 21.9501L14.636 20.536L17.172 17.999L4 18V16H17.172L14.636 13.464L16.05 12.05ZM7.95 2.05005L9.364 3.46405L6.828 6.00005H20V8.00005H6.828L9.364 10.536L7.95 11.95L3 7.00005L7.95 2.05005V2.05005Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20238\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/eye.svg":
/*!**************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/eye.svg ***!
  \**************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20222)\"><path d=\"M12.0002 3C17.3922 3 21.8782 6.88 22.8192 12C21.8792 17.12 17.3922 21 12.0002 21C6.60815 21 2.12215 17.12 1.18115 12C2.12115 6.88 6.60815 3 12.0002 3ZM12.0002 19C14.0396 18.9996 16.0185 18.3068 17.613 17.0352C19.2075 15.7635 20.3231 13.9883 20.7772 12C20.3214 10.0133 19.2051 8.24 17.6108 6.97003C16.0165 5.70005 14.0385 5.00853 12.0002 5.00853C9.96185 5.00853 7.98384 5.70005 6.38953 6.97003C4.79521 8.24 3.67892 10.0133 3.22315 12C3.67725 13.9883 4.79283 15.7635 6.3873 17.0352C7.98177 18.3068 9.96068 18.9996 12.0002 19V19ZM12.0002 16.5C10.8067 16.5 9.66209 16.0259 8.81817 15.182C7.97426 14.3381 7.50015 13.1935 7.50015 12C7.50015 10.8065 7.97426 9.66193 8.81817 8.81802C9.66209 7.97411 10.8067 7.5 12.0002 7.5C13.1936 7.5 14.3382 7.97411 15.1821 8.81802C16.026 9.66193 16.5002 10.8065 16.5002 12C16.5002 13.1935 16.026 14.3381 15.1821 15.182C14.3382 16.0259 13.1936 16.5 12.0002 16.5ZM12.0002 14.5C12.6632 14.5 13.2991 14.2366 13.7679 13.7678C14.2368 13.2989 14.5002 12.663 14.5002 12C14.5002 11.337 14.2368 10.7011 13.7679 10.2322C13.2991 9.76339 12.6632 9.5 12.0002 9.5C11.3371 9.5 10.7012 9.76339 10.2324 10.2322C9.76354 10.7011 9.50015 11.337 9.50015 12C9.50015 12.663 9.76354 13.2989 10.2324 13.7678C10.7012 14.2366 11.3371 14.5 12.0002 14.5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20222\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/facebook-fullcolor.svg":
/*!*****************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/facebook-fullcolor.svg ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 28 28\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 14C0 6.26803 6.26803 0 14 0C21.732 0 28 6.26803 28 14C28 21.732 21.732 28 14 28C6.26803 28 0 21.732 0 14Z\" fill=\"#3B5998\"></path><path d=\"M14.8437 21V13.9992H16.7763L17.0324 11.5867H14.8437L14.847 10.3792C14.847 9.74992 14.9068 9.41278 15.8106 9.41278H17.0187V7H15.0859C12.7643 7 11.9472 8.17033 11.9472 10.1385V11.5869H10.5V13.9994H11.9472V21H14.8437Z\" fill=\"white\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/facebook.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/facebook.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M10 0C4.47717 0 0 4.47717 0 10C0 15.0306 3.71471 19.1937 8.55075 19.8958V20H10H11.6547V19.8637C16.3901 19.0752 20 14.9592 20 10C20 4.47717 15.5228 0 10 0ZM11.6547 19.8637V12.4991H13.7255L14 9.91427H11.6547L11.6582 8.62053C11.6582 7.94635 11.7223 7.58512 12.6907 7.58512H13.9853V5H11.9142C9.42635 5 8.55075 6.25393 8.55075 8.36266V9.91456H7V12.4994H8.55075V19.8958C9.02391 19.9644 9.5078 20 10 20C10.5637 20 11.1164 19.9534 11.6547 19.8637Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/feed-panel.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/feed-panel.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><mask id=\"path-1-inside-1_8156_19344\" fill=\"white\"><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"1\"></rect></mask><rect x=\"2\" y=\"2\" width=\"20\" height=\"20\" rx=\"1\" stroke=\"currentcolor\" stroke-width=\"4\" mask=\"url(#path-1-inside-1_8156_19344)\"></rect><rect x=\"15\" y=\"4\" width=\"6\" height=\"16\" fill=\"currentcolor\"></rect></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/file-chart.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/file-chart.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20191)\"><path d=\"M11 7H13V17H11V7ZM15 11H17V17H15V11ZM7 13H9V17H7V13ZM15 4H5V20H19V8H15V4ZM3 2.992C3 2.444 3.447 2 3.999 2H16L21 7V20.993C21.0009 21.1243 20.976 21.2545 20.9266 21.3762C20.8772 21.4979 20.8043 21.6087 20.7121 21.7022C20.6199 21.7957 20.5101 21.8701 20.3892 21.9212C20.2682 21.9723 20.1383 21.9991 20.007 22H3.993C3.73038 21.9982 3.47902 21.8931 3.29322 21.7075C3.10742 21.5219 3.00209 21.2706 3 21.008V2.992Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20191\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/file-copy.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/file-copy.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20183)\"><path d=\"M7 6V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V17C21 17.2652 20.8946 17.5196 20.7071 17.7071C20.5196 17.8946 20.2652 18 20 18H17V21C17 21.552 16.55 22 15.993 22H4.007C3.87513 22.0008 3.7444 21.9755 3.62232 21.9256C3.50025 21.8757 3.38923 21.8022 3.29566 21.7093C3.20208 21.6164 3.12779 21.5059 3.07705 21.3841C3.02632 21.2624 3.00013 21.1319 3 21L3.003 7C3.003 6.448 3.453 6 4.009 6H7ZM5.002 8L5 20H15V8H5.002ZM9 6H17V16H19V4H9V6ZM7 11H13V13H7V11ZM7 15H13V17H7V15Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20183\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/filter.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/filter.svg ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20223)\"><path d=\"M21 4V6H20L15 13.5V22H9V13.5L4 6H3V4H21ZM6.404 6L11 12.894V20H13V12.894L17.596 6H6.404Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20223\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/flag.svg":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/flag.svg ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20167)\"><path d=\"M5 16V22H3V3H12.382C12.5677 3.0001 12.7496 3.05188 12.9075 3.14955C13.0654 3.24722 13.193 3.38692 13.276 3.553L14 5H20C20.2652 5 20.5196 5.10536 20.7071 5.29289C20.8946 5.48043 21 5.73478 21 6V17C21 17.2652 20.8946 17.5196 20.7071 17.7071C20.5196 17.8946 20.2652 18 20 18H13.618C13.4323 17.9999 13.2504 17.9481 13.0925 17.8504C12.9346 17.7528 12.807 17.6131 12.724 17.447L12 16H5ZM5 5V14H13.236L14.236 16H19V7H12.764L11.764 5H5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20167\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/focus.svg":
/*!****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/focus.svg ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20218)\"><path d=\"M12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20V20ZM12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 16C13.0609 16 14.0783 15.5786 14.8284 14.8284C15.5786 14.0783 16 13.0609 16 12C16 10.9391 15.5786 9.92172 14.8284 9.17157C14.0783 8.42143 13.0609 8 12 8C10.9391 8 9.92172 8.42143 9.17157 9.17157C8.42143 9.92172 8 10.9391 8 12C8 13.0609 8.42143 14.0783 9.17157 14.8284C9.92172 15.5786 10.9391 16 12 16V16ZM12 18C10.4087 18 8.88258 17.3679 7.75736 16.2426C6.63214 15.1174 6 13.5913 6 12C6 10.4087 6.63214 8.88258 7.75736 7.75736C8.88258 6.63214 10.4087 6 12 6C13.5913 6 15.1174 6.63214 16.2426 7.75736C17.3679 8.88258 18 10.4087 18 12C18 13.5913 17.3679 15.1174 16.2426 16.2426C15.1174 17.3679 13.5913 18 12 18ZM12 14C11.4696 14 10.9609 13.7893 10.5858 13.4142C10.2107 13.0391 10 12.5304 10 12C10 11.4696 10.2107 10.9609 10.5858 10.5858C10.9609 10.2107 11.4696 10 12 10C12.5304 10 13.0391 10.2107 13.4142 10.5858C13.7893 10.9609 14 11.4696 14 12C14 12.5304 13.7893 13.0391 13.4142 13.4142C13.0391 13.7893 12.5304 14 12 14Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20218\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/folder-add.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/folder-add.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20179)\"><path d=\"M12.414 5H21C21.2652 5 21.5196 5.10536 21.7071 5.29289C21.8946 5.48043 22 5.73478 22 6V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H10.414L12.414 5ZM4 5V19H20V7H11.586L9.586 5H4ZM11 12V9H13V12H16V14H13V17H11V14H8V12H11Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20179\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/folder.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/folder.svg ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20178)\"><path d=\"M4 5V19H20V7H11.586L9.586 5H4ZM12.414 5H21C21.2652 5 21.5196 5.10536 21.7071 5.29289C21.8946 5.48043 22 5.73478 22 6V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H10.414L12.414 5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20178\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/font-size.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/font-size.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20254)\"><path d=\"M11.2461 15H4.7541L2.7541 20H0.600098L7.0001 4H9.0001L15.4001 20H13.2461L11.2461 15ZM10.4461 13L8.0001 6.885L5.5541 13H10.4461V13ZM21.0001 12.535V12H23.0001V20H21.0001V19.465C20.392 19.8157 19.7023 20.0002 19.0003 20C18.2983 19.9998 17.6087 19.8148 17.0009 19.4637C16.393 19.1125 15.8883 18.6076 15.5373 17.9996C15.1864 17.3916 15.0017 16.702 15.0017 16C15.0017 15.298 15.1864 14.6084 15.5373 14.0004C15.8883 13.3924 16.393 12.8875 17.0009 12.5363C17.6087 12.1852 18.2983 12.0002 19.0003 12C19.7023 11.9998 20.392 12.1843 21.0001 12.535V12.535ZM19.0001 18C19.5305 18 20.0392 17.7893 20.4143 17.4142C20.7894 17.0391 21.0001 16.5304 21.0001 16C21.0001 15.4696 20.7894 14.9609 20.4143 14.5858C20.0392 14.2107 19.5305 14 19.0001 14C18.4697 14 17.961 14.2107 17.5859 14.5858C17.2108 14.9609 17.0001 15.4696 17.0001 16C17.0001 16.5304 17.2108 17.0391 17.5859 17.4142C17.961 17.7893 18.4697 18 19.0001 18V18Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20254\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/forward.svg":
/*!******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/forward.svg ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20235)\"><path d=\"M13 14H11C9.3596 13.9994 7.75023 14.4471 6.34588 15.2949C4.94152 16.1427 3.7956 17.3582 3.032 18.81C3.01054 18.5405 2.99986 18.2703 3 18C3 12.477 7.477 8 13 8V2.5L23.5 11L13 19.5V14ZM11 12H15V15.308L20.321 11L15 6.692V10H13C11.8503 9.99871 10.7138 10.2458 9.66839 10.7244C8.62299 11.203 7.69332 11.9018 6.943 12.773C8.23432 12.2612 9.61096 11.9989 11 12Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20235\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/hall.svg":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/hall.svg ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20163)\"><path d=\"M20 6H23V8H22V19H23V21H1V19H2V8H1V6H4V4C4 3.73478 4.10536 3.48043 4.29289 3.29289C4.48043 3.10536 4.73478 3 5 3H19C19.2652 3 19.5196 3.10536 19.7071 3.29289C19.8946 3.48043 20 3.73478 20 4V6ZM20 8H4V19H7V12H9V19H11V12H13V19H15V12H17V19H20V8ZM6 5V6H18V5H6Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20163\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/help.svg":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/help.svg ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M11 18H13V16H11V18ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/home.svg":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/home.svg ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_7904_17521)\"><path d=\"M19.7486 21.9428H4.38857C4.09759 21.9428 3.81853 21.8272 3.61277 21.6215C3.40702 21.4157 3.29143 21.1366 3.29143 20.8457V10.9714H0L11.3302 0.671392C11.5322 0.487596 11.7955 0.385742 12.0686 0.385742C12.3417 0.385742 12.605 0.487596 12.8069 0.671392L24.1371 10.9714H20.8457V20.8457C20.8457 21.1366 20.7301 21.4157 20.5244 21.6215C20.3186 21.8272 20.0396 21.9428 19.7486 21.9428ZM5.48571 19.7485H18.6514V8.94933L12.0686 2.96552L5.48571 8.94933V19.7485Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_7904_17521\"><rect width=\"24\" height=\"23.04\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/indent-decrease.svg":
/*!**************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/indent-decrease.svg ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20249)\"><path d=\"M3 4H21V6H3V4ZM3 19H21V21H3V19ZM11 14H21V16H11V14ZM11 9H21V11H11V9ZM3 12.5L7 9V16L3 12.5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20249\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/indent-increase.svg":
/*!**************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/indent-increase.svg ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20248)\"><path d=\"M3 4H21V6H3V4ZM3 19H21V21H3V19ZM11 14H21V16H11V14ZM11 9H21V11H11V9ZM7 12.5L3 16V9L7 12.5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20248\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/information.svg":
/*!**********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/information.svg ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20217)\"><path d=\"M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20V20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20217\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/instagram-fullcolor.svg":
/*!******************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/instagram-fullcolor.svg ***!
  \******************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 28 28\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.9805 28C6.24826 28 0 21.7517 0 14.0195C0 6.28731 6.28731 0 14.0195 0C21.7127 0 28 6.28731 28 14.0195C28 21.7517 21.7127 28 13.9805 28Z\" fill=\"url(#paint0_radial_8951_20220)\"></path><path d=\"M20.9549 11.1322C20.9471 10.5443 20.8368 9.96235 20.6292 9.41224C20.4491 8.94823 20.174 8.52682 19.8215 8.17494C19.4691 7.82307 19.047 7.54846 18.5822 7.36867C18.0382 7.16482 17.4636 7.05459 16.8827 7.04269C16.1348 7.00931 15.8977 7 13.9992 7C12.1007 7 11.8574 7 11.1149 7.04269C10.5343 7.05468 9.95996 7.1649 9.41626 7.36867C8.9514 7.54833 8.52923 7.8229 8.17675 8.17479C7.82427 8.52668 7.54925 8.94815 7.36928 9.41224C7.16468 9.95487 7.05452 10.5284 7.04354 11.1081C7.01011 11.8555 7 12.0923 7 13.9876C7 15.8829 7 16.1251 7.04354 16.8671C7.0552 17.4476 7.16482 18.0204 7.36928 18.5645C7.54955 19.0284 7.82477 19.4497 8.17737 19.8015C8.52997 20.1532 8.95218 20.4277 9.41704 20.6073C9.95924 20.8193 10.5337 20.9374 11.1157 20.9565C11.8644 20.9899 12.1015 21 14 21C15.8985 21 16.1418 21 16.8843 20.9565C17.4651 20.9451 18.0398 20.8351 18.5837 20.6313C19.0484 20.4513 19.4704 20.1767 19.8228 19.8248C20.1753 19.473 20.4504 19.0517 20.6307 18.5878C20.8352 18.0445 20.9448 17.4717 20.9565 16.8903C20.9899 16.1437 21 15.907 21 14.0109C20.9984 12.1155 20.9984 11.8749 20.9549 11.1322ZM13.9946 17.5718C12.009 17.5718 10.4005 15.966 10.4005 13.9837C10.4005 12.0014 12.009 10.3956 13.9946 10.3956C14.9478 10.3956 15.8619 10.7736 16.5359 11.4465C17.21 12.1194 17.5886 13.0321 17.5886 13.9837C17.5886 14.9353 17.21 15.848 16.5359 16.5209C15.8619 17.1938 14.9478 17.5718 13.9946 17.5718ZM17.7317 11.0996C17.6216 11.0997 17.5126 11.0781 17.4108 11.0361C17.3091 10.9941 17.2167 10.9325 17.1388 10.8547C17.061 10.777 16.9993 10.6847 16.9572 10.5832C16.9151 10.4816 16.8935 10.3728 16.8936 10.2629C16.8936 10.1531 16.9153 10.0443 16.9574 9.94286C16.9995 9.84139 17.0612 9.7492 17.139 9.67154C17.2167 9.59389 17.3091 9.53229 17.4107 9.49026C17.5124 9.44823 17.6213 9.4266 17.7313 9.4266C17.8413 9.4266 17.9502 9.44823 18.0519 9.49026C18.1535 9.53229 18.2458 9.59389 18.3236 9.67154C18.4014 9.7492 18.4631 9.84139 18.5052 9.94286C18.5473 10.0443 18.569 10.1531 18.569 10.2629C18.569 10.7255 18.1942 11.0996 17.7317 11.0996Z\" fill=\"white\"></path><path d=\"M13.9967 16.3146C15.2861 16.3146 16.3314 15.2711 16.3314 13.9838C16.3314 12.6966 15.2861 11.6531 13.9967 11.6531C12.7074 11.6531 11.6621 12.6966 11.6621 13.9838C11.6621 15.2711 12.7074 16.3146 13.9967 16.3146Z\" fill=\"white\"></path><defs><radialGradient id=\"paint0_radial_8951_20220\" cx=\"0\" cy=\"0\" r=\"1\" gradientUnits=\"userSpaceOnUse\" gradientTransform=\"translate(-0.70949 28.109) scale(51.7885)\"><stop stop-color=\"#F4EC55\"></stop><stop offset=\"0.2412\" stop-color=\"#E48242\"></stop><stop offset=\"0.3463\" stop-color=\"#D66863\"></stop><stop offset=\"0.4422\" stop-color=\"#CD4F74\"></stop><stop offset=\"0.4888\" stop-color=\"#C94379\"></stop><stop offset=\"1\" stop-color=\"#3F56A6\"></stop></radialGradient></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/instagram.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/instagram.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20.95 8.324C20.9399 7.56662 20.7981 6.81678 20.531 6.108C20.2993 5.51015 19.9455 4.9672 19.4922 4.51383C19.0388 4.06046 18.4958 3.70665 17.898 3.475C17.1983 3.21236 16.4592 3.07034 15.712 3.055C14.75 3.012 14.445 3 12.003 3C9.561 3 9.248 3 8.293 3.055C7.54616 3.07045 6.80735 3.21247 6.108 3.475C5.51006 3.70649 4.96702 4.06024 4.51363 4.51363C4.06024 4.96702 3.70649 5.51006 3.475 6.108C3.21183 6.80713 3.07012 7.54611 3.056 8.293C3.013 9.256 3 9.561 3 12.003C3 14.445 3 14.757 3.056 15.713C3.071 16.461 3.212 17.199 3.475 17.9C3.70688 18.4978 4.0609 19.0406 4.51444 19.4938C4.96798 19.947 5.51106 20.3006 6.109 20.532C6.80643 20.8052 7.54537 20.9574 8.294 20.982C9.257 21.025 9.562 21.038 12.004 21.038C14.446 21.038 14.759 21.038 15.714 20.982C16.4612 20.9673 17.2004 20.8256 17.9 20.563C18.4977 20.3311 19.0405 19.9772 19.4938 19.5238C19.9472 19.0705 20.3011 18.5277 20.533 17.93C20.796 17.23 20.937 16.492 20.952 15.743C20.995 14.781 21.008 14.476 21.008 12.033C21.006 9.591 21.006 9.281 20.95 8.324V8.324ZM11.997 16.621C9.443 16.621 7.374 14.552 7.374 11.998C7.374 9.444 9.443 7.375 11.997 7.375C13.2231 7.375 14.399 7.86207 15.266 8.72905C16.1329 9.59603 16.62 10.7719 16.62 11.998C16.62 13.2241 16.1329 14.4 15.266 15.267C14.399 16.1339 13.2231 16.621 11.997 16.621V16.621ZM16.804 8.282C16.6624 8.28213 16.5222 8.25434 16.3913 8.20021C16.2605 8.14608 16.1416 8.06668 16.0414 7.96655C15.9413 7.86643 15.8619 7.74754 15.8078 7.61669C15.7537 7.48584 15.7259 7.3456 15.726 7.204C15.726 7.0625 15.7539 6.92239 15.808 6.79166C15.8622 6.66093 15.9415 6.54215 16.0416 6.44209C16.1416 6.34204 16.2604 6.26267 16.3912 6.20852C16.5219 6.15437 16.662 6.1265 16.8035 6.1265C16.945 6.1265 17.0851 6.15437 17.2158 6.20852C17.3466 6.26267 17.4654 6.34204 17.5654 6.44209C17.6655 6.54215 17.7448 6.66093 17.799 6.79166C17.8531 6.92239 17.881 7.0625 17.881 7.204C17.881 7.8 17.399 8.282 16.804 8.282Z\" fill=\"currentcolor\"></path><path d=\"M12.0059 15.0255C13.6644 15.0255 15.0089 13.681 15.0089 12.0225C15.0089 10.364 13.6644 9.01953 12.0059 9.01953C10.3474 9.01953 9.00293 10.364 9.00293 12.0225C9.00293 13.681 10.3474 15.0255 12.0059 15.0255Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/landscape.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/landscape.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20205)\"><path d=\"M11.27 12.216L15 6L23 21H2L9 8L11.27 12.216V12.216ZM12.39 14.238L14.987 19H19.667L14.897 10.058L12.39 14.238V14.238ZM5.348 19H12.652L9 12.219L5.348 19ZM5.5 8C4.83696 8 4.20107 7.73661 3.73223 7.26777C3.26339 6.79893 3 6.16304 3 5.5C3 4.83696 3.26339 4.20107 3.73223 3.73223C4.20107 3.26339 4.83696 3 5.5 3C6.16304 3 6.79893 3.26339 7.26777 3.73223C7.73661 4.20107 8 4.83696 8 5.5C8 6.16304 7.73661 6.79893 7.26777 7.26777C6.79893 7.73661 6.16304 8 5.5 8Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20205\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/layout-1.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/layout-1.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20198)\"><path d=\"M21 20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H20C20.2652 3 20.5196 3.10536 20.7071 3.29289C20.8946 3.48043 21 3.73478 21 4V20ZM11 5H5V19H11V5ZM19 13H13V19H19V13ZM19 5H13V11H19V5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20198\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/layout-2.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/layout-2.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8943_20228)\"><path d=\"M22 20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20ZM11 15H4V19H11V15ZM20 11H13V19H20V11ZM11 5H4V13H11V5ZM20 5H13V9H20V5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8943_20228\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/layout-3.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/layout-3.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20200)\"><path d=\"M21 3C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21ZM15 5H4V19H15V5ZM20 5H17V19H20V5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20200\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/layout-4.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/layout-4.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20201)\"><path d=\"M21 3C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21ZM7 5H4V19H7V5ZM20 5H9V19H20V5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20201\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/line-chart.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/line-chart.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20216)\"><path d=\"M5 3V19H21V21H3V3H5ZM20.293 6.293L21.707 7.707L16 13.414L13 10.415L8.707 14.707L7.293 13.293L13 7.586L16 10.585L20.293 6.293V6.293Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20216\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/linkedin-fullcolor.svg":
/*!*****************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/linkedin-fullcolor.svg ***!
  \*****************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 28 28\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"14\" cy=\"14\" r=\"14\" fill=\"#0072B1\"></circle><path d=\"M10.9391 10.7951H8.32227V18.6665H10.9391V10.7951Z\" fill=\"white\"></path><path d=\"M9.64679 7C8.75148 7 8.1665 7.58861 8.1665 8.36009C8.1665 9.11536 8.73369 9.72021 9.61215 9.72021H9.62906C10.5415 9.72021 11.1095 9.11536 11.1095 8.36009C11.0925 7.58861 10.5416 7 9.64679 7Z\" fill=\"white\"></path><path d=\"M17.3638 10.6101C15.9757 10.6101 15.354 11.3735 15.0058 11.9097V10.7952H12.3896C12.4243 11.5335 12.3896 18.6666 12.3896 18.6666H15.0058V14.2706C15.0058 14.0353 15.0227 13.8001 15.0921 13.6319C15.2809 13.162 15.7116 12.6753 16.4345 12.6753C17.3807 12.6753 17.7599 13.3974 17.7599 14.4551V18.6666H20.3761V14.1527C20.3761 11.7348 19.0852 10.6101 17.3638 10.6101Z\" fill=\"white\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/linkedin.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/linkedin.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M4 0C1.79086 0 0 1.79086 0 4V16C0 18.2091 1.79086 20 4 20H16C18.2091 20 20 18.2091 20 16V4C20 1.79086 18.2091 0 16 0H4ZM3.17854 7.2289H6.17914V16H3.17854V7.2289ZM4.69735 3C3.67076 3 3 3.65589 3 4.51554C3 5.35714 3.65036 6.03112 4.65764 6.03112H4.67703C5.72328 6.03112 6.37452 5.35714 6.37452 4.51554C6.3551 3.65589 5.72335 3 4.69735 3ZM10.8422 8.47081C11.2414 7.87334 11.9543 7.02273 13.546 7.02273C15.5198 7.02273 17 8.27602 17 10.9702V16H14.0001V11.3071C14.0001 10.1285 13.5654 9.32394 12.4803 9.32394C11.6515 9.32394 11.1576 9.86633 10.9411 10.3899C10.8615 10.5773 10.8422 10.8394 10.8422 11.1016V16H7.84237C7.84237 16 7.88215 8.05171 7.84237 7.22898H10.8422V8.47081Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/list.svg":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/list.svg ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20240)\"><path d=\"M8 4H21V6H8V4ZM3 3.5H6V6.5H3V3.5ZM3 10.5H6V13.5H3V10.5ZM3 17.5H6V20.5H3V17.5ZM8 11H21V13H8V11ZM8 18H21V20H8V18Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20240\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/loader.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/loader.svg ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 2.00009V6.00009\" stroke=\"currentcolor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M12 18V22\" stroke=\"currentcolor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M4.92969 4.92999L7.75969 7.75999\" stroke=\"currentcolor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M16.2397 16.24L19.0697 19.07\" stroke=\"currentcolor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M2 12H6\" stroke=\"currentcolor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M18 12H22\" stroke=\"currentcolor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M4.92969 19.07L7.75969 16.24\" stroke=\"currentcolor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path><path d=\"M16.2397 7.75999L19.0697 4.92999\" stroke=\"currentcolor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/location.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/location.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8951_20238)\"><path d=\"M12 20.9L16.95 15.95C17.9289 14.971 18.5955 13.7237 18.8656 12.3659C19.1356 11.008 18.9969 9.60059 18.4671 8.32155C17.9373 7.04251 17.04 5.9493 15.8889 5.18017C14.7378 4.41103 13.3844 4.0005 12 4.0005C10.6156 4.0005 9.26222 4.41103 8.11109 5.18017C6.95996 5.9493 6.06275 7.04251 5.53292 8.32155C5.00308 9.60059 4.86442 11.008 5.13445 12.3659C5.40449 13.7237 6.07111 14.971 7.05 15.95L12 20.9ZM12 23.728L5.636 17.364C4.37734 16.1053 3.52019 14.5017 3.17293 12.7558C2.82567 11.01 3.00391 9.20043 3.6851 7.5559C4.36629 5.91137 5.51984 4.50577 6.99988 3.51684C8.47992 2.52791 10.22 2.00008 12 2.00008C13.78 2.00008 15.5201 2.52791 17.0001 3.51684C18.4802 4.50577 19.6337 5.91137 20.3149 7.5559C20.9961 9.20043 21.1743 11.01 20.8271 12.7558C20.4798 14.5017 19.6227 16.1053 18.364 17.364L12 23.728ZM12 13C12.5304 13 13.0391 12.7893 13.4142 12.4142C13.7893 12.0391 14 11.5304 14 11C14 10.4696 13.7893 9.96086 13.4142 9.58578C13.0391 9.21071 12.5304 9 12 9C11.4696 9 10.9609 9.21071 10.5858 9.58578C10.2107 9.96086 10 10.4696 10 11C10 11.5304 10.2107 12.0391 10.5858 12.4142C10.9609 12.7893 11.4696 13 12 13ZM12 15C10.9391 15 9.92172 14.5786 9.17158 13.8284C8.42143 13.0783 8 12.0609 8 11C8 9.93913 8.42143 8.92172 9.17158 8.17157C9.92172 7.42142 10.9391 7 12 7C13.0609 7 14.0783 7.42142 14.8284 8.17157C15.5786 8.92172 16 9.93913 16 11C16 12.0609 15.5786 13.0783 14.8284 13.8284C14.0783 14.5786 13.0609 15 12 15Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8951_20238\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/login.svg":
/*!****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/login.svg ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_9211_20553)\"><path d=\"M4 18H6V20H18V4H6V6H4V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V18Z\" fill=\"currentcolor\"></path><path d=\"M13 12L8 16L8 13L1 13L1 11L8 11L8 8L13 12Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_9211_20553\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/logout.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/logout.svg ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20230)\"><path d=\"M4 18H6V20H18V4H6V6H4V3C4 2.73478 4.10536 2.48043 4.29289 2.29289C4.48043 2.10536 4.73478 2 5 2H19C19.2652 2 19.5196 2.10536 19.7071 2.29289C19.8946 2.48043 20 2.73478 20 3V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V18ZM6 11H13V13H6V16L1 12L6 8V11Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20230\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/mail-add.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/mail-add.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20174)\"><path d=\"M22 13H20V7.238L12.072 14.338L4 7.216V19H14V21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V13ZM4.511 5L12.061 11.662L19.502 5H4.511ZM21 18H24V20H21V23H19V20H16V18H19V15H21V18Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20174\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/mail-check.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/mail-check.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20173)\"><path d=\"M22 14H20V7.238L12.072 14.338L4 7.216V19H14V21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V14ZM4.511 5L12.061 11.662L19.502 5H4.511ZM19 22L15.464 18.464L16.879 17.05L19 19.172L22.536 15.636L23.95 17.05L19 22Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20173\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/marketplace.svg":
/*!**********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/marketplace.svg ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8156_19316)\"><path d=\"M21 13.242V20H22V22H2V20H3V13.242C2.38437 12.8311 1.87971 12.2745 1.53082 11.6218C1.18193 10.969 0.999592 10.2402 1 9.5C1 8.673 1.224 7.876 1.633 7.197L4.345 2.5C4.43277 2.34798 4.559 2.22175 4.71101 2.13398C4.86303 2.04621 5.03547 2 5.211 2H18.79C18.9655 2 19.138 2.04621 19.29 2.13398C19.442 2.22175 19.5682 2.34798 19.656 2.5L22.358 7.182C22.9546 8.17287 23.1463 9.35553 22.8934 10.4841C22.6405 11.6127 21.9624 12.6005 21 13.242ZM19 13.972C18.3124 14.0491 17.6163 13.9665 16.9659 13.7307C16.3155 13.4948 15.7283 13.1119 15.25 12.612C14.8302 13.0511 14.3258 13.4005 13.7672 13.6393C13.2086 13.878 12.6075 14.001 12 14.001C11.3927 14.0013 10.7916 13.8786 10.233 13.6402C9.67445 13.4018 9.16996 13.0527 8.75 12.614C8.27163 13.1138 7.68437 13.4964 7.03395 13.7321C6.38353 13.9678 5.68749 14.0503 5 13.973V20H19V13.973V13.972ZM5.789 4L3.356 8.213C3.11958 8.79714 3.11248 9.44903 3.33613 10.0382C3.55978 10.6273 3.99768 11.1103 4.56218 11.3904C5.12668 11.6705 5.77614 11.7271 6.38058 11.5488C6.98502 11.3706 7.49984 10.9706 7.822 10.429C8.157 9.592 9.342 9.592 9.678 10.429C9.8633 10.8934 10.1836 11.2916 10.5975 11.5721C11.0115 11.8526 11.5 12.0025 12 12.0025C12.5 12.0025 12.9885 11.8526 13.4025 11.5721C13.8164 11.2916 14.1367 10.8934 14.322 10.429C14.657 9.592 15.842 9.592 16.178 10.429C16.3078 10.7484 16.5022 11.0376 16.7491 11.2783C16.996 11.519 17.2901 11.706 17.6127 11.8275C17.9354 11.9491 18.2797 12.0026 18.6241 11.9847C18.9684 11.9668 19.3053 11.8778 19.6136 11.7234C19.9219 11.569 20.1949 11.3525 20.4155 11.0875C20.6361 10.8225 20.7995 10.5148 20.8955 10.1836C20.9914 9.85238 21.0178 9.50493 20.973 9.16305C20.9281 8.82118 20.8131 8.49227 20.635 8.197L18.21 4H5.79H5.789Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8156_19316\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/menu-kebab.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/menu-kebab.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 3C11.175 3 10.5 3.675 10.5 4.5C10.5 5.325 11.175 6 12 6C12.825 6 13.5 5.325 13.5 4.5C13.5 3.675 12.825 3 12 3ZM12 18C11.175 18 10.5 18.675 10.5 19.5C10.5 20.325 11.175 21 12 21C12.825 21 13.5 20.325 13.5 19.5C13.5 18.675 12.825 18 12 18ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/menu-meatball.svg":
/*!************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/menu-meatball.svg ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20247)\"><path d=\"M4.5 10.5C3.675 10.5 3 11.175 3 12C3 12.825 3.675 13.5 4.5 13.5C5.325 13.5 6 12.825 6 12C6 11.175 5.325 10.5 4.5 10.5ZM19.5 10.5C18.675 10.5 18 11.175 18 12C18 12.825 18.675 13.5 19.5 13.5C20.325 13.5 21 12.825 21 12C21 11.175 20.325 10.5 19.5 10.5ZM12 10.5C11.175 10.5 10.5 11.175 10.5 12C10.5 12.825 11.175 13.5 12 13.5C12.825 13.5 13.5 12.825 13.5 12C13.5 11.175 12.825 10.5 12 10.5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20247\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/messages.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/messages.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 18H4V8L12 13L20 8V18ZM12 11L4 6H20L12 11Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/movie.svg":
/*!****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/movie.svg ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20208)\"><path d=\"M2 3.993C2.00183 3.73038 2.1069 3.47902 2.29251 3.29322C2.47813 3.10742 2.72938 3.00209 2.992 3H21.008C21.556 3 22 3.445 22 3.993V20.007C21.9982 20.2696 21.8931 20.521 21.7075 20.7068C21.5219 20.8926 21.2706 20.9979 21.008 21H2.992C2.72881 20.9997 2.4765 20.895 2.29049 20.7088C2.10448 20.5226 2 20.2702 2 20.007V3.993ZM4 5V19H20V5H4ZM10.622 8.415L15.501 11.667C15.5559 11.7035 15.6009 11.753 15.632 11.8111C15.6631 11.8692 15.6794 11.9341 15.6794 12C15.6794 12.0659 15.6631 12.1308 15.632 12.1889C15.6009 12.247 15.5559 12.2965 15.501 12.333L10.621 15.585C10.5608 15.6249 10.491 15.6477 10.4189 15.6512C10.3468 15.6546 10.2751 15.6384 10.2114 15.6043C10.1477 15.5703 10.0945 15.5197 10.0573 15.4578C10.02 15.396 10.0003 15.3252 10 15.253V8.747C10.0001 8.67465 10.0199 8.60369 10.0572 8.54168C10.0944 8.47967 10.1478 8.42893 10.2116 8.39486C10.2755 8.36079 10.3473 8.34467 10.4196 8.34822C10.4919 8.35177 10.5618 8.37485 10.622 8.415V8.415Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20208\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/my-network.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/my-network.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12 12.1C13.1935 12.1 14.3381 12.5741 15.182 13.418C16.0259 14.2619 16.5 15.4065 16.5 16.6V22H14.7V16.6C14.7 15.9113 14.4369 15.2486 13.9644 14.7476C13.492 14.2465 12.8459 13.9449 12.1584 13.9045L12 13.9C11.3113 13.9 10.6486 14.1631 10.1476 14.6356C9.64649 15.108 9.3449 15.7541 9.3045 16.4416L9.3 16.6V22H7.5V16.6C7.5 15.4065 7.97411 14.2619 8.81802 13.418C9.66193 12.5741 10.8065 12.1 12 12.1ZM6.15 14.8C6.4011 14.8 6.645 14.8297 6.879 14.8846C6.72512 15.3427 6.63399 15.8195 6.6081 16.3021L6.6 16.6V16.6774C6.49655 16.6404 6.38894 16.6162 6.2796 16.6054L6.15 16.6C5.81441 16.6 5.49085 16.725 5.24242 16.9507C4.994 17.1763 4.83852 17.4864 4.8063 17.8204L4.8 17.95V22H3V17.95C3 17.1146 3.33187 16.3134 3.92261 15.7226C4.51335 15.1319 5.31457 14.8 6.15 14.8ZM17.85 14.8C18.6854 14.8 19.4866 15.1319 20.0774 15.7226C20.6681 16.3134 21 17.1146 21 17.95V22H19.2V17.95C19.2 17.6144 19.075 17.2908 18.8493 17.0424C18.6237 16.794 18.3136 16.6385 17.9796 16.6063L17.85 16.6C17.6925 16.6 17.5413 16.627 17.4 16.6765V16.6C17.4 16.0006 17.3028 15.4246 17.1219 14.8864C17.355 14.8297 17.5989 14.8 17.85 14.8ZM6.15 9.4C6.74674 9.4 7.31903 9.63705 7.74099 10.059C8.16295 10.481 8.4 11.0533 8.4 11.65C8.4 12.2467 8.16295 12.819 7.74099 13.241C7.31903 13.6629 6.74674 13.9 6.15 13.9C5.55326 13.9 4.98097 13.6629 4.55901 13.241C4.13705 12.819 3.9 12.2467 3.9 11.65C3.9 11.0533 4.13705 10.481 4.55901 10.059C4.98097 9.63705 5.55326 9.4 6.15 9.4ZM17.85 9.4C18.4467 9.4 19.019 9.63705 19.441 10.059C19.8629 10.481 20.1 11.0533 20.1 11.65C20.1 12.2467 19.8629 12.819 19.441 13.241C19.019 13.6629 18.4467 13.9 17.85 13.9C17.2533 13.9 16.681 13.6629 16.259 13.241C15.8371 12.819 15.6 12.2467 15.6 11.65C15.6 11.0533 15.8371 10.481 16.259 10.059C16.681 9.63705 17.2533 9.4 17.85 9.4ZM6.15 11.2C6.03065 11.2 5.91619 11.2474 5.8318 11.3318C5.74741 11.4162 5.7 11.5307 5.7 11.65C5.7 11.7693 5.74741 11.8838 5.8318 11.9682C5.91619 12.0526 6.03065 12.1 6.15 12.1C6.26935 12.1 6.38381 12.0526 6.4682 11.9682C6.55259 11.8838 6.6 11.7693 6.6 11.65C6.6 11.5307 6.55259 11.4162 6.4682 11.3318C6.38381 11.2474 6.26935 11.2 6.15 11.2ZM17.85 11.2C17.7307 11.2 17.6162 11.2474 17.5318 11.3318C17.4474 11.4162 17.4 11.5307 17.4 11.65C17.4 11.7693 17.4474 11.8838 17.5318 11.9682C17.6162 12.0526 17.7307 12.1 17.85 12.1C17.9693 12.1 18.0838 12.0526 18.1682 11.9682C18.2526 11.8838 18.3 11.7693 18.3 11.65C18.3 11.5307 18.2526 11.4162 18.1682 11.3318C18.0838 11.2474 17.9693 11.2 17.85 11.2ZM12 4C12.9548 4 13.8705 4.37928 14.5456 5.05442C15.2207 5.72955 15.6 6.64522 15.6 7.6C15.6 8.55478 15.2207 9.47045 14.5456 10.1456C13.8705 10.8207 12.9548 11.2 12 11.2C11.0452 11.2 10.1295 10.8207 9.45442 10.1456C8.77928 9.47045 8.4 8.55478 8.4 7.6C8.4 6.64522 8.77928 5.72955 9.45442 5.05442C10.1295 4.37928 11.0452 4 12 4ZM12 5.8C11.5226 5.8 11.0648 5.98964 10.7272 6.32721C10.3896 6.66477 10.2 7.12261 10.2 7.6C10.2 8.07739 10.3896 8.53523 10.7272 8.87279C11.0648 9.21036 11.5226 9.4 12 9.4C12.4774 9.4 12.9352 9.21036 13.2728 8.87279C13.6104 8.53523 13.8 8.07739 13.8 7.6C13.8 7.12261 13.6104 6.66477 13.2728 6.32721C12.9352 5.98964 12.4774 5.8 12 5.8Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/new-window.svg":
/*!*********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/new-window.svg ***!
  \*********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20172)\"><path d=\"M10 3V5H5V19H19V14H21V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3H10ZM17.586 5H13V3H21V11H19V6.414L12 13.414L10.586 12L17.586 5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20172\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/newsfeed-slash.svg":
/*!*************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/newsfeed-slash.svg ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 26\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M3.50134 3.26544V3.26538L5.50134 5.26538V5.26544L7.50134 7.26544V7.26538L10.236 10H10.2359L12.2359 12H12.236L14.236 14H14.2359L16.2359 16H16.236L17.5013 17.2654V17.2654L19.5013 19.2654V19.2654L21.4729 21.2369C21.4729 21.2369 21.4729 21.2369 21.4729 21.237L22.5886 22.3527L21.1743 23.7669L19.4075 22H4.50134C4.23613 22 3.98177 21.8946 3.79424 21.7071C3.6067 21.5196 3.50134 21.2652 3.50134 21V6.09387L1 3.59253L2.41421 2.17832L3.50134 3.26544ZM5.50134 8.09387V20H17.4075L15.4075 18H7.50134V16H13.4075L11.4075 14H7.50134V12H9.40747L5.50134 8.09387ZM9.06439 6L11.5013 8.43695V6H9.06439ZM15.0644 12L17.0644 14H17.5013V12H15.0644ZM19.5013 4V16.437L21.5013 18.437V3C21.5013 2.73478 21.396 2.48043 21.2085 2.29289C21.0209 2.10536 20.7666 2 20.5013 2H5.06439L7.06439 4H19.5013ZM13.5013 7H17.5013V9H13.5013V7Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/newsfeed.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/newsfeed.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M5 8V20H19V8H5ZM5 6H19V4H5V6ZM20 22H4C3.73478 22 3.48043 21.8946 3.29289 21.7071C3.10536 21.5196 3 21.2652 3 21V3C3 2.73478 3.10536 2.48043 3.29289 2.29289C3.48043 2.10536 3.73478 2 4 2H20C20.2652 2 20.5196 2.10536 20.7071 2.29289C20.8946 2.48043 21 2.73478 21 3V21C21 21.2652 20.8946 21.5196 20.7071 21.7071C20.5196 21.8946 20.2652 22 20 22ZM7 10H11V14H7V10ZM7 16H17V18H7V16ZM13 11H17V13H13V11Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/newspaper.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/newspaper.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20182)\"><path d=\"M16 20V4H4V19C4 19.2652 4.10536 19.5196 4.29289 19.7071C4.48043 19.8946 4.73478 20 5 20H16ZM19 22H5C4.20435 22 3.44129 21.6839 2.87868 21.1213C2.31607 20.5587 2 19.7956 2 19V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V10H22V19C22 19.7956 21.6839 20.5587 21.1213 21.1213C20.5587 21.6839 19.7956 22 19 22ZM18 12V19C18 19.2652 18.1054 19.5196 18.2929 19.7071C18.4804 19.8946 18.7348 20 19 20C19.2652 20 19.5196 19.8946 19.7071 19.7071C19.8946 19.5196 20 19.2652 20 19V12H18ZM6 6H12V12H6V6ZM8 8V10H10V8H8ZM6 13H14V15H6V13ZM6 16H14V18H6V16Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20182\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/next.svg":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/next.svg ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20237)\"><path d=\"M18.172 7.00005H11C9.4087 7.00005 7.88258 7.63219 6.75736 8.75741C5.63214 9.88263 5 11.4087 5 13C5 14.5913 5.63214 16.1175 6.75736 17.2427C7.88258 18.3679 9.4087 19 11 19H20V21H11C8.87827 21 6.84344 20.1572 5.34315 18.6569C3.84285 17.1566 3 15.1218 3 13C3 10.8783 3.84285 8.84349 5.34315 7.34319C6.84344 5.8429 8.87827 5.00005 11 5.00005H18.172L15.636 2.46405L17.05 1.05005L22 6.00005L17.05 10.95L15.636 9.53605L18.172 7.00005Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20237\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/node-tree.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/node-tree.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20220)\"><path d=\"M10 2C10.552 2 11 2.448 11 3V7C11 7.552 10.552 8 10 8H8V10H13V9C13 8.448 13.448 8 14 8H20C20.552 8 21 8.448 21 9V13C21 13.552 20.552 14 20 14H14C13.448 14 13 13.552 13 13V12H8V18H13V17C13 16.448 13.448 16 14 16H20C20.552 16 21 16.448 21 17V21C21 21.552 20.552 22 20 22H14C13.448 22 13 21.552 13 21V20H7C6.448 20 6 19.552 6 19V8H4C3.448 8 3 7.552 3 7V3C3 2.448 3.448 2 4 2H10ZM19 18H15V20H19V18ZM19 10H15V12H19V10ZM9 4H5V6H9V4Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20220\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/notifications.svg":
/*!************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/notifications.svg ***!
  \************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8156_19321)\"><path d=\"M22 19H2V17H3V10.031C3 5.043 7.03 1 12 1C16.97 1 21 5.043 21 10.031V17H22V19ZM5 17H19V10.031C19 6.148 15.866 3 12 3C8.134 3 5 6.148 5 10.031V17ZM9.5 20H14.5C14.5 20.663 14.2366 21.2989 13.7678 21.7678C13.2989 22.2366 12.663 22.5 12 22.5C11.337 22.5 10.7011 22.2366 10.2322 21.7678C9.76339 21.2989 9.5 20.663 9.5 20Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8156_19321\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/paragraph.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/paragraph.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20257)\"><path d=\"M12 6V21H10V16C8.4087 16 6.88258 15.3679 5.75736 14.2426C4.63214 13.1174 4 11.5913 4 10C4 8.4087 4.63214 6.88258 5.75736 5.75736C6.88258 4.63214 8.4087 4 10 4H20V6H17V21H15V6H12ZM10 6C8.93913 6 7.92172 6.42143 7.17157 7.17157C6.42143 7.92172 6 8.93913 6 10C6 11.0609 6.42143 12.0783 7.17157 12.8284C7.92172 13.5786 8.93913 14 10 14V6Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20257\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/picture.svg":
/*!******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/picture.svg ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20206)\"><path d=\"M4.828 21L4.808 21.02L4.787 21H2.992C2.72881 20.9997 2.4765 20.895 2.29049 20.7088C2.10448 20.5226 2 20.2702 2 20.007V3.993C2.00183 3.73038 2.1069 3.47902 2.29251 3.29322C2.47813 3.10742 2.72938 3.00209 2.992 3H21.008C21.556 3 22 3.445 22 3.993V20.007C21.9982 20.2696 21.8931 20.521 21.7075 20.7068C21.5219 20.8926 21.2706 20.9979 21.008 21H4.828V21ZM20 15V5H4V19L14 9L20 15ZM20 17.828L14 11.828L6.828 19H20V17.828ZM8 11C7.46957 11 6.96086 10.7893 6.58579 10.4142C6.21071 10.0391 6 9.53043 6 9C6 8.46957 6.21071 7.96086 6.58579 7.58579C6.96086 7.21071 7.46957 7 8 7C8.53043 7 9.03914 7.21071 9.41421 7.58579C9.78929 7.96086 10 8.46957 10 9C10 9.53043 9.78929 10.0391 9.41421 10.4142C9.03914 10.7893 8.53043 11 8 11Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20206\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/pie-chart.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/pie-chart.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20215)\"><path d=\"M12 22C6.477 22 2 17.523 2 12C2 7.522 4.943 3.732 9 2.458V4.582C7.28092 5.28004 5.8578 6.55371 4.97406 8.18512C4.09032 9.81652 3.80088 11.7043 4.15525 13.5255C4.50963 15.3468 5.48579 16.9883 6.91676 18.1693C8.34774 19.3503 10.1446 19.9975 12 20C13.5938 20 15.1513 19.524 16.4728 18.6332C17.7944 17.7424 18.82 16.4773 19.418 15H21.542C20.268 19.057 16.478 22 12 22V22ZM21.95 13H11V2.05C11.329 2.017 11.663 2 12 2C17.523 2 22 6.477 22 12C22 12.337 21.983 12.671 21.95 13ZM13 4.062V11H19.938C19.7154 9.23761 18.9129 7.59934 17.6568 6.34324C16.4007 5.08713 14.7624 4.28459 13 4.062Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20215\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/play-circle.svg":
/*!**********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/play-circle.svg ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20209)\"><path d=\"M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20V20ZM10.622 8.415L15.501 11.667C15.5559 11.7035 15.6009 11.753 15.632 11.8111C15.6631 11.8692 15.6794 11.9341 15.6794 12C15.6794 12.0659 15.6631 12.1308 15.632 12.1889C15.6009 12.247 15.5559 12.2965 15.501 12.333L10.621 15.585C10.5608 15.6249 10.491 15.6477 10.4189 15.6512C10.3468 15.6546 10.2751 15.6384 10.2114 15.6043C10.1477 15.5703 10.0945 15.5197 10.0573 15.4578C10.02 15.396 10.0003 15.3252 10 15.253V8.747C10.0001 8.67465 10.0199 8.60369 10.0572 8.54168C10.0944 8.47967 10.1478 8.42893 10.2116 8.39486C10.2755 8.36079 10.3473 8.34467 10.4196 8.34822C10.4919 8.35177 10.5618 8.37485 10.622 8.415V8.415Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20209\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/previous.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/previous.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20236)\"><path d=\"M5.828 7.00005L8.364 9.53605L6.95 10.95L2 6.00005L6.95 1.05005L8.364 2.46405L5.828 5.00005H13C15.1217 5.00005 17.1566 5.8429 18.6569 7.34319C20.1571 8.84349 21 10.8783 21 13C21 15.1218 20.1571 17.1566 18.6569 18.6569C17.1566 20.1572 15.1217 21 13 21H4V19H13C14.5913 19 16.1174 18.3679 17.2426 17.2427C18.3679 16.1175 19 14.5913 19 13C19 11.4087 18.3679 9.88263 17.2426 8.75741C16.1174 7.63219 14.5913 7.00005 13 7.00005H5.828Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20236\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/printer.svg":
/*!******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/printer.svg ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20203)\"><path d=\"M6 19H3C2.73478 19 2.48043 18.8946 2.29289 18.7071C2.10536 18.5196 2 18.2652 2 18V8C2 7.73478 2.10536 7.48043 2.29289 7.29289C2.48043 7.10536 2.73478 7 3 7H6V3C6 2.73478 6.10536 2.48043 6.29289 2.29289C6.48043 2.10536 6.73478 2 7 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V7H21C21.2652 7 21.5196 7.10536 21.7071 7.29289C21.8946 7.48043 22 7.73478 22 8V18C22 18.2652 21.8946 18.5196 21.7071 18.7071C21.5196 18.8946 21.2652 19 21 19H18V21C18 21.2652 17.8946 21.5196 17.7071 21.7071C17.5196 21.8946 17.2652 22 17 22H7C6.73478 22 6.48043 21.8946 6.29289 21.7071C6.10536 21.5196 6 21.2652 6 21V19ZM6 17V16C6 15.7348 6.10536 15.4804 6.29289 15.2929C6.48043 15.1054 6.73478 15 7 15H17C17.2652 15 17.5196 15.1054 17.7071 15.2929C17.8946 15.4804 18 15.7348 18 16V17H20V9H4V17H6ZM8 4V7H16V4H8ZM8 17V20H16V17H8ZM5 10H8V12H5V10Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20203\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/projects.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/projects.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8156_19317)\"><g clip-path=\"url(#clip1_8156_19317)\"><path d=\"M6 7V4C6 3.73478 6.10536 3.48043 6.29289 3.29289C6.48043 3.10536 6.73478 3 7 3H13.414L15.414 5H21C21.2652 5 21.5196 5.10536 21.7071 5.29289C21.8946 5.48043 22 5.73478 22 6V16C22 16.2652 21.8946 16.5196 21.7071 16.7071C21.5196 16.8946 21.2652 17 21 17H18V20C18 20.2652 17.8946 20.5196 17.7071 20.7071C17.5196 20.8946 17.2652 21 17 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V8C2 7.73478 2.10536 7.48043 2.29289 7.29289C2.48043 7.10536 2.73478 7 3 7H6ZM6 9H4V19H16V17H6V9ZM8 5V15H20V7H14.586L12.586 5H8Z\" fill=\"currentcolor\"></path></g></g><defs><clipPath id=\"clip0_8156_19317\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath><clipPath id=\"clip1_8156_19317\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/question-answer.svg":
/*!**************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/question-answer.svg ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20196)\"><path d=\"M5.455 15L1 18.5V3C1 2.73478 1.10536 2.48043 1.29289 2.29289C1.48043 2.10536 1.73478 2 2 2H17C17.2652 2 17.5196 2.10536 17.7071 2.29289C17.8946 2.48043 18 2.73478 18 3V15H5.455ZM4.763 13H16V4H3V14.385L4.763 13ZM8 17H18.237L20 18.385V8H21C21.2652 8 21.5196 8.10536 21.7071 8.29289C21.8946 8.48043 22 8.73478 22 9V22.5L17.545 19H9C8.73478 19 8.48043 18.8946 8.29289 18.7071C8.10536 18.5196 8 18.2652 8 18V17Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20196\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/reddit-fullcolor.svg":
/*!***************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/reddit-fullcolor.svg ***!
  \***************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 28 28\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_9223_20541)\"><path d=\"M13.9843 27.8148C21.6226 27.8148 27.8147 21.6227 27.8147 13.9843C27.8147 6.34595 21.6226 0.153839 13.9843 0.153839C6.34592 0.153839 0.153809 6.34595 0.153809 13.9843C0.153809 21.6227 6.34592 27.8148 13.9843 27.8148Z\" fill=\"#FF4500\"></path><path d=\"M21.9997 14.1057C21.964 13.1537 21.1516 12.4102 20.1813 12.4425C19.7513 12.4572 19.3423 12.6306 19.0319 12.9214C17.6643 12.0045 16.0578 11.5019 14.4065 11.4667L15.1857 7.7787L17.7567 8.31071C17.8282 8.96015 18.4195 9.43041 19.0794 9.35974C19.7393 9.28933 20.2171 8.70741 20.1453 8.05797C20.0735 7.40853 19.4825 6.93827 18.8226 7.00894C18.4432 7.04703 18.1029 7.26456 17.915 7.58797L14.9708 7.00894C14.7709 6.9648 14.5707 7.08828 14.5259 7.28821C14.5259 7.2911 14.5259 7.2911 14.5259 7.29399L13.6391 11.3963C11.9669 11.4229 10.3397 11.9283 8.95422 12.851C8.2495 12.1987 7.13875 12.231 6.47593 12.9275C5.81311 13.621 5.84594 14.7142 6.55361 15.3665C6.69108 15.4929 6.84911 15.6017 7.0253 15.6781C7.01328 15.8515 7.01328 16.0249 7.0253 16.1983C7.0253 18.846 10.1605 21 14.0272 21C17.8939 21 21.0291 18.8489 21.0291 16.1983C21.0411 16.0249 21.0411 15.8515 21.0291 15.6781C21.6324 15.3812 22.0117 14.7699 21.9997 14.1057ZM9.98729 15.2901C9.98729 14.6378 10.5279 14.1057 11.1907 14.1057C11.8535 14.1057 12.3941 14.6378 12.3941 15.2901C12.3941 15.9424 11.8535 16.4744 11.1907 16.4744C10.5249 16.4684 9.98729 15.9424 9.98729 15.2901ZM16.9654 18.5872V18.5402C16.1115 19.172 15.0664 19.4952 13.9973 19.4513C12.9282 19.4954 11.8834 19.172 11.0292 18.5402C10.9157 18.4049 10.9365 18.2023 11.074 18.0907C11.1933 17.9937 11.3637 17.9937 11.4862 18.0907C12.2088 18.6108 13.0897 18.8754 13.9853 18.8342C14.8812 18.8812 15.765 18.6284 16.4964 18.1143C16.6278 17.9879 16.8427 17.9908 16.9713 18.1201C17.0997 18.2493 17.0968 18.4608 16.9654 18.5872ZM16.8013 16.5595C16.7805 16.5595 16.7626 16.5595 16.7415 16.5595L16.7506 16.5154C16.0877 16.5154 15.5472 15.9834 15.5472 15.3311C15.5472 14.6787 16.0877 14.1467 16.7506 14.1467C17.4134 14.1467 17.9539 14.6787 17.9539 15.3311C17.9806 15.9837 17.4641 16.533 16.8013 16.5595Z\" fill=\"white\"></path></g><defs><clipPath id=\"clip0_9223_20541\"><rect width=\"28\" height=\"28\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/reddit.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/reddit.svg ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M23.0265 11.9397C22.9773 10.6079 21.859 9.56785 20.5232 9.61305C19.9311 9.63363 19.3681 9.87618 18.9407 10.283C17.0581 9.00043 14.8465 8.29741 12.5731 8.24817L13.6459 3.08926L17.1852 3.83344C17.2837 4.74189 18.0977 5.39971 19.0061 5.30085C19.9146 5.20236 20.5724 4.38836 20.4736 3.47991C20.3747 2.57146 19.5611 1.91364 18.6526 2.0125C18.1304 2.06579 17.6618 2.37007 17.4031 2.82246L13.35 2.0125C13.0748 1.95076 12.7991 2.12348 12.7374 2.40315C12.7374 2.40719 12.7374 2.40719 12.7374 2.41123L11.5166 8.14968C9.21459 8.1868 6.97433 8.89386 5.06703 10.1845C4.09684 9.27201 2.56769 9.31721 1.6552 10.2914C0.742708 11.2616 0.787911 12.7908 1.76214 13.7033C1.9514 13.88 2.16896 14.0322 2.41151 14.1391C2.39497 14.3817 2.39497 14.6242 2.41151 14.8668C2.41151 18.5704 6.72774 21.5835 12.0509 21.5835C17.3741 21.5835 21.6903 18.5744 21.6903 14.8668C21.7069 14.6242 21.7069 14.3817 21.6903 14.1391C22.5209 13.7239 23.0431 12.8687 23.0265 11.9397ZM6.48924 13.5963C6.48924 12.6838 7.23342 11.9397 8.14591 11.9397C9.0584 11.9397 9.80258 12.6838 9.80258 13.5963C9.80258 14.5088 9.0584 15.253 8.14591 15.253C7.22938 15.2446 6.48924 14.5088 6.48924 13.5963ZM16.0959 18.2084V18.1426C14.9203 19.0265 13.4816 19.4785 12.0098 19.4171C10.5379 19.4788 9.09956 19.0265 7.92358 18.1426C7.76739 17.9534 7.79605 17.67 7.98531 17.5138C8.14959 17.3782 8.38405 17.3782 8.55273 17.5138C9.54754 18.2415 10.7603 18.6116 11.9932 18.5539C13.2265 18.6196 14.4433 18.2661 15.4503 17.5469C15.6311 17.3701 15.9269 17.3742 16.104 17.555C16.2808 17.7358 16.2768 18.0316 16.0959 18.2084ZM15.8699 15.3721C15.8413 15.3721 15.8166 15.3721 15.7876 15.3721L15.8001 15.3103C14.8876 15.3103 14.1434 14.5662 14.1434 13.6537C14.1434 12.7412 14.8876 11.997 15.8001 11.997C16.7126 11.997 17.4568 12.7412 17.4568 13.6537C17.4935 14.5665 16.7824 15.335 15.8699 15.3721Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/refresh.svg":
/*!******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/refresh.svg ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20231)\"><path d=\"M5.463 4.43301C7.27756 2.86067 9.59899 1.99666 12 2.00001C17.523 2.00001 22 6.47701 22 12C22 14.136 21.33 16.116 20.19 17.74L17 12H20C20.0001 10.4316 19.5392 8.89781 18.6747 7.58927C17.8101 6.28072 16.5799 5.25517 15.1372 4.64013C13.6944 4.0251 12.1027 3.84771 10.56 4.13003C9.0172 4.41234 7.59145 5.14191 6.46 6.22801L5.463 4.43301ZM18.537 19.567C16.7224 21.1393 14.401 22.0034 12 22C6.477 22 2 17.523 2 12C2 9.86401 2.67 7.88401 3.81 6.26001L7 12H4C3.99987 13.5684 4.46075 15.1022 5.32534 16.4108C6.18992 17.7193 7.42007 18.7449 8.86282 19.3599C10.3056 19.9749 11.8973 20.1523 13.44 19.87C14.9828 19.5877 16.4085 18.8581 17.54 17.772L18.537 19.567Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20231\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/reply-all.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/reply-all.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20233)\"><path d=\"M14 4.5V9C19.523 9 24 13.477 24 19C24 19.273 23.99 19.543 23.968 19.81C22.505 17.036 19.638 15.119 16.313 15.005L16 15H14V19.5L6 12L14 4.5ZM8 4.5V7.237L2.92 12L7.999 16.761L8 19.5L0 12L8 4.5ZM12 9.116L8.924 12L12 14.883V13H16.034L16.381 13.007C17.666 13.05 18.905 13.317 20.057 13.773C18.59 12.075 16.42 11 14 11H12V9.116Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20233\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/reply.svg":
/*!****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/reply.svg ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20232)\"><path d=\"M11 20L1 12L11 4V9C16.523 9 21 13.477 21 19C21 19.273 20.99 19.543 20.968 19.81C19.505 17.036 16.638 15.119 13.313 15.005L13 15H11V20ZM9 13H13.034L13.381 13.007C14.666 13.05 15.905 13.317 17.057 13.773C15.59 12.075 13.42 11 11 11H9V8.161L4.202 12L9 15.839V13Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20232\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/save.svg":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/save.svg ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20207)\"><path d=\"M7 19V13H17V19H19V7.828L16.172 5H5V19H7ZM4 3H17L21 7V20C21 20.2652 20.8946 20.5196 20.7071 20.7071C20.5196 20.8946 20.2652 21 20 21H4C3.73478 21 3.48043 20.8946 3.29289 20.7071C3.10536 20.5196 3 20.2652 3 20V4C3 3.73478 3.10536 3.48043 3.29289 3.29289C3.48043 3.10536 3.73478 3 4 3V3ZM9 15V19H15V15H9Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20207\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/search.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/search.svg ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M18.031 16.617L22.314 20.899L20.899 22.314L16.617 18.031C15.0237 19.3082 13.042 20.0029 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20.0029 13.042 19.3082 15.0237 18.031 16.617ZM16.025 15.875C17.2941 14.5699 18.0029 12.8204 18 11C18 7.132 14.867 4 11 4C7.132 4 4 7.132 4 11C4 14.867 7.132 18 11 18C12.8204 18.0029 14.5699 17.2941 15.875 16.025L16.025 15.875Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/settings.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/settings.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8156_19319)\"><path d=\"M2.21276 14.06C1.92517 12.7017 1.92517 11.2983 2.21276 9.94001C3.32276 10.07 4.29276 9.70301 4.60876 8.93901C4.92576 8.17401 4.50076 7.22901 3.62276 6.53601C4.3798 5.37233 5.37209 4.38005 6.53576 3.62301C7.22776 4.50001 8.17376 4.92601 8.93876 4.60901C9.70376 4.29201 10.0708 3.32301 9.93976 2.21301C11.298 1.92542 12.7015 1.92542 14.0598 2.21301C13.9298 3.32301 14.2968 4.29301 15.0608 4.60901C15.8258 4.92601 16.7708 4.50101 17.4638 3.62301C18.6274 4.38005 19.6197 5.37233 20.3768 6.53601C19.4998 7.22801 19.0738 8.17401 19.3908 8.93901C19.7078 9.70401 20.6768 10.071 21.7868 9.94001C22.0744 11.2983 22.0744 12.7017 21.7868 14.06C20.6768 13.93 19.7068 14.297 19.3908 15.061C19.0738 15.826 19.4988 16.771 20.3768 17.464C19.6197 18.6277 18.6274 19.62 17.4638 20.377C16.7718 19.5 15.8258 19.074 15.0608 19.391C14.2958 19.708 13.9288 20.677 14.0598 21.787C12.7015 22.0746 11.298 22.0746 9.93976 21.787C10.0698 20.677 9.70276 19.707 8.93876 19.391C8.17376 19.074 7.22876 19.499 6.53576 20.377C5.37209 19.62 4.3798 18.6277 3.62276 17.464C4.49976 16.772 4.92576 15.826 4.60876 15.061C4.29176 14.296 3.32276 13.929 2.21276 14.06ZM3.99976 12.21C5.09976 12.515 6.00676 13.212 6.45676 14.296C6.90576 15.381 6.75676 16.516 6.19476 17.508C6.29076 17.61 6.38976 17.709 6.49176 17.805C7.48476 17.243 8.61876 17.095 9.70376 17.543C10.7878 17.993 11.4848 18.9 11.7898 20C11.9298 20.004 12.0698 20.004 12.2098 20C12.5148 18.9 13.2118 17.993 14.2958 17.543C15.3808 17.094 16.5158 17.243 17.5078 17.805C17.6098 17.709 17.7088 17.61 17.8048 17.508C17.2428 16.515 17.0948 15.381 17.5428 14.296C17.9928 13.212 18.8998 12.515 19.9998 12.21C20.0038 12.07 20.0038 11.93 19.9998 11.79C18.8998 11.485 17.9928 10.788 17.5428 9.70401C17.0938 8.61901 17.2428 7.48401 17.8048 6.49201C17.7084 6.3904 17.6094 6.29137 17.5078 6.19501C16.5148 6.75701 15.3808 6.90501 14.2958 6.45701C13.2118 6.00701 12.5148 5.10001 12.2098 4.00001C12.0698 3.9963 11.9297 3.9963 11.7898 4.00001C11.4848 5.10001 10.7878 6.00701 9.70376 6.45701C8.61876 6.90601 7.48376 6.75701 6.49176 6.19501C6.38976 6.29101 6.29076 6.39001 6.19476 6.49201C6.75676 7.48501 6.90476 8.61901 6.45676 9.70401C6.00676 10.788 5.09976 11.485 3.99976 11.79C3.99576 11.93 3.99576 12.07 3.99976 12.21ZM11.9998 15C11.2041 15 10.4411 14.6839 9.87844 14.1213C9.31583 13.5587 8.99976 12.7957 8.99976 12C8.99976 11.2044 9.31583 10.4413 9.87844 9.87869C10.4411 9.31608 11.2041 9.00001 11.9998 9.00001C12.7954 9.00001 13.5585 9.31608 14.1211 9.87869C14.6837 10.4413 14.9998 11.2044 14.9998 12C14.9998 12.7957 14.6837 13.5587 14.1211 14.1213C13.5585 14.6839 12.7954 15 11.9998 15ZM11.9998 13C12.265 13 12.5193 12.8946 12.7069 12.7071C12.8944 12.5196 12.9998 12.2652 12.9998 12C12.9998 11.7348 12.8944 11.4804 12.7069 11.2929C12.5193 11.1054 12.265 11 11.9998 11C11.7345 11 11.4802 11.1054 11.2927 11.2929C11.1051 11.4804 10.9998 11.7348 10.9998 12C10.9998 12.2652 11.1051 12.5196 11.2927 12.7071C11.4802 12.8946 11.7345 13 11.9998 13Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8156_19319\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/share.svg":
/*!****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/share.svg ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20221)\"><path d=\"M13.1202 17.023L8.92121 14.733C8.373 15.319 7.66119 15.7266 6.87828 15.9028C6.09537 16.079 5.27756 16.0157 4.53113 15.721C3.7847 15.4263 3.14417 14.9139 2.69277 14.2504C2.24138 13.5869 2 12.803 2 12.0005C2 11.198 2.24138 10.414 2.69277 9.75051C3.14417 9.08701 3.7847 8.57461 4.53113 8.27992C5.27756 7.98523 6.09537 7.92187 6.87828 8.09807C7.66119 8.27428 8.373 8.6819 8.92121 9.26796L13.1212 6.97796C12.8828 6.03403 12.9968 5.03555 13.4418 4.16966C13.8869 3.30378 14.6325 2.62994 15.5389 2.27446C16.4452 1.91898 17.4501 1.90626 18.3652 2.23869C19.2803 2.57112 20.0427 3.22588 20.5095 4.08022C20.9764 4.93457 21.1156 5.92985 20.9011 6.8795C20.6866 7.82916 20.1332 8.668 19.3444 9.23877C18.5557 9.80954 17.5859 10.0731 16.6168 9.97995C15.6477 9.88684 14.7458 9.44347 14.0802 8.73296L9.88021 11.023C10.0414 11.6643 10.0414 12.3356 9.88021 12.977L14.0792 15.267C14.7448 14.5564 15.6467 14.1131 16.6158 14.02C17.5849 13.9268 18.5547 14.1904 19.3434 14.7611C20.1322 15.3319 20.6856 16.1708 20.9001 17.1204C21.1146 18.0701 20.9754 19.0654 20.5085 19.9197C20.0417 20.774 19.2793 21.4288 18.3642 21.7612C17.4491 22.0937 16.4442 22.0809 15.5379 21.7255C14.6315 21.37 13.8859 20.6961 13.4408 19.8303C12.9958 18.9644 12.8818 17.9659 13.1202 17.022V17.023ZM6.00021 14C6.53064 14 7.03935 13.7892 7.41442 13.4142C7.78949 13.0391 8.00021 12.5304 8.00021 12C8.00021 11.4695 7.78949 10.9608 7.41442 10.5857C7.03935 10.2107 6.53064 9.99996 6.00021 9.99996C5.46977 9.99996 4.96107 10.2107 4.58599 10.5857C4.21092 10.9608 4.00021 11.4695 4.00021 12C4.00021 12.5304 4.21092 13.0391 4.58599 13.4142C4.96107 13.7892 5.46977 14 6.00021 14V14ZM17.0002 7.99996C17.5306 7.99996 18.0393 7.78925 18.4144 7.41417C18.7895 7.0391 19.0002 6.53039 19.0002 5.99996C19.0002 5.46953 18.7895 4.96082 18.4144 4.58575C18.0393 4.21067 17.5306 3.99996 17.0002 3.99996C16.4698 3.99996 15.9611 4.21067 15.586 4.58575C15.2109 4.96082 15.0002 5.46953 15.0002 5.99996C15.0002 6.53039 15.2109 7.0391 15.586 7.41417C15.9611 7.78925 16.4698 7.99996 17.0002 7.99996V7.99996ZM17.0002 20C17.5306 20 18.0393 19.7892 18.4144 19.4142C18.7895 19.0391 19.0002 18.5304 19.0002 18C19.0002 17.4695 18.7895 16.9608 18.4144 16.5857C18.0393 16.2107 17.5306 16 17.0002 16C16.4698 16 15.9611 16.2107 15.586 16.5857C15.2109 16.9608 15.0002 17.4695 15.0002 18C15.0002 18.5304 15.2109 19.0391 15.586 19.4142C15.9611 19.7892 16.4698 20 17.0002 20V20Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20221\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/slideshow-1.svg":
/*!**********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/slideshow-1.svg ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20186)\"><path d=\"M13 18V20H17V22H7V20H11V18H3C2.73478 18 2.48043 17.8946 2.29289 17.7071C2.10536 17.5196 2 17.2652 2 17V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V17C22 17.2652 21.8946 17.5196 21.7071 17.7071C21.5196 17.8946 21.2652 18 21 18H13ZM4 5V16H20V5H4ZM10 7.5L15 10.5L10 13.5V7.5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20186\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/slideshow-2.svg":
/*!**********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/slideshow-2.svg ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20187)\"><path d=\"M13 21V23H11V21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V6H22V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H13ZM4 19H20V8H4V19ZM13 10H18V12H13V10ZM13 14H18V16H13V14ZM9 10V13H12C12 13.5933 11.8241 14.1734 11.4944 14.6667C11.1648 15.1601 10.6962 15.5446 10.1481 15.7716C9.59987 15.9987 8.99667 16.0581 8.41473 15.9424C7.83279 15.8266 7.29824 15.5409 6.87868 15.1213C6.45912 14.7018 6.1734 14.1672 6.05764 13.5853C5.94189 13.0033 6.0013 12.4001 6.22836 11.8519C6.45542 11.3038 6.83994 10.8352 7.33329 10.5056C7.82664 10.1759 8.40666 10 9 10V10ZM2 3H22V5H2V3Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20187\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/stack.svg":
/*!****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/stack.svg ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20166)\"><path d=\"M20.0829 15.2L21.2849 15.921C21.359 15.9654 21.4204 16.0283 21.463 16.1034C21.5056 16.1786 21.528 16.2636 21.528 16.35C21.528 16.4364 21.5056 16.5214 21.463 16.5966C21.4204 16.6718 21.359 16.7346 21.2849 16.779L12.5149 22.041C12.3593 22.1345 12.1813 22.1838 11.9999 22.1838C11.8184 22.1838 11.6404 22.1345 11.4849 22.041L2.71485 16.779C2.6407 16.7346 2.57932 16.6718 2.5367 16.5966C2.49408 16.5214 2.47168 16.4364 2.47168 16.35C2.47168 16.2636 2.49408 16.1786 2.5367 16.1034C2.57932 16.0283 2.6407 15.9654 2.71485 15.921L3.91685 15.2L11.9999 20.05L20.0829 15.2V15.2ZM20.0829 10.5L21.2849 11.221C21.359 11.2654 21.4204 11.3283 21.463 11.4034C21.5056 11.4786 21.528 11.5636 21.528 11.65C21.528 11.7364 21.5056 11.8214 21.463 11.8966C21.4204 11.9718 21.359 12.0346 21.2849 12.079L11.9999 17.65L2.71485 12.079C2.6407 12.0346 2.57932 11.9718 2.5367 11.8966C2.49408 11.8214 2.47168 11.7364 2.47168 11.65C2.47168 11.5636 2.49408 11.4786 2.5367 11.4034C2.57932 11.3283 2.6407 11.2654 2.71485 11.221L3.91685 10.5L11.9999 15.35L20.0829 10.5ZM12.5139 1.30901L21.2849 6.57101C21.359 6.6154 21.4204 6.67826 21.463 6.75344C21.5056 6.82863 21.528 6.91358 21.528 7.00001C21.528 7.08643 21.5056 7.17139 21.463 7.24657C21.4204 7.32176 21.359 7.38462 21.2849 7.42901L11.9999 13L2.71485 7.42901C2.6407 7.38462 2.57932 7.32176 2.5367 7.24657C2.49408 7.17139 2.47168 7.08643 2.47168 7.00001C2.47168 6.91358 2.49408 6.82863 2.5367 6.75344C2.57932 6.67826 2.6407 6.6154 2.71485 6.57101L11.4849 1.30901C11.6404 1.21557 11.8184 1.1662 11.9999 1.1662C12.1813 1.1662 12.3593 1.21557 12.5149 1.30901H12.5139ZM11.9999 3.33201L5.88685 7.00001L11.9999 10.668L18.1129 7.00001L11.9999 3.33201Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20166\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/sticky-note.svg":
/*!**********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/sticky-note.svg ***!
  \**********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20180)\"><path d=\"M21 15L15 20.996L4.002 21C3.73749 21.0011 3.48337 20.8971 3.29549 20.7109C3.1076 20.5247 3.00132 20.2715 3 20.007V3.993C3 3.445 3.445 3 3.993 3H20.007C20.555 3 21 3.456 21 4.002V15V15ZM19 5H5V19H13V14C13 13.7551 13.09 13.5187 13.2527 13.3356C13.4155 13.1526 13.6397 13.0357 13.883 13.007L14 13L19 12.999V5ZM18.171 14.999L15 15V18.169L18.171 14.999Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20180\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/submit.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/submit.svg ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 20 22\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0.741 0.407984L19.203 10.562C19.2814 10.6051 19.3468 10.6686 19.3923 10.7456C19.4378 10.8226 19.4618 10.9105 19.4618 11C19.4618 11.0895 19.4378 11.1773 19.3923 11.2544C19.3468 11.3314 19.2814 11.3948 19.203 11.438L0.741 21.592C0.664873 21.6339 0.579148 21.6552 0.492273 21.6538C0.405398 21.6525 0.320372 21.6285 0.245577 21.5843C0.170781 21.5401 0.108797 21.4772 0.0657334 21.4017C0.0226703 21.3263 1.48755e-05 21.2409 0 21.154V0.845984C1.48755e-05 0.759098 0.0226703 0.673717 0.0657334 0.598254C0.108797 0.522791 0.170781 0.459852 0.245577 0.415641C0.320372 0.37143 0.405398 0.347472 0.492273 0.346129C0.579148 0.344786 0.664873 0.366105 0.741 0.407984ZM2 12V18.617L15.85 11L2 3.38298V9.99998H7V12H2Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/thumb-up.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/thumb-up.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20227)\"><path d=\"M14.6 8.00003H21C21.5304 8.00003 22.0391 8.21074 22.4142 8.58581C22.7893 8.96089 23 9.46959 23 10V12.104C23.0003 12.3654 22.9493 12.6243 22.85 12.866L19.755 20.381C19.6795 20.5642 19.5513 20.7209 19.3866 20.8311C19.2219 20.9413 19.0282 21.0001 18.83 21H2C1.73478 21 1.48043 20.8947 1.29289 20.7071C1.10536 20.5196 1 20.2652 1 20V10C1 9.73481 1.10536 9.48046 1.29289 9.29292C1.48043 9.10538 1.73478 9.00003 2 9.00003H5.482C5.6421 9.00007 5.79986 8.96167 5.94203 8.88806C6.0842 8.81445 6.20662 8.70778 6.299 8.57703L11.752 0.850026C11.8209 0.752339 11.9226 0.682586 12.0385 0.653416C12.1545 0.624246 12.277 0.637589 12.384 0.691026L14.198 1.59803C14.7085 1.85319 15.1163 2.27534 15.3537 2.79434C15.5911 3.31334 15.6438 3.89795 15.503 4.45103L14.6 8.00003ZM7 10.588V19H18.16L21 12.104V10H14.6C14.2954 9.99998 13.9948 9.93036 13.7212 9.79648C13.4476 9.6626 13.2082 9.468 13.0213 9.22751C12.8343 8.98703 12.7048 8.70702 12.6425 8.40885C12.5803 8.11068 12.5869 7.80223 12.662 7.50703L13.565 3.95903C13.5933 3.84835 13.5828 3.73134 13.5353 3.62745C13.4878 3.52357 13.4062 3.43907 13.304 3.38803L12.643 3.05803L7.933 9.73003C7.683 10.084 7.363 10.374 7 10.588V10.588ZM5 11H3V19H5V11Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20227\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/tik-tok.svg":
/*!******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/tik-tok.svg ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M19.619 2H4.38095C3.0681 2 2 3.0681 2 4.38095V19.619C2 20.9319 3.0681 22 4.38095 22H19.619C20.9319 22 22 20.9319 22 19.619V4.38095C22 3.0681 20.9319 2 19.619 2ZM17.7171 10.7252C17.6079 10.7358 17.4983 10.7414 17.3886 10.7419C16.7962 10.742 16.213 10.5945 15.6919 10.3129C15.1707 10.0312 14.7279 9.6242 14.4033 9.12857V14.6224C14.4033 15.4255 14.1652 16.2105 13.719 16.8783C13.2728 17.546 12.6387 18.0664 11.8967 18.3738C11.1548 18.6811 10.3384 18.7615 9.5507 18.6048C8.76304 18.4482 8.03953 18.0614 7.47167 17.4936C6.9038 16.9257 6.51708 16.2022 6.3604 15.4145C6.20373 14.6269 6.28414 13.8105 6.59147 13.0685C6.89879 12.3265 7.41924 11.6924 8.08698 11.2462C8.75472 10.8 9.53977 10.5619 10.3429 10.5619C10.4276 10.5619 10.5105 10.5695 10.5938 10.5748V12.5757C10.5105 12.5657 10.4286 12.5505 10.3429 12.5505C9.79323 12.5505 9.26611 12.7688 8.87746 13.1575C8.48882 13.5461 8.27048 14.0732 8.27048 14.6229C8.27048 15.1725 8.48882 15.6996 8.87746 16.0883C9.26611 16.4769 9.79323 16.6952 10.3429 16.6952C11.4876 16.6952 12.4986 15.7933 12.4986 14.6486L12.5186 5.3181H14.4329C14.5203 6.14985 14.8974 6.9244 15.4981 7.50631C16.0988 8.08821 16.8849 8.44045 17.719 8.50143V10.7252\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/trash.svg":
/*!****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/trash.svg ***!
  \****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M17 6H22V8H20V21C20 21.2652 19.8946 21.5196 19.7071 21.7071C19.5196 21.8946 19.2652 22 19 22H5C4.73478 22 4.48043 21.8946 4.29289 21.7071C4.10536 21.5196 4 21.2652 4 21V8H2V6H7V3C7 2.73478 7.10536 2.48043 7.29289 2.29289C7.48043 2.10536 7.73478 2 8 2H16C16.2652 2 16.5196 2.10536 16.7071 2.29289C16.8946 2.48043 17 2.73478 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/twitter-fullcolor.svg":
/*!****************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/twitter-fullcolor.svg ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 28 28\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"14\" cy=\"14\" r=\"14\" fill=\"#1DA1F2\"></circle><path d=\"M10.7172 19.6882C16.3776 19.6882 19.4736 15.3113 19.4736 11.5156C19.4736 11.3913 19.4736 11.2675 19.4646 11.1443C20.0669 10.7377 20.5868 10.2342 21 9.6575C20.4383 9.88978 19.8425 10.0421 19.2324 10.1094C19.8747 9.75055 20.3557 9.18568 20.5854 8.52068C19.9813 8.85523 19.3204 9.09104 18.6312 9.21789C18.0493 8.64036 17.2366 8.31248 16.3873 8.31248C14.6974 8.31248 13.3068 9.61033 13.3068 11.1875C13.3068 11.4063 13.3336 11.6244 13.3866 11.8376C10.9134 11.7219 8.60593 10.63 7.04399 8.83653C6.23177 10.1415 6.65203 11.8327 7.99679 12.6708C7.50709 12.6573 7.02791 12.534 6.6 12.3113V12.3477C6.60041 13.7098 7.63849 14.8937 9.06899 15.1634C8.61595 15.2787 8.14049 15.2956 7.67941 15.2127C8.08157 16.3798 9.24126 17.1844 10.5546 17.2074C9.46506 18.0066 8.11837 18.4407 6.7326 18.4394C6.48773 18.439 6.24311 18.4251 6 18.398C7.40725 19.2408 9.04512 19.688 10.7172 19.686\" fill=\"white\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/twitter.svg":
/*!******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/twitter.svg ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M23.706 5.18952C22.871 5.55952 21.974 5.80952 21.031 5.92252C22.004 5.34031 22.7319 4.42398 23.079 3.34452C22.1648 3.88751 21.1643 4.26971 20.121 4.47452C19.4194 3.72538 18.4901 3.22884 17.4773 3.06199C16.4646 2.89514 15.4251 3.06731 14.5202 3.55177C13.6154 4.03623 12.8958 4.80588 12.4732 5.74122C12.0505 6.67656 11.9485 7.72527 12.183 8.72452C10.3307 8.63151 8.51863 8.15007 6.86442 7.31142C5.21022 6.47278 3.75084 5.29568 2.581 3.85652C2.181 4.54652 1.951 5.34652 1.951 6.19852C1.95055 6.96551 2.13943 7.72076 2.50088 8.39725C2.86232 9.07374 3.38516 9.65056 4.023 10.0765C3.28328 10.053 2.55987 9.8531 1.913 9.49352V9.55352C1.91293 10.6293 2.28503 11.6719 2.96618 12.5045C3.64733 13.3371 4.59557 13.9084 5.65 14.1215C4.96378 14.3072 4.24434 14.3346 3.546 14.2015C3.8435 15.1271 4.423 15.9365 5.20337 16.5164C5.98374 17.0963 6.92592 17.4177 7.898 17.4355C6.24783 18.7309 4.20989 19.4336 2.112 19.4305C1.74038 19.4306 1.36908 19.4089 1 19.3655C3.12948 20.7347 5.60834 21.4613 8.14 21.4585C16.71 21.4585 21.395 14.3605 21.395 8.20452C21.395 8.00452 21.39 7.80252 21.381 7.60252C22.2923 6.94349 23.0789 6.12741 23.704 5.19252L23.706 5.18952Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/unarchive.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/unarchive.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20175)\"><path d=\"M20 3L22 7V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V7.004L4 3H20ZM20 9H4V19H20V9ZM12 10L16 14H13V18H11V14H8L12 10ZM18.764 5H5.236L4.237 7H19.764L18.764 5Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20175\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/underline.svg":
/*!********************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/underline.svg ***!
  \********************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20256)\"><path d=\"M15.246 14H8.754L7.154 18H5L11 3H13L19 18H16.846L15.246 14ZM14.446 12L12 5.885L9.554 12H14.446V12ZM3 20H21V22H3V20Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20256\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/upload-1.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/upload-1.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20169)\"><g clip-path=\"url(#clip1_8845_20169)\"><path d=\"M1 14.5C0.999385 13.3955 1.28042 12.309 1.81655 11.3433C2.35268 10.3776 3.1262 9.56457 4.064 8.98101C4.31151 7.0511 5.2538 5.27751 6.71452 3.99217C8.17524 2.70682 10.0543 1.9978 12 1.9978C13.9457 1.9978 15.8248 2.70682 17.2855 3.99217C18.7462 5.27751 19.6885 7.0511 19.936 8.98101C21.0992 9.7047 22.0041 10.7774 22.5213 12.046C23.0385 13.3146 23.1417 14.7141 22.8161 16.0449C22.4906 17.3756 21.7529 18.5694 20.7083 19.4559C19.6638 20.3423 18.366 20.8761 17 20.981L7 21C3.644 20.726 1 17.922 1 14.5ZM16.848 18.987C17.7938 18.9143 18.6925 18.5445 19.4156 17.9305C20.1387 17.3166 20.6493 16.4898 20.8745 15.5682C21.0996 14.6467 21.0278 13.6776 20.6692 12.7994C20.3107 11.9211 19.6837 11.1787 18.878 10.678L18.071 10.175L17.951 9.23301C17.7641 7.7867 17.0569 6.45795 15.9616 5.4951C14.8663 4.53225 13.4578 4.0012 11.9995 4.0012C10.5412 4.0012 9.13272 4.53225 8.03742 5.4951C6.94213 6.45795 6.23493 7.7867 6.048 9.23301L5.928 10.175L5.123 10.678C4.3173 11.1786 3.69038 11.921 3.3318 12.7992C2.97321 13.6773 2.90129 14.6463 3.12631 15.5678C3.35133 16.4893 3.86177 17.3161 4.58475 17.9302C5.30773 18.5442 6.20625 18.9141 7.152 18.987L7.325 19H16.675L16.848 18.987ZM13 13V17H11V13H8L12 8.00001L16 13H13Z\" fill=\"currentcolor\"></path></g></g><defs><clipPath id=\"clip0_8845_20169\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath><clipPath id=\"clip1_8845_20169\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/upload-2.svg":
/*!*******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/upload-2.svg ***!
  \*******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20170)\"><path d=\"M4 19H20V12H22V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V12H4V19ZM13 9V16H11V9H6L12 3L18 9H13Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20170\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/user.svg":
/*!***************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/user.svg ***!
  \***************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8852_20245)\"><path d=\"M4 22C4 19.8783 4.84285 17.8434 6.34315 16.3431C7.84344 14.8429 9.87827 14 12 14C14.1217 14 16.1566 14.8429 17.6569 16.3431C19.1571 17.8434 20 19.8783 20 22H18C18 20.4087 17.3679 18.8826 16.2426 17.7574C15.1174 16.6321 13.5913 16 12 16C10.4087 16 8.88258 16.6321 7.75736 17.7574C6.63214 18.8826 6 20.4087 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8852_20245\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/warning-report.svg":
/*!*************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/warning-report.svg ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.936 0.5L19.5 6.067V13.937L13.936 19.5H6.066L0.5 13.936V6.066L6.066 0.5H13.936ZM13.107 2.5H6.894L2.501 6.895V13.108L6.894 17.502H13.107L17.501 13.108V6.894L13.107 2.501V2.5ZM9 13H11V15H9V13ZM9 5H11V11H9V5Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/warning.svg":
/*!******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/warning.svg ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M12.8661 2.99999L22.3921 19.5C22.4799 19.652 22.5261 19.8244 22.5261 20C22.5261 20.1755 22.4799 20.348 22.3921 20.5C22.3043 20.652 22.1781 20.7782 22.0261 20.866C21.8741 20.9538 21.7016 21 21.5261 21H2.4741C2.29856 21 2.12612 20.9538 1.9741 20.866C1.82209 20.7782 1.69585 20.652 1.60809 20.5C1.52032 20.348 1.47412 20.1755 1.47412 20C1.47412 19.8244 1.52033 19.652 1.6081 19.5L11.1341 2.99999C11.2219 2.84798 11.3481 2.72175 11.5001 2.63399C11.6521 2.54623 11.8246 2.50003 12.0001 2.50003C12.1756 2.50003 12.3481 2.54623 12.5001 2.63399C12.6521 2.72175 12.7783 2.84798 12.8661 2.99999ZM4.2061 19H19.7941L12.0001 5.49999L4.2061 19ZM11.0001 16H13.0001V18H11.0001V16ZM11.0001 8.99999H13.0001V14H11.0001V8.99999Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/website.svg":
/*!******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/website.svg ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 32 32\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.9998 2.66667C8.63984 2.66667 2.6665 8.64 2.6665 16C2.6665 23.36 8.63984 29.3333 15.9998 29.3333C23.3598 29.3333 29.3332 23.36 29.3332 16C29.3332 8.64 23.3598 2.66667 15.9998 2.66667ZM14.6665 26.5733C9.39984 25.92 5.33317 21.44 5.33317 16C5.33317 15.1733 5.43984 14.3867 5.61317 13.6133L11.9998 20V21.3333C11.9998 22.8 13.1998 24 14.6665 24V26.5733ZM23.8665 23.1867C23.5198 22.1067 22.5332 21.3333 21.3332 21.3333H19.9998V17.3333C19.9998 16.6 19.3998 16 18.6665 16H10.6665V13.3333H13.3332C14.0665 13.3333 14.6665 12.7333 14.6665 12V9.33334H17.3332C18.7998 9.33334 19.9998 8.13334 19.9998 6.66667V6.12001C23.9065 7.70667 26.6665 11.5333 26.6665 16C26.6665 18.7733 25.5998 21.2933 23.8665 23.1867Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/window.svg":
/*!*****************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/window.svg ***!
  \*****************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g clip-path=\"url(#clip0_8845_20185)\"><path d=\"M3 3H21C21.2652 3 21.5196 3.10536 21.7071 3.29289C21.8946 3.48043 22 3.73478 22 4V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3V3ZM20 11H4V19H20V11ZM20 9V5H4V9H20ZM9 6H11V8H9V6ZM5 6H7V8H5V6Z\" fill=\"currentcolor\"></path></g><defs><clipPath id=\"clip0_8845_20185\"><rect width=\"24\" height=\"24\" fill=\"white\"></rect></clipPath></defs></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/youtube-fullcolor.svg":
/*!****************************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/youtube-fullcolor.svg ***!
  \****************************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 28 28\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M0 14C0 6.26803 6.26803 0 14 0C21.732 0 28 6.26803 28 14C28 21.732 21.732 28 14 28C6.26803 28 0 21.732 0 14Z\" fill=\"#FF0000\"></path><path d=\"M21.5638 10.1866C21.382 9.50663 20.8464 8.97097 20.1663 8.7892C18.9338 8.45885 13.991 8.45885 13.991 8.45885C13.991 8.45885 9.04823 8.45885 7.81569 8.7892C7.13567 8.97097 6.60001 9.50663 6.41824 10.1866C6.08789 11.4192 6.08789 13.991 6.08789 13.991C6.08789 13.991 6.08789 16.5629 6.41824 17.7954C6.60001 18.4754 7.13567 19.0111 7.81569 19.1929C9.04823 19.5232 13.991 19.5232 13.991 19.5232C13.991 19.5232 18.9338 19.5232 20.1663 19.1929C20.8464 19.0111 21.382 18.4754 21.5638 17.7954C21.8941 16.5629 21.8941 13.991 21.8941 13.991C21.8941 13.991 21.8941 11.4192 21.5638 10.1866Z\" fill=\"white\"></path><path d=\"M12.4102 16.362L16.5163 13.991L12.4102 11.6201V16.362Z\" fill=\"#FF0000\"></path></svg>"

/***/ }),

/***/ "./node_modules/@cision/atlas-styles/dist/icons/youtube.svg":
/*!******************************************************************!*\
  !*** ./node_modules/@cision/atlas-styles/dist/icons/youtube.svg ***!
  \******************************************************************/
/***/ ((module) => {

module.exports = "<svg viewBox=\"0 0 20 20\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M17.0324 4.3762C17.8068 4.5832 18.4168 5.1932 18.6238 5.9676C19 7.3712 19 10.3 19 10.3C19 10.3 19 13.2288 18.6238 14.6324C18.4168 15.4068 17.8068 16.0168 17.0324 16.2238C15.6288 16.6 10 16.6 10 16.6C10 16.6 4.3712 16.6 2.9676 16.2238C2.1932 16.0168 1.5832 15.4068 1.3762 14.6324C1 13.2288 1 10.3 1 10.3C1 10.3 1 7.3712 1.3762 5.9676C1.5832 5.1932 2.1932 4.5832 2.9676 4.3762C4.3712 4 10 4 10 4C10 4 15.6288 4 17.0324 4.3762ZM12.876 10.3L8.20002 13V7.6L12.876 10.3Z\" fill=\"currentcolor\"></path></svg>"

/***/ }),

/***/ "./src/components/accordion.js":
/*!*************************************!*\
  !*** ./src/components/accordion.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_accordion_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/accordion.css */ "./node_modules/@cision/atlas-styles/dist/css/accordion.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Accordion.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.accordionTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-accordion')) {
	customElements.define('atlas-accordion', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Accordion)
}


/***/ }),

/***/ "./src/components/alert.js":
/*!*********************************!*\
  !*** ./src/components/alert.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_alert_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/alert.css */ "./node_modules/@cision/atlas-styles/dist/css/alert.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Alert.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.alertTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-alert')) {
	customElements.define('atlas-alert', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Alert)
}


/***/ }),

/***/ "./src/components/application-frame.js":
/*!*********************************************!*\
  !*** ./src/components/application-frame.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_application_frame_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/application-frame.css */ "./node_modules/@cision/atlas-styles/dist/css/application-frame.css");
/* harmony import */ var _cision_atlas_styles_dist_css_application_frame_small_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/application-frame.small.css */ "./node_modules/@cision/atlas-styles/dist/css/application-frame.small.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");





_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__.ApplicationFrame.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_3__.applicationFrameTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-application-frame')) {
	customElements.define('atlas-application-frame', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__.ApplicationFrame)
}


/***/ }),

/***/ "./src/components/avatar.js":
/*!**********************************!*\
  !*** ./src/components/avatar.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_avatar_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/avatar.css */ "./node_modules/@cision/atlas-styles/dist/css/avatar.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Avatar.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.avatarTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-avatar')) {
	customElements.define('atlas-avatar', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Avatar)
}


/***/ }),

/***/ "./src/components/button-set.js":
/*!**************************************!*\
  !*** ./src/components/button-set.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_button_set_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/button-set.css */ "./node_modules/@cision/atlas-styles/dist/css/button-set.css");
/* harmony import */ var _cision_atlas_styles_dist_css_button_set_tab_bar_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/button-set.tab-bar.css */ "./node_modules/@cision/atlas-styles/dist/css/button-set.tab-bar.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");





_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__.ButtonSet.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_3__.buttonSetTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-button-set')) {
	customElements.define('atlas-button-set', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__.ButtonSet)
}


/***/ }),

/***/ "./src/components/button.js":
/*!**********************************!*\
  !*** ./src/components/button.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_button_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/button.css */ "./node_modules/@cision/atlas-styles/dist/css/button.css");
/* harmony import */ var _cision_atlas_styles_dist_css_button_states_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/button.states.css */ "./node_modules/@cision/atlas-styles/dist/css/button.states.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");





_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__.Button.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_3__.buttonTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-button')) {
	customElements.define('atlas-button', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__.Button)
}


/***/ }),

/***/ "./src/components/chip-group.js":
/*!**************************************!*\
  !*** ./src/components/chip-group.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_chip_group_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/chip-group.css */ "./node_modules/@cision/atlas-styles/dist/css/chip-group.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.ChipGroup.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.chipGroupTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-chip-group')) {
	customElements.define('atlas-chip-group', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.ChipGroup)
}


/***/ }),

/***/ "./src/components/chip.js":
/*!********************************!*\
  !*** ./src/components/chip.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_chip_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/chip.css */ "./node_modules/@cision/atlas-styles/dist/css/chip.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Chip.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.chipTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-chip')) {
	customElements.define('atlas-chip', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Chip)
}


/***/ }),

/***/ "./src/components/dialog.js":
/*!**********************************!*\
  !*** ./src/components/dialog.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_dialog_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/dialog.css */ "./node_modules/@cision/atlas-styles/dist/css/dialog.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Dialog.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.dialogTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-dialog')) {
	customElements.define('atlas-dialog', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Dialog)
}


/***/ }),

/***/ "./src/components/feed.js":
/*!********************************!*\
  !*** ./src/components/feed.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_feed_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/feed.css */ "./node_modules/@cision/atlas-styles/dist/css/feed.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Feed.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.feedTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-feed')) {
	customElements.define('atlas-feed', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Feed)
}


/***/ }),

/***/ "./src/components/icon.js":
/*!********************************!*\
  !*** ./src/components/icon.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_icon_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/icon.css */ "./node_modules/@cision/atlas-styles/dist/css/icon.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _mappings_icon_mappings_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mappings/icon-mappings.js */ "./src/mappings/icon-mappings.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Icon.mappings = _mappings_icon_mappings_js__WEBPACK_IMPORTED_MODULE_2__.iconMappings

if (!customElements.get('atlas-icon')) {
	customElements.define('atlas-icon', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Icon)
}


/***/ }),

/***/ "./src/components/input-checkbox.js":
/*!******************************************!*\
  !*** ./src/components/input-checkbox.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_input_checkbox_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/input-checkbox.css */ "./node_modules/@cision/atlas-styles/dist/css/input-checkbox.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.InputCheckbox.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.inputCheckboxTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-checkbox')) {
	customElements.define('atlas-checkbox', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.InputCheckbox)
}


/***/ }),

/***/ "./src/components/input-chip-group.js":
/*!********************************************!*\
  !*** ./src/components/input-chip-group.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_input_chip_group_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/input-chip-group.css */ "./node_modules/@cision/atlas-styles/dist/css/input-chip-group.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.InputChipGroup.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.inputChipGroupTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-input-chip-group')) {
	customElements.define('atlas-input-chip-group', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.InputChipGroup)
}


/***/ }),

/***/ "./src/components/input-dropdown.js":
/*!******************************************!*\
  !*** ./src/components/input-dropdown.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_input_dropdown_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/input-dropdown.css */ "./node_modules/@cision/atlas-styles/dist/css/input-dropdown.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.InputDropdown.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.inputDropdownTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-dropdown')) {
	customElements.define('atlas-dropdown', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.InputDropdown)
}


/***/ }),

/***/ "./src/components/input-search.js":
/*!****************************************!*\
  !*** ./src/components/input-search.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_input_search_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/input-search.css */ "./node_modules/@cision/atlas-styles/dist/css/input-search.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.InputSearch.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.inputSearchTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-search')) {
	customElements.define('atlas-search', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.InputSearch)
}


/***/ }),

/***/ "./src/components/input-text.js":
/*!**************************************!*\
  !*** ./src/components/input-text.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_input_text_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/input-text.css */ "./node_modules/@cision/atlas-styles/dist/css/input-text.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");





_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.InputText.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.inputTextTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-input-text')) {
	customElements.define('atlas-input-text', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.InputText)
}


/***/ }),

/***/ "./src/components/input-textarea.js":
/*!******************************************!*\
  !*** ./src/components/input-textarea.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_input_textarea_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/input-textarea.css */ "./node_modules/@cision/atlas-styles/dist/css/input-textarea.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.InputTextarea.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.inputTextareaTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-input-textarea')) {
	customElements.define('atlas-input-textarea', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.InputTextarea)
}


/***/ }),

/***/ "./src/components/logo.js":
/*!********************************!*\
  !*** ./src/components/logo.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_logo_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/logo.css */ "./node_modules/@cision/atlas-styles/dist/css/logo.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Logo.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.logoTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-logo')) {
	customElements.define('atlas-logo', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Logo)
}


/***/ }),

/***/ "./src/components/main-nav-item.js":
/*!*****************************************!*\
  !*** ./src/components/main-nav-item.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");



_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_0__.MainNavItem.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_1__.mainNavItemTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-main-nav-item')) {
	customElements.define('atlas-main-nav-item', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_0__.MainNavItem)
}


/***/ }),

/***/ "./src/components/main-nav.js":
/*!************************************!*\
  !*** ./src/components/main-nav.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_main_nav_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/main-nav.css */ "./node_modules/@cision/atlas-styles/dist/css/main-nav.css");
/* harmony import */ var _cision_atlas_styles_dist_css_main_nav_small_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/main-nav.small.css */ "./node_modules/@cision/atlas-styles/dist/css/main-nav.small.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");





_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__.MainNav.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_3__.mainNavTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-main-nav')) {
	customElements.define('atlas-main-nav', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__.MainNav)
}


/***/ }),

/***/ "./src/components/number-display.js":
/*!******************************************!*\
  !*** ./src/components/number-display.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");


if (!customElements.get('atlas-number-display')) {
	customElements.define('atlas-number-display', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_0__.NumberDisplay)
}


/***/ }),

/***/ "./src/components/page.js":
/*!********************************!*\
  !*** ./src/components/page.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_page_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/page.css */ "./node_modules/@cision/atlas-styles/dist/css/page.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Page.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.pageTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-page')) {
	customElements.define('atlas-page', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Page)
}


/***/ }),

/***/ "./src/components/profile-control.js":
/*!*******************************************!*\
  !*** ./src/components/profile-control.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_profile_control_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/profile-control.css */ "./node_modules/@cision/atlas-styles/dist/css/profile-control.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.ProfileControl.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.profileControlTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-profile-control')) {
	customElements.define('atlas-profile-control', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.ProfileControl)
}


/***/ }),

/***/ "./src/components/snackbar.js":
/*!************************************!*\
  !*** ./src/components/snackbar.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_snackbar_box_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/snackbar-box.css */ "./node_modules/@cision/atlas-styles/dist/css/snackbar-box.css");
/* harmony import */ var _cision_atlas_styles_dist_css_snackbar_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/snackbar.css */ "./node_modules/@cision/atlas-styles/dist/css/snackbar.css");
/* harmony import */ var _cision_atlas_styles_dist_css_snackbar_small_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/snackbar.small.css */ "./node_modules/@cision/atlas-styles/dist/css/snackbar.small.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");






_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_3__.Snackbar.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_4__.snackbarTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-snackbar')) {
	customElements.define('atlas-snackbar', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_3__.Snackbar)
}


/***/ }),

/***/ "./src/components/stepper-step.js":
/*!****************************************!*\
  !*** ./src/components/stepper-step.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_stepper_step_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/stepper-step.css */ "./node_modules/@cision/atlas-styles/dist/css/stepper-step.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.StepperStep.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.stepperStepTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-stepper-step')) {
	customElements.define('atlas-stepper-step', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.StepperStep)
}


/***/ }),

/***/ "./src/components/stepper.js":
/*!***********************************!*\
  !*** ./src/components/stepper.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_stepper_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/stepper.css */ "./node_modules/@cision/atlas-styles/dist/css/stepper.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Stepper.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.stepperTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-stepper')) {
	customElements.define('atlas-stepper', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Stepper)
}


/***/ }),

/***/ "./src/components/tile-board-tile.js":
/*!*******************************************!*\
  !*** ./src/components/tile-board-tile.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_tile_board_tile_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/tile-board-tile.css */ "./node_modules/@cision/atlas-styles/dist/css/tile-board-tile.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.TileBoardTile.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.tileBoardTileTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-tile-board-tile')) {
	customElements.define('atlas-tile-board-tile', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.TileBoardTile)
}


/***/ }),

/***/ "./src/components/tile-board.js":
/*!**************************************!*\
  !*** ./src/components/tile-board.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_tile_board_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/tile-board.css */ "./node_modules/@cision/atlas-styles/dist/css/tile-board.css");
/* harmony import */ var _cision_atlas_styles_dist_css_tile_board_small_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/tile-board.small.css */ "./node_modules/@cision/atlas-styles/dist/css/tile-board.small.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");





_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__.TileBoard.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_3__.tileBoardTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-tile-board')) {
	customElements.define('atlas-tile-board', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_2__.TileBoard)
}


/***/ }),

/***/ "./src/components/workflow-step.js":
/*!*****************************************!*\
  !*** ./src/components/workflow-step.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_workflow_step_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/workflow-step.css */ "./node_modules/@cision/atlas-styles/dist/css/workflow-step.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.WorkflowStep.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.workflowStepTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-workflow-step')) {
	customElements.define('atlas-workflow-step', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.WorkflowStep)
}


/***/ }),

/***/ "./src/components/workflow.js":
/*!************************************!*\
  !*** ./src/components/workflow.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_workflow_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/workflow.css */ "./node_modules/@cision/atlas-styles/dist/css/workflow.css");
/* harmony import */ var _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-raw-components */ "./node_modules/@cision/atlas-raw-components/src/index.js");
/* harmony import */ var _cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-raw-components/templates */ "./node_modules/@cision/atlas-raw-components/src/templates/index.js");




_cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Workflow.template = new DOMParser()
	.parseFromString(_cision_atlas_raw_components_templates__WEBPACK_IMPORTED_MODULE_2__.workflowTemplate, 'text/html')
	?.querySelector('template')

if (!customElements.get('atlas-workflow')) {
	customElements.define('atlas-workflow', _cision_atlas_raw_components__WEBPACK_IMPORTED_MODULE_1__.Workflow)
}


/***/ }),

/***/ "./src/mappings/icon-mappings.js":
/*!***************************************!*\
  !*** ./src/mappings/icon-mappings.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "iconMappings": () => (/* binding */ iconMappings)
/* harmony export */ });
/* harmony import */ var _cision_atlas_styles_dist_icons_add_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/add.svg */ "./node_modules/@cision/atlas-styles/dist/icons/add.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_add_svg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_add_svg__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _cision_atlas_styles_dist_icons_add_circle_svg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/add-circle.svg */ "./node_modules/@cision/atlas-styles/dist/icons/add-circle.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_add_circle_svg__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_add_circle_svg__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _cision_atlas_styles_dist_icons_align_center_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/align-center.svg */ "./node_modules/@cision/atlas-styles/dist/icons/align-center.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_align_center_svg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_align_center_svg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cision_atlas_styles_dist_icons_align_justify_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/align-justify.svg */ "./node_modules/@cision/atlas-styles/dist/icons/align-justify.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_align_justify_svg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_align_justify_svg__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _cision_atlas_styles_dist_icons_align_left_svg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/align-left.svg */ "./node_modules/@cision/atlas-styles/dist/icons/align-left.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_align_left_svg__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_align_left_svg__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _cision_atlas_styles_dist_icons_align_right_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/align-right.svg */ "./node_modules/@cision/atlas-styles/dist/icons/align-right.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_align_right_svg__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_align_right_svg__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _cision_atlas_styles_dist_icons_archive_1_svg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/archive-1.svg */ "./node_modules/@cision/atlas-styles/dist/icons/archive-1.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_archive_1_svg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_archive_1_svg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _cision_atlas_styles_dist_icons_archive_2_svg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/archive-2.svg */ "./node_modules/@cision/atlas-styles/dist/icons/archive-2.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_archive_2_svg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_archive_2_svg__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _cision_atlas_styles_dist_icons_arrow_backward_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/arrow-backward.svg */ "./node_modules/@cision/atlas-styles/dist/icons/arrow-backward.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_arrow_backward_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_arrow_backward_svg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _cision_atlas_styles_dist_icons_arrow_down_svg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/arrow-down.svg */ "./node_modules/@cision/atlas-styles/dist/icons/arrow-down.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_arrow_down_svg__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_arrow_down_svg__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _cision_atlas_styles_dist_icons_arrow_forward_svg__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/arrow-forward.svg */ "./node_modules/@cision/atlas-styles/dist/icons/arrow-forward.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_arrow_forward_svg__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_arrow_forward_svg__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _cision_atlas_styles_dist_icons_arrow_up_svg__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/arrow-up.svg */ "./node_modules/@cision/atlas-styles/dist/icons/arrow-up.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_arrow_up_svg__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_arrow_up_svg__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _cision_atlas_styles_dist_icons_at_svg__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/at.svg */ "./node_modules/@cision/atlas-styles/dist/icons/at.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_at_svg__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_at_svg__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _cision_atlas_styles_dist_icons_bank_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/bank.svg */ "./node_modules/@cision/atlas-styles/dist/icons/bank.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_bank_svg__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_bank_svg__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _cision_atlas_styles_dist_icons_bar_chart_1_svg__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/bar-chart-1.svg */ "./node_modules/@cision/atlas-styles/dist/icons/bar-chart-1.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_bar_chart_1_svg__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_bar_chart_1_svg__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _cision_atlas_styles_dist_icons_bar_chart_2_svg__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/bar-chart-2.svg */ "./node_modules/@cision/atlas-styles/dist/icons/bar-chart-2.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_bar_chart_2_svg__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_bar_chart_2_svg__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _cision_atlas_styles_dist_icons_bold_svg__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/bold.svg */ "./node_modules/@cision/atlas-styles/dist/icons/bold.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_bold_svg__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_bold_svg__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _cision_atlas_styles_dist_icons_book_open_svg__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/book-open.svg */ "./node_modules/@cision/atlas-styles/dist/icons/book-open.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_book_open_svg__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_book_open_svg__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _cision_atlas_styles_dist_icons_bookmark_svg__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/bookmark.svg */ "./node_modules/@cision/atlas-styles/dist/icons/bookmark.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_bookmark_svg__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_bookmark_svg__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _cision_atlas_styles_dist_icons_broadcast_svg__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/broadcast.svg */ "./node_modules/@cision/atlas-styles/dist/icons/broadcast.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_broadcast_svg__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_broadcast_svg__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _cision_atlas_styles_dist_icons_bubble_svg__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/bubble.svg */ "./node_modules/@cision/atlas-styles/dist/icons/bubble.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_bubble_svg__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_bubble_svg__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _cision_atlas_styles_dist_icons_building_1_svg__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/building-1.svg */ "./node_modules/@cision/atlas-styles/dist/icons/building-1.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_building_1_svg__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_building_1_svg__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _cision_atlas_styles_dist_icons_building_2_svg__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/building-2.svg */ "./node_modules/@cision/atlas-styles/dist/icons/building-2.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_building_2_svg__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_building_2_svg__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _cision_atlas_styles_dist_icons_building_3_svg__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/building-3.svg */ "./node_modules/@cision/atlas-styles/dist/icons/building-3.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_building_3_svg__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_building_3_svg__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _cision_atlas_styles_dist_icons_business_profile_svg__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/business-profile.svg */ "./node_modules/@cision/atlas-styles/dist/icons/business-profile.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_business_profile_svg__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_business_profile_svg__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _cision_atlas_styles_dist_icons_calendar_check_svg__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/calendar-check.svg */ "./node_modules/@cision/atlas-styles/dist/icons/calendar-check.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_calendar_check_svg__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_calendar_check_svg__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _cision_atlas_styles_dist_icons_calendar_event_svg__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/calendar-event.svg */ "./node_modules/@cision/atlas-styles/dist/icons/calendar-event.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_calendar_event_svg__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_calendar_event_svg__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _cision_atlas_styles_dist_icons_camera_svg__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/camera.svg */ "./node_modules/@cision/atlas-styles/dist/icons/camera.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_camera_svg__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_camera_svg__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _cision_atlas_styles_dist_icons_chat_svg__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/chat.svg */ "./node_modules/@cision/atlas-styles/dist/icons/chat.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_chat_svg__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_chat_svg__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _cision_atlas_styles_dist_icons_chat_1_svg__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/chat-1.svg */ "./node_modules/@cision/atlas-styles/dist/icons/chat-1.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_chat_1_svg__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_chat_1_svg__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _cision_atlas_styles_dist_icons_chat_2_svg__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/chat-2.svg */ "./node_modules/@cision/atlas-styles/dist/icons/chat-2.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_chat_2_svg__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_chat_2_svg__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _cision_atlas_styles_dist_icons_chat_3_svg__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/chat-3.svg */ "./node_modules/@cision/atlas-styles/dist/icons/chat-3.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_chat_3_svg__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_chat_3_svg__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var _cision_atlas_styles_dist_icons_chat_add_svg__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/chat-add.svg */ "./node_modules/@cision/atlas-styles/dist/icons/chat-add.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_chat_add_svg__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_chat_add_svg__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _cision_atlas_styles_dist_icons_check_svg__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/check.svg */ "./node_modules/@cision/atlas-styles/dist/icons/check.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_check_svg__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_check_svg__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var _cision_atlas_styles_dist_icons_checkmark_svg__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/checkmark.svg */ "./node_modules/@cision/atlas-styles/dist/icons/checkmark.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_checkmark_svg__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_checkmark_svg__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var _cision_atlas_styles_dist_icons_chevron_down_svg__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/chevron-down.svg */ "./node_modules/@cision/atlas-styles/dist/icons/chevron-down.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_chevron_down_svg__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_chevron_down_svg__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var _cision_atlas_styles_dist_icons_chevron_left_svg__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/chevron-left.svg */ "./node_modules/@cision/atlas-styles/dist/icons/chevron-left.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_chevron_left_svg__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_chevron_left_svg__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var _cision_atlas_styles_dist_icons_chevron_right_svg__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/chevron-right.svg */ "./node_modules/@cision/atlas-styles/dist/icons/chevron-right.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_chevron_right_svg__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_chevron_right_svg__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var _cision_atlas_styles_dist_icons_chevron_up_svg__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/chevron-up.svg */ "./node_modules/@cision/atlas-styles/dist/icons/chevron-up.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_chevron_up_svg__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_chevron_up_svg__WEBPACK_IMPORTED_MODULE_38__);
/* harmony import */ var _cision_atlas_styles_dist_icons_close_svg__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/close.svg */ "./node_modules/@cision/atlas-styles/dist/icons/close.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_close_svg__WEBPACK_IMPORTED_MODULE_39___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_close_svg__WEBPACK_IMPORTED_MODULE_39__);
/* harmony import */ var _cision_atlas_styles_dist_icons_cloud_svg__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/cloud.svg */ "./node_modules/@cision/atlas-styles/dist/icons/cloud.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_cloud_svg__WEBPACK_IMPORTED_MODULE_40___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_cloud_svg__WEBPACK_IMPORTED_MODULE_40__);
/* harmony import */ var _cision_atlas_styles_dist_icons_community_svg__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/community.svg */ "./node_modules/@cision/atlas-styles/dist/icons/community.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_community_svg__WEBPACK_IMPORTED_MODULE_41___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_community_svg__WEBPACK_IMPORTED_MODULE_41__);
/* harmony import */ var _cision_atlas_styles_dist_icons_contact_book_svg__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/contact-book.svg */ "./node_modules/@cision/atlas-styles/dist/icons/contact-book.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_contact_book_svg__WEBPACK_IMPORTED_MODULE_42___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_contact_book_svg__WEBPACK_IMPORTED_MODULE_42__);
/* harmony import */ var _cision_atlas_styles_dist_icons_contrast_svg__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/contrast.svg */ "./node_modules/@cision/atlas-styles/dist/icons/contrast.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_contrast_svg__WEBPACK_IMPORTED_MODULE_43___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_contrast_svg__WEBPACK_IMPORTED_MODULE_43__);
/* harmony import */ var _cision_atlas_styles_dist_icons_control_1_svg__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/control-1.svg */ "./node_modules/@cision/atlas-styles/dist/icons/control-1.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_control_1_svg__WEBPACK_IMPORTED_MODULE_44___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_control_1_svg__WEBPACK_IMPORTED_MODULE_44__);
/* harmony import */ var _cision_atlas_styles_dist_icons_control_2_svg__WEBPACK_IMPORTED_MODULE_45__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/control-2.svg */ "./node_modules/@cision/atlas-styles/dist/icons/control-2.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_control_2_svg__WEBPACK_IMPORTED_MODULE_45___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_control_2_svg__WEBPACK_IMPORTED_MODULE_45__);
/* harmony import */ var _cision_atlas_styles_dist_icons_directions_svg__WEBPACK_IMPORTED_MODULE_46__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/directions.svg */ "./node_modules/@cision/atlas-styles/dist/icons/directions.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_directions_svg__WEBPACK_IMPORTED_MODULE_46___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_directions_svg__WEBPACK_IMPORTED_MODULE_46__);
/* harmony import */ var _cision_atlas_styles_dist_icons_document_svg__WEBPACK_IMPORTED_MODULE_47__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/document.svg */ "./node_modules/@cision/atlas-styles/dist/icons/document.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_document_svg__WEBPACK_IMPORTED_MODULE_47___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_document_svg__WEBPACK_IMPORTED_MODULE_47__);
/* harmony import */ var _cision_atlas_styles_dist_icons_download_svg__WEBPACK_IMPORTED_MODULE_48__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/download.svg */ "./node_modules/@cision/atlas-styles/dist/icons/download.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_download_svg__WEBPACK_IMPORTED_MODULE_48___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_download_svg__WEBPACK_IMPORTED_MODULE_48__);
/* harmony import */ var _cision_atlas_styles_dist_icons_drag_svg__WEBPACK_IMPORTED_MODULE_49__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/drag.svg */ "./node_modules/@cision/atlas-styles/dist/icons/drag.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_drag_svg__WEBPACK_IMPORTED_MODULE_49___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_drag_svg__WEBPACK_IMPORTED_MODULE_49__);
/* harmony import */ var _cision_atlas_styles_dist_icons_dropdown_svg__WEBPACK_IMPORTED_MODULE_50__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/dropdown.svg */ "./node_modules/@cision/atlas-styles/dist/icons/dropdown.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_dropdown_svg__WEBPACK_IMPORTED_MODULE_50___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_dropdown_svg__WEBPACK_IMPORTED_MODULE_50__);
/* harmony import */ var _cision_atlas_styles_dist_icons_edit_svg__WEBPACK_IMPORTED_MODULE_51__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/edit.svg */ "./node_modules/@cision/atlas-styles/dist/icons/edit.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_edit_svg__WEBPACK_IMPORTED_MODULE_51___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_edit_svg__WEBPACK_IMPORTED_MODULE_51__);
/* harmony import */ var _cision_atlas_styles_dist_icons_exchange_svg__WEBPACK_IMPORTED_MODULE_52__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/exchange.svg */ "./node_modules/@cision/atlas-styles/dist/icons/exchange.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_exchange_svg__WEBPACK_IMPORTED_MODULE_52___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_exchange_svg__WEBPACK_IMPORTED_MODULE_52__);
/* harmony import */ var _cision_atlas_styles_dist_icons_eye_svg__WEBPACK_IMPORTED_MODULE_53__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/eye.svg */ "./node_modules/@cision/atlas-styles/dist/icons/eye.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_eye_svg__WEBPACK_IMPORTED_MODULE_53___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_eye_svg__WEBPACK_IMPORTED_MODULE_53__);
/* harmony import */ var _cision_atlas_styles_dist_icons_facebook_svg__WEBPACK_IMPORTED_MODULE_54__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/facebook.svg */ "./node_modules/@cision/atlas-styles/dist/icons/facebook.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_facebook_svg__WEBPACK_IMPORTED_MODULE_54___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_facebook_svg__WEBPACK_IMPORTED_MODULE_54__);
/* harmony import */ var _cision_atlas_styles_dist_icons_facebook_fullcolor_svg__WEBPACK_IMPORTED_MODULE_55__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/facebook-fullcolor.svg */ "./node_modules/@cision/atlas-styles/dist/icons/facebook-fullcolor.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_facebook_fullcolor_svg__WEBPACK_IMPORTED_MODULE_55___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_facebook_fullcolor_svg__WEBPACK_IMPORTED_MODULE_55__);
/* harmony import */ var _cision_atlas_styles_dist_icons_feed_panel_svg__WEBPACK_IMPORTED_MODULE_56__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/feed-panel.svg */ "./node_modules/@cision/atlas-styles/dist/icons/feed-panel.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_feed_panel_svg__WEBPACK_IMPORTED_MODULE_56___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_feed_panel_svg__WEBPACK_IMPORTED_MODULE_56__);
/* harmony import */ var _cision_atlas_styles_dist_icons_file_chart_svg__WEBPACK_IMPORTED_MODULE_57__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/file-chart.svg */ "./node_modules/@cision/atlas-styles/dist/icons/file-chart.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_file_chart_svg__WEBPACK_IMPORTED_MODULE_57___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_file_chart_svg__WEBPACK_IMPORTED_MODULE_57__);
/* harmony import */ var _cision_atlas_styles_dist_icons_file_copy_svg__WEBPACK_IMPORTED_MODULE_58__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/file-copy.svg */ "./node_modules/@cision/atlas-styles/dist/icons/file-copy.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_file_copy_svg__WEBPACK_IMPORTED_MODULE_58___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_file_copy_svg__WEBPACK_IMPORTED_MODULE_58__);
/* harmony import */ var _cision_atlas_styles_dist_icons_filter_svg__WEBPACK_IMPORTED_MODULE_59__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/filter.svg */ "./node_modules/@cision/atlas-styles/dist/icons/filter.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_filter_svg__WEBPACK_IMPORTED_MODULE_59___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_filter_svg__WEBPACK_IMPORTED_MODULE_59__);
/* harmony import */ var _cision_atlas_styles_dist_icons_flag_svg__WEBPACK_IMPORTED_MODULE_60__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/flag.svg */ "./node_modules/@cision/atlas-styles/dist/icons/flag.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_flag_svg__WEBPACK_IMPORTED_MODULE_60___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_flag_svg__WEBPACK_IMPORTED_MODULE_60__);
/* harmony import */ var _cision_atlas_styles_dist_icons_focus_svg__WEBPACK_IMPORTED_MODULE_61__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/focus.svg */ "./node_modules/@cision/atlas-styles/dist/icons/focus.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_focus_svg__WEBPACK_IMPORTED_MODULE_61___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_focus_svg__WEBPACK_IMPORTED_MODULE_61__);
/* harmony import */ var _cision_atlas_styles_dist_icons_folder_svg__WEBPACK_IMPORTED_MODULE_62__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/folder.svg */ "./node_modules/@cision/atlas-styles/dist/icons/folder.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_folder_svg__WEBPACK_IMPORTED_MODULE_62___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_folder_svg__WEBPACK_IMPORTED_MODULE_62__);
/* harmony import */ var _cision_atlas_styles_dist_icons_folder_add_svg__WEBPACK_IMPORTED_MODULE_63__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/folder-add.svg */ "./node_modules/@cision/atlas-styles/dist/icons/folder-add.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_folder_add_svg__WEBPACK_IMPORTED_MODULE_63___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_folder_add_svg__WEBPACK_IMPORTED_MODULE_63__);
/* harmony import */ var _cision_atlas_styles_dist_icons_font_size_svg__WEBPACK_IMPORTED_MODULE_64__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/font-size.svg */ "./node_modules/@cision/atlas-styles/dist/icons/font-size.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_font_size_svg__WEBPACK_IMPORTED_MODULE_64___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_font_size_svg__WEBPACK_IMPORTED_MODULE_64__);
/* harmony import */ var _cision_atlas_styles_dist_icons_forward_svg__WEBPACK_IMPORTED_MODULE_65__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/forward.svg */ "./node_modules/@cision/atlas-styles/dist/icons/forward.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_forward_svg__WEBPACK_IMPORTED_MODULE_65___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_forward_svg__WEBPACK_IMPORTED_MODULE_65__);
/* harmony import */ var _cision_atlas_styles_dist_icons_hall_svg__WEBPACK_IMPORTED_MODULE_66__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/hall.svg */ "./node_modules/@cision/atlas-styles/dist/icons/hall.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_hall_svg__WEBPACK_IMPORTED_MODULE_66___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_hall_svg__WEBPACK_IMPORTED_MODULE_66__);
/* harmony import */ var _cision_atlas_styles_dist_icons_help_svg__WEBPACK_IMPORTED_MODULE_67__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/help.svg */ "./node_modules/@cision/atlas-styles/dist/icons/help.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_help_svg__WEBPACK_IMPORTED_MODULE_67___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_help_svg__WEBPACK_IMPORTED_MODULE_67__);
/* harmony import */ var _cision_atlas_styles_dist_icons_home_svg__WEBPACK_IMPORTED_MODULE_68__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/home.svg */ "./node_modules/@cision/atlas-styles/dist/icons/home.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_home_svg__WEBPACK_IMPORTED_MODULE_68___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_home_svg__WEBPACK_IMPORTED_MODULE_68__);
/* harmony import */ var _cision_atlas_styles_dist_icons_indent_decrease_svg__WEBPACK_IMPORTED_MODULE_69__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/indent-decrease.svg */ "./node_modules/@cision/atlas-styles/dist/icons/indent-decrease.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_indent_decrease_svg__WEBPACK_IMPORTED_MODULE_69___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_indent_decrease_svg__WEBPACK_IMPORTED_MODULE_69__);
/* harmony import */ var _cision_atlas_styles_dist_icons_indent_increase_svg__WEBPACK_IMPORTED_MODULE_70__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/indent-increase.svg */ "./node_modules/@cision/atlas-styles/dist/icons/indent-increase.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_indent_increase_svg__WEBPACK_IMPORTED_MODULE_70___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_indent_increase_svg__WEBPACK_IMPORTED_MODULE_70__);
/* harmony import */ var _cision_atlas_styles_dist_icons_information_svg__WEBPACK_IMPORTED_MODULE_71__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/information.svg */ "./node_modules/@cision/atlas-styles/dist/icons/information.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_information_svg__WEBPACK_IMPORTED_MODULE_71___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_information_svg__WEBPACK_IMPORTED_MODULE_71__);
/* harmony import */ var _cision_atlas_styles_dist_icons_instagram_svg__WEBPACK_IMPORTED_MODULE_72__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/instagram.svg */ "./node_modules/@cision/atlas-styles/dist/icons/instagram.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_instagram_svg__WEBPACK_IMPORTED_MODULE_72___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_instagram_svg__WEBPACK_IMPORTED_MODULE_72__);
/* harmony import */ var _cision_atlas_styles_dist_icons_instagram_fullcolor_svg__WEBPACK_IMPORTED_MODULE_73__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/instagram-fullcolor.svg */ "./node_modules/@cision/atlas-styles/dist/icons/instagram-fullcolor.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_instagram_fullcolor_svg__WEBPACK_IMPORTED_MODULE_73___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_instagram_fullcolor_svg__WEBPACK_IMPORTED_MODULE_73__);
/* harmony import */ var _cision_atlas_styles_dist_icons_landscape_svg__WEBPACK_IMPORTED_MODULE_74__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/landscape.svg */ "./node_modules/@cision/atlas-styles/dist/icons/landscape.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_landscape_svg__WEBPACK_IMPORTED_MODULE_74___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_landscape_svg__WEBPACK_IMPORTED_MODULE_74__);
/* harmony import */ var _cision_atlas_styles_dist_icons_layout_1_svg__WEBPACK_IMPORTED_MODULE_75__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/layout-1.svg */ "./node_modules/@cision/atlas-styles/dist/icons/layout-1.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_layout_1_svg__WEBPACK_IMPORTED_MODULE_75___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_layout_1_svg__WEBPACK_IMPORTED_MODULE_75__);
/* harmony import */ var _cision_atlas_styles_dist_icons_layout_2_svg__WEBPACK_IMPORTED_MODULE_76__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/layout-2.svg */ "./node_modules/@cision/atlas-styles/dist/icons/layout-2.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_layout_2_svg__WEBPACK_IMPORTED_MODULE_76___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_layout_2_svg__WEBPACK_IMPORTED_MODULE_76__);
/* harmony import */ var _cision_atlas_styles_dist_icons_layout_3_svg__WEBPACK_IMPORTED_MODULE_77__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/layout-3.svg */ "./node_modules/@cision/atlas-styles/dist/icons/layout-3.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_layout_3_svg__WEBPACK_IMPORTED_MODULE_77___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_layout_3_svg__WEBPACK_IMPORTED_MODULE_77__);
/* harmony import */ var _cision_atlas_styles_dist_icons_layout_4_svg__WEBPACK_IMPORTED_MODULE_78__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/layout-4.svg */ "./node_modules/@cision/atlas-styles/dist/icons/layout-4.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_layout_4_svg__WEBPACK_IMPORTED_MODULE_78___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_layout_4_svg__WEBPACK_IMPORTED_MODULE_78__);
/* harmony import */ var _cision_atlas_styles_dist_icons_line_chart_svg__WEBPACK_IMPORTED_MODULE_79__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/line-chart.svg */ "./node_modules/@cision/atlas-styles/dist/icons/line-chart.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_line_chart_svg__WEBPACK_IMPORTED_MODULE_79___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_line_chart_svg__WEBPACK_IMPORTED_MODULE_79__);
/* harmony import */ var _cision_atlas_styles_dist_icons_linkedin_svg__WEBPACK_IMPORTED_MODULE_80__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/linkedin.svg */ "./node_modules/@cision/atlas-styles/dist/icons/linkedin.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_linkedin_svg__WEBPACK_IMPORTED_MODULE_80___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_linkedin_svg__WEBPACK_IMPORTED_MODULE_80__);
/* harmony import */ var _cision_atlas_styles_dist_icons_linkedin_fullcolor_svg__WEBPACK_IMPORTED_MODULE_81__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/linkedin-fullcolor.svg */ "./node_modules/@cision/atlas-styles/dist/icons/linkedin-fullcolor.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_linkedin_fullcolor_svg__WEBPACK_IMPORTED_MODULE_81___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_linkedin_fullcolor_svg__WEBPACK_IMPORTED_MODULE_81__);
/* harmony import */ var _cision_atlas_styles_dist_icons_list_svg__WEBPACK_IMPORTED_MODULE_82__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/list.svg */ "./node_modules/@cision/atlas-styles/dist/icons/list.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_list_svg__WEBPACK_IMPORTED_MODULE_82___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_list_svg__WEBPACK_IMPORTED_MODULE_82__);
/* harmony import */ var _cision_atlas_styles_dist_icons_loader_svg__WEBPACK_IMPORTED_MODULE_83__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/loader.svg */ "./node_modules/@cision/atlas-styles/dist/icons/loader.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_loader_svg__WEBPACK_IMPORTED_MODULE_83___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_loader_svg__WEBPACK_IMPORTED_MODULE_83__);
/* harmony import */ var _cision_atlas_styles_dist_icons_location_svg__WEBPACK_IMPORTED_MODULE_84__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/location.svg */ "./node_modules/@cision/atlas-styles/dist/icons/location.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_location_svg__WEBPACK_IMPORTED_MODULE_84___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_location_svg__WEBPACK_IMPORTED_MODULE_84__);
/* harmony import */ var _cision_atlas_styles_dist_icons_login_svg__WEBPACK_IMPORTED_MODULE_85__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/login.svg */ "./node_modules/@cision/atlas-styles/dist/icons/login.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_login_svg__WEBPACK_IMPORTED_MODULE_85___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_login_svg__WEBPACK_IMPORTED_MODULE_85__);
/* harmony import */ var _cision_atlas_styles_dist_icons_logout_svg__WEBPACK_IMPORTED_MODULE_86__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/logout.svg */ "./node_modules/@cision/atlas-styles/dist/icons/logout.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_logout_svg__WEBPACK_IMPORTED_MODULE_86___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_logout_svg__WEBPACK_IMPORTED_MODULE_86__);
/* harmony import */ var _cision_atlas_styles_dist_icons_mail_add_svg__WEBPACK_IMPORTED_MODULE_87__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/mail-add.svg */ "./node_modules/@cision/atlas-styles/dist/icons/mail-add.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_mail_add_svg__WEBPACK_IMPORTED_MODULE_87___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_mail_add_svg__WEBPACK_IMPORTED_MODULE_87__);
/* harmony import */ var _cision_atlas_styles_dist_icons_mail_check_svg__WEBPACK_IMPORTED_MODULE_88__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/mail-check.svg */ "./node_modules/@cision/atlas-styles/dist/icons/mail-check.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_mail_check_svg__WEBPACK_IMPORTED_MODULE_88___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_mail_check_svg__WEBPACK_IMPORTED_MODULE_88__);
/* harmony import */ var _cision_atlas_styles_dist_icons_marketplace_svg__WEBPACK_IMPORTED_MODULE_89__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/marketplace.svg */ "./node_modules/@cision/atlas-styles/dist/icons/marketplace.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_marketplace_svg__WEBPACK_IMPORTED_MODULE_89___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_marketplace_svg__WEBPACK_IMPORTED_MODULE_89__);
/* harmony import */ var _cision_atlas_styles_dist_icons_menu_kebab_svg__WEBPACK_IMPORTED_MODULE_90__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/menu-kebab.svg */ "./node_modules/@cision/atlas-styles/dist/icons/menu-kebab.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_menu_kebab_svg__WEBPACK_IMPORTED_MODULE_90___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_menu_kebab_svg__WEBPACK_IMPORTED_MODULE_90__);
/* harmony import */ var _cision_atlas_styles_dist_icons_menu_meatball_svg__WEBPACK_IMPORTED_MODULE_91__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/menu-meatball.svg */ "./node_modules/@cision/atlas-styles/dist/icons/menu-meatball.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_menu_meatball_svg__WEBPACK_IMPORTED_MODULE_91___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_menu_meatball_svg__WEBPACK_IMPORTED_MODULE_91__);
/* harmony import */ var _cision_atlas_styles_dist_icons_messages_svg__WEBPACK_IMPORTED_MODULE_92__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/messages.svg */ "./node_modules/@cision/atlas-styles/dist/icons/messages.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_messages_svg__WEBPACK_IMPORTED_MODULE_92___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_messages_svg__WEBPACK_IMPORTED_MODULE_92__);
/* harmony import */ var _cision_atlas_styles_dist_icons_movie_svg__WEBPACK_IMPORTED_MODULE_93__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/movie.svg */ "./node_modules/@cision/atlas-styles/dist/icons/movie.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_movie_svg__WEBPACK_IMPORTED_MODULE_93___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_movie_svg__WEBPACK_IMPORTED_MODULE_93__);
/* harmony import */ var _cision_atlas_styles_dist_icons_my_network_svg__WEBPACK_IMPORTED_MODULE_94__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/my-network.svg */ "./node_modules/@cision/atlas-styles/dist/icons/my-network.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_my_network_svg__WEBPACK_IMPORTED_MODULE_94___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_my_network_svg__WEBPACK_IMPORTED_MODULE_94__);
/* harmony import */ var _cision_atlas_styles_dist_icons_new_window_svg__WEBPACK_IMPORTED_MODULE_95__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/new-window.svg */ "./node_modules/@cision/atlas-styles/dist/icons/new-window.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_new_window_svg__WEBPACK_IMPORTED_MODULE_95___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_new_window_svg__WEBPACK_IMPORTED_MODULE_95__);
/* harmony import */ var _cision_atlas_styles_dist_icons_newsfeed_svg__WEBPACK_IMPORTED_MODULE_96__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/newsfeed.svg */ "./node_modules/@cision/atlas-styles/dist/icons/newsfeed.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_newsfeed_svg__WEBPACK_IMPORTED_MODULE_96___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_newsfeed_svg__WEBPACK_IMPORTED_MODULE_96__);
/* harmony import */ var _cision_atlas_styles_dist_icons_newsfeed_slash_svg__WEBPACK_IMPORTED_MODULE_97__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/newsfeed-slash.svg */ "./node_modules/@cision/atlas-styles/dist/icons/newsfeed-slash.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_newsfeed_slash_svg__WEBPACK_IMPORTED_MODULE_97___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_newsfeed_slash_svg__WEBPACK_IMPORTED_MODULE_97__);
/* harmony import */ var _cision_atlas_styles_dist_icons_newspaper_svg__WEBPACK_IMPORTED_MODULE_98__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/newspaper.svg */ "./node_modules/@cision/atlas-styles/dist/icons/newspaper.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_newspaper_svg__WEBPACK_IMPORTED_MODULE_98___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_newspaper_svg__WEBPACK_IMPORTED_MODULE_98__);
/* harmony import */ var _cision_atlas_styles_dist_icons_next_svg__WEBPACK_IMPORTED_MODULE_99__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/next.svg */ "./node_modules/@cision/atlas-styles/dist/icons/next.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_next_svg__WEBPACK_IMPORTED_MODULE_99___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_next_svg__WEBPACK_IMPORTED_MODULE_99__);
/* harmony import */ var _cision_atlas_styles_dist_icons_node_tree_svg__WEBPACK_IMPORTED_MODULE_100__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/node-tree.svg */ "./node_modules/@cision/atlas-styles/dist/icons/node-tree.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_node_tree_svg__WEBPACK_IMPORTED_MODULE_100___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_node_tree_svg__WEBPACK_IMPORTED_MODULE_100__);
/* harmony import */ var _cision_atlas_styles_dist_icons_notifications_svg__WEBPACK_IMPORTED_MODULE_101__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/notifications.svg */ "./node_modules/@cision/atlas-styles/dist/icons/notifications.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_notifications_svg__WEBPACK_IMPORTED_MODULE_101___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_notifications_svg__WEBPACK_IMPORTED_MODULE_101__);
/* harmony import */ var _cision_atlas_styles_dist_icons_paragraph_svg__WEBPACK_IMPORTED_MODULE_102__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/paragraph.svg */ "./node_modules/@cision/atlas-styles/dist/icons/paragraph.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_paragraph_svg__WEBPACK_IMPORTED_MODULE_102___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_paragraph_svg__WEBPACK_IMPORTED_MODULE_102__);
/* harmony import */ var _cision_atlas_styles_dist_icons_picture_svg__WEBPACK_IMPORTED_MODULE_103__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/picture.svg */ "./node_modules/@cision/atlas-styles/dist/icons/picture.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_picture_svg__WEBPACK_IMPORTED_MODULE_103___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_picture_svg__WEBPACK_IMPORTED_MODULE_103__);
/* harmony import */ var _cision_atlas_styles_dist_icons_pie_chart_svg__WEBPACK_IMPORTED_MODULE_104__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/pie-chart.svg */ "./node_modules/@cision/atlas-styles/dist/icons/pie-chart.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_pie_chart_svg__WEBPACK_IMPORTED_MODULE_104___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_pie_chart_svg__WEBPACK_IMPORTED_MODULE_104__);
/* harmony import */ var _cision_atlas_styles_dist_icons_play_circle_svg__WEBPACK_IMPORTED_MODULE_105__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/play-circle.svg */ "./node_modules/@cision/atlas-styles/dist/icons/play-circle.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_play_circle_svg__WEBPACK_IMPORTED_MODULE_105___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_play_circle_svg__WEBPACK_IMPORTED_MODULE_105__);
/* harmony import */ var _cision_atlas_styles_dist_icons_previous_svg__WEBPACK_IMPORTED_MODULE_106__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/previous.svg */ "./node_modules/@cision/atlas-styles/dist/icons/previous.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_previous_svg__WEBPACK_IMPORTED_MODULE_106___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_previous_svg__WEBPACK_IMPORTED_MODULE_106__);
/* harmony import */ var _cision_atlas_styles_dist_icons_printer_svg__WEBPACK_IMPORTED_MODULE_107__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/printer.svg */ "./node_modules/@cision/atlas-styles/dist/icons/printer.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_printer_svg__WEBPACK_IMPORTED_MODULE_107___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_printer_svg__WEBPACK_IMPORTED_MODULE_107__);
/* harmony import */ var _cision_atlas_styles_dist_icons_projects_svg__WEBPACK_IMPORTED_MODULE_108__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/projects.svg */ "./node_modules/@cision/atlas-styles/dist/icons/projects.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_projects_svg__WEBPACK_IMPORTED_MODULE_108___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_projects_svg__WEBPACK_IMPORTED_MODULE_108__);
/* harmony import */ var _cision_atlas_styles_dist_icons_question_answer_svg__WEBPACK_IMPORTED_MODULE_109__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/question-answer.svg */ "./node_modules/@cision/atlas-styles/dist/icons/question-answer.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_question_answer_svg__WEBPACK_IMPORTED_MODULE_109___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_question_answer_svg__WEBPACK_IMPORTED_MODULE_109__);
/* harmony import */ var _cision_atlas_styles_dist_icons_reddit_svg__WEBPACK_IMPORTED_MODULE_110__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/reddit.svg */ "./node_modules/@cision/atlas-styles/dist/icons/reddit.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_reddit_svg__WEBPACK_IMPORTED_MODULE_110___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_reddit_svg__WEBPACK_IMPORTED_MODULE_110__);
/* harmony import */ var _cision_atlas_styles_dist_icons_reddit_fullcolor_svg__WEBPACK_IMPORTED_MODULE_111__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/reddit-fullcolor.svg */ "./node_modules/@cision/atlas-styles/dist/icons/reddit-fullcolor.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_reddit_fullcolor_svg__WEBPACK_IMPORTED_MODULE_111___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_reddit_fullcolor_svg__WEBPACK_IMPORTED_MODULE_111__);
/* harmony import */ var _cision_atlas_styles_dist_icons_refresh_svg__WEBPACK_IMPORTED_MODULE_112__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/refresh.svg */ "./node_modules/@cision/atlas-styles/dist/icons/refresh.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_refresh_svg__WEBPACK_IMPORTED_MODULE_112___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_refresh_svg__WEBPACK_IMPORTED_MODULE_112__);
/* harmony import */ var _cision_atlas_styles_dist_icons_reply_svg__WEBPACK_IMPORTED_MODULE_113__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/reply.svg */ "./node_modules/@cision/atlas-styles/dist/icons/reply.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_reply_svg__WEBPACK_IMPORTED_MODULE_113___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_reply_svg__WEBPACK_IMPORTED_MODULE_113__);
/* harmony import */ var _cision_atlas_styles_dist_icons_reply_all_svg__WEBPACK_IMPORTED_MODULE_114__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/reply-all.svg */ "./node_modules/@cision/atlas-styles/dist/icons/reply-all.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_reply_all_svg__WEBPACK_IMPORTED_MODULE_114___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_reply_all_svg__WEBPACK_IMPORTED_MODULE_114__);
/* harmony import */ var _cision_atlas_styles_dist_icons_save_svg__WEBPACK_IMPORTED_MODULE_115__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/save.svg */ "./node_modules/@cision/atlas-styles/dist/icons/save.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_save_svg__WEBPACK_IMPORTED_MODULE_115___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_save_svg__WEBPACK_IMPORTED_MODULE_115__);
/* harmony import */ var _cision_atlas_styles_dist_icons_search_svg__WEBPACK_IMPORTED_MODULE_116__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/search.svg */ "./node_modules/@cision/atlas-styles/dist/icons/search.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_search_svg__WEBPACK_IMPORTED_MODULE_116___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_search_svg__WEBPACK_IMPORTED_MODULE_116__);
/* harmony import */ var _cision_atlas_styles_dist_icons_settings_svg__WEBPACK_IMPORTED_MODULE_117__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/settings.svg */ "./node_modules/@cision/atlas-styles/dist/icons/settings.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_settings_svg__WEBPACK_IMPORTED_MODULE_117___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_settings_svg__WEBPACK_IMPORTED_MODULE_117__);
/* harmony import */ var _cision_atlas_styles_dist_icons_share_svg__WEBPACK_IMPORTED_MODULE_118__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/share.svg */ "./node_modules/@cision/atlas-styles/dist/icons/share.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_share_svg__WEBPACK_IMPORTED_MODULE_118___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_share_svg__WEBPACK_IMPORTED_MODULE_118__);
/* harmony import */ var _cision_atlas_styles_dist_icons_slideshow_1_svg__WEBPACK_IMPORTED_MODULE_119__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/slideshow-1.svg */ "./node_modules/@cision/atlas-styles/dist/icons/slideshow-1.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_slideshow_1_svg__WEBPACK_IMPORTED_MODULE_119___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_slideshow_1_svg__WEBPACK_IMPORTED_MODULE_119__);
/* harmony import */ var _cision_atlas_styles_dist_icons_slideshow_2_svg__WEBPACK_IMPORTED_MODULE_120__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/slideshow-2.svg */ "./node_modules/@cision/atlas-styles/dist/icons/slideshow-2.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_slideshow_2_svg__WEBPACK_IMPORTED_MODULE_120___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_slideshow_2_svg__WEBPACK_IMPORTED_MODULE_120__);
/* harmony import */ var _cision_atlas_styles_dist_icons_stack_svg__WEBPACK_IMPORTED_MODULE_121__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/stack.svg */ "./node_modules/@cision/atlas-styles/dist/icons/stack.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_stack_svg__WEBPACK_IMPORTED_MODULE_121___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_stack_svg__WEBPACK_IMPORTED_MODULE_121__);
/* harmony import */ var _cision_atlas_styles_dist_icons_sticky_note_svg__WEBPACK_IMPORTED_MODULE_122__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/sticky-note.svg */ "./node_modules/@cision/atlas-styles/dist/icons/sticky-note.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_sticky_note_svg__WEBPACK_IMPORTED_MODULE_122___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_sticky_note_svg__WEBPACK_IMPORTED_MODULE_122__);
/* harmony import */ var _cision_atlas_styles_dist_icons_submit_svg__WEBPACK_IMPORTED_MODULE_123__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/submit.svg */ "./node_modules/@cision/atlas-styles/dist/icons/submit.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_submit_svg__WEBPACK_IMPORTED_MODULE_123___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_submit_svg__WEBPACK_IMPORTED_MODULE_123__);
/* harmony import */ var _cision_atlas_styles_dist_icons_thumb_up_svg__WEBPACK_IMPORTED_MODULE_124__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/thumb-up.svg */ "./node_modules/@cision/atlas-styles/dist/icons/thumb-up.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_thumb_up_svg__WEBPACK_IMPORTED_MODULE_124___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_thumb_up_svg__WEBPACK_IMPORTED_MODULE_124__);
/* harmony import */ var _cision_atlas_styles_dist_icons_tik_tok_svg__WEBPACK_IMPORTED_MODULE_125__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/tik-tok.svg */ "./node_modules/@cision/atlas-styles/dist/icons/tik-tok.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_tik_tok_svg__WEBPACK_IMPORTED_MODULE_125___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_tik_tok_svg__WEBPACK_IMPORTED_MODULE_125__);
/* harmony import */ var _cision_atlas_styles_dist_icons_trash_svg__WEBPACK_IMPORTED_MODULE_126__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/trash.svg */ "./node_modules/@cision/atlas-styles/dist/icons/trash.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_trash_svg__WEBPACK_IMPORTED_MODULE_126___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_trash_svg__WEBPACK_IMPORTED_MODULE_126__);
/* harmony import */ var _cision_atlas_styles_dist_icons_twitter_svg__WEBPACK_IMPORTED_MODULE_127__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/twitter.svg */ "./node_modules/@cision/atlas-styles/dist/icons/twitter.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_twitter_svg__WEBPACK_IMPORTED_MODULE_127___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_twitter_svg__WEBPACK_IMPORTED_MODULE_127__);
/* harmony import */ var _cision_atlas_styles_dist_icons_twitter_fullcolor_svg__WEBPACK_IMPORTED_MODULE_128__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/twitter-fullcolor.svg */ "./node_modules/@cision/atlas-styles/dist/icons/twitter-fullcolor.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_twitter_fullcolor_svg__WEBPACK_IMPORTED_MODULE_128___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_twitter_fullcolor_svg__WEBPACK_IMPORTED_MODULE_128__);
/* harmony import */ var _cision_atlas_styles_dist_icons_unarchive_svg__WEBPACK_IMPORTED_MODULE_129__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/unarchive.svg */ "./node_modules/@cision/atlas-styles/dist/icons/unarchive.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_unarchive_svg__WEBPACK_IMPORTED_MODULE_129___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_unarchive_svg__WEBPACK_IMPORTED_MODULE_129__);
/* harmony import */ var _cision_atlas_styles_dist_icons_underline_svg__WEBPACK_IMPORTED_MODULE_130__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/underline.svg */ "./node_modules/@cision/atlas-styles/dist/icons/underline.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_underline_svg__WEBPACK_IMPORTED_MODULE_130___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_underline_svg__WEBPACK_IMPORTED_MODULE_130__);
/* harmony import */ var _cision_atlas_styles_dist_icons_upload_1_svg__WEBPACK_IMPORTED_MODULE_131__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/upload-1.svg */ "./node_modules/@cision/atlas-styles/dist/icons/upload-1.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_upload_1_svg__WEBPACK_IMPORTED_MODULE_131___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_upload_1_svg__WEBPACK_IMPORTED_MODULE_131__);
/* harmony import */ var _cision_atlas_styles_dist_icons_upload_2_svg__WEBPACK_IMPORTED_MODULE_132__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/upload-2.svg */ "./node_modules/@cision/atlas-styles/dist/icons/upload-2.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_upload_2_svg__WEBPACK_IMPORTED_MODULE_132___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_upload_2_svg__WEBPACK_IMPORTED_MODULE_132__);
/* harmony import */ var _cision_atlas_styles_dist_icons_user_svg__WEBPACK_IMPORTED_MODULE_133__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/user.svg */ "./node_modules/@cision/atlas-styles/dist/icons/user.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_user_svg__WEBPACK_IMPORTED_MODULE_133___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_user_svg__WEBPACK_IMPORTED_MODULE_133__);
/* harmony import */ var _cision_atlas_styles_dist_icons_warning_svg__WEBPACK_IMPORTED_MODULE_134__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/warning.svg */ "./node_modules/@cision/atlas-styles/dist/icons/warning.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_warning_svg__WEBPACK_IMPORTED_MODULE_134___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_warning_svg__WEBPACK_IMPORTED_MODULE_134__);
/* harmony import */ var _cision_atlas_styles_dist_icons_warning_report_svg__WEBPACK_IMPORTED_MODULE_135__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/warning-report.svg */ "./node_modules/@cision/atlas-styles/dist/icons/warning-report.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_warning_report_svg__WEBPACK_IMPORTED_MODULE_135___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_warning_report_svg__WEBPACK_IMPORTED_MODULE_135__);
/* harmony import */ var _cision_atlas_styles_dist_icons_website_svg__WEBPACK_IMPORTED_MODULE_136__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/website.svg */ "./node_modules/@cision/atlas-styles/dist/icons/website.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_website_svg__WEBPACK_IMPORTED_MODULE_136___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_website_svg__WEBPACK_IMPORTED_MODULE_136__);
/* harmony import */ var _cision_atlas_styles_dist_icons_window_svg__WEBPACK_IMPORTED_MODULE_137__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/window.svg */ "./node_modules/@cision/atlas-styles/dist/icons/window.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_window_svg__WEBPACK_IMPORTED_MODULE_137___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_window_svg__WEBPACK_IMPORTED_MODULE_137__);
/* harmony import */ var _cision_atlas_styles_dist_icons_youtube_svg__WEBPACK_IMPORTED_MODULE_138__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/youtube.svg */ "./node_modules/@cision/atlas-styles/dist/icons/youtube.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_youtube_svg__WEBPACK_IMPORTED_MODULE_138___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_youtube_svg__WEBPACK_IMPORTED_MODULE_138__);
/* harmony import */ var _cision_atlas_styles_dist_icons_youtube_fullcolor_svg__WEBPACK_IMPORTED_MODULE_139__ = __webpack_require__(/*! @cision/atlas-styles/dist/icons/youtube-fullcolor.svg */ "./node_modules/@cision/atlas-styles/dist/icons/youtube-fullcolor.svg");
/* harmony import */ var _cision_atlas_styles_dist_icons_youtube_fullcolor_svg__WEBPACK_IMPORTED_MODULE_139___default = /*#__PURE__*/__webpack_require__.n(_cision_atlas_styles_dist_icons_youtube_fullcolor_svg__WEBPACK_IMPORTED_MODULE_139__);













































































































































const iconMappings = {
	add: { alt: 'At', icon: (_cision_atlas_styles_dist_icons_add_svg__WEBPACK_IMPORTED_MODULE_0___default()) },
	addCircle: { alt: 'Add Circle', icon: (_cision_atlas_styles_dist_icons_add_circle_svg__WEBPACK_IMPORTED_MODULE_1___default()) },
	alignCenter: { alt: 'Align Center', icon: (_cision_atlas_styles_dist_icons_align_center_svg__WEBPACK_IMPORTED_MODULE_2___default()) },
	alignJustify: { alt: 'Align Justify', icon: (_cision_atlas_styles_dist_icons_align_justify_svg__WEBPACK_IMPORTED_MODULE_3___default()) },
	alignLeft: { alt: 'Align Left', icon: (_cision_atlas_styles_dist_icons_align_left_svg__WEBPACK_IMPORTED_MODULE_4___default()) },
	alignRight: { alt: 'Align Right', icon: (_cision_atlas_styles_dist_icons_align_right_svg__WEBPACK_IMPORTED_MODULE_5___default()) },
	archive1: { alt: 'Archive 1', icon: (_cision_atlas_styles_dist_icons_archive_1_svg__WEBPACK_IMPORTED_MODULE_6___default()) },
	archive2: { alt: 'Archive 2', icon: (_cision_atlas_styles_dist_icons_archive_2_svg__WEBPACK_IMPORTED_MODULE_7___default()) },
	arrowBackward: { alt: 'Arrow Backward', icon: (_cision_atlas_styles_dist_icons_arrow_backward_svg__WEBPACK_IMPORTED_MODULE_8___default()) },
	arrowDown: { alt: 'Arrow Down', icon: (_cision_atlas_styles_dist_icons_arrow_down_svg__WEBPACK_IMPORTED_MODULE_9___default()) },
	arrowForward: { alt: 'Arrow Forward', icon: (_cision_atlas_styles_dist_icons_arrow_forward_svg__WEBPACK_IMPORTED_MODULE_10___default()) },
	arrowUp: { alt: 'Arrow Up', icon: (_cision_atlas_styles_dist_icons_arrow_up_svg__WEBPACK_IMPORTED_MODULE_11___default()) },
	at: { alt: 'At', icon: (_cision_atlas_styles_dist_icons_at_svg__WEBPACK_IMPORTED_MODULE_12___default()) },
	bank: { alt: 'Bank', icon: (_cision_atlas_styles_dist_icons_bank_svg__WEBPACK_IMPORTED_MODULE_13___default()) },
	barChart1: { alt: 'Bar Chart 1', icon: (_cision_atlas_styles_dist_icons_bar_chart_1_svg__WEBPACK_IMPORTED_MODULE_14___default()) },
	barChart2: { alt: 'Bar Chart 2', icon: (_cision_atlas_styles_dist_icons_bar_chart_2_svg__WEBPACK_IMPORTED_MODULE_15___default()) },
	bold: { alt: 'Bold', icon: (_cision_atlas_styles_dist_icons_bold_svg__WEBPACK_IMPORTED_MODULE_16___default()) },
	bookmark: { alt: 'Bookmark', icon: (_cision_atlas_styles_dist_icons_bookmark_svg__WEBPACK_IMPORTED_MODULE_18___default()) },
	bookOpen: { alt: 'Book Open', icon: (_cision_atlas_styles_dist_icons_book_open_svg__WEBPACK_IMPORTED_MODULE_17___default()) },
	broadcast: { alt: 'Broadcast', icon: (_cision_atlas_styles_dist_icons_broadcast_svg__WEBPACK_IMPORTED_MODULE_19___default()) },
	bubble: { alt: 'Bubble', icon: (_cision_atlas_styles_dist_icons_bubble_svg__WEBPACK_IMPORTED_MODULE_20___default()) },
	building1: { alt: 'Building 1', icon: (_cision_atlas_styles_dist_icons_building_1_svg__WEBPACK_IMPORTED_MODULE_21___default()) },
	building2: { alt: 'Building 2', icon: (_cision_atlas_styles_dist_icons_building_2_svg__WEBPACK_IMPORTED_MODULE_22___default()) },
	building3: { alt: 'Building 3', icon: (_cision_atlas_styles_dist_icons_building_3_svg__WEBPACK_IMPORTED_MODULE_23___default()) },
	businessProfile: { alt: 'Business Profile', icon: (_cision_atlas_styles_dist_icons_business_profile_svg__WEBPACK_IMPORTED_MODULE_24___default()) },
	calendarCheck: { alt: 'Calendar Check', icon: (_cision_atlas_styles_dist_icons_calendar_check_svg__WEBPACK_IMPORTED_MODULE_25___default()) },
	calendarEvent: { alt: 'Calendar Event', icon: (_cision_atlas_styles_dist_icons_calendar_event_svg__WEBPACK_IMPORTED_MODULE_26___default()) },
	camera: { alt: 'Camera', icon: (_cision_atlas_styles_dist_icons_camera_svg__WEBPACK_IMPORTED_MODULE_27___default()) },
	chat: { alt: 'Chat', icon: (_cision_atlas_styles_dist_icons_chat_svg__WEBPACK_IMPORTED_MODULE_28___default()) },
	chat1: { alt: 'Chat 1', icon: (_cision_atlas_styles_dist_icons_chat_1_svg__WEBPACK_IMPORTED_MODULE_29___default()) },
	chat2: { alt: 'Chat 2', icon: (_cision_atlas_styles_dist_icons_chat_2_svg__WEBPACK_IMPORTED_MODULE_30___default()) },
	chat3: { alt: 'Chat 3', icon: (_cision_atlas_styles_dist_icons_chat_3_svg__WEBPACK_IMPORTED_MODULE_31___default()) },
	chatAdd: { alt: 'Chat Add', icon: (_cision_atlas_styles_dist_icons_chat_add_svg__WEBPACK_IMPORTED_MODULE_32___default()) },
	check: { alt: 'Check', icon: (_cision_atlas_styles_dist_icons_check_svg__WEBPACK_IMPORTED_MODULE_33___default()) },
	checkmark: { alt: 'Checkmark', icon: (_cision_atlas_styles_dist_icons_checkmark_svg__WEBPACK_IMPORTED_MODULE_34___default()) },
	chevronDown: { alt: 'Chevron Down', icon: (_cision_atlas_styles_dist_icons_chevron_down_svg__WEBPACK_IMPORTED_MODULE_35___default()) },
	chevronLeft: { alt: 'Chevron Left', icon: (_cision_atlas_styles_dist_icons_chevron_left_svg__WEBPACK_IMPORTED_MODULE_36___default()) },
	chevronRight: { alt: 'Chevron Right', icon: (_cision_atlas_styles_dist_icons_chevron_right_svg__WEBPACK_IMPORTED_MODULE_37___default()) },
	chevronUp: { alt: 'Chevron Up', icon: (_cision_atlas_styles_dist_icons_chevron_up_svg__WEBPACK_IMPORTED_MODULE_38___default()) },
	close: { alt: 'Close', icon: (_cision_atlas_styles_dist_icons_close_svg__WEBPACK_IMPORTED_MODULE_39___default()) },
	cloud: { alt: 'Cloud', icon: (_cision_atlas_styles_dist_icons_cloud_svg__WEBPACK_IMPORTED_MODULE_40___default()) },
	community: { alt: 'Community', icon: (_cision_atlas_styles_dist_icons_community_svg__WEBPACK_IMPORTED_MODULE_41___default()) },
	contactBook: { alt: 'Contact Book', icon: (_cision_atlas_styles_dist_icons_contact_book_svg__WEBPACK_IMPORTED_MODULE_42___default()) },
	contrast: { alt: 'Contrast', icon: (_cision_atlas_styles_dist_icons_contrast_svg__WEBPACK_IMPORTED_MODULE_43___default()) },
	control1: { alt: 'Control 1', icon: (_cision_atlas_styles_dist_icons_control_1_svg__WEBPACK_IMPORTED_MODULE_44___default()) },
	control2: { alt: 'Control 2', icon: (_cision_atlas_styles_dist_icons_control_2_svg__WEBPACK_IMPORTED_MODULE_45___default()) },
	directions: { alt: 'Directions', icon: (_cision_atlas_styles_dist_icons_directions_svg__WEBPACK_IMPORTED_MODULE_46___default()) },
	document: { alt: 'Document', icon: (_cision_atlas_styles_dist_icons_document_svg__WEBPACK_IMPORTED_MODULE_47___default()) },
	download: { alt: 'Download', icon: (_cision_atlas_styles_dist_icons_download_svg__WEBPACK_IMPORTED_MODULE_48___default()) },
	drag: { alt: 'Drag', icon: (_cision_atlas_styles_dist_icons_drag_svg__WEBPACK_IMPORTED_MODULE_49___default()) },
	dropdown: { alt: 'Dropdown', icon: (_cision_atlas_styles_dist_icons_dropdown_svg__WEBPACK_IMPORTED_MODULE_50___default()) },
	edit: { alt: 'Edit', icon: (_cision_atlas_styles_dist_icons_edit_svg__WEBPACK_IMPORTED_MODULE_51___default()) },
	exchange: { alt: 'Exchange', icon: (_cision_atlas_styles_dist_icons_exchange_svg__WEBPACK_IMPORTED_MODULE_52___default()) },
	eye: { alt: 'Eye', icon: (_cision_atlas_styles_dist_icons_eye_svg__WEBPACK_IMPORTED_MODULE_53___default()) },
	facebook: { alt: 'Facebook', icon: (_cision_atlas_styles_dist_icons_facebook_svg__WEBPACK_IMPORTED_MODULE_54___default()) },
	facebookFullcolor: { alt: 'Facebook Fullcolor', icon: (_cision_atlas_styles_dist_icons_facebook_fullcolor_svg__WEBPACK_IMPORTED_MODULE_55___default()) },
	feedPanel: { alt: 'Feed Panel', icon: (_cision_atlas_styles_dist_icons_feed_panel_svg__WEBPACK_IMPORTED_MODULE_56___default()) },
	fileChart: { alt: 'File Chart', icon: (_cision_atlas_styles_dist_icons_file_chart_svg__WEBPACK_IMPORTED_MODULE_57___default()) },
	fileCopy: { alt: 'File Copy', icon: (_cision_atlas_styles_dist_icons_file_copy_svg__WEBPACK_IMPORTED_MODULE_58___default()) },
	filter: { alt: 'Filter', icon: (_cision_atlas_styles_dist_icons_filter_svg__WEBPACK_IMPORTED_MODULE_59___default()) },
	flag: { alt: 'Flag', icon: (_cision_atlas_styles_dist_icons_flag_svg__WEBPACK_IMPORTED_MODULE_60___default()) },
	focus: { alt: 'Focus', icon: (_cision_atlas_styles_dist_icons_focus_svg__WEBPACK_IMPORTED_MODULE_61___default()) },
	folder: { alt: 'Folder', icon: (_cision_atlas_styles_dist_icons_folder_svg__WEBPACK_IMPORTED_MODULE_62___default()) },
	folderAdd: { alt: 'Folder Add', icon: (_cision_atlas_styles_dist_icons_folder_add_svg__WEBPACK_IMPORTED_MODULE_63___default()) },
	fontSize: { alt: 'Font Size', icon: (_cision_atlas_styles_dist_icons_font_size_svg__WEBPACK_IMPORTED_MODULE_64___default()) },
	forward: { alt: 'Forward', icon: (_cision_atlas_styles_dist_icons_forward_svg__WEBPACK_IMPORTED_MODULE_65___default()) },
	hall: { alt: 'Hall', icon: (_cision_atlas_styles_dist_icons_hall_svg__WEBPACK_IMPORTED_MODULE_66___default()) },
	help: { alt: 'Help', icon: (_cision_atlas_styles_dist_icons_help_svg__WEBPACK_IMPORTED_MODULE_67___default()) },
	home: { alt: 'Home', icon: (_cision_atlas_styles_dist_icons_home_svg__WEBPACK_IMPORTED_MODULE_68___default()) },
	indentDecrease: { alt: 'Indent Decrease', icon: (_cision_atlas_styles_dist_icons_indent_decrease_svg__WEBPACK_IMPORTED_MODULE_69___default()) },
	indentIncrease: { alt: 'Indent Increase', icon: (_cision_atlas_styles_dist_icons_indent_increase_svg__WEBPACK_IMPORTED_MODULE_70___default()) },
	information: { alt: 'Information', icon: (_cision_atlas_styles_dist_icons_information_svg__WEBPACK_IMPORTED_MODULE_71___default()) },
	instagram: { alt: 'Instagram', icon: (_cision_atlas_styles_dist_icons_instagram_svg__WEBPACK_IMPORTED_MODULE_72___default()) },
	instagramFullcolor: { alt: 'Instagram Fullcolor', icon: (_cision_atlas_styles_dist_icons_instagram_fullcolor_svg__WEBPACK_IMPORTED_MODULE_73___default()) },
	landscape: { alt: 'Landscape', icon: (_cision_atlas_styles_dist_icons_landscape_svg__WEBPACK_IMPORTED_MODULE_74___default()) },
	layout1: { alt: 'Layout 1', icon: (_cision_atlas_styles_dist_icons_layout_1_svg__WEBPACK_IMPORTED_MODULE_75___default()) },
	layout2: { alt: 'Layout 2', icon: (_cision_atlas_styles_dist_icons_layout_2_svg__WEBPACK_IMPORTED_MODULE_76___default()) },
	layout3: { alt: 'Layout 3', icon: (_cision_atlas_styles_dist_icons_layout_3_svg__WEBPACK_IMPORTED_MODULE_77___default()) },
	layout4: { alt: 'Layout 4', icon: (_cision_atlas_styles_dist_icons_layout_4_svg__WEBPACK_IMPORTED_MODULE_78___default()) },
	lineChart: { alt: 'Line Chart', icon: (_cision_atlas_styles_dist_icons_line_chart_svg__WEBPACK_IMPORTED_MODULE_79___default()) },
	linkedin: { alt: 'Linkedin', icon: (_cision_atlas_styles_dist_icons_linkedin_svg__WEBPACK_IMPORTED_MODULE_80___default()) },
	linkedinFullcolor: { alt: 'Linkedin Fullcolor', icon: (_cision_atlas_styles_dist_icons_linkedin_fullcolor_svg__WEBPACK_IMPORTED_MODULE_81___default()) },
	list: { alt: 'List', icon: (_cision_atlas_styles_dist_icons_list_svg__WEBPACK_IMPORTED_MODULE_82___default()) },
	loader: { alt: 'Loader', icon: (_cision_atlas_styles_dist_icons_loader_svg__WEBPACK_IMPORTED_MODULE_83___default()) },
	location: { alt: 'Location', icon: (_cision_atlas_styles_dist_icons_location_svg__WEBPACK_IMPORTED_MODULE_84___default()) },
	login: { alt: 'Login', icon: (_cision_atlas_styles_dist_icons_login_svg__WEBPACK_IMPORTED_MODULE_85___default()) },
	logout: { alt: 'Logout', icon: (_cision_atlas_styles_dist_icons_logout_svg__WEBPACK_IMPORTED_MODULE_86___default()) },
	mailAdd: { alt: 'Mail Add', icon: (_cision_atlas_styles_dist_icons_mail_add_svg__WEBPACK_IMPORTED_MODULE_87___default()) },
	mailCheck: { alt: 'Mail Check', icon: (_cision_atlas_styles_dist_icons_mail_check_svg__WEBPACK_IMPORTED_MODULE_88___default()) },
	marketplace: { alt: 'Marketplace', icon: (_cision_atlas_styles_dist_icons_marketplace_svg__WEBPACK_IMPORTED_MODULE_89___default()) },
	menuKebab: { alt: 'Menu Kebab', icon: (_cision_atlas_styles_dist_icons_menu_kebab_svg__WEBPACK_IMPORTED_MODULE_90___default()) },
	menuMeatball: { alt: 'Menu Meatball', icon: (_cision_atlas_styles_dist_icons_menu_meatball_svg__WEBPACK_IMPORTED_MODULE_91___default()) },
	messages: { alt: 'Messages', icon: (_cision_atlas_styles_dist_icons_messages_svg__WEBPACK_IMPORTED_MODULE_92___default()) },
	movie: { alt: 'Movie', icon: (_cision_atlas_styles_dist_icons_movie_svg__WEBPACK_IMPORTED_MODULE_93___default()) },
	myNetwork: { alt: 'My Network', icon: (_cision_atlas_styles_dist_icons_my_network_svg__WEBPACK_IMPORTED_MODULE_94___default()) },
	newsfeed: { alt: 'Newsfeed', icon: (_cision_atlas_styles_dist_icons_newsfeed_svg__WEBPACK_IMPORTED_MODULE_96___default()) },
	newsfeedSlash: { alt: 'NewsfeedSlash', icon: (_cision_atlas_styles_dist_icons_newsfeed_slash_svg__WEBPACK_IMPORTED_MODULE_97___default()) },
	newspaper: { alt: 'Newspaper', icon: (_cision_atlas_styles_dist_icons_newspaper_svg__WEBPACK_IMPORTED_MODULE_98___default()) },
	newWindow: { alt: 'New Window', icon: (_cision_atlas_styles_dist_icons_new_window_svg__WEBPACK_IMPORTED_MODULE_95___default()) },
	next: { alt: 'Next', icon: (_cision_atlas_styles_dist_icons_next_svg__WEBPACK_IMPORTED_MODULE_99___default()) },
	nodeTree: { alt: 'Node Tree', icon: (_cision_atlas_styles_dist_icons_node_tree_svg__WEBPACK_IMPORTED_MODULE_100___default()) },
	notifications: { alt: 'Notifications', icon: (_cision_atlas_styles_dist_icons_notifications_svg__WEBPACK_IMPORTED_MODULE_101___default()) },
	paragraph: { alt: 'Paragraph', icon: (_cision_atlas_styles_dist_icons_paragraph_svg__WEBPACK_IMPORTED_MODULE_102___default()) },
	picture: { alt: 'Picture', icon: (_cision_atlas_styles_dist_icons_picture_svg__WEBPACK_IMPORTED_MODULE_103___default()) },
	pieChart: { alt: 'Pie Chart', icon: (_cision_atlas_styles_dist_icons_pie_chart_svg__WEBPACK_IMPORTED_MODULE_104___default()) },
	playCircle: { alt: 'Play Circle', icon: (_cision_atlas_styles_dist_icons_play_circle_svg__WEBPACK_IMPORTED_MODULE_105___default()) },
	previous: { alt: 'Previous', icon: (_cision_atlas_styles_dist_icons_previous_svg__WEBPACK_IMPORTED_MODULE_106___default()) },
	printer: { alt: 'Printer', icon: (_cision_atlas_styles_dist_icons_printer_svg__WEBPACK_IMPORTED_MODULE_107___default()) },
	projects: { alt: 'Projects', icon: (_cision_atlas_styles_dist_icons_projects_svg__WEBPACK_IMPORTED_MODULE_108___default()) },
	questionAnswer: { alt: 'Question Answer', icon: (_cision_atlas_styles_dist_icons_question_answer_svg__WEBPACK_IMPORTED_MODULE_109___default()) },
	reddit: { alt: 'Reddit', icon: (_cision_atlas_styles_dist_icons_reddit_svg__WEBPACK_IMPORTED_MODULE_110___default()) },
	redditFullcolor: { alt: 'Reddit Fullcolor', icon: (_cision_atlas_styles_dist_icons_reddit_fullcolor_svg__WEBPACK_IMPORTED_MODULE_111___default()) },
	refresh: { alt: 'Refresh', icon: (_cision_atlas_styles_dist_icons_refresh_svg__WEBPACK_IMPORTED_MODULE_112___default()) },
	reply: { alt: 'Reply', icon: (_cision_atlas_styles_dist_icons_reply_svg__WEBPACK_IMPORTED_MODULE_113___default()) },
	replyAll: { alt: 'Reply All', icon: (_cision_atlas_styles_dist_icons_reply_all_svg__WEBPACK_IMPORTED_MODULE_114___default()) },
	save: { alt: 'Save', icon: (_cision_atlas_styles_dist_icons_save_svg__WEBPACK_IMPORTED_MODULE_115___default()) },
	search: { alt: 'Search', icon: (_cision_atlas_styles_dist_icons_search_svg__WEBPACK_IMPORTED_MODULE_116___default()) },
	settings: { alt: 'Settings', icon: (_cision_atlas_styles_dist_icons_settings_svg__WEBPACK_IMPORTED_MODULE_117___default()) },
	share: { alt: 'Share', icon: (_cision_atlas_styles_dist_icons_share_svg__WEBPACK_IMPORTED_MODULE_118___default()) },
	slideshow1: { alt: 'Slideshow 1', icon: (_cision_atlas_styles_dist_icons_slideshow_1_svg__WEBPACK_IMPORTED_MODULE_119___default()) },
	slideshow2: { alt: 'Slideshow 2', icon: (_cision_atlas_styles_dist_icons_slideshow_2_svg__WEBPACK_IMPORTED_MODULE_120___default()) },
	stack: { alt: 'Stack', icon: (_cision_atlas_styles_dist_icons_stack_svg__WEBPACK_IMPORTED_MODULE_121___default()) },
	stickyNote: { alt: 'Sticky Note', icon: (_cision_atlas_styles_dist_icons_sticky_note_svg__WEBPACK_IMPORTED_MODULE_122___default()) },
	submit: { alt: 'Submit', icon: (_cision_atlas_styles_dist_icons_submit_svg__WEBPACK_IMPORTED_MODULE_123___default()) },
	thumbUp: { alt: 'Thumb Up', icon: (_cision_atlas_styles_dist_icons_thumb_up_svg__WEBPACK_IMPORTED_MODULE_124___default()) },
	tikTok: { alt: 'Tik Tok', icon: (_cision_atlas_styles_dist_icons_tik_tok_svg__WEBPACK_IMPORTED_MODULE_125___default()) },
	trash: { alt: 'Trash', icon: (_cision_atlas_styles_dist_icons_trash_svg__WEBPACK_IMPORTED_MODULE_126___default()) },
	twitter: { alt: 'Twitter', icon: (_cision_atlas_styles_dist_icons_twitter_svg__WEBPACK_IMPORTED_MODULE_127___default()) },
	twitterFullcolor: { alt: 'Twitter Fullcolor', icon: (_cision_atlas_styles_dist_icons_twitter_fullcolor_svg__WEBPACK_IMPORTED_MODULE_128___default()) },
	unarchive: { alt: 'Unarchive', icon: (_cision_atlas_styles_dist_icons_unarchive_svg__WEBPACK_IMPORTED_MODULE_129___default()) },
	underline: { alt: 'Underline', icon: (_cision_atlas_styles_dist_icons_underline_svg__WEBPACK_IMPORTED_MODULE_130___default()) },
	upload1: { alt: 'Upload 1', icon: (_cision_atlas_styles_dist_icons_upload_1_svg__WEBPACK_IMPORTED_MODULE_131___default()) },
	upload2: { alt: 'Upload 2', icon: (_cision_atlas_styles_dist_icons_upload_2_svg__WEBPACK_IMPORTED_MODULE_132___default()) },
	user: { alt: 'User', icon: (_cision_atlas_styles_dist_icons_user_svg__WEBPACK_IMPORTED_MODULE_133___default()) },
	warning: { alt: 'Warning', icon: (_cision_atlas_styles_dist_icons_warning_svg__WEBPACK_IMPORTED_MODULE_134___default()) },
	warningReport: { alt: 'WarningReport', icon: (_cision_atlas_styles_dist_icons_warning_report_svg__WEBPACK_IMPORTED_MODULE_135___default()) },
	website: { alt: 'Website', icon: (_cision_atlas_styles_dist_icons_website_svg__WEBPACK_IMPORTED_MODULE_136___default()) },
	window: { alt: 'Window', icon: (_cision_atlas_styles_dist_icons_window_svg__WEBPACK_IMPORTED_MODULE_137___default()) },
	youtube: { alt: 'Youtube', icon: (_cision_atlas_styles_dist_icons_youtube_svg__WEBPACK_IMPORTED_MODULE_138___default()) },
	youtubeFullcolor: { alt: 'Youtube Fullcolor', icon: (_cision_atlas_styles_dist_icons_youtube_fullcolor_svg__WEBPACK_IMPORTED_MODULE_139___default()) }
}


/***/ }),

/***/ "./src/themes/scratch.js":
/*!*******************************!*\
  !*** ./src/themes/scratch.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cision_atlas_styles_dist_css_scratch_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @cision/atlas-styles/dist/css/scratch.css */ "./node_modules/@cision/atlas-styles/dist/css/scratch.css");



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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _themes_scratch_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./themes/scratch.js */ "./src/themes/scratch.js");
/* harmony import */ var _components_alert_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/alert.js */ "./src/components/alert.js");
/* harmony import */ var _components_application_frame_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/application-frame.js */ "./src/components/application-frame.js");
/* harmony import */ var _components_avatar_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/avatar.js */ "./src/components/avatar.js");
/* harmony import */ var _components_button_set_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/button-set.js */ "./src/components/button-set.js");
/* harmony import */ var _components_button_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/button.js */ "./src/components/button.js");
/* harmony import */ var _components_chip_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/chip.js */ "./src/components/chip.js");
/* harmony import */ var _components_chip_group_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/chip-group.js */ "./src/components/chip-group.js");
/* harmony import */ var _components_dialog_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/dialog.js */ "./src/components/dialog.js");
/* harmony import */ var _components_feed_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./components/feed.js */ "./src/components/feed.js");
/* harmony import */ var _components_icon_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./components/icon.js */ "./src/components/icon.js");
/* harmony import */ var _components_input_checkbox_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./components/input-checkbox.js */ "./src/components/input-checkbox.js");
/* harmony import */ var _components_input_chip_group_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./components/input-chip-group.js */ "./src/components/input-chip-group.js");
/* harmony import */ var _components_input_dropdown_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/input-dropdown.js */ "./src/components/input-dropdown.js");
/* harmony import */ var _components_input_search_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/input-search.js */ "./src/components/input-search.js");
/* harmony import */ var _components_input_text_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/input-text.js */ "./src/components/input-text.js");
/* harmony import */ var _components_input_textarea_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/input-textarea.js */ "./src/components/input-textarea.js");
/* harmony import */ var _components_logo_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/logo.js */ "./src/components/logo.js");
/* harmony import */ var _components_main_nav_item_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./components/main-nav-item.js */ "./src/components/main-nav-item.js");
/* harmony import */ var _components_main_nav_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./components/main-nav.js */ "./src/components/main-nav.js");
/* harmony import */ var _components_number_display_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./components/number-display.js */ "./src/components/number-display.js");
/* harmony import */ var _components_page_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./components/page.js */ "./src/components/page.js");
/* harmony import */ var _components_profile_control_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./components/profile-control.js */ "./src/components/profile-control.js");
/* harmony import */ var _components_stepper_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./components/stepper.js */ "./src/components/stepper.js");
/* harmony import */ var _components_stepper_step_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./components/stepper-step.js */ "./src/components/stepper-step.js");
/* harmony import */ var _components_tile_board_tile_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./components/tile-board-tile.js */ "./src/components/tile-board-tile.js");
/* harmony import */ var _components_tile_board_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./components/tile-board.js */ "./src/components/tile-board.js");
/* harmony import */ var _components_workflow_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./components/workflow.js */ "./src/components/workflow.js");
/* harmony import */ var _components_workflow_step_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./components/workflow-step.js */ "./src/components/workflow-step.js");
/* harmony import */ var _components_accordion_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./components/accordion.js */ "./src/components/accordion.js");
/* harmony import */ var _components_snackbar_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./components/snackbar.js */ "./src/components/snackbar.js");
/* eslint-disable import/no-internal-modules */
// the themes import should be at the top

/* *** THEMES **** */


/* *** COMPONENTS **** */































})();

/******/ })()
;
//# sourceMappingURL=index.js.map