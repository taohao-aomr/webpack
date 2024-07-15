// 这边申明了less文件 之后使用import styles from 'xxx.less'就不会有ts报错了
declare module '*.less' {
    const styles:{[key:string]:string};
    export default styles;
}
