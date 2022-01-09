#ifndef AudioAnalyzer_H
#define AudioAnalyzer_H

#include <napi.h>
namespace AudioAnalyzer
{
    class AudioAnalyzer : public Napi::AsyncWorker
    {

    public:
        AudioAnalyzer(Napi::Function &callback, std::string inFile);
        virtual ~AudioAnalyzer(){};

        void Execute();
        void OnOK();
        void OnError(const Napi::Error& e);

        private:
        bool mError; 
        std::string returnString, mFileLocation, mTitle, mArtist, mAlbum, mLength, mCamelotWheelKey, mChordNames; 
        Napi::Object obj;
    };

} // namespace AudioAnalyzer

#endif