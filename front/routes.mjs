import routes from "next-routes";

export default routes()
  .add('index', '/')
  .add('tree', '/tree/:hash');