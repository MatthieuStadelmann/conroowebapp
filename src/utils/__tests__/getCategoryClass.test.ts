import { describe, it, expect } from 'vitest'
import { getCategoryClass } from '../getCategoryClass'
import { CATEGORY_GREEN, CATEGORY_YELLOW, CATEGORY_RED, STYLE_GREEN, STYLE_YELLOW, STYLE_RED, STYLE_DEFAULT} from '../../constants/categories'

describe('getCategoryClass', () => {
  it('should return correct class for green category', () => {
    expect(getCategoryClass(CATEGORY_GREEN)).toBe(STYLE_GREEN)
  })

  it('should return correct class for yellow category', () => {
    expect(getCategoryClass(CATEGORY_YELLOW)).toBe(STYLE_YELLOW)
  })

  it('should return correct class for red category', () => {
    expect(getCategoryClass(CATEGORY_RED)).toBe(STYLE_RED)
  })

  it('should return default class for unknown category', () => {
    expect(getCategoryClass('invalid')).toBe(STYLE_DEFAULT)
  })
}) 