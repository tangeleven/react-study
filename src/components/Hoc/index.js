import React from 'react'
let DataSource = {
    getComments: function () {
        return [{
            id: 1,
            content: '内容1'
        }, {
            id: 2,
            content: '内容2'
        }, {
            id: 3,
            content: '内容3'
        }]
    },
    addChangeListener: function (cb) {
        cb && cb()
    },
    getBlogPost: function (id) {
        let comments = DataSource.getComments();
        let blogPost = '';

        comments.forEach((item, index) => {
            console.log(item, index)
            if (item.id == id) {
                blogPost = item.content
            }
        })

        return blogPost
    },
    addChangeListener: function (cb) {
        cb && cb()
    }
};

function Comment(props) {
    return (
        <p>{props.comment.content}</p>
    )
}

export class CommentList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            // 假设 "DataSource" 是个全局范围内的数据源变量
            comments: DataSource.getComments()
        };
    }

    componentDidMount() {
        // 订阅更改
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
        // 清除订阅
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
        // 当数据源更新时，更新组件状态
        this.setState({
            comments: DataSource.getComments()
        });
    }

    render() {
        return (
            <div>
                {this.state.comments.map((comment) => (
                    <Comment comment={comment} key={comment.id} />
                ))}
            </div>
        );
    }
}

function TextBlock(props) {
    return (
        <button>{props.text}</button>
    )
}
/* export class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            blogPost: DataSource.getBlogPost(props.id)
        };
    }

    componentDidMount() {
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
        this.setState({
            blogPost: DataSource.getBlogPost(this.props.id)
        });
    }

    render() {
        return <TextBlock text={this.state.blogPost} />;
    }
} */

class BlogPost extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            blogPost: DataSource.getBlogPost(props.id)
        };
    }

    componentDidMount() {
        DataSource.addChangeListener(this.handleChange);
    }

    componentWillUnmount() {
        DataSource.removeChangeListener(this.handleChange);
    }

    handleChange() {
        this.setState({
            blogPost: DataSource.getBlogPost(this.props.id)
        });
    }

    render() {
        return <TextBlock text={this.state.blogPost} />;
    }
}
function withSubscription(WrappedComponent, selectData) {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.handleChange = this.handleChange.bind(this);
            this.state = {
                data: selectData(DataSource, props)
            };
        }

        componentDidMount() {
            // ...负责订阅相关的操作...
            DataSource.addChangeListener(this.handleChange);
        }

        componentWillUnmount() {
            DataSource.removeChangeListener(this.handleChange);
        }

        handleChange() {
            this.setState({
                data: selectData(DataSource, this.props)
            });
        }

        render() {
            // ... 并使用新数据渲染被包装的组件!
            // 请注意，我们可能还会传递其他属性
            return <WrappedComponent data={this.state.data} {...this.props} />;
        }
    };
}


export const CommentListWithSubscription = withSubscription(
    CommentList,
    (DataSource) => DataSource.getComments()
);

export const BlogPostWithSubscription = withSubscription(
    BlogPost,
    (DataSource, props) => DataSource.getBlogPost(props.id)
);