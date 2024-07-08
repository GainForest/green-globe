// toKebabCase.test.js
import { toKebabCase } from './toKebabCase'

describe('toKebabCase', () => {
  test('returns null when null is passed in', () => {
    expect(toKebabCase(null)).toBe(null)
  })
  test('returns undefined when undefined is passed in', () => {
    expect(toKebabCase(undefined)).toBe(undefined)
  })
  test('handles empty string', () => {
    expect(toKebabCase('')).toBe('')
  })
  test('removes accents', () => {
    expect(toKebabCase('inhaã-bé')).toBe('inhaa-be')
  })
  test('converts to lowercase', () => {
    expect(toKebabCase('HELLO WORLD')).toBe('hello-world')
  })
  test('replaces spaces with hyphens', () => {
    expect(toKebabCase('hello world')).toBe('hello-world')
  })
  test('removes special characters', () => {
    expect(toKebabCase('hello! @world#')).toBe('hello-world')
  })
  test('removes leading and trailing hyphens', () => {
    expect(toKebabCase('-hello-world-')).toBe('hello-world')
  })
  test('handles multiple consecutive special characters', () => {
    expect(toKebabCase('hello!!!world')).toBe('hello-world')
  })
  test('handles string with only special characters', () => {
    expect(toKebabCase('!@#$%^&*()')).toBe('')
  })
  test('handles multiple words with accents', () => {
    expect(toKebabCase('Café au lait')).toBe('cafe-au-lait')
  })
  test('handles mixture of accents and special characters', () => {
    expect(toKebabCase("Être ou ne pas être, c'est la question!")).toBe(
      'etre-ou-ne-pas-etre-c-est-la-question'
    )
  })
})
