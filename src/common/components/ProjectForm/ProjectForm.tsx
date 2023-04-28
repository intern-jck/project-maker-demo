import { useState, useEffect } from 'react';
import { TextInput, TextArea, FolderSelect, DateInput, PhotoInput, TagInput, RepoInput } from '@/common/components/Inputs';
import { MdSave, MdDelete, MdClose } from "react-icons/md";
import type { ProjectType, FolderType, DateType, PhotoType, TechType, RepoType } from '@/common/types';
import styles from './ProjectForm.module.scss';

type Props = {
  folders: FolderType[],
  project: ProjectType,
  saveProject: Function,
  deleteProject: Function,
  closeProject: Function,
};

export default function ProjectForm({
  folders,
  project,
  saveProject,
  deleteProject,
  closeProject
}: Props) {

  const [formData, setFormData] = useState<ProjectType>();
  const [newPhoto, setNewPhoto] = useState<string>('');
  const [newTag, setNewTag] = useState<string>('');
  const [newRepo, setNewRepo] = useState<string>('');

  useEffect(() => {
    if (project) {
      setFormData(project);
    }
  }, [project]);

  function saveProjectHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveProject(formData);
  };

  function deleteProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    deleteProject(formData ? formData._id : '');
  };

  function closeProjectHandler(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    closeProject();
  };
  
  function updateTextInput(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    const updatedInput = { [name]: value };
    setFormData((formData) => ({
      ...formData,
      ...updatedInput
    }) as ProjectType);
  };

  function updateFolder(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;

    let updatedFolderId = { folder_id: '' };
    let updatedFolderName = { folder_name: '' };

    for (let i in folders) {
      if (folders[i]._id === value) {
        updatedFolderId.folder_id = value;
        updatedFolderName.folder_name = folders[i].name;
      }
    }

    setFormData((formData) => ({
      ...formData,
      ...updatedFolderId,
      ...updatedFolderName,
    }) as ProjectType);

  };

  function updateDate(event: React.ChangeEvent<HTMLSelectElement>) {
    event.preventDefault();
    const { name, value } = event.currentTarget;
    const currentDate = formData ? formData.date : undefined;

    if (currentDate) {
      currentDate[name as keyof DateType] = value;
    }

    setFormData((formData) => ({
      ...formData,
      ...currentDate,
    }) as ProjectType);
  };

  // Could probably be merged with updateTextInput?
  function updatePhoto(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    setNewPhoto(value);
  };

  // update for photo type
  function addPhoto(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const _photos = formData ? formData.photos : undefined;

    if (newPhoto && _photos) {

      const _photo = {
        slug: '',
        url: newPhoto,
      };

      _photos.push(_photo);

      setNewPhoto('');
      setFormData((formData) => ({
        ...formData,
        photos: _photos,
      }) as ProjectType);

    }

  };

  function deletePhoto(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const index = event.currentTarget.getAttribute('data-photo-index');
    const photos = formData ? formData.photos : undefined;

    if (index) {

      if (photos) {
        photos.splice(parseInt(index), 1);
      }

      setFormData((formData) => ({
        ...formData,
        photos: photos,
      }) as ProjectType)
    }
  };

  // Could probably be merged with updateTextInput?
  function updateTag(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    setNewTag(value);
  };

  function addTag(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const _tech = formData ? formData.tech : undefined;

    if (newTag && _tech) {

      const _tag = {
        key: newTag.toLowerCase().split(' ').join('-'),
        name: newTag,
        url: '',
      };

      _tech.push(_tag);

      setNewTag('');
      setFormData((formData) => ({
        ...formData,
        tech: _tech,
      }) as ProjectType)
    }
  };

  function deleteTag(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const index = event.currentTarget.getAttribute('data-tag-index');
    const tech = formData ? formData.tech : undefined;

    if (index) {
      if (tech) {
        tech.splice(parseInt(index), 1);
      }
      setFormData((formData) => ({
        ...formData,
        tech: tech,
      }) as ProjectType)
    };
  };

  // Could probably be merged with updateTextInput?
  function updateRepo(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    const { value } = event.currentTarget;
    setNewRepo(value);
  };

  function addRepo(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const _repos = formData ? formData.repos : undefined;

    if (newRepo && _repos) {

      const _tag = {
        key: newRepo.toLowerCase().split(' ').join('-'),
        name: newRepo,
        url: '',
      };

      _repos.push(_tag);

      setNewRepo('');
      setFormData((formData) => ({
        ...formData,
        repos: _repos,
      }) as ProjectType)
    }
  };

  function deleteRepo(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    const index = event.currentTarget.getAttribute('data-repo-index');
    const _repos = formData ? formData.repos : undefined;

    if (index) {
      if (_repos) {
        _repos.splice(parseInt(index), 1);
      }
      setFormData((formData) => ({
        ...formData,
        repos: _repos,
      }) as ProjectType)
    };
  };

  return (
    <>
      {
        formData ?
          <form className={styles.projectForm} onSubmit={saveProjectHandler}>

            <div className={styles.formMenu}>
              <h2 className={styles.formName}>NAME: <span>{formData.name}</span></h2>
              <h2 className={styles.formCollection}>COLLECTION: <span>{formData.folder_name}</span></h2>

              <button type='submit'>
                <MdSave />
              </button>
              <button onClick={deleteProjectHandler}>
                <MdDelete />
              </button>
              <button onClick={closeProjectHandler}>
                <MdClose />
              </button>
            </div>

            <div className={styles.formRow}>

              <div className={styles.formCol}>
                <TextInput
                  inputName={'name'}
                  value={formData.name}
                  changeHandler={updateTextInput}
                />
                <FolderSelect
                  inputName={'folder'}
                  value={formData.folder_id}
                  options={folders}
                  changeHandler={updateFolder}
                />
                <DateInput
                  className={styles.dateInput}
                  date={formData.date}
                  changeHandler={updateDate}
                />
              </div>

              <div className={styles.formCol}>
                <TextInput
                  inputName={'client'}
                  value={formData.client}
                  changeHandler={updateTextInput}
                />
                <TextInput
                  inputName={'client_url'}
                  value={formData.client_url}
                  changeHandler={updateTextInput}
                />
                <TextInput
                  inputName={'url'}
                  value={formData.url}
                  changeHandler={updateTextInput}
                />
              </div>

              <div className={styles.description}>
                <TextInput
                  inputName={'short'}
                  value={formData.short}
                  changeHandler={updateTextInput}
                />
                <TextArea
                  inputName={'info'}
                  value={formData.info}
                  changeHandler={updateTextInput}
                />
              </div>

            </div>

            <div className={styles.formRow}>
              <PhotoInput
                className={styles.photoInput}
                inputName={'photos'}
                value={newPhoto}
                photos={formData.photos}
                changeHandler={updatePhoto}
                addHandler={addPhoto}
                deleteHandler={deletePhoto}
              />
              <TagInput
                className={styles.tagInput}
                inputName={'tags'}
                value={newTag}
                tags={formData.tech}
                changeHandler={updateTag}
                addHandler={addTag}
                deleteHandler={deleteTag}
              />
              <RepoInput
                className={styles.repoInput}
                inputName={'repos'}
                value={newRepo}
                repos={formData.repos}
                changeHandler={updateRepo}
                addHandler={addRepo}
                deleteHandler={deleteRepo}
              />
            </div>

          </form>
          : null
      }
    </>
  )
}
