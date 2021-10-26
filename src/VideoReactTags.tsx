import { WithContext as ReactTags } from "react-tag-input";
import styles from "./ReactTags.module.scss";

const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

const VideoReactTags = (props: any) => {
  const { suggestions, deleteTag, addTag, tags } = props;

  return (
    <div className={styles.ReactTags}>
      <ReactTags
        handleDelete={deleteTag}
        handleAddition={addTag}
        delimiters={delimiters}
        suggestions={suggestions}
        placeholder="Search genere..."
        minQueryLength={2}
        maxLength={5}
        autofocus={false}
        allowDeleteFromEmptyInput={true}
        autocomplete={true}
        readOnly={false}
        allowUnique={true}
        allowDragDrop={true}
        inline={true}
        allowAdditionFromPaste={true}
        tags={tags}
      />
    </div>
  );
};
export default VideoReactTags;