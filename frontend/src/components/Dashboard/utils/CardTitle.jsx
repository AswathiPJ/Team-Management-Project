import PropTypes from "prop-types";

export const CardTitle = ({ title, button }) => {
  return (
    <div className="border-b-2 border-dashed m-2 pb-2 border-gray-300">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-sm font-bold block">{title}</span>
        </div>
        <div>
          {button}
        </div>
      </div>
    </div>
  );
};

CardTitle.propTypes = {
  title: PropTypes.string.isRequired,
  button: PropTypes.element
};
