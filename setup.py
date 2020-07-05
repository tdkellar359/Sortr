from setuptools import setup

setup(
    name='sortr',
    version='0.0.0',
    packages=['sortr'],
    include_package_data=True,
    install_requires=[
        'arrow==0.15.5',
        'Flask==1.1.1',
        'nodeenv==1.3.5',
        'pytest==5.3.5',
        'pytest-flask==0.15.1',
        'sh==1.12.14'
    ]
)