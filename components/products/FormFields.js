import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { View } from 'react-native'
import useValidation from '../../hooks/useValidation'
import Select from '../../@ui/Select'
import PriceInput from '../../@ui/PriceInput'
import TextArea from '../../@ui/TextArea'
import UserCard from '../../@ui/UserCard'
import TextInput from '../../@ui/TextInput'
import { useUpdateProductMutation } from '../../../api'
import Button from '../../@ui/Button'

const FormFields = ({ data }) => {
  if (!data) return ''
  const [formState, setFormState] = useState({})
  const [formFields, setFormFields] = useState([])
  const {
    validateField,
    getFieldValidationState,
    isFormClean,
    validateAllFields,
  } = useValidation(formFields)
  const [updateProduct, { isLoading, isError, isSuccess }] =
    useUpdateProductMutation()

  useEffect(() => {
    if (data.files) {
      console.log('data====', data)
      setFormState({
        ...formState,
        _id: data._id,
        files: data.files.map(({ _id }) => _id),
      })
    }
  }, [data])

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await axios.get(
          'https://alx.up.railway.app/assets/categories/fields/fashion~clothing_accessories.json',
        )
        setFormFields(response.data)
      } catch (error) {
        console.error('Error fetching form data:', error)
      }
    }

    fetchFormData()
  }, [])

  const handleFieldChange = (name, value) => {
    setFormState({ ...formState, [name]: value })
    validateField(name, value)
  }

  const handleSubmit = () => {
    validateAllFields(formState)

    if (isFormClean() && formState.description) {
      if (isFormClean() && formState.description && data._id) {
        const {
          _id,
          title,
          description,
          negotiable,
          price,
          files,
          condition,
          userId,
          discount,
          categoryId,
          features,
          ...specs
        } = formState

        updateProduct({
          id: data._id,
          data: {
            title,
            description,
            negotiable,
            price,
            files,
            condition,
            userId,
            discount,
            categoryId,
            features,
            specs,
          },
        }).unwrap()
      }
    }
  }

  const renderField = (field) => {
    switch (field.input_type) {
      case 'price':
        return (
          <PriceInput
            key={field.name}
            onChangeText={(value) => handleFieldChange(field.name, value)}
            onNegotiationChange={(value) =>
              handleFieldChange('negotiable', value)
            }
            errorText={getFieldValidationState(field.name).errorMessages}
            placeholder={field.placeholder}
            isRequired={true}
            isInvalid={getFieldValidationState(field.name).isInvalid}
          />
        )
      case 'input':
        return (
          <TextInput
            key={field.name}
            label={field.label}
            placeholder={field.placeholder}
            isRequired={
              !!field.validation.find(
                (v) => v.type == 'DataRequired' && v.value === 'true',
              )
            }
            isInvalid={getFieldValidationState(field.name).isInvalid}
            errorText={getFieldValidationState(field.name).errorMessages}
            onChangeText={(value) => handleFieldChange(field.name, value)}
          />
        )
      case 'textarea':
        return (
          <TextArea
            key={field.name}
            label='Description'
            placeholder='Enter description...'
            isRequired={
              !!field.validation.find(
                (v) => v.type == 'DataRequired' && v.value === 'true',
              )
            }
            isInvalid={getFieldValidationState(field.name).isInvalid}
            errorText={getFieldValidationState(field.name).errorMessages}
            onChangeText={(value) => handleFieldChange(field.name, value)}
          />
        )
      case 'single_select':
      case 'single_select_extend':
        return (
          <Select
            key={field.name}
            isRequired={
              !!field.validation.find(
                (v) => v.type == 'DataRequired' && v.value === 'true',
              )
            }
            isInvalid={getFieldValidationState(field.name).isInvalid}
            errorText={getFieldValidationState(field.name).errorMessages}
            options={field.possible_values}
            label={field.label}
            onValueChange={(value) => handleFieldChange(field.name, value)}
          />
        )
      default:
        return null
    }
  }

  return (
    <View gap={10}>
      {formFields.map((field) => renderField(field))}
      <UserCard />
      <Button isLoading={isLoading} handleSubmit={handleSubmit} />
    </View>
  )
}

export default FormFields
