

// BODY
<>
  <div className={styles.formRow}>
    <TextInput
      name={'name'}
      value={formData.name}
      changeHandler={updateTextInput}
    />
    <SelectInput
      name={'collections'}
      value={formData.collection_name}
      options={collectionNames}
      changeHandler={updateCollection}
    />
    <DateInput
      date={formData.date}
      changeHandler={updateDate}
    />
  </div>

  <div className={styles.formRow}>
    <div className={styles.formCol}>
      <TextInput
        name={'client'}
        value={formData.client}
        changeHandler={updateTextInput}
      />
      <TextInput
        name={'client_url'}
        value={formData.client_url}
        changeHandler={updateTextInput}
      />
      <TextInput
        name={'github_url'}
        value={formData.github_url}
        changeHandler={updateTextInput}
      />
    </div>
    <div className={styles.formCol}>
      <TextInput
        name={'short'}
        value={formData.short}
        changeHandler={updateTextInput}
      />
      <TextArea
        name={'info'}
        value={formData.info}
        changeHandler={updateTextInput}
      />
    </div>
  </div>

  <div className={styles.formRow}>
    <PhotoInput
      name='photos'
      value={newPhoto}
      photos={formData.photos}
      changeHandler={updatePhoto}
      addHandler={addPhoto}
      deleteHandler={deletePhoto}
    />
    <TagInput
      name='tags'
      value={newTag}
      tags={formData.tech}
      changeHandler={updateTag}
      addHandler={addTag}
      deleteHandler={deleteTag}
    />
  </div>
</>