/* eslint-disable no-unused-vars */
import { Button, InputFile, InputForm, InputText, TextArea, Title } from "~/components"
import { FaPlusCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";

const CreatePropertyType = () => {
  const { register, formState: {errors}, handleSubmit, reset, setValue} = useForm()

  const handleCreateNewPropertyType = (data) => {
    console.log(data)
  }

  return (
    <div className="">
      <Title 
        title='Create New Property Type'
      >
        <Button
          onClick={handleSubmit(handleCreateNewPropertyType)}
        >
          <FaPlusCircle size={20}/>
         <span>Create</span>
        </Button>
      </Title>

      <form className="p-4 flex flex-col gap-4">
        <InputForm 
          id='name'
          register={register}
          errors={errors}
          validate={{required: 'This field cannot empty.'}}
          label='Property Type Name'
        />
        <TextArea 
          label='Description'
          id='description'
          register={register}
          errors={errors}
          validate={{required: 'This field cannot empty.'}}
        />
        <InputFile
          id='image'
          register={register}
          validate={{required: 'This field cannot empty.'}}
          errors={errors}
          label='Image'
        />
        
      </form>
    </div>
  )
}

export default CreatePropertyType

