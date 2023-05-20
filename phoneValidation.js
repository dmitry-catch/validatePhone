const AdditionalPhoneNumberCharacters = '-.()'
const ExtensionAbbreviationExtDot = 'ext.'
const ExtensionAbbreviationExt = 'ext'
const ExtensionAbbreviationX = 'x'

export const validatePhone = (value) => {
	if (value == null) {
		return true
	}

	if (!value) {
		return false
	}

	let valueAsString = value.replace('+', '').trimRight()
	valueAsString = removeExtension(valueAsString)

	let digitFound = false

	for (let c = 0; c < valueAsString.length; c++) {
		if (isDigit(valueAsString[c])) {
			digitFound = true
			break
		}
	}

	if (!digitFound) {
		return false
	}

	for (let c = 0; c < valueAsString.length; c++) {
		if (
			!(
				isDigit(valueAsString[c]) ||
				valueAsString[c].trim() === '' ||
				AdditionalPhoneNumberCharacters.indexOf(valueAsString[c]) != -1
			)
		) {
			return false
		}
	}

	return true
}

const removeExtension = (potentialPhoneNumber) => {
	let lastIndexOfExtension = potentialPhoneNumber.toLowerCase().lastIndexOf(ExtensionAbbreviationExtDot)
	if (lastIndexOfExtension >= 0) {
		let extension = potentialPhoneNumber.substring(lastIndexOfExtension + ExtensionAbbreviationExtDot.length)
		if (matchesExtension(extension)) {
			return potentialPhoneNumber.substring(0, lastIndexOfExtension)
		}
	}

	lastIndexOfExtension = potentialPhoneNumber.toLowerCase().lastIndexOf(ExtensionAbbreviationExt)
	if (lastIndexOfExtension >= 0) {
		let extension = potentialPhoneNumber.substring(lastIndexOfExtension + ExtensionAbbreviationExt.length)
		if (matchesExtension(extension)) {
			return potentialPhoneNumber.substring(0, lastIndexOfExtension)
		}
	}

	lastIndexOfExtension = potentialPhoneNumber.toLowerCase().lastIndexOf(ExtensionAbbreviationX)
	if (lastIndexOfExtension >= 0) {
		let extension = potentialPhoneNumber.substring(lastIndexOfExtension + ExtensionAbbreviationX.length)
		if (matchesExtension(extension)) {
			return potentialPhoneNumber.substring(0, lastIndexOfExtension)
		}
	}

	return potentialPhoneNumber
}

const matchesExtension = (potentialExtension) => {
	potentialExtension = potentialExtension.trimLeft()
	if (potentialExtension.length == 0) {
		return false
	}

	for (let c = 0; c < potentialExtension.length; c++) {
		if (!isDigit(potentialExtension[c])) {
			return false
		}
	}
	return true
}

const isDigit = (chr) => {
	return chr >= 0 && chr <= 9
}
