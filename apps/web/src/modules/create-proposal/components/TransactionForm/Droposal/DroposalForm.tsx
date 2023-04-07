import { Box, Button, Flex, Text } from '@zoralabs/zord'
import { Form, Formik, FormikHelpers } from 'formik'
import { useCallback, useState } from 'react'

import SmartInput from 'src/components/Fields/SmartInput'
import TextArea from 'src/components/Fields/TextArea'
import { DATE, NUMBER, TEXT } from 'src/components/Fields/types'
import SingleMediaUpload from 'src/components/SingleMediaUpload/SingleMediaUpload'
import { DropdownSelect } from 'src/modules/create-proposal'

import { defaultInputLabelStyle } from './Droposal.css'
import droposalFormSchema, { DroposalFormValues } from './DroposalForm.schema'

export interface AirdropFormProps {
  onSubmit?: (
    values: DroposalFormValues,
    actions: FormikHelpers<DroposalFormValues>
  ) => void
  disabled?: boolean
}

const editionSizeOptions = [
  { label: 'Fixed', value: 'fixed' },
  { label: 'Open edition', value: 'open' },
]

export const DroposalForm: React.FC<AirdropFormProps> = ({ onSubmit, disabled }) => {
  const [showCover, setShowCover] = useState(false)
  const [editionSize, setEditionType] = useState<string>('fixed')

  const initialValues: DroposalFormValues = {
    name: '',
    symbol: '',
    description: '',
    media: '',
    cover: '',
    fundsRecipient: '',
    publicSaleStart: '',
    publicSaleEnd: '',
    royaltyPercentage: 5,
  }

  const handleSubmit = useCallback(
    (values: DroposalFormValues, actions: FormikHelpers<DroposalFormValues>) => {
      onSubmit?.(values, actions)
    },
    [onSubmit]
  )

  const handleMediaUploadStart = (media: File) => {
    if (!media.type.startsWith('image')) setShowCover(true)
  }

  return (
    <Box w="100%">
      <Formik
        initialValues={initialValues}
        validationSchema={droposalFormSchema}
        onSubmit={handleSubmit}
        validateOnBlur
        validateOnMount={false}
        validateOnChange={false}
      >
        {(formik) => {
          const handleEditionTypeChanged = (value: string) => {
            value === 'open'
              ? formik.setFieldValue('editionSize', 0)
              : formik.setFieldValue('editionSize', undefined)
            setEditionType(value)
          }

          return (
            <Box
              data-testid="droposal-form"
              as={'fieldset'}
              disabled={formik.isValidating || disabled}
              style={{ outline: 0, border: 0, padding: 0, margin: 0 }}
            >
              <Flex as={Form} direction={'column'}>
                <SmartInput
                  {...formik.getFieldProps('name')}
                  inputLabel={'Name'}
                  placeholder={'Zorbs'}
                  type={TEXT}
                  formik={formik}
                  id={'name'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched['name'] && formik.errors['name']
                      ? formik.errors['name']
                      : undefined
                  }
                />

                <SmartInput
                  {...formik.getFieldProps('symbol')}
                  inputLabel={'Symbol'}
                  placeholder={'$SYMBOL'}
                  type={TEXT}
                  formik={formik}
                  id={'symbol'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched['symbol'] && formik.errors['symbol']
                      ? formik.errors['symbol']
                      : undefined
                  }
                />

                <TextArea
                  {...formik.getFieldProps('description')}
                  inputLabel={'Description'}
                  placeholder={
                    'This is a project that means a lot to me. Soon it can be yours too.'
                  }
                  formik={formik}
                  id={'description'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched['description'] && formik.errors['description']
                      ? formik.errors['description']
                      : undefined
                  }
                />

                <SingleMediaUpload
                  {...formik.getFieldProps('media')}
                  formik={formik}
                  id="media"
                  inputLabel={'Media'}
                  onUploadStart={handleMediaUploadStart}
                />

                {showCover && (
                  <SingleMediaUpload
                    {...formik.getFieldProps('cover')}
                    formik={formik}
                    id="cover"
                    inputLabel={'Cover'}
                  />
                )}

                <SmartInput
                  {...formik.getFieldProps('pricePerMint')}
                  inputLabel={'Price'}
                  placeholder={'0.01'}
                  type={TEXT}
                  formik={formik}
                  perma={'ETH'}
                  id={'pricePerMint'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    'Collectors pay an additional 0.000777 ETH fee mint fee to Zora.'
                  }
                  errorMessage={
                    formik.touched['pricePerMint'] && formik.errors['pricePerMint']
                      ? formik.errors['pricePerMint']
                      : undefined
                  }
                />

                <label className={defaultInputLabelStyle}>Edition type</label>

                <DropdownSelect
                  options={editionSizeOptions}
                  value={editionSize}
                  onChange={handleEditionTypeChanged}
                />

                {editionSize === 'fixed' ? (
                  <SmartInput
                    {...formik.getFieldProps('maxSupply')}
                    placeholder={'1000'}
                    inputLabel={'Edition size'}
                    type={TEXT}
                    formik={formik}
                    perma={'Editions'}
                    id={'maxSupply'}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    errorMessage={
                      formik.touched['maxSupply'] && formik.errors['maxSupply']
                        ? formik.errors['maxSupply']
                        : undefined
                    }
                  />
                ) : (
                  <Box mb={'x8'}>
                    <label className={defaultInputLabelStyle}>Edition size</label>
                    <Flex
                      align={'center'}
                      backgroundColor={'background2'}
                      h={'x16'}
                      px={'x4'}
                      style={{ borderRadius: '16px' }}
                    >
                      <Text color="text4">Unlimited</Text>
                    </Flex>
                  </Box>
                )}

                <SmartInput
                  {...formik.getFieldProps('publicSaleStart')}
                  inputLabel={'Start time'}
                  type={DATE}
                  formik={formik}
                  id={'publicSaleStart'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched['publicSaleStart'] && formik.errors['publicSaleStart']
                      ? formik.errors['publicSaleStart']
                      : undefined
                  }
                />

                <SmartInput
                  {...formik.getFieldProps('publicSaleEnd')}
                  inputLabel={'End time'}
                  type={DATE}
                  formik={formik}
                  id={'publicSaleEnd'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched['publicSaleEnd'] && formik.errors['publicSaleEnd']
                      ? formik.errors['publicSaleEnd']
                      : undefined
                  }
                />

                <SmartInput
                  {...formik.getFieldProps('maxPerAddress')}
                  inputLabel={'Mint limit per address'}
                  placeholder={'Unlimited'}
                  type={NUMBER}
                  formik={formik}
                  id={'maxPerAddress'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched['maxPerAddress'] && formik.errors['maxPerAddress']
                      ? formik.errors['maxPerAddress']
                      : undefined
                  }
                />

                <SmartInput
                  {...formik.getFieldProps('royaltyPercentage')}
                  inputLabel={'Royalty'}
                  placeholder={'5'}
                  perma={'%'}
                  type={NUMBER}
                  formik={formik}
                  id={'royaltyPercentage'}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errorMessage={
                    formik.touched['royaltyPercentage'] &&
                    formik.errors['royaltyPercentage']
                      ? formik.errors['royaltyPercentage']
                      : undefined
                  }
                />

                <SmartInput
                  {...formik.getFieldProps('fundsRecipient')}
                  inputLabel={'Payout address'}
                  placeholder={'0x... or .eth'}
                  type={TEXT}
                  formik={formik}
                  id={'fundsRecipient'}
                  isAddress={true}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    'The address that will receive any withdrawals and royalties. It can be your personal wallet, a multisignature wallet, or an external splits contract.'
                  }
                  errorMessage={
                    formik.touched['fundsRecipient'] && formik.errors['fundsRecipient']
                      ? formik.errors['fundsRecipient']
                      : undefined
                  }
                />

                <Button
                  mt={'x9'}
                  variant={'outline'}
                  borderRadius={'curved'}
                  type="submit"
                  disabled={!formik.isValid || disabled}
                >
                  Add Transaction to Queue
                </Button>
              </Flex>
            </Box>
          )
        }}
      </Formik>
    </Box>
  )
}
