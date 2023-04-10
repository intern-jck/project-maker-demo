import { useState, useEffect } from 'react';
import { TextInput, TextArea, SelectInput, DateInput, PhotoInput, TagInput } from '../Inputs';
import { MdSave, MdDelete, MdClose } from "react-icons/md";
import type { ProjectType, CollectionType } from '@/common/types';
import type DateType from '@/common/types/DateType';

import styles from '@/styles/components/ProjectForm.module.scss';

const formDefaults: ProjectType = {
  _id: '',
  link: '',
  collection_name: '',
  collection_id: '',

  name: '',
  date: {
    start_month: '',
    start_year: '',
    end_month: '',
    end_year: '',
  },

  client: '',
  client_url: '',
  short: '',
  info: '',

  tech: [],
  photos: [],
  github_url: '',
};

type Props = {
  id: string,
  collections: CollectionType[],
  project: ProjectType,
  saveProject: Function,
  deleteProject: React.MouseEventHandler,
  closeProject: React.MouseEventHandler,
};

export default function ProjectForm({
  // id,
  // collections,
  // project,
  // saveProject,
  // deleteProject,
  // closeProject
}: Props) {

  // console.log('Project Form', project.collection_name)

  return (

    <div className={styles.projectForm}>
      <h1>Project Form</h1>
    </div>

    // <>

    //   {
    //     formData ?
    //       <form id={styles.form} onSubmit={saveProjectHandler}>

    //         <div className={styles.formMenu}>
    //           <h1>NAME: <span>{formData.name}</span></h1>
    //           <h2>COLLECTION: <span>{formData.collection_name}</span></h2>
    //           <button type='submit'>
    //             <MdSave />
    //           </button>
    //           <button id={formData._id} onClick={deleteProject}>
    //             <MdDelete />
    //           </button>
    //           <button onClick={closeProject}>
    //             <MdClose />
    //           </button>
    //         </div>

    //         <div className={styles.formRow}>
    //           <div className={styles.stats}>

    //             <TextInput
    //               className={styles.textInput}
    //               inputName={'name'}
    //               value={formData.name}
    //               changeHandler={updateTextInput}
    //             />

    //             <select
    //               className={styles.selectInput}
    //               name={'collection'}
    //               onChange={updateCollection}
    //               value={formData.collection_id}
    //             >
    //               <option key={0} value=''>collections</option>
    //               {
    //                 collections.map((collection, i) => (
    //                   <option key={i + 1} value={collection._id} >{collection.name}</option>
    //                 ))
    //               }
    //             </select>

    //             <DateInput
    //               className={styles.dateInput}
    //               date={formData.date}
    //               changeHandler={updateDate}
    //             />

    //             <TextInput
    //               className={styles.textInput}
    //               inputName={'client'}
    //               value={formData.client}
    //               changeHandler={updateTextInput}
    //             />
    //             <TextInput
    //               className={styles.textInput}
    //               inputName={'client_url'}
    //               value={formData.client_url}
    //               changeHandler={updateTextInput}
    //             />
    //             <TextInput
    //               className={styles.textInput}
    //               inputName={'github_url'}
    //               value={formData.github_url}
    //               changeHandler={updateTextInput}
    //             />
    //           </div>

    //           <div className={styles.description}>
    //             <TextInput
    //               className={styles.textInput}
    //               inputName={'short'}
    //               value={formData.short}
    //               changeHandler={updateTextInput}
    //             />
    //             <TextArea
    //               className={styles.textArea}
    //               inputName={'info'}
    //               value={formData.info}
    //               changeHandler={updateTextInput}
    //             />
    //           </div>
    //         </div>

    //         <div className={styles.formRow}>
    //           <PhotoInput
    //             className={styles.photoInput}
    //             inputName='photos'
    //             value={newPhoto}
    //             photos={formData.photos}
    //             changeHandler={updatePhoto}
    //             addHandler={addPhoto}
    //             deleteHandler={deletePhoto}
    //           />
    //           <TagInput
    //             className={styles.tagInput}
    //             inputName='tags'
    //             value={newTag}
    //             tags={formData.tech}
    //             changeHandler={updateTag}
    //             addHandler={addTag}
    //             deleteHandler={deleteTag}
    //           />
    //         </div>

    //       </form>
    //       : null
    //   }
    // </>
  )
}
