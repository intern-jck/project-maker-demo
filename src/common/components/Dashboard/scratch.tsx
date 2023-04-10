{/* <div className={styles.collectionInput}>
  <TextInput
    className={styles.textInput}
    inputName={'new_collection'}
    value={newCollection}
    changeHandler={updateNewCollection}
  />
  <button name={'create_collection'} onClick={createCollectionHandler}>
    <CgAddR />
  </button>
</div>
<div className={styles.collectionSelect}>
  <select
    name={'select_collection'}
    onChange={selectCollection}
    value={currentCollection._id}
  >
    <option key={0} value=''>collections</option>
    {
      collections.map((collection, i) => (
        <option key={i + 1} value={collection._id} >{collection.name}</option>
      ))
    }
  </select>
  <button name={'delete_collection'} onClick={deleteCollection}>
    <CgTrash />
  </button>
</div> */}