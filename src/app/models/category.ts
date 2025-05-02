/**
 * Data model representing a product category.
 *
 * Attributes:
 *     name (str): The name of the category. Must be 2-20 characters long and
 *                 match the pattern allowing alphanumeric characters, underscores, or dashes.
 *     description (str): A brief description of the category. Maximum 100 characters.
 */
export interface Category {
    name: string;
    description?: string;
}
