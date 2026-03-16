import { findImportDeclaration, getImportedName } from '../../helpers';
import { MONTAGE_SOURCES } from '../../constants';

import type { API, FileInfo, Options } from 'jscodeshift';

const transformer = (file: FileInfo, api: API, options: Options) => {
  const j = api.jscodeshift.withParser('tsx');
  const root = j(file.source);
  let hasChanges = false;

  // text-input -> text-field
  const textInputImport = findImportDeclaration(
    'TextInput',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (textInputImport) {
    root
      .find(j.Identifier, { name: getImportedName(textInputImport) })
      .forEach((textInput) => {
        textInput.value.name = 'TextField';
      });
    textInputImport.imported = j.identifier('TextField');
    hasChanges = true;
  }

  // text-input-button -> text-field-button
  const textInputButtonImport = findImportDeclaration(
    'TextInputButton',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (textInputButtonImport) {
    root
      .find(j.Identifier, { name: getImportedName(textInputButtonImport) })
      .forEach((textInputButton) => {
        textInputButton.value.name = 'TextFieldButton';
      });
    textInputButtonImport.imported = j.identifier('TextFieldButton');
    hasChanges = true;
  }

  // text-input-content -> text-field-content
  const textInputContentImport = findImportDeclaration(
    'TextInputContent',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (textInputContentImport) {
    root
      .find(j.Identifier, { name: getImportedName(textInputContentImport) })
      .forEach((textInputContent) => {
        textInputContent.value.name = 'TextFieldContent';
      });
    textInputContentImport.imported = j.identifier('TextFieldContent');
    hasChanges = true;
  }

  // search-input -> search-field
  const searchInputImport = findImportDeclaration(
    'SearchInput',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (searchInputImport) {
    root
      .find(j.Identifier, { name: getImportedName(searchInputImport) })
      .forEach((searchInput) => {
        searchInput.value.name = 'SearchField';
      });
    searchInputImport.imported = j.identifier('SearchField');
    hasChanges = true;
  }

  // pagination-input -> pagination-field
  const paginationInputImport = findImportDeclaration(
    'PaginationInput',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (paginationInputImport) {
    root
      .find(j.Identifier, { name: getImportedName(paginationInputImport) })
      .forEach((paginationInput) => {
        paginationInput.value.name = 'PaginationField';
      });
    paginationInputImport.imported = j.identifier('PaginationField');
    hasChanges = true;
  }

  // TimePickerInputProps -> TimePickerFieldProps
  const timePickerInputPropsImport = findImportDeclaration(
    'TimePickerInputProps',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (timePickerInputPropsImport) {
    root
      .find(j.Identifier, { name: getImportedName(timePickerInputPropsImport) })
      .forEach((timePickerInputProps) => {
        timePickerInputProps.value.name = 'TimePickerFieldProps';
      });
    timePickerInputPropsImport.imported = j.identifier('TimePickerFieldProps');
    hasChanges = true;
  }

  // DatePickerInputProps -> DatePickerFieldProps
  const datePickerInputPropsImport = findImportDeclaration(
    'DatePickerInputProps',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (datePickerInputPropsImport) {
    root
      .find(j.Identifier, { name: getImportedName(datePickerInputPropsImport) })
      .forEach((datePickerInputProps) => {
        datePickerInputProps.value.name = 'DatePickerFieldProps';
      });
    datePickerInputPropsImport.imported = j.identifier('DatePickerFieldProps');
    hasChanges = true;
  }

  // AutocompleteInput -> AutocompleteField
  const autocompleteFieldImport = findImportDeclaration(
    'AutocompleteInput',
    MONTAGE_SOURCES,
    j,
    root,
  );

  if (autocompleteFieldImport) {
    root
      .find(j.Identifier, { name: getImportedName(autocompleteFieldImport) })
      .forEach((autocompleteField) => {
        autocompleteField.value.name = 'AutocompleteField';
      });
    autocompleteFieldImport.imported = j.identifier('AutocompleteField');
    hasChanges = true;
  }

  return hasChanges ? root.toSource(options) : file.source;
};

export default transformer;
